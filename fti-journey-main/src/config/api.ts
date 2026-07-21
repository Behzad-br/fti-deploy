// API Configuration for production and local development
// This prevents hard-coded '/api' requests from failing when the frontend and backend are hosted on separate domains.
const getApiBaseUrl = () => {
  // If explicitly configured in Vercel/Vite environment
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Fallback for local development
  return 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiBaseUrl();
