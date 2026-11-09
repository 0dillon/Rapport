# Rapport Institute for Psychoeducation: Design System

Professional Minimalist Architecture & Hierarchy

Read this before changing anything. Each value here is an intentional design decision that ensures consistency, accessibility, and high-craft minimalism across all pages.

## What Makes This Site Distinctive

The redesigned site presents the Rapport Institute for Psychoeducation with quiet institutional authority, intellectual clarity, and human warmth. Rather than relying on loud, saturated full-bleed blocks or informal high-contrast gimmicks, the interface uses an architectural, minimalist editorial hierarchy:

1. **Airy, Unified Canvas:** A warm archival porcelain background (`#FAF8F2`) extends across all surfaces, eliminating jarring color switching between pages. Elevated content rests on crisp, subtle white cards with micro-borders and soft atmospheric depth.
2. **Intentional Chromatic Hierarchy:** 
   - **Deep Navy (`#0B1B3F`):** Represents structural authority, intellect, and grounding. Used for primary typography, the contemplative philosophy band ("Championing Rehumanisation"), closing calls-to-action, and the footer.
   - **Rapport Cobalt Blue (`#2563EB`):** Represents purposeful action and connection. Used with surgical precision for primary interactive targets (CTA buttons), active state indicators, and subtle focus rings.
   - **Authentic Brand Yellow (`#FDF012`):** Reserved exclusively for the client's official mark (the person in conversation), honoring brand identity without resorting to loud caution-tape buttons.
3. **Harmonious Universal Header:** A consistent, translucent frosted header (`backdrop-filter: blur(16px)`) with hairline demarcation serves every page identically, establishing continuity throughout navigation.
4. **Deliberate Negative Space:** Generous vertical rhythm and capped reading measures (54ch–65ch) ensure that the client's educational mission is absorbed without cognitive friction.

## Design Tokens

### Colour Palette

| Token | Value | Primary Use |
|---|---|---|
| `--paper` | `#FAF8F2` | Archival porcelain ground for page backgrounds |
| `--paper-elevated` | `#FFFFFF` | Elevated cards, forms, and accordion panels |
| `--paper-subtle` | `#F4F1EA` | Subtle contrast fills, tag backgrounds, and hover fills |
| `--navy` | `#0B1B3F` | Primary headings, body copy on light, philosophy statement, CTA ground |
| `--navy-dark` | `#07122B` | Footer ground |
| `--navy-muted` | `#47536B` | Secondary text, field placeholders, subtle labels (WCAG AA compliant 7.3:1) |
| `--blue` | `#2563EB` | Primary interactive buttons, active navigation markers, accents |
| `--blue-hover` | `#1D4ED8` | Hover and active pressed states for cobalt elements |
| `--blue-subtle` | `rgba(37, 99, 235, 0.08)` | Active selections and subtle badge tints |
| `--line` | `#E3DFD3` | 1px border dividers and neutral hairlines |
| `--line-subtle` | `rgba(11, 27, 63, 0.08)` | Micro-borders for elevated cards and panels |
| `--yellow` | `#FDF012` | Head and conversation dots in the authentic brand mark |
| `--error` | `#B42318` | Functional form error alerts only (never brand) |

#### Contrast Compliance (WCAG 2.1 AA)
- Primary Navy (`#0B1B3F`) on Paper (`#FAF8F2`): **15.9:1** (AAA)
- Navy-muted (`#47536B`) on Paper (`#FAF8F2`): **7.3:1** (AAA)
- White on Rapport Blue (`#2563EB`): **5.17:1** (AA)
- White on Navy (`#0B1B3F`): **17.8:1** (AAA)
- Rapport Blue (`#2563EB`) on Paper (`#FAF8F2`): **4.87:1** (AA for text and UI)

### Typography

Set in Plus Jakarta Sans variable font (`font-display: swap`) with metric-matched system fallbacks.

| Token | Desktop / Mobile (`clamp`) | Weight | Line Height | Tracking |
|---|---|---|---|---|
| `--fs-display` | 40px to 64px | 800 | 1.08 | -0.03em |
| `--fs-h2` | 30px to 40px | 800 | 1.18 | -0.025em |
| `--fs-h3` | 21px to 24px | 700 | 1.32 | -0.015em |
| `--fs-item` | 18px to 20px | 600 | 1.45 | -0.01em |
| `--fs-lead` | 18px to 21px | 400 | 1.60 | 0 |
| `--fs-body` | 16px to 17px | 400 | 1.65 | 0 |
| `--fs-ui` | 16px | 600 | 1.00 | 0 |
| `--fs-small` | 14px | 500 | 1.55 | 0 |

