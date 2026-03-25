import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  durationMinutes: number;
  startTime: number; // Unix ms timestamp
  onTimeUp: () => void;
}

export const QuizTimer = ({ durationMinutes, startTime, onTimeUp }: QuizTimerProps) => {
  const totalSeconds = durationMinutes * 60;

  const getRemaining = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, totalSeconds - elapsed);
  };

  const [remaining, setRemaining] = useState(getRemaining);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;
  const calledRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const rem = getRemaining();
      setRemaining(rem);
      if (rem <= 0 && !calledRef.current) {
        calledRef.current = true;
        clearInterval(interval);
        onTimeUpRef.current();
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, totalSeconds]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isWarning = remaining <= 60 && remaining > 30;
  const isCritical = remaining <= 30;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-3 font-mono text-lg font-bold backdrop-blur-md transition-colors ${
        isCritical
          ? 'animate-pulse border-red-400 bg-red-500/20 text-red-300'
          : isWarning
          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
          : 'border-white/20 bg-white/10 text-white'
      }`}
    >
      <Clock className="h-5 w-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
