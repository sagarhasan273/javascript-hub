// context/LevelContext.tsx
import { createContext } from 'react';

export type ContentLevel = 'beginner' | 'advanced' | 'expert';

interface LevelContextType {
  level: ContentLevel;
  setLevel: (level: ContentLevel) => void;
  getNextLevel: () => ContentLevel | null;
  getPreviousLevel: () => ContentLevel | null;
}

// Export only the context from this file
export const LevelContext = createContext<LevelContextType | undefined>(undefined);