// components/content/CardComponent.tsx
import { Paper, Box, alpha } from '@mui/material';
import { ReactNode } from 'react';

interface CardComponentProps {
  children: ReactNode;
  title?: string;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
}

export function CardComponent({ 
  children, 
  title,
  variant = 'default' 
}: CardComponentProps) {
  const colors = {
    default: { bg: 'white', border: 'grey.200' },
    success: { bg: alpha('#22c55e', 0.05), border: '#22c55e' },
    warning: { bg: alpha('#f59e0b', 0.05), border: '#f59e0b' },
    info: { bg: alpha('#2563eb', 0.05), border: '#2563eb' },
    error: { bg: alpha('#ef4444', 0.05), border: '#ef4444' },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: colors[variant].bg,
        border: '1px solid',
        borderColor: colors[variant].border,
        mb: 2,
      }}
    >
      {title && (
        <Box
          sx={{
            fontWeight: 700,
            color: 'grey.800',
            mb: 1.5,
          }}
        >
          {title}
        </Box>
      )}
      {children}
    </Paper>
  );
}