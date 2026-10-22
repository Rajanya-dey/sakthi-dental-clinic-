export interface CourseModule {
  moduleNumber: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface DoctorCourse {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: 'Specialist Clinical Training' | 'Orthodontics & Aligners' | 'Implantology' | 'Laser Dentistry' | 'Prosthodontics & Aesthetics' | 'Oral & Maxillofacial Surgery' | 'Patient & Family Academy';
  targetAudience: 'Dental Practitioners & Interns' | 'General Dentists' | 'Specialist Fellows' | 'Patients & Families';
  directorName: string;
  directorRole: string;
  directorDegrees: string;
  directorDocId: string;
  directorImage: string;
  duration: string;
  format: 'Hands-On Lab & Live Cases' | 'Weekend Intensive + 3D Scans' | 'Modular Clinical Residency' | 'Interactive Video Series';
  cmeCredits?: string;
  certificateAwarded: string;
  fee: string;
  badge?: string;
  prerequisites: string;
  highlights: string[];
  syllabus: CourseModule[];
  nextBatchDate: string;
  seatsAvailable: number;
  totalSeats: number;
  venue: string;
  rating: number;
  reviewsCount: number;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  profession: string;
  dentalCouncilRegNo?: string;
  selectedBatch: string;
  enrollmentDate: string;
  status: 'Confirmed' | 'Pending Review';
  feePaid: string;
  confirmationCode: string;
}

export const DOCTOR_COURSES: DoctorCourse[] = [
  {
    id: 'course-endodontics-fellowship',
    title: 'Advanced Clinical Fellowship in Single-Sitting Rotary Endodontics',
    subtitle: 'Microscopic canal localization, rotary glidepath biomechanics, and warm vertical bioceramic obturation.',
    shortDescription: 'Comprehensive hands-on course taught by Dr. Meera Subramanian and Dr. Anupriya. Master single-visit root canals with zero post-operative flares.',
    category: 'Specialist Clinical Training',
    targetAudience: 'General Dentists',
    directorName: 'Dr. Meera Subramanian',
    directorRole: 'Consultant Endodontist & Preservative Specialist',
    directorDegrees: 'MDS (Conservative Dentistry & Endodontics)',
    directorDocId: 'doc-3',
    directorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    duration: '4-Week Intensive Module (Weekends)',
    format: 'Hands-On Lab & Live Cases',
    cmeCredits: '30 DCI Accredited CDE Points',
    certificateAwarded: 'Fellowship Certificate in Advanced Clinical Endodontics',
    fee: '₹28,500 (Includes Typodont Lab Kit & Rotary Files)',
    badge: 'Flagship Clinical Course',
    prerequisites: 'BDS Degree or Registered Dental Practitioner License',
    nextBatchDate: 'November 14, 2026',
    seatsAvailable: 3,
    totalSeats: 10,
    venue: 'Sakthi Dental Operatory & Simulation Lab, Anthivadi, Hosur',
    rating: 4.9,
    reviewsCount: 42,
    highlights: [
      'Hands-on practice on 3D transparent root canal models and extracted teeth',
      'Operating dental surgical microscope and high-magnification loupes',
      'Management of calcified canals, curved roots, and broken instrument retrieval',
      'Live patient demonstration under rubber dam isolation at Hosur clinical operatory'
    ],
    syllabus: [
      {
        moduleNumber: 'Module 01',
        title: '3D CBCT Endodontic Anatomy & Access Cavity Blueprint',
        duration: 'Week 1 (8 Hours)',
        topics: [
          'Locating hidden MB2 canals in maxillary molars under magnification',
          'Minimally invasive endodontic access preserving pericervical dentin',
          'Ultrasonic troughing tips for pulp stones and calcified chambers'
        ]
      },
      {
        moduleNumber: 'Module 02',
        title: 'Rotary Metallurgy, Glidepath & Sonic Chemo-Mechanical Irrigation',
        duration: 'Week 2 (8 Hours)',
        topics: [
          'CM-Wire, Blue, and Gold heat-treated rotary and reciprocating file systems',
          'Eliminating cyclic fatigue and torsional stress to prevent file separation',
          'Negative apical pressure and ultrasonic activation of 5.25% NaOCl and 17% EDTA'
        ]
      },
      {
        moduleNumber: 'Module 03',
        title: 'Warm Vertical Bioceramic Sealer Obturation Techniques',
        duration: 'Week 3 (8 Hours)',
        topics: [
          'Single-cone hydraulic bioceramic sealer techniques vs Continuous Wave compaction',
          '3D hermetic sealing of lateral canals and apical deltas',
          'Immediate post-endodontic coronal seal and fiber-post placement'
        ]
      },
      {
        moduleNumber: 'Module 04',
        title: 'Live Clinical Cases & Management of Flare-Ups',
        duration: 'Week 4 (8 Hours)',
        topics: [
          'Chairside clinical mentorship on live clinic patients in Hosur',
          'Pain management protocols and single-visit analgesia strategies',
          'Case presentation, certificate award & post-course 6-month clinical mentorship group'
        ]
      }
    ]
  },
  {
    id: 'course-clear-aligners',
    title: 'Digital Clear Aligners & 3D Biomechanics Certification Course',
    subtitle: 'From intraoral digital scans to staging attachments, IPR planning, and digital time-lapse setup.',
    shortDescription: 'Master modern invisible orthodontic aligners with Dr. Sneha N. Learn how to plan, prescribe, and finish complex malocclusion cases predictably.',
    category: 'Orthodontics & Aligners',
    targetAudience: 'Dental Practitioners & Interns',
    directorName: 'Dr. Sneha N',
    directorRole: 'Consultant Orthodontist & Dentofacial Specialist',
    directorDegrees: 'MDS (Orthodontics & Dentofacial Orthopedics)',
    directorDocId: 'doc-5',
    directorImage: '/src/assets/images/dr_sneha_n_1791794838868.jpg',
    duration: '2-Day Weekend Masterclass',
    format: 'Weekend Intensive + 3D Scans',
    cmeCredits: '16 CDE Credit Points',
    certificateAwarded: 'Certified Clear Aligner Clinical Partner Certificate',
    fee: '₹18,000 (Includes 3D Digital Scan Software License & Demo Models)',
    badge: 'Popular High-Demand',
    prerequisites: 'BDS / MDS (General Dentists or Orthodontic Residents)',
    nextBatchDate: 'November 28, 2026',
    seatsAvailable: 5,
    totalSeats: 12,
    venue: 'Sakthi Digital Dentistry Suite, Hosur',
    rating: 4.8,
    reviewsCount: 36,
    highlights: [
      'Intraoral digital 3D scanning hands-on practice using modern scanners',
      'Step-by-step Interproximal Reduction (IPR) calibration and attachment placement',
      'Direct software review of patient tooth movement staging and collision detection',
      'Clinical mentorship on your first 3 patient aligner cases at Sakthi Clinic'
    ],
    syllabus: [
      {
        moduleNumber: 'Day 01 - Morning',
        title: 'Clear Aligner Biomechanics vs Traditional Fixed Braces',
        duration: '4 Hours',
        topics: [
          'Force-driven vs shape-driven aligner mechanics',
          'Case selection: Spacing, crowding, rotations, deep bites, and open bites',
          'Understanding extrusion vs intrusion biomechanical limitations'
        ]
      },
      {
        moduleNumber: 'Day 01 - Afternoon',
        title: 'Digital 3D Intraoral Scanning & Setup Prescription',
        duration: '4 Hours',
        topics: [
          'Live scanning technique to eliminate voids and occlusal overlap errors',
          'Writing precise doctor prescription notes for digital design technicians',
          'Evaluating 3D digital tooth movements in virtual treatment software'
        ]
      },
      {
        moduleNumber: 'Day 02 - Morning',
        title: 'Attachments, Auxiliary Mechanics & Interproximal Reduction (IPR)',
        duration: '4 Hours',
        topics: [
          'Optimized attachment placement using template aligners and micro-hybrid resin',
          'Safe IPR protocols: Diamond strips, oscillating discs, and digital thickness gauges',
          'Using elastic buttons and precision cutouts for Class II / III elastics'
        ]
      },
      {
        moduleNumber: 'Day 02 - Afternoon',
        title: 'Troubleshooting Mid-Course Tracking Errors & Finishing',
        duration: '4 Hours',
        topics: [
          'Diagnosing non-tracking teeth and ordering refinement aligner trays',
          'Finishing aesthetic occlusal detailing and settling bites',
          'Fixed lingual retainers vs thermoformed clear retainers for lifelong stability'
        ]
      }
    ]
  },
  {
    id: 'course-implantology-residency',
    title: 'Comprehensive Oral Implantology & Bone Grafting Clinical Course',
    subtitle: 'From diagnostic CBCT radiology and surgical flap design to guided implant osteotomy and prosthetic loading.',
    shortDescription: 'Six-month modular clinical residency led by Dr. Srinivas Rohit Ramanujam. Place titanium implants on live patients with 1-on-1 surgical guidance.',
    category: 'Implantology',
    targetAudience: 'Specialist Fellows',
    directorName: 'Dr. Srinivas Rohit Ramanujam',
    directorRole: 'Implantologist & Clinical Director',
    directorDegrees: 'MDS, Diplomate in Oral Implantology (ICOI)',
    directorDocId: 'doc-6',
    directorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    duration: '6-Month Modular Residency (6 Weekends)',
    format: 'Modular Clinical Residency',
    cmeCredits: '45 CDE Credit Points',
    certificateAwarded: 'Fellowship Diplomate in Clinical Oral Implantology',
    fee: '₹55,000 (Includes 2 Live Patient Implants & Surgical Motor Kit Usage)',
    badge: 'Comprehensive Surgical Residency',
    prerequisites: 'BDS Degree with Minimum 1 Year Clinical Practice Experience',
    nextBatchDate: 'December 05, 2026',
    seatsAvailable: 2,
    totalSeats: 8,
    venue: 'Sakthi Implant Surgical Theatre & Operatory, Hosur',
    rating: 5.0,
    reviewsCount: 29,
    highlights: [
      'Perform surgical placement of 2 implants on patients under direct surgeon supervision',
      'CBCT radiograph planning with 3D bone mapping and virtual implant positioning',
      'Hands-on animal jaw bone grafting and collagen membrane suturing lab',
      'Prosthetic workflow: Impression copings, screw vs cement-retained crowns'
    ],
    syllabus: [
      {
        moduleNumber: 'Module 01 & 02',
        title: 'Applied Anatomy, CBCT Mapping & Surgical Principles',
        duration: 'Month 1 & 2',
        topics: [
          'Bone quality (D1–D4), vital structures: Inferior alveolar nerve and maxillary sinus',
          'Surgical armamentarium, implant motor calibration, and aseptic theatre protocols',
          'Flap designs, papilla preservation, and continuous locking suturing techniques'
        ]
      },
      {
        moduleNumber: 'Module 03 & 04',
        title: 'Live Surgical Osteotomy & Guided Immediate Implants',
        duration: 'Month 3 & 4',
        topics: [
          'Drilling protocols: Pilot drills, shaping drills, and torque measurement',
          'Immediate socket implant placement vs delayed loading protocols',
          'Particulate bone grafting, PRF (Platelet-Rich Fibrin) preparation, and membrane fixation'
        ]
      },
      {
        moduleNumber: 'Module 05 & 06',
        title: 'Implant Prosthetics, Occlusion & Peri-Implantitis Defense',
        duration: 'Month 5 & 6',
        topics: [
          'Second-stage uncovery surgery and healing abutment placement',
          'Open-tray vs closed-tray implant impressions and digital scan bodies',
          'Bio-mechanical occlusion, torqueing screws to 35 Ncm, and managing peri-implant mucositis'
        ]
      }
    ]
  },
  {
    id: 'course-laser-dentistry',
    title: 'Dental Laser Surgery & Periodontal Aesthetics Master Course',
    subtitle: 'Minimally invasive 810nm/980nm diode laser surgery for painless gingival sculpting and bio-stimulation.',
    shortDescription: 'Master dental laser wavelengths with Dr. Balu. Perform bloodless gingivectomies, frenectomies, and periodontal pocket decontamination without stitches.',
    category: 'Laser Dentistry',
    targetAudience: 'General Dentists',
    directorName: 'Dr. Balu',
    directorRole: 'Consultant Laser Dental Surgeon',
    directorDegrees: 'MDS, Certified Dental Laser Specialist',
    directorDocId: 'doc-7',
    directorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    duration: '3-Day Hands-On Workshop',
    format: 'Hands-On Lab & Live Cases',
    cmeCredits: '18 CDE Points',
    certificateAwarded: 'Certified Dental Laser Practitioner Certificate',
    fee: '₹16,500 (Includes Laser Safety Goggles & Optical Fiber Stripping Kit)',
    badge: 'Minimally Invasive Tech',
    prerequisites: 'BDS / MDS Dental Qualification',
    nextBatchDate: 'November 20, 2026',
    seatsAvailable: 4,
    totalSeats: 10,
    venue: 'Sakthi Laser & Soft-Tissue Suite, Hosur',
    rating: 4.9,
    reviewsCount: 31,
    highlights: [
      'Hands-on tissue ablation exercises on porcine models using 810nm/980nm lasers',
      'Painless cosmetic gum depigmentation for dark hyperpigmented gingiva',
      'Bloodless aesthetic smile line recontouring prior to porcelain veneers',
      'Low-Level Laser Therapy (LLLT / PBM) for instant TMJ pain relief and ulcer healing'
    ],
    syllabus: [
      {
        moduleNumber: 'Day 01',
        title: 'Laser Physics, Laser-Tissue Interaction & Safety Standards',
        duration: 'Full Day',
        topics: [
          'Photothermal, photomechanical, and photochemical tissue absorption curves',
          'Laser safety: Eye protection, smoke evacuation, and thermal relaxation time',
          'Optical fiber cleaving, initiation, and power settings (Continuous vs Pulsed)'
        ]
      },
      {
        moduleNumber: 'Day 02',
        title: 'Soft Tissue Surgical Procedures (Hands-on Lab)',
        duration: 'Full Day',
        topics: [
          'Laser gingivectomy and aesthetic crown lengthening without bleeding',
          'Labial and lingual frenectomy in infants and adolescents with zero sutures',
          'Operculectomy, fibroma excision, and troughing for crown impressions'
        ]
      },
      {
        moduleNumber: 'Day 03',
        title: 'Laser Periodontics, Bleaching & Photobiomodulation (PBM)',
        duration: 'Full Day',
        topics: [
          'Laser-assisted subgingival bacterial reduction in deep periodontal pockets',
          'Laser-activated power teeth whitening for rapid stain breakdown',
          'LLLT protocols for post-extraction healing, nerve regeneration, and aphthous ulcers'
        ]
      }
    ]
  },
  {
    id: 'course-prostho-veneers',
    title: 'Aesthetic Porcelain Veneers & Full-Mouth Rehabilitation Clinical Course',
    subtitle: 'Smile design principles, minimally invasive tooth preparation, silicone matrix mockups, and resin luting protocols.',
    shortDescription: 'Taught by Dr. Ananya Iyer. Master the fine science of cosmetic smile makeovers, digital wax-ups, monolithic zirconia bridges, and aesthetic ceramic bonding.',
    category: 'Prosthodontics & Aesthetics',
    targetAudience: 'General Dentists',
    directorName: 'Dr. Ananya Iyer',
    directorRole: 'Consultant Prosthodontist & Aesthetic Specialist',
    directorDegrees: 'MDS (Prosthodontics and Crown & Bridge)',
    directorDocId: 'doc-2',
    directorImage: '/src/assets/images/dr_ananya_iyer_1791794816364.jpg',
    duration: '3-Day Hands-On & Typodont Lab',
    format: 'Hands-On Lab & Live Cases',
    cmeCredits: '20 CDE Credit Points',
    certificateAwarded: 'Certificate of Excellence in Aesthetic Prosthodontics & Veneers',
    fee: '₹22,000 (Includes Typodont Model, Diamond Bur Kits & Resin Cements)',
    badge: 'Aesthetic Mastery',
    prerequisites: 'BDS Degree or Registered Dental Practitioner',
    nextBatchDate: 'December 12, 2026',
    seatsAvailable: 4,
    totalSeats: 12,
    venue: 'Sakthi Prosthodontics Lab, Hosur',
    rating: 4.9,
    reviewsCount: 27,
    highlights: [
      'Facial aesthetic analysis: Golden proportion, incisal display, and gingival zenith curves',
      'Step-by-step veneer preparation: Window prep, feather edge vs butt joint incisal reduction',
      'Fabricating aesthetic bis-acrylic provisional veneers with direct silicone putty matrix',
      'Adhesive cementation: Rubber dam isolation, silane coupling agent, and light-cure resin luting'
    ],
    syllabus: [
      {
        moduleNumber: 'Day 01',
        title: 'Facial Aesthetics, Photography & Diagnostic Mock-Up',
        duration: 'Full Day',
        topics: [
          'Dental digital photography protocols: 1:1 macro views and aesthetic portraits',
          'Diagnostic wax-up transfer to patient mouth via bis-acrylic preview',
          'Occlusal vertical dimension (OVD) evaluation in worn dentition cases'
        ]
      },
      {
        moduleNumber: 'Day 02',
        title: 'Precision Veneer & Crown Preparations (Typodont Lab)',
        duration: 'Full Day',
        topics: [
          'Depth-cutter diamond burs for conservative 0.3mm–0.5mm enamel-only preparations',
          'Gingival retraction cord packing techniques (Double-cord technique)',
          'Elastomeric addition silicone (PVS) dual-phase impression taking'
        ]
      },
      {
        moduleNumber: 'Day 03',
        title: 'Try-in Pastes, Shade Matching & Adhesive Luting Protocols',
        duration: 'Full Day',
        topics: [
          'Color-matched water-soluble try-in pastes to preview final aesthetics',
          'Hydrofluoric acid (HF 9%) ceramic etching and silanization steps',
          'Total-etch enamel bonding, light curing angles, and clean-up of excess cured resin'
        ]
      }
    ]
  },
  {
    id: 'course-maxillofacial-surgery',
    title: 'Minor Oral Surgery & Impacted Wisdom Tooth Clinical Masterclass',
    subtitle: 'Flap design, surgical guttering, tooth sectioning biomechanics, and nerve preservation in third molar impactions.',
    shortDescription: 'Hands-on surgical training under Dr. Ajay Jumar. Eliminate anxiety in extracting deeply impacted mandibular third molars with zero alveolar nerve injury.',
    category: 'Oral & Maxillofacial Surgery',
    targetAudience: 'Dental Practitioners & Interns',
    directorName: 'Dr. Ajay Jumar',
    directorRole: 'Consultant Oral & Maxillofacial Surgeon',
    directorDegrees: 'MDS (Oral & Maxillofacial Surgery)',
    directorDocId: 'doc-9',
    directorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    duration: '2-Day Weekend Surgical Workshop',
    format: 'Hands-On Lab & Live Cases',
    cmeCredits: '18 CDE Points',
    certificateAwarded: 'Fellowship Certificate in Clinical Minor Oral Surgery',
    fee: '₹19,500 (Includes Surgical Elevator Kit, Bone Burs & Suturing Pad)',
    badge: 'High Surgical Value',
    prerequisites: 'BDS Degree or Final-Year Dental Intern',
    nextBatchDate: 'December 19, 2026',
    seatsAvailable: 3,
    totalSeats: 10,
    venue: 'Sakthi Oral Surgery Operatory, Anthivadi, Hosur',
    rating: 5.0,
    reviewsCount: 34,
    highlights: [
      'Pell & Gregory and Winter classification radiograph interpretation on OPG & CBCT',
      'Ward’s incision and envelope flap elevation without tearing delicate lingual tissues',
      'High-speed 45-degree surgical handpiece bone guttering without air emphysema risk',
      'Advanced resorbable and non-resorbable cross-mattress suturing lab on model gums'
    ],
    syllabus: [
      {
        moduleNumber: 'Day 01',
        title: 'Radiographic Risk Assessment & Surgical Flap Mechanics',
        duration: 'Full Day',
        topics: [
          'Identifying radiological signs of inferior alveolar nerve proximity (Darkening, diversion)',
          'Local anesthesia techniques: Gow-Gates, Vazirani-Akinosi and classical IAN blocks',
          'Design of triangular flaps, periosteal elevators, and protecting the lingual nerve'
        ]
      },
      {
        moduleNumber: 'Day 02',
        title: 'Crown Sectioning, Root Elevation & Post-Surgical Healing',
        duration: 'Full Day',
        topics: [
          'Crown sectioning techniques: T-section, horizontal split, and individual root delivery',
          'Luxators vs straight elevators: Using bone as fulcrum safely without alveolar fracture',
          'Management of dry socket (alveolitis), socket preservation, and postoperative analgesia'
        ]
      }
    ]
  },
  {
    id: 'course-patient-wellness-academy',
    title: 'Doctor-Guided "Smile for Life" Patient Dental Health Course',
    subtitle: 'A certified 5-module oral health video course created by Dr. Anupriya for families, expectant mothers, and kids.',
    shortDescription: 'Free community wellness education course designed by our clinic founders. Learn clinical truths about enamel repair, sensitivity, cavity prevention, and emergency first aid.',
    category: 'Patient & Family Academy',
    targetAudience: 'Patients & Families',
    directorName: 'Dr. Anupriya',
    directorRole: 'Founder & Chief Dental Surgeon',
    directorDegrees: 'BDS, Senior Dental Consultant (20+ Yrs Practice)',
    directorDocId: 'doc-1',
    directorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    duration: '5 Self-Paced Interactive Modules (1 Hour Total)',
    format: 'Interactive Video Series',
    certificateAwarded: 'Sakthi Dental Wellness Ambassador Certificate',
    fee: '100% Free Public Health Course',
    badge: 'Free Community Course',
    prerequisites: 'Open to all patients, parents, and Hosur residents',
    nextBatchDate: 'Instant Self-Paced Access (Always Open)',
    seatsAvailable: 999,
    totalSeats: 1000,
    venue: 'Sakthi Dental Online Patient Portal & Clinic Seminar Hall',
    rating: 4.9,
    reviewsCount: 156,
    highlights: [
      'Doctor video explanations debunking dangerous internet dental home remedies',
      'Step-by-step modified Bass brushing and interdental flossing demonstrations',
      'Pediatric sugar defense: Preventing nursing bottle decay in infants and toddlers',
      'Dental emergency action plan: What to do if an adult tooth gets knocked out'
    ],
    syllabus: [
      {
        moduleNumber: 'Lesson 01',
        title: 'Understanding Enamel & The Acid Attack Cycle',
        duration: '12 Mins',
        topics: [
          'How bacterial plaque converts carbohydrates into destructive lactic acid',
          'Why brushing right after acidic drinks strips softened enamel away',
          'How fluoride and saliva naturally remineralize microscopic enamel lesions'
        ]
      },
      {
        moduleNumber: 'Lesson 02',
        title: 'Mastering the 2-Minute Modified Bass Brushing & Flossing',
        duration: '14 Mins',
        topics: [
          '45-degree angle technique to clean the gingival sulcus where 90% of gum disease starts',
          'Manual vs sonic electric toothbrushes: When is an upgrade worth it?',
          'Water flossers vs string floss: Choosing the right tool for tight contacts'
        ]
      },
      {
        moduleNumber: 'Lesson 03',
        title: 'Pediatric Dental Milestones & Preventing Early Cavities',
        duration: '15 Mins',
        topics: [
          'Teething comfort remedies and first dental checkup by age 1',
          'Preventing nursing bottle caries and thumb-sucking jaw deformities',
          'How 15-minute pit-and-fissure sealants protect 6-year permanent molars'
        ]
      },
      {
        moduleNumber: 'Lesson 04',
        title: 'Dental First Aid: Chipped Teeth, Toothaches & Knocked-Out Teeth',
        duration: '10 Mins',
        topics: [
          'The 60-Minute Golden Window: How to store a knocked-out tooth in cold milk',
          'Immediate temporary relief for severe throbbing nighttime toothaches',
          'Recognizing dental emergencies that require our 24/7 Hosur helpline'
        ]
      },
      {
        moduleNumber: 'Lesson 05',
        title: 'Cosmetic Dentistry, Aligners & Lifetime Maintenance',
        duration: '12 Mins',
        topics: [
          'Debunking scaling myths: Why ultrasonic cleaning does not loosen teeth',
          'Comparing clear aligners with braces for adults and teenagers',
          'Graduation quiz & downloading your Sakthi Dental Wellness Certificate'
        ]
      }
    ]
  }
];
