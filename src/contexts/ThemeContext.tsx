'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('estudiotdah-theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      } else {
        // Check system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme);
      }    } catch {
      // Fallback if localStorage is not available
      console.warn('localStorage not available, using light theme');
      setTheme('light');
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      try {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('estudiotdah-theme', theme);      } catch {
        console.warn('Could not save theme to localStorage');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure to wrap your component with <ThemeProvider>');
  }
  return context;
}

// Safe version that doesn't throw
export function useThemeSafe() {
  const context = useContext(ThemeContext);
  return context;
}
