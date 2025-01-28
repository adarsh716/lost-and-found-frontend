import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #333333)',
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          width: { xs: '90%', sm: 450 }, 
          padding: { xs: 2, sm: 3 },
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem' }, 
              background: 'linear-gradient(45deg, #000000, #434343)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Lost & Found Portal
          </Typography>

          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: '#333', mb: { xs: 3, sm: 4 }, fontSize: { xs: '1rem', sm: '1.2rem' } }}
          >
            Login to track or report lost items!
          </Typography>

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { marginBottom: 2 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                },
                '& .MuiInputLabel-root': {
                  color: '#555',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000',
                },
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                },
                '& .MuiInputLabel-root': {
                  color: '#555',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                padding: '10px 0',
                fontSize: { xs: '14px', sm: '16px' }, 
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '30px',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Login
            </Button>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              New to Lost & Found?{' '}
              <Link href="/register" underline="none" sx={{ color: '#000', fontWeight: 'bold' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
