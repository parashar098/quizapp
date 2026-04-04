import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUpRef.current();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (duration * 60)) * 100;

  const isLowTime = percentage < 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed right-6 top-24 z-30 w-64 rounded-2xl border p-4 backdrop-blur-xl shadow-soft ${
        isLowTime
          ? 'border-ui-error/50 bg-red-500/10 dark:bg-red-500/15'
          : 'border-ui-border bg-white/75 dark:border-slate-700/80 dark:bg-slate-900/70'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-2xl p-2 ${isLowTime ? 'bg-red-500/20' : 'bg-brand-500/20'}`}>
          <Clock className={`h-6 w-6 ${isLowTime ? 'text-red-500 dark:text-red-300' : 'text-brand-600 dark:text-brand-300'}`} />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted">Time Remaining</p>
          <p className={`text-2xl font-bold ${isLowTime ? 'text-red-600 dark:text-red-300' : 'text-text-primary dark:text-slate-100'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          className={`h-full rounded-full ${
            isLowTime
              ? 'bg-gradient-to-r from-red-500 to-orange-400'
              : 'bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600'
          }`}
        />
      </div>
    </motion.div>
  );
};
