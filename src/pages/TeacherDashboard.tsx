import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackgroundImageLayout } from '../components/BackgroundImageLayout';
import { Sidebar } from '../components/Sidebar';
import { DashboardStatCard } from '../components/DashboardStatCard';
import { QuizCard } from '../components/QuizCard';
import { QuestionForm, QuestionData } from '../components/QuestionForm';
import { Footer } from '../components/Footer';
import SplitText from '../components/SplitText';
import { useAuth } from '../contexts/AuthContext';
import { db, createQuizId, createQuestionId, Quiz, Question } from '../lib/db';
import { BookOpen, Users, TrendingUp, PlusCircle, User } from 'lucide-react';
import type { Page } from '../types/navigation';
import StarBorder from '../components/StarBorder';

interface TeacherDashboardProps {
  onNavigate?: (page: Page) => void;
}

export const TeacherDashboard = ({ onNavigate }: TeacherDashboardProps) => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizDuration, setQuizDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalQuizzes: 0, totalStudents: 0, totalAttempts: 0 });

  useEffect(() => {
    if (profile) {
      fetchQuizzes();
      fetchStats();
    }
  }, [profile]);

  const fetchQuizzes = async () => {
    const allQuizzes = db.getQuizzes();
    const teacherQuizzes = allQuizzes
      .filter((q) => q.teacher_id === profile!.id)
      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

    setQuizzes(teacherQuizzes);
  };

  const fetchStats = async () => {
    const teacherQuizzes = db.getQuizzes().filter((q) => q.teacher_id === profile!.id);
    const quizIds = new Set(teacherQuizzes.map((q) => q.id));

    const allResults = db.getResults().filter((r) => quizIds.has(r.quiz_id));

    const studentCount = new Set(allResults.map((r) => r.student_id)).size;

    setStats({
      totalQuizzes: teacherQuizzes.length,
      totalStudents: studentCount,
      totalAttempts: allResults.length,
    });
  };

  const generateJoinCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleCreateQuiz = async () => {
    if (!quizTitle || questions.length === 0) {
      alert('Please add a title and at least one question');
      return;
    }

    setLoading(true);

    try {
      const quiz: Quiz = {
        id: createQuizId(),
        title: quizTitle,
        description: quizDescription,
        teacher_id: profile!.id,
        duration: quizDuration,
        join_code: generateJoinCode(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      db.saveQuiz(quiz);

      const questionsToSave: Question[] = questions.map((q, index) => ({
        id: createQuestionId(),
        quiz_id: quiz.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        order_index: index,
        created_at: new Date().toISOString(),
      }));

      db.saveQuestions(questionsToSave);

      setQuizTitle('');
      setQuizDescription('');
      setQuizDuration(30);
      setQuestions([]);
      setActiveTab('quizzes');
      fetchQuizzes();
      fetchStats();
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    db.deleteQuiz(quizId);
    db.deleteQuestionsByQuiz(quizId);
    db.deleteResultsByQuiz(quizId);

    fetchQuizzes();
    fetchStats();
  };

  const handleViewResults = (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    const results = db
      .getResults()
      .filter((r) => r.quiz_id === quizId)
      .sort((a, b) => b.score - a.score);

    if (results.length > 0) {
      const profiles = db.getProfiles();
      const resultText = results
        .map((r, i) => {
          const profile = profiles.find((p) => p.id === r.student_id);
          const name = profile?.name ?? 'Unknown';
          return `${i + 1}. ${name}: ${r.score}/${r.total_questions}`;
        })
        .join('\n');

      alert(`Results for "${quiz.title}":\n\n${resultText}`);
    } else {
      alert('No students have attempted this quiz yet.');
    }
  };

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary dark:text-slate-100">Teacher dashboard</h2>
          <p className="mt-1 text-sm text-muted">
            Quick overview of your activity and most recent quizzes.
          </p>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.('profile')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-ui-border hover:bg-slate-50 px-6 py-3 text-sm font-semibold text-text-primary shadow-soft transition dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          >
            <User className="h-5 w-5" />
            Profile
          </StarBorder>
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 transition"
          >
            <PlusCircle className="h-5 w-5" />
            Create New Quiz
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
          text="Create and Conduct Quizzes Easily"
          className="text-4xl md:text-5xl font-bold text-text-primary dark:text-slate-100"
          delay={50}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          showCallback
        />
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          Empower your students with interactive quizzes. Create, customize, and monitor assessments in real-time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStatCard
          title="Total Quizzes"
          value={stats.totalQuizzes}
          subtitle="Created by you"
          icon={BookOpen}
          colorClass="from-brand-100 to-brand-50"
        />
        <DashboardStatCard
          title="Students Engaged"
          value={stats.totalStudents}
          subtitle="Unique participants"
          icon={Users}
          colorClass="from-emerald-100 to-emerald-50"
        />
        <DashboardStatCard
          title="Total Attempts"
          value={stats.totalAttempts}
          subtitle="Quiz attempts recorded"
          icon={TrendingUp}
          colorClass="from-brand-100 to-brand-50"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="saas-card rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-text-primary dark:text-slate-100">Quick tips</h3>
        <p className="mt-2 text-sm text-muted">
          Use the quizzes tab to manage your sets. Share the quiz code with students for easy access.
        </p>
      </motion.div>
    </motion.div>
  );

  const renderCreateQuiz = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary dark:text-slate-100">Create New Quiz</h2>
          <p className="mt-1 text-sm text-muted">Build a new quiz with questions and instant scoring.</p>
        </div>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center gap-2 rounded-xl border border-ui-border bg-white px-5 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 transition dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          Back to Dashboard
        </StarBorder>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="saas-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100 mb-4">Quiz Details</h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Title</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="input-modern"
                placeholder="Enter quiz title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Description</label>
              <textarea
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                rows={4}
                className="input-modern resize-none"
                placeholder="Describe what students will learn..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={quizDuration}
                onChange={(e) => setQuizDuration(Number(e.target.value))}
                className="input-modern"
                min={1}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <QuestionForm
            questionNumber={questions.length + 1}
            onAdd={(question) => setQuestions([...questions, question])}
          />

          {questions.length > 0 && (
            <div className="saas-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100 mb-4">
                Added Questions ({questions.length})
              </h3>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-xl border border-ui-border bg-white p-5 dark:bg-slate-900 dark:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-base font-semibold text-text-primary dark:text-slate-100">
                          {index + 1}. {q.question_text}
                        </p>
                        <div className="mt-3 space-y-2">
                          {q.options.map((opt, i) => (
                            <p
                              key={i}
                              className={`rounded-xl px-3 py-2 text-sm ${
                                i === q.correct_answer
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100'
                                  : 'bg-slate-100 text-text-secondary dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                              {i === q.correct_answer && (
                                <span className="ml-2 font-semibold text-emerald-700 dark:text-emerald-100">(Correct)</span>
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                      <StarBorder as="button"
                        onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                        className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-ui-error hover:bg-red-100 transition"
                      >
                        Remove
                      </StarBorder>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateQuiz}
            disabled={loading || !quizTitle || questions.length === 0}
            className="w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Quiz…' : 'Publish Quiz'}
          </StarBorder>
        </div>
      </div>
    </motion.div>
  );

  const renderQuizList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary dark:text-slate-100">My Quizzes</h2>
          <p className="mt-1 text-sm text-muted">Manage your quizzes and view results in one place.</p>
        </div>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('create')}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 transition"
        >
          <PlusCircle className="h-5 w-5" />
          Create Quiz
        </StarBorder>
      </div>

      {quizzes.length === 0 ? (
        <div className="saas-card rounded-2xl p-12 text-center">
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted" />
          <h3 className="text-xl font-semibold text-text-primary dark:text-slate-100 mb-2">No quizzes yet</h3>
          <p className="text-sm text-muted mb-6">Create your first quiz to get started.</p>
          <StarBorder as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 transition"
          >
            Create Quiz
          </StarBorder>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={handleDeleteQuiz}
              onViewResults={handleViewResults}
              showActions={true}
              questionCount={0}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary dark:text-slate-100">Settings</h2>
          <p className="mt-1 text-sm text-muted">Manage your account and preferences.</p>
        </div>
        <StarBorder as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center gap-2 rounded-xl border border-ui-border bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:bg-slate-50 transition dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          Dashboard
        </StarBorder>
      </div>

      <div className="saas-card rounded-2xl">
        <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100">Notifications</h3>
        <p className="mt-2 text-sm text-muted">We will notify you when students complete your quizzes and when new features arrive.</p>
      </div>

      <div className="saas-card rounded-2xl">
        <h3 className="text-lg font-semibold text-text-primary dark:text-slate-100">Support</h3>
        <p className="mt-2 text-sm text-muted">Have questions? Reach out to our support team or explore the documentation.</p>
      </div>
    </motion.div>
  );

  return (
    <BackgroundImageLayout fixedImage>
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          role="teacher"
          onLogout={() => {
            onNavigate?.('login');
          }}
        />
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'create' && renderCreateQuiz()}
          {activeTab === 'quizzes' && renderQuizList()}
          {activeTab === 'results' && renderQuizList()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
      <Footer />
    </BackgroundImageLayout>
  );
};
