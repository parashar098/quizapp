import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  created_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  duration: number;
  join_code: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  order_index: number;
  created_at: string;
}

export interface Result {
  id: string;
  student_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  answers: { question_id: string; selected_answer: number }[];
  submitted_at: string;
}
