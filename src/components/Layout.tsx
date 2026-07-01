// components/Layout.tsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function Layout() {

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Outlet />
    </Box>
  );
}