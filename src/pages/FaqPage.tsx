import React, { useState } from 'react';
import { FAQS } from '../data/clinicData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface FaqPageProps {
  onNavigateContact: () => void;
  onOpenEmergency: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onNavigateContact,
  onOpenEmergency
}) => {
  const [openIds, setOpenIds] = useState<number[]>([1, 2, 8]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'General',
    'Scaling & Cleaning',
    'Braces & Aligners',
    'Treatments',
    'Hygiene'
  ];

  const toggleAccordion = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(FAQS.map(f => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = FAQS.filter(f => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Clear Answers • Transparent Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Got questions regarding root canals, teeth scaling, braces, or dental implants? Here are expert answers directly from our senior clinicians.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={expandAll}
                className="hover:text-blue-600 transition-colors underline"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="hover:text-blue-600 transition-colors underline"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion List (All 14 questions from PDF) */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 shadow-md ring-1 ring-blue-500/10'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {faq.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`p-1.5 rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in duration-150 pl-14 sm:pl-16">
                    <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Have a specific question about your teeth?</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Dr. Anupriya and our friendly team are happy to assist via chat, phone, or in-person consultation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNavigateContact}
              className="bg-white text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Contact Us Directly
            </button>
            <button
              onClick={onOpenEmergency}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Emergency Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
