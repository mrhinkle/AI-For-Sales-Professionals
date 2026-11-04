#!/usr/bin/env node
// Render one audience to an editable PowerPoint in the standard class-deck style
// (the vibe-coding class: white slides, block-header eyebrows with minutes, accent-bar cards,
// navy prompt cards, a section strip in the footer, page N / TOTAL), with a PDF beside it.
//
//   node deck-pptx/build.mjs <audience> [--brand aie|ata] [--no-pdf]
//
// Content comes from the same audience.yaml + modules/ + overrides the HTML build reads (see source.mjs).
// Brand is audience.yaml `pptx.brand`, then --brand, default aie. Section strip labels: `pptx.strip`.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { marked } from 'marked';
import { loadDeck, sections, resolveAsset, ROOT } from './source.mjs';

const require = createRequire(import.meta.url);
const pptxgen = require('pptxgenjs');
const sizeOf = require('image-size');
const HERE = path.join(ROOT, 'deck-pptx');
const KIT = path.join(HERE, 'assets');

// ---------- brand tokens ----------
const COMMON = { BG: 'FFFFFF', CARD: 'F3F6FB', CARD2: 'E8EEF7', LINE: 'D9E0EA', INK: '0D1219', MUTED: '5B6675', DIM: '7B8594', WHITE: 'FFFFFF' };
const BRANDS = {
  aie: { name: 'The AIE Network', ACCENT: 'F44800', BLUE: '2563EB', DARK: '0A0F1C', NAVY: '0A0F1C',
    logo: 'The_AIE_Network_logo_color.png', logoWhite: 'The_AIE_Network_logo_white.png', logoAspect: 900 / 258, logoH: 0.3, darkBg: null },
  ata: { name: 'All Things AI', ACCENT: 'EF8B39', BLUE: '307FE2', DARK: '121B2B', NAVY: '121B2B',
    logo: 'logo-h.png', logoWhite: 'logo-h-white.png', logoAspect: 600 / 77, logoH: 0.2, darkBg: 'space.jpg' },
};
const SANS = 'Arial', MONO = 'Courier New';
const W = 13.333, H = 7.5, M = 0.7, CW = W - 2 * M;
const TOP = 1.95, BOTTOM = H - 0.95;

// ---------- args ----------
const args = process.argv.slice(2);
const name = args.find(x => !x.startsWith('--')) || 'primer';
const flag = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const deck = loadDeck(name);
const A = deck.audience;
const brandKey = flag('--brand') || (A.pptx && A.pptx.brand) || 'aie';
if (!BRANDS[brandKey]) { console.error(`unknown brand ${brandKey}`); process.exit(1); }
const C = { ...COMMON, ...BRANDS[brandKey] };

// ---------- text helpers ----------
const plain = (md) => runs(md).map(r => r.text).join('');
// Average glyph width as a fraction of the point size (Arial / Liberation Sans, Courier).
const K = { sans: 0.5, bold: 0.55, mono: 0.6 };
function nLines(text, size, w, k = K.sans) {
  const cpl = Math.max(1, Math.floor((w * 72) / (size * k)));
  return String(text).split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / cpl)), 0);
}
const textH = (text, size, w, k = K.sans, lsm = 1.2) => nLines(text, size, w, k) * size * lsm / 72;

// Markdown inline → pptxgenjs text runs. *em* takes the accent color when emColor is set.
function runs(md, base = {}, opt = {}) {
  const out = [];
  const walk = (toks, o) => {
    for (const t of toks || []) {
      if (t.type === 'strong') walk(t.tokens, { ...o, bold: true });
      else if (t.type === 'em') walk(t.tokens, opt.emColor ? { ...o, color: opt.emColor, bold: o.bold } : { ...o, italic: true });
      else if (t.type === 'codespan') out.push({ text: decode(t.text), options: { ...o, fontFace: MONO } });
      else if (t.type === 'link') walk(t.tokens, { ...o, hyperlink: { url: t.href } });
      else if (t.type === 'br') out.push({ text: '', options: { ...o, breakLine: true } });
      else if (t.tokens) walk(t.tokens, o);
      else out.push({ text: decode(t.text ?? t.raw ?? ''), options: { ...o } });
    }
  };
  walk(marked.Lexer.lexInline(String(md || '').replace(/\n/g, ' ')), { ...base });
  return out;
}
const decode = (s) => String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const notesText = (md) => String(md || '').split(/\n{2,}/).map(p => plain(p)).join('\n\n');

