import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Unit } from '../types/unit';

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

const STORAGE_KEY = 'starpath_squads';

export const SquadProvider = ({ children }: { children: ReactNode }) => {
  const [squads, setSquads] = useState<Squad[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load squads', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(squads));
  }, [squads]);

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