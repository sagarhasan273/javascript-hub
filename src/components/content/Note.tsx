// components/content/Note.tsx
import { Box, Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';

interface NoteProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
  icon?: string;
}

export function Note({ children, type = 'info', icon }: NoteProps) {
  const colors = {
    info: { bg: alpha('#2563eb', 0.08), border: '#2563eb', text: '#2563eb', icon: '💡' },
    warning: { bg: alpha('#f59e0b', 0.08), border: '#f59e0b', text: '#d97706', icon: '⚠️' },
    success: { bg: alpha('#22c55e', 0.08), border: '#22c55e', text: '#16a34a', icon: '✅' },
    error: { bg: alpha('#ef4444', 0.08), border: '#ef4444', text: '#dc2626', icon: '❌' },
  };

  const selectedColor = colors[type];

  return (
    <Box
      sx={{
        bgcolor: selectedColor.bg,
        borderLeft: '4px solid',
        borderColor: selectedColor.border,
        borderRadius: 1,
        p: 2.5,
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
      }}
    >
      <Typography sx={{ fontSize: '1.2rem', mt: 0.5 }}>
        {icon || selectedColor.icon}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: selectedColor.text, 
          lineHeight: 1.7,
          '& strong': {
            fontWeight: 700,
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}