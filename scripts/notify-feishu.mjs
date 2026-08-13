import { readFile } from 'node:fs/promises';
import path from 'node:path';

const getArgument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? '' : process.argv[index + 1] || '';
};

const eventPath = getArgument('--event');
const workflowStatus = getArgument('--status') || 'unknown';
const pullRequestUrl = getArgument('--pr-url');

if (!process.env.FEISHU_APP_ID || !process.env.FEISHU_APP_SECRET || !eventPath) {
  console.log('Feishu result notification skipped: app credentials or event path are not configured.');
  process.exit(0);
}

try {
  const eventEnvelope = JSON.parse(await readFile(path.resolve(eventPath), 'utf8'));
  const payload = eventEnvelope.client_payload || {};
  if (!payload.chat_id) {
    console.log('Feishu result notification skipped: chat_id is not available.');
    process.exit(0);
  }

  let result = null;
  try {
    result = JSON.parse(await readFile(path.resolve('.game-ingest-result.json'), 'utf8'));
  } catch {
    // A failed ingestion may not have produced a result file.
  }

  const tokenResponse = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ app_id: process.env.FEISHU_APP_ID, app_secret: process.env.FEISHU_APP_SECRET })
  });
  const tokenBody = await tokenResponse.json();
  if (!tokenResponse.ok || tokenBody.code !== 0 || !tokenBody.tenant_access_token) {
    throw new Error(`Unable to get tenant access token: ${tokenBody.msg || tokenResponse.status}`);
  }

  const addedText = result?.added?.length
    ? `新增 ${result.added.map((game) => game.title).join('、')}`
    : '没有新增页面（可能全部为重复项目）';
  const statusText = workflowStatus === 'success' ? '处理完成' : `处理失败：${workflowStatus}`;
  const messageText = [`游戏内容自动化：${statusText}`, addedText, pullRequestUrl ? `PR: ${pullRequestUrl}` : '请在 GitHub Actions 查看日志。']
    .join('\n');

  const sendResponse = await fetch('https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${tokenBody.tenant_access_token}`,
      'content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      receive_id: payload.chat_id,
      msg_type: 'text',
      content: JSON.stringify({ text: messageText })
    })
  });
  const sendBody = await sendResponse.json();
  if (!sendResponse.ok || sendBody.code !== 0) {
    throw new Error(`Unable to send Feishu notification: ${sendBody.msg || sendResponse.status}`);
  }

  console.log('Feishu result notification sent.');
} catch (error) {
  console.warn(`Feishu result notification failed: ${error.message}`);
}
