import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  LinearProgress,
  Paper,
  Tooltip,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Rocket,
  Code,
  People,
  TrendingUp,
  Watch,
  CompassCalibration,
  TableChart,
  DonutLarge,
  Diamond,
  CheckCircle,
  PhotoCamera,
  Speed,
  Battery90,
  Wifi,
  SignalCellular4Bar,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../LanguageContext';
import { useThemeMode } from '../App';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useTheme } from '@mui/material/styles';
import CircularProgress from './CircularProgress';
import Complications from './Complications';
import WayfinderFacePreview from './WayfinderFacePreview';
import ModularFacePreview from './ModularFacePreview';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

// Примерни Apple Watch Ultra теми (preview)
  const watchThemes = [
    {
      name: 'Wayfinder',
      color: '#ff9500',
      bg: 'linear-gradient(135deg, #23272b 0%, #ff9500 100%)',
      desc: 'Adventure-ready, compass, and complications grid.',
      icon: <WayfinderFacePreview size={160} />,
    },
  {
    name: 'Modular',
    color: '#00e5ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #00e5ff 100%)',
    desc: 'Data-rich, customizable complications, digital time.',
    icon: <ModularFacePreview size={160} />,
  },
  {
    name: 'Infograph',
    color: '#b388ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #b388ff 100%)',
    desc: 'Max info, circular complications, analog hands.',
    icon: <DonutLarge sx={{ fontSize: 60, color: '#b388ff' }} />,
  },
  {
    name: 'Bevel',
    color: '#ffb300',
    bg: 'linear-gradient(135deg, #23272b 0%, #ffb300 100%)',
    desc: '3D bevel, bold colors, futuristic look.',
    icon: <Diamond sx={{ fontSize: 60, color: '#ffb300' }} />,
  },
];

