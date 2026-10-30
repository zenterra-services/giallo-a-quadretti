#!/usr/bin/env node
/* Validate one style pack: schema, clue truth, unique solution, translations,
   vocabulary, cast, art and shared UI.
   Run from the repo root:  node tools/verify.mjs [--pack giallo]              */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  const eq = process.argv.find(a => a.startsWith(name + '='));
  return eq ? eq.split('=').slice(1).join('=') : fallback;
};
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const PACK_ID = arg('--pack', 'giallo');
const PACK_DIR = path.join(ROOT, 'src', 'packs', PACK_ID);
if (!fs.existsSync(path.join(PACK_DIR, 'pack.json'))) {
  console.error(`Unknown pack "${PACK_ID}": ${path.join(PACK_DIR, 'pack.json')} is missing`);
  process.exit(2);
}
const MANIFEST = readJson(path.join(PACK_DIR, 'pack.json'));
const CASES = readJson(path.join(PACK_DIR, 'cases.json'));
const I18N = require(path.join(ROOT, 'src/i18n.js'));
const VOCAB = require(path.join(PACK_DIR, 'vocab.js'));
const CASEL = require(path.join(PACK_DIR, 'casel.js'));
const LOOKS = require(path.join(PACK_DIR, 'looks.js'));
const THEME = require(path.join(PACK_DIR, 'theme.js'));
require(path.join(PACK_DIR, 'art.js'));
const ART = globalThis.GQArt;
const PACK_UI_PATH = path.join(PACK_DIR, 'ui.js');
const PACK_UI = fs.existsSync(PACK_UI_PATH) ? require(PACK_UI_PATH) : {};

const { LANGS, ORD, CLUE } = I18N;
const { ROOMS, OBJL, SIT, OBJ: OBJ_META, HU_ON, HU_BY } = VOCAB;
globalThis.SIT = SIT;
const UI = I18N.UI;
const UI_FOR = lang => {
  const over = PACK_UI[lang] || {};
  return { ...UI[lang], ...over, gl: { ...(UI[lang] && UI[lang].gl), ...(over.gl || {}) } };
};
const LANGS_LEARN = Object.keys(LANGS);
const OCC = new Set(Object.keys(OBJ_META).filter(k => OBJ_META[k].occ));
const OBJ_NAMES = new Set(Object.keys(OBJ_META));
let errors = 0, warnings = 0;
const fail = (c, msg) => { errors++; console.log(`  ✗ [${c || '?'}] ${msg}`); };
const warn = (c, msg) => { warnings++; console.log(`  ! [${c || '?'}] ${msg}`); };

