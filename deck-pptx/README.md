# PowerPoint decks in the standard class style

`deck-pptx/` renders any audience in this repo to an editable PowerPoint, plus a PDF made from it, in the house style from the vibe coding class (`mrhinkle/vibe-coding-for-non-technical-professionals`, `presentations/reference-six-hour-class/build.js`).

```
cd deck-pptx && npm install          # once: pptxgenjs, marked, js-yaml, image-size
node build.mjs primer                # dist/primer.pptx and dist/primer.pdf
node build.mjs primer --brand ata    # dist/primer-ata.pptx, All Things AI colors and logo
node build.mjs primer --no-pdf       # skip the PDF
```

The PDF comes from LibreOffice (`soffice --headless --convert-to pdf`). Without LibreOffice, open the PPTX in PowerPoint or Keynote and export.

## Where the content comes from

The same files the HTML deck reads: `audiences/<name>/audience.yaml`, `modules/`, and the audience's `overrides/`. `source.mjs` mirrors the parsing in `deck/build.mjs` (vars, `@short` lines, `only:`, include and exclude), so a change to a module shows up in both outputs. Speaker notes go into the PowerPoint notes.

Two optional keys in `audience.yaml` drive this build and are ignored by the HTML one:

```yaml
pptx:
  brand: aie            # aie (Flame Orange, Electric Blue) or ata (Nebula Blue, Rocket Orange)
  strip:                # footer strip: module id -> short label; the current one is lit
    claude-setup: TOOLS
    03-research: RESEARCH
```

## The style

- White slides. The title is plain; a statement slide with `photo:` becomes a dark slide over the photograph.
- Every content slide carries a block header (`BLOCK 3 · GIVE CLAUDE YOUR TOOLS · 8 MIN · TALK`; `DEMO` when the module has a `demo-` slide) and a clock range on the right, both computed from module minutes.
- Cards and steps have an accent bar on the left. Prompts are navy cards labeled TYPE THIS, VERBATIM. Tables have a blue header row.
- Image slides give the screenshot most of the width and spread the bullets down its full height.
- Footer: logo, the section strip, page N / TOTAL.
- Arial and Courier New, so the file opens the same on any machine.

Check a build by rasterizing the PDF (`pdftoppm -r 40 -png dist/primer.pdf p`) and looking at every page before you send it.
