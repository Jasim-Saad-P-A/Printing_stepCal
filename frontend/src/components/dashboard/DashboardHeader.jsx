import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { Plus, Sparkles } from 'lucide-react';

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resetJob } = useJobs();

  const handleCreateNew = () => {
    resetJob();
    navigate('/jobs/new');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">{user?.username || 'User'}</span>
          </h1>
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Welcome back to CloudPrint StepCalculator
        </p>
      </div>

      <button
        onClick={handleCreateNew}
        className="gradient-btn-primary self-start sm:self-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ ADD JOB SHEET</span>
      </button>
    </div>
  );
};
