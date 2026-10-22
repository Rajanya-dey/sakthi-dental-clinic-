import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { saveInquiry } from '../utils/storage';
import { ContactInquiry } from '../types';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Navigation,
  MessageSquare
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactInquiry | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    // Name (Required)
    if (!name.trim()) {
      errs.name = 'Name is required';
    }

    // Email (Required + format verification)
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com)';
    }

    // Phone (Required)
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const saved = saveInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim()
    });

    setSubmittedInquiry(saved);
    setErrors({});
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Sakthi Dental Clinic
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions regarding treatments, costs, insurance, or appointments? Send us a message or reach out directly to our Anthivadi, Hosur clinic.
          </p>
        </div>

        {/* 2-Column Responsive Layout as specified in PDF:
            Left Side: Contact Form ("We would love to hear from you")
            Right Side: Clinic Contact Information ("Reach us") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/90">
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">
                We would love to hear from you
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Fill out the form below and our clinic coordinator will get back to you promptly.
              </p>
            </div>

            {submittedInquiry ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{submittedInquiry.name}</strong>. We received your inquiry (#{submittedInquiry.id}) and will contact you via <strong>{submittedInquiry.email}</strong> or <strong>{submittedInquiry.phone}</strong>.
                </p>
                <button
                  onClick={() => setSubmittedInquiry(null)}
                  className="mt-3 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (Text input) - Required */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Your Full Name"
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email (Email input) - Required with format verification */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number (Text input) - Required */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="+91 9862890897"
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Your Message (Multiline textarea) - Optional */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Your Message <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How can Dr. Anupriya and our team help you? Ask any question regarding appointments, symptoms, or procedures..."
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button (Clinic primary accent color blue/pink as specified in PDF) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                  <p className="text-[11px] text-slate-500 mt-2">
                    * By submitting, you consent to our clinic reaching out regarding your query.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Clinic Contact Information ("Reach us") */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Reach us
                </h2>
                <p className="text-xs text-slate-500">
                  Direct clinic coordinates & visiting hours at Hosur
                </p>
              </div>

              {/* Clean icon-accompanied list format from PDF */}
              <div className="space-y-5 text-sm">
                {/* Address (Include location pin icon) */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Address:
                    </p>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                      {CLINIC_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Email (Use mail icon) */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Email:
                    </p>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="text-blue-600 hover:underline text-xs sm:text-sm font-medium block"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone (Use phone icon) */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Phone:
                    </p>
                    <div className="text-slate-800 text-xs sm:text-sm font-semibold space-x-2">
                      <a href={`tel:${CLINIC_INFO.phones[0]}`} className="hover:text-emerald-700">
                        {CLINIC_INFO.phones[0]}
                      </a>
                      <span>/</span>
                      <a href={`tel:${CLINIC_INFO.phones[1]}`} className="hover:text-emerald-700">
                        {CLINIC_INFO.phones[1]}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Timings (Use clock icon with bolded timing as specified in PDF) */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Timings:
                    </p>
                    <p className="text-slate-700 text-xs sm:text-sm">
                      Sunday to Saturday:{' '}
                      <span className="font-bold text-slate-900">9am to 7pm</span>
                    </p>
                    <p className="text-[11px] text-pink-700 font-semibold mt-0.5">
                      {CLINIC_INFO.doctorAvailability}
                    </p>
                  </div>
                </div>
              </div>

              {/* Get Directions Link Button */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Anthivadi+Hosur+Tamil+Nadu+635109"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors text-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Clinic Location in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Quick Hosur Map Preview Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Hosur Landmark</h4>
                  <p className="text-xs text-slate-400">Near SBM Layout, Anthivadi</p>
                </div>
                <span className="text-[11px] font-bold text-pink-400 bg-pink-500/20 px-2.5 py-0.5 rounded-full">
                  Central Location
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Accessible via Bagalur Road and National Highway with direct private patient parking right in front of the clinic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
