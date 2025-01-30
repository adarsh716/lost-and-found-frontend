import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Avatar,
    List,
    ListItem,
    Backdrop,
    Fade,
    TextField,
    IconButton,
    Paper,
    Typography,
    Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ForumIcon from '@mui/icons-material/Forum';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { AccountCircle } from '@mui/icons-material';

const PrivateChat = () => {
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentUser] = useState({ fullName: 'Alice Smith', avatar: 'AS' });

    const [messages, setMessages] = useState([
        {
            id: 1,
            user: 'Adarsh',
            text: 'Anybody affected by coronavirus?',
            timestamp: 'MAR 13:34',
            isCurrentUser: false
        },
        {
            id: 2,
            user: 'Adarsh',
            text: 'At our office 3 ppl are infected. We work from home.',
            timestamp: 'MAR 13:35',
            isCurrentUser: false
        },
        {
            id: 3,
            user: currentUser.fullName,
            text: 'All good here. We wash hands and stay home.',
            timestamp: 'MAR 13:36',
            isCurrentUser: true
        },
    ]);

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.text?.toLowerCase().includes(searchQuery.toLowerCase());
        return searchQuery ? matchesSearch : true;
    });

    useEffect(() => {
        return () => {
            messages.forEach(msg => {
                if (msg.image) URL.revokeObjectURL(msg.image);
            });
        };
    }, [messages]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now(), 
                user: currentUser.fullName,
                text: message,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: true
            };
            setMessages(prev => [...prev, newMessage]);
            setMessage('');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newMessage = {
                id: Date.now(), 
                user: currentUser.fullName,
                image: imageUrl,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: true
            };
            setMessages(prev => [...prev, newMessage]);
            e.target.value = null;
        }
    };

    const StyledMessage = styled(ListItem)(({ theme, iscurrentuser }) => ({
        flexDirection: iscurrentuser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        padding: theme.spacing(1),
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }));

    const MessageBubble = styled(Paper)(({ theme, iscurrentuser }) => ({
        maxWidth: '70%',
        padding: theme.spacing(1.5, 2),
        backgroundColor: iscurrentuser ? '#000' : '#fff',
        color: iscurrentuser ? '#fff' : '#000',
        borderRadius: iscurrentuser ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
        boxShadow: iscurrentuser
            ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
    }));

    return (
        <Container maxWidth={false} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 0,
            bgcolor: 'background.default'
        }}>
            <Box sx={{
                p: 2,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: { sm: 'space-between' },
                borderBottom: '1px solid #ddd',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                    <AccountCircle sx={{ mr: 1, color: 'text.primary',height:30,width:30 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Adarsh Lakhanpal
                    </Typography>
                </Box>

                {/* <TextField
                    variant="outlined"
                    placeholder="Search messages..."
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: { xs: '50%', sm: '240px' },
                        alignSelf: { xs: 'flex-end', sm: 'center' },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            backgroundColor: 'background.paper',
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                                borderWidth: '1px',
                            },
                        },
                    }}
                /> */}
            </Box>

            <List sx={{
                flexGrow: 1,
                overflowY: 'auto',
                bgcolor: 'background.default',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: '#f0f0f0' },
                '&::-webkit-scrollbar-thumb': { background: '#888' }
            }}>
                <Box sx={{ textAlign: 'center', my: 2 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        3 MAR
                    </Typography>
                </Box>

                {filteredMessages.map((msg) => (
                    <StyledMessage key={msg.id} iscurrentuser={msg.isCurrentUser ? 1 : 0}>
                        <MessageBubble iscurrentuser={msg.isCurrentUser ? 1 : 0}>
                            {!msg.isCurrentUser && (
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {msg.user}
                                </Typography>
                            )}
                            {msg.text && <Typography variant="body1">{msg.text}</Typography>}
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Uploaded content"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '40vh',
                                        borderRadius: '12px',
                                        marginTop: msg.text ? '8px' : 0,
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleImageClick(msg.image)}
                                />
                            )}
                        </MessageBubble>
                    </StyledMessage>
                ))}
            </List>

            <Box sx={{
                p: 2,
                bgcolor: '#000',
                boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                bottom: 0,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px 8px 0px 0px'
            }}>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <IconButton
                        sx={{
                            color: '#fff',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                        }}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <AddPhotoAlternateIcon fontSize="medium" />
                    </IconButton>

                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '16px',
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                color: '#fff',
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                                '&.Mui-focused fieldset': { borderColor: '#fff' }
                            }
                        }}
                    />

                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{
                            bgcolor: '#fff',
                            color: '#000',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                bgcolor: '#fff',
                                transform: 'scale(1.15) rotate(-8deg)',
                                boxShadow: '0 0 24px rgba(255,255,255,0.6)'
                            },
                            '&:disabled': {
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                transform: 'scale(0.9)'
                            },
                            p: 1.5,
                            borderRadius: '16px',
                            boxShadow: '0 4px 16px rgba(255,255,255,0.3)'
                        }}
                    >
                        <SendIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Box>
            <Backdrop
                sx={{
                    zIndex: 1300,
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(8px)'
                }}
                open={!!selectedImage}
                onClick={handleCloseImage}
            >
                <Fade in={!!selectedImage} timeout={300}>
                    <Box sx={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        animation: 'scaleUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                color: 'white',
                                background: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                            onClick={handleCloseImage}
                        >
                            <CloseIcon />
                        </IconButton>
                        <img
                            src={selectedImage}
                            alt="Fullscreen content"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                borderRadius: '8px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                            }}
                        />
                    </Box>
                </Fade>
            </Backdrop>

            <style jsx global>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </Container>
    );
};

export default PrivateChat;
