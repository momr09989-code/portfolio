---
name: apple-design-system
description: >-
  Enforces Apple Human Interface Guidelines (HIG) and premium web design aesthetics
  for all UI, UX, styling, component design, animation, and layout tasks. Use this
  skill whenever designing, refining, reviewing, or modifying user interfaces, CSS,
  typography, color palettes, micro-interactions, and responsive layouts.
---

# Apple Design System & Human Interface Guidelines (HIG)

This skill dictates design, layout, visual hierarchy, typography, color harmony, and micro-interaction standards based on Apple's Human Interface Guidelines (HIG) and modern Apple Web Design Principles (as seen across apple.com, macOS, iOS, and visionOS).

When modifying or creating any web interface, adhere strictly to the rules, aesthetic philosophy, and implementation patterns detailed below.

---

## 1. Core Design Philosophy

Apple interface design is guided by three primary tenets:

1. **Clarity**: Text is legible at every size, iconography is crisp and meaningful, adornments are purposeful, and visual focus remains squarely on the user's content.
2. **Deference**: The interface recedes gracefully into the background. Fluid motion, subtle framing, and generous white space guide understanding without competing for attention.
3. **Depth**: Visual layers, authentic glassmorphic translucency (`backdrop-filter`), soft directional light, and realistic physics establish an intuitive hierarchy.

---

## 2. Visual Style & Surface Architecture

### 2.1 Surfaces, Backgrounds & Vibrancy
- **OLED / True Black Foundation**:
  - Dark mode surfaces should use deep neutral tones: `#000000` (deepest base), `#0a0a0c`, `#111113` (grouped background), `#1c1c1e` (elevated cards), and `#2c2c2e` (secondary elevated).
  - Light mode surfaces: `#ffffff` (card base), `#f5f5f7` (canvas/page background), `#e5e5ea` (subtle dividers).
- **Materials & Frosted Glass (Blur & Translucency)**:
  - Use optical blur for floating navbars, sticky headers, modals, and tooltips:
    ```css
    background: rgba(18, 18, 20, 0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    ```
  - Light mode counterpart:
    ```css
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(0, 0, 0, 0.06);
    ```
- **Precision Borders**:
  - Never use thick, muddy, or harsh borders. Borders must be ultra-fine (`1px solid`), semi-transparent hairline borders (`rgba(255, 255, 255, 0.07)` to `rgba(255, 255, 255, 0.12)` in dark mode).

### 2.2 Corner Radii (Apple Squircles)
- Apple interfaces favor smooth, organic squircle curves (`smooth-corners` or standard generous radii):
  - **Outer Cards & Containers**: `18px` to `24px`
  - **Buttons & Pills**: `9999px` (capsules) or `10px`–`14px` (squircle buttons)
  - **Badges & Tags**: `6px`–`8px`
  - **Nested Radius Rule**: The inner element's radius should follow:
    $$\text{Radius}_{\text{inner}} = \text{Radius}_{\text{outer}} - \text{Padding}$$
    *(Prevents awkward gaps between nested rounded borders).*

### 2.3 Shadow & Elevation System
- Avoid heavy, single-stop muddy black drop-shadows. Use multi-layered ambient + directional key light shadows:
  ```css
  /* Elevated Card Shadow */
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 12px 28px rgba(0, 0, 0, 0.14),
    0 0 0 1px rgba(255, 255, 255, 0.06);

  /* Hover Lift Elevation */
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(16, 185, 129, 0.25);
  ```

---

## 3. Typography & Hierarchy

### 3.1 Font Stacks
Always prefer Apple System Typeface with elegant fallbacks:
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Manrope", sans-serif;
```
For monospace (code snippets, terminal tags, kickers):
```css
font-family: "SF Mono", "DM Mono", Menlo, Consolas, Monaco, monospace;
```

### 3.2 Typographic Scale & Tracking (Letter Spacing)
Apple typography strictly tightens tracking as font sizes grow:
- **Hero / Large Display Title** (`48px`–`80px`): `font-weight: 700`–`800`, `line-height: 1.05`, `letter-spacing: -0.045em` to `-0.03em`.
- **Section Heading (H2)** (`28px`–`42px`): `font-weight: 700`, `line-height: 1.15`, `letter-spacing: -0.035em`.
- **Card Title (H3/H4)** (`18px`–`24px`): `font-weight: 600`, `line-height: 1.3`, `letter-spacing: -0.02em`.
- **Body Text**: `font-size: 15px`–`16px`, `line-height: 1.6`, `letter-spacing: -0.01em`, color: high-legibility muted (`#a1a1a6` in dark mode, `#515154` in light mode).
- **Category Kickers & Micro Badges**: `font-size: 10px`–`12px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`–`0.12em`.

