// components/content/Bold.tsx
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface BoldProps {
  children: ReactNode;
}

export function Bold({ children }: BoldProps) {
  return (
    <Typography
      component="span"
      sx={{
        fontWeight: 700,
        color: 'grey.800',
      }}
    >
      {children}
    </Typography>
  );
}