import { Menu, X, ChevronRight, Code, PlusCircle, Search, XCircle } from 'lucide-react';
import { Question } from '../data/types';
import { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface SidebarProps {
  questions: Question[];
  currentQuestion: number | null;
  onSelectQuestion: (id: number) => void;
  onAddNew: () => void;
}

export default function Sidebar({
  questions,
  currentQuestion,
  onSelectQuestion,
  onAddNew,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on search query
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;

    const query = searchQuery.toLowerCase().trim();
    const queryNumber = parseInt(query, 10);

    return questions.filter((question) => {
      if (queryNumber && question.id === queryNumber) return true;
      if (question.title.toLowerCase().includes(query)) return true;
      if (question.definition.toLowerCase().includes(query)) return true;
      return false;
    });
  }, [questions, searchQuery]);

  const sidebarContent = (
    <Box
      sx={{
        width: 288,
        height: '100vh',
        bgcolor: 'grey.900',
        backgroundImage: 'linear-gradient(to bottom, #0f172a, #020617)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 8,
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header - Fixed */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}
        >
          <Code size={26} style={{ color: '#fbbf24' }} />
          My Q&A Builder
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.400', mt: 0.5, display: 'block' }}>
          Add unlimited questions
        </Typography>
      </Box>

      {/* Search Bar - Fixed */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Search by # or text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(30, 41, 59, 0.8)',
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'rgba(51, 65, 85, 1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(51, 65, 85, 1)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
                borderWidth: 2,
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
              '&::placeholder': {
                color: 'grey.500',
                opacity: 1,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} style={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  >
                    <XCircle size={16} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {searchQuery && (
          <Typography variant="caption" sx={{ color: 'grey.400', mt: 1, display: 'block' }}>
            {filteredQuestions.length === 0
              ? 'No matches found'
              : `${filteredQuestions.length} question${filteredQuestions.length !== 1 ? 's' : ''} found`}
          </Typography>
        )}
      </Box>

      {/* Question Navigation - Scrollable */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1.5,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
            },
          },
        }}
      >
        <List disablePadding>
          {filteredQuestions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, color: 'grey.500' }}>
              <Search size={28} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <Typography variant="body2">No questions match</Typography>
            </Box>
          ) : (
            filteredQuestions.map((question, index) => (
              <ListItem key={question.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    onSelectQuestion(question.id);
                    if (isMobile) setIsOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    ...(currentQuestion === question.id && {
                      bgcolor: '#2563eb',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        bgcolor: '#2563eb',
                      },
                    }),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Code
                      size={16}
                      style={{
                        color: currentQuestion === question.id ? 'white' : 'grey.500',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: currentQuestion === question.id ? 'white' : 'grey.300',
                          fontWeight: currentQuestion === question.id ? 600 : 400,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {`${index + 1}. ${question.title}`}
                      </Typography>
                    }
                  />
                  <ChevronRight
                    size={16}
                    style={{
                      color: currentQuestion === question.id ? 'white' : 'grey.500',
                      opacity: currentQuestion === question.id ? 1 : 0.5,
                      transform: currentQuestion === question.id ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Add New Button - Fixed */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<PlusCircle size={20} />}
          onClick={() => {
            onAddNew();
            if (isMobile) setIsOpen(false);
          }}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: '#2563eb',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#1d4ed8',
            },
          }}
        >
          Add New Question
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 50,
            bgcolor: 'grey.900',
            color: 'white',
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              bgcolor: 'grey.800',
            },
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </IconButton>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 288,
              boxSizing: 'border-box',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        // Desktop Sidebar - Fixed position
        <Box
          sx={{
            display: 'flex',
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
}