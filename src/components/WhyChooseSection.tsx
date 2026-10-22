import React from 'react';
import { WHY_CHOOSE_US } from '../data/clinicData';
import { Sparkles, Stethoscope, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-7 h-7 text-blue-600" />,
    Stethoscope: <Stethoscope className="w-7 h-7 text-pink-600" />,
    HeartHandshake: <HeartHandshake className="w-7 h-7 text-indigo-600" />,
    ShieldCheck: <ShieldCheck className="w-7 h-7 text-emerald-600" />
  };

  const bgMap: Record<string, string> = {
    Sparkles: 'bg-blue-50 border-blue-100 group-hover:border-blue-200',
    Stethoscope: 'bg-pink-50 border-pink-100 group-hover:border-pink-200',
    HeartHandshake: 'bg-indigo-50 border-indigo-100 group-hover:border-indigo-200',
    ShieldCheck: 'bg-emerald-50 border-emerald-100 group-hover:border-emerald-200'
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Our Clinical Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Sakthi Dental Clinic?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Founded in 2004 with a heartfelt vision to make high-quality, specialized dental care accessible to every woman, child, and family in Hosur.
          </p>
        </div>

        {/* 4 Pillars Grid from PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative flex flex-col justify-between ${bgMap[item.icon]}`}
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon]}
                </div>
                <div className="text-xs font-bold text-slate-400 mb-1">
                  Pillar 0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified Standard of Care</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
