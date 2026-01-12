import React from "react";
import { X, Zap, Shield, Heart, Fingerprint, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Unit, Ability } from "@/types/unit";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import abilitiesData from "@/data/abilities.json";

const allAbilities = abilitiesData as Ability[];

interface UnitDetailDialogProps {
  unit: Unit | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UnitDetailDialog: React.FC<UnitDetailDialogProps> = ({
  unit,
  isOpen,
  onOpenChange,
}) => {
  if (!unit) return null;

  const unitAbilities = unit.abilityIds
    .map((id) => allAbilities.find((a) => a.id === id))
    .filter((a): a is Ability => !!a);

  const pointsLabel = unit.type === "Primary" ? "Squad Points" : "Point Cost";
  const pointsShort = unit.type === "Primary" ? "SP" : "PC";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-4xl gap-0 border border-zinc-800 bg-zinc-950 p-0 shadow-2xl sm:rounded-none overflow-hidden"
        )}
      >
        {/* Tactical Header Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 z-10" />

        <div className="relative p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Background Decorators */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="text-4xl font-aurebesh uppercase tracking-tighter">imperial manifest x99</span>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Fingerprint className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Unit Dossier // Tactical Profile</span>
              </div>
              <DialogTitle className="text-5xl font-black uppercase tracking-tighter text-zinc-100 mb-2">
                {unit.name}
              </DialogTitle>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-mono text-emerald-500 font-bold uppercase tracking-widest">{unit.type}</span>
                </div>
                <span className="h-6 w-[1px] bg-zinc-800" />
                <div className="flex gap-3">
                  {unit.eras.map(era => (
                    <Badge key={era} variant="outline" className="text-[10px] border-zinc-800 text-zinc-500 rounded-none uppercase px-3">{era}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="rounded-none opacity-50 transition-opacity hover:opacity-100 hover:bg-zinc-900 border border-zinc-800 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5 text-zinc-100" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Points / Squad Points */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col items-center justify-center relative group min-h-[120px]">
              <div className="absolute top-2 right-3">
                <span className="text-[7px] font-aurebesh text-zinc-700 uppercase tracking-widest">{pointsShort}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">{pointsLabel}</span>
              <span className="text-4xl font-black text-emerald-500">{unit.points}</span>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Stamina Card */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col items-center justify-center relative group min-h-[120px]">
              <div className="absolute top-2 right-3">
                <span className="text-[7px] font-aurebesh text-zinc-700 uppercase tracking-widest">stamina</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">Stamina</span>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-emerald-500" />
                <span className="text-4xl font-black text-zinc-100">{unit.stamina}</span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Durability Card */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col items-center justify-center relative group min-h-[120px]">
              <div className="absolute top-2 right-3">
                <span className="text-[7px] font-aurebesh text-zinc-700 uppercase tracking-widest">durability</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">Durability</span>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-4xl font-black text-zinc-100">{unit.durability}</span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </div>
          </div>

          {/* Keywords Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Tactical Keywords:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {unit.keywords.map(kw => (
                <Badge
                  key={kw}
                  className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 text-[11px] font-mono uppercase px-4 py-1.5 rounded-none hover:bg-emerald-500/10 transition-colors border shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                >
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Abilities Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
              <Zap className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-100">Tactical Abilities</h3>
              <span className="ml-auto text-[9px] font-aurebesh text-zinc-800">abilities_log_alpha</span>
            </div>

            <div className="grid gap-6">
              {unitAbilities.map((ability) => (
                <div
                  key={ability.id}
                  className="p-6 border border-zinc-900 bg-zinc-950/50 hover:border-emerald-500/30 transition-all relative group overflow-hidden"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-emerald-800 group-hover:bg-emerald-500 transition-colors" />

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black uppercase text-zinc-100 tracking-tighter">{ability.name}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[9px] uppercase font-mono rounded-none border-zinc-800 px-3 py-0.5",
                          ability.type === 'Active' && "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
                          ability.type === 'Reactive' && "text-amber-500 border-amber-500/20 bg-amber-500/5",
                          ability.type === 'Innate' && "text-zinc-400 bg-zinc-900",
                          ability.type === 'Identity' && "text-purple-400 border-purple-500/20 bg-purple-500/5",
                          ability.type === 'Tactic' && "text-blue-400 border-blue-500/20 bg-blue-500/5"
                        )}
                      >
                        {ability.type}
                      </Badge>
                    </div>
                    {ability.cost > 0 && (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter italic">Force Cost</span>
                        <span className="text-2xl font-black text-emerald-500">{ability.cost}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/50 pt-4">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Tech Info */}
          <div className="mt-16 pt-6 border-t border-zinc-900 flex justify-between items-center opacity-30">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Security Clearance // Delta-Level</span>
              <span className="text-[8px] font-aurebesh text-zinc-700">authorized_personnel_only</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Targeting System // Active</span>
              <span className="text-[10px] font-mono text-zinc-700">V.04.22</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
