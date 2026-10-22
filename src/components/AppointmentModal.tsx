import React, { useState } from 'react';
import { TREATMENTS, DOCTORS } from '../data/clinicData';
import { saveAppointment } from '../utils/storage';
import { Appointment } from '../types';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatmentId?: string;
  preselectedDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedTreatmentId,
  preselectedDoctorId
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentId, setTreatmentId] = useState(preselectedTreatmentId || TREATMENTS[0].id);
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || DOCTORS[0].id);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const availableSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM',
    '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.patientName = 'Patient name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!date) errs.date = 'Please select a preferred visit date';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const selectedTreatment = TREATMENTS.find(t => t.id === treatmentId) || TREATMENTS[0];
    const selectedDoctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];

    const apt = saveAppointment({
      patientName: patientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      treatmentId,
      treatmentName: selectedTreatment.name,
      doctorId,
      doctorName: selectedDoctor.name,
      date,
      timeSlot,
      notes: notes.trim()
    });

    setSubmittedAppointment(apt);
    setErrors({});
  };

  const handleReset = () => {
    setSubmittedAppointment(null);
    setPatientName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-pink-700 text-white p-4 sm:p-6 relative rounded-t-2xl sm:rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-pink-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sakthi Dental Clinic • Hosur</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {submittedAppointment ? 'Appointment Confirmed!' : 'Fix an Appointment'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
            {submittedAppointment
              ? 'Your appointment request has been recorded in our clinic system.'
              : 'Choose your specialist, procedure, and convenient slot. We respond promptly.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {submittedAppointment ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block bg-blue-50 text-blue-700 font-mono font-bold text-xs px-3 py-1 rounded-full mb-2 border border-blue-200">
                  Ref #{submittedAppointment.id}
                </span>
                <h3 className="text-xl font-bold text-slate-800">
                  Thank You, {submittedAppointment.patientName}!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-1">
                  We have scheduled your appointment with{' '}
                  <strong className="text-blue-700">{submittedAppointment.doctorName}</strong> for{' '}
                  <strong className="text-slate-800">{submittedAppointment.treatmentName}</strong> on{' '}
                  <strong className="text-slate-800">
                    {submittedAppointment.date} at {submittedAppointment.timeSlot}
                  </strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinic Location:</span>
                  <span className="font-semibold text-slate-800">Anthivadi, Hosur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-semibold text-slate-800">+91 9862890897</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Scheduled (Pending Confirmation SMS)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    placeholder="e.g. Manisha Sharma"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                      errors.patientName ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.patientName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.patientName}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Treatment Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Select Treatment / Service
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={treatmentId}
                    onChange={e => setTreatmentId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    {TREATMENTS.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Preferred Specialist Doctor
                </label>
                <select
                  value={doctorId}
                  onChange={e => setDoctorId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  {DOCTORS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDate(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.date ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      {availableSlots.map(slot => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Additional Notes / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Mild sensitivity in lower tooth, prefers evening timing..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm tracking-wide active:scale-98"
                >
                  Confirm Appointment Booking
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  🔒 No advance payment needed. We will confirm via call or SMS.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
