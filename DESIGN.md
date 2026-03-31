````markdown
# Design System: The Precision Architect

## 1. Overview & Creative North Star

The visual identity of this design system is rooted in the concept of **"The Precision Architect."** In the world of high-stakes financial data and developer tooling, clarity is not just an aesthetic—it is a functional requirement.

This system moves beyond the "generic dashboard" by treating the UI as a high-performance instrument. It rejects the "bubbly" consumer web in favor of a sophisticated, high-density environment inspired by the structural rigor of VS Code and the refined utility of GitHub. We break the template look by utilizing **intentional asymmetry** and **tonal layering**, where importance is signaled by subtle shifts in luminosity rather than heavy-handed shadows or thick borders.

## 2. Colors & Surface Architecture

The palette is a study in deep slates and technical zincs, punctuated by a surgical "High-Precision Blue" (#0969da).

### The "No-Line" Rule

Traditional 1px solid borders are strictly prohibited for structural sectioning. To maintain a premium, integrated feel, layout boundaries must be defined through **Background Tonal Shifts**. For example, a sidebar using `surface_container_low` should sit directly against a `background` viewport without a stroke separating them.

### Surface Hierarchy & Nesting

Treat the UI as a series of nested technical modules. Use the tiered container system to create "logical depth":

- **Base Level:** `background` (#0e0e10) — The global canvas.
- **Structural Zones:** `surface_container_low` (#131316) — Use for sidebars or navigation rails.
- **Content Cards:** `surface_container` (#19191d) — The primary workspace.
- **Active Modules:** `surface_container_high` (#1f1f24) — Use for focused inputs or elevated data tables.
- **Overlays:** `surface_container_highest` (#25252b) — For command palettes and dropdowns.

### The "Glass & Gradient" Rule

To avoid a flat "dead" look, floating elements (Modals/Popovers) should utilize **Glassmorphism**. Apply `surface_container_highest` with a 0.8 opacity and a 12px backdrop-blur. For Primary CTAs, use a subtle linear gradient from `primary` (#adc6ff) to `primary_container` (#004493) to give the action a "machined" feel.

## 3. Typography: The Dual-Engine System

We utilize a dual-font strategy to separate "Instructional UI" from "Technical Data."

- **UI/Labels (Inter):** Used for all navigation, headers, and descriptive text. It is clean, legible, and provides the "Editorial" voice of the system.
- **Data/Values (Monospace):** Used for all financial figures, code snippets, timestamps, and IDs. This provides the "Precision" voice.

### Hierarchy

- **Display-LG (3.5rem):** Reserved for market-movers or high-level totals.
- **Headline-SM (1.5rem):** Used for section headers within a workspace.
- **Label-SM (0.6875rem):** The workhorse of the terminal. Used for table headers and metadata, often in all-caps with 0.05em tracking for a "blueprint" aesthetic.

## 4. Elevation & Depth

In "The Precision Architect," depth is a result of light physics, not CSS decoration.

- **The Layering Principle:** Instead of shadows, stack surface tiers. An inner data grid (`surface_container_lowest`) placed inside a `surface_container` creates a natural "recessed" look.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input focus), use the `outline_variant` token at **20% opacity**. It should feel like a faint hairline, visible only when looked for.
- **Ambient Shadows:** For floating command palettes, use an ultra-diffused shadow: `0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never look "grey"; it should appear as a natural occlusion of the background light.

## 5. Components

### Buttons

- **Primary:** High-Precision Blue (#0969da) background with `on_primary` text. Use `sm` (0.125rem) or `md` (0.375rem) radiuses—never fully rounded.
- **Secondary:** `surface_container_highest` background with a Ghost Border.
- **Tertiary/Ghost:** No background; `primary` text. Only visible on hover via a subtle `surface_variant` shift.

### Input Fields & Data Entry

- **Default State:** `surface_container_high` background with a 1px Ghost Border.
- **Focus State:** Border opacity increases to 100% using the `primary` blue token.
- **Data Density:** Reduce vertical padding (`spacing.2`) to allow more rows of information to be visible on screen.

### Data Tables (The Core Terminal)

- **No Dividers:** Strip all horizontal and vertical lines. Separate rows using a subtle background hover state (`surface_variant`).
- **Alignment:** Financial values (Monospace) must be right-aligned for easy scanning of decimal points. Labels (Inter) are left-aligned.
- **Precision Indicators:** Use `error` (#ee7d77) and `tertiary` (#699cff) for negative/positive delta values.

### Chips & Badges

- **Technical Badges:** Use `surface_container_highest` with Monospace text. These should look like small segments of code or hardware tags.

## 6. Do's and Don'ts

### Do:

- **Do** lean into high data density. Developers and traders prefer more information over "white space."
- **Do** use `spacing.0.5` (0.1rem) and `spacing.1` (0.2rem) for tight micro-adjustments in complex data views.
- **Do** use Monospace for any value that can be incremented or measured.

### Don't:

- **Don't** use `full` (pill) roundedness for buttons or inputs. It conflicts with the "Architect" aesthetic. Stick to `sm` or `none`.
- **Don't** use standard 100% opaque borders to separate layout sections.
- **Don't** use large drop shadows on cards. Let the background color shifts do the work.
- **Don't** use "Marketing" colors. Avoid vibrant oranges or purples unless they represent specific system statuses.```
````
