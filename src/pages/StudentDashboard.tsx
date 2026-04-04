import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { Sidebar } from '../components/Sidebar';
import { QuizCard } from '../components/QuizCard';
import { QuizTimer } from '../components/QuizTimer';
import { TabWarningModal } from '../components/TabWarningModal';
import { JoinQuizModal, type QuizJoinInfo } from '../components/JoinQuizModal';
import { LeaderboardTable } from '../components/ui/LeaderboardTable';
import SplitText from '../components/SplitText';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import { quizAPI, resultAPI } from '../lib/api';
import { BookOpen, Award, Key, Settings } from 'lucide-react';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';
import ProfileCard from '../components/ProfileCard';
import DashboardStats from '../components/DashboardStats';
import SettingsPage from './SettingsPage';

const MAX_VIOLATIONS = 3;
const RESULT_PAGE_SIZE = 10;
const QUIZ_PAGE_SIZE = 8;

interface SecureAttempt {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  startTime: number;
  duration: number;
  questions: Array<{ _id: string; questionText: string; options: string[] }>;
  violations: number;
}

interface ApiQuiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  joinCode?: string;
  questions?: unknown[];
  teacherId?: { name?: string; email?: string } | string;
}

interface ApiResult {
  _id: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
  quizId?: { title?: string } | string;
}

interface StudentDashboardProps {
  onNavigate?: (page: Page) => void;
}

const calculateStats = (data: ApiResult[]) => {
  if (data.length === 0) {
    return { totalAttempts: 0, averageScore: 0, bestScore: 0 };
  }

  const percentages = data.map((r) => (r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0));
  const avgScore = percentages.reduce((acc, value) => acc + value, 0) / percentages.length;
  const best = Math.max(...percentages);

  return {
    totalAttempts: data.length,
    averageScore: Math.round(avgScore),
    bestScore: Math.round(best),
  };
};

