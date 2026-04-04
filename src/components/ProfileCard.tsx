import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit2, Upload } from 'lucide-react';
import UpdateProfileModal from './UpdateProfileModal';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePic?: string;
    createdAt?: string;
  };
  onProfileUpdate?: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function ProfileCard({ user, onProfileUpdate }: ProfileCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl p-8 text-text-primary dark:from-slate-800 dark:to-slate-900 dark:text-slate-100 overflow-hidden border border-brand-200 dark:border-slate-700"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500 opacity-5 rounded-full -mr-20 -mt-20"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center border border-brand-200 dark:bg-slate-700 dark:border-slate-600">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-brand-700 dark:text-brand-200">
                      {getInitials(user.name)}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 right-0 bg-white text-brand-600 p-2 rounded-xl shadow-soft hover:bg-brand-50 transition-colors dark:bg-slate-700 dark:text-brand-300"
                  onClick={() => setShowEditModal(true)}
                >
                  <Upload size={16} />
                </motion.button>
              </div>

              {/* Name and Title */}
              <div>
                <h2 className="text-2xl font-bold mb-1 text-text-primary dark:text-slate-100">{user.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 dark:bg-slate-700 dark:text-brand-300 rounded-full text-sm font-medium capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEditModal(true)}
              className={`p-3 rounded-full transition-all ${
                isHovering
                  ? 'bg-white text-brand-600 shadow-soft dark:bg-slate-700'
                  : 'bg-brand-100 text-brand-600 hover:bg-brand-200 dark:bg-slate-700 dark:text-brand-300'
              }`}
            >
              <Edit2 size={20} />
            </motion.button>
          </div>

          {/* Info Grid */}
          <div className="space-y-3 text-text-primary dark:text-slate-100">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted dark:text-slate-400">
                  Email
                </p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-brand-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted dark:text-slate-400">
                  Member Since
                </p>
                <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="mt-6 h-1 bg-gradient-to-r from-brand-500/30 to-transparent rounded-full dark:from-brand-300/20"></div>
        </div>
      </motion.div>

      {/* Update Profile Modal */}
      {showEditModal && (
        <UpdateProfileModal
          user={user}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onProfileUpdate?.();
          }}
        />
      )}
    </>
  );
}