// ---------- the deck ----------
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = A.presenter || 'Mark R. Hinkle';
pres.title = A.title;
const TOTAL = deck.slides.length;
const pad2 = (n) => String(n).padStart(2, '0');
const clock = (m) => `${Math.floor(m / 60)}:${pad2(m % 60)}`;

// Section strip: audience pptx.strip maps module id → short label; modules without one aren't on the strip.
const stripMap = (A.pptx && A.pptx.strip) || {};
const STRIP = [...new Set(deck.modules.map(m => stripMap[m.id]).filter(Boolean))];
// Block numbering: opening and close are named, the rest are numbered in order.
let blockN = 0;
for (const m of deck.modules) {
  if (/^00-/.test(m.id)) m.block = 'OPENING';
  else if (/^99-/.test(m.id)) m.block = 'CLOSE';
  else m.block = `BLOCK ${++blockN}`;
}

let n = 0;
function newSlide(o = {}) {
  const s = pres.addSlide();
  n++;
  s._dark = !!o.dark;
  s.background = { color: o.dark ? C.DARK : C.BG };
  if (o.dark && o.photo) s.addImage({ path: o.photo, x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } });
  else if (o.dark && C.darkBg) s.addImage({ path: path.join(KIT, C.darkBg), x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } });
  if (o.dark && o.photo) s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.DARK, transparency: 22 }, line: { color: C.DARK, width: 0 } });
  if (!o.noFooter) footer(s, o.module);
  if (o.notes) s.addNotes(notesText(o.notes));
  return s;
}
function footer(s, mod) {
  const lh = C.logoH, lw = lh * C.logoAspect;
  s.addImage({ path: path.join(KIT, s._dark ? C.logoWhite : C.logo), x: M, y: H - 0.42 - lh, w: lw, h: lh });
  s.addText(`${pad2(n)} / ${pad2(TOTAL)}`, { x: W - M - 1.4, y: H - 0.66, w: 1.4, h: 0.3, fontFace: MONO, fontSize: 9, color: C.DIM, align: 'right', margin: 0 });
  if (!STRIP.length) return;
  const active = mod && stripMap[mod.id];
  const gap = 0.06, x0 = M + lw + 0.5, x1 = W - M - 1.6;
  const w = Math.min(1.0, (x1 - x0 - gap * (STRIP.length - 1)) / STRIP.length);
  const start = x0 + ((x1 - x0) - (STRIP.length * w + gap * (STRIP.length - 1))) / 2;
  STRIP.forEach((lab, i) => {
    const on = lab === active;
    const x = start + i * (w + gap), y = H - 0.66;
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.28, rectRadius: 0.06, fill: { color: on ? C.ACCENT : (s._dark ? C.DARK : C.CARD) }, line: { color: on ? C.ACCENT : (s._dark ? '3A4456' : C.LINE), width: 0.5 } });
    s.addText(lab, { x, y, w, h: 0.28, fontFace: MONO, fontSize: 7, color: on ? C.WHITE : C.DIM, align: 'center', valign: 'middle', margin: 0, bold: on });
  });
}
const ink = (s) => (s._dark ? C.WHITE : C.INK);
function blockHeader(s, mod) {
  const parts = [mod.block];
  if (mod.title.toUpperCase() !== mod.block) parts.push(mod.title.toUpperCase());
  if (mod.minutes) parts.push(`${mod.minutes} MIN`);
  parts.push(mod.kind.toUpperCase());
  s.addText(parts.join('  ·  '), { x: M, y: 0.5, w: CW - 2.2, h: 0.3, fontFace: MONO, fontSize: 10.5, bold: true, color: s._dark ? C.ACCENT : C.BLUE, charSpacing: 2, margin: 0 });
  if (mod.minutes) s.addText(`${clock(mod.start)} – ${clock(mod.end)}`, { x: W - M - 2.2, y: 0.5, w: 2.2, h: 0.3, fontFace: MONO, fontSize: 9.5, color: C.DIM, align: 'right', margin: 0 });
}
function title(s, t, o = {}) {
  const len = plain(t).length;
  const size = o.size || (len > 72 ? 23 : len > 60 ? 25 : len > 48 ? 27 : 30);
  s.addText(runs(t, {}, { emColor: C.ACCENT }), { x: o.x ?? M, y: o.y ?? 0.88, w: o.w ?? CW, h: o.h ?? 0.9, fontFace: SANS, fontSize: size, bold: true, color: ink(s), margin: 0, valign: 'top' });
  return size;
}
function lede(s, t, y) {
  const h = textH(plain(t), 15, CW) + 0.05;
  s.addText(runs(t), { x: M, y, w: CW, h, fontFace: SANS, fontSize: 15, color: C.MUTED, margin: 0, valign: 'top' });
  return y + h + 0.2;
}
function card(s, x, y, w, h, o = {}) {
  s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: o.fill || C.CARD }, line: { color: o.line || C.LINE, width: 0.75 } });
  if (o.accent) s.addShape(pres.ShapeType.rect, { x, y, w: 0.06, h, fill: { color: o.accent }, line: { color: o.accent, width: 0 } });
}
function label(s, t, x, y, w, o = {}) {
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.26, fontFace: MONO, fontSize: o.size || 8.5, bold: true, color: o.color || C.ACCENT, charSpacing: 1.5, margin: 0 });
}
function marker(s, x, y, color) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: 0.14, h: 0.14, fill: { color: s._dark ? C.DARK : C.BG }, line: { color: color || C.ACCENT, width: 1.75 } });
}
function promptCard(s, txt, x, y, w, h, o = {}) {
  s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: C.NAVY }, line: { color: C.ACCENT, width: 1 } });
  s.addText(o.label || 'TYPE THIS, VERBATIM', { x: x + 0.2, y: y + 0.14, w: w - 0.4, h: 0.25, fontFace: MONO, fontSize: 8, bold: true, color: C.ACCENT, charSpacing: 1.5, margin: 0 });
  s.addText(txt, { x: x + 0.2, y: y + 0.45, w: w - 0.4, h: h - 0.55, fontFace: MONO, fontSize: o.size || 11, color: 'E6EBF2', margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
}
function quoteCard(s, q, who, x, y, w, h) {
  card(s, x, y, w, h, { fill: C.CARD, line: C.ACCENT });
  s.addText('“', { x: x + 0.25, y: y + 0.02, w: 0.8, h: 0.8, fontFace: 'Georgia', fontSize: 54, color: C.ACCENT, margin: 0 });
  s.addText(runs(q), { x: x + 0.6, y: y + 0.45, w: w - 1.0, h: h - (who ? 0.95 : 0.6), fontFace: SANS, fontSize: 18, color: C.INK, margin: 0, valign: 'middle' });
  if (who) s.addText(plain(who), { x: x + 0.6, y: y + h - 0.5, w: w - 1.0, h: 0.3, fontFace: MONO, fontSize: 10, color: C.DIM, margin: 0 });
}
function table(s, rows, x, y, colW, o = {}) {
  const data = rows.map((r, ri) => r.map((c, ci) => ({ text: String(c), options: {
    fontFace: ri === 0 || (o.monoCols || []).includes(ci) ? MONO : SANS, fontSize: ri === 0 ? (o.hsize || 8.5) : (o.size || 11),
    bold: ri === 0 || (o.boldCols || []).includes(ci), color: ri === 0 ? C.WHITE : (ci === 0 ? C.INK : C.MUTED),
    fill: { color: ri === 0 ? C.BLUE : (ri % 2 ? C.CARD : C.WHITE) }, valign: 'middle', margin: [3, 6, 3, 6], charSpacing: ri === 0 ? 1.2 : 0 } })));
  s.addTable(data, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, border: { type: 'solid', color: C.LINE, pt: 0.5 }, rowH: o.rowH || 0.4, autoPage: false });
}
function image(s, file, box, o = {}) {
  const { width, height } = sizeOf(file);
  let w = box.w, h = w * height / width;
  if (h > box.h) { h = box.h; w = h * width / height; }
  const x = o.align === 'right' ? box.x + box.w - w : o.align === 'left' ? box.x : box.x + (box.w - w) / 2;
  s.addImage({ path: file, x, y: box.y, w, h });
  if (o.frame !== false) s.addShape(pres.ShapeType.rect, { x, y: box.y, w, h, fill: { type: 'none' }, line: { color: C.LINE, width: 0.75 } });
  if (o.caption) s.addText(o.caption.toUpperCase(), { x, y: box.y + h + 0.08, w, h: 0.25, fontFace: MONO, fontSize: 8, color: C.DIM, charSpacing: 0.5, margin: 0 });
  return { x, y: box.y, w, h };
}
// Bullets as marker rows. spread: distribute from box.y to box.y+box.h (first at top, last at the bottom edge).
function bulletRows(s, items, box, o = {}) {
  let size = o.size || 16;
  const tw = box.w - 0.38;
  let hs, total;
  for (;;) {
    hs = items.map(t => textH(plain(t), size, tw) + 0.06);
    total = hs.reduce((a, b) => a + b, 0) + (items.length - 1) * 0.3;
    if (total <= box.h || size <= 11) break;
    size -= 1;
  }
  const gap = o.spread && items.length > 1 ? (box.h - hs.reduce((a, b) => a + b, 0)) / (items.length - 1) : 0.3;
  let y = box.y;
  items.forEach((t, i) => {
    marker(s, box.x, y + size / 72 * 0.32);
    s.addText(runs(t), { x: box.x + 0.38, y, w: tw, h: hs[i], fontFace: SANS, fontSize: size, color: ink(s), margin: 0, valign: 'top' });
    y += hs[i];
    if (i < items.length - 1) {
      s.addShape(pres.ShapeType.line, { x: box.x, y: y + gap / 2, w: box.w, h: 0, line: { color: C.LINE, width: 0.75 } });
      y += gap;
    }
  });
  return { bottom: o.spread ? box.y + box.h : y, size };
}

