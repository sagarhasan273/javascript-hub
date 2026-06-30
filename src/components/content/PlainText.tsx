// components/content/PlainText.tsx
import { SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PlainTextProps {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption';
  color?: string;
  component?: 'p' | 'span' | 'div';
  sx?: SxProps;
}

export function PlainText({ 
  children, 
  variant = 'body1',
  color = 'grey.600',
  component = 'p',
  sx
}: PlainTextProps) {
  return (
    <Typography 
      variant={variant} 
      component={component}
      sx={{ 
        color, 
        lineHeight: 1.8,
        mb: 1.5,
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}