import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import { isGame, type Game } from '../lib/game';
import { readStored, writeStored } from '../lib/storage';

const key = 'starpath-game-v1';
const GameContext = createContext<{
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
  endGame: () => boolean;
} | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(() => readStored(key, null, isGame));
  useEffect(() => { writeStored(key, game, isGame); }, [game]);
  const endGame = () => {
    if (!writeStored(key, null, isGame)) return false;
    setGame(null);
    return true;
  };
  return <GameContext.Provider value={{ game, setGame, endGame }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
