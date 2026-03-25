# GLA Exam Premium SaaS Design System

A comprehensive design system for a modern, premium SaaS quiz platform styled after Stripe, Vercel, and Notion.

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Components](#components)
6. [Hover Effects](#hover-effects)
7. [Animations](#animations)
8. [Images & Assets](#images--assets)
9. [Dark Mode](#dark-mode)
10. [Performance](#performance)

---

## 🎨 Design Principles

### 1. **Premium & Clean**
- Minimal visual clutter
- Generous whitespace
- High contrast for readability

### 2. **Modern SaaS Aesthetic**
- Glassmorphism (backdrop blur + transparency)
- Gradient accents (Indigo → Purple → Pink)
- Soft shadows and rounded corners

### 3. **Accessible & Responsive**
- WCAG AA standard contrast ratios
- Mobile-first design
- Keyboard navigation support

### 4. **Performance-First**
- Optimized images (WebP, lazy loading)
- Minimal animations (50-300ms)
- CSS custom properties for theming

---

## 🎭 Color System

### Brand Colors
```css
--brand-500: #4F46E5 (Indigo)
--brand-600: #4338CA
--brand-700: #3730A3

--accent-purple: #A855F7
--accent-pink: #EC4899
--accent-orange: #FB923C
```

### Semantic Colors
```css
/* Light Mode */
--bg: #FFFFFF
--fg: #0F172A
--muted: #64748B
--border: #E2E8F0
--card: #F9FAFB

/* Dark Mode */
dark --bg: #0F172A
dark --fg: #F1F5F9
dark --muted: #94A3B8
dark --border: #1E293B
dark --card: #1A1F35
```

### Usage
```html
<!-- Using CSS variables -->
<div class="bg-[var(--card)] text-[var(--fg)]">Content</div>

<!-- Direct Tailwind -->
<div class="bg-indigo-600 text-slate-900 dark:text-slate-100">Content</div>
```

---

## 📝 Typography

### Font Family
```css
font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
```

### Type Scale
| Size | Class | Usage |
|------|-------|-------|
| 12px | `text-xs` | Small labels, captions |
| 14px | `text-sm` | Body text, form labels |
| 16px | `text-base` | Default body text |
| 18px | `text-lg` | Section subheadings |
| 20px | `text-xl` | Page subheadings |
| 24px | `text-2xl` | Section headings |
| 30px | `text-3xl` | Page headings |
| 36px | `text-4xl` | Hero headlines |

### Font Weights
```css
font-weight: 400; /* Regular text */
font-weight: 500; /* Medium emphasis */
font-weight: 600; /* Semibold headings */
font-weight: 700; /* Bold headings */
font-weight: 900; /* Brand logo/highlight */
```

### Examples
```jsx
// Heading 1 (Hero)
<h1 className="text-4xl md:text-5xl font-bold">Headline</h1>

// Heading 2 (Section)
<h2 className="text-3xl font-bold">Section Title</h2>

// Body Text
<p className="text-base leading-7 text-text-primary">Content</p>

// Small Label
<span className="text-xs font-semibold uppercase tracking-wider text-muted">Label</span>
```

---

## 📐 Layout & Spacing

### Spacing Scale (Tailwind Default)
```
0.5rem (8px)   → p-2
1rem (16px)    → p-4
1.5rem (24px)  → p-6
2rem (32px)    → p-8
3rem (48px)    → p-12
4rem (64px)    → p-16
```

### Container Widths
```css
.saas-shell {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### Grid System
```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards automatically stack on mobile */}
</div>
```

### Border Radius
```css
### Font System

GLA Exam uses a **Professional SaaS Typography System** with:
- **Inter** for body text (400-800 weights)
- **Poppins** for headings/display (600-800 weights)
- Comparable to Stripe, Vercel, and Notion

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

/* Font Family Configuration */
body {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

### Heading Scale (Responsive)

| Heading | Mobile | Small (640px) | Desktop (1024px) | Weight | Letter-Spacing |
|---------|--------|---------------|------------------|--------|-----------------|
| **h1** | 2.5rem | 3rem | 3.75rem | 800 | -0.03em |
| **h2** | 2rem | 2.25rem | 2.5rem | 700 | -0.02em |
| **h3** | 1.5rem | 1.75rem | 1.75rem | 700 | -0.01em |
| **h4** | 1.25rem | 1.25rem | 1.25rem | 600 | -0.005em |
| **h5** | 1.125rem | 1.125rem | 1.125rem | 600 | 0em |
| **h6** | 1rem | 1rem | 1rem | 600 (UPPERCASE) | 0.05em |

### Body Text Sizes

| Size | Class | Pixels | Usage |
|------|-------|--------|-------|
| xs | `text-xs` | 12px | Captions, small labels |
| sm | `text-sm` | 14px | Secondary text, hints |
| base | `text-base` | 16px | Body text, standard |
| lg | `text-lg` | 18px | Subheadings, emphasis |
| xl | `text-xl` | 20px | Small headings |
| 2xl | `text-2xl` | 24px | Large headings |
| 3xl | `text-3xl` | 30px | Larger headings |
| 4xl | `text-4xl` | 36px | Extra large headings |
| 5xl | `text-5xl` | 48px | Hero headings |
| 6xl | `text-6xl` | 60px | Extra hero headings |

### Tailwind Font Classes

```jsx
// Apply body font (Inter)
<p className="font-sans">Body text with Inter</p>
rounded-xl    /* 0.75rem - cards, inputs */
// Apply display/heading font (Poppins)
<h1 className="font-display">Heading with Poppins</h1>
```

See [TYPOGRAPHY_GUIDE.md](TYPOGRAPHY_GUIDE.md) for complete details, examples, and best practices.
rounded-2xl   /* 1rem - large containers */
rounded-3xl   /* 1.5rem - hero sections */
```

---

## 🧩 Components

### Logo Component
```jsx
import { Logo } from '@/components/Logo';

// Small logo (navbar)
<Logo size="sm" showText={false} animated={true} />

// Medium with text
<Logo size="md" showText={true} />

// Large (footer)
<Logo size="lg" showText={true} />
```

**Features:**
- Gradient fill (Indigo → Purple → Pink)
- Q + checkmark icon
- Hover scale effect
- Optional text with gradient

---

### Avatar Component
```jsx
import { Avatar, AvatarGroup } from '@/components/Avatar';

// Single Avatar
<Avatar
  name="John Doe"
  role="Teacher"
  initials="JD"
  gradient="from-indigo-500 to-purple-500"
  size="md"
/>

// Group of Avatars
<AvatarGroup
  avatars={[
    { name: 'Alice', initials: 'A', gradient: 'from-blue-500 to-indigo-500' },
    { name: 'Bob', initials: 'B', gradient: 'from-pink-500 to-rose-500' },
  ]}
  size="md"
  maxDisplay={3}
/>
```

**Available Gradients:**
```
from-indigo-500 to-purple-500
from-purple-500 to-pink-500
from-blue-500 to-indigo-500
from-pink-500 to-rose-500
from-amber-500 to-orange-500
from-emerald-500 to-teal-500
```

---

### Optimized Image Component
```jsx
import { OptimizedImage, HeroImage, DashboardPreview } from '@/components/OptimizedImage';

// Standard optimized image
<OptimizedImage
  src="/images/dashboard.png"
  alt="Dashboard preview"
  width={1200}
  height={800}
  hoverEffect="premium"
  lazy={true}
  priority={false}
/>

// Hero section image
<HeroImage
  src="/images/hero.png"
  alt="Hero"
  priority={true}
/>

// Dashboard/UI preview
<DashboardPreview
  src="/images/dashboard-ui.png"
  alt="Dashboard UI"
/>
```

**Features:**
- Lazy loading with Intersection Observer
- Progressive image loading
- WebP format support
- Responsive sizing
- Smooth fade-in animation
- Customizable hover effects

---

## 🎯 Hover Effects

### Card Hover Effects
```jsx
// Standard hover
<div className="hover:scale-105 hover:shadow-xl transition-all duration-300">Card</div>

// Premium hover (recommended for SaaS)
<div className="hover:scale-105 hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] hover:-translate-y-3 transition-all duration-300 ease-out">
  Card
</div>

// Glow effect
<div className="hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">Card with glow</div>
```

### Image Hover Effects
```jsx
// Zoom on hover
<img className="hover:scale-110 transition-transform duration-300" />

// Brightness change
<img className="hover:brightness-110 transition-all duration-300" />

// Premium (zoom + brighten)
<img className="hover:scale-110 hover:brightness-125 transition-all duration-300" />
```

### Button Hover Effects
```jsx
// Lift animation
<button className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
  Button
</button>

// Glow effect
<button className="hover:scale-105 hover:shadow-[0_0_20px_currentColor]">
  Button
</button>

// Premium button
<button className="hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] transition-all duration-300 ease-out">
  CTA Button
</button>
```

### Logo Hover Effects
```jsx
// Scale + glow (built into Logo component)
<Logo animated={true} />

// Manual logo hover
<div className="group hover:scale-110 transition-transform duration-300">
  <div className="group-hover:drop-shadow-[0_0_8px_rgba(79,70,229,0.6)]">
    <Logo animated={false} />
  </div>
</div>
```

---

## 🎬 Animations

### Fade In on Scroll
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Stagger Children
```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>{item.content}</motion.div>
  ))}
</motion.div>
```

### Hover Scale
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
>
  Interactive element
</motion.div>
```

### Duration Guidelines
| Purpose | Duration |
|---------|----------|
| Micro interactions (scale, shadow) | 200-300ms |
| Page transitions | 300-500ms |
| Entrance animations | 400-600ms |
| Parallax/complex | 600-1000ms |

---

## 🖼️ Images & Assets

### Directory Structure
```
public/
├── images/
│   ├── hero.png (1200x800px, < 200KB)
│   ├── dashboard-ui.png (1200x800px, < 200KB)
│   ├── students.png (1200x800px, < 200KB)
│   ├── teacher.png (1200x800px, < 200KB)
│   ├── avatar-1.png (200x200px, < 20KB)
│   ├── avatar-2.png (200x200px, < 20KB)
│   └── avatar-3.png (200x200px, < 20KB)
└── favicon.svg (logo as favicon)
```

### Image Optimization
- **Format:** WebP with PNG fallback
- **Compression:** TinyPNG / ImageOptim
- **Max sizes:**
  - Hero images: < 200KB
  - Thumbnail images: < 50KB
  - Avatars: < 20KB
- **Dimensions:**
  - Hero: 1200x800px (16:9 aspect ratio)
  - Dashboard: 1200x800px (16:9 aspect ratio)
  - Avatars: 200x200px (1:1 aspect ratio)

### Lazy Loading Strategy
```jsx
// Priority images (hero, above fold)
<OptimizedImage src="..." priority={true} />

// Secondary images (below fold)
<OptimizedImage src="..." lazy={true} />

// Deferred loading (far below fold)
<OptimizedImage src="..." lazy={true} loading="lazy" />
```

---

## 🌙 Dark Mode

### Implementation
```jsx
// In index.css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0F172A;
    --fg: #F1F5F9;
    /* ... other dark variables */
  }
}

// In Tailwind classes
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content adapts to dark mode
</div>
```

### Color Adjustments for Dark Mode
```css
/* Light mode */
.card { @apply bg-white border-gray-200; }

/* Dark mode */
.dark .card { @apply bg-slate-800 border-slate-700; }

/* Glassmorphism dark */
.dark .glass { @apply bg-slate-900/40 backdrop-blur-lg; }
```

---

## ⚡ Performance

### Image Optimization Checklist
- [ ] All images converted to WebP
- [ ] Fallback PNG for unsupported browsers
- [ ] Lazy loading enabled (loading="lazy")
- [ ] Image dimensions specified (prevents layout shift)
- [ ] Responsive images (srcset for different device sizes)
- [ ] Images compressed (< size targets)

### Animation Performance
- [ ] Use `transform` and `opacity` only (GPU accelerated)
- [ ] Avoid animating `width`, `height`, `position`
- [ ] Limit simultaneous animations to 3-4
- [ ] Use `will-change` sparingly (`transform`, `opacity`)
- [ ] Disable animations on `prefers-reduced-motion`

### Bundle Size
```
Target:
- JS: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Images: < 2MB total
```

### Monitoring
```bash
# Build size analysis
npm run build

# Lighthouse
npm run lighthouse

# Web Vitals (Cumulative Layout Shift, Largest Contentful Paint, etc.)
```

---

## 📦 Utility Classes Reference

### Quick Reference Table

| Class | Purpose | Example |
|-------|---------|---------|
| `saas-shell` | Max-width container with padding | All page layouts |
| `saas-card` | Standard card styling | Feature cards, testimonials |
| `btn-primary` | Primary CTA button | Main action button |
| `btn-secondary` | Secondary button | Alternative actions |
| `input-modern` | Modern input styling | Form fields |
| `hover:scale-105` | Hover scale effect | Interactive elements |
| `transition-all duration-300` | Smooth transition | All hover states |
| `backdrop-blur-lg` | Glass effect | Modal overlays |
| `bg-gradient-to-r ...` | Gradient background | Headers, CTAs |

---

## 🔗 Implementation Examples

### Hero Section with Image
```jsx
import { HeroImage } from '@/components/OptimizedImage';

export const Hero = () => (
  <section className="saas-shell py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Headline
        </h1>
        <button className="btn-primary">Get Started</button>
      </div>
      <HeroImage
        src="/images/hero.png"
        alt="Dashboard preview"
        priority={true}
      />
    </div>
  </section>
);
```

### Feature Cards Section
```jsx
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/OptimizedImage';

export const Features = () => (
  <section className="saas-shell py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map(feature => (
        <motion.div
          key={feature.id}
          whileHover={{ scale: 1.05 }}
          className="saas-card hover:shadow-xl transition-all"
        >
          <OptimizedImage src={feature.image} alt={feature.title} lazy={true} />
          <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
          <p className="text-muted mt-2">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
```

### Testimonials with Avatars
```jsx
import { Avatar } from '@/components/Avatar';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const Testimonials = () => (
  <section className="saas-shell py-16">
    <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map(testimonial => (
        <motion.article
          key={testimonial.id}
          whileHover={{ scale: 1.05, y: -8 }}
          className="saas-card"
        >
          <Quote className="mb-4" />
          <p className="text-base mb-6">"{testimonial.text}"</p>
          <div className="flex items-center gap-4">
            <Avatar name={testimonial.name} initials={testimonial.initials} />
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-muted">{testimonial.role}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  </section>
);
```

---

## 🎓 Best Practices

### DO
✅ Use CSS variables for theming  
✅ Apply transitions consistently (200-300ms for micro, 300-500ms for page)  
✅ Optimize images before uploading  
✅ Test dark mode color contrast  
✅ Use Framer Motion for complex animations  
✅ Leverage Tailwind's responsive prefixes (`md:`, `lg:`)  
✅ Keep hover effects subtle and fast  

### DON'T
❌ Animate `width`, `height`, `position` (not GPU-accelerated)  
❌ Use hard-coded hex colors (use CSS variables)  
❌ Add animations longer than 1 second without a reason  
❌ Use heavy image files (always optimize)  
❌ Skip alt text on images  
❌ Mix multiple animation libraries  
❌ Create hover effects without transitions  

---

## 📚 Additional Resources

- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Lucide Icons:** https://lucide.dev/
- **Web Performance:** https://web.dev/performance/
- **Dark Mode:** https://tailwindcss.com/docs/dark-mode

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Author:** GLA Exam Design Team
