import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 24, text: 'text-sm' },
  md: { icon: 32, text: 'text-base' },
  lg: { icon: 48, text: 'text-lg' },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  animated = true,
  className = '',
}) => {
  const dimensions = sizeMap[size];

  const LogoIcon = (
    <svg
      width={dimensions.icon}
      height={dimensions.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <defs>
        <linearGradient id="quizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#A855F7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Glow background */}
      <circle cx="32" cy="32" r="32" fill="url(#glowGradient)" opacity="0" />

      {/* Rounded square background */}
      <rect x="8" y="8" width="48" height="48" rx="16" fill="url(#quizGradient)" opacity="0.1" />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="16"
        fill="url(#quizGradient)"
        opacity="1"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 100%)',
        }}
      />

      {/* Q Shape */}
      <path
        d="M 24 16 C 20 16 16 20 16 24 L 16 40 C 16 44 20 48 24 48 C 28 48 32 44 32 40 L 32 32 L 28 32 C 28 36 26 40 24 40 C 20 40 18 36 18 32 L 18 24 C 18 20 20 16 24 16"
        fill="white"
        opacity="0.95"
      />

      {/* Checkmark inside Q */}
      <path
        d="M 36 28 L 42 34 L 48 26"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />

      {/* Gradient border highlight */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="16"
        fill="none"
        stroke="url(#quizGradient)"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );

  const containerVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.1,
      boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
    },
  };

  const iconVariants = {
    idle: { rotate: 0 },
    hover: { rotate: 5 },
  };

  if (animated) {
    return (
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        variants={containerVariants}
        initial="idle"
        whileHover="hover"
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.div variants={iconVariants}>{LogoIcon}</motion.div>
        {showText && (
          <motion.span
            className={`font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${dimensions.text} whitespace-nowrap`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            GLA Exam
          </motion.span>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-2 group cursor-pointer hover:scale-110 transition-transform duration-300">
      <div className="group-hover:drop-shadow-[0_0_8px_rgba(79,70,229,0.6)] transition-all duration-300">
        {LogoIcon}
      </div>
      {showText && (
        <span className={`font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${dimensions.text} whitespace-nowrap`}>
          GLA Exam
        </span>
      )}
    </div>
  );
};

export default Logo;
