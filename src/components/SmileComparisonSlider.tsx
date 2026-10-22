import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, Eye, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface SmileComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string; // e.g. 'aspect-[4/3]' or 'aspect-[16/10]'
  initialPosition?: number; // 0 to 100
  title?: string;
}

export const SmileComparisonSlider: React.FC<SmileComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Treatment',
  afterLabel = 'After Transformation',
  aspectRatio = 'aspect-[4/3]',
  initialPosition = 50,
  title
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize initial position when changing cases
  useEffect(() => {
    setSliderPosition(initialPosition);
  }, [beforeImage, afterImage, initialPosition]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleInteractionEnd);
      window.addEventListener('touchcancel', handleInteractionEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
      window.removeEventListener('touchcancel', handleInteractionEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  const setPreset = (pos: number) => {
    setSliderPosition(pos);
  };

  return (
    <div className={`flex flex-col gap-3 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950/95 p-4 sm:p-8 overflow-y-auto flex items-center justify-center' : 'w-full'}`}>
      {/* Outer Card / Image Viewport */}
      <div className={`relative w-full ${isFullscreen ? 'max-w-5xl' : ''}`}>
        <div
          ref={containerRef}
          tabIndex={0}
          role="slider"
          aria-label={title ? `${title} comparison slider` : 'Before and after smile comparison slider'}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
          onMouseDown={e => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={e => {
            setIsDragging(true);
            if (e.touches[0]) handleMove(e.touches[0].clientX);
          }}
          className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 bg-slate-900 select-none cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-blue-500/40`}
        >
          {/* AFTER Image (Base Layer - 100% visible underneath) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          {/* BEFORE Image (Overlay with dynamic clip-path) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Vertical Divider Line with handle */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Divider Line */}
            <div className="w-[3px] sm:w-[4px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" />

            {/* Draggable Circle Handle */}
            <div
              className={`absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.45)] border-2 border-blue-600 flex items-center justify-center transition-transform pointer-events-auto cursor-ew-resize ${
                isDragging ? 'scale-110 ring-4 ring-blue-500/50 bg-blue-50' : 'hover:scale-105'
              }`}
            >
              <ChevronsLeftRight className="w-5 h-5 text-blue-700 animate-pulse" />
            </div>
          </div>

          {/* Corner Floating Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none transition-opacity duration-200"
               style={{ opacity: sliderPosition < 15 ? 0.3 : 1 }}>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black tracking-wider uppercase bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>BEFORE</span>
            </span>
          </div>

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 pointer-events-none transition-opacity duration-200"
               style={{ opacity: sliderPosition > 85 ? 0.3 : 1 }}>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black tracking-wider uppercase bg-blue-900/80 backdrop-blur-md text-emerald-300 border border-emerald-400/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AFTER</span>
            </span>
          </div>

          {/* Bottom Drag Instruction Prompt (Fades out once user drags) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-slate-900/75 backdrop-blur-md text-white border border-white/20 shadow-md">
              <ChevronsLeftRight className="w-3 h-3 text-blue-300" />
              <span className="hidden sm:inline">Drag slider or tap presets to compare</span>
              <span className="sm:hidden">Swipe to compare</span>
            </span>
          </div>

          {/* Fullscreen Expand/Minimize Toggle */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              setIsFullscreen(prev => !prev);
            }}
            className="absolute bottom-3 right-3 z-20 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
            title={isFullscreen ? 'Close full screen view' : 'Expand full screen'}
            aria-label={isFullscreen ? 'Close full screen view' : 'Expand full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Position Presets Toolbar */}
        <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setPreset(100)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                sliderPosition >= 95
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              100% Before
            </button>

            <button
              type="button"
              onClick={() => setPreset(50)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                sliderPosition >= 45 && sliderPosition <= 55
                  ? 'bg-blue-100 text-blue-900 border border-blue-300 shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              50 / 50 Split
            </button>

            <button
              type="button"
              onClick={() => setPreset(0)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                sliderPosition <= 5
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              100% After
            </button>

            <button
              type="button"
              onClick={() => setPreset(50)}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors hidden sm:inline-flex cursor-pointer"
              title="Reset slider to center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 font-semibold truncate">
            Revealing: <span className="text-blue-700 font-bold">{Math.round(sliderPosition)}% Before</span> /{' '}
            <span className="text-emerald-700 font-bold">{100 - Math.round(sliderPosition)}% After</span>
          </div>
        </div>
      </div>
    </div>
  );
};
