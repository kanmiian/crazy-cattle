export const ALLOWED_GAME_HOSTS = new Set([
  'www.crazygames.com',
  'www.newgrounds.com'
]);

export const validateGameUrl = (value) => {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error('Project URL must be an absolute URL');
  }

  if (url.protocol !== 'https:') {
    throw new Error('Project URL must use HTTPS');
  }

  if (!ALLOWED_GAME_HOSTS.has(url.hostname)) {
    throw new Error(`Project URL host is not allowed: ${url.hostname}`);
  }

  const isAllowedPath = url.hostname === 'www.crazygames.com'
    ? url.pathname.startsWith('/game/')
    : url.pathname.startsWith('/portal/view/');

  if (!isAllowedPath) {
    throw new Error(`Project URL path is not a supported game page: ${url.pathname}`);
  }

  if (url.username || url.password || url.port) {
    throw new Error('Project URL must not contain credentials or a custom port');
  }

  url.search = '';
  url.hash = '';
  return url.href;
};

const normalizeMessage = (text) => String(text || '')
  .replace(/\r\n?/g, '\n')
  .replace(/[｜|]/g, '\n')
  .replace(/\u00a0/g, ' ');

const readField = (block, fieldName, nextFields) => {
  const lookahead = nextFields.length
    ? `(?=\\n\\s*(?:${nextFields.join('|')})\\s*[：:]|$)`
    : '$';
  const pattern = new RegExp(
    `(?:^|\\n)\\s*(?:\\d+\\s*[.、]\\s*)?${fieldName}\\s*[：:]\\s*([\\s\\S]*?)${lookahead}`,
    'i'
  );
  return block.match(pattern)?.[1]?.trim() || '';
};

export const parseGameSubmissions = (messageText) => {
  const text = normalizeMessage(messageText);
  const starts = [...text.matchAll(/(?:^|\n)\s*\d+\s*[.、]\s*关键词\s*[：:]/g)]
    .map((match) => match.index + (match[0].startsWith('\n') ? 1 : 0));

  if (!starts.length && /关键词\s*[：:]/.test(text)) {
    starts.push(Math.max(0, text.search(/关键词\s*[：:]/)));
  }

  const blocks = starts.map((start, index) => text.slice(start, starts[index + 1] ?? text.length));
  const submissions = [];

  for (const block of blocks) {
    const keyword = readField(block, '关键词', ['描述', '项目链接', 'Google\\s*Trends'])
      .replace(/[⚠️⚠]/gu, '')
      .trim();
    const description = readField(block, '描述', ['项目链接', 'Google\\s*Trends']);
    const projectUrlValue = readField(block, '项目链接', ['Google\\s*Trends']);
    const trends = readField(block, 'Google\\s*Trends', []);

    if (!keyword || !description || !projectUrlValue) continue;

    submissions.push({
      keyword,
      description,
      projectUrl: validateGameUrl(projectUrlValue.split(/\s/)[0]),
      trends: trends || `${keyword} vs GPTs`
    });
  }

  return submissions;
};
