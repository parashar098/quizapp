import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, CheckCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../types/navigation';

interface SignupProps {
  onNavigate: (page: Page) => void;
}

export const Signup = ({ onNavigate }: SignupProps) => {
  const { signUp, user, profile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-redirect after successful signup
  useEffect(() => {
    if (user && profile && success) {
      console.log('[Signup] ✅ Redirecting to dashboard...');
    }
  }, [user, profile, success]);

  const validateForm = () => {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log('[Signup] 📝 Signup attempt:', { name, email, role });
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
          <h1 className="mb-2 text-4xl font-semibold text-white">Account Created!</h1>
          <p className="text-slate-300">Welcome, {user?.name}! Redirecting to your dashboard...</p>
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
                <p className="text-sm text-slate-400">Start taking exams immediately after registering</p>
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

      {/* RIGHT SIDE - Signup Form */}
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
            <h2 className="text-2xl font-semibold text-white">Create Account</h2>
            <p className="mt-2 text-sm text-slate-400">Join GLA Exam today</p>
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  placeholder="John Doe"
                  className={`w-full h-12 pl-11 pr-4 bg-slate-900 border rounded-lg outline-none transition-colors text-white placeholder:text-slate-500 ${
                    fieldErrors.name
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-slate-700 focus:border-blue-500 focus:bg-slate-800'
                  }`}
                  required
                  disabled={loading}
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

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
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
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
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  disabled={loading}
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
              {!fieldErrors.password && (
                <p className="mt-1 text-xs text-slate-400">Minimum 6 characters</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  disabled={loading}
                  className={`h-12 px-4 rounded-lg font-semibold transition-all border ${
                    role === 'teacher'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  disabled={loading}
                  className={`h-12 px-4 rounded-lg font-semibold transition-all border ${
                    role === 'student'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  Student
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              disabled={loading}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors disabled:opacity-50"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
