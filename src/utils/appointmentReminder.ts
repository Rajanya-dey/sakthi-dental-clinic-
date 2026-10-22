import { Appointment } from '../types';
import { getStoredAppointments, getActivePatient, saveAppointment } from './storage';

export interface UpcomingReminderInfo {
  appointment: Appointment;
  scheduledTime: Date;
  diffMs: number;
  hoursRemaining: number;
  minutesRemaining: number;
  isToday: boolean;
  timeDisplay: string;
}

const REVISIT_ALERT_STORAGE_KEY = 'sdc_revisit_alert_dismissed_until';

/**
 * Parses appointment date ("YYYY-MM-DD") and timeSlot ("10:30 AM", "04:00 PM") into a Date object.
 */
export function parseAppointmentDateTime(dateStr: string, timeSlotStr: string): Date {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  let hours = 10;
  let minutes = 0;

  if (timeSlotStr) {
    const match = timeSlotStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const meridiem = (match[3] || '').toUpperCase();

      if (meridiem === 'PM' && h < 12) {
        h += 12;
      } else if (meridiem === 'AM' && h === 12) {
        h = 0;
      }
      hours = h;
      minutes = m;
    }
  }

  return new Date(year, month, day, hours, minutes, 0, 0);
}

/**
 * Finds any active upcoming appointments scheduled within the next 24 hours.
 * Also considers sessions scheduled today or starting soon.
 */
export function getUpcomingAppointmentsWithin24Hours(refDate: Date = new Date()): UpcomingReminderInfo[] {
  const all = getStoredAppointments();
  const activePat = getActivePatient();

  const activeAppointments = all.filter(apt => {
    if (apt.status === 'Cancelled' || apt.status === 'Completed') return false;
    if (activePat) {
      // If a patient is logged in, prioritize their appointments
      const cleanPhone = activePat.phone.replace(/\D/g, '').slice(-10);
      const aptPhone = (apt.phone || '').replace(/\D/g, '').slice(-10);
      const emailMatch = apt.email && activePat.email && apt.email.toLowerCase() === activePat.email.toLowerCase();
      const nameMatch = apt.patientName && apt.patientName.toLowerCase().includes(activePat.name.toLowerCase().split(' ')[0]);
      return (aptPhone && aptPhone === cleanPhone) || emailMatch || nameMatch;
    }
    return true;
  });

  const reminders: UpcomingReminderInfo[] = [];
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
  // Allow a grace window of 2 hours past scheduled time so users visiting during or right after session still see it
  const GRACE_PERIOD_MS = 2 * 60 * 60 * 1000;

  for (const apt of activeAppointments) {
    try {
      const scheduledTime = parseAppointmentDateTime(apt.date, apt.timeSlot);
      const diffMs = scheduledTime.getTime() - refDate.getTime();

      // Check if within 24 hours in the future OR within 2 hours of starting today
      if (diffMs >= -GRACE_PERIOD_MS && diffMs <= TWENTY_FOUR_HOURS_MS) {
        const totalMinutes = Math.max(0, Math.floor(diffMs / (60 * 1000)));
        const hoursRemaining = Math.floor(totalMinutes / 60);
        const minutesRemaining = totalMinutes % 60;

        const isToday =
          scheduledTime.getFullYear() === refDate.getFullYear() &&
          scheduledTime.getMonth() === refDate.getMonth() &&
          scheduledTime.getDate() === refDate.getDate();

        let timeDisplay = '';
        if (diffMs < 0) {
          timeDisplay = 'In Progress / Today';
        } else if (hoursRemaining === 0) {
          timeDisplay = `In ${minutesRemaining} mins`;
        } else if (hoursRemaining === 1) {
          timeDisplay = `In 1 hr ${minutesRemaining > 0 ? `${minutesRemaining}m` : ''}`;
        } else {
          timeDisplay = `In ${hoursRemaining} hrs ${minutesRemaining > 0 ? `${minutesRemaining}m` : ''}`;
        }

        reminders.push({
          appointment: apt,
          scheduledTime,
          diffMs,
          hoursRemaining,
          minutesRemaining,
          isToday,
          timeDisplay
        });
      }
    } catch {
      // ignore invalid date formats
    }
  }

  // Sort by closest upcoming appointment first
  reminders.sort((a, b) => a.diffMs - b.diffMs);
  return reminders;
}

