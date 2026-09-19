import { Gender, OverlaySettings, Pose, UserPreferences } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'poseperfect_user_prefs_v2',
  OVERLAY: 'poseperfect_overlay_settings_v2',
  CUSTOM_POSES: 'poseperfect_custom_poses_v2',
  IMAGE_OVERRIDES: 'poseperfect_image_overrides_v2',
};

const DEFAULT_PREFS: UserPreferences = {
  gender: 'female',
  hasCompletedOnboarding: false,
  soundEnabled: true,
  defaultTimer: 3,
  favorites: [],
  recentlyViewed: [],
  recentlyCaptured: [],
};

export const DEFAULT_OVERLAY_SETTINGS: OverlaySettings = {
  opacity: 0.4, // 60% transparent (40% opacity) by default as requested
  scale: 1.0,
  offsetX: 0,
  offsetY: 0,
  isMirrored: false,
  colorTheme: 'cyan',
  showGrid: true,
  overlayMode: 'photo',
};

export function loadUserPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  try {
    const current = loadUserPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch {
    return { ...DEFAULT_PREFS, ...prefs };
  }
}

export function loadOverlaySettings(): OverlaySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OVERLAY);
    if (!raw) return DEFAULT_OVERLAY_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_OVERLAY_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_OVERLAY_SETTINGS;
  }
}

export function saveOverlaySettings(settings: Partial<OverlaySettings>): OverlaySettings {
  try {
    const current = loadOverlaySettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.OVERLAY, JSON.stringify(updated));
    return updated;
  } catch {
    return { ...DEFAULT_OVERLAY_SETTINGS, ...settings };
  }
}

export function toggleFavoritePose(poseId: string): boolean {
  const prefs = loadUserPreferences();
  const index = prefs.favorites.indexOf(poseId);
  let isFavorite = false;
  let newFavorites: string[];

  if (index > -1) {
    newFavorites = prefs.favorites.filter(id => id !== poseId);
    isFavorite = false;
  } else {
    newFavorites = [poseId, ...prefs.favorites];
    isFavorite = true;
  }

  saveUserPreferences({ favorites: newFavorites });
  return isFavorite;
}

export function addRecentlyViewed(poseId: string) {
  const prefs = loadUserPreferences();
  const filtered = prefs.recentlyViewed.filter(id => id !== poseId);
  const updated = [poseId, ...filtered].slice(0, 20);
  saveUserPreferences({ recentlyViewed: updated });
}

export function addRecentlyCaptured(poseId: string) {
  const prefs = loadUserPreferences();
  const filtered = prefs.recentlyCaptured.filter(id => id !== poseId);
  const updated = [poseId, ...filtered].slice(0, 20);
  saveUserPreferences({ recentlyCaptured: updated });
}

// Custom Uploaded Poses & Image Overrides
export function loadCustomPoses(): Pose[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_POSES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomPose(pose: Pose): Pose[] {
  try {
    const existing = loadCustomPoses().filter(p => p.id !== pose.id);
    const updated = [pose, ...existing];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_POSES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function loadImageOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.IMAGE_OVERRIDES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveImageOverride(poseId: string, dataUrl: string): Record<string, string> {
  try {
    const existing = loadImageOverrides();
    existing[poseId] = dataUrl;
    localStorage.setItem(STORAGE_KEYS.IMAGE_OVERRIDES, JSON.stringify(existing));
    return existing;
  } catch {
    return {};
  }
}
