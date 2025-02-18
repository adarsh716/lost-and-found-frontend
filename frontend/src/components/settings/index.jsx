import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  AccountCircle,
  Edit,
  ChevronRight,
  Password,
  Security,
  Block,
  Lock
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [username, setUsername] = useState(user.fullName);  

  useEffect(() => {
    setUsername(user.fullName);  
  }, [user.fullName]); 

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 2, mb: 2 }}>
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        borderRadius: 2, 
        boxShadow: 1,
        p: 3,
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          mb: 4, 
          fontWeight: 700,
          color: 'text.primary'
        }}>
          Account Settings
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 600,
            color: 'black'
          }}>
            <AccountCircle fontSize="medium" />
            Profile Information
          </Typography>
          <List>
            <ListItem 
              sx={{
                py: 1.5,
                px: 2,
                '&:hover': { backgroundColor: 'action.hover' },
                borderRadius: 1,
                transition: 'background-color 0.2s'
              }}
              secondaryAction={
                <IconButton edge="end" size="small">
                  <ChevronRight />
                </IconButton>
              }
              onClick={()=> navigate('/change-username')}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Username"
                secondary={username}  
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 600,
            color: 'black'
          }}>
            <Security fontSize="medium" />
            Security
          </Typography>
          <List>
            <ListItem 
              sx={{
                py: 1.5,
                px: 2,
                '&:hover': { backgroundColor: 'action.hover' },
                borderRadius: 1,
                transition: 'background-color 0.2s'
              }}
              secondaryAction={
                <IconButton edge="end" size="small">
                  <ChevronRight />
                </IconButton>
              }
              onClick={()=> navigate('/change-password')}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Password fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Password" 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 600,
            color: 'black'
          }}>
            <Block fontSize="medium" />
            Account
          </Typography>
          <List>
            <ListItem 
              sx={{
                py: 1.5,
                px: 2,
                '&:hover': { backgroundColor: 'action.hover' },
                borderRadius: 1,
                transition: 'background-color 0.2s'
              }}
              secondaryAction={
                <IconButton edge="end" size="small">
                  <ChevronRight />
                </IconButton>
              }
              onClick={()=> navigate('/blocked-accounts')}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Blocked Accounts" 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <List>
          <ListItem 
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': { backgroundColor: 'action.hover' },
              borderRadius: 1,
              transition: 'background-color 0.2s',
              color: 'error.main'
            }}
            secondaryAction={
              <IconButton edge="end" size="small" color="error">
                <ChevronRight />
              </IconButton>
            }
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <Lock fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default SettingsPage;
