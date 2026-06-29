// components/CodeBlock.tsx
import { Box, Paper, alpha } from '@mui/material';

interface CodeBlockProps {
  code: string;
  language?: string;
  inline?: boolean;
}

const decodeHtmlEntities = (text: string): string => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const highlightJS = (code: string): string => {
  let highlighted = decodeHtmlEntities(code);

  // Keywords
  highlighted = highlighted.replace(
    /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|constructor|static|get|set|async|await|import|export|from|default|typeof|instanceof|try|catch|finally|throw|yield|true|false|null|undefined|NaN|Infinity)\b/g,
    '<span style="color: #c084fc; font-weight: 600;">$1</span>'
  );

  // Built-in objects
  highlighted = highlighted.replace(
    /\b(Object|Array|String|Number|Boolean|Function|Symbol|Map|Set|Promise|JSON|console|Math|Date|Error|RegExp|parseInt|parseFloat|isNaN|isFinite)\b/g,
    '<span style="color: #fcd34d;">$1</span>'
  );

  // Methods
  highlighted = highlighted.replace(
    /\.(log|parse|stringify|keys|values|entries|create|assign|prototype|call|apply|bind|slice|splice|push|pop|shift|unshift|map|filter|reduce|forEach|find|includes|indexOf|split|join|replace|match|trim|toUpperCase|toLowerCase|getPrototypeOf|setPrototypeOf|defineProperty|getOwnPropertyNames|freeze|seal|entries|from|of|fill|reverse|sort|concat|includes|indexOf|lastIndexOf|every|some|findIndex|flat|flatMap|copyWithin|values|keys)\b/g,
    '.<span style="color: #22d3ee;">$1</span>'
  );

  // Strings
  highlighted = highlighted.replace(
    /("[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*'|`[^`\\]*(\\.[^`\\]*)*`)/g,
    '<span style="color: #34d399;">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span style="color: #fb923c;">$1</span>'
  );

  // Single-line comments
  highlighted = highlighted.replace(
    /(\/\/.*?)(?=\n|$)/g,
    '<span style="color: #64748b; font-style: italic;">$1</span>'
  );

  // Multi-line comments
  highlighted = highlighted.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span style="color: #64748b; font-style: italic;">$1</span>'
  );

  // Arrow functions and comparison operators
  highlighted = highlighted.replace(
    /(=>|>=|<=|==|===|!=|!==)/g,
    '<span style="color: #f472b6;">$1</span>'
  );

  // Other operators
  highlighted = highlighted.replace(
    /([+\-*/%&|^~?:])/g,
    '<span style="color: #f9a8d4;">$1</span>'
  );

  return highlighted;
};

export function CodeBlock({ code, language = 'javascript', inline = false }: CodeBlockProps) {
  const decodedCode = decodeHtmlEntities(code);
  const highlightedCode = highlightJS(decodedCode);

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
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
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
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Paper>
  );
}