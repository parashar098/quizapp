import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Bell,
  Moon,
  Lock,
  Trash2,
  AlertCircle,
  Check,
} from 'lucide-react';
import { userAPI } from '../lib/api';

interface SettingsPageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onLogout: () => void;
}

const TABS = [
  { id: 'profile', label: 'Profile', icon: Settings },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
];

export default function SettingsPage({ user, onLogout }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const [deletePassword, setDeletePassword] = useState('');

  // Handle Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await userAPI.updateProfile({
        name: profileForm.name,
        email: profileForm.email,
      });
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await userAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });
      setSuccess('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  // Handle Preferences Update
  const handlePreferencesUpdate = async (field: string, value: boolean) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData: any = {};
      updateData[field] = value;
      await userAPI.updatePreferences(updateData);
      setPreferences((prev) => ({
        ...prev,
        [field]: value,
      }));
      setSuccess('Preferences updated!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await userAPI.deleteAccount(deletePassword);
      setSuccess('Account deleted. Logging out...');
      setTimeout(() => {
        onLogout();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary dark:text-slate-100 mb-2">Settings</h1>
          <p className="text-text-secondary dark:text-slate-300">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError('');
                  setSuccess('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-white text-text-primary dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-8 border border-slate-200 dark:border-slate-700"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100">Profile Settings</h2>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-slate-100 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={loading}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 disabled:bg-slate-100 dark:disabled:bg-slate-700 dark:bg-slate-700 dark:text-slate-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-slate-100 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={loading}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 disabled:bg-slate-100 dark:disabled:bg-slate-700 dark:bg-slate-700 dark:text-slate-100"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                    <Check size={18} />
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 dark:bg-brand-600 dark:hover:bg-brand-700"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100">Account Settings</h2>

              <div className="space-y-4">
                {/* Change Password */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100 mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-slate-100 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        disabled={loading}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 disabled:bg-slate-100 dark:disabled:bg-slate-700 dark:bg-slate-700 dark:text-slate-100"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-slate-100 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        disabled={loading}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 disabled:bg-slate-100 dark:disabled:bg-slate-700 dark:bg-slate-700 dark:text-slate-100"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-slate-100 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        disabled={loading}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 disabled:bg-slate-100 dark:disabled:bg-slate-700 dark:bg-slate-700 dark:text-slate-100"
                        placeholder="Confirm new password"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                        <Check size={18} />
                        {success}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100">Preferences</h2>

              <div className="space-y-4">
                {/* Dark Mode */}
                <motion.div
                  whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
                  onClick={() => handlePreferencesUpdate('darkMode', !preferences.darkMode)}
                >
                  <div className="flex items-center gap-3">
                    <Moon size={20} className="text-brand-600 dark:text-brand-400" />
                    <div>
                      <p className="font-medium text-text-primary dark:text-slate-100">Dark Mode</p>
                      <p className="text-sm text-text-secondary dark:text-slate-400">
                        Enable dark theme for the dashboard
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.darkMode ? 'bg-brand-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white transition-transform ${
                        preferences.darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                  whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
                  onClick={() =>
                    handlePreferencesUpdate('notifications', !preferences.notifications)
                  }
                >
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-brand-600 dark:text-brand-400" />
                    <div>
                      <p className="font-medium text-text-primary dark:text-slate-100">Notifications</p>
                      <p className="text-sm text-text-secondary dark:text-slate-400">
                        Receive updates about quiz results and new quizzes
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.notifications ? 'bg-brand-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white dark:bg-slate-200 transition-transform ${
                        preferences.notifications
                          ? 'translate-x-6'
                          : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100">Security</h2>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md mx-4 p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Delete Account?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      This action is permanent. Enter your password to confirm.
                    </p>

                    <form onSubmit={handleDeleteAccount} className="space-y-4">
                      <input
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        disabled={loading}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                      />

                      {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
                          {success}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={loading}
                          className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-text-primary dark:text-slate-100 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || !deletePassword}
                          className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Deleting...' : 'Delete Account'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
