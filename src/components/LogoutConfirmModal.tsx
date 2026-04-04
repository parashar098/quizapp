import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LogOut, X } from 'lucide-react';
import StarBorder from './StarBorder';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  userName?: string;
}

export const LogoutConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
  userName = 'User',
}: LogoutConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl bg-white border border-ui-border shadow-2xl p-6 dark:bg-slate-950 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg transition-colors dark:hover:bg-slate-800"
              disabled={isLoading}
            >
              <X className="w-5 h-5 text-muted" />
            </motion.button>

            {/* Content */}
            <div className="text-center space-y-4">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center border border-red-200 dark:border-red-500/30"
              >
                <AlertCircle className="w-8 h-8 text-red-400" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-text-primary dark:text-slate-100"
              >
                Logout Confirmation
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm text-muted leading-relaxed"
              >
                Are you sure you want to logout, <span className="font-semibold text-text-primary dark:text-slate-100">{userName}</span>?
              </motion.p>

              {/* Warning */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/30"
              >
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  You will be logged out of your account and will need to log in again.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex gap-3 pt-4"
              >
                <StarBorder as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-text-primary font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </StarBorder>
                <StarBorder as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      </motion.div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </>
                  )}
                </StarBorder>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
