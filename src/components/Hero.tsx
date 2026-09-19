import React from 'react';
import { Sparkles, Camera, ArrowRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import { Gender, Pose } from '../types';
import { PoseIllustration } from './PoseIllustration';

interface HeroProps {
  gender: Gender;
  onSelectGender: (g: Gender) => void;
  dailyPose: Pose;
  onSelectPose: (pose: Pose) => void;
  onQuickStartCamera: (pose: Pose) => void;
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  gender,
  onSelectGender,
  dailyPose,
  onSelectPose,
  onQuickStartCamera,
  onOpenGuide,
}) => {
  return (
    <div className="relative overflow-hidden pt-4 pb-8 border-b border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute top-10 right-1/4 -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Headline, Value Proposition & Workflow */}
          <div className="lg:col-span-7 space-y-4">
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

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
              No more awkward hands or stiff posture. Choose your gender, pick your vibe or setting, and match the transparent pose guide directly over your live camera.
            </p>

            {/* Quick Gender Mode Selection Box */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                1. Select Pose Collection:
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md">
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
                    <h3 className="text-sm font-semibold text-white">Female Poses</h3>
                    <p className="text-[11px] text-zinc-400">52 Curated Poses</p>
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
                    <h3 className="text-sm font-semibold text-white">Male Poses</h3>
                    <p className="text-[11px] text-zinc-400">52 Curated Poses</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Value Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-cyan-400" />
                Live Camera Ghost Overlay
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                100% Client-Side Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                AI Posture Feedback
              </span>
            </div>
          </div>

          {/* Right Column: Featured Pose of the Day card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Pose of the Day
                  </span>
                </div>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300 border border-white/10">
                  {dailyPose.location} • {dailyPose.difficulty}
                </span>
              </div>

              <div className="mt-3 cursor-pointer group" onClick={() => onSelectPose(dailyPose)}>
                <PoseIllustration pose={dailyPose} className="h-56 group-hover:scale-[1.01] transition-transform" />
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {dailyPose.title || dailyPose.name}
                  </h3>
                  <span className="text-xs text-zinc-400">{dailyPose.cameraAngle}</span>
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {dailyPose.description || (dailyPose.instructions && dailyPose.instructions[0])}
                </p>

                {/* Hand & Leg quick cue */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-zinc-400">
                  <div className="bg-zinc-950/60 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 font-medium block">Hands:</span>
                    <span className="text-zinc-200 truncate block">{dailyPose.handPosition}</span>
                  </div>
                  <div className="bg-zinc-950/60 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 font-medium block">Position:</span>
                    <span className="text-zinc-200 truncate block">{dailyPose.legPosition || dailyPose.bodyPosition}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    id="hero-daily-pose-camera-btn"
                    onClick={() => onQuickStartCamera(dailyPose)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Try Pose In Camera</span>
                  </button>
                  <button
                    id="hero-daily-pose-details-btn"
                    onClick={() => onSelectPose(dailyPose)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-zinc-800 px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 active:scale-95 transition-all"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
