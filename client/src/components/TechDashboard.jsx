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
  Speed,
  Battery90,
  Wifi,
  SignalCellular4Bar,
  Login,
  Brightness7,
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
import ThemeRankingChart from './ThemeRankingChart';
import AuthModal from './AuthModal';
import Dashboard from './Dashboard';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

// Apple Watch теми данни (извън компонента)
const initialWatchThemes = [
  {
    id: 1,
    name: 'Wayfinder',
    color: '#ff9500',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff9500 100%)',
    desc: 'Adventure-ready, compass, and complications grid.',
    votes: 156,
    rank: 1,
    category: 'Adventure',
  },
  {
    id: 2,
    name: 'Modular',
    color: '#00e5ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #00e5ff 100%)',
    desc: 'Data-rich, customizable complications, digital time.',
    votes: 142,
    rank: 2,
    category: 'Professional',
  },
  {
    id: 3,
    name: 'Infograph',
    color: '#b388ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #b388ff 100%)',
    desc: 'Max info, circular complications, analog hands.',
    votes: 98,
    rank: 3,
    category: 'Information',
  },
  {
    id: 4,
    name: 'Bevel',
    color: '#ffb300',
    bg: 'linear-gradient(135deg, #23272b 0%, #ffb300 100%)',
    desc: '3D bevel, bold colors, futuristic look.',
    votes: 87,
    rank: 4,
    category: 'Design',
  },
  {
    id: 5,
    name: 'California',
    color: '#ff6b6b',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff6b6b 100%)',
    desc: 'Classic analog with modern complications.',
    votes: 76,
    rank: 5,
    category: 'Classic',
  },
  {
    id: 6,
    name: 'Siri',
    color: '#4fc3f7',
    bg: 'linear-gradient(135deg, #23272b 0%, #4fc3f7 100%)',
    desc: 'Voice-activated, smart suggestions.',
    votes: 65,
    rank: 6,
    category: 'Smart',
  },
  {
    id: 7,
    name: 'Solar',
    color: '#ffd700',
    bg: 'linear-gradient(135deg, #23272b 0%, #ffd700 100%)',
    desc: 'Dynamic solar animation, time-based complications.',
    votes: 58,
    rank: 7,
    category: 'Nature',
  },
  {
    id: 8,
    name: 'Chronograph',
    color: '#ff4757',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff4757 100%)',
    desc: 'Professional stopwatch with tachymeter scale.',
    votes: 52,
    rank: 8,
    category: 'Sports',
  },
  {
    id: 9,
    name: 'Activity Digital',
    color: '#2ed573',
    bg: 'linear-gradient(135deg, #23272b 0%, #2ed573 100%)',
    desc: 'Fitness-focused with activity rings and metrics.',
    votes: 48,
    rank: 9,
    category: 'Fitness',
  },
  {
    id: 10,
    name: 'Nike',
    color: '#ff6b35',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff6b35 100%)',
    desc: 'Nike-branded with bold typography and colors.',
    votes: 45,
    rank: 10,
    category: 'Sports',
  },
  {
    id: 11,
    name: 'Hermès',
    color: '#8b4513',
    bg: 'linear-gradient(135deg, #23272b 0%, #8b4513 100%)',
    desc: 'Luxury leather-inspired with elegant complications.',
    votes: 42,
    rank: 11,
    category: 'Luxury',
  },
  {
    id: 12,
    name: 'Memoji',
    color: '#ff69b4',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff69b4 100%)',
    desc: 'Personalized with animated Memoji characters.',
    votes: 38,
    rank: 12,
    category: 'Personal',
  },
];

