# Outside review: z-ai/glm-5.3 · 2026-11-01 · via OpenRouter · reasoning_effort=high · max_tokens=12000 · input: review-prompt.md + deck-text.md (36 slides) · generation gen-1793566911-FOArJtViuLwj8t8CJ8CJ · 6,311 in / 11,375 out (10,158 reasoning)

**Verdict.** The structure matches the run of show, the notes are all inside the word budget, and the voice is close — but the opening promises a hands-on session the design doesn't include, the guardrails module makes two claims a technical-adjacent room will push on, and slide 7 maps six workflows when the session demos four. Fix those and the deck holds.

**Findings, ranked:**

1. **Slides 01, 04, 11 · accuracy/flow ·** The opening promises "you will have run three real prompts on your own accounts," slide 4's notes say "flag the hands-on bits," and slide 11's notes say "Have everyone paste this into their assistant now and fill in the brackets." This is a primer with a presenter-run demo; if seven people start filling brackets, the eight-minute module dies. Fix the notes: 01 → "by the end you'll have watched three prompts run on one real account, and you'll know which one to run tomorrow morning." 04 → "Flag the demo bits so people have a real target account in mind. Following along in their own assistant is optional; don't wait on them." 11 → cut "Have everyone paste this into their assistant now" and replace with "This is the prompt I'll run in the demo. It's in the repo — fill in the brackets on your own account this week."

2. **Slide 30 · accuracy ·** Rule 02: "The paid account has the data retention and training settings your security team agreed to. Your personal login doesn't." A paid personal seat does not carry enterprise retention controls, and this varies by vendor — someone will ask "which plan, what setting?" Replace with: "Use the company seat: The team or business account has the retention and training settings your admin set. Your personal login doesn't." Keep the notes' "ask your security team which tool is approved."

3. **Slide 30 / 21 · accuracy ·** Rule 04 names "email law" but no slide states it. Automated Apollo sequences without a working opt-out and the company postal address are a CAN-SPAM problem. Fix rule 04: "It never sends: Email law needs a real opt-out and your company address on every automated send. A person reads and hits send."

4. **Slide 07 · density/flow ·** Six rows, two of which (Prospect, Propose) are workflows the session never demos. On Zoom it's a wall. Cut to four rows — Research, Reach out, Meet, Follow up — and add to the notes: "Ranking lists and drafting proposals are week two. Today we demo the four on screen."

5. **Slides 09, 13, 17, 23, 24, 29, 32 · clarity ·** Divider numbers (01–06) don't match the agenda (02–08) because "where AI fits" has no divider. Every cross-reference the audience makes will be off by one. Renumber the dividers to match the agenda: 02, 03, 04, 05 (label slide 23), 06, 07, 08.

6. **Slide 23 · density/audience ·** Four steps at 15–20 words each for a two-minute slot, plus "the plan I sent Gary" assumes everyone saw it. Trim each step to about ten words ("Form fill: Contact lands. Apollo and HockeyStack enrich."), and add to the notes: "If you didn't see the plan, this is it in four steps."

7. **Slide 33 · density ·** Five rows breaks the four-bullet rule, and Day 5 duplicates the skeptic prompt from slide 27. Merge Days 2–3 into one row ("Brief three accounts, then rewrite one sequence: ten minutes each. Click the links. Approve the first send yourself."), retitle "One habit a day for your first week."

8. **Slide 28 · accuracy/flow ·** The demo pastes a customer transcript into an assistant two slides before the guardrails module that forbids exactly that with a free tool. Add one line to slide 25's notes: "One rule preview: the transcript is customer data, so this demo runs in the company's approved tool."

9. **Slide 35 · accuracy ·** The GitHub URL is unverifiable from here; a dead repo link in the closing slide is the kind of thing this audience screenshots. Confirm the repo is live and public before Wednesday, or change the bullet to "Repo link in chat — deck, notes, and every prompt."

10. **Slides 15, 19, 26, 27, 28 · density ·** The prompt cards are 50–80 words each; nobody transcribes that off a Zoom screen mid-demo. Add to slide 15's notes: "I'll paste each prompt in chat as I run it; they're all in the repo."

11. **Slides 32/34 · flow ·** Slide 34 repeats slide 32's divider line almost verbatim back to back. Cut slide 34 and let slide 36's "Go brief three accounts before Friday" carry the action ask.

12. **Slide 26 · audience fit ·** Missed opportunity for a team selling to platform engineers: the prep prompt should mine the buyer's tech. Add one item: "the two technical terms from the brief I should be able to explain in one sentence." It's also a strong demo beat.

**Three slides to fix first:** 30 (two claims that can embarrass the presenter), 07 (the session map, cut to four rows), and 01 (with the matching notes on 04 and 11 — set the right promise before anyone tunes out).
