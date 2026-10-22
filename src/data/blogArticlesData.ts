export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorDocId?: string;
  readTime: string;
  publishedDate: string;
  category: 'Preventive' | 'Orthodontics' | 'Cosmetic' | 'Surgery' | 'Endodontics' | 'Pediatric' | 'Insurance & Finance';
  tags: string[];
  relatedTreatmentId: string;
  relatedTreatmentName: string;
  relatedPages: string[]; // e.g. ['home', 'treatments', 'gallery', 'faqs', 'facilities', 'portal', 'about']
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  clinicalQuote?: {
    text: string;
    doctorName: string;
  };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'scaling-myths-debunked',
    slug: 'does-teeth-scaling-loosen-teeth',
    title: 'Does Teeth Scaling Loosen Teeth or Enamel? Debunking Common Dental Myths',
    subtitle: 'A clinical explanation of why ultrasonic tartar removal protects gums rather than widening gaps.',
    excerpt: 'Many patients in Hosur worry that dental cleaning will scrape away enamel or make teeth loose. Dr. Anupriya explains how ultrasonic scaling works and why hardened tartar is your gums’ actual enemy.',
    author: 'Dr. Anupriya',
    authorRole: 'Founder & Chief Dental Surgeon',
    authorDocId: 'doc-1',
    readTime: '3 min read',
    publishedDate: 'Oct 10, 2026',
    category: 'Preventive',
    tags: ['Scaling', 'Gum Health', 'Tartar Removal', 'Preventive Care'],
    relatedTreatmentId: 'teeth-cleaning-scaling',
    relatedTreatmentName: 'Teeth Cleaning or Scaling',
    relatedPages: ['home', 'treatments', 'faqs', 'about', 'facilities'],
    keyTakeaways: [
      'Ultrasonic instruments vibrate at micro-frequencies to shatter calcified calculus without cutting or thinning natural enamel.',
      'Teeth feel slightly spaced after heavy cleaning because swollen gums heal and calcified calculus deposits are cleared.',
      'Regular scaling once every 6 months prevents bone loss and irreversible gingival recession.'
    ],
    sections: [
      {
        heading: 'The Misconception Around Scaling & Enamel Wear',
        body: 'A persistent myth among patients is that professional dental scaling mechanically grinds away enamel or weakens teeth. In reality, dental enamel is the hardest biological substance in the human body. Our modern ultrasonic scaling tips do not have sharp cutting blades; instead, they emit micro-acoustic vibrations lubricated with purified water to gently disintegrate calcified tartar and bio-films without abrading tooth structure.'
      },
      {
        heading: 'Why Do Teeth Sometimes Feel Different After Deep Cleaning?',
        body: 'When thick calculus has accumulated over years, it acts like artificial cement bridging teeth together while silently causing underlying alveolar bone loss. Once removed, patients notice natural anatomical spaces between teeth that were previously blocked by bacterial plaque. Furthermore, as inflamed gums heal and tighten back onto root surfaces, the sensation normalizes within 48 to 72 hours.'
      },
      {
        heading: 'Doctor Recommendation',
        body: 'At Sakthi Dental Clinic, we utilize low-vibration ultrasonic scaling combined with gentle fluoride polishing. We recommend a checkup and maintenance scaling every 6 months to safeguard your gum health for life.'
      }
    ],
    clinicalQuote: {
      text: 'Leaving hardened calculus on teeth is what truly causes loose teeth and bone resorption. Scaling stops that progression immediately.',
      doctorName: 'Dr. Anupriya (Chief Surgeon)'
    }
  },
  {
    id: 'clear-aligners-vs-braces',
    slug: 'clear-aligners-vs-ceramic-braces',
    title: 'Clear Aligners vs Ceramic Braces: Which Is Right for Adults in Hosur?',
    subtitle: 'A comparative clinical analysis of comfort, treatment duration, and discreet aesthetics.',
    excerpt: 'Considering orthodontic correction as a working adult or college student? Dr. Sneha breaks down the real differences in visibility, dietary freedom, adjustment frequency, and clinical outcomes.',
    author: 'Dr. Sneha N',
    authorRole: 'Consultant Orthodontist & Dentofacial Specialist',
    authorDocId: 'doc-5',
    readTime: '4 min read',
    publishedDate: 'Oct 08, 2026',
    category: 'Orthodontics',
    tags: ['Clear Aligners', 'Ceramic Braces', 'Teeth Straightening', 'Smile Makeover'],
    relatedTreatmentId: 'orthodontic-treatment',
    relatedTreatmentName: 'Orthodontic Treatment (Braces & Aligners)',
    relatedPages: ['treatments', 'gallery', 'home'],
    keyTakeaways: [
      'Clear aligners are removable for meals, client meetings, and oral hygiene, requiring 20–22 hours of daily wear.',
      'Ceramic tooth-colored brackets blend with natural teeth and excel at resolving severe skeletal or rotated bites.',
      'Digital 3D intraoral scans allow you to visualize your final aligned smile before starting treatment.'
    ],
    sections: [
      {
        heading: 'Aesthetics and Social Confidence',
        body: 'Modern clear aligners are fabricated from medical-grade polyurethane polymers that are virtually undetectable from speaking distance. For working professionals in Hosur commuting to Bangalore or corporate offices, this offers unparalleled confidence in meetings and social gatherings without metallic brackets.'
      },
      {
        heading: 'Hygiene and Dietary Freedom',
        body: 'Because clear aligners are removed before eating, you can enjoy all your favorite foods without worrying about bracket debonding. Brushing and flossing remain completely normal. Ceramic braces, on the other hand, are fixed to the teeth and require dedicated interdental brushes to maintain impeccable hygiene.'
      },
      {
        heading: 'Which Treatment Suits Your Bite Best?',
        body: 'Mild to moderate crowding, midline gaps, and minor bite misalignments respond exceptionally fast to aligners. Complex multi-plane rotations or deep skeletal bite corrections may benefit from precision ceramic bracket archwires. Our orthodontist Dr. Sneha conducts complete digital cephalometric analysis to recommend the fastest path.'
      }
    ],
    clinicalQuote: {
      text: 'You are never too old to straighten your teeth. Adult orthodontics improves both your smile aesthetics and chewing longevity.',
      doctorName: 'Dr. Sneha N (Orthodontist)'
    }
  },
  {
    id: 'signs-you-need-root-canal',
    slug: '5-signs-you-need-root-canal',
    title: '5 Warning Signs You Might Need Root Canal Therapy Before Severe Pain Starts',
    subtitle: 'Catching pulpal infection early prevents emergency abscesses and saves your natural tooth root.',
    excerpt: 'Tooth decay does not always begin with agony. Recognizing early signs like lingering temperature sensitivity and chewing tenderness allows us to perform painless microscopic root preservation.',
    author: 'Dr. Meera Subramanian',
    authorRole: 'Consultant Endodontist (Root Canal Specialist)',
    authorDocId: 'doc-3',
    readTime: '4 min read',
    publishedDate: 'Oct 04, 2026',
    category: 'Endodontics',
    tags: ['Root Canal', 'Toothache Relief', 'Endodontics', 'Painless Care'],
    relatedTreatmentId: 'root-canal-therapy',
    relatedTreatmentName: 'Root Canal Therapy',
    relatedPages: ['treatments', 'faqs', 'home', 'contact'],
    keyTakeaways: [
      'Pain that lingers for more than 15 seconds after drinking cold or hot fluids indicates irreversible pulpitis.',
      'A small pimple-like bump on the gum (gum boil) is often a draining dental abscess requiring root canal disinfection.',
      'Modern single-sitting root canal treatment under digital rotary motors is completely painless and quiet.'
    ],
    sections: [
      {
        heading: '1. Prolonged Hot and Cold Sensitivity',
        body: 'Fleeting sensitivity that disappears in a second is often harmless enamel wear. However, if drinking hot coffee or chilled water causes a dull ache that throbs for 30 seconds or longer, the inner dental pulp nerve is inflamed and needs evaluation.'
      },
      {
        heading: '2. Pain When Chewing or Tapping the Tooth',
        body: 'When infection travels down the root canal to the surrounding periodontal ligament, biting down on that specific tooth produces sharp tenderness. This is a telltale indicator of apical inflammation.'
      },
      {
        heading: '3. Enamel Discoloration & Darkening',
        body: 'A tooth turning grayish or dark yellow often signals that the internal vascular tissue has died following trauma or deep micro-leakage. Root canal cleaning eliminates dead tissue and restores tooth health.'
      }
    ],
    clinicalQuote: {
      text: 'Root canal therapy does not cause pain; it cures pain. With computer-assisted local anesthesia, patients are surprised at how painless it is.',
      doctorName: 'Dr. Meera (Endodontist)'
    }
  },
  {
    id: 'dental-implants-vs-bridge',
    slug: 'dental-implants-vs-fixed-bridge',
    title: 'Single Tooth Implant vs Fixed Dental Bridge: Longevity, Bone Health & Investment',
    subtitle: 'Why titanium dental implants are the gold standard for replacing missing teeth naturally.',
    excerpt: 'Losing a tooth impairs chewing and triggers jawbone atrophy. Compare the lifespans, adjacent tooth preservation, and total long-term costs of implants versus traditional bridges.',
    author: 'Dr. Vinod Kumar & Dr. Ananya Iyer',
    authorRole: 'Implantologist & Prosthodontist Team',
    authorDocId: 'doc-6',
    readTime: '5 min read',
    publishedDate: 'Sep 28, 2026',
    category: 'Surgery',
    tags: ['Dental Implants', 'Missing Teeth', 'Prosthodontics', 'Full Mouth'],
    relatedTreatmentId: 'dental-implants',
    relatedTreatmentName: 'Dental Implants',
    relatedPages: ['treatments', 'gallery', 'facilities', 'home'],
    keyTakeaways: [
      'Dental implants replace the tooth root into the jawbone, preventing adjacent bone resorption and facial sagging.',
      'Fixed dental bridges require filing down two perfectly healthy neighboring teeth to serve as support anchors.',
      'Implants boast a 98% clinical success rate and can last a lifetime with routine oral hygiene.'
    ],
    sections: [
      {
        heading: 'Preserving Healthy Adjacent Teeth',
        body: 'To place a traditional 3-unit dental bridge, the dentist must shave away the enamel of the two healthy teeth flanking the gap. Dental implants, conversely, are stand-alone fixtures that leave adjacent healthy enamel 100% untouched.'
      },
      {
        heading: 'Preventing Jawbone Resorption',
        body: 'When a natural tooth is lost, the surrounding jawbone loses masticatory stimulation and resorbs up to 25% in the first year alone. Titanium implants osseointegrate with bone cells, transmitting chewing forces and maintaining full facial bone contours.'
      },
      {
        heading: 'Long-Term Cost & ROI',
        body: 'While a bridge may seem less expensive initially, dental bridges typically require replacement every 8 to 12 years due to recurrent decay under the crowns. A dental implant is a permanent, one-time restoration that often outlasts the patient.'
      }
    ],
    clinicalQuote: {
      text: 'An implant is the closest modern dentistry comes to giving you your natural tooth back in strength, aesthetics, and longevity.',
      doctorName: 'Dr. Vinod Kumar (Implantologist)'
    }
  },
  {
    id: 'pediatric-cavity-prevention',
    slug: 'pediatric-dental-care-cavity-prevention',
    title: 'Milk Teeth Matter! Complete Cavity Prevention & Sealants Guide for Parents',
    subtitle: 'Protecting your child’s primary dentition ensures healthy permanent teeth and speech development.',
    excerpt: 'Many parents believe baby teeth do not matter because they fall out anyway. Dr. Kavitha explains why premature loss of primary teeth causes severe crowding, speech lisps, and pain.',
    author: 'Dr. Kavitha S',
    authorRole: 'Consultant Pediatric Dentist',
    authorDocId: 'doc-4',
    readTime: '3 min read',
    publishedDate: 'Sep 22, 2026',
    category: 'Pediatric',
    tags: ['Pediatric Dentistry', 'Kids Dental Care', 'Fluoride', 'Cavities'],
    relatedTreatmentId: 'pediatric-dentistry',
    relatedTreatmentName: 'Pediatric Dental Care',
    relatedPages: ['treatments', 'home', 'about', 'faqs'],
    keyTakeaways: [
      'Primary molars stay in a child’s mouth until ages 10–12 and guide the permanent teeth into correct alignment.',
      'Pit & fissure sealants provide a protective barrier over deep molar grooves, reducing tooth decay by up to 80%.',
      'Early positive dental visits eliminate dental anxiety for life.'
    ],
    sections: [
      {
        heading: 'Why Baby Teeth Are Crucial',
        body: 'Primary teeth are essential for proper speech phonetics, nutritious chewing, and maintaining space in the jaw for permanent teeth. When a baby molar is prematurely lost to decay, neighboring teeth shift into the space, causing severe impaction of adult teeth.'
      },
      {
        heading: 'Painless Preventative Armor: Sealants & Fluoride',
        body: 'Children often struggle to clean the deep microscopic fissures on their back molars. Dental sealants are clear, resin coatings painted into these grooves in minutes with no drilling or anesthesia, forming a shield against sugary snacks and bacteria.'
      }
    ],
    clinicalQuote: {
      text: 'A child’s first dental visit should be fun and fearless. Prevention is always gentler and easier than treatment.',
      doctorName: 'Dr. Kavitha S (Pediatric Specialist)'
    }
  },
  {
    id: 'cashless-dental-insurance-emi',
    slug: 'cashless-dental-insurance-0-emi-guide',
    title: 'How Cashless Dental Insurance & 0% EMI Financing Work in Hosur',
    subtitle: 'Navigating corporate health cards, TPA pre-authorization, and zero-interest monthly installments.',
    excerpt: 'Wondering if your Star Health, HDFC ERGO, or corporate TVS/Ashok Leyland TPA policy covers dental procedures? Here is our front desk’s step-by-step reimbursement and financing guide.',
    author: 'Clinic Billing & TPA Desk',
    authorRole: 'Patient Care & Insurance Support',
    readTime: '4 min read',
    publishedDate: 'Sep 15, 2026',
    category: 'Insurance & Finance',
    tags: ['Dental Insurance', 'Cashless TPA', '0% EMI', 'Affordable Care'],
    relatedTreatmentId: 'teeth-cleaning-scaling',
    relatedTreatmentName: 'Insurance & 0% EMI Assistance',
    relatedPages: ['treatments', 'home', 'faqs', 'contact', 'portal'],
    keyTakeaways: [
      'Oral surgeries, accidental trauma, and cyst removals are eligible for direct cashless or reimbursement coverage.',
      'Corporate employees at TVS, Ashok Leyland, and Titan can claim OPD allowances with our GST-itemized invoices.',
      '0% No-Cost EMI is available through Bajaj Finserv and major credit cards with zero upfront interest.'
    ],
    sections: [
      {
        heading: 'What Types of Dental Treatments Are Covered by Insurance?',
        body: 'Most Indian health insurance policies cover dental treatments resulting from accidental trauma, inpatient maxillofacial surgeries, and surgical extractions under daycare. Specific corporate policies also include OPD dental riders for scaling, fillings, and consultations.'
      },
      {
        heading: 'Documents We Provide for Rapid Reimbursement',
        body: 'Our front desk provides complete stamped clinical documentation: itemized GST medical invoices, digital pre/post RVG X-rays, doctor certificates, and official ICD-10 diagnostic codes required by TPAs like Medi Assist and Vidal Health.'
      }
    ]
  },
  {
    id: 'smile-makeover-veneers',
    slug: 'porcelain-veneers-smile-makeovers',
    title: 'Porcelain Veneers vs Composite Bonding: Which Gives You the Ideal Smile Makeover?',
    subtitle: 'Closing midline gaps, covering deep tetracycline stains, and harmonizing tooth shapes.',
    excerpt: 'Dreaming of a symmetrical Hollywood smile? Dr. Anupriya compares custom wafer-thin porcelain veneers with composite resin sculpting for chips, gaps, and stained incisors.',
    author: 'Dr. Anupriya',
    authorRole: 'Founder & Cosmetic Smile Consultant',
    authorDocId: 'doc-1',
    readTime: '4 min read',
    publishedDate: 'Sep 10, 2026',
    category: 'Cosmetic',
    tags: ['Veneers', 'Smile Makeover', 'Cosmetic Dentistry', 'Teeth Whitening'],
    relatedTreatmentId: 'cosmetic-dentistry',
    relatedTreatmentName: 'Cosmetic Dentistry & Veneers',
    relatedPages: ['gallery', 'treatments', 'home'],
    keyTakeaways: [
      'Porcelain veneers replicate the natural optical translucency of real enamel and are completely stain-resistant.',
      'Composite bonding is a budget-friendly same-day procedure ideal for minor incisal edge chipping.',
      'Veneers can close prominent diastemas (midline gaps) in just two clinical appointments.'
    ],
    sections: [
      {
        heading: 'Custom Porcelain Veneers',
        body: 'Porcelain veneers are custom-crafted ceramic shells bonded to the front of teeth. They reflect light identically to natural enamel, never discolor from coffee or wine, and provide structural symmetry for chipped, worn, or uneven teeth.'
      },
      {
        heading: 'Longevity and Care',
        body: 'With proper nighttime care and routine 6-month checkups, high-grade porcelain veneers routinely last 15 to 20 years, making them a worthwhile investment in personal and professional confidence.'
      }
    ],
    clinicalQuote: {
      text: 'A smile makeover does not mean artificial chiclet teeth. Our focus is natural proportion, facial harmony, and gum health.',
      doctorName: 'Dr. Anupriya (Chief Surgeon)'
    }
  },
  {
    id: 'post-op-extraction-care',
    slug: 'post-op-extraction-care-guide',
    title: 'Post-Operative Care After Tooth Extraction: 24-Hour Recovery Rules',
    subtitle: 'Crucial steps to avoid dry socket, relieve soreness, and ensure smooth tissue healing.',
    excerpt: 'Just had a wisdom tooth or decayed tooth removed? Follow our oral surgeon Dr. Ajay Kumar’s essential 24-hour dos and don’ts to recover smoothly with minimal discomfort.',
    author: 'Dr. Ajay Kumar',
    authorRole: 'Consultant Oral & Maxillofacial Surgeon',
    authorDocId: 'doc-9',
    readTime: '3 min read',
    publishedDate: 'Sep 05, 2026',
    category: 'Surgery',
    tags: ['Tooth Extraction', 'Post Op Care', 'Wisdom Teeth', 'Healing'],
    relatedTreatmentId: 'tooth-extraction',
    relatedTreatmentName: 'Tooth Extraction',
    relatedPages: ['portal', 'treatments', 'faqs'],
    keyTakeaways: [
      'Keep firm bite pressure on the sterile gauze pack for 45–60 minutes after leaving the clinic.',
      'Do NOT spit, rinse vigorously, or drink through a straw for the first 24 hours to protect the blood clot.',
      'Begin gentle warm saltwater rinses only on Day 2 to keep the surgical site clean.'
    ],
    sections: [
      {
        heading: 'The Golden Rule: Protect the Blood Clot',
        body: 'The primary goal during the first 24 hours is forming and stabilizing a solid blood clot inside the extraction socket. Avoid smoking, spitting, rinsing forcefully, or drinking through straws, as the negative pressure can dislodge the clot and trigger painful dry socket (alveolitis).'
      },
      {
        heading: 'Diet and Cold Compress',
        body: 'Stick to soft, cool foods like ice cream, curd, mashed potatoes, and chilled smoothies. Apply an ice pack to your cheek in 15-minute intervals to minimize natural post-operative tissue swelling.'
      }
    ]
  }
];

