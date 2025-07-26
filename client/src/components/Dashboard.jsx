import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Logout, Person, Email, AdminPanelSettings, Edit, Settings, Lock } from "@mui/icons-material";
import { useLanguage } from "../LanguageContext";

export default function Dashboard({ user, onLogout }) {
  const [userInfo, setUserInfo] = useState(user);
  const [tab, setTab] = useState(0);
  const [editProfile, setEditProfile] = useState({ name: userInfo?.name || '', email: userInfo?.email || '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const { t } = useLanguage();

  useEffect(() => {
    setUserInfo(user);
    setEditProfile({ name: user?.name || '', email: user?.email || '' });
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Dummy handlers for forms
  const handleProfileChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert(t.profileUpdated);
  };
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert(t.passwordChanged);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary">
            {t.welcome}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            {t.logout}
          </Button>
        </Box>

        {/* User Info Card */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  <Person fontSize="large" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {userInfo?.name || t.user}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <Email sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                  {userInfo?.email}
                </Typography>
                <Chip
                  icon={userInfo?.role === 'admin' ? <AdminPanelSettings /> : <Person />}
                  label={userInfo?.role === 'admin' ? t.admin : t.user}
                  color={userInfo?.role === 'admin' ? 'error' : 'primary'}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Tabs and Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tab} onChange={handleTabChange} aria-label="dashboard tabs">
                <Tab icon={<Edit />} label={t.editProfile} />
                <Tab icon={<Lock />} label={t.changePassword} />
                <Tab icon={<Settings />} label={t.settings} />
              </Tabs>
            </Box>
            {/* Tab Content */}
            {tab === 0 && (
              <Box component="form" onSubmit={handleProfileSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  label={t.name}
                  value={editProfile.name}
                  onChange={handleProfileChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  name="email"
                  type="email"
                  label={t.email}
                  value={editProfile.email}
                  onChange={handleProfileChange}
                  required
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {t.saveChanges}
                </Button>
              </Box>
            )}
            {tab === 1 && (
              <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="oldPassword"
                  type="password"
                  label={t.oldPassword}
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  name="newPassword"
                  type="password"
                  label={t.newPassword}
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {t.changePasswordBtn}
                </Button>
              </Box>
            )}
            {tab === 2 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {t.settingsTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.settingsDesc}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Welcome Message */}
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            {t.hello} {userInfo?.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t.loggedIn}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 