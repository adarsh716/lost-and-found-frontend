import React from 'react';
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Chip
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Sms,
  Lock,
  HelpOutline,
  Security,
  Edit,
  Password
} from '@mui/icons-material';

const SettingsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, backgroundColor: 'background.paper', borderRadius: 2,overflow:'auto', '::-webkit-scrollbar': { display: 'none' } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Account Settings
      </Typography>

      {/* Account Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountCircle fontSize="medium" /> Profile Information
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem sx={{ py: 1.5, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Username" 
              secondary="current_user123" 
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Chip label="Edit" variant="outlined" size="small" clickable />
          </ListItem>
          
          <ListItem sx={{ py: 1.5, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Email fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Email Address" 
              secondary="user@example.com" 
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Chip label="Change" variant="outlined" size="small" clickable />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Security */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Security fontSize="medium" /> Security
        </Typography>
        <List>
          <ListItem sx={{ py: 1.5, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Password fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Password" />
            <Chip label="Update Password" variant="outlined" size="small" clickable />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Notifications */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* <Notifications fontSize="medium" /> Notifications */}
          Notifications
        </Typography>
        <List>
          <ListItem sx={{ py: 1.5, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Email fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Email Notifications" secondary="Receive important updates via email" />
            <Chip label="Enabled" color="success" size="small" />
          </ListItem>
          <ListItem sx={{ py: 1.5, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Sms fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="SMS Notifications" secondary="Get SMS alerts for critical activities" />
            <Chip label="Disabled" color="default" size="small" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Support */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HelpOutline fontSize="medium" /> Support
        </Typography>
        <Link href="mailto:support@example.com" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
          <Email fontSize="small" />
          Contact Support Team
        </Link>
      </Box>
    </Container>
  );
};

export default SettingsPage;