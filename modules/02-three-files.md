---
id: 02-three-files
title: Set it up once, the three files
minutes: { full: 30, half: 20, short: 8 }
outcomes:
  - Start a voice file, an ICP file, and a product file your assistant reads before every task
  - Brief an assistant the way you'd brief a new hire
---

<!-- layout: divider -->
<!-- id: divider -->
# Set it up once

Three short files turn a generic chatbot into something that knows how you sell.

notes:
This is the module people skip, and it's the one that makes everything else work. Twenty minutes, once.

---

<!-- layout: cards -->
<!-- eyebrow: the three files -->
<!-- id: three-files -->
## Three files your assistant reads before every task

### Voice | How you actually write
Five emails you were proud of. Three you'd never send. A line about how you talk to {{buyer}}.

### ICP | Who buys, who doesn't
Company size, titles, the trigger events that make them call, and what disqualifies a lead on sight.

### Product | {{product}} in the buyer's words
What it does, the three problems it fixes, proof you can name, and what you're not allowed to promise.

notes:
Plain text, each under a page. Keep them in whatever your assistant calls a project or a folder, so they load automatically. The voice file is the one people underestimate. Give it your real emails and it stops sounding like a brochure. The ICP file is what makes research and list-ranking useful. The product file keeps it from inventing features.

---

<!-- layout: body -->
<!-- eyebrow: briefing -->
<!-- id: brief-like-a-new-hire -->
## Brief it like a new hire, not like a search box

```prompt
You're helping me, an account executive at {{company}}. We sell {{product}} to {{buyer}}.
Read my voice, ICP and product files first.

Task: [what you want, in one sentence]
Who it's for: [name, title, company, what you know about them]
What good looks like: [length, tone, the one ask]
Don't: [anything you'd be embarrassed by]
Before you write, ask me up to three questions if anything is unclear.
```

notes:
Five lines. Who you are, who it's for, what you want, what good looks like, what to avoid. Then the magic line: ask me questions first. A new hire who asks three good questions before starting beats one who guesses. Same here.
@full,half Have everyone paste this into their assistant now and fill in the brackets for a real account.
@short This is the skeleton I'll fill in live for our target account. Grab it from the repo after; don't type it now.

---

<!-- layout: body -->
<!-- eyebrow: briefing -->
<!-- id: three-habits -->
## Three habits that fix most bad answers

- Give it the source material. Paste the page, the transcript, the job post. Don't make it guess
- Ask for three options, then pick and refine one. Never accept the first draft
- Tell it what to check. "Flag anything you're not sure is true" works better than hoping

notes:
Most complaints about these tools come down to under-briefing. People type nine words and get a generic answer, then decide it doesn't work. Feed it, ask for options, make it show its doubts. That's it. Demo one bad prompt and one good prompt live if time allows.

---

<!-- layout: body -->
<!-- eyebrow: exercise · 6 minutes -->
<!-- id: exercise-voice-file -->
## Build your voice file right now

```prompt
Here are five emails I've sent that I think are good, and three I'd never send.
[paste them]
Write a one-page style guide for writing as me: sentence length, how I open and close,
words I use, words I never use, how formal I am with {{buyer}}.
Then draft a two-line test email in my voice so I can check it.
```

notes:
Six minutes. Phones away, open the sent folder, find five. If they can't find five they're proud of, three is fine. Walk the room. The test email at the end is the check: if it doesn't sound like them, they tell it what's off and run it again. Save the result as voice.md.
