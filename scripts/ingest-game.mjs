import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  gamesDirectory,
  loadGameContent,
  parseAllowedSourceUrl,
  projectRoot,
  publicDirectory,
  toKey,
  toSlug,
  writeJson
} from './lib/game-content.mjs';

const TRUSTED_IMAGE_HOSTS = new Set([
  'imgs.crazygames.com',
  'images.crazygames.com',
  'files.crazygames.com',
  'art.ngfiles.com',
  'picon.ngfiles.com',
  'img.ngfiles.com',
  'uploads.ungrounded.net',
  'www.newgrounds.com'
]);
const MAX_HTML_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const categories = [
  {
    id: 'puzzle',
    matches: /puzzle|tricky|mahjong|merge|word|brain|解谜|消除|拼图|脑洞|合成/i,
    genre: 'Puzzle, logic, browser game',
    angles: 'level solutions, puzzle rules, efficient move order, and answer-focused searches',
    steps: [
      'Read the current objective before making the first move.',
      'Identify the action that opens the most useful follow-up options.',
      'Avoid spending limited helpers until the normal solution path is blocked.',
      'Restart early when a move removes an important resource or route.',
      'Record difficult levels so their solution can be repeated consistently.'
    ]
  },
  {
    id: 'horror',
    matches: /horror|escape|survival|恐怖|逃脱|生存/i,
    genre: 'Horror, escape, browser game',
    angles: 'walkthroughs, item locations, escape routes, enemy patterns, and puzzle solutions',
    steps: [
      'Learn the safe rooms and hiding points before exploring deeper areas.',
      'Check every interactable object and remember where locked routes appear.',
      'Watch enemy patrol timing before crossing an exposed area.',
      'Keep key items for the obstacle they clearly match instead of testing them randomly.',
      'Use each failed chase to refine the safest route through the level.'
    ]
  },
  {
    id: 'racing',
    matches: /race|racing|car|drift|竞速|赛车|汽车/i,
    genre: 'Racing, driving, browser game',
    angles: 'controls, car upgrades, track routes, speed management, and race tips',
    steps: [
      'Learn the steering response before committing to maximum speed.',
      'Brake before difficult corners and accelerate through the exit.',
      'Upgrade the stat that fixes the most frequent cause of a lost race.',
      'Repeat one route until its hazards and shortcuts become predictable.',
      'Use boosts on clear sections where the extra speed can be controlled.'
    ]
  },
  {
    id: 'idle',
    matches: /idle|clicker|tycoon|incremental|farm|放置|点击|经营|升级循环|农场/i,
    genre: 'Idle, incremental, browser game',
    angles: 'upgrade order, income scaling, unlock requirements, reset timing, and progression tips',
    steps: [
      'Buy the cheapest upgrade that creates a measurable increase in income.',
      'Keep production balanced so one bottleneck does not stop progression.',
      'Save for major unlocks only when their payoff beats several smaller upgrades.',
      'Collect timed rewards after the core income loop is already running.',
      'Use resets or prestige systems when recovery to the current point will be fast.'
    ]
  },
  {
    id: 'action',
    matches: /shoot|combat|battle|arrow|airplane|defen[cs]e|action|射击|空战|战斗|防守/i,
    genre: 'Action, arcade, browser game',
    angles: 'controls, weapon choices, enemy waves, upgrade order, and survival strategy',
    steps: [
      'Learn the movement and attack controls in a low-risk opening area.',
      'Keep enough space to react instead of chasing every immediate reward.',
      'Prioritize threats that restrict movement or create additional enemies.',
      'Choose upgrades that improve a consistent attack pattern.',
      'Save limited abilities for dense waves, bosses, or recovery situations.'
    ]
  },
  {
    id: 'sports',
    matches: /golf|soccer|football|sport|高尔夫|足球|体育/i,
    genre: 'Sports, skill, browser game',
    angles: 'controls, timing, course or match strategy, scoring routes, and challenge tips',
    steps: [
      'Use the opening attempts to learn power, direction, and timing.',
      'Choose a consistent setup before trying riskier scoring routes.',
      'Plan around hazards and defenders instead of reacting at the last moment.',
      'Repeat difficult situations with one small adjustment at a time.',
      'Compare results and keep the approach that produces reliable scores.'
    ]
  },
  {
    id: 'platform',
    matches: /platform|obby|runner|parkour|平台|跑酷|闯关/i,
    genre: 'Platform, obstacle, browser game',
    angles: 'controls, checkpoints, obstacle timing, route choices, and level guides',
    steps: [
      'Test movement and jump timing before attempting the first long obstacle.',
      'Aim for safe checkpoint progress instead of rushing the entire route.',
      'Watch one full obstacle cycle before moving through timed sections.',
      'Use camera positioning to keep the next landing area visible.',
      'Repeat difficult jumps from the same starting position for consistency.'
    ]
  }
];

