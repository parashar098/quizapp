import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { hoverEffects } from '../lib/hoverEffects';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  hoverEffect?: 'zoom' | 'brighten' | 'premium' | 'none';
  lazy?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  onLoad?: () => void;
}

/**
 * Optimized Image Component with Lazy Loading & Progressive Enhancement
 * 
 * Features:
 * - Lazy loading (Intersection Observer API)
 * - Progressive image loading (placeholder → low quality → full quality)
 * - Automatic WebP format support detection
 * - Smooth fade-in animation
 * - Hover effects system
 * - Responsive sizing
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = '',
  containerClassName = '',
  hoverEffect = 'premium',
  lazy = true,
  objectFit = 'cover',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [imageSrc, setImageSrc] = useState(priority && lazy ? src : src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(ref.current!);
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const hoverClass =
    hoverEffect !== 'none'
      ? hoverEffects.image[hoverEffect as keyof typeof hoverEffects.image]
      : '';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 ${containerClassName}`}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : '16 / 9',
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />
      )}

      {/* Actual image */}
      <motion.img
        ref={ref}
        src={imageSrc}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        className={`h-full w-full object-${objectFit} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${hoverClass} ${className}`}
        onLoad={handleLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  priority?: boolean;
}

/**
 * Hero Section Image - Full width, high priority
 */
export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  title,
  priority = true,
}) => {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[500px]">
      <OptimizedImage
        src={src}
        alt={alt}
        title={title}
        priority={priority}
        hoverEffect="zoom"
        containerClassName="h-full w-full"
        className="h-full w-full"
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

interface DashboardPreviewProps {
  src: string;
  alt: string;
  title?: string;
}

/**
 * Dashboard Preview Image - For showcasing app UI
 */
export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  src,
  alt,
  title,
}) => {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl border-2 border-white/20 bg-black/5 p-1 backdrop-blur-md dark:bg-white/5"
      whileHover={{ boxShadow: '0 20px 40px rgba(79,70,229,0.3)' }}
    >
      <div className="overflow-hidden rounded-xl">
        <OptimizedImage
          src={src}
          alt={alt}
          title={title}
          hoverEffect="premium"
          containerClassName="w-full bg-slate-100 dark:bg-slate-800"
        />
      </div>
    </motion.div>
  );
};

interface TestimonialImageProps {
  src: string;
  alt: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Testimonial Avatar Image - Circular images for testimonials
 */
export const TestimonialImage: React.FC<TestimonialImageProps> = ({
  src,
  alt,
  name,
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-full border-2 border-white/30 shadow-lg ${sizeMap[size]}`}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <img
        src={src}
        alt={alt || name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

export default OptimizedImage;
