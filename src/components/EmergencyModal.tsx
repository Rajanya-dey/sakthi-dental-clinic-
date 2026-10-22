import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/storage';
import {
  X,
  ShieldAlert,
  PhoneCall,
  Clock,
  MapPin,
  AlertTriangle,
  HeartPulse,
  Navigation
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCall = (phone: string) => {
    trackEvent('emergency_call', 'emergency-modal', { phone });
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-red-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 sm:p-6 relative rounded-t-2xl sm:rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-rose-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Sakthi Dental Clinic • Emergency Helpline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Emergency Dental Support</h2>
          <p className="text-rose-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
            Immediate assistance for acute toothache, traumatic injuries, or severe dental discomfort.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Immediate Phone Buttons */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tap to Call Direct Emergency Doctor Lines:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleCall(CLINIC_INFO.phones[0])}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{CLINIC_INFO.phones[0]}</span>
              </button>
              <button
                onClick={() => handleCall(CLINIC_INFO.phones[1])}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>{CLINIC_INFO.phones[1]}</span>
              </button>
            </div>
          </div>

          {/* Quick First-Aid Advice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Immediate First-Aid Guidelines</span>
            </div>
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
              <li>
                <strong>Severe Toothache:</strong> Rinse with warm water and gently floss to dislodge food. Do not place aspirin against the gum.
              </li>
              <li>
                <strong>Knocked-Out Tooth:</strong> Handle by crown only. Rinse gently without scrubbing and place in cold milk. Visit us immediately!
              </li>
              <li>
                <strong>Broken Restoration / Bleeding:</strong> Apply gentle pressure with clean sterile gauze and contact our clinic.
              </li>
            </ul>
          </div>

          {/* Location & Navigation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                <span>Clinic Address in Hosur</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {CLINIC_INFO.address}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Daily Doctor Availability: 9:00 AM – 9:00 PM
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Anthivadi+Hosur+Tamil+Nadu+635109"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>

          {/* Close button */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
