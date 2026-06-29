// components/content/Note.tsx (New component for notes)
import { Box, Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';

interface NoteProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export function Note({ children, type = 'info' }: NoteProps) {
  const colors = {
    info: { bg: alpha('#2563eb', 0.08), border: '#2563eb', text: '#2563eb' },
    warning: { bg: alpha('#f59e0b', 0.08), border: '#f59e0b', text: '#d97706' },
    success: { bg: alpha('#22c55e', 0.08), border: '#22c55e', text: '#16a34a' },
    error: { bg: alpha('#ef4444', 0.08), border: '#ef4444', text: '#dc2626' },
  };

  return (
    <Box
      sx={{
        bgcolor: colors[type].bg,
        borderLeft: '4px solid',
        borderColor: colors[type].border,
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: colors[type].text, lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Box>
  );
}