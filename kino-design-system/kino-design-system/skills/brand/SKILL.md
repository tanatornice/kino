# Brand — Kino

This is the source of truth for Kino's visual identity. Read this before producing anything visual.

## 1. Brand position

Kino is an AI motion design studio. Three words that should feel true of every output:

- **Confident** — we make decisions, we don't ask the user to.
- **Editorial** — closer to a design annual than a SaaS dashboard.
- **Kinetic** — motion is the product; the brand should feel like it could move at any moment.

Kino is **not**: cute, exuberant, gradient-soaked, emoji-heavy, "powered by AI ✨". The word "AI" appears rarely in user-facing copy because it's table stakes, not a feature.

## 2. Logo

The wordmark is **Kino** set in a custom-feeling grotesk (we use Söhne or Inter Display tightened). The dot of the `i` is the only place the logo can carry motion: in marketing surfaces it may pulse, blink, or trace a path. Everywhere else, the dot is static.

- Minimum size: 24px tall on screen.
- Clear space: 1× the cap-height on all sides.
- Color: pure ink (`--ink`) on light, pure paper (`--paper`) on dark. Never colored.

When motion is appropriate (homepage hero, loaders), the dot can:
- pulse (scale 1 → 1.15 → 1, 1.6s loop, `easeInOutSine`)
- trace (drop down from above as a line, then dot lands)
- not rotate, not bounce, not change color

## 3. Color

Kino has a **two-color base** plus **one signature accent**. That's the whole palette. Restraint is a feature.

```css
:root {
  /* Base */
  --paper:  #F4F1EA;   /* off-white, warm; never use pure white */
  --ink:    #0A0A0A;   /* near-black; never use pure black */

  /* Accent — Kino Red */
  --signal: #FF3B1F;   /* the one accent; reserved for motion & emphasis */

  /* Functional grays — derived from ink */
  --ink-80: #2A2A2A;
  --ink-60: #5A5A5A;
  --ink-40: #9A9A9A;
  --ink-20: #D4D2CD;   /* hairlines, dividers */
  --ink-10: #E8E5DE;   /* subtle backgrounds */

  /* Status — used sparingly, only for system feedback */
  --ok:    #1F8A4C;
  --warn:  #C77700;
  --error: #C8261A;
}
```

**Rules:**
- Default surface is `--paper`, default text is `--ink`. Dark mode inverts.
- `--signal` is the *only* accent. Use it for: active states, motion paths, the cursor in the prompt input, the playhead in any timeline UI, the underline on a hovered link. Never for large fills, never for body text, never for decoration.
- Never introduce a new color without updating this file. If a chart needs more than one data series, use shades of `--ink` plus `--signal` for the highlighted series.
- No gradients. Ever. Solid colors only.

## 4. Typography

Two typefaces. That's it.

```css
/* Display & UI: a tight modern grotesk */
--font-display: "Söhne", "Inter Display", -apple-system, system-ui, sans-serif;

/* Editorial moments & numerals: a contemporary serif */
--font-editorial: "Söhne Mono", "JetBrains Mono", ui-monospace, monospace;
```

Wait — read that again. The "editorial" font is **monospace**, not a serif. Why: serifs read as "magazine," but mono reads as "studio" (timecodes, frame counts, code). Kino is a studio, not a magazine. The mono is what makes the brand feel like motion design instead of like a Substack.

### Type scale

```
display-xl    96px / 0.95 / -3%   font-display, weight 500
display-lg    72px / 0.95 / -3%   font-display, weight 500
display-md    56px / 1.0  / -2%   font-display, weight 500
display-sm    40px / 1.05 / -2%   font-display, weight 500

heading-lg    32px / 1.1  / -1%   font-display, weight 500
heading-md    24px / 1.2  / -1%   font-display, weight 500
heading-sm    18px / 1.3  /  0%   font-display, weight 500

body-lg       18px / 1.55 /  0%   font-display, weight 400
body          16px / 1.55 /  0%   font-display, weight 400
body-sm       14px / 1.5  /  0%   font-display, weight 400

mono-lg       16px / 1.4         font-editorial, weight 400, uppercase, +5% tracking
mono          13px / 1.4         font-editorial, weight 400, uppercase, +8% tracking
mono-sm       11px / 1.4         font-editorial, weight 400, uppercase, +10% tracking
```

**Mono is for:** section eyebrows, timecodes, button labels, tags, footer column headers, anything that wants to feel like a label rather than a sentence.

**Display is for:** H1s and oversized numerals only. If you find yourself reaching for `display-xl` for body copy, stop.

**Never:** italic for emphasis (use weight 500 or `--signal`). Never underline except on hover. Never use weight 700+ — the design speaks at weight 400/500.

## 5. Spacing & grid

8px base unit. Spacing scale: `4 8 12 16 24 32 48 64 96 128 192`.

Page grid: 12 columns on desktop, gutter 24px, max content width 1280px. Edge padding 32px desktop, 16px mobile.

Vertical rhythm: section padding is `128px` top and bottom on desktop, `64px` on mobile. Between elements within a section, multiples of 16.

## 6. Borders & corners

- Hairlines are `1px solid var(--ink-20)`. They are everywhere.
- Default corner radius is **2px**. Anything larger (cards, modals) is **4px**. The product should feel like it's drawn with a sharp pencil. Pill buttons and circular avatars are the only exceptions.
- No drop shadows on flat surfaces. The one allowed shadow is for floating panels: `0 1px 0 var(--ink-20), 0 24px 48px -12px rgba(10,10,10,0.12)`. Use it once per screen.

## 7. Voice (one-paragraph version — full version in `content/SKILL.md`)

Kino sounds like a senior designer explaining their work: confident, specific, dry. Short sentences. Concrete nouns. We name things directly ("export", "render", "frame") instead of softening them ("get your video", "create magic"). We don't use exclamation marks. We don't say "let's", "simply", "just", or "magic". When we're funny, we're dry, not zany.

## 8. Imagery

- Real motion design work, shown frame-accurate, no fake screenshots.
- When showing the product UI, screenshots are full-bleed inside a 4px-radius container with a 1px `--ink-20` border. Never floating with shadows.
- No stock photography of people pointing at laptops. If we need humans, we use real customers, credited.
- Illustrations: line-only, single weight (1.5px), drawn in `--ink` with `--signal` accents. They look like technical diagrams, not marketing illustrations.

## 9. Don'ts (the short list)

- Don't use pure white or pure black.
- Don't add a second accent color.
- Don't use gradients, glows, or glassmorphism.
- Don't use emoji in product UI. (Sparingly OK in social posts, never in the product.)
- Don't write "AI-powered" anywhere a user will read it.
- Don't use rounded buttons taller than 40px without a reason.
- Don't introduce a third typeface.
