import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const appIndex = await readFile(new URL('../src/app-index.ts', import.meta.url), 'utf8');
const viteConfig = await readFile(new URL('../vite.config.ts', import.meta.url), 'utf8');
const manifest = JSON.parse(
  await readFile(new URL('../public/manifest.json', import.meta.url), 'utf8'),
);

test('service worker is registered once through the VitePWA module path', () => {
  const classicScripts = [...indexHtml.matchAll(/<script(?![^>]*type=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join('\n');

  assert.doesNotMatch(classicScripts, /import\.meta/);
  assert.doesNotMatch(indexHtml, /navigator\.serviceWorker\.register/);
  assert.match(appIndex, /from ['"]virtual:pwa-register['"]/);
  assert.match(appIndex, /registerSW\(\{\s*immediate:\s*true\s*\}\)/);
});

test('installability metadata remains explicitly linked and scoped', () => {
  assert.match(indexHtml, /rel=["']manifest["'][^>]+href=["']\/manifest\.json["']/i);
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === '192x192'));
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === '512x512'));
});

test('third-party UI runtime is version-pinned and development does not install a service worker', () => {
  assert.match(indexHtml, /https:\/\/unpkg\.com\/@fluentui\/web-components@2\.5\.14(?:["'/?#])/);
  assert.doesNotMatch(indexHtml, /https:\/\/unpkg\.com\/@fluentui\/web-components["']/);
  assert.doesNotMatch(viteConfig, /devOptions\s*:\s*\{[\s\S]*?enabled\s*:\s*true/);
});
