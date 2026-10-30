#!/usr/bin/env node
/* Smoke test: serves site/ and drives a real browser through the core flows.
   Usage:  npm install && npx playwright install chromium && npm run smoke
   Skips with a hint when playwright is not installed. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

let chromium;
try { ({ chromium } = await import('playwright')); }
catch {
  console.log('smoke: playwright not installed — run: npm install && npx playwright install chromium');
  process.exit(2);
}

const ROOT = normalize(join(fileURLToPath(import.meta.url), '..', '..'));
const SITE = join(ROOT, 'site');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = normalize(join(SITE, p));
    if (!f.startsWith(SITE) || !existsSync(f)) { res.writeHead(404); return res.end('nf'); }
    res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
    res.end(await readFile(f));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

let passed = 0, failed = 0;
const ok = (name, cond) => { if (cond) { passed++; console.log('  ok  ' + name); } else { failed++; console.log('FAIL  ' + name); } };

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
page.on('pageerror', e => { failed++; console.log('FAIL  pageerror: ' + e.message); });

await page.goto(BASE + '/giallo/?net=local');

/* hub */
ok('hub shows 16 case cards', await page.evaluate(() => document.querySelectorAll('.case').length) === 16);
ok('HU helper off by default in giallo', await page.evaluate(() =>
  ![...document.querySelectorAll('.section-h')].some(e => e.textContent.includes('szószedet'))));

/* solo: play case 1 through the real UI */
await page.click('.case');
await page.waitForSelector('.cell');
ok('case opens with 16 cells', await page.evaluate(() => document.querySelectorAll('.cell').length) === 16);
const sol = await page.evaluate(() => S.cs.solution);
for (let i = 0; i < sol.length; i++) {
  await page.evaluate(i => { S.tool = i; render(); }, i);
  await page.click(`.cell[data-r="${sol[i][0]}"][data-c="${sol[i][1]}"]`);
}
ok('all suspects placed', await page.evaluate(() => Object.keys(S.place).length) === sol.length);
await page.click('button:has-text("Controlla")');
ok('check leads to accuse phase', await page.evaluate(() => S.phase) === 'accuse');
const wrong = await page.evaluate(() => (S.cs.killer + 1) % (S.cs.people.length - 1));
await page.evaluate(w => accuse(w), wrong);
ok('wrong accusation stays in accuse phase', await page.evaluate(() => S.phase) === 'accuse');
await page.evaluate(() => accuse(S.cs.killer));
await page.waitForSelector('.modal');
ok('win modal shown, case recorded solved', await page.evaluate(() => S.phase === 'done' && !!S.solved[S.cs.id]));
await page.keyboard.press('Escape');

/* persistence */
await page.reload();
ok('solved record survives reload', await page.evaluate(() => Object.keys(S.solved).length) === 1);

/* undo + hint on a fresh case */
await page.evaluate(() => startCase(1));
await page.evaluate(() => { S.tool = 0; render(); });
const c0 = await page.evaluate(() => S.cs.solution[0]);
await page.click(`.cell[data-r="${c0[0]}"][data-c="${c0[1]}"]`);
await page.click('button:has-text("Annulla")');
ok('undo removes the placement', await page.evaluate(() => Object.keys(S.place).length) === 0);
await page.click('button:has-text("Aiutino")');
ok('hint places a suspect correctly', await page.evaluate(() => Object.keys(S.place).length === 1 && S.hints === 1));

/* review notebook */
await page.evaluate(() => showReview(CASES[0]));
await page.waitForSelector('.reviewbox');
ok('review notebook opens with per-suspect HU toggles', await page.evaluate(() => document.querySelectorAll('.reviewbox .hubtn').length > 0));
await page.click('.reviewbox .hubtn');
ok('HU toggle reveals the Hungarian clue', await page.evaluate(() => !!document.querySelector('.reviewbox .revclue .hu')));
await page.keyboard.press('Escape');

/* co-op over BroadcastChannel: two pages, one room */
await page.evaluate(() => goHub());
await page.fill('#coop-name', 'Host');
await page.click('button:has-text("Crea una stanza")');
await page.waitForTimeout(400);
const code = await page.evaluate(() => S.coop && S.coop.code);
ok('room created with 4-letter code', /^[A-Z]{4}$/.test(code || ''));
const p2 = await page.context().newPage(); // same context: BroadcastChannel is per-context, like real tabs
await p2.goto(BASE + '/giallo/?net=local');
await p2.fill('#coop-name', 'Guest');
await p2.fill('#coop-code', code);
await p2.click('button:has-text("Entra")');
try {
  await page.waitForFunction(() => S.coop && S.coop.peers.length === 2, null, { timeout: 5000 });
  await p2.waitForFunction(() => S.coop && S.coop.peers.length === 2, null, { timeout: 5000 });
} catch (e) {}
ok('both pages see two detectives', await page.evaluate(() => S.coop.peers.length) === 2 && await p2.evaluate(() => S.coop.peers.length) === 2);
await page.evaluate(() => chooseCase(0));
await p2.waitForTimeout(700);
ok('guest follows host into the case', await p2.evaluate(() => S.view === 'case' && S.cs && S.cs.id === 'cucina-nonna'));
ok('clue ownership locks some cards', await p2.evaluate(() => document.querySelectorAll('.card.locked').length > 0));
ok('guest has a share button', await p2.evaluate(() => document.querySelectorAll('.sharebtn').length > 0));
await p2.click('.sharebtn');
await page.waitForTimeout(700);
ok('shared clue reaches the host', await page.evaluate(() => S.coop.st.shared.length) === 1);
await p2.close();

/* offline notice: no net param, Supabase unreachable-ish (no config on root-served page without config.js? config exists, so simulate by route) */
const p3 = await browser.newPage();
await p3.route('**/@supabase/**', r => r.abort());
await p3.goto(BASE + '/giallo/');
await p3.waitForTimeout(1500);
ok('co-op section always visible on hub', await p3.evaluate(() => !!document.querySelector('.coopbox')));
ok('offline notice shown when Supabase CDN fails', await p3.evaluate(() => {
  const box = document.querySelector('.coopbox');
  return !!box && !document.querySelector('#coop-name') && box.textContent.length > 0;
}));
await p3.close();

/* mobile layout */
const mob = await browser.newPage({ viewport: { width: 390, height: 800 } });
await mob.goto(BASE + '/giallo/?net=local');
await mob.click('.case');
await mob.waitForSelector('.strip');
ok('phone layout: strip + carousel + drawers', await mob.evaluate(() =>
  !!document.querySelector('.strip') && !!document.querySelector('.carousel') && document.querySelectorAll('.drawer').length === 3));
await mob.close();

/* rejto pack boots */
const rp = await browser.newPage();
await rp.goto(BASE + '/rejto/?net=local');
ok('rejto pack loads 5 cases with HU helper on', await rp.evaluate(() => CASES.length === 5 && S.huAll));
await rp.close();

await browser.close();
server.close();
console.log(`\nsmoke: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
