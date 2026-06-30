// components/LevelContent.tsx
import { Box, Chip } from '@mui/material';
import { ReactNode } from 'react';

interface LevelContentProps {
  level: 'beginner' | 'advanced' | 'expert';
  children: ReactNode;
  currentLevel: 'beginner' | 'advanced' | 'expert';
}

export function LevelContent({ level, children, currentLevel }: LevelContentProps) {
  const levelMap = {
    beginner: { color: '#10b981', label: 'Beginner' },
    advanced: { color: '#f59e0b', label: 'Advanced' },
    expert: { color: '#ef4444', label: 'Expert' },
  };

  const shouldShow = 
    level === 'beginner' || 
    (level === 'advanced' && (currentLevel === 'advanced' || currentLevel === 'expert')) ||
    (level === 'expert' && currentLevel === 'expert');

  if (!shouldShow) return null;

  return (
    <Box sx={{ position: 'relative' }}>
      <Chip
        label={levelMap[level].label}
        size="small"
        sx={{
          position: 'absolute',
          top: -8,
          right: 0,
          bgcolor: levelMap[level].color,
          color: 'white',
          fontWeight: 600,
          fontSize: '0.7rem',
          height: 20,
        }}
      />
      <Box sx={{ pt: 1 }}>
        {children}
      </Box>
    </Box>
  );
}