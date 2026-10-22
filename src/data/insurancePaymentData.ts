export interface InsuranceProvider {
  id: string;
  name: string;
  type: 'Insurer' | 'TPA' | 'Corporate Network';
  badge: string;
  logoText: string;
  logoUrl: string;
  cashlessSupport: boolean;
  reimbursementSpeed: string;
  coverageTypes: string[];
}

export const ACCEPTED_INSURANCES: InsuranceProvider[] = [
  {
    id: 'star-health',
    name: 'Star Health & Allied Insurance',
    type: 'Insurer',
    badge: 'Direct Cashless & Reimbursement',
    logoText: 'STAR',
    logoUrl: '/src/assets/images/star_health_logo_1791989225589.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '24-48 Hours',
    coverageTypes: ['Accidental dental trauma', 'Surgical tooth extractions', 'Cyst enucleation', 'Periodontal flap surgeries']
  },
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO Health Insurance',
    type: 'Insurer',
    badge: 'Instant TPA Desk',
    logoText: 'HDFC',
    logoUrl: '/src/assets/images/hdfc_ergo_logo_1791989269242.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '2-3 Business Days',
    coverageTypes: ['Oral surgeries under anesthesia', 'Dental trauma & emergency', 'Inpatient maxillo-facial procedures']
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General Insurance',
    type: 'Insurer',
    badge: 'Cashless Preferred',
    logoText: 'ICICI',
    logoUrl: '/src/assets/images/icici_lombard_logo_1791989307100.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '48 Hours',
    coverageTypes: ['OPD dental cover policies', 'Accidental dental trauma', 'Oral surgical corrections']
  },
  {
    id: 'care-health',
    name: 'Care Health Insurance (Religare)',
    type: 'Insurer',
    badge: 'Fast Pre-Auth',
    logoText: 'CARE',
    logoUrl: '/src/assets/images/care_health_logo_1791989412484.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '24 Hours',
    coverageTypes: ['OPD dental riders', 'Emergency extractions & abscess management', 'Hospitalized surgical care']
  },
  {
    id: 'bajaj-allianz',
    name: 'Bajaj Allianz General Insurance',
    type: 'Insurer',
    badge: 'Cashless & Reimbursement',
    logoText: 'BAJAJ',
    logoUrl: '/src/assets/images/bajaj_allianz_logo_1791989351998.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '48 Hours',
    coverageTypes: ['Accidental maxillofacial repair', 'Daycare surgical procedures', 'Comprehensive dental riders']
  },
  {
    id: 'niva-bupa',
    name: 'Niva Bupa Health Insurance (Max Bupa)',
    type: 'Insurer',
    badge: 'Digital Claims',
    logoText: 'NIVA',
    logoUrl: '/src/assets/images/niva_bupa_logo_1791989460086.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '3-4 Business Days',
    coverageTypes: ['Dental health riders', 'Accident emergency relief', 'Surgical periodontal treatment']
  },
  {
    id: 'medi-assist',
    name: 'Medi Assist TPA',
    type: 'TPA',
    badge: 'Corporate TPA Desk',
    logoText: 'MEDI',
    logoUrl: '/src/assets/images/medi_assist_logo_1791989537499.jpg',
    cashlessSupport: true,
    reimbursementSpeed: 'Instant E-Approval',
    coverageTypes: ['TVS, Ashok Leyland & SIPCOT corporate dental allowances', 'OPD reimbursements', 'Daycare surgical']
  },
  {
    id: 'vidal-health',
    name: 'Vidal Health TPA',
    type: 'TPA',
    badge: 'Digital TPA Gateway',
    logoText: 'VIDAL',
    logoUrl: '/src/assets/images/vidal_health_logo_1791989592852.jpg',
    cashlessSupport: true,
    reimbursementSpeed: '24-48 Hours',
    coverageTypes: ['Titan, Tata & Infosys employee dental plans', 'Pre-authorized surgical extractions']
  }
];

export interface EmiPlan {
  id: string;
  partner: string;
  name: string;
  interestRate: string;
  tenures: string;
  minAmount: number;
  highlight: string;
  features: string[];
}

export const EMI_OPTIONS: EmiPlan[] = [
  {
    id: 'bajaj-finserv',
    partner: 'Bajaj Finserv Health EMI',
    name: '0% Interest Insta EMI Network Card',
    interestRate: '0% Interest (Zero Cost)',
    tenures: '3, 6, 9, 12 Months',
    minAmount: 5000,
    highlight: 'Instant Approval in 2 Mins',
    features: [
      'No hidden charges or processing fees',
      'Instant digital OTP verification with your mobile number',
      'Covers Aligners, Braces, Implants & Smile Makeovers',
      'Zero documentation required for existing card holders'
    ]
  },
  {
    id: 'bank-cards',
    partner: 'Leading Bank Credit & Debit Cards',
    name: 'No-Cost & Low-Cost Bank EMI',
    interestRate: '0% on select tenures',
    tenures: '3, 6, 9, 12, 18 Months',
    minAmount: 4000,
    highlight: 'HDFC, ICICI, SBI, Axis, Kotak',
    features: [
      'Supported on both Credit Cards and Pre-Approved Debit Cards',
      'Convenient monthly auto-debit directly through your bank',
      'Instant machine swipe conversion at our front reception',
      'Flexible tenures tailored to your household budget'
    ]
  },
  {
    id: 'in-house-milestone',
    partner: 'Sakthi Dental Clinic CarePay',
    name: 'Clinic In-House Milestone Installments',
    interestRate: '0% Interest (Direct Clinic Credit)',
    tenures: 'Pay per visit / stage',
    minAmount: 3000,
    highlight: 'Zero Credit Card or CIBIL Required',
    features: [
      'Pay 30% initial down payment to initiate your treatment',
      'Remaining balance divided across your routine review visits',
      'Ideal for Orthodontic wire changes & Clear Aligner batch collections',
      'Available to all families treated at Sakthi Dental Clinic'
    ]
  }
];

