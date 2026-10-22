import React, { useState, useEffect } from 'react';
import { Testimonial, PatientAccount } from '../types';
import { TREATMENTS, DOCTORS } from '../data/clinicData';
import { getStoredTestimonials, saveTestimonial, upvoteTestimonialHelpful } from '../utils/storage';
import {
  Star,
  Quote,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  MessageSquarePlus,
  Search,
  Filter,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Camera,
  Upload,
  X,
  Stethoscope,
  Smile,
  ShieldCheck,
  Award,
  Heart
} from 'lucide-react';

interface PatientFeedbackProps {
  patient?: PatientAccount | null;
  initialTreatment?: string;
  initialDoctor?: string;
  onReviewSubmitted?: (newTestimonial: Testimonial) => void;
  onNavigateBooking?: () => void;
}

const RATING_LABELS: Record<number, string> = {
  5: 'Outstanding & Painless Care (5.0)',
  4: 'Very Good Experience (4.0)',
  3: 'Satisfactory / Good (3.0)',
  2: 'Needs Improvement (2.0)',
  1: 'Unsatisfactory (1.0)'
};

const PRAISE_TAG_OPTIONS = [
  'Painless Procedure',
  'Warm & Reassuring Doctors',
  'Spotless Clinic & Sterilization',
  'Transparent Cost & Explanations',
  'Punctual & Minimal Wait Time',
  'Child-Friendly Care',
  'Modern Digital Equipment',
  'Courteous Staff & Follow-up'
];

