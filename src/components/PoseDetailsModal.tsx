import React, { useRef } from 'react';
import {
  X,
  Camera,
  Heart,
  AlertTriangle,
  Lightbulb,
  Sun,
  Maximize2,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Share2,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { Pose } from '../types';
import { PoseIllustration } from './PoseIllustration';

interface PoseDetailsModalProps {
  pose: Pose | null;
  onClose: () => void;
  onLaunchCamera: (pose: Pose) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  onReplaceImage?: (poseId: string, dataUrl: string) => void;
}

export const PoseDetailsModal: React.FC<PoseDetailsModalProps> = ({
  pose,
  onClose,
  onLaunchCamera,
  isFavorite,
  onToggleFavorite,
  onNavigateNext,
  onNavigatePrev,
  onReplaceImage,
}) => {
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!pose) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onReplaceImage) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onReplaceImage(pose.id, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    const titleText = pose.title || pose.name;
    const descText = pose.description || (pose.instructions && pose.instructions[0]) || '';
    if (navigator.share) {
      navigator.share({
        title: `PosePerfect: ${titleText}`,
        text: `Check out this pose: ${titleText} - ${descText}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin} - Pose: ${titleText}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div
        id="pose-details-modal"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-zinc-900 shadow-2xl text-zinc-100 flex flex-col"
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-zinc-900/90 px-5 py-3.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 capitalize">
              {pose.gender} Pose
            </span>
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 capitalize">
              {pose.category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Prev / Next Pose Navigation */}
            {onNavigatePrev && (
              <button
                onClick={onNavigatePrev}
                title="Previous Pose"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                title="Next Pose"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(pose.id)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                isFavorite
                  ? 'border-rose-500/50 bg-rose-500/15 text-rose-400'
                  : 'border-white/10 bg-zinc-800 text-zinc-300 hover:text-rose-400'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share Pose"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            </button>

            {/* Close */}
            <button
              id="close-pose-details-btn"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top Hero Section with Preview & Main Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 flex flex-col items-center">
              <PoseIllustration pose={pose} className="h-56 sm:h-64 shadow-inner w-full" />
              
              {/* Upload / Replace Picture button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
              >
                <Upload className="h-3.5 w-3.5 text-cyan-400" />
                <span>{pose.image ? 'Replace / Upload Photo' : 'Upload Pose Photo'}</span>
              </button>
            </div>

            <div className="sm:col-span-7 space-y-2.5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {pose.title || pose.name}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {pose.description || (pose.instructions && pose.instructions[0])}
              </p>

              {/* Technical Camera Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="rounded-xl bg-zinc-950/70 p-2.5 border border-white/10">
                  <span className="text-zinc-500 block font-medium">Camera Angle</span>
                  <span className="text-zinc-100 font-semibold">{pose.cameraAngle}</span>
                </div>
                <div className="rounded-xl bg-zinc-950/70 p-2.5 border border-white/10">
                  <span className="text-zinc-500 block font-medium">Framing Distance</span>
                  <span className="text-zinc-100 font-semibold">{pose.distance || pose.cameraDistance}</span>
                </div>
                <div className="rounded-xl bg-zinc-950/70 p-2.5 border border-white/10">
                  <span className="text-zinc-500 block font-medium">Phone Orientation</span>
                  <span className="text-zinc-100 font-semibold">{pose.phoneOrientation || pose.framing}</span>
                </div>
                <div className="rounded-xl bg-zinc-950/70 p-2.5 border border-white/10">
                  <span className="text-zinc-500 block font-medium">Best Lighting</span>
                  <span className="text-zinc-100 font-semibold">{pose.lighting}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Anatomy & Body Positioning Guide */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4" />
              <span>Step-by-Step Body Positioning</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-white/5 space-y-1">
                <span className="font-semibold text-zinc-400">Head & Face</span>
                <p className="text-zinc-200">{pose.headPosition}</p>
              </div>
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-white/5 space-y-1">
                <span className="font-semibold text-zinc-400">Shoulders & Posture</span>
                <p className="text-zinc-200">{pose.shoulderPosition || 'Keep shoulders relaxed and drop them down away from your neck.'}</p>
              </div>
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-white/5 space-y-1">
                <span className="font-semibold text-zinc-400">Hands & Arms</span>
                <p className="text-zinc-200">{pose.handPosition}</p>
              </div>
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-white/5 space-y-1">
                <span className="font-semibold text-zinc-400">Legs & Feet Stance</span>
                <p className="text-zinc-200">{pose.legPosition || pose.bodyPosition}</p>
              </div>
            </div>
          </div>

          {/* Common Mistakes to Avoid (Crucial Coaching Value) */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/15 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Mistakes to Avoid</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-200/90 list-disc list-inside">
              {(pose.mistakes || [
                'Standing completely stiff with no relaxed weight shift',
                'Holding your breath and tensing your neck/jaw',
                'Facing the camera dead-center with flattened shoulders',
              ]).map((mistake: string, i: number) => (
                <li key={i}>{mistake}</li>
              ))}
            </ul>
          </div>

          {/* Confidence & Pro Coach Tip */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/15 p-4 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" />
              <span>Confidence & Natural Vibe Tip</span>
            </h4>
            <p className="text-xs text-amber-200/90 italic leading-relaxed">
              "{pose.confidenceTip || 'Take a deep breath in, exhale softly, and give a natural subtle expression.'}"
            </p>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 border-t border-white/10 bg-zinc-900/95 p-4 backdrop-blur-xl">
          <button
            id="modal-open-camera-btn"
            onClick={() => onLaunchCamera(pose)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.99] transition-all"
          >
            <Camera className="h-5 w-5" />
            <span>Open Camera (60% Transparent Guide Overlay)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
