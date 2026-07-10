// components/content/CodeComponent.tsx
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, Stack, Typography, Box, alpha, IconButton, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeComponentProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  defaultOpen?: boolean;
  showToggle?: boolean;
  showTitle?: boolean;
  showCopyButton?: boolean;
}

export function CodeComponent({ 
  code, 
  language = 'javascript', 
  title = 'JavaScript.js',
  showLineNumbers = true,
  wrapLines = true,
  defaultOpen = true,
  showToggle = true,
  showTitle = false,
  showCopyButton = true,
}: CodeComponentProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);

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

  // Improved language detection
  const detectLanguage = (code: string): string => {
    // Check if language is explicitly provided
    if (language && language !== 'javascript') {
      return language;
    }

    // Trim the code for better detection
    const trimmed = code.trim();
    
    // Check for common patterns
    if (trimmed.includes('<!DOCTYPE') || trimmed.includes('<html') || trimmed.includes('</div>')) {
      return 'html';
    }
    if (trimmed.includes('SELECT') || trimmed.includes('INSERT') || trimmed.includes('UPDATE')) {
      return 'sql';
    }
    if (trimmed.includes('import React') || trimmed.includes('export default') || trimmed.includes('jsx')) {
      return 'jsx';
    }
    if (trimmed.includes('<?php')) {
      return 'php';
    }
    if (trimmed.includes('def ') || trimmed.includes('import ') && !trimmed.includes('import React')) {
      return 'python';
    }
    if (trimmed.startsWith('{') && trimmed.includes(':') && trimmed.includes('}')) {
      try {
        JSON.parse(trimmed);
        return 'json';
      } catch {
        // Not valid JSON, keep as javascript
      }
    }
    if (trimmed.includes('class') && trimmed.includes('constructor')) {
      return 'javascript';
    }
    if (trimmed.includes('const') || trimmed.includes('let') || trimmed.includes('var')) {
      return 'javascript';
    }
    if (trimmed.includes('function') || trimmed.includes('=>')) {
      return 'javascript';
    }
    
    // Default to javascript
    return 'javascript';
  };

  const detectedLanguage = detectLanguage(code);

  // Helper to clean up code (remove extra whitespace)
  const cleanCode = (code: string): string => {
    // Remove excessive empty lines at start/end
    return code.trim();
  };

  const cleanedCode = cleanCode(code);

  // If no title bar, just show the code with copy button
  if (!showTitle) {
    return (
      <Stack 
        sx={{ 
          mb: 2,
          background: '#1a1a1a', 
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        {/* Copy button overlay - top right */}
        {showCopyButton && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <Button
              size="small"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'capitalize',
                fontSize: '0.7rem',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                borderRadius: '6px',
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                },
                '& .MuiButton-startIcon': {
                  marginRight: 0.5,
                },
              }}
              onClick={copyToClipboard}
              startIcon={isCopied ? <DoneAllIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              disableRipple
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
        )}

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
              fontFamily: '"Fira Code", "Consolas", monospace',
            }}
            lineNumberStyle={{
              color: '#666',
              minWidth: '2.5em',
              paddingRight: '1em',
              userSelect: 'none',
            }}
          >
            {cleanedCode}
          </SyntaxHighlighter>
        </Stack>
      </Stack>
    );
  }

  // Full version with title bar
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
          borderBottom: isOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
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
            {title || `${detectedLanguage}.js`}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showCopyButton && (
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
          )}
          
          {showToggle && (
            <IconButton
              size="small"
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                color: '#dbdbdb',
                '&:hover': {
                  background: alpha('#ffffff', 0.05),
                },
              }}
            >
              {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          )}
        </Box>
      </Stack>

      {/* Code with Collapse */}
      <Collapse in={isOpen}>
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
              fontFamily: '"Fira Code", "Consolas", monospace',
            }}
            lineNumberStyle={{
              color: '#666',
              minWidth: '2.5em',
              paddingRight: '1em',
              userSelect: 'none',
            }}
          >
            {cleanedCode}
          </SyntaxHighlighter>
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default CodeComponent;