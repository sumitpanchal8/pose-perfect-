export type Gender = 'male' | 'female';

export type PhotoCategory =
  | 'selfie'
  | 'mirror-selfie'
  | 'normal'
  | 'aesthetic'
  | 'professional'
  | 'fashion'
  | 'outdoor'
  | 'social-media'
  | 'friends'
  | 'couple';

export type PoseCategory = PhotoCategory;

export type LocationType =
  | 'bedroom'
  | 'bathroom'
  | 'mirror'
  | 'cafe'
  | 'college'
  | 'office'
  | 'street'
  | 'park'
  | 'beach'
  | 'gym'
  | 'car'
  | 'elevator'
  | 'home'
  | 'travel'
  | 'other';

export type PoseLocation = LocationType;

export type MoodType =
  | 'happy'
  | 'cool'
  | 'aesthetic'
  | 'confident'
  | 'natural'
  | 'moody'
  | 'professional'
  | 'stylish'
  | 'relaxed';

export type PoseMood = MoodType;

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type PoseDifficulty = Difficulty;

export interface Pose {
  id: string;
  name: string;
  title?: string;
  gender: Gender;
  category: PhotoCategory;
  subCategory?: string;
  difficulty: Difficulty;
  location: string[];
  mood: string[];
  instructions: string[];
  description?: string;
  bodyPosition: string;
  handPosition: string;
  headPosition: string;
  shoulderPosition?: string;
  legPosition?: string;
  cameraAngle: string;
  cameraDistance: string;
  distance?: string;
  phoneOrientation?: string;
  lighting: string;
  framing: string;
  backgroundTip: string;
  mistakes?: string[];
  confidenceTip?: string;
  tags: string[];
  svgType: string;
  accentColor?: string;
}

export interface CategoryInfo {
  id: PhotoCategory;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
}

export interface OverlaySettings {
  opacity: number; // 0.1 to 1.0
  scale: number; // 0.7 to 1.4
  offsetX: number; // px
  offsetY: number; // px
  isMirrored: boolean;
  colorTheme: 'cyan' | 'green' | 'white' | 'gold' | 'rose';
  showGrid: boolean;
}

export interface UserPreferences {
  gender: Gender;
  hasCompletedOnboarding: boolean;
  soundEnabled: boolean;
  defaultTimer: number; // 0, 3, 5, 10
  favorites: string[]; // pose ids
  recentlyViewed: string[]; // pose ids
  recentlyCaptured: string[]; // pose ids
}

export interface AiAnalysisResult {
  isAiAssisted?: boolean;
  summary: string;
  score: number;
  matchedPoints: string[];
  adjustments: string[];
  cameraTip: string;
  compositionTip?: string;
  status?: string;
}

export type AIPoseAnalysisResult = AiAnalysisResult;
