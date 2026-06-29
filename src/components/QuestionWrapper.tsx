// components/QuestionWrapper.tsx
import { ReactNode } from 'react';
import { Box, Paper, Typography, Chip, alpha } from '@mui/material';
import { BookOpen } from 'lucide-react';

interface QuestionWrapperProps {
  id: number;
  title: string;
  definition: string;
  children: ReactNode;
  index?: number;
  isActive?: boolean;
}

export function QuestionWrapper({
  id,
  title,
  definition,
  children,
  index = 0,
  isActive = false,
}: QuestionWrapperProps) {
  return (
    <Paper
      id={`question-${id}`}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: '1px solid',
        borderColor: isActive ? 'primary.main' : 'grey.200',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        bgcolor: isActive ? alpha('#2563eb', 0.02) : 'white',
        '&:hover': {
          borderColor: isActive ? 'primary.main' : 'grey.300',
          boxShadow: isActive 
            ? '0 8px 30px rgba(37,99,235,0.12)' 
            : '0 4px 20px rgba(0,0,0,0.06)',
          transform: 'translateY(-2px)',
        },
        ...(isActive && {
          boxShadow: '0 8px 30px rgba(37,99,235,0.1)',
        }),
      }}
    >
      {/* Active Indicator */}
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            bgcolor: 'primary.main',
            borderRadius: '4px 4px 0 0',
            background: 'linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)',
            backgroundSize: '200% 100%',
            animation: 'gradientMove 2s linear infinite',
            '@keyframes gradientMove': {
              '0%': { backgroundPosition: '200% 0' },
              '100%': { backgroundPosition: '-200% 0' },
            },
          }}
        />
      )}

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Chip
          label={`#${index + 1}`}
          size="medium"
          sx={{
            bgcolor: isActive ? '#2563eb' : 'grey.100',
            color: isActive ? 'white' : 'grey.700',
            fontWeight: 700,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isActive ? 'primary.main' : 'grey.800',
            letterSpacing: '-0.3px',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Definition */}
      {definition && (
        <Box
          sx={{
            bgcolor: alpha('#2563eb', 0.04),
            borderLeft: '4px solid',
            borderColor: '#2563eb',
            borderRadius: 2,
            p: 3,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <BookOpen size={16} style={{ color: '#2563eb' }} />
            <Typography sx={{ fontWeight: 600 }} color="grey.700" variant="body2">
              Definition
            </Typography>
          </Box>
          <Typography color="grey.600">{definition}</Typography>
        </Box>
      )}

      {/* Answer Content */}
      <Box>{children}</Box>
    </Paper>
  );
}