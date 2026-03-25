import { motion } from 'framer-motion';
import { Trophy, Users, GraduationCap, BarChart3 } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    value: '10,000+',
    label: 'Quizzes Created',
    glow: 'from-amber-400/40 via-orange-400/20 to-transparent',
    iconTint: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    value: '5,000+',
    label: 'Active Students',
    glow: 'from-emerald-400/40 via-teal-400/20 to-transparent',
    iconTint: 'from-emerald-400 to-teal-500',
  },
  {
    icon: GraduationCap,
    value: '1,200+',
    label: 'Teachers Joined',
    glow: 'from-indigo-400/40 via-purple-400/20 to-transparent',
    iconTint: 'from-indigo-400 to-purple-500',
  },
  {
    icon: BarChart3,
    value: '95%',
    label: 'Success Rate',
    glow: 'from-pink-400/40 via-fuchsia-400/20 to-transparent',
    iconTint: 'from-pink-400 to-fuchsia-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export const AchievementStats = () => {
  return (
    <section className="saas-shell pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary backdrop-blur-md dark:text-slate-300">
          Platform Achievements
        </span>
        <h3 className="mt-4 text-3xl font-bold text-text-primary dark:text-slate-100 md:text-4xl">
          Trusted by fast-growing classrooms
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted md:text-base">
          A modern quiz platform built for scale, clarity, and measurable learning outcomes.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              variants={cardVariants}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-[1px] shadow-soft backdrop-blur-lg dark:bg-white/5"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow} opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative rounded-[calc(1rem-1px)] bg-white/12 p-6 backdrop-blur-lg dark:bg-slate-950/35">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconTint} shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <div className="space-y-1">
                  <p className="text-4xl font-bold tracking-tight text-text-primary dark:text-white">
                    {item.value}
                  </p>
                  <p className="text-sm font-medium text-muted dark:text-slate-300">
                    {item.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};