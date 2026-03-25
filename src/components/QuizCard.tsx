import { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, Trash2, Play, Eye } from 'lucide-react';
import StarBorder from './StarBorder';

interface Quiz {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  duration: number;
  joinCode?: string;
  join_code?: string;
  questions?: any[];
}

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (id: string) => void;
  onStart?: (id: string) => void;
  onViewResults?: (id: string) => void;
  showActions?: boolean;
  teacherName?: string;
  questionCount?: number;
}

const QuizCardComponent = ({
  quiz,
  onDelete,
  onStart,
  onViewResults,
  showActions = false,
  teacherName,
  questionCount = 0,
}: QuizCardProps) => {
  const quizId = quiz._id || quiz.id;
  const joinCode = quiz.joinCode || quiz.join_code;
  const questionCountValue = questionCount || quiz.questions?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="saas-card saas-card-hover"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary dark:text-slate-100">{quiz.title}</h3>
          <p className="mt-2 text-sm text-muted">{quiz.description}</p>
          {teacherName && (
            <p className="mt-3 text-xs text-muted">By {teacherName}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
          <span className="text-white font-semibold">{quiz.duration}m</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-2 text-xs text-text-secondary dark:bg-slate-800/80 dark:text-slate-300">
            <Clock className="h-4 w-4" />
            <span>{quiz.duration} min</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-2 text-xs text-text-secondary dark:bg-slate-800/80 dark:text-slate-300">
            <FileText className="h-4 w-4" />
            <span>{questionCountValue} questions</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-2 text-xs text-text-secondary dark:bg-slate-800/80 dark:text-slate-300">
            <span className="font-semibold">Code:</span>
            <span className="font-mono text-text-primary dark:text-slate-100">{joinCode || 'N/A'}</span>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              {onViewResults && (
                <StarBorder as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => quizId && onViewResults(quizId)}
                  className="rounded-xl bg-slate-200/70 p-2 text-text-secondary transition hover:bg-slate-300/80 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/80"
                  title="View Results"
                >
                  <Eye className="w-4 h-4" />
                </StarBorder>
              )}
              {onDelete && (
                <StarBorder as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => quizId && onDelete(quizId)}
                  className="rounded-xl bg-red-500/10 p-2 text-red-600 transition hover:bg-red-500/20 dark:text-red-300"
                  title="Delete Quiz"
                >
                  <Trash2 className="w-4 h-4" />
                </StarBorder>
              )}
            </div>
          )}

          {onStart && (
            <StarBorder as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => quizId && onStart(quizId)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </StarBorder>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const QuizCard = memo(QuizCardComponent);
