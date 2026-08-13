const encoder = new TextEncoder();
const decoder = new TextDecoder();

const bytesToHex = (bytes) => [...bytes]
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');

const base64ToBytes = (value) => {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

export const constantTimeEqual = (left, right) => {
  const leftBytes = encoder.encode(String(left));
  const rightBytes = encoder.encode(String(right));
  const maximumLength = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < maximumLength; index += 1) {
    difference |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }

  return difference === 0;
};

export const calculateFeishuSignature = async (timestamp, nonce, encryptKey, rawBody) => {
  const payload = encoder.encode(`${timestamp}${nonce}${encryptKey}${rawBody}`);
  const digest = await crypto.subtle.digest('SHA-256', payload);
  return bytesToHex(new Uint8Array(digest));
};

export const verifyFeishuSignature = async ({ timestamp, nonce, signature, encryptKey, rawBody }) => {
  if (!timestamp || !nonce || !signature || !encryptKey) return false;
  const expected = await calculateFeishuSignature(timestamp, nonce, encryptKey, rawBody);
  return constantTimeEqual(expected.toLowerCase(), signature.toLowerCase());
};

export const verifyTimestamp = (timestamp, nowMilliseconds = Date.now(), toleranceSeconds = 300) => {
  if (!/^\d+$/.test(String(timestamp || ''))) return false;
  const timestampSeconds = Number(timestamp);
  const nowSeconds = Math.floor(nowMilliseconds / 1000);
  return Number.isSafeInteger(timestampSeconds)
    && Math.abs(nowSeconds - timestampSeconds) <= toleranceSeconds;
};

export const decryptFeishuEvent = async (encryptedValue, encryptKey) => {
  const encrypted = base64ToBytes(encryptedValue);
  if (encrypted.byteLength <= 16) throw new Error('Encrypted event is too short');

  const keyDigest = await crypto.subtle.digest('SHA-256', encoder.encode(encryptKey));
  const key = await crypto.subtle.importKey(
    'raw',
    keyDigest,
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: encrypted.slice(0, 16) },
    key,
    encrypted.slice(16)
  );

  return JSON.parse(decoder.decode(decrypted));
};
