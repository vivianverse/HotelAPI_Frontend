import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Avatar, Tooltip, Chip, Fade
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GuestIcon,
} from '@mui/icons-material';


const GuestList = React.memo(({ guests, onEdit, onDelete }) => {
  if (!guests || guests.length === 0) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f0f4f8 0%, #e3f2fd 100%)',
          borderRadius: 3,
          border: '1px dashed #b0bec5',
        }}
      >
        <GuestIcon sx={{ fontSize: 48, color: '#90a4ae', mb: 2 }} />
        <Typography variant="h6" color="text.primary" gutterBottom>
          No Guests Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add a new guest to get started managing bookings.
        </Typography>
      </Paper>
    );
  }

  return (
    <Fade in timeout={500}>
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="guest management table">
          <TableHead
            sx={{
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            }}
          >
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Guest</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {guests.map((g, index) => (
              <TableRow
                key={g._id || index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s ease',
                  '&:hover': { backgroundColor: '#f1f8e9' },
                }}
              >
                {/* Guest Name with Avatar */}
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#42a5f5',
                        color: '#fff',
                        width: 36,
                        height: 36,
                        fontSize: '0.9rem',
                      }}
                    >
                      {g.name?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {g.name}
                      </Typography>
                      <Chip
                        label="Active"
                        size="small"
                        color="success"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {g.email || '—'}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {g.phone || '—'}
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Edit Guest" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(g)}
                        aria-label={`edit guest ${g.name}`}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Guest" arrow>
                      <IconButton
                        color="error"
                        onClick={() => onDelete(g._id)}
                        aria-label={`delete guest ${g.name}`}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fade>
  );
});

export default GuestList;
