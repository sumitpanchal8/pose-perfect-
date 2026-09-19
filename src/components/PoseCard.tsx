import React from 'react';
import { Camera, Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Pose } from '../types';
import { PoseIllustration } from './PoseIllustration';

interface PoseCardProps {
  pose: Pose;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectPose: (pose: Pose) => void;
  onLaunchCamera: (pose: Pose, e: React.MouseEvent) => void;
}

export const PoseCard: React.FC<PoseCardProps> = ({
  pose,
  isFavorite,
  onToggleFavorite,
  onSelectPose,
  onLaunchCamera,
}) => {
  return (
    <div
      id={`pose-card-${pose.id}`}
      onClick={() => onSelectPose(pose)}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-3.5 shadow-md hover:border-cyan-500/40 hover:bg-zinc-900 transition-all cursor-pointer hover:shadow-cyan-500/5"
    >
      {/* Visual illustration top */}
      <div className="relative w-full overflow-hidden rounded-xl">
        <PoseIllustration pose={pose} className="h-44 group-hover:scale-[1.02] transition-transform duration-300" />

        {/* Floating Favorite Button */}
        <button
          id={`fav-btn-${pose.id}`}
          onClick={(e) => onToggleFavorite(pose.id, e)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-rose-400 hover:scale-110 active:scale-95 transition-all"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Hover Quick View overlay */}
        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/20 text-xs font-semibold text-white shadow-lg">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            View Breakdown
          </span>
        </div>
      </div>

      {/* Info & Metadata */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
              {pose.title || pose.name}
            </h3>
          </div>

          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {pose.description || (pose.instructions && pose.instructions[0])}
          </p>

          {/* Quick coaching micro-cues */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="rounded-lg bg-zinc-950/60 px-2 py-1 border border-white/5 truncate">
              <span className="text-zinc-500 font-medium">Hands: </span>
              <span className="text-zinc-300">{pose.handPosition}</span>
            </div>
            <div className="rounded-lg bg-zinc-950/60 px-2 py-1 border border-white/5 truncate">
              <span className="text-zinc-500 font-medium">Angle: </span>
              <span className="text-zinc-300">{pose.cameraAngle}</span>
            </div>
          </div>
        </div>

        {/* Action button bar */}
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2">
          <button
            id={`camera-launch-btn-${pose.id}`}
            onClick={(e) => onLaunchCamera(pose, e)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-zinc-950 hover:border-cyan-500 active:scale-95 transition-all shadow-sm"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Open Camera</span>
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
