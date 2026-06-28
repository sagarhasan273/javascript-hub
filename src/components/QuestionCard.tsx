import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { Question } from '../data/types';
import { highlightCodeBlocks } from '../utils/highlight';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  alpha,
} from '@mui/material';

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  isActive: boolean;
}

export default function QuestionCard({
  question,
  index,
  onEdit,
  onDelete,
  isActive,
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  // Highlight code blocks in the answer
  const highlightedAnswer = highlightCodeBlocks(question.answer || '');

  return (
    <Paper
      ref={cardRef}
      id={`question-${question.id}`}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'grey.300',
          boxShadow: 1,
        },
      }}
    >
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
        <Typography
          component="h2"
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'grey.800',
            fontWeight: 'bold',
          }}
        >
          <Chip
            label={index + 1}
            size="medium"
            sx={{
              bgcolor: '#2563eb',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 50,
              px: 1,
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
          {question.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
          <Button
            variant={isAnswerVisible ? 'outlined' : 'contained'}
            startIcon={isAnswerVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            sx={{
              borderRadius: 50,
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              ...(isAnswerVisible && {
                bgcolor: 'grey.100',
                color: 'grey.700',
                borderColor: 'transparent',
                '&:hover': {
                  bgcolor: '#2563eb',
                  color: 'white',
                  borderColor: 'transparent',
                },
              }),
            }}
          >
            {isAnswerVisible ? 'Hide' : 'Show'}
          </Button>

          <Button
            variant="outlined"
            startIcon={<Edit size={16} />}
            onClick={() => onEdit(question)}
            sx={{
              borderRadius: 50,
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: 'grey.100',
              color: 'grey.700',
              borderColor: 'transparent',
              '&:hover': {
                bgcolor: '#2563eb',
                color: 'white',
                borderColor: 'transparent',
              },
            }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<Trash2 size={16} />}
            onClick={() => {
              if (window.confirm('Delete this question?')) {
                onDelete(question.id);
              }
            }}
            sx={{
              borderRadius: 50,
              px: 2.5,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              color: '#dc2626',
              borderColor: alpha('#dc2626', 0.2),
              '&:hover': {
                bgcolor: alpha('#dc2626', 0.05),
                borderColor: alpha('#dc2626', 0.3),
              },
            }}
          >
            Del
          </Button>
        </Stack>
      </Box>

      {/* Answer Body */}
      <Box
        sx={{
          overflow: 'hidden',
          transition: 'all 0.2s',
          maxHeight: isAnswerVisible ? '5000px' : '0',
          opacity: isAnswerVisible ? 1 : 0,
        }}
      >
        {/* Definition Box */}
        <Box
          sx={{
            bgcolor: alpha('#2563eb', 0.05),
            borderLeft: '4px solid',
            borderColor: '#2563eb',
            borderRadius: 2,
            p: 2.5,
            mb: 3,
          }}
        >
          <Typography component="span" sx={{ fontWeight: 'bold', color: 'grey.700' }}>
            Definition:{' '}
          </Typography>
          <Typography component="span" sx={{ color: 'grey.600' }}>
            {question.definition || 'N/A'}
          </Typography>
        </Box>

        {/* Answer HTML Content with highlighted code */}
        <Box
          className="prose prose-slate max-w-none"
          sx={{
            '& > *': {
              maxWidth: '100%',
            },
            '& pre': {
              bgcolor: 'grey.900',
              color: 'grey.100',
              p: 3,
              borderRadius: 2,
              overflow: 'auto',
            },
            '& code': {
              fontFamily: 'monospace',
            },
          }}
          dangerouslySetInnerHTML={{ __html: highlightedAnswer }}
        />
      </Box>
    </Paper>
  );
}