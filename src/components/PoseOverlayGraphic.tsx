import React from 'react';
import { Pose, OverlaySettings } from '../types';

interface PoseOverlayGraphicProps {
  pose: Pose;
  settings: OverlaySettings;
  className?: string;
}

export const PoseOverlayGraphic: React.FC<PoseOverlayGraphicProps> = ({
  pose,
  settings,
  className = '',
}) => {
  const { opacity, scale, offsetX, offsetY, isMirrored, colorTheme } = settings;

  // Determine theme stroke & glow color
  const themeColors = {
    cyan: { stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)', fill: 'rgba(6, 182, 212, 0.12)' },
    green: { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', fill: 'rgba(16, 185, 129, 0.12)' },
    white: { stroke: '#ffffff', glow: 'rgba(255, 255, 255, 0.35)', fill: 'rgba(255, 255, 255, 0.1)' },
    gold: { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', fill: 'rgba(245, 158, 11, 0.12)' },
    rose: { stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)', fill: 'rgba(244, 63, 94, 0.12)' },
  };

  const currentTheme = themeColors[colorTheme] || themeColors.cyan;
  const isMale = pose.gender === 'male';

  // SVG Renderers tailored to category / svgType
  const renderAnatomyGuide = () => {
    const type = pose.svgType;

    // 1. Close-up Selfies (Chest-up framing)
    if (type.startsWith('selfie-') || pose.category === 'selfie') {
      const isSide = type.includes('side') || type.includes('looking-away');
      const hasHand = type.includes('hair') || type.includes('cheek') || type.includes('glasses');

      return (
        <g id="selfie-guide" transform="translate(100, 70)">
          {/* Head & Face Contour */}
          <ellipse
            cx={isSide ? "90" : "100"}
            cy="110"
            rx={isMale ? "48" : "44"}
            ry={isMale ? "58" : "54"}
            fill={currentTheme.fill}
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
          />
          {/* Eye Level Guide Line */}
          <line
            x1={isSide ? "55" : "60"}
            y1="105"
            x2={isSide ? "125" : "140"}
            y2="105"
            stroke={currentTheme.stroke}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          {/* Eye position markers */}
          <circle cx={isSide ? "75" : "82"} cy="105" r="4.5" fill={currentTheme.stroke} />
          <circle cx={isSide ? "105" : "118"} cy="105" r="4.5" fill={currentTheme.stroke} />

          {/* Nose & Chin direction vector */}
          <path
            d={isSide ? "M 90 105 L 85 125 L 94 135" : "M 100 105 L 100 130 L 105 133"}
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Smile curve */}
          <path
            d={isSide ? "M 80 148 Q 90 156 102 149" : "M 86 148 Q 100 158 114 148"}
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Neck & Shoulders */}
          <path
            d={
              isMale
                ? "M 74 165 L 72 195 L 10 240 L 10 320"
                : "M 80 162 L 80 195 L 25 240 L 25 320"
            }
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={
              isMale
                ? "M 126 165 L 128 195 L 190 240 L 190 320"
                : "M 120 162 L 120 195 L 175 240 L 175 320"
            }
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Collarbone highlight */}
          <path
            d="M 60 210 Q 100 225 140 210"
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {/* Hand indicator if gesture selfie */}
          {hasHand && (
            <g id="selfie-hand-gesture">
              <path
                d="M 140 120 Q 155 90 130 70"
                fill="none"
                stroke={currentTheme.stroke}
                strokeWidth="3"
                strokeDasharray="4 3"
              />
              <circle cx="135" cy="80" r="14" fill={currentTheme.fill} stroke={currentTheme.stroke} strokeWidth="2.5" />
              <text x="135" y="85" textAnchor="middle" fill={currentTheme.stroke} fontSize="11" fontWeight="bold">
                HAND
              </text>
            </g>
          )}

          {/* Alignment cues */}
          <text x="100" y="30" textAnchor="middle" fill={currentTheme.stroke} fontSize="12" fontWeight="600" letterSpacing="1">
            ALIGN EYES ON DOTTED LINE
          </text>
        </g>
      );
    }

    // 2. Seated / Sitting Poses
    if (type.startsWith('sit-') || pose.subCategory?.includes('Sitting')) {
      return (
        <g id="sitting-guide" transform="translate(100, 30)">
          {/* Head */}
          <circle cx="100" cy="55" r="30" fill={currentTheme.fill} stroke={currentTheme.stroke} strokeWidth="3" />
          <line x1="100" y1="85" x2="100" y2="100" stroke={currentTheme.stroke} strokeWidth="3" />
          {/* Shoulders & Torso */}
          <line x1="50" y1="110" x2="150" y2="110" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 60 110 L 70 210 L 130 210 L 140 110" fill={currentTheme.fill} stroke={currentTheme.stroke} strokeWidth="3" />

          {/* Arms resting on knees */}
          <path d="M 50 110 L 35 170 L 65 210" fill="none" stroke={currentTheme.stroke} strokeWidth="3" />
          <path d="M 150 110 L 165 170 L 135 210" fill="none" stroke={currentTheme.stroke} strokeWidth="3" />
          <circle cx="65" cy="210" r="8" fill={currentTheme.stroke} />
          <circle cx="135" cy="210" r="8" fill={currentTheme.stroke} />

          {/* Thighs horizontal (Seated) */}
          <line x1="70" y1="210" x2="40" y2="280" stroke={currentTheme.stroke} strokeWidth="4" strokeLinecap="round" />
          <line x1="130" y1="210" x2="160" y2="280" stroke={currentTheme.stroke} strokeWidth="4" strokeLinecap="round" />
          {/* Calves down */}
          <line x1="40" y1="280" x2="45" y2="380" stroke={currentTheme.stroke} strokeWidth="4" strokeLinecap="round" />
          <line x1="160" y1="280" x2="155" y2="380" stroke={currentTheme.stroke} strokeWidth="4" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="45" cy="385" rx="14" ry="6" fill={currentTheme.stroke} />
          <ellipse cx="155" cy="385" rx="14" ry="6" fill={currentTheme.stroke} />

          {/* Seated bench / step reference line */}
          <line x1="10" y1="225" x2="190" y2="225" stroke={currentTheme.stroke} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          <text x="100" y="240" textAnchor="middle" fill={currentTheme.stroke} fontSize="10" opacity="0.8">
            SEAT SURFACE
          </text>
        </g>
      );
    }

    // 3. Mirror Selfies (Holding phone)
    if (type.startsWith('mirror-') || pose.category === 'mirror-selfie') {
      const isCover = type.includes('cover');
      const isSCurve = type.includes('scurve') || !isMale;

      return (
        <g id="mirror-guide" transform="translate(100, 20)">
          {/* Head */}
          <circle cx="100" cy="50" r="26" fill={currentTheme.fill} stroke={currentTheme.stroke} strokeWidth="3" />
          {/* Torso with posture curve */}
          <path
            d={
              isSCurve
                ? "M 100 76 L 100 90 Q 90 150 115 200 Q 120 230 100 250"
                : "M 100 76 L 100 90 L 100 240"
            }
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Shoulders */}
          <line x1="60" y1="95" x2="140" y2="95" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />

          {/* Holding Phone graphic at chest / face */}
          <g id="phone-graphic" transform={isCover ? "translate(86, 38)" : "translate(86, 120)"}>
            <rect x="0" y="0" width="28" height="48" rx="5" fill="#18181b" stroke={currentTheme.stroke} strokeWidth="2.5" />
            <circle cx="14" cy="7" r="3" fill={currentTheme.stroke} />
            <line x1="6" y1="42" x2="22" y2="42" stroke={currentTheme.stroke} strokeWidth="2" />
            <text x="14" y="28" textAnchor="middle" fill={currentTheme.stroke} fontSize="8" fontWeight="bold">
              PHONE
            </text>
          </g>

          {/* Arm holding phone */}
          <path
            d={isCover ? "M 140 95 L 125 70 L 114 60" : "M 140 95 L 130 145 L 114 140"}
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Other arm: hand on hip or in pocket */}
          <path
            d={
              isSCurve
                ? "M 60 95 L 40 145 L 75 160" // Hand on waist/hip
                : "M 60 95 L 50 160 L 70 200" // Hand in pocket
            }
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={isSCurve ? "75" : "70"} cy={isSCurve ? "160" : "200"} r="7" fill={currentTheme.stroke} />

          {/* Hips */}
          <line x1="70" y1="230" x2="130" y2="230" stroke={currentTheme.stroke} strokeWidth="3" />

          {/* Legs */}
          {/* Leg 1: straight bearing weight */}
          <line x1="82" y1="230" x2="80" y2="330" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="330" x2="80" y2="430" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="80" cy="435" rx="12" ry="5" fill={currentTheme.stroke} />

          {/* Leg 2: relaxed / crossed */}
          <line
            x1="118"
            y1="230"
            x2={isSCurve ? "105" : "130"}
            y2="330"
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1={isSCurve ? "105" : "130"}
            y1="330"
            x2={isSCurve ? "98" : "135"}
            y2="430"
            stroke={currentTheme.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <ellipse cx={isSCurve ? "98" : "135"} cy="435" rx="12" ry="5" fill={currentTheme.stroke} />

          {/* Floor ground line */}
          <line x1="40" y1="440" x2="160" y2="440" stroke={currentTheme.stroke} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        </g>
      );
    }

    // 4. Default Full-Body Standing (Normal, Walking, Fashion, Professional, Outdoor)
    const isWalking = type.includes('walk') || pose.subCategory?.includes('Walking');
    const hasWaist = type.includes('waist') || (!isMale && !isWalking);
    const hasPockets = type.includes('pocket') || isMale;

    return (
      <g id="standing-full-guide" transform="translate(100, 20)">
        {/* Head */}
        <circle cx="100" cy="45" r="26" fill={currentTheme.fill} stroke={currentTheme.stroke} strokeWidth="3" />
        {/* Face center crosshair */}
        <line x1="90" y1="45" x2="110" y2="45" stroke={currentTheme.stroke} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="100" y1="35" x2="100" y2="55" stroke={currentTheme.stroke} strokeWidth="1" strokeDasharray="2 2" />

        {/* Neck */}
        <line x1="100" y1="71" x2="100" y2="85" stroke={currentTheme.stroke} strokeWidth="3" />

        {/* Shoulder alignment bar */}
        <line
          x1={isMale ? "48" : "58"}
          y1="85"
          x2={isMale ? "152" : "142"}
          y2="85"
          stroke={currentTheme.stroke}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Torso */}
        <path
          d={
            isMale
              ? "M 55 85 L 68 210 L 132 210 L 145 85"
              : "M 62 85 Q 52 145 68 210 L 132 210 Q 148 145 138 85"
          }
          fill={currentTheme.fill}
          stroke={currentTheme.stroke}
          strokeWidth="3"
        />

        {/* Arm 1 */}
        <path
          d={
            hasWaist
              ? "M 62 85 L 35 145 L 68 160" // Hand on waist
              : hasPockets
              ? "M 55 85 L 42 155 L 65 195" // Hand in pocket
              : "M 55 85 L 45 155 L 40 215" // Relaxed at side
          }
          fill="none"
          stroke={currentTheme.stroke}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx={hasWaist ? "68" : hasPockets ? "65" : "40"} cy={hasWaist ? "160" : hasPockets ? "195" : "215"} r="7" fill={currentTheme.stroke} />

        {/* Arm 2 */}
        <path
          d={
            hasPockets
              ? "M 145 85 L 158 155 L 135 195" // Hand in pocket
              : "M 138 85 L 150 155 L 155 215" // Relaxed at side
          }
          fill="none"
          stroke={currentTheme.stroke}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx={hasPockets ? "135" : "155"} cy={hasPockets ? "195" : "215"} r="7" fill={currentTheme.stroke} />

        {/* Pelvis & Hip line */}
        <line x1="68" y1="210" x2="132" y2="210" stroke={currentTheme.stroke} strokeWidth="3" />

        {/* Legs: Standing or Stride */}
        {isWalking ? (
          <g id="walking-legs">
            {/* Front stride leg */}
            <line x1="82" y1="210" x2="65" y2="315" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="65" y1="315" x2="55" y2="425" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="50" cy="430" rx="14" ry="6" fill={currentTheme.stroke} />

            {/* Back trailing leg */}
            <line x1="118" y1="210" x2="135" y2="310" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="135" y1="310" x2="150" y2="420" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="155" cy="425" rx="12" ry="5" fill={currentTheme.stroke} />
          </g>
        ) : (
          <g id="standing-legs">
            {/* Left Leg */}
            <line x1="80" y1="210" x2="75" y2="320" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="75" y1="320" x2="72" y2="430" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="70" cy="435" rx="13" ry="5" fill={currentTheme.stroke} />

            {/* Right Leg (relaxed outward) */}
            <line x1="120" y1="210" x2="130" y2="320" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="130" y1="320" x2="138" y2="430" stroke={currentTheme.stroke} strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="142" cy="435" rx="13" ry="5" fill={currentTheme.stroke} />
          </g>
        )}

        {/* Alignment instructions text */}
        <text x="100" y="475" textAnchor="middle" fill={currentTheme.stroke} fontSize="11" fontWeight="600" letterSpacing="0.8">
          {pose.bodyPosition.slice(0, 36)}...
        </text>
      </g>
    );
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center select-none ${className}`}
      style={{
        opacity: opacity,
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale}) ${isMirrored ? 'scaleX(-1)' : ''}`,
        transition: 'transform 0.08s ease-out, opacity 0.15s ease-out',
      }}
    >
      <svg
        viewBox="0 0 400 520"
        className="w-full h-full max-w-md max-h-[85vh] drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="pose-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={currentTheme.glow} />
          </filter>
        </defs>

        <g filter="url(#pose-glow)">
          {renderAnatomyGuide()}
        </g>
      </svg>
    </div>
  );
};
