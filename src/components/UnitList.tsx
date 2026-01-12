import React, { memo } from "react";
import type { Unit } from "../types/unit";
import { UnitCard } from "./UnitCard";
import { cn } from "../lib/utils";

interface UnitListProps {
  units: Unit[];
  className?: string;
  onUnitClick?: (unit: Unit) => void;
}

const MemoizedUnitCard = memo(UnitCard);

export const UnitList: React.FC<UnitListProps> = ({ units, className, onUnitClick }) => {
  if (units.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-12 border border-zinc-900 bg-zinc-950/50 min-h-[300px]",
        className
      )}>
        <div className="relative mb-4">
          <div className="absolute -inset-4 bg-emerald-500/5 blur-xl rounded-full animate-pulse" />
          <span className="text-4xl font-aurebesh text-emerald-950 opacity-20 select-none">no data</span>
        </div>
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-2">
          No tactical units found matching current criteria
        </h3>
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest text-center max-w-xs">
          Please adjust your filter parameters or verify link integrity with Imperial Command.
        </p>
        <div className="mt-8 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

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
          style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
        >
          {/* Tactical Indexing Decorator */}
          <div className="absolute -top-3 -left-1 text-[8px] font-mono text-zinc-700 uppercase pointer-events-none group-hover/item:text-emerald-900 transition-colors flex items-center gap-1">
            <span>Ref_{idx.toString().padStart(3, '0')}</span>
            <span className="font-aurebesh opacity-30">item</span>
          </div>
          <MemoizedUnitCard unit={unit} />
        </div>
      ))}
    </div>
  );
};