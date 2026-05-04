# Kino Design System — Asset & Reference Index

This file maps everything in the design system to its location and purpose. Use this when you need to find a specific rule, component, or asset quickly.

## By Role / Task

### "I'm building a page. What do I read?"

1. Start with `skills/pages/SKILL.md` — find your page, read its layout spec.
2. For each section, look up components in `skills/components/SKILL.md`.
3. For motion / animations, read `skills/animation/SKILL.md`.
4. For copy, read `skills/content/SKILL.md`.
5. For visual rules (colors, fonts, spacing), read `skills/brand/SKILL.md`.

Then:
6. Open `components/*.css` for the actual CSS to use (or adapt).
7. Reference `tokens/variables.css` for color/spacing values.
8. Place images in `assets/images/` and reference by path.

### "I need to add a button. How?"

1. `skills/components/SKILL.md` §1 — three variants, three sizes.
2. `components/button.css` — all the CSS.
3. HTML example at the bottom of `button.css`.
4. If you need animation, `skills/animation/SKILL.md` Pattern A (hero text) doesn't apply to buttons; buttons use CSS transitions only.

### "How do I animate things?"

1. `skills/animation/SKILL.md` — motion principles + seven patterns.
2. Each pattern includes the exact anime.js code.
3. Reference the SVG templates in `svgs/` for line-drawing and morphing examples.
4. Check `skills/pages/SKILL.md` for where motion appears (hero text, scroll reveals, etc.).

### "I need to understand the voice."

1. `skills/content/SKILL.md` — five tone rules, forbidden words, headline structure.
2. Scroll down to "Homepage copy (canonical)" for the exact wording reference.
3. FAQ section for question/answer tone.

### "What's the color palette?"

1. `skills/brand/SKILL.md` §3 — the full color spec.
2. `tokens/variables.css` — the actual CSS custom properties to import.
3. Rule: `--paper` (background), `--ink` (text), `--signal` (accent only).

### "I need to build the homepage."

1. `skills/pages/SKILL.md` §2 — the full layout, section by section.
2. `skills/content/SKILL.md` — the actual copy.
3. `skills/animation/SKILL.md` Pattern A — hero text stagger.
4. `components/button.css`, `components/input.css` (prompt block).
5. `components/card.css` — template gallery cards.
6. `svgs/logo.svg` — animatable logo dot.
7. `assets/images/hero/` — hero illustration.

---

## Complete file index

### Skills folder

```
skills/
├── brand/SKILL.md
│   └── Identity, color (--paper, --ink, --signal), type, spacing, voice
├── animation/SKILL.md
│   └── Motion principles, anime.js v4 patterns, performance rules
├── components/SKILL.md
│   └── UI specs: buttons, inputs, cards, pills, nav, footer
├── content/SKILL.md
│   └── Voice rules, forbidden words, copy patterns, FAQ tone
└── pages/SKILL.md
    └── Page layouts: homepage, studio, after-effects, templates, auth, projects
```

**How to read them:** Each skill is written as if talking to a teammate. Rules explain the "why" so you can make good decisions in cases the rule doesn't explicitly cover.

### Tokens folder

```
tokens/
├── variables.css           ← CSS custom properties; import this globally
├── tailwind.config.js      ← Tailwind theme extending CSS vars
└── [future: design-tokens.json if needed for other tools]
```

**How to use:** 
- If building with plain CSS: import `variables.css`.
- If using Tailwind: use `tailwind.config.js`.
- All colors, font sizes, spacing are here.

### Components folder

```
components/
├── README.md               ← Overview; how to use these specs
├── button.css              ← Primary, secondary, ghost × sm, md, lg
├── input.css               ← Text input, prompt block
├── card.css                ← Editorial card, template card
├── pills.css               ← Filter pill, tag
└── nav-footer.css          ← Navigation bar, footer
```

**How to use:**
- Each `.css` file is a specification, not a library.
- Copy the CSS or translate the structure into your framework.
- HTML examples at the bottom of each file.

### SVGs folder

```
svgs/
├── logo.svg                ← Kino wordmark with animatable dot
├── morph-shapes.svg        ← Shapes for anime.js morphTo()
└── line-drawing.svg        ← Paths for anime.js draw animation
```

**How to use:**
- These are stubs/templates, not final artwork.
- Customize paths / structure for your use case.
- Include the anime.js code from `skills/animation/SKILL.md` alongside them.

### Assets folder

```
assets/
├── README.md               ← Where to place images, logos, fonts
├── images/                 ← Hero illustrations, screenshots, diagrams
│   ├── hero/
│   ├── screenshots/
│   ├── diagrams/
│   └── social/
├── logos/                  ← Kino wordmark variants
│   ├── kino-wordmark.svg
│   ├── kino-mark.svg
│   ├── kino-icon.svg
│   └── kino-logo-dark.svg
├── icons/                  ← Arrow, chevron, check, play, pause, etc.
│   └── *.svg
└── fonts/                  ← Söhne, JetBrains Mono, etc.
    ├── sohne-*
    ├── jetbrains-mono-*
    └── README.md
```

**How to use:**
- All image paths in pages should reference `assets/images/...`.
- SVG icons go in `assets/icons/`.
- Font loading instructions in `assets/fonts/README.md`.
- Placeholder strategy: use color blocks if final images aren't ready.

---

## Quick lookups

### "What color is the accent?"

`#FF3B1F` (Kino Red). CSS variable: `var(--signal)`. Only use for motion, emphasis, active states. Never for large fills.

### "What's the button label for the main CTA?"

"Render" or "Render →" (with arrow). Never "Generate", "Get started", "Create".

### "How long should a hero animation take?"

720ms for text stagger, 1200ms for extended set pieces. Never over 1.2s on first paint.

### "How many accent colors should I use?"

One. If you need more, you're not using color strategically.

### "What's the corner radius?"

2px default, 4px for cards/modals, 999px for pills only.

### "How do I write the headline?"

Two beats: verb + consequence. "Describe a motion. Kino renders it."

### "What's the monospace font for?"

UI labels, timecodes, button text, footer links, tag copy. It makes the brand feel like motion design, not marketing.

### "Do I need to support dark mode?"

Yes. CSS is included in every component file. It auto-inverts `--paper` and `--ink`.

---

## File count & approximate size

```
skills/              5 markdown files  ~45 KB
tokens/              2 files           ~5 KB
components/          6 CSS files       ~20 KB
svgs/                3 SVG files       ~8 KB
assets/              1 README          ~6 KB
────────────────────────────────────────
Total (no assets):   ~84 KB

With images/fonts/icons:  variable; structure is ready
```

This entire design system can zip up to under 100 KB (before brand assets) — light enough to pass to a local model or Claude Code and regenerate pages, components, or animations on demand.

---

## Handing off to Claude Code

1. Download the zip: `kino-design-system.zip`.
2. Extract it locally: `unzip kino-design-system.zip`.
3. Open VS Code and point Claude Code to the folder.
4. Prompt example:
   ```
   Read the skills folder, then build the homepage following 
   skills/pages/SKILL.md §2. Use the components from the 
   components folder and the animations from skills/animation/SKILL.md.
   ```
5. Claude Code will read the skills, reference the CSS, and build the page.

## Handing off to a local model

Same as above, but use `claude_code` or a local coding agent:
```bash
cd kino-design-system
qwen run "Build the homepage. Start by reading skills/"
```

The agent will discover the folder structure, read the skills, and generate the code.
