import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Container, Box, Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import RoomsPage from "./pages/RoomsPage";
import GuestsPage from "./pages/GuestsPage";
import BookingsPage from "./pages/BookingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      {/* Main content area */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Paper
          elevation={4} 
          sx={{
            borderRadius: 2,
            p: { xs: 3, sm: 5 },
            backgroundColor: "#f4f6f8",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)", 
            minHeight: "75vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/guests" element={<GuestsPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
            </Routes>
          </Box>
        </Paper>
      </Container>
    </BrowserRouter>
  );
}