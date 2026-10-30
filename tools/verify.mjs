#!/usr/bin/env node
/* Validate the case library: schema, clue truth, unique solution, translations.
   Run from the repo root:  node tools/verify.mjs                                  */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const CASES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/cases.json'), 'utf8'));
const I18N = require(path.join(ROOT, 'src/i18n.js'));
const LOOKS = require(path.join(ROOT, 'src/looks.js'));
const { LANGS, ROOMS, OBJL, ORD, CLUE, CASEL, UI } = I18N;

const OCC = new Set(['sedia', 'divano', 'tappeto', 'letto']);
const OBJ_NAMES = new Set(Object.keys(OBJL.it));
const TYPES = new Set(['room', 'notroom', 'on', 'onlyon', 'by', 'row', 'col', 'corner', 'edge', 'alone', 'with', 'dir']);
const LANGS_LEARN = Object.keys(LANGS); // it,en,de,fr,es
let errors = 0, warnings = 0;
const fail = (c, msg) => { errors++; console.log(`  ✗ [${c || '?'}] ${msg}`); };
const warn = (c, msg) => { warnings++; console.log(`  ! [${c || '?'}] ${msg}`); };

function build(cs) {
  const N = cs.size;
  const objs = new Map(Object.entries(cs.objs).map(([k, v]) => [k, v]));
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
  const { N, objs } = ctx;
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
        usedR.add(r); usedC.add(c);
        rec(k + 1);
        usedR.delete(r); usedC.delete(c);
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
  for (const p of cs.people) if (!LOOKS[p[0]]) warn(id, `no LOOKS entry for ${p[0]} (fallback art)`);

  const ctx = build(cs);
  // rooms
  const letters = new Set(cs.grid.join(''));
  for (const k of letters) {
    const r = cs.rooms[k];
    if (!r) { fail(id, `grid room '${k}' missing from rooms`); continue; }
    if (!r.it || !ROOMS[r.it]) fail(id, `room '${k}' it='${r.it}' not in i18n ROOMS`);
    if (!r.hu || !r.huIn) fail(id, `room '${k}' missing hu/huIn`);
    if (r.it && ROOMS[r.it]) for (const l of LANGS_LEARN) if (!ROOMS[r.it][l] || !ROOMS[r.it][l][1]) fail(id, `room '${r.it}' missing ${l}`);
  }
  for (const k of Object.keys(cs.rooms)) if (!letters.has(k)) fail(id, `room '${k}' declared but unused in grid`);
  // objects
  for (const [key, o] of Object.entries(cs.objs)) {
    const [r, c] = key.split(',').map(Number);
    if (!(r >= 0 && r < cs.size && c >= 0 && c < cs.size)) fail(id, `object out of bounds: ${key}`);
    if (!OBJ_NAMES.has(o)) fail(id, `unknown object '${o}' at ${key}`);
  }
  // solution
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
  // clues
  const byPerson = new Map();
  for (const [k, cl] of cs.clues.entries()) {
    if (!Number.isInteger(cl.p) || cl.p < 0 || cl.p >= victim) fail(id, `clues[${k}] p must be a suspect 0..${victim - 1}`);
    if (!TYPES.has(cl.t)) fail(id, `clues[${k}] unknown type '${cl.t}'`);
    if (['row', 'col'].includes(cl.t) && !(Number.isInteger(cl.v) && cl.v >= 0 && cl.v < cs.size)) fail(id, `clues[${k}] ${cl.t} v out of range`);
    if (['room', 'notroom'].includes(cl.t) && !cs.rooms[cl.v]) fail(id, `clues[${k}] unknown room '${cl.v}'`);
    if (['on', 'onlyon', 'by'].includes(cl.t) && !OBJ_NAMES.has(cl.v)) fail(id, `clues[${k}] unknown object '${cl.v}'`);
    if (['with', 'dir'].includes(cl.t) && !(Number.isInteger(cl.v) && cl.v >= 0 && cl.v < victim)) fail(id, `clues[${k}] target person out of range`);
    if (cl.t === 'dir' && !['n', 's', 'e', 'o'].includes(cl.d)) fail(id, `clues[${k}] bad direction '${cl.d}'`);
    if (!byPerson.has(cl.p)) byPerson.set(cl.p, []);
    byPerson.get(cl.p).push(cl);
    // truth
    const pos = cs.solution;
    if (['room', 'notroom', 'on', 'onlyon', 'by', 'row', 'col', 'corner', 'edge'].includes(cl.t)) {
      if (!unaryOk(cs, cl, pos[cl.p], ctx)) fail(id, `clue ${JSON.stringify(cl)} is false on the solution`);
    }
  }
  for (let i = 0; i < victim; i++) if (!byPerson.has(i)) fail(id, `suspect ${cs.people[i][0]} has no clue`);

  // global clue truth
  if (!globalOk(cs, cs.clues, cs.solution, ctx, victim)) fail(id, 'victim is not alone with exactly one person on the solution');
  const vr = room(cs, cs.solution[victim]);
  const inRoom = cs.people.map((p, i) => i).filter(i => i !== victim && room(cs, cs.solution[i]) === vr);
  if (inRoom.length !== 1) fail(id, `victim room has ${inRoom.length} others, expected 1`);
  if (inRoom[0] !== cs.killer) fail(id, `killer index ${cs.killer} (${cs.people[cs.killer]?.[0]}) != the person in the victim's room (${inRoom.map(i => cs.people[i][0]).join(', ')})`);

  // unique solution
  const sols = countSolutions(cs, 2);
  if (sols.length !== 1) fail(id, `case has ${sols.length === 0 ? 'no' : 'more than one'} solution`);
  else if (!same(sols[0], cs.solution)) fail(id, 'stored solution differs from the unique solution');

  // translations
  if (!cs.title || !cs.flav || !cs.flavHu) fail(id, 'missing it title/flav/flavHu');
  for (const l of LANGS_LEARN.filter(l => l !== 'it')) {
    const e = CASEL[id]?.[l];
    if (!e || !e[0] || !e[1]) fail(id, `missing ${l} title/flavour`);
  }
  // clue text in every language
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

// UI strings completeness
console.log('\nUI strings');
const uiKeys = Object.keys(UI.it);
for (const l of LANGS_LEARN) {
  if (!UI[l]) { fail('ui', `missing UI language ${l}`); continue; }
  for (const k of uiKeys) if (UI[l][k] === undefined) fail('ui', `missing UI.${l}.${k}`);
}
for (const l of LANGS_LEARN) {
  const tips = UI[l].tips, rules = UI[l].rules;
  if (!Array.isArray(tips) || tips.length !== 5) fail('ui', `${l}.tips must have 5 entries`);
  if (!Array.isArray(rules) || rules.length !== 5) fail('ui', `${l}.rules must have 5 entries`);
  if (!Array.isArray(UI[l].levels) || UI[l].levels.length !== 5) fail('ui', `${l}.levels must have 5 entries`);
}

console.log(`\n${CASES.length} cases, ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