const defaultCategory = {
  id: 'game',
  genre: 'Arcade, casual, browser game',
  angles: 'controls, beginner progression, key mechanics, strategy tips, and update searches',
  steps: [
    'Learn the basic controls and the immediate objective before spending resources.',
    'Use the first session to identify the action that drives progression.',
    'Prioritize upgrades or choices that improve repeatable results.',
    'Avoid spending limited resources until their effect is clear.',
    'Review each failed attempt and change one decision on the next run.'
  ]
};

const getArgument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
};

const cleanText = (value, maximumLength) => String(value || '')
  .replace(/[\u0000-\u001f\u007f]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, maximumLength);

const inferCategory = (text) => categories.find((category) => category.matches.test(text)) || defaultCategory;

const getWords = (value) => new Set(
  String(value || '').toLowerCase().match(/[a-z0-9]{3,}|[\u3400-\u9fff]{2,}/g) || []
);

const findSimilarGame = (submission, existingGames, category) => {
  const targetWords = getWords(`${submission.keyword} ${submission.description}`);
  let best = null;

  for (const entry of existingGames) {
    if (entry.content.pageType !== 'hot-game') continue;
    const candidate = entry.content;
    const candidateCategory = inferCategory(`${candidate.title} ${candidate.description} ${candidate.keywords}`);
    let score = candidateCategory.id === category.id ? 2 : 0;
    const candidateWords = getWords(`${candidate.title} ${candidate.description} ${candidate.keywords}`);
    for (const word of targetWords) if (candidateWords.has(word)) score += 1;

    if (!best || score > best.score) best = { content: candidate, score };
  }

  return best?.score > 0 ? best.content : null;
};

const assertTrustedRedirect = (value, allowedHosts) => {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !allowedHosts.has(url.hostname)) {
    throw new Error(`Blocked redirect or asset host: ${url.hostname}`);
  }
  return url;
};

const fetchWithRedirectAllowlist = async (initialUrl, allowedHosts) => {
  let url = assertTrustedRedirect(initialUrl, allowedHosts);

  for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
    const response = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; CrazyCattleContentBot/1.0)' }
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location) throw new Error('Redirect response has no location');
      url = assertTrustedRedirect(new URL(location, url).href, allowedHosts);
      continue;
    }

    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return response;
  }

  throw new Error('Too many redirects');
};

const readLimitedBody = async (response, maximumBytes) => {
  const statedLength = Number(response.headers.get('content-length') || '0');
  if (statedLength > maximumBytes) throw new Error('Response exceeds size limit');

  const reader = response.body?.getReader();
  if (!reader) return new Uint8Array();

  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel();
      throw new Error('Response exceeds size limit');
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
};

const decodeHtmlAttribute = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const findOpenGraphImage = (html, pageUrl) => {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  for (const tag of metaTags) {
    const attributes = {};
    for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attributes[match[1].toLowerCase()] = decodeHtmlAttribute(match[2] ?? match[3] ?? match[4] ?? '');
    }

    if ((attributes.property || attributes.name || '').toLowerCase() === 'og:image' && attributes.content) {
      return new URL(attributes.content, pageUrl).href;
    }
  }

  return null;
};

