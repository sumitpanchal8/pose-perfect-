import React from 'react';
import { Camera, Sparkles, Heart, Shuffle, HelpCircle, Settings, User, Upload } from 'lucide-react';
import { Gender } from '../types';

interface NavbarProps {
  gender: Gender;
  onSelectGender: (g: Gender) => void;
  onOpenRandom: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  onOpenGuide: () => void;
  onOpenSettings: () => void;
  onNavigateHome: () => void;
  onOpenUpload: () => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  gender,
  onSelectGender,
  onOpenRandom,
  onOpenFavorites,
  favoritesCount,
  onOpenGuide,
  onOpenSettings,
  onNavigateHome,
  onOpenUpload,
  currentView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={onNavigateHome}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">PosePerfect</span>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-cyan-400 border border-cyan-500/30">
                PRO COACH
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">Personal photography pose coach</p>
          </div>
        </button>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Gender Selector Toggle */}
          <div className="flex items-center rounded-xl bg-zinc-900 p-0.5 border border-white/10">
            <button
              id="gender-toggle-female"
              onClick={() => onSelectGender('female')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                gender === 'female'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Female</span>
            </button>
            <button
              id="gender-toggle-male"
              onClick={() => onSelectGender('male')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                gender === 'male'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Male</span>
            </button>
          </div>

          {/* Upload Pose Picture Button */}
          <button
            id="nav-upload-pose-btn"
            onClick={onOpenUpload}
            title="Upload photo for Traditional, Professional, Mirror Selfie, or Aesthetic"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 active:scale-95 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload Photo</span>
          </button>

          {/* Random Pose Button */}
          <button
            id="nav-random-pose-btn"
            onClick={onOpenRandom}
            title="Surprise me with a random pose"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/90 px-2.5 text-xs font-medium text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-zinc-850 active:scale-95 transition-all"
          >
            <Shuffle className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Random Pose</span>
          </button>

          {/* Favorites Button */}
          <button
            id="nav-favorites-btn"
            onClick={onOpenFavorites}
            title="Saved Favorite Poses"
            className={`relative flex h-9 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-medium transition-all ${
              currentView === 'favorites'
                ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                : 'border-white/10 bg-zinc-900/90 text-zinc-300 hover:text-rose-400 hover:border-rose-500/30'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Beginner Guide Wizard Button */}
          <button
            id="nav-guide-btn"
            onClick={onOpenGuide}
            title="Pose Coaching & Beginner Guide"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/90 px-2.5 text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-500/30 active:scale-95 transition-all"
          >
            <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">How To Pose</span>
          </button>

          {/* Settings / Privacy */}
          <button
            id="nav-settings-btn"
            onClick={onOpenSettings}
            title="Settings & Privacy"
            aria-label="Settings"
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              currentView === 'settings'
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                : 'border-white/10 bg-zinc-900/90 text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
