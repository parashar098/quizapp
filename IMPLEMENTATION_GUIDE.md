# GLA Exam UI/UX Implementation Guide

A practical guide for using the new premium design system, components, and images in your React app.

## Table of Contents
1. [Logo Usage](#logo-usage)
2. [Images Usage](#images-usage)
3. [Avatar System](#avatar-system)
4. [Optimized Image Component](#optimized-image-component)
5. [Hover Effects](#hover-effects)
6. [Real-World Examples](#real-world-examples)

---

## Logo Usage

### Import
```tsx
import { Logo } from '@/components/Logo';
```

### In Navbar
```tsx
// Navbar with animated logo
<motion.div onClick={() => onNavigate('landing')}>
  <Logo size="md" showText={true} animated={true} />
</motion.div>
```

### In Footer
```tsx
// Footer with logo (text only)
<Logo size="sm" showText={true} animated={false} />
```

### As Favicon
The favicon is automatically set to `/public/favicon.svg` (Q + checkmark icon).

### Hover Behavior
- **Automatic hover scale**: 1.1 (10% larger)
- **Glow effect**: Drop shadow with indigo color
- **Smooth transition**: 300ms spring animation

### Customization
```tsx
// Large hero logo
<Logo size="lg" showText={true} animated={true} className="mb-8" />

// Tiny icon-only (for mobile)
<Logo size="sm" showText={false} animated={false} />
```

---

## Images Usage

### Available Images
Located in `/public/images/`:

| Image | Path | Usage | Dimensions |
|-------|------|-------|-----------|
| Dashboard UI | `/images/dashboard-ui.svg` | Dashboard preview, features section | 1200×800px |
| Hero | `/images/hero.svg` | Main hero section | 1200×800px |
| Students | `/images/students.svg` | Collaboration/team section | 1200×800px |
| Teacher | `/images/teacher.svg` | Teacher/management section | 1200×800px |

### Best Practices
✅ **DO:**
- Use SVG images (scalable, small file size)
- Set `priority={true}` for above-the-fold images
- Use `lazy={true}` for below-the-fold images
- Specify dimensions to prevent layout shift
- Use `DashboardPreview` component for UI mockups

❌ **DON'T:**
- Use high-resolution PNG/JPG without optimization
- Skip `width` and `height` props (causes Cumulative Layout Shift)
- Lazy load hero/above-fold images
- Use external image URLs (use local `/public/images/` instead)

---

## Avatar System

### Import
```tsx
import { Avatar, AvatarGroup } from '@/components/Avatar';
```

### Single Avatar
```tsx
<Avatar
  name="Riya Sharma"
  role="Teacher"
  initials="RS"
  gradient="from-indigo-500 to-purple-500"
  size="md"
/>
```

### Available Gradients
```tsx
'from-indigo-500 to-purple-500'    // Default
'from-purple-500 to-pink-500'
'from-blue-500 to-indigo-500'
'from-pink-500 to-rose-500'
'from-amber-500 to-orange-500'
'from-emerald-500 to-teal-500'
'from-cyan-500 to-blue-500'
'from-violet-500 to-purple-500'
```

### Size Options
```tsx
<Avatar size="sm" />   {/* 40×40px, text-xs */}
<Avatar size="md" />   {/* 48×48px, text-sm */}
<Avatar size="lg" />   {/* 64×64px, text-lg */}
```

### Avatar Group
```tsx
<AvatarGroup
  avatars={[
    { name: 'Alice', initials: 'A', gradient: 'from-blue-500 to-indigo-500' },
    { name: 'Bob', initials: 'B', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Carol', initials: 'C', gradient: 'from-emerald-500 to-teal-500' },
  ]}
  size="md"
  maxDisplay={3}
/>
```

**Displays:** 3 avatars with "+1" indicator for extras  
**Hover:** Individual avatar scale animations

---

## Optimized Image Component

### Import
```tsx
import { 
  OptimizedImage, 
  HeroImage, 
  DashboardPreview, 
  TestimonialImage 
} from '@/components/OptimizedImage';
```

### Standard Usage
```tsx
<OptimizedImage
  src="/images/dashboard-ui.svg"
  alt="Dashboard interface"
  width={1200}
  height={800}
  priority={false}
  lazy={true}
  hoverEffect="premium"
/>
```

### Props Reference
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Image source URL |
| `alt` | string | required | Accessibility alt text |
| `width` | number | optional | Image width (prevents layout shift) |
| `height` | number | optional | Image height (prevents layout shift) |
| `priority` | boolean | false | Load immediately (above fold) |
| `lazy` | boolean | true | Enable lazy loading |
| `hoverEffect` | string | premium | 'zoom' \| 'brighten' \| 'premium' \| 'none' |
| `objectFit` | string | cover | 'cover' \| 'contain' \| 'fill' \| 'scale-down' |
| `className` | string | '' | Additional Tailwind classes |

### Hover Effects
```tsx
// Zoom on hover
<OptimizedImage src="..." hoverEffect="zoom" />

// Brighten on hover
<OptimizedImage src="..." hoverEffect="brighten" />

// Premium: zoom + brighten + shadow
<OptimizedImage src="..." hoverEffect="premium" />

// No hover effect
<OptimizedImage src="..." hoverEffect="none" />
```

### Hero Image Component
For large hero images with gradient overlay:
```tsx
<HeroImage
  src="/images/hero.svg"
  alt="Platform overview"
  priority={true}
/>
```

**Features:**
- Full-width responsive
- 400px height on mobile, 500px on desktop
- Gradient overlay for text readability
- Automatic priority loading

### Dashboard Preview Component
For UI/dashboard mockups:
```tsx
<DashboardPreview
  src="/images/dashboard-ui.svg"
  alt="Dashboard interface"
/>
```

**Features:**
- Glassmorphism border (border-white/20)
- Hover box shadow glow
- Rounded corners
- Premium styling

### Testimonial Image Component
For circular avatar images:
```tsx
<TestimonialImage
  src="/avatar.png"
  alt="User avatar"
  name="John Doe"
  size="md"
/>
```

**Features:**
- Circular with border
- Smooth scale on hover
- Perfect for testimonials

---

## Hover Effects

### Tailwind Classes
All hover effects use native Tailwind + CSS transitions (no extra libraries).

### Card Hover
```tsx
// Subtle hover
<div className="hover:scale-105 hover:shadow-lg transition-all duration-300">
  Card
</div>

// Premium hover (recommended)
<div className="hover:scale-105 hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] hover:-translate-y-3 transition-all duration-300 ease-out">
  Card
</div>

// Glow hover
<div className="hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300">
  Card
</div>
```

### Button Hover
```tsx
// Lift effect
<button className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
  Button
</button>

// Premium button
<button className="hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] transition-all duration-300 ease-out">
  CTA
</button>
```

### Image Hover
```tsx
// Zoom
<img className="hover:scale-110 transition-transform duration-300" />

// Premium
<img className="hover:scale-110 hover:brightness-125 transition-all duration-300" />
```

### Using hoverEffects Library
```tsx
import { hoverEffects } from '@/lib/hoverEffects';

<div className={hoverEffects.card.premium}>Card</div>
<div className={hoverEffects.image.premium}>Image</div>
<button className={hoverEffects.button.premium}>Button</button>
```

---

## Real-World Examples

### Example 1: Hero Section with Image
```tsx
import { HeroImage } from '@/components/OptimizedImage';
import { Logo } from '@/components/Logo';

export const Hero = () => (
  <section className="saas-shell py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Logo size="lg" showText={true} className="mb-6" />
        <h1 className="text-5xl font-bold mb-4">
          Modern Quiz Platform
        </h1>
        <p className="text-lg text-muted mb-8">
          Create, manage, and take interactive quizzes with real-time analytics.
        </p>
        <button className={hoverEffects.button.premium}>
          Get Started
        </button>
      </motion.div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <HeroImage
          src="/images/hero.svg"
          alt="GLA Exam platform preview"
          priority={true}
        />
      </motion.div>
    </div>
  </section>
);
```

### Example 2: Feature Cards with Images
```tsx
import { OptimizedImage } from '@/components/OptimizedImage';
import { motion } from 'framer-motion';
import { hoverEffects } from '@/lib/hoverEffects';

const features = [
  {
    title: 'Dashboard Analytics',
    description: 'Real-time performance metrics',
    image: '/images/dashboard-ui.svg',
  },
  {
    title: 'Student Collaboration',
    description: 'Live quiz sessions',
    image: '/images/students.svg',
  },
  {
    title: 'Teacher Tools',
    description: 'Easy quiz management',
    image: '/images/teacher.svg',
  },
];

export const Features = () => (
  <section className="saas-shell py-16">
    <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map(feature => (
        <motion.div
          key={feature.title}
          whileHover={{ scale: 1.05, y: -8 }}
          className={`saas-card ${hoverEffects.card.premium}`}
        >
          <OptimizedImage
            src={feature.image}
            alt={feature.title}
            lazy={true}
            hoverEffect="premium"
          />
          <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
          <p className="text-muted mt-2">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
```

### Example 3: Testimonials with Avatars
```tsx
import { Avatar } from '@/components/Avatar';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: 'GLA Exam transformed our classroom learning experience.',
    name: 'Riya Sharma',
    role: 'Teacher',
    initials: 'RS',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    text: 'The leaderboard keeps me motivated to study better.',
    name: 'Aman Verma',
    role: 'Student',
    initials: 'AV',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export const Testimonials = () => (
  <section className="saas-shell py-16">
    <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
    
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {testimonials.map(testimonial => (
        <motion.article
          key={testimonial.name}
          className="saas-card hover:scale-105 transition-all"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Quote icon */}
          <Quote className="w-6 h-6 mb-4 text-brand-500" />

          {/* Quote text */}
          <p className="text-lg mb-6">"{testimonial.text}"</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <Avatar
              name={testimonial.name}
              initials={testimonial.initials}
              gradient={testimonial.gradient}
              size="md"
            />
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

## Performance Optimization Checklist

### Images
- [ ] All images are in `/public/images/`
- [ ] Large images use `lazy={true}`
- [ ] Hero/above-fold images use `priority={true}`
- [ ] Image dimensions specified (width + height)
- [ ] SVG format used where possible
- [ ] Images compressed (< size targets)

### Components
- [ ] Logo uses `animated={true}` sparingly (only in navbar)
- [ ] Avatars use correct size props
- [ ] OptimizedImage component used for all images
- [ ] Hover effects use CSS transitions (not JS)

### Build
```bash
# Test production build
npm run build

# Check bundle size
npm run preview
```

---

## Migration Guide

### From Old System → New Design System

**Before:**
```tsx
<div className="bg-gradient-to-r from-purple-500 to-pink-500 h-96">
  <img src="external-url" />
</div>
```

**After:**
```tsx
<HeroImage src="/images/hero.svg" priority={true} />
```

**Before:**
```tsx
<div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
  RS
</div>
```

**After:**
```tsx
<Avatar
  name="Riya Sharma"
  initials="RS"
  gradient="from-indigo-500 to-purple-500"
  size="md"
/>
```

---

## Troubleshooting

### Images not loading
- ✅ Ensure image path starts with `/images/` (from public folder)
- ✅ Check file extension matches (`.svg`, `.png`, `.webp`)
- ✅ Verify file exists in `/public/images/`

### Hover effects not working
- ✅ Use `transition-all duration-300` class
- ✅ Check Tailwind CSS is configured properly
- ✅ Verify `hover:` classes syntax

### Logo animation jittery
- ✅ Use `animated={true}` only when needed
- ✅ Reduce animation complexity on mobile
- ✅ Test in production build (not dev mode)

### Avatar initials truncated
- ✅ Ensure `initials` prop is 1-2 characters
- ✅ Auto-generates from `name` if not provided
- ✅ Adjust `size` prop for longer text

---

## Resources

- [Complete Design System](./DESIGN_SYSTEM.md)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Performance Guide](https://web.dev/performance/)

---

**Last Updated:** March 2026  
**Version:** 1.0.0
