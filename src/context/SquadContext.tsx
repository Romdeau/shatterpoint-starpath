import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Unit } from '../types/unit';

export interface Squad {
  id: string;
  primary: Unit | null;
  secondary: Unit | null;
  support: Unit | null;
}

interface SquadContextType {
  squads: Squad[];
  addSquad: () => void;
  removeSquad: (id: string) => void;
  updateSquadUnit: (squadId: string, slot: 'primary' | 'secondary' | 'support', unit: Unit | null) => void;
}

const SquadContext = createContext<SquadContextType | undefined>(undefined);

export const SquadProvider = ({ children }: { children: ReactNode }) => {
  const [squads, setSquads] = useState<Squad[]>([]);

  const addSquad = () => {
    const newSquad: Squad = {
      id: crypto.randomUUID(),
      primary: null,
      secondary: null,
      support: null,
    };
    setSquads((prev) => [...prev, newSquad]);
  };

  const removeSquad = (id: string) => {
    setSquads((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSquadUnit = (squadId: string, slot: 'primary' | 'secondary' | 'support', unit: Unit | null) => {
    setSquads((prev) =>
      prev.map((squad) => {
        if (squad.id === squadId) {
          return { ...squad, [slot]: unit };
        }
        return squad;
      })
    );
  };

  const value = {
    squads,
    addSquad,
    removeSquad,
    updateSquadUnit,
  };

  return <SquadContext.Provider value={value}>{children}</SquadContext.Provider>;
};

export const useSquad = () => {
  const context = useContext(SquadContext);
  if (context === undefined) {
    throw new Error('useSquad must be used within a SquadProvider');
  }
  return context;
};