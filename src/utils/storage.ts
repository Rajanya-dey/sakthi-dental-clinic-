import {
  Appointment,
  ContactInquiry,
  EmailReportConfig,
  NotificationLog,
  PushNotificationRule,
  Testimonial,
  PatientAccount,
  MedicalRecord,
  DigitalPrescription,
  AdminAccount,
  DoctorAccount,
  UserRole,
  UserSession,
  RewardPointTransaction,
  RedeemableReward,
  RedeemedVoucher,
  PatientSmileRewardsSummary
} from '../types';
import { TESTIMONIALS } from '../data/clinicData';
import { CourseEnrollment } from '../data/coursesData';

const STORAGE_KEYS = {
  APPOINTMENTS: 'sdc_appointments_v1',
  INQUIRIES: 'sdc_inquiries_v1',
  PAGE_VIEWS: 'sdc_page_views_v1',
  EVENT_LOGS: 'sdc_event_logs_v1',
  EMAIL_CONFIG: 'sdc_email_config_v1',
  NOTIF_RULES: 'sdc_notif_rules_v1',
  NOTIF_LOGS: 'sdc_notif_logs_v1',
  REPORTS_HISTORY: 'sdc_reports_history_v1',
  TESTIMONIALS: 'sdc_testimonials_v1',
  PATIENTS: 'sdc_patients_v1',
  ACTIVE_PATIENT: 'sdc_active_patient_v1',
  MEDICAL_RECORDS: 'sdc_med_records_v1',
  PRESCRIPTIONS: 'sdc_prescriptions_v1',
  ADMINS: 'sdc_admins_v1',
  ACTIVE_ADMIN: 'sdc_active_admin_v1',
  DOCTORS: 'sdc_doctors_v1',
  ACTIVE_DOCTOR: 'sdc_active_doctor_v1',
  ACTIVE_SESSION: 'sdc_active_session_v1',
  OTP_STORE: 'sdc_otp_store_v1',
  REWARDS_TX: 'sdc_rewards_tx_v1',
  REWARDS_VOUCHERS: 'sdc_rewards_vouchers_v1',
  COURSE_ENROLLMENTS: 'sdc_course_enrollments_v1'
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`Storage write suppressed for key "${key}":`, err);
  }
};

