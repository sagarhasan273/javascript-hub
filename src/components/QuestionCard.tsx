// components/QuestionCard.tsx
import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Edit, Trash2, BookOpen, Copy, Check, Clock } from 'lucide-react';
import { Question, StructuredAnswer } from '../data/types';
import { StructuredAnswerRenderer } from './AnswerRenderer';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  alpha,
  Divider,
  Fade,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  isActive: boolean;
}

const decodeHtmlEntities = (text: string): string => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const isStructuredAnswer = (answer: unknown): answer is StructuredAnswer => {
  return answer !== null && typeof answer === 'object' && !Array.isArray(answer) && !('includes' in answer);
};

export default function QuestionCard({
  question,
  index,
  onEdit,
  onDelete,
  isActive,
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  const handleCopy = () => {
    const answerText = typeof question.answer === 'string' 
      ? question.answer 
      : JSON.stringify(question.answer, null, 2);
    const textToCopy = `${question.title}\n\n${question.definition || ''}\n\n${answerText}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setShowSnackbar(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderAnswer = () => {
    if (isStructuredAnswer(question.answer)) {
      return <StructuredAnswerRenderer answer={question.answer} />;
    }
    
    // Fallback for string answers
    const decodedAnswer = decodeHtmlEntities(question.answer as string);
    return (
      <Box
        sx={{
          '& p': { mb: 1.5, lineHeight: 1.8 },
          '& ul, & ol': { pl: 3, mb: 1.5 },
          '& li': { mb: 0.75, lineHeight: 1.6 },
          '& strong': { fontWeight: 700, color: 'grey.800' },
          '& h1, & h2, & h3, & h4, & h5, & h6': { 
            mt: 2, 
            mb: 1, 
            fontWeight: 700, 
            color: 'grey.800' 
          },
          '& code:not(pre code)': {
            bgcolor: alpha('#2563eb', 0.06),
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontFamily: '"Fira Code", "Consolas", monospace',
            fontSize: '0.875rem',
            color: '#2563eb',
            display: 'inline-block',
          },
        }}
        dangerouslySetInnerHTML={{ __html: decodedAnswer }}
      />
    );
  };

  return (
    <>
      <Paper
        ref={cardRef}
        id={`question-${question.id}`}
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '1px solid',
          borderColor: isActive ? 'primary.main' : 'grey.200',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          bgcolor: isActive ? alpha('#2563eb', 0.02) : 'white',
          '&:hover': {
            borderColor: isActive ? 'primary.main' : 'grey.300',
            boxShadow: isActive 
              ? '0 8px 30px rgba(37,99,235,0.12)' 
              : '0 4px 20px rgba(0,0,0,0.06)',
            transform: 'translateY(-2px)',
          },
          ...(isActive && {
            boxShadow: '0 8px 30px rgba(37,99,235,0.1)',
          }),
        }}
      >
        {/* Active Indicator */}
        {isActive && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              bgcolor: 'primary.main',
              borderRadius: '4px 4px 0 0',
              background: 'linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)',
              backgroundSize: '200% 100%',
              animation: 'gradientMove 2s linear infinite',
              '@keyframes gradientMove': {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
            }}
          />
        )}

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`#${index + 1}`}
              size="medium"
              sx={{
                bgcolor: isActive ? '#2563eb' : 'grey.100',
                color: isActive ? 'white' : 'grey.700',
                fontWeight: 700,
                borderRadius: 2,
                px: 1,
                '& .MuiChip-label': {
                  px: 1.5,
                },
                transition: 'all 0.3s ease',
              }}
            />
            <Typography
              variant="h5"
              component="h3"
              sx={{
                color: isActive ? 'primary.main' : 'grey.800',
                transition: 'color 0.3s ease',
                letterSpacing: '-0.3px',
                fontWeight: 700,
              }}
            >
              {question.title}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <Tooltip title={isAnswerVisible ? 'Hide answer' : 'Show answer'}>
              <Button
                variant={isAnswerVisible ? 'outlined' : 'contained'}
                startIcon={isAnswerVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  ...(isAnswerVisible && {
                    bgcolor: 'grey.50',
                    color: 'grey.700',
                    borderColor: 'grey.200',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      borderColor: 'grey.300',
                    },
                  }),
                }}
              >
                {isAnswerVisible ? 'Hide' : 'Show'}
              </Button>
            </Tooltip>

            <Tooltip title="Copy question">
              <IconButton
                onClick={handleCopy}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                {isCopied ? <Check size={18} color="#2563eb" /> : <Copy size={18} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit question">
              <IconButton
                onClick={() => onEdit(question)}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': {
                    bgcolor: alpha('#2563eb', 0.08),
                    borderColor: '#2563eb',
                    color: '#2563eb',
                  },
                }}
              >
                <Edit size={18} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete question">
              <IconButton
                onClick={() => {
                  if (window.confirm('Delete this question?')) {
                    onDelete(question.id);
                  }
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  color: '#dc2626',
                  '&:hover': {
                    bgcolor: alpha('#dc2626', 0.08),
                    borderColor: '#dc2626',
                  },
                }}
              >
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Answer Body */}
        <Fade in={isAnswerVisible} timeout={300}>
          <Box>
            {/* Definition Box */}
            {question.definition && (
              <Box
                sx={{
                  bgcolor: alpha('#2563eb', 0.04),
                  borderLeft: '4px solid',
                  borderColor: '#2563eb',
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha('#2563eb', 0.07),
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <BookOpen size={16} style={{ color: '#2563eb' }} />
                  <Typography sx={{ fontWeight: 600 }} color="grey.700" variant="body2">
                    Definition
                  </Typography>
                </Box>
                <Typography color="grey.600">
                  {question.definition}
                </Typography>
              </Box>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Answer Content */}
            <Box sx={{ position: 'relative' }}>
              <Typography variant="body2" color="grey.600" sx={{ mb: 2, fontWeight: 600 }}>
                Answer
              </Typography>
              
              {renderAnswer()}

              {/* Answer Metadata */}
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.100',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Clock size={14} style={{ color: 'grey.400' }} />
                  <Typography variant="caption" color="grey.400">
                    Question #{question.id}
                  </Typography>
                </Box>
                <Chip
                  label={isAnswerVisible ? 'Visible' : 'Hidden'}
                  size="small"
                  sx={{
                    bgcolor: isAnswerVisible ? alpha('#22c55e', 0.1) : alpha('#dc2626', 0.1),
                    color: isAnswerVisible ? '#16a34a' : '#dc2626',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            bgcolor: '#2563eb',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          Question copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}