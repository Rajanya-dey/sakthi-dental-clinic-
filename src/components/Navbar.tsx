import React, { useState, useEffect } from 'react';
import { SdcLogo } from './SdcLogo';
import { CLINIC_INFO } from '../data/clinicData';
import { getNotificationLogs, getEstimatedWaitTime, WaitTimeInfo, getActivePatient, getActiveAdmin } from '../utils/storage';
import { getUpcomingAppointmentsWithin24Hours, resetRevisitAlertDismiss, UpcomingReminderInfo } from '../utils/appointmentReminder';
import { LanguageCode, SUPPORTED_LANGUAGES, TranslationDictionary } from '../data/translations';
import { UserRole, UserSession } from '../types';
import {
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  CalendarCheck,
  ShieldAlert,
  BarChart3,
  Bell,
  Timer,
  Bot,
  Sparkles,
  Globe,
  UserCheck,
  Lock,
  Stethoscope,
  LogOut,
  KeyRound,
  ChevronDown,
  User
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onOpenChatbot?: () => void;
  isChatbotEnabled?: boolean;
  onToggleChatbotEnabled?: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  activeSession?: UserSession | null;
  onEnterPortal?: (role: UserRole) => void;
  onLogoutSession?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAppointment,
  onOpenEmergency,
  onOpenChatbot,
  isChatbotEnabled = true,
  onToggleChatbotEnabled,
  currentLang,
  onSelectLang,
  t,
  activeSession = null,
  onEnterPortal,
  onLogoutSession
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const [waitTime, setWaitTime] = useState<WaitTimeInfo>(getEstimatedWaitTime());
  const [activePat, setActivePat] = useState(getActivePatient());
  const [activeAdmin, setActiveAdmin] = useState(getActiveAdmin());
  const [upcomingReminders, setUpcomingReminders] = useState<UpcomingReminderInfo[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUnread = () => {
      const logs = getNotificationLogs();
      setUnreadNotifs(logs.filter(l => !l.read).length);
    };
    const updateWait = () => {
      setWaitTime(getEstimatedWaitTime());
      setUpcomingReminders(getUpcomingAppointmentsWithin24Hours());
    };
    const updatePat = (e: any) => {
      setActivePat(e.detail);
      setUpcomingReminders(getUpcomingAppointmentsWithin24Hours());
    };
    const updateAdmin = (e: any) => {
      setActiveAdmin(e.detail);
    };

    checkUnread();
    updateWait();

    window.addEventListener('sdc_push_notification', checkUnread);
    window.addEventListener('sdc_appointments_updated', updateWait);
    window.addEventListener('sdc_active_patient_changed', updatePat);
    window.addEventListener('sdc_active_admin_changed', updateAdmin);

    return () => {
      window.removeEventListener('sdc_push_notification', checkUnread);
      window.removeEventListener('sdc_appointments_updated', updateWait);
      window.removeEventListener('sdc_active_patient_changed', updatePat);
      window.removeEventListener('sdc_active_admin_changed', updateAdmin);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'treatments', label: t.navTreatments },
    { id: 'courses', label: t.navCourses || 'Doctor Courses' },
    { id: 'gallery', label: t.navSmileGallery },
    { id: 'facilities', label: t.navFacilities },
    { id: 'faqs', label: t.navFaqs },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === 'courses') {
      if (currentPage === 'home') {
        const el = document.getElementById('doctor-courses');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
          return;
        }
      }
      onNavigate('courses');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (pageId === 'gallery') {
      if (currentPage === 'home') {
        const el = document.getElementById('smile-gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('gallery');
      }
      setMobileMenuOpen(false);
      return;
    }
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md border-slate-200'
          : 'bg-white/95 backdrop-blur-md shadow-xs border-slate-100'
      }`}
    >
      {/* Top Utility Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs py-1.5 sm:py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left: Location & Wait Time */}
          <div className="flex items-center gap-2 sm:gap-4 text-blue-100 truncate">
            <span className="flex items-center gap-1 font-medium shrink-0">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400 shrink-0" />
              <span>{t.locationHosur}</span>
            </span>

            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>{t.timingsDaily}</span>
            </span>

            {/* Real-time Estimated Wait Time */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border transition-all shrink-0 ${
                waitTime.status === 'busy'
                  ? 'bg-amber-950/70 text-amber-200 border-amber-400/40'
                  : waitTime.status === 'moderate'
                  ? 'bg-blue-950/70 text-blue-200 border-blue-400/40'
                  : 'bg-emerald-950/70 text-emerald-200 border-emerald-400/40'
              }`}
              title={`Live walk-in wait time calculated from ${waitTime.queueCount} patients in today's active schedule.`}
            >
              <Timer className="w-3 h-3 text-emerald-400 shrink-0 animate-pulse" />
              <span className="hidden sm:inline">{t.waitTimeLabel}:</span>
              <strong className="text-white font-extrabold">{waitTime.displayText}</strong>
            </div>

            <a
              href={`tel:${CLINIC_INFO.primaryPhone}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{CLINIC_INFO.primaryPhone}</span>
            </a>
          </div>

          {/* Right: Upcoming Alert, Portal Pill & Emergency */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Upcoming 24-Hour Session Alert Quick Pill (Desktop/Tablet) */}
            {upcomingReminders.length > 0 && (
              <button
                onClick={() => {
                  resetRevisitAlertDismiss();
                  window.dispatchEvent(new CustomEvent('sdc_revisit_alert_trigger'));
                }}
                className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-xs cursor-pointer animate-pulse"
                title={`Upcoming appointment: ${upcomingReminders[0].appointment.treatmentName} (${upcomingReminders[0].timeDisplay})`}
              >
                <Clock className="w-3 h-3 text-slate-950 shrink-0" />
                <span>Session {upcomingReminders[0].timeDisplay}</span>
              </button>
            )}

            {/* Structured Portals & Authentication Control */}
            {activeSession ? (
              <div className="flex items-center gap-1 bg-white/10 border border-white/20 rounded-full pl-2 pr-1 py-0.5">
                <button
                  type="button"
                  onClick={() => {
                    if (activeSession.role === 'patient') handleNavClick('portal');
                    else if (activeSession.role === 'doctor') handleNavClick('doctor');
                    else handleNavClick('admin');
                  }}
                  className="flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-white hover:text-blue-200 transition-colors cursor-pointer"
                  title={`Signed in as ${activeSession.user.name}`}
                >
                  {activeSession.role === 'patient' && <UserCheck className="w-3 h-3 text-pink-300 shrink-0" />}
                  {activeSession.role === 'doctor' && <Stethoscope className="w-3 h-3 text-cyan-300 shrink-0" />}
                  {activeSession.role === 'admin' && <Lock className="w-3 h-3 text-amber-300 shrink-0" />}
                  <span className="capitalize truncate max-w-[80px] sm:max-w-none">
                    {activeSession.user.name.split(' ')[0]}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogoutSession?.();
                  }}
                  className="px-1.5 py-0.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[9px] sm:text-[10px] font-bold transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onEnterPortal) onEnterPortal('patient');
                  else handleNavClick('login');
                }}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-xs transition-all cursor-pointer border border-blue-400/40 shrink-0"
                title="Enter Patient, Doctor, or Admin Portal with OTP"
              >
                <KeyRound className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                <span>Portal (OTP)</span>
              </button>
            )}

            <button
              onClick={onOpenEmergency}
              className="hidden md:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-transform active:scale-95 shadow-xs cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.navEmergency}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo (Responsive size for phones, tablets, and laptops) */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none text-left cursor-pointer shrink-0"
          >
            <div className="block sm:hidden">
              <SdcLogo size="sm" showTagline={false} />
            </div>
            <div className="hidden sm:block">
              <SdcLogo size="md" showTagline={true} />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Portals Access Link */}
            {activeSession ? (
              <button
                onClick={() => {
                  if (activeSession.role === 'patient') handleNavClick('portal');
                  else if (activeSession.role === 'doctor') handleNavClick('doctor');
                  else handleNavClick('admin');
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all relative cursor-pointer ${
                  (activeSession.role === 'patient' && currentPage === 'portal') ||
                  (activeSession.role === 'doctor' && currentPage === 'doctor') ||
                  (activeSession.role === 'admin' && currentPage === 'admin')
                    ? 'text-blue-700 bg-blue-50 shadow-xs font-black'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {activeSession.role === 'patient' && <UserCheck className="w-4 h-4 text-pink-600" />}
                  {activeSession.role === 'doctor' && <Stethoscope className="w-4 h-4 text-cyan-600" />}
                  {activeSession.role === 'admin' && <Lock className="w-4 h-4 text-indigo-600" />}
                  <span>
                    My {activeSession.role === 'patient' ? 'Patient Portal' : activeSession.role === 'doctor' ? 'Doctor Suite' : 'Admin Portal'}
                  </span>
                </span>
                {((activeSession.role === 'patient' && currentPage === 'portal') ||
                  (activeSession.role === 'doctor' && currentPage === 'doctor') ||
                  (activeSession.role === 'admin' && currentPage === 'admin')) && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (onEnterPortal) onEnterPortal('patient');
                  else handleNavClick('login');
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all relative cursor-pointer ${
                  currentPage === 'login'
                    ? 'text-blue-700 bg-blue-50 shadow-xs font-black'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>Portals & Sign In (OTP)</span>
                </span>
              </button>
            )}
          </nav>

          {/* Desktop CTA Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-all bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>{t.navFixAppointment}</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </button>
          </div>

          {/* Mobile Menu & CTA trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              onClick={onOpenAppointment}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-blue-200" />
              <span>{t.navBook}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-2xl px-4 pt-3 pb-6 space-y-2.5 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Live Mobile Wait Time Display */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-800">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Timer className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Walk-in Wait Time:</span>
            </span>
            <span className="font-extrabold text-emerald-300 flex items-center gap-1">
              <span>{waitTime.displayText}</span>
              <span className="text-[10px] text-slate-400 font-normal">({waitTime.queueCount} queue)</span>
            </span>
          </div>

          {/* Mobile Chatbot Assistant Card & Mobile/Tab Visibility Switch */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-pink-50 border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Oral Health AI Assistant</h4>
                  <p className="text-[10px] text-slate-500">2-min triage quiz & specialist care tips</p>
                </div>
              </div>

              {onToggleChatbotEnabled && (
                <button
                  type="button"
                  onClick={onToggleChatbotEnabled}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                    isChatbotEnabled
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                  title="Toggle floating chatbot button on mobile and tablet view"
                >
                  {isChatbotEnabled ? 'Shown' : 'Hidden'}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChatbot?.();
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-2 rounded-xl text-xs shadow-xs cursor-pointer active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Open AI Dental Assistant 💬</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {activeSession ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {activeSession.role === 'patient' && <UserCheck className="w-5 h-5 text-pink-600" />}
                    {activeSession.role === 'doctor' && <Stethoscope className="w-5 h-5 text-cyan-600" />}
                    {activeSession.role === 'admin' && <Lock className="w-5 h-5 text-indigo-600" />}
                    <div>
                      <p className="text-xs font-black text-slate-900 leading-tight">
                        {activeSession.user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 capitalize">
                        Signed in as {activeSession.role}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogoutSession?.();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (activeSession.role === 'patient') handleNavClick('portal');
                    else if (activeSession.role === 'doctor') handleNavClick('doctor');
                    else handleNavClick('admin');
                  }}
                  className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Open My {activeSession.role.toUpperCase()} Workspace ➔
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                  Access Clinical Portals (OTP)
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onEnterPortal) onEnterPortal('patient');
                      else handleNavClick('login');
                    }}
                    className="p-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-900 text-xs font-bold flex flex-col items-center gap-1"
                  >
                    <UserCheck className="w-4 h-4 text-pink-600" />
                    <span>Patient</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onEnterPortal) onEnterPortal('doctor');
                      else handleNavClick('login');
                    }}
                    className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold flex flex-col items-center gap-1"
                  >
                    <Stethoscope className="w-4 h-4 text-cyan-600" />
                    <span>Doctor</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onEnterPortal) onEnterPortal('admin');
                      else handleNavClick('login');
                    }}
                    className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex flex-col items-center gap-1"
                  >
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 rounded-xl shadow-md mt-1 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.navFixAppointment}</span>
            </button>

            {/* Direct Mobile Emergency Dental Call */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{t.navEmergency} (24/7 Hosur Hotline)</span>
            </button>

            <div className="pt-2 text-center text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Sakthi Dental Clinic • Anthivadi, Hosur</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Appointments & Emergency: {CLINIC_INFO.primaryPhone}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
