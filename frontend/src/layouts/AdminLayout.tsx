import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, LayoutDashboard, Settings, UserCircle } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-50 w-full">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-violet-400">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === '/admin' ? 'bg-violet-500/20 text-violet-300' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === '/admin/settings' ? 'bg-violet-500/20 text-violet-300' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4 text-sm text-slate-300 px-2">
            <UserCircle size={24} />
            <div>
              <p className="font-medium">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
