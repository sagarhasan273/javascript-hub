// components/content/InlineCode.tsx
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <Box
      component="code"
      sx={{
        bgcolor: 'grey.100',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        fontFamily: '"Fira Code", "Consolas", monospace',
        fontSize: '0.85rem',
        color: '#2563eb',
        display: 'inline-block',
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      {children}
    </Box>
  );
}