/**
 * Checks if the revisit alert has been dismissed recently by the user.
 */
export function isRevisitAlertDismissed(): boolean {
  try {
    const raw = sessionStorage.getItem(REVISIT_ALERT_STORAGE_KEY) || localStorage.getItem(REVISIT_ALERT_STORAGE_KEY);
    if (!raw) return false;
    const dismissedUntil = parseInt(raw, 10);
    return Date.now() < dismissedUntil;
  } catch {
    return false;
  }
}

/**
 * Dismisses the revisit alert for a period of time (e.g. 4 hours or current session).
 */
export function dismissRevisitAlert(hours: number = 4): void {
  try {
    const until = Date.now() + hours * 60 * 60 * 1000;
    sessionStorage.setItem(REVISIT_ALERT_STORAGE_KEY, until.toString());
  } catch {
    // ignore
  }
}

/**
 * Resets the dismiss status so the alert shows again.
 */
export function resetRevisitAlertDismiss(): void {
  try {
    sessionStorage.removeItem(REVISIT_ALERT_STORAGE_KEY);
    localStorage.removeItem(REVISIT_ALERT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Request notification permission and trigger a local native browser notification.
 */
export async function triggerLocalAppointmentNotification(reminder: UpcomingReminderInfo): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      const apt = reminder.appointment;
      const title = `⏰ Upcoming Dental Appointment (${reminder.timeDisplay})`;
      const body = `Reminder: Your appointment with ${apt.doctorName} for "${apt.treatmentName}" is on ${apt.date} at ${apt.timeSlot} at Sakthi Dental Clinic Hosur.`;
      
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: `sdc-apt-${apt.id}`
      });
      return true;
    }
  } catch (err) {
    console.warn('Could not trigger browser notification:', err);
  }

  return false;
}

/**
 * Generates a Google Calendar add event URL for the appointment.
 */
export function generateGoogleCalendarUrl(apt: Appointment): string {
  try {
    const start = parseAppointmentDateTime(apt.date, apt.timeSlot);
    const end = new Date(start.getTime() + 45 * 60 * 1000); // 45-min appointment

    const formatGCal = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, '');

    const title = encodeURIComponent(`Dental Appointment: ${apt.treatmentName} with ${apt.doctorName}`);
    const details = encodeURIComponent(
      `Appointment Ref #${apt.id}\nPatient: ${apt.patientName}\nDoctor: ${apt.doctorName}\nTreatment: ${apt.treatmentName}\nTime: ${apt.timeSlot}\nClinic: Sakthi Dental Clinic, Anthivadi, Hosur\nPhone: +91 94432 78120`
    );
    const location = encodeURIComponent('Sakthi Dental Clinic, B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109');
    const dates = `${formatGCal(start)}/${formatGCal(end)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  } catch {
    return 'https://calendar.google.com';
  }
}

/**
 * Creates a demo 24-hour upcoming appointment to allow testing the revisit alert immediately.
 */
export function createTestUpcoming24hAppointment(): Appointment {
  const now = new Date();
  const testDate = now.toISOString().split('T')[0];

  // Appointment set for 3 hours from now
  const targetHour = (now.getHours() + 3) % 24;
  const meridiem = targetHour >= 12 ? 'PM' : 'AM';
  const displayHour = targetHour % 12 === 0 ? 12 : targetHour % 12;
  const timeSlot = `${displayHour < 10 ? '0' : ''}${displayHour}:00 ${meridiem}`;

  resetRevisitAlertDismiss();

  const newApt = saveAppointment({
    patientName: 'Priya Sundaram',
    phone: '+91 98451 22340',
    email: 'priya.sundaram@gmail.com',
    treatmentId: 'teeth-cleaning-scaling',
    treatmentName: 'Routine Dental Scaling & Checkup',
    doctorId: 'doc-1',
    doctorName: 'Dr. Anupriya (Founder & Dental Surgeon)',
    date: testDate,
    timeSlot,
    notes: 'Demo test upcoming session within 24 hours of revisit.'
  });

  return newApt;
}
