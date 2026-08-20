// Seed mock database for CloudPrint StepCalculator

export const INITIAL_PARTS = [
  {
    id: 'poly-chevron-1',
    name: 'Polygon_A.svg',
    type: 'polygon',
    color: '#6366F1',
    fillColor: 'rgba(99, 102, 241, 0.25)',
    strokeColor: '#818CF8',
    width: 220,
    height: 120,
    count: 48,
    fileType: 'SVG',
    fileSize: '18.4 KB',
    // Chevron polygon points relative to (0,0)
    points: '40,0 220,0 180,60 220,120 40,120 0,60',
    innerPoints: '60,60 160,60',
    svgPath: 'M 40 0 L 220 0 L 180 60 L 220 120 L 40 120 L 0 60 Z'
  },
  {
    id: 'poly-pentagon-1',
    name: 'Packaging_Box.dxf',
    type: 'irregular_polygon',
    color: '#10B981',
    fillColor: 'rgba(16, 185, 129, 0.2)',
    strokeColor: '#34D399',
    width: 220,
    height: 130,
    count: 24,
    fileType: 'DXF',
    fileSize: '32.1 KB',
    // Inverted pentagon / house roof down polygon
    points: '20,0 200,0 220,90 110,130 0,90',
    svgPath: 'M 20 0 L 200 0 L 220 90 L 110 130 L 0 90 Z'
  },
  {
    id: 'poly-rectangle-1',
    name: 'Bracket_Mount.dxf',
    type: 'rectangle',
    color: '#F59E0B',
    fillColor: 'rgba(245, 158, 11, 0.2)',
    strokeColor: '#FBBF24',
    width: 240,
    height: 140,
    count: 36,
    fileType: 'DXF',
    fileSize: '14.8 KB',
    points: '0,0 240,0 240,140 0,140',
    svgPath: 'M 0 0 L 240 0 L 240 140 L 0 140 Z'
  },
  {
    id: 'poly-circle-1',
    name: 'Circle_Seal.svg',
    type: 'circle',
    color: '#EC4899',
    fillColor: 'rgba(236, 72, 153, 0.2)',
    strokeColor: '#F472B6',
    width: 140,
    height: 140,
    radius: 70,
    count: 70,
    fileType: 'SVG',
    fileSize: '9.2 KB',
    points: '',
    svgPath: ''
  }
];

