import React, { useState } from 'react';
import {
  loginAdmin,
  registerAdmin,
  getActiveAdmin
} from '../utils/storage';
import { CLINIC_INFO } from '../data/clinicData';
import {
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Briefcase,
  Building2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Users
} from 'lucide-react';

interface AdminAuthPageProps {
  onSuccess: () => void;
  onNavigatePatientPortal: () => void;
  onBackToSite: () => void;
}

export const AdminAuthPage: React.FC<AdminAuthPageProps> = ({
  onSuccess,
  onNavigatePatientPortal,
  onBackToSite
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Associate Dentist');
  const [regDepartment, setRegDepartment] = useState('Clinical Dentistry');
  const [regPasscode, setRegPasscode] = useState('');
  const [regSecurityPin, setRegSecurityPin] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginIdentifier.trim() || !loginPasscode.trim()) {
      setErrorMsg('Please enter your staff email/phone and administrative password.');
      return;
    }

    const admin = loginAdmin(loginIdentifier, loginPasscode);
    if (admin) {
      setSuccessMsg(`Authenticated as ${admin.name} (${admin.role}). Redirecting to Admin Dashboard...`);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      setErrorMsg('Invalid staff credentials. Hint: use demo Dr. Anupriya (admin@sakthidentalclinic.in / admin123) or register new staff credentials below.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPasscode.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone, Password).');
      return;
    }

    // Security pass verification for clinic personnel
    const cleanSecurityPin = regSecurityPin.trim().toUpperCase();
    if (cleanSecurityPin && cleanSecurityPin !== 'SDC2004' && cleanSecurityPin !== '2004') {
      setErrorMsg('Invalid Clinic Security Access Code. Clinic verification key is SDC2004.');
      return;
    }

    try {
      const newAdmin = registerAdmin({
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim(),
        role: regRole,
        department: regDepartment,
        passcode: regPasscode.trim()
      });

      setSuccessMsg(`Welcome aboard, ${newAdmin.name}! Staff account ${newAdmin.employeeId} registered. Redirecting to Admin Dashboard...`);
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to register administrative account.');
    }
  };

  const handleQuickDemo = (demoType: 'director' | 'reception') => {
    setErrorMsg('');
    if (demoType === 'director') {
      setLoginIdentifier('admin@sakthidentalclinic.in');
      setLoginPasscode('admin123');
      const admin = loginAdmin('admin@sakthidentalclinic.in', 'admin123');
      if (admin) {
        setSuccessMsg('Authenticated as Dr. Anupriya (Founder & Chief Dental Surgeon). Loading dashboard...');
        setTimeout(() => onSuccess(), 400);
      }
    } else {
      setLoginIdentifier('desk@sakthidentalclinic.in');
      setLoginPasscode('staff123');
      const admin = loginAdmin('desk@sakthidentalclinic.in', 'staff123');
      if (admin) {
        setSuccessMsg('Authenticated as Kavitha R (Front Desk & Patient Coordinator). Loading dashboard...');
        setTimeout(() => onSuccess(), 400);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Nav Buttons */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clinic Website</span>
        </button>

        <button
          onClick={onNavigatePatientPortal}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-300 hover:text-pink-200 transition-colors cursor-pointer bg-pink-950/40 hover:bg-pink-900/50 px-3 py-1.5 rounded-xl border border-pink-700/40"
        >
          <span>Patient Health Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="w-full max-w-xl z-10">
        {/* Main Card */}
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border-b border-slate-700/80 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-[11px] font-bold tracking-wide uppercase mb-2">
              <Lock className="w-3 h-3 text-blue-400" />
              <span>Authorized Clinic Personnel Only</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Administrative & Staff Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Secure operational gate for doctors, clinic management, appointment scheduling, and patient records at {CLINIC_INFO.name}.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-700 bg-slate-850/60">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                mode === 'login'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/90'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Staff Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                mode === 'register'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/90'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Register New Staff / Admin
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Login Bar */}
            <div className="p-4 rounded-2xl bg-slate-750/70 border border-slate-650 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>One-Click Testing Access</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Demo Accounts</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('director')}
                  className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-100 border border-blue-500/40 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold">Dr. Anupriya (Chief Admin)</span>
                  <span className="text-[10px] bg-blue-500/40 px-1.5 py-0.5 rounded text-white">Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('reception')}
                  className="px-3 py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold">Kavitha (Front Desk)</span>
                  <span className="text-[10px] bg-slate-600 px-1.5 py-0.5 rounded text-white">Login</span>
                </button>
              </div>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Staff Email, Mobile or Employee ID *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={e => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. admin@sakthidentalclinic.in or 9862890897"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Staff Password / Passcode *
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Default: <code className="text-blue-400">admin123</code>
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPasscode}
                      onChange={e => setLoginPasscode(e.target.value)}
                      placeholder="Enter administrator password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-101 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Enter Admin Dashboard</span>
                </button>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Full Name & Title *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="e.g. Dr. Sneha N or Rajesh Kumar"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Official Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="doctor@sakthidentalclinic.in"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Staff Role / Designation *
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={regRole}
                        onChange={e => setRegRole(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                      >
                        <option value="Chief Dental Surgeon">Chief Dental Surgeon</option>
                        <option value="Associate Dentist">Associate Dentist</option>
                        <option value="Orthodontist">Orthodontist</option>
                        <option value="Prosthodontist">Prosthodontist</option>
                        <option value="Clinic Administrator">Clinic Administrator</option>
                        <option value="Front Desk & Patient Coordinator">Front Desk & Billing</option>
                        <option value="Dental Assistant">Dental Assistant</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Department / Wing
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={regDepartment}
                        onChange={e => setRegDepartment(e.target.value)}
                        placeholder="e.g. Orthodontics Operatory"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPasscode}
                      onChange={e => setRegPasscode(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Clinic Security Code (SDC2004)
                    </label>
                    <input
                      type="text"
                      value={regSecurityPin}
                      onChange={e => setRegSecurityPin(e.target.value)}
                      placeholder="Default: SDC2004"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-101 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Register Staff Member & Open Dashboard</span>
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-850 border-t border-slate-700/80 text-center">
            <p className="text-[11px] text-slate-400">
              Need access assistance? Contact clinic founder Dr. Anupriya or system coordinator at{' '}
              <a href={`tel:${CLINIC_INFO.primaryPhone}`} className="text-blue-400 font-semibold underline">
                {CLINIC_INFO.primaryPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
