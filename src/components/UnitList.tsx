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
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      className
    )}>
      {units.map(unit => (
        <div key={unit.name} onClick={() => onUnitClick?.(unit)} className="cursor-pointer">
          <UnitCard unit={unit} />
        </div>
      ))}
    </div>
  );
};
