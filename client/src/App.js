import React, { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, IconButton, Tooltip, Typography, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { Language, Brightness4, Brightness7, Login, Logout, Dashboard as DashboardIcon } from "@mui/icons-material";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { watchTheme } from "./theme/watchTheme";
import TechDashboard from "./components/TechDashboard";

// Theme context
const ThemeModeContext = createContext({ mode: "light", toggleTheme: () => {} });
export function useThemeMode() {
  return useContext(ThemeModeContext);
}

function AppContent({ themeMode, toggleTheme }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { lang, t, switchLang } = useLanguage();
  // Use watch theme for TechDashboard, default theme for regular Dashboard
  const theme = themeMode === 'dark' ? watchTheme : createTheme({
    palette: {
      mode: themeMode,
      primary: { main: "#1976d2" },
      secondary: { main: "#dc004e" },
    },
  });
  
  // Проверяваме дали потребителят е логнат при зареждане
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setActiveTab(0); // Връщаме се към логин таба
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleDashboardOpen = () => {
    setShowDashboard(true);
    handleUserMenuClose();
  };

  const handleDashboardClose = () => {
    setShowDashboard(false);
  };

  const { mode } = useThemeMode(); // само за достъп до mode



  // Global header бутони позиционирани най-отгоре вдясно
  const GlobalHeaderButtons = (
    <Box sx={{ 
      position: 'fixed', 
      top: 16, 
      right: 16, 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1, 
      zIndex: 2000,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      backgroundColor: 'transparent'
    }}>
      {/* Language Switch */}
      <Tooltip title={lang === 'bg' ? t.switchToEn : t.switchToBg}>
        <IconButton color="primary" onClick={switchLang}>
          <Language />
          <Typography variant="body2" sx={{ ml: 1 }}>{lang === 'bg' ? 'EN' : 'BG'}</Typography>
        </IconButton>
      </Tooltip>
      
      {/* Theme Switch */}
      <Tooltip title={mode === 'dark' ? t.lightMode : t.darkMode}>
        <IconButton color="primary" onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
      
      {/* Auth Button */}
      {!isLoggedIn || !user ? (
        <Tooltip title="Login">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('openAuthModal'));
            }}
            startIcon={<Login />}
            sx={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff9500 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #00d4ff 0%, #ff9500 100%)',
                transform: 'scale(1.05)',
              },
            }}
          >
            Login
          </Button>
        </Tooltip>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="User Menu">
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{
                color: '#00d4ff',
                '&:hover': {
                  backgroundColor: '#00d4ff20',
                },
              }}
            >
              <Avatar 
                src={user.avatarUrl} 
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                border: '1px solid #333',
                '& .MuiMenuItem-root': {
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleDashboardOpen}>
              <DashboardIcon sx={{ mr: 2, color: '#00d4ff' }} />
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 2, color: '#ff6b6b' }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );

    // Винаги показваме TechDashboard, независимо дали е логнат или не
  return (
    <ThemeModeContext.Provider value={{ mode: themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 0, 
          zIndex: 1999,
          backgroundColor: 'transparent',
          pointerEvents: 'none'
        }} />
        {GlobalHeaderButtons}
        <Box sx={{ 
          minHeight: "100vh", 
          bgcolor: theme.palette.background.default, 
          py: 4, 
          position: 'relative',
          marginTop: 0,
          paddingTop: 0
        }}>
          <TechDashboard
            user={user}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onUserUpdate={handleUserUpdate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showDashboard={showDashboard}
            onDashboardClose={handleDashboardClose}
          />
        </Box>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = React.useState(() => localStorage.getItem('themeMode') || 'light');
  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  // Глобални стилове за премахване на бели ленти
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      html {
        margin: 0 !important;
        padding: 0 !important;
      }
      #root {
        margin: 0 !important;
        padding: 0 !important;
      }
      .MuiCssBaseline-root {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <LanguageProvider>
      <ThemeModeContext.Provider value={{ mode: themeMode, toggleTheme }}>
        <AppContent themeMode={themeMode} toggleTheme={toggleTheme} />
      </ThemeModeContext.Provider>
    </LanguageProvider>
  );
}
