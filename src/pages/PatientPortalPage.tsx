import React, { useState, useEffect } from 'react';
import {
  PatientAccount,
  MedicalRecord,
  DigitalPrescription,
  Appointment,
  PatientSmileRewardsSummary
} from '../types';
import {
  getActivePatient,
  setActivePatient,
  loginPatient,
  registerPatient,
  getPatientMedicalRecords,
  getPatientPrescriptions,
  getPatientUpcomingAppointments,
  getStoredPatients,
  getStoredTestimonials,
  getPatientSmileRewards,
  logoutActiveSession,
  earnCheckupRewardPoints
} from '../utils/storage';
import { DOCTOR_COURSES } from '../data/coursesData';
import {
  createTestUpcoming24hAppointment,
  resetRevisitAlertDismiss,
  getUpcomingAppointmentsWithin24Hours,
  triggerLocalAppointmentNotification,
  generateGoogleCalendarUrl
} from '../utils/appointmentReminder';
import { CLINIC_INFO } from '../data/clinicData';
import { TranslationDictionary } from '../data/translations';
import { PatientAppointmentCalendar } from '../components/PatientAppointmentCalendar';
import { PatientFeedback } from '../components/PatientFeedback';
import { PatientSmileRewards } from '../components/PatientSmileRewards';
import {
  ShieldCheck,
  User,
  KeyRound,
  FileText,
  Calendar,
  Pill,
  Clock,
  Printer,
  PlusCircle,
  LogOut,
  Sparkles,
  Gift,
  Coins,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  CalendarCheck,
  Download,
  Activity,
  HeartPulse,
  BadgeCheck,
  ChevronRight,
  ArrowRight,
  Bell,
  ExternalLink,
  Star,
  MessageSquarePlus,
  Eye,
  EyeOff,
  Lock,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';

interface PatientPortalPageProps {
  t: TranslationDictionary;
  onOpenBooking: (treatmentId?: string) => void;
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
  onNavigateDoctor?: () => void;
  onRequestRoleSwitch?: (role: 'doctor' | 'admin') => void;
}

export const PatientPortalPage: React.FC<PatientPortalPageProps> = ({
  t,
  onOpenBooking,
  onNavigateHome,
  onNavigateAdmin,
  onNavigateDoctor,
  onRequestRoleSwitch
}) => {
  const [patient, setPatient] = useState<PatientAccount | null>(getActivePatient());
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'records' | 'prescriptions' | 'profile' | 'feedback' | 'rewards' | 'academy'>('appointments');
  const [appointmentViewMode, setAppointmentViewMode] = useState<'calendar' | 'list'>('calendar');
  const [feedbackTreatment, setFeedbackTreatment] = useState<string | undefined>(undefined);
  const [feedbackDoctor, setFeedbackDoctor] = useState<string | undefined>(undefined);
  const [testimonialsCount, setTestimonialsCount] = useState<number>(() => getStoredTestimonials().length);
  const [rewardsSummary, setRewardsSummary] = useState<PatientSmileRewardsSummary | null>(() =>
    patient ? getPatientSmileRewards(patient.uhid) : null
  );
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);
  const [isCourseGraduated, setIsCourseGraduated] = useState<boolean>(false);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register states
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPasscode, setRegPasscode] = useState('');
  const [regAge, setRegAge] = useState<number>(28);
  const [regGender, setRegGender] = useState('Female');
  const [regBloodGroup, setRegBloodGroup] = useState('B +ve');
  const [regAllergies, setRegAllergies] = useState('');

  // Data states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<DigitalPrescription[]>([]);
  const [selectedRx, setSelectedRx] = useState<DigitalPrescription | null>(null);

  // Sync active patient
  useEffect(() => {
    const handleActiveChange = (e: any) => {
      setPatient(e.detail);
      if (e.detail) {
        setRewardsSummary(getPatientSmileRewards(e.detail.uhid));
      }
    };
    window.addEventListener('sdc_active_patient_changed', handleActiveChange);
    const handleAppointmentsChange = () => {
      if (patient) {
        setAppointments(getPatientUpcomingAppointments(patient.phone, patient.name));
      }
    };
    const handleTestimonialsChange = () => {
      setTestimonialsCount(getStoredTestimonials().length);
    };
    const handleRewardsChange = () => {
      if (patient) {
        setRewardsSummary(getPatientSmileRewards(patient.uhid));
      }
    };
    window.addEventListener('sdc_appointments_updated', handleAppointmentsChange);
    window.addEventListener('sdc_testimonials_updated', handleTestimonialsChange);
    window.addEventListener('sdc_rewards_updated', handleRewardsChange);

    return () => {
      window.removeEventListener('sdc_active_patient_changed', handleActiveChange);
      window.removeEventListener('sdc_appointments_updated', handleAppointmentsChange);
      window.removeEventListener('sdc_testimonials_updated', handleTestimonialsChange);
      window.removeEventListener('sdc_rewards_updated', handleRewardsChange);
    };
  }, [patient]);

  // Reload patient data whenever patient changes
  useEffect(() => {
    if (patient) {
      const recs = getPatientMedicalRecords(patient.uhid);
      const rxs = getPatientPrescriptions(patient.uhid);
      const apts = getPatientUpcomingAppointments(patient.phone, patient.name);
      const rwd = getPatientSmileRewards(patient.uhid);
      setRecords(recs);
      setPrescriptions(rxs);
      setAppointments(apts);
      setRewardsSummary(rwd);
      if (rxs.length > 0 && !selectedRx) {
        setSelectedRx(rxs[0]);
      }
    }
  }, [patient]);

  const handleDemoLogin = () => {
    const demo = loginPatient('9845122340', '1234');
    if (demo) {
      setPatient(demo);
      setLoginError('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier || !loginPasscode) {
      setLoginError('Please enter your mobile/UHID and passcode.');
      return;
    }
    const logged = loginPatient(loginIdentifier, loginPasscode);
    if (logged) {
      setPatient(logged);
    } else {
      setLoginError(t.invalidCredentials);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone || !regPasscode) {
      setLoginError('Name, phone and passcode are required.');
      return;
    }
    const allergiesList = regAllergies
      ? regAllergies.split(',').map(s => s.trim()).filter(Boolean)
      : ['None reported'];

    const newPat = registerPatient({
      name: regName,
      phone: regPhone,
      email: regEmail || `${regName.toLowerCase().replace(/\s+/g, '')}@patient.in`,
      passcode: regPasscode,
      age: regAge,
      gender: regGender,
      bloodGroup: regBloodGroup,
      allergies: allergiesList
    });
    setPatient(newPat);
  };

  const handleLogout = () => {
    logoutActiveSession();
    setActivePatient(null);
    setPatient(null);
  };

  const handlePrintRx = () => {
    window.print();
  };

  const calculateDaysLeft = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumbs / Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.portalTitle}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sakthi Dental Patient Health Portal
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {t.portalSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {patient ? (
              <div className="flex items-center gap-3 bg-white p-2 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                  {patient.name.charAt(0)}
                </div>
                <div className="text-left text-xs hidden sm:block">
                  <p className="font-bold text-slate-900 leading-tight">{patient.name}</p>
                  <p className="text-[11px] font-mono text-slate-500">UHID: {patient.uhid}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                  title="Sign out of patient portal"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.portalLogout}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleDemoLogin}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-pink-200" />
                <span>{t.quickDemoLogin}</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNAUTHENTICATED STATE: SIGN IN / REGISTER FORM */}
        {/* ========================================================================= */}
        {!patient && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header Toggle */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setLoginError('');
                  }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.portalLogin}
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setLoginError('');
                  }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.portalRegister}
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* One Click Demo Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Instant Access with Pre-Loaded Medical Records</span>
                    </h4>
                    <p className="text-[11px] text-blue-700 mt-0.5">
                      Explore Priya Sundaram's orthodontic treatment records, Dr. Sneha's digital prescriptions, and upcoming visit reminders.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="shrink-0 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Load Demo Profile
                  </button>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* LOGIN FORM */}
                {authMode === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Registered Email, Phone Number or UHID *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={e => setLoginIdentifier(e.target.value)}
                          placeholder="e.g. priya.sundaram@gmail.com, 9845122340 or SDC-2026-0842"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[11px] text-slate-400">Quick Demo:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginIdentifier('priya.sundaram@gmail.com');
                            setLoginPasscode('1234');
                          }}
                          className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md hover:bg-blue-100 cursor-pointer font-medium"
                        >
                          Priya (Orthodontic)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginIdentifier('karthik.raja@outlook.com');
                            setLoginPasscode('1234');
                          }}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md hover:bg-slate-200 cursor-pointer font-medium"
                        >
                          Karthik (Root Canal)
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          {t.patientPasswordLabel} *
                        </label>
                        <span className="text-[11px] text-slate-400">Demo Passcode: 1234</span>
                      </div>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPasscode}
                          onChange={e => setLoginPasscode(e.target.value)}
                          placeholder="Passcode / Password (Default: 1234)"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer"
                    >
                      {t.signInBtn}
                    </button>
                  </form>
                ) : (
                  /* REGISTER FORM */
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.patientNameLabel} *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={e => setRegName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.patientPhoneLabel} *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={regPhone}
                            onChange={e => setRegPhone(e.target.value)}
                            placeholder="10-digit mobile number"
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.patientEmailLabel}
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={regEmail}
                            onChange={e => setRegEmail(e.target.value)}
                            placeholder="patient@example.com"
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.patientPasswordLabel} *
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={regPasscode}
                          onChange={e => setRegPasscode(e.target.value)}
                          placeholder="Choose secure password / 4-digit PIN"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Basic Patient Details */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                        Basic Health & Demographic Details
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Age</label>
                          <input
                            type="number"
                            min={1}
                            max={120}
                            value={regAge}
                            onChange={e => setRegAge(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                          <select
                            value={regGender}
                            onChange={e => setRegGender(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.bloodGroup}</label>
                          <select
                            value={regBloodGroup}
                            onChange={e => setRegBloodGroup(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                          >
                            <option value="O +ve">O +ve</option>
                            <option value="A +ve">A +ve</option>
                            <option value="B +ve">B +ve</option>
                            <option value="AB +ve">AB +ve</option>
                            <option value="O -ve">O -ve</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Known Drug Allergies / Medical Notes
                        </label>
                        <input
                          type="text"
                          value={regAllergies}
                          onChange={e => setRegAllergies(e.target.value)}
                          placeholder="e.g. Penicillin, NSAIDs, Latex, or 'None'"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer"
                    >
                      {t.createAccountBtn}
                    </button>
                  </form>
                )}
              </div>

              {/* Link to Staff / Admin Gate */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="text-xs text-slate-500">
                  Doctor or clinic administrative staff?
                </span>
                {onNavigateAdmin && (
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-100/60 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Go to Staff & Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Patient Feedback & Ratings in Public Portal View */}
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Community Reviews & Direct Feedback
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Verified Patient Experiences & Ratings
                </h3>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Browse real ratings or submit your direct feedback for Dr. Anupriya and the clinical team.
                </p>
              </div>
              <PatientFeedback onNavigateBooking={onOpenBooking} />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* AUTHENTICATED STATE: DASHBOARD */}
        {/* ========================================================================= */}
        {patient && (
          <div className="space-y-6">
            {/* Quick Profile Summary Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white text-xl sm:text-2xl font-black flex items-center justify-center shrink-0 shadow-lg">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
                        {patient.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold flex items-center gap-1 border border-emerald-200">
                        <BadgeCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Verified Patient</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500 font-medium">
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 font-bold">
                        UHID: {patient.uhid}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>+91 {patient.phone}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[150px] sm:max-w-none">{patient.email}</span>
                      </span>
                      <span>
                        Blood Group: <strong className="text-slate-800">{patient.bloodGroup || 'O+'}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 text-pink-900 border border-pink-200 text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-all hover:scale-102 cursor-pointer"
                    title="View earned points & redeem for cosmetic discounts"
                  >
                    <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 shrink-0" />
                    <span>Smile Rewards ({rewardsSummary?.availablePoints || 0} pts)</span>
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackTreatment(undefined);
                      setFeedbackDoctor(undefined);
                      setActiveTab('feedback');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-all hover:scale-102 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <span>Rate Care</span>
                  </button>
                  <button
                    onClick={() => onOpenBooking()}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{t.bookNewAppointment}</span>
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Clinic Site</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-red-200"
                    title="Sign out of Patient Portal"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Patient Allergies Alert Pill */}
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-800 bg-amber-50/70 px-3 py-2 rounded-xl border border-amber-200">
                  <HeartPulse className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Clinical Alert:</strong> Recorded patient allergies: {patient.allergies.join(', ')}.
                  </span>
                </div>
              )}
            </div>

            {/* Navigation Tabs (Smooth horizontally scrollable on phone & tablet) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar border-b border-slate-200 -mx-1 px-1 sm:mx-0 sm:px-0">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'appointments'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t.tabUpcomingAppointments}</span>
                {appointments.length > 0 && (
                  <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                    activeTab === 'appointments' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {appointments.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('records')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'records'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t.tabMedicalHistory}</span>
                <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'records' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {records.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'prescriptions'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Pill className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t.tabDigitalPrescriptions}</span>
                <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'prescriptions' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'
                }`}>
                  {prescriptions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'rewards'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Gift className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === 'rewards' ? 'text-white' : 'text-pink-600'}`} />
                <span>Smile Rewards</span>
                <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'rewards' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'
                }`}>
                  {rewardsSummary ? `${rewardsSummary.availablePoints} pts` : '0 pts'}
                </span>
              </button>

              <button
                onClick={() => {
                  setFeedbackTreatment(undefined);
                  setFeedbackDoctor(undefined);
                  setActiveTab('feedback');
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'feedback'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === 'feedback' ? 'fill-amber-200 text-amber-200' : 'text-amber-500 fill-amber-500'}`} />
                <span>{t.tabPatientFeedback || 'Feedback & Reviews'}</span>
                <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'feedback' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {testimonialsCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('academy')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'academy'
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <GraduationCap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === 'academy' ? 'text-white' : 'text-blue-600'}`} />
                <span>Doctor Academy Course</span>
                <span className={`px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'academy' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Free • +150 Pts
                </span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* TAB 1: UPCOMING APPOINTMENTS & REMINDERS (CALENDAR & LIST) */}
            {/* ========================================================= */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                {/* View Mode Segmented Switcher & Quick Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setAppointmentViewMode('calendar')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          appointmentViewMode === 'calendar'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.calendarView}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAppointmentViewMode('list')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          appointmentViewMode === 'list'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t.listView}</span>
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 font-medium hidden md:inline">
                      {appointments.length} upcoming visit{appointments.length !== 1 ? 's' : ''} on record
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        createTestUpcoming24hAppointment();
                        resetRevisitAlertDismiss();
                        window.dispatchEvent(new CustomEvent('sdc_revisit_alert_trigger'));
                        window.dispatchEvent(new CustomEvent('sdc_appointments_updated'));
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      title="Simulate an upcoming appointment in 3 hours to verify the 24-hour revisit reminder alert"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-600" />
                      <span>Test 24h Revisit Alert</span>
                    </button>

                    <button
                      onClick={() => onOpenBooking()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{t.bookNewAppointment}</span>
                    </button>
                  </div>
                </div>

                {/* 24-Hour Upcoming Session Reminder Card inside Portal */}
                {getUpcomingAppointmentsWithin24Hours().length > 0 && (
                  <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-indigo-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                          <Clock className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold uppercase text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-full">
                              Upcoming Visit Within 24 Hours
                            </span>
                            <span className="text-xs text-amber-800 font-bold">
                              {getUpcomingAppointmentsWithin24Hours()[0].timeDisplay}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">
                            {getUpcomingAppointmentsWithin24Hours()[0].appointment.treatmentName} with{' '}
                            {getUpcomingAppointmentsWithin24Hours()[0].appointment.doctorName}
                          </h4>
                          <p className="text-xs text-slate-600">
                            Scheduled on {getUpcomingAppointmentsWithin24Hours()[0].appointment.date} at{' '}
                            {getUpcomingAppointmentsWithin24Hours()[0].appointment.timeSlot} • Sakthi Dental Clinic Hosur
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <a
                          href={generateGoogleCalendarUrl(getUpcomingAppointmentsWithin24Hours()[0].appointment)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-pink-600" />
                          <span>Google Calendar</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>

                        <button
                          type="button"
                          onClick={async () => {
                            await triggerLocalAppointmentNotification(getUpcomingAppointmentsWithin24Hours()[0]);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Trigger native browser notification"
                        >
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                          <span>Push Alert</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {appointments.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                    <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
                    <div>
                      <h3 className="text-base font-bold text-slate-800">
                        {t.noUpcomingAppointments}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                        Book a scheduled consultation with Dr. Anupriya or specialists to maintain your oral wellness.
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenBooking()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.bookNewAppointment}</span>
                    </button>
                  </div>
                ) : appointmentViewMode === 'calendar' ? (
                  /* FULLCALENDAR VISUALIZATION */
                  <PatientAppointmentCalendar
                    appointments={appointments}
                    t={t}
                    onOpenBooking={onOpenBooking}
                  />
                ) : (
                  /* CARDS / LIST VIEW */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appointments.map(apt => {
                      const daysLeft = calculateDaysLeft(apt.date);
                      return (
                        <div
                          key={apt.id}
                          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md relative overflow-hidden flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                {apt.id}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                apt.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {apt.status === 'Confirmed' ? t.appointmentConfirmed : t.appointmentPending}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-extrabold text-slate-900">
                                {apt.treatmentName}
                              </h3>
                              <p className="text-xs text-blue-600 font-semibold mt-0.5">
                                {apt.doctorName}
                              </p>
                            </div>

                            {/* Schedule & Countdown Box */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                  {t.dateLabel}
                                </span>
                                <span className="font-extrabold text-slate-800">
                                  {apt.date}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                  {t.timeLabel}
                                </span>
                                <span className="font-extrabold text-slate-800">
                                  {apt.timeSlot}
                                </span>
                              </div>
                            </div>

                            {/* Live Countdown Reminder */}
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                              <Clock className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                              <span>
                                {daysLeft === 0
                                  ? 'Scheduled for Today! Please arrive 10 mins prior.'
                                  : `Appointment reminder: In ${daysLeft} ${t.countdownDays}.`}
                              </span>
                            </div>

                            {apt.notes && (
                              <p className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                                "{apt.notes}"
                              </p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <p className="text-[11px] text-slate-500">
                              {t.rescheduleNotice}
                            </p>
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${CLINIC_INFO.primaryPhone}`}
                                className="flex-1 text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                              >
                                Call Clinic ({CLINIC_INFO.primaryPhone})
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  setFeedbackTreatment(apt.treatmentName);
                                  setFeedbackDoctor(apt.doctorName);
                                  setActiveTab('feedback');
                                }}
                                className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                                title="Leave feedback or rating for this visit"
                              >
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span>Review Visit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: MEDICAL HISTORY & VISITS */}
            {/* ========================================================= */}
            {activeTab === 'records' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {t.clinicalVisitHistory} ({records.length})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Permanent electronic dental records
                  </span>
                </div>

                <div className="space-y-4">
                  {records.map(rec => (
                    <div
                      key={rec.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                              {rec.date}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {t.statusCompleted}
                            </span>
                          </div>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                            {rec.treatmentName}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium">
                            Attending Specialist: <strong>{rec.doctorName}</strong>
                          </p>
                        </div>

                        <div className="text-right text-xs space-y-1">
                          <span className="text-slate-400 block font-mono">Ref: {rec.id}</span>
                          {rec.cost && (
                            <span className="font-extrabold text-slate-800 text-sm block">{rec.cost}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setFeedbackTreatment(rec.treatmentName);
                              setFeedbackDoctor(rec.doctorName);
                              setActiveTab('feedback');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                            title="Write a testimonial for this procedure"
                          >
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>Review Care</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                            {t.treatedTeeth}
                          </span>
                          <p className="text-slate-800 font-medium">{rec.targetTeeth}</p>
                          <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider pt-2">
                            Clinical Diagnosis
                          </span>
                          <p className="text-slate-700 leading-relaxed">{rec.diagnosis}</p>
                        </div>

                        <div className="space-y-2 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100">
                          <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">
                            {t.doctorNotes}
                          </span>
                          <p className="text-slate-700 leading-relaxed">{rec.procedureNotes}</p>
                          {rec.nextFollowUp && (
                            <div className="pt-2 text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                              <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                              <span>Recommended follow-up: {rec.nextFollowUp}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: DIGITAL PRESCRIPTIONS (Rx) */}
            {/* ========================================================= */}
            {activeTab === 'prescriptions' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Prescription List Column */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {t.prescriptionsTitle}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">({prescriptions.length})</span>
                  </div>

                  {prescriptions.map(rx => {
                    const isSelected = selectedRx?.id === rx.id;
                    return (
                      <button
                        key={rx.id}
                        type="button"
                        onClick={() => setSelectedRx(rx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-101'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {rx.rxNumber}
                          </span>
                          <span className="text-xs opacity-90">{rx.date}</span>
                        </div>
                        <h4 className="text-sm font-bold mt-2 leading-tight">
                          {rx.doctorName}
                        </h4>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {rx.diagnosis}
                        </p>
                        <div className="mt-2 text-[11px] font-semibold opacity-90">
                          {rx.medicines.length} medications prescribed
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Prescription Viewer / Printable Slip */}
                <div className="lg:col-span-8">
                  {selectedRx ? (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6 print:border-none print:shadow-none print:p-0">
                      {/* Clinic Header Slip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200">
                        <div>
                          <div className="flex items-center gap-2 text-blue-900">
                            <span className="text-xl font-extrabold tracking-tight">SAKTHI DENTAL CLINIC</span>
                            <span className="text-xs bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                              Hosur
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Specialized Dental Care for Women, Children & Families
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {selectedRx.clinicAddress} • Ph: {CLINIC_INFO.primaryPhone}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Digital E-Prescription</span>
                          </div>
                          <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                            {selectedRx.rxNumber}
                          </p>
                          <p className="text-xs text-slate-500">Date: {selectedRx.date}</p>
                        </div>
                      </div>

                      {/* Patient & Doctor Meta Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
                          <span className="font-extrabold text-slate-900">{selectedRx.patientName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Age / UHID</span>
                          <span className="font-extrabold text-slate-900">{selectedRx.patientAge} yrs • {selectedRx.uhid}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.prescribedBy}</span>
                          <span className="font-extrabold text-blue-800">{selectedRx.doctorName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Reg. Number</span>
                          <span className="font-mono text-slate-700">{selectedRx.doctorRegistrationNo}</span>
                        </div>
                      </div>

                      {/* Clinical Diagnosis */}
                      <div>
                        <span className="text-[11px] uppercase font-extrabold text-slate-500 tracking-wider block mb-1">
                          Clinical Diagnosis & Indication
                        </span>
                        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-800 font-medium">
                          {selectedRx.diagnosis}
                        </div>
                      </div>

                      {/* Medication Rx Table */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-4 h-4 text-pink-600" />
                          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                            Prescribed Medications (Rx)
                          </h4>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                              <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">{t.medicationName}</th>
                                <th className="p-3">{t.dosage}</th>
                                <th className="p-3">{t.frequency}</th>
                                <th className="p-3">{t.duration}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedRx.medicines.map((med, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/60">
                                  <td className="p-3 font-mono text-slate-400 font-bold">{idx + 1}</td>
                                  <td className="p-3">
                                    <strong className="text-slate-900 block">{med.name}</strong>
                                    <span className="text-[11px] text-blue-600 italic">{med.instructions}</span>
                                  </td>
                                  <td className="p-3 font-semibold text-slate-700">{med.dosage}</td>
                                  <td className="p-3 font-medium text-slate-800">{med.frequency}</td>
                                  <td className="p-3 font-bold text-slate-900">{med.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* General Doctor Advice */}
                      {selectedRx.generalAdvice && selectedRx.generalAdvice.length > 0 && (
                        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs space-y-1.5">
                          <h5 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                            Specialist Post-Care Advice:
                          </h5>
                          <ul className="list-disc list-inside space-y-1 text-slate-700">
                            {selectedRx.generalAdvice.map((adv, i) => (
                              <li key={i}>{adv}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Doctor Signature & Clinic Seal Footer */}
                      <div className="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{t.officialSeal}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handlePrintRx}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer print:hidden"
                          >
                            <Printer className="w-4 h-4" />
                            <span>{t.printRx}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                      Select a prescription from the left to view and print.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: PATIENT FEEDBACK & REVIEWS */}
            {/* ========================================================= */}
            {activeTab === 'feedback' && (
              <PatientFeedback
                patient={patient}
                initialTreatment={feedbackTreatment}
                initialDoctor={feedbackDoctor}
                onReviewSubmitted={(_newReview) => {
                  setTestimonialsCount(getStoredTestimonials().length);
                }}
                onNavigateBooking={onOpenBooking}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 5: SMILE REWARDS (EARNED POINTS & COSMETIC DISCOUNTS) */}
            {/* ========================================================= */}
            {activeTab === 'rewards' && (
              <PatientSmileRewards
                patient={patient}
                onOpenBookingWithTreatment={(treatmentId, _notes) => {
                  onOpenBooking(treatmentId);
                }}
                onNavigateBooking={() => onOpenBooking()}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 6: DOCTOR-GUIDED PATIENT ORAL HEALTH ACADEMY COURSE */}
            {/* ========================================================= */}
            {activeTab === 'academy' && (() => {
              const wellnessCourse = DOCTOR_COURSES.find(c => c.id === 'course-patient-wellness-academy') || DOCTOR_COURSES[0];
              const totalLessons = wellnessCourse.syllabus.length;
              const isAllComplete = completedLessons.length >= totalLessons;

              const handleToggleLesson = (index: number) => {
                if (completedLessons.includes(index)) {
                  setCompletedLessons(completedLessons.filter(i => i !== index));
                } else {
                  setCompletedLessons([...completedLessons, index]);
                }
              };

              const handleGraduateCourse = () => {
                if (!patient) return;
                earnCheckupRewardPoints(patient.uhid, 'Doctor Academy Course: Smile for Life Graduation', 150, 'Dr. Anupriya');
                setRewardsSummary(getPatientSmileRewards(patient.uhid));
                setIsCourseGraduated(true);
              };

              return (
                <div className="space-y-6">
                  {/* Hero Course Card */}
                  <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="space-y-3 max-w-2xl relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30">
                          Free Patient Wellness Course
                        </span>
                        <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black tracking-wider border border-pink-400/30 flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" />
                          <span>Earn +150 Smile Points</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-black">
                        {wellnessCourse.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                        {wellnessCourse.subtitle}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 max-w-xl">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-200">Course Progress</span>
                        <span className="font-black text-emerald-400">
                          {completedLessons.length} of {totalLessons} Lessons Completed ({Math.round((completedLessons.length / totalLessons) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(completedLessons.length / totalLessons) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Course Director Box */}
                  <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-slate-200">
                        <img
                          src={wellnessCourse.directorImage}
                          alt={wellnessCourse.directorName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                          Course Created & Directed by
                        </span>
                        <h4 className="text-base font-black text-slate-900">
                          {wellnessCourse.directorName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {wellnessCourse.directorRole} • {wellnessCourse.directorDegrees}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 sm:max-w-xs">
                      <p className="italic">
                        "Good oral health is not luck—it is a daily ritual based on medical truth. Master these 5 short lessons to protect your enamel for life."
                      </p>
                    </div>
                  </div>

                  {/* Lessons Accordion / List */}
                  <div className="space-y-4">
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Course Curriculum (5 Self-Paced Doctor Video Lessons)</span>
                    </h4>

                    <div className="space-y-3">
                      {wellnessCourse.syllabus.map((lesson, idx) => {
                        const isDone = completedLessons.includes(idx);
                        const isExpanded = selectedLessonIdx === idx;

                        return (
                          <div
                            key={idx}
                            className={`rounded-3xl border transition-all ${
                              isDone
                                ? 'bg-emerald-50/40 border-emerald-200/80'
                                : 'bg-white border-slate-200 shadow-xs'
                            }`}
                          >
                            <div
                              onClick={() => setSelectedLessonIdx(isExpanded ? -1 : idx)}
                              className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleLesson(idx);
                                  }}
                                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isDone
                                      ? 'bg-emerald-600 text-white'
                                      : 'border-2 border-slate-300 text-transparent hover:border-blue-500'
                                  }`}
                                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                                      {lesson.moduleNumber}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium">{lesson.duration}</span>
                                  </div>
                                  <h5 className={`text-sm font-bold mt-0.5 ${isDone ? 'text-emerald-950 font-black' : 'text-slate-900'}`}>
                                    {lesson.title}
                                  </h5>
                                </div>
                              </div>

                              <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>

                            {/* Expanded Lesson Clinical Highlights */}
                            {isExpanded && (
                              <div className="px-5 pb-5 pt-0 border-t border-slate-100 space-y-3 mt-2 text-xs text-slate-700">
                                <p className="font-bold text-slate-900 pt-3">Key Clinical Takeaways for Patients:</p>
                                <ul className="space-y-1.5">
                                  {lesson.topics.map((top, tidx) => (
                                    <li key={tidx} className="flex items-start gap-2 text-slate-600">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                      <span>{top}</span>
                                    </li>
                                  ))}
                                </ul>

                                <div className="pt-2 flex items-center justify-between">
                                  <span className="text-[11px] text-slate-400">Doctor Lesson Notes Verified by Dr. Anupriya</span>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleLesson(idx)}
                                    className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                                      isDone
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                  >
                                    {isDone ? 'Completed ✓' : 'Mark Lesson Complete'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Graduation & Smile Points Reward Claim */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white shadow-lg space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                          <Award className="w-3.5 h-3.5 text-amber-300" />
                          <span>Course Graduation</span>
                        </div>
                        <h4 className="text-xl font-black">
                          {isCourseGraduated ? 'Certified Oral Wellness Ambassador!' : 'Complete All 5 Lessons to Claim Reward'}
                        </h4>
                        <p className="text-xs text-emerald-100 max-w-lg">
                          Earn an official <strong>Sakthi Dental Wellness Ambassador Certificate</strong> and claim <strong>+150 Smile Points</strong> to redeem for discounts on cosmetic treatments.
                        </p>
                      </div>

                      {isCourseGraduated ? (
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-center shrink-0">
                          <span className="text-xs font-black text-amber-300 block">+150 Smile Points Claimed!</span>
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="mt-2 px-4 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-transform active:scale-95 cursor-pointer shadow-sm flex items-center gap-1.5 mx-auto"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Print Certificate</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={!isAllComplete}
                          onClick={handleGraduateCourse}
                          className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer ${
                            isAllComplete
                              ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 hover:scale-105 active:scale-95'
                              : 'bg-white/20 text-white/60 cursor-not-allowed'
                          }`}
                        >
                          {isAllComplete ? 'Claim 150 Points & Certificate 🎓' : `Complete ${totalLessons - completedLessons.length} More Lessons`}
                        </button>
                      )}
                    </div>

                    {/* Official Certificate Preview when graduated */}
                    {isCourseGraduated && (
                      <div className="p-6 bg-white rounded-2xl text-slate-900 border-4 border-amber-300 shadow-xl space-y-4 text-center mt-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                            Sakthi Dental Clinic • Hosur
                          </p>
                          <h5 className="text-xl font-serif font-black text-slate-900">
                            Certificate of Oral Health Wellness
                          </h5>
                          <p className="text-xs text-slate-500">
                            This certifies that
                          </p>
                          <h4 className="text-lg font-black text-blue-700">
                            {patient.name} (UHID: {patient.uhid})
                          </h4>
                          <p className="text-xs text-slate-600 max-w-md mx-auto">
                            has successfully completed the 5-module <strong>Doctor-Guided "Smile for Life" Patient Dental Health Course</strong>, mastering clinical guidelines for lifetime preventive oral care.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 px-4">
                          <div>
                            <p className="font-bold text-slate-800">Date of Award:</p>
                            <p>{new Date().toISOString().split('T')[0]}</p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 font-serif italic text-sm">Dr. Anupriya, BDS</p>
                            <p className="text-[10px]">Founder & Senior Dental Surgeon</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
