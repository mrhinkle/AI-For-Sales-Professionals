#!/usr/bin/env node
// Check a built deck the way a reviewer would, without opening it by hand.
//
//   node scripts/check.mjs <audience>      # default: every deck in deck/dist
//
// 1. Content lint on the HTML: unresolved {{variables}}, em-dashes, exclamation points, too many bullets,
//    speaker notes over 140 words, slides with no notes.
// 2. Render check in headless Chrome: every slide's content box is measured; anything that overflows the
//    content zone (the floor is 620px from the slide top) is reported with its slide number and title.
// 3. Writes deck/dist/<audience>.pdf and deck/dist/<audience>-check.txt so the result is a file, not a claim.
//
// Exit code 1 on any failure. Chrome path can be overridden with CHROME=/path/to/chrome.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'deck', 'dist');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Every Chrome launch gets its own throwaway profile: a shared one is still locked by the previous launch's
// lingering processes for a few seconds, and Chrome then exits at once with no page run.
function chrome(args, opts = {}) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'deckcheck-profile-'));
  try {
    return execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 180000, stdio: ['ignore', 'pipe', 'pipe'], ...opts });
  } catch (e) {
    const err = new Error((e.stderr || e.message || '').toString().split('\n').filter(Boolean).slice(-2).join(' | '));
    throw err;
  } finally {
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

const names = process.argv[2] ? [process.argv[2]] : fs.readdirSync(DIST).filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
let failed = false;

for (const name of names) {
  const file = path.join(DIST, `${name}.html`);
  if (!fs.existsSync(file)) { console.error(`check: no ${file}; run npm run build first`); failed = true; continue; }
  const html = fs.readFileSync(file, 'utf8');
  const report = [];
  const problems = [];
  const warnings = [];

  // ---- 1. content lint ----
  const slides = [...html.matchAll(/<section class="slide[^"]*" data-id="([^"]+)"[\s\S]*?<\/section>/g)];
  report.push(`${name}: ${slides.length} slides`);
  slides.forEach((m, i) => {
    const s = m[0]; const n = i + 1;
    const title = (s.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/) || [, '(untitled)'])[1].replace(/<[^>]+>/g, '');
    const visible = s.replace(/<aside class="notes">[\s\S]*?<\/aside>/, '');
    const notes = (s.match(/<aside class="notes">([\s\S]*?)<\/aside>/) || [, ''])[1].replace(/<[^>]+>/g, ' ');
    if (/\{\{/.test(s)) problems.push(`slide ${n} "${title}": unresolved {{variable}}`);
    if (/—/.test(visible.replace(/<aside[\s\S]*?<\/aside>/, ''))) warnings.push(`slide ${n} "${title}": em-dash in slide text`);
    if (/!(?![=\[])/.test(visible.replace(/<[^>]+>/g, ''))) warnings.push(`slide ${n} "${title}": exclamation point`);
    const bullets = (visible.match(/<li>/g) || []).length;
    if (bullets > 6 && !/table/.test(visible)) warnings.push(`slide ${n} "${title}": ${bullets} list items`);
    const words = notes.trim().split(/\s+/).filter(Boolean).length;
    if (words > 140) warnings.push(`slide ${n} "${title}": notes are ${words} words (limit 140)`);
    if (words === 0 && !/title-slide|divider-slide/.test(s)) warnings.push(`slide ${n} "${title}": no speaker notes`);
  });

  // ---- 2. render check ----
  const probe = `<script>
window.addEventListener('load',function(){
  var out=[];document.querySelectorAll('.slide').forEach(function(s,i){
    var c=s.querySelector('.content');if(!c)return;
    var floor=620, bottom=0;
    c.querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();var sr=s.getBoundingClientRect();var b=r.bottom-sr.top;if(r.height>0&&b>bottom)bottom=b;});
    var t=(s.querySelector('h1,h2')||{}).textContent||'';
    out.push((i+1)+'\\t'+Math.round(bottom)+'\\t'+(bottom>floor?'OVERFLOW':'ok')+'\\t'+t.trim().replace(/\\s+/g,' '));
  });
  var pre=document.createElement('pre');pre.id='overflow-report';pre.textContent=out.join('\\n');document.body.appendChild(pre);
});
</script>`;
  const tmp = path.join(os.tmpdir(), `deckcheck-${name}-${process.pid}.html`);
  fs.writeFileSync(tmp, html.replace('</body>', probe + '</body>'));
  let dom = '';
  try {
    dom = chrome(['--hide-scrollbars', '--window-size=1400,900', '--virtual-time-budget=4000', '--dump-dom', 'file://' + tmp]);
  } catch (e) { problems.push(`headless Chrome failed: ${e.message}`); }
  const rep = (dom.match(/<pre id="overflow-report">([\s\S]*?)<\/pre>/) || [, ''])[1];
  if (!rep) problems.push('render probe produced no report (Chrome did not run the page?)');
  const lines = rep.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').split('\n').filter(Boolean);
  for (const l of lines) { const [n, bottom, state, title] = l.split('\t'); if (state === 'OVERFLOW') problems.push(`slide ${n} "${title}": content reaches ${bottom}px, floor is 620px`); }
  report.push(`render: ${lines.length} slides measured, ${lines.filter(l => l.includes('OVERFLOW')).length} overflow`);

  // ---- 3. PDF ----
  const pdf = path.join(DIST, `${name}.pdf`);
  try {
    chrome(['--no-pdf-header-footer', '--virtual-time-budget=4000', `--print-to-pdf=${pdf}`, 'file://' + file]);
    report.push(`pdf: ${path.relative(ROOT, pdf)} (${(fs.statSync(pdf).size / 1024).toFixed(0)} KB)`);
  } catch (e) { warnings.push(`pdf export failed: ${e.message}`); }
  fs.rmSync(tmp, { force: true });

  const out = [...report, '', ...(problems.length ? ['PROBLEMS', ...problems.map(p => '  ' + p)] : ['PROBLEMS: none']), '', ...(warnings.length ? ['WARNINGS', ...warnings.map(w => '  ' + w)] : ['WARNINGS: none']), '', 'per-slide bottom edge (px from slide top; floor 620):', ...lines.map(l => '  ' + l.replace(/\t/g, '  '))].join('\n');
  fs.writeFileSync(path.join(DIST, `${name}-check.txt`), out + '\n');
  console.log(out);
  console.log('');
  if (problems.length) failed = true;
}
process.exit(failed ? 1 : 0);
