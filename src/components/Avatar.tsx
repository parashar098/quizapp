import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  name: string;
  role?: string;
  initials?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  image?: string;
  fallback?: boolean;
}

const sizeMap = {
  sm: { container: 'w-10 h-10', text: 'text-xs' },
  md: { container: 'w-12 h-12', text: 'text-sm' },
  lg: { container: 'w-16 h-16', text: 'text-lg' },
};

const gradientMap: Record<string, string> = {
  'from-indigo-500 to-purple-500': 'from-indigo-500 to-purple-500',
  'from-purple-500 to-pink-500': 'from-purple-500 to-pink-500',
  'from-blue-500 to-indigo-500': 'from-blue-500 to-indigo-500',
  'from-pink-500 to-rose-500': 'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500': 'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500': 'from-emerald-500 to-teal-500',
  'from-cyan-500 to-blue-500': 'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500': 'from-violet-500 to-purple-500',
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  initials: initialsProp,
  gradient = 'from-indigo-500 to-purple-500',
  size = 'md',
  className = '',
  image,
  fallback = true,
}) => {
  const dimensions = sizeMap[size];
  const initials = initialsProp || name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const hasGradient = Object.keys(gradientMap).includes(gradient);
  const gradientClass = hasGradient ? gradient : 'from-indigo-500 to-purple-500';

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className={`relative ${dimensions.container}`}>
        {image && fallback ? (
          <img
            src={image}
            alt={name}
            className={`${dimensions.container} rounded-full object-cover border-2 border-white/30`}
          />
        ) : (
          <>
            {/* Glow background */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientClass} opacity-30 blur`}
            />
            {/* Avatar circle */}
            <div
              className={`${dimensions.container} rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center border-2 border-white/30 shadow-lg relative z-10`}
            >
              <span
                className={`${dimensions.text} font-bold text-white tracking-wider`}
              >
                {initials}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

interface AvatarGroupProps {
  avatars: AvatarProps[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
  className?: string;
}

/**
 * Group of avatars with stacked overlap layout (like GitHub contributors)
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'md',
  maxDisplay = 3,
  className = '',
}) => {
  const displayAvatars = avatars.slice(0, maxDisplay);
  const remaining = Math.max(0, avatars.length - maxDisplay);

  const sizePixels = {
    sm: 40,
    md: 48,
    lg: 64,
  };

  const overlap = -sizePixels[size] / 3;

  return (
    <div className={`flex gap-2 ${className}`} style={{ marginLeft: 0 }}>
      {displayAvatars.map((avatar, idx) => (
        <div
          key={idx}
          style={{
            marginLeft: idx === 0 ? 0 : overlap,
            zIndex: displayAvatars.length - idx,
          }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`flex items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-600 text-white font-bold text-xs border-2 border-white/30 ${sizeMap[size].container}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
