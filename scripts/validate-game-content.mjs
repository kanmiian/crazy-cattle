import { access } from 'node:fs/promises';
import path from 'node:path';
import {
  allowedSourceHosts,
  loadGameContent,
  parseAllowedSourceUrl,
  publicDirectory,
  readJson,
  siteContentDirectory,
  toSlug
} from './lib/game-content.mjs';

const errors = [];
const uniqueValues = new Map();
const orderValues = new Map();

const addError = (fileName, message) => errors.push(`${fileName}: ${message}`);

const requireString = (fileName, content, field) => {
  if (typeof content[field] !== 'string' || content[field].trim() === '') {
    addError(fileName, `${field} must be a non-empty string`);
  }
};

const requireArray = (fileName, content, field, minimumLength = 1) => {
  if (!Array.isArray(content[field]) || content[field].length < minimumLength) {
    addError(fileName, `${field} must contain at least ${minimumLength} item(s)`);
  }
};

const registerUnique = (fileName, label, value) => {
  if (value === undefined || value === null) return;
  const registryKey = `${label}:${String(value).toLowerCase()}`;
  const existingFile = uniqueValues.get(registryKey);

  if (existingFile) {
    addError(fileName, `${label} duplicates ${existingFile}: ${value}`);
  } else {
    uniqueValues.set(registryKey, fileName);
  }
};

const registerOrder = (fileName, label, value, { allowNegative = false } = {}) => {
  if (!Number.isInteger(value) || (!allowNegative && value < 0)) {
    addError(fileName, `${label}.order must be ${allowNegative ? 'an integer' : 'a non-negative integer'}`);
    return;
  }

  const registryKey = `${label}:${value}`;
  const existingFile = orderValues.get(registryKey);
  if (existingFile) {
    addError(fileName, `${label}.order duplicates ${existingFile}: ${value}`);
  } else {
    orderValues.set(registryKey, fileName);
  }
};

const validateImage = async (fileName, image) => {
  if (typeof image !== 'string' || !image.startsWith('/')) {
    addError(fileName, 'image must be a root-relative public path');
    return;
  }

  const imagePath = path.resolve(publicDirectory, image.slice(1));
  if (!imagePath.startsWith(`${publicDirectory}${path.sep}`)) {
    addError(fileName, 'image resolves outside the public directory');
    return;
  }

  try {
    await access(imagePath);
  } catch {
    addError(fileName, `image does not exist: ${image}`);
  }
};

const games = await loadGameContent();

for (const { fileName, content } of games) {
  for (const field of ['key', 'pageType', 'slug', 'title', 'path', 'image']) {
    requireString(fileName, content, field);
  }

  if (content.schemaVersion !== 1) {
    addError(fileName, 'schemaVersion must be 1');
  }

  if (!['hot-game', 'legacy'].includes(content.pageType)) {
    addError(fileName, 'pageType must be hot-game or legacy');
  }

  if (content.slug !== toSlug(content.slug)) {
    addError(fileName, `slug is not normalized: ${content.slug}`);
  }

  if (content.path !== `/${content.slug}`) {
    addError(fileName, `path must equal /${content.slug}`);
  }

  if (fileName !== `${content.slug}.json`) {
    addError(fileName, `file name must equal ${content.slug}.json`);
  }

  registerUnique(fileName, 'key', content.key);
  registerUnique(fileName, 'slug', content.slug);
  registerUnique(fileName, 'path', content.path);
  await validateImage(fileName, content.image);

  if (content.pageType === 'legacy') {
    requireString(fileName, content, 'routeComponent');
  } else {
    for (const field of [
      'pageTitle', 'seoTitle', 'seoDescription', 'keywords', 'sourceUrl',
      'sourceName', 'sourceStatus', 'trendLabel', 'playCta', 'description',
      'intro', 'guideTitle', 'guideIntro'
    ]) {
      requireString(fileName, content, field);
    }

    requireArray(fileName, content, 'steps', 3);
    requireArray(fileName, content, 'recommendationCards', 3);
    requireArray(fileName, content, 'details', 3);
    requireArray(fileName, content, 'faqs', 2);

    try {
      const sourceUrl = parseAllowedSourceUrl(content.sourceUrl);
      registerUnique(fileName, 'sourceUrl', sourceUrl.href.replace(/\/$/, ''));
    } catch (error) {
      addError(fileName, error.message);
    }

    if (content.embedUrl) {
      try {
        const embedUrl = new URL(content.embedUrl);
        if (embedUrl.protocol !== 'https:') {
          addError(fileName, 'embedUrl must use HTTPS');
        }
      } catch {
        addError(fileName, 'embedUrl must be a valid absolute URL or null');
      }
    }
  }

  if (!content.featured || typeof content.featured.enabled !== 'boolean') {
    addError(fileName, 'featured.enabled must be a boolean');
  } else if (content.featured.enabled) {
    registerOrder(fileName, 'featured', content.featured.order, { allowNegative: true });
    for (const field of ['tag', 'summary', 'recommendation']) {
      if (typeof content.featured[field] !== 'string' || !content.featured[field].trim()) {
        addError(fileName, `featured.${field} must be a non-empty string`);
      }
    }
  }

  if (!content.indexing) {
    addError(fileName, 'indexing metadata is required');
  } else {
    registerOrder(fileName, 'indexing', content.indexing.order);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(content.indexing.lastmod || '')) {
      addError(fileName, 'indexing.lastmod must use YYYY-MM-DD');
    }
    if (!['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(content.indexing.changefreq)) {
      addError(fileName, 'indexing.changefreq is invalid');
    }
    if (typeof content.indexing.priority !== 'number' || content.indexing.priority < 0 || content.indexing.priority > 1) {
      addError(fileName, 'indexing.priority must be between 0 and 1');
    }
  }

  if (!content.llms) {
    addError(fileName, 'llms metadata is required');
  } else {
    registerOrder(fileName, 'llms', content.llms.order);
    for (const field of ['description', 'fullSummary']) {
      if (typeof content.llms[field] !== 'string' || !content.llms[field].trim()) {
        addError(fileName, `llms.${field} must be a non-empty string`);
      }
    }
  }
}

const staticSitemap = await readJson(path.join(siteContentDirectory, 'static-sitemap.json'));
for (const [index, entry] of staticSitemap.entries()) {
  const label = `static-sitemap[${index}]`;
  registerUnique(label, 'path', entry.path);
  registerOrder(label, 'indexing', entry.order);
}

if (errors.length) {
  console.error(`Game content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${games.length} game records and ${staticSitemap.length} static routes.`);
console.log(`Allowed source hosts: ${[...allowedSourceHosts].join(', ')}`);
