/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { DoctorPortalPage } from './pages/DoctorPortalPage';
import { PatientPortalPage } from './pages/PatientPortalPage';
import { DoctorCoursesPage } from './pages/DoctorCoursesPage';
import { UnifiedLoginGate } from './pages/UnifiedLoginGate';
import { RoleSwitchModal } from './components/RoleSwitchModal';
import { FacilitiesSection } from './components/FacilitiesSection';
import { SmileGallerySection } from './components/SmileGallerySection';
import { AppointmentModal } from './components/AppointmentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { OralHealthChatbotAgent } from './components/OralHealthChatbotAgent';
import { NotificationToast } from './components/NotificationToast';
import { UpcomingAppointmentAlert } from './components/UpcomingAppointmentAlert';
import {
  trackEvent,
  getActiveSession,
  setActiveSession as persistActiveSession,
  logoutActiveSession
} from './utils/storage';
import { UserSession, UserRole, DoctorAccount } from './types';
import { LanguageCode, translations } from './data/translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeSession, setActiveSession] = useState<UserSession | null>(() => getActiveSession());
  const [loginGateInitialRole, setLoginGateInitialRole] = useState<UserRole>('patient');
  const [roleSwitchModal, setRoleSwitchModal] = useState<{
    isOpen: boolean;
    targetRole: UserRole;
  }>({
    isOpen: false,
    targetRole: 'patient'
  });

  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const isChatbotEnabled = true;
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();

  const t = translations[currentLang] || translations.en;

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('sdc_lang', lang);
    } catch {
      // Storage unavailable in restricted iframe
    }
  };

  useEffect(() => {
    try {
      localStorage.removeItem('sdc_chatbot_enabled');
      localStorage.removeItem('sdc_lang');
    } catch {
      // Storage unavailable in restricted iframe
    }
    trackEvent('page_view', currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleSessionUpdate = (e: any) => {
      setActiveSession(e.detail);
    };
    window.addEventListener('sdc_session_changed', handleSessionUpdate);
    return () => {
      window.removeEventListener('sdc_session_changed', handleSessionUpdate);
    };
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    // If navigating to portals directly from a link, enforce role checking
    if (page === 'portal') {
      handleEnterPortal('patient');
      return;
    }
    if (page === 'doctor') {
      handleEnterPortal('doctor');
      return;
    }
    if (page === 'admin' || page === 'admin-auth') {
      handleEnterPortal('admin');
      return;
    }
    setCurrentPage(page);
  };

  // Dedicated portal entry & strict role isolation enforcement
  const handleEnterPortal = (targetRole: UserRole) => {
    if (activeSession) {
      if (activeSession.role === targetRole) {
        // Already authenticated as this exact role -> navigate directly
        setCurrentPage(targetRole === 'patient' ? 'portal' : targetRole === 'doctor' ? 'doctor' : 'admin');
      } else {
        // Authenticated as a different role -> STRICTLY intercept and require sign out + OTP re-login
        setRoleSwitchModal({
          isOpen: true,
          targetRole
        });
      }
    } else {
      // Not logged in -> open unified 1st login page for this role
      setLoginGateInitialRole(targetRole);
      setCurrentPage('login');
    }
  };

  const handleConfirmRoleSwitch = (targetRole: UserRole) => {
    logoutActiveSession();
    setActiveSession(null);
    setRoleSwitchModal({ isOpen: false, targetRole: 'patient' });
    setLoginGateInitialRole(targetRole);
    setCurrentPage('login');
  };

  const handleLoginSuccess = (newSession: UserSession) => {
    persistActiveSession(newSession);
    setActiveSession(newSession);
    if (newSession.role === 'patient') {
      setCurrentPage('portal');
    } else if (newSession.role === 'doctor') {
      setCurrentPage('doctor');
    } else {
      setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
    logoutActiveSession();
    setActiveSession(null);
    setCurrentPage('home');
  };

  const handleOpenAppointmentWithTreatment = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setSelectedDoctorId(undefined);
    setIsAppointmentModalOpen(true);
  };

  const handleOpenAppointmentWithDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setIsAppointmentModalOpen(true);
  };

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleDismissChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleToggleChatbotEnabled = () => {
    setIsChatbotOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Real-Time Push Notification Toast Receiver */}
      <NotificationToast />

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAppointment={() => {
          setSelectedTreatmentId(undefined);
          setSelectedDoctorId(undefined);
          setIsAppointmentModalOpen(true);
        }}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenChatbot={handleOpenChatbot}
        isChatbotEnabled={isChatbotEnabled}
        onToggleChatbotEnabled={handleToggleChatbotEnabled}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        t={t}
        activeSession={activeSession}
        onEnterPortal={handleEnterPortal}
        onLogoutSession={handleLogout}
      />

      {/* 24-Hour Upcoming Appointment Revisit Alert Banner */}
      <UpcomingAppointmentAlert onNavigateToPortal={() => handleEnterPortal('patient')} />

      {/* Strict Role Switching Guard Modal */}
      <RoleSwitchModal
        isOpen={roleSwitchModal.isOpen}
        onClose={() => setRoleSwitchModal(prev => ({ ...prev, isOpen: false }))}
        currentSession={activeSession}
        targetRole={roleSwitchModal.targetRole}
        onConfirmSwitch={handleConfirmRoleSwitch}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            onNavigate={handleNavigate}
            onSelectTreatment={handleOpenAppointmentWithTreatment}
            onSelectDoctor={handleOpenAppointmentWithDoctor}
            activeSession={activeSession}
            onEnterPortal={handleEnterPortal}
          />
        )}

        {/* UNIFIED 1ST LOGIN GATEWAY: Single entrance with OTP for Patient, Doctor & Admin */}
        {currentPage === 'login' && (
          <UnifiedLoginGate
            initialRole={loginGateInitialRole}
            onSuccess={handleLoginSuccess}
            onNavigateHome={() => setCurrentPage('home')}
          />
        )}

        {/* PATIENT PORTAL */}
        {currentPage === 'portal' && (
          activeSession?.role === 'patient' ? (
            <PatientPortalPage
              t={t}
              onOpenBooking={(treatmentId) => {
                if (treatmentId) {
                  handleOpenAppointmentWithTreatment(treatmentId);
                } else {
                  setSelectedTreatmentId(undefined);
                  setSelectedDoctorId(undefined);
                  setIsAppointmentModalOpen(true);
                }
              }}
              onNavigateHome={() => setCurrentPage('home')}
              onNavigateAdmin={() => handleEnterPortal('admin')}
              onNavigateDoctor={() => handleEnterPortal('doctor')}
              onRequestRoleSwitch={(target) => handleEnterPortal(target)}
            />
          ) : (
            <UnifiedLoginGate
              initialRole="patient"
              onSuccess={handleLoginSuccess}
              onNavigateHome={() => setCurrentPage('home')}
            />
          )
        )}

        {/* DOCTOR CLINICAL PORTAL */}
        {currentPage === 'doctor' && (
          activeSession?.role === 'doctor' ? (
            <DoctorPortalPage
              doctor={activeSession.user as DoctorAccount}
              onLogout={handleLogout}
              onNavigateHome={() => setCurrentPage('home')}
            />
          ) : (
            <UnifiedLoginGate
              initialRole="doctor"
              onSuccess={handleLoginSuccess}
              onNavigateHome={() => setCurrentPage('home')}
            />
          )
        )}

        {/* ADMIN MANAGEMENT PORTAL */}
        {(currentPage === 'admin' || currentPage === 'admin-auth') && (
          activeSession?.role === 'admin' ? (
            <AdminDashboard
              onBackToSite={() => setCurrentPage('home')}
              onLogout={handleLogout}
            />
          ) : (
            <UnifiedLoginGate
              initialRole="admin"
              onSuccess={handleLoginSuccess}
              onNavigateHome={() => setCurrentPage('home')}
            />
          )
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
            onSelectDoctor={handleOpenAppointmentWithDoctor}
          />
        )}

        {currentPage === 'treatments' && (
          <TreatmentsPage
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
            onSelectTreatment={handleOpenAppointmentWithTreatment}
          />
        )}

        {currentPage === 'gallery' && (
          <div className="pt-4 pb-12">
            <SmileGallerySection
              onBookTreatment={handleOpenAppointmentWithTreatment}
              onExploreTreatments={() => setCurrentPage('treatments')}
            />
          </div>
        )}

        {currentPage === 'facilities' && (
          <div className="py-8">
            <FacilitiesSection />
          </div>
        )}

        {currentPage === 'courses' && (
          <DoctorCoursesPage
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
            onSelectDoctor={handleOpenAppointmentWithDoctor}
            onNavigateHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqPage
            onNavigateContact={() => handleNavigate('contact')}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {currentPage === 'contact' && <ContactUsPage />}

        {currentPage === 'privacy' && <PrivacyPolicyPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointment={() => {
          setSelectedTreatmentId(undefined);
          setSelectedDoctorId(undefined);
          setIsAppointmentModalOpen(true);
        }}
      />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        preselectedTreatmentId={selectedTreatmentId}
        preselectedDoctorId={selectedDoctorId}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Oral Health AI Chatbot Agent */}
      <OralHealthChatbotAgent
        isOpen={isChatbotOpen}
        isEnabled={isChatbotEnabled}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onDismiss={handleDismissChatbot}
        t={t}
        lang={currentLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedTreatmentId={selectedTreatmentId}
        onOpenBooking={(treatmentId, doctorId) => {
          setSelectedTreatmentId(treatmentId);
          setSelectedDoctorId(doctorId);
          setIsAppointmentModalOpen(true);
        }}
      />
    </div>
  );
}
