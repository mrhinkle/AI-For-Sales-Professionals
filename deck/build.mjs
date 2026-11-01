#!/usr/bin/env node
// Build an HTML deck for one audience from the module files.
//
//   node deck/build.mjs <audience>      # audiences/<audience>/audience.yaml
//   node deck/build.mjs                 # every audience folder that has an audience.yaml
//
// Output: deck/dist/<audience>.html (self-contained, one file, speaker notes on N, prints one slide per page)
//         audiences/<audience>/speaker-notes.md (every slide's title and notes, for the presenter and for review)
//
// Slide format: see modules/README.md. Design rules: deck/theme/DESIGN.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODULES = path.join(ROOT, 'modules');
const AUDIENCES = path.join(ROOT, 'audiences');
const DIST = path.join(ROOT, 'deck', 'dist');
const THEME = path.join(ROOT, 'deck', 'theme');

marked.setOptions({ gfm: true, breaks: false });

// ---------- helpers ----------
const die = (msg) => { console.error('build: ' + msg); process.exit(1); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dataUri = (file) => {
  const p = path.join(THEME, file);
  if (!fs.existsSync(p)) return '';
  const ext = path.extname(file).slice(1);
  const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
};

function parseFrontMatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) die(`${file}: missing front matter`);
  let meta;
  try { meta = yaml.load(m[1]) || {}; } catch (e) { die(`${file}: bad front matter: ${e.message}`); }
  return { meta, body: text.slice(m[0].length) };
}

// Split a module body into slides on lines that are exactly "---".
function splitSlides(body) {
  const lines = body.split('\n');
  const slides = []; let cur = [];
  for (const line of lines) {
    if (line.trim() === '---') { slides.push(cur.join('\n')); cur = []; }
    else cur.push(line);
  }
  slides.push(cur.join('\n'));
  return slides.map(s => s.trim()).filter(Boolean);
}

// Pull "<!-- key: value -->" directives and a trailing "notes:" block out of one slide.
function parseSlide(raw, file, idx) {
  const d = {};
  let text = raw.replace(/<!--\s*([a-z-]+)\s*:\s*([\s\S]*?)\s*-->\n?/g, (_, k, v) => { d[k] = v.trim(); return ''; });
  let notes = '';
  const ni = text.search(/^notes:\s*$/m);
  if (ni >= 0) { notes = text.slice(ni).replace(/^notes:\s*$/m, '').trim(); text = text.slice(0, ni); }
  const layout = d.layout || 'body';
  const id = d.id || `${path.basename(file, '.md')}-${idx + 1}`;
  return { id, layout, eyebrow: d.eyebrow || '', time: d.time || '', text: text.trim(), notes, file };
}

function substitute(text, vars, file, missing) {
  return text.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (m, k) => {
    if (vars[k] === undefined || vars[k] === null || vars[k] === '') { missing.add(`${k} (${path.basename(file)})`); return m; }
    return String(vars[k]);
  });
}

