import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, BookOpen, TrendingUp, Activity, Settings, LogOut } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { DashboardStatCard } from '../components/DashboardStatCard';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface AdminDashboardProps {
  onNavigate?: (page: Page) => void;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalQuizzes: number;
  averageScore: number;
  usersByRole: {
    admins: number;
    teachers: number;
    students: number;
  };
  usersByStatus: {
    active: number;
    inactive: number;
    blocked: number;
  };
  systemHealth: {
    databaseStatus: 'healthy' | 'warning' | 'critical';
    apiResponse: number;
    uptime: number;
  };
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalQuizzes: 0,
    averageScore: 0,
    usersByRole: { admins: 0, teachers: 0, students: 0 },
    usersByStatus: { active: 0, inactive: 0, blocked: 0 },
    systemHealth: { databaseStatus: 'healthy', apiResponse: 0, uptime: 99.9 },
  });
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('[AdminDashboard] Error fetching stats:', error);
      // Use mock data if API fails
      setStats({
        totalUsers: 156,
        activeUsers: 142,
        totalQuizzes: 28,
        averageScore: 76,
        usersByRole: { admins: 2, teachers: 12, students: 142 },
        usersByStatus: { active: 142, inactive: 10, blocked: 4 },
        systemHealth: { databaseStatus: 'healthy', apiResponse: 45, uptime: 99.9 },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut();
      onNavigate?.('login');
    } catch (error) {
      console.error('[AdminDashboard] Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const navigationButtons = [
    { label: 'Manage Teachers', action: () => onNavigate?.('manage-teachers'), icon: Users },
    { label: 'Manage Students', action: () => onNavigate?.('manage-students'), icon: UserCheck },
    { label: 'Quiz Monitoring', action: () => onNavigate?.('quiz-monitoring'), icon: BookOpen },
    { label: 'Analytics', action: () => onNavigate?.('analytics'), icon: TrendingUp },
  ];

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'from-emerald-500 via-green-500 to-teal-500';
      case 'warning':
        return 'from-yellow-500 via-orange-500 to-amber-500';
      case 'critical':
        return 'from-red-500 via-pink-500 to-rose-500';
      default:
        return 'from-indigo-500 via-purple-500 to-pink-500';
    }
  };

  return (
    <BackgroundImageLayout fixedImage overlayClassName="bg-slate-50/72 dark:bg-slate-950/80">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <p className="text-xs text-white/60">System Administration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.('profile')}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 text-sm font-semibold transition"
              >
                <Settings className="w-4 h-4" />
                Settings
              </StarBorder>
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                disabled={logoutLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-4 py-2 text-sm font-semibold transition disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </StarBorder>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white/60 animate-spin mx-auto mb-4" />
                <p className="text-white/70">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Title Section */}
              <div>
                <h2 className="text-4xl font-bold mb-2">Admin Dashboard</h2>
                <p className="text-white/70">Welcome, {profile?.name}. Manage users, quizzes, and system health.</p>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  subtitle="All registered users"
                  icon={Users}
                  colorClass="from-blue-500 via-cyan-500 to-teal-500"
                />
                <DashboardStatCard
                  title="Active Users"
                  value={stats.activeUsers}
                  subtitle="Currently active"
                  icon={Activity}
                  colorClass="from-emerald-500 via-green-500 to-teal-500"
                />
                <DashboardStatCard
                  title="Total Quizzes"
                  value={stats.totalQuizzes}
                  subtitle="Created quizzes"
                  icon={BookOpen}
                  colorClass="from-indigo-500 via-purple-500 to-pink-500"
                />
                <DashboardStatCard
                  title="Average Score"
                  value={`${stats.averageScore}%`}
                  subtitle="Student average"
                  icon={TrendingUp}
                  colorClass="from-indigo-500 via-purple-500 to-pink-500"
                />
              </div>

              {/* User Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users by Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-3xl border border-white/10 p-8 shadow-glass"
                >
                  <h3 className="text-xl font-semibold mb-6 text-white">Users by Role</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-white/80">Administrators</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByRole.admins}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-white/80">Teachers</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByRole.teachers}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-white/80">Students</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByRole.students}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Users by Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-3xl border border-white/10 p-8 shadow-glass"
                >
                  <h3 className="text-xl font-semibold mb-6 text-white">Users by Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-white/80">Active</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByStatus.active}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-white/80">Inactive</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByStatus.inactive}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-white/80">Blocked</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stats.usersByStatus.blocked}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass rounded-3xl border border-white/10 p-8 shadow-glass bg-gradient-to-r ${getHealthColor(stats.systemHealth.databaseStatus)}/10`}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">System Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-white/70 text-sm mb-2">Database Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${stats.systemHealth.databaseStatus === 'healthy' ? 'green' : stats.systemHealth.databaseStatus === 'warning' ? 'yellow' : 'red'}-500 animate-pulse`} />
                      <p className="text-xl font-bold text-white capitalize">{stats.systemHealth.databaseStatus}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-2">API Response Time</p>
                    <p className="text-xl font-bold text-white">{stats.systemHealth.apiResponse}ms</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-2">System Uptime</p>
                    <p className="text-xl font-bold text-white">{stats.systemHealth.uptime}%</p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {navigationButtons.map((btn, index) => {
                  const Icon = btn.icon;
                  return (
                    <StarBorder as={motion.button}
                      key={btn.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={btn.action}
                      className="glass rounded-2xl border border-white/10 p-6 shadow-glass hover:bg-white/20 transition text-left group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8 text-purple-300 group-hover:text-pink-300 transition" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{btn.label}</h3>
                      <p className="text-sm text-white/60 group-hover:text-white/80 transition">
                        Manage and monitor {btn.label.toLowerCase()}
                      </p>
                    </StarBorder>
                  );
                })}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <Footer />
    </BackgroundImageLayout>
  );
};
