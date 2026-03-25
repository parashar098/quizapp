import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { quizAPI } from '../lib/api';
import StarBorder from './StarBorder';

export interface QuizJoinInfo {
  quizId: string;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  teacher: string;
}

interface JoinQuizModalProps {
  onClose: () => void;
  onJoined: (quiz: QuizJoinInfo) => void;
}

export const JoinQuizModal = ({ onClose, onJoined }: JoinQuizModalProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizInfo, setQuizInfo] = useState<QuizJoinInfo | null>(null);

  const handleFind = async () => {
    const trimmed = code.trim();
    if (trimmed.length < 4) {
      setError('Please enter a valid quiz code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await quizAPI.joinByCode(trimmed);
      setQuizInfo(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Invalid join code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mx-4 w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-lg"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Join Quiz</h2>
          <StarBorder as="button"
            onClick={onClose}
            className="rounded-xl p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </StarBorder>
        </div>

        {!quizInfo ? (
          /* Code entry */
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Enter Quiz Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                placeholder="e.g. ABC123"
                maxLength={8}
                autoFocus
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center font-mono text-2xl font-bold uppercase tracking-widest text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <StarBorder as="button"
              onClick={handleFind}
              disabled={loading || code.trim().length < 4}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Searching…' : 'Find Quiz'}
            </StarBorder>
          </div>
        ) : (
          /* Quiz info + start confirmation */
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-1 text-xl font-bold text-white">{quizInfo.title}</h3>
              {quizInfo.description && (
                <p className="mb-3 text-sm text-white/60">{quizInfo.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {quizInfo.questionCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {quizInfo.duration} min
                </span>
                {quizInfo.teacher && <span>By {quizInfo.teacher}</span>}
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs text-amber-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Once you start, the timer begins immediately. Switching tabs or windows will be
                recorded as a violation. <strong>3 violations = auto-submit.</strong>
              </p>
            </div>

            <StarBorder as="button"
              onClick={() => onJoined(quizInfo)}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Start Quiz
            </StarBorder>

            <StarBorder as="button"
              onClick={() => setQuizInfo(null)}
              className="w-full rounded-xl border border-white/20 bg-transparent px-6 py-2 text-sm text-white/60 transition hover:text-white"
            >
              Enter different code
            </StarBorder>
          </div>
        )}
      </motion.div>
    </div>
  );
};
