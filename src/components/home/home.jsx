import React from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import CommunityChat from './ChatSection';  // Make sure to import your component

const HomePage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'white',
      minHeight: '100vh',
      height: '100vh', // Ensure full viewport height
      overflow: 'hidden' // Prevent scrolling on parent container
    }}>
      <CssBaseline />

      <Navbar />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', 
          position: 'relative',
          m:0
        }}
      >
        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          m:0
        }}>
          <CommunityChat />  {/* This will now fill remaining space */}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;