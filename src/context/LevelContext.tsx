// context/LevelContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type ContentLevel = 'beginner' | 'advanced' | 'expert';

interface LevelContextType {
  level: ContentLevel;
  setLevel: (level: ContentLevel) => void;
  getNextLevel: () => ContentLevel | null;
  getPreviousLevel: () => ContentLevel | null;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

const levels: ContentLevel[] = ['beginner', 'advanced', 'expert'];

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<ContentLevel>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('content-level');
    if (saved && levels.includes(saved as ContentLevel)) {
      return saved as ContentLevel;
    }
    return 'beginner';
  });

  const handleSetLevel = (newLevel: ContentLevel) => {
    setLevel(newLevel);
    localStorage.setItem('content-level', newLevel);
  };

  const getNextLevel = (): ContentLevel | null => {
    const currentIndex = levels.indexOf(level);
    if (currentIndex < levels.length - 1) {
      return levels[currentIndex + 1];
    }
    return null;
  };

  const getPreviousLevel = (): ContentLevel | null => {
    const currentIndex = levels.indexOf(level);
    if (currentIndex > 0) {
      return levels[currentIndex - 1];
    }
    return null;
  };

  return (
    <LevelContext.Provider
      value={{
        level,
        setLevel: handleSetLevel,
        getNextLevel,
        getPreviousLevel,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
}