// ---------- markdown → slide HTML ----------
// marked gives us tokens; we render the first heading as the slide title and the rest per layout.
function renderBody(md) {
  // Our own tweaks on top of marked's HTML: lists get the > marks, blockquotes become quote panels,
  // fenced code becomes a prompt card, tables get the comparison style.
  let html = marked.parse(md);
  html = html.replace(/<ul>/g, '<ul class="marks">').replace(/<table>/g, '<table class="cmp">');
  html = html.replace(/<blockquote>\s*<p>([\s\S]*?)<\/p>\s*(?:<p>([\s\S]*?)<\/p>\s*)?<\/blockquote>/g,
    (_, q, a) => `<div class="quote-panel"><div class="q">${q}</div>${a ? `<div class="a">${a}</div>` : ''}</div>`);
  html = html.replace(/<pre><code(?: class="language-([a-z-]+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => `<div class="prompt${lang ? ' ' + lang : ''}"><div class="k">${lang === 'prompt' ? 'prompt · copy this' : (lang || 'example')}</div><pre>${code}</pre></div>`);
  return html;
}

function takeTitle(md) {
  const m = md.match(/^(#{1,2})\s+(.+)$/m);
  if (!m) return { title: '', rest: md };
  return { title: m[2].trim(), rest: (md.slice(0, m.index) + md.slice(m.index + m[0].length)).trim() };
}

// Sections split on "### " become cards / steps / rows / columns.
function sections(md) {
  const parts = md.split(/^###\s+/m);
  const lead = parts.shift().trim();
  const items = parts.map(p => {
    const nl = p.indexOf('\n');
    const head = (nl < 0 ? p : p.slice(0, nl)).trim();
    const body = nl < 0 ? '' : p.slice(nl + 1).trim();
    return { head, body };
  });
  return { lead, items };
}

function inline(md) { return marked.parseInline(md); }

function renderSlide(s, ctx) {
  const { title, rest } = takeTitle(s.text);
  const eyebrow = s.eyebrow ? `<div class="eyebrow">${esc(s.eyebrow)}${s.time ? `<span class="time">${esc(s.time)}</span>` : ''}</div>` : '';
  const chrome = (cls = '') => `
  <div class="chrome-num"></div>
  <div class="chrome-eyebrow"><b>//</b> ${esc(ctx.footer)}</div>
  <div class="chrome-wordmark">${ctx.wordmark}</div>`;
  const notes = `<aside class="notes">${renderBody(s.notes || '').replace(/^<p>|<\/p>$/g, '')}</aside>`;
  let inner = '';
  let cls = s.layout + '-slide';

  switch (s.layout) {
    case 'title': {
      inner = `<div class="title-topbar"></div><div class="content">${eyebrow}<h1>${inline(title)}</h1>
        ${rest ? `<p class="sub">${inline(rest.replace(/\n+/g, '<br>'))}</p>` : ''}
        <div class="speaker"><span class="name">${esc(ctx.presenter)}</span>${ctx.presenterLine ? ` &nbsp;&middot;&nbsp; ${esc(ctx.presenterLine)}` : ''}</div></div>`;
      break;
    }
    case 'divider': {
      ctx.section += 1;
      inner = `<div class="content"><div class="num">${String(ctx.section).padStart(2, '0')}${s.time ? `<span class="time">${esc(s.time)}</span>` : ''}</div><h1>${inline(title)}</h1>
        ${rest ? `<p class="sub">${inline(rest)}</p>` : ''}</div>`;
      break;
    }
    case 'statement': {
      inner = `<div class="content">${eyebrow}<h1>${inline(title)}</h1>${rest ? `<div class="attr">${inline(rest)}</div>` : ''}</div>`;
      break;
    }
    case 'cards': case 'flow': case 'cols': {
      const { lead, items } = sections(rest);
      const accents = ['flame', 'blue', 'ink'];
      let body = '';
      if (s.layout === 'cards') {
        body = `<div class="cards" style="grid-template-columns:repeat(${Math.min(items.length, 4) || 1},1fr);">` + items.map((it, i) =>
          `<div class="card ${accents[i % 3]}">${it.head.includes('|') ? `<div class="k">${esc(it.head.split('|')[0].trim())}</div><h3>${inline(it.head.split('|')[1].trim())}</h3>` : `<h3>${inline(it.head)}</h3>`}${renderBody(it.body)}</div>`).join('') + '</div>';
      } else if (s.layout === 'flow') {
        body = `<div class="flow">` + items.map((it, i) =>
          `${i ? '<div class="arrow">&gt;</div>' : ''}<div class="step"><div class="n">${String(i + 1).padStart(2, '0')}</div><h3>${inline(it.head)}</h3>${renderBody(it.body)}</div>`).join('') + '</div>';
      } else {
        body = `<div class="cols" style="grid-template-columns:repeat(${items.length || 1},1fr);">` + items.map((it) =>
          `<div class="col"><div class="k">${esc(it.head)}</div>${renderBody(it.body)}</div>`).join('') + '</div>';
      }
      inner = `<div class="content">${eyebrow}<h2 class="${title.length>60?'long':''}">${inline(title)}</h2>${lead ? `<p class="lede">${inline(lead)}</p>` : ''}${body}</div>`;
      break;
    }
    case 'agenda': {
      const body = `<div class="rows">` + ctx.outline.filter(o => !/^(Opening|Close)$/.test(o.title)).map((o, i) =>
        `<div class="row"><div class="t">${String(i + 1).padStart(2, '0')}</div><div class="b">${esc(o.title)}</div><div class="d">${o.minutes ? esc(o.minutes) + ' min' : ''}</div></div>`).join('') + '</div>';
      inner = `<div class="content">${eyebrow}<h2>${inline(title)}</h2>${rest ? `<p class="lede">${inline(rest)}</p>` : ''}${body}</div>`;
      cls = 'agenda-slide';
      break;
    }
    case 'rows': {
      const { lead, items } = sections(rest);
      const body = `<div class="rows">` + items.map(it => {
        const [t, b] = it.head.split('|').map(x => x.trim());
        return `<div class="row"><div class="t">${esc(t)}</div><div class="b">${inline(b || '')}</div><div class="d">${inline(it.body)}</div></div>`;
      }).join('') + '</div>';
      inner = `<div class="content">${eyebrow}<h2 class="${title.length>60?'long':''}">${inline(title)}</h2>${lead ? `<p class="lede">${inline(lead)}</p>` : ''}${body}</div>`;
      break;
    }
    case 'two-col': {
      const [a, b] = rest.split(/^\|\|\|\s*$/m);
      inner = `<div class="content">${eyebrow}<h2 class="${title.length>60?'long':''}">${inline(title)}</h2><div class="two-col"><div>${renderBody(a || '')}</div><div>${renderBody(b || '')}</div></div></div>`;
      break;
    }
    default: { // body
      cls = 'body-slide';
      inner = `<div class="content">${eyebrow}<h2 class="${title.length>60?'long':''}">${inline(title)}</h2>${renderBody(rest)}</div>`;
    }
  }
  return `<!-- ${s.id} -->\n<section class="slide ${cls}" data-id="${esc(s.id)}" data-module="${esc(path.basename(s.file, '.md'))}">${inner}${chrome()}${notes}</section>\n`;
}

// ---------- assemble one audience ----------
function loadAudience(name) {
  const file = path.join(AUDIENCES, name, 'audience.yaml');
  if (!fs.existsSync(file)) die(`no audiences/${name}/audience.yaml`);
  const a = yaml.load(fs.readFileSync(file, 'utf8'));
  // Master defaults underneath every audience.
  const masterFile = path.join(AUDIENCES, 'master', 'audience.yaml');
  const master = name === 'master' ? {} : yaml.load(fs.readFileSync(masterFile, 'utf8'));
  a.vars = { ...(master.vars || {}), ...(a.vars || {}) };
  for (const k of ['brand', 'presenter', 'presenter_line', 'footer']) if (a[k] === undefined && master[k] !== undefined) a[k] = master[k];
  a.name = name;
  a.dir = path.join(AUDIENCES, name);
  return a;
}

function build(name) {
  const a = loadAudience(name);
  const missing = new Set();
  const vars = { ...a.vars, title: a.title, subtitle: a.subtitle || '', eyebrow: a.eyebrow || '', date: a.date || '', duration: a.duration_minutes || '' };
  const slides = [];
  let totalMinutes = 0;
  const outline = [];

  for (const m of a.modules || []) {
    const ref = typeof m === 'string' ? { id: m } : m;
    let file = path.join(MODULES, ref.id + '.md');
    if (ref.override) file = path.join(a.dir, ref.override);
    if (!fs.existsSync(file)) die(`${name}: module not found: ${file}`);
    const { meta, body } = parseFrontMatter(fs.readFileSync(file, 'utf8'), file);
    const minutes = ref.minutes ?? (meta.minutes && (meta.minutes[a.length || 'full'] ?? meta.minutes.full)) ?? 0;
    totalMinutes += Number(minutes) || 0;
    outline.push({ id: ref.id, title: meta.title, minutes });
    let list = splitSlides(substitute(body, vars, file, missing)).map((raw, i) => parseSlide(raw, file, i));
    if (ref.include) list = list.filter(s => ref.include.includes(s.id));
    if (ref.exclude) list = list.filter(s => !ref.exclude.includes(s.id));
    for (const s of list) { s.module = meta.title; slides.push(s); }
  }
  if (!slides.length) die(`${name}: no slides`);
  if (missing.size) die(`${name}: unresolved variables: ${[...missing].join(', ')}. Set them in audiences/${name}/audience.yaml under vars.`);

  const brand = a.brand || 'peripety';
  const wordmark = brand === 'aie' ? 'THE <span>AIE</span> NETWORK' : brand === 'cobrand' ? `${esc(a.vars.company)} <span>&times;</span> PERIPETY LABS` : 'PERIPETY <span>LABS</span>';
  const ctx = { outline, footer: a.footer || a.title, wordmark, presenter: a.presenter || 'Mark R. Hinkle', presenterLine: a.presenter_line || '', section: 0 };
  const sectionsHtml = slides.map(s => renderSlide(s, ctx)).join('\n');

  const css = fs.readFileSync(path.join(THEME, 'deck.css'), 'utf8');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(a.title)}${a.date ? ' — ' + esc(a.date) : ''}</title>
<meta name="description" content="${esc(a.subtitle || '')}">
<meta name="generator" content="ai-for-sales-training deck/build.mjs">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
<div class="deck">
${sectionsHtml}
</div>
<script>
(function(){
  var slides=document.querySelectorAll('.slide');
  var total=String(slides.length).padStart(2,'0');
  slides.forEach(function(s,i){var n=s.querySelector('.chrome-num');if(n)n.textContent=String(i+1).padStart(2,'0')+' / '+total;});
  var cur=0;
  function goto(i){cur=Math.max(0,Math.min(slides.length-1,i));slides[cur].scrollIntoView({behavior:'smooth',block:'center'});}
  document.addEventListener('keydown',function(e){
    if(/input|textarea/i.test(e.target.tagName))return;
    if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='PageDown'||e.key===' '){e.preventDefault();goto(cur+1);}
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();goto(cur-1);}
    else if(e.key==='Home'){e.preventDefault();goto(0);}
    else if(e.key==='End'){e.preventDefault();goto(slides.length-1);}
    else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
    else if(e.key==='n'||e.key==='N'){document.body.classList.toggle('show-notes');}
  });
  window.addEventListener('scroll',function(){var mid=window.scrollY+window.innerHeight/2;slides.forEach(function(s,i){if(s.offsetTop<=mid&&s.offsetTop+s.offsetHeight>mid)cur=i;});},{passive:true});
})();
</script>
</body>
</html>
`;
  fs.mkdirSync(DIST, { recursive: true });
  const out = path.join(DIST, `${name}.html`);
  fs.writeFileSync(out, html);

  // Speaker notes + outline for the presenter and for reviewers.
  const notesMd = [`# Speaker notes: ${a.title}`, '', a.date ? `Date: ${a.date}. ` : '' + `Planned length: ${a.duration_minutes || totalMinutes} minutes (modules add up to ${totalMinutes}). Slides: ${slides.length}.`, '',
    '## Run of show', '', '| Module | Minutes |', '| --- | --- |', ...outline.map(o => `| ${o.title} | ${o.minutes} |`), '',
    '## Slides', '', ...slides.map((s, i) => `### ${String(i + 1).padStart(2, '0')}. ${takeTitle(s.text).title.replace(/[*_`]/g, '')}\n\n_${s.module}_\n\n${s.notes || '(no notes)'}\n`)].join('\n');
  fs.writeFileSync(path.join(a.dir, 'speaker-notes.md'), notesMd);

  console.log(`built ${path.relative(ROOT, out)}: ${slides.length} slides, ${outline.length} modules, ${totalMinutes} min planned${a.duration_minutes && totalMinutes !== a.duration_minutes ? ` (audience.yaml says ${a.duration_minutes})` : ''}`);
  return { slides: slides.length, minutes: totalMinutes };
}

const arg = process.argv[2];
const names = arg ? [arg] : fs.readdirSync(AUDIENCES).filter(d => !d.startsWith('_') && fs.existsSync(path.join(AUDIENCES, d, 'audience.yaml')));
for (const n of names) build(n);
