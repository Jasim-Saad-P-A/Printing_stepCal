import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { INITIAL_PARTS } from '../data/mockJobs';
import confetti from 'canvas-confetti';

const JobContext = createContext(null);

const DEFAULT_JOB = {
  id: '',
  name: 'Production Batch 01',
  status: 'draft',
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
    { id: 'p-1', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 70, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },
    { id: 'p-2', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 310, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },
    { id: 'p-3', partId: 'poly-chevron-1', type: 'polygon', name: 'Polygon_A.svg', x: 550, y: 55, width: 220, height: 120, rotation: 0, color: '#6366F1', fillColor: 'rgba(99, 102, 241, 0.35)', strokeColor: '#818CF8', points: '40,0 220,0 180,60 220,120 40,120 0,60', innerDivider: true },
    { id: 'p-4', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 60, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },
    { id: 'p-5', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 300, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },
    { id: 'p-6', partId: 'poly-pentagon-1', type: 'irregular_polygon', name: 'Packaging_Box.dxf', x: 540, y: 200, width: 220, height: 130, rotation: 0, color: '#10B981', fillColor: 'rgba(16, 185, 129, 0.25)', strokeColor: '#34D399', points: '20,0 200,0 220,90 110,130 0,90' },
    { id: 'p-7', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 70, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },
    { id: 'p-8', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 330, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },
    { id: 'p-9', partId: 'poly-rectangle-1', type: 'rectangle', name: 'Bracket_Mount.dxf', x: 590, y: 350, width: 240, height: 140, rotation: 0, color: '#F59E0B', fillColor: 'rgba(245, 158, 11, 0.25)', strokeColor: '#FBBF24' },
    { id: 'p-10', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 80, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
    { id: 'p-11', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 240, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
    { id: 'p-12', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 400, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
    { id: 'p-13', partId: 'poly-circle-1', type: 'circle', name: 'Circle_Seal.svg', x: 560, y: 520, width: 140, height: 140, radius: 70, rotation: 0, color: '#EC4899', fillColor: 'rgba(236, 72, 153, 0.25)', strokeColor: '#F472B6' },
  ],
  analytics: {
    yield: 92.4,
    waste: 7.6,
    totalFitted: 142,
    comparisonVsManual: '+4.2% vs manual'
  },
  breakdown: [
    { name: 'Polygon_A.svg', count: 48, color: '#6366F1' },
    { name: 'Packaging_Box.dxf', count: 24, color: '#10B981' },
    { name: 'Circle_Seal.svg', count: 70, color: '#EC4899' }
  ]
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(DEFAULT_JOB);
  const [isNesting, setIsNesting] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Initial load of jobs list
  const refreshJobs = useCallback(async () => {
    try {
      const data = await api.getJobs();
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs:', err);
    }
  }, []);

  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  // Load a job by ID
  const loadJob = useCallback(async (id) => {
    try {
      const found = await api.getJob(id);
      setCurrentJob({
        ...found,
        // If placements are empty, populate default layout for visual preview
        placements: found.placements?.length ? found.placements : DEFAULT_JOB.placements,
        analytics: found.analytics?.yield ? found.analytics : DEFAULT_JOB.analytics,
        breakdown: found.breakdown?.length ? found.breakdown : DEFAULT_JOB.breakdown
      });
      setSelectedPart(null);
      return found;
    } catch {
      addToast(`Job ${id} not found. Loading template.`, 'error');
      setCurrentJob({ ...DEFAULT_JOB, id });
      return null;
    }
  }, [addToast]);

  // Reset to create a fresh new job
  const resetJob = useCallback(() => {
    setCurrentJob({
      ...DEFAULT_JOB,
      id: '',
      name: `Production Batch ${String(jobs.length + 1).padStart(2, '0')}`,
      status: 'draft'
    });
    setSelectedPart(null);
  }, [jobs.length]);

  // Update Sheet Dimensions
  const updateSheetDimensions = (width, height) => {
    setCurrentJob(prev => ({
      ...prev,
      sheet: {
        width: Number(width) || 100,
        height: Number(height) || 100
      }
    }));
  };

  // Update Constraints
  const updateConstraints = (constraints) => {
    setCurrentJob(prev => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        ...constraints
      }
    }));
  };

  // Update Job Name
  const updateJobName = (name) => {
    setCurrentJob(prev => ({
      ...prev,
      name
    }));
  };

  // Upload Files
  const addUploadedFiles = (newFiles) => {
    setCurrentJob(prev => {
      const existingNames = new Set(prev.files.map(f => f.name.toLowerCase()));
      const filteredNew = newFiles.filter(f => !existingNames.has(f.name.toLowerCase()));
      
      if (filteredNew.length === 0) {
        addToast('File already uploaded.', 'warning');
        return prev;
      }

      addToast(`Added ${filteredNew.length} vector file(s).`, 'success');
      return {
        ...prev,
        files: [...prev.files, ...filteredNew]
      };
    });
  };

  // Remove File
  const removeUploadedFile = (fileId) => {
    setCurrentJob(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
    addToast('File removed from job.', 'info');
  };

  // Update Dragged Part Position on Canvas
  const updatePlacementPosition = (placementId, x, y) => {
    setCurrentJob(prev => ({
      ...prev,
      placements: prev.placements.map(p => {
        if (p.id === placementId) {
          return { ...p, x, y };
        }
        return p;
      })
    }));
  };

  // Run Nesting Engine
  const runNesting = async () => {
    setIsNesting(true);
    try {
      const result = await api.runNesting({
        sheet: currentJob.sheet,
        constraints: currentJob.constraints,
        files: currentJob.files
      });

      setCurrentJob(prev => ({
        ...prev,
        placements: result.placements,
        analytics: result.analytics,
        breakdown: result.breakdown
      }));

      addToast('Nesting simulation completed successfully!', 'success');
    } catch (err) {
      console.error('Nesting error:', err);
      addToast('Failed to complete nesting calculations.', 'error');
    } finally {
      setIsNesting(false);
    }
  };

  // Save as Draft
  const saveDraft = async () => {
    try {
      const saved = await api.saveDraft(currentJob);
      setCurrentJob(prev => ({ ...prev, id: saved.id, status: 'draft' }));
      await refreshJobs();
      addToast(`Draft "${currentJob.name}" saved successfully!`, 'success');
      return saved;
    } catch {
      addToast('Failed to save draft.', 'error');
      return null;
    }
  };

  // Send to Production
  const sendToProduction = async () => {
    try {
      const completed = await api.sendToProduction(currentJob.id, currentJob);
      setCurrentJob(prev => ({ ...prev, id: completed.id, status: 'completed' }));
      await refreshJobs();
      
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      addToast(`Job "${currentJob.name}" dispatched to production!`, 'success');
      return completed;
    } catch {
      addToast('Failed to send job to production.', 'error');
      return null;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      await api.deleteJob(id);
      await refreshJobs();
      addToast(`Job ${id} deleted successfully.`, 'info');
      return true;
    } catch {
      addToast(`Failed to delete job ${id}.`, 'error');
      return false;
    }
  };

  // Computed counts
  const totalJobsCount = jobs.length;
  const draftJobsCount = jobs.filter(j => j.status === 'draft').length;
  const completedJobsCount = jobs.filter(j => j.status === 'completed').length;

  return (
    <JobContext.Provider
      value={{
        jobs,
        currentJob,
        isNesting,
        selectedPart,
        setSelectedPart,
        toasts,
        addToast,
        removeToast,
        refreshJobs,
        loadJob,
        resetJob,
        updateSheetDimensions,
        updateConstraints,
        updateJobName,
        addUploadedFiles,
        removeUploadedFile,
        updatePlacementPosition,
        runNesting,
        saveDraft,
        sendToProduction,
        deleteJob,
        totalJobsCount,
        draftJobsCount,
        completedJobsCount
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
