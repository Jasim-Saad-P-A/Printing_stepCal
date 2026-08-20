import React, { useState, useRef, useEffect } from 'react';
import { useJobs } from '../../context/JobContext';
import { CanvasControls } from './CanvasControls';
import { NestedPart } from './NestedPart';
import { PartDetailsModal } from './PartDetailsModal';
import { Maximize2, Move } from 'lucide-react';

export const NestingCanvas = () => {
  const { currentJob, selectedPart, setSelectedPart, updatePlacementPosition } = useJobs();
  const containerRef = useRef(null);

  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Part dragging state
  const [draggingPart, setDraggingPart] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const sheetWidth = currentJob.sheet?.width || 1200;
  const sheetHeight = currentJob.sheet?.height || 800;
  const edgeMargin = currentJob.constraints?.edgeMargin || 5;

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(2.5, +(prev + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoom(prev => Math.max(0.4, +(prev - 0.15).toFixed(2)));
  const handleResetZoom = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Canvas Pan Handlers
  const handleCanvasMouseDown = (e) => {
    // Only pan if clicking on empty background
    if (e.target.tagName === 'svg' || e.target.id === 'canvas-bg' || e.target.id === 'sheet-bg') {
      setSelectedPart(null);
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (draggingPart && containerRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      // Calculate mouse position in SVG coordinates
      const scaleX = sheetWidth / rect.width;
      const scaleY = sheetHeight / rect.height;

      const mouseSvgX = (e.clientX - rect.left) * scaleX;
      const mouseSvgY = (e.clientY - rect.top) * scaleY;

      // Bound part inside sheet dimensions & margins
      const partW = draggingPart.width || 100;
      const partH = draggingPart.height || 100;

      const boundedX = Math.max(edgeMargin, Math.min(sheetWidth - partW - edgeMargin, mouseSvgX - dragOffset.x));
      const boundedY = Math.max(edgeMargin, Math.min(sheetHeight - partH - edgeMargin, mouseSvgY - dragOffset.y));

      updatePlacementPosition(draggingPart.id, boundedX, boundedY);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingPart(null);
  };

  const handleStartDragPart = (e, part) => {
    if (containerRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const scaleX = sheetWidth / rect.width;
        const scaleY = sheetHeight / rect.height;

        const mouseSvgX = (e.clientX - rect.left) * scaleX;
        const mouseSvgY = (e.clientY - rect.top) * scaleY;

        setDragOffset({
          x: mouseSvgX - part.x,
          y: mouseSvgY - part.y
        });
        setDraggingPart(part);
      }
    }
  };

  // Wheel zoom handler
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  return (
    <div className="bg-[#172235] border border-slate-700/70 rounded-xl p-5 shadow-xl flex flex-col gap-3 h-full relative overflow-hidden">
      {/* Header Row: Title on Left, Zoom Controls on Right */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 z-10">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
          <span>2. INTERACTIVE CANVAS PREVIEW</span>
        </h2>
        <CanvasControls
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />
      </div>

      {/* Main Canvas Viewport matching the reference dark blueprint frame */}
      <div
        ref={containerRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        id="canvas-bg"
        className="flex-1 min-h-[460px] lg:min-h-[580px] bg-[#090E1A] rounded-xl border border-slate-800/90 relative flex items-center justify-center overflow-hidden p-6 cursor-crosshair select-none"
      >
        {/* Transformable Canvas Group */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isPanning || draggingPart ? 'none' : 'transform 0.15s ease-out',
            width: '100%',
            maxWidth: '820px',
            aspectRatio: `${sheetWidth} / ${sheetHeight}`
          }}
          className="relative flex items-center justify-center"
        >
          {/* Sheet SVG Canvas */}
          <svg
            viewBox={`0 0 ${sheetWidth} ${sheetHeight}`}
            className="w-full h-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Subtle grid pattern for precision feel */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Sheet Background */}
            <rect
              id="sheet-bg"
              x="0"
              y="0"
              width={sheetWidth}
              height={sheetHeight}
              fill="#0E1626"
              rx="6"
            />

            {/* Grid Overlay */}
            <rect
              x="0"
              y="0"
              width={sheetWidth}
              height={sheetHeight}
              fill="url(#grid)"
              className="pointer-events-none"
            />

            {/* Dotted / Dashed Sheet Boundary matching reference */}
            <rect
              x={edgeMargin}
              y={edgeMargin}
              width={sheetWidth - edgeMargin * 2}
              height={sheetHeight - edgeMargin * 2}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.7"
              rx="4"
              className="pointer-events-none"
            />

            {/* Render Nested Parts */}
            {currentJob.placements && currentJob.placements.map((part) => (
              <NestedPart
                key={part.id}
                part={part}
                isSelected={selectedPart?.id === part.id}
                onSelect={(p) => setSelectedPart(p)}
                onStartDrag={handleStartDragPart}
              />
            ))}
          </svg>
        </div>

        {/* Selected Part Details Inspector */}
        <PartDetailsModal
          part={selectedPart}
          onClose={() => setSelectedPart(null)}
        />

        {/* Footer Hint Bar inside canvas */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-3 text-[11px] text-slate-500 bg-[#0B1220]/80 px-2.5 py-1 rounded-md border border-slate-800 pointer-events-none">
          <span>Sheet: {sheetWidth} × {sheetHeight} mm</span>
          <span>•</span>
          <span>Parts: {currentJob.placements?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};
