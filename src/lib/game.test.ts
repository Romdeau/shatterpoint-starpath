import { expect, test } from 'vitest';
import { isGame, startGame } from './game';
import { isSquads } from './squad-storage';
import units from '../data/units.json';
import type { Unit } from '../types/unit';
const squad = { id: '1', primary: units[0] as Unit, secondary: units[4] as Unit, support: units[8] as Unit };
test('game snapshots validate and reject missing or duplicate fighters', () => {
  const game = startGame([squad, { ...squad, id: '2' }]);
  expect(isGame(game)).toBe(true);
  expect(isGame({ ...game, fighters: [] })).toBe(false);
  expect(isGame({ ...game, fighters: game.fighters.map(() => game.fighters[0]) })).toBe(false);
});
test('saved squads reject malformed Force values', () => {
  expect(isSquads([squad])).toBe(true);
  expect(isSquads([{ ...squad, primary: { ...squad.primary, force: 'oops' } }])).toBe(false);
});

test('starting Force includes secondary contributions', () => {
  const shaakTi = units.find(u => u.name === 'Jedi Master Shaak Ti') as Unit;
  expect(shaakTi.force).toBeGreaterThan(0);
  const squads = [squad, { ...squad, id: '2', secondary: shaakTi }];
  const expected = squads.flatMap(s => [s.primary, s.secondary, s.support]).reduce((n, u) => n + (u.force ?? 0), 0);
  expect(startGame(squads).force).toBe(expected);
});
