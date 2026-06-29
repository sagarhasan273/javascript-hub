// components/content/Title.tsx
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title({ children, level = 2 }: TitleProps) {
  const variantMap: Record<1 | 2 | 3 | 4 | 5 | 6, 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1'> = {
    1: 'h4',
    2: 'h5',
    3: 'h6',
    4: 'subtitle1',
    5: 'subtitle2',
    6: 'body1',
  };

  return (
    <Typography
      variant={variantMap[level]}
      sx={{
        fontWeight: 700,
        color: 'grey.800',
        mb: 1.5,
        mt: level === 1 ? 0 : 2,
      }}
    >
      {children}
    </Typography>
  );
}