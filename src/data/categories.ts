import { CategoryInfo, LocationType, MoodType } from '../types';

export const PHOTO_CATEGORIES: CategoryInfo[] = [
  {
    id: 'traditional',
    name: 'Traditional',
    icon: '🥻',
    description: 'Festive ethnic attire, sarees, kurtas, lehengas, sherwanis, and cultural celebrations',
    subcategories: [
      'Saree & jewellery',
      'Kurta & pathani',
      'Lehenga choli',
      'Sherwani bandhgala',
      'Shawl & dupatta',
      'Temple & festive',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: '💼',
    description: 'Corporate headshots, tailored blazers, collared dress shirts, and executive profiles',
    subcategories: [
      'Blazer & suit',
      'Crisp collared shirt',
      'Smart business casual',
      'Folded arms portrait',
      'Corporate profile',
    ],
  },
  {
    id: 'mirror-selfie',
    name: 'Mirror Selfie',
    icon: '🪞',
    description: 'Full-body outfit check, bathroom aesthetic, jacket styling, and phone-cover selfies',
    subcategories: [
      'Full-body mirror',
      'Phone covering face',
      'Moody bathroom mirror',
      'Cozy sweater reflection',
      'Streetwear mirror check',
    ],
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic',
    icon: '✨',
    description: 'Golden hour, moody sky, bridge lean, streetwear silhouettes, and cinematic angles',
    subcategories: [
      'Golden hour sunlight',
      'Outdoor bridge railing',
      'Over-the-shoulder sky',
      'Window shadow & coffee',
      'Cinematic twilight',
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
  { id: 'temple', label: 'Temple / Traditional', name: 'Temple', icon: '🏛️', tip: 'Stone pillars, festive backdrops' },
  { id: 'office', label: 'Office / Corporate', name: 'Office', icon: '🏢', tip: 'Clean corporate & studio backdrops' },
  { id: 'mirror', label: 'Mirror / Bathroom', name: 'Mirror', icon: '🪞', tip: 'Full outfit check & reflection' },
  { id: 'outdoor', label: 'Outdoor / Bridge', name: 'Outdoor', icon: '🌉', tip: 'Bridges, streets & open skies' },
  { id: 'studio', label: 'Studio / Clean Wall', name: 'Studio', icon: '📸', tip: 'Neutral high-contrast backdrop' },
  { id: 'indoor', label: 'Indoor Living', name: 'Indoor', icon: '🏡', tip: 'Cozy ambient hallway or living' },
  { id: 'cafe', label: 'Café & Window', name: 'Café', icon: '☕', tip: 'Warm window light and coffee table' },
  { id: 'street', label: 'Urban Street', name: 'Street', icon: '🏙️', tip: 'City streets & urban textures' },
  { id: 'home', label: 'Home Room', name: 'Home', icon: '🛋️', tip: 'Relaxed personal space' },
  { id: 'other', label: 'Other Settings', name: 'Other', icon: '📍', tip: 'Versatile backdrop' },
];

export interface MoodOption {
  id: MoodType;
  label: string;
  name: string;
  emoji: string;
  prompt?: string;
}

export const MOODS: MoodOption[] = [
  { id: 'traditional', label: 'Traditional', name: 'Traditional', emoji: '🪔', prompt: 'Graceful festive elegance' },
  { id: 'regal', label: 'Regal', name: 'Regal', emoji: '👑', prompt: 'Royal, poised & dignified stance' },
  { id: 'professional', label: 'Professional', name: 'Professional', emoji: '👔', prompt: 'Polished career & executive profile' },
  { id: 'confident', label: 'Confident', name: 'Confident', emoji: '💪', prompt: 'Strong posture & direct eye contact' },
  { id: 'aesthetic', label: 'Aesthetic', name: 'Aesthetic', emoji: '✨', prompt: 'Cinematic light, shadows & moody tones' },
  { id: 'casual', label: 'Casual', name: 'Casual', emoji: '👟', prompt: 'Easygoing, unforced vibe' },
  { id: 'cool', label: 'Cool', name: 'Cool', emoji: '😎', prompt: 'Effortless swagger & sunglasses' },
  { id: 'moody', label: 'Moody', name: 'Moody', emoji: '🖤', prompt: 'Dramatic sky & contemplative gaze' },
  { id: 'natural', label: 'Natural', name: 'Natural', emoji: '🌿', prompt: 'Soft relaxed breath, authentic feel' },
];
