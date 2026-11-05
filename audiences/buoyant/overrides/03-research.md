---
id: 03-research
title: Research an account
minutes: { full: 35, half: 20, short: 10 }
outcomes:
  - Produce a sourced one-page account brief and a one-line "why now" hypothesis
---

<!-- layout: divider -->
<!-- id: divider -->
# Research an account

The brief you'd want before any first call, with links, from a company name.

notes:
This is the fastest payback in the whole session. Most reps either skip research or spend an hour on it. Ten minutes, every time, is the goal.

---

<!-- layout: flow -->
<!-- eyebrow: research -->
<!-- id: research-flow -->
## Collect, brief, verify, then one sentence on why now

### Collect
Their site, latest news, open job postings, the annual report if public, and the LinkedIn pages for your two or three contacts.

### Brief
One prompt, with your ICP and product files loaded, produces the page.

### Verify
Every claim gets a link. No link, no claim. Fix the two things it got wrong.

### Why now
One line you could say out loud: the trigger, the likely pain, your angle.

notes:
Collect is where most of the ten minutes goes, and it's mostly copy and paste. If your assistant can browse, let it, but still paste the job postings. Hiring is the best public signal of what a company is about to do. Verify is non-negotiable. The brief is a draft, not a fact sheet, until you've clicked the links.

---

<!-- layout: links -->
<!-- eyebrow: research · where the ten minutes go -->
<!-- id: collect-sources -->
## Six places to collect from, in the order that pays

### Their job postings | https://www.linkedin.com/jobs
What they're about to build, in their own words. The best public signal there is.

### Their newsroom and blog | the company site
What they want the world to know this quarter. Read the last three posts.

### SEC filings | https://www.sec.gov/edgar/search
For public companies: risk factors and spending, searchable by phrase.

### Funding and headcount | https://www.crunchbase.com
Recent rounds, growth, who's on the board. Free tier is enough.

### Your two contacts | https://www.linkedin.com
Title, tenure, what they posted about. Confirm the title before you use it.

### Your own CRM | {{crm}}
What anyone at your company already knows about them. Check before you cold-call a customer.

notes:
Point, don't read. The order matters: job postings first because they're the freshest signal, your own CRM last because it's the one people forget and the one that's most embarrassing to miss. All six links are in the repo.

---

<!-- layout: body -->
<!-- eyebrow: research · the prompt -->
<!-- id: account-brief-prompt -->
## The account brief prompt

```prompt
Build a one-page account brief on [Company]. Use my ICP and product files.
Sources attached: [paste or link site, news, job posts, filings, contact profiles].

Sections: what they do and how they make money; what changed in the last six months;
what they're hiring for and what that says; who my contacts are and what they care about;
where {{product}} plausibly fits, in their words; three discovery questions; one "why now" sentence.
Cite a source for every factual claim. If you can't source it, mark it UNVERIFIED.
```

notes:
Read the last line out loud. UNVERIFIED in capital letters is the whole trick. The model will tell you what it's unsure of if you give it permission. Then the brief becomes a to-do list for your own checking instead of a trap.
@short I'll paste each prompt in the chat as I run it; they're all in the repo. Nobody needs to transcribe a slide.

---

<!-- only: short -->
<!-- layout: body -->
<!-- eyebrow: live demo · Spotify research -->
<!-- id: demo-research -->
## Spotify gives us evidence, but no buying signal

- 2021 Kubernetes article: historical architecture, not today's need
- 2025 perimeter outage: no proof Linkerd would prevent it
- Current buyer, initiative and customer relationship remain unknown
- Prospector qualify, or the saved prompt with no plugin

notes:
Open demo/sources.md and the synthetic voice, ICP and product files. Spotify is a public research candidate, not an approved Buoyant target. Run /prospector:qualify Spotify using only that source pack. Click the 2021 article and check its date. The rehearsed qualifier assigned fit 2/5 and timing 0/5; those are subjective judgments, not probabilities. It did no independent browsing. Say: we have no verified why-now. If loading fails once or stalls for thirty seconds, paste demo/fallback-prompt.txt into an ordinary chat. If the network fails too, open demo/fallback-result.md. Ask what current need we would have to verify.
---

<!-- layout: body -->
<!-- eyebrow: research · what to check -->
<!-- id: what-to-check -->
## Four things it gets wrong, and how you catch them

- Stale people. Titles change. Check the two contacts on LinkedIn before you mention them
- Look-alike companies. Two firms with similar names get blended. Confirm the domain
- Invented numbers and quotes. If you can't click to it, it didn't happen
- Trigger events that are old news. Check the date on anything it calls recent

notes:
These four cover almost every embarrassing research mistake I've seen. They take ninety seconds to check and they are the difference between sounding prepared and sounding like you used a bot. Which is exactly what the buyer is listening for right now.

---

<!-- layout: body -->
<!-- eyebrow: exercise · 8 minutes -->
<!-- id: exercise-research -->
## Pick a real target account and run it

- Choose an account you're actually working. Not a famous one, one of yours
- Collect for four minutes, run the prompt, read the brief
- Click two links. Fix what's wrong. Write the "why now" sentence in your own words
- We'll hear three "why now" sentences from the room

notes:
Use the Prospector companion exercise in program/PROSPECTOR.md, or the account-brief prompt if the plugin is unavailable. Eight minutes with a timer on the screen. Walk the room and look for people stuck on Collect; help them grab the job postings. The debrief is the "why now" sentences. Push back gently on vague ones. If it isn't something you'd say on a call, it isn't done.
