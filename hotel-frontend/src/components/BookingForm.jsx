import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
    TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText, Paper,
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

/**
 * Component for creating or editing booking data, styled with MUI.
 */
export default function BookingForm({ guests = [], rooms = [], initial = null, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initial || { 
        guestId: guests[0]?._id || '', 
        roomId: rooms[0]?._id || '', 
        checkIn: '', 
        checkOut: '' 
    },
  });

  useEffect(() => {
    reset(initial || { 
        guestId: guests[0]?._id || '', 
        roomId: rooms[0]?._id || '', 
        checkIn: '', 
        checkOut: '' 
    });
  }, [initial, reset, guests, rooms]);

  const submit = (data) => {
    onSubmit && onSubmit(data);

    if (!initial) {
      reset({ 
          guestId: guests[0]?._id || '', 
          roomId: rooms[0]?._id || '', 
          checkIn: '', 
          checkOut: '' 
      });
    }
  };

  const isEditing = !!initial;

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Paper 
      elevation={0} 
      component="form"
      onSubmit={handleSubmit(submit)} 
      sx={{ 
        p: 3, 
        border: isEditing ? '2px solid #e53935' : '1px solid #e0e0e0', 
        borderRadius: 2,
        backgroundColor: isEditing ? '#fbe9e7' : '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'flex-start',
      }}
    >
      
      {/* Select Group: Guest */}
      <FormControl 
        variant="outlined" 
        size="small" 
        fullWidth 
        sx={{ flex: 1, minWidth: 180 }}
        error={!!errors.guestId}
        disabled={guests.length === 0}
      >
        <InputLabel id="guest-select-label">Select Guest</InputLabel>
        <Select
          labelId="guest-select-label"
          label="Select Guest"
          defaultValue={initial?.guestId || guests[0]?._id || ''}
          {...register("guestId", { required: "Guest is required" })}
        >
          {guests.map(g => (
            <MenuItem key={g._id} value={g._id}>{g.name}</MenuItem>
          ))}
        </Select>
        {errors.guestId && <FormHelperText>{errors.guestId.message}</FormHelperText>}
        {guests.length === 0 && <FormHelperText error>No guests registered. Register a guest first.</FormHelperText>}
      </FormControl>

      {/* Select Group: Room */}
      <FormControl 
        variant="outlined" 
        size="small" 
        fullWidth 
        sx={{ flex: 1, minWidth: 180 }}
        error={!!errors.roomId}
        disabled={rooms.length === 0}
      >
        <InputLabel id="room-select-label">Select Room</InputLabel>
        <Select
          labelId="room-select-label"
          label="Select Room"
          defaultValue={initial?.roomId || rooms[0]?._id || ''}
          {...register("roomId", { required: "Room is required" })}
        >
          {rooms.map(r => (
            <MenuItem key={r._id} value={r._id}>
              {`Room ${r.number} (${r.type} - $${r.price})`}
            </MenuItem>
          ))}
        </Select>
        {errors.roomId && <FormHelperText>{errors.roomId.message}</FormHelperText>}
        {rooms.length === 0 && <FormHelperText error>No rooms available. Add a room first.</FormHelperText>}
      </FormControl>

      {/* Input Group: Check-in */}
      <TextField
        label="Check-in Date"
        variant="outlined"
        type="date"
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getMinDate() }}
        sx={{ flex: 1, minWidth: 150 }}
        {...register("checkIn", { required: "Check-in date is required" })}
        error={!!errors.checkIn}
        helperText={errors.checkIn ? errors.checkIn.message : ''}
      />

      {/* Input Group: Check-out */}
      <TextField
        label="Check-out Date"
        variant="outlined"
        type="date"
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getMinDate() }}
        sx={{ flex: 1, minWidth: 150 }}
        {...register("checkOut", { 
            required: "Check-out date is required",
            validate: (value) => {
                const checkInDate = new Date(document.querySelector('input[name="checkIn"]').value);
                const checkOutDate = new Date(value);
                return checkOutDate > checkInDate || "Check-out date must be after check-in date";
            },
        })}
        error={!!errors.checkOut}
        helperText={errors.checkOut ? errors.checkOut.message : ''}
      />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, alignSelf: 'center', minWidth: { xs: '100%', sm: 'auto' } }}>
        <Button
          type="submit"
          variant="contained"
          color={isEditing ? "error" : "primary"}
          startIcon={isEditing ? <Edit /> : <Add />}
          sx={{ minWidth: 120, py: 1 }}
          disabled={guests.length === 0 || rooms.length === 0}
        >
          {isEditing ? "Update Booking" : "Create Booking"}
        </Button>
        
        {isEditing && (
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onCancel}
            sx={{ minWidth: 100, py: 1 }}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
}