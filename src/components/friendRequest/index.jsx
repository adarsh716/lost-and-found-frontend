import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  Tooltip,
  Chip,
  Button
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Search,
  Delete,
  Done,
  Close
} from '@mui/icons-material';

const MessageRequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([
    {
      id: 1,
      sender: 'John Carter',
      message: 'Found a black laptop bag near Central Station',
      item: {
        title: 'Lost Laptop Bag',
        description: 'Black leather bag with silver zippers',
        image: 'https://source.unsplash.com/random/800x600?laptopbag',
        date: '2024-03-15'
      },
      status: 'pending',
      timestamp: '2h ago'
    },
    {
      id: 2,
      sender: 'Emma Wilson',
      message: 'Saw a brown wallet at the coffee shop with your ID',
      item: {
        title: 'Lost Wallet',
        description: 'Brown leather wallet with credit cards',
        image: 'https://source.unsplash.com/random/800x600?wallet',
        date: '2024-03-14'
      },
      status: 'pending',
      timestamp: '1d ago'
    },
  ]);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAccept = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleDecline = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'declined' } : req
    ));
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const filteredRequests = requests.filter(request =>
    request.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'green';
      case 'declined': return 'red';
      default: return 'black';
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      <Box sx={{
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        position: 'sticky',
        top: 0,
        bgcolor: 'background.default',
        zIndex: 1
      }}>
        {isMobile && (
          <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h5" component="h1" fontWeight={700}>
          Message Requests ({requests.length})
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search requests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          sx: {
            borderRadius: 2,
            bgcolor: 'background.paper',
            '& fieldset': { borderColor: 'divider' }
          }
        }}
        sx={{ mb: 4 }}
      />

      <List sx={{
        width: '100%',
        overflow: 'auto',
        height: 'calc(100vh - 200px)',
        '::-webkit-scrollbar': { display: 'none' }
      }}>
        {filteredRequests.map(request => (
          <Paper
            key={request.id}
            elevation={0}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: '0.2s',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="start">
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Avatar sx={{
                  mr: 2,
                  bgcolor: 'text.primary',
                  color: 'background.default',
                  width: 40,
                  height: 40
                }}>
                  {request.sender[0]}
                </Avatar>
                <Box flexGrow={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {request.sender}
                    </Typography>
                    <Chip
                      size="small"
                      label={request.status}
                      icon={request.status === 'accepted' ?
                        <Done fontSize="small" /> :
                        <Close fontSize="small" />}
                      sx={{
                        display: request.status === 'pending' ? 'none' : 'flex',
                        bgcolor: request.status === 'accepted' ?
                          'rgba(46, 125, 50, 0.1)' :
                          'rgba(211, 47, 47, 0.1)',
                        color: request.status === 'accepted' ?
                          'success.dark' : 'error.dark'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {request.timestamp}
                  </Typography>
                </Box>
              </Box>

              {request.status === 'pending' ? (
                <Box display="flex" gap={0.5}>
                  <Tooltip title="Accept">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAccept(request.id)}
                      sx={{
                        minWidth: 0,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: 'rgba(0, 0, 0, 0.1)', // Black shade for background
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.2)' } // Darker black shade on hover
                      }}
                    >
                      <CheckCircle fontSize="small" sx={{ color: 'black' }} />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Decline">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDecline(request.id)}
                      sx={{
                        minWidth: 0,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                        '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.2)' }
                      }}
                    >
                      <Cancel fontSize="small" sx={{ color: 'error.dark' }} />
                    </Button>
                  </Tooltip>
                </Box>
              ) : (
                <IconButton
                  size="small"
                  onClick={() => handleDelete(request.id)}
                  sx={{ color: 'text.secondary' }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>

            <Typography variant="body2" sx={{
              mt: 1.5,
              pl: 6,
              color: 'text.primary'
            }}>
              {request.message}
            </Typography>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default MessageRequestsPage;