// Markdown blocks (paragraphs, lists, prompt code, quotes, tables, images) stacked in a box, shrunk to fit.
function blocks(s, md, box, audienceDir) {
  const toks = marked.lexer(md || '').filter(t => t.type !== 'space');
  for (const scale of [1, 0.9, 0.8, 0.7]) {
    const plan = planBlocks(toks, box, scale, audienceDir);
    if (plan.h <= box.h || scale === 0.7) { drawPlan(s, plan, box, audienceDir); return box.y + plan.h; }
  }
}
function planBlocks(toks, box, k, audienceDir) {
  const items = []; let h = 0;
  const gap = 0.2 * k;
  for (const t of toks) {
    let it;
    if (t.type === 'paragraph') {
      const img = (t.tokens || []).find(x => x.type === 'image');
      const onlyStrong = (t.tokens || []).length === 1 && t.tokens[0].type === 'strong';
      if (img) it = { kind: 'image', src: img.href, alt: img.text, h: Math.min(box.h - h, 4.4) };
      else if (onlyStrong) it = { kind: 'label', text: plain(t.text), h: 0.38 };
      else { const size = 15 * k; it = { kind: 'para', md: t.text, size, h: textH(plain(t.text), size, box.w) + 0.04 }; }
    } else if (t.type === 'list') {
      const size = 16 * k; const tw = box.w - 0.38;
      const hs = t.items.map(i => textH(plain(i.text), size, tw) + 0.06);
      it = { kind: 'list', items: t.items.map(i => i.text), size, h: hs.reduce((a, b) => a + b, 0) + (t.items.length - 1) * 0.26 * k };
    } else if (t.type === 'code') {
      const size = 11 * k;
      it = { kind: 'code', lang: t.lang, text: t.text, size, h: 0.75 + textH(t.text, size, box.w - 0.4, K.mono, 1.42) };
    } else if (t.type === 'blockquote') {
      const ps = (t.tokens || []).filter(x => x.type === 'paragraph');
      it = { kind: 'quote', q: ps[0] ? ps[0].text : t.text, who: ps[1] ? ps[1].text : '', h: Math.max(1.8, textH(plain(ps[0] ? ps[0].text : t.text), 18, box.w - 1.0) + 1.1) };
    } else if (t.type === 'table') {
      const rows = [t.header.map(c => plain(c.text)), ...t.rows.map(r => r.map(c => plain(c.text)))];
      it = { kind: 'table', rows, h: rows.length * 0.4 };
    } else if (t.type === 'heading') {
      const size = 17 * k; it = { kind: 'para', md: `**${t.text}**`, size, h: textH(t.text, size, box.w, K.bold) };
    } else continue;
    items.push(it); h += it.h + gap;
  }
  return { items, h: Math.max(0, h - gap), k, gap };
}
function drawPlan(s, plan, box, audienceDir) {
  let y = box.y;
  for (const it of plan.items) {
    if (it.kind === 'para') s.addText(runs(it.md, {}, { emColor: C.ACCENT }), { x: box.x, y, w: box.w, h: it.h, fontFace: SANS, fontSize: it.size, color: s._dark ? 'D6DEEA' : C.MUTED, margin: 0, valign: 'top' });
    else if (it.kind === 'label') {
      label(s, it.text, box.x, y + 0.02, box.w, { size: 9 });
      s.addShape(pres.ShapeType.line, { x: box.x, y: y + 0.32, w: box.w, h: 0, line: { color: C.INK, width: 0.75 } });
    } else if (it.kind === 'list') bulletRows(s, it.items, { x: box.x, y, w: box.w, h: it.h }, { size: it.size });
    else if (it.kind === 'code') promptCard(s, it.text, box.x, y, box.w, it.h, { size: it.size, label: it.lang === 'prompt' || !it.lang ? 'TYPE THIS, VERBATIM' : it.lang.toUpperCase() });
    else if (it.kind === 'quote') quoteCard(s, it.q, it.who, box.x, y, box.w, it.h);
    else if (it.kind === 'table') { const cw = box.w / it.rows[0].length; table(s, it.rows, box.x, y, it.rows[0].map(() => cw)); }
    else if (it.kind === 'image') {
      const photo = /^photo:/i.test(it.alt);
      image(s, resolveAsset(it.src, audienceDir), { x: box.x, y, w: box.w, h: it.h - 0.35 }, { caption: it.alt.replace(/^photo:\s*/i, ''), frame: !photo });
    }
    y += it.h + plan.gap;
  }
}

