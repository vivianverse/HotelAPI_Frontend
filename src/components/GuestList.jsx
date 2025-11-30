import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Group as GuestIcon } from '@mui/icons-material';

/**
 * A list of guests table.
 */
const GuestList = React.memo(({ guests, onEdit, onDelete }) => {
  if (!guests || guests.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 6, textAlign: 'center', backgroundColor: '#f0f4f8', border: '1px dashed #bdbdbd' }}>
        <GuestIcon sx={{ fontSize: 40, color: '#90a4ae', mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          No guests have been registered yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="guest management table">
        <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guests.map((g) => (
            <TableRow
              key={g._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: '#e8f5e9' },
              }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="subtitle1" fontWeight="medium">{g.name}</Typography>
              </TableCell>
              <TableCell>{g.email}</TableCell>
              <TableCell>{g.phone}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(g)}
                    aria-label={`edit guest ${g.name}`}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(g._id)}
                    aria-label={`delete guest ${g.name}`}
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

export default GuestList;