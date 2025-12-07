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
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        
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
      </Container>
    </BrowserRouter>
  );
}