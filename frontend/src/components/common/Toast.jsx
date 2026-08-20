import React from 'react';
import { useJobs } from '../../context/JobContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { clsx } from 'clsx';

export const ToastContainer = () => {
  const { toasts, removeToast } = useJobs();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-[#0F291E]/95 text-emerald-100',
    error: 'border-rose-500/40 bg-[#2D1217]/95 text-rose-100',
    warning: 'border-amber-500/40 bg-[#2B1F0E]/95 text-amber-100',
    info: 'border-blue-500/40 bg-[#132238]/95 text-blue-100'
  };

  return (
    <div
      className={clsx(
        'pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up',
        borders[toast.type] || borders.info
      )}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type] || icons.info}
        <p className="text-xs sm:text-sm font-medium leading-tight">{toast.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="ml-3 p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
