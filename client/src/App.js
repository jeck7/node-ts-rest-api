import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Tabs, Tab, IconButton, Tooltip, Typography } from "@mui/material";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { Language } from "@mui/icons-material";
import { LanguageProvider, useLanguage } from "./LanguageContext";

// Създаваме Material-UI тема
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function AppContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { lang, t, switchLang } = useLanguage();

  // Проверяваме дали потребителят е логнат при зареждане
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab(0); // Връщаме се към логин таба
  };

  // Глобален бутон за език
  const LangSwitcher = (
    <Tooltip title={lang === 'bg' ? t.switchToEn : t.switchToBg}>
      <IconButton color="primary" onClick={switchLang} sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Language />
        <Typography variant="body2" sx={{ ml: 1 }}>{lang === 'bg' ? 'EN' : 'BG'}</Typography>
      </IconButton>
    </Tooltip>
  );

  // Ако потребителят е логнат, показваме Dashboard
  if (isLoggedIn && user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", position: 'relative' }}>
          {LangSwitcher}
          <Dashboard user={user} onLogout={handleLogout} />
        </Box>
      </ThemeProvider>
    );
  }

  // Ако не е логнат, показваме формите за вход/регистрация
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4, position: 'relative' }}>
        {LangSwitcher}
        <Box sx={{ maxWidth: 380, mx: "auto", bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered 
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label={t.login} />
            <Tab label={t.register} />
          </Tabs>
          
          <Box sx={{ p: 2 }}>
            {activeTab === 0 && <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchTab={() => setActiveTab(1)} />}
            {activeTab === 1 && <RegisterForm onSwitchTab={() => setActiveTab(0)} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