export const safeRemoveItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Storage removal suppressed for key "${key}":`, err);
  }
};

// Initial default appointments
const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1082',
    patientName: 'Priya Sundaram',
    phone: '+91 98451 22340',
    email: 'priya.sundaram@gmail.com',
    treatmentId: 'orthodontic-treatment',
    treatmentName: 'Orthodontic Treatment (Braces)',
    doctorId: 'doc-5',
    doctorName: 'Dr. Sneha N (Orthodontist)',
    date: '2026-10-14',
    timeSlot: '10:30 AM',
    notes: 'Consultation for braces and bite adjustment.',
    status: 'Confirmed',
    createdAt: '2026-10-10T14:20:00Z'
  },
  {
    id: 'APT-1085',
    patientName: 'Priya Sundaram',
    phone: '+91 98451 22340',
    email: 'priya.sundaram@gmail.com',
    treatmentId: 'cosmetic-dentistry',
    treatmentName: 'Clear Aligner Tray #2 Review',
    doctorId: 'doc-5',
    doctorName: 'Dr. Sneha N (Orthodontist)',
    date: '2026-10-24',
    timeSlot: '04:30 PM',
    notes: 'Tray delivery and verification of inter-proximal alignment.',
    status: 'Confirmed',
    createdAt: '2026-10-10T16:00:00Z'
  },
  {
    id: 'APT-1088',
    patientName: 'Priya Sundaram',
    phone: '+91 98451 22340',
    email: 'priya.sundaram@gmail.com',
    treatmentId: 'teeth-cleaning-scaling',
    treatmentName: 'Preventative Ultrasonic Scaling',
    doctorId: 'doc-1',
    doctorName: 'Dr. Anupriya (Founder)',
    date: '2026-11-07',
    timeSlot: '11:00 AM',
    notes: '6-Month routine maintenance scaling & fluoride polish.',
    status: 'Confirmed',
    createdAt: '2026-10-11T09:30:00Z'
  },
  {
    id: 'APT-1081',
    patientName: 'Karthik Raja',
    phone: '+91 97890 44521',
    email: 'karthik.raja@outlook.com',
    treatmentId: 'teeth-cleaning-scaling',
    treatmentName: 'Teeth Cleaning or Scaling',
    doctorId: 'doc-1',
    doctorName: 'Dr. Anupriya (Founder)',
    date: '2026-10-12',
    timeSlot: '04:00 PM',
    notes: 'Routine 6-month cleaning and calculus removal.',
    status: 'Confirmed',
    createdAt: '2026-10-10T09:15:00Z'
  },
  {
    id: 'APT-1080',
    patientName: 'Aarav (Guardian: Kavitha)',
    phone: '+91 99402 11984',
    email: 'kavitha.m@yahoo.com',
    treatmentId: 'pediatric-dentistry',
    treatmentName: 'Pediatric Dentistry',
    doctorId: 'doc-4',
    doctorName: 'Dr. Arvind Kumar (Dental Surgeon)',
    date: '2026-10-15',
    timeSlot: '11:00 AM',
    notes: 'Milk tooth cavity checkup for 6-year-old child.',
    status: 'Pending',
    createdAt: '2026-10-09T17:45:00Z'
  },
  {
    id: 'APT-1079',
    patientName: 'Venkatesan N',
    phone: '+91 94432 78120',
    email: 'venkat.n@gmail.com',
    treatmentId: 'dental-implants',
    treatmentName: 'Dental Implants',
    doctorId: 'doc-6',
    doctorName: 'Dr. Srinivas Rohit Ramanujam (Implantologist)',
    date: '2026-10-16',
    timeSlot: '02:30 PM',
    notes: 'Evaluating lower molar titanium implant.',
    status: 'Confirmed',
    createdAt: '2026-10-08T11:10:00Z'
  }
];

// Initial default contact inquiries
const DEFAULT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'INQ-402',
    name: 'Suresh Babu',
    email: 'suresh.babu@gmail.com',
    phone: '+91 98401 55678',
    message: 'Hello Dr. Anupriya, do you offer weekend evening appointments for dental implant consultations?',
    status: 'Replied',
    createdAt: '2026-10-09T16:00:00Z'
  },
  {
    id: 'INQ-403',
    name: 'Divya Lakshmi',
    email: 'divya.l@gmail.com',
    phone: '+91 97910 88231',
    message: 'My 8-year-old is afraid of dental scaling. Can we schedule a friendly introductory visit?',
    status: 'Unread',
    createdAt: '2026-10-10T18:30:00Z'
  }
];

// Default Email Report Settings
const DEFAULT_EMAIL_CONFIG: EmailReportConfig = {
  enabled: true,
  frequency: 'Weekly',
  dayOfWeek: 'Monday',
  timeOfDay: '09:00',
  recipients: ['admin@sakthidentalclinic.in', 'dr.anupriya@sakthidentalclinic.in'],
  includeTraffic: true,
  includeBookings: true,
  includeTopTreatments: true,
  lastSentAt: '2026-10-06T09:00:00Z'
};

// Default Push Notification Rules
const DEFAULT_NOTIF_RULES: PushNotificationRule[] = [
  {
    id: 'rule-apt',
    title: 'New Appointment Booking Alert',
    description: 'Instant notification whenever a patient schedules an appointment on the site.',
    triggerType: 'new_appointment',
    enabled: true
  },
  {
    id: 'rule-traffic',
    title: 'High Traffic Surge / Milestone',
    description: 'Trigger notification when daily site views exceed 500 visitors.',
    triggerType: 'high_traffic',
    enabled: true
  },
  {
    id: 'rule-emergency',
    title: 'Emergency Contact Alert',
    description: 'Priority alert when a patient taps the Emergency Dental Support CTA.',
    triggerType: 'emergency_inquiry',
    enabled: true
  },
  {
    id: 'rule-summary',
    title: 'Weekly Performance Report Ready',
    description: 'Notify administrators when automated weekly email digest is compiled and delivered.',
    triggerType: 'weekly_summary',
    enabled: true
  }
];

const DEFAULT_NOTIF_LOGS: NotificationLog[] = [
  {
    id: 'notif-1',
    title: 'New Appointment Booked',
    body: 'Priya Sundaram scheduled Orthodontic Treatment with Dr. Sneha N for Oct 14.',
    type: 'success',
    timestamp: '2026-10-10T14:20:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Emergency Line Inquiry',
    body: 'Visitor accessed emergency support line from Hosur mobile device.',
    type: 'alert',
    timestamp: '2026-10-10T11:45:00Z',
    read: true
  },
  {
    id: 'notif-3',
    title: 'Weekly Executive Summary Sent',
    body: 'Automated weekly PDF/Email report dispatched to 2 clinic recipients.',
    type: 'info',
    timestamp: '2026-10-06T09:00:00Z',
    read: true
  }
];

export const getStoredAppointments = (): Appointment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
      return DEFAULT_APPOINTMENTS;
    }
    const parsed: Appointment[] = JSON.parse(raw);
    // Ensure demo upcoming appointments exist so calendar is populated
    const existingIds = new Set(parsed.map(a => a.id));
    let hasNew = false;
    DEFAULT_APPOINTMENTS.forEach(defApt => {
      if (!existingIds.has(defApt.id)) {
        parsed.push(defApt);
        hasNew = true;
      }
    });
    if (hasNew) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return DEFAULT_APPOINTMENTS;
  }
};

export interface WaitTimeInfo {
  estimatedMinutes: number;
  displayText: string;
  queueCount: number;
  status: 'low' | 'moderate' | 'busy';
  activeDoctors: number;
  lastUpdated: string;
}

export const getEstimatedWaitTime = (): WaitTimeInfo => {
  const appointments = getStoredAppointments();
  // Filter appointments currently awaiting doctor consultation
  const activeQueue = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending');
  const queueCount = activeQueue.length;

  let estimatedMinutes = 10;
  if (queueCount === 0) {
    estimatedMinutes = 5;
  } else if (queueCount === 1) {
    estimatedMinutes = 12;
  } else if (queueCount === 2) {
    estimatedMinutes = 18;
  } else if (queueCount === 3) {
    estimatedMinutes = 24;
  } else if (queueCount === 4) {
    estimatedMinutes = 32;
  } else {
    estimatedMinutes = Math.min(65, 15 + queueCount * 7);
  }

  let status: WaitTimeInfo['status'] = 'low';
  if (estimatedMinutes > 30) status = 'busy';
  else if (estimatedMinutes >= 18) status = 'moderate';

  return {
    estimatedMinutes,
    displayText: `${estimatedMinutes} mins`,
    queueCount,
    status,
    activeDoctors: 3,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

export const saveAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment => {
  const all = getStoredAppointments();
  const newApt: Appointment = {
    ...appointment,
    id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  const updated = [newApt, ...all];
  safeSetItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));

  // Trigger push notification for new appointment
  triggerPushNotification(
    'New Patient Appointment Booked',
    `${newApt.patientName} booked ${newApt.treatmentName} on ${newApt.date} at ${newApt.timeSlot}`,
    'success'
  );

  trackEvent('booking_submitted', 'appointment-modal', {
    treatment: newApt.treatmentName,
    doctor: newApt.doctorName
  });

  // Notify header to recalculate real-time wait time
  window.dispatchEvent(new CustomEvent('sdc_appointments_updated'));

  return newApt;
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
  const all = getStoredAppointments();
  const updated = all.map(a => (a.id === id ? { ...a, status } : a));
  safeSetItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));

  // Notify header to recalculate real-time wait time
  window.dispatchEvent(new CustomEvent('sdc_appointments_updated'));

  return updated;
};

export const getStoredInquiries = (): ContactInquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INQUIRIES;
  }
};

export const saveInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry => {
  const all = getStoredInquiries();
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Unread',
    createdAt: new Date().toISOString()
  };
  const updated = [newInq, ...all];
  safeSetItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));

  triggerPushNotification(
    'New Contact Inquiry Received',
    `${newInq.name} sent a question via the Contact Us form: "${newInq.message.substring(0, 50)}..."`,
    'info'
  );

  trackEvent('inquiry_submitted', 'contact-us', { name: newInq.name });
  return newInq;
};

// Analytics Engine
export const trackEvent = (type: string, page: string, details?: Record<string, any>) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENT_LOGS);
    const logs = raw ? JSON.parse(raw) : [];
    const event = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      page,
      timestamp: new Date().toISOString(),
      details
    };
    logs.unshift(event);
    if (logs.length > 200) logs.length = 200;
    localStorage.setItem(STORAGE_KEYS.EVENT_LOGS, JSON.stringify(logs));
  } catch {
    // ignore
  }
};

export const getAnalyticsStats = () => {
  const appointments = getStoredAppointments();
  const inquiries = getStoredInquiries();

  return {
    totalPageViews: 8420,
    uniqueVisitors: 4190,
    todayVisitors: 312,
    conversionRate: 6.8, // percent
    appointmentsBooked: appointments.length,
    inquiriesReceived: inquiries.length,
    mobileTrafficPercent: 67,
    desktopTrafficPercent: 26,
    tabletTrafficPercent: 7,
    avgSessionDuration: '3m 42s',
    bounceRate: '28.4%',
    topTreatments: [
      { name: 'Teeth Cleaning or Scaling', count: 48, percentage: 28 },
      { name: 'Orthodontic Braces & Aligners', count: 36, percentage: 21 },
      { name: 'Dental Implants', count: 29, percentage: 17 },
      { name: 'Root Canal Therapy', count: 24, percentage: 14 },
      { name: 'Teeth Whitening (Bleaching)', count: 21, percentage: 12 },
      { name: 'Pediatric Dentistry', count: 14, percentage: 8 }
    ],
    trafficHistory: [
      { day: 'Mon', visitors: 420, appointments: 8 },
      { day: 'Tue', visitors: 480, appointments: 11 },
      { day: 'Wed', visitors: 510, appointments: 9 },
      { day: 'Thu', visitors: 460, appointments: 12 },
      { day: 'Fri', visitors: 590, appointments: 15 },
      { day: 'Sat', visitors: 680, appointments: 18 },
      { day: 'Sun', visitors: 640, appointments: 14 }
    ]
  };
};

// Email Reporting Configuration
export const getEmailConfig = (): EmailReportConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMAIL_CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EMAIL_CONFIG, JSON.stringify(DEFAULT_EMAIL_CONFIG));
      return DEFAULT_EMAIL_CONFIG;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_EMAIL_CONFIG;
  }
};

export const saveEmailConfig = (config: EmailReportConfig) => {
  safeSetItem(STORAGE_KEYS.EMAIL_CONFIG, JSON.stringify(config));
  return config;
};

// Notification System
export const getPushRules = (): PushNotificationRule[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIF_RULES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIF_RULES, JSON.stringify(DEFAULT_NOTIF_RULES));
      return DEFAULT_NOTIF_RULES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIF_RULES;
  }
};

export const updatePushRule = (id: string, enabled: boolean) => {
  const rules = getPushRules();
  const updated = rules.map(r => (r.id === id ? { ...r, enabled } : r));
  safeSetItem(STORAGE_KEYS.NOTIF_RULES, JSON.stringify(updated));
  return updated;
};

export const getNotificationLogs = (): NotificationLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIF_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIF_LOGS, JSON.stringify(DEFAULT_NOTIF_LOGS));
      return DEFAULT_NOTIF_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIF_LOGS;
  }
};

export const triggerPushNotification = (
  title: string,
  body: string,
  type: NotificationLog['type'] = 'info'
) => {
  const logs = getNotificationLogs();
  const newNotif: NotificationLog = {
    id: `notif-${Date.now()}`,
    title,
    body,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };
  const updated = [newNotif, ...logs];
  safeSetItem(STORAGE_KEYS.NOTIF_LOGS, JSON.stringify(updated));

  // Dispatch custom window event so in-app banner/toasts update reactively
  window.dispatchEvent(
    new CustomEvent('sdc_push_notification', {
      detail: newNotif
    })
  );

  // If browser notification is permitted, also trigger system notification
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
    } catch {
      // ignore
    }
  }

  return newNotif;
};

// Testimonials Storage System
export const getStoredTestimonials = (): Testimonial[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(TESTIMONIALS));
      return TESTIMONIALS;
    }
    return JSON.parse(raw);
  } catch {
    return TESTIMONIALS;
  }
};

export const saveTestimonial = (
  testimonial: Omit<Testimonial, 'id' | 'date'>
): Testimonial => {
  const all = getStoredTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: `test-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    isVerified: true
  };
  const updated = [newTestimonial, ...all];
  safeSetItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));

  // Trigger push notification for new patient review
  triggerPushNotification(
    'New Patient Testimonial Shared!',
    `${newTestimonial.author} left a ${newTestimonial.rating}-star review: "${newTestimonial.quote.substring(0, 45)}..."`,
    'success'
  );

  trackEvent('testimonial_submitted', 'share-experience', {
    author: newTestimonial.author,
    rating: newTestimonial.rating,
    treatment: newTestimonial.treatment
  });

  // Dispatch event for instant UI update
  try {
    window.dispatchEvent(new CustomEvent('sdc_testimonials_updated', { detail: newTestimonial }));
  } catch {
    // ignore
  }

  return newTestimonial;
};

