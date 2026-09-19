import { Pose } from '../types';

export const MALE_POSES: Pose[] = [
  // ==========================================
  // 1. TRADITIONAL MALE (4 Photos)
  // ==========================================
  {
    id: 'tm-01',
    name: 'Mirror-Work Kurta Pillar Lean',
    title: 'Dark Green Kurta Pillar Lean',
    gender: 'male',
    category: 'traditional',
    subCategory: 'Kurta & pathani',
    difficulty: 'beginner',
    location: ['temple', 'indoor', 'studio'],
    mood: ['traditional', 'regal', 'confident'],
    image: '/src/assets/images/male_trad_1_1789835782372.jpg',
    instructions: [
      'Wear an embellished or mirror-work ethnic kurta with mandarin collar',
      'Rest your shoulder and upper arm gently against an ambient column or pillar',
      'Turn your face 45 degrees sideways into the warm ambient light with a thoughtful, gentle expression',
      'Keep your back elongated and your forearm relaxed down along the pillar',
    ],
    description: 'Deep emerald green festive kurta with intricate mirror embroidery, leaning against a warm pillar with a contemplative side profile.',
    bodyPosition: 'Upper shoulder resting lightly against a wall or column; spine erect, slight 30-degree torso angle.',
    handPosition: 'One arm resting downward along the body or resting lightly on the pillar, fingers relaxed.',
    headPosition: 'Turned 40 degrees away from camera towards the light source, eyes soft and reflective.',
    cameraAngle: 'Chest or eye level, straight-on with column on the left/right third.',
    cameraDistance: 'Medium shot (waist up, approx. 6–8 feet away).',
    lighting: 'Warm golden indoor or pillar sconce lighting illuminating the facial contours and mirror reflections.',
    framing: 'Waist up, subject framed against vertical pillar line using rule-of-thirds.',
    backgroundTip: 'Warm stone pillar, temple archway, or warm indoor heritage wall.',
    mistakes: ['Slouching against the pillar', 'Looking stiffly at the lens instead of gazing past the frame'],
    confidenceTip: 'Think of an inspiring story or memory to keep your expression naturally regal and grounded.',
    tags: ['traditional', 'kurta', 'ethnic', 'male', 'pillar-lean', 'festive'],
    svgType: 'trad-kurta-male-1',
    accentColor: '#10b981',
  },

  // ==========================================
  // 2. PROFESSIONAL MALE (1 Photo)
  // ==========================================
  {
    id: 'pm-01',
    name: 'Tailored Tan Suit & Watch Adjust',
    title: 'Tailored Tan Blazer Suit',
    gender: 'male',
    category: 'professional',
    subCategory: 'Blazer & suit',
    difficulty: 'beginner',
    location: ['studio', 'office', 'indoor'],
    mood: ['professional', 'confident', 'cool'],
    image: '/src/assets/images/male_prof_1_1789835824349.jpg',
    instructions: [
      'Style a slim-fit beige tan tailored suit with a clean white crewneck t-shirt and white sneakers',
      'Stand straight with feet hip-width apart facing the camera',
      'Bring both hands together in front of your torso, delicately adjusting your wristwatch or cuff button',
      'Maintain a calm, authoritative expression with steady eye contact',
    ],
    description: 'Modern slim-fit beige tan blazer suit paired with clean white crewneck and white sneakers, standing straight while adjusting cuff/watch.',
    bodyPosition: 'Full body upright stance, square shoulders, feet pointed forward.',
    handPosition: 'Hands held together at waist height, right hand adjusting watch or buttoning jacket.',
    headPosition: 'Straight forward with chin parallel to floor, focused eye contact.',
    cameraAngle: 'Chest level or straight-on eye level.',
    cameraDistance: 'Full length shot (approx. 10–12 feet).',
    lighting: 'Clean high-key commercial studio lighting with soft shadows.',
    framing: 'Full body centered against clean architectural white wall panels.',
    backgroundTip: 'Modern minimalist white room with subtle moulding or corporate office wall.',
    mistakes: ['Looking down at your watch instead of looking at the camera', 'Wrinkling the jacket shoulders'],
    confidenceTip: 'The contrast of a tailored blazer with crisp white sneakers embodies modern corporate leadership.',
    tags: ['professional', 'suit', 'blazer', 'corporate', 'cuff-adjust', 'male'],
    svgType: 'prof-suit-male-1',
    accentColor: '#f59e0b',
  },

  // ==========================================
  // 3. MIRROR SELFIE MALE (1 Photo)
  // ==========================================
  {
    id: 'mm-01',
    name: 'Luxury Marble Denim Jacket Mirror',
    title: 'Dark Marble Luxury Denim Jacket',
    gender: 'male',
    category: 'mirror-selfie',
    subCategory: 'Moody bathroom mirror',
    difficulty: 'beginner',
    location: ['mirror', 'indoor', 'home'],
    mood: ['moody', 'cool', 'aesthetic'],
    image: '/src/assets/images/male_mirror_1_1789835844589.jpg',
    instructions: [
      'Stand in front of a modern backlit vanity mirror wearing an off-white denim jacket over a neutral t-shirt',
      'Hold your phone at chest/chin level with two fingers supporting the base and index on the shutter',
      'Look into the phone screen or slightly past the lens with relaxed eyes and textured wavy hair',
      'Keep your shoulders broad and angled slightly towards the mirror surface',
    ],
    description: 'Moody dark marble bathroom mirror selfie, wearing off-white cream denim jacket over tee, looking into phone screen, soft ring-light glow.',
    bodyPosition: 'Chest-up or waist-up stance facing the mirror with a subtle 15-degree shoulder angle.',
    handPosition: 'Dominant hand gripping phone vertically at chest height, fingers curved cleanly around case.',
    headPosition: 'Tilted slightly down, chin defined, eyes gazing into the phone display.',
    cameraAngle: 'Chest height reflection, camera tilted level in the mirror.',
    cameraDistance: 'Medium close-up (2–3 feet from the mirror).',
    lighting: 'Moody warm ambient sconce or backlit circular mirror halo light.',
    framing: 'Chest up with textured denim jacket framing the center.',
    backgroundTip: 'Dark polished marble, matte black tiles, or high-end hotel vanity.',
    mistakes: ['Covering your entire eyes with the phone', 'Straining neck toward mirror'],
    confidenceTip: 'Breathe out slowly and let your facial muscles soften into natural calm.',
    tags: ['mirror-selfie', 'denim-jacket', 'dark-marble', 'moody', 'male'],
    svgType: 'mirror-male-1',
    accentColor: '#e2e8f0',
  },

  // ==========================================
  // 4. AESTHETIC MALE (1 Photo)
  // ==========================================
  {
    id: 'am-01',
    name: 'Urban Bridge Railing Cross-Leg Lean',
    title: 'Urban Bridge Railing Lean',
    gender: 'male',
    category: 'aesthetic',
    subCategory: 'Outdoor bridge railing',
    difficulty: 'intermediate',
    location: ['outdoor', 'street', 'other'],
    mood: ['aesthetic', 'cool', 'casual'],
    image: '/src/assets/images/male_aesthetic_1_1789835895373.jpg',
    instructions: [
      'Wear a sage green crewneck sweatshirt, slim grey denim, and high-top white retro sneakers',
      'Lean your hip and forearms casually against an outdoor bridge pedestrian railing',
      'Cross one leg over the other at the ankle, letting your white sneaker rest on its outer sole',
      'Wear blue-tinted sunglasses, look slightly past the camera lens with a calm urban vibe',
    ],
    description: 'Sage green crewneck sweatshirt, grey denim, high-top white sneakers, blue tint sunglasses, leaning back on outdoor bridge railing with ankles crossed.',
    bodyPosition: 'Full body lean against bridge railing, relaxed curved spine, crossed ankles.',
    handPosition: 'Forearms resting on the bridge handrail, fingers casually intertwined.',
    headPosition: 'Turned 15 degrees, chin level, blue-tint shades adding modern color pop.',
    cameraAngle: 'Slight low angle or knee level to capture shoe details and bridge perspective.',
    cameraDistance: 'Full length shot (approx. 10–12 feet).',
    lighting: 'Soft diffused overcast or golden hour outdoor daylight.',
    framing: 'Full-length with bridge railing vanishing line leading into the subject.',
    backgroundTip: 'Brick historic building or city bridge crossing with architectural depth.',
    mistakes: ['Putting too much weight on the railing so shoulders hunch', 'Hiding the sneakers'],
    confidenceTip: 'The ankle cross and relaxed forearm lean create an effortlessly photogenic triangular silhouette.',
    tags: ['aesthetic', 'bridge', 'sneakers', 'sweatshirt', 'sunglasses', 'male'],
    svgType: 'aesthetic-male-1',
    accentColor: '#14b8a6',
  },
];

