import axios from 'axios';

const rawApiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};

    // Retry transient network/server failures for idempotent requests.
    const shouldRetry =
      (!error.response || error.response.status >= 500 || error.code === 'ECONNABORTED') &&
      ['get', 'head', 'options'].includes((config.method || 'get').toLowerCase());

    config.__retryCount = config.__retryCount || 0;
    if (shouldRetry && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;
      const backoffMs = 250 * config.__retryCount;
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return apiClient(config);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: 'teacher' | 'student' }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  logout: () =>
    apiClient.post('/auth/logout'),
};

// Quiz endpoints
export const quizAPI = {
  getAllQuizzes: (params?: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'newest' | 'oldest' | 'shortest' | 'longest' | 'alphabetical';
  }) =>
    apiClient.get('/quiz', { params }),
  getQuizById: (id: string) =>
    apiClient.get(`/quiz/${id}`),
  getTeacherQuizzes: (teacherId: string) =>
    apiClient.get(`/quiz/teacher/${teacherId}`),
  createQuiz: (data: {
    title: string;
    description: string;
    duration: number;
    questions: Array<{
      question_text: string;
      options: string[];
      correct_answer: number;
    }>;
  }) =>
    apiClient.post('/quiz', data),
  updateQuiz: (id: string, data: any) =>
    apiClient.put(`/quiz/${id}`, data),
  deleteQuiz: (id: string) =>
    apiClient.delete(`/quiz/${id}`),
  // Secure attempt endpoints
  joinByCode: (code: string) =>
    apiClient.post('/quiz/join', { code }),
  startAttempt: (quizId: string) =>
    apiClient.post(`/quiz/${quizId}/start`),
  submitAttempt: (quizId: string, data: {
    attemptId: string;
    answers: Array<{ questionId: string; selectedAnswer: number }>;
    autoSubmitted?: boolean;
  }) =>
    apiClient.post(`/quiz/${quizId}/submit`, data),
  recordViolation: (attemptId: string) =>
    apiClient.patch(`/quiz/attempt/${attemptId}/violation`),
};

// Result endpoints
export const resultAPI = {
  getUserResults: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/result', { params }),
  getQuizResults: (quizId: string, params?: { page?: number; limit?: number }) =>
    apiClient.get(`/result/quiz/${quizId}`, { params }),
  submitResult: (data: {
    quizId: string;
    answers: Array<{
      questionId: string;
      selectedAnswer: number;
    }>;
  }) =>
    apiClient.post('/result', data),
  getResultById: (id: string) =>
    apiClient.get(`/result/${id}`),
};

export const adminAPI = {
  getUsers: (params?: {
    role?: 'admin' | 'teacher' | 'student';
    status?: 'active' | 'inactive' | 'blocked';
    search?: string;
    page?: number;
    limit?: number;
  }) =>
    apiClient.get('/admin/users', { params }),
  blockUser: (userId: string) =>
    apiClient.post(`/admin/users/${userId}/block`),
  unblockUser: (userId: string) =>
    apiClient.post(`/admin/users/${userId}/unblock`),
  deleteUser: (userId: string) =>
    apiClient.delete(`/admin/users/${userId}`),
};

// User Profile endpoints
export const userAPI = {
  getProfile: () =>
    apiClient.get('/user/profile'),
  updateProfile: (data: {
    name?: string;
    email?: string;
    phone?: string;
    education?: string;
    schoolName?: string;
    classYear?: string;
  }) =>
    apiClient.put('/user/profile', data),
  updateProfilePicture: (profilePic: string) =>
    apiClient.put('/user/profile-picture', { profilePic }),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) =>
    apiClient.put('/user/password', data),
  getDashboardStats: () =>
    apiClient.get('/user/stats'),
  updatePreferences: (data: {
    darkMode?: boolean;
    notifications?: boolean;
  }) =>
    apiClient.put('/user/preferences', data),
  deleteAccount: (password: string) =>
    apiClient.delete('/user/account', { data: { password } }),
};

export default apiClient;