const downloadPreviewImage = async (sourceUrl, slug) => {
  try {
    const sourceResponse = await fetchWithRedirectAllowlist(sourceUrl, new Set([
      'www.crazygames.com',
      'www.newgrounds.com'
    ]));
    const contentType = sourceResponse.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) throw new Error('Source did not return HTML');

    const html = new TextDecoder().decode(await readLimitedBody(sourceResponse, MAX_HTML_BYTES));
    const imageUrl = findOpenGraphImage(html, sourceUrl);
    if (!imageUrl) throw new Error('No Open Graph image found');

    const imageResponse = await fetchWithRedirectAllowlist(imageUrl, TRUSTED_IMAGE_HOSTS);
    const imageType = (imageResponse.headers.get('content-type') || '').split(';')[0].toLowerCase();
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp'
    };
    const extension = extensions[imageType];
    if (!extension) throw new Error(`Unsupported image type: ${imageType}`);

    const imageBody = await readLimitedBody(imageResponse, MAX_IMAGE_BYTES);
    const relativePath = `/images/${slug}.${extension}`;
    await mkdir(path.join(publicDirectory, 'images'), { recursive: true });
    await writeFile(path.join(publicDirectory, relativePath.slice(1)), imageBody);
    return relativePath;
  } catch (error) {
    console.warn(`Preview image fallback for ${slug}: ${error.message}`);
    return '/images/crazycattle-preview.webp';
  }
};

