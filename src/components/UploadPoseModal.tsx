import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Camera,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { Gender, PhotoCategory, Pose } from '../types';
import { CATEGORIES } from '../data/categories';

interface UploadPoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePose: (newPose: Pose) => void;
  defaultCategory?: PhotoCategory;
  defaultGender?: Gender;
  onLaunchCamera?: (pose: Pose) => void;
}

export const UploadPoseModal: React.FC<UploadPoseModalProps> = ({
  isOpen,
  onClose,
  onSavePose,
  defaultCategory = 'traditional',
  defaultGender = 'female',
  onLaunchCamera,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>(defaultGender);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>(defaultCategory);
  const [poseName, setPoseName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageDataUrl(result);
      if (!poseName) {
        // Auto-generate a clean name from file name or category
        const cleanBase = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPoseName(cleanBase.length > 30 ? cleanBase.slice(0, 30) : cleanBase);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (launchInCamera: boolean = false) => {
    if (!imageDataUrl) {
      alert('Please select or drop an image file first.');
      return;
    }

    const categoryNames: Record<PhotoCategory, string> = {
      'traditional': 'Traditional',
      'professional': 'Professional',
      'mirror-selfie': 'Mirror Selfie',
      'aesthetic': 'Aesthetic',
    };

    const finalName = poseName.trim() || `${selectedGender === 'female' ? 'Female' : 'Male'} ${categoryNames[selectedCategory]} Pose`;

    const newPose: Pose = {
      id: `custom-${Date.now()}`,
      name: finalName,
      title: finalName,
      gender: selectedGender,
      category: selectedCategory,
      subCategory: categoryNames[selectedCategory],
      difficulty: 'beginner',
      location: ['indoor', 'outdoor', 'studio'],
      mood: [selectedCategory === 'traditional' ? 'traditional' : selectedCategory === 'professional' ? 'professional' : 'aesthetic'],
      image: imageDataUrl,
      instructions: instructions.trim()
        ? instructions.split('\n').filter(Boolean)
        : [
            'Match the transparent silhouette/photo guide directly on your screen',
            'Align your posture and shoulders with the reference frame',
            'Take deep breath, relax facial muscles, and snap the photo',
          ],
      description: `Custom uploaded ${categoryNames[selectedCategory]} pose for ${selectedGender}. Rendered with 60% transparency in camera alignment mode.`,
      bodyPosition: 'Align posture directly with the 60% transparent photo guide overlay.',
      handPosition: 'Position hands as shown in the reference photo.',
      headPosition: 'Tilt head slightly to match reference eye line and jawline.',
      cameraAngle: 'Eye level or matched to photo reference.',
      cameraDistance: 'Medium shot (approx. 4–6 feet).',
      lighting: 'Natural soft directional light.',
      framing: 'Align yourself within the 60% transparent photo borders.',
      backgroundTip: 'Clean or aesthetic backdrop matching the photo style.',
      tags: [selectedCategory, selectedGender, 'custom', 'uploaded'],
      svgType: `custom-${selectedCategory}-${selectedGender}`,
      isCustomUpload: true,
    };

    onSavePose(newPose);

    if (launchInCamera && onLaunchCamera) {
      onClose();
      onLaunchCamera(newPose);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-zinc-900 shadow-2xl text-zinc-100 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-zinc-900/95 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upload Pose Picture</h2>
              <p className="text-[11px] text-zinc-400">
                Uploaded images auto-activate with 60% transparency in Camera Overlay
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Step 1: Select Category (1 to 4) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">
              1. Choose Option (Category)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedCategory === cat.id
                      ? 'border-cyan-500 bg-cyan-500/15 text-white ring-1 ring-cyan-500/30'
                      : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-xs font-bold text-cyan-300">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold block text-white">{cat.name}</span>
                    <span className="text-[10px] text-zinc-400 line-clamp-1">{cat.icon}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Gender */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">
              2. Choose Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedGender('female')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  selectedGender === 'female'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30'
                    : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                }`}
              >
                Female (F)
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('male')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  selectedGender === 'male'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30'
                    : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white'
                }`}
              >
                Male (M)
              </button>
            </div>
          </div>

          {/* Step 3: File Drop Zone */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">
              3. Select or Drop Picture
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : imageDataUrl
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-white/15 bg-zinc-950/50 hover:border-cyan-500/40 hover:bg-zinc-950/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              {imageDataUrl ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                  <img
                    src={imageDataUrl}
                    alt="Preview"
                    className="h-28 w-20 object-cover rounded-xl border border-white/20 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Image Ready</span>
                    </div>
                    <p className="text-xs text-white font-medium truncate max-w-[200px]">
                      {imageFileName || 'Selected photo'}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Will be superimposed at <strong className="text-cyan-300">60% transparency</strong> over your live camera feed!
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageDataUrl(null);
                        setImageFileName('');
                      }}
                      className="text-[11px] text-rose-400 hover:underline pt-1 block"
                    >
                      Change photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-2">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Click to upload or drag & drop photo here
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Supports JPG, PNG, WEBP, or camera screenshots
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Optional Name & Note */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">
              4. Pose Title (Optional)
            </label>
            <input
              type="text"
              value={poseName}
              onChange={(e) => setPoseName(e.target.value)}
              placeholder="e.g. Saree Flower Smile, Power Blazer Stance..."
              className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* 60% Transparency Notice banner */}
          <div className="flex items-start gap-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-3 text-cyan-200 text-xs">
            <Info className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong>60% Transparency Active:</strong> When you launch the camera with this photo, it will automatically overlay onto your screen with 60% transparency, making it easy to match posture, hands, and camera angle.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 flex items-center justify-end gap-2.5 border-t border-white/10 bg-zinc-900/95 px-5 py-4 backdrop-blur-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={!imageDataUrl}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Save to Catalog
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={!imageDataUrl}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 transition-all"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Save & Open Camera (60% Ghost)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
