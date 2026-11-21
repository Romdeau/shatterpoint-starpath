import type { Squad } from "../context/SquadContext";
import type { Unit } from "../types/unit";

interface SerializedSquad {
    p?: string; // Primary Name
    s?: string; // Secondary Name
    u?: string; // Support Name
}

export const exportSquadToBase64 = (squad: Squad): string => {
    const data: SerializedSquad = {};
    if (squad.primary) data.p = squad.primary.name;
    if (squad.secondary) data.s = squad.secondary.name;
    if (squad.support) data.u = squad.support.name;

    try {
        const json = JSON.stringify(data);
        return btoa(Array.from(new TextEncoder().encode(json), byte => String.fromCharCode(byte)).join(''));
    } catch (e) {
        console.error("Export failed", e);
        return "";
    }
};

export const importSquadFromBase64 = (data: string, findUnit: (name: string) => Unit | undefined): Squad | null => {
    let binary: string;
    try { binary = atob(data); } catch { return null; }
    const candidates = [binary];
    try {
        candidates.unshift(new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, c => c.charCodeAt(0))));
    } catch { /* Codes exported before UTF-8 support contain Latin-1 bytes. */ }
    for (const json of new Set(candidates)) {
        try {
            const parsed = JSON.parse(json) as SerializedSquad;
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) continue;
            if (Object.keys(parsed).some(key => !['p', 's', 'u'].includes(key))) continue;
            const valid = ([['p', 'Primary'], ['s', 'Secondary'], ['u', 'Support']] as const).every(([key, type]) => {
                const name = parsed[key];
                return name === undefined || (typeof name === 'string' && findUnit(name)?.type === type);
            });
            if (!valid) continue;
            return {
                id: crypto.randomUUID(),
                primary: parsed.p ? findUnit(parsed.p) ?? null : null,
                secondary: parsed.s ? findUnit(parsed.s) ?? null : null,
                support: parsed.u ? findUnit(parsed.u) ?? null : null,
            };
        } catch { /* Try the legacy encoding with the same validation. */ }
    }
    return null;
};
