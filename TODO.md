# Remaining work

Reviewed against the implementation on 2026-11-21.

- Audit bundled unit, mission and ability data against current publisher releases and errata. This upgrade does not claim a current or complete roster.
- Add structured stance data and combat-tree reference. Transformed units still have empty stance IDs.
- Model character identities and card-specific squad-building exceptions. Current duplicate detection uses exact unit names.
- Add mission setup, objective scoring, struggle wins and turn sequencing. The current game manager is a manual counter tracker.
- Add portable active-game backup and restore. Squad codes only transfer squads.
- Add explicit recovery/import UI for corrupt saved data. Originals currently remain in localStorage and write failures show a warning.
- Add multi-tab conflict handling. Avoid editing the same registry or session in multiple tabs concurrently.
- Verify iOS Safari offline installation and storage behavior on a real device. Automated browser coverage uses Chromium at desktop and mobile widths.
- Audit full light-theme contrast and keyboard/screen-reader interaction across legacy registry components.

## Completed in this upgrade

- Replaced squad-builder and game-manager placeholders with usable persisted workflows.
- Added guarded, validated storage and strict, Unicode-safe squad transfers.
- Added production offline caching and static-host-safe hash routes.
- Updated dependencies and restored lint, type checking, isolated component tests and browser checks in CI.
- Replaced stale setup/deployment claims and added repository agent instructions.
