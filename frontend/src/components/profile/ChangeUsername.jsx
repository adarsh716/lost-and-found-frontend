import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';
import { updateUsername } from '../../api/auth';

const ChangeUsernamePage = () => {
  const [newUsername, setNewUsername] = useState('');
  const [displayUsername, setDisplayUsername] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const theme = useTheme();
  const { user, updateUserData } = useAuth(); 

  useEffect(() => {
    setDisplayUsername(user.fullName); 
  }, [user.fullName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUsername(user.userId, newUsername);
      if (response.success) {
        setFeedback({ message: 'Username updated successfully!', type: 'success' });    
        setDisplayUsername(newUsername); 
        updateUserData({ fullName: newUsername });
      } else {
        setFeedback({ message: response.message || 'Failed to update username.', type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: error.message || 'An error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        minHeight: '91.5vh',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <IconButton
          href="/settings"
          sx={{
            color: 'inherit',
            mb: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
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
          boxShadow: 3,
        }}
      >
        <Typography variant="body1" sx={{ mb: 3 }}>
          Current Username: <strong>{displayUsername}</strong> 
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
          }}
          InputLabelProps={{
            sx: {
              color: 'inherit',
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
            },
          }}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          textAlign: 'center',
          color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
        }}
      >
        Username can only be changed once every 30 days
      </Typography>

      <Snackbar
        open={feedback.message !== ''}
        autoHideDuration={6000}
        onClose={() => setFeedback({ message: '', type: '' })}
      >
        <Alert
          onClose={() => setFeedback({ message: '', type: '' })}
          severity={feedback.type}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ChangeUsernamePage;
