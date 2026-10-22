import React from 'react';
import { AMENITIES, CLINIC_INFO } from '../data/clinicData';
import { FacilityIcon } from './FacilityIcons';
import { Sparkles, MapPin, PhoneCall, Check } from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Comfort & Accessibility
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Facilities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Thoughtfully designed for women, children, and seniors. We eliminate physical and logistical stress so your dental visit is pleasant and hassle-free.
          </p>
        </div>

        {/* 5 Amenities Cards with the Pink Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {AMENITIES.map(amenity => (
            <div
              key={amenity.id}
              className="p-6 rounded-2xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/20 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between text-center items-center"
            >
              <div>
                {/* Pink Facility Icon component matching uploaded assets */}
                <div className="w-20 h-20 rounded-2xl bg-pink-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-300 shadow-inner">
                  <FacilityIcon name={amenity.iconName} size={50} />
                </div>

                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-100/60 px-2.5 py-0.5 rounded-full mb-2">
                  {amenity.highlight}
                </span>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {amenity.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {amenity.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-100/80 w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-pink-700">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Facility</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transit Assistance Callout */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase text-pink-400 tracking-wider">
              Special Senior Citizen & Accessibility Support
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Need assistance with transit or wheelchair access?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our clinic staff can arrange doorstep patient pickup support or reserved ground-floor wheelchair assistance upon arrival.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.primaryPhone}`}
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Support Desk</span>
            </a>
            <a
              href="https://maps.google.com/?q=Anthivadi+Hosur+Tamil+Nadu+635109"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-white/20 transition-colors"
            >
              <MapPin className="w-4 h-4 text-pink-400" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