export const FEMALE_POSES: Pose[] = [
  // ==========================================
  // 1. TRADITIONAL FEMALE (3 Photos)
  // ==========================================
  {
    id: 'tf-01',
    name: 'Royal Saree Flower to Eye',
    title: 'Royal Saree with Flower to Eye',
    gender: 'female',
    category: 'traditional',
    subCategory: 'Saree & jewellery',
    difficulty: 'beginner',
    location: ['temple', 'outdoor', 'indoor'],
    mood: ['traditional', 'regal', 'natural'],
    image: '/src/assets/images/female_trad_1_1789835729703.jpg',
    instructions: [
      'Drape a royal purple silk saree with emerald green border and ornate gold temple jewellery',
      'Hold a delicate fresh pink or red flower gently between thumb and fingertips in front of one eye',
      'Rest your opposite arm horizontally across your midriff, showcasing stack of traditional bangles',
      'Tilt your head gently with a radiant, joyful smile looking downward with soft eyelids',
    ],
    description: 'Royal blue and emerald green silk saree with gold temple jewellery, holding a delicate pink flower near her eye, soft smiling expression, outdoor garden background, warm golden sunlight.',
    bodyPosition: 'Standing three-quarter angle with shoulders relaxed and back straight.',
    handPosition: 'Right hand holding flower over eye; left forearm cradled horizontally at waist showing bangles.',
    headPosition: 'Tilted 15 degrees downward and sideways, blissful soft downward smile.',
    cameraAngle: 'Chest level or eye level, close to medium portrait.',
    cameraDistance: 'Medium portrait (approx. 5–6 feet away).',
    lighting: 'Warm diffused golden-hour sunlight filtering through trees behind.',
    framing: 'Waist-up portrait centered with saree pallu and jewelry catching soft light.',
    backgroundTip: 'Outdoor garden, stone temple courtyard, or soft foliage bokeh.',
    mistakes: ['Smashing flower against the eye', 'Clenching fingers holding the flower'],
    confidenceTip: 'The flower acts as a natural frame for your smile, creating an enchanting traditional portrait.',
    tags: ['traditional', 'saree', 'flower', 'temple-jewelry', 'bangles', 'female'],
    svgType: 'trad-saree-female-1',
    accentColor: '#7c3aed',
  },

  // ==========================================
  // 2. PROFESSIONAL FEMALE (3 Photos)
  // ==========================================
  {
    id: 'pf-01',
    name: 'Power Suit Executive Cross-Arms',
    title: 'Executive Blazer Folded Arms',
    gender: 'female',
    category: 'professional',
    subCategory: 'Blazer & suit',
    difficulty: 'beginner',
    location: ['studio', 'office'],
    mood: ['professional', 'confident'],
    image: '/src/assets/images/female_prof_1_1789835802053.jpg',
    instructions: [
      'Wear a tailored black professional blazer jacket over a fitted dark blouse',
      'Cross your arms comfortably across your mid-chest with hands tucked softly, displaying your watch or ring',
      'Roll your shoulders back and down, slightly angling one shoulder toward the lens',
      'Deliver an authentic, warm, and confident executive smile directly into the camera',
    ],
    description: 'Tailored black executive blazer suit, arms crossed naturally with watch visible, warm confident eye-level smile against neutral office studio background.',
    bodyPosition: 'Chest-up upright stance, shoulders slightly angled 15 degrees.',
    handPosition: 'Arms crossed loosely across chest, fingers resting comfortably on upper arms, watch visible.',
    headPosition: 'Centered with slight warm head tilt, confident direct eye contact.',
    cameraAngle: 'Direct eye level.',
    cameraDistance: 'Chest-up portrait (approx. 4–5 feet).',
    lighting: 'Clean professional corporate portrait lighting with soft catchlights in eyes.',
    framing: 'Classic corporate headshot framed from chest to crown.',
    backgroundTip: 'Crisp white, neutral grey studio, or modern blurred executive suite.',
    mistakes: ['Crossing arms too tightly like you are cold or defensive', 'Tucking chin into neck'],
    confidenceTip: 'A genuine open smile softens the power of a dark blazer into welcoming leadership.',
    tags: ['professional', 'blazer', 'corporate', 'linkedin', 'executive', 'female'],
    svgType: 'prof-blazer-female-1',
    accentColor: '#18181b',
  },

  // ==========================================
  // 3. MIRROR SELFIE FEMALE (2 Photos)
  // ==========================================
  {
    id: 'mf-01',
    name: 'Cute Phone-Cover Cheek Mirror Selfie',
    title: 'Cute Phone-Cover Face Selfie',
    gender: 'female',
    category: 'mirror-selfie',
    subCategory: 'Phone covering face',
    difficulty: 'beginner',
    location: ['mirror', 'home', 'indoor'],
    mood: ['casual', 'aesthetic', 'cool'],
    image: '/src/assets/images/female_mirror_1_1789835873296.jpg',
    instructions: [
      'Wear a rich berry/maroon top with silver bangle and polished manicure',
      'Hold a smartphone with a statement case right in front of one cheek, letting your eyes peek over the phone edge',
      'Tilt your head gently toward the phone with a subtle playful half-smile',
      'Position yourself close to the mirror for a cozy, intimate angle',
    ],
    description: 'Holding smartphone partially covering cheeks while smiling into the mirror, deep maroon outfit with silver bangle, clean manicure, casual tilted head.',
    bodyPosition: 'Close-up mirror reflection, upper torso angled 25 degrees toward the phone.',
    handPosition: 'Holding phone vertically with thumb supporting bottom, fingers spread aesthetically across case.',
    headPosition: 'Tilted 20 degrees, cheek partially hidden behind phone, eyes smiling into mirror.',
    cameraAngle: 'Slight high angle reflection, looking into the mirror.',
    cameraDistance: 'Close-up portrait (18–24 inches from mirror).',
    lighting: 'Soft warm indoor light highlighting cheeks and manicure.',
    framing: 'Close-up tight framing highlighting hair, phone case, and eyes.',
    backgroundTip: 'Neutral bedroom wall or mirror frame corner.',
    mistakes: ['Covering your eyes with the phone', 'Tensing your fingers on the phone case'],
    confidenceTip: 'This pose is the gold standard for showing off cute phone cases, nail art, and joyful eyes.',
    tags: ['mirror-selfie', 'phone-cover', 'cute', 'close-up', 'bangle', 'female'],
    svgType: 'mirror-female-1',
    accentColor: '#be123c',
  },

  // ==========================================
  // 4. AESTHETIC FEMALE (1 Photo)
  // ==========================================
  {
    id: 'af-01',
    name: 'Golden Hour Sunset Cardigan',
    title: 'Golden Hour Sunset Silhouette',
    gender: 'female',
    category: 'aesthetic',
    subCategory: 'Golden hour sunlight',
    difficulty: 'intermediate',
    location: ['outdoor', 'other'],
    mood: ['aesthetic', 'natural', 'moody'],
    image: '/src/assets/images/female_aesthetic_1_1789835913459.jpg',
    instructions: [
      'Position yourself outdoors during golden hour with the low setting sun directly behind your shoulders',
      'Wear a cozy textured knit cardigan and let the gentle breeze catch strands of your hair',
      'Turn your profile 30 degrees toward the side with eyes soft and relaxed',
      'Let the warm cinematic sun flare create a glowing golden rim along your hair and sweater',
    ],
    description: 'Dreamy warm sunset backlighting, cozy knit cardigan, windblown hair, looking softly off-camera with cinematic golden flare.',
    bodyPosition: 'Waist-up or three-quarter stance, natural posture with soft curve.',
    handPosition: 'Hands tucked loosely into cardigan pockets or resting near lap.',
    headPosition: 'Turned 30 degrees sideways, gentle contemplative gaze into the golden glow.',
    cameraAngle: 'Chest level, shooting slightly into the light for romantic lens flare.',
    cameraDistance: 'Medium portrait (approx. 5–7 feet).',
    lighting: 'Direct sunset golden hour backlight casting ethereal rim light on hair.',
    framing: 'Rule-of-thirds portrait with sun flare kissing the edge of the frame.',
    backgroundTip: 'Open park, field, or rooftop horizon during the last 30 minutes of daylight.',
    mistakes: ['Squinting into the sun (keep sun behind you!)', 'Overexposing the face'],
    confidenceTip: 'Breathe deeply and let the warm golden light create a magical, nostalgic aura.',
    tags: ['aesthetic', 'golden-hour', 'sunset', 'cardigan', 'cinematic', 'female'],
    svgType: 'aesthetic-female-1',
    accentColor: '#f59e0b',
  },
];

