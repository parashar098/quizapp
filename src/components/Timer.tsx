import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (duration * 60)) * 100;

  const isLowTime = percentage < 20;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed top-20 right-6 bg-white rounded-xl shadow-lg p-4 border-2 ${
        isLowTime ? 'border-red-500' : 'border-blue-500'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isLowTime ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Clock className={`w-6 h-6 ${isLowTime ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Time Remaining</p>
          <p className={`text-2xl font-bold ${isLowTime ? 'text-red-600' : 'text-gray-900'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
      <div className="mt-3 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          className={`h-full rounded-full ${
            isLowTime
              ? 'bg-gradient-to-r from-red-500 to-orange-500'
              : 'bg-gradient-to-r from-blue-600 to-cyan-500'
          }`}
        />
      </div>
    </motion.div>
  );
};
