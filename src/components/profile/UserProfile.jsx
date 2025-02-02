import React, { useState } from 'react';
import {
  Container,
  Avatar,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  keyframes,
  useTheme
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/system';

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.6; }
`;

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  animation: `${pulse} 3s ease-in-out infinite`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)'
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #000 30%, #333 90%)',
  color: '#fff',
  border: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  }
}));

const UserProfilePage = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const friendsCount = 428; 

  const handleFriendToggle = () => {
    setIsFriend(!isFriend);
  };

  const handleBlockClick = () => {
    setOpenBlockDialog(true);
  };

  const handleBlockConfirm = () => {
    setOpenBlockDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ 
        border: '2px solid #000',
        borderRadius: '20px',
        p: 4,
        mb: 4,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}><Box sx={{ 
        textAlign: 'center', 
        mb: 4,
        position: 'relative',
        pt: 15 
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0, 
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: '2px dashed #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff' // Add background to cover content
        }}>
          <AnimatedAvatar sx={{ 
            width: 120, 
            height: 120, 
            fontSize: '3rem',
            bgcolor: 'linear-gradient(45deg, #000 30%, #333 90%)',
            color: '#fff',
            mx: 'auto',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}>
            JD
          </AnimatedAvatar>
        </Box>
        
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 900,
          letterSpacing: '-1.5px',
          mt: 6, // Increased margin-top
          background: '-webkit-linear-gradient(#000, #333)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          John Doe
        </Typography>
          
          <Typography variant="h6" sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
            color: '#666',
            fontWeight: 500
          }}>
            <PeopleIcon fontSize="medium" sx={{ color: '#000' }} />
            {friendsCount.toLocaleString()} Connections
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            '& > *': {
              minWidth: '180px'
            }
          }}>
            <GradientButton
              variant={isFriend ? "contained" : "outlined"}
              startIcon={isFriend ? <CheckIcon /> : <PersonAddIcon />}
              onClick={handleFriendToggle}
              sx={{
                borderRadius: '15px',
                ...(isFriend && {
                  background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #45a049 30%, #3d8b40 90%)'
                  }
                })
              }}
            >
              {isFriend ? 'Connected' : 'Connect Now'}
            </GradientButton>

            <Button
              variant="outlined"
              color="error"
              startIcon={<BlockIcon />}
              onClick={handleBlockClick}
              sx={{
                borderRadius: '15px',
                borderWidth: 2,
                px: 4,
                fontWeight: 700,
                '&:hover': {
                  borderWidth: 2,
                  background: 'rgba(255,0,0,0.05)'
                }
              }}
            >
              Block
            </Button>
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
        PaperProps={{ 
          sx: { 
            borderRadius: '20px',
            border: '2px solid #000',
            background: '#fff',
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
          } 
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 900,
          fontSize: '1.5rem',
          background: '-webkit-linear-gradient(#000, #333)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Confirm Block
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ textAlign: 'center', py: 2 }}>
            Are you sure you want to block <strong>John Doe</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenBlockDialog(false)}
            variant="outlined"
            sx={{ 
              borderRadius: '15px',
              borderWidth: 2,
              px: 4,
              fontWeight: 700,
              '&:hover': { 
                borderWidth: 2,
                background: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBlockConfirm}
            variant="contained"
            color="error"
            sx={{ 
              borderRadius: '15px',
              px: 4,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ff0000 30%, #cc0000 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #cc0000 30%, #990000 90%)'
              }
            }}
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfilePage;