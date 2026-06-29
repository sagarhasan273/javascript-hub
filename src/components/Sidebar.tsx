// components/Sidebar.tsx
import { useState, useMemo } from 'react';
import { Menu, X, ChevronRight, Code, PlusCircle, Search, XCircle } from 'lucide-react';
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
  Badge,
  Fade,
} from '@mui/material';

interface QuestionMeta {
  id: number;
  title: string;
  definition: string;
}

interface SidebarProps {
  questions: QuestionMeta[];
  currentQuestion: number | null;
  onSelectQuestion: (id: number) => void;
  onAddNew: () => void;
}

export function Sidebar({
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
        width: 320,
        height: '100vh',
        bgcolor: '#0a0f1e',
        backgroundImage: 'linear-gradient(180deg, #0a0f1e 0%, #1a1a2e 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0,0,0,0.5)',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(37,99,235,0.2)',
                p: 0.5,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Code size={24} style={{ color: '#60a5fa' }} />
            </Box>
            Q&A Builder
          </Typography>
          <Badge
            badgeContent={questions.length}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: '#2563eb',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 22,
                minWidth: 22,
              },
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: 'grey.400', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Build your knowledge base
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1.5,
              },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.08)',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.15)',
                },
              },
              '&.Mui-focused': {
                bgcolor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 0 0 3px rgba(37,99,235,0.15)',
                '& fieldset': {
                  borderColor: '#3b82f6',
                  borderWidth: 2,
                },
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
              py: 1.2,
              '&::placeholder': {
                color: 'grey.500',
                opacity: 0.8,
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
                    sx={{
                      color: 'grey.400',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <XCircle size={16} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {searchQuery && (
          <Fade in={!!searchQuery}>
            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'grey.400' }}>
                {filteredQuestions.length === 0
                  ? 'No matches found'
                  : `Found ${filteredQuestions.length} question${filteredQuestions.length !== 1 ? 's' : ''}`}
              </Typography>
              {filteredQuestions.length > 0 && (
                <Box
                  sx={{
                    flex: 1,
                    height: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: `${(filteredQuestions.length / questions.length) * 100}%`,
                      height: '100%',
                      bgcolor: '#3b82f6',
                      borderRadius: 1,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Fade>
        )}
      </Box>

      {/* Question List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.25)',
            },
          },
        }}
      >
        <List disablePadding>
          {filteredQuestions.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 2,
                color: 'grey.500',
              }}
            >
              <Search size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <Typography variant="body2" sx={{ mb: 1, color: 'grey.400' }}>
                No questions match
              </Typography>
              <Typography variant="caption" sx={{ color: 'grey.600' }}>
                Try adjusting your search terms
              </Typography>
            </Box>
          ) : (
            filteredQuestions.map((question, index) => (
              <Fade in key={question.id} timeout={index * 50}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      onSelectQuestion(question.id);
                      if (isMobile) setIsOpen(false);
                    }}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.5,
                      px: 2.5,
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.06)',
                        transform: 'translateX(4px)',
                      },
                      ...(currentQuestion === question.id && {
                        bgcolor: 'rgba(37,99,235,0.2)',
                        boxShadow: '0 4px 12px rgba(37,99,235,0.15)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '20%',
                          height: '60%',
                          width: 3,
                          bgcolor: '#3b82f6',
                          borderRadius: '0 2px 2px 0',
                        },
                        '&:hover': {
                          bgcolor: 'rgba(37,99,235,0.25)',
                          transform: 'translateX(4px)',
                        },
                      }),
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: currentQuestion === question.id 
                            ? 'rgba(37,99,235,0.3)' 
                            : 'rgba(255,255,255,0.05)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Code
                          size={14}
                          style={{
                            color: currentQuestion === question.id ? '#60a5fa' : 'grey.500',
                          }}
                        />
                      </Box>
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
                            letterSpacing: '0.2px',
                          }}
                        >
                          <Box component="span" sx={{ opacity: 0.5, mr: 0.5 }}>
                            #{index + 1}
                          </Box>
                          {question.title}
                        </Typography>
                      }
                      secondary={
                        question.definition && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: currentQuestion === question.id ? 'rgba(255,255,255,0.6)' : 'grey.500',
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              mt: 0.25,
                            }}
                          >
                            {question.definition}
                          </Typography>
                        )
                      }
                    />
                    <ChevronRight
                      size={16}
                      style={{
                        color: currentQuestion === question.id ? '#60a5fa' : 'grey.500',
                        opacity: currentQuestion === question.id ? 1 : 0.3,
                        transform: currentQuestion === question.id ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Fade>
            ))
          )}
        </List>

        {/* Quick Stats */}
        {filteredQuestions.length > 0 && (
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'grey.500', display: 'block' }}>
                Total
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'grey.300' }}>
                {questions.length}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'grey.500', display: 'block' }}>
                Viewed
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'grey.300' }}>
                {currentQuestion ? '1' : '0'}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'grey.500', display: 'block' }}>
                Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'grey.300' }}>
                {questions.length > 0 ? Math.round((currentQuestion ? 1 : 0) / questions.length * 100) : 0}%
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Add New Button */}
      <Box
        sx={{
          p: 2.5,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
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
            py: 1.8,
            borderRadius: 3,
            bgcolor: '#2563eb',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '0.95rem',
            letterSpacing: '0.3px',
            boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#1d4ed8',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(37,99,235,0.45)',
            },
            '&:active': {
              transform: 'translateY(0)',
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
            bgcolor: '#0a0f1e',
            color: 'white',
            borderRadius: 2.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            '&:hover': {
              bgcolor: '#1a1a2e',
            },
            border: '1px solid rgba(255,255,255,0.1)',
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
              width: 320,
              boxSizing: 'border-box',
              bgcolor: 'transparent',
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