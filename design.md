# Design: JimjoAI

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Narrative Workflow (four numbered stages: detect, automate, measure, train), draw 697726
- Theme: brand (the JimjoAI logo: night ink, lime mark, orange dot and "AI")
- Axes: light/grotesk-heavy/warm · posture: full palette (paper, a night field, the lime seal, the orange signal)

## Tokens
`assets/css/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(95.5% 0.011 90);  --color-paper-2: oklch(92.6% 0.017 88);  --color-paper-3: oklch(99.4% 0.007 89);
  --color-ink: oklch(17.2% 0.012 261);  --color-ink-2: oklch(28% 0.014 262);  --color-muted: oklch(46% 0.018 266);  --color-rule: oklch(86.8% 0.021 89);
  --color-accent: oklch(68.2% 0.211 38);  --color-accent-ink: oklch(17.2% 0.012 261);  --color-focus: oklch(52.3% 0.174 36);
  --color-night: oklch(17.2% 0.012 261);  --color-night-ink: oklch(95.5% 0.011 90);  --color-night-muted: oklch(76% 0.02 266);  --color-seal: oklch(89.8% 0.203 122);
  --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 16px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. Weights: 400 and 700 for text, 800 for display.

## Rules every page follows
- No eyebrows or tracked-capital labels: labels are the body face, a step smaller, sentence case.
- No middle-dot strings and no arrows typed into link text (icons are SVG, separate).
- One primary button recipe (`.button-primary`, ink on paper, lime on night); secondaries are `.button-ghost` or a text link (`.link-arrow`).
- Night bands (`.section-dark`, `.band-night`) swap every text colour in the same rule.
- Only `transform` and `opacity` animate; one entrance per page (the page hero), none below it.
- Footer: letter close (sign-off, link groups as rows, legal line).

## Controls
- Primary: ink fill (lime on night) · pill · 48px (44px small)
- Secondary: 1px outline in currentColor or a text link · pill · same height

## Motion
- Character: calm; one entrance (the hero settle, 0.6s), the hero flow loop with a reduced-motion end state; under reduced motion everything ends at once.

## Exports
`assets/css/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
