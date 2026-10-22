import React from 'react';
import { PRIVACY_POLICY_CONTENT, CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Patient Trust & Legal Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {PRIVACY_POLICY_CONTENT.title}
          </h1>
          <p className="text-slate-500 text-xs flex items-center justify-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Effective Date: October 2026 • Sakthi Dental Clinic, Hosur</span>
          </p>
        </div>

        {/* Content Box with exact content from PDF */}
        <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-sm border border-slate-200/90 space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="text-slate-800 font-medium text-base bg-blue-50/60 p-4 rounded-2xl border border-blue-100/80">
            {PRIVACY_POLICY_CONTENT.intro}
          </p>

          <div className="divide-y divide-slate-100 space-y-8">
            {PRIVACY_POLICY_CONTENT.sections.map((section, idx) => (
              <div key={idx} className={idx !== 0 ? 'pt-8 space-y-3' : 'space-y-3'}>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {section.title}
                </h2>
                <div className="whitespace-pre-line text-slate-600 text-sm leading-relaxed pl-1">
                  {section.body}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Footer Strip */}
          <div className="mt-8 pt-8 border-t border-slate-200 bg-slate-50 p-6 rounded-2xl space-y-3 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm">
              Sakthi Dental Clinic Compliance Contact
            </h3>
            <p>
              Anthivadi Clinic Location: {CLINIC_INFO.address}
            </p>
            <p>
              Direct Email: {CLINIC_INFO.email} | Telephones: {CLINIC_INFO.phones.join(' / ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
