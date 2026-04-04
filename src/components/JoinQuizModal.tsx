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
        className="mx-4 w-full max-w-md rounded-3xl border border-white/60 bg-white/96 p-8 shadow-2xl backdrop-blur-lg dark:border-slate-700 dark:bg-slate-950/95"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-primary dark:text-slate-100">Join Quiz</h2>
          <StarBorder as="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted transition hover:bg-slate-100 hover:text-text-primary dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </StarBorder>
        </div>

        {!quizInfo ? (
          /* Code entry */
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">
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
                className="w-full rounded-xl border border-ui-border bg-slate-50 px-4 py-3 text-center font-mono text-2xl font-bold uppercase tracking-widest text-text-primary placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            {error && <p className="text-sm text-ui-error">{error}</p>}

            <StarBorder as="button"
              onClick={handleFind}
              disabled={loading || code.trim().length < 4}
              className="w-full rounded-xl bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Searching…' : 'Find Quiz'}
            </StarBorder>
          </div>
        ) : (
          /* Quiz info + start confirmation */
          <div className="space-y-4">
            <div className="rounded-2xl border border-ui-border bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="mb-1 text-xl font-bold text-text-primary dark:text-slate-100">{quizInfo.title}</h3>
              {quizInfo.description && (
                <p className="mb-3 text-sm text-muted">{quizInfo.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted">
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

            <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Once you start, the timer begins immediately. Switching tabs or windows will be
                recorded as a violation. <strong>3 violations = auto-submit.</strong>
              </p>
            </div>

            <StarBorder as="button"
              onClick={() => onJoined(quizInfo)}
              className="w-full rounded-xl bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Start Quiz
            </StarBorder>

            <StarBorder as="button"
              onClick={() => setQuizInfo(null)}
              className="w-full rounded-xl border border-ui-border bg-transparent px-6 py-2 text-sm text-muted transition hover:text-text-primary dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
            >
              Enter different code
            </StarBorder>
          </div>
        )}
      </motion.div>
    </div>
  );
};
