# How a module file works

Every file in this folder is one teaching module: a few slides, the talk track in the speaker notes, and an exercise. An audience picks modules in its `audience.yaml`, and `node deck/build.mjs <audience>` turns the picked modules into one HTML deck.

Keep the writing in Mark's voice: talk to one person across the table, titles are sentences he would say, contractions, the plain point first and then the reassurance. No exclamation points, no cheerleading, no em-dashes. At most four bullets on a slide and about twelve words a bullet. Speaker notes are the talk track, under 140 words a slide.

## Front matter

```yaml
---
id: 04-research            # matches the file name
title: Research an account in ten minutes
minutes: { full: 35, half: 20, short: 8 }   # how long the module takes at each program length
outcomes:
  - Produce a one-page account brief with sources from a prompt and a company name
---
```

`minutes` keys match the `length` field in `audience.yaml` (`full`, `half`, `short`). An audience can also override a module's minutes directly.

## Slides

Slides are separated by a line that is exactly `---`. Each slide starts with directives in HTML comments, then a heading, then the body, then an optional `notes:` block that becomes the speaker notes.

```markdown
<!-- layout: cards -->
<!-- eyebrow: where ai fits -->
<!-- time: 9:10 -->
<!-- id: five-jobs -->
## Five jobs you can hand to an assistant today

The lede, one sentence under the title, is optional.

### Research | Read everything about an account before you call
One or two sentences for the card body.

### Drafting | First drafts of email, proposals and follow-ups
Body.

notes:
What to actually say on this slide. Under 140 words.
```

Directives:

| Directive | Meaning |
| --- | --- |
| `layout:` | `title`, `divider`, `statement`, `body` (default), `cards`, `flow`, `cols`, `rows`, `two-col` |
| `eyebrow:` | the small mono label above the title |
| `time:` | a clock or elapsed-minute marker shown at the right of the eyebrow |
| `id:` | a stable name an audience can use to include or exclude this slide. Defaults to `<file>-<n>` |

Layouts:

- **title**: `#` heading is the deck title, the paragraph under it is the subtitle. Presenter line comes from `audience.yaml`.
- **divider**: section opener. Numbered automatically.
- **statement**: one big sentence. A paragraph under it becomes the attribution line. `*emphasis*` turns flame orange.
- **body**: heading, then any markdown. Bulleted lists get the `>` marks. A `> blockquote` becomes a dark quote panel (second paragraph is the attribution). A fenced code block tagged `prompt` becomes a dark prompt card, which is the one thing people photograph.
- **cards**: each `### Kicker | Title` becomes a card; the text under it is the card body. Two to four cards.
- **flow**: each `### Step` becomes a numbered step joined by `>` arrows. Three to five steps.
- **cols**: each `### Label` becomes a column with a mono label. Two or three.
- **rows**: each `### Mono label | Bold phrase` with a line of text under it becomes one aligned row. Up to six.
- **two-col**: the body is split on a line that is exactly `|||`; left and right render as free markdown.

## Variables

Write `{{company}}`, `{{product}}`, `{{crm}}`, `{{buyer}}` and so on anywhere in a module. The build substitutes them from `vars:` in the audience file, with `audiences/master/audience.yaml` as the default. An unresolved variable fails the build on purpose, so a fork never ships with a placeholder showing.

## Exercises and prompts

Put the exercise on its own slide (eyebrow `exercise`) with the prompt in a `prompt` code block, and keep the full prompt text in `prompts/` too so people can copy it from the repo after the session.
