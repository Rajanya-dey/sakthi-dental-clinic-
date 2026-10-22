import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AssuranceBanner } from '../components/AssuranceBanner';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { CoreTreatmentsSection } from '../components/CoreTreatmentsSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PortalsOverviewSection } from '../components/PortalsOverviewSection';
import { SmileGallerySection } from '../components/SmileGallerySection';
import { DentalWellnessBlogSection } from '../components/DentalWellnessBlogSection';
import { DoctorCoursesSection } from '../components/DoctorCoursesSection';
import { DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { CalendarCheck, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { UserRole, UserSession } from '../types';

interface HomePageProps {
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onNavigate: (page: string) => void;
  onSelectTreatment: (treatmentId: string) => void;
  onSelectDoctor: (doctorId: string) => void;
  activeSession?: UserSession | null;
  onEnterPortal?: (role: UserRole) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAppointment,
  onOpenEmergency,
  onNavigate,
  onSelectTreatment,
  onSelectDoctor,
  activeSession = null,
  onEnterPortal = () => {}
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section from PDF */}
      <HeroSection
        onOpenAppointment={onOpenAppointment}
        onOpenEmergency={onOpenEmergency}
        onExploreTreatments={() => onNavigate('treatments')}
      />

      {/* 2. Structured Portals Overview Gateway (Patient, Doctor, Admin) */}
      <PortalsOverviewSection
        activeSession={activeSession}
        onEnterPortal={onEnterPortal}
      />

      {/* 3. Welcome Message / Assurance Banner with 3 Clinic Banners from PDF */}
      <AssuranceBanner />

      {/* 4. Why Choose Sakthi Dental Clinic? 4 Pillars from PDF */}
      <WhyChooseSection />

      {/* 4. Core Treatments (Explore Our Services) 6 items from PDF */}
      <CoreTreatmentsSection
        onViewAllTreatments={() => onNavigate('treatments')}
        onBookTreatment={treatmentId => {
          onSelectTreatment(treatmentId);
          onOpenAppointment();
        }}
      />

      {/* 5. Interactive 'Before & After' Smile Gallery (Slider Comparison Tool) */}
      <SmileGallerySection
        onBookTreatment={treatmentId => {
          onSelectTreatment(treatmentId);
          onOpenAppointment();
        }}
        onExploreTreatments={() => onNavigate('treatments')}
      />

      {/* 6. Doctor Team Spotlight Teaser */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Medical Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Led by Dr. Anupriya & Specialist Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                9 dedicated doctors covering orthodontics, implantology, endodontics, pediatric care, and laser dentistry.
              </p>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Meet Full Doctor Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map(doctor => (
              <div
                key={doctor.id}
                className="bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-200 relative">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      {doctor.experience}
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-pink-700">{doctor.role}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      onSelectDoctor(doctor.id);
                      onOpenAppointment();
                    }}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200 transition-colors shadow-2xs"
                  >
                    Consult Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dental Wellness Blog & Rotating Seasonal Advice */}
      <DentalWellnessBlogSection
        onOpenAppointment={onOpenAppointment}
        onSelectTreatment={onSelectTreatment}
      />

      {/* 8. Doctor Clinical Courses & CDE Fellowship Academy */}
      <DoctorCoursesSection
        onOpenAppointment={onOpenAppointment}
        onSelectDoctor={onSelectDoctor}
      />

      {/* 9. Clinic Highlights / Amenities with 5 Pink Icons from PDF */}
      <FacilitiesSection />

      {/* 7. Testimonials (What Our Patients Say) from PDF */}
      <TestimonialsSection />

      {/* 8. Quick Appointment Action Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Schedule Today</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Experience Gentle, Compassionate Care?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Book online in less than a minute. Our friendly reception team at Anthivadi, Hosur will confirm your slot.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenAppointment}
              className="px-8 py-3.5 rounded-xl font-bold bg-white text-blue-900 hover:bg-blue-50 shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm"
            >
              Fix an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm transition-colors"
            >
              Contact Clinic
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
