import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Close,
  Login,
  PersonAdd,
} from '@mui/icons-material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useThemeMode } from '../App';

const AuthModal = ({ open, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const handleClose = () => {
    onClose();
    setActiveTab(0); // Reset to login tab when closing
  };

  const handleLoginSuccess = (userData) => {
    onLoginSuccess(userData);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark 
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: isDark ? '#fff' : '#333',
        borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activeTab === 0 ? (
            <>
              <Login sx={{ color: '#00d4ff' }} />
              <Typography variant="h6" sx={{ color: isDark ? '#fff' : '#333', fontWeight: 600 }}>
                Login
              </Typography>
            </>
          ) : (
            <>
              <PersonAdd sx={{ color: '#ff9500' }} />
              <Typography variant="h6" sx={{ color: isDark ? '#fff' : '#333', fontWeight: 600 }}>
                Register
              </Typography>
            </>
          )}
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: isDark ? '#ccc' : '#666',
            '&:hover': {
              color: isDark ? '#fff' : '#333',
              backgroundColor: isDark ? '#333' : '#f0f0f0',
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: isDark ? '#333' : '#e0e0e0' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)} 
            centered
            sx={{ 
              '& .MuiTab-root': { 
                color: isDark ? '#ccc' : '#666',
                fontWeight: 600,
                '&.Mui-selected': { 
                  color: '#00d4ff',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#00d4ff',
              },
            }}
          >
            <Tab 
              label="Login" 
              icon={<Login />} 
              iconPosition="start"
            />
            <Tab 
              label="Register" 
              icon={<PersonAdd />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess} 
              onSwitchTab={() => setActiveTab(1)} 
            />
          )}
          {activeTab === 1 && (
            <RegisterForm 
              onSwitchTab={() => setActiveTab(0)} 
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 