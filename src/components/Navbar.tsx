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
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 backdrop-blur-sm'
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
                      ? 'text-white'
                      : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
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
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                />
              )}
            </StarBorder>

            {/* Dark Mode Toggle */}
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
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
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {profile?.name?.split(' ')[0] || 'User'}
                  </span>
                  <motion.div
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-sm font-semibold text-gray-200">
                          {profile?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <motion.p
                          className="text-xs text-purple-400 capitalize mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {user.role}
                        </motion.p>
                      </div>

                      <StarBorder as={motion.button}
                        whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                        onClick={handleProfileClick}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </StarBorder>

                      <StarBorder as={motion.button}
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors border-t border-white/10"
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
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
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
              className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-sm"
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
                          ? 'bg-purple-500/20 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
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
                    className="border-t border-white/10 mt-4 pt-4"
                  >
                    <StarBorder as="button"
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all rounded-lg flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </StarBorder>
                    <StarBorder as="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-lg flex items-center gap-2 mt-2"
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
                    className="border-t border-white/10 mt-4 pt-4 space-y-2"
                  >
                    <StarBorder as="button"
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </StarBorder>
                    <StarBorder as="button"
                      onClick={() => {
                        onNavigate('signup');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-purple-500 text-purple-400 font-medium hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
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
          className="fixed inset-0 md:hidden bg-black/20 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;
