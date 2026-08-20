import React from 'react';
import { X, Box, FileCode, Maximize2, Move } from 'lucide-react';

export const PartDetailsModal = ({ part, onClose }) => {
  if (!part) return null;

  return (
    <div className="absolute bottom-4 left-4 z-30 bg-[#111C30]/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl w-64 text-xs animate-slide-up">
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: part.color || '#3B82F6' }}
          />
          <span className="truncate">{part.name || 'Selected Part'}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2 text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Type:</span>
          <span className="font-medium text-white capitalize">{part.type?.replace('_', ' ') || 'Polygon'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Source:</span>
          <span className="font-mono text-[11px] text-blue-400 truncate max-w-[120px]">{part.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Dimensions:</span>
          <span className="font-mono font-medium text-white">{Math.round(part.width)} × {Math.round(part.height)} mm</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Position (X, Y):</span>
          <span className="font-mono text-slate-300">{Math.round(part.x)}, {Math.round(part.y)}</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
        <Move className="w-3 h-3 text-slate-500" />
        <span>Click & drag part to reposition on sheet</span>
      </div>
    </div>
  );
};
