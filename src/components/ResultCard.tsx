import { motion } from 'framer-motion';

interface ResultCardProps {
  title: string;
  value: string | number;
  description: string;
  progress?: number;
  colorClass?: string;
}

export const ResultCard = ({
  title,
  value,
  description,
  progress,
  colorClass = 'from-slate-800 via-slate-600 to-blue-500',
}: ResultCardProps) => {
  const progressValue = progress ?? 0;

  return (
    <motion.div whileHover={{ y: -6 }} className="saas-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-1 dark:text-slate-100">{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
          <span className="text-white text-sm font-bold">%</span>
        </div>
      </div>
      <p className="text-xs text-muted mt-4">{description}</p>
      {progress !== undefined && (
        <div className="mt-4 rounded-full bg-slate-200/80 h-2 overflow-hidden dark:bg-slate-700/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressValue}%` }}
            className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          />
        </div>
      )}
    </motion.div>
  );
};
