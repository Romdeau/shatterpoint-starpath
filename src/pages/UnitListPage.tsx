import { useState, useMemo } from "react";
import { UnitList } from "../components/UnitList";
import { UnitFilterBar } from "../components/UnitFilterBar";
import { UnitDetailDialog } from "../components/UnitDetailDialog";
import unitData from "../data/units.json";
import type { Unit } from "../types/unit";
import { filterUnits, type UnitFilters } from "../lib/filters";
import { useTheme } from "../context/ThemeContext";

const units = unitData as unknown as Unit[];

export const UnitListPage = () => {
  const { accent } = useTheme();
  const [filters, setFilters] = useState<UnitFilters>({});
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const filteredUnits = useMemo(() => {
    return filterUnits(units, filters);
  }, [filters]);

  const allKeywords = useMemo(() => {
    const kws = new Set<string>();
    units.forEach(u => u.keywords.forEach(k => kws.add(k)));
    return Array.from(kws).sort();
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <UnitFilterBar
        filters={filters}
        onFilterChange={setFilters}
        availableKeywords={allKeywords}
      />
      <UnitList units={filteredUnits} onUnitClick={setSelectedUnit} />

      <UnitDetailDialog
        unit={selectedUnit}
        isOpen={!!selectedUnit}
        onOpenChange={(open) => !open && setSelectedUnit(null)}
      />
    </div>
  );
};
