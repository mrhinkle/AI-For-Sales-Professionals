#!/usr/bin/env node
// Dump a built deck as plain text for outside review: every slide's visible text, then its speaker notes.
//
//   node scripts/deck-text.mjs <audience>     → audiences/<audience>/deck-text.md
//
// Reviewers (human or model) read this instead of the HTML. Regenerate after any rebuild.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2];
if (!name) { console.error('usage: node scripts/deck-text.mjs <audience>'); process.exit(1); }
const file = path.join(ROOT, 'deck', 'dist', `${name}.html`);
if (!fs.existsSync(file)) { console.error(`no ${file}; run node deck/build.mjs ${name} first`); process.exit(1); }
const html = fs.readFileSync(file, 'utf8');

const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&middot;/g, '·').replace(/&times;/g, '×').replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—');
const text = (h) => unescape(h
  .replace(/<br\s*\/?>/g, '\n')
  .replace(/<\/(p|li|h1|h2|h3|div|pre|tr)>/g, '\n')
  .replace(/<li>/g, '- ')
  .replace(/<[^>]+>/g, '')
).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

const sections = [...html.matchAll(/<section class="slide ([^"]*)" data-id="([^"]+)" data-module="([^"]+)">([\s\S]*?)<\/section>/g)];
const title = unescape((html.match(/<title>([^<]*)<\/title>/) || [, name])[1]);
const out = [`# Deck text: ${title}`, '', `${sections.length} slides. Visible text first, then the speaker notes under "Notes:". Chrome (slide number, footer, wordmark) omitted.`, ''];
sections.forEach((m, i) => {
  const [, cls, id, mod, body] = m;
  const notes = (body.match(/<aside class="notes">([\s\S]*?)<\/aside>/) || [, ''])[1];
  const visible = body.replace(/<aside class="notes">[\s\S]*?<\/aside>/, '').replace(/<div class="chrome-[^"]*">[\s\S]*?<\/div>/g, '');
  out.push(`## ${String(i + 1).padStart(2, '0')} · ${id} · layout ${cls.replace(/-slide/, '').trim()} · module ${mod}`, '', text(visible), '', `Notes: ${text(notes) || '(none)'}`, '');
});
const dst = path.join(ROOT, 'audiences', name, 'deck-text.md');
fs.writeFileSync(dst, out.join('\n'));
console.log(`wrote ${path.relative(ROOT, dst)}: ${sections.length} slides, ${out.join('\n').split(/\s+/).length} words`);
