import React, { useState } from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import CommunityChat from '../chat/ChatSection';
import PrivateChat from '../chat/PrivateChat';
import ProfilePage from '../profile/index';         
import MessageRequestsPage from '../friendRequest/index';
import FriendListPage from '../friendList/index';
import SettingsPage from '../settings/index';

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
        return <ProfilePage/>;
      case 'messageRequest':
        return <MessageRequestsPage/>;
      case 'friends':
        return <FriendListPage/>;
      case 'settings':
        return <SettingsPage/>;
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
          m:0,
          overflow:'auto'
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