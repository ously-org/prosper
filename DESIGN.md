# Design System Strategy: Precision & Obsidian

## 1. Overview & Creative North Star
### The Creative North Star: "The Obsidian Architect"
This design system is not a template; it is a precision instrument. It rejects the generic, "flat" web aesthetic in favor of **The Obsidian Architect**—a philosophy that treats digital space as a physical environment of dark, layered glass and light-emitting data.

We move beyond the standard grid by utilizing intentional asymmetry and high-contrast typography scales. The interface should feel like a high-end command center: authoritative, dark, and hyper-accurate. By contrasting "Precision-Engineered" UI (sharp lines, code-monospaced data) with "Humanistic" accents, we create a signature tension that makes the experience feel bespoke and premium.

---

## 2. Colors
Our palette is rooted in depth. We use "Obsidian" as our canvas and "High-Precision Blue" as our primary functional accent.

### Surface Hierarchy & Nesting
Depth is achieved through **Tonal Layering**. In the dark theme, we use a specialized surface scale:
- **Background (`oklch(0.148 0.004 228.8)`)**: The foundational canvas.
- **Surface-Container-Low (`#131316`)**: The deepest pits, used for contrasting inset areas.
- **Surface-Container (`#19191d`)**: Standard sectioning.
- **Surface-Container-High (`#1f1f24`)**: Elevated cards or interactive areas.
- **Surface-Container-Highest (`#25252b`)**: Peak elevation, used for floating elements and glass bases.

### The "Ghost Border" Rule
While we avoid heavy, solid borders, we utilize "Ghost Borders" for structural integrity. Defined as `border-border` (`oklch(1 0 0 / 10%)`), these 1px strokes provide a suggestion of a boundary that feels etched rather than drawn.

### The "Glass & Gradient" Rule
To inject visual "soul," use **Glassmorphism** for floating menus and modals.
- **Implementation**: Apply `.glass` utility (`bg-surface-container-highest/80` with `backdrop-blur-md`).
- **CTAs**: Use the `.primary-gradient` for primary actions, transitioning from light sky blue (`#adc6ff`) to deep precision blue (`#004493`).

---

## 3. Typography
We use a dual-font system to separate "Technical Intent" from "System Feedback."

- **Inter Variable (UI & Sans)**: Used for body text and general interface elements. It provides a clean, neutral slate.
- **JetBrains Mono (Heading & Data)**: Used for all headings (`--font-heading`), numeric values, and labels. This font signals "Precision" and aligns with the brand's engineered aesthetic.

**Hierarchy Strategy:**
- **Headings**: Always use `font-mono`.
- **Data Values**: Any number or technical readout must use `font-mono`.
- **Body**: Use `font-sans` for readability in long-form text.

---

## 4. Elevation & Depth
Light in this system is emissive, emanating from the data and interactive points.

- **The Layering Principle**: Stack surface tiers to create "lift." 
- **Ambient Shadows**: Minimal usage. Depth is primarily communicated through the `surface-container` scale and the `glass` backdrop blur.
- **Interactive Glow**: Hover states on interactive elements should utilize subtle color shifts or the `accent` color to indicate focus.

---

## 5. Components

### Buttons & CTAs
- **Primary**: Gradient-filled (`.primary-gradient`) with a standard radius.
- **Secondary**: Outlined or glass-based. Subtle `surface-container-high` background on hover.
- **Tertiary**: Pure text in `primary` or `foreground` color, mono font for technical authority.

### Cards & Lists
- **Rule**: Use tonal shifts to separate cards from the background. 
- **Borders**: Use the 10% opacity ghost border to define edges when tonal contrast is low.

### The "Precision" Input
- Text inputs must use a subtle background and clear focus states. The focus state uses `outline-ring/50` for a soft, tech-focused glow.

---

## 6. Do's and Don'ts

### Do
- **Do** use JetBrains Mono for anything that can be measured (time, money, percentages) and for all headings.
- **Do** use `oklch` for dynamic color definitions to ensure perceptual uniformity.
- **Do** ensure all "glass" elements have enough blur to maintain readability over complex backgrounds.
- **Do** respect the `--radius` token (0.625rem) for a consistent "engineered" feel.

### Don't
- **Don't** use 100% white for text in dark mode; use the `foreground` variable.
- **Don't** use standard drop shadows; prefer tonal layering and glass effects.
- **Don't** use rounded corners larger than the scale defined by the `--radius` variable.
- **Don't** use dividers where vertical white space and background shifts can achieve the same goal.
ace.