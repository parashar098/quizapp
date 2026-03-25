import { motion } from 'framer-motion';

export const FloatingBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute left-[-20%] top-[-20%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 opacity-40 blur-3xl"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      className="absolute right-[-18%] top-1/3 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 opacity-30 blur-3xl"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
      className="absolute left-1/2 top-[80%] w-[360px] h-[360px] rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-35 blur-3xl"
    />
  </div>
);
