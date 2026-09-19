import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Gender,
  Pose,
  PoseCategory,
  PoseDifficulty,
  PoseLocation,
  PoseMood,
  UserPreferences,
} from './types';
import { ALL_POSES, getPoseOfTheDay, filterPoses } from './data/poses';
import {
  loadUserPreferences,
  saveUserPreferences,
  toggleFavoritePose,
  addRecentlyViewed,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PoseFilters } from './components/PoseFilters';
import { PoseCard } from './components/PoseCard';
import { PoseDetailsModal } from './components/PoseDetailsModal';
import { CameraView } from './components/CameraView';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { SettingsView } from './components/SettingsView';
import { UploadPoseModal } from './components/UploadPoseModal';
import {
  loadCustomPoses,
  saveCustomPose,
  loadImageOverrides,
  saveImageOverride,
} from './utils/storage';
import { Heart, Sparkles, Shuffle, Camera, BookOpen, AlertCircle, Upload } from 'lucide-react';

export default function App() {
  // User Preferences State (persisted to localStorage)
  const [preferences, setPreferences] = useState<UserPreferences>(loadUserPreferences);

  // App View State ('catalog' | 'favorites' | 'settings' | 'camera')
  const [currentView, setCurrentView] = useState<'catalog' | 'favorites' | 'settings' | 'camera'>('catalog');

  // Custom Poses & Image Overrides State
  const [customPoses, setCustomPoses] = useState<Pose[]>(loadCustomPoses);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>(loadImageOverrides);

  // Active Poses State
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
  const [cameraPose, setCameraPose] = useState<Pose | null>(null);

  // Modals
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const quickUploadInputRef = useRef<HTMLInputElement | null>(null);

  // Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PoseCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<PoseLocation | 'all'>('all');
  const [selectedMood, setSelectedMood] = useState<PoseMood | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<PoseDifficulty | 'all'>('all');

  // Handle Save New Custom Pose
  const handleSaveCustomPose = (newPose: Pose) => {
    const updated = saveCustomPose(newPose);
    setCustomPoses(updated);
  };

  // Quick direct upload chosen picture & start camera immediately
  const handleQuickUploadAndLaunchCamera = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const newPose: Pose = {
          id: `custom-${Date.now()}`,
          name: cleanName || 'My Chosen Reference Pose',
          title: cleanName || 'My Chosen Reference Pose',
          gender: preferences.gender,
          category: 'custom',
          subCategory: 'Upload Your Own',
          difficulty: 'beginner',
          location: ['indoor', 'outdoor', 'studio'],
          mood: ['aesthetic'],
          image: dataUrl,
          isCustomUpload: true,
          instructions: [
            'Align your posture with the 60% transparent photo guide on screen',
            'Adjust your camera distance and body angle to match your chosen picture',
            'Tap the shutter button to click your photo!',
          ],
          description: 'Uploaded reference picture for posing in camera mode.',
          bodyPosition: 'Align posture with the 60% transparent photo guide on screen.',
          handPosition: 'Position hands as displayed in your chosen picture.',
          headPosition: 'Tilt head to match eye-line of reference.',
          cameraAngle: 'Eye level or matched to photo reference',
          cameraDistance: 'Medium shot (approx. 4–6 feet)',
          lighting: 'Natural soft light',
          framing: 'Align yourself within the 60% transparent frame',
          backgroundTip: 'Clean background matching reference style',
          tags: ['custom', 'chosen-photo', 'upload-your-own'],
          svgType: 'custom-pose',
        };
        handleSaveCustomPose(newPose);
        setCameraPose(newPose);
        setSelectedPose(null);
        setCurrentView('camera');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Replace Photo on Existing Pose
  const handleReplaceImage = (poseId: string, dataUrl: string) => {
    const updated = saveImageOverride(poseId, dataUrl);
    setImageOverrides({ ...updated });
    if (selectedPose && selectedPose.id === poseId) {
      setSelectedPose({ ...selectedPose, image: dataUrl });
    }
  };

  // Combine static ALL_POSES with custom poses and apply image overrides
  const allMergedPoses = useMemo(() => {
    const combined = [...customPoses, ...ALL_POSES];
    return combined.map((p) => {
      if (imageOverrides[p.id]) {
        return { ...p, image: imageOverrides[p.id] };
      }
      return p;
    });
  }, [customPoses, imageOverrides]);

  // Handle Gender Switch
  const handleSelectGender = (newGender: Gender) => {
    const updated = saveUserPreferences({ gender: newGender });
    setPreferences(updated);
    // Reset category if switching gender to show full library
  };

  // Update preferences helper
  const handleUpdatePreferences = (partial: Partial<UserPreferences>) => {
    const updated = saveUserPreferences(partial);
    setPreferences(updated);
  };

  // Poses for currently selected gender
  const currentGenderPoses = useMemo(() => {
    return allMergedPoses.filter((p: Pose) => p.gender === preferences.gender);
  }, [allMergedPoses, preferences.gender]);

  // Daily Pose based on selected gender
  const dailyPose = useMemo(() => {
    return getPoseOfTheDay(preferences.gender);
  }, [preferences.gender]);

  // Filtered poses list
  const filteredPoses = useMemo(() => {
    let pool = currentGenderPoses;

    // If favorites view is active
    if (currentView === 'favorites') {
      pool = pool.filter((p: Pose) => preferences.favorites.includes(p.id));
    }

    return filterPoses(pool, {
      category: selectedCategory,
      location: selectedLocation,
      mood: selectedMood,
      difficulty: selectedDifficulty,
      searchQuery: searchQuery,
    });
  }, [
    currentGenderPoses,
    currentView,
    preferences.favorites,
    selectedCategory,
    selectedLocation,
    selectedMood,
    selectedDifficulty,
    searchQuery,
  ]);

  // Toggle Favorite
  const handleToggleFavorite = (poseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = toggleFavoritePose(poseId);
    setPreferences(loadUserPreferences());
  };

  // Open Pose Details
  const handleOpenPoseDetails = (pose: Pose) => {
    addRecentlyViewed(pose.id);
    setSelectedPose(pose);
  };

  // Launch Camera with Pose
  const handleLaunchCamera = (pose: Pose, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCameraPose(pose);
    setSelectedPose(null);
    setCurrentView('camera');
  };

  // Surprise / Random Pose Selector
  const handleOpenRandomPose = () => {
    const pool = currentGenderPoses;
    if (pool.length === 0) return;
    const randomIdx = Math.floor(Math.random() * pool.length);
    handleOpenPoseDetails(pool[randomIdx]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedMood('all');
    setSelectedDifficulty('all');
  };

  // Prev / Next Pose Navigation inside Details Modal
  const currentDetailIdx = selectedPose
    ? filteredPoses.findIndex((p: Pose) => p.id === selectedPose.id)
    : -1;

  const handleNextDetailPose = () => {
    if (filteredPoses.length <= 1 || currentDetailIdx === -1) return;
    const next = (currentDetailIdx + 1) % filteredPoses.length;
    setSelectedPose(filteredPoses[next]);
  };

  const handlePrevDetailPose = () => {
    if (filteredPoses.length <= 1 || currentDetailIdx === -1) return;
    const prev = (currentDetailIdx - 1 + filteredPoses.length) % filteredPoses.length;
    setSelectedPose(filteredPoses[prev]);
  };

  // 1. FULL-SCREEN CAMERA VIEW
  if (currentView === 'camera' && cameraPose) {
    return (
      <CameraView
        pose={cameraPose}
        allPoses={currentGenderPoses}
        onBackToPoses={() => {
          setCurrentView('catalog');
          setCameraPose(null);
        }}
        onSelectPose={(newPose) => setCameraPose(newPose)}
        onSaveCustomPose={handleSaveCustomPose}
        soundEnabled={preferences.soundEnabled}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Fixed Navbar */}
      <Navbar
        gender={preferences.gender}
        onSelectGender={handleSelectGender}
        onOpenRandom={handleOpenRandomPose}
        onOpenFavorites={() => {
          setCurrentView(currentView === 'favorites' ? 'catalog' : 'favorites');
        }}
        favoritesCount={preferences.favorites.length}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenSettings={() => {
          setCurrentView(currentView === 'settings' ? 'catalog' : 'settings');
        }}
        onOpenUpload={() => setShowUploadModal(true)}
        onNavigateHome={() => setCurrentView('catalog')}
        currentView={currentView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Settings & Privacy View */}
        {currentView === 'settings' ? (
          <SettingsView
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onBack={() => setCurrentView('catalog')}
          />
        ) : (
          <>
            {/* Hero Section (only shown in full catalog view) */}
            {currentView === 'catalog' && (
              <Hero
                gender={preferences.gender}
                onSelectGender={handleSelectGender}
                dailyPose={dailyPose}
                onSelectPose={handleOpenPoseDetails}
                onQuickStartCamera={(p) => handleLaunchCamera(p)}
                onOpenGuide={() => setShowGuideModal(true)}
                onOpenUpload={() => quickUploadInputRef.current?.click()}
              />
            )}

            {/* Catalog / Favorites Section */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
              
              {/* Header Title if in Favorites View */}
              {currentView === 'favorites' && (
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <Heart className="h-5 w-5 fill-rose-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Your Saved Favorite Poses</h2>
                      <p className="text-xs text-zinc-400">Quickly access the poses you love most while out taking photos.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('catalog')}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white"
                  >
                    Back to All Poses
                  </button>
                </div>
              )}

              {/* Search & Multi-facet Filter Bar */}
              <PoseFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                selectedMood={selectedMood}
                onSelectMood={setSelectedMood}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={setSelectedDifficulty}
                onResetFilters={handleResetFilters}
                totalResults={filteredPoses.length}
              />

              {/* Option 5: Upload Your Own Reference Banner */}
              {selectedCategory === 'custom' && (
                <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-zinc-900/90 to-emerald-950/30 p-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                        <span>OPTION 5</span>
                        <span>•</span>
                        <span>Upload Your Own & Pose</span>
                      </div>
                      <h3 className="text-base font-bold text-white">Pose According to Any Picture You Choose</h3>
                      <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                        Select any picture you like (Pinterest, Instagram, fashion shot, or photo of a friend). We'll superimpose it directly onto your live camera at 60% transparency so you can pose like it and click your photo!
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        id="quick-upload-chosen-picture-btn"
                        onClick={() => quickUploadInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Choose Picture & Start Camera</span>
                      </button>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-semibold hover:text-white hover:bg-zinc-700 active:scale-95 transition-all"
                      >
                        <span>Add with Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Poses Grid */}
              {filteredPoses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPoses.map((pose: Pose) => (
                    <PoseCard
                      key={pose.id}
                      pose={pose}
                      isFavorite={preferences.favorites.includes(pose.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectPose={handleOpenPoseDetails}
                      onLaunchCamera={handleLaunchCamera}
                    />
                  ))}
                </div>
              ) : selectedCategory === 'custom' ? (
                /* Dedicated Empty state for Option 5 (Upload Your Own) */
                <div className="rounded-3xl border border-cyan-500/30 bg-zinc-900/60 p-12 text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mx-auto">
                    <Camera className="h-8 w-8" />
                  </div>
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="text-lg font-bold text-white">Upload Your Chosen Picture to Pose</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Choose any photo you like from your phone or device. Your live camera will open with this photo as a 60% transparent guide so you can match the posture and click your picture!
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      id="empty-state-choose-picture-btn"
                      onClick={() => quickUploadInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Select Picture from Device & Pose</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty state */
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-12 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400 mx-auto">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">No matching poses found</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    {currentView === 'favorites'
                      ? "You haven't saved any favorite poses yet. Tap the heart icon on any pose to save it for quick access."
                      : "No poses match your current search and filter combination. Try clearing your filters or searching for terms like 'pocket', 'cafe', or 'sitting'."}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 active:scale-95 transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950/90 py-8 text-xs text-zinc-400 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500 text-zinc-950 font-black text-xs">
              P
            </div>
            <span className="font-bold text-white">PosePerfect</span>
            <span className="text-zinc-600">|</span>
            <span>Personal Photography Pose Coach</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setShowGuideModal(true)} className="hover:text-white transition-colors">
              Posing Secrets
            </button>
            <button onClick={() => setCurrentView('settings')} className="hover:text-white transition-colors">
              Privacy Guarantee
            </button>
            <button onClick={handleOpenRandomPose} className="hover:text-cyan-400 transition-colors">
              Random Pose
            </button>
          </div>

          <p className="text-[11px] text-zinc-400">
            100% Client-Side Processing • Zero Cloud Photo Storage
          </p>
        </div>
      </footer>

      {/* Pose Details Modal */}
      {selectedPose && (
        <PoseDetailsModal
          pose={selectedPose}
          onClose={() => setSelectedPose(null)}
          onLaunchCamera={(p) => handleLaunchCamera(p)}
          isFavorite={preferences.favorites.includes(selectedPose.id)}
          onToggleFavorite={handleToggleFavorite}
          onNavigateNext={handleNextDetailPose}
          onNavigatePrev={handlePrevDetailPose}
          onReplaceImage={handleReplaceImage}
        />
      )}

      {/* Beginner Guide & Wizard Modal */}
      {showGuideModal && (
        <BeginnerGuideModal
          onClose={() => setShowGuideModal(false)}
          allPoses={allMergedPoses}
          currentGender={preferences.gender}
          onSelectAndLaunchPose={(pose) => {
            setShowGuideModal(false);
            handleLaunchCamera(pose);
          }}
        />
      )}

      {/* Upload Pose Photo Modal */}
      {showUploadModal && (
        <UploadPoseModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          defaultGender={preferences.gender}
          defaultCategory={selectedCategory !== 'all' ? selectedCategory : 'traditional'}
          onSavePose={handleSaveCustomPose}
          onLaunchCamera={(pose) => handleLaunchCamera(pose)}
        />
      )}

      {/* Quick Hidden File Input to Pick Photo and Immediately Launch Camera */}
      <input
        ref={quickUploadInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleQuickUploadAndLaunchCamera}
      />
    </div>
  );
}
