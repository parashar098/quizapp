import { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DashboardStatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  colorClass?: string;
}

const DashboardStatCardComponent = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass = 'from-brand-100 to-brand-50',
}: DashboardStatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="saas-card saas-card-hover flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-semibold text-text-primary dark:text-slate-100">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} border border-brand-200/60`}> 
          <Icon className="h-6 w-6 text-brand-700" />
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">{subtitle}</p>
    </motion.div>
  );
};

export const DashboardStatCard = memo(DashboardStatCardComponent);
