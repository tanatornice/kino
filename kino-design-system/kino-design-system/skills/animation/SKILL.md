# Animation — Kino

Kino's product *is* motion. Every animation in the marketing site or product UI must feel like it was designed by a motion designer, not added as polish. This skill covers (a) motion principles for the brand, and (b) how we use **anime.js v4** to implement them.

## 1. Motion principles

Three rules govern every animation Kino produces:

1. **Motion has weight.** Things accelerate and decelerate. Linear easing is banned in marketing surfaces. (The product timeline preview is the only place linear is acceptable, because it represents real time.)
2. **Motion has direction.** When something appears, it comes from somewhere. When something leaves, it goes somewhere. Nothing fades in from `opacity: 0` without translation, unless it's a cross-fade between two states of the same element.
3. **Motion respects the reader.** Total animation time on first paint never exceeds 1.2 seconds. After that, motion is triggered by interaction or scroll. We don't animate things that have already been read.

### Default durations

```
micro       120ms    hover, focus, small state changes
short       240ms    button press, dropdown, toggle
medium      400ms    card entrance, panel reveal
long        720ms    hero text stagger, page transitions
extended   1200ms    set pieces, only on first paint
```

### Default easings (anime.js v4 syntax)

```
'out(3)'           // standard exit/entrance, default for almost everything
'inOut(3)'         // when something both enters and settles
'outExpo'          // for emphatic arrivals (hero text)
'inOutQuad'        // for slow ambient loops
createSpring({ stiffness: 120, damping: 14 })   // for draggable / interactive
```

Avoid `linear`, `easeInOutBack` (too bouncy), and anything that overshoots more than 5% of the target.

### Reduced motion

Always respect `prefers-reduced-motion`. The pattern:

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
animate('.hero-text', {
  y: reduced ? 0 : [40, 0],
  opacity: [0, 1],
  duration: reduced ? 1 : 720,
  ease: 'outExpo',
  delay: stagger(60),
});
```

When reduced motion is set, opacity transitions remain (so users see *that* something arrived) but translation, scale, and rotation are zeroed out.

## 2. anime.js v4 — what we use

We use anime.js v4 for everything. Imports are modular; only pull what you need so the bundle stays small.

```js
import { animate, createTimeline, stagger, onScroll } from 'animejs';
import { createDrawable, morphTo, createMotionPath } from 'animejs';
import { createSpring, createDraggable } from 'animejs';
```

Bundle reference (from anime.js docs):
- `animate` — 5.2 KB
- `createTimeline` — +0.55 KB
- `stagger` — +0.48 KB
- `onScroll` — +4.30 KB
- SVG utilities — +0.35 KB
- Draggable — +6.41 KB

Target total bundle for the marketing site: under 20 KB of anime.js.

## 3. Patterns

### Pattern A — Hero text stagger (entrance)

Every hero block follows this. Letters or words split, rise, settle.

```js
import { animate, stagger } from 'animejs';

// HTML: split each word into <span class="word"><span class="inner">word</span></span>
// .word has overflow: hidden; .inner is what we translate.

animate('.hero .inner', {
  y: ['110%', '0%'],
  duration: 720,
  ease: 'outExpo',
  delay: stagger(60),
});
```

Notes: We translate *percentages* of the element's own height, not pixels — this keeps it responsive across font sizes. The `overflow: hidden` on the parent is what makes it look like the words rise *from* the line, not just up.

### Pattern B — Scroll-triggered reveals

For everything below the fold, use the Scroll Observer. Animations fire once when the element enters the viewport.

```js
import { animate, onScroll, stagger } from 'animejs';

animate('.feature-card', {
  y: [32, 0],
  opacity: [0, 1],
  duration: 600,
  ease: 'out(3)',
  delay: stagger(80),
  autoplay: onScroll({
    enter: 'bottom-=80 top',   // start when card is 80px from bottom of viewport
    sync: false,                // play through, don't scrub
  }),
});
```

Don't use `sync: true` (scrubbing) for content reveals. Scrubbing is for atmospheric/decorative elements only.

### Pattern C — SVG line drawing

Used for: the Kino logo's signature `i` dot trace, decorative diagrams, "loading" states in the marketing site.

```js
import { animate, createDrawable, stagger } from 'animejs';

