import React from 'react';
import { Pose } from '../types';

interface PoseIllustrationProps {
  pose: Pose;
  className?: string;
  showBadges?: boolean;
}

export const PoseIllustration: React.FC<PoseIllustrationProps> = ({
  pose,
  className = '',
  showBadges = true,
}) => {
  const isMale = pose.gender === 'male';

  // Palette according to location
  const getLocationGradient = () => {
    const locStr = Array.isArray(pose.location) ? pose.location.join(' ') : (pose.location || '');
    if (locStr.includes('cafe')) return 'from-amber-950/40 via-stone-900 to-stone-950';
    if (locStr.includes('beach')) return 'from-sky-950/40 via-amber-950/30 to-stone-950';
    if (locStr.includes('street') || locStr.includes('urban')) return 'from-zinc-800/40 via-zinc-900 to-stone-950';
    if (locStr.includes('home') || locStr.includes('bedroom')) return 'from-rose-950/30 via-stone-900 to-stone-950';
    if (locStr.includes('office') || locStr.includes('studio')) return 'from-indigo-950/30 via-slate-900 to-stone-950';
    if (locStr.includes('nature') || locStr.includes('park')) return 'from-emerald-950/30 via-stone-900 to-stone-950';
    return 'from-zinc-800/30 via-stone-900 to-stone-950';
  };

  const getDifficultyColor = () => {
    switch (pose.difficulty) {
      case 'beginner':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'intermediate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'advanced':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
    }
  };

  // Human silhouette rendering
  const renderSilhouette = () => {
    const type = pose.svgType;

    // Close-up / Selfie poses
    if (type.startsWith('selfie-')) {
      const isSide = type.includes('side') || type.includes('looking-away');
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-56" preserveAspectRatio="xMidYMid meet">
          {/* Soft background glow */}
          <circle cx="100" cy="110" r="70" fill={isMale ? 'rgba(59, 130, 246, 0.08)' : 'rgba(244, 63, 94, 0.08)'} />
          {/* Torso */}
          <path
            d="M 40 240 L 45 190 Q 60 170 100 170 Q 140 170 155 190 L 160 240 Z"
            fill="currentColor"
            className="text-zinc-600 dark:text-zinc-500 opacity-90"
          />
          {/* Neck */}
          <rect x="88" y="130" width="24" height="42" rx="4" fill="currentColor" className="text-zinc-400 opacity-90" />
          {/* Head */}
          <ellipse
            cx={isSide ? "94" : "100"}
            cy="90"
            rx="36"
            ry="46"
            fill="currentColor"
            className="text-zinc-300 dark:text-zinc-200"
          />
          {/* Hair silhouette */}
          {isMale ? (
            <path
              d="M 64 85 C 64 50 136 50 136 85 C 130 65 110 58 100 58 C 88 58 70 65 64 85 Z"
              fill="currentColor"
              className="text-zinc-800 dark:text-zinc-900"
            />
          ) : (
            <path
              d="M 60 90 C 60 40 140 40 140 90 C 145 125 140 160 135 180 C 130 140 132 100 120 75 C 100 65 80 70 65 95 C 60 115 62 155 55 180 C 52 140 55 115 60 90 Z"
              fill="currentColor"
              className="text-zinc-800 dark:text-zinc-900"
            />
          )}

          {/* Hand/gesture if applicable */}
          {type.includes('hair') && (
            <path
              d="M 140 170 Q 165 130 145 75 Q 135 68 128 75"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-zinc-400 opacity-90"
            />
          )}
          {type.includes('chin') && (
            <path
              d="M 120 210 Q 130 170 115 135"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-zinc-400 opacity-90"
            />
          )}
        </svg>
      );
    }

    // Seated / Sitting poses
    if (type.startsWith('sit-') || pose.subCategory?.includes('Sitting')) {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-56" preserveAspectRatio="xMidYMid meet">
          {/* Seat ledge */}
          <line x1="20" y1="170" x2="180" y2="170" stroke="currentColor" strokeWidth="3" className="text-zinc-700" strokeDasharray="4 4" />
          {/* Head */}
          <circle cx="100" cy="45" r="18" fill="currentColor" className="text-zinc-300" />
          {/* Torso */}
          <path d="M 80 70 L 120 70 L 115 150 L 85 150 Z" fill="currentColor" className="text-zinc-400" />
          {/* Arms */}
          <path d="M 80 75 L 65 110 L 85 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-zinc-400" />
          <path d="M 120 75 L 135 110 L 115 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-zinc-400" />
          {/* Seated Thighs */}
          <line x1="90" y1="150" x2="70" y2="185" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-zinc-500" />
          <line x1="110" y1="150" x2="130" y2="185" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-zinc-500" />
          {/* Calves down to floor */}
          <line x1="70" y1="185" x2="75" y2="230" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-zinc-500" />
          <line x1="130" y1="185" x2="125" y2="230" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-zinc-500" />
        </svg>
      );
    }

    // Mirror Selfie (Full body with phone)
    if (type.startsWith('mirror-') || pose.category === 'mirror-selfie') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-56" preserveAspectRatio="xMidYMid meet">
          {/* Mirror frame outline */}
          <rect x="25" y="10" width="150" height="220" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-700/60" />
          {/* Head */}
          <circle cx="100" cy="40" r="16" fill="currentColor" className="text-zinc-300" />
          {/* Torso */}
          <path d="M 84 64 L 116 64 L 112 135 L 88 135 Z" fill="currentColor" className="text-zinc-400" />
          {/* Arm holding phone */}
          <path d="M 116 66 L 128 100 L 115 95" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-zinc-400" />
          {/* Smartphone */}
          <rect x="108" y="85" width="16" height="26" rx="3" fill="currentColor" className="text-cyan-400" />
          {/* Other arm */}
          <path d="M 84 66 L 72 100 L 88 115" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-zinc-400" />
          {/* Legs */}
          <line x1="93" y1="135" x2="90" y2="215" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-zinc-500" />
          <line x1="107" y1="135" x2="114" y2="215" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-zinc-500" />
        </svg>
      );
    }

    // Standard Standing Full Body (Pockets, Casual, Fashion)
    return (
      <svg viewBox="0 0 200 240" className="w-full h-full max-h-56" preserveAspectRatio="xMidYMid meet">
        {/* Soft background ambient glow */}
        <circle cx="100" cy="110" r="60" fill="currentColor" className="text-zinc-700/20" />
        {/* Head */}
        <circle cx="100" cy="36" r="16" fill="currentColor" className="text-zinc-300" />
        {/* Torso */}
        <path
          d={
            isMale
              ? "M 78 60 L 122 60 L 115 135 L 85 135 Z"
              : "M 82 60 Q 75 95 86 135 L 114 135 Q 125 95 118 60 Z"
          }
          fill="currentColor"
          className="text-zinc-400"
        />
        {/* Arms: Pockets or Waist */}
        <path
          d={
            isMale
              ? "M 78 62 L 68 105 L 88 125" // pocket
              : "M 82 62 L 68 100 L 88 110" // waist
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          className="text-zinc-400"
        />
        <path
          d={
            isMale
              ? "M 122 62 L 132 105 L 112 125" // pocket
              : "M 118 62 L 130 100 L 114 110" // waist
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          className="text-zinc-400"
        />
        {/* Legs */}
        <line x1="91" y1="135" x2="88" y2="225" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" className="text-zinc-500" />
        <line x1="109" y1="135" x2="116" y2="225" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" className="text-zinc-500" />
      </svg>
    );
  };

  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b ${getLocationGradient()} border border-white/5 flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Background visual texture/grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Actual photo representation if available */}
      {pose.image && !imgError ? (
        <div className="relative w-full h-full min-h-[170px] overflow-hidden">
          <img
            src={pose.image}
            alt={pose.title || pose.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
        </div>
      ) : (
        <div className="relative z-0 w-full flex items-center justify-center py-2 text-zinc-400 p-3">
          {renderSilhouette()}
        </div>
      )}

      {/* Top Badges */}
      {showBadges && (
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border uppercase backdrop-blur-md ${getDifficultyColor()}`}>
            {pose.category.replace('-', ' ')}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 backdrop-blur-md text-zinc-200 border border-white/15">
            {pose.cameraAngle}
          </span>
        </div>
      )}

      {/* Bottom Sub-tag */}
      {showBadges && (
        <div className="absolute bottom-2 left-2 right-2 text-center z-10 pointer-events-none">
          <p className="text-[11px] font-medium text-white/90 drop-shadow-md truncate px-1">
            {pose.distance || pose.cameraDistance}
          </p>
        </div>
      )}
    </div>
  );
};
