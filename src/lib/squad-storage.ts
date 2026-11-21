import type { Squad } from '../context/SquadContext';
import type { Unit } from '../types/unit';

export function isUnit(value: unknown): value is Unit {
  if (!value || typeof value !== 'object') return false;
  const u = value as Unit;
  return typeof u.name === 'string' && ['Primary', 'Secondary', 'Support'].includes(u.type)
    && ['stamina', 'durability'].every(k => Number.isInteger(u[k as keyof Unit]) && Number(u[k as keyof Unit]) >= 0)
    && Number.isInteger(u.points)
    && (u.force === undefined || (Number.isInteger(u.force) && u.force >= 0))
    && ['eras', 'keywords', 'abilityIds', 'stanceIds'].every(k => Array.isArray(u[k as keyof Unit])
      && (u[k as keyof Unit] as unknown[]).every(v => typeof v === 'string'));
}

export function isSquads(value: unknown): value is Squad[] {
  return Array.isArray(value) && value.every(s => s && typeof s.id === 'string'
    && (['primary', 'secondary', 'support'] as const).every(slot => s[slot] === null
      || (isUnit(s[slot]) && s[slot].type.toLowerCase() === slot)))
    && new Set(value.map(s => s.id)).size === value.length;
}