animate(createDrawable('.diagram path'), {
  draw: ['0 0', '0 1'],     // from no-line to full-line
  duration: 1200,
  ease: 'inOut(3)',
  delay: stagger(80),
});
```

The `draw` syntax represents two values along the path: where the line *starts* and where it *ends*, both as fractions 0–1. `'0 1'` means a fully drawn line.

### Pattern D — Shape morphing (the homepage hero centerpiece)

This is Kino's signature marketing moment: a wordmark, a glyph, a product icon, all morphing into each other on a loop.

```js
import { animate, morphTo, createTimeline } from 'animejs';

createTimeline({ loop: true, defaults: { ease: 'inOutQuad', duration: 1400 } })
  .add('.morph', { d: morphTo('.shape-b') }, 0)
  .add('.morph', { d: morphTo('.shape-c') }, 1600)
  .add('.morph', { d: morphTo('.shape-a') }, 3200);
```

The shapes themselves live as hidden `<path>` elements in the SVG; `morphTo` references their `d` attribute by selector. Each shape must have the same number of points for clean morphs (use Figma's "Outline stroke" + simplify, then verify in code).

### Pattern E — Stagger grids (template gallery)

When the template grid loads, tiles arrive in a wave from the cursor's position (or from center on page load).

```js
import { animate, stagger } from 'animejs';

const opts = { grid: [4, 6], from: 'center' };  // 4 cols × 6 rows

animate('.tile', {
  scale: [0.92, 1],
  opacity: [0, 1],
  duration: 500,
  ease: 'out(3)',
  delay: stagger(40, opts),
});
```

Adjust the grid dimensions to match the actual rendered grid at the breakpoint. On mobile (1 column), `from: 'first'` instead of `'center'`.

### Pattern F — The prompt input cursor

The blinking cursor in the homepage prompt input uses anime.js, not CSS animation, because it has to pause when the user starts typing.

```js
import { animate } from 'animejs';

const cursor = animate('.prompt-cursor', {
  opacity: [1, 0],
  duration: 500,
  ease: 'steps(2)',
  loop: true,
  alternate: true,
});

// On focus, pause the cursor blink and let the actual input cursor take over
input.addEventListener('focus', () => cursor.pause());
input.addEventListener('blur',  () => cursor.play());
```

### Pattern G — Draggable timeline scrubber (product UI)

The product's preview timeline uses `createDraggable` with a spring release. This is the one place we use spring physics.

```js
import { createDraggable, createSpring } from 'animejs';

createDraggable('.scrubber', {
  container: '.timeline-track',
  x: { mapTo: 'x' },
  y: false,
  releaseEase: createSpring({ stiffness: 120, damping: 14 }),
  onUpdate: (self) => {
    setPlayheadTime(self.progress);
  },
});
```

## 4. Performance rules

- Animate `transform` and `opacity` only. No `top`, `left`, `width`, `height`, `margin`. If you need to animate size, use `scale` and reset on completion.
- Use `will-change: transform` only on elements that are about to animate, not statically.
- For grids of 50+ animated items, use `composition: 'blend'` so simultaneous animations on the same element don't fight each other.
- Lazy-load anime.js modules below the fold. The hero animation is the only one that should be in the critical path.

## 5. What not to animate

- Body copy paragraphs. Reading interrupted by motion is hostile.
- Form fields on focus (just change the border color via CSS transition).
- Navigation links on hover (CSS color transition is enough).
- Anything that will be animated more than once per page view, unless it's a deliberate ambient loop (e.g., the logo's pulsing dot).

## 6. The "studio" feel — small details that matter

- A **timecode display** (`00:00:24:15`) somewhere visible on the homepage — it can be decorative, but it should be running. This is the single biggest signal that Kino is a motion studio and not a generator.
- **Frame counters** on hover for any animated thumbnail.
- The cursor in the prompt input blinks as `steps(2)`, not a smooth fade. Steps feel like a real terminal.
- Page transitions: a 1px `--signal` line wipes left-to-right across the top of the page during navigation (200ms in, 200ms out). This is Kino's equivalent of a YouTube progress bar.
