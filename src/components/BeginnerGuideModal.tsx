import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  User,
  Camera,
  MapPin,
  Smile,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { Gender, PoseCategory, PoseLocation, PoseMood, Pose, CategoryInfo } from '../types';
import { CATEGORIES, LOCATIONS, MOODS, LocationOption, MoodOption } from '../data/categories';
import { PoseIllustration } from './PoseIllustration';

interface BeginnerGuideModalProps {
  onClose: () => void;
  allPoses: Pose[];
  onSelectAndLaunchPose: (pose: Pose) => void;
  currentGender: Gender;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({
  onClose,
  allPoses,
  onSelectAndLaunchPose,
  currentGender,
}) => {
  const [tab, setTab] = useState<'wizard' | 'handbook'>('wizard');

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [wizardGender, setWizardGender] = useState<Gender>(currentGender);
  const [wizardCategory, setWizardCategory] = useState<PoseCategory>('selfie');
  const [wizardLocation, setWizardLocation] = useState<PoseLocation>('cafe');
  const [wizardMood, setWizardMood] = useState<PoseMood>('natural');

  // Compute matched recommendations for step 5
  const getTopRecommendations = (): Pose[] => {
    const pool = allPoses.filter((p) => p.gender === wizardGender);

    // Score poses based on criteria
    const scored = pool.map((p) => {
      let score = 0;
      if (p.category === wizardCategory) score += 4;
      if (Array.isArray(p.location) ? p.location.includes(wizardLocation) : (p.location as string) === wizardLocation) score += 3;
      if (Array.isArray(p.mood) ? p.mood.includes(wizardMood) : (p.mood as string) === wizardMood) score += 2;
      return { pose: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((s) => s.pose);
  };

  const top3 = getTopRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-zinc-900 shadow-2xl text-zinc-100 flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-zinc-900/95 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Pose Coach & Wizard</h2>
              <p className="text-[11px] text-zinc-400">Step-by-step guidance for effortless photography</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-zinc-950 p-1 border border-white/10 text-xs">
              <button
                onClick={() => setTab('wizard')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  tab === 'wizard' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Guided Wizard
              </button>
              <button
                onClick={() => setTab('handbook')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  tab === 'handbook' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Posing Secrets
              </button>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Guided 5-Step Wizard */}
        {tab === 'wizard' && (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Step Progress Dots */}
            <div className="flex items-center justify-between max-w-sm mx-auto">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      step === s
                        ? 'bg-cyan-500 text-zinc-950 ring-4 ring-cyan-500/20'
                        : step > s
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  {s < 5 && <div className={`h-0.5 w-6 sm:w-10 ${step > s ? 'bg-emerald-500' : 'bg-zinc-800'}`} />}
                </div>
              ))}
            </div>

            {/* STEP 1: GENDER */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step 1 of 5</span>
                  <h3 className="text-xl font-bold text-white">Who are you posing for?</h3>
                  <p className="text-xs text-zinc-400">We keep male and female poses strictly distinct for the most natural fits.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                  <button
                    onClick={() => setWizardGender('female')}
                    className={`p-5 rounded-2xl border text-center transition-all ${
                      wizardGender === 'female'
                        ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40 text-white'
                        : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                      F
                    </div>
                    <span className="font-bold block text-sm">Female Poses</span>
                    <span className="text-[11px] text-zinc-400">Curated 52 positions</span>
                  </button>

                  <button
                    onClick={() => setWizardGender('male')}
                    className={`p-5 rounded-2xl border text-center transition-all ${
                      wizardGender === 'male'
                        ? 'border-blue-500 bg-blue-500/15 ring-2 ring-blue-500/40 text-white'
                        : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                      M
                    </div>
                    <span className="font-bold block text-sm">Male Poses</span>
                    <span className="text-[11px] text-zinc-400">Curated 52 positions</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CATEGORY */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step 2 of 5</span>
                  <h3 className="text-xl font-bold text-white">What type of photo are you taking?</h3>
                  <p className="text-xs text-zinc-400">Pick the style that matches your goal today.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {CATEGORIES.slice(0, 6).map((c: CategoryInfo) => (
                    <button
                      key={c.id}
                      onClick={() => setWizardCategory(c.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        wizardCategory === c.id
                          ? 'border-cyan-500 bg-cyan-500/15 text-white ring-1 ring-cyan-500'
                          : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="font-bold block text-xs text-white mb-0.5">{c.name}</span>
                      <span className="text-[11px] text-zinc-400 line-clamp-2">{c.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: LOCATION */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step 3 of 5</span>
                  <h3 className="text-xl font-bold text-white">Where are you right now?</h3>
                  <p className="text-xs text-zinc-400">We optimize props, surfaces, and lighting for your setting.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {LOCATIONS.map((loc: LocationOption) => (
                    <button
                      key={loc.id}
                      onClick={() => setWizardLocation(loc.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        wizardLocation === loc.id
                          ? 'border-cyan-500 bg-cyan-500/15 text-white ring-1 ring-cyan-500'
                          : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="font-bold block text-xs text-white mb-0.5">{loc.name}</span>
                      <span className="text-[10px] text-zinc-400">{loc.tip}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: MOOD */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step 4 of 5</span>
                  <h3 className="text-xl font-bold text-white">What vibe do you want?</h3>
                  <p className="text-xs text-zinc-400">Choose the emotion you want to convey in the image.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {MOODS.map((m: MoodOption) => (
                    <button
                      key={m.id}
                      onClick={() => setWizardMood(m.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        wizardMood === m.id
                          ? 'border-cyan-500 bg-cyan-500/15 text-white ring-1 ring-cyan-500'
                          : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="font-bold block text-xs text-white mb-0.5">{m.name}</span>
                      <span className="text-[10px] text-zinc-400">{m.prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: RECOMMENDATIONS */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 5 of 5 • Tailored Matches</span>
                  <h3 className="text-xl font-bold text-white">Top 3 Poses For Your Moment</h3>
                  <p className="text-xs text-zinc-400">Tap any pose to immediately open the camera with its custom ghost overlay.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {top3.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => onSelectAndLaunchPose(rec)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-zinc-950/80 p-3 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <PoseIllustration pose={rec} className="h-36" showBadges={false} />
                        <h4 className="mt-2 text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {rec.title || rec.name}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">
                          {rec.description || (rec.instructions && rec.instructions[0])}
                        </p>
                      </div>

                      <button className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 py-2 text-xs font-semibold group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all">
                        <Camera className="h-3.5 w-3.5" />
                        <span>Launch Camera</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-40"
              >
                Back
              </button>

              {step < 5 ? (
                <button
                  onClick={() => setStep((s) => Math.min(5, s + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Posing Handbook & Secrets */}
        {tab === 'handbook' && (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">The 5 Golden Rules of Natural Posing</h3>
              <p className="text-xs text-zinc-400">Remember these simple body adjustments next time you stand in front of a lens.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-1.5">
                <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  1. The "Awkward Hands" Fix
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  Never let both hands dangle limp like dead weights. Give them a job: tuck thumbs into pockets, lightly adjust glasses or jacket lapels, hold an iced coffee, or rest one hand gently on your mid-waist.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-1.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  2. Weight Distribution (The 80/20 Stance)
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  Avoid standing squarely like a soldier with equal weight on both feet. Shift 80% of your weight to your back foot. Point the front foot slightly toward the camera to naturally lengthen your silhouette.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-1.5">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  3. Drop Shoulders & Breathe Out
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  When someone counts down "3, 2, 1", people unconsciously tense their trap muscles and freeze their breath. Take a deep inhale, exhale fully through parted lips, and drop your shoulder blades down your back right before the snap.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-1.5">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  4. The Subtle 45° Body Turn
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  Facing the camera dead-center flattens your frame and widens your shoulders. Turn your torso 30° to 45° away from the lens, then turn your face back toward the camera for depth and jawline definition.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-1.5">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  5. Lens Height vs. Perspective
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  For full body shots, hold the camera at stomach/waist level and tilt slightly up to make legs look longer. For selfies, hold the phone slightly above eye level and angle downward.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
