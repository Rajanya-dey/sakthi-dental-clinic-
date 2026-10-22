export interface Treatment {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'General' | 'Cosmetic' | 'Orthodontics' | 'Surgery' | 'Pediatric' | 'Prosthodontics';
  imageUrl: string;
  badge?: string;
  features?: string[];
  isCore?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience?: string;
  education?: string;
  bio?: string;
  imageUrl?: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: 'city-center' | 'parking' | 'doctors' | 'pickup' | 'wheelchair';
  highlight: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  treatment?: string;
  date?: string;
  photoUrl?: string;
  location?: string;
  isVerified?: boolean;
  uhid?: string;
  doctorId?: string;
  doctorName?: string;
  tags?: string[];
  helpfulCount?: number;
  wouldRecommend?: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Scaling & Cleaning' | 'Braces & Aligners' | 'Treatments' | 'Hygiene';
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  treatmentName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Unread' | 'Replied' | 'Archived';
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'cta_click' | 'booking_submitted' | 'inquiry_submitted' | 'emergency_call';
  page: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface EmailReportConfig {
  enabled: boolean;
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  dayOfWeek: 'Monday' | 'Friday' | 'Sunday';
  timeOfDay: string;
  recipients: string[];
  includeTraffic: boolean;
  includeBookings: boolean;
  includeTopTreatments: boolean;
  lastSentAt?: string;
}

export interface PushNotificationRule {
  id: string;
  title: string;
  description: string;
  triggerType: 'new_appointment' | 'high_traffic' | 'emergency_inquiry' | 'weekly_summary';
  enabled: boolean;
}

export interface NotificationLog {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface PatientAccount {
  id: string;
  uhid: string;
  name: string;
  phone: string;
  email: string;
  passcode: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  allergies?: string[];
  registeredDate: string;
}

export interface MedicalRecord {
  id: string;
  uhid: string;
  patientName: string;
  date: string;
  treatmentName: string;
  doctorName: string;
  targetTeeth: string;
  diagnosis: string;
  procedureNotes: string;
  cost?: string;
  nextFollowUp?: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string; // e.g. 1-0-1 (After Food)
  duration: string;  // e.g. 5 days
  instructions: string;
}

export interface DigitalPrescription {
  id: string;
  rxNumber: string;
  uhid: string;
  patientName: string;
  patientAge: number;
  date: string;
  doctorName: string;
  doctorSpecialty: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  generalAdvice: string[];
  clinicAddress: string;
  doctorRegistrationNo: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  employeeId: string;
  department?: string;
  passcode: string;
  registeredDate: string;
}

export interface DoctorAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialty: string;
  registrationNo: string;
  education: string;
  experience?: string;
  imageUrl?: string;
  registeredDate: string;
}

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserSession {
  role: UserRole;
  user: PatientAccount | DoctorAccount | AdminAccount;
  loginMethod: 'otp';
  token: string;
  loginTime: string;
}

export interface RewardPointTransaction {
  id: string;
  uhid: string;
  type: 'earned' | 'redeemed';
  points: number;
  title: string;
  date: string;
  sourceType: 'checkup' | 'consultation' | 'procedure' | 'review' | 'bonus';
  treatmentName?: string;
  doctorName?: string;
  voucherCode?: string;
}

export interface RedeemableReward {
  id: string;
  title: string;
  category: 'Cosmetic Dentistry' | 'Smile Makeover' | 'Orthodontics' | 'Preventive Hygiene';
  originalPrice: number;
  discountValue: number;
  discountType: 'fixed' | 'free';
  pointsCost: number;
  description: string;
  treatmentId: string;
  badge?: string;
  highlights: string[];
}

export interface RedeemedVoucher {
  id: string;
  uhid: string;
  voucherCode: string;
  rewardId: string;
  rewardTitle: string;
  treatmentId: string;
  discountValue: number;
  pointsUsed: number;
  redeemedDate: string;
  expiresDate: string;
  status: 'active' | 'used';
}

export interface PatientSmileRewardsSummary {
  uhid: string;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  availablePoints: number;
  transactions: RewardPointTransaction[];
  vouchers: RedeemedVoucher[];
}

