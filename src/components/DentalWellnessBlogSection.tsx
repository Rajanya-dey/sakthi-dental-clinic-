import React, { useState, useEffect, useRef } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticlesData';
import {
  Sparkles,
  Clock,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  HeartPulse,
  ArrowRight,
  X,
  User,
  Smile,
  Sun,
  Moon,
  Tag,
  Stethoscope,
  Share2,
  Check
} from 'lucide-react';

export interface WellnessTip {
  id: string;
  season: string;
  seasonCategory: 'winter_monsoon' | 'festival_sweets' | 'summer' | 'kids_family' | 'stress_night';
  seasonBadge: string;
  title: string;
  summary: string;
  actionableSteps: string[];
  doctorQuote: string;
  doctorName: string;
  doctorRole: string;
  treatmentId: string;
  treatmentName: string;
  accentColor: string;
}

export const SEASONAL_WELLNESS_TIPS: WellnessTip[] = [
  {
    id: 'tip-winter-sensitivity',
    season: 'Winter & Monsoon Season (Hosur Climate)',
    seasonCategory: 'winter_monsoon',
    seasonBadge: 'Seasonal Advisory',
    title: 'Why Do Teeth Hurt in Cold Morning Air? How to Guard Exposed Dentin',
    summary: 'Cool morning temperatures in Hosur cause microscopic fluid in dentin tubules to contract rapidly, sending sudden electric sensitivity to the pulp nerve.',
    actionableSteps: [
      'Brush with lukewarm water rather than cold tap water during winter and rainy mornings.',
      'Apply potassium nitrate desensitizing toothpaste directly to sensitive spots with a fingertip 1 minute before brushing.',
      'Avoid sudden thermal shock: do not drink ice-cold water immediately after piping-hot tea or filter coffee.'
    ],
    doctorQuote: 'Dentin hypersensitivity spikes by 40% in Hosur during cooler months. A simple routine adjustment plus an in-office desensitizing fluoride varnish seals open tubules within minutes.',
    doctorName: 'Dr. Anupriya',
    doctorRole: 'Founder & Chief Dental Surgeon',
    treatmentId: 'teeth-cleaning-scaling',
    treatmentName: 'Teeth Cleaning & Desensitizing Varnish',
    accentColor: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'tip-festival-sweets',
    season: 'Festival & Wedding Season',
    seasonCategory: 'festival_sweets',
    seasonBadge: 'Holiday Care',
    title: 'Enjoying Festival Sweets Without Triggering Sudden Acid Cavities',
    summary: 'Sticky traditional sweets like Mysore Pak, jalebis, and gulab jamun lodge deeply in tooth grooves for hours, feeding streptococcus mutans bacteria.',
    actionableSteps: [
      'Eat sweets alongside main meals rather than continuous grazing—saliva production is naturally at its peak during mealtime to buffer acids.',
      'Swish mouth thoroughly with plain drinking water within 2 minutes of eating sticky sweets to wash away 70% of residual sugars.',
      'Wait 30 minutes before brushing after acidic or sweet drinks so softened enamel has time to remineralize.'
    ],
    doctorQuote: 'It is not just the quantity of sweets, but how many hours sticky sugars stay stuck between molars. A quick 10-second water swish cuts acid time dramatically.',
    doctorName: 'Dr. Anupriya',
    doctorRole: 'Chief Dental Surgeon',
    treatmentId: 'teeth-cleaning-scaling',
    treatmentName: 'Preventive Cleaning & Checkup',
    accentColor: 'from-amber-500 to-rose-500'
  },
  {
    id: 'tip-summer-drymouth',
    season: 'Summer Heat & Hydration',
    seasonCategory: 'summer',
    seasonBadge: 'Hydration Defense',
    title: 'Beating Dry Mouth (Xerostomia) & Safeguarding Natural Saliva Defense',
    summary: 'Hot summer weather rapidly dehydrates oral tissues, depriving teeth of saliva’s natural calcium, phosphate, and antibacterial remineralization wash.',
    actionableSteps: [
      'Drink at least 2.5 to 3 liters of water throughout the day; sip consistently rather than chugging all at once.',
      'Chew sugar-free xylitol gum for 5 minutes after snacks to jumpstart salivary flow and neutralize plaque acids.',
      'Limit dark fizzy sodas and artificial energy drinks whose high citric acid content softens enamel within 60 seconds.'
    ],
    doctorQuote: 'Saliva is your mouth’s natural shield. When hydration drops, cavities, gum irritation, and morning bad breath escalate rapidly.',
    doctorName: 'Dr. Sneha N',
    doctorRole: 'Consultant Orthodontist & Oral Specialist',
    treatmentId: 'pediatric-dentistry',
    treatmentName: 'Fluoride Therapy & Mineral Polish',
    accentColor: 'from-orange-500 to-amber-500'
  },
  {
    id: 'tip-kids-molar-sealant',
    season: 'School Term Pediatric Care',
    seasonCategory: 'kids_family',
    seasonBadge: 'Children Oral Health',
    title: 'Protecting 6-Year-Old First Molars with 15-Minute Dental Sealants',
    summary: 'Permanent first molars erupt behind baby teeth around age 6 with narrow, pin-deep pits that children’s toothbrush bristles cannot reach.',
    actionableSteps: [
      'Inspect your child’s mouth for permanent molars emerging behind baby teeth without replacing any fallen tooth.',
      'Ask your dentist about BPA-free pit-and-fissure sealants that seal microscopic grooves against 80% of childhood cavities.',
      'Replace sticky lunchbox gummy snacks with crisp apple slices or cheese sticks that naturally scrub tooth surfaces.'
    ],
    doctorQuote: 'A single 15-minute painless sealant over deep molar grooves shields your child against painful emergency fillings for years.',
    doctorName: 'Dr. Anupriya',
    doctorRole: 'Pediatric Smile Care Specialist',
    treatmentId: 'pediatric-dentistry',
    treatmentName: 'Pediatric Cavity Prevention & Sealants',
    accentColor: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'tip-stress-nightguard',
    season: 'Workplace & Exam Stress Care',
    seasonCategory: 'stress_night',
    seasonBadge: 'Nighttime Wellness',
    title: 'Waking with Morning Temple Headaches or Jaw Stiffness? Check for Bruxism',
    summary: 'Subconscious nighttime teeth clenching exerts up to 250 lbs of pressure, causing micro-fractures in enamel and severe TMJ joint soreness.',
    actionableSteps: [
      'Look for flattened canine tips, notched enamel near the gumline, or morning temple headaches.',
      'Practice 5 minutes of mindful jaw release before sleep: lips closed, teeth gently separated, tongue resting on roof of mouth.',
      'Wear a precision dual-laminate nightguard to cushion teeth and eliminate morning jaw strain.'
    ],
    doctorQuote: 'Nocturnal grinding silently wears down millimeters of enamel before patients feel pain. A custom nightguard preserves your natural smile.',
    doctorName: 'Dr. Sneha N',
    doctorRole: 'Consultant Orthodontist & TMJ Specialist',
    treatmentId: 'orthodontic-treatment',
    treatmentName: 'Nightguard & TMJ Assessment',
    accentColor: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'tip-aligner-commute-hygiene',
    season: 'Active Daily Orthodontic Routine',
    seasonCategory: 'kids_family',
    seasonBadge: 'Clear Aligners Tip',
    title: 'Keeping Clear Aligners & Retainers Crystal Clear While Traveling',
    summary: 'Patients commuting daily between Hosur and Bangalore need practical habits to keep clear aligners completely invisible and stain-free.',
    actionableSteps: [
      'Never drink hot filter coffee, tea, or turmeric milk with aligners in—heat warps plastic and stains them instantly.',
      'Always store trays in their hard ventilated case when eating; never wrap them in paper restaurant napkins that get thrown away.',
      'Rinse with cool water and gently brush aligners with clear liquid soap; avoid abrasive colored toothpastes.'
    ],
    doctorQuote: 'Over 85% of lost aligners happen because patients wrap them in napkins during meals. Keep your protective case with you at all times.',
    doctorName: 'Dr. Sneha N',
    doctorRole: 'Consultant Orthodontist',
    treatmentId: 'clear-aligners',
    treatmentName: 'Clear Aligners Consultation',
    accentColor: 'from-pink-600 to-rose-600'
  }
];

