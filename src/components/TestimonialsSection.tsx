import { motion } from 'framer-motion';
import { Star, StarHalf, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    text: 'I used this platform for my DBMS mid-sem prep, and the timed quizzes genuinely improved my speed under pressure.',
    name: 'Riya Sharma',
    role: 'BTech Student - 3rd Year',
    college: 'GLA University',
    rating: 4.5,
    usage: 'Used for 3 months',
    reviewedOn: 'Reviewed on March 2026',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    text: 'I run weekly revision quizzes for my class. The analytics dashboard helps me quickly identify weak concepts before exams.',
    name: 'Aman Verma',
    role: 'Computer Science Teacher',
    college: 'GLA University',
    rating: 5,
    usage: 'Used for 6 months',
    reviewedOn: 'Reviewed on February 2026',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    text: 'The leaderboard made practice sessions more competitive in a good way. I saw steady improvement in my weekly test scores.',
    name: 'Rahul Singh',
    role: 'BTech Student - 2nd Year',
    college: 'GLA University',
    rating: 4,
    usage: 'Used for 2 months',
    reviewedOn: 'Reviewed on March 2026',
    avatar: 'https://i.pravatar.cc/100?img=15',
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

const renderRating = (rating: number) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: full }).map((_, index) => (
        <Star key={`full-${index}`} className="h-4 w-4 fill-current" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: empty }).map((_, index) => (
        <Star key={`empty-${index}`} className="h-4 w-4 text-slate-600" />
      ))}
      <span className="ml-2 text-xs font-medium text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="relative border-t border-white/5 py-20">
      <div className="saas-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-semibold tracking-wide text-slate-400">
            Trusted by 5,000+ students and teachers
          </p>
          <h3 className="text-3xl font-bold text-white md:text-4xl">
            What Our Users Say
          </h3>
          <p className="mt-3 text-base text-slate-300 md:text-lg">
            Honest feedback from real learners and educators using GLA Exam in daily practice.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={`${testimonial.name}-${testimonial.role}`}
              variants={itemVariants}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="group min-w-[300px] snap-start rounded-2xl border p-6 md:min-w-[360px] lg:min-w-[380px]"
              style={{
                backgroundColor: '#111827',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 10px 22px rgba(2, 6, 23, 0.25)',
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name} profile`}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 rounded-full border border-white/15 object-cover"
                />
                <div>
                  <p className="mb-0 text-base font-semibold text-white">{testimonial.name}</p>
                  <p className="mb-0 text-sm text-slate-400">{testimonial.role}</p>
                  <p className="mb-0 text-xs text-slate-500">{testimonial.college}</p>
                </div>
              </div>

              {renderRating(testimonial.rating)}

              <p className="mb-0 mt-4 text-base leading-relaxed text-slate-200">
                "{testimonial.text}"
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified User
                </span>
                <span className="rounded-full border border-white/10 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  {testimonial.usage}
                </span>
                <span className="rounded-full border border-white/10 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  {testimonial.reviewedOn}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <button
            type="button"
            className="text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200"
          >
            See more reviews {'->'}
          </button>
        </div>
      </div>
    </section>
  );
};
