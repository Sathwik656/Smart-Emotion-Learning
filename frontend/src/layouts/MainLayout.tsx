import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50 w-full">
      <header className="glass-panel sticky top-0 z-50 flex justify-between items-center px-6 py-4">
        <Link to="/dashboard" className="text-xl font-bold text-blue-400">
          SmartEmotion
        </Link>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <User size={16} />
            {user?.name || 'Student'}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
