import React from 'react';
import { ABOUT_STORY, DOCTORS, CLINIC_INFO } from '../data/clinicData';
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Heart,
  Target,
  Sparkles,
  Stethoscope,
  GraduationCap
} from 'lucide-react';

interface AboutUsPageProps {
  onOpenAppointment: () => void;
  onSelectDoctor: (doctorId: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenAppointment,
  onSelectDoctor
}) => {
  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Section 1: Dr. Anupriya Profile & Story from PDF */}
        <section className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Dr. Anupriya Photo & Badges */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80"
                  alt="Dr. Anupriya, Founder of Sakthi Dental Clinic"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block bg-pink-600 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-1">
                    Founder & Senior Dental Surgeon
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Dr. Anupriya</h3>
                  <p className="text-xs text-blue-200 font-medium">
                    BDS • 20+ Years Clinical Practice
                  </p>
                </div>
              </div>

              {/* Career Milestone Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Graduated 2000</p>
                    <p className="text-slate-500 text-[11px]">20+ Yrs Practice</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-pink-50 border border-pink-100 flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-pink-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Founded 2004</p>
                    <p className="text-slate-500 text-[11px]">Sakthi Dental Hosur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Anupriya Biographical Copy from PDF */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {ABOUT_STORY.subheading}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {ABOUT_STORY.headline}
                </h1>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {ABOUT_STORY.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 3 ? 'font-semibold text-slate-800 italic' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    onSelectDoctor('doc-1');
                    onOpenAppointment();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all active:scale-95 text-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation with Dr. Anupriya</span>
                </button>

                <div className="text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Chandara Hospital PHC</p>
                  <p>Trusted Consultant for Over a Decade</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Vision & Mission from PDF */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-blue-800 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-800/80 text-blue-300 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Our Mission</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                {ABOUT_STORY.mission}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-800/80 text-xs text-blue-300 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Compassionate • Advanced • Patient-Centric</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-pink-900 via-rose-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-pink-800 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-800/80 text-pink-300 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Our Vision</h2>
              <p className="text-pink-100 text-sm leading-relaxed">
                {ABOUT_STORY.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-pink-800/80 text-xs text-pink-300 flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Leading Force in Community Dental Health</span>
            </div>
          </div>
        </section>

        {/* Section 3: Our Team of Doctors (All 9 Doctors from PDF) */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Multidisciplinary Dental Panel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Team of Doctors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From routine care to complex oral surgeries, meet our certified specialist panel serving Hosur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.map((doctor, index) => (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-slate-100 relative">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 shadow-xs border border-blue-100">
                      0{index + 1}. {doctor.education}
                    </div>
                    {doctor.experience && (
                      <div className="absolute bottom-3 right-3 bg-slate-900/85 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {doctor.experience}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mt-0.5">
                        {doctor.role}
                      </p>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      Specialty: {doctor.specialty}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doctor.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      onSelectDoctor(doctor.id);
                      onOpenAppointment();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200 border border-blue-100"
                  >
                    Book Appointment with {doctor.name.split(' ')[1] || doctor.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
