import React, { useState } from 'react';
import { TREATMENTS } from '../data/clinicData';
import { ArrowRight, CalendarCheck, Sparkles, Check, Clock, ShieldCheck } from 'lucide-react';

interface CoreTreatmentsSectionProps {
  onViewAllTreatments: () => void;
  onBookTreatment: (treatmentId: string) => void;
}

export const CoreTreatmentsSection: React.FC<CoreTreatmentsSectionProps> = ({
  onViewAllTreatments,
  onBookTreatment
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'general', label: 'Preventive & Scaling' },
    { id: 'cosmetic', label: 'Aligners & Whitening' },
    { id: 'restorative', label: 'Composite Fillings & Dentures' },
    { id: 'surgery', label: 'Painless Extractions' }
  ];

  // Core treatments specified in clinic profile
  const coreIds = [
    'teeth-cleaning-scaling',
    'tooth-filling',
    'tooth-extraction',
    'artificial-complete-denture',
    'teeth-whitening-bleaching',
    'orthodontic-treatment'
  ];

  const allCore = coreIds
    .map(id => TREATMENTS.find(t => t.id === id))
    .filter(Boolean) as typeof TREATMENTS;

  const filtered = allCore.filter(t => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'general') return t.id.includes('cleaning') || t.category === 'General';
    if (activeCategory === 'cosmetic') return t.id.includes('whitening') || t.id.includes('ortho') || t.category === 'Cosmetic';
    if (activeCategory === 'restorative') return t.id.includes('filling') || t.id.includes('denture');
    if (activeCategory === 'surgery') return t.id.includes('extraction') || t.category === 'Surgery';
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Specialized Dental Procedures • The Dentique Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Clinical Treatments Designed for Your Comfort
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every procedure is carried out with computer-guided precision, painless local anesthesia, and hospital-grade sterilization in Hosur.
            </p>
          </div>

          <button
            onClick={onViewAllTreatments}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 shrink-0 self-start md:self-auto"
          >
            <span>View Full Treatment Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs (The Dentique & dental.com signature structure) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all shrink-0 border-b-2 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-blue-700 border-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(treatment => {
            return (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Treatment Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={treatment.imageUrl}
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-blue-700 shadow-xs border border-blue-100">
                      {treatment.category}
                    </div>
                    {treatment.badge && (
                      <div className="absolute top-3 right-3 bg-pink-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                        {treatment.badge}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    {/* Features List */}
                    {treatment.features && (
                      <ul className="pt-2 space-y-1.5 text-xs text-slate-600">
                        {treatment.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onBookTreatment(treatment.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors duration-200 border border-blue-200/60 cursor-pointer shadow-2xs"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book {treatment.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Catalog Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              Need Root Canal, Dental Implants, or Custom Aligners?
            </h4>
            <p className="text-xs text-slate-500">
              Explore our full catalog of 15 advanced clinical procedures with transparent pricing.
            </p>
          </div>
          <button
            onClick={onViewAllTreatments}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Explore All 15 Treatments →
          </button>
        </div>
      </div>
    </section>
  );
};
