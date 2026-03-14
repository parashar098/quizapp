import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { QuizCard } from '../components/QuizCard';
import { Timer } from '../components/Timer';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Quiz, Question, Result } from '../lib/supabase';
import { BookOpen, Award, CheckCircle, XCircle } from 'lucide-react';

export const StudentDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question_id: string; selected_answer: number }[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalAttempts: 0, averageScore: 0, bestScore: 0 });
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      fetchQuizzes();
      fetchResults();
    }
  }, [profile]);

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        profiles:teacher_id (name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quizzes:', error);
    } else {
      setQuizzes(data || []);
    }
  };

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from('results')
      .select(`
        *,
        quizzes:quiz_id (title)
      `)
      .eq('student_id', profile!.id)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching results:', error);
    } else {
      setResults(data || []);

      if (data && data.length > 0) {
        const total = data.length;
        const avgScore = data.reduce((acc, r) => acc + (r.score / r.total_questions) * 100, 0) / total;
        const best = Math.max(...data.map(r => (r.score / r.total_questions) * 100));

        setStats({
          totalAttempts: total,
          averageScore: Math.round(avgScore),
          bestScore: Math.round(best),
        });
      }
    }
  };

  const handleStartQuiz = async (quizId: string) => {
    const { data: existingResult } = await supabase
      .from('results')
      .select('*')
      .eq('student_id', profile!.id)
      .eq('quiz_id', quizId)
      .maybeSingle();

    if (existingResult) {
      alert('You have already attempted this quiz!');
      return;
    }

    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    const { data: questionsData, error } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching questions:', error);
      return;
    }

    setCurrentQuiz(quiz);
    setQuestions(questionsData || []);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setActiveTab('attempt');
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    const existingIndex = answers.findIndex((a) => a.question_id === questionId);
    if (existingIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { question_id: questionId, selected_answer: answerIndex };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { question_id: questionId, selected_answer: answerIndex }]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (answers.length !== questions.length) {
      alert('Please answer all questions before submitting!');
      return;
    }

    let score = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.question_id);
      if (question && question.correct_answer === answer.selected_answer) {
        score++;
      }
    });

    const { data: result, error } = await supabase
      .from('results')
      .insert({
        student_id: profile!.id,
        quiz_id: currentQuiz!.id,
        score,
        total_questions: questions.length,
        answers,
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
      return;
    }

    setFinalResult({ ...result, questions, answers });
    setShowResult(true);
    setCurrentQuiz(null);
    fetchResults();
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
              <p className="text-gray-500 text-sm font-medium">Quizzes Attempted</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAttempts}</p>
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
              <p className="text-gray-500 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Best Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.bestScore}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h3>
        <p className="mb-4 text-blue-100">Browse available quizzes and start learning</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('quizzes')}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all"
        >
          Browse Quizzes
        </motion.button>
      </div>
    </motion.div>
  );

  const renderQuizList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes available</h3>
          <p className="text-gray-600">Check back later for new quizzes</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz: any) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={handleStartQuiz}
              teacherName={quiz.profiles?.name}
              questionCount={0}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderQuizAttempt = () => {
    if (!currentQuiz || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find((a) => a.question_id === currentQuestion.id);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <Timer duration={currentQuiz.duration} onTimeUp={handleSubmitQuiz} />

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h2>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question_text}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentAnswer?.selected_answer === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer?.selected_answer === index
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {currentAnswer?.selected_answer === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900 font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>

            {currentQuestionIndex === questions.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold"
              >
                Submit Quiz
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold"
              >
                Next
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">My Results</h2>

      {results.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results yet</h3>
          <p className="text-gray-600">Start taking quizzes to see your results here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result: any) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {result.quizzes?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(result.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {result.score}/{result.total_questions}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Math.round((result.score / result.total_questions) * 100)}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderResultPage = () => {
    if (!finalResult) return null;

    const percentage = Math.round((finalResult.score / finalResult.total_questions) * 100);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-6">Great job on completing the quiz</p>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
            <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              {finalResult.score}/{finalResult.total_questions}
            </p>
            <p className="text-xl text-gray-600">Score: {percentage}%</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowResult(false);
              setFinalResult(null);
              setActiveTab('quizzes');
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Quizzes
          </motion.button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Answer Review</h3>
          {finalResult.questions.map((question: Question, index: number) => {
            const userAnswer = finalResult.answers.find((a: any) => a.question_id === question.id);
            const isCorrect = userAnswer?.selected_answer === question.correct_answer;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                  isCorrect ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <div className="flex items-start space-x-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-3">
                      {index + 1}. {question.question_text}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg ${
                            optIndex === question.correct_answer
                              ? 'bg-green-50 border border-green-200'
                              : optIndex === userAnswer?.selected_answer
                              ? 'bg-red-50 border border-red-200'
                              : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-sm">
                            {String.fromCharCode(65 + optIndex)}. {option}
                            {optIndex === question.correct_answer && (
                              <span className="text-green-600 font-semibold ml-2">✓ Correct</span>
                            )}
                            {optIndex === userAnswer?.selected_answer &&
                              optIndex !== question.correct_answer && (
                                <span className="text-red-600 font-semibold ml-2">✗ Your answer</span>
                              )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} role="student" />
        <main className="flex-1 p-8">
          {showResult && renderResultPage()}
          {!showResult && activeTab === 'dashboard' && renderDashboard()}
          {!showResult && activeTab === 'quizzes' && renderQuizList()}
          {!showResult && activeTab === 'attempt' && renderQuizAttempt()}
          {!showResult && activeTab === 'results' && renderResults()}
        </main>
      </div>
    </div>
  );
};
