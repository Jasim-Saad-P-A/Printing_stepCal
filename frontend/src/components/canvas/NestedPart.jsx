import React from 'react';

export const NestedPart = ({
  part,
  isSelected,
  onSelect,
  onStartDrag
}) => {
  const { id, type, x, y, width, height, radius = 70, points, color, strokeColor, fillColor, innerDivider } = part;

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelect(part);
    onStartDrag(e, part);
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseDown={handleMouseDown}
      className={`cursor-grab active:cursor-grabbing transition-transform duration-75 select-none ${
        isSelected ? 'filter drop-shadow(0 0 10px rgba(59, 130, 246, 0.9))' : 'hover:opacity-90'
      }`}
    >
      {/* Selection outline glow */}
      {isSelected && (
        <rect
          x="-6"
          y="-6"
          width={width + 12}
          height={height + 12}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          rx="4"
          className="animate-pulse pointer-events-none"
        />
      )}

      {/* Render shape based on type */}
      {type === 'polygon' && (
        <g>
          <polygon
            points={points || '40,0 220,0 180,60 220,120 40,120 0,60'}
            fill={fillColor || 'rgba(99, 102, 241, 0.35)'}
            stroke={strokeColor || '#818CF8'}
            strokeWidth={isSelected ? '3' : '2'}
            strokeLinejoin="round"
          />
          {innerDivider && (
            <line
              x1="60"
              y1="60"
              x2="160"
              y2="60"
              stroke={strokeColor || '#818CF8'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}
        </g>
      )}

      {type === 'irregular_polygon' && (
        <polygon
          points={points || '20,0 200,0 220,90 110,130 0,90'}
          fill={fillColor || 'rgba(16, 185, 129, 0.25)'}
          stroke={strokeColor || '#34D399'}
          strokeWidth={isSelected ? '3' : '2'}
          strokeLinejoin="round"
        />
      )}

      {type === 'rectangle' && (
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx="8"
          ry="8"
          fill={fillColor || 'rgba(245, 158, 11, 0.25)'}
          stroke={strokeColor || '#FBBF24'}
          strokeWidth={isSelected ? '3' : '2'}
        />
      )}

      {type === 'circle' && (
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={fillColor || 'rgba(236, 72, 153, 0.25)'}
          stroke={strokeColor || '#F472B6'}
          strokeWidth={isSelected ? '3' : '2'}
        />
      )}
    </g>
  );
};
