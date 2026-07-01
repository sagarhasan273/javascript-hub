// pages/Feedback.tsx
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Rating,
  Card,
  CardContent,
  Stack,
  Snackbar,
  Alert,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Feedback as FeedbackIcon,
  Send,
  ThumbUp,
  BugReport,
  Lightbulb,
} from "@mui/icons-material";

interface FeedbackItem {
  id: number;
  category: 'general' | 'bug' | 'suggestion' | 'praise';
  message: string;
  rating: number;
  timestamp: Date;
  user?: string;
}

export function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [category, setCategory] = useState<string>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [feedbackList] = useState<FeedbackItem[]>([
    {
      id: 1,
      category: 'praise',
      message: 'This Q&A app is amazing! The level system is very helpful for learning.',
      rating: 5,
      timestamp: new Date(Date.now() - 3600000),
      user: 'John Doe'
    },
    {
      id: 2,
      category: 'suggestion',
      message: 'Would be great to have a dark mode option.',
      rating: 4,
      timestamp: new Date(Date.now() - 7200000),
      user: 'Jane Smith'
    },
    {
      id: 3,
      category: 'bug',
      message: 'The search sometimes doesn\'t show results when typing quickly.',
      rating: 3,
      timestamp: new Date(Date.now() - 86400000),
      user: 'Mike Johnson'
    },
  ]);

  const categories = [
    { value: 'general', label: 'General Feedback', icon: FeedbackIcon },
    { value: 'bug', label: 'Report a Bug', icon: BugReport },
    { value: 'suggestion', label: 'Feature Suggestion', icon: Lightbulb },
    { value: 'praise', label: 'Praise', icon: ThumbUp },
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'bug': return '#ef4444';
      case 'suggestion': return '#f59e0b';
      case 'praise': return '#22c55e';
      default: return '#2563eb';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'bug': return <BugReport fontSize="small" />;
      case 'suggestion': return <Lightbulb fontSize="small" />;
      case 'praise': return <ThumbUp fontSize="small" />;
      default: return <FeedbackIcon fontSize="small" />;
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter your feedback message",
        severity: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would send the feedback to your backend
      console.log({
        message,
        rating,
        category,
        timestamp: new Date(),
      });

      setSnackbar({
        open: true,
        message: "Thank you for your feedback! 🎉",
        severity: "success",
      });
      
      // Reset form
      setMessage("");
      setRating(0);
      setCategory("general");
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to submit feedback. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "grey.50", 
      py: 4,
      display: "flex",
      flexDirection: "column",
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: "grey.800",
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <FeedbackIcon sx={{ color: "#2563eb", fontSize: 40 }} />
            Feedback
          </Typography>
          <Typography variant="body1" color="grey.600">
            We value your feedback! Help us improve the Q&A Builder experience.
          </Typography>
        </Box>

        {/* Feedback Form */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "grey.200",
            mb: 4,
            bgcolor: "white",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "grey.800" }}>
            Submit Feedback
          </Typography>

          <Stack spacing={3}>
            {/* Category Selection */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: "grey.700" }}>
                Category
              </Typography>
              <Stack direction="row" spacing={1} sx={{ gap: 1, flexWrap: "wrap" }}>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.value;
                  return (
                    <Button
                      key={cat.value}
                      variant={isSelected ? "contained" : "outlined"}
                      startIcon={<Icon />}
                      onClick={() => setCategory(cat.value)}
                      sx={{
                        borderRadius: 50,
                        textTransform: "none",
                        ...(isSelected && {
                          bgcolor: getCategoryColor(cat.value),
                          "&:hover": {
                            bgcolor: getCategoryColor(cat.value),
                          },
                        }),
                      }}
                    >
                      {cat.label}
                    </Button>
                  );
                })}
              </Stack>
            </Box>

            {/* Rating */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: "grey.700" }}>
                Rating
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ fontSize: "2rem" }}
              />
            </Box>

            {/* Message */}
            <TextField
              label="Your Feedback"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think... What's working well? What could be improved?"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "grey.50",
                },
              }}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<Send />}
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: "#2563eb",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                },
                "&:disabled": {
                  bgcolor: "grey.300",
                },
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </Stack>
        </Paper>

        {/* Recent Feedback */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "grey.800" }}>
            Recent Feedback
          </Typography>

          <Stack spacing={2}>
            {feedbackList.map((feedback) => (
              <Card
                key={feedback.id}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.200",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: getCategoryColor(feedback.category),
                    boxShadow: `0 4px 12px ${getCategoryColor(feedback.category)}20`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                    <Avatar
                      sx={{
                        bgcolor: `${getCategoryColor(feedback.category)}20`,
                        color: getCategoryColor(feedback.category),
                      }}
                    >
                      {getCategoryIcon(feedback.category)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "grey.800" }}>
                            {feedback.user || "Anonymous"}
                          </Typography>
                          <Rating value={feedback.rating} readOnly size="small" />
                        </Box>
                        <Typography variant="caption" color="grey.500">
                          {new Date(feedback.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="grey.700" sx={{ lineHeight: 1.6 }}>
                        {feedback.message}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}