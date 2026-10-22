import React, { useState, useEffect } from 'react';
import { getStoredTestimonials } from '../utils/storage';
import { Testimonial } from '../types';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HeartHandshake,
  MessageSquarePlus,
  MapPin,
  Sparkles
} from 'lucide-react';
import { ShareExperienceModal } from './ShareExperienceModal';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    loadTestimonials();
    const handleUpdate = () => {
      loadTestimonials();
    };
    window.addEventListener('sdc_testimonials_updated', handleUpdate);
    return () => {
      window.removeEventListener('sdc_testimonials_updated', handleUpdate);
    };
  }, []);

  const loadTestimonials = () => {
    const list = getStoredTestimonials();
    setTestimonials(list);
  };

  const handleTestimonialSubmitted = (newTestimonial: Testimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev]);
    setCurrentIdx(0);
  };

  const prev = () => {
    setCurrentIdx(i => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIdx(i => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Real Stories & Social Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Read first-hand feedback from patients and guardians who trusted Sakthi Dental Clinic for their smiles.
            </p>
          </div>

          {/* Share Your Experience Button */}
          <div className="shrink-0">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid (Responsive, displaying patient photos when available) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`p-8 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between group ${
                currentIdx === idx
                  ? 'bg-white border-blue-300 shadow-xl ring-2 ring-blue-500/10 -translate-y-1'
                  : 'bg-white/80 border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">
                      {testimonial.rating}.0
                    </span>
                  </div>
                  <Quote className="w-8 h-8 text-blue-100" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6 font-medium">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author & Optional Photo */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {testimonial.photoUrl ? (
                    <img
                      src={testimonial.photoUrl}
                      alt={testimonial.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-pink-400 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {testimonial.author.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {testimonial.author}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {testimonial.treatment || 'Verified Patient'}
                    </p>
                    {testimonial.location && (
                      <p className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-pink-500" />
                        <span>{testimonial.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0" title="Verified Review">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator if many reviews */}
        {testimonials.length > 3 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIdx === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Share Modal */}
        <ShareExperienceModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onTestimonialSubmitted={handleTestimonialSubmitted}
        />
      </div>
    </section>
  );
};
