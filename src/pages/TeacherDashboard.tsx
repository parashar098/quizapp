import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { QuizCard } from '../components/QuizCard';
import { QuestionForm, QuestionData } from '../components/QuestionForm';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Quiz, Question } from '../lib/supabase';
import { PlusCircle, BookOpen, Users, TrendingUp } from 'lucide-react';

export const TeacherDashboard = () => {
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
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('teacher_id', profile!.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quizzes:', error);
    } else {
      setQuizzes(data || []);
    }
  };

  const fetchStats = async () => {
    const { count: quizCount } = await supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('teacher_id', profile!.id);

    const { data: quizIds } = await supabase
      .from('quizzes')
      .select('id')
      .eq('teacher_id', profile!.id);

    if (quizIds && quizIds.length > 0) {
      const { count: resultCount } = await supabase
        .from('results')
        .select('*', { count: 'exact', head: true })
        .in('quiz_id', quizIds.map(q => q.id));

      const { data: uniqueStudents } = await supabase
        .from('results')
        .select('student_id')
        .in('quiz_id', quizIds.map(q => q.id));

      const studentCount = new Set(uniqueStudents?.map(s => s.student_id) || []).size;

      setStats({
        totalQuizzes: quizCount || 0,
        totalStudents: studentCount,
        totalAttempts: resultCount || 0,
      });
    } else {
      setStats({ totalQuizzes: 0, totalStudents: 0, totalAttempts: 0 });
    }
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
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizTitle,
          description: quizDescription,
          teacher_id: profile!.id,
          duration: quizDuration,
          join_code: generateJoinCode(),
        })
        .select()
        .single();

      if (quizError) throw quizError;

      const questionsToInsert = questions.map((q, index) => ({
        quiz_id: quiz.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        order_index: index,
      }));

      const { error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

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
    if (confirm('Are you sure you want to delete this quiz?')) {
      const { error } = await supabase.from('quizzes').delete().eq('id', quizId);

      if (error) {
        console.error('Error deleting quiz:', error);
      } else {
        fetchQuizzes();
        fetchStats();
      }
    }
  };

  const handleViewResults = async (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const { data: results } = await supabase
      .from('results')
      .select(`
        *,
        profiles:student_id (name)
      `)
      .eq('quiz_id', quizId)
      .order('score', { ascending: false });

    if (results && results.length > 0) {
      const resultText = results
        .map((r: any, i: number) => `${i + 1}. ${r.profiles.name}: ${r.score}/${r.total_questions}`)
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
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Quizzes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalQuizzes}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Attempts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAttempts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Ready to create a quiz?</h3>
        <p className="mb-4 text-blue-100">Engage your students with interactive quizzes</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('create')}
          className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Create New Quiz</span>
        </motion.button>
      </div>
    </motion.div>
  );

  const renderCreateQuiz = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">Create New Quiz</h2>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Title
          </label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter quiz title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Enter quiz description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={quizDuration}
            onChange={(e) => setQuizDuration(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>
      </div>

      <QuestionForm
        questionNumber={questions.length + 1}
        onAdd={(question) => setQuestions([...questions, question])}
      />

      {questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Added Questions ({questions.length})
          </h3>
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-2">
                    {index + 1}. {q.question_text}
                  </p>
                  <div className="space-y-1">
                    {q.options.map((opt, i) => (
                      <p
                        key={i}
                        className={`text-sm ${
                          i === q.correct_answer
                            ? 'text-green-600 font-semibold'
                            : 'text-gray-600'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                        {i === q.correct_answer && ' ✓'}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCreateQuiz}
        disabled={loading || !quizTitle || questions.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Quiz...' : 'Create Quiz'}
      </motion.button>
    </motion.div>
  );

  const renderQuizList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">My Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes yet</h3>
          <p className="text-gray-600 mb-6">Create your first quiz to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('create')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Create Quiz
          </motion.button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} role="teacher" />
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'create' && renderCreateQuiz()}
          {activeTab === 'quizzes' && renderQuizList()}
          {activeTab === 'results' && renderQuizList()}
        </main>
      </div>
    </div>
  );
};
