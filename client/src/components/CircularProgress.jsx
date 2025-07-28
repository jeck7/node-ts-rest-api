import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const CircularProgress = ({ 
  value, 
  maxValue = 100, 
  size = 120, 
  strokeWidth = 8, 
  color = '#00d4ff', 
  icon, 
  label, 
  subtitle,
  showValue = true 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / maxValue) * circumference;
  const remaining = circumference - progress;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: remaining }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
          />
        </svg>
        
        {/* Center content */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {icon && (
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: `${color}20`,
                color: color,
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              {icon}
            </Avatar>
          )}
          {showValue && (
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>
          )}
          {label && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.625rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.5rem',
                opacity: 0.7,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default CircularProgress; 