import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar
      position="sticky"
      sx={{
       backgroundColor: "#192a56",
       boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ 
            flexGrow: 1, 
            fontWeight: "900",
            letterSpacing: 1,
          }}
        >
          Hotel Manager
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/" 
            sx={{ mx: 1, padding: '8px 16px', fontWeight: 'bold' }} 
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/rooms" 
            sx={{ mx: 1, padding: '8px 16px', fontWeight: 'bold' }}
          >
            Rooms
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/guests" 
            sx={{ mx: 1, padding: '8px 16px', fontWeight: 'bold' }}
          >
            Guests
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/bookings" 
            sx={{ mx: 1, padding: '8px 16px', fontWeight: 'bold' }}
          >
            Bookings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}