export interface TreatmentEstimate {
  id: string;
  treatmentName: string;
  category: string;
  typicalCost: number;
  insuranceLikelihood: 'High (Medical/Accident)' | 'Conditional (OPD Rider)' | 'EMI Recommended (Cosmetic/Elective)';
  emiStartingFrom: number;
  suggestedTenure: number;
}

export const TREATMENT_FINANCIAL_ESTIMATES: TreatmentEstimate[] = [
  {
    id: 'orthodontic-treatment',
    treatmentName: 'Orthodontic Braces (Metal & Ceramic)',
    category: 'Orthodontics',
    typicalCost: 32000,
    insuranceLikelihood: 'EMI Recommended (Cosmetic/Elective)',
    emiStartingFrom: 2667,
    suggestedTenure: 12
  },
  {
    id: 'clear-aligners',
    treatmentName: 'Custom Clear Aligners (Invisible Trays)',
    category: 'Orthodontics',
    typicalCost: 65000,
    insuranceLikelihood: 'EMI Recommended (Cosmetic/Elective)',
    emiStartingFrom: 5417,
    suggestedTenure: 12
  },
  {
    id: 'dental-implants',
    treatmentName: 'Titanium Dental Implant & Ceramic Crown',
    category: 'Surgery',
    typicalCost: 28000,
    insuranceLikelihood: 'Conditional (OPD Rider)',
    emiStartingFrom: 3111,
    suggestedTenure: 9
  },
  {
    id: 'teeth-whitening-bleaching',
    treatmentName: 'In-Clinic Laser Teeth Whitening (Bleaching)',
    category: 'Cosmetic',
    typicalCost: 8500,
    insuranceLikelihood: 'EMI Recommended (Cosmetic/Elective)',
    emiStartingFrom: 1417,
    suggestedTenure: 6
  },
  {
    id: 'veneers',
    treatmentName: 'Porcelain Smile Makeover (E-Max Veneers)',
    category: 'Cosmetic',
    typicalCost: 36000,
    insuranceLikelihood: 'EMI Recommended (Cosmetic/Elective)',
    emiStartingFrom: 3000,
    suggestedTenure: 12
  },
  {
    id: 'root-canal-therapy',
    treatmentName: 'Laser Root Canal Therapy + Zirconia Crown',
    category: 'General',
    typicalCost: 9500,
    insuranceLikelihood: 'High (Medical/Accident)',
    emiStartingFrom: 1583,
    suggestedTenure: 6
  },
  {
    id: 'wisdom-tooth-extraction',
    treatmentName: 'Surgical Impacted Wisdom Tooth Extraction',
    category: 'Surgery',
    typicalCost: 5500,
    insuranceLikelihood: 'High (Medical/Accident)',
    emiStartingFrom: 1833,
    suggestedTenure: 3
  },
  {
    id: 'flap-surgery',
    treatmentName: 'Deep Periodontal Flap Surgery (Quad)',
    category: 'Surgery',
    typicalCost: 14000,
    insuranceLikelihood: 'High (Medical/Accident)',
    emiStartingFrom: 2333,
    suggestedTenure: 6
  }
];

export const INSURANCE_FAQS = [
  {
    q: 'Does standard health insurance cover dental treatments in Hosur?',
    a: 'Most standard Indian health insurance policies cover dental treatments resulting from accidental bodily injury, trauma, or medical hospitalization, as well as complex oral maxillofacial surgeries and cyst enucleations. Routine dental care (like root canals, extractions, and periodontal surgery) is covered if your policy includes an OPD Dental Rider or through corporate group health policies (e.g. TVS, Ashok Leyland, Titan employees). We provide complete ICD-10 coded clinical documentation to support quick reimbursement!'
  },
  {
    q: 'Can cosmetic treatments like Teeth Whitening, Veneers, or Braces be claimed under insurance?',
    a: 'Elective aesthetic procedures like teeth whitening, cosmetic veneers, and standard orthodontic aligners are generally classified as cosmetic by health insurers and excluded from standard medical insurance. However, our 0% Interest EMI plans allow you to divide the cost into comfortable monthly payments of ₹1,400 to ₹5,400 per month with zero interest or processing markup!'
  },
  {
    q: 'What documents are required to avail 0% Interest EMI at Sakthi Dental Clinic?',
    a: 'For Bajaj Finserv or bank card EMIs, you only need your Aadhaar card, PAN card, and an active mobile number linked with your bank for OTP verification. If you choose our In-House Clinic Milestone installment plan, no credit checks or bank approvals are required—simply pay 30% upfront and spread the remainder across your appointment milestones.'
  },
  {
    q: 'How does the cashless / reimbursement claim process work at the clinic?',
    a: 'Our front-desk billing coordinator provides you with: 1) Itemized official tax invoice, 2) Signed medical certificate with clinical diagnosis by Dr. Anupriya, 3) High-resolution digital dental X-rays (IOPA / OPG), and 4) Filled claim form. For cashless TPA corporate admissions, we assist with immediate pre-authorization submission.'
  }
];
