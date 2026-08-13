import { parseGameSubmissions } from './game-message.mjs';
import {
  constantTimeEqual,
  decryptFeishuEvent,
  verifyFeishuSignature,
  verifyTimestamp
} from './feishu-security.mjs';

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff'
  }
});

const requireEnvironment = (env, names) => {
  for (const name of names) {
    if (!env[name]) throw new Error(`Missing Worker configuration: ${name}`);
  }
};

const getEncryptKeys = (env) => [
  env.FEISHU_ENCRYPT_KEY,
  env.FEISHU_ENCRYPT_KEY_PREVIOUS
].filter(Boolean);

const dispatchToGitHub = async (payload, env) => {
  requireEnvironment(env, ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO']);

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(env.GITHUB_OWNER)}/${encodeURIComponent(env.GITHUB_REPO)}/dispatches`,
    {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'content-type': 'application/json',
        'user-agent': 'crazy-cattle-feishu-ingest',
        'x-github-api-version': '2022-11-28'
      },
      body: JSON.stringify({
        event_type: env.GITHUB_EVENT_TYPE || 'feishu_game_submission',
        client_payload: payload
      })
    }
  );

  if (!response.ok) {
    const responseText = (await response.text()).slice(0, 500);
    throw new Error(`GitHub dispatch failed (${response.status}): ${responseText}`);
  }
};

const processQueue = async (batch, env) => {
  for (const message of batch.messages) {
    try {
      await dispatchToGitHub(message.body, env);
      message.ack();
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      message.retry();
    }
  }
};

const handleFeishuEvent = async (request, env) => {
  requireEnvironment(env, ['FEISHU_VERIFICATION_TOKEN', 'FEISHU_ENCRYPT_KEY']);

  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > 131072) return jsonResponse({ error: 'Request body too large' }, 413);

  const rawBody = await request.text();
  if (rawBody.length > 131072) return jsonResponse({ error: 'Request body too large' }, 413);

  let wrapper;
  try {
    wrapper = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const encrypted = typeof wrapper.encrypt === 'string';
  const timestamp = request.headers.get('x-lark-request-timestamp');
  const nonce = request.headers.get('x-lark-request-nonce');
  const signature = request.headers.get('x-lark-signature');
  const hasSignatureHeaders = Boolean(timestamp || nonce || signature);
  const encryptKeys = getEncryptKeys(env);
  let verifiedEncryptKey = null;

  if (hasSignatureHeaders) {
    if (!verifyTimestamp(timestamp, Date.now(), 300)) {
      return jsonResponse({ error: 'Expired or invalid timestamp' }, 401);
    }

    for (const encryptKey of encryptKeys) {
      const signatureValid = await verifyFeishuSignature({
        timestamp,
        nonce,
        signature,
        encryptKey,
        rawBody
      });
      if (signatureValid) {
        verifiedEncryptKey = encryptKey;
        break;
      }
    }
    if (!verifiedEncryptKey) return jsonResponse({ error: 'Invalid signature' }, 401);
  }

  let payload;
  try {
    if (!encrypted) {
      payload = wrapper;
    } else if (verifiedEncryptKey) {
      payload = await decryptFeishuEvent(wrapper.encrypt, verifiedEncryptKey);
    } else {
      let decryptionError;
      for (const encryptKey of encryptKeys) {
        try {
          payload = await decryptFeishuEvent(wrapper.encrypt, encryptKey);
          break;
        } catch (error) {
          decryptionError = error;
        }
      }
      if (!payload) throw decryptionError;
    }
  } catch {
    return jsonResponse({ error: 'Unable to decrypt event' }, 400);
  }

  const verificationToken = payload.header?.token || payload.token;
  const validVerificationToken = [
    env.FEISHU_VERIFICATION_TOKEN,
    env.FEISHU_VERIFICATION_TOKEN_PREVIOUS
  ].filter(Boolean).some((token) => constantTimeEqual(verificationToken || '', token));
  if (!validVerificationToken) {
    return jsonResponse({ error: 'Invalid verification token' }, 401);
  }

  if (payload.type === 'url_verification') {
    return jsonResponse({ challenge: payload.challenge });
  }

  if (env.REQUIRE_ENCRYPTION !== 'false' && (!encrypted || !hasSignatureHeaders)) {
    return jsonResponse({ error: 'Encrypted and signed events are required' }, 401);
  }

  if (payload.header?.event_type !== 'im.message.receive_v1') {
    return jsonResponse({ ok: true, ignored: 'unsupported event type' });
  }

  const message = payload.event?.message;
  if (!message || message.message_type !== 'text') {
    return jsonResponse({ ok: true, ignored: 'non-text message' });
  }

  let messageContent;
  try {
    messageContent = JSON.parse(message.content);
  } catch {
    return jsonResponse({ ok: true, ignored: 'invalid message content' });
  }

  let games;
  try {
    games = parseGameSubmissions(messageContent.text);
  } catch (error) {
    return jsonResponse({
      ok: true,
      ignored: error instanceof Error ? error.message : 'invalid game submission'
    });
  }

  if (!games.length) return jsonResponse({ ok: true, ignored: 'no game submissions' });
  if (games.length > 10) return jsonResponse({ error: 'At most 10 games are accepted per message' }, 422);

  games = games.map((game) => ({
    keyword: game.keyword.slice(0, 120),
    description: game.description.slice(0, 1000),
    projectUrl: game.projectUrl,
    trends: game.trends.slice(0, 200)
  }));

  const messageId = message.message_id;
  const eventId = payload.header?.event_id;
  if (!messageId) return jsonResponse({ error: 'message_id is required' }, 400);

  const replayKey = `message:${messageId}`;
  if (await env.FEISHU_EVENTS.get(replayKey)) {
    return jsonResponse({ ok: true, duplicate: true });
  }

  await env.GAME_INGEST_QUEUE.send({
    games,
    message_id: messageId,
    event_id: eventId,
    chat_id: message.chat_id,
    received_at: new Date().toISOString()
  });

  const replayTtl = Math.max(3600, Number(env.REPLAY_TTL_SECONDS || 86400));
  await env.FEISHU_EVENTS.put(replayKey, 'queued', { expirationTtl: replayTtl });

  return jsonResponse({ ok: true, accepted: games.length });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return jsonResponse({ ok: true });
    }

    if (request.method !== 'POST' || url.pathname !== '/feishu/events') {
      return jsonResponse({ error: 'Not found' }, 404);
    }

    try {
      return await handleFeishuEvent(request, env);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },

  async queue(batch, env) {
    await processQueue(batch, env);
  }
};
