import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Smile, Award, Clock } from 'lucide-react';

interface OralHealthQuizBannerProps {
  onStartQuiz: () => void;
}

export const OralHealthQuizBanner: React.FC<OralHealthQuizBannerProps> = ({ onStartQuiz }) => {
  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-pink-900 text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text & Chips */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/25 border border-pink-400/40 text-pink-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
              <span>Interactive Oral Wellness Assessment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Unsure which dental care is right for you?{' '}
              <span className="text-pink-300">Take our 2-minute assessment.</span>
            </h2>

            <p className="text-blue-100 text-xs sm:text-sm sm:leading-relaxed">
              Answer 5 quick clinical questions about your brushing routine, sensitivity, or alignment goals to receive personalized dental care tips and tailored specialist treatment recommendations.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-blue-200 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>Takes ~2 minutes</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free & Confidential</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Hosur Specialist Matching</span>
              </span>
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="shrink-0 w-full sm:w-auto text-center">
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold text-slate-900 bg-white hover:bg-pink-50 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <Smile className="w-5 h-5 text-pink-600 group-hover:rotate-12 transition-transform" />
              <span>Take 2-Min Oral Wellness Assessment</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-pink-200/90 mt-2 font-medium">
              Doctor-curated questions • Instant advice • No sign-up required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
