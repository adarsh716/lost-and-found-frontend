import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        mt: 'auto',
        textAlign: 'center',

      }}
    >

        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Lost & Found. All rights reserved.
        </Typography>
      
    </Box>
  );
};

export default Footer;
