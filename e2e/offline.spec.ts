import { test, expect } from '@playwright/test';

test('build, transfer and play a strike team through an offline reload', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./#/shatterpoint-starpath/list');
  await page.getByRole('button', { name: 'Add squad', exact: true }).click();
  await page.getByRole('button', { name: 'Add squad', exact: true }).click();
  const selects = page.getByRole('combobox');
  // Core-set Republic and Separatist squads.
  for (const [index, name] of ['General Anakin Skywalker', 'CC-7567 Captain Rex', '501st Clone Troopers', 'Asajj Ventress, Sith Assassin', 'Kalani, Super Tactical Droid', 'B1 Battle Droids'].entries()) {
    await selects.nth(index).selectOption({ label: (await selects.nth(index).locator('option').allTextContents()).find(v => v.startsWith(name + ' /'))! });
  }
  await expect(page.getByText('Squad ready', { exact: true })).toHaveCount(2);
  await page.getByRole('button', { name: 'Export squad 1', exact: true }).click();
  await expect(page.getByLabel('Squad code', { exact: true })).not.toBeEmpty();
  await page.getByRole('button', { name: 'Import squad', exact: true }).click();
  await expect(page.getByText('Squad imported.')).toBeVisible();
  await page.getByRole('button', { name: 'Remove squad 3', exact: true }).click();
  await page.getByRole('link', { name: 'Deploy to game manager' }).click();
  await page.getByRole('button', { name: 'Start game', exact: true }).click();
  const fighter = page.getByRole('region', { name: 'General Anakin Skywalker', exact: true });
  await fighter.getByRole('button', { name: 'Increase Damage', exact: true }).click();
  await fighter.getByRole('button', { name: 'Pinned', exact: true }).click();
  await fighter.getByRole('checkbox', { name: 'Activated' }).check();
  await page.evaluate(() => {
    localStorage.setItem('__test_block_game', 'true');
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key === 'starpath-game-v1' && localStorage.getItem('__test_block_game')) throw new Error('Quota exceeded');
      original.call(this, key, value);
    };
  });
  await fighter.getByRole('button', { name: 'Increase Damage', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Could not save starpath-game-v1');
  await page.goto('./#/shatterpoint-starpath/list');
  await page.goto('./#/shatterpoint-starpath/game');
  await expect(fighter.getByLabel('Damage', { exact: true })).toHaveText('2');
  await page.getByRole('button', { name: 'End game', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm end game', exact: true }).click();
  await expect(fighter).toBeVisible();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.evaluate(() => localStorage.removeItem('__test_block_game'));
  await fighter.getByRole('button', { name: 'Increase Damage', exact: true }).click();
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(fighter.getByLabel('Damage', { exact: true })).toHaveText('3');
  await expect(fighter.getByRole('button', { name: 'Pinned', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(fighter.getByRole('checkbox', { name: 'Activated' })).toBeChecked();
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.evaluate(() => document.body.clientWidth));
  await page.screenshot({ path: `test-results/game-${test.info().project.name}.png`, fullPage: true });
  await page.getByRole('button', { name: 'End game', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm end game', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Start game', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('registry search opens a unit dossier', async ({ page }) => {
  await page.goto('./#/shatterpoint-starpath/');
  await page.getByPlaceholder('SEARCH UNIT REGISTRY...').fill('General Anakin Skywalker');
  await expect(page.locator('[data-tactical-frame]')).toHaveCount(1);
  await page.getByRole('heading', { name: 'General Anakin Skywalker', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByText('Force Jump', { exact: true })).toBeVisible();
});
test('corrupt saved squads are preserved and reported', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('starpath_squads', '{broken'));
  await page.goto('./#/shatterpoint-starpath/list');
  await expect(page.getByRole('alert')).toContainText('Could not save starpath_squads');
  expect(await page.evaluate(() => localStorage.getItem('starpath_squads'))).toBe('{broken');
});

test('invalid preferences and malformed game data survive initialization', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('starpath-theme', 'invalid');
    localStorage.setItem('starpath-accent', 'purple');
    localStorage.setItem('starpath-flicker', '123');
    localStorage.setItem('starpath-game-v1', '{broken');
  });
  await page.goto('./#/shatterpoint-starpath/game');
  expect(await page.evaluate(() => [localStorage.getItem('starpath-theme'), localStorage.getItem('starpath-accent'), localStorage.getItem('starpath-flicker'), localStorage.getItem('starpath-game-v1')])).toEqual(['invalid', 'purple', '123', '{broken']);
  await expect(page.getByRole('alert')).toBeVisible();
});
