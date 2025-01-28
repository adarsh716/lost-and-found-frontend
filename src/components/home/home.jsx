import React, { useState } from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import CommunityChat from './ChatSection';
import PrivateChat from './PrivateChat';
// import Profile from './Profile';         // Create these components
// import MessageRequest from './MessageRequest'; // Create these components
// import Friends from './Friends';         // Create these components
// import Settings from './Settings';       // Create these components

const HomePage = () => {
  const [currentView, setCurrentView] = useState('communityChat');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch(currentView) {
      case 'communityChat':
        return <CommunityChat />;
      case 'privateChat':
        return <PrivateChat /> ;
      case 'profile':
        return ;
      case 'messageRequest':
        return ;
      case 'friends':
        return ;
      case 'settings':
        return ;
      default:
        return <CommunityChat />;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'white',
      minHeight: '100vh',
      height: '100vh', 
      overflow: 'hidden' 
    }}>
      <CssBaseline />

      <Navbar onViewChange={handleViewChange} />
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
          {renderView()}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;