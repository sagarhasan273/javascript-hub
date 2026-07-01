// hooks/useLevel.ts
import { useContext } from 'react';
import { LevelContext } from '../context/LevelContext';

export function useLevel() {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
}