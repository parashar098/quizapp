import { motion } from 'framer-motion';
import { BookOpenCheck, Users, GraduationCap, Activity, CheckCircle2 } from 'lucide-react';

interface MetricItem {
  icon: typeof BookOpenCheck;
  value: string;
  label: string;
  context: string;
  subtext: string;
  trend: number[];
  progress: number;
  accent: string;
  iconBackground: string;
}

const metrics: MetricItem[] = [
  {
    icon: BookOpenCheck,
    value: '10,482',
    label: 'Quizzes Created',
    context: 'Last 6 Months',
    subtext: '1,742 new quizzes published this month',
    trend: [48, 52, 49, 58, 62, 66, 71],
    progress: 78,
    accent: '#f59e0b',
    iconBackground: 'rgba(245, 158, 11, 0.14)',
  },
  {
    icon: Users,
    value: '5,231',
    label: 'Active Students',
    context: 'Currently Online: 312',
    subtext: 'Weekly retention increased by 12.4%',
    trend: [41, 44, 46, 45, 51, 56, 60],
    progress: 64,
    accent: '#3b82f6',
    iconBackground: 'rgba(59, 130, 246, 0.14)',
  },
  {
    icon: GraduationCap,
    value: '1,284',
    label: 'Verified Educators',
    context: 'Across K-12, College, and Coaching',
    subtext: 'Average setup completion time: 11 minutes',
    trend: [24, 27, 29, 30, 33, 36, 38],
    progress: 82,
    accent: '#8b5cf6',
    iconBackground: 'rgba(139, 92, 246, 0.14)',
  },
  {
    icon: Activity,
    value: '94.6%',
    label: 'Session Completion Rate',
    context: 'Last 7 Days Activity',
    subtext: 'Median quiz completion time: 18m 24s',
    trend: [86, 88, 90, 92, 91, 94, 95],
    progress: 95,
    accent: '#22c55e',
    iconBackground: 'rgba(34, 197, 94, 0.14)',
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

const Sparkline = ({ points, color }: { points: number[]; color: string }) => {
  const width = 132;
  const height = 42;
  const padding = 3;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;

  const polyline = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / span) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AchievementStats = () => {
  return (
    <section className="saas-shell rounded-3xl bg-slate-950 pb-24 pt-16 md:pt-20" style={{ backgroundColor: '#0f172a' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
          Platform Metrics
        </span>
        <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Operational Dashboard Snapshot
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          Reliable learning analytics presented with production-grade clarity and real-time trust signals.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              variants={cardVariants}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border p-7 shadow-2xl transition-transform duration-300"
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.92)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 28px rgba(15, 23, 42, 0.35)',
              }}
            >
              <div className="mb-5 flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{
                    backgroundColor: item.iconBackground,
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Icon className="h-5 w-5 text-slate-100" />
                </div>

                <div className="relative">
                  <span
                    className="inline-flex h-6 w-6 cursor-help items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15"
                    title="Data updated in real-time"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  </span>
                  <span className="pointer-events-none absolute -right-2 top-7 z-10 w-max rounded-md border border-white/15 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    Data updated in real-time
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-4xl font-bold tracking-[-0.03em] text-white">{item.value}</p>
                <p className="text-sm font-medium text-slate-100">
                  {item.label} <span className="text-slate-400">({item.context})</span>
                </p>
                <p className="text-xs text-slate-400">{item.subtext}</p>
              </div>

              <div className="mt-5 space-y-3">
                <Sparkline points={item.trend} color={item.accent} />
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Growth</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/70">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.progress}%`, backgroundColor: item.accent }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-500">Updated 2 mins ago</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 text-center text-sm font-medium text-slate-300"
      >
        Trusted by 1,200+ educators across India
      </motion.p>
    </section>
  );
};