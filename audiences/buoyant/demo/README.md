# Spotify presenter pack

This is a public research candidate and a fictional recipient. It is not a Buoyant-approved target or a verified buyer. No message is sent by this demonstration. The recorded November 4 session date is retained; this integration does not reschedule it.

## Have these files open

- [Sources](sources.md), [synthetic voice](voice.md), [training ICP](icp.md), [product context](product.md).
- [Self-contained fallback prompt](fallback-prompt.txt): paste the entire file into an ordinary chat. No plugin, tools, browsing or connectors needed.
- [Saved fallback result](fallback-result.md): open locally if the model or network is unavailable. This is saved example output, not a fresh answer or a plugin queue.

## Research: slide 18, ten-minute block

Show the three context files and sources (two minutes). Open the 2021 Kubernetes article and the 2025 incident report; show the dates (three minutes). Attach sources.md, voice.md, icp.md and product.md to the presenter chat, then paste [qualify-prompt.txt](qualify-prompt.txt) (three minutes). Close with the unknowns (two minutes).

The prior qualifier rehearsal assigned fit 2/5 and timing 0/5. These are subjective judgments, not calibrated probabilities. The qualifier relied on the source pack rather than independently browsing. No current buying trigger is verified. The perimeter outage does not prove a service-mesh gap or that Linkerd would have prevented it.

## Outreach: slide 23, eight minutes

For the prepared demo, display [the saved plugin drafts](drafts.md). Do not rerun `/prospector:draft` in the prepared state: it creates queue entries. If demonstrating fresh generation instead, choose a new empty demo directory and set PROSPECTOR_HOME to its absolute path before launching Claude Code. Confirm zero queue entries before drafting; otherwise use the fallback. Attach sources.md, voice.md, icp.md and product.md, then invoke `/prospector:draft` using the same context and exactly three alternatives of at most eighty words to DEMO ONLY - Fictional Spotify Platform Lead. No real address, invented urgency or outage pitch. These are alternatives, not a sequence.

Use the presenter owner's isolated demo queue, confirmed in the final runtime preflight. Show the existing three pending examples rather than adding duplicates. Invoke `/prospector:queue list --status pending` and `/prospector:queue stats` separately. Keep [drafts.md](drafts.md) open: list output omits bodies and sources. Pick one, count the words and improve its question. Do not approve or send. If isolated state is not confirmed, use the fallback.

## Switch after one failure or thirty seconds

Paste [fallback-prompt.txt](fallback-prompt.txt) in an ordinary chat with the plugin and tools unused. It includes all context. If chat is unavailable, open [fallback-result.md](fallback-result.md). Say: "This review table is text. It hasn't created queue entries or sent anything."

The saved result contains three fictional emails, each under eighty words, with sources and unknown timing. Verify the generated output yourself. These teaching bodies omit production sender/footer details and are not send-ready copy.

## What to verify before real outreach

Current architecture, actual need, initiative, buyer, customer relationship and contact permission. The training voice and ICP are synthetic. The portable files contain no credentials, personal recipient details, raw sessions or machine-specific paths. Runtime preflight and live presentation timing remain separate from deck rendering.

## Post-date presenter rehearsal, November 5, 2026

This rehearsal was recorded after the listed November 4 session date. It does not establish whether that session occurred or schedule a new one. Runtime evidence was supplied by the presenter owner separately from the deck build.

The presenter owner exercised Claude Code 2.1.316 with Prospector 0.1.0 at plugin commit `78661280703df9ca230f3d0ed0bb3ad41c856570`. Fresh discovery advertised eight commands. An interactive `/prospector:queue stats` run returned three total, three pending, zero today and zero invitations today. Stored draft bodies and sources were read directly; state remained unchanged and nothing was sent.

The fallback succeeded with commands and tools disabled in 34.573 seconds. Have the saved result open: switch to it at thirty seconds instead of waiting longer. The three public source pages opened on November 5; their historical dates still do not establish buying intent. Launch the prepared presenter workspace before the session so trust/setup prompts are already handled, and use the exact queue paths prepared by the presenter owner.

Qualification and drafting were rehearsed November 4; November 5 did not create duplicates. This verifies that local presenter workflow only. Zoom screen sharing, attendee installation and other chatbot hosts were not tested.

After Claude Code updated to 2.1.318 during the preflight, the presenter owner repeated the queue stats check on that version. It returned three total, three pending, zero today and zero invitations today in 18.606 seconds, with no permission denials. This was a current-version stats refresh; the interactive terminal check above ran on 2.1.316.