export const upvoteTestimonialHelpful = (id: string): number => {
  try {
    const all = getStoredTestimonials();
    const target = all.find(t => t.id === id);
    if (!target) return 0;
    target.helpfulCount = (target.helpfulCount || 0) + 1;
    safeSetItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('sdc_testimonials_updated', { detail: target }));
    return target.helpfulCount;
  } catch {
    return 0;
  }
};

// ==========================================
// SECURE PATIENT PORTAL SERVICES & DATA
// ==========================================

const DEFAULT_PATIENTS: PatientAccount[] = [
  {
    id: 'pat-1',
    uhid: 'SDC-2026-0842',
    name: 'Priya Sundaram',
    phone: '9845122340',
    email: 'priya.sundaram@gmail.com',
    passcode: '1234',
    age: 28,
    gender: 'Female',
    bloodGroup: 'B +ve',
    allergies: ['Penicillin (mild sensitivity)', 'Latex-safe preferred'],
    registeredDate: '2024-03-12'
  },
  {
    id: 'pat-2',
    uhid: 'SDC-2026-0619',
    name: 'Karthik Raja',
    phone: '9789044521',
    email: 'karthik.raja@outlook.com',
    passcode: '1234',
    age: 34,
    gender: 'Male',
    bloodGroup: 'O +ve',
    allergies: ['None known'],
    registeredDate: '2023-11-20'
  }
];

const DEFAULT_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-1',
    uhid: 'SDC-2026-0842',
    patientName: 'Priya Sundaram',
    date: '2026-09-15',
    treatmentName: 'Orthodontic Alignment Assessment & Scans',
    doctorName: 'Dr. Sneha N (Orthodontist)',
    targetTeeth: 'Upper & Lower Arches (Full dentition)',
    diagnosis: 'Class I malocclusion with mild anterior crowding in lower incisors. Good periodontal health.',
    procedureNotes: 'High-resolution digital impression completed. Pre-orthodontic scaling performed. Treatment timeline planned for 10-12 months clear aligners.',
    cost: '₹1,500',
    nextFollowUp: '2026-10-14'
  },
  {
    id: 'rec-2',
    uhid: 'SDC-2026-0842',
    patientName: 'Priya Sundaram',
    date: '2026-05-10',
    treatmentName: 'Teeth Cleaning, Scaling & Fluoride Coating',
    doctorName: 'Dr. Anupriya (Founder & Dental Surgeon)',
    targetTeeth: 'Full mouth scaling',
    diagnosis: 'Generalized mild supra-gingival calculus. No sub-gingival pockets.',
    procedureNotes: 'Ultrasonic scaling executed with minimal discomfort. Prophylaxis paste polish and topical fluoride foam applied for enamel strengthening.',
    cost: '₹1,200',
    nextFollowUp: '2026-11-10'
  },
  {
    id: 'rec-3',
    uhid: 'SDC-2026-0619',
    patientName: 'Karthik Raja',
    date: '2026-08-04',
    treatmentName: 'Single Sitting Root Canal Treatment (RCT)',
    doctorName: 'Dr. Anupriya',
    targetTeeth: 'Tooth #36 (Lower Left First Molar)',
    diagnosis: 'Deep carious lesion approaching pulp chamber. Irreversible pulpitis.',
    procedureNotes: 'Rotary endodontics under rubber dam isolation. Biomechanical canal preparation and bio-ceramic sealer obturation completed in single visit. Temporary restoration placed.',
    cost: '₹4,500',
    nextFollowUp: '2026-10-12'
  }
];

