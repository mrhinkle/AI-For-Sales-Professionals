---
id: walkthroughs
title: Walk-throughs you can run this week
minutes: { full: 20, half: 15, short: 12 }
outcomes:
  - Run four real sales workflows end to end in Claude, then save each one as a skill
---

<!-- layout: divider -->
<!-- id: divider -->
# Walk-throughs you can run this week

Four workflows from the session. Do each one once in Claude, then save it as a skill.

notes:
Each of these came up in the room. Run one this week, start to finish, inside Claude. When the output is right, say "create a skill from this chat" and you'll never set it up again. The full prompts are in the repo under prompts.

---

<!-- layout: flow -->
<!-- eyebrow: walk-through 1 · renewal quote -->
<!-- id: wt-quote-flow -->
## A renewal quote, start to finish

### Collect
Claude reads the email thread and lists what changed.

### Find
It opens the template or last year's renewal in Drive.

### Fill
A new copy with contacts, term and discounts updated.

### Check
It runs the checklist against the CRM before you see it.

notes:
This is the one the room picked first, and it's the right first pilot: it happens every month, it follows a pattern, and mistakes are expensive. The key is to do it inside Claude, not in Google Docs. If you edit in Docs, Claude only sees the finished quote. If you do it in the chat, it sees every step, and that's what it turns into a skill. Then it goes to internal review like always.

---

<!-- layout: body -->
<!-- eyebrow: walk-through 1 · the prompt -->
<!-- id: wt-quote-prompt -->
## Walk-through 1: the prompt

```prompt
I want to create a renewal quote for [customer]. Read my email thread with them and list
what changed for the new agreement year. Then find our quote template and their last renewal
in [Drive folder link]. Make a new copy; never edit the original. Fill in contacts, term,
quantities and discounts. Leave any price you can't confirm as [TBD].
Check: billing contact matches [CRM], PO and tax ID present if needed, names, dates and
totals consistent. Show me the checklist results before you save.
```

When it's right: "Create a skill called new quote from this chat, with the checklist as success criteria."

notes:
Paste the folder link the first time so it knows where the templates live. It learns the location after that. The TBD rule matters: you never want a model inventing a price. When the output is right, turn it into a skill in one sentence and the checklist becomes its success criteria.

---

<!-- layout: flow -->
<!-- eyebrow: walk-through 2 · after the call -->
<!-- id: wt-recap-flow -->
## After the call: recap, follow-up, CRM

### Transcript
From Granola, Fireflies or Zoom, straight into the chat.

### Recap
What each side owes, with dates.

### Draft
The follow-up email in your voice, asking nothing new.

### Update
CRM notes and tasks, ready for you to approve.

notes:
Everybody has an after-call routine: summarize, list the to-dos on both sides, send the follow-up, update the CRM, maybe prep a quote. That's a skill waiting to happen. Do it once in the chat with a real transcript, from an approved tool, and save it. Next time you say "recap my call with Acme" and it runs the whole routine.

---

<!-- layout: body -->
<!-- eyebrow: walk-through 2 · the prompt -->
<!-- id: wt-recap-prompt -->
## Walk-through 2: the prompt

```prompt
Here's the transcript of my call with [company]: [paste or link]. Give me:
1. A five-line recap in my words.
2. To-dos for both sides, with owners and dates.
3. A follow-up email in my voice that confirms next steps and asks nothing new.
4. CRM notes under Pain, Timeline, Budget, Decision process, Competition, Next step.
Flag anything that contradicts what we knew before the call. Draft only; don't send or update.
```

notes:
The last line is the guardrail. It drafts the email and the CRM notes, and you approve both. Once it's reliable, save it as a skill called call recap.

---

<!-- layout: flow -->
<!-- eyebrow: walk-through 3 · monthly outreach -->
<!-- id: wt-outreach-flow -->
## Monthly customer outreach on a schedule

### Pull
Customers with renewals or milestones in the next 90 days.

### Context
Last calls, open tickets and notes for each one.

### Draft
One short note per customer, in your voice.

### Queue
The list lands with you on the 1st. You send.

notes:
This came from customer success: can it tell me who I should be reaching out to this month instead of building another automated workflow? Yes. Run it once by hand, check that the list is right, then schedule it for the first of the month. It does the prep. You decide who gets what.

---

<!-- layout: body -->
<!-- eyebrow: walk-through 3 · the prompt -->
<!-- id: wt-outreach-prompt -->
## Walk-through 3: the prompt

```prompt
From [CRM], list my customers with a renewal, contract milestone or no contact in 60 days,
for the next 90 days. For each: why now, the last conversation (from email and call notes),
and any open issue. Draft a short check-in for each in my voice. Put it in a table I can
review, and don't send anything.
```

Then: "Schedule this for the 1st of every month at 8 a.m. and send me the list."

notes:
Start with a short list so you can check every row. When you trust it, schedule it. If a customer has an open support issue, the draft should mention it, or it should hold the draft for you. That's a rule to add after the first run.

---

<!-- layout: flow -->
<!-- eyebrow: walk-through 4 · a signal to a first email -->
<!-- id: wt-prospect-flow -->
## From a buying signal to a first email

### Signal
A download, a pricing-page visit, a post about the problem.

### Research
What they do, what changed, who owns the problem.

### Contact
Find the buyer in Apollo, not just whoever downloaded.

### Draft
Three short first touches. You pick one and send.

notes:
Here's the classic one. Someone at a big account downloads your open source project. The person who downloaded it usually isn't the buyer. Have Claude research the company, find who actually owns the problem, look them up in Apollo, and draft three short emails with a real reason to talk. This is what the Prospector skills and the demo prospecting app do for a whole list at once.

---

<!-- layout: body -->
<!-- eyebrow: walk-through 4 · the prompt -->
<!-- id: wt-prospect-prompt -->
## Walk-through 4: the prompt

```prompt
[Company] showed a buying signal: [what happened, with the link]. Research them: what they do,
what changed in the last six months, and who owns [the problem we solve] there.
Find the right buyer in Apollo, not just the person behind the signal. Cite a source for
every fact and mark anything unsourced UNVERIFIED. Then draft three first-touch emails
under 90 words in my voice, one question each. Don't send anything.
```

notes:
Read the brief before the drafts. If the research is wrong, the email will be confidently wrong. Click two of the sources. Then pick the draft that sounds most like you and cut what you wouldn't say on the phone.
