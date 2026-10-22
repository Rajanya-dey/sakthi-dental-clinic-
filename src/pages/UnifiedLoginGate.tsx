import React, { useState, useEffect } from 'react';
import { UserRole, UserSession, PatientAccount, DoctorAccount, AdminAccount } from '../types';
import {
  requestOtp,
  verifyOtpAndLogin,
  registerUserWithOtp,
  getStoredDoctors,
  getStoredPatients,
  getStoredAdmins,
  logoutActiveSession
} from '../utils/storage';
import { CLINIC_INFO } from '../data/clinicData';
import {
  ShieldCheck,
  User,
  Stethoscope,
  Lock,
  ArrowRight,
  Phone,
  Mail,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Building,
  Clock,
  ExternalLink
} from 'lucide-react';

interface UnifiedLoginGateProps {
  initialRole?: UserRole;
  onSuccess: (session: UserSession) => void;
  onNavigateHome: () => void;
}

export const UnifiedLoginGate: React.FC<UnifiedLoginGateProps> = ({
  initialRole = 'patient',
  onSuccess,
  onNavigateHome
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [step, setStep] = useState<'contact' | 'otp' | 'register'>('contact');
  const [identifier, setIdentifier] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Registration fields for new profiles
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regAge, setRegAge] = useState<number>(28);
  const [regGender, setRegGender] = useState<string>('Female');
  const [regBloodGroup, setRegBloodGroup] = useState<string>('B +ve');
  const [regSpecialty, setRegSpecialty] = useState<string>('Orthodontics & Dentofacial Orthopedics');
  const [regRegNo, setRegRegNo] = useState<string>('TN-DC-34820');
  const [regStaffRole, setRegStaffRole] = useState<string>('Senior Receptionist & Patient Care Coordinator');

  // Keep role in sync if initialRole prop changes
  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // Listen to simulated OTP delivered event
  useEffect(() => {
    const handleOtpDelivered = (e: any) => {
      if (e.detail && e.detail.otp) {
        setSimulatedOtpNotice(`SMS & Email delivered: Your security code is ${e.detail.otp}`);
      }
    };
    window.addEventListener('sdc_otp_delivered', handleOtpDelivered);
    return () => window.removeEventListener('sdc_otp_delivered', handleOtpDelivered);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setStep('contact');
    setErrorMsg(null);
    setSuccessMsg(null);
    setOtpInput('');
    setSimulatedOtpNotice(null);
  };

  const handleSelectQuickAccount = (quickIdentifier: string) => {
    setIdentifier(quickIdentifier);
    setErrorMsg(null);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const clean = identifier.trim();
    if (!clean) {
      setErrorMsg('Please enter your registered email address or mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = requestOtp(clean, role);
      setStep('otp');
      setCountdown(30);
      setSimulatedOtpNotice(`Verification Code Sent! Code: ${res.otp} (Valid for 10 minutes)`);
      setSuccessMsg(`A 6-digit verification code was sent to ${clean}`);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!otpInput.trim() || otpInput.trim().length < 4) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const result = verifyOtpAndLogin(identifier, otpInput, role);
      if (result.success && result.session) {
        onSuccess(result.session);
      } else if (result.isNewUser) {
        // New user profile needs to be registered
        setRegName(identifier.includes('@') ? identifier.split('@')[0] : 'New Member');
        setRegEmail(identifier.includes('@') ? identifier : '');
        setRegPhone(!identifier.includes('@') ? identifier : '');
        setStep('register');
        setErrorMsg(null);
      } else {
        setErrorMsg(result.error || 'Invalid OTP code. Please retry or click Resend.');
      }
    }, 400);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newSession = registerUserWithOtp(role, {
        name: regName,
        identifier: identifier,
        email: regEmail,
        phone: regPhone,
        age: regAge,
        gender: regGender,
        bloodGroup: regBloodGroup,
        specialty: regSpecialty,
        registrationNo: regRegNo,
        staffRole: regStaffRole
      });
      onSuccess(newSession);
    }, 400);
  };

  // Demo accounts data for 1-click easy testing
  const demoAccounts = {
    patient: [
      { name: 'Priya Sundaram', contact: '+91 98451 22340', note: 'Registered Orthodontic Patient' },
      { name: 'Karthik Raja', contact: 'karthik.raja@outlook.com', note: 'Scaling & Hygiene Patient' }
    ],
    doctor: [
      { name: 'Dr. Sneha N', contact: 'sneha.ortho@sakthidentalclinic.in', note: 'MDS Orthodontist • TN-DC-34819' },
      { name: 'Dr. Ananya Iyer', contact: 'ananya.prostho@sakthidentalclinic.in', note: 'MDS Prosthodontist • TN-DC-28491' },
      { name: 'Dr. Anupriya', contact: '9862890897', note: 'Founder & Chief Dental Surgeon' }
    ],
    admin: [
      { name: 'Rajesh K', contact: 'admin@sakthidentalclinic.in', note: 'Clinic Administrator & Operations' },
      { name: 'Kavitha Devi', contact: '+91 98400 12345', note: 'Patient Front Desk Coordinator' }
    ]
  };

  const roleCardMeta = {
    patient: {
      title: 'Patient Health Portal',
      subtitle: 'Personal medical records, upcoming appointments, digital prescriptions & feedback',
      icon: User,
      badge: 'Patient Access',
      accentColor: 'from-pink-500 to-rose-600',
      activeRing: 'border-pink-500 text-pink-700 bg-pink-50/50'
    },
    doctor: {
      title: 'Doctor Clinical Suite',
      subtitle: 'Patient consultation queue, issue digital Rx, clinical notes & schedule',
      icon: Stethoscope,
      badge: 'Doctor On-Duty',
      accentColor: 'from-blue-600 to-cyan-600',
      activeRing: 'border-blue-500 text-blue-700 bg-blue-50/50'
    },
    admin: {
      title: 'Clinic Administration',
      subtitle: 'Hospital front desk, appointment analytics, doctor rosters & wait times',
      icon: Lock,
      badge: 'Staff & Admin',
      accentColor: 'from-indigo-600 to-purple-600',
      activeRing: 'border-indigo-500 text-indigo-700 bg-indigo-50/50'
    }
  };

  const currentMeta = roleCardMeta[role];
  const CurrentRoleIcon = currentMeta.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-blue-50/30 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-4 sm:space-y-6">
        
        {/* TOP BRANDING & CLINIC IDENTITY */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            <span>Sakthi Dental Clinic • Secure Unified Login</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Portal Access & OTP Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Choose your role to access your dedicated clinical workspace with OTP authentication.
          </p>
        </div>

        {/* ROLE SELECTION TABS */}
        <div className="bg-white p-1 sm:p-1.5 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-3 gap-1 sm:gap-1.5">
          {(['patient', 'doctor', 'admin'] as UserRole[]).map(r => {
            const meta = roleCardMeta[r];
            const Icon = meta.icon;
            const isSelected = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`py-2.5 sm:py-3 px-1 sm:px-3 rounded-xl text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-blue-300' : 'text-slate-500'}`} />
                <span className="capitalize">{r === 'admin' ? 'Admin' : r}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN AUTHENTICATION CARD */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-slate-200 space-y-5 sm:space-y-6">
          
          {/* Header of Active Role Card */}
          <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${currentMeta.accentColor} text-white flex items-center justify-center shadow-md shrink-0`}>
                <CurrentRoleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <h2 className="text-base sm:text-xl font-extrabold text-slate-900 leading-tight">
                    {currentMeta.title}
                  </h2>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 shrink-0">
                    {currentMeta.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-tight mt-0.5">
                  {currentMeta.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* SIMULATED OTP TOAST BANNER */}
          {simulatedOtpNotice && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-emerald-800">
                  {simulatedOtpNotice}
                </p>
                <p className="text-[11px] text-emerald-700">
                  Tip: Universal demo test passcode is <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">123456</span>
                </p>
              </div>
            </div>
          )}

          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-red-800 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: ENTER EMAIL OR PHONE */}
          {step === 'contact' && (
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Registered Email Address or 10-Digit Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder={
                      role === 'patient'
                        ? 'e.g. +91 98451 22340 or priya@gmail.com'
                        : role === 'doctor'
                        ? 'e.g. sneha.ortho@sakthidentalclinic.in'
                        : 'e.g. admin@sakthidentalclinic.in'
                    }
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium text-slate-900 bg-slate-50/50"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {identifier.includes('@') ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Phone className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  We'll send a 6-digit One-Time Password (OTP) to this phone or email to verify your identity.
                </p>
              </div>

              {/* QUICK DEMO ACCOUNTS FOR INSTANT 1-CLICK TESTING */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Quick 1-Click Demo Accounts ({role.toUpperCase()}):</span>
                  <span className="text-[10px] text-blue-600 font-normal">Click to fill</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {demoAccounts[role].map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuickAccount(acc.contact)}
                      className={`text-left p-2.5 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 transition-colors cursor-pointer border ${
                        identifier === acc.contact
                          ? 'bg-blue-100/70 border-blue-300 text-blue-900 font-bold'
                          : 'bg-white hover:bg-blue-50 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900">{acc.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({acc.contact})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {acc.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send 6-Digit OTP Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY 6-DIGIT OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter 6-Digit Security OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('contact')}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Change contact</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpInput}
                    onChange={e => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-center tracking-[0.25em] sm:tracking-[0.5em] font-mono text-lg sm:text-xl font-bold rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                  <KeyRound className="w-5 h-5 text-blue-600 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Code valid for 10 minutes</span>
                  {countdown > 0 ? (
                    <span className="font-mono text-slate-400">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      className="text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      Resend OTP Code
                    </button>
                  )}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Enter {currentMeta.title}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('contact')}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  Back to Identifier Entry
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: NEW USER REGISTRATION */}
          {step === 'register' && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900">
                <p className="font-bold">✨ First Time Entry Verified via OTP!</p>
                <p className="text-[11px] mt-0.5">Please provide your details below to activate your {role} profile.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {role === 'doctor' ? 'Doctor Full Name' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder={role === 'doctor' ? 'e.g. Dr. Ramesh Kumar' : 'e.g. Anjali Sharma'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={regPhone || identifier}
                    onChange={e => setRegPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={regEmail || (identifier.includes('@') ? identifier : '')}
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                  />
                </div>
              </div>

              {role === 'patient' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={regAge}
                      onChange={e => setRegAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={regGender}
                      onChange={e => setRegGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                    <select
                      value={regBloodGroup}
                      onChange={e => setRegBloodGroup(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    >
                      <option value="O +ve">O +ve</option>
                      <option value="A +ve">A +ve</option>
                      <option value="B +ve">B +ve</option>
                      <option value="AB +ve">AB +ve</option>
                      <option value="O -ve">O -ve</option>
                    </select>
                  </div>
                </div>
              )}

              {role === 'doctor' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dental Specialty</label>
                    <input
                      type="text"
                      value={regSpecialty}
                      onChange={e => setRegSpecialty(e.target.value)}
                      placeholder="e.g. Endodontist / Oral Surgeon"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dental Council Registration No.</label>
                    <input
                      type="text"
                      value={regRegNo}
                      onChange={e => setRegRegNo(e.target.value)}
                      placeholder="e.g. TN-DC-12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {role === 'admin' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff Role / Designation</label>
                  <input
                    type="text"
                    value={regStaffRole}
                    onChange={e => setRegStaffRole(e.target.value)}
                    placeholder="e.g. Front Office Manager"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Registration & Open Portal</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* FOOTER NAVIGATION & REASSURANCE */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Building className="w-3 h-3 text-slate-400" />
              <span>Sakthi Dental Clinic • ISO 9001:2015</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
