import type { Unit, UnitType, Ability, AbilityType } from "../types/unit";

export interface ExternalAbility {
  name: string;
  type: string;
  cost?: number;
  text: string;
}

export interface ExternalUnit {
  name: string;
  type: string;
  points: number;
  force?: number;
  stamina: number;
  durability: number;
  eras?: string[];
  tags: string[];
  abilities: ExternalAbility[];
}

export function transformAbility(ext: ExternalAbility): Ability {
  return {
    id: ext.name.toLowerCase().replace(/ /g, "-"),
    name: ext.name,
    type: ext.type as AbilityType,
    cost: ext.cost ?? 0,
    description: ext.text,
  };
}

export function transformUnit(ext: ExternalUnit): Unit {
  return {
    name: ext.name,
    type: ext.type as UnitType,
    points: ext.points,
    force: ext.force,
    stamina: ext.stamina,
    durability: ext.durability,
    eras: ext.eras ?? [],
    keywords: ext.tags,
    image: "placeholder", // Default placeholder for transformed units until valid image source is mapped
    abilityIds: ext.abilities.map((a) => a.name.toLowerCase().replace(/ /g, "-")),
    stanceIds: [], // To be implemented later
  };
}
