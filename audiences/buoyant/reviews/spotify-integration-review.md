# Spotify integration content review, November 5, 2026

Scope: new Buoyant content only. This is not independent approval of the full PR, whose introduced history includes multiple vendors. Author: Codex. Content reviewer: Claude Sonnet, isolated directory, no tools. Mechanical build checks and visual inspection are reported separately.

## Attempts retained

1. Initial invocation: failed with prompt-size overflow; no verdict.
2. Minimal invocation: failed authentication; no verdict.
3. Content review: REQUEST_CHANGES. Runtime records were missing from the supplied review context; reviewer also requested explicit source loading and post-date rehearsal wording. It raised a hypothetical separator concern; actual slide rendering disproved a split failure.
4. Follow-up with actual runtime/qualifier records, explicit source-only prompt and revised date wording: PASS for the new content. Reviewer did not independently execute render checks or recount the corrected fallback counts.

## Initial review

**Blocking findings**

1. **Unsupported runtime proof (`demo/README.md`, "Presenter preflight, November 5, 2026").**
   - The section states precise runtime facts that nothing in this diff supports: Claude Code 2.1.316, Prospector 0.1.0, commit `78661280…`, "eight commands," queue stats of 3/3/0/0, a 34.573 s fallback run, and "three source pages opened on November 5."
   - The same change says the opposite elsewhere. `brief.md` says "Runtime preflight is performed separately." `run-of-show.md` says "This deck build does not certify runtime."
   - The `03-research` speaker notes also cite a rehearsed "fit 2/5 and timing 0/5."
   - Either attach or link the preflight and rehearsal artifacts, or remove these numbers and keep only "to be confirmed by the presenter owner." As written, they read as invented runtime proof.

2. **Contradictory dates.**
   - The session is Wednesday, November 4, and the fallback prompt is "dated November 4, 2026."
   - `sources.md` says the pack was "checked on 2026-11-04," but the README says the pages were opened and preflighted on November 5, after the session date.
   - The README tells the presenter to "launch the prepared workspace before the session." That instruction is stale if the session already happened.
   - Keeping the November 4 date is fine, but the check date and preflight date must agree with it. Reconcile them, or state plainly that the preflight is a post-session rehearsal.

3. **The demo instruction can't be run as written.**
   - The README says to run `/prospector:qualify Spotify` "with the source pack only" and notes the qualifier "relied on the source pack rather than independently browsing." It never says how to supply the pack or stop browsing.
   - Run as written, the command takes only a company name. Live output could cite fresh, unsourced "why-now" material and contradict the "no verified trigger" framing on the slide.
   - Add the exact invocation or context-loading step. Do the same for the "fresh generation" path, which has no command or setup for the "separate empty isolated demo state."

4. **Possible slide-split break (`overrides/03-research.md` `demo-research`, `overrides/04-outreach.md` `demo-outreach`).** In both, the `notes:` text is followed directly by `---` with no blank line. Every other slide has one. Depending on the parser, the separator may be treated as a setext heading or fail to split. Add the blank line, or confirm the build renders both slides correctly.

**Checked and acceptable**
- Spotify stays a historical research candidate with a fictional recipient and no buying intent.
- The fallback table is labeled text, not a queue.
- I recounted the words in all six drafts, and they match the claimed counts (44, 57, 47 and 49, 57, 48). All are under eighty.
- I found no private data, addresses or machine paths.

VERDICT: REQUEST_CHANGES

## Follow-up review

**VERDICT: PASS**

I checked the guide against the runtime and qualifier records. No concrete, reachable blocking finding remains. Deck rendering, parser behavior and the 50/58/49 fallback counts rest on your supplied statements, and I did not independently check them.

**Claims that match the evidence**
- **Versions and state:** Claude Code 2.1.316, Prospector 0.1.0, commit `78661280…0b3ad41c856570`, eight commands, and the `stats` result (3 total, 3 pending, 0 today, 0 invitations) all match the runtime record.
- **Fallback timing:** The 34.573 s run is correctly handled. The guide says to switch to the saved result at 30 seconds rather than wait.
- **Date handling:** The guide keeps the November 4 session date, labels the November 5 rehearsal as post-date, and does not claim the event occurred.
- **Scope of the PASS:** The guide limits it to the local presenter workflow and excludes Zoom, attendee installs and other hosts, as the runtime record does.
- **No duplicate drafts:** The guide says November 5 created none, which fits the unchanged queue SHA256 and the "do not rerun `/prospector:draft`" instruction.
- **Qualification limits:** The qualify prompt and guide keep fit 2/5 and timing 0/5 as subjective judgments. They say the qualifier relied on the source pack and that the outage does not establish a mesh gap. They make no unsupported claim about the qualifier staying Read-only. The record only has the 4-tool-use count and no transcript, and the guide does not overclaim it.
- **Setup friction:** The path-discovery denials and the workspace trust prompt are turned into presenter instructions (use exact paths, launch beforehand).

**Non-blocking nit**
- The outreach section says the isolated demo queue was "confirmed in the final runtime preflight." The preflight record shows the queue hash unchanged, the prepared workspace trusted and the queue state intact. It never states that an isolated queue or `PROSPECTOR_HOME` was confirmed. The guide already says to use the fallback if isolation is not confirmed, so this is not reachable as a failure. Still, softening the wording to "the prepared presenter queue, unchanged in the preflight" would match the record exactly.

## Mechanical verification and visual inspection

Final Buoyant build: 40 slides, 60 planned minutes; demo markers remain 18 and 23. `node scripts/check.mjs buoyant` exited 0 with the existing CHROME override pointing to installed Playwright Chromium headless shell 1248. All 40 slides measured, zero overflow, no problems or warnings; PDF export completed. The stock Google Chrome attempt failed with a teardown watchdog and zero measurements; it was not counted as a pass. No checker or theme code was changed for this integration.

PDF slides 11, 18 and 23 were rendered and visually inspected. The source-only prompt and fallback files are portable. Relative links resolve. Plugin body counts: 44/57/47; corrected fallback body counts: 50/58/49. These are deterministic whitespace counts, all under eighty. The presenter-owner's later Claude Code 2.1.318 stats refresh was added as a dated runtime delta after the content review; it is not a new interactive-screen-share test.
