import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1220] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary: 'gradient-btn-primary text-white shadow-lg shadow-blue-500/20 focus:ring-indigo-500 active:scale-[0.98]',
    success: 'btn-success text-white shadow-lg shadow-emerald-500/20 focus:ring-emerald-500 active:scale-[0.98]',
    secondary: 'bg-[#172235] text-slate-200 hover:bg-[#1E293B] border border-slate-700/60 hover:border-slate-600 focus:ring-slate-500',
    outline: 'bg-transparent text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 focus:ring-slate-500',
    danger: 'bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30 focus:ring-rose-500',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50 focus:ring-slate-600'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className={clsx(size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