const buildGameRecord = async ({ submission, existingGames, order, eventMetadata }) => {
  const title = cleanText(submission.keyword, 120);
  const originalDescription = cleanText(submission.description, 1000);
  const trends = cleanText(submission.trends || `${title} vs GPTs`, 200);
  if (title.length < 2) throw new Error('Keyword must contain at least 2 characters');
  if (originalDescription.length < 5) throw new Error(`Description is too short for ${title}`);

  const sourceUrl = parseAllowedSourceUrl(submission.projectUrl).href.replace(/\/$/, '');
  const sourceName = new URL(sourceUrl).hostname === 'www.crazygames.com' ? 'CrazyGames' : 'Newgrounds';
  const slug = toSlug(title);
  if (!slug) throw new Error(`Unable to generate a slug for ${title}`);

  const category = inferCategory(`${title} ${originalDescription}`);
  const similarGame = findSimilarGame({ keyword: title, description: originalDescription }, existingGames, category);
  const image = await downloadPreviewImage(sourceUrl, slug);
  const currentDate = new Date().toISOString().slice(0, 10);
  const sourceContext = originalDescription.replace(/[.!?。！？]+$/, '');
  const cardSummary = sourceContext.length > 240 ? `${sourceContext.slice(0, 237)}...` : sourceContext;
  const trendContext = trends.replace(/\s+vs\s+GPTs\s*$/i, '').trim();

  return {
    schemaVersion: 1,
    key: toKey(slug),
    pageType: 'hot-game',
    slug,
    title,
    path: `/${slug}`,
    pageTitle: `${title} - Play Online Browser Game`,
    seoTitle: `${title} - Play Online with Tips and Guide`,
    seoDescription: `Play ${title} through the official ${sourceName} source. Learn the core controls, progression route, useful strategies, and beginner tips for this browser game.`,
    keywords: [
      title,
      `${title} game`,
      `play ${title} online`,
      `${title} tips`,
      `${title} guide`,
      `${title} walkthrough`,
      `${sourceName} ${title}`,
      `${trendContext} game`
    ].filter((value, index, values) => value && values.indexOf(value) === index).join(', '),
    image,
    embedUrl: null,
    sourceUrl,
    sourceName,
    sourceStatus: `${sourceContext}; submitted through the verified Feishu intake on ${currentDate}`,
    trendLabel: trends,
    playCta: `Play ${title}`,
    externalPlayOnly: true,
    externalPlayCta: 'Open Playable Source',
    externalPlayReason: `Use the official ${sourceName} page for the current playable build. Third-party framing is disabled until an embed URL is reviewed and verified.`,
    playableLinks: [{ label: `Play ${title} on ${sourceName}`, url: sourceUrl }],
    description: `${title} is a browser ${category.genre.toLowerCase()} available from ${sourceName}. ${sourceContext}. This page collects the official play link and a practical starting route for players discovering the game.`,
    intro: `The most useful ${title} searches center on ${category.angles}. The guide below turns those topics into a repeatable first-session checklist.`,
    guideTitle: `${title} Beginner Guide, Controls, and Tips`,
    guideIntro: `Start by learning the main objective and control response, then improve one decision at a time. Consistent progress is more useful than spending every reward immediately.`,
    steps: category.steps,
    recommendationCards: [
      { title: 'Best content angle', text: `${title} ${category.angles}.` },
      { title: 'Why it is hot', text: sourceContext },
      { title: 'Player fit', text: `A useful pick for players looking for a fresh ${category.genre.toLowerCase()} with a direct browser play source.` }
    ],
    details: [
      ['Game', title],
      ['Genre', category.genre],
      ['Discovery signal', sourceContext],
      ['Trend comparison', trends],
      ['Guide focus', category.angles],
      ['Platform', 'Browser, desktop and mobile'],
      ['Source', `${sourceName} official game page`]
    ],
    faqs: [
      { question: `Can I play ${title} online here?`, answer: `Use the verified ${sourceName} link on this page to open the current official browser build.` },
      { question: `What should I do first in ${title}?`, answer: category.steps[0] },
      { question: `Where can I find ${title} tips?`, answer: `This page covers ${category.angles}, and can be expanded with level-specific notes as new player questions appear.` }
    ],
    featured: {
      enabled: true,
      order: order.featured,
      tag: `New / ${sourceName}`,
      summary: cardSummary,
      recommendation: `Recommended for ${title} play intent, guide searches, tips, and update coverage.`
    },
    indexing: {
      order: order.indexing,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    llms: {
      order: order.llms,
      description: `Open the official ${title} source with beginner controls, progression guidance, and practical tips`,
      fullSummary: `${title} is a ${category.genre.toLowerCase()} module with an official ${sourceName} play link, beginner controls, progression guidance, practical strategy, FAQs, and search coverage for ${category.angles}.`
    },
    automation: {
      createdAt: eventMetadata.receivedAt,
      feishuMessageId: eventMetadata.messageId,
      feishuEventId: eventMetadata.eventId,
      originalDescription,
      trends,
      similarContentKey: similarGame?.key || null,
      reviewRequired: true
    }
  };
};

const eventFile = getArgument('--event');
if (!eventFile) throw new Error('Usage: node scripts/ingest-game.mjs --event <github-event.json>');

const eventEnvelope = JSON.parse(await readFile(path.resolve(eventFile), 'utf8'));
const payload = eventEnvelope.client_payload || eventEnvelope;
if (!Array.isArray(payload.games) || !payload.games.length || payload.games.length > 10) {
  throw new Error('client_payload.games must contain 1 to 10 submissions');
}

const existingGames = await loadGameContent();
const existingSlugs = new Set(existingGames.map(({ content }) => content.slug.toLowerCase()));
const existingKeys = new Set(existingGames.map(({ content }) => content.key.toLowerCase()));
const existingSources = new Set(existingGames
  .map(({ content }) => content.sourceUrl?.toLowerCase().replace(/\/$/, ''))
  .filter(Boolean));
const batchSlugs = new Set();
const added = [];
const skipped = [];
const minimumFeaturedOrder = Math.min(...existingGames
  .filter(({ content }) => content.featured?.enabled)
  .map(({ content }) => content.featured.order));
let nextIndexingOrder = Math.max(...existingGames.map(({ content }) => content.indexing.order)) + 1;
let nextLlmsOrder = Math.max(...existingGames.map(({ content }) => content.llms.order)) + 1;
let nextFeaturedOrder = minimumFeaturedOrder - payload.games.length;

for (const rawSubmission of payload.games) {
  const title = cleanText(rawSubmission.keyword, 120);
  const slug = toSlug(title);
  const key = toKey(slug);
  const sourceUrl = parseAllowedSourceUrl(rawSubmission.projectUrl).href.toLowerCase().replace(/\/$/, '');
  const duplicateReason = existingSlugs.has(slug.toLowerCase()) || batchSlugs.has(slug.toLowerCase())
    ? `slug already exists: ${slug}`
    : existingKeys.has(key.toLowerCase())
      ? `key already exists: ${key}`
      : existingSources.has(sourceUrl)
        ? `source URL already exists: ${sourceUrl}`
        : null;

  if (duplicateReason) {
    skipped.push({ title, reason: duplicateReason });
    continue;
  }

  const record = await buildGameRecord({
    submission: rawSubmission,
    existingGames,
    order: {
      featured: nextFeaturedOrder,
      indexing: nextIndexingOrder,
      llms: nextLlmsOrder
    },
    eventMetadata: {
      receivedAt: cleanText(payload.received_at, 40) || new Date().toISOString(),
      messageId: cleanText(payload.message_id, 100),
      eventId: cleanText(payload.event_id, 100)
    }
  });

  await writeJson(path.join(gamesDirectory, `${record.slug}.json`), record);
  existingGames.push({ fileName: `${record.slug}.json`, content: record });
  existingSlugs.add(record.slug.toLowerCase());
  existingKeys.add(record.key.toLowerCase());
  existingSources.add(record.sourceUrl.toLowerCase().replace(/\/$/, ''));
  batchSlugs.add(record.slug.toLowerCase());
  added.push({ title: record.title, slug: record.slug, path: record.path, sourceUrl: record.sourceUrl });
  nextFeaturedOrder += 1;
  nextIndexingOrder += 1;
  nextLlmsOrder += 1;
}

const idempotencySeed = cleanText(payload.message_id || payload.event_id || JSON.stringify(payload.games), 500);
const suffixHash = createHash('sha256').update(idempotencySeed).digest('hex').slice(0, 10);
const branchBase = added[0]?.slug || toSlug(payload.games[0]?.keyword || 'duplicate');
const result = {
  added,
  skipped,
  changed: added.length > 0,
  branchSuffix: `${branchBase}-${suffixHash}`,
  prTitle: added.length === 1
    ? `content: add ${added[0].title}`
    : `content: add ${added.length} Feishu game pages`,
  messageId: cleanText(payload.message_id, 100),
  eventId: cleanText(payload.event_id, 100)
};

const resultPath = path.join(projectRoot, '.game-ingest-result.json');
const bodyPath = path.join(projectRoot, '.game-ingest-pr.md');
await writeJson(resultPath, result);
await writeFile(bodyPath, [
  'Automated game content intake from a verified Feishu message.',
  '',
  '## Added',
  ...(added.length ? added.map((game) => `- ${game.title}: \`${game.path}\` (${game.sourceUrl})`) : ['- None']),
  '',
  '## Skipped duplicates',
  ...(skipped.length ? skipped.map((game) => `- ${game.title}: ${game.reason}`) : ['- None']),
  '',
  '## Review gate',
  '- [ ] Confirm gameplay facts and generated guide text.',
  '- [ ] Confirm image licensing and visual relevance.',
  '- [ ] Confirm keyword wording and search intent.',
  '- [ ] Merge only after validation, build, and preview checks pass.',
  ''
].join('\n'), 'utf8');

console.log(JSON.stringify(result, null, 2));
