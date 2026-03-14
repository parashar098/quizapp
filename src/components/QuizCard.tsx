import { motion } from 'framer-motion';
import { Clock, FileText, Trash2, Play, Eye } from 'lucide-react';
import { Quiz } from '../lib/supabase';

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (id: string) => void;
  onStart?: (id: string) => void;
  onViewResults?: (id: string) => void;
  showActions?: boolean;
  teacherName?: string;
  questionCount?: number;
}

export const QuizCard = ({
  quiz,
  onDelete,
  onStart,
  onViewResults,
  showActions = false,
  teacherName,
  questionCount = 0,
}: QuizCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
          {teacherName && (
            <p className="text-sm text-gray-500">By: {teacherName}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{quiz.duration} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{questionCount} questions</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-blue-700">
            Code: {quiz.join_code}
          </span>
        </div>

        {showActions && (
          <div className="flex items-center space-x-2">
            {onViewResults && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onViewResults(quiz.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="View Results"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            )}
            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(quiz.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Quiz"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        )}

        {onStart && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(quiz.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Play className="w-4 h-4" />
            <span>Start Quiz</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
