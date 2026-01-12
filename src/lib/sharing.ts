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
        return btoa(json);
    } catch (e) {
        console.error("Export failed", e);
        return "";
    }
};

export const importSquadFromBase64 = (data: string, findUnit: (name: string) => Unit | undefined): Squad | null => {
    try {
        const json = atob(data);
        const parsed = JSON.parse(json) as SerializedSquad;

        const squad: Squad = {
            id: crypto.randomUUID(),
            primary: parsed.p ? findUnit(parsed.p) || null : null,
            secondary: parsed.s ? findUnit(parsed.s) || null : null,
            support: parsed.u ? findUnit(parsed.u) || null : null,
        };

        return squad;
    } catch (e) {
        console.error("Import failed", e);
        return null;
    }
};