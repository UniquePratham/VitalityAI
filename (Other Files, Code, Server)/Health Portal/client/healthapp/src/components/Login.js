import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Paper } from '@mui/material';

const Login = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'doctor') {
      navigate('/dashboard/doctor');
    } else if (role === 'patient') {
      navigate('/dashboard/patient');
    } else if (role === 'ambulance') {
      navigate('/dashboard/ambulance');
    } else {
      alert('Please select a role');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Select Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Select Role"
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="ambulance">Ambulance</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
