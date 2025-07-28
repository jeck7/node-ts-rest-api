import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  EmojiEvents,
  Star,
  Visibility,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ThemeRankingChart = ({ themes, onVote }) => {
  const topThemes = themes.slice(0, 6);
  const totalVotes = themes.reduce((sum, theme) => sum + theme.votes, 0);
  const maxVotes = Math.max(...themes.map(t => t.votes));

  const chartData = themes.map(theme => ({
    name: theme.name,
    votes: theme.votes,
    rank: theme.rank,
    color: theme.color,
  }));

  const getRankIcon = (rank) => {
    if (rank === 1) return <EmojiEvents sx={{ color: '#FFD700' }} />;
    if (rank === 2) return <Star sx={{ color: '#C0C0C0' }} />;
    if (rank === 3) return <Star sx={{ color: '#CD7F32' }} />;
    return <TrendingUp />;
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#00d4ff', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                    {totalVotes}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Total Votes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9500', width: 48, height: 48 }}>
                  <EmojiEvents />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                    {themes.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Total Themes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#b388ff', width: 48, height: 48 }}>
                  <Star />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                    {Math.round((topThemes[0]?.votes / totalVotes) * 100)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Top Theme Share
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#00e5ff', width: 48, height: 48 }}>
                  <Visibility />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                    {Math.round(totalVotes / themes.length)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Avg Votes/Theme
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333', mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#fff', fontWeight: 600 }}>
          📊 Votes Distribution Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="name" 
              stroke="#ccc"
              tick={{ fill: '#ccc', fontSize: 12 }}
            />
            <YAxis 
              stroke="#ccc"
              tick={{ fill: '#ccc', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2d2d2d', 
                border: '1px solid #333',
                borderRadius: 8,
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar 
              dataKey="votes" 
              fill="#00d4ff"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Top Themes Ranking */}
      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid #333' }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#fff', fontWeight: 600 }}>
          🏆 Top 6 Themes Ranking
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {topThemes.map((theme, index) => (
            <Box
              key={theme.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.color}15 0%, transparent 100%)`,
                border: `1px solid ${theme.color}40`,
                position: 'relative',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)',
                  background: `linear-gradient(90deg, ${theme.color}25 0%, transparent 100%)`,
                },
              }}
            >
              {/* Rank Badge */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: index < 3 
                    ? `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}80 100%)` 
                    : '#333',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  boxShadow: index < 3 ? `0 4px 16px ${theme.color}66` : 'none',
                  position: 'relative',
                }}
              >
                {getRankIcon(index + 1)}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: -8, 
                    color: theme.color,
                    fontWeight: 700,
                  }}
                >
                  #{index + 1}
                </Typography>
              </Box>
              
              {/* Theme Info */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: theme.color, fontWeight: 600, mb: 0.5 }}>
                  {theme.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                  {theme.category} • {theme.votes} votes • {Math.round((theme.votes / totalVotes) * 100)}% of total
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(theme.votes / maxVotes) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#333',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${theme.color} 0%, ${theme.color}80 100%)`,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              
              {/* Vote Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={`${theme.votes} votes`}
                  size="small"
                  sx={{ 
                    backgroundColor: `${theme.color}30`,
                    color: theme.color,
                    fontWeight: 600,
                  }}
                />
                <Chip 
                  label={`${Math.round((theme.votes / totalVotes) * 100)}%`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderColor: theme.color,
                    color: theme.color,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ThemeRankingChart; 