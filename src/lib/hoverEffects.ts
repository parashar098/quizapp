/**
 * HOVER EFFECTS DESIGN SYSTEM
 * 
 * This file contains reusable Tailwind CSS classes for consistent
 * hover interactions across the GLA Exam premium SaaS UI.
 */

export const hoverEffects = {
  // Card hover effects
  card: {
    // Smooth scale + shadow lift
    standard: 'hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out',
    // Subtle move + shadow
    subtle: 'hover:-translate-y-2 hover:shadow-lg transition-all duration-200',
    // Glow effect
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.28)] transition-all duration-300',
    // Combined premium effect
    premium: 'hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.16)] hover:-translate-y-3 transition-all duration-300 ease-out',
  },

  // Image hover effects
  image: {
    // Zoom on hover
    zoom: 'hover:scale-110 transition-transform duration-300',
    // Brightness increase
    brighten: 'hover:brightness-110 transition-all duration-300',
    // Combined zoom + brighten
    premium: 'hover:scale-110 hover:brightness-125 transition-all duration-300',
  },

  // Button hover effects
  button: {
    // Lift animation
    lift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out',
    // Scale + glow
    glow: 'hover:scale-105 hover:shadow-[0_0_20px_currentColor] transition-all duration-300',
    // Gradient shift
    gradient: 'hover:via-blue-600 transition-all duration-300',
    // Combined premium
    premium: 'hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(59,130,246,0.22)] transition-all duration-300 ease-out',
  },

  // Logo hover effects
  logo: {
    // Scale + glow
    standard: 'hover:scale-110 transition-transform duration-300',
    // With drop shadow glow
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300',
  },

  // Link hover effects
  link: {
    // Underline animation
    underline: 'hover:underline transition-all duration-200',
    // Color shift
    colorShift: 'hover:text-brand-600 transition-colors duration-200',
    // Combined
    premium: 'hover:text-brand-600 hover:underline transition-all duration-200',
  },

  // Input hover effects
  input: {
    // Border glow
    glow: 'hover:border-brand-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.24)] transition-all duration-300',
    // Focus state
    focus: 'focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-300',
  },
};

/**
 * Complex motion component hover classes
 * Use with Framer Motion for advanced animations
 */
export const motionHoverVariants = {
  card: {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -8, boxShadow: '0 20px 40px rgba(59,130,246,0.16)' },
  },
  button: {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.08, y: -4 },
  },
  image: {
    initial: { scale: 1, filter: 'brightness(1)' },
    hover: { scale: 1.1, filter: 'brightness(1.15)' },
  },
  logo: {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
  },
};

export default hoverEffects;
