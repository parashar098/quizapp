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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mx-4 w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-soft dark:border-red-900/40 dark:bg-slate-900"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20">
            <AlertTriangle className="h-8 w-8 text-ui-error" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-text-primary dark:text-slate-100">
            {isFinal ? 'Quiz Auto-Submitted' : 'Tab Switch Detected'}
          </h2>

          <p className="mb-4 text-muted">
            {isFinal
              ? 'You exceeded the maximum number of tab switches. Your quiz has been automatically submitted.'
              : `You switched away from this tab. This is violation ${violations} of ${maxViolations}.`}
          </p>

          {!isFinal && (
            <p
              className={`mb-6 text-sm font-semibold ${
                remaining === 1 ? 'text-ui-error' : 'text-ui-warning'
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
              className="rounded-xl bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
            >
              Continue Quiz
            </StarBorder>
          )}
        </div>
      </motion.div>
    </div>
  );
};
