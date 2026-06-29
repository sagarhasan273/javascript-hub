// components/content/HLText.tsx (Highlighted/Important Text)
import { Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';

interface HLTextProps {
  children: ReactNode;
  type?: 'success' | 'warning' | 'info' | 'error';
}

export function HLText({ children, type = 'info' }: HLTextProps) {
  const colors = {
    success: { bg: alpha('#22c55e', 0.1), color: '#16a34a' },
    warning: { bg: alpha('#f59e0b', 0.1), color: '#d97706' },
    info: { bg: alpha('#2563eb', 0.1), color: '#2563eb' },
    error: { bg: alpha('#ef4444', 0.1), color: '#dc2626' },
  };

  return (
    <Typography
      component="span"
      sx={{
        bgcolor: colors[type].bg,
        color: colors[type].color,
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 600,
        display: 'inline-block',
      }}
    >
      {children}
    </Typography>
  );
}