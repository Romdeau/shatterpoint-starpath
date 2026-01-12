import type { Squad } from "../context/SquadContext";
import type { Unit } from "../types/unit";

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export const validateSquad = (squad: Squad): ValidationResult => {
    const errors: string[] = [];

    if (!squad.primary) errors.push("Squad must have a Primary unit.");
    if (!squad.secondary) errors.push("Squad must have a Secondary unit.");
    if (!squad.support) errors.push("Squad must have a Support unit.");

    if (squad.primary && squad.secondary && squad.support) {
        // Check SP
        const totalCost = squad.secondary.points + squad.support.points;
        if (totalCost > squad.primary.points) {
            errors.push(`Squad points exceeded (${totalCost}/${squad.primary.points}).`);
        }

        // Check Eras
        // Helper to check intersection
        const hasSharedEra = (u1: Unit, u2: Unit) => u1.eras.some(era => u2.eras.includes(era));

        if (!hasSharedEra(squad.primary, squad.secondary)) {
            errors.push("Secondary unit must share an era with the Primary unit.");
        }
        if (!hasSharedEra(squad.primary, squad.support)) {
            errors.push("Support unit must share an era with the Primary unit.");
        }
    }

    return { valid: errors.length === 0, errors };
};

export const validateStrikeTeam = (squads: Squad[]): ValidationResult => {
    const errors: string[] = [];
    const names = new Set<string>();

    squads.forEach(squad => {
        const units = [squad.primary, squad.secondary, squad.support].filter((u): u is Unit => !!u);
        units.forEach(unit => {
            if (names.has(unit.name)) {
                errors.push(`Duplicate unique unit: ${unit.name}`);
            }
            names.add(unit.name);
        });
    });

    return { valid: errors.length === 0, errors };
};