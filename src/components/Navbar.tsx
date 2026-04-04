import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  Home,
  BookOpen,
  Trophy,
  Mail,
  LogIn,
  UserPlus,
  PlusCircle,
  LayoutDashboard,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBorder from './StarBorder';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';
import type { Page } from '../types/navigation';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

interface NavLink {
  label: string;
  page: Page;
  icon?: React.ReactNode;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled((prev) => {
          const next = window.scrollY > 10;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getNavLinks = useCallback((): NavLink[] => {
    if (!user) {
      return [
        { label: 'Home', page: 'landing', icon: <Home className="w-4 h-4" /> },
        { label: 'Features', page: 'landing', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Join Quiz', page: 'landing', icon: <PlusCircle className="w-4 h-4" /> },
        { label: 'Leaderboard', page: 'landing', icon: <Trophy className="w-4 h-4" /> },
        { label: 'Contact', page: 'landing', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'teacher') {
      return [
        { label: 'Dashboard', page: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'My Quizzes', page: 'quizzes', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Analytics', page: 'analytics', icon: <Settings className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'student') {
      return [
        { label: 'Join Quiz', page: 'students', icon: <PlusCircle className="w-4 h-4" /> },
        { label: 'My Quizzes', page: 'quizzes', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Leaderboard', page: 'landing', icon: <Trophy className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'admin') {
      return [
        { label: 'Dashboard', page: 'admin-dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'Manage Teachers', page: 'manage-teachers', icon: <User className="w-4 h-4" /> },
        { label: 'Manage Students', page: 'manage-students', icon: <User className="w-4 h-4" /> },
        { label: 'Analytics', page: 'analytics', icon: <Settings className="w-4 h-4" /> },
      ];
    }

    return [];
  }, [user]);

  const navLinks = useMemo(() => getNavLinks(), [getNavLinks]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      onNavigate('login');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('[Navbar] Logout error:', error);
    }
  }, [onNavigate, signOut]);

  const handleNavClick = useCallback((page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  }, [onNavigate]);

  const handleProfileClick = useCallback(() => {
    onNavigate('profile');
    setIsUserMenuOpen(false);
  }, [onNavigate]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-sm border-b border-ui-border shadow-soft dark:bg-slate-950/92 dark:border-slate-800/60'
          : 'bg-white/86 backdrop-blur-sm border-b border-ui-border/80 dark:bg-slate-950/86 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            onClick={() => onNavigate('landing')}
            className="cursor-pointer"
          >
            <Logo size="md" showText={true} animated={true} />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.page}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <StarBorder as="button"
                  onClick={() => handleNavClick(link.page)}
                  className={`relative text-sm font-medium group transition-colors ${
                    currentPage === link.page
                      ? 'text-brand-600'
                      : 'text-text-secondary hover:text-text-primary dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-brand-500 transition-all duration-300 ${
                      currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </StarBorder>
              </motion.div>
            ))}
          </div>

          {/* Right Side Icons and Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-lg p-2 text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-1 right-1 w-2 h-2 bg-ui-error rounded-full"
                />
              )}
            </StarBorder>

            {/* Dark Mode Toggle */}
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-lg p-2 text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </StarBorder>

            {/* User Menu Dropdown */}
            {user && (
              <div className="relative">
                <StarBorder as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-ui-border bg-white hover:bg-slate-50 transition-all dark:border-slate-700/70 dark:bg-slate-900/80 dark:hover:bg-slate-800"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                    <User className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                  </div>
                  <span className="text-sm font-medium text-text-primary dark:text-slate-100">
                    {profile?.name?.split(' ')[0] || 'User'}
                  </span>
                  <motion.div
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </motion.div>
                </StarBorder>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white backdrop-blur-sm border border-ui-border shadow-soft overflow-hidden dark:bg-slate-900 dark:border-slate-700"
                    >
                      <div className="p-4 border-b border-ui-border dark:border-slate-700">
                        <p className="text-sm font-semibold text-text-primary dark:text-slate-100">
                          {profile?.name || 'User'}
                        </p>
                        <p className="text-xs text-muted">{user.email}</p>
                        <motion.p
                          className="text-xs text-brand-600 capitalize mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {user.role}
                        </motion.p>
                      </div>

                      <StarBorder as={motion.button}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                        onClick={handleProfileClick}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors dark:text-slate-300 dark:hover:text-white"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </StarBorder>

                      <StarBorder as={motion.button}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                        onClick={() => {
                          onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors dark:text-slate-300 dark:hover:text-white"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </StarBorder>

                      <StarBorder as={motion.button}
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-secondary hover:text-ui-error transition-colors border-t border-ui-border dark:border-slate-700 dark:text-slate-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </StarBorder>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg p-2 text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </StarBorder>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-ui-border bg-white/95 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <StarBorder as="button"
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        currentPage === link.page
                          ? 'bg-brand-500/12 text-brand-700 dark:text-brand-300'
                          : 'text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </StarBorder>
                  </motion.div>
                ))}

                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="border-t border-ui-border mt-4 pt-4 dark:border-slate-700"
                  >
                    <StarBorder as="button"
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-all rounded-lg flex items-center gap-2 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </StarBorder>
                    <StarBorder as="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-text-secondary hover:text-ui-error hover:bg-red-50 transition-all rounded-lg flex items-center gap-2 mt-2 dark:text-slate-300 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </StarBorder>
                  </motion.div>
                )}

                {!user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="border-t border-ui-border mt-4 pt-4 space-y-2 dark:border-slate-700"
                  >
                    <StarBorder as="button"
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </StarBorder>
                    <StarBorder as="button"
                      onClick={() => {
                        onNavigate('signup');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-ui-border text-text-primary font-medium hover:bg-slate-100 transition-all flex items-center justify-center gap-2 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </StarBorder>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Close mobile menu when clicking outside */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 md:hidden bg-slate-900/20 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;
