import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  profile: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, role: 'teacher' | 'student') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setProfile(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string, role: 'teacher' | 'student') => {
    try {
      console.log('[AuthContext] Signup request:', { email, name, role });
      const response = await authAPI.register({ email, password, name, role });
      console.log('[AuthContext] Signup response:', response.data);
      
      const { token, user: userData } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setProfile(userData);
      
      console.log('[AuthContext] ✅ Signup successful, user state updated');
    } catch (error: any) {
      console.error('[AuthContext] ❌ Signup error:', error);
      
      // Extract error message from various sources
      let errorMessage = 'Registration failed';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.error('[AuthContext] Error to throw:', errorMessage);
      
      // Throw as Error object (not just string)
      const err = new Error(errorMessage);
      Object.assign(err, { response: error.response });
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('[AuthContext] Login request:', { email });
      const response = await authAPI.login({ email, password });
      console.log('[AuthContext] Login response:', response.data);
      
      const { token, user: userData } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setProfile(userData);
      
      console.log('[AuthContext] ✅ Login successful, user state updated');
    } catch (error: any) {
      console.error('[AuthContext] ❌ Login error:', error);
      
      // Extract error message
      let errorMessage = 'Login failed';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.error('[AuthContext] Error to throw:', errorMessage);
      
      // Throw as Error object
      const err = new Error(errorMessage);
      Object.assign(err, { response: error.response });
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setProfile(null);
      setUser(null);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
