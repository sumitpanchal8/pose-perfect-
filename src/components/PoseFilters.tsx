import React from 'react';
import { Search, X, SlidersHorizontal, MapPin, Smile, Layers } from 'lucide-react';
import { CategoryInfo, PoseCategory, PoseDifficulty, PoseLocation, PoseMood } from '../types';
import { CATEGORIES, LOCATIONS, MOODS, LocationOption, MoodOption } from '../data/categories';

interface PoseFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: PoseCategory | 'all';
  onSelectCategory: (c: PoseCategory | 'all') => void;
  selectedLocation: PoseLocation | 'all';
  onSelectLocation: (l: PoseLocation | 'all') => void;
  selectedMood: PoseMood | 'all';
  onSelectMood: (m: PoseMood | 'all') => void;
  selectedDifficulty: PoseDifficulty | 'all';
  onSelectDifficulty: (d: PoseDifficulty | 'all') => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const PoseFilters: React.FC<PoseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedLocation,
  onSelectLocation,
  selectedMood,
  onSelectMood,
  selectedDifficulty,
  onSelectDifficulty,
  onResetFilters,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedLocation !== 'all' ||
    selectedMood !== 'all' ||
    selectedDifficulty !== 'all';

  return (
    <div className="space-y-3 pt-4">
      {/* Primary Row: Search Input + Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            id="pose-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search poses (e.g., 'cafe', 'mirror selfie', 'hands in pocket', 'stairs')..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900/90 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Advanced filter drawer toggle */}
          <button
            id="toggle-advanced-filters-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
              showAdvanced || hasActiveFilters
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                : 'border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-zinc-950">
                •
              </span>
            )}
          </button>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              id="reset-filters-btn"
              onClick={onResetFilters}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-all"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Scrolling Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-white text-zinc-950 font-semibold shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <Layers className="h-3 w-3" />
          <span>All Poses ({totalResults})</span>
        </button>

        {CATEGORIES.map((cat: CategoryInfo, idx: number) => {
          const isCustom = cat.id === 'custom';
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-zinc-950 font-semibold shadow-sm shadow-cyan-500/20'
                  : isCustom
                  ? 'bg-gradient-to-r from-cyan-950/70 to-emerald-950/70 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:text-white'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              <span className={`text-[10px] font-bold px-1 rounded ${isSelected ? 'bg-zinc-950/20 text-zinc-950' : isCustom ? 'bg-cyan-500/30 text-cyan-200' : 'bg-zinc-800 text-cyan-400'}`}>
                {idx + 1}
              </span>
              <span>{cat.name}</span>
              {isCustom && <span className="text-[11px]">📸</span>}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Drawer (Location, Mood, Difficulty) */}
      {showAdvanced && (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 space-y-3.5 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Location Row */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-2">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>Setting / Location</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectLocation('all')}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  selectedLocation === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                    : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                All Settings
              </button>
              {LOCATIONS.map((loc: LocationOption) => (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocation(loc.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    selectedLocation === loc.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                      : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Row */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-2">
              <Smile className="h-3.5 w-3.5 text-amber-400" />
              <span>Mood & Vibe</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectMood('all')}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  selectedMood === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                    : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                All Vibes
              </button>
              {MOODS.map((mood: MoodOption) => (
                <button
                  key={mood.id}
                  onClick={() => onSelectMood(mood.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    selectedMood === mood.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                      : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {mood.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Row */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-2">
              <span>Difficulty Level</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSelectDifficulty(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${
                    selectedDifficulty === lvl
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
