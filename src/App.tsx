// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelProvider } from "./context/LevelProvider";

import { Box } from "@mui/material";
import { Home } from "./pages/home/home";
import { Feedback } from "./pages/feedback/feedback";

function App() {
  return (
    <LevelProvider>
      <BrowserRouter>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh",
          bgcolor: "grey.50" 
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </LevelProvider>
  );
}

export default App;