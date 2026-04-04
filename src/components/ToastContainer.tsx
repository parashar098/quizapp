import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast, ToastType } from '../hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const getToastStyles = (type: ToastType) => {
  const styles = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400" />,
    },
  };
  return styles[type];
};

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const { bg, border, icon } = getToastStyles(toast.type);

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, x: 400 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 400 }}
              transition={{ duration: 0.3 }}
              className={`${bg} ${border} rounded-xl border backdrop-blur-md overflow-hidden pointer-events-auto max-w-sm`}
            >
              <div className="flex items-start gap-3 p-4">
                <div className="mt-0.5">{icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 break-words">
                    {toast.message}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemove(toast.id)}
                  className="text-gray-400 hover:text-gray-200 flexshrink-0 mt-0.5"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Progress bar */}
              {toast.duration && toast.duration > 0 && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                  className="h-1 bg-gradient-to-r from-transparent to-transparent opacity-30 origin-left"
                  onAnimationComplete={() => onRemove(toast.id)}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
