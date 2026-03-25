import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

type ToastVariant = 'success' | 'warning' | 'error';

interface ToastProps {
  show: boolean;
  message: string;
  variant?: ToastVariant;
}

const variantMeta = {
  success: { icon: CheckCircle2, className: 'border-accent-500/40 bg-accent-500/10 text-accent-700 dark:text-accent-300' },
  warning: { icon: AlertTriangle, className: 'border-ui-warning/40 bg-ui-warning/10 text-amber-700 dark:text-amber-300' },
  error: { icon: XCircle, className: 'border-ui-error/40 bg-ui-error/10 text-red-700 dark:text-red-300' },
};

export const Toast = ({ show, message, variant = 'success' }: ToastProps) => {
  const Icon = variantMeta[variant].icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-soft ${variantMeta[variant].className}`}
        >
          <Icon className="h-4 w-4" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
