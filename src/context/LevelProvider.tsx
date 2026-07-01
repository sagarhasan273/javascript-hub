// context/LevelProvider.tsx
import { useState, ReactNode } from 'react';
import { LevelContext, ContentLevel } from './LevelContext';

const levels: ContentLevel[] = ['beginner', 'advanced', 'expert'];

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<ContentLevel>(() => {
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

  const value = {
    level,
    setLevel: handleSetLevel,
    getNextLevel,
    getPreviousLevel,
  };

  return (
    <LevelContext.Provider value={value}>
      {children}
    </LevelContext.Provider>
  );
}