import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Avatar } from './Avatar';

const testimonials = [
  {
    text: 'GLA Exam made my classroom more interactive and fun.',
    name: 'Riya Sharma',
    role: 'Teacher',
    initials: 'RS',
    accent: 'from-indigo-500 to-purple-500',
    glow: 'from-indigo-500/35 via-purple-500/15 to-transparent',
  },
  {
    text: 'The leaderboard feature motivates me to perform better.',
    name: 'Aman Verma',
    role: 'Student',
    initials: 'AV',
    accent: 'from-emerald-500 to-teal-500',
    glow: 'from-emerald-500/35 via-teal-500/15 to-transparent',
  },
  {
    text: 'Simple, fast, and very effective for learning.',
    name: 'Rahul Singh',
    role: 'Student',
    initials: 'RS',
    accent: 'from-pink-500 to-fuchsia-500',
    glow: 'from-pink-500/35 via-fuchsia-500/15 to-transparent',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const testimonialBackgroundImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92VejZl34KV_kHBVg8Z7CFOmFt3ZFzDOImg&s';

export const TestimonialsSection = () => {
  return (
    <section className="relative py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute right-16 top-20 h-48 w-48 rounded-full bg-pink-500/12 blur-3xl" />
        <div className="absolute bottom-4 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="saas-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h3 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            What Our Users Say
          </h3>
          <p className="mt-3 text-base text-muted md:text-lg">
            Trusted by teachers and students worldwide
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={`${testimonial.name}-${testimonial.role}`}
              variants={itemVariants}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-[1px] shadow-soft dark:bg-slate-800/40"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${testimonial.glow} opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-white/12 p-6 dark:bg-slate-950/35">
                <div className="pointer-events-none absolute inset-0">
                  <img
                    src={testimonialBackgroundImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-40 scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/35 dark:bg-slate-950/50" />
                </div>

                <div className="relative z-10">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-2 dark:bg-white/5">
                    <Quote className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                  </div>
                </div>

                <p className="flex-1 text-base leading-7 text-white dark:text-slate-100">
                  “{testimonial.text}”
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <Avatar
                    name={testimonial.name}
                    role={testimonial.role}
                    initials={testimonial.initials}
                    gradient={testimonial.accent}
                    size="md"
                  />
                  <div>
                    <p className="font-semibold text-white dark:text-slate-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-200 dark:text-slate-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};