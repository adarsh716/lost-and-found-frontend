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

const CommunityChat = () => {
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentUser] = useState({ fullName: 'Alice Smith', avatar: 'AS' });

    const [messages, setMessages] = useState([
        {
            id: 1,
            user: 'System Bot',
            text: 'Anybody affected by coronavirus?',
            timestamp: 'MAR 13:34',
            isCurrentUser: false
        },
        {
            id: 2,
            user: 'John Doe',
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

    useEffect(() => {
        return () => {
            // Revoke object URLs to avoid memory leaks
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
                id: messages.length + 1,
                user: currentUser.fullName,
                text: message,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: true
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newMessage = {
                id: messages.length + 1,
                user: currentUser.fullName,
                image: imageUrl,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: true
            };
            setMessages([...messages, newMessage]);
            e.target.value = null; // Clear file input
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
            ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.3)' // subtle glow
            : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.15)', // slight glow for non-current users
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
                alignItems: 'center',
                borderBottom: '1px solid #ddd'
            }}>
                <ForumIcon sx={{ mr: 1, color: 'text.primary' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Community Chat
                </Typography>
            </Box>

            <List sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'none',
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

                {messages.map((msg) => (
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
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textAlign: 'right',
                                    mt: 0.5,
                                    color: msg.isCurrentUser ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                                }}
                            >
                                {msg.timestamp}
                            </Typography>
                        </MessageBubble>
                    </StyledMessage>
                ))}
            </List>
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

export default CommunityChat;