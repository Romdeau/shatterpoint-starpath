import { expect, test, vi } from 'vitest';
import { readStored, writeStored, readPreference, writePreference } from './storage';
import { isSquads } from './squad-storage';

test('invalid saved squads survive reads and attempted writes', () => {
  localStorage.setItem('squads', '{"broken":true}');
  expect(readStored('squads', [], isSquads)).toEqual([]);
  expect(writeStored('squads', [], isSquads)).toBe(false);
  expect(localStorage.getItem('squads')).toBe('{"broken":true}');
});
test('malformed JSON survives attempted writes', () => {
  localStorage.setItem('squads', '{');
  expect(writeStored('squads', [], isSquads)).toBe(false);
  expect(localStorage.getItem('squads')).toBe('{');
});
test('unavailable storage does not crash the app', () => {
  const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  expect(readStored('squads', [], isSquads)).toEqual([]);
  expect(writeStored('squads', [], isSquads)).toBe(false);
  spy.mockRestore();
});

test('invalid outgoing data never replaces a valid save', () => {
  localStorage.setItem('squads', '[]');
  expect(writeStored('squads', { broken: true }, isSquads)).toBe(false);
  expect(localStorage.getItem('squads')).toBe('[]');
});
test('raw preference format stays compatible and malformed values survive', () => {
  const valid = (v: unknown): v is 'dark' | 'light' => v === 'dark' || v === 'light';
  localStorage.setItem('theme', 'light');
  expect(readPreference('theme', 'dark', valid)).toBe('light');
  expect(writePreference('theme', 'dark', valid)).toBe(true);
  expect(localStorage.getItem('theme')).toBe('dark');
  localStorage.setItem('theme', '{broken');
  expect(readPreference('theme', 'dark', valid)).toBe('dark');
  expect(writePreference('theme', 'dark', valid)).toBe(false);
  expect(localStorage.getItem('theme')).toBe('{broken');
});
