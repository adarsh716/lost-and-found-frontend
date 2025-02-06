import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePasswordPage = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password change logic here
    console.log('Password change request:', passwords);
  };

  const handleInputChange = (field) => (e) => {
    setPasswords({ ...passwords, [field]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      minHeight: '91.5dvhvh',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : '#fff',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    }}>
      <Box sx={{ mb: 4 }}>
        <IconButton 
          href="/settings" 
          sx={{ 
            color: 'inherit',
            mb: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Change Password
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: '600px',
          mx: 'auto',
          p: 4,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <TextField
          fullWidth
          label="Current Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={passwords.current}
          onChange={handleInputChange('current')}
          required
          sx={{
            mb: 3,
            
          }}
          InputLabelProps={{
            sx: {
              color: 'inherit'
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                sx={{ color: 'inherit' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          }}
        />

        <TextField
          fullWidth
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={passwords.new}
          onChange={handleInputChange('new')}
          required
          sx={{
            mb: 3,
          }}
          InputLabelProps={{
            sx: {
              color: 'inherit'
            }
          }}
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={passwords.confirm}
          onChange={handleInputChange('confirm')}
          required
          sx={{
            mb: 3,
          }}
          InputLabelProps={{
            sx: {
              color: 'inherit'
            }
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<Lock />}
          sx={{
            py: 1.5,
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
            }
          }}
        >
          Update Password
        </Button>
      </Box>

      <Typography variant="body2" sx={{ 
        mt: 3,
        textAlign: 'center',
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
      }}>
        Password must be at least 8 characters with uppercase, lowercase, and special characters
      </Typography>
    </Container>
  );
};

export default ChangePasswordPage;