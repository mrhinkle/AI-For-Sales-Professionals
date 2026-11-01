# Triage of outside reviews · Buoyant deck · 2026-11-01

Sources: `glm-5.3.md` (12 findings) and `kimi-k3.md` (11 findings), both on the 36-slide build from the same day. "Both" marks findings the two models raised independently. Fixes marked *master* change the shared module and reach every audience; fixes marked *short* use the new `@short` / `@full,half` line tags or `<!-- only: short -->` so the full and half programs keep their hands-on wording.

| # | Slide(s) | Criterion | Finding | Decision | Raised by |
| --- | --- | --- | --- | --- | --- |
| 1 | 01, 04, 07, 11 | accuracy / flow | Notes promise hands-on work ("run three real prompts on your own accounts", "flag the hands-on bits", "have everyone paste this in now") in a demo-only primer. | **Fixed (short).** Notes now carry length-tagged lines: the hands-on sentences stay for full/half, the demo versions show for short. | Both |
| 2 | 21 | accuracy | "Automating connection requests gets company accounts restricted" is wrong; LinkedIn restricts the member's account. | **Fixed (master).** Slide, notes and prompts/05 now say "gets your account restricted". | Kimi |
| 3 | 30 / 21 | accuracy | "Email law" is named but never stated; Apollo sequences need a working unsubscribe and a postal address (CAN-SPAM). | **Fixed (master).** Rule 04 states it on the card; notes add the one-sentence version and "check with ops before the first send". | Both |
| 4 | 30 | accuracy | "The paid account has the data retention and training settings your security team agreed to" overclaims; a paid personal seat has none of that. | **Fixed (master).** "The team or business account has the retention and training settings your admin set." | GLM |
| 5 | 07 | density | Six rows on Zoom; Prospect and Propose are never demoed in the primer. | **Fixed (short).** Those two rows are tagged `@full,half`; the short deck shows four rows and the notes say the other two are week two. | Both |
| 6 | 13 to 19 | flow | No slide marks where the live demo happens; the transition from prompt card to screen share is improvised. | **Fixed (short).** Two `only: short` statement slides added after the research and first-touch prompts: "Watch me do it on {{demo_account}}" and "Now the email, from the brief we just built". | Kimi |
| 7 | 23 | density / audience | Steps too long for two minutes; "the plan I sent Gary" assumes everyone saw it. | **Fixed (Buoyant override).** Steps trimmed to about ten words; notes open with the context line. | Both |
| 8 | 06 | accuracy | "It doesn't skim" overclaims; summarizers drop details. | **Fixed (master).** "It doesn't get tired. It does miss things, which is why the sources matter." | Kimi |
| 9 | 20 | clarity | Notes typo "makes no a free answer"; the deliberately bad "before" email should be flagged as a straw man. | **Fixed (master).** Quotes around no; notes say the left one was written to be bad on purpose. | Kimi |
| 10 | 31 | accuracy | Frame the 99 percent as arithmetic, not a measured error rate. | **Fixed (master).** Notes add "I'm not claiming models are 99 percent accurate. Even if they were, the math still gets you." | Kimi |
| 11 | 25 / 28 | risk | The follow-up demo pastes a transcript two slides before the rule that forbids it in a consumer tool. | **Fixed (short).** Call-flow notes add: the transcript is customer data, so the demo uses a redacted one in the approved tool. | GLM |
| 12 | 15 | density | Prompt cards can't be transcribed off a Zoom screen. | **Fixed (short).** Research-prompt notes add "I'll paste each prompt in chat as I run it; they're all in the repo." | GLM |
| 13 | 32 / 34 | flow | "Pick one workflow" said three times in a row. | **Fixed (Buoyant).** `pick-one` excluded in audience.yaml; the close carries the ask. | Both |
| 14 | 26 | audience fit | Prep prompt should make the rep explain the buyer's technical terms. | **Fixed (master).** Added "the two technical terms from the brief I should be able to explain in one sentence" to the slide and prompts/06. | GLM |
| 15 | 04 vs dividers | clarity | Agenda numbers 01 to 08 don't match divider numbers 01 to 06. | **Fixed (build).** The agenda no longer numbers rows; it shows minutes in the label column. Dividers keep their own count. | GLM |
| 16 | 33 | density | Five rows; merge days 2 and 3. | **Declined.** Five days is the point of the slide, it is a "point, don't read" table, and Kimi did not flag it. | GLM |
| 17 | 29, 32 | flow | Cut two of the dividers to save Zoom dead air. | **Declined.** Dividers are the pacing marks for a remote room and cost seconds, not ninety. The duplicate statement (finding 13) is the real cost and is gone. | Kimi |
| 18 | 35 | accuracy | The repo link may be dead for attendees. | **Open for Mark.** The repo is private as of 2026-11-01. Make it public, invite Buoyant, or change the bullet to "link in the chat" before Wednesday. | GLM |
| 19 | 18 | voice | Two aphorisms stacked; acceptable. | **No change.** Reviewer's own call. | Kimi |

Rebuilt and re-checked after the fixes: see `../deck-text.md` and `../../deck/dist/buoyant-check.txt`.
