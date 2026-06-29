// components/content/PlainText.tsx
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PlainTextProps {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption';
  color?: string;
  component?: 'p' | 'span' | 'div';
}

export function PlainText({ 
  children, 
  variant = 'body1',
  color = 'grey.600',
  component = 'p'
}: PlainTextProps) {
  return (
    <Typography 
      variant={variant} 
      component={component}
      sx={{ 
        color, 
        lineHeight: 1.8,
        mb: 1.5 
      }}
    >
      {children}
    </Typography>
  );
}