### 3.3 Text Gradients & Editorial Accents
- Restrict shimmering or gradient fills to emphasis words (e.g. key nouns or names).
- Never make continuous body paragraphs gradient-colored.
- Ensure gradient contrast passes WCAG AA in both themes.

---

## 4. Spacing, Layout & Rhythm

### 4.1 The 8-Point Spatial Grid
All margins, paddings, and component gaps must be multiples of **4px / 8px**:
- **4px / 8px**: Micro spacing (inline icon gaps, badge internal padding).
- **12px / 16px / 20px**: Standard component inner padding, gap between card items.
- **24px / 32px**: Section inner padding, card grid gaps.
- **48px / 64px**: Major section vertical rhythm on desktop.

### 4.2 Vertical Balance (Anti-Bloat Directive)
- Avoid arbitrary massive blank gaps between sections.
- Sections should feel unified and connected: standard section spacing should stay between `24px` and `48px` on mobile/compact screens, and `36px` to `64px` on desktop.
- Never use `min-height: 100vh` on interior sections where content takes less space, which causes massive empty dead zones.

---

## 5. Components & Interactive Controls

### 5.1 Buttons & Touch Targets
- Minimum touch target: **44px × 44px** on all interactive elements (buttons, nav icons, toggles).
- **Primary Buttons**:
  - Pill or soft squircle radius.
  - High-contrast background (brand accent or crisp solid tint).
  - Tactile press state:
    ```css
    .apple-btn:active {
      transform: scale(0.975);
      transition: transform 0.1s ease;
    }
    ```
- **Secondary / Ghost Buttons**:
  - Translucent fill (`rgba(255, 255, 255, 0.06)`), hairline border (`rgba(255, 255, 255, 0.1)`), light hover highlight (`rgba(255, 255, 255, 0.12)`).

### 5.2 Cards & Interactive Tiles
- Card layouts must maintain visual consistency across all sections (Projects, Skills, Certificates, Education).
- Hover feedback should be fluid, purposeful, and immediate:
  - Subtle upward translation (`translateY(-4px)` to `translateY(-6px)`).
  - Border tint intensification (from `0.08` to `0.35` opacity of the brand accent).
  - High-performance GPU rendering: `transform-style: preserve-3d; will-change: transform;`.

---

## 6. Motion, Physics & Transitions

### 6.1 Timing Functions (Apple Easing Curves)
Apple transitions prioritize fluid deceleration and natural inertia over linear or abrupt steps:
- **Standard Apple Ease**:
  ```css
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1); /* Apple Smooth Spring Ease */
  ```
- **Entrance / Reveal Ease**:
  ```css
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* Fast out, slow settle */
  ```
- **Exit / Dismissal Ease**:
  ```css
  transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15); /* Snappy acceleration out */
  ```

### 6.2 Micro-Interactions
- Durations:
  - Micro states (hover, focus, active): `0.18s`–`0.28s`.
  - Content morphs / modal dialogs: `0.35s`–`0.5s`.
  - Full-screen sheet reveals: `0.55s`–`0.7s`.
- Zero-Lag Mouse Tracking: When driving hover tilt or spotlight positions via JavaScript, never apply a CSS `transition: transform` during active mouse move, as it creates noticeable lag. Apply transitions only on `mouseleave` to animate back to rest.

---

## 7. Execution Checklist for Any UI/UX Modification

Before proposing or applying any UI/UX changes, evaluate against this checklist:

1. [ ] **Clarity**: Is text effortlessly readable? Is the typography hierarchy immediately recognizable?
2. [ ] **Simplicity**: Did we eliminate visual noise, unnecessary borders, or clashing colors?
3. [ ] **Authenticity**: Are blur values (`backdrop-filter`), hairline borders, and shadow depths layered realistically?
4. [ ] **Responsiveness**: Does the layout scale gracefully from 320px mobile screens to 4K displays without horizontal scroll overflow (`overflow-x: clip`)?
5. [ ] **Tactility**: Do interactive controls feel responsive and tactile with appropriate `:active` and `:hover` states?
6. [ ] **Performance**: Are animations GPU-accelerated (`transform`, `opacity`) without blocking mouse events (`pointer-events: none` on ambient overlays)?
7. [ ] **Consistency**: Does the change harmonize with the rest of the portfolio's theme and accent palette?
