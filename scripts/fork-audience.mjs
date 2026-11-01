#!/usr/bin/env node
// Start a new audience fork from the template.
//
//   node scripts/fork-audience.mjs <name> "<Company Name>"
//
// Creates audiences/<name>/ with audience.yaml, brief.md and an overrides/ folder, then prints what to fill in.
// The fork inherits every variable and module from audiences/master; you only change what differs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [name, company] = process.argv.slice(2);
if (!name || !/^[a-z0-9-]+$/.test(name)) { console.error('usage: node scripts/fork-audience.mjs <kebab-name> "<Company Name>"'); process.exit(1); }
const src = path.join(ROOT, 'audiences', '_template');
const dst = path.join(ROOT, 'audiences', name);
if (fs.existsSync(dst)) { console.error(`audiences/${name} already exists`); process.exit(1); }
fs.mkdirSync(path.join(dst, 'overrides'), { recursive: true });
for (const f of fs.readdirSync(src)) {
  if (f === 'overrides') continue;
  const text = fs.readFileSync(path.join(src, f), 'utf8').replace(/__NAME__/g, name).replace(/__COMPANY__/g, company || 'Company');
  fs.writeFileSync(path.join(dst, f), text);
}
fs.writeFileSync(path.join(dst, 'overrides', '.gitkeep'), '');
console.log(`created audiences/${name}/
  1. Fill in audiences/${name}/brief.md (who is in the room, what they sell, what they use, what the host wants).
  2. Edit audiences/${name}/audience.yaml: title, date, length, vars, and the module list.
  3. node deck/build.mjs ${name} && node scripts/check.mjs ${name}
  4. Open deck/dist/${name}.html, press N for notes.`);
