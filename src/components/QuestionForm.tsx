import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import StarBorder from './StarBorder';

export interface QuestionData {
  question_text: string;
  options: string[];
  correct_answer: number;
}

interface QuestionFormProps {
  onAdd: (question: QuestionData) => void;
  questionNumber: number;
}

export const QuestionForm = ({ onAdd, questionNumber }: QuestionFormProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && options.every((opt) => opt.trim())) {
      onAdd({
        question_text: question,
        options,
        correct_answer: correctAnswer,
      });
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="saas-card"
    >
      <h3 className="mb-4 text-lg font-semibold text-text-primary dark:text-slate-100">Question {questionNumber}</h3>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Question Text</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-modern"
            placeholder="Enter your question..."
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-muted">Options (select the correct answer)</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <StarBorder as="button"
                type="button"
                onClick={() => setCorrectAnswer(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  correctAnswer === index
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-slate-200/80 text-text-secondary hover:bg-slate-300/90 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/90'
                }`}
              >
                {correctAnswer === index ? <Check className="w-4 h-4" /> : index + 1}
              </StarBorder>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="input-modern flex-1"
                placeholder={`Option ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <StarBorder as={motion.button}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full"
        >
          Add Question
        </StarBorder>
      </div>
    </motion.form>
  );
};
