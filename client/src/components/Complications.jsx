import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const Complications = ({ complications = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 2 }}>
        {complications.map((complication, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                p: 2,
                textAlign: 'center',
                minHeight: 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.12)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              {complication.icon && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: `${complication.color}20`,
                    color: complication.color,
                    fontSize: '1rem',
                    mb: 1,
                  }}
                >
                  {complication.icon}
                </Avatar>
              )}
              
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1,
                }}
              >
                {complication.value}
              </Typography>
              
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
                {complication.label}
              </Typography>
              
              {complication.subtitle && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.5rem',
                    opacity: 0.7,
                  }}
                >
                  {complication.subtitle}
                </Typography>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
};

export default Complications; 