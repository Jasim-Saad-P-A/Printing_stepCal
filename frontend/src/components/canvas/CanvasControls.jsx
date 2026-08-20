import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

export const CanvasControls = ({ zoom, onZoomIn, onZoomOut, onResetZoom }) => {
  return (
    <div className="flex items-center gap-1.5 bg-[#0D1525] border border-slate-700/80 rounded-lg px-2.5 py-1 select-none">
      <span className="text-xs font-mono font-medium text-slate-300 mr-1.5">
        Zoom: {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In"
        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out"
        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onResetZoom}
        title="Reset Zoom (100%)"
        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border-l border-slate-800 ml-0.5 pl-1.5"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
};
