import React from 'react';
import { 
  Grid,
  Typography,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Group,
  Edit,
  Chat,
  Schedule
} from '@mui/icons-material';

const CommunityProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper elevation={isMobile ? 0 : 3} sx={{ 
      maxWidth: 1400, 
      minWidth: {xs:'auto',md:1000}, 
      margin: 'auto', 
      p: 4,
      backgroundColor: theme.palette.background.default,
      overflow:'auto',
      justifyContent:'center',
      mt:{xs:0,md:6}
    }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="User Avatar"
              src="https://via.placeholder.com/150"
              sx={{ 
                width: 150, 
                height: 150, 
                mb: 2,
                border: '2px solid',
                borderColor: 'common.black'
              }}
            />
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary', textAlign: 'center' }}>
              Community Connect
            </Typography>
            
            <Box sx={{ 
              width: '100%', 
              p: 2, 
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              my: 2,
              textAlign: 'center'
            }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Group sx={{ color: 'common.black', fontSize: 30 }} />
                  <Typography variant="h5" sx={{ color: 'common.black', mt: 1 }}>
                    1.8k Friends
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Chat />}
                fullWidth
                sx={{ 
                  backgroundColor: 'common.black',
                  color: 'common.white',
                  '&:hover': { backgroundColor: 'grey.800' }
                }}
              >
                Community Chat
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                sx={{ 
                  borderColor: 'common.black',
                  color: 'common.black',
                  '&:hover': { borderColor: 'grey.800' }
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
              Contact Information
            </Typography>
            <Divider sx={{ bgcolor: 'common.black', mb: 3 }} />
            
            <List dense sx={{ width: '100%' }}>
              <ListItem>
                <ListItemIcon>
                  <Email sx={{ color: 'common.black' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Email Address"
                  secondary="connect@communityhelp.org"
                  sx={{ color: 'text.secondary' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Phone sx={{ color: 'common.black' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="24/7 Helpline"
                  secondary="+1 (555) 987-6543"
                  sx={{ color: 'text.secondary' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <LocationOn sx={{ color: 'common.black' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Main Office"
                  secondary="123 Help Street, Community Plaza, NY"
                  sx={{ color: 'text.secondary' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Schedule sx={{ color: 'common.black' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Working Hours"
                  secondary="Monday-Saturday: 8 AM - 8 PM EST"
                  sx={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ 
            p: 3,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1
          }}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
              Community Guidelines
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              • Be respectful to all members
              <br />
              • Verify items before claiming
              <br />
              • Report suspicious activity immediately
              <br />
              • Keep personal information private
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommunityProfile;