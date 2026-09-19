import React from 'react';
import { Sparkles, Camera, ShieldCheck, Zap } from 'lucide-react';
import { Gender } from '../types';

interface HeroProps {
  gender: Gender;
  onSelectGender: (g: Gender) => void;
  dailyPose?: any;
  onSelectPose?: (pose: any) => void;
  onQuickStartCamera?: (pose: any) => void;
  onOpenGuide?: () => void;
  onOpenUpload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  gender,
  onSelectGender,
  onOpenUpload,
}) => {
  return (
    <div className="relative overflow-hidden pt-4 pb-8 border-b border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute top-10 right-1/4 -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Personal Photography Pose Coach</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Don’t know how to pose? <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              We’ll show you exactly what to do.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            No more awkward hands or stiff posture. Choose who you are, select your photo style (Traditional, Professional, Mirror Selfie, Aesthetic, or Upload Your Own), and match the 60% transparent pose guide directly in your live camera.
          </p>

          {/* Quick Upload Your Own Picture & Pose CTA */}
          {onOpenUpload && (
            <div className="pt-1 flex justify-center">
              <button
                id="hero-upload-pose-cta-btn"
                onClick={onOpenUpload}
                className="group flex items-center gap-3 rounded-2xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 via-zinc-900/90 to-emerald-500/20 px-5 py-2.5 text-xs font-bold text-white hover:border-cyan-400 hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all shadow-xl shadow-cyan-500/10 active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-zinc-950 shadow-md">
                  <Camera className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-xs sm:text-sm">Upload Your Own Picture & Pose</span>
                    <span className="rounded-full bg-cyan-400/20 px-1.5 py-0.5 text-[9px] font-extrabold text-cyan-300 border border-cyan-400/30">
                      OPTION 5
                    </span>
                  </div>
                  <span className="block text-[11px] text-zinc-400 font-normal">
                    Choose any photo you like → Pose according to it in camera → Click picture
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Quick Gender Mode Selection Box */}
          <div className="pt-2 flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
              1. Select Gender:
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <button
                id="hero-gender-female-card"
                onClick={() => onSelectGender('female')}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  gender === 'female'
                    ? 'border-rose-500/60 bg-rose-500/15 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500'
                    : 'border-white/10 bg-zinc-900/60 hover:border-white/20 text-zinc-400 hover:text-white'
                }`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm ${gender === 'female' ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                  F
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Female</h3>
                  <p className="text-[11px] text-zinc-400">4 Curated Poses</p>
                </div>
              </button>

              <button
                id="hero-gender-male-card"
                onClick={() => onSelectGender('male')}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  gender === 'male'
                    ? 'border-blue-500/60 bg-blue-500/15 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                    : 'border-white/10 bg-zinc-900/60 hover:border-white/20 text-zinc-400 hover:text-white'
                }`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                  M
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Male</h3>
                  <p className="text-[11px] text-zinc-400">4 Curated Poses</p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5 text-cyan-400" />
              Live Camera Ghost Overlay (60% Transparent)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Direct Photo Replacement & Upload
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
