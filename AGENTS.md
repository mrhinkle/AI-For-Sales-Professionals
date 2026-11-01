# Instructions for assistants working in this repository

This repository is a training program, "AI for Sales Professionals," written so that a chatbot or coding agent can adapt it for a new audience without asking many questions. Read this file, then `README.md`, then `modules/README.md` for the slide format.

## What you are allowed to change

- **Forking for a new audience** (the common job): create `audiences/<name>/` from `audiences/_template/` (or run `node scripts/fork-audience.mjs <name> "<Company>"`), fill in `brief.md` from what the user tells you, set `audience.yaml` (title, date, length, vars, modules, excluded slide ids), add audience-only slides under `overrides/`, then build and check. Do not edit the shared modules to make one audience work; use `vars`, `exclude`, or an override.
- **Improving the master**: edit files in `modules/` and `prompts/` when the user asks for a change to the program itself. Keep the module front matter valid and the slide ids stable, because audiences reference them. Keep `prompts/` in sync with any prompt text you change on a slide.
- **The proposal**: `program/PROPOSAL.md` is the standard proposal. For a client version, copy it into `audiences/<name>/proposal.md` and tailor it; leave the standard one general.

Do not change `deck/theme/deck.css`, `deck/build.mjs` or `scripts/` for an audience request. Design and tooling changes are their own task.

## How to fork, step by step

1. Ask only for what you can't infer: company, what they sell and to whom, CRM and sequencer, date, length, who is in the room, what the host wants people doing differently. Everything else has a default.
2. Write `audiences/<name>/brief.md`. Mark anything unconfirmed with *confirm*. Never invent attendee roles, numbers, or facts about the client.
3. Set `audiences/<name>/audience.yaml`. `length` is `short` (60 minutes), `half` (about 150) or `full` (about 260). For a short session, exclude the exercise slides (ids start with `exercise-`) and plan a live demo instead; say so in `brief.md`.
4. Build and check: `node deck/build.mjs <name> && node scripts/check.mjs <name>`. Fix every PROBLEM. Read the WARNINGS and fix the ones that are real.
5. Write `audiences/<name>/run-of-show.md` from the generated `speaker-notes.md`: clock, block, slide numbers, scope cuts in order.
6. Open `deck/dist/<name>.html` and look at it, or read `deck/dist/<name>-check.txt` and the PDF, before you tell the user it is done. Do not claim a render you have not seen.

## Writing rules

Slide text and speaker notes are in Mark Hinkle's voice. Talk to one person. Titles are sentences he would say, not headlines. Contractions. The plain point first, then the reassurance. No exclamation points, no cheerleading, no em-dashes, no "Honestly," and no cute asides. At most four bullets on a slide and about twelve words each. Speaker notes under 140 words and written as the talk track, not a summary of the slide. The program's one rule, "the AI drafts, you send," appears in every audience's opening and close; do not remove it.

Never put a client's confidential data, customer lists, pricing, or transcripts into a module or a brief. Variables carry the public facts (company, product, buyer, tools). Anything sensitive stays with the user.

## Checks before you say it's done

- `node scripts/check.mjs <name>` exits 0 and `deck/dist/<name>-check.txt` shows no PROBLEMS.
- The planned minutes printed by the build match the booked time, or the run of show says what gets cut.
- `brief.md` has no empty sections; drop a section rather than leave a placeholder.
- Slide numbers in `run-of-show.md` match `speaker-notes.md` from the same build.

If several agents work in parallel, give each its own audience folder or its own module; never two writers in one file.
