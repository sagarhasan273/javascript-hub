// components/StructuredAnswerRenderer.tsx
import { Box, Typography, Chip, Paper, alpha } from '@mui/material';
import { CodeBlock } from './CodeBlock';
import { StructuredAnswer, Step, Section, Method } from '../data/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface StructuredAnswerRendererProps {
  answer: StructuredAnswer;
}

export function StructuredAnswerRenderer({ answer }: StructuredAnswerRendererProps) {
  // Render Steps format
  if (answer.steps && answer.steps.length > 0) {
    return (
      <Box>
        {answer.steps.map((step: Step, index: number) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: '0 4px 12px rgba(37,99,235,0.08)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={`${index + 1}`}
                size="medium"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.800' }}>
                {step.title}
              </Typography>
            </Box>

            <Typography sx={{ color: 'grey.600', mb: 2, lineHeight: 1.8 }}>
              {step.description}
            </Typography>

            <CodeBlock code={step.code} />

            <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {step.pros && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 16 }} />
                  <Typography variant="caption" sx={{ color: 'success.main' }}>
                    {step.pros}
                  </Typography>
                </Box>
              )}
              {step.cons && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CancelIcon sx={{ color: '#ef4444', fontSize: 16 }} />
                  <Typography variant="caption" sx={{ color: 'error.main' }}>
                    {step.cons}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        ))}

        {answer.summary && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: alpha('#2563eb', 0.04),
              border: '1px solid',
              borderColor: alpha('#2563eb', 0.1),
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'grey.700', mb: 1 }}>
              📝 Summary
            </Typography>
            <Typography sx={{ color: 'grey.600', lineHeight: 1.8 }}>
              {answer.summary}
            </Typography>
          </Paper>
        )}
      </Box>
    );
  }

  // Render Sections format
  if (answer.sections && answer.sections.length > 0) {
    return (
      <Box>
        {answer.sections.map((section: Section, index: number) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.800', mb: 1 }}>
              {section.title}
            </Typography>
            <Typography sx={{ color: 'grey.600', mb: 2, lineHeight: 1.8 }}>
              {section.description}
            </Typography>
            <CodeBlock code={section.example} />
            {section.whenToUse && (
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 1, color: 'primary.main' }}
              >
                💡 When to use: {section.whenToUse}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    );
  }

  // Render Methods format (tabular)
  if (answer.methods && answer.methods.length > 0) {
    return (
      <Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                bgcolor: 'grey.50',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'grey.200',
                fontWeight: 700,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Method</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Syntax</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Pros</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Cons</Typography>
            </Box>
            {answer.methods.map((method: Method, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  p: 2,
                  borderBottom: index < answer.methods!.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                  '&:hover': {
                    bgcolor: alpha('#2563eb', 0.02),
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {method.method}
                  </Typography>
                  <CodeBlock code={method.example} inline />
                </Box>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {method.syntax}
                </Typography>
                <Typography variant="caption" sx={{ color: 'success.main' }}>
                  ✓ {method.pros}
                </Typography>
                <Typography variant="caption" sx={{ color: 'error.main' }}>
                  ✗ {method.cons}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
        {answer.summary && (
          <Typography sx={{ mt: 3, color: 'grey.600', lineHeight: 1.8 }}>
            {answer.summary}
          </Typography>
        )}
      </Box>
    );
  }

  // Render Key Points format
  if (answer.keyPoints && answer.keyPoints.length > 0) {
    return (
      <Box>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {answer.keyPoints.map((point: string, index: number) => (
            <Box
              component="li"
              key={index}
              sx={{
                py: 1,
                color: 'grey.700',
                borderBottom: index < answer.keyPoints!.length - 1 ? '1px solid' : 'none',
                borderColor: 'grey.100',
                listStyle: 'none',
                '&::before': {
                  content: '"▸"',
                  color: 'primary.main',
                  mr: 1,
                },
              }}
            >
              {point}
            </Box>
          ))}
        </Box>
        {answer.summary && (
          <Typography sx={{ mt: 2, color: 'grey.600', lineHeight: 1.8 }}>
            {answer.summary}
          </Typography>
        )}
      </Box>
    );
  }

  return null;
}