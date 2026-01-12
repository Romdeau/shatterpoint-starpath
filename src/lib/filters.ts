import type { Unit, UnitType } from "../types/unit";

export interface UnitFilters {
  search?: string;
  type?: UnitType;
  keywords?: string[];
  era?: string;
}

/**
 * Filters a list of units based on the provided criteria.
 */
export function filterUnits(units: Unit[], filters: UnitFilters): Unit[] {
  return units.filter((unit) => {
    // Search filter (name)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!unit.name.toLowerCase().includes(searchLower)) {
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

    return true;
  });
}