export const ALL_POSES: Pose[] = [...MALE_POSES, ...FEMALE_POSES];

// Daily Pose calculation based on date
export function getPoseOfTheDay(gender: 'male' | 'female'): Pose {
  const pool = gender === 'male' ? MALE_POSES : FEMALE_POSES;
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = Math.abs(dayOfYear) % pool.length;
  return pool[index] || pool[0];
}

// Multi-attribute filter utility
export function filterPoses(
  poses: Pose[],
  filters: {
    category?: string;
    location?: string;
    mood?: string;
    difficulty?: string;
    searchQuery?: string;
  }
): Pose[] {
  return poses.filter((pose) => {
    // 1. Category filter
    if (filters.category && filters.category !== 'all') {
      if (pose.category !== filters.category) return false;
    }

    // 2. Location filter
    if (filters.location && filters.location !== 'all') {
      const poseLocs = Array.isArray(pose.location) ? pose.location : [pose.location];
      if (!poseLocs.includes(filters.location as any)) return false;
    }

    // 3. Mood filter
    if (filters.mood && filters.mood !== 'all') {
      const poseMoods = Array.isArray(pose.mood) ? pose.mood : [pose.mood];
      if (!poseMoods.includes(filters.mood as any)) return false;
    }

    // 4. Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      if (pose.difficulty !== filters.difficulty) return false;
    }

    // 5. Search query filter
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = (pose.title || pose.name || '').toLowerCase().includes(q);
      const matchDesc = (pose.description || '').toLowerCase().includes(q);
      const matchBody = (pose.bodyPosition || '').toLowerCase().includes(q);
      const matchHands = (pose.handPosition || '').toLowerCase().includes(q);
      const matchInstructions = (pose.instructions || []).some((i) => i.toLowerCase().includes(q));
      const matchTags = (pose.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchSubCategory = (pose.subCategory || '').toLowerCase().includes(q);

      if (
        !matchTitle &&
        !matchDesc &&
        !matchBody &&
        !matchHands &&
        !matchInstructions &&
        !matchTags &&
        !matchSubCategory
      ) {
        return false;
      }
    }

    return true;
  });
}

