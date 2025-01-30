import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  TextField,
  Typography,
  Divider,
  Tooltip,
  Button,
  useTheme
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';

const FriendListPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'John Carter',
      avatar: 'https://source.unsplash.com/random/800x600?face1'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      avatar: 'https://source.unsplash.com/random/800x600?face2'
    },
    {
      id: 3,
      name: 'Michael Smith',
      avatar: 'https://source.unsplash.com/random/800x600?face3'
    },
  ]);

  const handleRemoveFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'auto',
        '::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5" component="h1" fontWeight={700}>
          Friend List
          <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>
            ({friends.length})
          </Typography>
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            transition: 'all 0.3s ease',
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: 'primary.light' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' }
          }
        }}
        sx={{ mb: 2 }}
      />

      <List sx={{
        width: '100%',
        overflow: 'auto',
        height: 'calc(100vh - 200px)',
        '::-webkit-scrollbar': { display: 'none' },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: theme.shadows[0],
        mt:0,
        '&:hover': {
          boxShadow: theme.shadows[0]
        },
        transition: 'all 0.3s ease'
      }}>
        {filteredFriends.map((friend, index) => (
          <Box key={friend.id}>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    mr: 2,
                    width: 48,
                    height: 48,
                    border: '2px solid',
                    borderColor: 'background.default',
                    boxShadow: theme.shadows[2]
                  }}
                  src={friend.avatar}
                />
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  {friend.name}
                </Typography>
              </Box>

              <Tooltip title="Remove Friend">
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFriend(friend.id)}
                  sx={{
                    color: 'white',
                    bgcolor:'error.light',
                    '&:hover': {
                      color: 'error.main',
                      bgcolor: 'error.light'
                    }
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            {index < filteredFriends.length - 1 && (
              <Divider sx={{ mx: 2, borderColor: 'divider' }} />
            )}
          </Box>
        ))}
      </List>
    </Container>
  );
};

export default FriendListPage;