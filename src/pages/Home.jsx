import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Home as HomeIcon, CheckCircleOutline, MeetingRoom, People, Event } from '@mui/icons-material';


export default function Home() {
  return (
    <Box 
      sx={{ 
        padding: { xs: 2, sm: 4 }, 
        maxWidth: 900, 
        margin: '0 auto' 
      }}
    >
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <HomeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ fontWeight: 700, color: '#1a237e' }}
          >
            Welcome to the Hotel Management Dashboard
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7, color: '#424242' }}>
          This application provides a powerful, single-pane interface for managing all core operations of your hotel. 
          It connects directly to the backend API, enabling real-time management of your critical data.
        </Typography>
        
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#388e3c' }}>
          Key Features:
        </Typography>

        <List sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, p: 2 }}>
          <ListItem divider>
            <ListItemIcon>
              <MeetingRoom color="info" />
            </ListItemIcon>
            <ListItemText primary="Room Management" secondary="View and manage room details, including type, number, and pricing." />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <People color="success" />
            </ListItemIcon>
            <ListItemText primary="Guest Details" secondary="Add, update, and maintain a centralized record of all guest information." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Event color="error" />
            </ListItemIcon>
            <ListItemText primary="Booking Control" secondary="Handle new reservations, modify existing bookings, and track check-in/out dates." />
          </ListItem>
        </List>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                <CheckCircleOutline sx={{ verticalAlign: 'middle', mr: 0.5 }} color="action" fontSize="small" />
                All data is connected to a live API for persistent storage.
            </Typography>
        </Box>
      </Paper>
    </Box>
  );
}