import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, ArrowRight, Bell, Megaphone, Menu, X, MapPin, CalendarDays, BadgeCheck, UsersRound } from 'lucide-react';
import { AchievementStats } from '../components/AchievementStats';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { Footer } from '../components/Footer';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ThemeToggle } from '../components/ThemeToggle';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface LandingProps {
  onNavigate: (page: Page) => void;
}
export const Landing = ({ onNavigate }: LandingProps) => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [eventFilter, setEventFilter] = useState<'All' | 'Events' | 'Workshops' | 'Placements'>('All');

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

  const campusEvents = [
    {
      category: 'Workshops' as const,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZpx9LLCznC_ovI_AkmaUNHP5SnUyBEWRUrQ&s',
      alt: 'GLA students in classroom session',
      title: 'Industry Visit - Microsoft Office',
      description: 'Students participated in real-world industry exposure programs and expert-led mentorship sessions.',
      location: 'GLA Campus',
      date: 'March 2026',
      participants: '120 Participants',
    },
    {
      category: 'Events' as const,
      src: 'https://www.gla.ac.in/images/gl-ev-6.webp',
      alt: 'GLA ceremony and student event',
      title: 'Hackathon 2026 - 300+ Participants',
      description: 'Cross-disciplinary teams built production-ready prototypes across AI, web, and cybersecurity tracks.',
      location: 'GLA Innovation Arena',
      date: 'April 2026',
      participants: '312 Participants',
    },
    {
      category: 'Placements' as const,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32IBYuo5QV1R7tsLgY8U2i9nbvQ2R7we3aA&s',
      alt: 'GLA students in guided learning activity',
      title: 'Annual Fest - Tech and Cultural Events',
      description: 'Students showcased projects, leadership, and collaboration through curated campus-wide experiences.',
      location: 'GLA Main Quadrangle',
      date: 'February 2026',
      participants: '540 Participants',
    },
  ];

  const eventFilters: Array<'All' | 'Events' | 'Workshops' | 'Placements'> = ['All', 'Events', 'Workshops', 'Placements'];

  const filteredEvents =
    eventFilter === 'All' ? campusEvents : campusEvents.filter((event) => event.category === eventFilter);

  return (
    <BackgroundImageLayout>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="flex min-w-0 flex-shrink-0 items-center gap-3 text-left"
              aria-label="Go to home"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white p-1.5 shadow-soft">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png"
                  alt="GLA University logo"
                  className="h-full w-full rounded-xl object-contain"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight text-white">GLA Exam</h1>
                <p className="truncate text-sm text-slate-300">Modern quiz platform for teachers and students</p>
              </div>
            </button>

            <div className="ml-auto hidden flex-1 items-center justify-end gap-3 md:flex">
              <div className="hidden items-center gap-1 lg:flex">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('landing-features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Features
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('landing-stats')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Metrics
                </button>
              </div>

              <StarBorder as="button"
                type="button"
                onClick={() => setShowAnnouncements((prev) => !prev)}
                style={{ overflow: 'visible' }}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-slate-900/70 text-slate-100 transition-colors hover:bg-slate-800"
                aria-label="Toggle announcements"
                aria-expanded={showAnnouncements}
                aria-controls="landing-announcements-panel"
                title="Announcements"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 z-10 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </StarBorder>

              <ThemeToggle />

              <StarBorder as={motion.button}
                animated
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('login')}
                className="btn-outline px-6 py-2.5"
              >
                Login
              </StarBorder>

              <StarBorder as={motion.button}
                animated
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('signup')}
                className="btn-primary px-6 py-2.5"
              >
                Sign Up
              </StarBorder>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-slate-900/70 text-slate-100 md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={showMobileMenu}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {showMobileMenu && (
            <div className="mt-4 space-y-2 rounded-2xl border border-white/15 bg-slate-900/90 p-3 md:hidden">
              <button
                type="button"
                onClick={() => {
                  setShowAnnouncements((prev) => !prev);
                  setShowMobileMenu(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100"
              >
                <span>Announcements</span>
                {unreadCount > 0 && (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-700 px-1 text-[11px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                <span className="text-sm font-medium text-slate-100">Theme</span>
                <ThemeToggle />
              </div>

              <button
                type="button"
                onClick={() => {
                  onNavigate('login');
                  setShowMobileMenu(false);
                }}
                className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-slate-100"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('signup');
                  setShowMobileMenu(false);
                }}
                className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {showAnnouncements && (
          <div
            id="landing-announcements-panel"
            className="w-full px-4 pb-4 sm:px-6 lg:px-8"
          >
            <div className="ml-auto w-full max-w-md rounded-2xl border border-white/15 bg-slate-900/95 p-5 shadow-premium">
              <div className="mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-brand-300" />
                <h3 className="mb-0 text-lg font-semibold text-slate-100">Announcements</h3>
              </div>

              <div className="space-y-3">
                {announcements.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-slate-800/70 p-3"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="mb-0 text-sm font-semibold text-slate-100">{item.title}</p>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                    <p className="mb-0 text-sm text-slate-300">{item.message}</p>
                    {item.unread && (
                      <span className="mt-2 inline-block rounded-full bg-brand-900/70 px-2 py-0.5 text-[11px] font-semibold text-brand-100">
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
        <section id="landing-features" className="saas-shell py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary dark:text-slate-100">
                Create and Conduct <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 bg-clip-text text-transparent">Quizzes Easily</span>
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
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900/10 to-blue-500/15">
                      <Icon className={`h-6 w-6 ${feature.image ? 'text-blue-200' : 'text-brand-500 dark:text-brand-300'}`} />
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

        <section className="saas-shell py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border p-6 md:p-8"
            style={{
              backgroundColor: '#0f172a',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="mb-8 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                Live Moments
              </span>
              <h3 className="mt-4 text-3xl font-bold text-white">Real Campus Experiences</h3>
              <p className="mt-2 text-sm text-slate-300">Verified events and activities from our campus</p>
            </div>

            <div className="mb-7 flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {eventFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setEventFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    eventFilter === filter
                      ? 'border-blue-400/50 bg-blue-500/20 text-blue-100'
                      : 'border-white/15 bg-slate-900/40 text-slate-300 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event.src}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="group overflow-hidden rounded-2xl border shadow-xl"
                  style={{
                    backgroundColor: '#111827',
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 10px 25px rgba(2, 6, 23, 0.35)',
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.src}
                      alt={event.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(imageEvent) => {
                        imageEvent.currentTarget.src = '/images/students.svg';
                      }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 backdrop-blur-[1.5px]" />

                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-[11px] font-semibold text-emerald-200">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified
                      </span>
                      <span className="rounded-full border border-purple-400/30 bg-purple-500/15 px-2 py-1 text-[11px] font-semibold text-purple-200">
                        Official Event
                      </span>
                    </div>

                    <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-slate-900/75 px-3 py-1 text-xs font-medium text-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View Event {'->'}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-xl font-bold text-white">{event.title}</h4>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">{event.description}</p>

                    <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-300" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-blue-300" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersRound className="h-3.5 w-3.5 text-blue-300" />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-xs text-slate-500">Uploaded by Admin</span>
                      <button
                        type="button"
                        className="text-xs font-semibold text-blue-300 transition-colors hover:text-blue-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/20"
              >
                Explore All Events
                <ArrowRight className="h-4 w-4" />
              </button>
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

        <div id="landing-stats">
          <AchievementStats />
        </div>

        <TestimonialsSection />
      </main>
      <Footer />
    </BackgroundImageLayout>
  );
};
