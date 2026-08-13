import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFeishuSignature,
  constantTimeEqual,
  decryptFeishuEvent,
  verifyFeishuSignature,
  verifyTimestamp
} from '../src/feishu-security.mjs';

const encoder = new TextEncoder();

const encryptFixture = async (payload, encryptKey) => {
  const keyDigest = await crypto.subtle.digest('SHA-256', encoder.encode(encryptKey));
  const key = await crypto.subtle.importKey('raw', keyDigest, { name: 'AES-CBC' }, false, ['encrypt']);
  const iv = Uint8Array.from({ length: 16 }, (_, index) => index + 1);
  const encrypted = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    encoder.encode(JSON.stringify(payload))
  ));
  return Buffer.concat([Buffer.from(iv), Buffer.from(encrypted)]).toString('base64');
};

test('calculates and verifies signatures over the untouched request body', async () => {
  const values = {
    timestamp: '1785081600',
    nonce: 'nonce-123',
    encryptKey: 'encrypt-key',
    rawBody: '{"encrypt":"ciphertext"}'
  };
  const signature = await calculateFeishuSignature(
    values.timestamp,
    values.nonce,
    values.encryptKey,
    values.rawBody
  );

  assert.equal(signature.length, 64);
  assert.equal(await verifyFeishuSignature({ ...values, signature }), true);
  assert.equal(await verifyFeishuSignature({ ...values, signature, rawBody: '{}'}), false);
});

test('decrypts AES-256-CBC events using the IV prefix', async () => {
  const payload = { type: 'url_verification', challenge: 'challenge-123', token: 'token-123' };
  const encrypted = await encryptFixture(payload, 'encrypt-key');
  assert.deepEqual(await decryptFeishuEvent(encrypted, 'encrypt-key'), payload);
});

test('rejects stale timestamps and compares secrets without early length exits', () => {
  const now = Date.UTC(2026, 6, 27, 0, 0, 0);
  const currentSeconds = Math.floor(now / 1000);

  assert.equal(verifyTimestamp(String(currentSeconds - 299), now), true);
  assert.equal(verifyTimestamp(String(currentSeconds - 301), now), false);
  assert.equal(verifyTimestamp('invalid', now), false);
  assert.equal(constantTimeEqual('same', 'same'), true);
  assert.equal(constantTimeEqual('same', 'different'), false);
});
