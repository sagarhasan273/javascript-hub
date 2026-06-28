import { useState, useEffect } from 'react';
import { Save, Pen, X, List, Code, AlignLeft } from 'lucide-react';
import { Question } from '../data/types';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Alert,
} from '@mui/material';

interface QuestionFormProps {
  editingQuestion: Question | null;
  onSave: (question: Omit<Question, 'id'> & { id?: number }) => void;
  onCancel: () => void;
  scrollToForm: boolean;
}

export default function QuestionForm({
  editingQuestion,
  onSave,
  onCancel,
}: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title);
      setDefinition(editingQuestion.definition);
      setAnswer(editingQuestion.answer);
    } else {
      setTitle('');
      setDefinition('');
      setAnswer('');
    }
    setError('');
  }, [editingQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Question title is required.');
      return;
    }

    onSave({
      id: editingQuestion?.id,
      title: title.trim(),
      definition: definition.trim(),
      answer: answer.trim(),
    });

    setTitle('');
    setDefinition('');
    setAnswer('');
    setError('');
  };

  return (
    <Paper
      id="addQuestionForm"
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        mb: 5,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}
      >
        {editingQuestion ? (
          <>
            <Pen size={22} style={{ color: '#2563eb' }} />
            Edit Question
          </>
        ) : (
          <>
            <Save size={22} style={{ color: '#2563eb' }} />
            Create Question
          </>
        )}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <TextField
            label="Question Title"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., What is closure?"
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'grey.50',
                '&:hover': {
                  bgcolor: 'background.paper',
                },
                '&.Mui-focused': {
                  bgcolor: 'background.paper',
                },
              },
            }}
          />

          <TextField
            label="Short Definition / Summary"
            fullWidth
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="A brief one-liner definition"
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'grey.50',
                '&:hover': {
                  bgcolor: 'background.paper',
                },
                '&.Mui-focused': {
                  bgcolor: 'background.paper',
                },
              },
            }}
          />

          <Box>
            <TextField
              label="Full Answer (supports HTML: lists, code, text)"
              fullWidth
              multiline
              rows={7}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`Use <ol>, <ul>, <pre><code>, <p> etc.
Example:
<ol><li>First point</li><li>Second point</li></ol>
<pre><code>const x = 10;</code></pre>`}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  '&:hover': {
                    bgcolor: 'background.paper',
                  },
                  '&.Mui-focused': {
                    bgcolor: 'background.paper',
                  },
                },
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}
            >
              <Chip
                icon={<List size={14} />}
                label={<code>&lt;ol&gt;</code>}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <Chip
                icon={<List size={14} />}
                label={<code>&lt;ul&gt;</code>}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <Chip
                icon={<Code size={14} />}
                label={<code>&lt;pre&gt;&lt;code&gt;</code>}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <Chip
                icon={<AlignLeft size={14} />}
                label={<code>&lt;p&gt;</code>}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={editingQuestion ? <Pen size={18} /> : <Save size={18} />}
              sx={{
                borderRadius: 50,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                bgcolor: '#2563eb',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                },
              }}
            >
              {editingQuestion ? 'Update Question' : 'Save Question'}
            </Button>

            {editingQuestion && (
              <Button
                type="button"
                variant="contained"
                startIcon={<X size={18} />}
                onClick={onCancel}
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: '#64748b',
                  '&:hover': {
                    bgcolor: '#475569',
                  },
                }}
              >
                Cancel Edit
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}