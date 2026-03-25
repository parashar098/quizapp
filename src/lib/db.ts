export interface User {
  id: string;
  email: string;
}

export type Role = 'admin' | 'teacher' | 'student';

export interface Profile {
  id: string;
  name: string;
  role: Role;
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

const STORAGE_KEYS = {
  users: 'quizmaster_users',
  profiles: 'quizmaster_profiles',
  quizzes: 'quizmaster_quizzes',
  questions: 'quizmaster_questions',
  results: 'quizmaster_results',
  session: 'quizmaster_session',
};

const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const makeId = () => crypto.randomUUID();

export const auth = {
  getSession: async () => {
    const session = readStorage<{ userId: string } | null>(STORAGE_KEYS.session, null);
    if (!session) return { data: { session: null } };
    const users = readStorage<User[]>(STORAGE_KEYS.users, []);
    const user = users.find((u) => u.id === session.userId) ?? null;
    return { data: { session: user ? { user } : null } };
  },

  onAuthStateChange: (callback: (event: string, session: { user: User } | null) => void) => {
    const handler = () => {
      const session = readStorage<{ userId: string } | null>(STORAGE_KEYS.session, null);
      if (session) {
        const users = readStorage<User[]>(STORAGE_KEYS.users, []);
        const user = users.find((u) => u.id === session.userId);
        callback('SIGNED_IN', user ? { user } : null);
      } else {
        callback('SIGNED_OUT', null);
      }
    };

    window.addEventListener('storage', handler);

    // Immediately invoke once
    handler();

    return {
      subscription: {
        unsubscribe: () => window.removeEventListener('storage', handler),
      },
    };
  },

  signUp: async (opts: { email: string; password: string }) => {
    const users = readStorage<(User & { password: string })[]>(STORAGE_KEYS.users, []);
    const existing = users.find((u) => u.email.toLowerCase() === opts.email.toLowerCase());
    if (existing) {
      return { error: new Error('Email already registered') };
    }

    const newUser: User & { password: string } = {
      id: makeId(),
      email: opts.email,
      password: opts.password,
    };
    users.push(newUser);
    writeStorage(STORAGE_KEYS.users, users);
    writeStorage(STORAGE_KEYS.session, { userId: newUser.id });

    return { data: { user: newUser } };
  },

  signInWithPassword: async (opts: { email: string; password: string }) => {
    const users = readStorage<(User & { password: string })[]>(STORAGE_KEYS.users, []);
    const user = users.find(
      (u) => u.email.toLowerCase() === opts.email.toLowerCase() && u.password === opts.password
    );
    if (!user) {
      return { error: new Error('Invalid credentials') };
    }

    writeStorage(STORAGE_KEYS.session, { userId: user.id });
    return { data: { user } };
  },

  signOut: async () => {
    localStorage.removeItem(STORAGE_KEYS.session);
    return { data: null };
  },
};

export const db = {
  getProfiles: () => readStorage<Profile[]>(STORAGE_KEYS.profiles, []),
  saveProfile: (profile: Profile) => {
    const current = readStorage<Profile[]>(STORAGE_KEYS.profiles, []);
    const updated = [...current.filter((p) => p.id !== profile.id), profile];
    writeStorage(STORAGE_KEYS.profiles, updated);
    return profile;
  },
  getProfileById: (id: string) => readStorage<Profile[]>(STORAGE_KEYS.profiles, []).find((p) => p.id === id) ?? null,

  getQuizzes: () => readStorage<Quiz[]>(STORAGE_KEYS.quizzes, []),
  saveQuiz: (quiz: Quiz) => {
    const current = readStorage<Quiz[]>(STORAGE_KEYS.quizzes, []);
    const updated = [...current.filter((q) => q.id !== quiz.id), quiz];
    writeStorage(STORAGE_KEYS.quizzes, updated);
    return quiz;
  },
  deleteQuiz: (quizId: string) => {
    const current = readStorage<Quiz[]>(STORAGE_KEYS.quizzes, []);
    const updated = current.filter((q) => q.id !== quizId);
    writeStorage(STORAGE_KEYS.quizzes, updated);
  },

  getQuestions: () => readStorage<Question[]>(STORAGE_KEYS.questions, []),
  saveQuestions: (questions: Question[]) => {
    const current = readStorage<Question[]>(STORAGE_KEYS.questions, []);
    const others = current.filter((q) => !questions.some((n) => n.id === q.id));
    writeStorage(STORAGE_KEYS.questions, [...others, ...questions]);
  },
  deleteQuestionsByQuiz: (quizId: string) => {
    const current = readStorage<Question[]>(STORAGE_KEYS.questions, []);
    writeStorage(
      STORAGE_KEYS.questions,
      current.filter((q) => q.quiz_id !== quizId)
    );
  },

  getResults: () => readStorage<Result[]>(STORAGE_KEYS.results, []),
  saveResult: (result: Result) => {
    const current = readStorage<Result[]>(STORAGE_KEYS.results, []);
    const updated = [...current.filter((r) => r.id !== result.id), result];
    writeStorage(STORAGE_KEYS.results, updated);
    return result;
  },
  deleteResultsByQuiz: (quizId: string) => {
    const current = readStorage<Result[]>(STORAGE_KEYS.results, []);
    writeStorage(
      STORAGE_KEYS.results,
      current.filter((r) => r.quiz_id !== quizId)
    );
  },
};

export const createQuizId = () => makeId();
export const createQuestionId = () => makeId();
export const createResultId = () => makeId();
