import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Event as EventIcon } from '@mui/icons-material';

/**
 * A list of bookings table.
 */
const BookingList = React.memo(({ bookings, guests, rooms, onEdit, onDelete }) => {
  const findGuestName = (id) => guests.find((g) => g.id === id)?.name || "Unknown Guest";
  const findRoomNumber = (id) => rooms.find((r) => r.id === id)?.number || "Unknown Room";
  const findRoomType = (id) => rooms.find((r) => r.id === id)?.type || "N/A";

  if (!bookings || bookings.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 6, textAlign: 'center', backgroundColor: '#fff3e0', border: '1px dashed #ffcc80' }}>
        <EventIcon sx={{ fontSize: 40, color: '#ff9800', mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          No bookings have been made yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 700 }} aria-label="booking management table">
        <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Guest</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow
              key={b._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: '#fbe9e7' },
              }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="subtitle1" fontWeight="medium">{findGuestName(b.guestId)}</Typography>
              </TableCell>
              <TableCell>
                <Chip 
                    label={`#${findRoomNumber(b.roomId)}`} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 'bold' }} 
                />
              </TableCell>
              <TableCell>{findRoomType(b.roomId)}</TableCell>
              <TableCell>{b.checkIn}</TableCell>
              <TableCell>{b.checkOut}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(b)}
                    aria-label={`edit booking for room ${findRoomNumber(b.roomId)}`}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(b._id)}
                    aria-label={`delete booking ${b._id}`}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default BookingList;