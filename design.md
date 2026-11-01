# design.md: the AIE Network training template

The one file that keeps every deck built from this repository consistent with theaie.net. Values here were read from the live site on 2026-11-01 (computed styles and the `:root` tokens), then narrowed to what a slide needs. When a deck and this file disagree, this file wins; when this file and theaie.net disagree, fix this file.

The theme is called **Node**: the brand mark's linked circles are the structure. They are the bullets, the section counters, the joins between steps, the dots on a screenshot's window bar, and the mark itself sits oversized and faint on the title, divider and statement slides. Everything else is white space, Verdana, and one orange.

## Surface

| | Value | From |
| --- | --- | --- |
| Canvas | `#FFFFFF`, 1280 x 720, `overflow: hidden` | the site's content pages are white; no cream, no grey |
| Content zone | top 60px, sides 100px, bottom 100px; nothing crosses **620px** from the top | enforced by `scripts/check.mjs` |
| Chrome | slide counter top right, `// FOOTER` bottom left, the AIE Network logo bottom right | logo is the real SVG, never a text wordmark |
| Dark surface | `#0A0F1C` only on photo slides and the prompt and quote panels | the site's hero |

## Color

| Token | Hex | Site value | Use |
| --- | --- | --- | --- |
| `--ink` | `#0A0F1C` | `oklch(15% .02 260)` headings, hero | headings, panels, the rule under cards |
| `--fg` | `#1A2434` | body text on light | paragraphs, list items |
| `--flame` | `#f44800` | `--accent: oklch(58% .21 30)` | eyebrows, the nodes, one phrase per statement slide, link addresses |
| `--blue` | `#2563EB` | `--primary: oklch(55% .22 260)` | second accent only: the second card, a second series, never text |
| `--cloud` | `#F5F7FA` | `--muted: oklch(95% .005 250)` | cards, flow steps, inline code |
| `--hairline` | `#E5E7EB` | `--border: oklch(90% .005 250)` | rules between rows and list items, screenshot frames |
| `--muted` / `--muted-2` | ink at 55% / 70% | `--muted-foreground` | captions, ledes, card body text |

One orange. Flame is an accent, not a fill: never a slide background, never body text, never more than one phrase per slide. Blue appears only where two things need telling apart.

## Type

| Role | Face | Weight and size at 1280 x 720 | Site |
| --- | --- | --- | --- |
| Display (h1, h2, h3, card titles, row phrases) | Verdana, Geneva, Tahoma, sans-serif | 700; title 68px, divider 60px, statement 52px, slide 44px (36px when the title passes 60 characters), h3 22px | h1 and h2 are Verdana 700 on the site |
| Body | Inter, then -apple-system, Helvetica Neue, Arial | 400 to 600; 20 to 21px lists, 19px columns, 16.5px card bodies | Inter 400 at 16px |
| Labels, eyebrows, counters, prompts | JetBrains Mono, then SF Mono, Menlo | 700 for eyebrows at 14px with 0.12em tracking, uppercase; 400 for prompt text at 15px | eyebrows are JetBrains Mono 700, 14px, orange, 0.2em tracking |

Titles are sentences Mark would say, not headlines. Body text under 14px only in a table the room is told to photograph. Fonts load from Google Fonts when online and fall back to system faces offline; the deck must still read with the fallbacks.

## Shapes

- No `border-radius` on cards, panels, buttons, images. The only circles are the nodes.
- Accents are rules, never left borders: cards carry a 4px rule at the foot (ink, flame or blue), tables a 2px ink rule under the header, rows and list items a 1px hairline.
- No shadows, gradients, textures, blur, emoji, icon fonts or entrance animations. A slide reads as a printed page.
- Oversized numerals and mono glyphs (`//`, `>`) are the iconography. Logos and photographs are the only images.

## Images

Every deck needs visual interest beyond type: aim for one photograph or screenshot every four to five slides, and never two text-only slides of the same layout in a row.

**Screenshots** go through the `image` layout or a markdown image in a body slide. They render in a window frame: hairline border, a 26px bar with three node dots, the image top-aligned and cropped at 380 to 420px, a mono caption underneath. Rules:

- Capture at 1280 or 1440 wide, PNG, the real product, no mockups.
- The caption names what the room is looking at and where it came from, in under twelve words: "LinkedIn Jobs, platform engineer + Kubernetes, November 2026".
- Blur or crop anything private. A client's own tool goes in their audience folder, never in `deck/assets/`.
- Pair a screenshot with three lines of text at most (the `|||` split) or let it run full width alone.

**Photographs** go under a navy veil on title, divider and statement slides via the `photo:` directive. The veil runs 94% ink on the left to 45% on the right so the type always sits on the dark side. Type turns white, the eyebrow and counter stay flame, the logo switches to its white version. Rules:

- Real photographs of real rooms: All Things AI, a workshop, Mark on stage. No stock, no AI imagery in a training deck.
- Faces of attendees are fine from behind or at a distance; no identifiable front-on crowd shots without permission.
- Credit with `credit:` when the photo isn't Mark's own; it renders small, mono, bottom right.
- A photo slide is a breath, not a layout for lists: title, one line, nothing else.

**Links** use the `links` layout: `### Title | https://address` with one line under each. Two columns, up to six. The address renders in mono flame without the scheme. Put the same links in the close slide's notes so they land in the chat during a remote session.

**Assets** live in `deck/assets/photos/` and `deck/assets/screenshots/` for anything reusable, and in `audiences/<name>/` for anything client-specific. The build inlines every image as a data URI so a deck is one file that works offline. Keep a screenshot under 500 KB and a photo under 800 KB.

## Density

One idea and one visual per slide. At most four bullets, about twelve words each. Rows and tables are "point, don't read" and say so in the notes. Speaker notes under 140 words, written as the talk track.

## Writing

Mark's voice: one person across a table, contractions, the plain point first and then the reassurance. No exclamation points, no em-dashes, no cheerleading, no "Honestly," no cute asides, no corporate register ("unlock value", "drive outcomes", "journey"). The program rule, "the AI drafts, you send," appears in every deck's opening and close.

## Checks before a deck ships

1. `node scripts/check.mjs <audience>` exits 0: no unresolved variables, nothing past the 620px floor, no em-dashes, no missing notes.
2. Open the PDF contact sheet. Every fourth or fifth slide has an image. No two same-layout text slides touch.
3. Every screenshot has a caption with a source and a date. Every borrowed photo has a credit.
4. The logo is the SVG, bottom right, color on white and white on photo slides.
5. One orange phrase at most per slide. Blue only where two things need telling apart.

## Files

| File | Holds |
| --- | --- |
| `deck/theme/base.css` | layout, canvas, chrome, every component |
| `deck/theme/skins/node.css` | the Node tokens and flourishes (the template) |
| `deck/theme/skins/*.css` | the other explored directions, kept for comparison: `signal` (dark), `runsheet` (rail), `dispatch` (ivory serif, rejected: no cream), `aie-light` (the spec before Node) |
| `deck/theme/styleguide.md` and `npm run styleguide` | every layout rendered in the theme with the rule for using it |
| `scripts/preview-themes.sh` | eight sample slides in any skin as a contact sheet |
