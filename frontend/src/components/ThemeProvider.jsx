import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'bluepastel';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return <>{children}</>;
}
