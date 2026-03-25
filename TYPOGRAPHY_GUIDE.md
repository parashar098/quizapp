# GLA Exam Typography System Guide

## Overview

GLA Exam now uses a **professional SaaS typography system** with:
- **Inter** for body text (400-weight default)
- **Poppins** for headings (600-800 weights)
- **Responsive scales** that adapt to 3 breakpoints
- **Premium letter-spacing** for visual hierarchy

This system matches industry leaders like **Stripe, Vercel, and Notion**.

---

## Font Stack

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');
```

### Font Families
- **Body:** `Inter` (400 weight = default, 500-800 available)
- **Display:** `Poppins` (600-800 weights for headings)
- **Fallbacks:** `ui-sans-serif`, `system-ui`, `sans-serif`

---

## Heading Scale

### Responsive Sizing

| Heading | Mobile | Small (640px) | Desktop (1024px) | Weight | Letter-Spacing |
|---------|--------|---------------|------------------|--------|-----------------|
| **h1** | 2.5rem (40px) | 3rem (48px) | 3.75rem (60px) | 800 | -0.03em |
| **h2** | 2rem (32px) | 2.25rem (36px) | 2.5rem (40px) | 700 | -0.02em |
| **h3** | 1.5rem (24px) | 1.75rem (28px) | 1.75rem (28px) | 700 | -0.01em |
| **h4** | 1.25rem (20px) | 1.25rem (20px) | 1.25rem (20px) | 600 | -0.005em |
| **h5** | 1.125rem (18px) | 1.125rem (18px) | 1.125rem (18px) | 600 | 0em |
| **h6** | 1rem (16px) | 1rem (16px) | 1rem (16px) | 600 (UPPERCASE) | 0.05em |

### Implementation

```jsx
// H1 - Main Page Title
<h1 className="font-display text-5xl font-bold tracking-tight">
  Premium SaaS Design System
</h1>

// H2 - Section Title
<h2 className="font-display text-4xl font-bold">
  Beautiful Typography
</h2>

// H3 - Subsection
<h3 className="font-display text-2xl font-bold">
  Creating Experiences
</h3>

// H4 - Feature Title
<h4 className="font-display text-xl font-semibold">
  Key Features
</h4>

// H5 - Small Heading
<h5 className="font-display text-lg font-semibold">
  Additional Details
</h5>

// H6 - Label/Badge
<h6 className="font-display text-base font-semibold uppercase tracking-wider">
  Important Label
</h6>
```

---

## Body Text

### Font Weights & Usage

```jsx
// Regular - Default body (weight 400)
<p className="font-sans text-base font-normal">
  Regular body text for paragraphs and descriptions.
</p>

// Medium - Emphasis (weight 500)
<p className="font-sans text-base font-medium">
  Medium for emphasis within text or subheadings.
</p>

// Semibold - Strong emphasis (weight 600)
<p className="font-sans text-base font-semibold">
  Semibold for feature names or important inline text.
</p>

// Bold - Strongest emphasis (weight 700)
<p className="font-sans text-base font-bold">
  Bold for critical information or strong emphasis.
</p>
```

### Paragraph Defaults

```scss
p {
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0;
}
```

---

## Text Sizing Scale

### Multi-Level Hierarchy
| Size | Class | Pixels | Usage |
|------|-------|--------|-------|
| xs | `text-xs` | 12px | Captions, small labels |
| sm | `text-sm` | 14px | Secondary text, hints |
| base | `text-base` | 16px | Body text, standard |
| lg | `text-lg` | 18px | Subheadings, emphasis |
| xl | `text-xl` | 20px | Small headings |
| 2xl | `text-2xl` | 24px | Headings |
| 3xl | `text-3xl` | 30px | Large headings |
| 4xl | `text-4xl` | 36px | Very large headings |
| 5xl | `text-5xl` | 48px | Hero headings |
| 6xl | `text-6xl` | 60px | Extra large hero |

---

## Letter-Spacing (Tracking)

Strategic letter-spacing creates premium feel:

```jsx
// Tighter - For headings (premium look)
<h1 className="tracking-tighter">-0.05em</h1>

// Tight - For display text
<h2 className="tracking-tight">-0.025em</h2>

// Normal - Default (body text)
<p className="tracking-normal">0em</p>

// Wide - For labels
<span className="tracking-wide">0.025em</span>

// Wider - For all-caps
<span className="tracking-wider">0.05em</span>

// Widest - For emphasis
<span className="tracking-widest">0.1em</span>
```

---

## Line-Height Reference

```scss
// Headings
h1, h2, h3, h4, h5 {
  line-height: 1.2;
}

// Body paragraphs (improved readability)
p {
  line-height: 1.75;
}

// Loose - For captions
.caption {
  line-height: 1.6;
}
```

---

## Component Examples

### Button
```jsx
<button className="font-sans text-sm font-medium px-6 py-3 rounded-lg">
  Get Started
