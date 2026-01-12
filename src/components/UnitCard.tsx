import React from "react";
import { Unit } from "../types/unit";
import { cn } from "../lib/utils";

interface UnitCardProps {
  unit: Unit;
  className?: string;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, className }) => {
  return (
    <div className={cn(
      "p-4 border-2 border-orange-900 bg-black text-white rounded-none shadow-md",
      "flex flex-col gap-2 transition-all hover:border-orange-600",
      className
    )}>
      <div className="flex justify-between items-start border-b border-orange-900 pb-2">
        <div>
          <h3 className="text-xl font-bold tracking-tighter uppercase">{unit.name}</h3>
          <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">{unit.type}</span>
        </div>
        <div className="flex gap-2">
          {unit.force !== undefined && (
            <div className="flex flex-col items-center border border-orange-900 px-2 py-1">
              <span className="text-[10px] uppercase font-mono">Force</span>
              <span className="text-lg font-bold leading-none">{unit.force}</span>
            </div>
          )}
          <div className="flex flex-col items-center border border-orange-900 px-2 py-1">
            <span className="text-[10px] uppercase font-mono">{unit.type === "Primary" ? "SP" : "PC"}</span>
            <span className="text-lg font-bold leading-none">{unit.points}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="flex flex-col border-l-2 border-orange-600 pl-2">
          <span className="text-[10px] uppercase font-mono text-gray-400">Stamina</span>
          <span className="text-xl font-bold">{unit.stamina}</span>
        </div>
        <div className="flex flex-col border-l-2 border-orange-600 pl-2">
          <span className="text-[10px] uppercase font-mono text-gray-400">Durability</span>
          <span className="text-xl font-bold">{unit.durability}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-auto">
        {unit.keywords.map(keyword => (
          <span key={keyword} className="px-2 py-0.5 bg-orange-950 text-[10px] font-mono border border-orange-800">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};
