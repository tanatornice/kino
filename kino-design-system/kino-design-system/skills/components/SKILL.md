# Components — Kino

UI primitives and composition patterns. Read `brand/SKILL.md` first; everything here references those tokens.

## 1. Buttons

Three variants, three sizes. That's the whole button system.

### Variants

**Primary** — for the single most important action on a screen. There is one primary button per view, never two.
```
background: var(--ink)
color: var(--paper)
border: 1px solid var(--ink)
on hover: background var(--ink-80)
```

**Secondary** — for everything else.
```
background: transparent
color: var(--ink)
border: 1px solid var(--ink-20)
on hover: border var(--ink), background var(--ink-10)
```

**Ghost** — for tertiary actions, links inside dense UI.
```
background: transparent
color: var(--ink)
border: none
on hover: background var(--ink-10)
```

### Sizes

```
sm:   height 32px, padding 0 12px,  font mono-sm,    radius 2px
md:   height 40px, padding 0 16px,  font body-sm,    radius 2px   ← default
lg:   height 48px, padding 0 24px,  font body,       radius 2px
```

### Behavior

- All buttons have a 120ms color/border transition.
- On click, the button does **not** scale or bounce. (We're not Material.) Pressed state is a 1-frame darken: `background: var(--ink-60)` for primary.
- Disabled: 40% opacity, no pointer events. No greyed-out background change.
- Loading: replace label with three dots that pulse via anime.js `stagger(120)`.

### Don'ts

- No icon-only primary buttons. Icons go on secondary and ghost.
- No full-width buttons except inside form contexts (login, signup, prompt submit).
- No rounded-full buttons except for filter pills (see below).

## 2. Filter pills

Used on `/templates` and the homepage category bar.

```
height: 32px
padding: 0 14px
border-radius: 999px (full pill — exception to the 2px rule)
border: 1px solid var(--ink-20)
font: mono-sm
background: transparent

active state:
  background: var(--ink)
  color: var(--paper)
  border-color: var(--ink)
```

The transition between states is 160ms `ease: 'out(3)'`. When a pill becomes active, a 1px `--signal` line briefly draws underneath it (200ms) and disappears. This is a deliberate motion-design flourish.

## 3. Inputs

All text inputs share one style. No exceptions for "search" vs "form" vs "prompt."

```
height: 40px (md) / 56px (lg, used for prompt input)
background: var(--paper)
border: 1px solid var(--ink-20)
border-radius: 2px
padding: 0 14px
font: body
color: var(--ink)
placeholder color: var(--ink-40)

on focus:
  border: 1px solid var(--ink)
  outline: none
  no glow, no ring
```

The prompt input on the homepage is the one input that gets the lg size and a thicker border (2px on focus). It's also the only input that has the blinking cursor described in `animation/SKILL.md`.

## 4. Cards

Two card patterns. Pick one, don't blend.

### Editorial card (used for feature highlights, blog tiles)

```
background: var(--paper)
border: 1px solid var(--ink-20)
border-radius: 4px
padding: 32px
no shadow

structure:
  - mono eyebrow (mono-sm, --ink-60)
  - heading (heading-md)
  - body (body-sm, --ink-80)
  - link with arrow at bottom
```

On hover: border becomes `--ink`, the arrow translates 4px right (160ms).

### Template card (used for template gallery)

```
aspect-ratio: 16 / 10
background: var(--ink-10)
border: 1px solid var(--ink-20)
border-radius: 4px
overflow: hidden
position: relative

structure:
  - thumbnail or live preview fills the card
  - meta strip overlays bottom on hover:
    background: var(--ink) with 0.92 alpha
    color: var(--paper)
    padding: 12px 16px
    contains: title (body-sm) and timecode (mono-sm)
```

On hover, the meta strip slides up from the bottom (200ms `out(3)`). The thumbnail switches from a still frame to the live anime.js preview.

## 5. Navigation

### Top bar

```
height: 64px
background: var(--paper)
border-bottom: 1px solid var(--ink-20)
padding: 0 32px
display: flex; justify-content: space-between; align-items: center
```

Left: Kino wordmark (24px tall).  
Center-left: nav links (mono, --ink-80, hover --ink).  
Right: ghost button "Log in", primary button "Start".

When the page scrolls, the bottom border becomes `--ink` (not animated — instant on scrollY > 0).

### Footer

Five columns on desktop, stacked on mobile.

```
background: var(--ink)
color: var(--paper)
padding: 96px 32px 48px

structure:
  Col 1: Kino wordmark + tagline + small timecode that's actually running
  Col 2-4: link clusters (Product, Templates, Company)
  Col 5: socials + email signup
  
  Bottom strip:
    border-top: 1px solid var(--ink-80)
    padding-top: 32px
    contains: copyright (mono-sm), version timestamp (mono-sm), changelog link
```

The footer is the one place dark mode lives by default on a light page. It should feel like the page has rolled into credits.

## 6. Numerals — special treatment

Anywhere Kino displays a number prominently (stats, timecodes, pricing), it uses tabular figures and the mono font. CSS:

```css
.num {
  font-family: var(--font-editorial);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
}
```

Stat blocks are a Kino signature:

```
[mono eyebrow, e.g. "ACTIVE PROJECTS"]
[oversized numeral in display-xl, --ink]
[short context line in body-sm, --ink-60]
```

The numeral counts up from 0 on first scroll-into-view (anime.js `animate` on a number with `round: 1`). Duration 1200ms, `outExpo`.

## 7. Tags

Inline labels for taxonomy. Used on template cards, blog posts.

```
display: inline-block
height: 22px
padding: 0 8px
border: 1px solid var(--ink-20)
border-radius: 2px
font: mono-sm
color: var(--ink-60)
```

Tags don't have hover states unless they're clickable. Clickable tags get a `--ink` border on hover.

## 8. The prompt block (homepage signature component)

This is the most important component on the site. It's both a working app input and the marketing centerpiece. Structure:

```
<div class="prompt-block">
  <div class="prompt-frame">              ← 2px ink border, 4px radius
    <div class="prompt-meta">             ← top strip, mono-sm
      <span>KINO</span>
      <span class="timecode">00:00:24:15</span>   ← actually running
    </div>
    <textarea class="prompt-input"        ← lg input, no border, fills frame
              placeholder="Describe a motion..."></textarea>
    <div class="prompt-controls">         ← bottom strip
      <div class="prompt-modes">          ← pill row: ANIMATE / TYPE / LOGO
        ...
      </div>
      <button class="prompt-submit">      ← primary lg, label "Render"
        Render →
      </button>
    </div>
  </div>
  <div class="prompt-suggestions">        ← below the frame, mono-sm
    Try: "a logo that draws itself" · "particle text revealing 'KINO'" · ...
  </div>
</div>
```

Notes:
- The frame border is 2px `--ink`, not the standard 1px `--ink-20`. This is the one component that earns the heavier weight.
- The submit button label is "Render" not "Generate" or "Create." Render is the verb a motion designer uses.
- The mode pills follow the filter pill pattern but smaller (height 24px).
- The timecode runs at real time from page load. It's decorative but real.

## 9. Empty states

Empty states are a brand opportunity, not a problem to hide. Pattern:

```
center-aligned in container
mono eyebrow: "NOTHING HERE YET"
body: one short sentence describing the state (not the action)
secondary button: the action
```

Example: on `/projects` with no projects:
```
NOTHING HERE YET
Your rendered projects will appear in this space.
[ Start a project ]
```

Don't use illustrations of empty boxes. Don't apologize. Don't say "Oops!"

## 10. Modals & panels

Modals slide up from the bottom on mobile, fade-and-scale on desktop.

```
desktop:
  width: max 560px
  background: var(--paper)
  border: 1px solid var(--ink-20)
  border-radius: 4px
  shadow: 0 1px 0 var(--ink-20), 0 24px 48px -12px rgba(10,10,10,0.12)
  padding: 32px

mobile:
  width: 100%
  border-radius: 4px 4px 0 0
  padding: 24px
```

Backdrop is `var(--ink)` at 0.4 alpha. No blur. Closes on backdrop click and Esc.
