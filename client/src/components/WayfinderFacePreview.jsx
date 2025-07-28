import React from 'react';
import { Box } from '@mui/material';

const WayfinderFacePreview = ({ size = 160 }) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  const innerRadius = radius * 0.7;
  
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="url(#wayfinderBg)"
          stroke="url(#wayfinderBorder)"
          strokeWidth="2"
        />
        
        {/* Compass ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="url(#compassRing)"
          strokeWidth="3"
          strokeDasharray="2,4"
        />
        
        {/* Inner background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="url(#innerBg)"
        />
        
        {/* Digital time */}
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.15}
          fontWeight="600"
          fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          14:32
        </text>
        
        {/* Date */}
        <text
          x={centerX}
          y={centerY + size * 0.25}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.08}
          fontWeight="400"
          fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
          opacity="0.8"
        >
          DEC 15
        </text>
        
        {/* Top complication - Battery */}
        <circle
          cx={centerX}
          cy={centerY - radius * 0.6}
          r={size * 0.08}
          fill="url(#batteryBg)"
          stroke="#00ff88"
          strokeWidth="1.5"
        />
        <text
          x={centerX}
          y={centerY - radius * 0.6 + 3}
          textAnchor="middle"
          fill="#00ff88"
          fontSize={size * 0.06}
          fontWeight="600"
        >
          87%
        </text>
        
        {/* Right complication - Steps */}
        <circle
          cx={centerX + radius * 0.6}
          cy={centerY}
          r={size * 0.08}
          fill="url(#stepsBg)"
          stroke="#ff6b35"
          strokeWidth="1.5"
        />
        <text
          x={centerX + radius * 0.6}
          y={centerY + 3}
          textAnchor="middle"
          fill="#ff6b35"
          fontSize={size * 0.06}
          fontWeight="600"
        >
          8.2K
        </text>
        
        {/* Bottom complication - Heart Rate */}
        <circle
          cx={centerX}
          cy={centerY + radius * 0.6}
          r={size * 0.08}
          fill="url(#heartBg)"
          stroke="#ff3b30"
          strokeWidth="1.5"
        />
        <text
          x={centerX}
          y={centerY + radius * 0.6 + 3}
          textAnchor="middle"
          fill="#ff3b30"
          fontSize={size * 0.06}
          fontWeight="600"
        >
          72
        </text>
        
        {/* Left complication - Temperature */}
        <circle
          cx={centerX - radius * 0.6}
          cy={centerY}
          r={size * 0.08}
          fill="url(#tempBg)"
          stroke="#5ac8fa"
          strokeWidth="1.5"
        />
        <text
          x={centerX - radius * 0.6}
          y={centerY + 3}
          textAnchor="middle"
          fill="#5ac8fa"
          fontSize={size * 0.06}
          fontWeight="600"
        >
          18°
        </text>
        
        {/* Compass needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY - radius * 0.3}
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill="#ffffff"
        />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="wayfinderBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="70%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          
          <linearGradient id="wayfinderBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9500" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#ff9500" />
          </linearGradient>
          
          <linearGradient id="compassRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9500" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9500" stopOpacity="0.6" />
          </linearGradient>
          
          <radialGradient id="innerBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          
          <radialGradient id="batteryBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="stepsBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="heartBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="tempBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default WayfinderFacePreview; 