import React, { useState } from 'react';
import {
  SmileComparisonSlider
} from './SmileComparisonSlider';
import {
  SMILE_GALLERY_CASES,
  GALLERY_CATEGORIES,
  SmileCase
} from '../data/smileGalleryData';
import {
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  Clock,
  User,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Star,
  Quote,
  ArrowRight,
  Info
} from 'lucide-react';

interface SmileGallerySectionProps {
  onBookTreatment?: (treatmentId: string) => void;
  onExploreTreatments?: () => void;
  compact?: boolean;
}

export const SmileGallerySection: React.FC<SmileGallerySectionProps> = ({
  onBookTreatment,
  onExploreTreatments,
  compact = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SMILE_GALLERY_CASES[0].id);

  // Filter cases based on category
  const filteredCases = selectedCategory === 'all'
    ? SMILE_GALLERY_CASES
    : SMILE_GALLERY_CASES.filter(c => c.category === selectedCategory);

  // Ensure active case is valid within the filtered list
  const activeCase = filteredCases.find(c => c.id === selectedCaseId) || filteredCases[0] || SMILE_GALLERY_CASES[0];

  return (
    <section id="smile-gallery" className={`relative bg-gradient-to-b from-slate-50 via-white to-blue-50/40 ${compact ? 'py-8' : 'py-16 sm:py-24'} overflow-hidden`}>
      {/* Subtle ambient gradient highlights */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Real Transformations • Hosur Clinic</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Before & After{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Smile Gallery
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore real clinical transformations treated by Dr. Anupriya and our 9 in-house specialists.
              Drag the interactive slider to inspect dental alignment, whitening radiance, and porcelain restoration results up close.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 sm:gap-6 bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm shrink-0">
            <div className="text-center border-r border-slate-100 pr-4">
              <div className="text-lg sm:text-2xl font-black text-blue-700">15,000+</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">Smiles Restored</div>
            </div>
            <div className="text-center border-r border-slate-100 pr-4">
              <div className="text-lg sm:text-2xl font-black text-pink-700">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">Real Patients</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">4.9 / 5.0</div>
                <div className="text-[10px] text-slate-500">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none no-scrollbar">
          {GALLERY_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const matchingCase = SMILE_GALLERY_CASES.find(
                    c => cat.id === 'all' || c.category === cat.id
                  );
                  if (matchingCase) setSelectedCaseId(matchingCase.id);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Case Selector Thumbnails Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mb-8">
          {filteredCases.map(item => {
            const isSelected = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCaseId(item.id)}
                className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/30'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Micro thumbnail */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[8px] font-black px-1 rounded-tl">
                    AFTER
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-blue-700 block truncate uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* MAIN SPOTLIGHT: Interactive Comparison Tool + Case Study Dossier */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column (Desktop 7 cols): Interactive Slider Component */}
            <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-700 uppercase tracking-wider text-[11px] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {activeCase.categoryLabel}
                    </span>
                    <span className="text-slate-400 font-bold">•</span>
                    <span className="text-slate-600 font-semibold">{activeCase.patientProfile}</span>
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    Duration: {activeCase.duration}
                  </span>
                </div>

                {/* The Comparison Slider Engine */}
                <SmileComparisonSlider
                  key={activeCase.id}
                  beforeImage={activeCase.beforeImage}
                  afterImage={activeCase.afterImage}
                  beforeLabel={activeCase.beforeLabel}
                  afterLabel={activeCase.afterLabel}
                  title={activeCase.title}
                  initialPosition={50}
                  aspectRatio="aspect-[4/3]"
                />
              </div>

              {/* Slider Footnote */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Unretouched Clinical Macro Photography</span>
                </span>
                <span className="font-mono text-slate-400">Ref Case #{activeCase.id}</span>
              </div>
            </div>

            {/* Right Column (Desktop 5 cols): Clinical Case Details & Booking Action */}
            <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {activeCase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {activeCase.subtitle}
                  </p>
                </div>

                {/* Attending Doctor */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-2xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Attending Specialist
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      {activeCase.doctor}
                    </div>
                    <div className="text-[11px] text-blue-700 font-semibold">
                      {activeCase.sessions}
                    </div>
                  </div>
                </div>

                {/* Clinical Challenge & Solution */}
                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Initial Condition & Chief Complaint:</span>
                    </div>
                    <p className="text-slate-600 pl-3 border-l-2 border-rose-200 leading-relaxed">
                      {activeCase.chiefComplaint}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Clinical Solution Applied:</span>
                    </div>
                    <p className="text-slate-600 pl-3 border-l-2 border-emerald-200 leading-relaxed">
                      {activeCase.clinicalSolution}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {activeCase.resultMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left"
                    >
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {metric.label}
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                        {metric.value}
                      </div>
                      {metric.sublabel && (
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          {metric.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Patient Testimonial Quote */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl relative text-xs">
                  <Quote className="w-4 h-4 text-blue-400 absolute top-3 right-3 opacity-60" />
                  <p className="text-slate-700 italic pr-4 leading-relaxed font-medium">
                    "{activeCase.patientQuote}"
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-blue-900">
                    — Verified Sakthi Dental Clinic Patient
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onBookTreatment) {
                      onBookTreatment(activeCase.treatmentId);
                    }
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <CalendarCheck className="w-4 h-4 text-blue-200" />
                  <span>Consult for this Treatment</span>
                </button>

                {onExploreTreatments && (
                  <button
                    type="button"
                    onClick={onExploreTreatments}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View All Clinic Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer / Ethics assurance */}
        <div className="mt-6 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Photography Notice:</strong> All photographs showcased represent genuine treatments conducted at Sakthi Dental Clinic (Anthivadi, Hosur) with informed patient consent. Individual clinical results and timelines may vary based on pre-existing oral condition, periodontal health, and treatment compliance.
          </p>
        </div>
      </div>
    </section>
  );
};
