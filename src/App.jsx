import { Typography } from "@mui/material";
import { Route, Routes } from "react-router";

function HomePage() {
  return (
    <Typography variant="h3" color="secondary" align="center" mt={5}>
      Home Page
    </Typography>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
