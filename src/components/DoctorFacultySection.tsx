import React, { useState } from 'react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';
import {
  Award,
  CalendarCheck,
  ArrowRight,
  Stethoscope,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DoctorFacultySectionProps {
  onSelectDoctor: (doctorId: string) => void;
  onNavigateAbout: () => void;
}

export const DoctorFacultySection: React.FC<DoctorFacultySectionProps> = ({
  onSelectDoctor,
  onNavigateAbout
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = [
    { id: 'all', label: 'All 9 Specialists' },
    { id: 'ortho', label: 'Braces & Aligners' },
    { id: 'endo-implant', label: 'RCT & Implants' },
    { id: 'prostho-pediatric', label: 'Dentures & Restorations' },
    { id: 'laser-surgery', label: 'Laser & Maxillofacial' }
  ];

  const founder = DOCTORS[0]; // Dr. Anupriya
  const specialists = DOCTORS.slice(1);

  const filteredSpecialists = specialists.filter(doc => {
    if (selectedSpecialty === 'all') return true;
    if (selectedSpecialty === 'ortho') {
      return doc.role.toLowerCase().includes('ortho') || doc.role.toLowerCase().includes('align');
    }
    if (selectedSpecialty === 'endo-implant') {
      return doc.role.toLowerCase().includes('endo') || doc.role.toLowerCase().includes('implant');
    }
    if (selectedSpecialty === 'prostho-pediatric') {
      return doc.role.toLowerCase().includes('prostho') || doc.role.toLowerCase().includes('surgeon');
    }
    if (selectedSpecialty === 'laser-surgery') {
      return doc.role.toLowerCase().includes('laser') || doc.role.toLowerCase().includes('maxillo');
    }
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Clinical Faculty • The Dentique Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Led by Dr. Anupriya & Specialist Dental Surgeons
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every smile is treated by postgraduate MDS specialist consultants with over 100+ combined years of clinical expertise.
            </p>
          </div>

          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>View Complete Doctor Bios</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FOUNDER SPOTLIGHT CARD (Inspired by thedentique.in founder presentation) */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Founder Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-800">
                  <img
                    src={founder.imageUrl}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-1.5 border border-white/20">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>20+ Years Clinical Care</span>
                </div>
              </div>
            </div>

            {/* Founder Bio Details */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Founder & Chief Dental Consultant</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-sm sm:text-base text-pink-300 font-semibold mt-1">
                  {founder.education} • {founder.specialty}
                </p>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {founder.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Hosur Practice</span>
                  <strong className="text-white text-sm sm:text-base font-extrabold">Founded 2004</strong>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Experience</span>
                  <strong className="text-white text-sm sm:text-base font-extrabold">20+ Years</strong>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Focus</span>
                  <strong className="text-white text-sm sm:text-base font-extrabold">Women & Children</strong>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => onSelectDoctor(founder.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Consult Dr. Anupriya</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs text-blue-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Available for In-Person OPD Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPECIALIST CATEGORY FILTER TABS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Our 8 Specialist Dental Surgeons
            </h3>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {specialties.map(spec => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedSpecialty === spec.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          {/* SPECIALISTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpecialists.map(doctor => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden bg-slate-100 relative">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                      {doctor.experience}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-pink-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                      {doctor.role}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700">
                      {doctor.education}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectDoctor(doctor.id)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200 hover:border-blue-600 transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Consult Specialist</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
