import axios from 'axios';
import { getStoredJobs, setStoredJobs, getStoredUser, setStoredUser } from '../utils/storage';
import { simulateNesting } from '../utils/nesting';

// Axios instance configured for future backend integration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Service methods wrapping LocalStorage + realistic async simulation
 */
export const api = {
  // Authentication
  login: async (credentials) => {
    // Simulated network latency
    await new Promise(resolve => setTimeout(resolve, 350));
    const { username, password } = credentials;

    if (!username || !password) {
      throw new Error('Please provide both username and password.');
    }

    if (username.trim().toLowerCase() === 'admin' && password !== 'admin123') {
      throw new Error('Invalid password. For demo, use: admin123');
    }

    const user = {
      username: username.trim(),
      role: username.toLowerCase() === 'admin' ? 'Lead Manufacturing Engineer' : 'Operator',
      isAuthenticated: true,
      token: 'mock-jwt-token-' + Date.now()
    };

    setStoredUser(user);
    return user;
  },

  logout: async () => {
    setStoredUser(null);
    return true;
  },

  getCurrentUser: async () => {
    return getStoredUser();
  },

  // Job Management
  getJobs: async (filter = {}) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    let jobs = getStoredJobs();

    if (filter.status) {
      jobs = jobs.filter(j => j.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      jobs = jobs.filter(j => j.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q));
    }

    return jobs;
  },

  getJob: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 120));
    const jobs = getStoredJobs();
    const job = jobs.find(j => j.id === id);
    if (!job) {
      throw new Error(`Job with ID ${id} not found.`);
    }
    return job;
  },

  createJob: async (jobData) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const jobs = getStoredJobs();
    const newId = `JOB-${1025 + Math.floor(Math.random() * 800)}`;
    const newJob = {
      id: newId,
      name: jobData.name || 'Untitled Batch',
      status: jobData.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sheet: jobData.sheet || { width: 1200, height: 800 },
      constraints: jobData.constraints || { grainAlignment: true, edgeMargin: 5, gutterSpace: 2 },
      files: jobData.files || [],
      parts: jobData.parts || [],
      placements: jobData.placements || [],
      analytics: jobData.analytics || { yield: null, waste: null, totalFitted: 0, comparisonVsManual: '--' },
      breakdown: jobData.breakdown || []
    };

    const updated = [newJob, ...jobs];
    setStoredJobs(updated);
    return newJob;
  },

  updateJob: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const jobs = getStoredJobs();
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) {
      throw new Error(`Job ${id} not found to update.`);
    }

    const updatedJob = {
      ...jobs[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    jobs[idx] = updatedJob;
    setStoredJobs([...jobs]);
    return updatedJob;
  },

  deleteJob: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const jobs = getStoredJobs();
    const filtered = jobs.filter(j => j.id !== id);
    setStoredJobs(filtered);
    return true;
  },

  saveDraft: async (jobData) => {
    if (jobData.id && jobData.id !== 'new') {
      return api.updateJob(jobData.id, { ...jobData, status: 'draft' });
    } else {
      return api.createJob({ ...jobData, status: 'draft' });
    }
  },

  completeJob: async (id) => {
    return api.updateJob(id, { status: 'completed' });
  },

  sendToProduction: async (id, currentJobData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (id && id !== 'new') {
      return api.updateJob(id, { ...currentJobData, status: 'completed' });
    } else {
      return api.createJob({ ...currentJobData, status: 'completed' });
    }
  },

  runNesting: async ({ sheet, constraints, files }) => {
    // Simulate real nesting processing time
    await new Promise(resolve => setTimeout(resolve, 850));
    return simulateNesting(sheet, constraints, files);
  }
};
