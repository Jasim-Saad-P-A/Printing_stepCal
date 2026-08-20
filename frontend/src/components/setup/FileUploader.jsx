import React, { useRef, useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { ArrowDown, FileCode, Trash2, CheckCircle2, UploadCloud } from 'lucide-react';

export const FileUploader = () => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { currentJob, addUploadedFiles, removeUploadedFile } = useJobs();

  const handleFiles = (filesList) => {
    const validFiles = [];
    Array.from(filesList).forEach((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'svg' || ext === 'dxf') {
        const sizeFormatted = (file.size / 1024).toFixed(1) + ' KB';
        let shapeType = 'polygon';
        let color = '#6366F1';

        if (file.name.toLowerCase().includes('box') || ext === 'dxf') {
          shapeType = 'irregular_polygon';
          color = '#10B981';
        } else if (file.name.toLowerCase().includes('seal') || file.name.toLowerCase().includes('circle')) {
          shapeType = 'circle';
          color = '#EC4899';
        } else if (file.name.toLowerCase().includes('bracket') || file.name.toLowerCase().includes('rect')) {
          shapeType = 'rectangle';
          color = '#F59E0B';
        }

        validFiles.push({
          id: 'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          name: file.name,
          type: ext.toUpperCase(),
          size: sizeFormatted,
          shapeType,
          color
        });
      }
    });

    if (validFiles.length > 0) {
      addUploadedFiles(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
        IMPORT POLYGONS (.SVG / .DXF)
      </label>

      {/* Drop Zone matching the reference dashed box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
          isDragging
            ? 'border-blue-500 bg-blue-950/30 shadow-inner'
            : 'border-blue-600/40 hover:border-blue-500 bg-[#0D1525]/60 hover:bg-[#0D1525]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".svg,.dxf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="text-blue-400 font-bold text-lg leading-none">
          ↓
        </div>

        <p className="text-xs text-slate-300 font-medium leading-tight">
          Drag & drop vector shapes here
        </p>
        <p className="text-[11px] text-slate-400">
          or <span className="text-blue-400 hover:underline">browse local files</span>
        </p>
      </div>

      {/* Uploaded Files List */}
      {currentJob.files && currentJob.files.length > 0 && (
        <div className="space-y-1.5 mt-1 max-h-36 overflow-y-auto pr-1">
          {currentJob.files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-2 rounded-md bg-[#0D1525] border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: file.color || '#3B82F6' }}
                />
                <span className="font-medium text-slate-200 truncate">{file.name}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                  {file.type}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  {file.size}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeUploadedFile(file.id);
                }}
                className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