// Helper to get proactive recommendations based on page context
export interface PageContextSuggestions {
  pageTitle: string;
  contextDescription: string;
  suggestedTreatments: {
    id: string;
    name: string;
    badge: string;
    category: string;
    description: string;
  }[];
  suggestedArticles: BlogArticle[];
  proactivePrompt: string;
}

export const getSuggestionsForPage = (pageName: string, selectedTreatmentId?: string): PageContextSuggestions => {
  const normPage = pageName.toLowerCase();

  if (normPage === 'insurance' || (normPage === 'treatments' && selectedTreatmentId === 'insurance')) {
    return {
      pageTitle: 'Accepted Insurance & 0% EMI Options',
      contextDescription: 'Explore cashless TPA networks, Bajaj Finserv 0% EMI, and reimbursement documentation.',
      proactivePrompt: 'Exploring insurance coverage or flexible payment options? Check out our billing desk’s guide on 0% EMI and corporate health cards:',
      suggestedTreatments: [
        {
          id: 'dental-implants',
          name: 'Permanent Dental Implants',
          badge: '0% EMI from ₹2,500/mo',
          category: 'Surgery',
          description: 'High-precision titanium implants with convenient interest-free monthly installment plans.'
        },
        {
          id: 'orthodontic-treatment',
          name: 'Clear Aligners & Braces',
          badge: 'Zero-Cost EMI',
          category: 'Orthodontics',
          description: 'Spread your smile makeover across 6–12 easy monthly installments.'
        },
        {
          id: 'teeth-cleaning-scaling',
          name: 'Preventive Ultrasonic Scaling',
          badge: 'Insurance Reimbursable',
          category: 'General',
          description: 'Eligible under corporate dental OPD allowances with itemized GST invoices.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!,
        BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
        BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!
      ]
    };
  }

  if (normPage === 'treatments') {
    if (selectedTreatmentId === 'root-canal-therapy') {
      return {
        pageTitle: 'Root Canal Therapy',
        contextDescription: 'Painless single-sitting rotary nerve treatment to relieve severe toothache.',
        proactivePrompt: 'I notice you are viewing Root Canal Therapy. Dr. Meera (Endodontics Specialist) provides gentle microscopic care. Here are clinical guides and related procedures:',
        suggestedTreatments: [
          {
            id: 'root-canal-therapy',
            name: 'Rotary Root Canal Therapy',
            badge: 'Painless Rotary',
            category: 'Endodontics',
            description: 'Save natural tooth structure with gentle rotary endodontic therapy.'
          },
          {
            id: 'crowns-bridges',
            name: 'Zirconia Ceramic Crowns',
            badge: 'Post-RCT Protection',
            category: 'Prosthodontics',
            description: 'Strengthen and seal treated teeth against fractures with durable crowns.'
          }
        ],
        suggestedArticles: [
          BLOG_ARTICLES.find(a => a.id === 'signs-you-need-root-canal')!,
          BLOG_ARTICLES.find(a => a.id === 'post-op-extraction-care')!,
          BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
        ]
      };
    }

    if (selectedTreatmentId === 'clear-aligners' || selectedTreatmentId === 'orthodontic-treatment') {
      return {
        pageTitle: 'Orthodontic Braces & Invisible Aligners',
        contextDescription: 'Straighten crooked teeth and close bite gaps with discreet modern orthodontics.',
        proactivePrompt: 'Exploring orthodontic options? Dr. Sneha breaks down the differences between invisible aligners and ceramic braces:',
        suggestedTreatments: [
          {
            id: 'clear-aligners',
            name: 'Clear Invisible Aligners',
            badge: 'Virtually Undetectable',
            category: 'Orthodontics',
            description: 'Custom 3D-molded trays removable for meals and business meetings.'
          },
          {
            id: 'orthodontic-treatment',
            name: 'Ceramic Tooth-Colored Braces',
            badge: 'Aesthetic Brackets',
            category: 'Orthodontics',
            description: 'Fixed tooth-colored brackets ideal for complex crossbites and rotations.'
          }
        ],
        suggestedArticles: [
          BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
          BLOG_ARTICLES.find(a => a.id === 'smile-makeover-veneers')!,
          BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
        ]
      };
    }

    if (selectedTreatmentId === 'dental-implants') {
      return {
        pageTitle: 'Permanent Dental Implants',
        contextDescription: 'Titanium root replacement for missing teeth with lifelike ceramic crowns.',
        proactivePrompt: 'Viewing Dental Implants? Dr. Vinod Kumar (Implantologist) provides permanent root restorations. Here is our clinical comparison guide:',
        suggestedTreatments: [
          {
            id: 'dental-implants',
            name: 'Single & Multiple Implants',
            badge: 'Lifetime Durability',
            category: 'Surgery',
            description: 'Biocompatible titanium anchors that preserve jawbone density.'
          },
          {
            id: 'artificial-complete-denture',
            name: 'Flexible Partial & Complete Dentures',
            badge: 'Comfortable Fit',
            category: 'Prosthodontics',
            description: 'Lightweight prosthetic solutions customized for senior smiles.'
          }
        ],
        suggestedArticles: [
          BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!,
          BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!,
          BLOG_ARTICLES.find(a => a.id === 'post-op-extraction-care')!
        ]
      };
    }

    if (selectedTreatmentId === 'pediatric-dentistry') {
      return {
        pageTitle: 'Pediatric Dental Care',
        contextDescription: 'Gentle, fear-free dentistry for infants, toddlers, and young teens.',
        proactivePrompt: 'Checking pediatric dental care? Dr. Kavitha explains how sealants and cavity prevention protect primary teeth:',
        suggestedTreatments: [
          {
            id: 'pediatric-dentistry',
            name: 'Pediatric Dental Care & Sealants',
            badge: 'Fear-Free Kids',
            category: 'Pediatric',
            description: 'Gentle fluoride varnishes and protective pit-and-fissure sealants.'
          },
          {
            id: 'teeth-cleaning-scaling',
            name: 'Early Preventive Cleaning',
            badge: 'Habit Guidance',
            category: 'General',
            description: 'Painless plaque clearing and fun brushing habit training for children.'
          }
        ],
        suggestedArticles: [
          BLOG_ARTICLES.find(a => a.id === 'pediatric-cavity-prevention')!,
          BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
          BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
        ]
      };
    }

    return {
      pageTitle: 'Treatments & Procedures',
      contextDescription: 'Explore our 15 specialized dental treatments, 0% EMI financing, and insurance coverage.',
      proactivePrompt: 'I notice you are browsing our Treatments Catalog. Would you like a doctor’s recommendation on any procedure or need help estimating your 0% monthly EMI?',
      suggestedTreatments: [
        {
          id: 'orthodontic-treatment',
          name: 'Orthodontic Braces & Aligners',
          badge: 'Most Popular',
          category: 'Orthodontics',
          description: 'Discreet alignment with ceramic brackets or invisible removable aligners.'
        },
        {
          id: 'dental-implants',
          name: 'Permanent Dental Implants',
          badge: 'Lifetime Durability',
          category: 'Surgery',
          description: 'Titanium root replacement for missing teeth with lifelike ceramic crowns.'
        },
        {
          id: 'teeth-cleaning-scaling',
          name: 'Teeth Cleaning & Scaling',
          badge: 'Essential Preventive',
          category: 'General',
          description: 'Ultrasonic calculus removal with painless diode laser gum therapy.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
        BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!,
        BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
      ]
    };
  }

  if (normPage === 'gallery') {
    return {
      pageTitle: 'Before & After Smile Transformations',
      contextDescription: 'Inspect real patient clinical results with our interactive Before/After comparison slider.',
      proactivePrompt: 'Viewing our Smile Gallery? Our orthodontics and veneer transformations are customized for each facial profile. Here is how our specialists achieve these results:',
      suggestedTreatments: [
        {
          id: 'orthodontic-treatment',
          name: 'Orthodontic Treatment (Braces)',
          badge: 'Class I Occlusion',
          category: 'Orthodontics',
          description: 'Correct severe incisor crowding and deep bites without extractions.'
        },
        {
          id: 'teeth-whitening-bleaching',
          name: 'In-Clinic Laser Whitening',
          badge: '8 Shades Brighter',
          category: 'Cosmetic',
          description: 'Safe enamel-preserving photo-activated bleaching in 45 minutes.'
        },
        {
          id: 'cosmetic-dentistry',
          name: 'Porcelain Veneers & Makeovers',
          badge: 'Luminous Smile',
          category: 'Cosmetic',
          description: 'Custom ceramic shells to close midline gaps and restore chipped edges.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'smile-makeover-veneers')!,
        BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
        BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!
      ]
    };
  }

  if (normPage === 'portal') {
    return {
      pageTitle: 'Patient Health Portal',
      contextDescription: 'Manage your appointments, past visit records, digital prescriptions, and post-op care.',
      proactivePrompt: 'Welcome to your Patient Portal! Need assistance understanding your digital prescription or reviewing post-procedure recovery instructions?',
      suggestedTreatments: [
        {
          id: 'teeth-cleaning-scaling',
          name: 'Routine 6-Month Maintenance',
          badge: 'Preventive Care',
          category: 'General',
          description: 'Keep your gums disease-free and clean with periodic scaling.'
        },
        {
          id: 'tooth-filling',
          name: 'Restorative Tooth Filling',
          badge: 'Cavity Repair',
          category: 'General',
          description: 'Tooth-colored composite restoration for smooth, natural chewing.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'post-op-extraction-care')!,
        BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
        BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
      ]
    };
  }

  if (normPage === 'faqs') {
    return {
      pageTitle: 'Frequently Asked Questions',
      contextDescription: 'Read answers about clinic timings, pain-free anesthesia, insurance claims, and emergency triage.',
      proactivePrompt: 'Looking through our Dental FAQs? Here are in-depth clinical articles that answer our patients’ most frequent questions:',
      suggestedTreatments: [
        {
          id: 'root-canal-therapy',
          name: 'Painless Root Canal Therapy',
          badge: 'Tooth Preservation',
          category: 'Endodontics',
          description: 'Gentle nerve removal and seal to alleviate severe toothache.'
        },
        {
          id: 'teeth-cleaning-scaling',
          name: 'Teeth Cleaning or Scaling',
          badge: 'Preventive',
          category: 'General',
          description: 'Ultrasonic tartar clearing with zero enamel damage.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
        BLOG_ARTICLES.find(a => a.id === 'signs-you-need-root-canal')!,
        BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
      ]
    };
  }

  if (normPage === 'facilities' || normPage === 'about') {
    return {
      pageTitle: normPage === 'facilities' ? 'Modern Clinic Facilities & Tech' : 'About Sakthi Dental Clinic',
      contextDescription: 'Learn about our 20+ years of clinical excellence in Hosur and modern operatory technology.',
      proactivePrompt: 'Interested in our clinical standards and technology? Our Hosur clinic features hospital-grade sterilization and modern diagnostic imaging. Learn more here:',
      suggestedTreatments: [
        {
          id: 'dental-implants',
          name: 'Surgical Dental Implants',
          badge: 'Precision Guided',
          category: 'Surgery',
          description: 'High-precision titanium implants placed in sterile surgical suites.'
        },
        {
          id: 'teeth-cleaning-scaling',
          name: 'Diode Laser Gum Therapy',
          badge: 'Minimally Invasive',
          category: 'General',
          description: 'Soft-tissue laser technology for pain-free periodontal care.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
        BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!,
        BLOG_ARTICLES.find(a => a.id === 'pediatric-cavity-prevention')!
      ]
    };
  }

  if (normPage === 'courses') {
    return {
      pageTitle: 'Doctor Clinical Courses & CDE Academy',
      contextDescription: 'State Dental Council (DCI) accredited clinical fellowships, hands-on residencies, and doctor-guided wellness courses.',
      proactivePrompt: 'Exploring our doctor-led clinical courses and fellowships? Here are specialist clinical training programs and guides directed by our doctors:',
      suggestedTreatments: [
        {
          id: 'root-canal-therapy',
          name: 'Rotary Endodontics Clinical Fellowship',
          badge: '30 DCI CDE Points',
          category: 'Endodontics',
          description: 'Single-visit rotary RCT and bioceramic obturation hands-on training under Dr. Meera.'
        },
        {
          id: 'dental-implants',
          name: 'Oral Implantology Residency',
          badge: '45 DCI CDE Points',
          category: 'Surgery',
          description: 'Hands-on surgical implant placement on live clinic patients led by Dr. Srinivas.'
        },
        {
          id: 'orthodontic-treatment',
          name: 'Clear Aligners Certification Course',
          badge: '16 CDE Points',
          category: 'Orthodontics',
          description: 'Digital 3D intraoral scanning, attachments, and biomechanics certification by Dr. Sneha.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
        BLOG_ARTICLES.find(a => a.id === 'dental-implants-vs-bridge')!,
        BLOG_ARTICLES.find(a => a.id === 'signs-you-need-root-canal')!
      ]
    };
  }

  if (normPage === 'contact') {
    return {
      pageTitle: 'Contact Us & Clinic Directions',
      contextDescription: 'Visit Sakthi Dental Clinic opposite RV Boys School, Anthivadi, Hosur, open 7 days 9am-9pm.',
      proactivePrompt: 'Visiting us in Anthivadi, Hosur or planning a consultation? Check our location details, timings, and recommended checkups below:',
      suggestedTreatments: [
        {
          id: 'teeth-cleaning-scaling',
          name: 'Comprehensive First Consultation',
          badge: 'Routine Checkup',
          category: 'General',
          description: 'Includes digital RVG X-ray assessment and thorough cleaning advice.'
        },
        {
          id: 'wisdom-tooth-extraction',
          name: 'Emergency Oral Surgery & Triage',
          badge: 'Immediate Relief',
          category: 'Surgery',
          description: 'Same-day relief for acute toothache or wisdom tooth pain.'
        }
      ],
      suggestedArticles: [
        BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
        BLOG_ARTICLES.find(a => a.id === 'signs-you-need-root-canal')!,
        BLOG_ARTICLES.find(a => a.id === 'cashless-dental-insurance-emi')!
      ]
    };
  }

  // Default: Home Page
  return {
    pageTitle: 'Sakthi Dental Clinic Home',
    contextDescription: 'Hosur’s premier dental clinic for women, children, and families with daily 9am-9pm care.',
    proactivePrompt: 'Welcome to Sakthi Dental Clinic! Based on our most popular family dental inquiries, here are top doctor guides and core treatments:',
    suggestedTreatments: [
      {
        id: 'teeth-cleaning-scaling',
        name: 'Teeth Cleaning or Scaling',
        badge: 'Popular Preventive',
        category: 'General',
        description: 'Remove hardened calculus and protect gums with painless ultrasonic scaling.'
      },
      {
        id: 'orthodontic-treatment',
        name: 'Orthodontic Braces & Aligners',
        badge: 'Smile Alignment',
        category: 'Orthodontics',
        description: 'Straighten crooked teeth with clear aligners or ceramic brackets.'
      },
      {
        id: 'pediatric-dentistry',
        name: 'Pediatric Dental Care',
        badge: 'Kids Specialized',
        category: 'Pediatric',
        description: 'Gentle, fear-free care with fluoride varnishes and protective sealants.'
      }
    ],
    suggestedArticles: [
      BLOG_ARTICLES.find(a => a.id === 'scaling-myths-debunked')!,
      BLOG_ARTICLES.find(a => a.id === 'clear-aligners-vs-braces')!,
      BLOG_ARTICLES.find(a => a.id === 'signs-you-need-root-canal')!
    ]
  };
};
