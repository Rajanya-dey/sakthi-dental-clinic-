import React from 'react';
import { SdcLogo } from './SdcLogo';
import { CLINIC_INFO, TREATMENTS } from '../data/clinicData';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAppointment }) => {
  const keyTreatments = TREATMENTS.slice(0, 7);

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'treatments', label: 'Treatments & Services' },
    { id: 'gallery', label: 'Before & After Smile Gallery' },
    { id: 'courses', label: 'Doctor Courses & CDE Academy' },
    { id: 'insurance', label: 'Insurance & 0% EMI Plans' },
    { id: 'facilities', label: 'Clinic Facilities' },
    { id: 'portal', label: 'Patient Portal (Login / Records)' },
    { id: 'faqs', label: 'Patient FAQs' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'admin', label: 'Staff & Admin Portal' }
  ];

  const handleLink = (id: string) => {
    if (id === 'insurance') {
      onNavigate('treatments');
      setTimeout(() => {
        const el = document.getElementById('insurance-payments');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top CTA Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-pink-700 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to celebrate your healthy smile?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Specialized, comfortable dental care tailored for women, children & families in Hosur. Walk-ins & bookings welcome daily.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Fix an Appointment
            </button>
            <a
              href={`tel:${CLINIC_INFO.primaryPhone}`}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold px-5 py-3 rounded-xl transition-colors text-sm sm:text-base"
            >
              Call: {CLINIC_INFO.primaryPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Clinic Overview & Socials */}
          <div className="space-y-5">
            <div className="bg-white p-3 rounded-xl inline-block shadow-md">
              <SdcLogo size="md" showTagline={false} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Trusted healthcare leader at Hosur since 2004. Founded by Dr. Anupriya, delivering compassionate, high-tech dental treatments designed for patient comfort and longevity.
            </p>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={CLINIC_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={CLINIC_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={CLINIC_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-800">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLink(link.id)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: List of Key Treatments */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-800">
              Key Treatments
            </h4>
            <ul className="space-y-2.5 text-sm">
              {keyTreatments.map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => handleLink('treatments')}
                    className="hover:text-pink-400 transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 group-hover:scale-125 transition-transform" />
                    <span>{t.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleLink('treatments')}
                  className="text-xs text-blue-400 font-semibold hover:underline mt-2 inline-block"
                >
                  + View All 15 Specialized Treatments
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Address and Contact Info (PDF Required) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-800">
              Reach Us
            </h4>

            {/* Address */}
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Address:</p>
                <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                  {CLINIC_INFO.address}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 text-sm">
              <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Email:</p>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="text-slate-300 text-xs hover:text-blue-400 transition-colors mt-0.5 block"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 text-sm">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Phone:</p>
                <p className="text-slate-300 text-xs mt-0.5">
                  <a href={`tel:${CLINIC_INFO.phones[0]}`} className="hover:text-emerald-400">
                    {CLINIC_INFO.phones[0]}
                  </a>
                  {' / '}
                  <a href={`tel:${CLINIC_INFO.phones[1]}`} className="hover:text-emerald-400">
                    {CLINIC_INFO.phones[1]}
                  </a>
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Timings:</p>
                <p className="text-slate-200 text-xs mt-0.5">
                  Sunday to Saturday:{' '}
                  <span className="font-bold text-white tracking-wide">9am to 7pm</span>
                </p>
                <p className="text-[11px] text-pink-300 mt-0.5 font-medium">
                  {CLINIC_INFO.doctorAvailability}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Sakthi Dental Clinic, Hosur. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLink('privacy')}
              className="hover:text-slate-400 transition-colors underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified Healthcare Provider</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