export default function TechDashboard({ user, onLogout, onUserUpdate, onLoginSuccess, activeTab, setActiveTab, showDashboard, onDashboardClose }) {
  const { t, lang, switchLang } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  
  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Listen for custom event to open auth modal
  useEffect(() => {
    const handleOpenAuthModal = () => {
      setAuthModalOpen(true);
    };
    
    window.addEventListener('openAuthModal', handleOpenAuthModal);
    
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);
  
  // Apple Watch теми state
  const [watchThemes, setWatchThemes] = useState(() => {
    return initialWatchThemes.map(themeData => ({
      ...themeData,
      icon: getThemeIcon(themeData.name, themeData.color)
    }));
  });
  
  // Функция за генериране на икони според името на темата
  function getThemeIcon(themeName, color) {
    switch (themeName) {
      case 'Wayfinder':
        return <WayfinderFacePreview size={160} />;
      case 'Modular':
        return <ModularFacePreview size={160} />;
      case 'Infograph':
        return <DonutLarge sx={{ fontSize: 60, color: color }} />;
      case 'Bevel':
        return <Diamond sx={{ fontSize: 60, color: color }} />;
      case 'California':
        return <Watch sx={{ fontSize: 60, color: color }} />;
      case 'Siri':
        return <Speed sx={{ fontSize: 60, color: color }} />;
      case 'Solar':
        return <Brightness7 sx={{ fontSize: 60, color: color }} />;
      case 'Chronograph':
        return <TableChart sx={{ fontSize: 60, color: color }} />;
      case 'Activity Digital':
        return <TrendingUp sx={{ fontSize: 60, color: color }} />;
      case 'Nike':
        return <Speed sx={{ fontSize: 60, color: color }} />;
      case 'Hermès':
        return <Diamond sx={{ fontSize: 60, color: color }} />;
      case 'Memoji':
        return <People sx={{ fontSize: 60, color: color }} />;
      default:
        return <Watch sx={{ fontSize: 60, color: color }} />;
    }
  }
  
  // Функции за гласуване и класация
  const handleVote = (themeId) => {
    setWatchThemes(prevThemes => {
      const updatedThemes = prevThemes.map(theme => 
        theme.id === themeId 
          ? { ...theme, votes: theme.votes + 1 }
          : theme
      );
      
      // Сортиране по гласове и обновяване на ранговете
      const sortedThemes = updatedThemes.sort((a, b) => b.votes - a.votes);
      return sortedThemes.map((theme, index) => ({
        ...theme,
        rank: index + 1
      }));
    });
  };

  const getSortedThemes = (sortBy = 'rank') => {
    switch (sortBy) {
      case 'votes':
        return [...watchThemes].sort((a, b) => b.votes - a.votes);
      case 'name':
        return [...watchThemes].sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return [...watchThemes].sort((a, b) => a.category.localeCompare(b.category));
      default:
        return watchThemes;
    }
  };
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
                

              </Box>
            </MotionBox>

            {/* Apple Watch Themes Tabs */}
            <MotionBox variants={cardVariants} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                  🏆 Apple Watch Themes
                </Typography>
                <Chip 
                  label={`${watchThemes.reduce((sum, theme) => sum + theme.votes, 0)} total votes`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              {/* Tabs for different views */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                  value={activeTab} 
                  onChange={(e, v) => setActiveTab(v)} 
                  sx={{ 
                    '& .MuiTab-root': { 
                      color: 'text.secondary',
                      fontWeight: 600,
                    },
                    '& .Mui-selected': { 
                      color: '#00d4ff',
                    },
                  }}
                >
                  <Tab label="📊 Ranking Chart" />
                  <Tab label="🎨 All Themes" />
                  <Tab label="📈 Statistics" />
                </Tabs>
              </Box>
              
              {/* Tab Content */}
              {activeTab === 0 && (
                <ThemeRankingChart themes={watchThemes} onVote={handleVote} />
              )}
              
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
                    All Apple Watch Themes
                  </Typography>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                  }}>
                    {watchThemes.map((theme, idx) => (
                      <Box
                        key={theme.id}
                        sx={{
                          background: theme.bg,
                          borderRadius: 4,
                          boxShadow: `0 4px 24px ${theme.color}33`,
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minHeight: 200,
                          border: `2px solid ${theme.color}55`,
                          transition: 'transform 0.2s',
                          position: 'relative',
                          '&:hover': {
                            transform: 'scale(1.04)',
                            boxShadow: `0 8px 32px ${theme.color}66`,
                          },
                        }}
                      >
                        {/* Rank Badge */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: theme.rank <= 3 ? `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}80 100%)` : '#333',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            boxShadow: theme.rank <= 3 ? `0 2px 8px ${theme.color}66` : 'none',
                          }}
                        >
                          #{theme.rank}
                        </Box>
                        
                        {theme.icon}
                        <Typography variant="h5" sx={{ mt: 1, mb: 1, color: theme.color, fontWeight: 700, letterSpacing: '-0.02em' }}>
                          {theme.name}
                        </Typography>
                        <Typography variant="body1" color="#fff" sx={{ textAlign: 'center', opacity: 0.9, fontSize: '0.9rem', mb: 2 }}>
                          {theme.desc}
                        </Typography>
                        
                        {/* Vote Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                          <Chip 
                            label={`${theme.votes} votes`}
                            size="small"
                            sx={{ 
                              backgroundColor: `${theme.color}30`,
                              color: theme.color,
                              fontWeight: 600,
                            }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleVote(theme.id)}
                            sx={{
                              backgroundColor: theme.color,
                              '&:hover': {
                                backgroundColor: theme.color,
                                transform: 'scale(1.05)',
                              },
                            }}
                          >
                            Vote
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
                    Detailed Statistics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#fff', fontWeight: 600 }}>
                          Category Distribution
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {Object.entries(
                            watchThemes.reduce((acc, theme) => {
                              acc[theme.category] = (acc[theme.category] || 0) + theme.votes;
                              return acc;
                            }, {})
                          ).map(([category, votes]) => (
                            <Box key={category} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ color: '#ccc' }}>{category}</Typography>
                              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>{votes} votes</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#fff', fontWeight: 600 }}>
                          Top Performers
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {getSortedThemes('votes').slice(0, 5).map((theme, index) => (
                            <Box key={theme.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.color, fontWeight: 600 }}>
                                  #{index + 1}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#ccc' }}>{theme.name}</Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>{theme.votes} votes</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </MotionBox>






          </MotionBox>
        </Container>
      </Box>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
      
      {/* Dashboard Modal */}
      {showDashboard && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
          onClick={onDashboardClose}
        >
          <Box
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Dashboard 
              user={user} 
              onLogout={onLogout} 
              onUserUpdate={onUserUpdate}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
} 