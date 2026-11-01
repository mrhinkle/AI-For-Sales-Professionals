# Outside review: moonshotai/kimi-k3 · 2026-11-01 · via OpenRouter · reasoning_effort=low · max_tokens=10000 · input: review-prompt.md + deck-text.md (36 slides) · generation gen-1793566987-pvU5hZqtOJsea7ThJKUn · 6,315 in / 2,598 out (1,194 reasoning) · completed in one call

**Verdict:** The bones are good — the run-of-show math holds at 60 minutes and the voice is right about 85% of the time — but the deck promises a hands-on session the brief explicitly says it isn't, the guardrails module name-checks "email law" without giving the team the one rule they actually need, and two factual claims will get Mark challenged by this specific audience.

---

**Findings, ranked by impact:**

**01 + 04 + 11 · accuracy/risk (session design) ·** The brief says "no hands-on exercises, one live demo thread run by the presenter," but the deck tells the room the opposite three times. Slide 01 notes: "by the end you will have run three real prompts on your own accounts." Slide 04 notes: "Flag the hands-on bits so people get a real account ready. Ask them to open the assistant they already use." Slide 11 notes: "Have everyone paste this into their assistant now." With seven people on Zoom this either burns 15 minutes on dead air or sets a promise the clock can't keep. **Fix:** Slide 01 notes → "By the end you'll have seen three real prompts run on one live target account, and you'll know which one to run on your own tomorrow morning." Slide 04 notes → "Nothing to open, nothing to install. I'll drive; you watch and heckle. You'll get every prompt afterward to run yourself." Slide 11 notes → "I'll fill this in live for our target account. Copy the skeleton down or grab it from the repo after."

**13–17 module · flow ·** The run of show allocates 10 minutes to the research demo and 10 to outreach-plus-inbound, but no slide marks where the demo actually happens. Mark will be improvising the transition from prompt card to live screen share. **Fix:** Add one divider before slide 15 titled "Watch me burn ten minutes on [target account]" with notes: "Run the prompt from the last slide live. Think out loud. When UNVERIFIED flags appear, stop and point at them — that's the moment to land." Same before slide 19: "Now the email, from the brief we just built. Same account, same thread."

**21 · accuracy/risk ·** "Automating connection requests gets company accounts restricted" is wrong — LinkedIn restricts the individual's account, not a company asset, and seven sellers will catch that. Also, the whole sequence slide describes cold email automation with zero compliance mechanics; slide 30's "Email law" is three words. For a team sending from Apollo sequences this is the gap most likely to bite. **Fix:** bullet 2 → "LinkedIn stays a manual task. Automation gets your personal account restricted, and it reads like spam anyway." Add to slide 30 rule 4 notes: "One sentence on email law: every cold email needs a working unsubscribe and a real postal address — CAN-SPAM applies to us, and Apollo handles both if the template is set up right. Check with ops before the first send."

**06 · accuracy ·** "Faster than you, and it doesn't skim" is an overclaim — long-document summarization does drop details, and this audience of seller-to-SRE people knows someone who's been burned by exactly that. **Fix:** → "Faster than you, and it doesn't get tired. It does miss things, which is why the sources matter."

**07 · density ·** Six rows violates the four-bullet rule and it's the slide that runs longest in the "where AI fits" module. **Fix:** Cut the Propose row (proposals are never demoed and barely mentioned again) and merge Research/Prospect into one row: "Research / The brief and who to call: One prompt, a company name, ten minutes. Ranked against your ICP, with sources."

**20 · clarity ·** Typo in the notes: "makes no a free answer." → "makes 'no' a free answer." Also note the "before" email deliberately uses "unlock value," "drive outcomes," "journey" — that's fine as a straw man, but have Mark flag it so it doesn't read as his own register: add to notes, "Say up front: I wrote the left one to be bad on purpose. Those are real phrases from real vendor emails."

**23 · audience fit ·** "For anyone who saw the plan I sent Gary last week" assumes knowledge the room may not share and makes this slide incomprehensible to anyone who didn't. It's also the densest slide in the deck. **Fix:** notes → "Quick context: Buoyant is building an inbound motion in HubSpot. This is that system, one level up from what you've been doing by hand. Same rule: machine sorts and drafts, a person sends." Cut the visible row 01 to "Form fill: HubSpot contact lands, enriched" — Apollo/HockeyStack names belong in notes.

**29 + 32 · flow ·** Six divider slides (09, 13, 17, 24, 29, 32) cost ~90 seconds of dead air each on Zoom for seven people. **Fix:** Cut 29 and 32 outright; fold their one-line statements onto slides 30 and 33 as the opening sentence in notes. Keep 09 and 13 if the demo dividers above are added, since something has to mark the screen-share transitions.

**34 + 32 · flow ·** Slides 32, 33, and 34 say "pick one workflow" three times in a row. **Fix:** Cut 34, move its line into slide 33's closing notes: "Last word: pick one of these five. Every day for two weeks. Then add the next."

**18 · voice ·** "It's proof you did the ten minutes" is fine, but the slide reads as two aphorisms stacked; Mark's rule is point first, reassurance second. Acceptable — but the notes are stronger than the slide. Minor: leave it.

**31 · accuracy ·** The 99%-of-1000 math is sound, but frame it as arithmetic, not a measured error rate: notes → "I'm not claiming models are 99 percent accurate. I'm saying even if they were, the math still gets you." Preempts the pedant in the room.

---

**Three slides to fix first:** 01 (and its echoes in 04/11 — the hands-on promise contradicts the session design), 21 (wrong LinkedIn claim plus the missing email-law mechanics), and the 13–17 module (the 10-minute live demo has no slide and no marked transition, which is where the whole session lives or dies).
