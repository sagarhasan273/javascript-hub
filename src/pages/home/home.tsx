// pages/home/home.tsx
import { useState, useEffect } from "react";
import { Box, Container, Stack, Fab, Typography } from "@mui/material";
import { ChevronUp, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { questionMetadata, questionRegistry } from "../../data/questions/registry";
import { Sidebar } from "../../components/Sidebar";

interface HomeProps {
  mobileSidebarOpen?: boolean;
  onMobileSidebarClose?: () => void;
  onMobileSidebarToggle?: () => void;
}

export function Home({ 
  mobileSidebarOpen = false, 
  onMobileSidebarClose,
  onMobileSidebarToggle 
}: HomeProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem("sidebar-width");
    return saved ? parseInt(saved, 10) : 420;
  });

  useEffect(() => {
    const ids = questionRegistry.map((q) => q.id).sort((a, b) => a - b);
    setQuestionIds(ids);
    if (ids.length > 0) {
      setCurrentQuestionId(ids[0]);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("sidebar-width");
      if (saved) {
        setSidebarWidth(parseInt(saved, 10));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSelectQuestion = (id: number) => {
    setCurrentQuestionId(id);
    setTimeout(() => {
      const element = document.getElementById("main-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleNext = () => {
    const currentIndex = questionIds.indexOf(currentQuestionId!);
    if (currentIndex < questionIds.length - 1) {
      handleSelectQuestion(questionIds[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = questionIds.indexOf(currentQuestionId!);
    if (currentIndex > 0) {
      handleSelectQuestion(questionIds[currentIndex - 1]);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const currentIndex = currentQuestionId ? questionIds.indexOf(currentQuestionId) : -1;

  // Filter questions based on current level
  const filteredQuestions = questionRegistry.filter(() => true);

  return (
    <Box sx={{ 
      display: "flex", 
      flex: 1,
      minHeight: "calc(100dvh - 64px)",
      bgcolor: "grey.100",
      position: "relative",
    }}>
      {/* Sidebar - Desktop */}
      <Sidebar
        questions={questionMetadata}
        currentQuestion={currentQuestionId}
        onSelectQuestion={handleSelectQuestion}
        defaultWidth={sidebarWidth}
        minWidth={420}
        maxWidth={540}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={onMobileSidebarClose}
        onMenuClick={onMobileSidebarToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        id="main-content"
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "background.paper",
          pt: { xs: 2, lg: 3 },
          pb: { xs: 2, lg: 3 },
          minHeight: "calc(100dvh - 64px)",
          maxHeight: "calc(100dvh - 64px)",
          position: "relative",
        }}
      >
        <Container maxWidth="lg" sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          {/* Render Questions */}
          <Stack spacing={4}>
            {filteredQuestions
              .filter(({ id }) => currentQuestionId === id)
              .map(({ id, component: QuestionComponent }, index) => (
                <QuestionComponent
                  key={id}
                  index={index}
                  isActive={currentQuestionId === id}
                />
              ))}
          </Stack>
        </Container>

        {/* Navigation Controls - Floating */}
        {currentQuestionId && (
          <Box
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                p: 1,
                mb: 1,
                textAlign: "center",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="caption" color="grey.600" sx={{ display: "block" }}>
                {currentIndex + 1}/{questionIds.length}
              </Typography>
            </Box>

            <Fab
              size="small"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              sx={{
                bgcolor: "#2563eb",
                color: "white",
                "&:hover": { bgcolor: "#1d4ed8" },
                "&.Mui-disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                  opacity: 0.5,
                },
              }}
            >
              <ArrowUp size={18} />
            </Fab>

            <Fab
              size="small"
              onClick={handleNext}
              disabled={currentIndex === questionIds.length - 1}
              sx={{
                bgcolor: "#2563eb",
                color: "white",
                "&:hover": { bgcolor: "#1d4ed8" },
                "&.Mui-disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                  opacity: 0.5,
                },
              }}
            >
              <ArrowDown size={18} />
            </Fab>

            <Fab
              size="small"
              onClick={handleScrollToTop}
              sx={{
                bgcolor: "grey.200",
                color: "grey.700",
                "&:hover": { bgcolor: "grey.300" },
              }}
            >
              <ChevronUp size={18} />
            </Fab>

            <Fab
              size="small"
              onClick={handleScrollToBottom}
              sx={{
                bgcolor: "grey.200",
                color: "grey.700",
                "&:hover": { bgcolor: "grey.300" },
              }}
            >
              <ChevronDown size={18} />
            </Fab>
          </Box>
        )}
      </Box>
    </Box>
  );
}