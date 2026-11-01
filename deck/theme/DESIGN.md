# Deck design rules

Distilled from the AIE Network deck design spec (Peripety Labs brand guide v1.0). When this file and an older deck disagree, this file wins for this repository.

## Canvas

1280 x 720, `overflow: hidden`. Content zone: top 60px, sides 100px, bottom 100px. No content element may cross **620px from the slide top**; `scripts/check.mjs` measures this in headless Chrome and fails the build on a miss. Chrome (slide number top right, `// FOOTER` bottom left, wordmark bottom right) is added by the build and auto-numbered by JS.

## Tokens

White canvas, Charcoal body `#1A2434`, Ink Navy `#0A0F1C` headings and dark panels, Flame Orange `#f44800` primary accent, Electric Blue `#2563EB` secondary, Cloud `#F5F7FA` cards, hairline `#E5E7EB`. Verdana for display, Inter for body, JetBrains Mono for labels, each with a fallback stack so the deck renders offline.

## Components

Cards with a 4px `border-top` in ink, flame or blue. Flow steps joined by mono `>` arrows. Aligned rows with a mono label, a bold phrase, and one line of text. Lists use `>` marks in flame with hairline separators. The quote panel and the prompt card are Ink Navy with white type; the prompt card is the one thing the audience photographs, so its text stays at 15px or larger on a full-width slide. Oversized numerals and mono glyphs are the only iconography.

## Prohibitions

No `border-radius`, no `border-left` accents, no shadows, gradients, textures or blur, no emoji or icon fonts, no entrance animations. Every slide must read as a printed handout. Body text under 14px only in a table the audience is told to photograph.

## Density

One idea and one visual per slide. At most four bullets, about twelve words each. Titles are sentences in Mark's voice; the build drops a title over 60 characters to 36px. Reference tables are "point, don't read."

## Presenter features

Arrow keys, space, PgUp/PgDn step; Home/End jump; F fullscreen; N toggles speaker notes; print CSS gives one slide per page with notes hidden.
