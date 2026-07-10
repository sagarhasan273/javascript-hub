// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelProvider } from "./context/LevelProvider";
import { Navigation } from "./components/Navigation";
import { Box, GlobalStyles } from "@mui/material";
import { Home } from "./pages/home/home";
import { Feedback } from "./pages/feedback/feedback";
import { useState } from "react";
import { questionRegistry } from "./data/registry";

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
        <GlobalStyles
          styles={{
            '*::-webkit-scrollbar': {
              display: 'none',
              width: 0,
              height: 0,
            },
            '*': {
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            },
            'html, body, #root': {
              height: '100%',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
            },
          }}
        />
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          height: "100vh",
          bgcolor: "grey.50",
          overflow: "hidden",
        }}>
          <Navigation 
            onMenuClick={handleMobileSidebarToggle}
            questionCount={questionRegistry.length}
          />
          
          <Box sx={{ 
            display: "flex", 
            flex: 1,
            mt: 0,
            overflow: "hidden",
            position: "relative",
            height: "calc(100vh - 64px)", // Subtract navigation height
          }}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    mobileSidebarOpen={mobileSidebarOpen}
                    onMobileSidebarClose={handleMobileSidebarClose}
                    onMobileSidebarToggle={handleMobileSidebarToggle}
                  />
                } 
              />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </LevelProvider>
  );
}

export default App;