// ---------- layouts ----------
const L = {};
L.title = (sl) => {
  const s = newSlide({ noFooter: true, notes: sl.notes });
  const lh = C.logoH * 2.1;
  s.addImage({ path: path.join(KIT, C.logo), x: M, y: 0.6, w: lh * C.logoAspect, h: lh });
  if (sl.eyebrow) s.addText('// ' + sl.eyebrow.toUpperCase(), { x: M, y: 2.25, w: CW, h: 0.32, fontFace: MONO, fontSize: 12, bold: true, color: C.BLUE, charSpacing: 2, margin: 0 });
  s.addText(runs(sl.title, {}, { emColor: C.ACCENT }), { x: M, y: 2.65, w: CW, h: 1.05, fontFace: SANS, fontSize: 50, bold: true, color: C.INK, margin: 0, valign: 'top' });
  if (sl.rest) s.addText(runs(sl.rest), { x: M, y: 3.8, w: 10.6, h: 1.0, fontFace: SANS, fontSize: 20, color: C.MUTED, margin: 0, valign: 'top' });
  s.addShape(pres.ShapeType.rect, { x: M, y: 5.45, w: 1.1, h: 0.06, fill: { color: C.ACCENT }, line: { color: C.ACCENT, width: 0 } });
  s.addText(A.presenter || 'Mark R. Hinkle', { x: M, y: 5.7, w: CW, h: 0.36, fontFace: SANS, fontSize: 17, bold: true, color: C.INK, margin: 0 });
  if (A.presenter_line) s.addText(A.presenter_line, { x: M, y: 6.08, w: CW, h: 0.32, fontFace: SANS, fontSize: 13, color: C.MUTED, margin: 0 });
  if (A.date) {
    const d = new Date(A.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    s.addText(d.toUpperCase(), { x: W - M - 4, y: 6.12, w: 4, h: 0.3, fontFace: MONO, fontSize: 9.5, color: C.DIM, align: 'right', margin: 0, charSpacing: 1 });
  }
};
L.divider = (sl) => {
  const s = newSlide({ module: sl.module, notes: sl.notes });
  blockHeader(s, sl.module);
  const num = sl.module.block.replace(/\D/g, '');
  s.addShape(pres.ShapeType.rect, { x: M, y: 1.9, w: 0.08, h: 2.6, fill: { color: C.ACCENT }, line: { color: C.ACCENT, width: 0 } });
  if (num) s.addText(pad2(num), { x: M + 0.4, y: 1.85, w: 3, h: 0.9, fontFace: MONO, fontSize: 48, bold: true, color: C.ACCENT, margin: 0 });
  const ds = plain(sl.title).length > 34 ? 36 : 42;
  const dh = textH(plain(sl.title), ds, 10.8, 0.5, 1.12) + 0.05;
  s.addText(runs(sl.title), { x: M + 0.4, y: 2.85, w: 10.8, h: dh, fontFace: SANS, fontSize: ds, bold: true, color: C.INK, margin: 0, valign: 'top' });
  if (sl.rest) s.addText(runs(sl.rest), { x: M + 0.4, y: 2.85 + dh + 0.25, w: 10.4, h: 0.7, fontFace: SANS, fontSize: 18, color: C.MUTED, margin: 0, valign: 'top' });
};
L.statement = (sl) => {
  const photo = sl.photo ? resolveAsset(sl.photo, A.dir) : null;
  const s = newSlide({ module: sl.module, notes: sl.notes, dark: !!photo, photo });
  blockHeader(s, sl.module);
  const len = plain(sl.title).length;
  const size = len > 110 ? 28 : len > 70 ? 32 : 38;
  const th = textH(plain(sl.title), size, 11, 0.5, 1.12) + 0.08;
  const ah = sl.rest ? textH(plain(sl.rest), 16, 10.5) + 0.1 : 0;
  const y0 = Math.max(1.5, 3.55 - (th + ah + 0.3) / 2);
  s.addShape(pres.ShapeType.rect, { x: M, y: y0, w: 0.08, h: th + (ah ? ah + 0.3 : 0), fill: { color: C.ACCENT }, line: { color: C.ACCENT, width: 0 } });
  s.addText(runs(sl.title, {}, { emColor: C.ACCENT }), { x: M + 0.4, y: y0, w: 11, h: th, fontFace: SANS, fontSize: size, bold: true, color: ink(s), margin: 0, valign: 'top', lineSpacingMultiple: 1.05 });
  if (sl.rest) s.addText(runs(sl.rest, {}, { emColor: C.ACCENT }), { x: M + 0.4, y: y0 + th + 0.3, w: 10.5, h: ah, fontFace: SANS, fontSize: 16, color: s._dark ? 'D6DEEA' : C.MUTED, margin: 0, valign: 'top' });
  if (photo && sl.credit) s.addText(sl.credit.toUpperCase(), { x: W - M - 4, y: H - 1.05, w: 4, h: 0.25, fontFace: MONO, fontSize: 8, color: C.DIM, align: 'right', margin: 0 });
};
function contentSlide(sl) {
  const s = newSlide({ module: sl.module, notes: sl.notes });
  blockHeader(s, sl.module);
  title(s, sl.title);
  return s;
}
L.body = (sl) => { const s = contentSlide(sl); blocks(s, sl.rest, { x: M, y: TOP, w: CW, h: BOTTOM - TOP }, A.dir); };
L.cards = (sl) => {
  const s = contentSlide(sl);
  const { lead, items } = sections(sl.rest);
  let y = lead ? lede(s, lead, TOP - 0.1) : TOP + 0.1;
  const nC = items.length, gap = 0.22, w = (CW - gap * (nC - 1)) / nC, bw = w - 0.42;
  const parts = items.map((it, i) => { const [k, t] = it.head.includes('|') ? it.head.split('|').map(x => x.trim()) : [pad2(i + 1), it.head]; return { k, t, b: it.body }; });
  let hs = 13, bs = 12;
  const need = () => Math.max(...parts.map(p => 0.5 + textH(plain(p.t), hs, bw, K.bold, 1.15) + 0.14 + textH(plain(p.b), bs, bw, K.sans, 1.2))) + 0.3;
  if (nC <= 3) { hs = 16; bs = 13.5; }
  while (need() > BOTTOM - y && bs > 9.5) { bs -= 0.5; hs -= 0.5; }
  const h = Math.max(nC <= 3 ? 2.3 : 2.0, need());
  parts.forEach((p, i) => {
    const x = M + i * (w + gap);
    card(s, x, y, w, h, { accent: C.ACCENT });
    label(s, p.k, x + 0.26, y + 0.2, bw);
    const th = textH(plain(p.t), hs, bw, K.bold, 1.15);
    s.addText(runs(p.t), { x: x + 0.26, y: y + 0.5, w: bw, h: th, fontFace: SANS, fontSize: hs, bold: true, color: C.INK, margin: 0, valign: 'top' });
    s.addText(runs(p.b), { x: x + 0.26, y: y + 0.5 + th + 0.14, w: bw, h: h - th - 0.8, fontFace: SANS, fontSize: bs, color: C.MUTED, margin: 0, valign: 'top' });
  });
};
L.cols = L.cards;
L.flow = (sl) => {
  const s = contentSlide(sl);
  const { lead, items } = sections(sl.rest);
  let y = lead ? lede(s, lead, TOP - 0.1) : TOP + 0.1;
  const nS = items.length, aw = 0.3, gap = 0.12, w = (CW - (nS - 1) * (aw + 2 * gap)) / nS, bw = w - 0.42;
  let hs = nS <= 3 ? 17 : 15, bs = nS <= 3 ? 13.5 : 12.5;
  const need = () => Math.max(...items.map(it => 0.95 + textH(plain(it.head), hs, bw, K.bold, 1.15) + 0.12 + textH(plain(it.body), bs, bw))) + 0.25;
  while (need() > BOTTOM - y && bs > 9.5) { bs -= 0.5; hs -= 0.5; }
  const h = Math.max(2.2, need());
  items.forEach((it, i) => {
    const x = M + i * (w + aw + 2 * gap);
    card(s, x, y, w, h, { accent: C.ACCENT });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.26, y: y + 0.24, w: 0.46, h: 0.46, fill: { color: C.BG }, line: { color: C.ACCENT, width: 1.5 } });
    s.addText(pad2(i + 1), { x: x + 0.26, y: y + 0.24, w: 0.46, h: 0.46, fontFace: MONO, fontSize: 11, bold: true, color: C.ACCENT, align: 'center', valign: 'middle', margin: 0 });
    const th = textH(plain(it.head), hs, bw, K.bold, 1.15);
    s.addText(runs(it.head), { x: x + 0.26, y: y + 0.9, w: bw, h: th, fontFace: SANS, fontSize: hs, bold: true, color: C.INK, margin: 0, valign: 'top' });
    s.addText(runs(it.body), { x: x + 0.26, y: y + 0.9 + th + 0.12, w: bw, h: h - th - 1.15, fontFace: SANS, fontSize: bs, color: C.MUTED, margin: 0, valign: 'top' });
    if (i < nS - 1) s.addShape(pres.ShapeType.rightArrow, { x: x + w + gap, y: y + h / 2 - 0.15, w: aw, h: 0.3, fill: { color: C.ACCENT }, line: { color: C.ACCENT, width: 0 } });
  });
};
L.rows = (sl) => {
  const s = contentSlide(sl);
  const { lead, items } = sections(sl.rest);
  let y = lead ? lede(s, lead, TOP - 0.1) : TOP;
  const c1 = 2.1, c2 = 3.9, c3 = CW - c1 - c2 - 0.3;
  let ps = 15, ds = 13;
  const rowsH = () => items.map(it => { const [, b] = it.head.split('|'); return Math.max(textH(plain(b || ''), ps, c2 - 0.2, K.bold), textH(plain(it.body), ds, c3)) + 0.3; });
  while (rowsH().reduce((a, b) => a + b, 0) > BOTTOM - y && ds > 10) { ds -= 0.5; ps -= 0.5; }
  const hs = rowsH();
  s.addShape(pres.ShapeType.line, { x: M, y, w: CW, h: 0, line: { color: C.INK, width: 1 } });
  items.forEach((it, i) => {
    const [t, b] = it.head.split('|').map(x => x.trim());
    const ry = y + 0.15;
    marker(s, M, ry + 0.06);
    s.addText(t, { x: M + 0.3, y: ry, w: c1 - 0.3, h: 0.3, fontFace: MONO, fontSize: 10.5, bold: true, color: C.ACCENT, margin: 0, valign: 'top' });
    s.addText(runs(b || ''), { x: M + c1, y: ry - 0.02, w: c2 - 0.2, h: hs[i] - 0.25, fontFace: SANS, fontSize: ps, bold: true, color: C.INK, margin: 0, valign: 'top' });
    s.addText(runs(it.body), { x: M + c1 + c2, y: ry, w: c3, h: hs[i] - 0.25, fontFace: SANS, fontSize: ds, color: C.MUTED, margin: 0, valign: 'top' });
    y += hs[i];
    s.addShape(pres.ShapeType.line, { x: M, y, w: CW, h: 0, line: { color: C.LINE, width: 0.75 } });
  });
};
L.agenda = (sl) => {
  const s = contentSlide(sl);
  const rows = [['CLOCK', 'BLOCK', 'WHAT', 'MIN', 'FORMAT']];
  for (const m of deck.modules) rows.push([`${clock(m.start)} – ${clock(m.end)}`, m.block, m.title, m.minutes ? String(m.minutes) : '', m.kind === 'demo' ? 'Live demo' : 'Talk']);
  const rowH = Math.min(0.4, (BOTTOM - TOP) / rows.length);
  table(s, rows, M, TOP, [1.9, 1.5, 6.13, 0.9, 1.5], { rowH, size: rowH < 0.36 ? 10.5 : 11.5, monoCols: [0, 1, 3], boldCols: [2] });
};
L.links = (sl) => {
  const s = contentSlide(sl);
  const { lead, items } = sections(sl.rest);
  let y = lead ? lede(s, lead, TOP - 0.1) : TOP;
  const gap = 0.25, w = (CW - gap) / 2, h = 1.3;
  items.forEach((it, i) => {
    const [t, url] = it.head.split('|').map(x => x.trim());
    const x = M + (i % 2) * (w + gap), yy = y + Math.floor(i / 2) * (h + 0.22);
    card(s, x, yy, w, h, { accent: C.ACCENT });
    s.addText(t, { x: x + 0.3, y: yy + 0.18, w: w - 0.5, h: 0.32, fontFace: SANS, fontSize: 15, bold: true, color: C.INK, margin: 0 });
    s.addText((url || '').replace(/^(https?:\/\/|mailto:)/, ''), { x: x + 0.3, y: yy + 0.5, w: w - 0.5, h: 0.26, fontFace: MONO, fontSize: 10, color: C.ACCENT, margin: 0, hyperlink: url ? { url } : undefined });
    s.addText(runs(it.body), { x: x + 0.3, y: yy + 0.8, w: w - 0.5, h: 0.42, fontFace: SANS, fontSize: 11.5, color: C.MUTED, margin: 0, valign: 'top' });
  });
};
L['two-col'] = (sl) => {
  const s = contentSlide(sl);
  const [a, b] = sl.rest.split(/^\|\|\|\s*$/m).map(x => (x || '').trim());
  const isImg = (md) => /^!\[[^\]]*\]\([^)]+\)$/.test(md);
  const gap = 0.5;
  if (isImg(b)) {
    const lw = CW * 0.58, rw = CW - lw - gap;
    blocks(s, a, { x: M, y: TOP, w: lw, h: BOTTOM - TOP }, A.dir);
    const [, alt, src] = b.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    const photo = /^photo:/i.test(alt);
    image(s, resolveAsset(src, A.dir), { x: M + lw + gap, y: TOP, w: rw, h: BOTTOM - TOP - 0.4 }, { caption: alt.replace(/^photo:\s*/i, ''), frame: !photo, align: 'right' });
  } else {
    const w = (CW - gap) / 2;
    blocks(s, a, { x: M, y: TOP, w, h: BOTTOM - TOP }, A.dir);
    blocks(s, b, { x: M + w + gap, y: TOP, w, h: BOTTOM - TOP }, A.dir);
  }
};
L.image = (sl) => {
  const s = contentSlide(sl);
  const hasSide = /^\|\|\|\s*$/m.test(sl.rest);
  const [side, fig] = hasSide ? sl.rest.split(/^\|\|\|\s*$/m).map(x => x.trim()) : ['', sl.rest.trim()];
  const m = fig.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const file = resolveAsset(m[2], A.dir);
  const top = 1.62, capH = 0.32, maxH = H - 0.86 - top - capH;
  if (!side) { image(s, file, { x: M, y: top, w: CW, h: maxH }, { caption: m[1] }); return; }
  const sideW = 3.6, gap = 0.4;
  const r = image(s, file, { x: M + sideW + gap, y: top, w: CW - sideW - gap, h: maxH }, { caption: m[1], align: 'right' });
  const toks = marked.lexer(side).filter(t => t.type !== 'space');
  const list = toks.find(t => t.type === 'list');
  const sw = r.x - gap - M;
  if (list) bulletRows(s, list.items.map(i => i.text), { x: M, y: r.y + 0.04, w: sw, h: r.h - 0.04 }, { size: 17, spread: true });
  else blocks(s, side, { x: M, y: r.y, w: sw, h: r.h }, A.dir);
};

// ---------- render ----------
for (const sl of deck.slides) (L[sl.layout] || L.body)(sl);
const out = path.join(HERE, 'dist', flag('--brand') ? `${name}-${brandKey}.pptx` : `${name}.pptx`);
fs.mkdirSync(path.dirname(out), { recursive: true });
await pres.writeFile({ fileName: out });
console.log(`built ${path.relative(ROOT, out)}: ${TOTAL} slides, ${deck.modules.length} modules, ${deck.total} min planned, brand ${brandKey}`);
if (!args.includes('--no-pdf')) {
  try {
    execFileSync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', path.dirname(out), out], { stdio: 'pipe', timeout: 240000 });
    console.log(`built ${path.relative(ROOT, out.replace(/\.pptx$/, '.pdf'))}`);
  } catch (e) { console.error('pdf: LibreOffice conversion failed (' + e.message.split('\n')[0] + '). The PPTX is fine; export PDF from PowerPoint or Keynote.'); }
}
