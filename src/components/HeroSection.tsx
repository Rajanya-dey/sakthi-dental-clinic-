import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import {
  CalendarCheck,
  ShieldAlert,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onExploreTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAppointment,
  onOpenEmergency,
  onExploreTreatments
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-pink-50/30 pt-8 pb-16 sm:py-20 lg:py-24">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Subtext & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-800 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Hosur’s Premier Family Dental Clinic</span>
            </div>

            {/* Main Headline from PDF */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Specialized Dental Care for{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Women, Children & Families
              </span>
            </h1>

            {/* Subtext from PDF */}
            <p className="text-sm sm:text-base lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Experience compassionate, expert-led dental services tailored to your needs, all in a modern and welcoming environment.
            </p>

            {/* CTAs from PDF */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5 text-blue-200" />
                <span>Fix an Appointment</span>
              </button>

              <button
                onClick={onOpenEmergency}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 shadow-xs transition-all duration-200 active:scale-95"
              >
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Emergency Dental Support</span>
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Painless Treatment Tech</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>9 In-House Specialists</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Walk-ins Daily 9 AM - 9 PM</span>
              </span>
            </div>
          </div>

          {/* Right Column: Visual Trust Presentation */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinical Operatory Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Sakthi Dental Clinic Reception and Operatory"
                  className="w-full h-[280px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Sakthi Dental Clinic • Hosur
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">
                        Founded by Dr. Anupriya (BDS)
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-900">4.9/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Desktop/Tablet Only */}
              <div className="hidden sm:flex absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-slate-100 items-center gap-3 animate-in fade-in duration-500">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900">20+ Years</div>
                  <div className="text-[11px] text-slate-500 font-medium">Clinical Excellence</div>
                </div>
              </div>

              {/* Floating Stat Card 2: Desktop/Tablet Only */}
              <div className="hidden sm:flex absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-slate-100 items-center gap-3 animate-in fade-in duration-500">
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900">15,000+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Smiles Celebrated</div>
                </div>
              </div>

              {/* Mobile Inline Stat Cards (Prevents negative coordinate horizontal overflow) */}
              <div className="grid grid-cols-2 gap-2 mt-3 sm:hidden">
                <div className="bg-white rounded-xl shadow-xs p-2.5 border border-slate-200 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 leading-tight">20+ Years</div>
                    <div className="text-[10px] text-slate-500">Excellence</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-xs p-2.5 border border-slate-200 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 leading-tight">15,000+</div>
                    <div className="text-[10px] text-slate-500">Happy Smiles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
