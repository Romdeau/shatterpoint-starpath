import { useState, useMemo } from "react";
import { UnitList } from "../components/UnitList";
import { UnitFilterBar } from "../components/UnitFilterBar";
import unitData from "../data/units.json";
import type { Unit } from "../types/unit";
import { filterUnits, type UnitFilters } from "../lib/filters";
import { useTheme } from "../context/ThemeContext";

const units = unitData as unknown as Unit[];

export const UnitListPage = () => {
  const { accent } = useTheme();
  const [filters, setFilters] = useState<UnitFilters>({});

  const filteredUnits = useMemo(() => {
    return filterUnits(units, filters);
  }, [filters]);

  const allKeywords = useMemo(() => {
    const kws = new Set<string>();
    units.forEach(u => u.keywords.forEach(k => kws.add(k)));
    return Array.from(kws).sort();
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
            Authorized Personnel Only
          </h2>
          <span className="text-[9px] font-aurebesh text-emerald-500/40 uppercase">active manifest</span>
        </div>

        <div className="flex-1 ml-0 md:ml-8">
          <UnitFilterBar
            filters={filters}
            onFilterChange={setFilters}
            availableKeywords={allKeywords}
          />
        </div>

        <div className="h-px flex-1 bg-zinc-900/50 hidden md:block" />
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-zinc-700">ORD_03.manifest</span>
          <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-tighter">Clearance Level: Delta-9</span>
        </div>
      </div>

      <UnitList units={filteredUnits} />
    </div>
  );
};
