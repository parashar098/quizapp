import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

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
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Question {questionNumber}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your question..."
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Options (select the correct answer)
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setCorrectAnswer(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  correctAnswer === index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {correctAnswer === index && <Check className="w-4 h-4" />}
              </button>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Option ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Add Question
        </motion.button>
      </div>
    </motion.form>
  );
};
