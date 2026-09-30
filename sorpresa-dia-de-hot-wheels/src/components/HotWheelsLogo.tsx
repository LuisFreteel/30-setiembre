import React from 'react';

interface HotWheelsLogoProps {
  className?: string;
}

export const HotWheelsLogo: React.FC<HotWheelsLogoProps> = ({ className = 'w-48 h-16' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 85"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(220,38,38,0.4)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hwFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff002b" />
            <stop offset="35%" stopColor="#ff2200" />
            <stop offset="70%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#ffbe00" />
          </linearGradient>

          <linearGradient id="hwTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff8b5" />
            <stop offset="65%" stopColor="#ffd200" />
            <stop offset="100%" stopColor="#ff9400" />
          </linearGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#880000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer flame ribbon shape */}
        <path
          d="M 12,50 
             C 10,25 35,12 70,12 
             C 110,12 140,8 185,10 
             C 230,12 270,25 272,38 
             C 274,52 245,68 200,72 
             C 150,76 115,74 75,72 
             C 35,70 14,65 12,50 Z"
          fill="url(#hwFlameGrad)"
          stroke="#990000"
          strokeWidth="3"
        />

        {/* Flame detail lick lines */}
        <path
          d="M 28,32 C 45,20 60,35 78,25 C 95,15 120,20 145,16"
          stroke="#fff066"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 220,30 C 240,25 258,35 264,45"
          stroke="#fff066"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Hot Wheels Stylized Text */}
        <g transform="skewX(-14) translate(18, 0)">
          {/* Shadow / outline text */}
          <text
            x="130"
            y="52"
            textAnchor="middle"
            fill="#7a0000"
            stroke="#5c0000"
            strokeWidth="7"
            strokeLinejoin="round"
            fontFamily="'Plus Jakarta Sans', Impact, sans-serif"
            fontWeight="900"
            fontSize="34"
            letterSpacing="-0.5px"
          >
            HOT WHEELS
          </text>

          {/* Foreground text */}
          <text
            x="130"
            y="52"
            textAnchor="middle"
            fill="url(#hwTextGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fontFamily="'Plus Jakarta Sans', Impact, sans-serif"
            fontWeight="900"
            fontSize="34"
            letterSpacing="-0.5px"
            filter="url(#shadowFilter)"
          >
            HOT WHEELS
          </text>
        </g>

        {/* Little sparks / stars */}
        <circle cx="25" cy="18" r="2.5" fill="#fff" />
        <circle cx="260" cy="22" r="2" fill="#fff" />
        <path d="M 250,15 L 252,19 L 256,20 L 252,22 L 250,26 L 248,22 L 244,20 L 248,19 Z" fill="#ffd700" />
      </svg>
    </div>
  );
};
