import { motion } from 'framer-motion';
import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit?: string;
  color: 'blue' | 'slate' | 'green' | 'amber' | 'teal';
  trend?: number; // percentage change
  delay?: number;
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-brand-50 to-brand-100',
    icon: 'text-brand-600',
    border: 'border-brand-200',
  },
  slate: {
    bg: 'bg-gradient-to-br from-slate-50 to-blue-100',
    icon: 'text-slate-700',
    border: 'border-slate-200',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    icon: 'text-green-600',
    border: 'border-green-200',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    icon: 'text-amber-600',
    border: 'border-amber-200',
  },
  teal: {
    bg: 'bg-gradient-to-br from-blue-50 to-slate-100',
    icon: 'text-blue-700',
    border: 'border-blue-200',
  },
};

export default function StatsCard({
  icon,
  label,
  value,
  unit = '',
  color,
  trend,
  delay = 0,
}: StatsCardProps) {
  const colorClass = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`${colorClass.bg} rounded-2xl p-6 border ${colorClass.border} shadow-soft dark:bg-slate-800 dark:border-slate-700`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${colorClass.icon} text-3xl`}>{icon}</div>
        {trend !== undefined && (
          <div
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div className="mb-2">
        <p className="text-sm text-text-secondary font-medium dark:text-slate-300">{label}</p>
        <p className="text-3xl font-bold text-text-primary dark:text-slate-100">
          {value}
          {unit && <span className="text-lg ml-1">{unit}</span>}
        </p>
      </div>
    </motion.div>
  );
}
