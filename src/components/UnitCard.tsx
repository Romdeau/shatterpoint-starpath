import React from "react";
import type { Unit } from "../types/unit";
import { cn } from "../lib/utils";

interface UnitCardProps {
  unit: Unit;
  className?: string;
  onNameClick?: () => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, className, onNameClick }) => {
  // Deterministic REF ID based on unit name
  const getRefId = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  };

  const refId = getRefId(unit.name);

  return (
    <div
      data-tactical-frame
      className={cn(
        "relative p-5 border-l-4 border-r border-y border-emerald-600 bg-zinc-950 text-zinc-100 rounded-none overflow-hidden group transition-all duration-300",
        className
      )}
      style={{ boxShadow: '0 0 20px var(--color-accent-shadow)' }}
    >
      {/* Tactical UI Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-900/50 group-hover:border-emerald-500/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-900/30 group-hover:border-emerald-600/30 transition-colors" />


      <div className="relative flex justify-between items-start border-b border-zinc-800 pb-3 mb-3">
        <div>
          <h3
            onClick={(e) => {
              e.stopPropagation();
              onNameClick?.();
            }}
            className="text-2xl font-black tracking-tighter uppercase leading-none group-hover:text-emerald-500 transition-colors cursor-pointer hover:underline decoration-emerald-500/50 underline-offset-4"
          >
            {unit.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase">REF: ISB-{refId}</span>
            <span className="h-px w-8 bg-zinc-800" />
            <span className="text-[10px] text-emerald-600 font-mono font-bold tracking-widest uppercase">{unit.type}</span>
          </div>
        </div>

        <div className="flex gap-1">
          {unit.force !== undefined && (
            <div className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-800 bg-zinc-900/50">
              <span className="text-[8px] uppercase font-mono text-zinc-500 flex flex-col items-center">
                <span>Force</span>
                <span className="font-aurebesh text-[6px] opacity-50">force</span>
              </span>
              <span className="text-lg font-black leading-none text-emerald-400">{unit.force}</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center w-12 h-12 border border-emerald-900/50 bg-emerald-950">
            <span className="text-[8px] uppercase font-mono text-emerald-500/70 flex flex-col items-center">
              <span>{unit.type === "Primary" ? "SP" : "PC"}</span>
              <span className="font-aurebesh text-[6px] opacity-50">{unit.type === "Primary" ? "primary" : "support"}</span>
            </span>
            <span className="text-xl font-black leading-none text-emerald-500">{unit.points}</span>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Vitality / Stamina</span>
            <span className="font-aurebesh text-[6px] text-zinc-700 uppercase">stamina</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-zinc-100">{unit.stamina}</span>
            <div className="h-1 w-full bg-zinc-900 mb-1.5 overflow-hidden">
              <div className="h-full bg-emerald-600 w-3/4 opacity-50" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Integrity / Durability</span>
            <span className="font-aurebesh text-[6px] text-zinc-700 uppercase">durability</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-zinc-100">{unit.durability}</span>
            <div className="h-1 w-full bg-zinc-900 mb-1.5 flex gap-0.5">
              {[...Array(unit.durability)].map((_, i) => (
                <div key={i} className="h-full bg-zinc-600 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900/50">
        {unit.keywords.map(keyword => (
          <span key={keyword} className="px-2 py-0.5 text-[9px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-400 uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1 h-1 bg-emerald-500/50" />
            {keyword}
          </span>
        ))}
      </div>

      {/* Decorative Serial Number */}
      <div className="absolute bottom-1 right-2 opacity-10 font-mono text-[8px] text-zinc-500 pointer-events-none flex gap-2">
        <span className="font-aurebesh">PROPERTY OF THE EMPIRE</span>
        <span>MOD:BS-COR-77-REV4</span>
      </div>
    </div>
  );
};