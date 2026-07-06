// pages/home/home.tsx
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Fab,
  Typography,
  Zoom,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Menu as MenuIcon,
} from "lucide-react";
import {
  questionMetadata,
  questionRegistry,
} from "../../data/questions/registry";
import { Sidebar } from "../../components/Sidebar";
import { Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

interface HomeProps {
  mobileSidebarOpen?: boolean;
  onMobileSidebarClose?: () => void;
  onMobileSidebarToggle?: () => void;
}

export function Home({
  mobileSidebarOpen = false,
  onMobileSidebarClose,
  onMobileSidebarToggle,
}: HomeProps) {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null,
  );
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem("sidebar-width");
    return saved ? parseInt(saved, 10) : 420;
  });
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const hasScrolledToQuestion = useRef(false);

  // Initialize question IDs and check URL for question parameter
  useEffect(() => {
    const ids = questionRegistry.map((q) => q.id).sort((a, b) => a - b);
    setQuestionIds(ids);

    // Check URL for question parameter
    const params = new URLSearchParams(location.search);
    const questionId = params.get("question");

    if (questionId) {
      const id = parseInt(questionId, 10);
      const exists = ids.some((qId) => qId === id);
      if (exists) {
        setCurrentQuestionId(id);
        hasScrolledToQuestion.current = false;
        return;
      }
    }

    // If no valid question ID in URL, set to first question
    if (ids.length > 0) {
      setCurrentQuestionId(ids[0]);
    }
  }, [location.search]);

  // Scroll to the question when currentQuestionId changes
  useEffect(() => {
    if (
      currentQuestionId &&
      mainContentRef.current &&
      !hasScrolledToQuestion.current
    ) {
      hasScrolledToQuestion.current = true;
      setTimeout(() => {
        const element = document.getElementById(
          `question-${currentQuestionId}`,
        );
        if (element && mainContentRef.current) {
          const container = mainContentRef.current;
          const elementRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const offset = 80;
          const scrollTop =
            elementRect.top - containerRect.top + container.scrollTop - offset;

          container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [currentQuestionId]);

  // Listen for sidebar width changes from other tabs/windows
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

  // Update URL when question changes
  useEffect(() => {
    if (currentQuestionId) {
      const url = new URL(window.location.href);
      url.searchParams.set("question", currentQuestionId.toString());
      window.history.pushState(
        { questionId: currentQuestionId },
        "",
        url.toString(),
      );
    }
  }, [currentQuestionId]);

  const handleSelectQuestion = (id: number) => {
    setCurrentQuestionId(id);
    setFabMenuOpen(false);
    hasScrolledToQuestion.current = false;

    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(`question-${id}`);
        if (element && mainContentRef.current) {
          const container = mainContentRef.current;
          const elementRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const offset = 80;
          const scrollTop =
            elementRect.top - containerRect.top + container.scrollTop - offset;

          container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: "smooth",
          });
        }
      }, 50);
    });
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
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setFabMenuOpen(false);
  };

  const handleScrollToBottom = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: mainContentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setFabMenuOpen(false);
  };

  const currentIndex = currentQuestionId
    ? questionIds.indexOf(currentQuestionId)
    : -1;
  const filteredQuestions = questionRegistry.filter(() => true);

  // FAB Menu items
  const fabItems = [
    {
      icon: <ArrowUp size={18} />,
      label: "Previous",
      action: handlePrevious,
      disabled: currentIndex === 0,
      color: "#2563eb",
    },
    {
      icon: <ArrowDown size={18} />,
      label: "Next",
      action: handleNext,
      disabled: currentIndex === questionIds.length - 1,
      color: "#2563eb",
    },
    {
      icon: <ChevronUp size={18} />,
      label: "Top",
      action: handleScrollToTop,
      disabled: false,
      color: "#6b7280",
    },
    {
      icon: <ChevronDown size={18} />,
      label: "Bottom",
      action: handleScrollToBottom,
      disabled: false,
      color: "#6b7280",
    },
  ];

  // Calculate bottom padding for content
  const fabMenuHeight = isMobile
    ? fabMenuOpen
      ? fabItems.length * 56 + 70
      : 70
    : 250;
  const bottomPadding = isMobile ? `${fabMenuHeight + 20}px` : "100px";

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100%",
        bgcolor: "grey.100",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
        ref={mainContentRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "background.paper",
          pt: { xs: 2, lg: 3 },
          pb: { xs: 2, lg: 3 },
          height: "100%",
          position: "relative",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 0, sm: 1 },
            pb: bottomPadding,
          }}
        >
          {filteredQuestions
            .filter(({ id }) => currentQuestionId === id)
            .map(({ id, component: QuestionComponent }, index) => (
              <QuestionComponent
                key={id}
                index={index}
                isActive={currentQuestionId === id}
              />
            ))}
        </Box>

        {/* Floating Action Button Menu */}
        {currentQuestionId && (
          <Box
            sx={{
              position: "fixed",
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
              zIndex: 1000,
              pointerEvents: "none",
              "& > *": {
                pointerEvents: "auto",
              },
            }}
          >
            {/* Menu items - Animated */}
            {isMobile ? (
              // Mobile: Expandable FAB Menu
              <>
                {fabItems.map((item, index) => (
                  <Zoom
                    key={index}
                    in={fabMenuOpen}
                    style={{
                      transitionDelay: fabMenuOpen
                        ? `${(fabItems.length - index) * 60}ms`
                        : "0ms",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      {/* Label */}
                      <Fade in={fabMenuOpen}>
                        <Box
                          sx={{
                            bgcolor: "rgba(0,0,0,0.7)",
                            color: "white",
                            borderRadius: 1,
                            px: 1.5,
                            py: 0.5,
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {item.label}
                        </Box>
                      </Fade>

                      <Fab
                        size="small"
                        onClick={item.action}
                        disabled={item.disabled}
                        sx={{
                          bgcolor: item.disabled ? "grey.300" : item.color,
                          color: "white",
                          width: 40,
                          height: 40,
                          minHeight: 40,
                          "&:hover": {
                            bgcolor: item.disabled
                              ? "grey.300"
                              : `${item.color}dd`,
                          },
                          "&.Mui-disabled": {
                            bgcolor: "grey.300",
                            color: "grey.500",
                            opacity: 0.5,
                          },
                          transition: "all 0.3s ease",
                          boxShadow: fabMenuOpen
                            ? "0 4px 12px rgba(0,0,0,0.2)"
                            : "none",
                        }}
                      >
                        {item.icon}
                      </Fab>
                    </Box>
                  </Zoom>
                ))}

                {/* Progress indicator */}
                {!fabMenuOpen && (
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      px: 1.5,
                      py: 0.75,
                      textAlign: "center",
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="grey.600"
                      sx={{ display: "block", fontSize: "0.7rem" }}
                    >
                      {currentIndex + 1}/{questionIds.length}
                    </Typography>
                  </Box>
                )}

                {/* Main FAB Button */}
                <Fab
                  onClick={() => setFabMenuOpen(!fabMenuOpen)}
                  sx={{
                    bgcolor: fabMenuOpen ? "#ef4444" : "#2563eb",
                    color: "white",
                    width: 48,
                    height: 48,
                    minHeight: 48,
                    "&:hover": {
                      bgcolor: fabMenuOpen ? "#dc2626" : "#1d4ed8",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                    pointerEvents: "auto",
                  }}
                >
                  {fabMenuOpen ? <Close /> : <MenuIcon size={24} />}
                </Fab>
              </>
            ) : (
              // Desktop: Always visible buttons
              <>
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
                  <Typography
                    variant="caption"
                    color="grey.600"
                    sx={{ display: "block" }}
                  >
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
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
