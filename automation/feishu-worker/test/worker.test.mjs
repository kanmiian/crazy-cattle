import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.mjs';
import { calculateFeishuSignature } from '../src/feishu-security.mjs';

const encoder = new TextEncoder();

const encryptFixture = async (payload, encryptKey) => {
  const keyDigest = await crypto.subtle.digest('SHA-256', encoder.encode(encryptKey));
  const key = await crypto.subtle.importKey('raw', keyDigest, { name: 'AES-CBC' }, false, ['encrypt']);
  const iv = Uint8Array.from({ length: 16 }, (_, index) => 16 - index);
  const encrypted = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    encoder.encode(JSON.stringify(payload))
  ));
  return Buffer.concat([Buffer.from(iv), Buffer.from(encrypted)]).toString('base64');
};

const createEnvironment = () => {
  const replayValues = new Map();
  const queued = [];
  return {
    env: {
      FEISHU_VERIFICATION_TOKEN: 'verification-token',
      FEISHU_ENCRYPT_KEY: 'encrypt-key',
      REQUIRE_ENCRYPTION: 'true',
      REPLAY_TTL_SECONDS: '86400',
      FEISHU_EVENTS: {
        get: async (key) => replayValues.get(key) || null,
        put: async (key, value) => replayValues.set(key, value)
      },
      GAME_INGEST_QUEUE: {
        send: async (payload) => queued.push(payload)
      }
    },
    queued
  };
};

const createSignedRequest = async (payload, encryptKey) => {
  const wrapper = JSON.stringify({ encrypt: await encryptFixture(payload, encryptKey) });
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = 'test-nonce';
  const signature = await calculateFeishuSignature(timestamp, nonce, encryptKey, wrapper);
  return new Request('https://worker.example/feishu/events', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-lark-request-timestamp': timestamp,
      'x-lark-request-nonce': nonce,
      'x-lark-signature': signature
    },
    body: wrapper
  });
};

test('returns an authenticated URL verification challenge immediately', async () => {
  const { env } = createEnvironment();
  const request = new Request('https://worker.example/feishu/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'url_verification',
      token: 'verification-token',
      challenge: 'challenge-value'
    })
  });

  const response = await worker.fetch(request, env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { challenge: 'challenge-value' });
});

test('queues one valid message and blocks replay by message_id', async () => {
  const { env, queued } = createEnvironment();
  const payload = {
    schema: '2.0',
    header: {
      event_id: 'event-1',
      event_type: 'im.message.receive_v1',
      token: 'verification-token'
    },
    event: {
      message: {
        message_id: 'message-1',
        message_type: 'text',
        chat_id: 'chat-1',
        content: JSON.stringify({
          text: '1. 关键词：Test Flight\n描述：新上架街机空战，玩法直观\n项目链接：https://www.crazygames.com/game/test-flight\nGoogle Trends：Test Flight vs GPTs'
        })
      }
    }
  };

  const firstResponse = await worker.fetch(await createSignedRequest(payload, env.FEISHU_ENCRYPT_KEY), env);
  const secondResponse = await worker.fetch(await createSignedRequest(payload, env.FEISHU_ENCRYPT_KEY), env);

  assert.deepEqual(await firstResponse.json(), { ok: true, accepted: 1 });
  assert.deepEqual(await secondResponse.json(), { ok: true, duplicate: true });
  assert.equal(queued.length, 1);
  assert.equal(queued[0].games[0].keyword, 'Test Flight');
  assert.equal(queued[0].message_id, 'message-1');
});

test('rejects normal events without encrypted signature headers', async () => {
  const { env } = createEnvironment();
  const request = new Request('https://worker.example/feishu/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      header: { token: 'verification-token', event_type: 'im.message.receive_v1' },
      event: {}
    })
  });

  const response = await worker.fetch(request, env);
  assert.equal(response.status, 401);
});

test('accepts the previous encryption key during a planned rotation', async () => {
  const { env, queued } = createEnvironment();
  env.FEISHU_ENCRYPT_KEY_PREVIOUS = 'previous-encrypt-key';
  const payload = {
    schema: '2.0',
    header: {
      event_id: 'rotation-event',
      event_type: 'im.message.receive_v1',
      token: 'verification-token'
    },
    event: {
      message: {
        message_id: 'rotation-message',
        message_type: 'text',
        chat_id: 'rotation-chat',
        content: JSON.stringify({
          text: '1. 关键词：Rotation Game\n描述：New arcade test game\n项目链接：https://www.crazygames.com/game/rotation-game\nGoogle Trends：Rotation Game vs GPTs'
        })
      }
    }
  };

  const response = await worker.fetch(await createSignedRequest(payload, env.FEISHU_ENCRYPT_KEY_PREVIOUS), env);
  assert.equal(response.status, 200);
  assert.equal(queued.length, 1);
});