interface DentalWellnessBlogSectionProps {
  onOpenAppointment: () => void;
  onSelectTreatment: (treatmentId: string) => void;
}

export const DentalWellnessBlogSection: React.FC<DentalWellnessBlogSectionProps> = ({
  onOpenAppointment,
  onSelectTreatment
}) => {
  // Rotating tips state
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<string>('all');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Articles state
  const [selectedArticleCategory, setSelectedArticleCategory] = useState<string>('all');
  const [activeModalArticle, setActiveModalArticle] = useState<BlogArticle | null>(null);
  const [hasCopiedShare, setHasCopiedShare] = useState(false);

  // Filtered tips
  const filteredTips =
    selectedSeasonFilter === 'all'
      ? SEASONAL_WELLNESS_TIPS
      : SEASONAL_WELLNESS_TIPS.filter(t => t.seasonCategory === selectedSeasonFilter);

  const currentTip = filteredTips[currentTipIndex % filteredTips.length] || SEASONAL_WELLNESS_TIPS[0];

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlay) return;
    timerRef.current = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % filteredTips.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, filteredTips.length]);

  const handleNextTip = () => {
    setCurrentTipIndex(prev => (prev + 1) % filteredTips.length);
  };

  const handlePrevTip = () => {
    setCurrentTipIndex(prev => (prev - 1 + filteredTips.length) % filteredTips.length);
  };

  const handleShuffleTip = () => {
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * filteredTips.length);
    } while (nextIdx === currentTipIndex && filteredTips.length > 1);
    setCurrentTipIndex(nextIdx);
  };

  // Filtered articles
  const filteredArticles =
    selectedArticleCategory === 'all'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter(a => a.category.toLowerCase() === selectedArticleCategory.toLowerCase());

  const handleCopyShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setHasCopiedShare(true);
      setTimeout(() => setHasCopiedShare(false), 2000);
    } catch {
      setHasCopiedShare(true);
      setTimeout(() => setHasCopiedShare(false), 2000);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
              <span>Dental Wellness Blog & Seasonal Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Clinical Oral Health Advice for Hosur Families
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Real guidance from Dr. Anupriya and specialist surgeons. Rotate through seasonal oral wellness tips or dive into detailed medical treatment guides.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShuffleTip}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
              title="Shuffle new seasonal wellness tip"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Shuffle Advice</span>
            </button>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all hover:scale-102 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-blue-200" />
              <span>Book Checkup</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROTATING SEASONAL ADVICE SHOWCASE BANNER */}
        {/* ========================================================================= */}
        <div
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 p-6 sm:p-10 relative overflow-hidden transition-all duration-300"
        >
          {/* Subtle colored glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar of Rotating Card */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentTip.seasonBadge}</span>
              </span>

              <span className="text-xs text-slate-300 font-medium">
                {currentTip.season}
              </span>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {filteredTips.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTipIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      (currentTipIndex % filteredTips.length) === idx
                        ? 'w-6 bg-cyan-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`View tip ${idx + 1}`}
                    aria-label={`Go to tip ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 pl-2 border-l border-slate-700">
                <button
                  type="button"
                  onClick={handlePrevTip}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Previous tip"
                  aria-label="Previous tip"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextTip}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Next tip"
                  aria-label="Next tip"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body of Current Tip */}
          <div className="relative z-10 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                {currentTip.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentTip.summary}
              </p>

              {/* Actionable Steps Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Actionable Steps for Patients:
                </span>
                <ul className="space-y-2">
                  {currentTip.actionableSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card: Doctor Clinical Quote & Fast Action */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                  {currentTip.doctorName.charAt(3) || 'D'}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {currentTip.doctorName}
                  </h4>
                  <p className="text-[11px] text-pink-300">{currentTip.doctorRole}</p>
                </div>
              </div>

              <blockquote className="text-xs text-slate-300 italic border-l-2 border-pink-500/80 pl-3 leading-relaxed">
                "{currentTip.doctorQuote}"
              </blockquote>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTreatment(currentTip.treatmentId);
                    onOpenAppointment();
                  }}
                  className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-blue-200" />
                  <span>Consult for {currentTip.treatmentName}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOCTOR CLINICAL ARTICLES GRID */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Doctor-Authored Dental Articles & Guides
              </h3>
              <p className="text-xs text-slate-500">
                Deep clinical explanations written specifically for patients by our Hosur specialists.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['all', 'preventive', 'orthodontics', 'cosmetic', 'surgery'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedArticleCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 cursor-pointer ${
                    selectedArticleCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Guides' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-blue-600 uppercase tracking-wider text-[11px]">
                      {article.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-1.5">
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Key Takeaways preview */}
                  {article.keyTakeaways && article.keyTakeaways[0] && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Key Clinical Takeaway:
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-snug flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{article.keyTakeaways[0]}</span>
                      </p>
                    </div>
                  )}

                  {/* Author Doctor */}
                  <div className="pt-2 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                      {article.author.charAt(3) || 'D'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 leading-tight truncate">
                        {article.author}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {article.authorRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Published {article.publishedDate}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveModalArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer group-hover:translate-x-0.5 duration-150"
                  >
                    <span>Read Doctor Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CLINICAL ARTICLE MODAL */}
      {/* ========================================================================= */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 z-10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                {activeModalArticle.category} • {activeModalArticle.readTime}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Share article link"
                >
                  {hasCopiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalArticle(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {activeModalArticle.title}
                </h3>
                <p className="text-sm font-semibold text-pink-700 leading-relaxed">
                  {activeModalArticle.subtitle}
                </p>
              </div>

              {/* Doctor Author Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {activeModalArticle.author.charAt(3) || 'D'}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{activeModalArticle.author}</h5>
                    <p className="text-[11px] text-slate-500">{activeModalArticle.authorRole}</p>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 shrink-0">
                  {activeModalArticle.publishedDate}
                </span>
              </div>

              {/* Key Takeaways */}
              {activeModalArticle.keyTakeaways && activeModalArticle.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Clinical Takeaways for Patients</span>
                  </h5>
                  <ul className="space-y-1.5">
                    {activeModalArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Content Sections */}
              <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                {activeModalArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {sec.heading}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Doctor Clinical Quote */}
              {activeModalArticle.clinicalQuote && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-pink-50 border border-blue-200 space-y-1">
                  <p className="text-xs text-slate-800 italic leading-relaxed">
                    "{activeModalArticle.clinicalQuote.text}"
                  </p>
                  <p className="text-[11px] font-bold text-slate-600 text-right">
                    — {activeModalArticle.clinicalQuote.doctorName}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Sticky Bottom Action */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 hidden sm:inline">
                Related: <strong>{activeModalArticle.relatedTreatmentName}</strong>
              </span>

              <button
                type="button"
                onClick={() => {
                  const treatmentId = activeModalArticle.relatedTreatmentId;
                  setActiveModalArticle(null);
                  onSelectTreatment(treatmentId);
                  onOpenAppointment();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-blue-200" />
                <span>Book Consultation for this Treatment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
