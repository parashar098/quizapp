import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import StarBorder from './StarBorder';

interface TabWarningModalProps {
  violations: number;
  maxViolations: number;
  onDismiss: () => void;
}

export const TabWarningModal = ({ violations, maxViolations, onDismiss }: TabWarningModalProps) => {
  const remaining = maxViolations - violations;
  const isFinal = remaining <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mx-4 w-full max-w-md rounded-3xl border border-red-400/40 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-lg"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-white">
            {isFinal ? 'Quiz Auto-Submitted' : 'Tab Switch Detected'}
          </h2>

          <p className="mb-4 text-white/70">
            {isFinal
              ? 'You exceeded the maximum number of tab switches. Your quiz has been automatically submitted.'
              : `You switched away from this tab. This is violation ${violations} of ${maxViolations}.`}
          </p>

          {!isFinal && (
            <p
              className={`mb-6 text-sm font-semibold ${
                remaining === 1 ? 'text-red-400' : 'text-amber-400'
              }`}
            >
              {remaining === 1
                ? 'Warning: one more violation will auto-submit your quiz!'
                : `${remaining} violations remaining before auto-submit.`}
            </p>
          )}

          {!isFinal && (
            <StarBorder as="button"
              onClick={onDismiss}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Continue Quiz
            </StarBorder>
          )}
        </div>
      </motion.div>
    </div>
  );
};
