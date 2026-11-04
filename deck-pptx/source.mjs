// Loads an audience exactly the way deck/build.mjs does (same audience.yaml, modules/, overrides, vars,
// length filtering, include/exclude), and returns plain slide objects for any renderer.
// Keep this in step with deck/build.mjs: the parsing rules are the contract in modules/README.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODULES = path.join(ROOT, 'modules');
const AUDIENCES = path.join(ROOT, 'audiences');
export const ASSETS = path.join(ROOT, 'deck', 'assets');

const die = (msg) => { console.error('deck-pptx: ' + msg); process.exit(1); };

function parseFrontMatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) die(`${file}: missing front matter`);
  return { meta: yaml.load(m[1]) || {}, body: text.slice(m[0].length) };
}

function splitSlides(body) {
  const slides = []; let cur = [];
  for (const line of body.split('\n')) {
    if (line.trim() === '---') { slides.push(cur.join('\n')); cur = []; } else cur.push(line);
  }
  slides.push(cur.join('\n'));
  return slides.map(s => s.trim()).filter(Boolean);
}

function parseSlide(raw, file, idx) {
  const d = {};
  raw = raw.replace(/<!--\s*only\s*:\s*([a-z, ]+)\s*-->\n?/, (_, v) => { d.only = v.split(',').map(x => x.trim()).filter(Boolean); return ''; });
  let text = raw.replace(/<!--\s*([a-z-]+)\s*:\s*([\s\S]*?)\s*-->\n?/g, (_, k, v) => { d[k] = v.trim(); return ''; });
  let notes = '';
  const ni = text.search(/^notes:\s*$/m);
  if (ni >= 0) { notes = text.slice(ni).replace(/^notes:\s*$/m, '').trim(); text = text.slice(0, ni); }
  return { id: d.id || `${path.basename(file, '.md')}-${idx + 1}`, layout: d.layout || 'body', eyebrow: d.eyebrow || '', time: d.time || '',
    photo: d.photo || '', credit: d.credit || '', text: text.trim(), notes, file, only: d.only };
}

function filterByLength(text, length) {
  return text.split('\n').filter(line => {
    const m = line.match(/^@((?:full|half|short)(?:,(?:full|half|short))*)\s/);
    return !m || m[1].split(',').includes(length);
  }).map(line => line.replace(/^@(?:full|half|short)(?:,(?:full|half|short))*\s/, '')).join('\n');
}

function substitute(text, vars, file, missing) {
  return text.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (m, k) => {
    if (vars[k] === undefined || vars[k] === null || vars[k] === '') { missing.add(`${k} (${path.basename(file)})`); return m; }
    return String(vars[k]);
  });
}

export function takeTitle(md) {
  const m = md.match(/^(#{1,2})\s+(.+)$/m);
  if (!m) return { title: '', rest: md };
  return { title: m[2].trim(), rest: (md.slice(0, m.index) + md.slice(m.index + m[0].length)).trim() };
}

export function sections(md) {
  const parts = md.split(/^###\s+/m);
  const lead = parts.shift().trim();
  return { lead, items: parts.map(p => {
    const nl = p.indexOf('\n');
    return { head: (nl < 0 ? p : p.slice(0, nl)).trim(), body: nl < 0 ? '' : p.slice(nl + 1).trim() };
  }) };
}

export function resolveAsset(src, audienceDir) {
  for (const base of [audienceDir, ASSETS]) { const p = path.join(base, src); if (fs.existsSync(p)) return p; }
  die(`image not found: ${src}`);
}

export function loadDeck(name) {
  const file = path.join(AUDIENCES, name, 'audience.yaml');
  if (!fs.existsSync(file)) die(`no audiences/${name}/audience.yaml`);
  const a = yaml.load(fs.readFileSync(file, 'utf8'));
  const master = name === 'master' ? {} : yaml.load(fs.readFileSync(path.join(AUDIENCES, 'master', 'audience.yaml'), 'utf8'));
  a.vars = { ...(master.vars || {}), ...(a.vars || {}) };
  for (const k of ['brand', 'presenter', 'presenter_line', 'footer']) if (a[k] === undefined && master[k] !== undefined) a[k] = master[k];
  if (a.date instanceof Date) a.date = a.date.toISOString().slice(0, 10);
  a.name = name; a.dir = path.join(AUDIENCES, name);
  const length = a.length || 'full';
  const vars = { ...a.vars, title: a.title, subtitle: a.subtitle || '', eyebrow: a.eyebrow || '', date: a.date || '', duration: a.duration_minutes || '' };
  const missing = new Set();
  const modules = []; const slides = [];
  let clock = 0;
  for (const m of a.modules || []) {
    const ref = typeof m === 'string' ? { id: m } : m;
    const mfile = ref.override ? path.join(a.dir, ref.override) : path.join(MODULES, ref.id + '.md');
    if (!fs.existsSync(mfile)) die(`${name}: module not found: ${mfile}`);
    const { meta, body } = parseFrontMatter(fs.readFileSync(mfile, 'utf8'), mfile);
    const minutes = Number(ref.minutes ?? (meta.minutes && (meta.minutes[length] ?? meta.minutes.full)) ?? 0) || 0;
    let list = splitSlides(filterByLength(substitute(body, vars, mfile, missing), length)).map((raw, i) => parseSlide(raw, mfile, i));
    list = list.filter(s => !s.only || s.only.includes(length));
    if (ref.include) list = list.filter(s => ref.include.includes(s.id));
    if (ref.exclude) list = list.filter(s => !ref.exclude.includes(s.id));
    const mod = { id: ref.id, title: meta.title, minutes, start: clock, end: clock + minutes, slides: list.length,
      kind: list.some(s => /^demo/.test(s.id)) ? 'demo' : 'talk' };
    clock += minutes;
    modules.push(mod);
    for (const s of list) { const { title, rest } = takeTitle(s.text); slides.push({ ...s, title, rest, module: mod }); }
  }
  if (missing.size) die(`${name}: unresolved variables: ${[...missing].join(', ')}`);
  return { audience: a, modules, slides, total: clock };
}
