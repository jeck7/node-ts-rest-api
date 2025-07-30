import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  People,
  TrendingUp,
  Watch,
  TableChart,
  DonutLarge,
  Diamond,
  Speed,
  Brightness7,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import WayfinderFacePreview from './WayfinderFacePreview';
import ModularFacePreview from './ModularFacePreview';
import ThemeRankingChart from './ThemeRankingChart';
import AuthModal from './AuthModal';
import Dashboard from './Dashboard';

const MotionBox = motion(Box);

// Apple Watch теми данни от WCH App и Facer.io
const initialWatchThemes = [
  {
    id: 1,
    name: 'Infograph Modular',
    color: '#ff9500',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff9500 100%)',
    desc: 'Data-rich modular face with customizable complications.',
    votes: 156,
    rank: 1,
    category: 'Professional',
    source: 'WCH App'
  },
  {
    id: 2,
    name: 'California',
    color: '#00e5ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #00e5ff 100%)',
    desc: 'Classic analog design with modern complications.',
    votes: 142,
    rank: 2,
    category: 'Classic',
    source: 'WCH App'
  },
  {
    id: 3,
    name: 'Solar',
    color: '#b388ff',
    bg: 'linear-gradient(135deg, #23272b 0%, #b388ff 100%)',
    desc: 'Dynamic solar animation with time-based complications.',
    votes: 98,
    rank: 3,
    category: 'Dynamic',
    source: 'WCH App'
  },
  {
    id: 4,
    name: 'Chronograph',
    color: '#ffb300',
    bg: 'linear-gradient(135deg, #23272b 0%, #ffb300 100%)',
    desc: 'Precision chronograph with stopwatch functionality.',
    votes: 87,
    rank: 4,
    category: 'Sports',
    source: 'WCH App'
  },
  {
    id: 5,
    name: 'Activity Digital',
    color: '#ff6b6b',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff6b6b 100%)',
    desc: 'Fitness-focused with activity rings and metrics.',
    votes: 76,
    rank: 5,
    category: 'Fitness',
    source: 'WCH App'
  },
  {
    id: 6,
    name: 'Memoji',
    color: '#4fc3f7',
    bg: 'linear-gradient(135deg, #23272b 0%, #4fc3f7 100%)',
    desc: 'Personalized with animated Memoji characters.',
    votes: 65,
    rank: 6,
    category: 'Personal',
    source: 'WCH App'
  },
  {
    id: 7,
    name: 'Nike Digital',
    color: '#4caf50',
    bg: 'linear-gradient(135deg, #23272b 0%, #4caf50 100%)',
    desc: 'Nike-inspired with bold typography and colors.',
    votes: 54,
    rank: 7,
    category: 'Sports',
    source: 'WCH App'
  },
  {
    id: 8,
    name: 'Hermès',
    color: '#af52de',
    bg: 'linear-gradient(135deg, #23272b 0%, #af52de 100%)',
    desc: 'Luxury leather-inspired with elegant complications.',
    votes: 43,
    rank: 8,
    category: 'Luxury',
    source: 'WCH App'
  },
  {
    id: 9,
    name: 'Minimalist',
    color: '#9c27b0',
    bg: 'linear-gradient(135deg, #23272b 0%, #9c27b0 100%)',
    desc: 'Clean, minimal design with essential information.',
    votes: 89,
    rank: 9,
    category: 'Minimal',
    source: 'Facer.io'
  },
  {
    id: 10,
    name: 'Retro Digital',
    color: '#00bcd4',
    bg: 'linear-gradient(135deg, #23272b 0%, #00bcd4 100%)',
    desc: 'Vintage digital watch aesthetic with modern features.',
    votes: 67,
    rank: 10,
    category: 'Retro',
    source: 'Facer.io'
  },
  {
    id: 11,
    name: 'Weather Pro',
    color: '#2196f3',
    bg: 'linear-gradient(135deg, #23272b 0%, #2196f3 100%)',
    desc: 'Weather-focused with detailed forecasts and conditions.',
    votes: 78,
    rank: 11,
    category: 'Weather',
    source: 'Facer.io'
  },
  {
    id: 12,
    name: 'Gaming',
    color: '#ff5722',
    bg: 'linear-gradient(135deg, #23272b 0%, #ff5722 100%)',
    desc: 'Gaming-inspired with pixel art and neon effects.',
    votes: 92,
    rank: 12,
    category: 'Gaming',
    source: 'Facer.io'
  }
];

export default function TechDashboard({ user, onLogout, onUserUpdate, onLoginSuccess, activeTab, setActiveTab, showDashboard, onDashboardClose }) {
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
      case 'Infograph Modular':
        return <DonutLarge sx={{ fontSize: 60, color: color }} />;
      case 'California':
        return <Watch sx={{ fontSize: 60, color: color }} />;
      case 'Solar':
        return <Brightness7 sx={{ fontSize: 60, color: color }} />;
      case 'Chronograph':
        return <TableChart sx={{ fontSize: 60, color: color }} />;
      case 'Activity Digital':
        return <TrendingUp sx={{ fontSize: 60, color: color }} />;
      case 'Memoji':
        return <People sx={{ fontSize: 60, color: color }} />;
      case 'Nike Digital':
        return <Speed sx={{ fontSize: 60, color: color }} />;
      case 'Hermès':
        return <Diamond sx={{ fontSize: 60, color: color }} />;
      case 'Minimalist':
        return <Watch sx={{ fontSize: 60, color: color }} />;
      case 'Retro Digital':
        return <TableChart sx={{ fontSize: 60, color: color }} />;
      case 'Weather Pro':
        return <Brightness7 sx={{ fontSize: 60, color: color }} />;
      case 'Gaming':
        return <Speed sx={{ fontSize: 60, color: color }} />;
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
                    Top Apple Watch Themes from WCH App & Facer.io
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', opacity: 0.8 }}>
                    Discover the most popular watch faces from <a href="https://wchapp.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', textDecoration: 'none' }}>WCH App</a> and <a href="https://www.facer.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722', textDecoration: 'none' }}>Facer.io</a> - the ultimate smartwatch customization platforms
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
                        
                        {/* Source Badge */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: theme.source === 'WCH App' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 87, 34, 0.2)',
                            border: `1px solid ${theme.source === 'WCH App' ? '#00d4ff' : '#ff5722'}`,
                            color: theme.source === 'WCH App' ? '#00d4ff' : '#ff5722',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                          }}
                        >
                          {theme.source}
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