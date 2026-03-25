import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import StarBorder from './StarBorder';

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  points: number;
}

interface CreateQuizProps {
  onClose: () => void;
  onSave: (quizData: {
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  }) => void;
}

export const CreateQuizModal = ({ onClose, onSave }: CreateQuizProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1,
  });
  const [error, setError] = useState('');

  const addQuestion = () => {
    if (!currentQuestion.text?.trim()) {
      setError('Please enter a question');
      return;
    }

    if (currentQuestion.type === 'multiple-choice') {
      if (currentQuestion.options?.some(o => !o.trim())) {
        setError('Please fill all options');
        return;
      }
    }

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: currentQuestion.text || '',
      type: currentQuestion.type || 'multiple-choice',
      options: currentQuestion.options || ['', '', '', ''],
      correctAnswer: currentQuestion.correctAnswer || 0,
      points: currentQuestion.points || 1,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1,
    });
    setError('');
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter quiz title');
      return;
    }
    if (questions.length === 0) {
      setError('Please add at least one question');
      return;
    }

    onSave({
      title,
      description,
      duration,
      questions,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Quiz</h2>
          <StarBorder as="button"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-6 h-6 text-white" />
          </StarBorder>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-white">
          {/* Quiz Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quiz Details</h3>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quiz description"
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="1"
                max="120"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:bg-white/20 focus:border-white/40 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Add Questions */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold">Add Questions</h3>

            {/* Question Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Question Text
                </label>
                <textarea
                  value={currentQuestion.text || ''}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                  placeholder="Enter question"
                  rows={2}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Question Type
                  </label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => {
                      const type = e.target.value as 'multiple-choice' | 'true-false';
                      setCurrentQuestion({
                        ...currentQuestion,
                        type,
                        options: type === 'true-false' ? ['True', 'False'] : ['', '', '', ''],
                      });
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:bg-white/20 focus:border-white/40 focus:outline-none transition"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={currentQuestion.points || 1}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                    min="1"
                    max="10"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:bg-white/20 focus:border-white/40 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Options
                </label>
                {currentQuestion.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correct"
                      checked={currentQuestion.correctAnswer === idx}
                      onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: idx })}
                      className="w-4 h-4"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(currentQuestion.options || [])];
                        newOptions[idx] = e.target.value;
                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition disabled:opacity-50"
                      disabled={currentQuestion.type === 'true-false'}
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <StarBorder as="button"
                onClick={addQuestion}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </StarBorder>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-white/80">Added Questions ({questions.length})</h4>
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{idx + 1}. {q.text}</p>
                      <p className="text-xs text-white/60 mt-1">
                        {q.type === 'multiple-choice' ? '4 Options' : 'True/False'} • {q.points} points
                      </p>
                    </div>
                    <StarBorder as="button"
                      onClick={() => removeQuestion(idx)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </StarBorder>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <StarBorder as="button"
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-semibold text-white transition"
            >
              Cancel
            </StarBorder>
            <StarBorder as="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-xl font-semibold text-white transition"
            >
              Save Quiz
            </StarBorder>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
