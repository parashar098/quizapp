import { useEffect, useRef, createElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: string;
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
  showCallback
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    const container = ref.current;

    // Clear previous content
    container.innerHTML = '';

    // Create span elements for each character
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      return span;
    });

    // Add spans to container
    chars.forEach((char) => container.appendChild(char));

    // Set initial state from
    gsap.set(chars, {
      opacity: from?.opacity ?? 0,
      y: from?.y ?? 40
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true
      }
    });

    // Animate each character
    tl.to(
      chars,
      {
        opacity: to?.opacity ?? 1,
        y: to?.y ?? 0,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (showCallback) {
            console.log('✨ All letters have animated!');
          }
          onLetterAnimationComplete?.();
        }
      },
      0
    );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [text, delay, duration, ease, from, to, onLetterAnimationComplete, showCallback]);

  const customStyle: React.CSSProperties = {
    textAlign: textAlign as any,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  // Use createElement to properly handle the dynamic tag with ref
  return createElement(
    (tag as any) || 'p',
    {
      ref,
      style: customStyle,
      className
    },
    null
  );
};

export default SplitText;