</button>
```
- Font: Inter
- Size: 14px (0.875rem)
- Weight: 600 (semibold)

### Card Title
```jsx
<div className="rounded-xl border bg-white p-6">
  <h3 className="font-display text-xl font-bold mb-2">Card Title</h3>
  <p className="font-sans text-sm text-gray-600">Description text...</p>
</div>
```

### Label/Badge
```jsx
<span className="text-xs font-semibold uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
  Premium
</span>
```
- Font: Inter
- Size: 12px (0.75rem)
- Weight: 600
- Tracking: 0.05em (wide)

### Hero Section
```jsx
<div>
  <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
    Your SaaS Solution
  </h1>
  <p className="font-sans text-lg leading-relaxed text-gray-600 max-w-2xl">
    Build and deploy faster with our powerful platform...
  </p>
  <button className="mt-8 font-sans text-base font-medium px-8 py-4 rounded-lg">
    Start Free
  </button>
</div>
```

---

## Tailwind Configuration

### In `tailwind.config.js`:

```typescript
fontFamily: {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
  ],
  display: [
    'Poppins',
    'Inter',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
  ],
  serif: [
    'ui-serif',
    'Georgia',
    'serif',
  ],
},
```

### Using Font Classes

```jsx
// Apply body font (Inter)
<p className="font-sans">Body text with Inter</p>

// Apply display/heading font (Poppins)
<h1 className="font-display">Heading with Poppins</h1>

// Force serif fallback
<blockquote className="font-serif italic">
  Quoted text...
</blockquote>
```

---

## CSS Custom Properties

No additional CSS variables needed. Typography is controlled through:
1. **HTML semantic tags** (h1-h6, p, span, etc.)
2. **Tailwind classes** (`font-display`, `font-sans`, `text-*`, `font-*`, `tracking-*`)
3. **Direct CSS** in `src/index.css`

---

## Best Practices

### ✅ Do's
- **Use semantic HTML** - `<h1>`, `<h2>`, `<p>`, not `<div>`
- **Maintain hierarchy** - One h1 per page maximum
- **Respect line-height** - 1.75 for body (readability), 1.2 for headings
- **Tighten headings** - Use negative letter-spacing (-0.03em) for premium look
- **Use font weights intentionally** - 400 (regular), 600 (emphasis), 700-800 (headings)

### ❌ Don'ts
- **Don't mix fonts** - Stick to Inter + Poppins
- **Don't use excessive weights** - Stick to 300-400 (body) and 600-800 (headings)
- **Don't ignore responsive** - Use different sizes for mobile/desktop
- **Don't break hierarchy** - Larger ≠ more important without considering context

---

## Real-World Component: TypographyShowcase

A complete example component is available in `src/components/TypographySystem.tsx`:

```jsx
import { TypographySystem } from '@/components/TypographySystem';

export default function ShowcasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <TypographySystem />
    </div>
  );
}
```

This demonstrates:
- All heading levels (h1-h6)
- Body text variations
- Button text styling
- Labels and captions
- List examples
- Hero sections
- Card components

---

## Performance Notes

### Font Metrics
- **CSS file size:** 65.14 kB (gzip: 10.51 kB)
- **Total JS bundle:** 546.69 kB (gzip: 174.14 kB)
- **Font weights imported:** Inter (300-800), Poppins (400-800)
- **Google Fonts delivery:** Optimized with `display=swap`

### Optimization Tips
1. **Load only needed weights** - Consider reducing to 400,600,700 if file size critical
2. **Use font-display: swap** - Already enabled (allows page render while fonts load)
3. **Lazy load heavy pages** - Use `@font-face` rules for secondary fonts

---

## Troubleshooting

### Fonts not showing
1. Clear browser cache
2. Verify Google Fonts import in `src/index.css`
3. Check Tailwind `fontFamily` config in `tailwind.config.js`
4. Run `npm run dev` with hard refresh (Ctrl+Shift+R)

### Text looks too bold/light
- Double-check font-weight class (should be `font-bold` for headings, `font-normal` for body)
- Verify the font file actually loaded (DevTools > Network > Fonts)

### Responsive sizes not working
- Check `@media` queries in `src/index.css`
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Ensure parent has `max-width` for proper media query testing

---

## Font Resources

- **Inter Font:** https://rsms.me/inter/
- **Poppins Font:** https://fonts.google.com/specimen/Poppins
- **Google Fonts:** https://fonts.google.com/
- **Tailwind Typography:** https://tailwindcss.com/docs/font-family

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-03-14 | Migrated from Manrope/Space Grotesk to Inter/Poppins |
| 0.1 | Earlier | Initial Manrope/Space Grotesk typography system |

---

**Note:** This typography system is designed for the GLA Exam SaaS platform. All components follow these guidelines to ensure consistent, professional appearance across the entire application.
