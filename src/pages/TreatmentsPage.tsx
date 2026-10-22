import React, { useState } from 'react';
import { TREATMENTS } from '../data/clinicData';
import { Treatment } from '../types';
import { InsurancePaymentsSection } from '../components/InsurancePaymentsSection';
import { TREATMENT_FINANCIAL_ESTIMATES } from '../data/insurancePaymentData';
import {
  Search,
  CalendarCheck,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  Info,
  X,
  CreditCard,
  ShieldCheck,
  Percent
} from 'lucide-react';

interface TreatmentsPageProps {
  onOpenAppointment: () => void;
  onSelectTreatment: (treatmentId: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onOpenAppointment,
  onSelectTreatment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(null);
  const [selectedEmiTreatmentId, setSelectedEmiTreatmentId] = useState<string | undefined>(undefined);

  const categories = [
    'All',
    'General',
    'Orthodontics',
    'Cosmetic',
    'Surgery',
    'Pediatric',
    'Prosthodontics'
  ];

  const filteredTreatments = TREATMENTS.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBook = (treatmentId?: string) => {
    if (treatmentId) {
      onSelectTreatment(treatmentId);
    }
    onOpenAppointment();
  };

  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Comprehensive Clinical Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Dental Treatments
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore all 15 specialized procedures performed by Dr. Anupriya and our team of senior dental specialists at Sakthi Dental Clinic, Hosur.
          </p>

          {/* Quick Section Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('treatments-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Browse All 15 Procedures
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('insurance-payments');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                try {
                  window.dispatchEvent(
                    new CustomEvent('sdc_page_context', {
                      detail: {
                        page: 'treatments',
                        section: 'insurance',
                        title: 'Accepted Insurance & 0% EMI Options'
                      }
                    })
                  );
                } catch {
                  // Ignore
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>Accepted Insurance & 0% EMI Options ➔</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div id="treatments-catalog" className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search treatments (e.g., Scaling, Implants, Braces, Whitening)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-semibold text-slate-500 shrink-0">
              Showing {filteredTreatments.length} of {TREATMENTS.length} Treatments
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid (All 15 treatments) */}
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Info className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No treatments found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-blue-600 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map(treatment => (
              <div
                key={treatment.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Treatment Card Image */}
                  <div className="h-52 overflow-hidden bg-slate-100 relative">
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
                      <div className="absolute top-3 right-3 bg-pink-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                        {treatment.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {treatment.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    {/* Bullet features */}
                    {treatment.features && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        {treatment.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Financial EMI indicator if estimated */}
                    {(() => {
                      const est = TREATMENT_FINANCIAL_ESTIMATES.find(e => e.id === treatment.id);
                      if (!est) return null;
                      return (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="font-bold text-blue-900 flex items-center gap-1">
                            <Percent className="w-3 h-3 text-blue-600" />
                            <span>0% EMI: <strong>₹{est.emiStartingFrom.toLocaleString('en-IN')}/mo</strong></span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEmiTreatmentId(treatment.id);
                              const el = document.getElementById('insurance-payments');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                          >
                            Calculate
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Actions: Learn More modal & Book button */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => {
                      setActiveModalTreatment(treatment);
                      try {
                        window.dispatchEvent(
                          new CustomEvent('sdc_page_context', {
                            detail: {
                              page: 'treatments',
                              treatmentId: treatment.id,
                              title: treatment.name
                            }
                          })
                        );
                      } catch {
                        // Ignore
                      }
                    }}
                    className="w-full text-xs font-bold text-slate-600 hover:text-blue-600 py-1.5 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Read Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleBook(treatment.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all active:scale-95"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Fix Appointment for {treatment.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal for full in-depth description from PDF */}
        {activeModalTreatment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100">
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={activeModalTreatment.imageUrl}
                  alt={activeModalTreatment.name}
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveModalTreatment(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-pink-600 text-xs font-bold px-2.5 py-0.5 rounded-md mb-1">
                    {activeModalTreatment.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">
                    {activeModalTreatment.name}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Clinical Overview & Protocol
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {activeModalTreatment.fullDescription}
                  </p>
                </div>

                {activeModalTreatment.features && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Key Highlights & Patient Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {activeModalTreatment.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insurance & 0% EMI Support Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 p-4 rounded-2xl border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-extrabold text-slate-900">
                        Insurance Claims & 0% EMI Supported
                      </div>
                      <div className="text-slate-600 text-[11px]">
                        Cashless TPA paperwork support + No-cost monthly installments available for this treatment.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const id = activeModalTreatment.id;
                      setActiveModalTreatment(null);
                      setSelectedEmiTreatmentId(id);
                      const el = document.getElementById('insurance-payments');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs whitespace-nowrap shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    Check EMI & Insurance ➔
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      const id = activeModalTreatment.id;
                      setActiveModalTreatment(null);
                      handleBook(id);
                    }}
                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md text-sm transition-all"
                  >
                    Fix Appointment for {activeModalTreatment.name}
                  </button>
                  <button
                    onClick={() => setActiveModalTreatment(null)}
                    className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPREHENSIVE INSURANCE & 0% EMI PAYMENTS SECTION */}
        {/* ========================================================================= */}
        <InsurancePaymentsSection
          onOpenAppointment={handleBook}
          preselectedTreatmentId={selectedEmiTreatmentId}
        />
      </div>
    </div>
  );
};