const DEFAULT_PRESCRIPTIONS: DigitalPrescription[] = [
  {
    id: 'rx-2026-891',
    rxNumber: 'SDC-RX-8914',
    uhid: 'SDC-2026-0842',
    patientName: 'Priya Sundaram',
    patientAge: 28,
    date: '2026-09-15',
    doctorName: 'Dr. Sneha N',
    doctorSpecialty: 'MDS (Orthodontics & Dentofacial Orthopedics)',
    diagnosis: 'Post-orthodontic scan gingival mild tenderness & hygiene protocol',
    medicines: [
      {
        name: 'Chlorhexidine 0.2% Antiseptic Oral Rinse',
        dosage: '10 ml',
        frequency: 'Twice Daily (Morning & Night, after meals)',
        duration: '7 Days',
        instructions: 'Swish vigorously for 45 seconds. Do not rinse with water or drink for 30 minutes.'
      },
      {
        name: 'Sensodyne Rapid Relief Toothpaste',
        dosage: 'Pea-sized amount',
        frequency: 'Twice Daily with ultra-soft toothbrush',
        duration: 'Continuous',
        instructions: 'Massage gently along cervical gum margins.'
      },
      {
        name: 'Paracetamol 650mg (SOS for mild ache)',
        dosage: '1 Tablet',
        frequency: 'Only if needed (Max 2 tabs/day after food)',
        duration: 'As needed',
        instructions: 'For occasional mild tightness following initial dental wire activation.'
      }
    ],
    generalAdvice: [
      'Maintain diligent brushing around orthodontic attachments.',
      'Avoid biting into whole hard apples, carrots, or sticky toffees.',
      'Rinse with lukewarm saline water if mild gum irritation occurs.',
      'Upcoming appointment scheduled for aligner tray fitting on Oct 14, 2026.'
    ],
    clinicAddress: 'Sakthi Dental Clinic, B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109',
    doctorRegistrationNo: 'TN-DC-34819'
  },
  {
    id: 'rx-2026-724',
    rxNumber: 'SDC-RX-7241',
    uhid: 'SDC-2026-0619',
    patientName: 'Karthik Raja',
    patientAge: 34,
    date: '2026-08-04',
    doctorName: 'Dr. Anupriya',
    doctorSpecialty: 'BDS, Dental Surgeon & Clinic Founder',
    diagnosis: 'Post-Endodontic management for Tooth #36',
    medicines: [
      {
        name: 'Amoxicillin + Clavulanic Acid (Augmentin 625mg)',
        dosage: '1 Tablet (625mg)',
        frequency: 'Twice daily after food (1-0-1)',
        duration: '5 Days (Complete full course)',
        instructions: 'Take with plenty of water. Do not skip scheduled doses.'
      },
      {
        name: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P)',
        dosage: '1 Tablet',
        frequency: 'Twice daily after meals (1-0-1)',
        duration: '3 Days',
        instructions: 'Take strictly after meals to prevent gastric irritation.'
      },
      {
        name: 'Pantoprazole 40mg (Pan-40)',
        dosage: '1 Tablet',
        frequency: 'Once daily before morning breakfast (1-0-0)',
        duration: '5 Days',
        instructions: 'Consume 30 minutes before first meal.'
      }
    ],
    generalAdvice: [
      'Avoid chewing on the left side (Tooth #36) until the permanent crown is placed.',
      'Warm salt water gargle 3 times a day starting tomorrow.',
      'Return immediately if swelling or unbearable throbbing occurs.'
    ],
    clinicAddress: 'Sakthi Dental Clinic, B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109',
    doctorRegistrationNo: 'TN-DC-19284'
  }
];

export const getStoredPatients = (): PatientAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(DEFAULT_PATIENTS));
      return DEFAULT_PATIENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PATIENTS;
  }
};

export const getActivePatient = (): PatientAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PATIENT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setActivePatient = (patient: PatientAccount | null): void => {
  if (patient) {
    safeSetItem(STORAGE_KEYS.ACTIVE_PATIENT, JSON.stringify(patient));
  } else {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_PATIENT);
  }
  window.dispatchEvent(new CustomEvent('sdc_active_patient_changed', { detail: patient }));
};

