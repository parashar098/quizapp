import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

export const Login = ({ onNavigate }: LoginProps) => {
  const { signIn, user, profile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && profile && success) {
      console.log('[Login] ✅ User logged in, user/profile set:', { user, profile });
      const delay = setTimeout(() => {
        console.log('[Login] ✅ Navigating to dashboard after 1s delay...');
        // App.tsx will automatically show dashboard since user && profile are set
      }, 100);
      return () => clearTimeout(delay);
    }
  }, [user, profile, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('[Login] 📝 Login attempt:', { email });

    try {
      await signIn(email, password);
      setSuccess(true);
      console.log('[Login] ✅ Login successful!');
    } catch (err: any) {
      let errorMessage = 'Invalid email or password';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
      console.error('[Login] ❌ Login error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <BackgroundImageLayout>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="mb-2 text-4xl font-bold">Welcome Back!</h1>
            <p className="mb-8 text-lg text-muted">Redirecting to your dashboard...</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto h-12 w-12 rounded-full border-4 border-slate-300/60 border-t-brand-500 dark:border-slate-600 dark:border-t-brand-300"
            />
          </motion.div>
        </div>

        <Footer />
      </BackgroundImageLayout>
    );
  }

  return (
    <BackgroundImageLayout>
      <div className="saas-shell relative z-20 pt-6 flex justify-end">
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
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="mt-2 text-sm text-muted">Login to your GLA Exam account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl border border-ui-error/35 bg-ui-error/10 px-4 py-3 text-sm text-ui-error"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern pl-11"
                    placeholder="you@example.com"
                    required
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
                  />
                </div>
              </div>

              <StarBorder as={motion.button}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Logging in…' : 'Login'}
              </StarBorder>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              Don&apos;t have an account?{' '}
              <StarBorder as="button"
                onClick={() => onNavigate('signup')}
                className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
              >
                Sign up
              </StarBorder>
            </p>
          </div>
      </motion.div>
      </div>

      <Footer />
    </BackgroundImageLayout>
  );
};
