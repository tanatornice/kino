# Pages — Kino

Page-level layouts. This skill maps the brand, components, animation, and content skills onto specific routes. When asked to build a page for Kino, find it here first.

## 1. Routes (the new sitemap)

A pared-down version of the legacy site. We removed routes that existed only for SEO duplication; we kept the topic-cluster strategy but consolidated it.

```
/                         Homepage — prompt block, gallery, why, FAQ
/templates                Full template gallery with filters
/templates/[slug]         Individual template detail (new)
/studio                   Replaces the old "feature page" cluster — one
                          editorial page that explains what Kino does and
                          why it exists, instead of six near-duplicates
/studio/vs-after-effects  The one comparison page worth keeping
/projects                 Auth-gated user projects
/login, /signup           Auth
/about                    Company
/blog, /blog/[slug]       Editorial
/contact, /privacy, /terms

External:
  docs.kino.so            GitBook
  kino.so/changelog       Routed in app, not external
```

The old `/ai-motion-designer`, `/ai-animator`, `/ai-typeface`, `/ai-text-animation`, `/ai-motion-graphics` pages collapse into `/studio`. SEO is recovered via blog posts, template pages, and rich metadata — not duplicate landing pages. We're a studio; studios have one front door.

## 2. Homepage layout

The most important page. Hybrid: marketing AND app entry. Sections in order:

### Section 01 — Hero

```
Container: full viewport min-height (100vh), but content sits at 65vh
Background: --paper

Top of section:
  - Top nav (see components/SKILL.md)

Hero block, centered, max-width 960px:
  - Mono eyebrow:    A MOTION DESIGN STUDIO
  - H1 (display-xl): Describe a motion.
                     Kino renders it.
  - Subhead (body-lg, --ink-60, max 560px):
                     Built for the people who used to open After Effects.
                     Type a prompt, get a frame-accurate MP4 in seconds.
  
  - Prompt block (see components/SKILL.md §8)
  
  - Suggestions row (mono-sm, --ink-60):
                     Try: a logo that draws itself · particle text revealing 'KINO'
                     · a clean countdown from 5 · a chart that builds on scroll

Bottom of section, anchored to viewport bottom:
  - A thin running marquee of 6-8 template thumbnails moving slowly right-to-left
    at 1 tile per 4 seconds. This is the only ambient loop on the page.
```

**Motion on first paint (Pattern A from animation/SKILL.md):**

1. Eyebrow fades in (opacity 0→1, 240ms, 0ms delay)
2. H1 lines stagger up from below (Pattern A, 720ms, 200ms delay, 60ms between words)
3. Subhead fades in (240ms, 800ms delay)
4. Prompt block scales in from 0.98 (300ms, 1000ms delay, `outExpo`)
5. Marquee starts running at 1200ms

Total to interactive: 1200ms. After this, no more first-paint motion.

### Section 02 — Recently rendered (template gallery preview)

```
Section eyebrow: SECTION 02 / FEATURED
Heading:         Recently rendered.
Body:            Every prompt below was typed by a real person and rendered
                 by Kino. Hover any frame to see it move. Click to remix.

Filter pills (sticky on scroll until section ends):
  All · Text · Logo · Social · Charts · UI · Logos · Money

4-column grid of 12 template cards (3 rows). 
At the bottom of the grid: a single ghost button "See all 240 templates →"
linking to /templates.
```

The pills are sticky inside the section only, not on the whole page. They stop being sticky when the section ends.

### Section 03 — Why Kino (editorial)

A single editorial column, max-width 720px, centered. No grid, no cards. This is the page's quiet moment.

```
Section eyebrow: SECTION 03 / WHY KINO
Heading:         A studio, not a generator.
Body:            Most AI animation tools chase one frame at a time. Kino
                 renders timelines: scenes that have weight, beats that
                 hold, motion that respects the read. The frames you see
                 in the browser are the frames you ship.

Inline diagram (SVG, line-only, --ink with --signal accent):
  Three frames showing the difference: AE workflow (15 nodes), 
  generator workflow (1 prompt → 1 frame), Kino workflow 
  (1 prompt → timeline of frames). 
  
  The diagram draws itself on scroll-into-view (Pattern C).

Body continued: Two more short paragraphs.
```

### Section 04 — Stats

```
4-column row, hairline dividers between columns.

PROJECTS         ANIMATIONS        AVG RENDER       SATISFACTION
10,000+          500,000+          24 SEC           4.9 / 5.0
since 2024       all-time          per clip         from 2,847 ratings
```

Numerals count up on scroll-into-view (1200ms `outExpo`). The "+" appears at the end of the count.

### Section 05 — FAQ

Accordion, hairline dividers, mono labels.

```
Heading: Questions, briefly.

Each row:
  - Default state: question (heading-sm) + plus icon, hairline below
  - Open state: answer (body, --ink-80) reveals below with height
    transition (240ms, out(3))

Questions (4-6 of these):
  - Do I need motion design experience?
  - How does Kino compare to After Effects?
  - What can I export?
  - Can I use my own fonts and assets?
  - What's the pricing?
  - Is there an API?
```

### Section 06 — Closing CTA

A single full-width section, dark.

```
background: var(--ink)
color: var(--paper)
padding: 192px 32px

Centered, max-width 720px:
  - Mono eyebrow: SECTION 06 / START
  - H2 (display-lg): Render your first frame.
  - Body (body-lg, --paper at 60% alpha): 
        Free for the first ten clips. No credit card.
  - Two buttons:
        [ Render now → ]   (primary, but inverted: paper bg, ink text)
        [ Browse templates ]   (ghost, paper text)
```

