# Prospector: the Sales Training companion

Prospector turns the research and outreach lessons into a repeatable workflow participants can take away. Start with the three files taught in this program: voice, ideal customer profile (ICP), and product. Finish with a sourced account brief, a reason to reach out, and a draft the seller has checked.

The AI drafts, you send.

## Where it fits in the presentations

| Lesson | Use Prospector to | Participant output |
| --- | --- | --- |
| Set it up once | Apply the ICP with `/prospector:icp`; supply voice and product files as context | A clear definition of who fits |
| Research an account | Use `/prospector:qualify` with supplied public sources | A brief with sources and unknowns |
| Decide why now | Use `/prospector:signals` when suitable sources are connected | A dated observation, with inference labeled |
| Outreach that sounds like you | Use `/prospector:draft` with the verified brief | A short message in the seller's voice |
| Review before sending | Open `/prospector:queue` and inspect the draft | A corrected draft ready for human review |
| Your first week | Repeat on three accounts and record the time saved | A workflow the seller can repeat |

These are the Claude plugin command names. On other hosts, use the corresponding available skill or the plain-language prompt below; do not assume the same commands or hooks exist.

## Delivery by session length

**60-minute primer:** the presenter demonstrates Prospector within the existing research and outreach blocks. Participants watch and receive the guide afterward. No live installation or additional teaching block is required. If the plugin or a source fails, use the existing account-brief and first-touch prompts.

**Half-day and full-day workshops:** use the existing eight-minute research exercise to practice with one account. Continue with that same account in the outreach exercise. Installation is prework; a participant without the plugin uses the prompt pack and produces the same deliverables.

## Presenter preparation

Choose one public target account and prepare a small source pack: company website, one dated announcement, one relevant hiring page, and a publicly confirmed buyer role. Keep a prepared brief and draft as a fallback. Do not include customer lists, private CRM exports, or client transcripts in the shared deck.

Open the installed plugin before the session and check that its commands load. Practice the complete demo using the same account. Show a prepared draft queue containing demonstration records only. Live vendor integrations, purchased contact data, and CRM writes are optional follow-on work, not prerequisites for the class.

The companion uses the existing plugin implementation. Its instructional skills describe integrations; those descriptions do not establish that an adapter is connected or operational. The remote MCP service and broader distribution need separate delivery and testing. Browser hooks are host-specific and must not be presented as a universal guarantee that messages cannot be sent.

## Live demo: one account through the workflow

1. Load the voice, ICP, and product files. State the account's domain so similar company names do not get mixed together.
2. Run `/prospector:qualify` with the account and public source pack. Request a source and date for each factual claim; mark missing evidence UNVERIFIED.
3. Open two supporting sources. Correct a stale or unsupported claim. Explain what is fact and what is your hypothesis about the buyer's needs.
4. Run `/prospector:draft` for one email using only the verified facts. Request three alternatives under 80 words, each with one question. Use a fictional recipient label for the demonstration.
5. Run `/prospector:queue`. Review the recipient, source, reason for contacting them, and draft body. Remove anything you would not say yourself. Leave the item pending; no message is sent during the demonstration.

Keep this inside the scheduled research and outreach time. Do not spend class time troubleshooting accounts or connectors.

## Workshop exercise and take-home prompt

Choose one account from your own work. Supply only material you are allowed to use with your chosen assistant. Paste this with your three files and sources:

```text
Help me practice the Sales Training prospecting workflow.
Use my voice, ICP, and product files and the public sources I provide.
Account: [name and domain]. Sources: [URLs or excerpts with dates].

Produce a short account brief. Cite each fact and mark missing evidence UNVERIFIED.
Separate observed changes from your hypotheses about their needs.
Ask me to verify two sources before using the brief to draft outreach.
After I correct the brief, propose three emails under 80 words with one question each.
Show the selected draft with its source and reason for contacting this account.
If Prospector's queue is available, save it as pending; otherwise show a review table.
Do not send messages, purchase data, or write to my CRM for this exercise.
```

Success means a correct company domain, two checked sources, one dated observation, a clearly labeled hypothesis, and one edited draft. A plausible-looking output without evidence is not a completed exercise.

For SMB sellers, practice on an owner-led business and one visible business need. For enterprise sellers, practice on one account, a relevant buyer role, and a public initiative. Neither exercise requires discovering private contact details.

## Installation and access

The implementation lives in [Prospector's repository](https://github.com/mrhinkle/prospector-plugin). With repository access, Claude Code users can add and install it:

```bash
claude plugin marketplace add mrhinkle/prospector-plugin
claude plugin install prospector@prospector-marketplace --scope user
```

Start a new session and check that the commands appear. The presenter should verify the exact host and installed version before teaching setup. For ChatGPT, Codex, Grok, or any other host, confirm that host's installation and supported capabilities separately; use the prompt-only exercise when unavailable.

The training repository may require an invitation. Confirm access to both repositories before the session. If attendees cannot open them, provide this guide and the prompt pack through the course's existing materials channel. A slide link alone does not grant access.

## Ownership

The Sales Training program owns the lesson mapping, demo, exercise, and handout. The Prospector repository owns the plugin code, skills, tests, and releases. Link to that implementation rather than maintaining a second copy inside the decks. Calls, proposals, and pipeline lessons continue to use their existing prompts; this companion currently covers prospecting.
