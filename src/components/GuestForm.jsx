import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

/**
 * Component for creating or editing guest data using MUI.
 */
export default function GuestForm({ initial = null, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initial || { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    reset(initial || { name: "", email: "", phone: "" });
  }, [initial, reset]);

  const submit = (data) => {
    onSubmit && onSubmit(data);

   if (!initial) {
      reset({ name: "", email: "", phone: "" });
    }
  };

  const isEditing = !!initial;

  return (
    <Paper 
      elevation={0} 
      component="form"
      onSubmit={handleSubmit(submit)} 
      sx={{ 
        p: 3, 
        border: isEditing ? '2px solid #4caf50' : '1px solid #e0e0e0', 
        borderRadius: 2,
        backgroundColor: isEditing ? '#e8f5e9' : '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'flex-start',
        marginBottom: 3,
      }}
    >
      
      {/* Input Group: Name */}
      <TextField
        label="Guest Name"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ flex: 1, minWidth: 150 }}
        {...register("name", { required: "Guest name is required" })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />

      {/* Input Group: Email */}
      <TextField
        label="Email Address"
        variant="outlined"
        type="email"
        size="small"
        fullWidth
        sx={{ flex: 1, minWidth: 150 }}
        {...register("email", { 
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />

      {/* Input Group: Phone */}
      <TextField
        label="Phone Number"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ flex: 1, minWidth: 150 }}
        {...register("phone", { required: "Phone number is required" })}
        error={!!errors.phone}
        helperText={errors.phone ? errors.phone.message : ''}
      />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, alignSelf: 'center', minWidth: { xs: '100%', sm: 'auto' } }}>
        <Button
          type="submit"
          variant="contained"
          color={isEditing ? "success" : "primary"}
          startIcon={isEditing ? <Edit /> : <Add />}
          sx={{ minWidth: 120, py: 1 }}
        >
          {isEditing ? "Update Guest" : "Add Guest"}
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