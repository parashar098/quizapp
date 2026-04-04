import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import StarBorder from './StarBorder';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from './ToastContainer';

interface LogoutButtonProps {
  variant?: 'default' | 'icon-only' | 'text-only' | 'compact';
  showIcon?: boolean;
  className?: string;
  onLogoutComplete?: () => void;
}

export const LogoutButton = ({
  variant = 'default',
  showIcon = true,
  className = '',
  onLogoutComplete,
}: LogoutButtonProps) => {
  const { profile, signOut } = useAuth();
  const { toasts, success, error: toastError, removeToast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      success('Logged out successfully ✅');

      // Ensure browser history cannot navigate to stale authenticated state.
      window.history.pushState(null, '', window.location.pathname);

      setShowConfirmation(false);
      setTimeout(() => {
        onLogoutComplete?.();
      }, 900);
    } catch (err) {
      console.error('Logout failed:', err);
      toastError('Logout failed. Please try again.');
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  // Icon-only button
  if (variant === 'icon-only') {
    return (
      <>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogoutClick}
          className={`p-2 text-gray-300 hover:text-red-400 transition-colors ${className}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </StarBorder>
        <LogoutConfirmModal
          isOpen={showConfirmation}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          isLoading={isLoggingOut}
          userName={profile?.name || 'User'}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Text-only button
  if (variant === 'text-only') {
    return (
      <>
        <StarBorder as={motion.button}
          whileHover={{ x: 5 }}
          onClick={handleLogoutClick}
          className={`text-sm text-gray-300 hover:text-red-400 font-medium transition-colors ${className}`}
        >
          Logout
        </StarBorder>
        <LogoutConfirmModal
          isOpen={showConfirmation}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          isLoading={isLoggingOut}
          userName={profile?.name || 'User'}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Compact button (for sidebars)
  if (variant === 'compact') {
    return (
      <>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogoutClick}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ${className}`}
        >
          {showIcon && <LogOut className="h-5 w-5" />}
          <span className="font-medium text-sm">Logout</span>
        </StarBorder>
        <LogoutConfirmModal
          isOpen={showConfirmation}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          isLoading={isLoggingOut}
          userName={profile?.name || 'User'}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Default button (full-featured)
  return (
    <>
      <StarBorder as={motion.button}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogoutClick}
        className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600/10 to-orange-600/10 hover:from-red-600/20 hover:to-orange-600/20 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 font-medium flex items-center gap-2 transition-all ${className}`}
      >
        {showIcon && <LogOut className="w-4 h-4" />}
        <span>Logout</span>
      </StarBorder>
      <LogoutConfirmModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        isLoading={isLoggingOut}
        userName={profile?.name || 'User'}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};
