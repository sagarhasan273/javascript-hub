// components/content/CentralText.tsx
import { Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface CentralTextProps {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'h6';
  color?: string;
}

export function CentralText({ 
  children, 
  variant = 'body1',
  color = 'grey.600'
}: CentralTextProps) {
  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography variant={variant} sx={{ color, lineHeight: 1.8 }}>
        {children}
      </Typography>
    </Box>
  );
}