export default function TechDashboard({ user, onLogout, onUserUpdate, onLoginSuccess, activeTab, setActiveTab }) {
  const { t, lang, switchLang } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [stats, setStats] = useState({
    projects: 12,
    teamMembers: 8,
    revenue: 125000,
    growth: 23.5,
  });

  const [activities] = useState([
    {
      id: 1,
      type: 'deploy',
      message: 'Frontend deployed to production',
      time: '2 minutes ago',
      icon: <Code color="success" />,
    },
    {
      id: 2,
      type: 'commit',
      message: 'Added new authentication features',
      time: '15 minutes ago',
      icon: <Code color="primary" />,
    },
    {
      id: 3,
      type: 'team',
      message: 'New team member joined',
      time: '1 hour ago',
      icon: <People color="secondary" />,
    },
    {
      id: 4,
      type: 'milestone',
      message: 'Project milestone achieved',
      time: '2 hours ago',
      icon: <CheckCircle color="success" />,
    },
  ]);

  const [techStack] = useState([
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'MongoDB', color: '#4db33d' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Material-UI', color: '#0081cb' },
    { name: 'Express', color: '#000000' },
  ]);

  const [complications] = useState([
    {
      icon: <Speed />,
      value: '2.4s',
      label: 'Load Time',
      color: '#00d4ff',
      subtitle: 'Avg'
    },
    {
      icon: <Battery90 />,
      value: '94%',
      label: 'Uptime',
      color: '#4ecdc4',
      subtitle: 'This Week'
    },
    {
      icon: <Wifi />,
      value: '1.2k',
      label: 'Requests',
      color: '#ff9500',
      subtitle: 'Per Hour'
    },
    {
      icon: <SignalCellular4Bar />,
      value: '99.9%',
      label: 'Success',
      color: '#af52de',
      subtitle: 'Rate'
    }
  ]);

  const chartData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 1398 },
    { name: 'Mar', users: 200, revenue: 9800 },
    { name: 'Apr', users: 278, revenue: 3908 },
    { name: 'May', users: 189, revenue: 4800 },
    { name: 'Jun', users: 239, revenue: 3800 },
  ];

  const [editName, setEditName] = useState(user?.name || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:5002'}${user.avatarUrl}` : '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!(user && user.email);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Актуализиране на аватар при избор
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Запис на профила
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      // Update name
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5002/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error updating profile');
      // Update avatar if selected
      let avatarUrl = data.avatarUrl || user.avatarUrl;
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const avatarRes = await fetch('http://localhost:5002/users/me/avatar', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const avatarData = await avatarRes.json();
        if (!avatarRes.ok) throw new Error(avatarData.message || 'Error uploading avatar');
        avatarUrl = avatarData.avatarUrl;
        setAvatarPreview(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}${avatarUrl}`);
      }
      setMsg('Profile updated!');
      setSeverity('success');
      setLoading(false);
      // Update user in parent
      onUserUpdate && onUserUpdate({ ...user, name: editName, avatarUrl });
      // Update localStorage
      localStorage.setItem('user', JSON.stringify({ ...user, name: editName, avatarUrl }));
    } catch (err) {
      setMsg(err.message);
      setSeverity('error');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isLight
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: { xs: 'block', md: 'flex' },
        flexDirection: { md: 'row' },
      }}
    >
      {/* Лява част: Hero, stats, tech stack */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <MotionBox variants={cardVariants} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Watch sx={{ fontSize: 40, color: '#00d4ff', filter: 'drop-shadow(0 2px 8px #00d4ff88)' }} />
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.7rem' },
                        background: 'linear-gradient(90deg, #00d4ff 0%, #ffb300 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.04em',
                        textShadow: '0 2px 12px #00d4ff44',
                      }}
                    >
                      Apple Watch Theme
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.04em', mb: 1 }}>
                    Inspired by Apple Watch Ultra complications & faces
                  </Typography>
                </Box>
                {/* Removed New Project and Deploy buttons */}
              </Box>
            </MotionBox>

            {/* Apple Watch Ultra Themes Preview */}
            <MotionBox variants={cardVariants} sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                Apple Watch Ultra Themes
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: 3,
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
                {watchThemes.map((theme, idx) => (
                  <Box
                    key={theme.name}
                    sx={{
                      background: theme.bg,
                      borderRadius: 4,
                      boxShadow: `0 4px 24px ${theme.color}33`,
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minHeight: 180,
                      border: `2px solid ${theme.color}55`,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.04)',
                        boxShadow: `0 8px 32px ${theme.color}66`,
                      },
                    }}
                  >
                    {theme.icon}
                    <Typography variant="h5" sx={{ mt: 1, mb: 1, color: theme.color, fontWeight: 700, letterSpacing: '-0.02em' }}>{theme.name}</Typography>
                    <Typography variant="body1" color="#fff" sx={{ textAlign: 'center', opacity: 0.9, fontSize: '1rem' }}>{theme.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </MotionBox>



            {/* Tech Stack */}
            <MotionBox variants={cardVariants} sx={{ mt: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Tech Stack
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {techStack.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech.name}
                        sx={{
                          bgcolor: `${tech.color}20`,
                          color: tech.color,
                          border: `1px solid ${tech.color}40`,
                          '&:hover': {
                            bgcolor: `${tech.color}30`,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </MotionBox>

            {/* Секция за редакция на профила */}
            {user && user.email && (
              <Box sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
                    {msg && <Box sx={{ mb: 2 }}><Typography color={severity === 'success' ? 'success.main' : 'error.main'}>{msg}</Typography></Box>}
                    <form onSubmit={handleProfileSave}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <Avatar src={avatarPreview} sx={{ width: 80, height: 80, mb: 1 }} />
                          <label htmlFor="avatar-upload">
                            <input
                              accept="image/*"
                              id="avatar-upload"
                              type="file"
                              style={{ display: 'none' }}
                              onChange={handleAvatarChange}
                            />
                            <Button variant="outlined" component="span" startIcon={<PhotoCamera />} size="small">
                              Upload Photo
                            </Button>
                          </label>
                        </Box>
                        <TextField
                          name="name"
                          label="Name"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Email"
                          value={user?.email || ''}
                          fullWidth
                          InputProps={{ readOnly: true }}
                        />
                        <TextField
                          label="Role"
                          value={user?.role || ''}
                          fullWidth
                          InputProps={{ readOnly: true }}
                        />
                        <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            )}
          </MotionBox>
        </Container>
      </Box>

      {/* Дясна част: Login/Register форми */}
      {!isLoggedIn && (
        <Box sx={{ width: { xs: '100%', md: 400 }, maxWidth: 420, ml: { md: 4 }, mr: { md: 4 }, mt: { xs: 4, md: 8 }, alignSelf: { md: 'flex-start' }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, p: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)} 
            centered 
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {activeTab === 0 && <LoginForm onLoginSuccess={onLoginSuccess} onSwitchTab={() => setActiveTab(1)} />}
            {activeTab === 1 && <RegisterForm onSwitchTab={() => setActiveTab(0)} />}
          </Box>
        </Box>
      )}
    </Box>
  );
} 