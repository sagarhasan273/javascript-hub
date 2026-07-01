// components/Sidebar.tsx
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Code,
  Search,
  XCircle,
  GripVertical,
  BookOpen,
  TrendingUp,
  Zap,
} from "lucide-react";
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
  useMediaQuery,
  useTheme,
  Badge,
  Fade,
  Tooltip,
} from "@mui/material";
import { LevelToggle } from "./LevelToggle";

interface QuestionMeta {
  id: number;
  title: string;
  definition: string;
}

interface SidebarProps {
  questions: QuestionMeta[];
  currentQuestion: number | null;
  onSelectQuestion: (id: number) => void;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

export function Sidebar({
  questions,
  currentQuestion,
  onSelectQuestion,
  defaultWidth = 420,
  minWidth = 420,
  maxWidth = 540,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth =
        e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setSidebarWidth(clampedWidth);
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${clampedWidth}px`,
      );
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsHovering(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "none";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "none";
    };
  }, [isResizing, minWidth, maxWidth]);

  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebar-width");
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= minWidth && width <= maxWidth) {
        setSidebarWidth(width);
      }
    }
  }, [minWidth, maxWidth]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setIsHovering(true);
  };

  useEffect(() => {
    if (!isResizing) {
      localStorage.setItem("sidebar-width", sidebarWidth.toString());
    }
  }, [sidebarWidth, isResizing]);

  const sidebarContent = (
    <Box
      ref={sidebarRef}
      sx={{
        width: isMobile ? "100%" : sidebarWidth,
        height: "100vh",
        background:
          "linear-gradient(180deg, #0a0e1a 0%, #1a1a2e 40%, #16213e 70%, #0a0e1a 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 30px rgba(0,0,0,0.6)",
        position: "relative",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: isResizing ? "none" : "width 0.2s ease",
        flexShrink: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(96, 165, 250, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Animated Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)",
          backgroundSize: "300% 100%",
          animation: "gradientSlide 3s ease-in-out infinite",
          "@keyframes gradientSlide": {
            "0%": { backgroundPosition: "0% 0%" },
            "50%": { backgroundPosition: "100% 0%" },
            "100%": { backgroundPosition: "0% 0%" },
          },
        }}
      />

      {/* Mobile Close Button */}
      {isMobile && (
        <IconButton
          onClick={() => setIsOpen(false)}
          sx={{
            position: "absolute",
            top: 25,
            right: 20,
            zIndex: 100,
            color: "rgba(255,255,255,0.6)",
            "&:hover": {
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <X size={24} />
        </IconButton>
      )}

      {/* Resize Handle - Desktop only */}
      {!isMobile && (
        <Tooltip
          title="Drag to resize sidebar"
          placement="left"
          open={isHovering || isResizing}
        >
          <Box
            ref={resizeRef}
            onMouseDown={handleResizeStart}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => !isResizing && setIsHovering(false)}
            sx={{
              position: "absolute",
              right: -6,
              top: 0,
              bottom: 0,
              width: 12,
              cursor: "col-resize",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                "& .resize-border": {
                  borderColor: "rgba(96, 165, 250, 0.6)",
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)",
                },
                "& .resize-icon": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
              "& .resize-border": {
                position: "absolute",
                right: 4,
                top: 0,
                bottom: 0,
                width: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
                border: "1px solid transparent",
                ...((isHovering || isResizing) && {
                  backgroundColor: "rgba(96, 165, 250, 0.3)",
                  borderColor: "rgba(96, 165, 250, 0.2)",
                }),
                ...(isResizing && {
                  backgroundColor: "rgba(96, 165, 250, 0.5)",
                  borderColor: "rgba(96, 165, 250, 0.4)",
                  boxShadow: "0 0 30px rgba(96, 165, 250, 0.3)",
                }),
                zIndex: 99,
              },
              "& .resize-icon-container": {
                position: "absolute",
                right: -4,
                top: "50%",
                transform: `${isHovering || isResizing ? "scale(1)" : "scale(0.8)"} translateY(-50%)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                opacity: isHovering || isResizing ? 1 : 0,
                transition: "all 0.3s ease",
              },
            }}
          >
            <Box className="resize-border" />
            <Box className="resize-icon-container">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      bgcolor: isResizing
                        ? "rgba(96, 165, 250, 0.8)"
                        : isHovering
                          ? "rgba(96, 165, 250, 0.6)"
                          : "rgba(255,255,255,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isResizing
                    ? "rgba(96, 165, 250, 0.2)"
                    : isHovering
                      ? "rgba(96, 165, 250, 0.1)"
                      : "transparent",
                  borderRadius: 1,
                  p: 0.5,
                  transition: "all 0.3s ease",
                  transform: isResizing ? "scale(1.1)" : "scale(1)",
                }}
              >
                <GripVertical
                  size={16}
                  style={{
                    color: isResizing
                      ? "#60a5fa"
                      : isHovering
                        ? "#93c5fd"
                        : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      bgcolor: isResizing
                        ? "rgba(96, 165, 250, 0.8)"
                        : isHovering
                          ? "rgba(96, 165, 250, 0.6)"
                          : "rgba(255,255,255,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>
            {isResizing && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 60,
                  background:
                    "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.05) 50%, transparent)",
                  animation: "pulseGlow 1s ease-in-out infinite",
                  "@keyframes pulseGlow": {
                    "0%, 100%": { opacity: 0.5 },
                    "50%": { opacity: 1 },
                  },
                }}
              />
            )}
          </Box>
        </Tooltip>
      )}

      {/* Header */}
      <Box
        sx={{
          p: isMobile ? 2 : 3,
          pt: isMobile ? 4 : 3,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontWeight: 800,
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(37,99,235,0.2)",
                p: 0.5,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Code size={24} style={{ color: "#60a5fa" }} />
            </Box>
            Q&A Builder
          </Typography>
          {!isMobile && (
            <Badge
              badgeContent={questions.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#2563eb",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: 22,
                minWidth: 22,
              },
            }}
          />)}
        </Box>

        {/* Level Toggle - Now in Header */}
        <Box
          sx={{
            my: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            Learning Level
          </Typography>
        </Box>
        <LevelToggle />
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          px: isMobile ? 2 : 2.5,
          py: isMobile ? 2 : 2.5,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          position: "relative",
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
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.04)",
              borderRadius: 3,
              transition: "all 0.3s ease",
              border: "1px solid rgba(255,255,255,0.05)",
              "& fieldset": {
                borderColor: "transparent",
                borderWidth: 0,
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(96, 165, 250, 0.3)",
                boxShadow: "0 0 20px rgba(96, 165, 250, 0.05)",
              },
              "&.Mui-focused": {
                bgcolor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(96, 165, 250, 0.5)",
                boxShadow: "0 0 30px rgba(96, 165, 250, 0.1)",
                "& fieldset": {
                  borderColor: "rgba(96, 165, 250, 0.5)",
                  borderWidth: 1,
                },
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              py: 1.2,
              "&::placeholder": {
                color: "rgba(255,255,255,0.3)",
                opacity: 1,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    size={18}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      "&:hover": {
                        color: "white",
                        bgcolor: "rgba(255,255,255,0.08)",
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
            <Box
              sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.4)" }}
              >
                {filteredQuestions.length === 0
                  ? "No matches found"
                  : `Found ${filteredQuestions.length} question${filteredQuestions.length !== 1 ? "s" : ""}`}
              </Typography>
              {filteredQuestions.length > 0 && (
                <Box
                  sx={{
                    flex: 1,
                    height: 2,
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${(filteredQuestions.length / questions.length) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                      borderRadius: 1,
                      transition: "width 0.3s ease",
                      boxShadow: "0 0 10px rgba(96, 165, 250, 0.3)",
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
          overflowY: "auto",
          p: isMobile ? 1.5 : 2,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #60a5fa, #a78bfa)",
            borderRadius: "10px",
            "&:hover": {
              background: "linear-gradient(180deg, #93c5fd, #c4b5fd)",
            },
          },
        }}
      >
        <List disablePadding>
          {filteredQuestions.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 2,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <Search
                size={40}
                style={{ margin: "0 auto 12px", opacity: 0.3 }}
              />
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "rgba(255,255,255,0.4)" }}
              >
                No questions match
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.2)" }}
              >
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
                      px: 2,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)",
                        transform: "translateX(4px)",
                        "& .question-number": {
                          background: "rgba(96, 165, 250, 0.2)",
                          color: "#60a5fa",
                        },
                      },
                      ...(currentQuestion === question.id && {
                        bgcolor: "rgba(96, 165, 250, 0.12)",
                        boxShadow: "0 4px 20px rgba(96, 165, 250, 0.1)",
                        border: "1px solid rgba(96, 165, 250, 0.15)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "15%",
                          height: "70%",
                          width: 3,
                          background:
                            "linear-gradient(180deg, #60a5fa, #a78bfa)",
                          borderRadius: "0 3px 3px 0",
                          boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                        },
                        "&:hover": {
                          bgcolor: "rgba(96, 165, 250, 0.18)",
                          transform: "translateX(4px)",
                        },
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 32,
                        mr: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        className="question-number"
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            currentQuestion === question.id
                              ? "linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(167, 139, 250, 0.3))"
                              : "rgba(255,255,255,0.04)",
                          border: "1px solid",
                          borderColor:
                            currentQuestion === question.id
                              ? "rgba(96, 165, 250, 0.3)"
                              : "rgba(255,255,255,0.05)",
                          transition: "all 0.3s ease",
                          color:
                            currentQuestion === question.id
                              ? "#60a5fa"
                              : "rgba(255,255,255,0.4)",
                        }}
                      >
                        <Code size={14} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              currentQuestion === question.id
                                ? "white"
                                : "rgba(255,255,255,0.7)",
                            fontWeight:
                              currentQuestion === question.id ? 600 : 400,
                            letterSpacing: "0.2px",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              opacity: 0.3,
                              mr: 1,
                              fontSize: "0.7rem",
                              fontWeight: 500,
                            }}
                          >
                            #{index + 1}
                          </Box>
                          {question.title}
                        </Typography>
                      }
                    />
                    <ChevronRight
                      size={16}
                      style={{
                        color:
                          currentQuestion === question.id
                            ? "#60a5fa"
                            : "rgba(255, 255, 255, 0.85)",
                        opacity: currentQuestion === question.id ? 1 : 0.3,
                        transform:
                          currentQuestion === question.id
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-around",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 2,
              p: 1.5,
            }}
          >
            {[
              { label: "Total", value: questions.length, icon: BookOpen },
              {
                label: "Viewed",
                value: currentQuestion ? "1" : "0",
                icon: Zap,
              },
              {
                label: "Progress",
                value: `${questions.length > 0 ? Math.round(((currentQuestion ? 1 : 0) / questions.length) * 100) : 0}%`,
                icon: TrendingUp,
              },
            ].map((stat, idx) => (
              <Box key={idx} sx={{ textAlign: "center" }}>
                <stat.icon
                  size={14}
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    margin: "0 auto 4px",
                    display: "block",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.3)", display: "block" }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}
                >
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 50,
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "white",
            borderRadius: 2.5,
            boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
            p: 1,
            m: 1,
            "&:hover": {
              background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
              transform: "scale(1.05)",
            },
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              boxSizing: "border-box",
              bgcolor: "transparent",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
}