- Body measure capped at 65ch with `text-wrap: pretty`.
- Headings balanced with `text-wrap: balance`.
- Optical kerning tightened for large punctuation with `<span class="k">`.

### Spacing Scale

- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (`--s-1` to `--s-10`).
- **Section Rhythm:**
  - Standard inner pages (`--section-y`): 72px on mobile, 96px on tablet, 128px on desktop for generous editorial reading cadence.
  - Landing page (`.page-home`): 48px on mobile, 60px on tablet, 72px on desktop for cohesive, continuous flow with immediate visibility of subsequent content.
- **Container Max-Width:** 1200px + padding (24px mobile, 40px tablet, 48px desktop).
- **Grid:** 12-column system with 24px gutters above 768px.

### Elevation & Geometry

- **Border Radius:**
  - Pills (`999px`) for buttons, tags, and segmented tabs
  - Cards (`14px`) for audience pillars, steps, programmes, and form panel
  - Fields (`8px`) for input boxes and textareas
- **Tactile Shadows (Zero AI Glow Halos):**
  - `--shadow-sm`: `0 1px 2px rgba(11, 27, 63, 0.04)` (subtle natural ground shadow)
  - `--shadow-md`: `0 4px 16px -2px rgba(11, 27, 63, 0.06), 0 1px 2px rgba(11, 27, 63, 0.03)`
  - Buttons have zero colored glow halos (`box-shadow: 0 1px 2px rgba(11, 27, 63, 0.08)` for primary, tactile `translateY(1px)` on active press).

### Interactive Components

1. **Header Navigation:**
   - Universal frosted glass background across all four pages with clean 1px hairline border.
   - Active page indicator with clean underline accent and smooth hover transitions.
   - Refined pill button for "Request a programme" (crisp, solid cobalt, no glow).
2. **Buttons:**
   - `.btn--primary`: Rich Rapport Blue (`#2563EB`) with white text, crisp 1px boundary border, and tactile physical feedback.
   - `.btn--secondary`: Porcelain ground with crisp 1.5px border, darkening cleanly on hover.
   - On dark grounds (`.on-navy`): Primary is crisp white with navy text; Secondary is clean translucent white border.
3. **Hero Mark Presentation:**
   - Sits on an architectural white card with a subtle 1px dashed registration guide line (`inset: 12px; border: 1px dashed rgba(11, 27, 63, 0.08)`), honoring the geometry of the mark without artificial radial gradients.
4. **Audience Pillars & Cards:**
   - Clean architectural panels with hairline borders (`1px solid var(--line)`), natural micro-elevation, and refined micro-arrow hover transitions (`→` glides forward 4px).
5. **How We Work Sequence:**
   - 3-stage collaborative process cards with the brand's 3-dot motif (`●○○`, `●●○`, `●●●`) embedded in tactile pill badges.
6. **Curriculum Ledger (`services.html`):**
   - Programme rows formatted as a structured institutional index with tabular numeral prefixes (`01`, `02`, `03`...), subtle dividers, and clean background hover feedback.
7. **Bespoke Request Form (`contact.html`):**
   - Clean 1.5px bordered inputs with razor-sharp 2px navy focus outlines (no fuzzy blue glow halos) and high-contrast deep navy audience selection pills.
5. **Accordion FAQ:**
   - Individual rounded panels with smooth height reveal, subtle open highlight, and smooth 45-degree rotating plus icon.
6. **Form Controls:**
   - Generous 52px touch height, clear error states with non-color icons and messages, and accessible audience radio pills.

### Checked Against Quality Floor

- **No Eyebrows/Kickers:** Headings carry their own weight without decorative kickers.
- **No Harsh Color Sandwiches:** Eliminates alternating high-saturation stripe banners.
- **No Hard Offset Box Shadows:** Replaced with soft, natural depth.
- **No Monospace as Costume:** Professional sans throughout.
- **No Stock Filler or Invented Claims:** Respects client content and truth.
