
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { 
  TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText, Paper 
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

export default function BookingForm({ guests = [], rooms = [], initial = null, onSubmit, onCancel }) {
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      guestId: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
    },
  });

  // When editData (initial) changes, reset the form properly
  useEffect(() => {
    if (initial) {
      reset({
        guestId: initial.guestId || initial.guest?._id || '',
        roomId: initial.roomId || initial.room?._id || '',
        checkIn: initial.checkIn ? initial.checkIn.split('T')[0] : '',
        checkOut: initial.checkOut ? initial.checkOut.split('T')[0] : '',
      });
    } else {
      reset({
        guestId: guests[0]?._id || '',
        roomId: rooms[0]?._id || '',
        checkIn: '',
        checkOut: '',
      });
    }
  }, [initial, reset, guests, rooms]);

  const isEditing = !!initial;
  const getMinDate = () => new Date().toISOString().split('T')[0];

  const submit = (data) => {
    if (isEditing) {
      onSubmit(data); 
    } else {
      onSubmit(data);
      reset();
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(submit)} sx={{ p: 3, mb: 3 }}>
      {/* Guest Select */}
      <FormControl size="small" fullWidth error={!!errors.guestId} sx={{ mb: 2 }}>
        <InputLabel>Select Guest</InputLabel>
        <Controller
          name="guestId"
          control={control}
          rules={{ required: "Guest is required" }}
          render={({ field }) => (
            <Select {...field} label="Select Guest">
              {guests.map((g) => (
                <MenuItem key={g._id} value={g._id}>{g.name}</MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.guestId?.message}</FormHelperText>
      </FormControl>

      {/* Room Select */}
      <FormControl size="small" fullWidth error={!!errors.roomId} sx={{ mb: 2 }}>
        <InputLabel>Select Room</InputLabel>
        <Controller
          name="roomId"
          control={control}
          rules={{ required: "Room is required" }}
          render={({ field }) => (
            <Select {...field} label="Select Room">
              {rooms.map((r) => (
                <MenuItem key={r._id} value={r._id}>
                  {`Room ${r.number} (${r.type} - $${r.price})`}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.roomId?.message}</FormHelperText>
      </FormControl>

      {/* Dates */}
      <TextField
        label="Check-in Date"
        type="date"
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getMinDate() }}
        {...register("checkIn", { required: "Check-in date is required" })}
        error={!!errors.checkIn}
        helperText={errors.checkIn?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Check-out Date"
        type="date"
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getMinDate() }}
        {...register("checkOut", { 
          required: "Check-out date is required",
          validate: (value, formValues) => 
            new Date(value) > new Date(formValues.checkIn) || "Must be after check-in"
        })}
        error={!!errors.checkOut}
        helperText={errors.checkOut?.message}
        sx={{ mb: 3 }}
      />

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color={isEditing ? "error" : "primary"}
          startIcon={isEditing ? <Edit /> : <Add />}
        >
          {isEditing ? "Update Booking" : "Create Booking"}
        </Button>

        {isEditing && (
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        )}
      </Box>
    </Paper>
  );
}
