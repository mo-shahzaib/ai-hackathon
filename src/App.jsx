import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContentRepurposingPage from "./Pages/ContentRepurposingPage";
import DemoPage from "./Pages/DemoPage";
import SubjectsPage from "./Pages/SubjectsPage";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ mb: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Content Hub
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Programs
          </Button>
          <Button color="inherit" component={Link} to="/demo">
            Demo
          </Button>
          <Button color="inherit" component={Link} to="/content-repurposing">
            AI Repurposing
          </Button>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route
          path="/content-repurposing"
          element={<ContentRepurposingPage />}
        />
      </Routes>
    </Box>
  );
}

export default App;
