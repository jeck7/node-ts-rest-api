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
  Alert,
} from "@mui/material";
import { Logout, Person, Email, AdminPanelSettings, Edit, Settings, Lock, Brightness4, Brightness7, PhotoCamera, Storage, Delete } from "@mui/icons-material";
import { useLanguage } from "../LanguageContext";
import { useThemeMode } from "../App";
import { useTheme } from "@mui/material/styles";

export default function Dashboard({ user, onLogout, onUserUpdate }) {
  const [userInfo, setUserInfo] = useState(user);
  const [tab, setTab] = useState(0);
  const [editProfile, setEditProfile] = useState({ name: userInfo?.name || '', email: userInfo?.email || '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileSeverity, setProfileSeverity] = useState("success");
  const [avatarPreview, setAvatarPreview] = useState(userInfo?.avatarUrl || "");
  const [avatarMsg, setAvatarMsg] = useState("");
  const [adminStats, setAdminStats] = useState(null);
  const [adminMsg, setAdminMsg] = useState("");
  const [adminSeverity, setAdminSeverity] = useState("info");
  const { t } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

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
    setProfileMsg("");
  };

  // Dummy handlers for forms
  const handleProfileChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5002/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: editProfile.name, email: editProfile.email })
      });
      const data = await res.json();
      if (res.ok) {
        setUserInfo(data);
        localStorage.setItem('user', JSON.stringify(data));
        onUserUpdate(data); // Обновяваме и App.js state-а
        setProfileMsg(t.profileUpdated);
        setProfileSeverity("success");
      } else {
        setProfileMsg(data.message || t.registrationError);
        setProfileSeverity("error");
      }
    } catch (err) {
      setProfileMsg(t.networkError);
      setProfileSeverity("error");
    }
  };
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert(t.passwordChanged);
  };

  // Avatar upload handler
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarMsg("");
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    // Upload
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await fetch("http://localhost:5002/users/me/avatar", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.avatarUrl) {
        setAvatarPreview(data.avatarUrl);
        setUserInfo((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
        localStorage.setItem('user', JSON.stringify({ ...userInfo, avatarUrl: data.avatarUrl }));
        onUserUpdate({ ...userInfo, avatarUrl: data.avatarUrl });
        setAvatarMsg(t.profileUpdated);
      } else {
        setAvatarMsg(data.message || t.registrationError);
      }
    } catch (err) {
      setAvatarMsg(t.networkError);
    }
  };

  // Admin functions
  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5002/admin/avatars/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminStats(data);
      } else {
        setAdminMsg("Error fetching stats");
        setAdminSeverity("error");
      }
    } catch (err) {
      setAdminMsg(t.networkError);
      setAdminSeverity("error");
    }
  };

  const handleCleanup = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5002/admin/avatars/cleanup", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminStats(data.after);
        setAdminMsg(`Cleanup completed! Deleted ${data.deleted} files.`);
        setAdminSeverity("success");
      } else {
        setAdminMsg("Error during cleanup");
        setAdminSeverity("error");
      }
    } catch (err) {
      setAdminMsg(t.networkError);
      setAdminSeverity("error");
    }
  };

  // Fetch stats when admin tab is opened
  useEffect(() => {
    if (tab === 3 && userInfo?.role === 'admin') {
      fetchAdminStats();
    }
  }, [tab, userInfo?.role]);

  const backendUrl = "http://localhost:5002";
  const avatarSrc = avatarPreview
    ? avatarPreview.startsWith("/uploads/")
      ? backendUrl + avatarPreview
      : avatarPreview
    : undefined;

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
                  src={avatarSrc}
                >
                  {!avatarSrc && <Person fontSize="large" />}
                </Avatar>
                <label htmlFor="avatar-upload">
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    size="small"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    {t.uploadAvatar || "Качи снимка"}
                  </Button>
                </label>
                {avatarMsg && <Alert severity="info" sx={{ mt: 1 }}>{avatarMsg}</Alert>}
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
                {userInfo?.role === 'admin' && (
                  <Tab icon={<AdminPanelSettings />} label="Admin" />
                )}
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
                {profileMsg && (
                  <Alert severity={profileSeverity} sx={{ mt: 2 }}>{profileMsg}</Alert>
                )}
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
                {/* Превключвателят за тема е премахнат */}
              </Box>
            )}
            {tab === 3 && userInfo?.role === 'admin' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {t.adminPanel}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Manage avatar files and system statistics
                </Typography>
                
                {adminStats && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {t.avatarStats}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          {t.totalFiles}
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {adminStats.files}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          {t.totalSize}
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {adminStats.size}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Storage />}
                    onClick={fetchAdminStats}
                  >
                    {t.refreshStats}
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<Delete />}
                    onClick={handleCleanup}
                  >
                    {t.cleanupFiles}
                  </Button>
                </Box>
                
                {adminMsg && (
                  <Alert severity={adminSeverity} sx={{ mt: 2 }}>{adminMsg}</Alert>
                )}
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Welcome Message */}
        <Box sx={{ mt: 4, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom color={theme.palette.text.primary}>
            {t.hello} {userInfo?.name}! 👋
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {t.loggedIn}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 