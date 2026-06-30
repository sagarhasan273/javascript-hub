// components/LevelToggle.tsx
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { School, TrendingUp, Rocket } from 'lucide-react';

export type ContentLevel = 'beginner' | 'advanced' | 'expert';

interface LevelToggleProps {
  level: ContentLevel;
  onLevelChange: (level: ContentLevel) => void;
}

export function LevelToggle({ level, onLevelChange }: LevelToggleProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLevel: ContentLevel | null,
  ) => {
    if (newLevel !== null) {
      onLevelChange(newLevel);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={level}
        exclusive
        onChange={handleChange}
        aria-label="content level"
        sx={{
          '& .MuiToggleButton-root': {
            px: 3,
            py: 1,
            borderRadius: '20px !important',
            border: '1px solid',
            borderColor: 'grey.200',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            gap: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.04)',
            },
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            },
          },
        }}
      >
        <ToggleButton value="beginner">
          <School size={16} />
          Beginner
        </ToggleButton>
        <ToggleButton value="advanced">
          <TrendingUp size={16} />
          Advanced
        </ToggleButton>
        <ToggleButton value="expert">
          <Rocket size={16} />
          Expert
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}