import React from 'react';
import { Box } from '@mui/material';

const ModularFacePreview = ({ size = 160 }) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="url(#modularBg)"
          stroke="url(#modularBorder)"
          strokeWidth="2"
        />
        
        {/* Inner background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.85}
          fill="url(#modularInnerBg)"
        />
        
        {/* Large digital time */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.18}
          fontWeight="700"
          fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
          letterSpacing="-0.02em"
        >
          14:32
        </text>
        
        {/* Date */}
        <text
          x={centerX}
          y={centerY + size * 0.15}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.09}
          fontWeight="500"
          fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
          opacity="0.9"
        >
          DEC 15
        </text>
        
        {/* Top row complications */}
        {/* Battery */}
        <rect
          x={centerX - radius * 0.35}
          y={centerY - radius * 0.25}
          width={size * 0.15}
          height={size * 0.08}
          rx="3"
          fill="url(#batteryRectBg)"
          stroke="#00ff88"
          strokeWidth="1"
        />
        <text
          x={centerX - radius * 0.28}
          y={centerY - radius * 0.2}
          textAnchor="middle"
          fill="#00ff88"
          fontSize={size * 0.05}
          fontWeight="600"
        >
          87%
        </text>
        
        {/* Steps */}
        <rect
          x={centerX + radius * 0.2}
          y={centerY - radius * 0.25}
          width={size * 0.15}
          height={size * 0.08}
          rx="3"
          fill="url(#stepsRectBg)"
          stroke="#ff6b35"
          strokeWidth="1"
        />
        <text
          x={centerX + radius * 0.27}
          y={centerY - radius * 0.2}
          textAnchor="middle"
          fill="#ff6b35"
          fontSize={size * 0.05}
          fontWeight="600"
        >
          8.2K
        </text>
        
        {/* Bottom row complications */}
        {/* Heart Rate */}
        <rect
          x={centerX - radius * 0.35}
          y={centerY + radius * 0.17}
          width={size * 0.15}
          height={size * 0.08}
          rx="3"
          fill="url(#heartRectBg)"
          stroke="#ff3b30"
          strokeWidth="1"
        />
        <text
          x={centerX - radius * 0.28}
          y={centerY + radius * 0.22}
          textAnchor="middle"
          fill="#ff3b30"
          fontSize={size * 0.05}
          fontWeight="600"
        >
          72
        </text>
        
        {/* Temperature */}
        <rect
          x={centerX + radius * 0.2}
          y={centerY + radius * 0.17}
          width={size * 0.15}
          height={size * 0.08}
          rx="3"
          fill="url(#tempRectBg)"
          stroke="#5ac8fa"
          strokeWidth="1"
        />
        <text
          x={centerX + radius * 0.27}
          y={centerY + radius * 0.22}
          textAnchor="middle"
          fill="#5ac8fa"
          fontSize={size * 0.05}
          fontWeight="600"
        >
          18°
        </text>
        
        {/* Center complication - Weather */}
        <rect
          x={centerX - size * 0.08}
          y={centerY + radius * 0.05}
          width={size * 0.16}
          height={size * 0.06}
          rx="3"
          fill="url(#weatherRectBg)"
          stroke="#64b5f6"
          strokeWidth="1"
        />
        <text
          x={centerX}
          y={centerY + radius * 0.09}
          textAnchor="middle"
          fill="#64b5f6"
          fontSize={size * 0.04}
          fontWeight="600"
        >
          SUNNY
        </text>
        
        {/* Grid lines for modular look */}
        <line
          x1={centerX - radius * 0.4}
          y1={centerY}
          x2={centerX + radius * 0.4}
          y2={centerY}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <line
          x1={centerX}
          y1={centerY - radius * 0.3}
          x2={centerX}
          y2={centerY + radius * 0.3}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="modularBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="70%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          
          <linearGradient id="modularBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007aff" />
            <stop offset="50%" stopColor="#5ac8fa" />
            <stop offset="100%" stopColor="#007aff" />
          </linearGradient>
          
          <radialGradient id="modularInnerBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          
          <radialGradient id="batteryRectBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="stepsRectBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="heartRectBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="tempRectBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <radialGradient id="weatherRectBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default ModularFacePreview; 