import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, CheckCircle, Eye, EyeOff, ShieldCheck, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../types/navigation';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

export const Login = ({ onNavigate }: LoginProps) => {
  const { signIn, user, profile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/api\/?$/, '');

  // Save remember me preference
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmailLogin');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const errors: typeof fieldErrors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  const handleGithubLogin = () => {
    setLoading(true);
    window.location.href = `${apiBaseUrl}/auth/github`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await signIn(email, password);

      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberEmailLogin', email);
      } else {
        localStorage.removeItem('rememberEmailLogin');
      }

      setSuccess(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0b1220] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h1 className="mb-2 text-4xl font-semibold text-white">Welcome Back!</h1>
          <p className="text-slate-300">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1220] flex flex-col lg:flex-row relative">
      {/* Back Button - Fixed Top Left */}
      <motion.button
        onClick={() => onNavigate('landing')}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 group inline-flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600 text-slate-300 hover:text-slate-100 text-xs sm:text-sm font-medium transition-all duration-200"
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ x: 0 }}
          whileHover={{ x: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.div>
        <span>Back to Home</span>
      </motion.button>

      {/* LEFT SIDE - Branding (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12"
      >
        <div className="max-w-md">
          {/* Official Logo & Branding */}
          <div className="mb-10 flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png"
              alt="GLA University logo"
              className="h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">GLA<br />Exam Portal</h1>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-12 font-medium">Secure, fast, and reliable online exam platform</p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/40">
                  <ShieldCheck className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Secure Authentication</h3>
                <p className="text-sm text-slate-400">Industry-standard encryption protects your data</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/40">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Instant Access</h3>
                <p className="text-sm text-slate-400">Start taking exams immediately after login</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/40">
                  <CheckCircle className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Verified Institution</h3>
                <p className="text-sm text-slate-400">Trusted by GLA University and 5,000+ users</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full lg:w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-12"
      >
        <div className="w-full max-w-sm">
          {/* Logo & Branding */}
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png"
              alt="GLA University logo"
              className="h-12 sm:h-14 mb-4 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1">GLA Exam Portal</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Official examination platform for GLA University students</p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mt-4" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-400">Sign in to access your exams and results</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="name@company.com"
                  className={`w-full h-12 pl-11 pr-4 bg-slate-900 border rounded-lg outline-none transition-colors text-white placeholder:text-slate-500 ${
                    fieldErrors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-slate-700 focus:border-blue-500 focus:bg-slate-800'
                  }`}
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('landing')}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                  }}
                  placeholder="••••••••"
                  className={`w-full h-12 pl-11 pr-11 bg-slate-900 border rounded-lg outline-none transition-colors text-white placeholder:text-slate-500 ${
                    fieldErrors.password
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-slate-700 focus:border-blue-500 focus:bg-slate-800'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 cursor-pointer accent-blue-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-300 cursor-pointer">
                Remember this device
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 disabled:opacity-60 text-white font-medium rounded-lg transition-colors mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Logging in
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs text-slate-500 font-medium">OR</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 border border-slate-700 rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-slate-200 text-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Redirecting...' : 'Continue with Google'}
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 border border-slate-700 rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-slate-200 text-sm font-medium"
            >
              <Github className="w-5 h-5" />
              {loading ? 'Redirecting...' : 'Continue with GitHub'}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create account
            </button>
          </p>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
              <ShieldCheck className="w-4 h-4" />
              Your data is securely encrypted
            </div>
            <p className="text-center text-xs text-slate-500">
              By signing in, you agree to our{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </button>
              {' '}and{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
