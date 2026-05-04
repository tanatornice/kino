# Components — Kino Design System

This folder contains **CSS templates** and **component specs** for the Kino design system. They're not meant to be imported directly; instead, they're reference implementations that Claude Code or local agents should use to understand the component's structure, styling, and animation triggers.

## What's here

Each `.css` file documents:
- All CSS classes and variants (with Tailwind equivalents in `tokens/tailwind.config.js`)
- Default styles for each state (default, hover, active, disabled)
- Dark mode overrides
- HTML structure examples at the bottom

## How to use these files

### Option 1: Copy the CSS directly

If you're building a static site or plain HTML, copy the relevant `.css` file into your stylesheet:

```html
<link rel="stylesheet" href="components/button.css">
<link rel="stylesheet" href="components/input.css">
<link rel="stylesheet" href="components/card.css">
```

### Option 2: Convert to your framework

If you're building with React, Vue, Svelte, etc., the structure is the same:

**CSS classes** → **component props**:
```jsx
// From button.css: .button--primary.button--md
<Button variant="primary" size="md">Render →</Button>
```

All styling maps directly:
```jsx
// button.jsx
export function Button({ variant = 'secondary', size = 'md', ...props }) {
  return (
    <button className={`button button--${variant} button--${size}`} {...props} />
  );
}
```

### Option 3: Use with Tailwind

If you're using Tailwind with the `tokens/tailwind.config.js` config, you can build components using utility classes:

```jsx
<button className="h-10 px-4 bg-ink text-paper border border-ink rounded hover:bg-ink-80">
  Render →
</button>
```

The Tailwind config maps all the design system tokens, so utilities will always reference the canonical colors and spacing.

## Component inventory

| File | Components | Variants |
|------|-----------|----------|
| `button.css` | Button | primary, secondary, ghost × sm, md, lg |
| `input.css` | Input, Prompt Block | sm, lg; special prompt modes |
| `card.css` | Editorial Card, Template Card | 2 patterns |
| `pills.css` | Filter Pill, Tag | default, active |
| `nav-footer.css` | Navigation, Footer | responsive, dark mode |

## Animation hooks

Components are wired for anime.js animations. Look for:

- **Data attributes** that Claude Code can hook into (e.g., `data-timecode` for running timecodes)
- **SVG paths** inside components (e.g., the underline on filter pills)
- **Comment blocks** showing the exact anime.js code to trigger the animation

Example from `pills.css`:

```css
/* When a pill becomes active, a 1px signal underline briefly draws.
   In animation/SKILL.md, this is created with:
   
   animate(pill, { ... duration: 160, ... });
   animate(createDrawable(pill.querySelector('.underline')), { ... });
*/
```

When Claude Code generates the full page, it should:
1. Use the HTML structure from these examples.
2. Include the anime.js code patterns from `skills/animation/SKILL.md`.
3. The CSS classes provide the foundation; the JS provides the motion.

## Responsive behavior

All components include mobile overrides (typically at `@media (max-width: 768px)`). Key changes:

- Buttons: sizes compress slightly on mobile
- Inputs: full-width on mobile, constrained on desktop
- Cards: 1-column grid on mobile, 2-4 columns on desktop
- Nav: links move to footer, hamburger menu optional
- Footer: stacked columns on mobile, grid on desktop

Responsive behavior is built into the CSS; agents should include it as-is.

## Dark mode

All components have `@media (prefers-color-scheme: dark)` overrides. The design system automatically inverts:
- `--paper` ↔ `--ink` (backgrounds and text)
- Borders and subtle elements adjust to maintain contrast

Agents should include dark mode CSS even if they're not building a dark mode initially. It's a single media query and respects user preference.

## What NOT to do

- Don't rewrite component logic. Use the CSS as written.
- Don't change the class names; they're referenced in the skills.
- Don't remove the animation hooks and comments; future agents need them.
- Don't introduce new sizes or variants without updating the brand skill first.

## FAQ: "Should I use these as React components?"

**Short answer:** Not directly. They're CSS specifications, not component libraries.

**What to do instead:**
1. Read the HTML examples at the bottom of each file.
2. Translate the HTML structure into your component (React JSX, Vue SFC, etc.).
3. Use the class names from the CSS file in your component's `className` or `:class` binding.
4. Wire up interaction with JS/anime.js as described in `skills/animation/SKILL.md`.

This keeps the design system agnostic to framework and lets agents in different environments (React, static HTML, local models) all build consistently from the same specifications.
