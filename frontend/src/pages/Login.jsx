import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { Layers, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ToastContainer } from '../components/common/Toast';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useJobs();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username or email address.');
      addToast('Username is required.', 'warning');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      addToast('Password is required.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      addToast(`Welcome back, ${username.trim()}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
      addToast(err.message || 'Login failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (userType) => {
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('Jasim');
      setPassword('admin123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background blueprint grid styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Decorative ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Main Login Card */}
        <div className="bg-[#172235] border border-slate-700/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
          {/* Brand Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold tracking-tight text-white">
              <span>CloudPrint</span>
              <span className="text-blue-400 font-normal">StepCalculator</span>
            </div>
            <div className="mt-3">
              <h2 className="text-lg font-semibold text-slate-100">Welcome Back</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Sign in to continue to CloudPrint
              </p>
            </div>
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Username / Email
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or email"
                  className="w-full bg-[#0D1525] text-slate-100 text-sm rounded-lg border border-slate-700/80 pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0D1525] text-slate-100 text-sm rounded-lg border border-slate-700/80 pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#0D1525] border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => addToast('Password reset link sent to registered email.', 'info')}
                className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 font-bold tracking-wider"
              isLoading={isLoading}
            >
              LOGIN
            </Button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 mb-2.5">
              Quick Demo Access (Sample Credentials):
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="px-2.5 py-1 rounded bg-[#0D1525] hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Admin (admin123)
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('jasim')}
                className="px-2.5 py-1 rounded bg-[#0D1525] hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Jasim (admin123)
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
