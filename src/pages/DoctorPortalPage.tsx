import React, { useState, useEffect } from 'react';
import {
  DoctorAccount,
  Appointment,
  PatientAccount,
  MedicalRecord,
  DigitalPrescription,
  PrescriptionMedicine
} from '../types';
import {
  getActiveDoctor,
  getStoredAppointments,
  getStoredPatients,
  getPatientMedicalRecords,
  getPatientPrescriptions,
  createDoctorPrescription,
  updateAppointmentStatus,
  logoutActiveSession,
  getEstimatedWaitTime,
  WaitTimeInfo,
  getStoredCourseEnrollments
} from '../utils/storage';
import { CLINIC_INFO } from '../data/clinicData';
import { DOCTOR_COURSES, DoctorCourse, CourseEnrollment } from '../data/coursesData';
import {
  Stethoscope,
  CalendarCheck,
  FileText,
  Pill,
  Clock,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Send,
  Printer,
  Search,
  Filter,
  Sparkles,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  BookOpen,
  Users,
  Check
} from 'lucide-react';

interface DoctorPortalPageProps {
  doctor: DoctorAccount;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const DoctorPortalPage: React.FC<DoctorPortalPageProps> = ({
  doctor,
  onLogout,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'write-rx' | 'records' | 'schedule' | 'cde-courses'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientAccount[]>([]);
  const [selectedPatientUhid, setSelectedPatientUhid] = useState<string>('SDC-2026-0842');
  const [searchApt, setSearchApt] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [waitTime, setWaitTime] = useState<WaitTimeInfo>(getEstimatedWaitTime());

  // Digital Rx Form State
  const [rxPatientName, setRxPatientName] = useState('Priya Sundaram');
  const [rxPatientAge, setRxPatientAge] = useState(28);
  const [rxDiagnosis, setRxDiagnosis] = useState('Orthodontic wire activation & mild tooth tightness post-adjustment');
  const [rxMedicines, setRxMedicines] = useState<PrescriptionMedicine[]>([
    {
      name: 'Paracetamol 500mg',
      dosage: '1 Tablet',
      frequency: 'SOS when required (Max 2 tabs/day)',
      duration: '3 Days',
      instructions: 'Take strictly after food if dental arch wire tightness causes mild ache.'
    },
    {
      name: 'Chlorhexidine 0.2% Antiseptic Mouthwash',
      dosage: '10 ml',
      frequency: 'Twice daily after brushing (1-0-1)',
      duration: '7 Days',
      instructions: 'Swish for 60 seconds around brackets and spit out. Do not rinse with water immediately.'
    }
  ]);
  const [rxAdvice, setRxAdvice] = useState<string>('Avoid biting into hard foods (nuts, whole raw carrots, ice). Practice diligent brushing around bracket wings. Next tray review on Oct 24, 2026.');
  const [rxSuccessMsg, setRxSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
    window.addEventListener('sdc_appointments_updated', refreshData);
    return () => window.removeEventListener('sdc_appointments_updated', refreshData);
  }, []);

  const refreshData = () => {
    setAppointments(getStoredAppointments());
    setPatients(getStoredPatients());
    setWaitTime(getEstimatedWaitTime());
  };

  const handlePatientSelectForRx = (uhid: string) => {
    setSelectedPatientUhid(uhid);
    const pat = patients.find(p => p.uhid === uhid);
    if (pat) {
      setRxPatientName(pat.name);
      setRxPatientAge(pat.age || 28);
    }
  };

  const handleAddMedicine = () => {
    setRxMedicines(prev => [
      ...prev,
      {
        name: '',
        dosage: '1 Tablet',
        frequency: 'Twice daily after food (1-0-1)',
        duration: '5 Days',
        instructions: 'Take after meals with water.'
      }
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setRxMedicines(prev => prev.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index: number, field: keyof PrescriptionMedicine, val: string) => {
    setRxMedicines(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxPatientName.trim() || !rxDiagnosis.trim()) {
      alert('Please enter patient name and clinical diagnosis.');
      return;
    }

    const adviceList = rxAdvice.split('.').map(s => s.trim()).filter(Boolean);

    const newRx = createDoctorPrescription({
      uhid: selectedPatientUhid,
      patientName: rxPatientName,
      patientAge: rxPatientAge,
      doctorName: doctor.name,
      doctorSpecialty: `${doctor.role} • ${doctor.specialty}`,
      diagnosis: rxDiagnosis,
      medicines: rxMedicines.filter(m => m.name.trim().length > 0),
      generalAdvice: adviceList.length ? adviceList : ['Diligent brushing', 'Lukewarm saline gargles as needed'],
      clinicAddress: CLINIC_INFO.address,
      doctorRegistrationNo: doctor.registrationNo
    });

    setRxSuccessMsg(`Prescription ${newRx.rxNumber} issued successfully to ${rxPatientName}!`);
    setTimeout(() => setRxSuccessMsg(null), 5000);
  };

  const handleAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(id, newStatus);
    refreshData();
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchApt.toLowerCase()) ||
      apt.treatmentName.toLowerCase().includes(searchApt.toLowerCase()) ||
      apt.phone.includes(searchApt);
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPatientRecords = getPatientMedicalRecords(selectedPatientUhid);
  const selectedPatientPrescriptions = getPatientPrescriptions(selectedPatientUhid);

  return (
    <div className="min-h-screen bg-slate-100 py-5 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* DOCTOR EXECUTIVE HEADER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="relative">
                {doctor.imageUrl ? (
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center text-xl sm:text-2xl shadow-md">
                    {doctor.name.replace('Dr. ', '').charAt(0)}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] sm:text-[10px] text-white" title="Active on duty">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {doctor.name}
                  </h1>
                  <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 font-bold px-2 sm:px-2.5 py-0.5 rounded-full">
                    {doctor.role}
                  </span>
                  <span className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-full">
                    {doctor.registrationNo}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {doctor.specialty} • {doctor.education}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {doctor.email} • {doctor.phone}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button
                onClick={onNavigateHome}
                className="justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Clinic Site</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                onClick={() => {
                  logoutActiveSession();
                  onLogout();
                }}
                className="justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer border border-red-200"
                title="Sign out of Doctor Portal"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* CLINICAL TABS NAVIGATION */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar border-b border-slate-200 -mx-1 px-1 sm:mx-0 sm:px-0">
          {[
            { id: 'appointments', label: `Queue (${appointments.length})`, icon: CalendarCheck },
            { id: 'write-rx', label: 'Issue Digital Rx', icon: Pill },
            { id: 'records', label: 'Case Files', icon: FileText },
            { id: 'cde-courses', label: 'CDE Courses & Faculty', icon: GraduationCap },
            { id: 'schedule', label: 'OPD Schedule', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-t-xl sm:rounded-t-2xl transition-all shrink-0 border-b-2 cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-700 border-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CONSULTATION QUEUE & APPOINTMENTS */}
        {/* ========================================================================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patient name, phone, or treatment..."
                  value={searchApt}
                  onChange={e => setSearchApt(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-bold shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Appointments</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Appointments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAppointments.length === 0 ? (
                <div className="col-span-full bg-white rounded-3xl p-12 text-center space-y-2 border border-slate-200">
                  <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700">No appointments found matching filter.</p>
                </div>
              ) : (
                filteredAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">#{apt.id}</span>
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : apt.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">{apt.patientName}</h4>
                        <p className="text-xs font-semibold text-blue-700 mt-0.5">{apt.treatmentName}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">📞 {apt.phone}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 text-slate-600">
                        <p className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{apt.date} at {apt.timeSlot}</span>
                        </p>
                        {apt.notes && (
                          <p className="text-[11px] text-slate-500 italic">"{apt.notes}"</p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleAppointmentStatus(apt.id, 'Completed')}
                          className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => handleAppointmentStatus(apt.id, 'Confirmed')}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setRxPatientName(apt.patientName);
                          setActiveTab('write-rx');
                        }}
                        className="py-2 px-3 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Write Digital Prescription for this patient"
                      >
                        Write Rx
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WRITE DIGITAL PRESCRIPTION */}
        {/* ========================================================================= */}
        {activeTab === 'write-rx' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  Doctor Clinical Rx Dispatcher
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  Issue Digital Prescription (Rx)
                </h3>
                <p className="text-xs text-slate-500">
                  Instantly saves to the patient's portal and medical records database.
                </p>
              </div>

              {rxSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{rxSuccessMsg}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleIssuePrescription} className="space-y-6">
              {/* Patient Selection Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Registered Patient
                  </label>
                  <select
                    value={selectedPatientUhid}
                    onChange={e => handlePatientSelectForRx(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.uhid}>
                        {p.name} ({p.uhid} • {p.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rxPatientName}
                    onChange={e => setRxPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    value={rxPatientAge}
                    onChange={e => setRxPatientAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Clinical Diagnosis & Dental Findings *
                </label>
                <input
                  type="text"
                  required
                  value={rxDiagnosis}
                  onChange={e => setRxDiagnosis(e.target.value)}
                  placeholder="e.g. Mild gingivitis, orthodontic arch activation, or post-extraction healing"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Medicines List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Prescribed Medicines & Dosage Schedule
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {rxMedicines.map((med, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-4">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Medicine Name & Formulation</label>
                        <input
                          type="text"
                          required
                          value={med.name}
                          onChange={e => handleMedicineChange(idx, 'name', e.target.value)}
                          placeholder="e.g. Augmentin 625mg or Paracetamol"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Dosage</label>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={e => handleMedicineChange(idx, 'dosage', e.target.value)}
                          placeholder="1 Tablet"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Frequency</label>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={e => handleMedicineChange(idx, 'frequency', e.target.value)}
                          placeholder="Twice daily (1-0-1)"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration</label>
                        <input
                          type="text"
                          value={med.duration}
                          onChange={e => handleMedicineChange(idx, 'duration', e.target.value)}
                          placeholder="5 Days"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(idx)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Remove medicine"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="sm:col-span-12">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Special Instructions</label>
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={e => handleMedicineChange(idx, 'instructions', e.target.value)}
                          placeholder="Take strictly after food with water."
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Advice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  General Oral Health Advice & Follow-Up Instructions
                </label>
                <textarea
                  rows={3}
                  value={rxAdvice}
                  onChange={e => setRxAdvice(e.target.value)}
                  placeholder="Clinical instructions, dietary restrictions, next review visit date..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all hover:scale-101 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Issue & Sign Digital Prescription (SDC-RX)</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PATIENT MEDICAL CASE FILES */}
        {/* ========================================================================= */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Viewing Case Records For:</span>
                <select
                  value={selectedPatientUhid}
                  onChange={e => handlePatientSelectForRx(e.target.value)}
                  className="ml-2 px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.uhid}>
                      {p.name} ({p.uhid})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Records count: {selectedPatientRecords.length} procedures • {selectedPatientPrescriptions.length} prescriptions
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {selectedPatientRecords.map(rec => (
                <div key={rec.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {rec.treatmentName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{rec.date}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Target: {rec.targetTeeth}</h4>
                    <p className="text-xs text-slate-600 mt-1"><strong>Diagnosis:</strong> {rec.diagnosis}</p>
                    <p className="text-xs text-slate-500 mt-1"><strong>Notes:</strong> {rec.procedureNotes}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Doctor: {rec.doctorName}</span>
                    <span>Follow-up: {rec.nextFollowUp || 'Routine'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: OPD SCHEDULE & CLINICAL HOURS */}
        {/* ========================================================================= */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Weekly Doctor Consultation Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Sakthi Dental Clinic • Anthivadi, Hosur • Sunday to Saturday 9:00 AM - 7:00 PM
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Clinical OPD Shift</span>
                </h4>
                <div className="text-xs text-slate-700 space-y-1">
                  <p><strong>Morning Hours:</strong> 09:00 AM - 01:30 PM (Consultations & Cleanings)</p>
                  <p><strong>Afternoon Rest:</strong> 01:30 PM - 03:00 PM (Sanitization)</p>
                  <p><strong>Evening Hours:</strong> 03:00 PM - 07:00 PM (Braces & Specialist Surgeries)</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Emergency On-Call Duty</span>
                </h4>
                <div className="text-xs text-slate-700 space-y-1">
                  <p><strong>Emergency Contact:</strong> {CLINIC_INFO.emergencyPhone}</p>
                  <p><strong>Trauma & Acute Toothache:</strong> 24-Hour on-call availability</p>
                  <p><strong>Live Clinic Wait Time:</strong> {waitTime.displayText}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DOCTOR CDE COURSES & FACULTY CLINICAL FELLOWSHIPS */}
        {/* ========================================================================= */}
        {activeTab === 'cde-courses' && (() => {
          const enrollments = getStoredCourseEnrollments();
          // Filter courses where doctor is director or co-faculty, or show full clinic academy
          const myCourses = DOCTOR_COURSES.filter(c =>
            c.directorName.toLowerCase().includes(doctor.name.replace('Dr. ', '').toLowerCase()) ||
            c.directorDocId === doctor.id
          );
          const displayCourses = myCourses.length > 0 ? myCourses : DOCTOR_COURSES.slice(0, 3);

          return (
            <div className="space-y-6">
              {/* CDE Faculty Overview Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
                <div className="space-y-3 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>DCI Accredited CDE Faculty & Mentorship</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black">
                    Clinical Academy Faculty Roster
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100">
                    As clinical faculty at Sakthi Dental Clinic, you mentor dental surgeons, interns, and postgraduates through hands-on typodont workshops and chairside surgical cases.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-blue-200">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Faculty Credentials: {doctor.education}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Total Active Candidates: {enrollments.length}</span>
                  </span>
                </div>
              </div>

              {/* Mentored Courses Cards */}
              <div className="space-y-4">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Your Directed / Faculty Clinical Courses</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayCourses.map(course => (
                    <div
                      key={course.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {course.category}
                          </span>
                          {course.cmeCredits && (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              {course.cmeCredits}
                            </span>
                          )}
                        </div>

                        <h5 className="text-base font-black text-slate-900 leading-snug">
                          {course.title}
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {course.shortDescription}
                        </p>

                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Upcoming Batch:</span>
                            <span className="font-bold text-slate-800">{course.nextBatchDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Duration & Format:</span>
                            <span className="font-bold text-slate-800">{course.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Seats Reserved:</span>
                            <span className="font-bold text-blue-600">{course.totalSeats - course.seatsAvailable} of {course.totalSeats} seats</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-medium">
                          Award: {course.certificateAwarded.split(' ')[0]} {course.certificateAwarded.split(' ')[1]}
                        </span>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Print Faculty Roster
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enrolled Dental Candidates Roster */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Registered Doctor Candidates & Interns</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Confirmed applicants enrolled in upcoming clinical workshops and fellowship modules.
                    </p>
                  </div>
                  <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {enrollments.length} Enrolled
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Admit Code</th>
                        <th className="py-2.5 px-3">Candidate Name</th>
                        <th className="py-2.5 px-3">DCI Reg No</th>
                        <th className="py-2.5 px-3">Enrolled Course</th>
                        <th className="py-2.5 px-3">Batch Date</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enrollments.map(enr => (
                        <tr key={enr.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-blue-700">
                            {enr.confirmationCode}
                          </td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900">{enr.applicantName}</p>
                            <p className="text-[10px] text-slate-400">{enr.phone}</p>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            {enr.dentalCouncilRegNo || 'N/A'}
                          </td>
                          <td className="py-3 px-3 max-w-[220px] truncate font-medium text-slate-800">
                            {enr.courseTitle}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {enr.selectedBatch}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {enr.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
