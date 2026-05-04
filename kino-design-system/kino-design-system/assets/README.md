# Assets — Kino Design System

This folder holds all brand assets: images, logos, fonts, and icons. The structure below maps where each type of asset should live, so Claude Code and local agents can reference them consistently.

## Folder structure

```
assets/
├── images/
│   ├── hero/
│   │   ├── homepage-hero.svg       ← hero illustration or animation
│   │   └── studio-hero.svg         ← /studio page hero
│   ├── screenshots/
│   │   ├── prompt-block.jpg        ← product UI screenshot
│   │   └── template-gallery.jpg
│   ├── diagrams/
│   │   ├── workflow.svg            ← for editorial sections
│   │   └── comparison.svg          ← for After Effects page
│   └── social/
│       ├── og-image.jpg            ← 1200x630px OpenGraph
│       └── twitter-card.jpg        ← 1200x675px Twitter
├── logos/
│   ├── kino-wordmark.svg           ← main logo
│   ├── kino-mark.svg               ← symbol-only version
│   ├── kino-icon.svg               ← favicon version
│   └── kino-logo-dark.svg          ← inverted for dark bg
├── icons/
│   ├── arrow.svg
│   ├── chevron.svg
│   ├── x-close.svg
│   ├── check.svg
│   ├── play.svg
│   └── pause.svg
└── fonts/
    ├── sohne-*
    │   ├── sohne-400.woff2
    │   ├── sohne-500.woff2
    │   └── sohne-display-400.woff2
    ├── jetbrains-mono-*
    │   ├── jbmono-400.woff2
    │   └── jbmono-500.woff2
    └── README.md                    ← font loading instructions
```

## Image guidelines

### Hero images

- **Format:** SVG preferred. If raster: AVIF with WebP/JPG fallback.
- **Size:** SVG should be semantically clean (no rasterization artifacts). Raster: max 2400px wide at 100% display size.
- **Content:** Motion design work, not generic stock photography. Show frames from actual rendered animations.

### Screenshots

- **Format:** JPEG for speed, AVIF for modern browsers.
- **Size:** 1200px wide for max content width layouts.
- **Content:** Full-bleed product UI inside a 4px-radius container with a 1px `--ink-20` border (no shadow).

### Icons

- **Format:** SVG only.
- **Size:** 24×24px at default scale.
- **Style:** Single stroke weight (1.5px), drawn in `--ink` or `--signal` only. No fills except for solid icons (arrow tip, check mark).

### Social images (OG, Twitter)

- **Format:** JPEG or AVIF.
- **OG:** 1200×630px (1.91:1 ratio), 120kB target.
- **Twitter:** 1200×675px (16:9), 120kB target.
- **Content:** A clean composition of the Kino logo, wordmark, and one key visual from the brand (the signature dot, a line drawing, a rendered animation frame).

## Font loading

Fonts live in `assets/fonts/`. The `fonts/README.md` contains:
1. `@font-face` declarations for all weights.
2. Recommended loading strategy (critical path: Söhne 400 only; others async via `font-display: swap`).
3. License information (purchase fonts or use open-source alternatives like Inter + JetBrains Mono).

## Color in assets

- All SVGs use `var(--signal)`, `var(--ink)`, `var(--paper)` so they respond to the token definitions in `tokens/variables.css`.
- Never use hardcoded colors in SVGs. If you must, use the hex values from `tokens/variables.css` with a comment explaining the fallback.

## Naming conventions

- Use kebab-case for all filenames: `prompt-block.jpg`, not `promptBlock.jpg` or `Prompt Block.jpg`.
- Prefix by category: `hero-*.svg`, `social-*.jpg`, `icon-*.svg`.
- Use semantic names: `hero-homepage.svg` not `hero-1.svg`.

## How Claude Code / agents should use these

When an agent is asked to build a page, it should:
1. Read `skills/pages/SKILL.md` to understand the structure.
2. Reference images by path: `<img src="/assets/images/hero/homepage-hero.svg" alt="...">`.
3. Reference icons from `assets/icons/`: `<img src="/assets/icons/arrow.svg" alt="" class="icon">`.
4. Load fonts from `assets/fonts/` or pull them from your package manager (Söhne is commercial; Inter is free and compatible).

## Adding new assets

Before adding a new image:
1. Make sure it fits into one of the categories above.
2. Name it semantically (e.g., `screenshot-template-gallery.jpg`).
3. Optimize: 
   - Raster images: 2x retina max, AVIF + WebP + JPG with srcset.
   - SVGs: Run through SVGO, remove unnecessary attributes, keep `viewBox` and `class/id` selectors.
4. Add a brief comment in the relevant skill file explaining where it's used.

## Placeholder strategy

If final assets aren't ready yet, use solid-color rectangles as placeholders:

```html
<!-- Hero image placeholder: awaiting studio/final-hero.svg -->
<div style="
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--ink-10);
  border-radius: var(--border-radius-lg);
"></div>
```

The agent can build the full layout with placeholders; swap in real assets later.