export const StudentDashboard = ({ onNavigate: _onNavigate }: StudentDashboardProps) => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshProfile, setRefreshProfile] = useState(false);

  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);
  const [quizSearchInput, setQuizSearchInput] = useState('');
  const [debouncedQuizSearch, setDebouncedQuizSearch] = useState('');
  const [quizSortBy, setQuizSortBy] = useState<'newest' | 'shortest' | 'alphabetical'>('newest');
  const [quizzesPage, setQuizzesPage] = useState(1);
  const [quizzesTotalPages, setQuizzesTotalPages] = useState(1);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);

  const [results, setResults] = useState<ApiResult[]>([]);
  const [stats, setStats] = useState({ totalAttempts: 0, averageScore: 0, bestScore: 0 });
  const [resultsPage, setResultsPage] = useState(1);
  const [resultsTotalPages, setResultsTotalPages] = useState(1);
  const [loadingResults, setLoadingResults] = useState(false);

  // Secure attempt state
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [secureAttempt, setSecureAttempt] = useState<SecureAttempt | null>(null);
  const [secureAnswers, setSecureAnswers] = useState<{ questionId: string; selectedAnswer: number }[]>([]);
  const [secureQuestionIndex, setSecureQuestionIndex] = useState(0);
  const [violations, setViolations] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [secureResult, setSecureResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
    violations: number;
    autoSubmitted: boolean;
  } | null>(null);

  // Refs to avoid stale closures inside event handlers
  const secureAttemptRef = useRef<SecureAttempt | null>(null);
  const violationsRef = useRef(0);
  const isAutoSubmittingRef = useRef(false);
  const submitSecureRef = useRef<(auto: boolean) => Promise<void>>();
  secureAttemptRef.current = secureAttempt;
  violationsRef.current = violations;
  isAutoSubmittingRef.current = isAutoSubmitting;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuizSearch(quizSearchInput.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [quizSearchInput]);

  const fetchQuizzes = useCallback(async (page = 1, append = false) => {
    setLoadingQuizzes(true);
    try {
      const response = await quizAPI.getAllQuizzes({
        search: debouncedQuizSearch || undefined,
        page,
        limit: QUIZ_PAGE_SIZE,
        sortBy: quizSortBy,
      });

      const payload = response.data || {};
      const list = Array.isArray(payload.data) ? payload.data : (Array.isArray(payload) ? payload : []);
      const pagination = payload.pagination || {};

      setQuizzes((prev) => (append ? [...prev, ...list] : list));
      setQuizzesPage(Number(pagination.page || page));
      setQuizzesTotalPages(Number(pagination.pages || 1));
    } catch (error) {
      console.error('[StudentDashboard] Failed to fetch quizzes:', error);
      if (!append) {
        setQuizzes([]);
        setQuizzesPage(1);
        setQuizzesTotalPages(1);
      }
    } finally {
      setLoadingQuizzes(false);
    }
  }, [debouncedQuizSearch, quizSortBy]);

  const fetchResults = useCallback(async (page = 1, append = false) => {
    setLoadingResults(true);
    try {
      const response = await resultAPI.getUserResults({ page, limit: RESULT_PAGE_SIZE });
      const payload = response.data || {};
      const pageResults = Array.isArray(payload.data) ? payload.data : [];
      const pagination = payload.pagination || {};

      setResults((prev) => {
        const merged = append ? [...prev, ...pageResults] : pageResults;
        setStats(calculateStats(merged));
        return merged;
      });

      setResultsPage(Number(pagination.page || page));
      setResultsTotalPages(Number(pagination.pages || 1));
    } catch (error) {
      console.error('[StudentDashboard] Failed to fetch results:', error);
      if (!append) {
        setResults([]);
        setStats(calculateStats([]));
      }
    } finally {
      setLoadingResults(false);
    }
  }, []);

  useEffect(() => {
    if (!profile) return;

    fetchQuizzes(1, false);
    fetchResults(1, false);
  }, [profile, debouncedQuizSearch, quizSortBy, fetchQuizzes, fetchResults]);

  const handleStartQuiz = async (quizId: string) => {
    try {
      const quiz = quizzes.find((q) => q._id === quizId);
      const startResponse = await quizAPI.startAttempt(quizId);
      const data = startResponse.data;

      const attempt: SecureAttempt = {
        attemptId: String(data.attemptId),
        quizId,
        quizTitle: quiz?.title || 'Quiz',
        startTime: new Date(data.startTime).getTime(),
        duration: data.duration,
        questions: data.questions,
        violations: data.violations ?? 0,
      };

      setSecureAttempt(attempt);
      setSecureAnswers([]);
      setSecureQuestionIndex(0);
      setViolations(data.violations ?? 0);
      setIsAutoSubmitting(false);
      setShowTabWarning(false);
      setActiveTab('secure-attempt');
    } catch (err: any) {
      alert(err.response?.data?.error ?? 'Failed to start quiz. Please try again.');
    }
  };

  // ── Secure attempt handlers ──────────────────────────────────────────────

  const handleJoinedQuiz = async (quizInfo: QuizJoinInfo) => {
    setShowJoinModal(false);
    try {
      const res = await quizAPI.startAttempt(quizInfo.quizId);
      const data = res.data;
      const attempt: SecureAttempt = {
        attemptId: String(data.attemptId),
        quizId: quizInfo.quizId,
        quizTitle: quizInfo.title,
        startTime: new Date(data.startTime).getTime(),
        duration: data.duration,
        questions: data.questions,
        violations: data.violations ?? 0,
      };
      setSecureAttempt(attempt);
      setSecureAnswers([]);
      setSecureQuestionIndex(0);
      setViolations(data.violations ?? 0);
      setIsAutoSubmitting(false);
      setShowTabWarning(false);
      setActiveTab('secure-attempt');
    } catch (err: any) {
      alert(err.response?.data?.error ?? 'Failed to start quiz. Please try again.');
    }
  };

  const handleSecureAnswerSelect = (questionId: string, answerIndex: number) => {
    setSecureAnswers((prev) => {
      const idx = prev.findIndex((a) => a.questionId === questionId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { questionId, selectedAnswer: answerIndex };
        return updated;
      }
      return [...prev, { questionId, selectedAnswer: answerIndex }];
    });
  };

  const handleSubmitSecureQuiz = async (autoSubmitted = false) => {
    const attempt = secureAttemptRef.current;
    if (!attempt) return;
    if (!autoSubmitted && secureAnswers.length !== attempt.questions.length) {
      alert('Please answer all questions before submitting!');
      return;
    }

    try {
      const res = await quizAPI.submitAttempt(attempt.quizId, {
        attemptId: attempt.attemptId,
        answers: secureAnswers,
        autoSubmitted,
      });
      setSecureResult(res.data);
      setSecureAttempt(null);
      setActiveTab('secure-result');
      await fetchResults(1, false);
    } catch (err: any) {
      alert(err.response?.data?.error ?? 'Failed to submit quiz.');
    }
  };
  submitSecureRef.current = handleSubmitSecureQuiz;

  // Tab-switch violation detection (only active during secure attempt)
  useEffect(() => {
    if (activeTab !== 'secure-attempt') return;

    const handleVisibilityChange = async () => {
      if (!document.hidden) return;
      if (isAutoSubmittingRef.current || !secureAttemptRef.current) return;

      let newViolations: number;
      try {
        const res = await quizAPI.recordViolation(secureAttemptRef.current.attemptId);
        newViolations = res.data.violations;
        setViolations(newViolations);
        setSecureAttempt((prev) => (prev ? { ...prev, violations: newViolations } : null));

        if (res.data.shouldAutoSubmit) {
          isAutoSubmittingRef.current = true;
          setIsAutoSubmitting(true);
          setShowTabWarning(true);
          setTimeout(() => submitSecureRef.current?.(true), 2500);
          return;
        }
      } catch {
        newViolations = violationsRef.current + 1;
        setViolations(newViolations);
        if (newViolations >= MAX_VIOLATIONS) {
          isAutoSubmittingRef.current = true;
          setIsAutoSubmitting(true);
          setShowTabWarning(true);
          setTimeout(() => submitSecureRef.current?.(true), 2500);
          return;
        }
      }
      setShowTabWarning(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activeTab]);

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary dark:text-slate-100">
            Welcome back, {profile?.name?.split(' ')[0]} 👋
          </h2>
          <p className="mt-1 text-sm text-muted">Track your quizzes and achievements.</p>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="inline-flex items-center gap-2 rounded-xl border border-ui-border bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>

      {/* Profile Card */}
      {profile && (
        <ProfileCard
          user={profile}
          onProfileUpdate={() => setRefreshProfile(!refreshProfile)}
        />
      )}

      {/* Dashboard Stats */}
      {profile && (
        <div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-slate-100 mb-6">Your Performance</h3>
          <DashboardStats userId={profile.id} />
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100 mt-8">Quick Actions</h2>
          <p className="mt-1 text-sm text-muted">Start taking quizzes to improve your skills.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 transition"
          >
            <Key className="h-4 w-4" />
            Join by Code
          </StarBorder>
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('quizzes')}
            className="inline-flex items-center gap-2 rounded-xl border border-ui-border bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            Browse Quizzes
          </StarBorder>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="saas-card rounded-2xl text-center"
      >
        <SplitText
          text="Test Your Knowledge Today"
          className="text-4xl md:text-5xl font-bold text-text-primary dark:text-slate-100"
          delay={50}
          duration={1}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          showCallback
        />
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          Take quizzes crafted by your teachers. Learn, improve, and track your progress in real-time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingResults && results.length === 0 ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="saas-card rounded-2xl p-6 animate-pulse">
              <div className="h-3 w-28 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-16 rounded bg-slate-200" />
              <div className="mt-5 h-3 w-40 rounded bg-slate-200" />
            </div>
          ))
        ) : (
          <>
        <div className="saas-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">Quizzes Attempted</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-slate-100">{stats.totalAttempts}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <BookOpen className="h-4 w-4" />
            <span>Keep going, you're doing great!</span>
          </div>
        </div>
        <div className="saas-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">Average score</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-slate-100">{stats.averageScore}%</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Award className="h-4 w-4" />
            <span>Keep improving!</span>
          </div>
        </div>
        <div className="saas-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">Best score</p>
          <p className="mt-3 text-3xl font-bold text-text-primary dark:text-slate-100">{stats.bestScore}%</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Award className="h-4 w-4" />
            <span>Challenge yourself more.</span>
          </div>
        </div>
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="saas-card rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100">Next steps</h3>
        <p className="mt-2 text-sm text-muted">Choose a quiz and track your progress with instant feedback.</p>
      </motion.div>
    </motion.div>
  );

  const renderQuizList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Available quizzes</h2>
          <p className="mt-1 text-sm text-white/70">Select a quiz to start your session.</p>
        </div>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
        >
          Back to Dashboard
        </StarBorder>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-5 shadow-glass">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={quizSearchInput}
            onChange={(event) => setQuizSearchInput(event.target.value)}
            placeholder="Search quizzes by title, description, or join code..."
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-indigo-300 focus:outline-none"
          />
          <select
            value={quizSortBy}
            onChange={(event) => setQuizSortBy(event.target.value as 'newest' | 'shortest' | 'alphabetical')}
            className="w-full md:w-56 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-indigo-300 focus:outline-none"
          >
            <option value="newest" className="text-black">Newest</option>
            <option value="shortest" className="text-black">Shortest Duration</option>
            <option value="alphabetical" className="text-black">Alphabetical</option>
          </select>
        </div>
      </div>

      {loadingQuizzes && quizzes.length === 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass rounded-3xl border border-white/10 p-6 shadow-glass animate-pulse">
              <div className="h-6 w-3/4 rounded bg-white/20" />
              <div className="mt-4 h-4 w-full rounded bg-white/20" />
              <div className="mt-2 h-4 w-5/6 rounded bg-white/20" />
              <div className="mt-6 h-10 w-32 rounded bg-white/20" />
            </div>
          ))}
        </div>
      ) : quizzes.length === 0 ? (
        <div className="glass rounded-3xl border border-white/10 p-12 text-center shadow-glass">
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-white/60" />
          <h3 className="text-xl font-semibold text-white mb-2">No quizzes found</h3>
          <p className="text-sm text-white/70">Try a different search term or check back later.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                onStart={handleStartQuiz}
                teacherName={typeof quiz.teacherId === 'object' ? quiz.teacherId?.name : undefined}
                questionCount={quiz.questions?.length || 0}
              />
            ))}
          </div>
          {quizzesPage < quizzesTotalPages && (
            <div className="pt-2">
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fetchQuizzes(quizzesPage + 1, true)}
                disabled={loadingQuizzes}
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50 transition"
              >
                {loadingQuizzes ? 'Loading...' : 'Load More Quizzes'}
              </StarBorder>
            </div>
          )}
        </>
      )}
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">My Results</h2>
          <p className="mt-1 text-sm text-white/70">Review your past quiz attempts and insights.</p>
        </div>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
        >
          Dashboard
        </StarBorder>
      </div>

      {loadingResults && results.length === 0 ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass rounded-3xl border border-white/10 p-6 shadow-glass animate-pulse">
              <div className="h-6 w-1/3 rounded bg-white/20" />
              <div className="mt-3 h-4 w-1/4 rounded bg-white/20" />
              <div className="mt-4 h-8 w-20 rounded bg-white/20" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="glass rounded-3xl border border-white/10 p-12 text-center shadow-glass">
          <Award className="mx-auto mb-4 h-16 w-16 text-white/60" />
          <h3 className="text-xl font-semibold text-white mb-2">No results yet</h3>
          <p className="text-sm text-white/70">Take quizzes to see your results here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <motion.div
              key={result._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl border border-white/10 p-6 shadow-glass"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {typeof result.quizId === 'object' ? result.quizId?.title || 'Quiz' : 'Quiz'}
                  </h3>
                  <p className="text-sm text-white/70">
                    Submitted: {new Date(result.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">
                    {result.score}/{result.totalQuestions}
                  </p>
                  <p className="text-sm text-white/70">
                    {Math.round((result.score / result.totalQuestions) * 100)}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {resultsPage < resultsTotalPages && (
            <div className="pt-2">
              <StarBorder as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fetchResults(resultsPage + 1, true)}
                disabled={loadingResults}
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50 transition"
              >
                {loadingResults ? 'Loading...' : 'Load More Results'}
              </StarBorder>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderSecureAttempt = () => {
    if (!secureAttempt) return null;

    const q = secureAttempt.questions[secureQuestionIndex];
    const currentAnswer = secureAnswers.find((a) => a.questionId === q._id);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{secureAttempt.quizTitle}</h2>
            <p className="text-sm text-white/70">
              Question {secureQuestionIndex + 1} of {secureAttempt.questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {violations > 0 && (
              <span className="rounded-xl border border-red-400/40 bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300">
                {violations}/{MAX_VIOLATIONS} violations
              </span>
            )}
            <QuizTimer
              durationMinutes={secureAttempt.duration}
              startTime={secureAttempt.startTime}
              onTimeUp={() => {
                if (!isAutoSubmittingRef.current) {
                  isAutoSubmittingRef.current = true;
                  setIsAutoSubmitting(true);
                  submitSecureRef.current?.(true);
                }
              }}
            />
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 transition-all"
            style={{ width: `${((secureQuestionIndex + 1) / secureAttempt.questions.length) * 100}%` }}
          />
        </div>

        <div className="glass rounded-3xl border border-white/10 p-8 shadow-glass">
          <h3 className="mb-6 text-lg font-semibold text-white">
            {secureQuestionIndex + 1}. {q.questionText}
          </h3>

          <div className="grid gap-4">
            {q.options.map((option, idx) => (
              <StarBorder as={motion.button}
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSecureAnswerSelect(q._id, idx)}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition ${
                  currentAnswer?.selectedAnswer === idx
                      ? 'border-brand-400 bg-white/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                    currentAnswer?.selectedAnswer === idx ? 'border-brand-400 bg-brand-500' : 'border-white/20'
                }`}>
                  {currentAnswer?.selectedAnswer === idx
                    ? <div className="h-3 w-3 rounded-full bg-white" />
                    : <span className="text-sm font-semibold text-white/70">{String.fromCharCode(65 + idx)}</span>
                  }
                </div>
                <span className="text-white/90">{option}</span>
              </StarBorder>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSecureQuestionIndex((index) => Math.max(0, index - 1))}
              disabled={secureQuestionIndex === 0}
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              Previous
            </StarBorder>

            <StarBorder as={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (secureQuestionIndex === secureAttempt.questions.length - 1) {
                  handleSubmitSecureQuiz(false);
                } else {
                  setSecureQuestionIndex((index) => index + 1);
                }
              }}
              disabled={isAutoSubmitting}
              className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-50 transition"
            >
              {secureQuestionIndex === secureAttempt.questions.length - 1
                ? (isAutoSubmitting ? 'Submitting...' : 'Submit Quiz')
                : 'Next Question'}
            </StarBorder>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSecureResult = () => {
    if (!secureResult) return null;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="glass rounded-3xl border border-white/10 p-8 text-center shadow-glass">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-slate-700 to-blue-600 shadow-lg">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">
            {secureResult.autoSubmitted ? 'Quiz Auto-Submitted' : 'Quiz Completed!'}
          </h2>
          <p className="mb-6 text-white/70">
            {secureResult.autoSubmitted ? 'Your quiz was submitted automatically.' : 'Great job completing the quiz.'}
          </p>
          <div className="mb-6 rounded-3xl bg-white/10 p-6">
            <p className="mb-2 bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
              {secureResult.score}/{secureResult.totalQuestions}
            </p>
            <p className="text-xl text-white/70">Score: {secureResult.percentage}%</p>
            {secureResult.violations > 0 && (
              <p className="mt-2 text-sm text-red-400">Tab violations recorded: {secureResult.violations}</p>
            )}
          </div>
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSecureResult(null); setActiveTab('dashboard'); }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
          >
            Back to Dashboard
          </StarBorder>
        </div>

        {results.length > 0 && (
          <LeaderboardTable
            data={results
              .slice()
              .sort((a, b) => (b.score / b.totalQuestions) * 100 - (a.score / a.totalQuestions) * 100)
              .slice(0, 6)
              .map((result) => ({
                id: result._id,
                name: typeof result.quizId === 'object' ? result.quizId?.title || 'Quiz' : 'Quiz',
                score: Math.round((result.score / result.totalQuestions) * 100),
                attempts: 1,
              }))}
          />
        )}
      </motion.div>
    );
  };

  const renderSettings = () => {
    if (!profile) return null;
    return (
      <SettingsPage
        user={profile}
        onLogout={() => {
          signOut();
          setActiveTab('dashboard');
        }}
      />
    );
  };

  return (
    <BackgroundImageLayout fixedImage>
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          role="student"
          onLogout={() => {
            onNavigate?.('login');
          }}
        />
        <main className="flex-1 p-8 bg-transparent">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'quizzes' && renderQuizList()}
          {activeTab === 'results' && renderResults()}
          {activeTab === 'secure-attempt' && renderSecureAttempt()}
          {activeTab === 'secure-result' && renderSecureResult()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>

      <Footer />

      {showJoinModal && (
        <JoinQuizModal onClose={() => setShowJoinModal(false)} onJoined={handleJoinedQuiz} />
      )}

      {showTabWarning && (
        <TabWarningModal
          violations={violations}
          maxViolations={MAX_VIOLATIONS}
          onDismiss={() => setShowTabWarning(false)}
        />
      )}
    </BackgroundImageLayout>
  );
};
