export type UnitType = "Primary" | "Secondary" | "Support";
export type AbilityType = "Active" | "Reactive" | "Innate" | "Identity" | "Tactic";

export interface Ability {
  id: string;
  name: string;
  type: AbilityType;
  cost: number;
  description: string;
}

export interface Stance {
  id: string;
  name: string;
  attack_stats: {
    melee: number;
    ranged: number;
  };
  defense_stats: {
    melee: number;
    ranged: number;
  };
}

export interface Unit {
  name: string;
  type: UnitType;
  points: number;
  force?: number;
  stamina: number;
  durability: number;
  eras: string[];
  keywords: string[];
  abilityIds: string[];
  stanceIds: string[];
}
