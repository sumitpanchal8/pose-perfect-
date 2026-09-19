import { CategoryInfo, LocationType, MoodType } from '../types';

export const PHOTO_CATEGORIES: CategoryInfo[] = [
  {
    id: 'selfie',
    name: 'Selfie',
    icon: '📸',
    description: 'Face-focused shots, expressions, angles, and car/cafe selfies',
    subcategories: [
      'Classic selfie',
      'Side-angle selfie',
      'Smile selfie',
      'Serious selfie',
      'Looking-away selfie',
      'Outdoor selfie',
      'Car selfie',
      'Sitting selfie',
    ],
  },
  {
    id: 'mirror-selfie',
    name: 'Mirror Selfie',
    icon: '🪞',
    description: 'Full-body, outfit checks, elevator, bedroom, and bathroom mirrors',
    subcategories: [
      'Full-body mirror',
      'Half-body mirror',
      'Outfit mirror',
      'Casual mirror',
      'Bedroom mirror',
      'Bathroom mirror',
      'Elevator mirror',
      'Phone-covering-face mirror',
    ],
  },
  {
    id: 'normal',
    name: 'Normal Photos',
    icon: '📷',
    description: 'Everyday casual photos taken by friends, tripod, or timer',
    subcategories: [
      'Standing',
      'Sitting',
      'Walking',
      'Leaning',
      'Full body',
      'Half body',
      'Casual',
      'Natural',
    ],
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic',
    icon: '✨',
    description: 'Golden hour, moody shadows, minimalist framing, cafe and window silhouettes',
    subcategories: [
      'Golden hour',
      'Sunset',
      'Street',
      'Café',
      'Window',
      'Nature',
      'Shadow',
      'Moody',
      'Minimal',
      'Travel',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: '💼',
    description: 'LinkedIn, resumes, corporate portraits, speaking, and clean profiles',
    subcategories: [
      'LinkedIn',
      'Resume',
      'Corporate',
      'Formal',
      'Business casual',
      'Interview',
      'Profile photo',
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👕',
    description: 'OOTD showcases, streetwear, ethnic wear, tailoring, and silhouette poses',
    subcategories: [
      'Outfit showcase',
      'Streetwear',
      'Traditional',
      'Casual fashion',
      'Formal fashion',
      'Full-body fashion',
    ],
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    icon: '🌅',
    description: 'Parks, architecture, beaches, landscapes, and travel landmarks',
    subcategories: [
      'Park',
      'Beach',
      'Street',
      'Nature',
      'Sunset',
      'Travel',
    ],
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: '📱',
    description: 'Instagram DPs, stories, TikTok/Reel thumbnails, and lifestyle captures',
    subcategories: [
      'Instagram profile',
      'Instagram story',
      'Profile picture',
      'DP',
      'Reels thumbnail',
      'Lifestyle',
    ],
  },
  {
    id: 'friends',
    name: 'Friends',
    icon: '👯',
    description: 'Duo poses, candid trios, squad gatherings, and casual group dynamics',
    subcategories: [
      'Two people',
      'Three people',
      'Group',
      'Casual friends',
      'Outdoor group',
    ],
  },
  {
    id: 'couple',
    name: 'Couple',
    icon: '❤️',
    description: 'Romantic framing, hand-in-hand, forehead rest, strolls, and sunset moments',
    subcategories: [
      'Standing',
      'Walking',
      'Sitting',
      'Casual',
      'Travel',
      'Sunset',
    ],
  },
];

export const CATEGORIES = PHOTO_CATEGORIES;

export interface LocationOption {
  id: LocationType;
  label: string;
  name: string;
  icon: string;
  tip?: string;
}

export const LOCATIONS: LocationOption[] = [
  { id: 'bedroom', label: 'Bedroom', name: 'Bedroom', icon: '🛏️', tip: 'Cozy, warm personal shots' },
  { id: 'bathroom', label: 'Bathroom', name: 'Bathroom', icon: '🚿', tip: 'Bright vanity mirror selfies' },
  { id: 'mirror', label: 'Mirror', name: 'Mirror', icon: '🪞', tip: 'Full outfit check & posture' },
  { id: 'cafe', label: 'Café', name: 'Café', icon: '☕', tip: 'Table prop, coffee cup & candid window' },
  { id: 'college', label: 'College / Campus', name: 'Campus', icon: '🎓', tip: 'Stairs, library, and campus paths' },
  { id: 'office', label: 'Office / Work', name: 'Office', icon: '🏢', tip: 'Clean corporate & professional desk' },
  { id: 'street', label: 'City Street', name: 'City Street', icon: '🏙️', tip: 'Urban crosswalk, dynamic walk & walls' },
  { id: 'park', label: 'Park', name: 'Park', icon: '🌳', tip: 'Lush greenery and bench resting' },
  { id: 'beach', label: 'Beach', name: 'Beach', icon: '🏖️', tip: 'Golden hour sand & gentle breeze' },
  { id: 'gym', label: 'Gym / Fitness', name: 'Gym', icon: '💪', tip: 'Mirror flex & workout lifestyle' },
  { id: 'car', label: 'Car', name: 'Car', icon: '🚗', tip: 'Driver seat side-window golden light' },
  { id: 'elevator', label: 'Elevator', name: 'Elevator', icon: '🛗', tip: 'High-contrast steel & mirror look' },
  { id: 'home', label: 'Home Living', name: 'Home', icon: '🏡', tip: 'Relaxed sofa, indoor plant & morning sun' },
  { id: 'travel', label: 'Travel Landmark', name: 'Travel', icon: '✈️', tip: 'Scenic overlook & architectural scale' },
  { id: 'other', label: 'Other', name: 'Other', icon: '📍', tip: 'Any everyday versatile backdrop' },
];

export interface MoodOption {
  id: MoodType;
  label: string;
  name: string;
  emoji: string;
  prompt?: string;
}

export const MOODS: MoodOption[] = [
  { id: 'happy', label: 'Happy', name: 'Happy', emoji: '😊', prompt: 'Bright, authentic beaming smile' },
  { id: 'cool', label: 'Cool', name: 'Cool', emoji: '😎', prompt: 'Effortless charisma & sunglasses' },
  { id: 'aesthetic', label: 'Aesthetic', name: 'Aesthetic', emoji: '✨', prompt: 'Moody light, shadows & artistic vibe' },
  { id: 'confident', label: 'Confident', name: 'Confident', emoji: '💪', prompt: 'Square shoulders, proud eye contact' },
  { id: 'natural', label: 'Natural', name: 'Natural', emoji: '😌', prompt: 'Soft relaxed breath, unposed feel' },
  { id: 'moody', label: 'Moody', name: 'Moody', emoji: '🖤', prompt: 'Gazing away, atmospheric tones' },
  { id: 'professional', label: 'Professional', name: 'Professional', emoji: '👔', prompt: 'Polished posture for career & profile' },
  { id: 'stylish', label: 'Stylish', name: 'Stylish', emoji: '🔥', prompt: 'Fashion forward, angular lines' },
  { id: 'relaxed', label: 'Relaxed', name: 'Relaxed', emoji: '🌿', prompt: 'Comfortable lounging & easy slouch' },
];
