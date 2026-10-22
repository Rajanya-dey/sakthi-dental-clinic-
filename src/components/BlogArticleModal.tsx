import React from 'react';
import { BlogArticle } from '../data/blogArticlesData';
import {
  X,
  BookOpen,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  CalendarCheck,
  Share2,
  Quote,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BlogArticleModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTreatment: (treatmentId: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookTreatment
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-blue-100 border border-white/25">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-blue-200">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-blue-300">•</span>
            <span className="text-[11px] text-blue-200">{article.publishedDate}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {article.title}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-white/15 text-xs text-blue-100">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs border border-white/30">
              {article.author.split(' ')[1]?.[0] || 'D'}
            </div>
            <div>
              <div className="font-extrabold text-white">{article.author}</div>
              <div className="text-[10px] text-blue-200">{article.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Key Clinical Takeaways Box */}
          <div className="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Key Clinical Takeaways</span>
            </div>
            <ul className="space-y-2">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {section.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}

          {/* Doctor Quote */}
          {article.clinicalQuote && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-4 rounded-2xl border border-amber-200/90 flex gap-3 text-xs">
              <Quote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="italic text-slate-800 font-medium">
                  "{article.clinicalQuote.text}"
                </div>
                <div className="font-bold text-amber-900">
                  — {article.clinicalQuote.doctorName}
                </div>
              </div>
            </div>
          )}

          {/* Related Treatment Action Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Related Treatment Procedure
              </span>
              <div className="font-extrabold text-slate-900 text-sm">
                {article.relatedTreatmentName}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookTreatment(article.relatedTreatmentId);
              }}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-slate-600 border border-slate-200"
              >
                #{t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 bg-slate-100 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
