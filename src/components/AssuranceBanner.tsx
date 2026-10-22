import React, { useState } from 'react';
import { CLINIC_BANNERS } from '../data/clinicData';
import { ShieldCheck, Sparkles, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

export const AssuranceBanner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevBanner = () => {
    setActiveIndex(prev => (prev === 0 ? CLINIC_BANNERS.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setActiveIndex(prev => (prev === CLINIC_BANNERS.length - 1 ? 0 : prev + 1));
  };

  const current = CLINIC_BANNERS[activeIndex];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Welcome Message / Trust Quote from PDF */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>Assurance & Patient Comfort</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                You are always in{' '}
                <span className="text-pink-400 underline decoration-pink-500/40 underline-offset-8">
                  safe hands.
                </span>
                <br />
                We are ready to help,{' '}
                <span className="text-blue-300">anytime.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 pt-2">
                At Sakthi Dental Clinic, every patient is received with gentle warmth, sterilized clinical safety, and transparent treatment counseling. Step into our modern Hosur facility designed to put children, mothers, and elderly patients completely at ease.
              </p>
            </div>

            {/* Quick Tour Navigation Tabs */}
            <div className="pt-2">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Explore Our Clinic Facility:
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {CLINIC_BANNERS.map((banner, idx) => (
                  <button
                    key={banner.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeIndex === idx
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {idx + 1}. {banner.caption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Banner Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800 group">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Banner Text Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-blue-600/90 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                  {current.caption}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {current.title}
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm max-w-xl">
                  {current.subtitle}
                </p>
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Next view"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
