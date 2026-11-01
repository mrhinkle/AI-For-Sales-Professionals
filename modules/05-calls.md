---
id: 05-calls
title: Before, during and after the call
minutes: { full: 35, half: 20, short: 8 }
outcomes:
  - Walk into a call with a one-page prep sheet and walk out with the follow-up sent inside ten minutes
  - Rehearse objections against an assistant playing your toughest buyer
---

<!-- layout: divider -->
<!-- id: divider -->
# Before, during and after the call

Prep in five minutes, listen instead of typing, follow up before lunch.

notes:
The call is where the relationship happens, so the assistant stays out of the room. It earns its keep on either side of it.

---

<!-- layout: flow -->
<!-- eyebrow: the call -->
<!-- id: call-flow -->
## Five minutes before, nothing during, ten minutes after

### Before
From the brief: five discovery questions, the two objections you'll hear, who's in the room and what each one cares about.

### During
Recorder on, with consent. You look at the person, not the keyboard. Your notes are three words and a star.

### After
Transcript in, out comes the summary, the follow-up email in your voice, the CRM notes, the tasks with dates.

notes:
Ask for consent on recording every time; most teams already do. The "during" box is the point: the best sellers in the room already don't take notes. Now nobody has to. After the call, ten minutes, before you open the next tab, or the follow-up slides to tomorrow and the energy is gone.

---

<!-- layout: body -->
<!-- eyebrow: the call · prep -->
<!-- id: prep-prompt -->
## The prep sheet prompt

```prompt
Using the account brief for [Company] and my product file, prepare me for a 30-minute discovery call
with [names and titles]. Give me: five open questions in the order I'd ask them; the two objections
I'm most likely to hear and a one-line honest answer to each; what each person in the room probably
cares about; one thing I should not bring up yet. Keep it to one page I can read in five minutes.
```

notes:
"One thing I should not bring up yet" is my favorite line in this prompt. Pricing, a competitor, a feature that isn't shipped. The model is good at spotting the landmine when you ask.

---

<!-- layout: body -->
<!-- eyebrow: the call · rehearsal -->
<!-- id: roleplay -->
## Rehearse the hard conversation before you have it

```prompt
Play [Name], [Title] at [Company]. You're skeptical, busy, and you've been burned by a vendor
like us before. Use the account brief for what you know and care about. I'll pitch and handle
objections; you push back the way a real buyer would, one message at a time. Don't go easy on me.
After ten exchanges, stop and tell me the three weakest things I said and what to say instead.
```

notes:
Nobody wants to role-play with their manager. Everyone will do it with a chatbot at eleven at night. The feedback at the end is honest in a way colleagues rarely are. Managers: this is your new ride-along.

---

<!-- layout: body -->
<!-- eyebrow: the call · follow-up -->
<!-- id: follow-up-prompt -->
## Follow up in ten minutes from the transcript

```prompt
Here's the transcript of my call with [Company]. [paste]
Produce four things: a 5-line summary in my words; a follow-up email in my voice that restates what
they said they need, confirms the next step and date, and asks nothing new; CRM notes under
"Pain, Timeline, Budget, Decision process, Competition, Next step"; and a task list with owners
and dates. Flag anything they said that contradicts our account brief.
```

notes:
The structure for CRM notes is whatever your team uses. Change the six headings to match {{crm}}. The contradiction flag at the end is the quiet win: it catches the moment the buyer told you something that changes the deal and you were too busy listening to write it down.

---

<!-- layout: body -->
<!-- eyebrow: exercise · 6 minutes -->
<!-- id: exercise-roleplay -->
## Three rounds with your toughest buyer

- Run the rehearsal prompt against the account you've been using all session
- Ten exchanges, then read the three weakest things it caught
- Tell the table the one you're going to fix before your next real call

notes:
Keep it to six minutes. People get into this one. The debrief question is the useful part: name the fix. If you want a bigger version of this, pair people up and have one person's assistant play the buyer while the other pitches live.
