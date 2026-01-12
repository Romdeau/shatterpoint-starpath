import type { Unit, UnitType } from "../types/unit";

export interface UnitFilters {
  search?: string;
  type?: UnitType;
  keywords?: string[];
  era?: string;
  points?: number;
}

/**
 * Filters a list of units based on the provided criteria.
 */
export function filterUnits(units: Unit[], filters: UnitFilters): Unit[] {
  return units.filter((unit) => {
    // Search filter (name or keywords)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = unit.name.toLowerCase().includes(searchLower);
      const matchesKeywords = unit.keywords.some(kw => kw.toLowerCase().includes(searchLower));

      if (!matchesName && !matchesKeywords) {
        return false;
      }
    }

    // Type filter
    if (filters.type && unit.type !== filters.type) {
      return false;
    }

    // Keywords filter (all selected keywords must be present)
    if (filters.keywords && filters.keywords.length > 0) {
      const hasAllKeywords = filters.keywords.every((kw) =>
        unit.keywords.includes(kw)
      );
      if (!hasAllKeywords) {
        return false;
      }
    }

    // Era filter
    if (filters.era && !unit.eras.includes(filters.era)) {
      return false;
    }

    // Points filter
    if (filters.points !== undefined && unit.points !== filters.points) {
      return false;
    }

    return true;
  });
}
