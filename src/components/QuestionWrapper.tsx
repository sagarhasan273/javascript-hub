// components/QuestionWrapper.tsx
import { ReactNode, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  alpha,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  BookOpen,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  Link2,
} from "lucide-react";

interface QuestionWrapperProps {
  id: number;
  title: string;
  definition: string;
  children: ReactNode;
  index?: number;
  isActive?: boolean;
}

export function QuestionWrapper({
  id,
  title,
  definition,
  children,
  isActive = false,
}: QuestionWrapperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleCopy = () => {
    const text = `${title}\n\n${definition || ""}\n\n${children}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setSnackbar({
      open: true,
      message: "Question copied to clipboard! 📋",
      severity: "success",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?question=${id}`;
    
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    setSnackbar({
      open: true,
      message: "Question link copied to clipboard! 🔗",
      severity: "success",
    });
    setTimeout(() => setIsLinkCopied(false), 2000);

    window.history.pushState({ questionId: id }, "", `?question=${id}`);
  };

  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?question=${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this JavaScript question: ${title}`,
          url: url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Paper
        id={`question-${id}`}
        elevation={0}
        sx={{
          p: 0,
          width: "100%",
          maxWidth: "100%",
          borderRadius: 4,
          border: "1px solid",
          borderColor: isActive ? "primary.main" : "grey.200",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          bgcolor: "white",
          overflow: "hidden",
          scrollMarginTop: 80,
          "&:hover": {
            borderColor: isActive ? "primary.main" : "grey.300",
            boxShadow: isActive
              ? "0 8px 40px rgba(37,99,235,0.15)"
              : "0 4px 20px rgba(0,0,0,0.06)",
            transform: "translateY(-2px)",
          },
          ...(isActive && {
            boxShadow: "0 8px 40px rgba(37,99,235,0.12)",
            borderColor: "primary.main",
          }),
        }}
      >
        {/* Gradient Top Border */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: isActive
              ? "linear-gradient(90deg, #2563eb, #60a5fa, #a78bfa, #60a5fa, #2563eb)"
              : "linear-gradient(90deg, #e2e8f0, #cbd5e1, #e2e8f0)",
            backgroundSize: isActive ? "300% 100%" : "200% 100%",
            animation: isActive ? "gradientMove 3s linear infinite" : "none",
            "@keyframes gradientMove": {
              "0%": { backgroundPosition: "0% 0%" },
              "100%": { backgroundPosition: "300% 0%" },
            },
            transition: "all 0.4s ease",
          }}
        />

        {/* Glow Effect for Active State */}
        {isActive && (
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              background:
                "radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Header Section */}
        <Box
          sx={{
            p: { xs: 1.5, md: 3 },
            pt: { xs: 2, md: 3 },
            pb: 3,
            borderBottom: "1px solid",
            borderColor: "grey.100",
            background: isActive
              ? "linear-gradient(135deg, rgba(96, 165, 250, 0.04) 0%, rgba(167, 139, 250, 0.04) 100%)"
              : "transparent",
            position: "relative",
          }}
        >
          {isMobile ? (
            // Mobile Layout - Stacked with Title in Second Row
            <>
              {/* First Row: Number + Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* Question Number */}
                <Box
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 44,
                    height: 44,
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 2,
                      background: isActive
                        ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                        : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
                      opacity: 0.1,
                      transition: "all 0.3s ease",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: isActive ? "#2563eb" : "grey.600",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    #{String(id).padStart(2, "0")}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                  <Tooltip title={isCopied ? "Copied!" : "Copy question"}>
                    <IconButton
                      onClick={handleCopy}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha("#2563eb", 0.08),
                          color: "#2563eb",
                        },
                      }}
                    >
                      {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isLinkCopied ? "Link copied!" : "Copy link"}>
                    <IconButton
                      onClick={handleCopyLink}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha("#2563eb", 0.08),
                          color: "#2563eb",
                        },
                      }}
                    >
                      {isLinkCopied ? <Check size={18} /> : <Link2 size={18} />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Share">
                    <IconButton
                      onClick={handleShare}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha("#2563eb", 0.08),
                          color: "#2563eb",
                        },
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isCollapsed ? "Expand" : "Collapse"}>
                    <IconButton
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha("#2563eb", 0.08),
                          color: "#2563eb",
                        },
                      }}
                    >
                      {isCollapsed ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronUp size={18} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Second Row: Title */}
              <Box
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}
                sx={{
                  mt: 1.5,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isActive ? "primary.main" : "grey.800",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {title}
                  {isActive && (
                    <Sparkles
                      size={16}
                      style={{
                        color: "#fbbf24",
                        animation: "sparkle 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </Typography>
              </Box>
            </>
          ) : (
            // Desktop Layout - Single Row
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flex: 1,
                  cursor: "pointer",
                }}
              >
                {/* Question Number */}
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 44,
                    height: 44,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 2,
                      background: isActive
                        ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                        : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
                      opacity: 0.1,
                      transition: "all 0.3s ease",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: isActive ? "#2563eb" : "grey.600",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    #{String(id).padStart(2, "0")}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: isActive ? "primary.main" : "grey.800",
                      letterSpacing: "-0.3px",
                      lineHeight: 1.3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {title}
                    {isActive && (
                      <Sparkles
                        size={16}
                        style={{
                          color: "#fbbf24",
                          animation: "sparkle 2s ease-in-out infinite",
                        }}
                      />
                    )}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                <Tooltip title={isCopied ? "Copied!" : "Copy question"}>
                  <IconButton
                    onClick={handleCopy}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      color: "grey.500",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#2563eb", 0.08),
                        color: "#2563eb",
                      },
                    }}
                  >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                  </IconButton>
                </Tooltip>

                <Tooltip title={isLinkCopied ? "Link copied!" : "Copy link"}>
                  <IconButton
                    onClick={handleCopyLink}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      color: "grey.500",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#2563eb", 0.08),
                        color: "#2563eb",
                      },
                    }}
                  >
                    {isLinkCopied ? <Check size={18} /> : <Link2 size={18} />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Share">
                  <IconButton
                    onClick={handleShare}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      color: "grey.500",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#2563eb", 0.08),
                        color: "#2563eb",
                      },
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </IconButton>
                </Tooltip>

                <Tooltip title={isCollapsed ? "Expand" : "Collapse"}>
                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      color: "grey.500",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#2563eb", 0.08),
                        color: "#2563eb",
                      },
                    }}
                  >
                    {isCollapsed ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronUp size={18} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}

          {/* Definition with enhanced styling */}
          {definition && (
            <Box
              sx={{
                mt: 2,
                p: { xs: 1, md: 2.5 },
                borderRadius: 2,
                background: isActive
                  ? "linear-gradient(135deg, rgba(96, 165, 250, 0.06), rgba(167, 139, 250, 0.06))"
                  : "rgba(0,0,0,0.02)",
                border: "1px solid",
                borderColor: isActive
                  ? "rgba(96, 165, 250, 0.1)"
                  : "rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 24,
                  height: 24,
                  borderRadius: 1,
                  bgcolor: isActive
                    ? "rgba(96, 165, 250, 0.1)"
                    : "rgba(0,0,0,0.04)",
                }}
              >
                <BookOpen
                  size={14}
                  style={{
                    color: isActive ? "#2563eb" : "grey.500",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: isActive ? "primary.main" : "grey.600",
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Definition
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isActive ? "grey.700" : "grey.600",
                    lineHeight: 1.6,
                  }}
                >
                  {definition}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            pt: { xs: 1, sm: 2, md: 3 },
            display: isCollapsed ? "none" : "block",
            animation: isCollapsed ? "none" : "fadeIn 0.3s ease",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(-10px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {children}
        </Box>

        {/* Footer Decoration */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: isActive
              ? "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)",
            transition: "all 0.3s ease",
          }}
        />
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}