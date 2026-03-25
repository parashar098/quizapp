import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Plus, Eye, Lock, Trash2, Edit, Filter } from 'lucide-react';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { Footer } from '../components/Footer';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';
import { adminAPI } from '../lib/api';

const PAGE_SIZE = 10;

interface Teacher {
  _id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'blocked';
  totalQuizzes: number;
  createdAt: string;
}

interface ManageTeachersProps {
  onNavigate?: (page: Page) => void;
}

export const ManageTeachers = ({ onNavigate }: ManageTeachersProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'blocked'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTeachers, setTotalTeachers] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput.trim()), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const fetchTeachers = useCallback(async (targetPage = 1) => {
    setLoading(true);
    try {
      const response = await adminAPI.getUsers({
        role: 'teacher',
        page: targetPage,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });

      const payload = response.data || {};
      const list = Array.isArray(payload.data) ? payload.data : [];
      const pagination = payload.pagination || {};

      setTeachers(
        list.map((item: any) => ({
          _id: item._id,
          name: item.name || 'Unknown',
          email: item.email || '-',
          status: item.status || 'active',
          totalQuizzes: Number(item.totalQuizzes || 0),
          createdAt: item.createdAt || new Date().toISOString(),
        }))
      );
      setPage(Number(pagination.page || targetPage));
      setTotalPages(Number(pagination.pages || 1));
      setTotalTeachers(Number(pagination.total || 0));
    } catch (error) {
      console.error('[ManageTeachers] Error fetching teachers:', error);
      setTeachers([]);
      setPage(1);
      setTotalPages(1);
      setTotalTeachers(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchTeachers(1);
  }, [fetchTeachers]);

  const handleBlock = async (teacherId: string) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    if (!teacher) return;

    try {
      if (teacher.status === 'blocked') {
        await adminAPI.unblockUser(teacherId);
      } else {
        await adminAPI.blockUser(teacherId);
      }
      fetchTeachers(page);
    } catch (error) {
      console.error('[ManageTeachers] Error updating teacher:', error);
    }
  };

  const handleDelete = async (teacherId: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      await adminAPI.deleteUser(teacherId);
      const nextPage = teachers.length === 1 && page > 1 ? page - 1 : page;
      fetchTeachers(nextPage);
    } catch (error) {
      console.error('[ManageTeachers] Error deleting teacher:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-200 border-green-500/30';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
      case 'blocked':
        return 'bg-red-500/20 text-red-200 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    }
  };

  return (
    <BackgroundImageLayout fixedImage>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-ui-border/70 bg-white/35 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-950/35">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.('admin-dashboard')}
                className="rounded-lg p-2 transition hover:bg-slate-200/70 dark:hover:bg-slate-800/70"
              >
                <ArrowLeft className="h-6 w-6 text-text-primary dark:text-slate-100" />
              </StarBorder>
              <div>
                <h1 className="text-2xl font-bold text-text-primary dark:text-slate-100">Manage Teachers</h1>
                <p className="text-sm text-muted">View and manage all teachers</p>
              </div>
            </div>
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition"
            >
              <Plus className="w-5 h-5" />
              Add Teacher
            </StarBorder>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          {loading ? (
            <div className="saas-card overflow-hidden p-0 shadow-premium">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-ui-border bg-slate-100/70 dark:border-slate-700/70 dark:bg-slate-900/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Total Quizzes</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-border dark:divide-slate-700/70">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-slate-300/50 dark:bg-slate-700/60" /></td>
                        <td className="px-6 py-4"><div className="h-4 w-56 rounded bg-slate-300/50 dark:bg-slate-700/60" /></td>
                        <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-slate-300/50 dark:bg-slate-700/60" /></td>
                        <td className="px-6 py-4"><div className="h-5 w-12 rounded bg-slate-300/50 dark:bg-slate-700/60" /></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded bg-slate-300/50 dark:bg-slate-700/60" />
                            <div className="h-8 w-8 rounded bg-slate-300/50 dark:bg-slate-700/60" />
                            <div className="h-8 w-8 rounded bg-slate-300/50 dark:bg-slate-700/60" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Search and Filter Section */}
              <div className="saas-card shadow-premium">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="input-modern py-3 pl-12 pr-4"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="input-modern px-4 py-3"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Teachers Table */}
              {teachers.length === 0 ? (
                <div className="saas-card p-12 text-center shadow-premium">
                  <p className="text-lg text-muted">No teachers found</p>
                </div>
              ) : (
                <div className="saas-card overflow-hidden p-0 shadow-premium">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-ui-border bg-slate-100/70 dark:border-slate-700/70 dark:bg-slate-900/60">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Total Quizzes</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-muted">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-border dark:divide-slate-700/70">
                        {teachers.map((teacher, index) => (
                          <motion.tr
                            key={teacher._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="transition hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
                          >
                            <td className="px-6 py-4 font-medium text-text-primary dark:text-slate-100">{teacher.name}</td>
                            <td className="px-6 py-4 text-sm text-muted">{teacher.email}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(teacher.status)}`}>
                                {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-text-primary dark:text-slate-100">{teacher.totalQuizzes}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <StarBorder as={motion.button}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </StarBorder>
                                <StarBorder as={motion.button}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleBlock(teacher._id)}
                                  className={`p-2 rounded-lg transition ${
                                    teacher.status === 'blocked'
                                      ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                      : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                                  }`}
                                  title={teacher.status === 'blocked' ? 'Unblock' : 'Block'}
                                >
                                  <Lock className="w-4 h-4" />
                                </StarBorder>
                                <StarBorder as={motion.button}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </StarBorder>
                                <StarBorder as={motion.button}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleDelete(teacher._id)}
                                  className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </StarBorder>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="saas-card shadow-soft">
                <p className="text-sm text-muted">
                  Showing page <span className="font-semibold text-text-primary dark:text-slate-100">{page}</span> of{' '}
                  <span className="font-semibold text-text-primary dark:text-slate-100">{Math.max(totalPages, 1)}</span> with{' '}
                  <span className="font-semibold text-text-primary dark:text-slate-100">{totalTeachers}</span> total teachers
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <StarBorder as={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={page <= 1 || loading}
                    onClick={() => fetchTeachers(page - 1)}
                    className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </StarBorder>
                  <StarBorder as={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={page >= totalPages || loading}
                    onClick={() => fetchTeachers(page + 1)}
                    className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </StarBorder>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <Footer />
    </BackgroundImageLayout>
  );
};
