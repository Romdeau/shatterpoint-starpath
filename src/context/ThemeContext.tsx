import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Accent = 'emerald' | 'amber' | 'red';

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
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('starpath-theme') as Theme) || 'dark');
  const [accent, setAccent] = useState<Accent>(() => (localStorage.getItem('starpath-accent') as Accent) || 'emerald');
  const [isFlickerEnabled, setIsFlickerEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('starpath-flicker');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('starpath-theme', theme);
    localStorage.setItem('starpath-accent', accent);
    localStorage.setItem('starpath-flicker', String(isFlickerEnabled));

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
