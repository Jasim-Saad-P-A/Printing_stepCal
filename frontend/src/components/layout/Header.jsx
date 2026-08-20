import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { Layers, Plus, FolderKanban, LogOut, User as UserIcon, LayoutDashboard, CheckSquare, FileText } from 'lucide-react';
import { SavedJobsModal } from '../jobs/SavedJobsModal';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalJobsCount, resetJob } = useJobs();
  const [isSavedJobsOpen, setIsSavedJobsOpen] = useState(false);

  const handleNewJob = () => {
    resetJob();
    navigate('/jobs/new');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#111C30]/95 backdrop-blur border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">CloudPrint</span>
                <span className="text-lg font-normal text-slate-300">StepCalculator</span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1.5 ml-4">
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  location.pathname === '/dashboard'
                    ? 'bg-[#172235] text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <Link
                to="/jobs/completed"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  location.pathname === '/jobs/completed'
                    ? 'bg-[#172235] text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Completed
              </Link>
              <Link
                to="/jobs/drafts"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  location.pathname === '/jobs/drafts'
                    ? 'bg-[#172235] text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Drafts
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Saved Jobs Trigger Button */}
            <button
              onClick={() => setIsSavedJobsOpen(true)}
              className="bg-[#172235] hover:bg-[#1E293B] text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg border border-slate-700/70 text-xs font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
              <span>Saved Jobs ({totalJobsCount || 24})</span>
            </button>

            {/* + New Job Sheet Button */}
            <button
              onClick={handleNewJob}
              className="gradient-btn-primary text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New Job Sheet</span>
            </button>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200 leading-tight">
                  {user?.username || 'admin'}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {user?.role || 'Engineer'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Saved Jobs Slideover / Modal */}
      <SavedJobsModal isOpen={isSavedJobsOpen} onClose={() => setIsSavedJobsOpen(false)} />
    </>
  );
};
