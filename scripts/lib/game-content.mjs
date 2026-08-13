import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(currentDirectory, '..', '..');
export const gamesDirectory = path.join(projectRoot, 'src', 'content', 'games');
export const siteContentDirectory = path.join(projectRoot, 'src', 'content', 'site');
export const publicDirectory = path.join(projectRoot, 'public');
export const allowedSourceHosts = new Set([
  'hop.earth',
  'www.crazygames.com',
  'www.newgrounds.com'
]);

export const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));

export const loadGameContent = async () => {
  const fileNames = (await readdir(gamesDirectory))
    .filter((fileName) => fileName.endsWith('.json'))
    .sort();

  return Promise.all(fileNames.map(async (fileName) => ({
    fileName,
    filePath: path.join(gamesDirectory, fileName),
    content: await readJson(path.join(gamesDirectory, fileName))
  })));
};

export const writeJson = async (filePath, value) => {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

export const toSlug = (value) => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80);

export const toKey = (slug) => slug.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase());

export const parseAllowedSourceUrl = (value) => {
  let sourceUrl;

  try {
    sourceUrl = new URL(value);
  } catch {
    throw new Error('sourceUrl must be a valid absolute URL');
  }

  if (sourceUrl.protocol !== 'https:') {
    throw new Error('sourceUrl must use HTTPS');
  }

  if (!allowedSourceHosts.has(sourceUrl.hostname)) {
    throw new Error(`sourceUrl host is not allowed: ${sourceUrl.hostname}`);
  }

  const validPath = sourceUrl.hostname === 'hop.earth'
    ? sourceUrl.pathname === '/' || sourceUrl.pathname === ''
    : sourceUrl.hostname === 'www.crazygames.com'
      ? sourceUrl.pathname.startsWith('/game/')
      : sourceUrl.pathname.startsWith('/portal/view/');

  if (!validPath) {
    throw new Error(`sourceUrl path is not an allowed game page: ${sourceUrl.pathname}`);
  }

  sourceUrl.search = '';
  sourceUrl.hash = '';
  return sourceUrl;
};

export const sortByOrder = (field) => (left, right) => {
  const leftOrder = left.content[field]?.order ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.content[field]?.order ?? Number.MAX_SAFE_INTEGER;
  return leftOrder - rightOrder || left.content.title.localeCompare(right.content.title);
};
