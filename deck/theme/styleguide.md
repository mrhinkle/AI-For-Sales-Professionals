---
id: styleguide
title: Style guide
minutes: { full: 0, half: 0, short: 0 }
outcomes:
  - Every layout the builder knows, rendered in the current theme, with the rule for using it
---

<!-- layout: title -->
<!-- eyebrow: the aie network · training template -->
<!-- id: title -->
# {{title}}

{{subtitle}}

notes:
This is the title layout. The eyebrow comes from audience.yaml, the presenter line too. One sentence of subtitle, never two. Notes are the talk track: what you say, under 140 words, press N to see them.

---

<!-- layout: agenda -->
<!-- eyebrow: agenda · generated -->
<!-- id: agenda -->
## The agenda layout builds itself from the module list

notes:
Nothing to write. The build lists every module in the audience file with its minutes for the chosen length, skipping Opening and Close.

---

<!-- layout: divider -->
<!-- id: divider -->
# The divider opens a section

One sentence under it that says what the section gives them. The counter is automatic.

notes:
Use one divider per module. The number counts dividers, not modules, so the opening module usually has none.

---

<!-- layout: divider -->
<!-- photo: photos/room.jpg -->
<!-- credit: All Things AI, Durham -->
<!-- id: photo-divider -->
# A photo under the veil is a breath, not a layout

Title, divider and statement slides take a `photo:` directive. Type turns white, the logo too.

notes:
One photograph every four or five slides keeps a remote room awake. Real rooms only. Credit anything that isn't Mark's own with the `credit:` directive.

---

<!-- layout: statement -->
<!-- eyebrow: statement -->
<!-- id: statement -->
# One sentence the room should remember, with *one phrase* in flame.

The optional line under it carries the reassurance or the source. Keep it to two short sentences.

notes:
Statement slides are the breathing room. One per module at most, usually the rule or the reframe. Say it, pause, move on.

---

<!-- layout: body -->
<!-- eyebrow: body · list -->
<!-- id: body-list -->
## A body slide with a list reads as four marks, not bullets

- The first point, in about twelve words, as a sentence you'd say
- The second point. No period at the end, no exclamation points anywhere
- Three is a good number. Four is the limit
- Every list item starts with the point, then the reason

notes:
The default layout. A heading and markdown. Lists become the node marks. Keep the heading a sentence in Mark's voice, not a headline. If the heading runs past sixty characters it drops a size on its own.

---

<!-- layout: body -->
<!-- eyebrow: body · prompt card -->
<!-- id: body-prompt -->
## The prompt card is the one thing people photograph

```prompt
Fenced code tagged "prompt" becomes this card. Keep it under ninety words.
Use [brackets] for the parts they fill in. One card per slide, never two.
The same text lives in prompts/ so nobody has to transcribe it.
```

notes:
The dark card is reserved for prompts and quotes. Don't put a prompt in a bulleted list; put it here. Say "this one's in the repo" so they stop typing.

---

<!-- layout: body -->
<!-- eyebrow: body · quote -->
<!-- id: body-quote -->
## A blockquote becomes the quote panel

> Every cycle, the winners weren't the earliest adopters. They were the ones who understood what the thing *actually was* before they bet their week on it.
>
> Mark Hinkle, on three platform shifts

notes:
Two paragraphs in the blockquote: the quote, then the attribution. Emphasis in the quote turns flame.

---

<!-- layout: cards -->
<!-- eyebrow: cards · two to four -->
<!-- id: cards -->
## Cards hold two to four parallel ideas

The optional lede sits under the heading, one sentence.

### Kicker | A short card title
One or two sentences of body. Cards are for things that sit side by side and deserve equal weight.

### Kicker | Second card
The rule at the foot of the card cycles flame, blue, ink so the eye can tell them apart.

### Kicker | Third card
A card can hold a short list too, but three lines is the limit before it overflows.

notes:
Use `### Kicker | Title`. Without the pipe, the whole line is the title. Four cards fit; five do not.

---

<!-- layout: flow -->
<!-- eyebrow: flow · three to five steps -->
<!-- id: flow -->
## Flow steps are joined by the node rule

### Collect
Three to five steps. Each one a verb. A sentence or two under it.

### Draft
The join between steps is a flame rule, the counter is a node.

### Check
Steps read left to right in the order they happen.

