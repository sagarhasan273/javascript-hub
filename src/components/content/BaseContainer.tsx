// components/content/BaseContainer.tsx
import {  Paper } from '@mui/material';
import { ReactNode } from 'react';

interface BaseContainerProps {
  children: ReactNode;
  className?: string;
}

export function BaseContainer({ children, className }: BaseContainerProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        mb: 3,
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(37,99,235,0.08)',
        },
      }}
    >
      {children}
    </Paper>
  );
}