import { motion } from 'framer-motion';
import { Home, PlusCircle, List, BarChart, Settings } from 'lucide-react';
import StarBorder from './StarBorder';
import { LogoutButton } from './LogoutButton';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'teacher' | 'student';
  onLogout?: () => void;
}

export const Sidebar = ({ activeTab, onTabChange, role, onLogout }: SidebarProps) => {
  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Quiz', icon: PlusCircle },
    { id: 'quizzes', label: 'My Quizzes', icon: List },
    { id: 'results', label: 'Results', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'quizzes', label: 'Available Quizzes', icon: List },
    { id: 'results', label: 'My Results', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const tabs = role === 'teacher' ? teacherTabs : studentTabs;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:block w-72 shrink-0 border-r border-ui-border bg-white/92 p-6 backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/92"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Navigation</p>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <StarBorder as={motion.button}
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium text-sm">{tab.label}</span>
            </StarBorder>
          );
        })}
      </nav>

      <div className="mt-8 rounded-xl border border-ui-border bg-white px-4 py-4 shadow-soft dark:border-slate-700/70 dark:bg-slate-900/70">
        <p className="mb-2 text-xs text-muted">Need help?</p>
        <p className="text-sm text-text-primary dark:text-slate-100">Visit the guide in the docs or reach out.</p>
      </div>

      <div className="mt-4">
        <LogoutButton variant="compact" onLogoutComplete={onLogout} />
      </div>
    </motion.aside>
  );
};
