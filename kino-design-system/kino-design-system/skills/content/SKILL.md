# Content & Voice — Kino

How Kino writes. Read this before producing any user-facing copy: marketing pages, product UI strings, error messages, blog posts, social.

## 1. The voice in one paragraph

Kino sounds like a senior designer talking about their work in a studio kitchen at 4pm: confident, specific, dry. Short sentences. Concrete nouns. We name things directly — "export," "render," "frame" — instead of softening them — "get your video," "create magic." We trust the reader. We don't explain what motion design is unless asked. When we're funny, we're dry, not zany. We never use exclamation marks except in error states the user caused.

## 2. The five tone rules

### Rule 1 — Show specifics, not adjectives.

> ❌ "Stunning, professional animations in seconds."  
> ✅ "Type a prompt. Get a 1080p MP4 in 24 frames."

Specifics are credible. Adjectives are wallpaper.

### Rule 2 — Use the verbs of the craft.

Render, cut, score, key, ease, frame, hold, beat, loop, scrub, stack, mask. These words tell motion designers we know what we're doing. They don't confuse beginners — beginners pick them up fast.

> ❌ "Make a video that loops."  
> ✅ "Render a 4-second loop."

### Rule 3 — Don't say AI.

The product is obviously AI; the homepage doesn't have to remind people. Say what the product *does*, not what it *is*.

> ❌ "Our AI-powered animation engine creates stunning motion graphics."  
> ✅ "Describe a motion. Kino renders it."

We're allowed to say "AI" in technical docs and the FAQ when a user is asking. We never say it in marketing headlines.

### Rule 4 — One sentence per idea.

Long sentences invite skimming. Short sentences invite reading.

> ❌ "Kino is the studio-grade motion design platform that lets creators, marketers, and educators produce professional animations in seconds, all from a single prompt, with no software to install or learning curve to climb."  
> ✅ "Kino is a motion design studio you can prompt. No installs. No keyframes. Render in seconds."

### Rule 5 — Punctuation is restrained.

- No exclamation marks (except in user-caused errors: "That filename's already taken!")
- No em-dashes inside body copy. (Section eyebrows can use them.)
- No ellipses in marketing copy. (Loading states only.)
- Periods on every line of a stacked headline.
- Oxford comma always.

## 3. Forbidden words

Words and phrases that don't belong in Kino's voice. If you find yourself writing one, rewrite the sentence.

| Banned | Why |
|---|---|
| "stunning" | Adjective bloat. Show, don't tell. |
| "powerful" | Means nothing. Software is always "powerful." |
| "magic" / "magical" | We're a studio, not a wizard. |
| "AI-powered" | Redundant in 2026. |
| "simply" / "just" | Condescending. The user knows what they're doing. |
| "let's" | We're not coaching them. |
| "boost" / "supercharge" | Marketing-deck cringe. |
| "game-changer" | Same. |
| "unleash" | Especially that. |
| "in seconds" (alone) | Replace with the actual number. "In 24 seconds." |
| "intuitive" | If it were intuitive, you wouldn't have to say so. |
| "seamless" | Lost meaning around 2014. |
| "elevate" | Real estate language. |

## 4. Headline structure

The Kino headline is two beats, often punctuated as two sentences. Beat one is a verb. Beat two is the consequence.

> Describe a motion. Kino renders it.  
> Type the brief. We'll cut the film.  
> Write a sentence. Watch it move.  
> Skip the keyframes. Keep the craft.

The homepage's primary headline is **"Describe a motion. Kino renders it."** This is the canonical example.

## 5. Subheadline structure

Subheadlines are one sentence, do one thing: tell the reader who this is for.

> ✅ "A motion design studio for designers who'd rather skip the keyframing."  
> ✅ "Built for the people who used to open After Effects."

Avoid features in the subheadline. Subheadlines are for positioning, not specs.

## 6. Body copy

Body copy explains the work. Three rules:

1. Lead with a fact, not a promise.
2. One paragraph per idea, three sentences max.
3. End paragraphs on the strongest word.

> ✅ "Kino's renderer outputs MP4, MOV, and GIF at up to 4K. It hands off cleanly to Premiere, Final Cut, or Resolve. The frames you see in the browser are the frames you ship."

## 7. Microcopy

### Buttons

Verb-first. No "Click here." No "Get started" if a more specific verb exists.

```
Render          ← primary CTA on prompt block
Start a project ← primary CTA on empty state
Export MP4      ← export confirmation
Save a copy     ← duplicate action
Discard         ← destructive action (not "Delete")
```

### Form labels

Direct nouns, sentence case, no colon.

```
Email
Password
Project name
Frame rate
```

### Error messages

Identify what's wrong. Suggest what to do. No apology.

> ❌ "Oops! Something went wrong."  
> ✅ "Render failed at frame 47. Try a shorter clip or a simpler prompt."

> ❌ "Invalid email."  
> ✅ "That email's missing an @."

### Loading states

Use timecodes when you can.

```
Rendering 00:00:00 / 00:00:24
Encoding…
Almost there.
```

"Almost there." is the one piece of warmth allowed. Use it sparingly.

### Empty states

State what's not there. Suggest the next step. No metaphor.

> ✅ "No projects yet. Start one with a prompt."

## 8. The homepage copy (canonical)

This is the actual homepage copy. Treat it as a reference for tone calibration.

```
[Eyebrow]            A MOTION DESIGN STUDIO

[H1]                 Describe a motion.
                     Kino renders it.

[Sub]                Built for the people who used to open After Effects.
                     Type a prompt, get a frame-accurate MP4 in seconds.

[Prompt block]       Describe a motion…
                     [ Render → ]

[Suggestions]        Try: a logo that draws itself · particle text revealing 'KINO'
                     · a clean countdown from 5 · a chart that builds on scroll

[Section eyebrow]    SECTION 02 / FEATURED

[Section heading]    Recently rendered.

[Body]               Every prompt below was typed by a real person and rendered
                     by Kino. Hover any frame to see it move. Click to remix.

[Section eyebrow]    SECTION 03 / WHY KINO

[Section heading]    A studio, not a generator.

[Body]               Most AI animation tools chase one frame at a time. Kino
                     renders timelines: scenes that have weight, beats that
                     hold, motion that respects the read. The frames you see
                     in the browser are the frames you ship.

[Stat block]                    PROJECTS          ANIMATIONS         AVG RENDER
                                  10K+              500K+              24 SEC

[Section eyebrow]    SECTION 04 / FAQ

[Section heading]    Questions, briefly.
```

## 9. FAQ tone

FAQ answers are short. One paragraph each. They sound like the answer would sound out loud.

> **Do I need motion design experience?**  
> No. If you can describe what you want — "a logo that draws itself, then pulses once" — Kino can render it. Experience helps you write better prompts, but it isn't the price of admission.

> **How does Kino compare to After Effects?**  
> After Effects is a workshop. Kino is a studio that delivers. AE gives you every dial; Kino makes the calls and shows you the result. Most users keep both: AE for the bespoke, Kino for the everyday.

> **What can I export?**  
> MP4, MOV, GIF, and WebM at up to 4K, 60fps. Frames are colorspace-tagged for handoff to Premiere, Final Cut, and Resolve.

## 10. Social & launch copy

Social posts are one beat shorter than marketing copy. They can break the period rule.

> Describe a motion  
> Kino renders it  
> Live now → kino.so

> The studio that runs on prompts.

Twitter/X threads start with a single declarative sentence. No emoji, no hooks like "🧵 a thread:". The work speaks; the copy stays out of the way.
