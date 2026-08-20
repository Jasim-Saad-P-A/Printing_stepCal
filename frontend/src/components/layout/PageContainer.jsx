import React from 'react';
import { Header } from './Header';
import { ToastContainer } from '../common/Toast';

export const PageContainer = ({ children, hideHeader = false, maxWidth = 'max-w-[1600px]' }) => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {!hideHeader && <Header />}
      <main className={`flex-1 w-full ${maxWidth} mx-auto px-4 lg:px-8 py-6`}>
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};
