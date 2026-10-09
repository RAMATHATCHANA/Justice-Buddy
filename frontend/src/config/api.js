const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return '';
  }
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('replit')) {
      return `https://${hostname.replace('-5000', '-8000')}`;
    }
  }
  
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl();
