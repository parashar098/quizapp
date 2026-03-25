import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, ArrowRight, Bell, Megaphone } from 'lucide-react';
import { AchievementStats } from '../components/AchievementStats';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { Footer } from '../components/Footer';
import Prism from '../components/Prism';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ThemeToggle } from '../components/ThemeToggle';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface LandingProps {
  onNavigate: (page: Page) => void;
}
export const Landing = ({ onNavigate }: LandingProps) => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showPrism, setShowPrism] = useState(false);

  useEffect(() => {
    const updatePrismVisibility = () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isLargeScreen = window.innerWidth >= 1440;
      const connection = navigator.connection as { saveData?: boolean } | undefined;
      const saveData = Boolean(connection?.saveData);
      const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 6;
      const maybeLowMemory =
        typeof (navigator as { deviceMemory?: number }).deviceMemory === 'number' &&
        ((navigator as { deviceMemory?: number }).deviceMemory ?? 0) <= 8;

      setShowPrism(!reduceMotion && isLargeScreen && !saveData && !lowCpu && !maybeLowMemory);
    };

    updatePrismVisibility();
    window.addEventListener('resize', updatePrismVisibility, { passive: true });

    return () => {
      window.removeEventListener('resize', updatePrismVisibility);
    };
  }, []);

  const announcements = [
    {
      id: 1,
      title: 'New Mock Test Series',
      message: 'Weekly full-length practice tests are now available for all students.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Live Doubt Session',
      message: 'Join tonight at 8 PM for a live discussion with expert mentors.',
      time: '1d ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Performance Report Update',
      message: 'Detailed subject-wise analytics are now enabled in student dashboards.',
      time: '3d ago',
      unread: false,
    },
  ];

  const unreadCount = announcements.filter((item) => item.unread).length;

  const features = [
    {
      icon: BookOpen,
      title: 'Create Quizzes',
      description: 'Teachers can build beautiful quizzes with rich question types.',
      image: 'https://www.eurokidsindia.com/blog/wp-content/uploads/2024/10/Top10_Essential_Trait_GoodStudent.jpg-870x437.jpg',
    },
    {
      icon: Users,
      title: 'Real-Time Participation',
      description: 'Students join instantly using shareable quiz codes.',
      image: 'https://images.pexels.com/photos/2014773/pexels-photo-2014773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      icon: Trophy,
      title: 'Insightful Analytics',
      description: 'Track progress, leaderboard, and performance trends.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiStM6UVTQIkPla78ru5arakBzwyASyeb4lQ&s',
    },
  ];

  const campusImages = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZpx9LLCznC_ovI_AkmaUNHP5SnUyBEWRUrQ&s',
      alt: 'GLA students in classroom session',
    },
    {
      src: 'https://www.gla.ac.in/images/gl-ev-6.webp',
      alt: 'GLA ceremony and student event',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32IBYuo5QV1R7tsLgY8U2i9nbvQ2R7we3aA&s',
      alt: 'GLA students in guided learning activity',
    },
  ];

  return (
    <BackgroundImageLayout>
      {showPrism && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
          <Prism
            animationType="rotate"
            timeScale={0.2}
            height={3.5}
            baseWidth={5.5}
            scale={2.7}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={0.75}
            maxDpr={1.1}
            suspendWhenOffscreen={true}
          />
        </div>
      )}

      <header className="relative z-20">
        <div className="saas-shell flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-soft">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png"
                alt="GLA University logo"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">GLA Exam</h1>
              <p className="text-xs text-muted">Modern quiz platform for teachers and students</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StarBorder as="button"
              type="button"
              onClick={() => setShowAnnouncements((prev) => !prev)}
              style={{ overflow: 'visible' }}
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-ui-border/70 bg-white/65 text-text-primary transition-colors hover:bg-white dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900"
              aria-label="Toggle announcements"
              aria-expanded={showAnnouncements}
              aria-controls="landing-announcements-panel"
              title="Announcements"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 z-10 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-700 px-1 text-[11px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </StarBorder>
            <ThemeToggle />
            <StarBorder as={motion.button}
              animated
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('login')}
              className="btn-outline px-5 py-2"
            >
              Login
            </StarBorder>
            <StarBorder as={motion.button}
              animated
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('signup')}
              className="btn-primary px-5 py-2"
            >
              Sign Up
            </StarBorder>
          </div>
        </div>

        {showAnnouncements && (
          <div
            id="landing-announcements-panel"
            className="saas-shell absolute left-0 right-0 top-full mt-2"
          >
            <div className="ml-auto w-full max-w-md rounded-2xl border border-ui-border/70 bg-white/95 p-5 shadow-premium dark:bg-slate-900/95">
              <div className="mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-brand-700 dark:text-brand-300" />
                <h3 className="mb-0 text-lg font-semibold text-text-primary dark:text-slate-100">Announcements</h3>
              </div>

              <div className="space-y-3">
                {announcements.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-ui-border/60 bg-slate-50/80 p-3 dark:bg-slate-800/60"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="mb-0 text-sm font-semibold text-text-primary dark:text-slate-100">{item.title}</p>
                      <span className="text-xs text-muted">{item.time}</span>
                    </div>
                    <p className="mb-0 text-sm text-muted">{item.message}</p>
                    {item.unread && (
                      <span className="mt-2 inline-block rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-800 dark:bg-brand-900/60 dark:text-brand-100">
                        New
                      </span>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="relative z-10">
        <section className="saas-shell py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary dark:text-slate-100">
                Create and Conduct <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Quizzes Easily</span>
              </h2>
              <p className="max-w-xl text-lg text-muted">
                Launch interactive quizzes with timers, leaderboards, and analytics — all in one modern dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <StarBorder as={motion.button}
                  animated
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('signup')}
                  className="btn-primary px-8 py-4 text-base"
                >
                  Start Quiz
                  <ArrowRight className="w-5 h-5" />
                </StarBorder>
                <StarBorder as={motion.button}
                  animated
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('login')}
                  className="btn-outline px-8 py-4 text-base"
                >
                  Teacher Login
                </StarBorder>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    className="saas-card saas-card-hover relative overflow-hidden flex flex-col gap-4"
                  >
                    {feature.image && (
                      <div className="pointer-events-none absolute inset-0">
                        <img
                          src={feature.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/55" />
                      </div>
                    )}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-emerald-500/20">
                      <Icon className={`h-6 w-6 ${feature.image ? 'text-cyan-300' : 'text-brand-500 dark:text-brand-300'}`} />
                    </div>
                    <div className="relative z-10">
                      <h3 className={`text-lg font-semibold ${feature.image ? 'text-white' : 'text-text-primary dark:text-slate-100'}`}>{feature.title}</h3>
                      <p className={`mt-1 text-sm ${feature.image ? 'text-slate-200' : 'text-muted'}`}>{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="saas-shell pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="saas-card p-6 md:p-8"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-text-primary dark:text-slate-100">Campus Highlights</h3>
              <p className="mt-1 text-sm text-muted">A glimpse of GLA student life and academic activities.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {campusImages.map((image, index) => (
                <div key={image.src} className="overflow-hidden rounded-xl border border-ui-border/70 bg-slate-100/60 dark:bg-slate-800/40">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-56 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = '/images/students.svg';
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="saas-shell max-w-6xl pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="saas-card relative overflow-hidden p-10"
          >
            <div className="pointer-events-none absolute inset-0">
              <img
                src="https://www.gla.ac.in/parc2024/assets/img/GLA-log%20(1).png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain p-6 opacity-80 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/30" />
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold text-white">Ready to level up your classroom?</h3>
              <p className="mt-2 text-slate-200">Join thousands of educators and students using GLA Exam for smarter quizzes.</p>
            </div>
            <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('signup')}
                className="btn-primary w-full sm:w-auto px-8 py-4"
              >
                Sign Up as Teacher
              </StarBorder>
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('signup')}
                className="btn-secondary w-full sm:w-auto px-8 py-4"
              >
                Sign Up as Student
              </StarBorder>
            </div>
          </motion.div>
        </section>

        <AchievementStats />

        <TestimonialsSection />
      </main>
      <Footer />
    </BackgroundImageLayout>
  );
};
