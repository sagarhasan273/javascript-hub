// components/content/CodeComponent.tsx
import { Box, Paper, alpha } from '@mui/material';

interface CodeComponentProps {
  children: string;
  language?: string;
  inline?: boolean;
}

export function CodeComponent({ 
  children, 
  language = 'javascript', 
  inline = false 
}: CodeComponentProps) {
  if (inline) {
    return (
      <Box
        component="code"
        sx={{
          bgcolor: alpha('#2563eb', 0.06),
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontFamily: '"Fira Code", "Consolas", monospace',
          fontSize: '0.875rem',
          color: '#2563eb',
          display: 'inline-block',
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#0a0f1e',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        my: 2,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          bgcolor: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
        </Box>
        <Box
          component="span"
          sx={{
            color: 'grey.500',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {language}
        </Box>
      </Box>
      <Box
        component="pre"
        sx={{
          p: 3,
          margin: 0,
          overflow: 'auto',
          '& code': {
            fontFamily: '"Fira Code", "Consolas", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.8,
            color: '#e2e8f0',
          },
        }}
      >
        <code>{children}</code>
      </Box>
    </Paper>
  );
}