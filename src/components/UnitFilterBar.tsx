import React from "react";
import { Search, X, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { UnitFilters } from "@/lib/filters";
import type { UnitType } from "@/types/unit";

interface UnitFilterBarProps {
  filters: UnitFilters;
  onFilterChange: (filters: UnitFilters) => void;
  availableKeywords: string[];
}

export const UnitFilterBar: React.FC<UnitFilterBarProps> = ({
  filters,
  onFilterChange,
  availableKeywords,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      type: value === "all" ? undefined : (value as UnitType),
    });
  };

  const handleEraChange = (value: string) => {
    onFilterChange({
      ...filters,
      era: value === "all" ? undefined : value,
    });
  };

  const toggleKeyword = (keyword: string) => {
    const currentKeywords = filters.keywords || [];
    const newKeywords = currentKeywords.includes(keyword)
      ? currentKeywords.filter((k) => k !== keyword)
      : [...currentKeywords, keyword];
    onFilterChange({ ...filters, keywords: newKeywords });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const primaryFactions = [
    "501st",
    "Jedi",
    "Galactic Republic",
    "Separatist Alliance",
    "Sith",
    "Shadow Collective",
    "Inquisitorius",
  ];

  // Combine primary factions with available keywords, ensuring no duplicates and limited count
  const displayKeywords = Array.from(
    new Set([...primaryFactions, ...availableKeywords])
  ).slice(0, 15);

  return (
    <div className="flex flex-col gap-4 p-4 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:top-12 z-10 relative overflow-hidden group">
      {/* Tactical Decorator */}
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600/50" />
      <div className="absolute top-0 right-0 p-1">
        <span className="text-[8px] font-aurebesh text-zinc-800 uppercase tracking-tighter">filter unit manifest</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1 group">
          {!filters.search && (
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
          )}
          <Input
            placeholder="SEARCH UNIT REGISTRY..."
            value={filters.search || ""}
            onChange={handleSearchChange}
            className={cn(
              "h-8 bg-zinc-900/50 border-zinc-800 text-[9px] font-mono tracking-wider uppercase focus-visible:ring-emerald-500/50 min-w-[180px] transition-all",
              !filters.search ? "pl-9" : "pl-3 pr-9"
            )}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: undefined })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Grouped Secondary Filters */}
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
          {/* Type Filter */}
          <div className="w-full md:w-36">
            <Select value={filters.type || "all"} onValueChange={handleTypeChange}>
              <SelectTrigger className="h-8 bg-zinc-900/50 border-zinc-800 text-[9px] font-mono tracking-wider uppercase focus:ring-emerald-500/50">
                <SelectValue placeholder="UNIT TYPE" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100 font-mono">
                <SelectItem value="all" className="text-[9px] uppercase">All Types</SelectItem>
                <SelectItem value="Primary" className="text-[9px] uppercase text-emerald-500 font-bold">Primary</SelectItem>
                <SelectItem value="Secondary" className="text-[9px] uppercase text-emerald-500 font-bold">Secondary</SelectItem>
                <SelectItem value="Support" className="text-[9px] uppercase text-emerald-500 font-bold">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Era Filter */}
          <div className="w-full md:w-40">
            <Select value={filters.era || "all"} onValueChange={handleEraChange}>
              <SelectTrigger className="h-8 bg-zinc-900/50 border-zinc-800 text-[9px] font-mono tracking-wider uppercase focus:ring-emerald-500/50">
                <SelectValue placeholder="ERA" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100 font-mono">
                <SelectItem value="all" className="text-[9px] uppercase">All Eras</SelectItem>
                <SelectItem value="The High Republic" className="text-[9px] uppercase">The High Republic</SelectItem>
                <SelectItem value="Clone Wars" className="text-[9px] uppercase">Clone Wars</SelectItem>
                <SelectItem value="Reign of the Empire" className="text-[9px] uppercase">Reign of the Empire</SelectItem>
                <SelectItem value="Galactic Civil War" className="text-[9px] uppercase">Galactic Civil War</SelectItem>
                <SelectItem value="The New Republic" className="text-[9px] uppercase">The New Republic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Button */}
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-8 px-3 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all group shrink-0"
          >
            <X className="w-3.5 h-3.5 mr-1.5 group-hover:rotate-90 transition-transform" />
            <span className="text-[9px] font-mono tracking-wider uppercase">Clear</span>
          </Button>
        </div>
      </div>

      {/* Keywords Quick Filter */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900/50">
        <div className="flex items-center gap-2 mr-2">
          <Zap className="w-3 h-3 text-emerald-500" />
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Quick Filters:</span>
        </div>
        {displayKeywords.map((kw) => {
          const isActive = filters.keywords?.includes(kw);
          return (
            <Badge
              key={kw}
              variant={isActive ? "default" : "outline"}
              onClick={() => toggleKeyword(kw)}
              className={cn(
                "cursor-pointer text-[8px] font-mono uppercase tracking-tighter rounded-none transition-all",
                isActive
                  ? "bg-emerald-600 text-zinc-950 hover:bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              )}
            >
              {kw}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};