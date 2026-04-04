import { Suspense, lazy, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import type { Page } from './types/navigation';

const Landing = lazy(() => import('./pages/Landing').then((module) => ({ default: module.Landing })));
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));
const Signup = lazy(() => import('./pages/Signup').then((module) => ({ default: module.Signup })));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard').then((module) => ({ default: module.TeacherDashboard })));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard').then((module) => ({ default: module.StudentDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const ManageTeachers = lazy(() => import('./pages/ManageTeachers').then((module) => ({ default: module.ManageTeachers })));
const ManageStudents = lazy(() => import('./pages/ManageStudents').then((module) => ({ default: module.ManageStudents })));
const Profile = lazy(() => import('./pages/Profile').then((module) => ({ default: module.Profile })));

const AppLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-glass border border-white/10">
        <span className="text-white font-bold text-2xl">Q</span>
      </div>
      <p className="text-white/90">Loading GLA Exam...</p>
    </div>
  </div>
);

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  if (loading) {
    return <AppLoader />;
  }

  return (
    <Suspense fallback={<AppLoader />}>
      {/* If user is logged in, show appropriate dashboard */}
      {user && profile ? (
        <>
          {currentPage === 'profile' && <Profile onNavigate={() => setCurrentPage('landing')} />}

          {profile.role === 'admin' && (
            <>
              {(currentPage === 'teachers' || currentPage === 'manage-teachers') && <ManageTeachers onNavigate={setCurrentPage} />}
              {(currentPage === 'students' || currentPage === 'manage-students') && <ManageStudents onNavigate={setCurrentPage} />}
              {(currentPage === 'analytics' || currentPage === 'quiz-monitoring' || currentPage === 'quizzes' || currentPage === 'dashboard') && <AdminDashboard onNavigate={setCurrentPage} />}
            </>
          )}

          {profile.role === 'teacher' && <TeacherDashboard onNavigate={setCurrentPage} />}
          {profile.role === 'student' && <StudentDashboard onNavigate={setCurrentPage} />}
        </>
      ) : (
        <>
          {currentPage === 'landing' && <Landing onNavigate={setCurrentPage} />}
          {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
          {currentPage === 'signup' && <Signup onNavigate={setCurrentPage} />}
          {currentPage === 'profile' && <Profile onNavigate={() => setCurrentPage('landing')} />}
        </>
      )}
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
