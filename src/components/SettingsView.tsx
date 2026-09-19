import React from 'react';
import {
  ShieldCheck,
  Lock,
  Volume2,
  Timer,
  Trash2,
  Smartphone,
  CheckCircle2,
  Camera,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { Gender, UserPreferences } from '../types';

interface SettingsViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (partial: Partial<UserPreferences>) => void;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
  onBack,
}) => {
  const [clearedNotice, setClearedNotice] = React.useState<string | null>(null);

  const handleClearHistory = () => {
    onUpdatePreferences({ recentlyViewed: [], recentlyCaptured: [] });
    setClearedNotice('View and capture history cleared.');
    setTimeout(() => setClearedNotice(null), 3000);
  };

  const handleClearFavorites = () => {
    onUpdatePreferences({ favorites: [] });
    setClearedNotice('Saved favorites cleared.');
    setTimeout(() => setClearedNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">App Settings & Privacy</h2>
          <p className="text-xs text-zinc-400">Configure your photography preferences and learn about our zero-storage privacy model.</p>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-700"
        >
          Done
        </button>
      </div>

      {clearedNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{clearedNotice}</span>
        </div>
      )}

      {/* Privacy Guarantee Box */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider">100% Client-Side Privacy Guarantee</h3>
        </div>
        <p className="text-xs text-emerald-100/80 leading-relaxed">
          Your photos are captured and processed directly in your browser's private sandbox memory. PosePerfect does not store, transmit, or catalog your photos on any server without explicit action. Your images stay on your device.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300 pt-1">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zero server-side photo storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Private localStorage only</span>
          </div>
        </div>
      </div>

      {/* Posing Preferences */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-400">
          Coaching Preferences
        </h3>

        {/* Default Gender Selection */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-xs text-white block">Default Pose Library</span>
            <span className="text-[11px] text-zinc-400">Which pose catalog opens by default</span>
          </div>
          <div className="flex rounded-xl bg-zinc-950 p-1 border border-white/10 text-xs">
            <button
              onClick={() => onUpdatePreferences({ gender: 'female' })}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                preferences.gender === 'female'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Female
            </button>
            <button
              onClick={() => onUpdatePreferences({ gender: 'male' })}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                preferences.gender === 'male'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Male
            </button>
          </div>
        </div>

        {/* Default Shutter Countdown */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div>
            <span className="font-semibold text-xs text-white block">Default Countdown Timer</span>
            <span className="text-[11px] text-zinc-400">Hands-free delay before photo snaps</span>
          </div>
          <div className="flex gap-1">
            {([0, 3, 5, 10] as const).map((secs) => (
              <button
                key={secs}
                onClick={() => onUpdatePreferences({ defaultTimer: secs })}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  preferences.defaultTimer === secs
                    ? 'bg-cyan-500 text-zinc-950 border-cyan-400'
                    : 'bg-zinc-950 text-zinc-400 border-white/10'
                }`}
              >
                {secs === 0 ? 'Off' : `${secs}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div>
            <span className="font-semibold text-xs text-white block">Audio Cues & Shutter Clicks</span>
            <span className="text-[11px] text-zinc-400">Synthesized audio countdown beep and camera snap sound</span>
          </div>
          <button
            onClick={() => onUpdatePreferences({ soundEnabled: !preferences.soundEnabled })}
            className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
              preferences.soundEnabled ? 'bg-cyan-500' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                preferences.soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Storage & Memory Management */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-400">
          Device Data & Cache
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-xs text-white block">Clear Saved Favorites</span>
            <span className="text-[11px] text-zinc-400">{preferences.favorites.length} poses currently saved</span>
          </div>
          <button
            onClick={handleClearFavorites}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-zinc-950 text-xs font-medium text-zinc-300 hover:text-rose-400 hover:border-rose-500/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div>
            <span className="font-semibold text-xs text-white block">Clear Recent Pose History</span>
            <span className="text-[11px] text-zinc-400">Reset recently viewed and captured history</span>
          </div>
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-zinc-950 text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-500/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Mobile Experience Tips */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 space-y-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Smartphone className="h-4 w-4 text-cyan-400" />
          <span>Mobile Phone Best Practice</span>
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          For the smoothest experience while out at a cafe, park, or photoshoot, tap your browser's share icon and select <strong className="text-white">"Add to Home Screen"</strong>. This launches PosePerfect in full-screen immersion without browser address bars obscuring the camera guide.
        </p>
      </div>
    </div>
  );
};
