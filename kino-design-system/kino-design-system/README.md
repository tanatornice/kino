# Kino — Design System

The design system for **Kino**, an AI motion design studio. This folder is a portable bundle of skills (markdown rules) and assets that any coding agent — Claude Code, Cursor, local open-source models — can use to produce on-brand outputs.

## What Kino is

Kino is a browser-based AI motion design tool. You describe motion, Kino renders it. It is positioned as a **studio**, not a generator: the brand respects the lineage of motion design as craft (Saul Bass, Swiss design, kinetic typography) while removing the friction of After Effects.

Tagline: **The studio that runs on prompts.**

## How to use this folder

Each subfolder under `skills/` contains a `SKILL.md` file. A skill is a markdown document with rules, examples, and references. When an agent is asked to build something for Kino, it should:

1. Read `skills/brand/SKILL.md` first — it's the source of truth for everything visual.
2. Then read whatever skill matches the task (e.g. `skills/components/SKILL.md` for UI work, `skills/animation/SKILL.md` for motion work).
3. Cross-reference `skills/content/SKILL.md` for any user-facing copy.

The skills are deliberately written as if instructing a teammate, not a machine. They explain *why* as well as *what*, because the why is what keeps the brand consistent across new use cases the rules don't explicitly cover.

## Folder map

```
kino-design-system/
├── README.md                       ← you are here
├── INDEX.md                        ← complete asset & skill index (read this if lost)
│
├── skills/                         ← design rules (markdown specifications)
│   ├── brand/SKILL.md              ← identity, color, type, voice rules
│   ├── components/SKILL.md         ← UI primitives and patterns
│   ├── animation/SKILL.md          ← anime.js conventions, motion principles
│   ├── content/SKILL.md            ← copywriting voice & examples
│   └── pages/SKILL.md              ← page-level layouts (homepage, feature pages)
│
├── tokens/                         ← CSS variables and config
│   ├── variables.css               ← CSS custom properties (--paper, --ink, --signal, etc.)
│   └── tailwind.config.js          ← Tailwind theme extending the tokens
│
├── components/                     ← CSS component specifications
│   ├── README.md                   ← how to use these files
│   ├── button.css                  ← button variants and sizes
│   ├── input.css                   ← text input and prompt block
│   ├── card.css                    ← editorial and template cards
│   ├── pills.css                   ← filter pills and tags
│   └── nav-footer.css              ← navigation bar and footer
│
├── svgs/                           ← SVG templates for animations
│   ├── logo.svg                    ← Kino wordmark with animatable dot
│   ├── morph-shapes.svg            ← shapes for anime.js morphing
│   └── line-drawing.svg            ← paths for anime.js draw animation
│
└── assets/                         ← brand images, logos, icons, fonts
    ├── README.md                   ← asset structure and guidelines
    ├── images/                     ← hero illustrations, screenshots, diagrams
    │   ├── hero/
    │   ├── screenshots/
    │   ├── diagrams/
    │   └── social/
    ├── logos/                      ← Kino logo variants
    ├── icons/                      ← arrow, chevron, check, play, pause, etc.
    └── fonts/                      ← Söhne, JetBrains Mono, etc.
```

**New — start here if you're lost:** `INDEX.md` is a master reference for every file and quick lookups.

## Tech stack assumptions

- **Framework:** Next.js (App Router) on Vercel — matches existing infra
- **Styling:** Tailwind CSS with a small set of custom tokens (see `brand/SKILL.md`)
- **Animation:** anime.js v4 for both UI motion and the rendered output engine
- **Type:** variable fonts loaded via `next/font`

Local agents that don't have Next.js context can still produce static HTML using the same tokens — the brand rules are framework-agnostic.
