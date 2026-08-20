import { INITIAL_JOBS } from '../data/mockJobs';

const STORAGE_KEYS = {
  USER: 'cloudprint_user',
  JOBS: 'cloudprint_jobs',
  RECENT_JOB_ID: 'cloudprint_recent_id'
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : { username: 'admin', role: 'Lead Manufacturing Engineer', isAuthenticated: true };
  } catch {
    return { username: 'admin', role: 'Lead Manufacturing Engineer', isAuthenticated: true };
  }
};

export const setStoredUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to store user:', err);
  }
};

export const getStoredJobs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_JOBS;
  }
};

export const setStoredJobs = (jobs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  } catch (err) {
    console.error('Failed to store jobs:', err);
  }
};
