# Typography Quick Reference

## Font Stack at a Glance

```
Body Text    → Inter (400 weight default)
Headings     → Poppins (600-800 weights)
Fallback     → system-ui, sans-serif
```

---

## Copy & Paste Components

### Hero Headline
```jsx
<h1 className="font-display text-5xl font-bold tracking-tight">
  Your Headline Here
</h1>
```

### Section Title
```jsx
<h2 className="font-display text-3xl font-bold mb-6">
  Section Heading
</h2>
```

### Body Paragraph
```jsx
<p className="font-sans text-base leading-relaxed text-gray-700">
  Your paragraph text goes here with comfortable line-height for readability.
</p>
```

### Small Label/Badge
```jsx
<span className="text-xs font-semibold uppercase tracking-widest">
  PREMIUM
</span>
```

### Button Text
```jsx
<button className="font-sans text-sm font-medium px-6 py-3">
  Call to Action
</button>
```

### Feature List
```jsx
<ul className="space-y-3">
  <li className="flex items-start gap-3">
    <span className="text-lg font-bold text-indigo-600">✓</span>
    <span className="font-sans text-base">
      <strong className="font-semibold">Feature:</strong> Description
    </span>
  </li>
</ul>
```

---

## Tailwind Classes Cheat Sheet

### Font Family
| Class | Font | Weight Range |
|-------|------|--------------|
| `font-sans` | Inter | 300-800 |
| `font-display` | Poppins | 400-800 |
| `font-serif` | Georgia | default |

### Font Weight
| Class | Value |
|-------|-------|
| `font-light` | 300 |
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |
| `font-extrabold` | 800 |

### Font Size
| Class | Size | Use When |
|-------|------|----------|
| `text-xs` | 12px | Tiny labels |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Callouts |
| `text-xl` | 20px | Small headings |
| `text-2xl` | 24px | H4 size |
| `text-3xl` | 30px | H3 size |
| `text-4xl` | 36px | H2 size |
| `text-5xl` | 48px | H1 size |

### Letter Spacing
| Class | Value | Use When |
|-------|-------|----------|
| `tracking-tighter` | -0.05em | Tight headings |
| `tracking-tight` | -0.025em | Display text |
| `tracking-normal` | 0em | Default |
| `tracking-wide` | 0.025em | Labels |
| `tracking-wider` | 0.05em | All-caps |
| `tracking-widest` | 0.1em | Emphasis |

### Line Height
| Class | Value |
|-------|-------|
| `leading-tight` | 1.25 |
| `leading-snug` | 1.375 |
| `leading-normal` | 1.5 |
| `leading-relaxed` | 1.625 |
| `leading-loose` | 2 |

---

## Real Examples

### Hero Section
```jsx
<div className="max-w-4xl mx-auto text-center py-20">
  <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
    Build Better Quizzes
  </h1>
  <p className="font-sans text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
    Create engaging, interactive quizzes in minutes with our powerful platform.
  </p>
  <button className="font-sans text-base font-medium px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
    Get Started Free
  </button>
</div>
```

### Card with Feature
```jsx
<div className="rounded-xl border border-gray-200 bg-white p-6">
  <h3 className="font-display text-xl font-bold mb-2">
    Real-time Analytics
  </h3>
  <p className="font-sans text-sm text-gray-600 leading-relaxed">
    Track student performance with detailed analytics and custom reports.
  </p>
</div>
```

### Navigation Item
```jsx
<a href="#" className="font-sans font-medium text-gray-700 hover:text-indigo-600 transition-colors">
  Features
</a>
```

### Form Label
```jsx
<label className="font-sans text-sm font-semibold text-gray-700">
  Your Name
</label>
<input type="text" className="font-sans text-base" />
```

---

## Mobile Responsiveness Sizes

```jsx
// Responsive heading that gets bigger on larger screens
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
  Responsive Title
</h1>

// Responsive paragraph text
<p className="text-sm sm:text-base md:text-lg leading-relaxed">
  Text adapts to screen size
</p>

// Responsive padding
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  Content with responsive horizontal padding
</div>
```

---

## Common Mistakes ⚠️

### ❌ WRONG
```jsx
<h1 className="text-5xl">Don't use text-5xl without font-bold on headings</h1>
<p className="font-display">Don't use font-display (Poppins) on body paragraphs</p>
<div className="text-3xl">Don't use divs for headings - use semantic h1-h6</div>
```

### ✅ RIGHT
```jsx
<h1 className="font-display text-5xl font-bold">Proper semantic heading</h1>
<p className="font-sans text-base">Body text uses font-sans (Inter)</p>
<h3 className="font-display text-2xl font-bold">Use semantic heading tags</h3>
```

---

## Import & Installation

No additional imports needed! The fonts are already:
- ✅ Imported in `src/index.css`
- ✅ Configured in `tailwind.config.js`
- ✅ Available globally in the app

Just use the classes in your JSX components.

---

## File References

- **Complete Guide:** [TYPOGRAPHY_GUIDE.md](TYPOGRAPHY_GUIDE.md)
- **Design System:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **Example Component:** [src/components/TypographySystem.tsx](src/components/TypographySystem.tsx)
- **CSS Configuration:** [src/index.css](src/index.css) (lines 1-40)
- **Tailwind Config:** [tailwind.config.js](tailwind.config.js) (fontFamily section)

---

## Questions?

Refer to the complete [TYPOGRAPHY_GUIDE.md](TYPOGRAPHY_GUIDE.md) for:
- Detailed breakdowns of every heading level
- Line-height and letter-spacing rationale
- Accessibility considerations
- Performance optimization
- Troubleshooting guide
