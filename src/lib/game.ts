import type { Squad } from '../context/SquadContext';
import type { Unit } from '../types/unit';
import { isUnit } from './squad-storage';

export const conditions = ['Disarmed', 'Exposed', 'Pinned', 'Strained'] as const;
export interface Fighter { id: string; unit: Unit; damage: number; injuries: number; conditions: string[]; activated: boolean }
export interface Game { version: 1; fighters: Fighter[]; force: number; struggle: number }
export function startGame(squads: Squad[]): Game {
  const units = squads.flatMap(s => [s.primary, s.secondary, s.support].filter((u): u is Unit => !!u));
  return { version: 1, force: units.reduce((n, unit) => n + (unit.force ?? 0), 0), struggle: 0,
    fighters: units.map(unit => ({ id: crypto.randomUUID(), unit, damage: 0, injuries: 0, conditions: [], activated: false })) };
}
export function isGame(value: unknown): value is Game | null {
  if (value === null) return true;
  if (!value || typeof value !== 'object') return false;
  const g = value as Game;
  return g.version === 1 && Number.isInteger(g.force) && g.force >= 0
    && Number.isInteger(g.struggle) && Math.abs(g.struggle) <= 8 && Array.isArray(g.fighters)
    && g.fighters.length === 6 && new Set(g.fighters.map(f => f?.id)).size === 6
    && g.fighters.every(f => f && typeof f.id === 'string' && isUnit(f.unit)
      && Number.isInteger(f.damage) && f.damage >= 0 && Number.isInteger(f.injuries) && f.injuries >= 0
      && typeof f.activated === 'boolean' && Array.isArray(f.conditions)
      && f.conditions.every(c => conditions.includes(c as typeof conditions[number])));
}