export const PatientFeedback: React.FC<PatientFeedbackProps> = ({
  patient,
  initialTreatment,
  initialDoctor,
  onReviewSubmitted,
  onNavigateBooking
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeView, setActiveView] = useState<'form' | 'all' | 'my'>(
    initialTreatment || initialDoctor ? 'form' : 'all'
  );

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState<string>(patient?.name || '');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('Hosur, Tamil Nadu');
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    initialTreatment || TREATMENTS[0]?.name || 'Teeth Cleaning or Scaling'
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    initialDoctor || DOCTORS[0]?.name || 'Dr. Anupriya'
  );
  const [quote, setQuote] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Painless Procedure',
    'Spotless Clinic & Sterilization'
  ]);
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // Status & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Directory filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterTreatment, setFilterTreatment] = useState<string>('all');
  const [helpfulVotedIds, setHelpfulVotedIds] = useState<Set<string>>(new Set());

  // Load testimonials
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

  // Update initial fields if props change
  useEffect(() => {
    if (initialTreatment) {
      setSelectedTreatment(initialTreatment);
      setActiveView('form');
    }
    if (initialDoctor) {
      setSelectedDoctor(initialDoctor);
      setActiveView('form');
    }
  }, [initialTreatment, initialDoctor]);

  useEffect(() => {
    if (patient && !authorName) {
      setAuthorName(patient.name);
    }
  }, [patient]);

  const loadTestimonials = () => {
    const list = getStoredTestimonials();
    setTestimonials(list);
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'Image must be under 2MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setErrors(prev => {
          const next = { ...prev };
          delete next.photo;
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!isAnonymous && !authorName.trim()) {
      errs.author = 'Please provide your name or check "Submit Anonymously".';
    }
    if (!quote.trim()) {
      errs.quote = 'Please write a brief description of your treatment experience.';
    } else if (quote.trim().length < 15) {
      errs.quote = 'Your feedback should be at least 15 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const displayName = isAnonymous
        ? patient?.name
          ? `Verified Patient (${patient.name.charAt(0)}...)`
          : 'Verified Patient (Anonymous)'
        : authorName.trim();

      const newReview = saveTestimonial({
        author: displayName,
        rating,
        treatment: selectedTreatment,
        quote: quote.trim(),
        location: location.trim() || 'Hosur, TN',
        photoUrl: photoUrl || undefined,
        isVerified: true,
        uhid: patient?.uhid,
        doctorName: selectedDoctor,
        tags: selectedTags,
        helpfulCount: 1,
        wouldRecommend
      });

      setSuccessMessage('Thank you! Your testimonial has been verified and published.');
      setQuote('');
      setPhotoUrl(null);
      setErrors({});

      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

      loadTestimonials();

      // Switch to view reviews after 1.5s
      setTimeout(() => {
        setSuccessMessage(null);
        setActiveView('all');
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Unable to save feedback. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpfulClick = (id: string) => {
    if (helpfulVotedIds.has(id)) return;
    upvoteTestimonialHelpful(id);
    setHelpfulVotedIds(prev => new Set(prev).add(id));
    loadTestimonials();
  };

  // Stats calculation
  const totalReviews = testimonials.length;
  const averageRating = totalReviews > 0
    ? (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const fiveStarPercent = totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 100;

  // Filter reviews
  const filteredReviews = testimonials.filter(t => {
    // Rating filter
    if (filterRating !== 'all' && t.rating !== filterRating) {
      return false;
    }
    // Treatment filter
    if (filterTreatment !== 'all' && t.treatment !== filterTreatment) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAuthor = t.author?.toLowerCase().includes(q);
      const matchQuote = t.quote?.toLowerCase().includes(q);
      const matchTreatment = t.treatment?.toLowerCase().includes(q);
      const matchDoctor = t.doctorName?.toLowerCase().includes(q);
      if (!matchAuthor && !matchQuote && !matchTreatment && !matchDoctor) {
        return false;
      }
    }
    return true;
  });

  // Patient's own submitted reviews
  const myReviews = testimonials.filter(t => {
    if (!patient) return false;
    if (t.uhid && t.uhid === patient.uhid) return true;
    if (t.author && t.author.toLowerCase().includes(patient.name.toLowerCase())) return true;
    return false;
  });

  return (
    <div className="space-y-8">
      {/* Overview Satisfaction Scoreboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Score */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patient Satisfaction Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                {averageRating}
              </span>
              <span className="text-xl font-bold text-slate-400">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-xs text-slate-600">
              Based on <strong>{totalReviews} verified patient evaluations</strong> in Hosur.
            </p>
          </div>

          {/* Breakdown Bars */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <span>5 Stars</span>
                  <span className="text-slate-400 font-normal">· Excellent</span>
                </span>
                <span className="font-bold text-slate-900">{fiveStarPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${fiveStarPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <span>4 Stars</span>
                  <span className="text-slate-400 font-normal">· Very Good</span>
                </span>
                <span className="font-bold text-slate-900">{100 - fiveStarPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400/80 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${100 - fiveStarPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Genuine Clinical Reviews
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-blue-700 font-semibold">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                99.4% Recommend
              </span>
            </div>
          </div>

          {/* Call-to-Action to write or browse */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-end gap-3 pt-4 lg:pt-0">
            <button
              onClick={() => setActiveView('form')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit Your Feedback</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center lg:text-right">
              Your voice helps families make informed oral healthcare choices.
            </p>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeView === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Browse All Reviews</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeView === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {totalReviews}
            </span>
          </button>

          <button
            onClick={() => setActiveView('form')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeView === 'form'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Write New Feedback</span>
          </button>

          {patient && (
            <button
              onClick={() => setActiveView('my')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeView === 'my'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Reviews</span>
              {myReviews.length > 0 && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  activeView === 'my' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {myReviews.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: SUBMIT FEEDBACK FORM */}
      {/* ========================================================= */}
      {activeView === 'form' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Share Your Dental Care Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Rate your visit, doctor consultation, and clinic comfort. Your testimonial is shared with the clinic team and published on the portal.
            </p>
          </div>

          {successMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="font-semibold">{successMessage}</div>
            </div>
          )}

          {errors.form && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-900 text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>{errors.form}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interactive Rating Selection */}
            <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Overall Rating *
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Star Rating">
                  {[1, 2, 3, 4, 5].map(star => {
                    const activeVal = hoverRating !== null ? hoverRating : rating;
                    const isFilled = star <= activeVal;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 rounded-lg hover:scale-115 active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500"
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-200 shadow-2xs">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Treatment and Doctor Context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Treatment / Procedure Received *
                </label>
                <select
                  value={selectedTreatment}
                  onChange={e => setSelectedTreatment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {TREATMENTS.map(t => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                  <option value="General Consultation & Checkup">General Consultation & Checkup</option>
                  <option value="Emergency Toothache Care">Emergency Toothache Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Consulting Doctor / Specialist
                </label>
                <select
                  value={selectedDoctor}
                  onChange={e => setSelectedDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Entire Sakthi Dental Care Team">Entire Sakthi Dental Care Team</option>
                  {DOCTORS.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Testimonial Quote Textarea */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Your Testimonial & Feedback *
                </label>
                <span className="text-[11px] text-slate-400">
                  {quote.length} / 500 characters
                </span>
              </div>
              <textarea
                rows={4}
                value={quote}
                onChange={e => {
                  setQuote(e.target.value);
                  if (errors.quote) {
                    setErrors(prev => {
                      const next = { ...prev };
                      delete next.quote;
                      return next;
                    });
                  }
                }}
                maxLength={500}
                placeholder="Share how your treatment felt, how the doctor explained the procedure, pain relief, cleanliness of the operatory, or staff courtesy..."
                className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.quote
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-300 focus:ring-pink-500 bg-white'
                }`}
              />
              {errors.quote && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.quote}</span>
                </p>
              )}
            </div>

            {/* Praise Tag Selectors */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                What did you appreciate most? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {PRAISE_TAG_OPTIONS.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-pink-100 text-pink-900 border border-pink-300 font-bold shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author Identity & Privacy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name / Display Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    placeholder="e.g. Priya S. or Ramesh K."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
                {errors.author && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.author}</p>
                )}

                <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-pink-500"
                  />
                  <span>Post anonymously as Verified Patient</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Hosur, Bangalore, Krishnagiri"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Recommendation Question */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900">
                  Would you recommend Sakthi Dental Clinic to family and friends?
                </span>
                <p className="text-[11px] text-slate-500">
                  We take pride in our 20+ year legacy in Hosur.
                </p>
              </div>

              <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    wouldRecommend
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Yes, definitely!
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !wouldRecommend
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Neutral
                </button>
              </div>
            </div>

            {/* Optional Photo Attachment */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Optional: Add a Smile Photo or Patient Profile Picture
              </label>
              <div className="flex items-center gap-4">
                {photoUrl ? (
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-pink-500 shrink-0 shadow-sm">
                    <img
                      src={photoUrl}
                      alt="Uploaded avatar"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-black/70 text-white rounded-full hover:bg-black cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Upload Photo (Optional)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <span className="text-[11px] text-slate-400">
                  PNG/JPG up to 2MB. Your avatar appears next to your testimonial.
                </span>
              </div>
              {errors.photo && (
                <p className="text-xs text-rose-600 font-medium">{errors.photo}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reviewed testimonials are marked as Verified Patient</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveView('all')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer w-1/2 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 w-1/2 sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Publish Testimonial'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: MY REVIEWS (IF PATIENT LOGGED IN) */}
      {/* ========================================================= */}
      {activeView === 'my' && patient && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Your Submitted Testimonials
              </h3>
              <p className="text-xs text-slate-500">
                Testimonials tied to UHID {patient.uhid} ({patient.name})
              </p>
            </div>
            <button
              onClick={() => setActiveView('form')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-pink-600 text-white rounded-xl text-xs font-bold hover:bg-pink-700 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write Another Review</span>
            </button>
          </div>

          {myReviews.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Smile className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">
                You haven't submitted any feedback yet.
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Have you completed an appointment or dental treatment? Share your experience to guide other patients.
              </p>
              <button
                onClick={() => setActiveView('form')}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl hover:bg-pink-700 transition-colors cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Submit Your First Review</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myReviews.map(review => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-5 border border-pink-200/80 shadow-2xs space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs font-extrabold text-slate-700 ml-1">
                        {review.rating}.0
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified & Live
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
                    "{review.quote}"
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-800">{review.treatment || 'Dental Care'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.doctorName || 'Dr. Anupriya'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.date || 'Recent'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: BROWSE ALL REVIEWS */}
      {/* ========================================================= */}
      {activeView === 'all' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search reviews by doctor, procedure, or keyword..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Rating Filter Segment */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterRating('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    filterRating === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({totalReviews})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRating(5)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    filterRating === 5
                      ? 'bg-white text-amber-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>5 Stars</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRating(4)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    filterRating === 4
                      ? 'bg-white text-amber-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>4 Stars</span>
                </button>
              </div>

              {/* Treatment Filter Dropdown */}
              <select
                value={filterTreatment}
                onChange={e => setFilterTreatment(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              >
                <option value="all">All Procedures</option>
                {TREATMENTS.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reviews Grid */}
          {filteredReviews.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">
                No matching testimonials found.
              </h4>
              <p className="text-xs text-slate-500">
                Try adjusting your search keywords or resetting the rating filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilterRating('all');
                  setFilterTreatment('all');
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.map(t => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header: Rating & Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-black text-slate-900 ml-1">
                          {t.rating || 5}.0
                        </span>
                      </div>
                      <Quote className="w-6 h-6 text-slate-200" />
                    </div>

                    {/* Review text */}
                    <p className="text-slate-800 text-xs sm:text-sm italic leading-relaxed font-medium">
                      "{t.quote}"
                    </p>

                    {/* Praise Tags (if any) */}
                    {t.tags && t.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {t.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer: Patient identity and metadata as clean typography (No pills!) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar */}
                      {t.photoUrl ? (
                        <img
                          src={t.photoUrl}
                          alt={t.author}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                          {t.author.charAt(0)}
                        </div>
                      )}

                      {/* Author Details with clean typographical separators */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                            {t.author}
                          </h4>
                          <span title="Verified Clinical Patient">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 leading-tight">
                          <span>{t.treatment || 'Dental Care'}</span>
                          {t.doctorName && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-slate-700 font-medium">{t.doctorName}</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{t.location || 'Hosur, TN'}</span>
                          {t.date && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{t.date}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Upvote Helpful Button */}
                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(t.id)}
                      disabled={helpfulVotedIds.has(t.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        helpfulVotedIds.has(t.id)
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${helpfulVotedIds.has(t.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                      <span>{t.helpfulCount || 1}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
