import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const manifest = JSON.parse(
  await readFile(new URL('../public/manifest.json', import.meta.url), 'utf8'),
);

test('service-worker registration is valid browser JavaScript', () => {
  const classicScripts = [...indexHtml.matchAll(/<script(?![^>]*type=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join('\n');

  assert.doesNotMatch(classicScripts, /import\.meta/);
  assert.match(indexHtml, /serviceWorker\.register\(['"]\/sw\.js['"]\)/);
});

test('installability metadata remains explicitly linked and scoped', () => {
  assert.match(indexHtml, /rel=["']manifest["'][^>]+href=["']\/manifest\.json["']/i);
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === '192x192'));
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === '512x512'));
});
