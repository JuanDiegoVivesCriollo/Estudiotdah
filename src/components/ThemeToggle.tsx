'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage and document class
    const savedTheme = localStorage.getItem('estudiotdah-theme') as 'light' | 'dark';
    const documentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    setTheme(savedTheme || documentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document class
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Save to localStorage
    localStorage.setItem('estudiotdah-theme', newTheme);
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <button
        className="relative p-3 rounded-full bg-white border-2 border-gray-200 shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 opacity-50 cursor-not-allowed"
        aria-label="Cargando tema..."
        disabled
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-yellow-500/25 shadow-lg" />
        <div className="relative z-10 flex items-center justify-center w-6 h-6">
          <Sun className="w-5 h-5 text-white" />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {/* Background circle that moves */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r transition-all duration-500 ${
        theme === 'dark' 
          ? 'from-blue-600 to-purple-600 shadow-blue-500/25' 
          : 'from-yellow-400 to-orange-500 shadow-yellow-500/25'
      } shadow-lg`} />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-white transition-transform duration-300 rotate-0 hover:rotate-180" />
        ) : (
          <Moon className="w-5 h-5 text-white transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
        theme === 'dark' 
          ? 'bg-blue-400/20 animate-pulse' 
          : 'bg-yellow-400/20 animate-pulse'
      }`} />
    </button>
  );
}
