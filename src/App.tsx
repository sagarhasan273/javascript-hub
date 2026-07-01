// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelProvider } from "./context/LevelProvider";
import { Navigation } from "./components/Navigation";
import { Box } from "@mui/material";
import { Home } from "./pages/home/home";
import { Feedback } from "./pages/feedback/feedback";
import { useState } from "react";

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleMobileSidebarToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <LevelProvider>
      <BrowserRouter>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh",
          height: "100vh",
          maxHeight: "100vh",
          bgcolor: "grey.50",
          overflow: "hidden",
          // Hide scrollbar for Firefox
          scrollbarWidth: "none",
          // Hide scrollbar for IE/Edge
          msOverflowStyle: "none",
          // Hide scrollbar for Chrome/Safari/Opera
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
        }}>
          {/* Navigation - outside Routes so it appears on all pages */}
          <Navigation onMenuClick={handleMobileSidebarToggle}
            questionCount={0} // You can pass the actual count if needed
             />
          
          {/* Content */}
          <Box sx={{ 
            display: "flex", 
            flex: 1,
            mt: 0,
            overflow: "hidden",
            // Hide scrollbar for Firefox
            scrollbarWidth: "none",
            // Hide scrollbar for IE/Edge
            msOverflowStyle: "none",
            // Hide scrollbar for Chrome/Safari/Opera
            "&::-webkit-scrollbar": {
              display: "none",
              width: 0,
            },
          }}>
            <Routes>
              <Route path="/" element={<Home mobileSidebarOpen={mobileSidebarOpen}
                    onMobileSidebarClose={handleMobileSidebarClose}
                    onMobileSidebarToggle={handleMobileSidebarToggle} />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </LevelProvider>
  );
}

export default App;