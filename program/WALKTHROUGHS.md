# Walk-throughs

Four sales workflows to run end to end in Claude, then save as skills. They come from a live session with a go-to-market team (sales, customer success, marketing and operations) and the questions they asked. Each one has the steps, the prompt, what to check, and the sentence that turns it into a skill.

Before you start: use the Claude desktop app on your company account, connect the tools your admin has approved (email, calendar, CRM, Drive), and write your personal instructions ([prompts/12-instructions-brain-dump.md](../prompts/12-instructions-brain-dump.md)). The rule for all four: the AI drafts, you send.

## How every walk-through works

1. **Do it in Claude, not in the other app.** If you edit the quote in Google Docs, Claude only sees the finished file. If you do it in the chat, it sees every step, and the steps are what become the skill.
2. **Get the output right before you save it.** Whatever is wrong in the first good run gets copied every time after.
3. **Save it in one sentence.** "Create a skill called [name] from this chat."
4. **Add success criteria.** The checks you'd give a new hire: required fields, links that work, length, format, where to save.
5. **Share it.** Put the skill and its examples in the team's shared Drive or a Claude project.
6. **Ask for it to learn.** "Make this skill self-improving and keep a memory file." After each run it proposes lessons; keep the ones you agree with.

## 1. A renewal quote, start to finish

**Who:** customer success, operations, account managers. **Time to first good run:** about 30 minutes.

**Steps**

1. Collect: Claude reads the email thread with the customer and lists what changed for the new agreement year (users, infrastructure, term, contacts).
2. Find: it opens the quote template or last year's renewal in the Drive folder you name.
3. Fill: it makes a new copy and fills in contacts, term, quantities and discounts. It never edits the original.
4. Check: it runs the checklist against the CRM before you see the draft.
5. Review: you read it, then it goes through internal review as usual.

**Prompt:** [prompts/13-renewal-quote.md](../prompts/13-renewal-quote.md)

**Checklist (success criteria for the skill)**

- Billing contact is on file and matches the CRM
- PO number and tax ID are present when this customer needs them
- Customer name, legal entity, dates and totals match across the quote and the agreement
- Tax is applied, or not, by the customer's location
- Any price the model can't confirm is left as [TBD], never invented
- The new file is saved to the right folder with the team's naming convention

**Save it:** "Create a skill called new quote from this chat, with the checklist as success criteria." When a policy changes: "Update the new quote skill with our new renewal terms."

## 2. After the call: recap, follow-up, CRM

**Who:** anyone who runs calls. **Time to first good run:** 10 minutes.

**Steps**

1. Transcript: paste or link the recording from Granola, Fireflies or Zoom. Use a tool your company approved for customer conversations.
2. Recap: five lines in your words, then the to-dos for both sides with owners and dates.
3. Draft: a follow-up email in your voice that confirms next steps and asks nothing new.
4. Update: CRM notes under your team's headings, ready for you to approve.

**Prompt:** [prompts/14-call-recap.md](../prompts/14-call-recap.md)

**Check:** names and dates against the transcript, no promise you didn't make, nothing written to the CRM until you approve it.

**Save it:** "Create a skill called call recap from this chat." After that, "recap my call with [company]" runs the routine.

## 3. Monthly customer outreach on a schedule

**Who:** customer success and account managers. **Time to first good run:** 20 minutes, then it runs itself.

**Steps**

1. Pull: customers with a renewal, a contract milestone, or no contact in 60 days, for the next 90 days.
2. Context: the last conversation, open support issues and notes for each.
3. Draft: one short check-in per customer, in your voice.
4. Queue: a table you can review. Nothing is sent.
5. Schedule: once the list is right, run it on the 1st of every month.

**Prompt:** [prompts/15-monthly-outreach.md](../prompts/15-monthly-outreach.md)

**Check:** every customer on the list belongs there, open issues are mentioned or the draft is held, and no one is contacted twice by two teammates. Add the rules you discover as lessons.

**Save it:** "Create a skill called monthly outreach from this chat, then schedule it for the 1st of every month at 8 a.m."

## 4. From a buying signal to a first email

**Who:** sellers and SDRs. **Time to first good run:** 15 minutes.

**Steps**

1. Signal: something happened. A download from a large account, a pricing-page visit, a post about the problem you solve.
2. Research: what the company does, what changed in six months, who owns the problem. A source for every fact.
3. Contact: find the actual buyer in Apollo, not just the person behind the signal.
4. Draft: three first touches under 90 words, one question each, in your voice.
5. Send: you pick one, cut what you wouldn't say on the phone, and send it yourself. LinkedIn steps stay manual.

**Prompt:** [prompts/16-signal-to-first-touch.md](../prompts/16-signal-to-first-touch.md)

**Check:** the company domain is right (look-alike names get blended), two sources clicked, titles confirmed on LinkedIn, anything marked UNVERIFIED either verified or cut.

**Save it:** "Create a skill called signal to first touch from this chat." For a whole list at once, this is what the Prospector skills and the demo prospecting app do.

## Questions teams ask in week one

| Question | Short answer |
| --- | --- |
| Should we tell people we use AI? | Decide as a team. Customers are starting to ask vendors for their AI stance. A line in your email signature works. You still own every send. |
| We're on Google Workspace. Why not Gemini? | Either can work. Claude's connectors and tooling have been ahead; Gemini is strong on images and slides. |
| My settings look different from the demo. | Team and Enterprise admins control some settings. Use the search box in Settings for "instructions" or "memory." |
| Can we connect Gmail and Drive? | Ask your admin which connectors are approved. Keep sensitive folders out until they say yes. |
| Where do we start? | Desktop app, approved connectors, a shared Drive, your instructions. Then skills, as you do real work. |
| Marketing has a brand voice file. Is that a skill? | It's context. Add a skill that says how to use it: copy, don't overwrite, where to save. Include examples. |
| Do I have to call a skill by name? | No. Ask for the task. It picks the skill, and triggers more reliably as memory fills in. |
| Can it plan our customer outreach every month? | Yes, as a scheduled task. It prepares the list and drafts. You send. |
| What's the Claude Code tab? | The same Claude pointed at software. Developers use it. Most sellers can stay in chat. |

## The first 30 days

| When | What |
| --- | --- |
| Week 1 | Desktop app, approved connectors, your instructions, memory on |
| Week 2 | A shared Drive with templates, examples, brand voice and a skills folder |
| Week 3 | One pilot workflow done end to end in Claude |
| Week 4 | Save it as a skill with success criteria, share it, schedule the prep |
| Every quarter | Prune memory, update skills, retire what's stale |
