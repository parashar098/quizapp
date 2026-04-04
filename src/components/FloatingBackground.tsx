import { motion } from 'framer-motion';

export const FloatingBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute left-[-20%] top-[-20%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-slate-300 via-blue-200 to-transparent opacity-45 blur-3xl dark:from-slate-700 dark:via-blue-900/40 dark:to-transparent"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      className="absolute right-[-18%] top-1/3 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-blue-200 via-slate-200 to-transparent opacity-30 blur-3xl dark:from-blue-900/30 dark:via-slate-700/20 dark:to-transparent"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
      className="absolute left-1/2 top-[80%] w-[360px] h-[360px] rounded-full bg-gradient-to-br from-slate-200 via-blue-100 to-transparent opacity-35 blur-3xl dark:from-slate-800 dark:via-blue-900/25 dark:to-transparent"
    />
  </div>
);