function build(cs) {
  const N = cs.size;
  const objs = new Map(Object.entries(cs.objs));
  const occ = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const o = objs.get(r + ',' + c);
    if (!(o && !OCC.has(o))) occ.push([r, c]);
  }
  return { N, objs, occ };
}
const room = (cs, [r, c]) => cs.grid[r][c];
const neighbours = (N, r, c) => [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
  .filter(([rr, cc]) => rr >= 0 && rr < N && cc >= 0 && cc < N);

function unaryOk(cs, cl, [r, c], ctx) {
  const { N, objs } = ctx;
  switch (cl.t) {
    case 'room': return room(cs, [r, c]) === cl.v;
    case 'notroom': return room(cs, [r, c]) !== cl.v;
    case 'on': case 'onlyon': return objs.get(r + ',' + c) === cl.v;
    case 'by': return neighbours(N, r, c).some(([rr, cc]) =>
      objs.get(rr + ',' + cc) === cl.v && room(cs, [rr, cc]) === room(cs, [r, c]));
    case 'row': return r === cl.v;
    case 'col': return c === cl.v;
    case 'corner': return (r === 0 || r === N - 1) && (c === 0 || c === N - 1);
    case 'edge': return r === 0 || r === N - 1 || c === 0 || c === N - 1;
    default: return true;
  }
}
function globalOk(cs, clues, pos, ctx, victim) {
  const { objs } = ctx;
  const vr = room(cs, pos[victim]);
  let others = 0;
  for (let i = 0; i < pos.length; i++) if (i !== victim && room(cs, pos[i]) === vr) others++;
  if (others !== 1) return false;
  for (const { p: i, ...cl } of clues) {
    const pt = pos[i];
    if (cl.t === 'onlyon') {
      for (let j = 0; j < pos.length; j++) if (j !== i && objs.get(pos[j][0] + ',' + pos[j][1]) === cl.v) return false;
    } else if (cl.t === 'alone') {
      for (let j = 0; j < pos.length; j++) if (j !== i && room(cs, pos[j]) === room(cs, pt)) return false;
    } else if (cl.t === 'with') {
      if (room(cs, pos[cl.v]) !== room(cs, pt)) return false;
    } else if (cl.t === 'dir') {
      const q = pos[cl.v];
      if (cl.d === 'n' && !(pt[0] < q[0])) return false;
      if (cl.d === 's' && !(pt[0] > q[0])) return false;
      if (cl.d === 'e' && !(pt[1] > q[1])) return false;
      if (cl.d === 'o' && !(pt[1] < q[1])) return false;
    }
  }
  return true;
}
function partialOk(cs, clues, pos, ctx) {
  for (const { p: j, ...cl } of clues) {
    if (cl.t === 'alone' && pos[j]) {
      for (let k = 0; k < pos.length; k++) if (k !== j && pos[k] && room(cs, pos[k]) === room(cs, pos[j])) return false;
    } else if (cl.t === 'onlyon' && pos[j]) {
      for (let k = 0; k < pos.length; k++) if (k !== j && pos[k] &&
        ctx.objs.get(pos[k][0] + ',' + pos[k][1]) === cl.v) return false;
    } else if ((cl.t === 'with' || cl.t === 'dir') && pos[j] && pos[cl.v]) {
      const p = pos[j], q = pos[cl.v];
      if (cl.t === 'with' && room(cs, p) !== room(cs, q)) return false;
      if (cl.t === 'dir') {
        if (cl.d === 'n' && !(p[0] < q[0])) return false;
        if (cl.d === 's' && !(p[0] > q[0])) return false;
        if (cl.d === 'e' && !(p[1] > q[1])) return false;
        if (cl.d === 'o' && !(p[1] < q[1])) return false;
      }
    }
  }
  return true;
}
function countSolutions(cs, limit = 2) {
  const ctx = build(cs);
  const P = cs.people.length, victim = P - 1;
  const domain = [];
  for (let i = 0; i < P; i++) {
    const own = cs.clues.filter(c => c.p === i);
    domain.push(ctx.occ.filter(cell => own.every(cl => unaryOk(cs, cl, cell, ctx))));
  }
  const order = [...Array(P - 1).keys()].sort((a, b) => domain[a].length - domain[b].length).concat(victim);
  const pos = new Array(P).fill(null);
  const sols = [];
  const usedR = new Set(), usedC = new Set();
  const rec = (k) => {
    if (sols.length >= limit) return;
    if (k === P) {
      if (globalOk(cs, cs.clues, pos, ctx, victim)) sols.push(pos.map(p => p.slice()));
      return;
    }
    const i = order[k];
    for (const cell of domain[i]) {
      const [r, c] = cell;
      if (usedR.has(r) || usedC.has(c)) continue;
      pos[i] = cell;
      if (partialOk(cs, cs.clues, pos, ctx)) {
        usedR.add(r); usedC.add(c); rec(k + 1); usedR.delete(r); usedC.delete(c);
      }
    }
    pos[i] = null;
  };
  rec(0);
  return sols;
}
const same = (a, b) => a.length === b.length && a.every((p, i) => p[0] === b[i][0] && p[1] === b[i][1]);

function clueText(cs, cl, lang) {
  const N = cs.size;
  const g = cs.people[cl.p][1];
  const who = i => cs.people[i][0];
  const a = {};
  if (cl.t === 'room' || cl.t === 'notroom') a.inr = ROOMS[cs.rooms[cl.v].it][lang][1];
  if (cl.t === 'on' || cl.t === 'onlyon' || cl.t === 'by') { a.o = cl.v; a.on = OBJL[lang][cl.v][1]; }
  if (cl.t === 'row' || cl.t === 'col') { a.last = cl.v === N - 1; a.ord = ORD[lang].f[cl.v]; }
  if (cl.t === 'with' || cl.t === 'dir') { a.who = who(cl.v); a.d = cl.d; }
  return CLUE[lang](cl.t, g, a);
}

/* ---------- pack manifest and assets ---------- */
console.log(`\nPACK ${PACK_ID}`);
if (MANIFEST.id !== PACK_ID) fail('pack', `manifest id "${MANIFEST.id}" != folder "${PACK_ID}"`);
if (!MANIFEST.name) fail('pack', 'missing name');
if (!MANIFEST.defaultLang || !LANGS[MANIFEST.defaultLang]) fail('pack', `defaultLang "${MANIFEST.defaultLang}" is not in LANGS`);
if (!fs.existsSync(path.join(PACK_DIR, 'icon.svg'))) fail('pack', 'icon.svg is missing');
else if (!fs.readFileSync(path.join(PACK_DIR, 'icon.svg'), 'utf8').trim().startsWith('<svg')) fail('pack', 'icon.svg is not an SVG');
for (const k of ['BGS', 'PCOL']) if (!Array.isArray(THEME[k]) || !THEME[k].length) fail('pack', `theme.js ${k} is missing`);
if (!Array.isArray(THEME.FALLBACK_LOOK)) fail('pack', 'theme.js FALLBACK_LOOK is missing');
if (!ART) fail('pack', 'art.js did not publish window.GQArt');
else for (const fn of ['portrait', 'object', 'pigeon', 'stamp']) if (typeof ART[fn] !== 'function') fail('pack', `art.${fn}() is missing`);
if (ART) {
  for (const [fn, out] of [['pigeon', ART.pigeon && ART.pigeon()], ['stamp', ART.stamp && ART.stamp('TEST', 'red')]]) {
    if (!out || !out.startsWith('<svg')) fail('art', `art.${fn}() returned no SVG`);
  }
}
if (!Object.keys(LOOKS).length) fail('pack', 'LOOKS is empty');
if (!Object.keys(CASEL).length) fail('pack', 'CASEL is empty');

const metaKeys = new Set(Object.keys(OBJ_META));
const labelKeys = new Set(Object.keys(OBJL.it || {}));
for (const k of metaKeys) if (!labelKeys.has(k)) fail('vocab', `OBJ.${k} has no OBJL labels`);
for (const k of labelKeys) if (!metaKeys.has(k)) fail('vocab', `OBJL.${k} has no OBJ metadata`);
for (const k of Object.keys(SIT || {})) {
  if (!metaKeys.has(k)) fail('vocab', `SIT.${k} is not an object`);
  else if (!OBJ_META[k].occ) fail('vocab', `SIT.${k} is not occupiable`);
}
for (const k of metaKeys) {
  if (!OBJ_META[k].hu) fail('vocab', `OBJ.${k} has no Hungarian name`);
  if (OBJ_META[k].occ && !HU_ON[k]) fail('vocab', `OBJ.${k} is occupiable but HU_ON is missing`);
  if (!OBJ_META[k].occ && !HU_BY[k]) fail('vocab', `OBJ.${k} is blocked but HU_BY is missing`);
  for (const l of LANGS_LEARN) {
    const e = OBJL[l] && OBJL[l][k];
    if (!e || !e[0] || !e[1]) fail('vocab', `OBJL.${l}.${k} is missing`);
  }
  if (ART && ART.object) {
    const svg = ART.object(k);
    if (!svg || !svg.startsWith('<svg')) fail('art', `art.object('${k}') returned no SVG`);
  }
}
for (const [name, roomDef] of Object.entries(ROOMS)) {
  if (!roomDef.it) fail('vocab', `ROOMS['${name}'] has no it label`);
  for (const l of LANGS_LEARN) {
    const e = roomDef[l];
    if (!e || !e[0] || !e[1]) fail('vocab', `ROOMS['${name}'].${l} is missing`);
  }
}

/* ---------- cases ---------- */
const ids = new Set();
for (const cs of CASES) {
  const id = cs.id;
  console.log(`\n${id} (${cs.size}×${cs.size}, level ${cs.level})`);
  if (ids.has(id)) fail(id, 'duplicate case id');
  ids.add(id);
  if (!Number.isInteger(cs.size) || cs.size < 4 || cs.size > 7) fail(id, 'size must be 4..7');
  if (!Array.isArray(cs.grid) || cs.grid.length !== cs.size || cs.grid.some(row => typeof row !== 'string' || row.length !== cs.size)) {
    fail(id, 'grid must be size × size'); continue;
  }
  if (!cs.people.every(p => Array.isArray(p) && p.length === 2 && (p[1] === 'm' || p[1] === 'f'))) fail(id, 'people must be [name, m|f]');
  if (new Set(cs.people.map(p => p[0])).size !== cs.people.length) fail(id, 'duplicate person names');
  if (cs.people.length !== cs.size) warn(id, `people ${cs.people.length} != grid size ${cs.size} (supported but untested)`);
  for (const p of cs.people) {
    if (!LOOKS[p[0]]) fail(id, `no LOOKS entry for ${p[0]}`);
    else if (ART && typeof ART.portrait === 'function') {
      const svg = ART.portrait(LOOKS[p[0]], { crop: 'head', label: p[0] });
      if (!svg || !svg.startsWith('<svg')) fail('art', `art.portrait('${p[0]}') returned no SVG`);
    }
  }

  const ctx = build(cs);
  const letters = new Set(cs.grid.join(''));
  for (const k of letters) {
    const r = cs.rooms[k];
    if (!r) { fail(id, `grid room '${k}' missing from rooms`); continue; }
    if (!r.it || !ROOMS[r.it]) fail(id, `room '${k}' it='${r.it}' not in ROOMS`);
    if (!r.hu || !r.huIn) fail(id, `room '${k}' missing hu/huIn`);
  }
  for (const k of Object.keys(cs.rooms)) if (!letters.has(k)) fail(id, `room '${k}' declared but unused in grid`);
  for (const [key, o] of Object.entries(cs.objs)) {
    const [r, c] = key.split(',').map(Number);
    if (!(r >= 0 && r < cs.size && c >= 0 && c < cs.size)) fail(id, `object out of bounds: ${key}`);
    if (!OBJ_NAMES.has(o)) fail(id, `unknown object '${o}' at ${key}`);
  }

  const P = cs.people.length, victim = P - 1;
  if (!Array.isArray(cs.solution) || cs.solution.length !== P) { fail(id, 'solution length != people'); continue; }
  const rows = new Set(), cols = new Set();
  for (const [i, cell] of cs.solution.entries()) {
    if (!Array.isArray(cell) || cell.length !== 2 || !Number.isInteger(cell[0]) || !Number.isInteger(cell[1])) { fail(id, `solution[${i}] invalid`); continue; }
    if (cell[0] < 0 || cell[0] >= cs.size || cell[1] < 0 || cell[1] >= cs.size) fail(id, `solution[${i}] out of bounds`);
    if (rows.has(cell[0]) || cols.has(cell[1])) fail(id, `solution[${i}] shares a row/column`);
    rows.add(cell[0]); cols.add(cell[1]);
    const o = cs.objs[cell[0] + ',' + cell[1]];
    if (o && !OCC.has(o)) fail(id, `solution[${i}] stands on blocked '${o}'`);
  }

  const byPerson = new Map();
  for (const [k, cl] of cs.clues.entries()) {
    if (!Number.isInteger(cl.p) || cl.p < 0 || cl.p >= victim) fail(id, `clues[${k}] p must be a suspect 0..${victim - 1}`);
    if (!['room', 'notroom', 'on', 'onlyon', 'by', 'row', 'col', 'corner', 'edge', 'alone', 'with', 'dir'].includes(cl.t)) fail(id, `clues[${k}] unknown type '${cl.t}'`);
    if (['row', 'col'].includes(cl.t) && !(Number.isInteger(cl.v) && cl.v >= 0 && cl.v < cs.size)) fail(id, `clues[${k}] ${cl.t} v out of range`);
    if (['room', 'notroom'].includes(cl.t) && !cs.rooms[cl.v]) fail(id, `clues[${k}] unknown room '${cl.v}'`);
    if (['on', 'onlyon', 'by'].includes(cl.t) && !OBJ_NAMES.has(cl.v)) fail(id, `clues[${k}] unknown object '${cl.v}'`);
    if (['with', 'dir'].includes(cl.t) && !(Number.isInteger(cl.v) && cl.v >= 0 && cl.v < victim)) fail(id, `clues[${k}] target person out of range`);
    if (cl.t === 'dir' && !['n', 's', 'e', 'o'].includes(cl.d)) fail(id, `clues[${k}] bad direction '${cl.d}'`);
    if (!byPerson.has(cl.p)) byPerson.set(cl.p, []);
    byPerson.get(cl.p).push(cl);
    if (['room', 'notroom', 'on', 'onlyon', 'by', 'row', 'col', 'corner', 'edge'].includes(cl.t)) {
      if (!unaryOk(cs, cl, cs.solution[cl.p], ctx)) fail(id, `clue ${JSON.stringify(cl)} is false on the solution`);
    }
  }
  for (let i = 0; i < victim; i++) if (!byPerson.has(i)) fail(id, `suspect ${cs.people[i][0]} has no clue`);

  if (!globalOk(cs, cs.clues, cs.solution, ctx, victim)) fail(id, 'victim is not alone with exactly one person on the solution');
  const vr = room(cs, cs.solution[victim]);
  const inRoom = cs.people.map((p, i) => i).filter(i => i !== victim && room(cs, cs.solution[i]) === vr);
  if (inRoom.length !== 1) fail(id, `victim room has ${inRoom.length} others, expected 1`);
  if (inRoom[0] !== cs.killer) fail(id, `killer index ${cs.killer} (${cs.people[cs.killer]?.[0]}) != the person in the victim's room (${inRoom.map(i => cs.people[i][0]).join(', ')})`);

  const sols = countSolutions(cs, 2);
  if (sols.length !== 1) fail(id, `case has ${sols.length === 0 ? 'no' : 'more than one'} solution`);
  else if (!same(sols[0], cs.solution)) fail(id, 'stored solution differs from the unique solution');

  if (!cs.title || !cs.flav || !cs.flavHu) fail(id, 'missing it title/flav/flavHu');
  for (const l of LANGS_LEARN.filter(l => l !== 'it')) {
    const e = CASEL[id] && CASEL[id][l];
    if (!e || !e[0] || !e[1]) fail(id, `missing ${l} title/flavour`);
  }
  for (const l of LANGS_LEARN) {
    if (!CLUE[l]) { fail(id, `no CLUE renderer for ${l}`); continue; }
    for (const cl of cs.clues) {
      let s;
      try { s = clueText(cs, cl, l); } catch (e) { fail(id, `clue text crashed for ${l}: ${e.message}`); continue; }
      if (!s || /\bundefined\b/.test(s)) fail(id, `clue text empty/undefined (${l}): ${JSON.stringify(cl)}`);
      const open = (s.match(/⟦/g) || []).length, close = (s.match(/⟧/g) || []).length;
      if (open !== close) fail(id, `unbalanced highlight markers (${l}): ${s}`);
    }
    let vs;
    try { vs = CLUE[l]('victim', cs.people[victim][1], {}); } catch (e) { fail(id, `victim text crashed for ${l}`); }
    if (!vs || /\bundefined\b/.test(vs)) fail(id, `victim text empty (${l})`);
  }
  if (!(cs.level >= 1 && cs.level <= 4)) fail(id, `level ${cs.level} out of range`);
}

/* ---------- shared + pack UI ---------- */
console.log('\nUI strings');
const styleKeys = ['tag', 'eyebrow', 'h1a', 'h1b', 'lead', 'pigeon', 'rules', 'tips'];
for (const l of LANGS_LEARN) {
  if (!UI[l]) { fail('ui', `missing UI language ${l}`); continue; }
  const merged = UI_FOR(l);
  for (const k of Object.keys(UI.it)) if (merged[k] === undefined) fail('ui', `missing UI.${l}.${k}`);
  for (const k of styleKeys) if (merged[k] === undefined) fail('ui', `missing style UI.${l}.${k}`);
  if (!Array.isArray(merged.tips) || merged.tips.length !== 5) fail('ui', `${l}.tips must have 5 entries`);
  if (!Array.isArray(merged.rules) || merged.rules.length !== 5) fail('ui', `${l}.rules must have 5 entries`);
  if (!Array.isArray(merged.levels) || merged.levels.length !== 5) fail('ui', `${l}.levels must have 5 entries`);
  if (!merged.gl || typeof merged.gl !== 'object') fail('ui', `${l}.gl is missing`);
}
for (const l of Object.keys(PACK_UI)) if (!LANGS[l]) fail('ui', `PACK_UI has unknown language ${l}`);

/* ---------- Hungarian helper ---------- */
const hu = fs.existsSync(path.join(PACK_DIR, 'hu.js')) ? require(path.join(PACK_DIR, 'hu.js')) : {};
for (const k of ['ORD_HU', 'HU_TIPS', 'HU_RULES']) if (!Array.isArray(hu[k]) || hu[k].length < 5) fail('hu', `${k} is missing or too short`);

console.log(`\n${CASES.length} cases, ${errors} error(s), ${warnings} warning(s)  (pack: ${PACK_ID})`);
process.exit(errors ? 1 : 0);
