# EcoSnap Design System

> Living reference for the EcoSnap landing page and application UI.  
> **Stack:** React · Tailwind CSS v4 · Lucide Icons

---

## 1. Brand Palette

Defined in [`src/index.css`](file:///Users/adriane/Development/TheEcoSnap/ecosnap/src/index.css) via Tailwind v4 `@theme` tokens.

| Token                  | Hex       | Tailwind Utility        | Usage                                  |
| ---------------------- | --------- | ----------------------- | -------------------------------------- |
| `--color-brand-primary`   | `#10b981` | `text-brand-primary`    | Core green — CTAs, accents, icons      |
| `--color-brand-secondary` | `#065f46` | `text-brand-secondary`  | Deep green — headings, emphasis text   |
| `--color-brand-accent`    | `#14b8a6` | `text-brand-accent`     | Teal — complementary highlights        |
| `--color-brand-warm`      | `#f59e0b` | `text-brand-warm`       | Amber — urgency badges, warning states |
| `--color-brand-surface`   | `#f8fafc` | `bg-brand-surface`      | Light background surfaces              |

### Semantic Colors

| Token                | Hex       | Tailwind Utility    | Usage                                    |
| -------------------- | --------- | ------------------- | ---------------------------------------- |
| `--color-success`       | `#10b981` | `text-success`      | Confirmations, completed states          |
| `--color-success-light` | `#d1fae5` | `bg-success-light`  | Success background fills                 |
| `--color-warning`       | `#f59e0b` | `text-warning`      | Approaching expiry, caution states       |
| `--color-warning-light` | `#fef3c7` | `bg-warning-light`  | Warning background fills                 |
| `--color-danger`        | `#ef4444` | `text-danger`       | Expired items, destructive actions       |
| `--color-danger-light`  | `#fee2e2` | `bg-danger-light`   | Danger background fills                  |
| `--color-info`          | `#3b82f6` | `text-info`         | Tips, informational notices              |
| `--color-info-light`    | `#dbeafe` | `bg-info-light`     | Info background fills                    |

### Text & Surface Tokens

| Token                | Hex       | Tailwind Utility    | Usage                                    |
| -------------------- | --------- | ------------------- | ---------------------------------------- |
| `--color-text-heading`  | `#111827` | `text-text-heading` | Headings, strong labels                  |
| `--color-text-body`     | `#6b7280` | `text-text-body`    | Body text, descriptions                  |
| `--color-text-muted`    | `#9ca3af` | `text-text-muted`   | Captions, placeholders                   |
| `--color-border`        | `#f3f4f6` | `border-border`     | Card dividers, section borders           |
| `--color-surface-alt`   | `#f9fafb` | `bg-surface-alt`    | Alternating section backgrounds          |

### Extended Palette (via Tailwind defaults)

These standard Tailwind colors are used consistently throughout:

| Role            | Color            | Usage                                       |
| --------------- | ---------------- | ------------------------------------------- |
| Heading text    | `gray-900`       | All section headings, card titles           |
| Body text       | `gray-500`       | Paragraph text, descriptions                |
| Muted text      | `gray-400`       | Labels, captions, footer links              |
| Icon tint       | `emerald-500`    | All Lucide icons in icon containers         |
| Icon background | `emerald-50`     | Icon container fill, badge backgrounds      |
| Hover icon bg   | `emerald-100`    | Icon containers on group-hover              |
| CTA hover       | `emerald-600`    | Button hover states, link hover states      |
| Danger spectrum | `amber → orange → red` | Problem section waste cards (50 tints) |

---

## 2. Typography

**Font stack:** System defaults (Tailwind's built-in sans-serif stack).

| Element              | Classes                                                             | Example                   |
| -------------------- | ------------------------------------------------------------------- | ------------------------- |
| Page heading (h1)    | `text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-[1.1]` | Hero title       |
| Section heading (h2) | `text-3xl md:text-[42px] font-bold tracking-tight leading-tight`    | Section titles            |
| Card heading (h3)    | `text-lg font-bold` or `text-xl font-bold tracking-tight`          | Feature / step titles     |
| Section label        | `text-xs font-semibold uppercase tracking-[1.5px] text-emerald-600` | "PRICING", "FEATURES"    |
| Body text            | `text-base md:text-lg leading-relaxed text-gray-500`               | Descriptions              |
| Small text           | `text-sm leading-relaxed text-gray-500`                            | Card descriptions         |
| Caption / label      | `text-xs text-gray-400`                                            | Stat labels, footer copy  |
| Price display        | `text-4xl font-extrabold tracking-tight`                           | Pricing cards             |

---

## 3. Card System

All cards share a **gradient border** pattern for visual consistency.

### 3.1 Gradient Border Card (Default)

The signature card style — a 1px gradient border wrapper with a white inner container.

```
Outer:  p-[1px] rounded-2xl bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200
Inner:  rounded-[15px] bg-white h-full
```

**Used in:** FeatureCard, HowItWorks steps, PricingCard (free tier), Hero stats, Problem waste cards.

**Hover behavior:** `hover:-translate-y-1.5 transition-all duration-300`

### 3.2 Featured Card (Filled Gradient)

Premium highlighted card with a solid gradient background.

```
bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-500
text-white shadow-xl shadow-emerald-500/25
```

**Used in:** PricingCard (featured tier).

**Hover behavior:** `hover:-translate-y-1.5 hover:shadow-2xl`

### 3.3 Card Variants by Section

| Section     | Component                 | Border Radius | Padding | Notes                                  |
| ----------- | ------------------------- | ------------- | ------- | -------------------------------------- |
| Features    | `FeatureCard`             | `2xl` / `[15px]` | `p-8`   | Centered text, icon container on top   |
| How It Works| Inline card               | `2xl` / `[15px]` | `p-10`  | Centered, icon + step number badge     |
| Pricing     | `PricingCard` (default)   | `2xl` / `[15px]` | `p-9`   | Left-aligned, feature checklist        |
| Pricing     | `PricingCard` (featured)  | `2xl`         | `p-9`   | No border wrapper, solid gradient fill |
| Hero Stats  | Inline card               | `2xl` / `[15px]` | `p-6`   | Centered, value + label                |
| Problem     | Inline card               | `xl` / `[11px]`  | `p-5`   | Horizontal layout, icon + text         |

---

## 4. Buttons

### 4.1 Primary CTA

```
inline-flex items-center gap-2 px-7 py-3.5 rounded-full
bg-emerald-500 text-white text-base font-semibold
shadow-lg shadow-emerald-500/20
hover:bg-emerald-600 hover:-translate-y-0.5
transition-all duration-300
```

### 4.2 Secondary / Ghost

```
inline-flex items-center px-7 py-3.5 rounded-full
border border-gray-200 text-gray-600 text-base font-semibold
hover:border-emerald-200 hover:text-emerald-600
transition-all duration-300
```

### 4.3 Inverted CTA (on emerald backgrounds)

```
inline-flex items-center gap-2 px-8 py-4 rounded-full
bg-white text-emerald-600 text-base font-bold
shadow-lg hover:-translate-y-0.5 hover:shadow-xl
transition-all duration-300
```

### 4.4 Navbar CTA (compact)

```
inline-flex items-center px-5 py-2.5 rounded-full
bg-emerald-500 text-white text-sm font-semibold
shadow-md shadow-emerald-500/20
hover:bg-emerald-600 hover:-translate-y-0.5
transition-all duration-300
```

> **Rule:** All buttons use `rounded-full`. No square or rounded-lg buttons.

---

## 5. Icon Containers

All icons use [Lucide React](https://lucide.dev/) — no emojis.

### Standard Icon Box

```
w-14 h-14 rounded-2xl bg-emerald-50
flex items-center justify-center
```

Icon: `size={26} className="text-emerald-500"`

### Step Number Badge

```
inline-flex items-center justify-center
w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold
```

### Checklist Icon (Pricing)

```
shrink-0 w-5 h-5 rounded-full
flex items-center justify-center mt-0.5
bg-emerald-50 text-emerald-500       (default)
bg-white/20 text-white               (featured)
```

---

## 6. Layout & Spacing

| Property        | Value                                                    |
| --------------- | -------------------------------------------------------- |
| Max-width       | `max-w-6xl` (1152px) for all sections                   |
| Section padding | `px-5 md:px-12 py-24 md:py-32`                          |
| Card grid gap   | `gap-6` to `gap-8`                                      |
| Section header  | `text-center mb-16`                                      |
| Centering       | `mx-auto` on all containers                             |

### Responsive Grid Patterns

| Section       | Mobile       | Desktop                                        |
| ------------- | ------------ | ---------------------------------------------- |
| Hero          | `grid-cols-1`| `md:grid-cols-2` with `gap-12 items-center`    |
| Problem       | `grid-cols-1`| `md:grid-cols-2` with `gap-12 md:gap-16`       |
| Features      | `grid-cols-1`| `sm:grid-cols-2 lg:grid-cols-4` with `gap-6`   |
| How It Works  | `grid-cols-1`| `md:grid-cols-3` with `gap-8`                  |
| Pricing       | `grid-cols-1`| `md:grid-cols-2` with `gap-8 max-w-[840px]`    |
| CTA           | `grid-cols-1`| `md:grid-cols-2` with `gap-12 items-center`    |
| Stats bar     | `grid-cols-1`| `sm:grid-cols-3` with `gap-6 max-w-4xl`        |

---

## 7. Animations & Transitions

### Scroll-Reveal (useReveal hook)

All sections use the [`useReveal`](file:///Users/adriane/Development/TheEcoSnap/ecosnap/src/landing/components/useReveal.ts) hook with IntersectionObserver.

```
transition-all duration-700
Visible:   opacity-100 translate-y-0
Hidden:    opacity-0 translate-y-7
```

### Hero Stagger

Hero elements use cascading `delay-*` classes (`delay-0` through `delay-700`) for a staggered entrance.

### Hover Micro-Interactions

| Element     | Effect                                                |
| ----------- | ----------------------------------------------------- |
| Cards       | `hover:-translate-y-1.5 transition-all duration-300`  |
| Buttons     | `hover:-translate-y-0.5 transition-all duration-300`  |
| Nav links   | `hover:text-emerald-600 transition-colors`            |
| Icon boxes  | `group-hover:bg-emerald-100 transition-colors`        |

### Global Timing

- **Cards & large elements:** `duration-300`
- **Scroll reveals:** `duration-700`
- **Color-only transitions:** `transition-colors` (default 150ms)

---

## 8. Section Backgrounds

| Section      | Background                                                 |
| ------------ | ---------------------------------------------------------- |
| Hero         | `bg-gradient-to-b from-emerald-50/50 to-white`            |
| Problem      | `bg-gray-50`                                               |
| How It Works | White (default)                                            |
| Features     | `bg-gray-50`                                               |
| Pricing      | White (default)                                            |
| CTA          | `bg-emerald-500` with decorative blur circles              |
| Footer       | `bg-gray-50 border-t border-gray-100`                     |

**Pattern:** Alternating white ↔ `gray-50` to create visual separation without hard dividers.

---

## 9. Navbar

```
fixed top-0 left-0 right-0 z-50
px-5 md:px-12 py-4
bg-white/80 backdrop-blur-xl border-b border-gray-100
```

- **Logo:** Emerald square icon (`w-9 h-9 rounded-xl bg-emerald-500`) + bold text
- **Nav links:** `text-sm font-medium text-gray-500 hover:text-emerald-600`
- **CTA button:** Compact primary style (see §4.4)
- **Mobile:** Nav links hidden (`hidden md:flex`), CTA always visible

---

## 10. Badges & Tags

### Section Label (Pill)

```
text-xs font-semibold uppercase tracking-[1.5px] text-emerald-600 mb-5
```

### Hero Status Pill

```
inline-flex items-center gap-2 px-4 py-1.5 rounded-full
bg-emerald-50 border border-emerald-100
text-sm font-medium text-emerald-600
```

With pulsing dot: `w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`

### Feature Badge ("Premium")

```
inline-block mt-4 px-3 py-1 rounded-full
bg-emerald-50 text-emerald-600 text-xs font-semibold uppercase tracking-wider
```

### Pricing "Recommended" Badge

```
absolute -top-3 left-9 px-3.5 py-1 rounded-full
bg-white text-emerald-600 text-xs font-bold
shadow-md shadow-emerald-500/10
```

---

## 11. Component Inventory

| Component       | Path                                          | Description                              |
| --------------- | --------------------------------------------- | ---------------------------------------- |
| `Navbar`        | `src/landing/components/Navbar.tsx`            | Fixed top nav with logo, links, CTA      |
| `Footer`        | `src/landing/components/Footer.tsx`            | Simple footer with logo, links, ©        |
| `FeatureCard`   | `src/landing/components/FeatureCard.tsx`       | Icon + title + description + badge       |
| `PricingCard`   | `src/landing/components/PricingCard.tsx`       | Pricing tier with features checklist     |
| `useReveal`     | `src/landing/components/useReveal.ts`          | IntersectionObserver scroll-reveal hook  |
| `HeroSection`   | `src/landing/sections/HeroSection.tsx`         | Hero with staggered entrance + stats     |
| `ProblemSection`| `src/landing/sections/ProblemSection.tsx`      | Problem statement + waste cards          |
| `FeaturesSection`| `src/landing/sections/FeaturesSection.tsx`    | 4-column feature grid                   |
| `HowItWorksSection`| `src/landing/sections/HowItWorksSection.tsx`| 3-step process cards                    |
| `PricingSection`| `src/landing/sections/PricingSection.tsx`      | Free + Sachet pricing cards              |
| `CTASection`    | `src/landing/sections/CTASection.tsx`          | Final call-to-action with image          |

---

## 12. Design Principles

1. **Gradient borders over flat borders** — All cards use the `from-emerald-200 via-gray-100 to-teal-200` gradient border pattern instead of generic `border-gray-100`.
2. **Emerald-first** — The primary brand color is emerald; teal is used only as a gradient complement.
3. **Icons, never emojis** — All iconography uses Lucide React.
4. **Rounded-full buttons** — Every button is pill-shaped. No exceptions.
5. **Subtle lifts on hover** — Cards lift 1.5 units, buttons lift 0.5 units.
6. **Alternating backgrounds** — Sections alternate between white and `gray-50` for visual rhythm.
7. **Consistent max-width** — All content sits within `max-w-6xl` (1152px).
