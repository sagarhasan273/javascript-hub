import { useState, useEffect, useRef } from 'react';
import { Inbox } from 'lucide-react';
import { questions as defaultQuestions } from './data/questions';
import { Question } from './data/types';
import Sidebar from './components/Sidebar';
import QuestionCard from './components/QuestionCard';
import QuestionForm from './components/QuestionForm';
import { Box, Container, Stack, Typography } from '@mui/material';

const STORAGE_KEY = 'js_interview_questions';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showForm, setShowForm] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  // Load questions from localStorage or use defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed);
        } else {
          setQuestions(defaultQuestions);
          saveToStorage(defaultQuestions);
        }
      } catch {
        setQuestions(defaultQuestions);
        saveToStorage(defaultQuestions);
      }
    } else {
      setQuestions(defaultQuestions);
      saveToStorage(defaultQuestions);
    }
  }, []);

  const saveToStorage = (qs: Question[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(qs));
  };

  const handleSelectQuestion = (id: number) => {
    setCurrentQuestionId(id);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditingQuestion(null);
    setShowForm(true);
    setCurrentQuestionId(null);
    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveQuestion = (questionData: Omit<Question, 'id'> & { id?: number }) => {
    if (questionData.id) {
      // Update existing
      setQuestions(prev => {
        const updated = prev.map(q =>
          q.id === questionData.id
            ? { ...q, title: questionData.title, definition: questionData.definition, answer: questionData.answer }
            : q
        );
        saveToStorage(updated);
        return updated;
      });
      setEditingQuestion(null);
      setShowForm(false);
    } else {
      // Add new
      const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
      const newQuestion: Question = {
        id: newId,
        title: questionData.title,
        definition: questionData.definition,
        answer: questionData.answer,
      };
      setQuestions(prev => {
        const updated = [...prev, newQuestion];
        saveToStorage(updated);
        return updated;
      });
      setCurrentQuestionId(newId);
      setShowForm(false);
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(prev => {
      const updated = prev.filter(q => q.id !== id);
      saveToStorage(updated);
      return updated;
    });
    if (currentQuestionId === id) {
      setCurrentQuestionId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setShowForm(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar
        questions={questions}
        currentQuestion={currentQuestionId}
        onSelectQuestion={handleSelectQuestion}
        onAddNew={handleAddNew}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          p: { xs: 3, lg: 5 },
        }}
      >
        <Container maxWidth="lg">
          {/* Form */}
          <Box ref={formRef} id="addQuestionForm">
            <QuestionForm
              editingQuestion={editingQuestion}
              onSave={handleSaveQuestion}
              onCancel={handleCancelEdit}
              scrollToForm={showForm}
            />
          </Box>

          {/* Questions Display */}
          {questions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Inbox size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <Typography variant="body1">No questions yet. Create your first one above.</Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onEdit={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                  isActive={currentQuestionId === question.id}
                />
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default App;