### Send
Last step is the outcome, so name it plainly.

notes:
Use flow for anything that happens in order. Use cards for things that don't.

---

<!-- layout: rows -->
<!-- eyebrow: rows · up to six -->
<!-- id: rows -->
## Rows are a reference table you point at, not read

### Label | The bold phrase in the middle
The one line of explanation on the right.

### Label | Second row
Six rows fit. Each row is a mono label, a bold phrase, one line.

### Label | Third row
Say "point, don't read" in the notes for any rows slide.

### Label | Fourth row
Rows are also what the agenda uses.

notes:
Use `### Label | Phrase` with one line of text under it. This is the layout for maps of a week, a day, a process. Don't read it aloud.

---

<!-- layout: cols -->
<!-- eyebrow: cols · two or three -->
<!-- id: cols -->
## Columns compare two or three things side by side

### What it's good at
- Reading and summarizing
- First drafts and rehearsal
- Playing the skeptical buyer

### What it isn't
- Knowing your buyer
- Judgment on when to push
- Anything you'd send unread

notes:
Each `###` is a column with a mono label. Columns are free markdown: lists, paragraphs, even a small prompt card.

---

<!-- layout: two-col -->
<!-- eyebrow: two-col · before and after -->
<!-- id: two-col -->
## Two columns of free text, split on a line of three pipes

**Before**

Hi Sarah, I hope this finds you well. I'm reaching out because leading companies trust us to drive outcomes on their journey.

|||

**After**

Sarah, your team posted four platform roles last month. What are you trying to fix first? If it's not on your radar, say so and I'll stop.

notes:
A bold line alone at the top of each side becomes the column label. The classic use is before and after.

---

<!-- layout: image -->
<!-- eyebrow: image · full width -->
<!-- id: image-full -->
## A screenshot runs full width in the window frame

![theaie.net, the site this template matches, November 2026](screenshots/theaie-net.jpg)

notes:
The `image` layout with no side text. The caption says what it is and where it came from, under twelve words. Real product, real page, never a mockup.

---

<!-- layout: image -->
<!-- eyebrow: image · with side text -->
<!-- id: image-side -->
## Or sits beside three lines of text

- The text goes left, the screenshot right
- Three lines at most, or the image shrinks past reading
- Say what to look at in the caption

|||

![Claude Projects: where the three files live, November 2026](screenshots/claude-projects.jpg)

notes:
Split the body on a line of three pipes: text on the left, the image on the right. Point at one thing in the screenshot and move on.

---

<!-- layout: links -->
<!-- eyebrow: links · up to six -->
<!-- id: links -->
## Links render as a title, an address and one line

### The repository | https://github.com/mrhinkle/ai-for-sales-training
The deck, the speaker notes, every prompt, and how to point a chatbot at it.

### The AIE Network | https://theaie.net
Seven newsletters, four mornings a week, and the training programs.

### All Things AI | https://allthingsai.org
The conference in Durham, April 18 to 20, 2027.

### Mark Hinkle | mailto:mrhinkle@peripety.com
Questions after the session.

notes:
Two columns, six at most. Put the same links in the close slide's notes so they land in the chat on a remote session.

---

<!-- layout: body -->
<!-- eyebrow: body · table -->
<!-- id: table -->
## A markdown table becomes the comparison table

| Length | Minutes | Shape |
| --- | --- | --- |
| short | 60 | Primer, live demo, no exercises |
| half | 150 | Workshop, exercises on real accounts |
| full | 260 | Full day plus a 30-day follow-up |

notes:
Tables are for numbers and reference. Below five rows, use rows instead. Tell the room to photograph it.

---

<!-- layout: body -->
<!-- eyebrow: exercise · 8 minutes -->
<!-- id: exercise -->
## An exercise slide carries the time in the eyebrow and the steps as a list

- Say what to do, in order, in four lines at most
- Put the prompt they'll run on the previous slide, not here
- Name the debrief: what you'll ask for when the timer ends
- Walk the room while it runs

notes:
Exercise slides are excluded from the short program by id (`exercise-*`). Keep them to one slide per module.

---

<!-- layout: statement -->
<!-- eyebrow: close -->
<!-- id: close -->
# Thanks. That's every layout.

{{presenter}} · {{contact_email}}

notes:
The close is a statement slide with the contact line as its support text.
