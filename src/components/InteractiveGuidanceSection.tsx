import React, { useState } from 'react';
import {
  Bot,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  PhoneCall
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface InteractiveGuidanceSectionProps {
  onOpenChatbot: () => void;
  onOpenAppointment: () => void;
  onNavigateFaqs: () => void;
}

export const InteractiveGuidanceSection: React.FC<InteractiveGuidanceSectionProps> = ({
  onOpenChatbot,
  onOpenAppointment,
  onNavigateFaqs
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const guidanceFaqs = [
    {
      q: 'Is root canal therapy (RCT) really painless at Sakthi Dental Clinic?',
      a: 'Yes. With modern digital RVG radiography, localized computer-assisted anesthesia, and rotary endodontic instruments, modern RCT is completely painless. Dr. Meera (MDS Endodontist) preserves your natural tooth in 1–2 gentle sittings.'
    },
    {
      q: 'Does ultrasonic teeth cleaning (scaling) make teeth loose or cause gaps?',
      a: 'This is a common myth. Ultrasonic scaling gently vibrates to dislodge calcified tartar without scraping your enamel. Once tartar is removed, inflamed gums heal and grip the teeth firmly again.'
    },
    {
      q: 'What is the difference between invisible clear aligners and traditional braces?',
      a: 'Clear aligners are transparent, removable plastic trays that straighten teeth discreetly without metal wires or diet restrictions. Traditional ceramic or metal braces are bonded to teeth and are exceptionally effective for complex bite corrections.'
    },
    {
      q: 'How does emergency dental care work for sudden severe toothache?',
      a: 'We provide immediate emergency walk-ins daily from 9 AM to 9 PM at Anthivadi, Hosur. You can call our direct emergency line for instant doctor triage and prompt relief.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: AI GUIDANCE SPOTLIGHT (Signature dental.com Smart Care Guidance) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-pink-600" />
              <span>Smart Care Guidance • dental.com Style</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Know What to Do Next with Clinical AI Triage
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Experiencing sensitivity, gum bleeding, or jaw discomfort? Take our confidential 2-minute oral wellness assessment or chat with our assistant for instant advice.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Oral Wellness Assessment Quiz
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Evaluates 5 symptoms & recommends specialist care
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenChatbot}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Bot className="w-4 h-4" />
                <span>Launch AI Health Assistant 💬</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Free & Confidential • Verified by Dr. Anupriya</span>
            </div>
          </div>

          {/* RIGHT: TOP CLINICAL FAQS ACCORDION */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-black text-slate-900">
                  Frequently Asked Questions
                </h3>
              </div>
              <button
                onClick={onNavigateFaqs}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Patient FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {guidanceFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-blue-300 shadow-md ring-1 ring-blue-100'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                    >
                      <span className="font-bold text-sm text-slate-900 leading-snug">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
