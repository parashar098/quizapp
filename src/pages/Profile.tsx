import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, UserCheck, Calendar, LogOut, ArrowLeft } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface ProfileProps {
  onNavigate: (page: Page) => void;
}

export const Profile = ({ onNavigate }: ProfileProps) => {
  const { profile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      onNavigate('dashboard');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <BackgroundImageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="saas-card text-text-primary dark:text-slate-100">Loading profile...</div>
        </div>
      </BackgroundImageLayout>
    );
  }

  const joinDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BackgroundImageLayout fixedImage>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-ui-border/70 bg-white/35 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-950/35">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 via-slate-700 to-blue-600">
                <span className="text-white font-bold">Q</span>
              </div>
              <h1 className="text-xl font-bold text-text-primary dark:text-slate-100">GLA Exam</h1>
            </div>
            <StarBorder as="button"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-sm text-muted transition hover:text-text-primary dark:hover:text-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </StarBorder>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="saas-card overflow-hidden p-0 shadow-premium">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600" />

              {/* Profile Info */}
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 relative z-10 mb-8">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-white/30 bg-gradient-to-br from-slate-900 via-slate-700 to-blue-600 shadow-xl">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-3xl font-bold text-text-primary dark:text-slate-100">{profile.name}</h2>
                    <p className="text-lg capitalize text-muted">
                      {profile.role === 'teacher' ? '👨‍🏫 Educator' : '👨‍🎓 Student'}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="saas-card saas-card-hover border-ui-border/80 bg-white/55 p-6 dark:bg-slate-900/55"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-text-primary dark:text-slate-100">Email</h3>
                    </div>
                    <p className="break-all text-sm text-muted">{profile.email}</p>
                  </motion.div>

                  {/* Role */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="saas-card saas-card-hover border-ui-border/80 bg-white/55 p-6 dark:bg-slate-900/55"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-500/15 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="font-semibold text-text-primary dark:text-slate-100">Account Type</h3>
                    </div>
                    <p className="capitalize text-muted">{profile.role}</p>
                  </motion.div>

                  {/* User ID */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="saas-card saas-card-hover border-ui-border/80 bg-white/55 p-6 dark:bg-slate-900/55"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <span className="text-blue-700 font-bold text-sm">ID</span>
                      </div>
                      <h3 className="font-semibold text-text-primary dark:text-slate-100">User ID</h3>
                    </div>
                    <p className="break-all font-mono text-xs text-muted">{profile.id}</p>
                  </motion.div>

                  {/* Join Date */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="saas-card saas-card-hover border-ui-border/80 bg-white/55 p-6 dark:bg-slate-900/55"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="font-semibold text-text-primary dark:text-slate-100">Joined</h3>
                    </div>
                    <p className="text-muted">{joinDate}</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 p-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <p className="text-emerald-700 dark:text-emerald-300">✅ Account Active</p>
              </div>
            </motion.div>

            {/* Logout Button */}
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="w-5 h-5" />
              {loading ? 'Logging out...' : 'Logout'}
            </StarBorder>
          </motion.div>
        </main>
      </div>

      <Footer />
    </BackgroundImageLayout>
  );
};
