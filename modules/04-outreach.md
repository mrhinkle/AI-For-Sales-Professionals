---
id: 04-outreach
title: Outreach that sounds like you
minutes: { full: 40, half: 25, short: 10 }
outcomes:
  - Draft a first-touch email under ninety words in your own voice from a research brief
  - Know what to automate in a sequence and what stays manual
---

<!-- layout: divider -->
<!-- id: divider -->
# Outreach that sounds like you

Short, specific, one ask, and nothing goes out you didn't read.

notes:
Everyone in the room has received AI-written outreach this week. They can smell it. The goal is the opposite: email that reads like a person who did ten minutes of homework.

---

<!-- layout: statement -->
<!-- eyebrow: outreach -->
<!-- id: personalization -->
# Personalization isn't their name in the first line. It's proof you did the ten minutes.

The trigger sentence from your brief is the personalization. Everything else is just polite.

notes:
"Hi Sarah, I saw you're the VP of Platform at Acme" is not personalization. It's mail merge. "Your team posted four Kubernetes roles last month" is. The research module feeds this one directly.

---

<!-- layout: body -->
<!-- eyebrow: outreach · the first touch -->
<!-- id: first-touch -->
## Under ninety words, one ask, an easy out

```prompt
Using my voice file and the account brief for [Company], write a first-touch email to [Name, Title].
Rules: under 90 words, plain text, no bullet points, no buzzwords.
Open with the trigger from the brief in one sentence. Ask one plain question about what they're
trying to solve. Offer the docs or 20 minutes, their choice. Close with a line that makes it easy
to say no. Give me three versions with different openings.
```

notes:
Ninety words is a real constraint and the model respects it. The easy out matters: "if this isn't on your radar, tell me and I'll stop" gets replies because it costs the reader nothing. Three versions, then you pick and tune. Never the first draft.

---

<!-- only: short -->
<!-- layout: statement -->
<!-- eyebrow: live demo · outreach -->
<!-- id: demo-outreach -->
# Now the email, from the brief we just built.

Same account, same thread. Three versions, pick one, count the words.

notes:
Back to the screen share. Run the first-touch prompt with the brief still in the conversation. Read the three versions out loud, pick the one that sounds most like a person, cut anything you wouldn't say on the phone, and count the words. Under ninety or cut again. Then show the before-and-after slide.

---

<!-- layout: two-col -->
<!-- eyebrow: outreach · before and after -->
<!-- id: before-after -->
## The same email, before and after the brief

**Before, from a cold template**

Hi Sarah, I hope this finds you well. I'm reaching out because {{company}} helps organizations like yours unlock value with {{product}}. Leading companies trust us to drive outcomes. I'd love to find 30 minutes to share how we can help Acme accelerate its journey. Are you free next week?

|||

**After, from the brief and the voice file**

Sarah, your team posted four platform roles last month, which usually means the Kubernetes footprint just got bigger than one person can watch. What are you trying to fix first with it?

Happy to point you at the right docs, or 20 minutes if talking is easier. If it's not on your radar, say so and I'll stop.

notes:
Read both out loud. The left one could have been sent by any company to any company. The right one proves homework in the first sentence, asks one real question, and makes "no" a free answer. Say up front that the left one was written to be bad on purpose; every phrase in it is from a real vendor email. Same model wrote both. The difference is what it was given.

---

<!-- layout: body -->
<!-- eyebrow: outreach · sequences -->
<!-- id: sequences -->
## What to automate in {{sequencer}} and what stays in your hands

- Three emails, same thread, days 0, 3 and 8. The last one asks if you should close it out
- LinkedIn stays a manual task. Automating connection requests gets your account restricted
- Stops on reply, meeting, bounce, unsubscribe, or an opportunity. Nurture pauses while they're in it
- The AI drafts every step. You approve the first send to each person

notes:
This is the sequence shape I use. Email can be automated once the drafts are approved, and every automated send carries a working unsubscribe and your postal address; {{sequencer}} handles both if the template is set up right. LinkedIn cannot be automated, and it's not a style choice; the platform restricts the member's account for it. The approval on first send is the human gate. Later, when the reply and complaint numbers look healthy, loosen it.

---

<!-- layout: statement -->
<!-- eyebrow: outreach -->
<!-- id: your-name -->
# Nothing goes out that you didn't read. Not because the AI is bad. Because it's *your name*.

notes:
Say it plainly and move on. People remember the short version.

---

<!-- layout: body -->
<!-- eyebrow: exercise · 8 minutes -->
<!-- id: exercise-outreach -->
## Write the first touch for the account you just researched

- Run the first-touch prompt with your brief and your voice file loaded
- Pick one of the three. Cut anything you wouldn't say on the phone
- Read it to the person next to you. They tell you if it sounds like you
- Count the words. Under ninety or cut again

notes:
The read-aloud test is the best editor in the room. If they stumble on a phrase, the buyer will too. Collect two volunteers to read theirs and ask the room: would you reply to that?
