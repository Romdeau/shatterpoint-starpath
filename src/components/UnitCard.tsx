import React from "react";
import type { Unit } from "../types/unit";
import { cn } from "../lib/utils";

interface UnitCardProps {
  unit: Unit;
  className?: string;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, className }) => {
  return (
    <div 
      data-tactical-frame
      className={cn(
        "relative p-5 border-l-4 border-r border-y border-orange-600 bg-zinc-950 text-zinc-100 rounded-none overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]",
        className
      )}
    >
      {/* Tactical UI Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-900/50 group-hover:border-orange-500/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-900/30 group-hover:border-orange-600/30 transition-colors" />
      
      {/* Background Texture Placeholder */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative flex justify-between items-start border-b border-zinc-800 pb-3 mb-3">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase leading-none group-hover:text-orange-500 transition-colors">
            {unit.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase">ID: {unit.type.slice(0, 3)}-{Math.floor(Math.random() * 1000)}</span>
            <span className="h-px w-8 bg-zinc-800" />
            <span className="text-[10px] text-orange-600 font-mono font-bold tracking-widest uppercase">{unit.type}</span>
          </div>
        </div>
        
        <div className="flex gap-1">
          {unit.force !== undefined && (
            <div className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-800 bg-zinc-900/50">
              <span className="text-[8px] uppercase font-mono text-zinc-500">Force</span>
              <span className="text-lg font-black leading-none text-blue-400">{unit.force}</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center w-12 h-12 border border-orange-900/50 bg-orange-950/10">
            <span className="text-[8px] uppercase font-mono text-orange-500/70">{unit.type === "Primary" ? "SP" : "PC"}</span>
            <span className="text-xl font-black leading-none text-orange-500">{unit.points}</span>
          </div>
        </div>
      </div>
      
      <div className="relative grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Vitality / Stamina</span>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-zinc-100">{unit.stamina}</span>
            <div className="h-1 w-full bg-zinc-900 mb-1.5 overflow-hidden">
                <div className="h-full bg-orange-600 w-3/4 opacity-50" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Resistance / Durability</span>
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
          <span key={keyword} className="px-2 py-0.5 text-[9px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-400 uppercase tracking-tighter">
            // {keyword}
          </span>
        ))}
      </div>
      
      {/* Decorative Serial Number */}
      <div className="absolute bottom-1 right-2 opacity-10 font-mono text-[8px] text-zinc-500 pointer-events-none">
        MOD:ANDOR-04-REV2
      </div>
    </div>
  );
};