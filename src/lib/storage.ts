export const storageEvent = 'starpath-storage-warning';

function warn(message: string) {
  window.dispatchEvent(new CustomEvent(storageEvent, { detail: message }));
}

export function readStored<T>(key: string, fallback: T, validate: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value: unknown = JSON.parse(raw);
    if (!validate(value)) throw new Error('Invalid saved data');
    return value;
  } catch {
    // Preserve the original for recovery. Writes refuse to overwrite invalid data.
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T, validate?: (value: unknown) => boolean): boolean {
  try {
    if (validate && !validate(value)) throw new Error('Invalid new data');
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const previous: unknown = JSON.parse(raw);
      if (validate && !validate(previous)) throw new Error('Invalid saved data');
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    warn(`Could not save ${key}. Keep this tab open and export your squads. Existing saved data has been preserved.`);
    return false;
  }
}

export function readPreference<T extends string>(key: string, fallback: T, validate: (value: unknown) => value is T): T {
  try { const value = localStorage.getItem(key); return validate(value) ? value : fallback; } catch { return fallback; }
}

export function writePreference(key: string, value: string, validate: (value: unknown) => boolean): boolean {
  try {
    const previous = localStorage.getItem(key);
    if (!validate(value) || (previous !== null && !validate(previous))) throw new Error('Invalid preference');
    localStorage.setItem(key, value);
    return true;
  } catch {
    warn(`Could not save ${key}. Existing preference has been preserved.`);
    return false;
  }
}
