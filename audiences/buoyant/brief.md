# Buoyant: audience brief

This repository is public. Attendee names, contact details and client correspondence stay out of this file; Mark keeps those in his calendar and email.

## The session

| | |
| --- | --- |
| Title on the invite | AI Primer with Mark |
| When | Wednesday, November 4, 2026, 1:00 to 2:00 PM Eastern (noon to 1:00 PM Central) |
| Where | Zoom, hosted by Buoyant (link in the calendar invite) |
| Length | 60 minutes, no break |
| Host | Gary, Buoyant |
| Deck | `deck/dist/buoyant.html` (press N for notes), run of show in `run-of-show.md` |

## Who is in the room

About seven people from Buoyant's go-to-market team, two of them optional. *Confirm roles with Gary.* The deck assumes sales, SDR and marketing, and treats anyone technical as a welcome skeptic.

## What they sell and to whom

- Company: Buoyant, the company behind Linkerd, a service mesh for Kubernetes.
- Buyer: platform engineering and SRE teams running Kubernetes at enterprises. Technical, busy, allergic to marketing language.
- Tools in use: HubSpot (CRM and marketing automation), Apollo (enrichment and sequences), HockeyStack (intent and web activity). Zoom for calls.

## What already happened

Buoyant is building an inbound motion: a HubSpot form fill gets enriched, scored into tiers, and the best leads route to a rep with a drafted Apollo sequence and manual LinkedIn steps, running in shadow mode first. The session's `buoyant-inbound` slide ties the training to that plan.

## What the host wants

*Confirm.* Working assumption: a practical primer the team can act on this week, not a tool tour. The close asks each person to brief three accounts before Friday.

## Live demo plan

Mark drives the two demo blocks using Spotify as a public research candidate and a fictional platform-lead recipient. Historical Kubernetes evidence does not establish current need, buying intent or an existing Buoyant relationship.

1. Research: source-grounded qualification with Prospector, or the portable prompt. Show dates, hypotheses and material unknowns. No fresh why-now is verified.
2. Outreach: three alternative drafts under eighty words, pending in an isolated demo queue. Nothing is approved or sent.
3. Fallback: after one failed load or thirty seconds, use the self-contained prompt in ordinary chat; if offline, show the saved result. Its review table is text, not plugin storage.
4. Follow-up remains optional with a fictional or approved redacted transcript; never imply Spotify joined a sales call.

The [presenter pack](demo/README.md) contains public sources, synthetic voice/ICP/product context and both fallback files. Runtime preflight is performed separately. Do not use private customer or CRM data.

## After the session

- Send the repo link and `speaker-notes.md` to Gary the same day.
- Attendees get the starter prompt from `prompts/00-start-here.md`, filled in for Buoyant, Linkerd, HubSpot and Apollo.
