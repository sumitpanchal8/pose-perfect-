import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  RotateCcw,
  Sliders,
  Grid3X3,
  Timer,
  Volume2,
  VolumeX,
  FlipHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  Share2,
  ArrowLeft,
  AlertCircle,
  Settings2,
  Zap,
  Move,
  Maximize,
  Minimize,
  CheckCircle,
  Eye,
  EyeOff,
  Palette,
  Sun,
} from 'lucide-react';
import { Pose, OverlaySettings, AIPoseAnalysisResult } from '../types';
import { PoseOverlayGraphic } from './PoseOverlayGraphic';
import { soundFx } from '../utils/audio';
import { loadOverlaySettings, saveOverlaySettings, addRecentlyCaptured } from '../utils/storage';

interface CameraViewProps {
  pose: Pose;
  allPoses: Pose[];
  onBackToPoses: () => void;
  onSelectPose: (pose: Pose) => void;
  soundEnabled: boolean;
}

export const CameraView: React.FC<CameraViewProps> = ({
  pose,
  allPoses,
  onBackToPoses,
  onSelectPose,
  soundEnabled,
}) => {
  // Video & Stream Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera State
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Overlay Settings State
  const [overlaySettings, setOverlaySettings] = useState<OverlaySettings>(loadOverlaySettings);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [showControlDrawer, setShowControlDrawer] = useState(false);
  const [showColorThemePicker, setShowColorThemePicker] = useState(false);

  // Photography Assistant Features
  const [timerDuration, setTimerDuration] = useState<0 | 3 | 5 | 10>(3);
  const [timerCountdown, setTimerCountdown] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(!soundEnabled);
  const [screenFlash, setScreenFlash] = useState(false);

  // Device Tilt / Level Sensor
  const [phoneTilt, setPhoneTilt] = useState<number>(0);
  const [isLevelSupported, setIsLevelSupported] = useState(false);

  // Capture & Results State
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzingPose, setIsAnalyzingPose] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIPoseAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Camera Initialization
  const startCamera = async (facing: 'user' | 'environment') => {
    setIsInitializing(true);
    setCameraError(null);

    // Stop current stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported on this browser or environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setHasCameraPermission(true);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setHasCameraPermission(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access was denied. Please allow camera permissions in your browser address bar.');
      } else {
        setCameraError(err.message || 'Unable to start camera. You can still test poses with the simulator or upload a test picture.');
      }
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    startCamera(cameraFacing);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  // Device Orientation / Level sensor
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        setIsLevelSupported(true);
        // Gamma is left to right tilt in degrees (-90 to 90)
        setPhoneTilt(Math.round(e.gamma));
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  // Sync Overlay Settings to localStorage
  const updateSettings = (partial: Partial<OverlaySettings>) => {
    setOverlaySettings((prev) => {
      const updated = { ...prev, ...partial };
      saveOverlaySettings(updated);
      return updated;
    });
  };

  // Switch to next or previous pose in the same gender collection
  const currentIdx = allPoses.findIndex((p) => p.id === pose.id);
  const handleNextPose = () => {
    if (allPoses.length === 0) return;
    const nextIdx = (currentIdx + 1) % allPoses.length;
    onSelectPose(allPoses[nextIdx]);
  };
  const handlePrevPose = () => {
    if (allPoses.length === 0) return;
    const prevIdx = (currentIdx - 1 + allPoses.length) % allPoses.length;
    onSelectPose(allPoses[prevIdx]);
  };

  // Photo Capture Flow
  const triggerShutterCapture = () => {
    if (timerCountdown !== null) return;

    if (timerDuration === 0) {
      executeSnap();
    } else {
      let count = timerDuration;
      setTimerCountdown(count);
      if (!isAudioMuted) soundFx.playCountdownBeep(false);

      const interval = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setTimerCountdown(count);
          if (!isAudioMuted) soundFx.playCountdownBeep(false);
        } else {
          clearInterval(interval);
          setTimerCountdown(null);
          if (!isAudioMuted) soundFx.playCountdownBeep(true);
          executeSnap();
        }
      }, 1000);
    }
  };

  const executeSnap = () => {
    // Screen Flash effect
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 200);

    // Audio shutter click
    if (!isAudioMuted) soundFx.playShutterSound();

    // Canvas snapshot
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1920;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (cameraFacing === 'user') {
          // Mirror self-camera snapshot
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedImage(dataUrl);
        addRecentlyCaptured(pose.id);
      }
    } else {
      // Fallback placeholder snapshot if camera wasn't running
      setCapturedImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80');
      addRecentlyCaptured(pose.id);
    }
  };

  // Image Upload fallback for testing or offline
  const handleTestPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string);
        addRecentlyCaptured(pose.id);
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Pose Evaluation handler
  const handleAnalyzeWithAI = async () => {
    if (!capturedImage) return;
    setIsAnalyzingPose(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-pose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: capturedImage,
          poseId: pose.id,
          poseTitle: pose.title || pose.name,
          expectedPosture: {
            head: pose.headPosition,
            shoulders: pose.shoulderPosition || pose.bodyPosition,
            hands: pose.handPosition,
            legs: pose.legPosition || pose.bodyPosition,
            angle: pose.cameraAngle,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('AI Analysis failed:', err);
      setAnalysisError(err.message || 'Could not reach the coach analysis engine. Please try again.');
    } finally {
      setIsAnalyzingPose(false);
    }
  };

  // Download captured image
  const handleDownload = () => {
    if (!capturedImage) return;
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `PosePerfect-${pose.id}-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Level gauge indicator color
  const isLevel = Math.abs(phoneTilt) <= 2;

  return (
    <div className="relative h-[100dvh] w-full bg-black overflow-hidden flex flex-col justify-between select-none">
      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Screen flash on capture */}
      {screenFlash && <div className="absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-150" />}

      {/* Countdown overlay banner */}
      {timerCountdown !== null && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-cyan-400 bg-zinc-950/80 shadow-2xl animate-pulse">
            <span className="text-7xl font-black text-cyan-400">{timerCountdown}</span>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT: CAMERA VIDEO & OVERLAY */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        {/* Live Camera Stream */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`h-full w-full object-cover ${cameraFacing === 'user' ? '-scale-x-100' : ''}`}
        />

        {/* Permission Denied or No Camera Fallback Overlay */}
        {cameraError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-zinc-950/90 backdrop-blur-md">
            <AlertCircle className="h-12 w-12 text-amber-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Camera Access Required</h3>
            <p className="text-xs text-zinc-400 max-w-sm mb-4 leading-relaxed">
              {cameraError}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => startCamera(cameraFacing)}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-cyan-400"
              >
                Retry Camera
              </button>
              <label className="cursor-pointer rounded-xl border border-white/20 bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700">
                Upload Photo to Test Pose
                <input type="file" accept="image/*" className="hidden" onChange={handleTestPhotoUpload} />
              </label>
            </div>
          </div>
        )}

        {/* Rule of Thirds Photography Grid */}
        {showGrid && (
          <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 z-10">
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-white/20" />
            <div className="border-r border-white/20" />
            <div className="" />
          </div>
        )}

        {/* Ghost Pose Silhouette Overlay */}
        {isOverlayVisible && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <PoseOverlayGraphic pose={pose} settings={overlaySettings} />
          </div>
        )}

        {/* Phone Level Tilt Indicator (Live Gyroscope / Accelerometer) */}
        {isLevelSupported && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${
                isLevel
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-black/60 text-amber-300 border-amber-500/30'
              }`}
            >
              <span>{isLevel ? 'Level 0°' : `Tilt ${phoneTilt}°`}</span>
            </div>
          </div>
        )}

        {/* Real-time Pose Name & Quick coaching banner */}
        <div className="absolute bottom-28 left-4 right-4 z-20 pointer-events-none flex justify-center">
          <div className="max-w-md w-full rounded-xl bg-black/60 backdrop-blur-md border border-white/10 p-2.5 text-center text-white">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-0.5">
              <span>{pose.title || pose.name}</span>
              <span className="text-[10px] text-zinc-400">{pose.cameraAngle}</span>
            </div>
            <p className="text-[11px] text-zinc-300 truncate">
              💡 {pose.confidenceTip || 'Breathe out and relax your posture naturally.'}
            </p>
          </div>
        </div>
      </div>

      {/* TOP FLOATING CONTROLS BAR */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Back to catalog button */}
        <button
          id="camera-back-btn"
          onClick={onBackToPoses}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
          {/* Overlay Toggle */}
          <button
            onClick={() => setIsOverlayVisible(!isOverlayVisible)}
            title={isOverlayVisible ? 'Hide pose guide' : 'Show pose guide'}
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border transition-all ${
              isOverlayVisible
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-black/50 text-zinc-400 border-white/15'
            }`}
          >
            {isOverlayVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Rule of Thirds Grid"
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border transition-all ${
              showGrid
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-black/50 text-zinc-400 border-white/15'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>

          {/* Timer Selector */}
          <button
            onClick={() => {
              const next: Record<number, 0 | 3 | 5 | 10> = { 0: 3, 3: 5, 5: 10, 10: 0 };
              setTimerDuration(next[timerDuration]);
            }}
            title="Self Timer"
            className={`flex h-10 items-center gap-1 px-3 rounded-full backdrop-blur-md border text-xs font-semibold transition-all ${
              timerDuration > 0
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/50 text-zinc-400 border-white/15'
            }`}
          >
            <Timer className="h-4 w-4" />
            <span>{timerDuration === 0 ? 'Off' : `${timerDuration}s`}</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            title={isAudioMuted ? 'Unmute countdown beep' : 'Mute sound'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-zinc-300"
          >
            {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Overlay Fine Tuning Drawer Toggle */}
          <button
            id="camera-overlay-settings-btn"
            onClick={() => setShowControlDrawer(!showControlDrawer)}
            title="Adjust Overlay Guide"
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border transition-all ${
              showControlDrawer
                ? 'bg-cyan-500 text-zinc-950 border-cyan-400 font-bold'
                : 'bg-black/50 text-zinc-200 border-white/15'
            }`}
          >
            <Sliders className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* OVERLAY ADJUSTMENT DRAWER (When opened) */}
      {showControlDrawer && (
        <div className="absolute top-16 left-4 right-4 z-30 rounded-2xl bg-zinc-950/90 border border-white/15 p-4 text-xs text-zinc-200 backdrop-blur-xl shadow-2xl space-y-3.5 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Settings2 className="h-4 w-4 text-cyan-400" />
              <span>Pose Overlay Controls</span>
            </span>
            <button
              onClick={() =>
                updateSettings({
                  opacity: 0.65,
                  scale: 1.0,
                  offsetX: 0,
                  offsetY: 0,
                  isMirrored: false,
                })
              }
              className="text-xs text-cyan-400 hover:underline"
            >
              Reset Guide
            </button>
          </div>

          {/* Opacity Slider */}
          <div>
            <div className="flex justify-between text-zinc-400 mb-1 font-medium">
              <span>Transparency (Opacity)</span>
              <span className="text-white">{Math.round(overlaySettings.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={overlaySettings.opacity}
              onChange={(e) => updateSettings({ opacity: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Size / Scale Buttons */}
          <div>
            <span className="text-zinc-400 block mb-1.5 font-medium">Guide Scale</span>
            <div className="flex gap-2">
              {[
                { label: 'Small', val: 0.8 },
                { label: 'Medium', val: 1.0 },
                { label: 'Large', val: 1.25 },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => updateSettings({ scale: s.val })}
                  className={`flex-1 py-1.5 rounded-lg border text-center transition-all ${
                    overlaySettings.scale === s.val
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-white/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Position Nudge Buttons & Mirror */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-zinc-400 font-medium">Position & Mirror</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateSettings({ offsetY: overlaySettings.offsetY - 15 })}
                title="Nudge Up"
                className="p-1.5 bg-zinc-900 rounded border border-white/10 text-zinc-300"
              >
                ↑
              </button>
              <button
                onClick={() => updateSettings({ offsetY: overlaySettings.offsetY + 15 })}
                title="Nudge Down"
                className="p-1.5 bg-zinc-900 rounded border border-white/10 text-zinc-300"
              >
                ↓
              </button>
              <button
                onClick={() => updateSettings({ offsetX: overlaySettings.offsetX - 15 })}
                title="Nudge Left"
                className="p-1.5 bg-zinc-900 rounded border border-white/10 text-zinc-300"
              >
                ←
              </button>
              <button
                onClick={() => updateSettings({ offsetX: overlaySettings.offsetX + 15 })}
                title="Nudge Right"
                className="p-1.5 bg-zinc-900 rounded border border-white/10 text-zinc-300"
              >
                →
              </button>
              <button
                onClick={() => updateSettings({ isMirrored: !overlaySettings.isMirrored })}
                title="Mirror Silhouette"
                className={`px-2 py-1.5 rounded border text-xs flex items-center gap-1 ${
                  overlaySettings.isMirrored
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                    : 'bg-zinc-900 text-zinc-300 border-white/10'
                }`}
              >
                <FlipHorizontal className="h-3 w-3" />
                <span>Mirror</span>
              </button>
            </div>
          </div>

          {/* Guide Color Theme */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-zinc-400 font-medium">Guide Line Color</span>
            <div className="flex gap-1.5">
              {(['cyan', 'green', 'white', 'gold', 'rose'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => updateSettings({ colorTheme: color })}
                  className={`h-6 w-6 rounded-full border-2 ${
                    overlaySettings.colorTheme === color ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor:
                      color === 'cyan'
                        ? '#06b6d4'
                        : color === 'green'
                        ? '#10b981'
                        : color === 'white'
                        ? '#ffffff'
                        : color === 'gold'
                        ? '#f59e0b'
                        : '#f43f5e',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM CAMERA CONTROLS: POSE CAROUSEL + SHUTTER + CAM FLIP */}
      <div className="relative z-30 flex flex-col items-center pb-6 pt-3 px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        {/* Quick Prev / Next Pose Switcher */}
        <div className="flex items-center justify-between w-full max-w-sm mb-3">
          <button
            id="camera-prev-pose-btn"
            onClick={handlePrevPose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-zinc-300 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev Pose</span>
          </button>

          <span className="text-xs font-semibold text-zinc-300 px-3 py-1 bg-black/40 rounded-full border border-white/10">
            {currentIdx + 1} / {allPoses.length}
          </span>

          <button
            id="camera-next-pose-btn"
            onClick={handleNextPose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-zinc-300 hover:text-white"
          >
            <span className="hidden sm:inline">Next Pose</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Primary Shutter Row */}
        <div className="flex items-center justify-between w-full max-w-sm px-6">
          {/* Fallback Photo Upload or Gallery Button */}
          <label
            title="Upload or pick a test photo"
            className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/20 text-zinc-300 hover:text-white active:scale-95"
          >
            <Camera className="h-5 w-5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleTestPhotoUpload} />
          </label>

          {/* MAIN BIG SHUTTER BUTTON */}
          <button
            id="camera-shutter-btn"
            onClick={triggerShutterCapture}
            className="group relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-transparent p-1 transition-transform active:scale-90"
          >
            <div className="h-full w-full rounded-full bg-white group-hover:bg-zinc-200 transition-colors shadow-lg" />
          </button>

          {/* Camera Flip (Front / Back) */}
          <button
            id="camera-switch-lens-btn"
            onClick={() => setCameraFacing((prev) => (prev === 'user' ? 'environment' : 'user'))}
            title="Switch front/rear camera"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/20 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* CAPTURE REVIEW & AI FEEDBACK MODAL (Shows after snapping photo) */}
      {capturedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[94vh] overflow-y-auto rounded-3xl border border-white/20 bg-zinc-900 shadow-2xl p-4 sm:p-6 text-zinc-100 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Photo Captured!</h3>
                <p className="text-xs text-zinc-400">Comparing with: {pose.title || pose.name}</p>
              </div>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  setAnalysisResult(null);
                  setAnalysisError(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Retake Photo
              </button>
            </div>

            {/* Side by Side Preview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400">Your Photo</span>
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black h-56 sm:h-72 flex items-center justify-center">
                  <img src={capturedImage} alt="Your capture" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-cyan-400">Target Pose Guide</span>
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black h-56 sm:h-72 flex items-center justify-center relative">
                  <PoseOverlayGraphic
                    pose={pose}
                    settings={{ ...overlaySettings, opacity: 0.9, scale: 0.95 }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-zinc-400 bg-black/70 py-1 px-2 rounded-lg">
                    {pose.bodyPosition.slice(0, 32)}...
                  </div>
                </div>
              </div>
            </div>

            {/* AI "Check My Pose" Coaching Section */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">AI Pose Coach Feedback</h4>
                    <p className="text-[11px] text-zinc-400">Evaluates posture, framing & angle (strictly posture-focused)</p>
                  </div>
                </div>

                {!analysisResult && (
                  <button
                    id="ai-analyze-pose-btn"
                    onClick={handleAnalyzeWithAI}
                    disabled={isAnalyzingPose}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all"
                  >
                    {isAnalyzingPose ? (
                      <>
                        <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Check My Pose</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* AI Feedback Analysis Output */}
              {analysisResult && (
                <div className="space-y-3 pt-2 border-t border-white/10 animate-in fade-in">
                  <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-white/10">
                    <div>
                      <span className="text-xs text-zinc-400">Alignment Match</span>
                      <p className="text-xs text-zinc-200">{analysisResult.summary}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-cyan-400">{analysisResult.score}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* What you did right */}
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        What You Did Right
                      </span>
                      <ul className="space-y-1 text-zinc-300">
                        {analysisResult.matchedPoints.map((pt: string, i: number) => (
                          <li key={i}>✓ {pt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Adjustments */}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                      <span className="font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Tips for Next Shot
                      </span>
                      <ul className="space-y-1 text-zinc-300">
                        {analysisResult.adjustments.map((adj: string, i: number) => (
                          <li key={i}>• {adj}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {analysisResult.cameraTip && (
                    <p className="text-xs text-cyan-300 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
                      📷 Camera Tip: {analysisResult.cameraTip}
                    </p>
                  )}
                </div>
              )}

              {analysisError && (
                <p className="text-xs text-rose-400 bg-rose-950/30 p-2 rounded-xl border border-rose-500/20">
                  {analysisError}
                </p>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-zinc-950 font-bold py-3 text-xs hover:bg-zinc-200 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Save to Device</span>
              </button>

              <button
                onClick={() => {
                  setCapturedImage(null);
                  setAnalysisResult(null);
                }}
                className="flex items-center justify-center gap-1.5 px-4 rounded-xl bg-zinc-800 text-zinc-200 font-semibold py-3 text-xs hover:bg-zinc-700"
              >
                <span>Take Another Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
