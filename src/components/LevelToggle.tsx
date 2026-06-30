// components/LevelToggle.tsx
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { School, TrendingUp, Rocket } from 'lucide-react';
import { ContentLevel, useLevel } from '../context/LevelContext';

const levelConfig = {
  beginner: {
    icon: School,
    label: 'Beginner',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  advanced: {
    icon: TrendingUp,
    label: 'Advanced',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  expert: {
    icon: Rocket,
    label: 'Expert',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
};

export function LevelToggle() {
  const { level, setLevel } = useLevel();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLevel: ContentLevel | null,
  ) => {
    if (newLevel !== null) {
      setLevel(newLevel);
    }
  };

  return (
    <ToggleButtonGroup
      value={level}
      exclusive
      onChange={handleChange}
      aria-label="content level"
      size="small"
      sx={{
        gap: 1, // Add gap between buttons
        '& .MuiToggleButton-root': {
          px: 2,
          py: 0.75,
          borderRadius: '20px !important',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.75rem',
          gap: 0.75,
          transition: 'all 0.3s ease',
          color: 'rgba(255,255,255,0.6)',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'white',
          },
          '&.Mui-selected': {
            color: 'white',
            borderColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
            },
          },
          // Individual level styles when selected
          '&[value="beginner"].Mui-selected': {
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(16, 185, 129, 0.3)',
            },
          },
          '&[value="advanced"].Mui-selected': {
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(245, 158, 11, 0.3)',
            },
          },
          '&[value="expert"].Mui-selected': {
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.3)',
            },
          },
        },
      }}
    >
      {Object.entries(levelConfig).map(([key, config]) => {
        const Icon = config.icon;
        const isSelected = level === key;
        return (
          <Tooltip
            key={key}
            title={`${config.label} level${isSelected ? ' (current)' : ''}`}
            placement="bottom"
          >
            <ToggleButton value={key}>
              <Icon size={14} />
              <Box component="span" sx={{ ml: 0.5 }}>
                {config.label}
              </Box>
            </ToggleButton>
          </Tooltip>
        );
      })}
    </ToggleButtonGroup>
  );
}