export const INITIAL_JOBS = [
  {
    id: 'JOB-1024',
    name: 'Production Batch 01',
    status: 'completed',
    createdAt: '2026-08-18T10:30:00Z',
    updatedAt: '2026-08-19T14:20:00Z',
    sheet: {
      width: 1200,
      height: 800
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [
      { id: 'f-1', name: 'Polygon_A.svg', type: 'SVG', size: '18.4 KB', shapeType: 'polygon', color: '#6366F1' },
      { id: 'f-2', name: 'Packaging_Box.dxf', type: 'DXF', size: '32.1 KB', shapeType: 'irregular_polygon', color: '#10B981' },
      { id: 'f-3', name: 'Circle_Seal.svg', type: 'SVG', size: '9.2 KB', shapeType: 'circle', color: '#EC4899' }
    ],
    parts: INITIAL_PARTS,
    placements: [
      // Row 1: Chevron / polygon shapes (Indigo / Blue)
      { id: 'p-1', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 70, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },
      { id: 'p-2', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 310, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },
      { id: 'p-3', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 550, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },

      // Row 2: Irregular pentagons / house shapes (Emerald Green)
      { id: 'p-4', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 60, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },
      { id: 'p-5', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 300, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },
      { id: 'p-6', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 540, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },

      // Row 3: Rounded Rectangles (Amber / Yellow)
      { id: 'p-7', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 70, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },
      { id: 'p-8', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 330, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },
      { id: 'p-9', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 590, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },

      // Row 4: Circles (Pink / Rose)
      { id: 'p-10', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 80, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
      { id: 'p-11', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 240, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
      { id: 'p-12', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 400, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
      { id: 'p-13', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 560, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
    ],
    analytics: {
      yield: 92.4,
      waste: 7.6,
      totalFitted: 142,
      comparisonVsManual: '+4.2%'
    },
    breakdown: [
      { name: 'Polygon_A.svg', count: 48, color: '#6366F1' },
      { name: 'Packaging_Box.dxf', count: 24, color: '#10B981' },
      { name: 'Circle_Seal.svg', count: 70, color: '#EC4899' }
    ]
  },
  {
    id: 'JOB-1023',
    name: 'Packaging Batch 02',
    status: 'draft',
    createdAt: '2026-08-17T09:15:00Z',
    updatedAt: '2026-08-18T16:45:00Z',
    sheet: {
      width: 1000,
      height: 700
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [
      { id: 'f-1', name: 'Packaging_Box.dxf', type: 'DXF', size: '32.1 KB', shapeType: 'irregular_polygon', color: '#10B981' },
      { id: 'f-2', name: 'Circle_Seal.svg', type: 'SVG', size: '9.2 KB', shapeType: 'circle', color: '#EC4899' }
    ],
    parts: INITIAL_PARTS.slice(1, 4),
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 98,
      comparisonVsManual: '--'
    },
    breakdown: [
      { name: 'Packaging_Box.dxf', count: 40, color: '#10B981' },
      { name: 'Circle_Seal.svg', count: 58, color: '#EC4899' }
    ]
  },
  {
    id: 'JOB-1022',
    name: 'Automotive Gasket Sheet D',
    status: 'completed',
    createdAt: '2026-08-16T14:00:00Z',
    updatedAt: '2026-08-16T17:30:00Z',
    sheet: {
      width: 1500,
      height: 1000
    },
    constraints: {
      grainAlignment: false,
      edgeMargin: 8,
      gutterSpace: 3
    },
    files: [
      { id: 'f-1', name: 'Bracket_Mount.dxf', type: 'DXF', size: '14.8 KB', shapeType: 'rectangle', color: '#F59E0B' },
      { id: 'f-2', name: 'Circle_Seal.svg', type: 'SVG', size: '9.2 KB', shapeType: 'circle', color: '#EC4899' }
    ],
    parts: INITIAL_PARTS.slice(2, 4),
    placements: [],
    analytics: {
      yield: 88.9,
      waste: 11.1,
      totalFitted: 210,
      comparisonVsManual: '+3.1%'
    },
    breakdown: [
      { name: 'Bracket_Mount.dxf', count: 90, color: '#F59E0B' },
      { name: 'Circle_Seal.svg', count: 120, color: '#EC4899' }
    ]
  },
  {
    id: 'JOB-1021',
    name: 'Custom Acrylic Signage X',
    status: 'completed',
    createdAt: '2026-08-15T11:20:00Z',
    updatedAt: '2026-08-15T15:10:00Z',
    sheet: {
      width: 1200,
      height: 800
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [
      { id: 'f-1', name: 'Polygon_A.svg', type: 'SVG', size: '18.4 KB', shapeType: 'polygon', color: '#6366F1' }
    ],
    parts: [INITIAL_PARTS[0]],
    placements: [],
    analytics: {
      yield: 94.1,
      waste: 5.9,
      totalFitted: 64,
      comparisonVsManual: '+5.5%'
    },
    breakdown: [
      { name: 'Polygon_A.svg', count: 64, color: '#6366F1' }
    ]
  },
  {
    id: 'JOB-1020',
    name: 'Enclosure Panels Proto 3',
    status: 'draft',
    createdAt: '2026-08-14T08:40:00Z',
    updatedAt: '2026-08-14T10:15:00Z',
    sheet: {
      width: 1100,
      height: 750
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 6,
      gutterSpace: 2
    },
    files: [
      { id: 'f-1', name: 'Packaging_Box.dxf', type: 'DXF', size: '32.1 KB', shapeType: 'irregular_polygon', color: '#10B981' }
    ],
    parts: [INITIAL_PARTS[1]],
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 45,
      comparisonVsManual: '--'
    },
    breakdown: [
      { name: 'Packaging_Box.dxf', count: 45, color: '#10B981' }
    ]
  },
  {
    id: 'JOB-1019',
    name: 'Chassis Spacers Run 08',
    status: 'draft',
    createdAt: '2026-08-13T13:10:00Z',
    updatedAt: '2026-08-13T14:50:00Z',
    sheet: {
      width: 1200,
      height: 800
    },
    constraints: {
      grainAlignment: false,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [
      { id: 'f-1', name: 'Circle_Seal.svg', type: 'SVG', size: '9.2 KB', shapeType: 'circle', color: '#EC4899' }
    ],
    parts: [INITIAL_PARTS[3]],
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 110,
      comparisonVsManual: '--'
    },
    breakdown: [
      { name: 'Circle_Seal.svg', count: 110, color: '#EC4899' }
    ]
  },
  {
    id: 'JOB-1018',
    name: 'Front Bezel Sheet Alpha',
    status: 'draft',
    createdAt: '2026-08-12T16:00:00Z',
    updatedAt: '2026-08-12T17:20:00Z',
    sheet: {
      width: 1300,
      height: 900
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [],
    parts: [],
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 32,
      comparisonVsManual: '--'
    },
    breakdown: []
  },
  {
    id: 'JOB-1017',
    name: 'Solar Inverter Heat Shield',
    status: 'draft',
    createdAt: '2026-08-11T10:00:00Z',
    updatedAt: '2026-08-11T12:00:00Z',
    sheet: {
      width: 1200,
      height: 800
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [],
    parts: [],
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 50,
      comparisonVsManual: '--'
    },
    breakdown: []
  },
  {
    id: 'JOB-1016',
    name: 'Industrial Label Matrix Q',
    status: 'draft',
    createdAt: '2026-08-10T09:30:00Z',
    updatedAt: '2026-08-10T11:45:00Z',
    sheet: {
      width: 1000,
      height: 600
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 4,
      gutterSpace: 1.5
    },
    files: [],
    parts: [],
    placements: [],
    analytics: {
      yield: null,
      waste: null,
      totalFitted: 180,
      comparisonVsManual: '--'
    },
    breakdown: []
  }
];

// Generate additional completed jobs to total 24 jobs with 6 drafts
for (let i = 15; i >= 1; i--) {
  const num = (1000 + i).toString();
  INITIAL_JOBS.push({
    id: `JOB-${num}`,
    name: `Historical Production Batch ${i < 10 ? '0' + i : i}`,
    status: 'completed',
    createdAt: new Date(Date.now() - (25 - i) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - (24 - i) * 86400000).toISOString(),
    sheet: {
      width: 1200,
      height: 800
    },
    constraints: {
      grainAlignment: true,
      edgeMargin: 5,
      gutterSpace: 2
    },
    files: [
      { id: `f-${i}`, name: 'Polygon_A.svg', type: 'SVG', size: '18.4 KB', shapeType: 'polygon', color: '#6366F1' }
    ],
    parts: [INITIAL_PARTS[0]],
    placements: [],
    analytics: {
      yield: Number((91 + (i % 5) * 0.7).toFixed(1)),
      waste: Number((9 - (i % 5) * 0.7).toFixed(1)),
      totalFitted: 120 + (i * 3),
      comparisonVsManual: `+${(3 + (i % 4) * 0.8).toFixed(1)}%`
    },
    breakdown: [
      { name: 'Polygon_A.svg', count: 120 + (i * 3), color: '#6366F1' }
    ]
  });
}