export const registerPatient = (
  data: Omit<PatientAccount, 'id' | 'uhid' | 'registeredDate'>
): PatientAccount => {
  const all = getStoredPatients();
  const cleanPhone = data.phone.replace(/\D/g, '').slice(-10);
  const newAccount: PatientAccount = {
    ...data,
    phone: cleanPhone,
    id: `pat-${Date.now()}`,
    uhid: `SDC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    registeredDate: new Date().toISOString().split('T')[0]
  };

  const updated = [...all, newAccount];
  safeSetItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updated));
  setActivePatient(newAccount);
  return newAccount;
};

export const loginPatient = (identifier: string, passcode: string): PatientAccount | null => {
  const all = getStoredPatients();
  const cleanInput = identifier.trim().toLowerCase();
  const cleanPhoneInput = identifier.replace(/\D/g, '').slice(-10);

  const matched = all.find(p => {
    const phoneMatch = p.phone.slice(-10) === cleanPhoneInput;
    const uhidMatch = p.uhid.toLowerCase() === cleanInput;
    const emailMatch = p.email.toLowerCase() === cleanInput;
    return (phoneMatch || uhidMatch || emailMatch) && p.passcode === passcode;
  });

  if (matched) {
    setActivePatient(matched);
    return matched;
  }
  return null;
};

export const getPatientMedicalRecords = (uhid: string): MedicalRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS);
    const all: MedicalRecord[] = raw ? JSON.parse(raw) : DEFAULT_MEDICAL_RECORDS;
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(DEFAULT_MEDICAL_RECORDS));
    }
    return all.filter(r => r.uhid === uhid);
  } catch {
    return DEFAULT_MEDICAL_RECORDS.filter(r => r.uhid === uhid);
  }
};

export const getPatientPrescriptions = (uhid: string): DigitalPrescription[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
    const all: DigitalPrescription[] = raw ? JSON.parse(raw) : DEFAULT_PRESCRIPTIONS;
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(DEFAULT_PRESCRIPTIONS));
    }
    return all.filter(rx => rx.uhid === uhid);
  } catch {
    return DEFAULT_PRESCRIPTIONS.filter(rx => rx.uhid === uhid);
  }
};

export const getPatientUpcomingAppointments = (phoneOrEmail: string, patientName?: string): Appointment[] => {
  const all = getStoredAppointments();
  const cleanPhone = phoneOrEmail.replace(/\D/g, '').slice(-10);
  const cleanEmail = phoneOrEmail.trim().toLowerCase();
  const cleanName = (patientName || '').trim().toLowerCase();

  return all.filter(apt => {
    const aptPhone = (apt.phone || '').replace(/\D/g, '').slice(-10);
    const aptEmail = (apt.email || '').trim().toLowerCase();
    const aptName = (apt.patientName || '').trim().toLowerCase();

    const matchesContact = (cleanPhone && aptPhone === cleanPhone) || (cleanEmail && aptEmail === cleanEmail);
    const matchesName = cleanName && aptName.includes(cleanName.split(' ')[0]);

    return (matchesContact || matchesName) && apt.status !== 'Cancelled';
  });
};

// ==========================================
// SECURE CLINIC ADMIN & STAFF AUTHENTICATION
// ==========================================

const DEFAULT_ADMINS: AdminAccount[] = [
  {
    id: 'adm-1',
    employeeId: 'SDC-ADM-001',
    name: 'Dr. Anupriya',
    email: 'admin@sakthidentalclinic.in',
    phone: '9862890897',
    role: 'Founder & Chief Dental Surgeon',
    department: 'Executive Clinic Leadership',
    passcode: 'admin123',
    registeredDate: '2024-01-01'
  },
  {
    id: 'adm-2',
    employeeId: 'SDC-STF-002',
    name: 'Kavitha R',
    email: 'desk@sakthidentalclinic.in',
    phone: '9363298118',
    role: 'Front Desk & Patient Coordinator',
    department: 'Reception & Patient Care',
    passcode: 'staff123',
    registeredDate: '2024-02-15'
  }
];

export const getStoredAdmins = (): AdminAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(DEFAULT_ADMINS));
      return DEFAULT_ADMINS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ADMINS;
  }
};

export const getActiveAdmin = (): AdminAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ADMIN);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setActiveAdmin = (admin: AdminAccount | null): void => {
  if (admin) {
    safeSetItem(STORAGE_KEYS.ACTIVE_ADMIN, JSON.stringify(admin));
  } else {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_ADMIN);
  }
  try {
    window.dispatchEvent(new CustomEvent('sdc_active_admin_changed', { detail: admin }));
  } catch {
    // ignore
  }
};

export const loginAdmin = (identifier: string, passcode: string): AdminAccount | null => {
  const all = getStoredAdmins();
  const cleanInput = identifier.trim().toLowerCase();
  const cleanPhoneInput = identifier.replace(/\D/g, '').slice(-10);

  const matched = all.find(adm => {
    const emailMatch = adm.email.toLowerCase() === cleanInput;
    const phoneMatch = cleanPhoneInput && adm.phone.replace(/\D/g, '').slice(-10) === cleanPhoneInput;
    const empIdMatch = adm.employeeId.toLowerCase() === cleanInput;
    return (emailMatch || phoneMatch || empIdMatch) && adm.passcode === passcode;
  });

  if (matched) {
    setActiveAdmin(matched);
    trackEvent('admin_login_success', 'admin-auth', { email: matched.email, role: matched.role });
    return matched;
  }
  trackEvent('admin_login_failed', 'admin-auth', { identifier });
  return null;
};

export const registerAdmin = (
  data: Omit<AdminAccount, 'id' | 'employeeId' | 'registeredDate'> & { employeeId?: string }
): AdminAccount => {
  const all = getStoredAdmins();
  const cleanPhone = data.phone.replace(/\D/g, '').slice(-10);
  const employeeId = data.employeeId?.trim() || `SDC-STF-${Math.floor(100 + Math.random() * 900)}`;

  const newAdmin: AdminAccount = {
    ...data,
    id: `adm-${Date.now()}`,
    employeeId,
    phone: cleanPhone,
    registeredDate: new Date().toISOString().split('T')[0]
  };

  const updated = [...all, newAdmin];
  safeSetItem(STORAGE_KEYS.ADMINS, JSON.stringify(updated));
  setActiveAdmin(newAdmin);
  trackEvent('admin_registered', 'admin-auth', { email: newAdmin.email, role: newAdmin.role });
  return newAdmin;
};

export const logoutAdmin = (): void => {
  setActiveAdmin(null);
  trackEvent('admin_logout', 'admin-auth');
};

// ==========================================
// DOCTORS CLINICAL ACCOUNTS & DIRECTORY
// ==========================================

const DEFAULT_DOCTORS: DoctorAccount[] = [
  {
    id: 'doc-5',
    name: 'Dr. Sneha N',
    email: 'sneha.ortho@sakthidentalclinic.in',
    phone: '9845100005',
    role: 'Orthodontist',
    specialty: 'Braces, Alignment & Bite Correction',
    registrationNo: 'TN-DC-34819',
    education: 'MDS (Orthodontics & Dentofacial Orthopedics)',
    experience: '10+ Years',
    imageUrl: '/src/assets/images/dr_sneha_n_1791794838868.jpg',
    registeredDate: '2024-01-10'
  },
  {
    id: 'doc-1',
    name: 'Dr. Anupriya',
    email: 'anupriya@sakthidentalclinic.in',
    phone: '9862890897',
    role: 'Founder & Chief Dental Surgeon',
    specialty: 'General Dentistry & Comprehensive Smile Restoration',
    registrationNo: 'TN-DC-19284',
    education: 'BDS, Senior Dental Consultant',
    experience: '20+ Years',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    registeredDate: '2004-03-01'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Iyer',
    email: 'ananya.prostho@sakthidentalclinic.in',
    phone: '9845100002',
    role: 'Prosthodontist',
    specialty: 'Complete & Partial Dentures, Crowns & Fixed Bridges',
    registrationNo: 'TN-DC-28491',
    education: 'MDS (Prosthodontics)',
    experience: '12+ Years',
    imageUrl: '/src/assets/images/dr_ananya_iyer_1791794816364.jpg',
    registeredDate: '2024-02-14'
  },
  {
    id: 'doc-3',
    name: 'Dr. Meera Subramanian',
    email: 'meera.endo@sakthidentalclinic.in',
    phone: '9845100003',
    role: 'Endodontist',
    specialty: 'Root Canal Therapy & Microscopic Tooth Preservation',
    registrationNo: 'TN-DC-22019',
    education: 'MDS (Conservative Dentistry & Endodontics)',
    experience: '11+ Years',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    registeredDate: '2024-02-18'
  }
];

export const getStoredDoctors = (): DoctorAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCTORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
      return DEFAULT_DOCTORS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DOCTORS;
  }
};

export const getActiveDoctor = (): DoctorAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOCTOR);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setActiveDoctor = (doctor: DoctorAccount | null): void => {
  if (doctor) {
    safeSetItem(STORAGE_KEYS.ACTIVE_DOCTOR, JSON.stringify(doctor));
  } else {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_DOCTOR);
  }
  try {
    window.dispatchEvent(new CustomEvent('sdc_active_doctor_changed', { detail: doctor }));
  } catch {
    // ignore
  }
};

// ==========================================
// UNIFIED USER SESSION & ROLE ISOLATION
// ==========================================

export const getActiveSession = (): UserSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (raw) {
      return JSON.parse(raw);
    }
    // Fallback migration for existing sessions
    const curPat = getActivePatient();
    if (curPat) {
      const sess: UserSession = {
        role: 'patient',
        user: curPat,
        loginMethod: 'otp',
        token: `pat-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sess));
      return sess;
    }
    const curAdm = getActiveAdmin();
    if (curAdm) {
      const sess: UserSession = {
        role: 'admin',
        user: curAdm,
        loginMethod: 'otp',
        token: `adm-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sess));
      return sess;
    }
    const curDoc = getActiveDoctor();
    if (curDoc) {
      const sess: UserSession = {
        role: 'doctor',
        user: curDoc,
        loginMethod: 'otp',
        token: `doc-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sess));
      return sess;
    }
    return null;
  } catch {
    return null;
  }
};

export const setActiveSession = (session: UserSession | null): void => {
  if (session) {
    safeSetItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    if (session.role === 'patient') {
      setActivePatient(session.user as PatientAccount);
      setActiveDoctor(null);
      setActiveAdmin(null);
    } else if (session.role === 'doctor') {
      setActiveDoctor(session.user as DoctorAccount);
      setActivePatient(null);
      setActiveAdmin(null);
    } else if (session.role === 'admin') {
      setActiveAdmin(session.user as AdminAccount);
      setActivePatient(null);
      setActiveDoctor(null);
    }
  } else {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_SESSION);
    setActivePatient(null);
    setActiveDoctor(null);
    setActiveAdmin(null);
  }
  try {
    window.dispatchEvent(new CustomEvent('sdc_session_changed', { detail: session }));
  } catch {
    // ignore
  }
};

export const logoutActiveSession = (): void => {
  setActiveSession(null);
  trackEvent('user_logout_complete', 'auth-service');
};

// ==========================================
// REAL-TIME OTP SIMULATION SERVICE
// ==========================================

interface StoredOtpData {
  otp: string;
  identifier: string;
  role: UserRole;
  createdAt: number;
  expiresAt: number;
}

export const requestOtp = (
  identifier: string,
  role: UserRole
): { success: boolean; otp: string; message: string; isRegistered: boolean; accountName?: string } => {
  const clean = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/\D/g, '').slice(-10);

  // Check if account exists
  let accountName: string | undefined;
  let isRegistered = false;

  if (role === 'patient') {
    const patients = getStoredPatients();
    const matched = patients.find(p => p.email.toLowerCase() === clean || (cleanPhone && p.phone.slice(-10) === cleanPhone));
    if (matched) {
      isRegistered = true;
      accountName = matched.name;
    }
  } else if (role === 'doctor') {
    const doctors = getStoredDoctors();
    const matched = doctors.find(d => d.email.toLowerCase() === clean || (cleanPhone && d.phone.slice(-10) === cleanPhone));
    if (matched) {
      isRegistered = true;
      accountName = matched.name;
    }
  } else if (role === 'admin') {
    const admins = getStoredAdmins();
    const matched = admins.find(a => a.email.toLowerCase() === clean || (cleanPhone && a.phone.slice(-10) === cleanPhone));
    if (matched) {
      isRegistered = true;
      accountName = matched.name;
    }
  }

  // Generate realistic 6-digit OTP code
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpData: StoredOtpData = {
    otp: generatedOtp,
    identifier: clean,
    role,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  };

  try {
    sessionStorage.setItem(STORAGE_KEYS.OTP_STORE, JSON.stringify(otpData));
  } catch {
    // fallback
  }

  // Trigger push notification event so user gets instant visual confirmation
  try {
    window.dispatchEvent(
      new CustomEvent('sdc_otp_delivered', {
        detail: {
          identifier: clean,
          role,
          otp: generatedOtp,
          message: `Your Sakthi Dental Clinic security code is ${generatedOtp}. Valid for 10 minutes.`
        }
      })
    );
  } catch {
    // ignore
  }

  trackEvent('otp_requested', 'otp-service', { role, identifier: clean });

  return {
    success: true,
    otp: generatedOtp,
    message: `Verification code sent to ${identifier}`,
    isRegistered,
    accountName
  };
};

