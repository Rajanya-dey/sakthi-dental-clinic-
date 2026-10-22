import React, { useState, useEffect, useRef } from 'react';
import {
  UserRole,
  UserSession,
  PatientAccount,
  DoctorAccount,
  AdminAccount
} from '../types';
import {
  requestOtp,
  verifyOtpAndLogin,
  registerUserWithOtp,
  getActiveSession,
  logoutActiveSession
} from '../utils/storage';
import { SdcLogo } from './SdcLogo';
import { CLINIC_INFO } from '../data/clinicData';
import {
  UserCheck,
  Stethoscope,
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Building2,
  HeartPulse,
  KeyRound,
  Eye,
  ChevronRight,
  X
} from 'lucide-react';

interface PortalAuthGatewayProps {
  initialRole?: UserRole;
  onSuccess: (session: UserSession) => void;
  onClose?: () => void;
  restrictedAttempt?: {
    currentRole: UserRole;
    currentName: string;
    targetRole: UserRole;
  };
}

export const PortalAuthGateway: React.FC<PortalAuthGatewayProps> = ({
  initialRole,
  onSuccess,
  onClose,
  restrictedAttempt
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole || null);
  const [step, setStep] = useState<'select-role' | 'enter-contact' | 'enter-otp' | 'register'>('select-role');

  // Contact input states
  const [identifier, setIdentifier] = useState('');
  const [sentOtp, setSentOtp] = useState<string | null>(null);
  const [otpInputs, setOtpInputs] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otpDeliveredBanner, setOtpDeliveredBanner] = useState<{ otp: string; identifier: string } | null>(null);

  // Status & error messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Registration fields
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState<number>(28);
  const [regGender, setRegGender] = useState('Female');
  const [regBloodGroup, setRegBloodGroup] = useState('O +ve');
  const [regAllergies, setRegAllergies] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('General Dentistry & Oral Health');
  const [regLicenseNo, setRegLicenseNo] = useState('');
  const [regStaffRole, setRegStaffRole] = useState('Clinic Administrator');
  const [regClinicCode, setRegClinicCode] = useState('SDC2004');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
      setStep('enter-contact');
    }
  }, [initialRole]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (isTimerActive && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, otpTimer]);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    setSuccessMessage('');
    setIdentifier('');
    setSentOtp(null);
    setOtpInputs(['', '', '', '', '', '']);
    setStep('enter-contact');
  };

  const handleQuickPreset = (role: UserRole, presetId: string) => {
    setSelectedRole(role);
    setIdentifier(presetId);
    setErrorMessage('');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedRole) {
      setErrorMessage('Please select a portal role first.');
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered mobile number or email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = requestOtp(identifier, selectedRole);
      setSentOtp(res.otp);
      setOtpDeliveredBanner({ otp: res.otp, identifier: identifier.trim() });
      setOtpTimer(60);
      setIsTimerActive(true);
      setStep('enter-otp');
      setSuccessMessage(
        res.isRegistered
          ? `Welcome back ${res.accountName || ''}! Security OTP sent.`
          : 'OTP verification code sent! First-time users will complete quick profile setup.'
      );
    }, 400);
  };

  const handleOtpInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const nextInputs = [...otpInputs];
    nextInputs[index] = value.slice(-1);
    setOtpInputs(nextInputs);

    // Auto-focus next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    if (sentOtp && sentOtp.length === 6) {
      setOtpInputs(sentOtp.split(''));
    } else {
      setOtpInputs(['4', '8', '2', '9', '1', '0']);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const fullOtp = otpInputs.join('');
    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    if (!selectedRole) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const result = verifyOtpAndLogin(identifier, fullOtp, selectedRole);

      if (result.success && result.session) {
        setSuccessMessage(`Authenticated successfully as ${result.session.user.name}. Redirecting...`);
        setTimeout(() => {
          onSuccess(result.session!);
        }, 500);
      } else if (result.isNewUser) {
        // Direct to registration step
        setStep('register');
        setSuccessMessage('Contact verified! Please complete your account profile details.');
      } else {
        setErrorMessage(result.error || 'Invalid OTP. Please check the code and try again.');
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedRole) return;
    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // Role-specific check
    if (selectedRole === 'admin') {
      const code = regClinicCode.trim().toUpperCase();
      if (code !== 'SDC2004' && code !== '2004') {
        setErrorMessage('Invalid Clinic Security Access Code. Official code is SDC2004.');
        return;
      }
    }

    try {
      const session = registerUserWithOtp(selectedRole, {
        name: regName,
        identifier: identifier.trim(),
        age: regAge,
        gender: regGender,
        bloodGroup: regBloodGroup,
        allergies: regAllergies ? regAllergies.split(',').map(s => s.trim()) : ['None reported'],
        specialty: regSpecialty,
        registrationNo: regLicenseNo,
        staffRole: regStaffRole,
        clinicCode: regClinicCode
      });

      setSuccessMessage(`Account registered for ${session.user.name}! Logging you in...`);
      setTimeout(() => {
        onSuccess(session);
      }, 500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to register account.');
    }
  };

  const handleResendOtp = () => {
    if (!selectedRole || isTimerActive) return;
    const res = requestOtp(identifier, selectedRole);
    setSentOtp(res.otp);
    setOtpDeliveredBanner({ otp: res.otp, identifier: identifier.trim() });
    setOtpTimer(60);
    setIsTimerActive(true);
    setSuccessMessage(`New OTP code sent to ${identifier}`);
  };

  const handleForceSignOutAndReLogin = () => {
    logoutActiveSession();
    setSelectedRole(restrictedAttempt?.targetRole || null);
    setStep('enter-contact');
    setErrorMessage('');
    setSuccessMessage('Previous session ended. Please verify via OTP to enter.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Close / Return to Site Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Return to Public Site"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* RESTRICTED ATTEMPT BARRIER BANNER */}
        {restrictedAttempt && (
          <div className="bg-amber-500 text-slate-950 px-6 py-3.5 flex items-start gap-3 border-b border-amber-600">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <strong className="block font-extrabold uppercase tracking-wider">
                Cross-Portal Security Restriction Active
              </strong>
              <span>
                You are currently signed in as{' '}
                <strong className="underline">
                  {restrictedAttempt.currentRole.toUpperCase()}: {restrictedAttempt.currentName}
                </strong>
                . Direct switching to the{' '}
                <strong className="uppercase">{restrictedAttempt.targetRole} Portal</strong> is not permitted without re-authenticating with verified {restrictedAttempt.targetRole} credentials via OTP.
              </span>
            </div>
            <button
              onClick={handleForceSignOutAndReLogin}
              className="shrink-0 px-3 py-1.5 bg-slate-950 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Sign Out & Verify with OTP
            </button>
          </div>
        )}

        {/* TOP BRANDING HEADER */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 -right-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-pink-300 uppercase tracking-wider mb-2 border border-white/15">
            Sakthi Dental Clinic • Hosur Since 2004
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Unified Clinical & Patient Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
            Structured, OTP-verified portal entrance for Patients, Doctors, and Clinic Administrative Staff.
          </p>

          {/* Stepper indicator if in sub-step */}
          {step !== 'select-role' && selectedRole && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep('select-role');
                  setSelectedRole(null);
                  setErrorMessage('');
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-200 hover:text-white underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Switch Role</span>
              </button>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Role: {selectedRole}
              </span>
            </div>
          )}
        </div>

        {/* SIMULATED OTP DISPATCH ALERT BANNER */}
        {otpDeliveredBanner && step === 'enter-otp' && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Simulated SMS/Email delivered to <strong>{otpDeliveredBanner.identifier}</strong>:{' '}
                <span className="font-mono font-extrabold text-sm text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                  {otpDeliveredBanner.otp}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleAutoFillOtp}
              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] cursor-pointer shadow-xs"
            >
              ⚡ Instant Auto-Fill
            </button>
          </div>
        )}

        {/* FEEDBACK MESSAGES */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mt-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 sm:mx-8 mt-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 1: STRUCTURED ROLE SELECTION */}
        {/* ===================================================================== */}
        {step === 'select-role' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Please Select Your Portal Role
              </h3>
              <p className="text-xs text-slate-500">
                You will verify with your mobile number or email using a secure one-time passcode (OTP).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Patient Role Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('patient')}
                className="group p-5 rounded-3xl border-2 border-slate-200 hover:border-pink-500 hover:shadow-xl transition-all duration-200 text-left bg-gradient-to-b from-white to-pink-50/30 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 group-hover:bg-pink-600 text-pink-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600">
                      Family & Individual
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-pink-600 transition-colors">
                      Patient Portal
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      View past medical history, upcoming visits, download digital prescriptions, & rate care.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
                  <span>Sign In with OTP</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Doctor Role Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('doctor')}
                className="group p-5 rounded-3xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-200 text-left bg-gradient-to-b from-white to-blue-50/30 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                      Doctor OPD Console
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Doctor Portal
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Consultation queue, write digital prescriptions (Rx), view clinical history & manage slots.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Doctor OTP Login</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Admin Role Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className="group p-5 rounded-3xl border-2 border-slate-200 hover:border-slate-800 hover:shadow-xl transition-all duration-200 text-left bg-gradient-to-b from-white to-slate-100/50 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 group-hover:bg-slate-900 text-slate-800 group-hover:text-white flex items-center justify-center transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                      Clinic Leadership
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors">
                      Admin & Staff Gate
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Walk-in wait time calculator, appointment status, analytics, automated email reporting.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Staff OTP Login</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Quick Demo Test Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>One-Click Preset Testing Accounts</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPreset('patient', 'priya.sundaram@gmail.com')}
                  className="px-3 py-2 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 text-left text-xs transition-colors cursor-pointer"
                >
                  <p className="font-bold text-pink-700">Priya (Patient)</p>
                  <p className="text-[11px] text-slate-500 font-mono">9845122340</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('doctor', 'sneha.ortho@sakthidentalclinic.in')}
                  className="px-3 py-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-left text-xs transition-colors cursor-pointer"
                >
                  <p className="font-bold text-blue-700">Dr. Sneha (Doctor)</p>
                  <p className="text-[11px] text-slate-500 font-mono">9845100005</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('admin', 'admin@sakthidentalclinic.in')}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-left text-xs transition-colors cursor-pointer"
                >
                  <p className="font-bold text-slate-800">Dr. Anupriya (Admin)</p>
                  <p className="text-[11px] text-slate-500 font-mono">9862890897</p>
                </button>
              </div>
            </div>

            {/* Guest Browsing Link */}
            {onClose && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Or continue browsing clinic website as guest (Treatments & Doctor Directory) →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 2: ENTER MOBILE NUMBER OR EMAIL */}
        {/* ===================================================================== */}
        {step === 'enter-contact' && selectedRole && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Step 1 of 2: Identity Verification
              </span>
              <h3 className="text-xl font-bold text-slate-900 pt-1">
                Enter Mobile Number or Email for {selectedRole.toUpperCase()} Portal
              </h3>
              <p className="text-xs text-slate-500">
                We'll deliver a 6-digit one-time passcode (OTP) for authentication.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number or Email Address *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="e.g. 9845122340 or doctor@sakthidentalclinic.in"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons for Selected Role */}
              <div className="space-y-1 text-xs">
                <span className="text-[11px] text-slate-400">Quick Test Autofill:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedRole === 'patient' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIdentifier('9845122340')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Priya (9845122340)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdentifier('karthik.raja@outlook.com')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Karthik (karthik.raja@outlook.com)
                      </button>
                    </>
                  )}
                  {selectedRole === 'doctor' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIdentifier('sneha.ortho@sakthidentalclinic.in')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Dr. Sneha N (Orthodontist)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdentifier('anupriya@sakthidentalclinic.in')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Dr. Anupriya (Founder)
                      </button>
                    </>
                  )}
                  {selectedRole === 'admin' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIdentifier('admin@sakthidentalclinic.in')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Dr. Anupriya (Admin)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdentifier('desk@sakthidentalclinic.in')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        Kavitha R (Reception)
                      </button>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 3: ENTER 6-DIGIT OTP */}
        {/* ===================================================================== */}
        {step === 'enter-otp' && selectedRole && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Step 2 of 2: OTP Verification
              </span>
              <h3 className="text-xl font-bold text-slate-900 pt-1">
                Enter 6-Digit One-Time Code
              </h3>
              <p className="text-xs text-slate-500">
                Sent to <strong className="text-slate-800">{identifier}</strong> for{' '}
                <span className="uppercase font-bold text-blue-600">{selectedRole}</span> access.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5 max-w-sm mx-auto">
              {/* 6 Digit Box Inputs */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                {otpInputs.map((val, idx) => (
                  <input
                    key={idx}
                    ref={el => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={e => handleOtpInputChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-extrabold rounded-2xl border-2 border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-xs"
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {isTimerActive ? `Resend in ${otpTimer}s` : 'Code expired'}
                </span>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isTimerActive}
                  className={`font-bold transition-colors cursor-pointer ${
                    isTimerActive
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-800 underline'
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all hover:scale-101 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Verify OTP & Enter {selectedRole.toUpperCase()} Portal</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('enter-contact')}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors cursor-pointer"
                >
                  Change Phone / Email ({identifier})
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 4: FIRST-TIME REGISTRATION PROFILE SETUP */}
        {/* ===================================================================== */}
        {step === 'register' && selectedRole && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Contact Verified: {identifier}
              </span>
              <h3 className="text-xl font-bold text-slate-900 pt-1">
                Complete Your {selectedRole === 'patient' ? 'Patient Dental Profile' : selectedRole === 'doctor' ? 'Doctor Clinical Credentials' : 'Staff Admin Access'}
              </h3>
              <p className="text-xs text-slate-500">
                Fill in your basic details to create your secure clinical record.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name & Title *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder={selectedRole === 'doctor' ? 'e.g. Dr. Sneha N' : 'e.g. Rajesh Kumar'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PATIENT DEMOGRAPHICS */}
              {selectedRole === 'patient' && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={regAge}
                        onChange={e => setRegAge(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                      <select
                        value={regGender}
                        onChange={e => setRegGender(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs bg-white"
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
                        className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs bg-white"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Drug Allergies / Medical Notes
                    </label>
                    <input
                      type="text"
                      value={regAllergies}
                      onChange={e => setRegAllergies(e.target.value)}
                      placeholder="e.g. Penicillin, NSAIDs, or 'None'"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </>
              )}

              {/* DOCTOR FIELDS */}
              {selectedRole === 'doctor' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Specialty / Department *
                    </label>
                    <select
                      value={regSpecialty}
                      onChange={e => setRegSpecialty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="Orthodontics & Dentofacial Orthopedics">Orthodontics (Braces & Aligners)</option>
                      <option value="General Dentistry & Comprehensive Smile Restoration">General Dentistry</option>
                      <option value="Prosthodontics & Full Mouth Rehabilitation">Prosthodontics (Dentures & Implants)</option>
                      <option value="Conservative Dentistry & Endodontics">Endodontics (Root Canal)</option>
                      <option value="Oral & Maxillofacial Surgery">Oral Surgery & Extractions</option>
                      <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State Dental Council Registration No.
                    </label>
                    <input
                      type="text"
                      value={regLicenseNo}
                      onChange={e => setRegLicenseNo(e.target.value)}
                      placeholder="e.g. TN-DC-34819"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                    />
                  </div>
                </>
              )}

              {/* ADMIN FIELDS */}
              {selectedRole === 'admin' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Staff Role / Designation *
                    </label>
                    <select
                      value={regStaffRole}
                      onChange={e => setRegStaffRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="Clinic Administrator">Clinic Administrator</option>
                      <option value="Front Desk & Patient Coordinator">Front Desk & Patient Coordinator</option>
                      <option value="Chief Dental Surgeon">Chief Dental Surgeon</option>
                      <option value="Clinical Operations Manager">Clinical Operations Manager</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinic Security Authorization Key (SDC2004) *
                    </label>
                    <input
                      type="text"
                      required
                      value={regClinicCode}
                      onChange={e => setRegClinicCode(e.target.value)}
                      placeholder="Enter SDC2004"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Hint: Default clinic authorization code is SDC2004</p>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer"
              >
                Complete Registration & Open {selectedRole.toUpperCase()} Portal
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
