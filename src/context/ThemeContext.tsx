import React, { createContext, useContext, useEffect, useState } from 'react';

import { readStored, writeStored, readPreference, writePreference } from '../lib/storage';

type Theme = 'dark' | 'light';
type Accent = 'emerald' | 'amber' | 'red';
const isTheme = (v: unknown): v is Theme => v === 'dark' || v === 'light';
const isAccent = (v: unknown): v is Accent => v === 'emerald' || v === 'amber' || v === 'red';
const isBoolean = (v: unknown): v is boolean => typeof v === 'boolean';

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  isFlickerEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setIsFlickerEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => readPreference('starpath-theme', 'dark', isTheme));
  const [accent, setAccent] = useState<Accent>(() => readPreference('starpath-accent', 'emerald', isAccent));
  const [isFlickerEnabled, setIsFlickerEnabled] = useState<boolean>(() => {
    return readStored('starpath-flicker', false, isBoolean);
  });

  useEffect(() => {
    writePreference('starpath-theme', theme, isTheme);
    writePreference('starpath-accent', accent, isAccent);
    writeStored('starpath-flicker', isFlickerEnabled, isBoolean);

    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'accent-emerald', 'accent-amber', 'accent-red', 'dark');

    root.classList.add(`theme-${theme}`);
    root.classList.add(`accent-${accent}`);
    if (theme === 'dark') {
      root.classList.add('dark');
    }
  }, [theme, accent, isFlickerEnabled]);

  return (
    <ThemeContext.Provider value={{ theme, accent, isFlickerEnabled, setTheme, setAccent, setIsFlickerEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
