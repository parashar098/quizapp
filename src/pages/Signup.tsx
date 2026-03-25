import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface SignupProps {
  onNavigate: (page: Page) => void;
}

export const Signup = ({ onNavigate }: SignupProps) => {
  const { signUp, user, profile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-redirect after successful signup
  useEffect(() => {
    if (user && profile && success) {
      console.log('[Signup] ✅ Redirecting to dashboard...');
    }
  }, [user, profile, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('[Signup] 📝 Signup attempt:', { name, email, role });

      if (!name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      console.log('[Signup] 📤 Sending to backend...');
      await signUp(email, password, name, role);

      console.log('[Signup] ✅ Success! Setting success flag...');
      setSuccess(true);
    } catch (err: any) {
      console.error('[Signup] ❌ Error:', err);

      let errorMessage = 'An error occurred during signup';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      console.error('[Signup] Final message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show success message while redirecting
  if (success && user && profile) {
    return (
      <BackgroundImageLayout>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 p-6">
              <UserPlus className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Account Created!</h2>
            <p className="mb-4 text-muted">Welcome, {user.name}!</p>
            <p className="text-sm text-muted">Redirecting to {user.role === 'teacher' ? 'Teacher' : 'Student'} Dashboard...</p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-3 w-3 animate-bounce rounded-full bg-brand-500" />
              <div className="h-3 w-3 animate-bounce rounded-full bg-brand-500" style={{animationDelay: '0.2s'}} />
              <div className="h-3 w-3 animate-bounce rounded-full bg-brand-500" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
        </div>
      </BackgroundImageLayout>
    );
  }

  return (
    <BackgroundImageLayout>
      <div className="saas-shell relative z-20 flex justify-end pt-6">
        <ThemeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md saas-card shadow-premium"
        >
          <div className="px-8 py-10">
            <StarBorder as="button"
              onClick={() => onNavigate('landing')}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-muted transition hover:text-text-primary dark:hover:text-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </StarBorder>

            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="mt-2 text-sm text-muted">Join GLA Exam today</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex gap-3 rounded-xl border border-ui-error/35 bg-ui-error/10 px-4 py-3 text-ui-error"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Signup Failed</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-modern pl-11"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern pl-11"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-modern pl-11"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>
                <p className="mt-1 text-xs text-muted">Minimum 6 characters</p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-muted">I am a</label>
                <div className="grid grid-cols-2 gap-4">
                  <StarBorder as={motion.button}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('teacher')}
                    disabled={loading}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      role === 'teacher'
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-slate-200/80 text-text-secondary hover:bg-slate-300/90 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/90'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Teacher
                  </StarBorder>
                  <StarBorder as={motion.button}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('student')}
                    disabled={loading}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      role === 'student'
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-slate-200/80 text-text-secondary hover:bg-slate-300/90 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/90'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Student
                  </StarBorder>
                </div>
              </div>

              <StarBorder as={motion.button}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </StarBorder>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              Already have an account?{' '}
              <StarBorder as="button"
                onClick={() => onNavigate('login')}
                disabled={loading}
                className="font-semibold text-brand-600 hover:underline disabled:opacity-50 dark:text-brand-300"
              >
                Login
              </StarBorder>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </BackgroundImageLayout>
  );
};
