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
  colorClass = 'from-purple-500 via-pink-500 to-orange-400',
}: ResultCardProps) => {
  const progressValue = progress ?? 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass rounded-3xl border border-white/10 p-6 shadow-glass"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
          <span className="text-white text-sm font-bold">%</span>
        </div>
      </div>
      <p className="text-xs text-white/60 mt-4">{description}</p>
      {progress !== undefined && (
        <div className="mt-4 rounded-full bg-white/10 h-2 overflow-hidden">
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
