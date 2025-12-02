import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const menuItems = [
    { label: "Overview", path: "/" },
    { label: "Rooms", path: "/rooms" },
    { label: "Guests", path: "/guests" },
    { label: "Bookings", path: "/bookings" },
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Vivians Hotel
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              variant={location.pathname === item.path ? "contained" : "text"}
              sx={{
                textTransform: "none",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                bgcolor:
                  location.pathname === item.path ? "black" : "transparent",
                color:
                  location.pathname === item.path ? "white" : "text.primary",
                "&:hover": {
                  bgcolor:
                    location.pathname === item.path ? "black" : "grey.200",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
