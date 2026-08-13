import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGameSubmissions, validateGameUrl } from '../src/game-message.mjs';

test('parses multiline and full-width pipe game submissions', () => {
  const submissions = parseGameSubmissions(`网页/小游戏：
1. 关键词：⚠️ HoodKill
描述：Newgrounds 7月26日前台推荐，评论回流
项目链接：https://www.newgrounds.com/portal/view/1042582
Google Trends：HoodKill vs GPTs
2. 关键词：⚠️ Slurp｜描述：CrazyGames新榜热榜同时露出｜项目链接：https://www.crazygames.com/game/slurp｜Google Trends：Slurp vs GPTs`);

  assert.equal(submissions.length, 2);
  assert.deepEqual(submissions[0], {
    keyword: 'HoodKill',
    description: 'Newgrounds 7月26日前台推荐，评论回流',
    projectUrl: 'https://www.newgrounds.com/portal/view/1042582',
    trends: 'HoodKill vs GPTs'
  });
  assert.equal(submissions[1].keyword, 'Slurp');
});

test('only accepts supported HTTPS game pages', () => {
  assert.equal(
    validateGameUrl('https://www.crazygames.com/game/sweetjong?ref=chat#play'),
    'https://www.crazygames.com/game/sweetjong'
  );
  assert.throws(() => validateGameUrl('http://www.crazygames.com/game/sweetjong'), /HTTPS/);
  assert.throws(() => validateGameUrl('https://example.com/game/sweetjong'), /not allowed/);
  assert.throws(() => validateGameUrl('https://www.crazygames.com/'), /not a supported/);
});
