import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Link, Snackbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { verifyOtp } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const navigate=useNavigate()
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const { email } = location.state || {};

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const responseData = await verifyOtp(email, data.otp); 
      setSuccess('OTP Verified successfully!');
      navigate('/login')
    } catch (error) {
      console.error('Verification failed:', error);
      setError('OTP Verification failed.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(null);
    setError(null);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #000000, #333333)',
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          width: { xs: '90%', sm: 500 },
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
            OTP Verification
          </Typography>

          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: '#333', mb: { xs: 3, sm: 4 }, fontSize: { xs: '1rem', sm: '1.2rem' } }}
          >
            Enter the OTP sent to your email
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              '& .MuiTextField-root': { marginBottom: 2 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              label="Enter OTP"
              type="text"
              variant="outlined"
              fullWidth
              required
              {...register('otp', { required: 'OTP is required' })}
              error={!!errors.otp}
              helperText={errors.otp ? errors.otp.message : ''}
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

            <Button
              type="submit"
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
              Verify OTP
            </Button>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Didn't receive an OTP?{' '}
              <Link href="#" underline="none" sx={{ color: '#000', fontWeight: 'bold' }}>
                Resend OTP
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={success || error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={success || error}
        severity={success ? 'success' : 'error'}
      />
    </Grid>
  );
};

export default OTPPage;