export const verifyOtpAndLogin = (
  identifier: string,
  otpInput: string,
  role: UserRole
): { success: boolean; session?: UserSession; error?: string; isNewUser?: boolean } => {
  const clean = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/\D/g, '').slice(-10);
  const cleanOtp = otpInput.trim();

  // Validate stored OTP (also accept universal demo OTP '123456' or '482910' for instant convenience)
  let isValid = false;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.OTP_STORE);
    if (stored) {
      const data: StoredOtpData = JSON.parse(stored);
      if (
        data.otp === cleanOtp &&
        (data.identifier === clean || (cleanPhone && clean.includes(cleanPhone))) &&
        data.expiresAt > Date.now()
      ) {
        isValid = true;
      }
    }
  } catch {
    // ignore
  }

  // Allow developer/demo bypass codes
  if (cleanOtp === '123456' || cleanOtp === '482910' || cleanOtp === '000000') {
    isValid = true;
  }

  if (!isValid) {
    return {
      success: false,
      error: 'Invalid or expired OTP code. Please re-enter or click Resend Code.'
    };
  }

  // Find existing account for this specific role
  if (role === 'patient') {
    const patients = getStoredPatients();
    const matched = patients.find(p => p.email.toLowerCase() === clean || (cleanPhone && p.phone.slice(-10) === cleanPhone));
    if (matched) {
      const session: UserSession = {
        role: 'patient',
        user: matched,
        loginMethod: 'otp',
        token: `pat-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      setActiveSession(session);
      trackEvent('otp_login_success', 'patient-auth', { email: matched.email });
      return { success: true, session };
    }
    return {
      success: false,
      isNewUser: true,
      error: 'Phone/email verified! No patient profile was found. Please complete your registration below.'
    };
  }

  if (role === 'doctor') {
    const doctors = getStoredDoctors();
    const matched = doctors.find(d => d.email.toLowerCase() === clean || (cleanPhone && d.phone.slice(-10) === cleanPhone));
    if (matched) {
      const session: UserSession = {
        role: 'doctor',
        user: matched,
        loginMethod: 'otp',
        token: `doc-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      setActiveSession(session);
      trackEvent('otp_login_success', 'doctor-auth', { email: matched.email });
      return { success: true, session };
    }
    return {
      success: false,
      isNewUser: true,
      error: 'Phone/email verified! No doctor profile was found. Please register your doctor credentials below.'
    };
  }

  if (role === 'admin') {
    const admins = getStoredAdmins();
    const matched = admins.find(a => a.email.toLowerCase() === clean || (cleanPhone && a.phone.slice(-10) === cleanPhone));
    if (matched) {
      const session: UserSession = {
        role: 'admin',
        user: matched,
        loginMethod: 'otp',
        token: `adm-tok-${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      setActiveSession(session);
      trackEvent('otp_login_success', 'admin-auth', { email: matched.email });
      return { success: true, session };
    }
    return {
      success: false,
      isNewUser: true,
      error: 'Phone/email verified! No staff admin profile was found. Please register clinic staff access below.'
    };
  }

  return { success: false, error: 'Unknown role' };
};

export const registerUserWithOtp = (
  role: UserRole,
  details: {
    name: string;
    identifier: string; // phone or email
    email?: string;
    phone?: string;
    age?: number;
    gender?: string;
    bloodGroup?: string;
    allergies?: string[];
    specialty?: string;
    registrationNo?: string;
    staffRole?: string;
    clinicCode?: string;
  }
): UserSession => {
  const cleanPhone = (details.phone || details.identifier).replace(/\D/g, '').slice(-10) || '9845122340';
  const cleanEmail = (details.email || (details.identifier.includes('@') ? details.identifier : `${details.name.toLowerCase().replace(/\s+/g, '')}@example.com`)).trim().toLowerCase();

  if (role === 'patient') {
    const newPat = registerPatient({
      name: details.name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      passcode: '1234',
      age: details.age || 28,
      gender: details.gender || 'Female',
      bloodGroup: details.bloodGroup || 'O +ve',
      allergies: details.allergies || ['None reported']
    });
    const session: UserSession = {
      role: 'patient',
      user: newPat,
      loginMethod: 'otp',
      token: `pat-tok-${Date.now()}`,
      loginTime: new Date().toISOString()
    };
    setActiveSession(session);
    return session;
  }

  if (role === 'doctor') {
    const all = getStoredDoctors();
    const newDoc: DoctorAccount = {
      id: `doc-${Date.now()}`,
      name: details.name.startsWith('Dr.') ? details.name.trim() : `Dr. ${details.name.trim()}`,
      email: cleanEmail,
      phone: cleanPhone,
      role: details.specialty || 'Dental Specialist',
      specialty: details.specialty || 'General Dentistry & Oral Health',
      registrationNo: details.registrationNo || `TN-DC-${Math.floor(10000 + Math.random() * 90000)}`,
      education: 'BDS / MDS (Specialist Dental Surgeon)',
      registeredDate: new Date().toISOString().split('T')[0]
    };
    const updated = [...all, newDoc];
    safeSetItem(STORAGE_KEYS.DOCTORS, JSON.stringify(updated));
    const session: UserSession = {
      role: 'doctor',
      user: newDoc,
      loginMethod: 'otp',
      token: `doc-tok-${Date.now()}`,
      loginTime: new Date().toISOString()
    };
    setActiveSession(session);
    return session;
  }

  // Admin registration
  const newAdm = registerAdmin({
    name: details.name.trim(),
    email: cleanEmail,
    phone: cleanPhone,
    role: details.staffRole || 'Clinic Administrator',
    department: 'Hospital Management',
    passcode: 'admin123'
  });
  const session: UserSession = {
    role: 'admin',
    user: newAdm,
    loginMethod: 'otp',
    token: `adm-tok-${Date.now()}`,
    loginTime: new Date().toISOString()
  };
  setActiveSession(session);
  return session;
};

// ==========================================
// DOCTOR DIGITAL PRESCRIPTION ISSUANCE
// ==========================================

export const createDoctorPrescription = (
  rxData: Omit<DigitalPrescription, 'id' | 'rxNumber' | 'date'> & { date?: string }
): DigitalPrescription => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
    const all: DigitalPrescription[] = raw ? JSON.parse(raw) : DEFAULT_PRESCRIPTIONS;

    const newRx: DigitalPrescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
      rxNumber: `SDC-RX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: rxData.date || new Date().toISOString().split('T')[0]
    };

    const updated = [newRx, ...all];
    safeSetItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(updated));

    // Dispatch event so Patient Portal and Doctors list update immediately
    window.dispatchEvent(new CustomEvent('sdc_prescriptions_updated', { detail: newRx }));
    trackEvent('prescription_issued', 'doctor-service', { rxNumber: newRx.rxNumber, uhid: newRx.uhid });

    return newRx;
  } catch {
    const newRx: DigitalPrescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
      rxNumber: `SDC-RX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: rxData.date || new Date().toISOString().split('T')[0]
    };
    return newRx;
  }
};

// ==========================================
// SMILE REWARDS PROGRAM (POINTS & REDEMPTION)
// ==========================================

export const COSMETIC_REWARD_CATALOG: RedeemableReward[] = [
  {
    id: 'reward-laser-whitening',
    title: 'Laser Teeth Whitening (Power Bleach)',
    category: 'Cosmetic Dentistry',
    originalPrice: 6500,
    discountValue: 1500,
    discountType: 'fixed',
    pointsCost: 300,
    description: 'Philips Zoom cold-blue LED laser whitening session. Removes years of deep enamel stains with immediate 6 to 8 shades lighter result.',
    treatmentId: 'cosmetic-dentistry',
    badge: 'Most Popular',
    highlights: [
      'Single 45-minute in-office session',
      'Desensitizing fluoride mineral treatment included',
      'Complimentary home shade maintenance guide'
    ]
  },
  {
    id: 'reward-clear-aligners',
    title: 'Clear Aligners 3D Scan & Digital Simulation',
    category: 'Orthodontics',
    originalPrice: 2000,
    discountValue: 2000,
    discountType: 'free',
    pointsCost: 250,
    description: 'Comprehensive 3D intraoral digital impression, malocclusion analysis, and 3D time-lapse simulation video of your projected straight smile.',
    treatmentId: 'clear-aligners',
    badge: '100% Free Voucher',
    highlights: [
      'High-precision intraoral digital 3D scan',
      'Before & After computer-aided smile prediction',
      'Direct consultation with Dr. Sneha N (Orthodontist)'
    ]
  },
  {
    id: 'reward-porcelain-veneer',
    title: 'Porcelain Veneer / Smile Makeover Discount',
    category: 'Smile Makeover',
    originalPrice: 8500,
    discountValue: 2500,
    discountType: 'fixed',
    pointsCost: 450,
    description: 'Ultra-thin custom E-Max ceramic veneer for correcting chipped edges, stubborn discoloration, or minor gap closures.',
    treatmentId: 'cosmetic-dentistry',
    badge: 'Highest Value',
    highlights: [
      'Premium bio-compatible lithium disilicate ceramic',
      'Custom shade blending matching natural teeth',
      'Long-lasting aesthetic durability (10+ years)'
    ]
  },
  {
    id: 'reward-spa-airflow',
    title: 'Air-Flow Dental Spa Polish & Stain Removal',
    category: 'Preventive Hygiene',
    originalPrice: 2500,
    discountValue: 1000,
    discountType: 'fixed',
    pointsCost: 180,
    description: 'Gentle warm water & erythritol powder jet polishing. Effortlessly removes tea, coffee, and nicotine stains while giving silky smooth enamel.',
    treatmentId: 'teeth-cleaning-scaling',
    badge: 'Instant Glow',
    highlights: [
      'Painless warm micro-spray stain erasure',
      'Reaches tight interdental contacts and braces',
      'Leaves breath refreshed and smile gleaming'
    ]
  },
  {
    id: 'reward-composite-bonding',
    title: 'Cosmetic Composite Edge Bonding & Contouring',
    category: 'Cosmetic Dentistry',
    originalPrice: 3200,
    discountValue: 1200,
    discountType: 'fixed',
    pointsCost: 220,
    description: 'Artist-sculpted nano-hybrid composite bonding to repair chipped incisors, irregular tooth edges, or minor diastema (gap).',
    treatmentId: 'cosmetic-dentistry',
    badge: 'Fast Fix',
    highlights: [
      'Completed in a single gentle 30-min visit',
      'No tooth shaving or anesthesia required',
      'Immediate mirror reveal'
    ]
  },
  {
    id: 'reward-tooth-crystal',
    title: 'Sparkle Swarovski Dental Tooth Jewel',
    category: 'Cosmetic Dentistry',
    originalPrice: 1800,
    discountValue: 1800,
    discountType: 'free',
    pointsCost: 200,
    description: 'Genuine certified lead-free Swarovski tooth crystal bonded safely to tooth enamel without any drilling or damage.',
    treatmentId: 'cosmetic-dentistry',
    badge: 'Fun Aesthetic',
    highlights: [
      '100% painless non-invasive bonding',
      'Lasts 6 to 12 months or easily removed anytime',
      'Catches natural light when you smile'
    ]
  }
];

const DEFAULT_REWARD_TRANSACTIONS: RewardPointTransaction[] = [
  {
    id: 'tx-1',
    uhid: 'SDC-2026-0842',
    type: 'earned',
    points: 150,
    title: 'Completed Checkup: Teeth Cleaning, Scaling & Fluoride Coating',
    date: '2026-05-10',
    sourceType: 'checkup',
    treatmentName: 'Teeth Cleaning, Scaling & Fluoride Coating',
    doctorName: 'Dr. Anupriya'
  },
  {
    id: 'tx-2',
    uhid: 'SDC-2026-0842',
    type: 'earned',
    points: 150,
    title: 'Completed Consultation: Orthodontic Alignment Assessment & Scans',
    date: '2026-09-15',
    sourceType: 'consultation',
    treatmentName: 'Orthodontic Alignment Assessment & Scans',
    doctorName: 'Dr. Sneha N'
  },
  {
    id: 'tx-3',
    uhid: 'SDC-2026-0842',
    type: 'earned',
    points: 100,
    title: 'Welcome Bonus: Patient Portal Registration',
    date: '2024-03-12',
    sourceType: 'bonus'
  },
  {
    id: 'tx-4',
    uhid: 'SDC-2026-0842',
    type: 'earned',
    points: 50,
    title: 'Verified Patient Feedback & Rating Bonus',
    date: '2026-09-20',
    sourceType: 'review'
  },
  {
    id: 'tx-5',
    uhid: 'SDC-2026-0619',
    type: 'earned',
    points: 200,
    title: 'Completed Procedure: Single Sitting Root Canal Treatment',
    date: '2026-08-04',
    sourceType: 'procedure',
    treatmentName: 'Single Sitting Root Canal Treatment (RCT)',
    doctorName: 'Dr. Anupriya'
  },
  {
    id: 'tx-6',
    uhid: 'SDC-2026-0619',
    type: 'earned',
    points: 100,
    title: 'Welcome Bonus: Patient Portal Registration',
    date: '2023-11-20',
    sourceType: 'bonus'
  }
];

export const getStoredRewardTransactions = (): RewardPointTransaction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REWARDS_TX);
    if (!raw) {
      safeSetItem(STORAGE_KEYS.REWARDS_TX, JSON.stringify(DEFAULT_REWARD_TRANSACTIONS));
      return DEFAULT_REWARD_TRANSACTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_REWARD_TRANSACTIONS;
  }
};

export const getStoredRewardVouchers = (): RedeemedVoucher[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REWARDS_VOUCHERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const getPatientSmileRewards = (uhid: string): PatientSmileRewardsSummary => {
  const allTx = getStoredRewardTransactions();
  const allVouchers = getStoredRewardVouchers();

  const patientTx = allTx.filter(t => t.uhid === uhid);
  const patientVouchers = allVouchers.filter(v => v.uhid === uhid);

  let earned = 0;
  let redeemed = 0;

  patientTx.forEach(t => {
    if (t.type === 'earned') {
      earned += t.points;
    } else {
      redeemed += Math.abs(t.points);
    }
  });

  const available = Math.max(0, earned - redeemed);

  return {
    uhid,
    totalPointsEarned: earned,
    totalPointsRedeemed: redeemed,
    availablePoints: available,
    transactions: patientTx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    vouchers: patientVouchers.sort((a, b) => new Date(b.redeemedDate).getTime() - new Date(a.redeemedDate).getTime())
  };
};

export const redeemPatientReward = (
  uhid: string,
  rewardId: string
): { success: boolean; voucher?: RedeemedVoucher; error?: string } => {
  const reward = COSMETIC_REWARD_CATALOG.find(r => r.id === rewardId);
  if (!reward) {
    return { success: false, error: 'Selected reward package not found.' };
  }

  const summary = getPatientSmileRewards(uhid);
  if (summary.availablePoints < reward.pointsCost) {
    return {
      success: false,
      error: `Insufficient Smile Points. You have ${summary.availablePoints} pts, but this reward requires ${reward.pointsCost} pts.`
    };
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 90); // 90 days validity
  const expiryStr = expiryDate.toISOString().split('T')[0];

  const voucherCode = `SMILE-${rewardId.replace('reward-', '').toUpperCase().slice(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newVoucher: RedeemedVoucher = {
    id: `vouch-${Date.now()}`,
    uhid,
    voucherCode,
    rewardId: reward.id,
    rewardTitle: reward.title,
    treatmentId: reward.treatmentId,
    discountValue: reward.discountValue,
    pointsUsed: reward.pointsCost,
    redeemedDate: todayStr,
    expiresDate: expiryStr,
    status: 'active'
  };

  const newTx: RewardPointTransaction = {
    id: `tx-red-${Date.now()}`,
    uhid,
    type: 'redeemed',
    points: -reward.pointsCost,
    title: `Redeemed: ${reward.title} (Code: ${voucherCode})`,
    date: todayStr,
    sourceType: 'procedure',
    treatmentName: reward.title,
    voucherCode
  };

  // Persist transaction
  const allTx = getStoredRewardTransactions();
  const updatedTx = [newTx, ...allTx];
  safeSetItem(STORAGE_KEYS.REWARDS_TX, JSON.stringify(updatedTx));

  // Persist voucher
  const allVouchers = getStoredRewardVouchers();
  const updatedVouchers = [newVoucher, ...allVouchers];
  safeSetItem(STORAGE_KEYS.REWARDS_VOUCHERS, JSON.stringify(updatedVouchers));

  // Broadcast push notification
  triggerPushNotification(
    'Smile Rewards Voucher Issued! 🎁',
    `You redeemed ${reward.title}. Save ₹${reward.discountValue} with voucher code: ${voucherCode}.`,
    'success'
  );

  trackEvent('reward_redeemed', 'smile-rewards', {
    uhid,
    rewardId: reward.id,
    pointsCost: reward.pointsCost,
    voucherCode
  });

  window.dispatchEvent(new CustomEvent('sdc_rewards_updated', { detail: { uhid, voucher: newVoucher } }));

  return { success: true, voucher: newVoucher };
};

export const earnCheckupRewardPoints = (
  uhid: string,
  checkupTitle: string,
  points: number = 100,
  doctorName?: string
): RewardPointTransaction => {
  const todayStr = new Date().toISOString().split('T')[0];

  const newTx: RewardPointTransaction = {
    id: `tx-earn-${Date.now()}`,
    uhid,
    type: 'earned',
    points,
    title: `Completed Visit: ${checkupTitle}`,
    date: todayStr,
    sourceType: 'checkup',
    treatmentName: checkupTitle,
    doctorName: doctorName || 'Dr. Anupriya'
  };

  const allTx = getStoredRewardTransactions();
  const updatedTx = [newTx, ...allTx];
  safeSetItem(STORAGE_KEYS.REWARDS_TX, JSON.stringify(updatedTx));

  triggerPushNotification(
    `+${points} Smile Points Earned! ✨`,
    `Points credited for your completed checkup "${checkupTitle}". Check your rewards balance!`,
    'success'
  );

  window.dispatchEvent(new CustomEvent('sdc_rewards_updated', { detail: { uhid, transaction: newTx } }));

  return newTx;
};

export const markVoucherAsUsed = (voucherCode: string): boolean => {
  try {
    const all = getStoredRewardVouchers();
    const target = all.find(v => v.voucherCode === voucherCode);
    if (!target) return false;
    target.status = 'used';
    safeSetItem(STORAGE_KEYS.REWARDS_VOUCHERS, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('sdc_rewards_updated', { detail: { voucherCode } }));
    return true;
  } catch {
    return false;
  }
};

// ==========================================
// DOCTOR CLINICAL COURSES & CDE ENROLLMENT
// ==========================================

export const getStoredCourseEnrollments = (): CourseEnrollment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSE_ENROLLMENTS);
    if (!raw) {
      const defaultEnrollments: CourseEnrollment[] = [
        {
          id: 'enr-2026-01',
          courseId: 'course-endodontics-fellowship',
          courseTitle: 'Advanced Clinical Fellowship in Single-Sitting Rotary Endodontics',
          applicantName: 'Dr. Rajesh Kannan, BDS',
          email: 'rajesh.dentist@gmail.com',
          phone: '+91 94432 11982',
          profession: 'Dental Surgeon (BDS/MDS)',
          dentalCouncilRegNo: 'TN-DCI-44129',
          selectedBatch: 'November 14, 2026',
          enrollmentDate: '2026-10-15',
          status: 'Confirmed',
          feePaid: '₹28,500',
          confirmationCode: 'SDC-CDE-8821'
        },
        {
          id: 'enr-2026-02',
          courseId: 'course-clear-aligners',
          courseTitle: 'Digital Clear Aligners & 3D Biomechanics Certification Course',
          applicantName: 'Dr. Deepika Nathan, MDS',
          email: 'dr.deepika.ortho@gmail.com',
          phone: '+91 98840 55219',
          profession: 'Dental Surgeon (BDS/MDS)',
          dentalCouncilRegNo: 'TN-DCI-38290',
          selectedBatch: 'November 28, 2026',
          enrollmentDate: '2026-10-18',
          status: 'Confirmed',
          feePaid: '₹18,000',
          confirmationCode: 'SDC-CDE-9402'
        }
      ];
      safeSetItem(STORAGE_KEYS.COURSE_ENROLLMENTS, JSON.stringify(defaultEnrollments));
      return defaultEnrollments;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const createCourseEnrollment = (
  data: Omit<CourseEnrollment, 'id' | 'enrollmentDate' | 'confirmationCode' | 'status'>
): CourseEnrollment => {
  const all = getStoredCourseEnrollments();
  const newEnrollment: CourseEnrollment = {
    ...data,
    id: `enr-${Date.now()}`,
    enrollmentDate: new Date().toISOString().split('T')[0],
    confirmationCode: `SDC-CDE-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Confirmed'
  };
  const updated = [newEnrollment, ...all];
  safeSetItem(STORAGE_KEYS.COURSE_ENROLLMENTS, JSON.stringify(updated));

  triggerPushNotification(
    'Course Seat Reserved! 🎓',
    `Seat confirmed for "${data.courseTitle}". Admit Code: ${newEnrollment.confirmationCode}`,
    'success'
  );

  window.dispatchEvent(new CustomEvent('sdc_course_enrolled', { detail: newEnrollment }));
  return newEnrollment;
};


