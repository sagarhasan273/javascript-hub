// components/Navigation.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Home, Feedback, Close, Menu } from "@mui/icons-material";

interface NavigationProps {
  onMenuClick?: () => void;
  questionCount?: number;
}

export function Navigation({ onMenuClick, questionCount = 0 }: NavigationProps) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/feedback", label: "Feedback", icon: <Feedback /> },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          bgcolor: "white",
          color: "grey.800",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          borderBottom: "1px solid",
          borderColor: "grey.200",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 3 } }}>
          {/* Left Section - Menu Button (Mobile) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick || toggleDrawer(true)}
                sx={{
                  borderRadius: 2,
                  color: "grey.600",
                  "&:hover": {
                    bgcolor: "rgba(37, 99, 235, 0.04)",
                  },
                }}
              >
                <Menu fontSize="medium" />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                textDecoration: "none",
                color: "grey.800",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "#2563eb",
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  bgcolor: "#2563eb",
                  color: "white",
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                Q
              </Box>
              Q&A Builder
              {!isMobile && questionCount > 0 && (
                <Badge
                  badgeContent={questionCount}
                  color="primary"
                  sx={{
                    ml: 1,
                    "& .MuiBadge-badge": {
                      bgcolor: "#2563eb",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 20,
                      minWidth: 20,
                    },
                  }}
                />
              )}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  variant={location.pathname === item.path ? "contained" : "text"}
                  startIcon={item.icon}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    ...(location.pathname === item.path && {
                      bgcolor: "#2563eb",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#1d4ed8",
                      },
                    }),
                    ...(location.pathname !== item.path && {
                      color: "grey.600",
                      "&:hover": {
                        bgcolor: "rgba(37, 99, 235, 0.04)",
                        color: "#2563eb",
                      },
                    }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile - Show question count in header */}
          {isMobile && questionCount > 0 && (
            <Badge
              badgeContent={questionCount}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#2563eb",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: 20,
                  minWidth: 20,
                },
              }}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              bgcolor: "white",
              borderRadius: "16px 0 0 16px",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.05)",
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "grey.100",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "grey.800" }}>
              Menu
            </Typography>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "rgba(37, 99, 235, 0.04)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <List sx={{ p: 2 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 2,
                      bgcolor: isActive ? "rgba(37, 99, 235, 0.08)" : "transparent",
                      "&:hover": {
                        bgcolor: isActive ? "rgba(37, 99, 235, 0.12)" : "rgba(37, 99, 235, 0.04)",
                      },
                      ...(isActive && {
                        "& .MuiListItemText-primary": {
                          color: "#2563eb",
                          fontWeight: 600,
                        },
                        "& .MuiListItemIcon-root": {
                          color: "#2563eb",
                        },
                      }),
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: isActive ? "#2563eb" : "grey.500" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#2563eb" : "grey.700",
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                    {isActive && (
                      <Box
                        sx={{
                          width: 4,
                          height: 24,
                          bgcolor: "#2563eb",
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
            
            <Divider sx={{ my: 2 }} />
            
            {/* Close Drawer Button */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  color: "grey.500",
                  "&:hover": {
                    bgcolor: "rgba(37, 99, 235, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "grey.500" }}>
                  <Close />
                </ListItemIcon>
                <ListItemText primary="Close Menu" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
}