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

const ChangeUsernamePage = () => {
  const [newUsername, setNewUsername] = useState('');
  const theme = useTheme();
  const currentUsername = "current_user123"; // Replace with actual username from state/context

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your username change logic here
    console.log('New username:', newUsername);
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
          Change Username
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
        <Typography variant="body1" sx={{ mb: 3 }}>
          Current Username: <strong>{currentUsername}</strong>
        </Typography>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <TextField
          fullWidth
          label="New Username"
          variant="outlined"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
          sx={{
            mb: 3,
            // '& .MuiOutlinedInput-root': {
            //   color: 'inherit',
            //   '& fieldset': {
            //     borderColor: 'rgba(255, 255, 255, 0.23)'
            //   },
            //   '&:hover fieldset': {
            //     borderColor: 'rgba(255, 255, 255, 0.5)'
            //   },
            //   '&.Mui-focused fieldset': {
            //     borderColor: 'rgba(255, 255, 255, 0.8)'
            //   }
            // }
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
          sx={{
            py: 1.5,
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
            }
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Typography variant="body2" sx={{ 
        mt: 3,
        textAlign: 'center',
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
      }}>
        Username can only be changed once every 30 days
      </Typography>
    </Container>
  );
};

export default ChangeUsernamePage;