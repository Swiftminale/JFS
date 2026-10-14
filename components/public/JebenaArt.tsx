import React from 'react';

interface JebenaArtProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  steamColor?: string;
  opacity?: number;
}

export default function JebenaArt({
  className = '',
  width = 240,
  height = 270,
  color = '#e58e37',
  steamColor = '#f59e0b',
  opacity = 0.9,
}: JebenaArtProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        pointerEvents: 'none',
        opacity,
        filter: 'drop-shadow(0 0 22px rgba(229, 142, 55, 0.4))',
        lineHeight: 0,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}
      >
        {/* Steam Wisps */}
        {/* Neck Steam */}
        <path
          d="M 108 42 C 104 30, 112 20, 106 10"
          stroke={steamColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 116 38 C 122 26, 116 16, 120 6"
          stroke={steamColor}
          strokeWidth="2.0"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Spout Steam */}
        <path
          d="M 42 85 C 36 72, 45 60, 38 46"
          stroke={steamColor}
          strokeWidth="2.0"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* 1. JEBENA TOP & STOPPER (Kifet) */}
        <path
          d="M 108 52 C 108 42, 116 42, 116 52"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M 112 42 L 112 36"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Flared Rim */}
        <ellipse
          cx="112"
          cy="54"
          rx="14"
          ry="4"
          stroke={color}
          strokeWidth="2.8"
        />

        {/* 2. JEBENA NECK */}
        <path
          d="M 100 56 C 104 78, 103 102, 101 122"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <path
          d="M 124 56 C 120 78, 121 102, 123 122"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        {/* Neck Traditional Ring Bands */}
        <path
          d="M 102 74 C 108 77, 116 77, 122 74"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M 102 86 C 108 89, 116 89, 122 86"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M 102 98 C 108 101, 116 101, 122 98"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
        />

        {/* 3. JEBENA HANDLE (Right Side) */}
        <path
          d="M 123 68 C 154 78, 160 112, 132 134"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 122 76 C 146 84, 150 108, 128 128"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 4. JEBENA SPOUT (Left Side) */}
        <path
          d="M 82 136 C 58 130, 48 110, 42 92"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <path
          d="M 78 146 C 54 140, 44 118, 38 98"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <ellipse
          cx="40"
          cy="95"
          rx="3.5"
          ry="2"
          transform="rotate(-30 40 95)"
          stroke={color}
          strokeWidth="2.4"
        />

        {/* 5. JEBENA BULBOUS BELLY (Round Ceramic Body) */}
        <path
          d="M 101 122 C 70 126, 54 150, 56 180 C 58 208, 80 224, 112 224 C 144 224, 166 208, 168 180 C 170 150, 154 126, 123 122"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Traditional Incised Cross/Star Etchings */}
        <circle
          cx="112"
          cy="174"
          r="18"
          stroke={color}
          strokeWidth="1.8"
          strokeDasharray="3 3"
        />
        <path
          d="M 112 158 L 112 190"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M 96 174 L 128 174"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M 101 163 L 123 185"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 101 185 L 123 163"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 6. WOVEN STRAW RING STAND (Matit) */}
        <ellipse
          cx="112"
          cy="226"
          rx="26"
          ry="6"
          stroke={color}
          strokeWidth="2.6"
        />
        <ellipse
          cx="112"
          cy="231"
          rx="28"
          ry="6"
          stroke={color}
          strokeWidth="2.6"
        />
        {/* Weave Stitches */}
        <path
          d="M 94 227 L 98 234 M 102 226 L 106 235 M 110 226 L 114 235 M 118 226 L 122 235 M 126 227 L 130 234"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 7. ETHIOPIAN SINI CUP (Traditional Handleless Cup) */}
        {/* Cup Steam */}
        <path
          d="M 188 182 C 182 170, 192 160, 186 146"
          stroke={steamColor}
          strokeWidth="2.0"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 198 178 C 204 168, 196 156, 202 142"
          stroke={steamColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Sini Rim */}
        <ellipse
          cx="193"
          cy="192"
          rx="19"
          ry="5"
          stroke={color}
          strokeWidth="2.6"
        />
        {/* Cup Bowl */}
        <path
          d="M 175 193 C 177 207, 182 218, 185 222 C 188 224, 198 224, 201 222 C 204 218, 209 207, 211 193"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cup Band & Dot Accent */}
        <path
          d="M 178 202 C 185 206, 201 206, 208 202"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="193" cy="210" r="2.5" fill={color} />

        {/* Saucer */}
        <ellipse
          cx="193"
          cy="226"
          rx="27"
          ry="6"
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M 172 227 C 180 232, 206 232, 214 227"
          stroke={color}
          strokeWidth="2.0"
        />

        {/* 8. SCATTERED ROASTED COFFEE BEANS */}
        {/* Bean 1 */}
        <g transform="translate(152, 226) rotate(25)">
          <ellipse cx="0" cy="0" rx="7" ry="4.5" stroke={color} strokeWidth="2.0" />
          <path d="M -5 0 Q 0 2 5 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* Bean 2 */}
        <g transform="translate(68, 228) rotate(-35)">
          <ellipse cx="0" cy="0" rx="6.5" ry="4" stroke={color} strokeWidth="2.0" />
          <path d="M -4.5 0 Q 0 -1.5 4.5 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* Bean 3 */}
        <g transform="translate(144, 238) rotate(-15)">
          <ellipse cx="0" cy="0" rx="6" ry="3.8" stroke={color} strokeWidth="1.8" />
          <path d="M -4 0 Q 0 1.5 4 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
