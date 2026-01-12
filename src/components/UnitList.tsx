import React from "react";
import type { Unit } from "../types/unit";
import { UnitCard } from "./UnitCard";
import { cn } from "../lib/utils";

interface UnitListProps {
  units: Unit[];
  className?: string;
  onUnitClick?: (unit: Unit) => void;
}

export const UnitList: React.FC<UnitListProps> = ({ units, className, onUnitClick }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      className
    )}>
      {units.map((unit, idx) => (
        <div 
          key={`${unit.name}-${idx}`} 
          onClick={() => onUnitClick?.(unit)} 
          className="group/item relative"
        >
          {/* Tactical Indexing Decorator */}
          <div className="absolute -top-3 -left-1 text-[8px] font-mono text-zinc-700 uppercase pointer-events-none group-hover/item:text-orange-900 transition-colors">
            Ref_{idx.toString().padStart(3, '0')}
          </div>
          <UnitCard unit={unit} />
        </div>
      ))}
    </div>
  );
};