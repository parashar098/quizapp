import { motion } from 'framer-motion';
import { Home, PlusCircle, List, BarChart } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'teacher' | 'student';
}

export const Sidebar = ({ activeTab, onTabChange, role }: SidebarProps) => {
  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Quiz', icon: PlusCircle },
    { id: 'quizzes', label: 'My Quizzes', icon: List },
    { id: 'results', label: 'Results', icon: BarChart },
  ];

  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'quizzes', label: 'Available Quizzes', icon: List },
    { id: 'results', label: 'My Results', icon: BarChart },
  ];

  const tabs = role === 'teacher' ? teacherTabs : studentTabs;

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4"
    >
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
};
