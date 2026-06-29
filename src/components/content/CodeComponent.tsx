// components/content/CodeComponent.tsx
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button, Stack, Typography, Box, alpha } from '@mui/material';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeComponentProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}

export function CodeComponent({ 
  code, 
  language = 'javascript', 
  title = 'JavaScript.js',
  showLineNumbers = true,
  wrapLines = true,
}: CodeComponentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => setIsCopied(true))
      .catch((err) => console.error('Failed to copy code: ', err));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  // Detect language from code if not specified
  const detectLanguage = (code: string): string => {
    if (code.includes('class') || code.includes('constructor')) return 'javascript';
    if (code.includes('<!DOCTYPE') || code.includes('<html>')) return 'html';
    if (code.includes('SELECT') || code.includes('INSERT')) return 'sql';
    if (code.includes('import React')) return 'jsx';
    return language;
  };

  const detectedLanguage = detectLanguage(code);

  return (
    <Stack
      sx={{ 
        mb: 2,
        background: '#1a1a1a', 
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {/* Header */}
      <Stack 
        sx={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: '8px 16px',
          bgcolor: '#2a2a2a',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Window controls */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
          </Box>
          <Typography 
            sx={{ 
              color: '#dbdbdb', 
              fontSize: '0.8rem',
              fontWeight: 500,
              ml: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
        
        <Button
          size="small"
          sx={{
            color: '#dbdbdb',
            textTransform: 'capitalize',
            fontSize: '0.75rem',
            '&:hover': {
              background: alpha('#ffffff', 0.05),
            },
            '& .MuiButton-startIcon': {
              marginRight: 0.5,
            },
          }}
          onClick={copyToClipboard}
          startIcon={isCopied ? <DoneAllIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          disableRipple
        >
          {isCopied ? 'Copied!' : 'Copy code'}
        </Button>
      </Stack>

      {/* Code */}
      <Stack className="javascript_code" sx={{ p: 0 }}>
        <SyntaxHighlighter
          language={detectedLanguage}
          style={okaidia}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          customStyle={{
            fontSize: '14px',
            margin: 0,
            padding: '16px',
            background: 'transparent',
            borderRadius: 0,
          }}
          lineNumberStyle={{
            color: '#666',
            minWidth: '2.5em',
            paddingRight: '1em',
            userSelect: 'none',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Stack>
    </Stack>
  );
}