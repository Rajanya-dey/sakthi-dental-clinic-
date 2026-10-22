import React, { useState, useEffect } from 'react';
import {
  UpcomingReminderInfo,
  getUpcomingAppointmentsWithin24Hours,
  isRevisitAlertDismissed,
  dismissRevisitAlert,
  triggerLocalAppointmentNotification,
  generateGoogleCalendarUrl,
  createTestUpcoming24hAppointment
} from '../utils/appointmentReminder';
import { CLINIC_INFO } from '../data/clinicData';
import {
  Bell,
  Clock,
  Calendar,
  User,
  MapPin,
  ChevronRight,
  X,
  ExternalLink,
  Phone,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface UpcomingAppointmentAlertProps {
  onNavigateToPortal: () => void;
}

export const UpcomingAppointmentAlert: React.FC<UpcomingAppointmentAlertProps> = ({
  onNavigateToPortal
}) => {
  const [reminders, setReminders] = useState<UpcomingReminderInfo[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'sent' | 'unsupported'>('idle');

  // Check for upcoming appointments within 24 hours on mount and whenever appointments change
  const refreshReminders = () => {
    const upcoming = getUpcomingAppointmentsWithin24Hours();
    setReminders(upcoming);
    setIsDismissed(isRevisitAlertDismissed());

    // If there is an upcoming appointment within 24 hours and notification permission is granted, trigger local notification
    if (upcoming.length > 0 && !isRevisitAlertDismissed()) {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        triggerLocalAppointmentNotification(upcoming[0]);
      }
    }
  };

  useEffect(() => {
    refreshReminders();

    const handleUpdate = () => refreshReminders();
    window.addEventListener('sdc_appointments_updated', handleUpdate);
    window.addEventListener('sdc_active_patient_changed', handleUpdate);
    window.addEventListener('sdc_revisit_alert_trigger', handleUpdate);

    // Periodic check every 60 seconds
    const interval = setInterval(refreshReminders, 60000);

    return () => {
      window.removeEventListener('sdc_appointments_updated', handleUpdate);
      window.removeEventListener('sdc_active_patient_changed', handleUpdate);
      window.removeEventListener('sdc_revisit_alert_trigger', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  if (reminders.length === 0 || isDismissed) {
    return null;
  }

  const activeReminder = reminders[0];
  const apt = activeReminder.appointment;

  const handleDismiss = () => {
    dismissRevisitAlert(4); // Dismiss for 4 hours
    setIsDismissed(true);
  };

  const handleEnableNotification = async () => {
    const sent = await triggerLocalAppointmentNotification(activeReminder);
    if (sent) {
      setNotificationStatus('sent');
      setTimeout(() => setNotificationStatus('idle'), 4000);
    } else {
      setNotificationStatus('unsupported');
      setTimeout(() => setNotificationStatus('idle'), 4000);
    }
  };

  const googleCalUrl = generateGoogleCalendarUrl(apt);

  return (
    <aside
      aria-label="Upcoming appointment reminder alert"
      className="relative z-30 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-lg transition-all animate-in slide-in-from-top-3 duration-300"
    >
      <div className="bg-slate-900 text-white px-4 py-3 sm:px-6">
        {isCollapsed ? (
          /* Collapsed Bar Mode */
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="font-bold text-amber-300">
                Upcoming Appointment ({activeReminder.timeDisplay}):
              </span>
              <span className="text-slate-200 hidden sm:inline">
                {apt.treatmentName} with {apt.doctorName} at {apt.timeSlot}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCollapsed(false)}
                className="text-xs text-white hover:text-amber-300 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Details</span>
                <Maximize2 className="w-3 h-3" />
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Full Rich Banner Mode */
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Column: Urgency & Appointment Info */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 shrink-0 mt-0.5">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      <Sparkles className="w-3 h-3" />
                      <span>Upcoming Session in {activeReminder.timeDisplay}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref #{apt.id}
                    </span>
                    {activeReminder.isToday && (
                      <span className="bg-rose-500/30 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-400/40">
                        Today
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                    <span>{apt.treatmentName}</span>
                    <span className="text-slate-400 font-normal text-xs sm:text-sm">
                      for {apt.patientName}
                    </span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
                      <User className="w-3.5 h-3.5 text-pink-400" />
                      <span>{apt.doctorName}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{apt.date} at {apt.timeSlot}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sakthi Dental Clinic (Opp. RV Boys School, Hosur)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Interactive Actions */}
              <div className="flex flex-wrap items-center gap-2.5 lg:self-center">
                <button
                  onClick={onNavigateToPortal}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View in Patient Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Add appointment to Google Calendar"
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-300" />
                  <span>Add to Calendar</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <button
                  onClick={handleEnableNotification}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Test or enable native browser push alert"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {notificationStatus === 'sent'
                      ? 'Alert Triggered! ✓'
                      : notificationStatus === 'unsupported'
                      ? 'Permission Required'
                      : 'Notify Me'}
                  </span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold transition-all items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Clinic</span>
                </a>

                {/* Control buttons */}
                <div className="flex items-center gap-1 ml-auto lg:ml-2 border-l border-slate-700 pl-2">
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Minimize reminder bar"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Dismiss reminder"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {notificationStatus === 'sent' && (
              <div className="mt-2 text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Browser reminder sent! You will be reminded on this device before your session starts.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
