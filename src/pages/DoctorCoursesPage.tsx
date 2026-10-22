import React from 'react';
import { DoctorCoursesSection } from '../components/DoctorCoursesSection';
import { Sparkles, CalendarCheck, Award, Stethoscope, ArrowLeft } from 'lucide-react';

interface DoctorCoursesPageProps {
  onOpenAppointment: () => void;
  onSelectDoctor: (doctorId: string) => void;
  onNavigateHome: () => void;
}

export const DoctorCoursesPage: React.FC<DoctorCoursesPageProps> = ({
  onOpenAppointment,
  onSelectDoctor,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-200 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-black uppercase tracking-wider border border-blue-400/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>State Dental Council (DCI) Accredited Clinical Programs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Doctor Clinical Courses & Fellowship Academy
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Taught by Dr. Anupriya (Founder & Senior Dental Surgeon) and our postgraduate MDS faculty. Master real chairside procedures: single-visit rotary endodontics, 3D digital clear aligners, titanium implant surgery, and diode lasers with 1-on-1 surgical guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
            <span className="flex items-center gap-1.5 font-bold">
              <Stethoscope className="w-4 h-4 text-pink-400" />
              <span>Conducted at Sakthi Dental Operatory, Anthivadi, Hosur</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-amber-300" />
              <span>DCI CDE Certification Awarded</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Courses Section Component */}
      <DoctorCoursesSection
        onOpenAppointment={onOpenAppointment}
        onSelectDoctor={onSelectDoctor}
        className="!border-t-0"
      />
    </div>
  );
};
