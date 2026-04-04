import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { BookOpen, Award, TrendingUp, Activity } from 'lucide-react';
import StatsCard from './StatsCard';
import { userAPI, resultAPI } from '../lib/api';

interface DashboardStatsProps {
  userId: string;
}

interface Stats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
}

interface Result {
  _id: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
  quizId: { title: string } | string;
}

const COLORS = ['#3B82F6', '#1E293B', '#60A5FA', '#10B981'];

export default function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
  });

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Prepare chart data
  const chartData = results.slice(-10).map((result) => ({
    name:
      typeof result.quizId === 'string'
        ? `Quiz ${result._id.slice(-4)}`
        : result.quizId.title || 'Quiz',
    score: Math.round((result.score / result.totalQuestions) * 100),
    date: new Date(result.submittedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  const pieData = [
    {
      name: 'Completed',
      value: Math.round((stats.totalAttempts * 100) / 100) || 0,
    },
    {
      name: 'Pending',
      value: Math.max(0, 100 - (stats.totalAttempts * 100) / 100),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, resultsRes] = await Promise.all([
          userAPI.getDashboardStats(),
          resultAPI.getUserResults({ limit: 50 }),
        ]);

        setStats(statsRes.data.stats);
        setResults(resultsRes.data.data || []);
      } catch (err: any) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<BookOpen />}
          label="Total Quizzes Attempted"
          value={stats.totalAttempts}
          color="blue"
          delay={0}
        />
        <StatsCard
          icon={<TrendingUp />}
          label="Average Score"
          value={stats.averageScore}
          unit="%"
          color="slate"
          delay={0.1}
        />
        <StatsCard
          icon={<Award />}
          label="Best Score"
          value={stats.bestScore}
          unit="%"
          color="green"
          delay={0.2}
        />
        <StatsCard
          icon={<Activity />}
          label="Learning Progress"
          value={Math.min(100, (stats.totalAttempts * 10))}
          unit="%"
          color="amber"
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-soft"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-primary dark:text-slate-100">Recent Performance</h3>
            <p className="text-sm text-text-secondary dark:text-slate-300 mt-1">Last 10 quiz attempts</p>
          </div>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
                />
                <Bar dataKey="score" fill="#3B82F6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-300 text-text-secondary dark:text-slate-400">
              No quiz attempts yet
            </div>
          )}
        </motion.div>

        {/* Completion Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-soft"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-primary dark:text-slate-100">Progress</h3>
            <p className="text-sm text-text-secondary dark:text-slate-300 mt-1">Quiz completion status</p>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#3B82F6"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-soft"
        >
          <h3 className="text-lg font-bold text-text-primary dark:text-slate-100 mb-6">Recent Activity</h3>

          <div className="space-y-3">
            {results.slice(0, 5).map((result, index) => (
              <motion.div
                key={result._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50/80 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-500 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-text-primary dark:text-slate-100">
                    {typeof result.quizId === 'string'
                      ? `Quiz ${result._id.slice(-4)}`
                      : result.quizId.title}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-slate-400">
                    {new Date(result.submittedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-600">
                    {Math.round((result.score / result.totalQuestions) * 100)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.score}/{result.totalQuestions}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
