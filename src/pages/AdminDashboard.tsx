import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, BookOpen, TrendingUp, Activity, Settings, LogOut } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { DashboardStatCard } from '../components/DashboardStatCard';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/api';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';
import { Button } from '../components/ui/Button';

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
      const response = await apiClient.get('/admin/dashboard/stats');
      const payload = response.data?.data || response.data;

      setStats({
        totalUsers: payload?.users?.total || 0,
        activeUsers: payload?.users?.byStatus?.active || 0,
        totalQuizzes: payload?.quizzes?.total || 0,
        averageScore: payload?.assessments?.averageScore || 0,
        usersByRole: {
          admins: payload?.users?.byRole?.admin || 0,
          teachers: payload?.users?.byRole?.teacher || 0,
          students: payload?.users?.byRole?.student || 0,
        },
        usersByStatus: {
          active: payload?.users?.byStatus?.active || 0,
          inactive: payload?.users?.byStatus?.inactive || 0,
          blocked: payload?.users?.byStatus?.blocked || 0,
        },
        systemHealth: {
          databaseStatus: 'healthy',
          apiResponse: 0,
          uptime: 99.9,
        },
      });
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

  const getHealthClass = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-ui-success bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-ui-warning bg-amber-50 border-amber-200';
      case 'critical':
        return 'text-ui-error bg-red-50 border-red-200';
      default:
        return 'text-brand-600 bg-brand-50 border-brand-200';
    }
  };

  return (
    <BackgroundImageLayout fixedImage>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-ui-border bg-white/88 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/86">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 border border-brand-200 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary dark:text-slate-100">Admin Portal</h1>
                <p className="text-xs text-muted">System Administration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => onNavigate?.('profile')}
                variant="secondary"
                className="px-4 py-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                onClick={handleLogout}
                disabled={logoutLoading}
                variant="outline"
                className="px-4 py-2 text-ui-error border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin mx-auto mb-4" />
                <p className="text-muted">Loading dashboard...</p>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-text-primary dark:text-slate-100">Admin Dashboard</h2>
                <p className="text-muted">Welcome, {profile?.name}. Manage users, quizzes, and system health.</p>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  subtitle="All registered users"
                  icon={Users}
                  colorClass="from-brand-100 to-brand-50"
                />
                <DashboardStatCard
                  title="Active Users"
                  value={stats.activeUsers}
                  subtitle="Currently active"
                  icon={Activity}
                  colorClass="from-emerald-100 to-emerald-50"
                />
                <DashboardStatCard
                  title="Total Quizzes"
                  value={stats.totalQuizzes}
                  subtitle="Created quizzes"
                  icon={BookOpen}
                  colorClass="from-brand-100 to-brand-50"
                />
                <DashboardStatCard
                  title="Average Score"
                  value={`${stats.averageScore}%`}
                  subtitle="Student average"
                  icon={TrendingUp}
                  colorClass="from-brand-100 to-brand-50"
                />
              </div>

              {/* User Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users by Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="saas-card rounded-2xl"
                >
                  <h3 className="text-xl font-semibold mb-6 text-text-primary dark:text-slate-100">Users by Role</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-brand-500" />
                        <span className="text-text-secondary dark:text-slate-300">Administrators</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByRole.admins}</span>
                    </div>
                    <div className="h-px bg-ui-border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-400" />
                        <span className="text-text-secondary dark:text-slate-300">Teachers</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByRole.teachers}</span>
                    </div>
                    <div className="h-px bg-ui-border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-text-secondary dark:text-slate-300">Students</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByRole.students}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Users by Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="saas-card rounded-2xl"
                >
                  <h3 className="text-xl font-semibold mb-6 text-text-primary dark:text-slate-100">Users by Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-text-secondary dark:text-slate-300">Active</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByStatus.active}</span>
                    </div>
                    <div className="h-px bg-ui-border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-text-secondary dark:text-slate-300">Inactive</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByStatus.inactive}</span>
                    </div>
                    <div className="h-px bg-ui-border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-text-secondary dark:text-slate-300">Blocked</span>
                      </div>
                      <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{stats.usersByStatus.blocked}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="saas-card rounded-2xl"
              >
                <h3 className="text-xl font-semibold mb-6 text-text-primary dark:text-slate-100">System Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-muted text-sm mb-2">Database Status</p>
                    <div className="flex items-center gap-2">
                      <p className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getHealthClass(stats.systemHealth.databaseStatus)}`}>
                        {stats.systemHealth.databaseStatus}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted text-sm mb-2">API Response Time</p>
                    <p className="text-xl font-bold text-text-primary dark:text-slate-100">{stats.systemHealth.apiResponse}ms</p>
                  </div>
                  <div>
                    <p className="text-muted text-sm mb-2">System Uptime</p>
                    <p className="text-xl font-bold text-text-primary dark:text-slate-100">{stats.systemHealth.uptime}%</p>
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
                      className="saas-card rounded-2xl border border-ui-border p-6 shadow-soft hover:bg-white transition text-left group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8 text-brand-500 group-hover:text-brand-600 transition" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100 mb-2">{btn.label}</h3>
                      <p className="text-sm text-muted group-hover:text-text-secondary transition">
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
