export interface SmileCase {
  id: string;
  title: string;
  subtitle: string;
  category: 'orthodontics' | 'whitening' | 'veneers' | 'implants';
  categoryLabel: string;
  treatmentId: string;
  doctor: string;
  duration: string;
  sessions: string;
  patientProfile: string;
  chiefComplaint: string;
  clinicalSolution: string;
  resultMetrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  patientQuote: string;
  clinicalNote: string;
  recommendedCare: string;
}

export const SMILE_GALLERY_CASES: SmileCase[] = [
  {
    id: 'ortho-crowding-correction',
    title: 'Severe Crowding & Deep Bite Orthodontic Realignment',
    subtitle: 'Ceramic brackets & precision archwires transformed a misaligned bite into a balanced dental arch.',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics & Aligners',
    treatmentId: 'orthodontic-treatment',
    doctor: 'Dr. Vikram Raj Kishore & Dr. Anupriya',
    duration: '14 Months',
    sessions: 'Monthly wire adjustments',
    patientProfile: '24-year-old IT Professional, Hosur',
    chiefComplaint: 'Significant overlapping of upper and lower central incisors causing speech lisp, chewing discomfort, and difficulty flossing.',
    clinicalSolution: 'Non-extraction orthodontic realignment utilizing low-friction ceramic brackets, gradual nickel-titanium leveling wires, and final clear retainers.',
    resultMetrics: [
      { label: 'Arch Alignment', value: '100% Class I', sublabel: 'Ideal occlusion restored' },
      { label: 'Treatment Span', value: '14 Months', sublabel: 'Non-surgical approach' },
      { label: 'Gum Health Score', value: '+45%', sublabel: 'Plaque retention eliminated' },
      { label: 'Retention Plan', value: 'Vivera Trays', sublabel: 'Zero relapse safeguard' }
    ],
    beforeImage: '/src/assets/images/ortho_before_1791905875131.jpg',
    afterImage: '/src/assets/images/ortho_after_1791905891783.jpg',
    beforeLabel: 'Before: Severe Incisor Crowding & Overlap',
    afterLabel: 'After: Symmetrical Arch & Class I Occlusion',
    patientQuote: 'I used to cover my mouth when laughing in office meetings. Within 14 months, Dr. Vikram and Dr. Anupriya gave me a smile I am genuinely proud to show off!',
    clinicalNote: 'Patient completed treatment without any premolar extractions. Gingival margins healed with optimal festooning and pink stippling.',
    recommendedCare: 'Wear clear retainer every night; routine 6-month checkups.'
  },
  {
    id: 'laser-teeth-whitening-stains',
    title: 'In-Clinic Laser Teeth Whitening (8 Shades Lighter)',
    subtitle: 'Safe, enamel-preserving photo-activated bleaching erased years of coffee, tea, and tobacco stains.',
    category: 'whitening',
    categoryLabel: 'Teeth Whitening',
    treatmentId: 'teeth-whitening-bleaching',
    doctor: 'Dr. Anupriya (BDS) & Cosmetic Team',
    duration: '45 Minutes',
    sessions: 'Single chairside visit',
    patientProfile: '29-year-old Marketing Lead, Hosur',
    chiefComplaint: 'Deep stubborn extrinsic and intrinsic enamel yellowing from regular filter coffee and tea consumption ahead of her wedding.',
    clinicalSolution: 'Ultrasonic scaling followed by gum isolation dam and 3 cycles of medical-grade hydrogen peroxide gel activated with cold-blue diode laser light.',
    resultMetrics: [
      { label: 'Shade Improvement', value: '8 Vita Shades', sublabel: 'From A3.5 down to B1' },
      { label: 'Procedure Time', value: '45 Mins', sublabel: 'Immediate single-visit result' },
      { label: 'Enamel Sensitivity', value: '0 / 10', sublabel: 'Desensitizing fluoride coat' },
      { label: 'Longevity', value: '18-24 Mo', sublabel: 'With good oral hygiene' }
    ],
    beforeImage: '/src/assets/images/whitening_before_1791905910622.jpg',
    afterImage: '/src/assets/images/whitening_after_1791905939142.jpg',
    beforeLabel: 'Before: Deep Coffee & Tea Yellow Stains (A3.5)',
    afterLabel: 'After: Luminous Radiant Enamel (B1 Pearly White)',
    patientQuote: 'I was amazed that in just one lunch break, my teeth brightened by 8 whole shades without any sensitivity or tingling. Everyone noticed the difference!',
    clinicalNote: 'Gum barrier completely shielded mucosal tissue from oxidation. Enamel remineralized with ACP desensitizing cream.',
    recommendedCare: 'Avoid dark curries and coffee for 48 hours; use sensitivity-free toothpaste.'
  },
  {
    id: 'porcelain-veneers-smile-makeover',
    title: 'Custom Porcelain Veneers & Midline Diastema Closure',
    subtitle: 'Ultra-thin handcrafted ceramic veneers closed a wide front gap and harmonized asymmetrical teeth.',
    category: 'veneers',
    categoryLabel: 'Cosmetic Veneers',
    treatmentId: 'veneers',
    doctor: 'Dr. Anupriya & Smile Aesthetics Team',
    duration: '10 Days',
    sessions: '2 Clinical visits',
    patientProfile: '34-year-old Business Executive, Hosur',
    chiefComplaint: 'Noticeable 2.8mm gap (diastema) between central incisors, accompanied by uneven, chipped incisal edges and slight enamel thinning.',
    clinicalSolution: 'Minimal prep aesthetic smile design with 4 custom lithium-disilicate (E-Max) porcelain veneers, custom color-matched with natural translucency.',
    resultMetrics: [
      { label: 'Gap Closure', value: '2.8 mm → 0 mm', sublabel: 'Seamless natural contact' },
      { label: 'Visits Required', value: '2 Visits', sublabel: 'Mock-up trial + bonding' },
      { label: 'Porcelain Material', value: 'IPS e.max', sublabel: 'High-strength lithium disilicate' },
      { label: 'Expected Life', value: '15+ Years', sublabel: 'Stain-resistant surface' }
    ],
    beforeImage: '/src/assets/images/veneers_before_1791905963438.jpg',
    afterImage: '/src/assets/images/veneers_after_1791905995097.jpg',
    beforeLabel: 'Before: 2.8mm Midline Diastema & Chipped Edges',
    afterLabel: 'After: Flawless E-Max Veneers with Natural Luster',
    patientQuote: 'The team at Sakthi Dental designed veneers that look completely natural, not like fake Hollywood teeth. The gap is gone and my smile looks effortless.',
    clinicalNote: 'Only 0.3mm enamel contouring was required. Bonded with dual-cure resin cement under dental dam isolation.',
    recommendedCare: 'Brush with non-abrasive gel, wear nightguard if clenching.'
  },
  {
    id: 'implant-premolar-restoration',
    title: 'Titanium Dental Implant & Custom Zirconia Crown',
    subtitle: 'Replaced a missing premolar with a lifelong titanium root foundation and lifelike ceramic crown.',
    category: 'implants',
    categoryLabel: 'Dental Implants',
    treatmentId: 'dental-implants',
    doctor: 'Dr. Ajay Jumar & Dr. Anupriya',
    duration: '3 Months',
    sessions: 'Implant placement + Final crown',
    patientProfile: '42-year-old Teacher, Hosur',
    chiefComplaint: 'Lost upper premolar tooth following an old trauma fracture, causing chewing food difficulties and smile asymmetry.',
    clinicalSolution: 'Computer-guided placement of a biocompatible grade-4 titanium implant followed by 10-week osseointegration and screw-retained zirconia crown.',
    resultMetrics: [
      { label: 'Bite Strength', value: '98% of Natural', sublabel: 'Full masticatory power' },
      { label: 'Osseointegration', value: '100% Solid', sublabel: 'Confirmed on digital OPG' },
      { label: 'Adjacent Teeth', value: '0% Touched', sublabel: 'No grinding like bridges' },
      { label: 'Lifespan', value: 'Lifetime', sublabel: 'With annual checkups' }
    ],
    beforeImage: '/src/assets/images/implant_before_1791906025274.jpg',
    afterImage: '/src/assets/images/implant_after_1791906064644.jpg',
    beforeLabel: 'Before: Missing Upper Premolar Tooth Gap',
    afterLabel: 'After: Full Arch Restored with Zirconia Crown',
    patientQuote: 'I can chew anything now without hesitation. It feels and looks exactly like my real tooth, and no neighbouring teeth had to be damaged.',
    clinicalNote: 'Gingival emergence profile sculpted using custom healing abutment for ideal pink aesthetics.',
    recommendedCare: 'Interdental brush maintenance, routine cleaning every 6 months.'
  }
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Transformations', count: SMILE_GALLERY_CASES.length },
  { id: 'orthodontics', label: 'Orthodontics & Aligners', count: 1 },
  { id: 'whitening', label: 'Teeth Whitening', count: 1 },
  { id: 'veneers', label: 'Cosmetic Veneers', count: 1 },
  { id: 'implants', label: 'Dental Implants', count: 1 }
];
