import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Monitor, Zap, Palette, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';

export const ThemeSwitcher: React.FC = () => {
  const { theme, accent, isFlickerEnabled, setTheme, setAccent, setIsFlickerEnabled } = useTheme();

  return (
    <div className="flex flex-col gap-3 p-4 border border-zinc-900 bg-emerald-950/5 relative overflow-hidden group min-h-[140px]">
      <div className="absolute top-0 right-0 p-1">
        <span className="text-[8px] font-aurebesh text-zinc-800 group-hover:text-emerald-500/40 transition-colors uppercase">terminal-config</span>
      </div>

      <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
        <Monitor className="w-2.5 h-2.5" />
        Interface Parameters
      </span>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-zinc-600 uppercase">Atmosphere Mode</span>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={clsx(
              "px-2 py-0.5 text-[8px] font-mono border transition-all uppercase flex items-center gap-1.5",
              theme === 'light'
                ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5"
                : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-emerald-500"
            )}
          >
            {theme === 'dark' ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-zinc-600 uppercase">Accent Array</span>
          <div className="flex gap-2">
            {(['emerald', 'amber', 'red'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAccent(a)}
                className={clsx(
                  "w-3 h-3 rounded-full border border-zinc-900/50 transition-all",
                  a === 'emerald' && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
                  a === 'amber' && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]",
                  a === 'red' && "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]",
                  accent === a ? "scale-125 border-zinc-400" : "scale-100 opacity-40 hover:opacity-100"
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-zinc-600 uppercase">CRT Flicker</span>
          <button
            onClick={() => setIsFlickerEnabled(!isFlickerEnabled)}
            className={clsx(
              "px-2 py-0.5 text-[8px] font-mono border transition-all uppercase",
              isFlickerEnabled
                ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5"
                : "border-zinc-800 text-zinc-600 hover:border-zinc-700"
            )}
          >
            {isFlickerEnabled ? 'Active' : 'Offline'}
          </button>
        </div>
      </div>

      <div className="mt-auto pt-2 flex items-center gap-2 border-t border-zinc-900/50">
        <div className={clsx(
          "w-1.5 h-1.5 rounded-full animate-pulse",
          isFlickerEnabled ? "bg-emerald-500" : "bg-zinc-800"
        )} />
        <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-tighter">
          Registry: {theme.toUpperCase()}_{accent.toUpperCase()}_v.7.4
        </span>
      </div>
    </div>
  );
};
