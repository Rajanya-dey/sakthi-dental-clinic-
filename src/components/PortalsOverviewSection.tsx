import React from 'react';
import { UserRole, UserSession } from '../types';
import {
  User,
  Stethoscope,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileText,
  CalendarCheck,
  Pill,
  Sparkles,
  BarChart3,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface PortalsOverviewSectionProps {
  activeSession: UserSession | null;
  onEnterPortal: (role: UserRole) => void;
}

export const PortalsOverviewSection: React.FC<PortalsOverviewSectionProps> = ({
  activeSession,
  onEnterPortal
}) => {
  const portals = [
    {
      role: 'patient' as UserRole,
      title: 'Patient Health Portal',
      badge: 'For Patients & Families',
      description: 'Access your complete dental journey in one unified, confidential place.',
      icon: User,
      color: 'from-pink-500 to-rose-600',
      lightBg: 'bg-pink-50/70 border-pink-200/80',
      iconBg: 'bg-pink-100 text-pink-700',
      features: [
        'Upcoming appointment reminders & rescheduling',
        'Official digital prescriptions (Rx) & dosage schedules',
        'Clinical medical case sheets & treatment timeline',
        'Submit direct patient reviews & star ratings'
      ],
      ctaText: 'Enter Patient Portal (OTP)'
    },
    {
      role: 'doctor' as UserRole,
      title: 'Doctor Clinical Suite',
      badge: 'For Specialist Doctors',
      description: 'Empowering our 9 specialist dental surgeons with clinical tools.',
      icon: Stethoscope,
      color: 'from-blue-600 to-cyan-600',
      lightBg: 'bg-blue-50/70 border-blue-200/80',
      iconBg: 'bg-blue-100 text-blue-700',
      features: [
        'Live consultation queue & appointment status updates',
        'Write digital prescriptions with dosage & advice',
        'Inspect full patient medical histories & past notes',
        'Duty roster, consultation hours & department view'
      ],
      ctaText: 'Enter Doctor Portal (OTP)'
    },
    {
      role: 'admin' as UserRole,
      title: 'Hospital Admin Portal',
      badge: 'For Reception & Operations',
      description: 'Front-desk operations, appointment scheduling, and patient flow monitoring.',
      icon: Lock,
      color: 'from-indigo-600 to-purple-600',
      lightBg: 'bg-indigo-50/70 border-indigo-200/80',
      iconBg: 'bg-indigo-100 text-indigo-700',
      features: [
        'Central appointment booking & patient triage table',
        'Real-time queue wait-time calculator & status rules',
        'Staff and doctor credential directory management',
        'Patient feedback moderation & inquiries resolution'
      ],
      ctaText: 'Enter Admin Portal (OTP)'
    }
  ];

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            <span>Structured Digital Gateways</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            One Unified Clinic • Three Dedicated Portals
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether you are a patient checking your treatment, a consulting doctor writing prescriptions, or our administrative team managing appointments — enter your dedicated workspace securely via OTP.
          </p>
        </div>

        {/* 3 Structured Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {portals.map(p => {
            const Icon = p.icon;
            const isCurrentlyActive = activeSession?.role === p.role;

            return (
              <div
                key={p.role}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isCurrentlyActive
                    ? 'ring-2 ring-blue-600 bg-white shadow-lg border-blue-300'
                    : 'bg-white shadow-sm border-slate-200/90'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${p.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities
                    </p>
                    <ul className="space-y-2">
                      {p.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onEnterPortal(p.role)}
                    className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isCurrentlyActive
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                        : 'bg-slate-900 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <span>
                      {isCurrentlyActive ? `Open Active ${p.title}` : p.ctaText}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Verified via 6-digit OTP code (Email/Phone)
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
