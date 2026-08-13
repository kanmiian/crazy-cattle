import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  loadGameContent,
  publicDirectory,
  readJson,
  siteContentDirectory,
  sortByOrder
} from './lib/game-content.mjs';

const BASE_URL = 'https://cattlecrazy3d.com';
const games = await loadGameContent();
const staticSitemap = await readJson(path.join(siteContentDirectory, 'static-sitemap.json'));

const xmlEscape = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const sitemapEntries = [
  ...staticSitemap.map((entry) => ({ content: { path: entry.path, indexing: entry } })),
  ...games
].sort(sortByOrder('indexing'));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries.flatMap(({ content }) => [
    '  <url>',
    `    <loc>${xmlEscape(`${BASE_URL}${content.path === '/' ? '' : content.path}`)}</loc>`,
    `    <lastmod>${content.indexing.lastmod}</lastmod>`,
    `    <changefreq>${content.indexing.changefreq}</changefreq>`,
    `    <priority>${content.indexing.priority.toFixed(1)}</priority>`,
    '  </url>'
  ]),
  '</urlset>',
  ''
].join('\n');

const readSiteFragment = async (fileName) => (await readFile(path.join(siteContentDirectory, fileName), 'utf8')).trim();
const llmsGames = [...games].sort(sortByOrder('llms'));
const shortPrefix = await readSiteFragment('llms-short-prefix.md');
const shortSuffix = await readSiteFragment('llms-short-suffix.md');
const fullPrefix = await readSiteFragment('llms-full-prefix.md');
const fullSuffix = await readSiteFragment('llms-full-suffix.md');

const shortGameLinks = llmsGames
  .map(({ content }) => `- [${content.title}](${BASE_URL}${content.path}): ${content.llms.description}`)
  .join('\n');

const fullGameSections = llmsGames
  .map(({ content }) => `## ${content.title}\n${content.llms.fullSummary}`)
  .join('\n\n');

await Promise.all([
  writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(publicDirectory, 'llms.txt'), `${shortPrefix}\n${shortGameLinks}\n${shortSuffix}\n`, 'utf8'),
  writeFile(path.join(publicDirectory, 'llms-full.txt'), `${fullPrefix}\n\n${fullGameSections}\n\n${fullSuffix}\n`, 'utf8')
]);

console.log(`Generated sitemap.xml with ${sitemapEntries.length} URLs.`);
console.log(`Generated llms.txt and llms-full.txt with ${llmsGames.length} game entries.`);