This section is followed directly by the footer (also dark) — they read as one continuous closing act.

## 3. Studio page (`/studio`) — replaces the feature cluster

Long-form editorial. One page that does the work the old six pages were doing. Sections:

```
Section 01 — Hero
  Eyebrow: ABOUT KINO
  H1:      We made a studio. It runs on prompts.
  Body:    Two short paragraphs. The story is: motion design as a craft is 
           hard to scale. We built Kino so that the next million animations 
           don't all look the same.

Section 02 — What Kino does (4 capability blocks)
  Each block:
    - Mono eyebrow (CAPABILITY 01, 02, ...)
    - Heading (heading-lg)
    - One-paragraph body
    - One supporting visual (animated, anime.js)
  
  Blocks (replace old feature pages):
    01 — Type that moves       (was /ai-text-animation)
    02 — Logos that draw       (was /ai-typeface, /ai-animator)
    03 — Graphics with weight  (was /ai-motion-graphics)
    04 — Data that builds      (was /data, partial)

Section 03 — How it works (3-step explainer)
  1. Write the brief.
  2. Kino renders.
  3. Export and ship.

Section 04 — A note on After Effects
  Two-paragraph editorial, ends with link to /studio/vs-after-effects.

Section 05 — Closing CTA (same as homepage section 06)
```

## 4. After Effects comparison (`/studio/vs-after-effects`)

The one differentiated page from the old site we're keeping. New treatment:

```
Hero:
  Eyebrow: COMPARISON
  H1:      After Effects, but mostly without it.
  Sub:     Most teams keep both. Here's what each is for.

Two-column comparison block:
  Left column:  After Effects — for the bespoke
  Right column: Kino — for the everyday
  
  Each column lists 5-7 honest "good for" points. We don't trash AE; we 
  define the lanes. This is editorial honesty as a brand position.

Body section:
  Heading: When to use Kino instead.
  Body:    Three short use-cases (social cuts, lower thirds, explainer 
           inserts) where the After Effects round-trip is overkill.

Body section:
  Heading: When to keep After Effects.
  Body:    Two cases (deep compositing, frame-by-frame illustration) 
           where AE is still the right tool.

Closing CTA — same pattern.
```

The old page's "After Effects bad, Kino good" framing is replaced. Kino is confident enough to be honest about what it isn't.

## 5. Templates page (`/templates`)

```
Top: filter pill row (sticky on scroll across full page)
Below: 4-column grid (3 on tablet, 2 on mobile), infinite scroll
Above grid:
  - Search input (single line, large)
  - Sort dropdown (Recent / Popular / Random)
  - Result count (mono-sm, "240 templates")

Empty state when filters yield nothing:
  NO MATCHES
  Try fewer filters or a different search.
  [ Clear filters ]
```

Each template card follows the template card pattern from `components/SKILL.md`.

## 6. Template detail (`/templates/[slug]`)

New page that didn't exist on the old site. Each template gets a dedicated permalink.

```
Section 01 — Preview
  Full-width preview area (16:9), --ink-10 background
  The actual rendered template plays on loop
  Below: timecode and frame count display (mono)

Section 02 — Meta
  Two columns:
    Left:  Title (heading-lg), original prompt (body, in a quote-style 
           treatment with mono attribution), tags
    Right: [ Use this template ] primary button
           [ Open in editor ]    secondary
           [ Export MP4 ]        ghost
           Specs: Duration, Resolution, Format, Created

Section 03 — Variations
  4-card grid of related templates (same category or remix tree)

Section 04 — Closing CTA
```

## 7. Auth pages (`/login`, `/signup`)

Two-column layout on desktop, stacked on mobile.

```
Left column (--paper):
  - Kino wordmark, top-left
  - Centered form, max-width 360px
  - Headings: "Welcome back" / "Start rendering"
  - Email + password
  - Primary button, full-width
  - Divider, social auth buttons (secondary, full-width)
  - Switch link at bottom

Right column (--ink, only on desktop):
  - A single rendered template plays on loop, full-bleed
  - No copy. The work is the pitch.
```

## 8. Projects page (`/projects`) — auth-gated

```
Top: page header with title "Projects", primary button "New project"
Filter row: All / In progress / Rendered / Archived

Grid: 3 columns of project cards, or list view toggle

Empty state:
  NOTHING HERE YET
  Your rendered projects will appear in this space.
  [ Start a project ]
```

## 9. Mobile principles

Kino is a desktop-first product (rendering animations is a desktop activity), but the marketing site must work beautifully on mobile.

- Hero stays mostly intact, sized down. The prompt block is replaced with a "Try Kino on desktop" mono callout and a button to email yourself a link.
- Section padding drops from 128px to 64px.
- Nav collapses to logo + a single ghost "Open" button that links to login. No hamburger menu — the marketing nav has only 4 links, they live in the footer on mobile.
- The marquee at hero bottom slows down to 1 tile per 6 seconds and fades on the edges.
- The template grid drops from 4 columns to 1 column with larger tiles.

## 10. Page-level performance budgets

- LCP target: under 1.8s on 4G
- First-paint motion: never exceeds 1.2s
- anime.js bundle on homepage: under 12 KB (animate + timeline + stagger only; SVG and Draggable lazy-load when their sections enter view)
- Hero image: SVG only, no raster. Static thumbnails for templates are AVIF with WebP fallback.
- No external fonts on first paint — use `font-display: swap` and ship a single weight (500) of the display font in the critical path; secondary weights load async.
