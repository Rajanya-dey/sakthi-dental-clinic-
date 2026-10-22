import { Treatment, Doctor, Amenity, Testimonial, FaqItem } from '../types';

export const CLINIC_INFO = {
  name: 'Sakthi Dental Clinic',
  tagline: 'Specialized Dental Care for Women, Children & Families',
  shortBio: 'Experience compassionate, expert-led dental services tailored to your needs, all in a modern and welcoming environment in Hosur.',
  address: 'B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109, India',
  email: 'info@sakthidentalclinic.in',
  phones: ['+91 9862890897', '+91 9363298118'],
  primaryPhone: '+91 9862890897',
  emergencyPhone: '+91 9363298118',
  timings: 'Sunday to Saturday: 9am to 7pm',
  doctorAvailability: 'Doctors available daily (9 AM - 9 PM)',
  foundedYear: 2004,
  founder: 'Dr. Anupriya',
  socialLinks: {
    instagram: 'https://instagram.com/sakthidentalclinic',
    facebook: 'https://facebook.com/sakthidentalclinic',
    youtube: 'https://youtube.com/@sakthidentalclinic'
  }
};

export const CLINIC_BANNERS = [
  {
    id: 'banner-1',
    title: 'Warm Welcome & Comfortable Reception',
    subtitle: 'Step into a clean, stress-free clinical environment designed for family comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
    caption: 'Sakthi Dental Clinic Reception & Waiting Lounge'
  },
  {
    id: 'banner-2',
    title: 'State-of-the-Art Dental Operatory',
    subtitle: 'Ergonomic treatment units equipped with modern LASER and rotary instruments.',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80',
    caption: 'Advanced Dental Operatory Room'
  },
  {
    id: 'banner-3',
    title: 'Personalized Doctor Consultation',
    subtitle: 'Detailed one-on-one evaluations with transparent diagnosis and treatment plans.',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1600&q=80',
    caption: 'Private Specialist Consultation Suite'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'All-in-One Care',
    description: 'From general dentistry to specialized treatments, everything under one roof.',
    icon: 'Sparkles'
  },
  {
    title: 'Experienced Doctors',
    description: 'Our dentists are professionally trained and committed to personalized patient care.',
    icon: 'Stethoscope'
  },
  {
    title: 'Patient-Centric Approach',
    description: 'We prioritize comfort, safety, and transparency in every treatment we offer.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Technology-Driven Services',
    description: 'Modern tools and equipment ensure precision and safety.',
    icon: 'ShieldCheck'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'amenity-city',
    title: 'Convenient central location',
    description: 'Easily accessible right at SBM Layout, Anthivadi with seamless access from all parts of Hosur.',
    iconName: 'city-center',
    highlight: 'Central Hosur'
  },
  {
    id: 'amenity-parking',
    title: 'Hassle-free parking',
    description: 'Dedicated and secure parking space right outside the clinic for two-wheelers and four-wheelers.',
    iconName: 'parking',
    highlight: 'Dedicated Parking'
  },
  {
    id: 'amenity-doctors',
    title: 'Doctors available daily (9 AM - 9 PM)',
    description: 'Extended clinical hours seven days a week to accommodate working parents, children, and emergencies.',
    iconName: 'doctors',
    highlight: 'Daily 9 AM - 9 PM'
  },
  {
    id: 'amenity-pickup',
    title: 'Pickup & drop-off support',
    description: 'Special pickup and drop-off assistance available for senior citizens and mobility-impaired patients upon request.',
    iconName: 'pickup',
    highlight: 'On-demand Transit'
  },
  {
    id: 'amenity-wheelchair',
    title: 'Wheelchair access',
    description: 'Barrier-free ramp entrance, wide doorways, and ground floor accessibility designed for all ages.',
    iconName: 'wheelchair',
    highlight: '100% Accessible'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'The doctors are extremely kind and attentive. My braces treatment is progressing really well. 5/5.',
    author: 'Manisha M',
    rating: 5,
    treatment: 'Orthodontic Braces'
  },
  {
    id: 'test-2',
    quote: 'I got my teeth cleaned and whitened here, and the results were amazing. The staff is so humble and professional. I’ve recommended Sakthi Dental Clinic to my entire family.',
    author: 'Mr. Arun Kumar',
    rating: 5,
    treatment: 'Teeth Cleaning & Bleaching'
  },
  {
    id: 'test-3',
    quote: 'Their attention to detail is outstanding. My daughter needed braces and the entire process from consultation to regular follow ups has been so smooth. Really grateful for their care.',
    author: 'Mrs. Revathi S.',
    rating: 5,
    treatment: 'Pediatric & Orthodontic Care'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Anupriya',
    role: 'Founder & Chief Dental Surgeon',
    specialty: 'General Dentistry & Comprehensive Smile Restoration',
    experience: '20+ Years',
    education: 'BDS, Senior Dental Consultant',
    bio: 'Graduating in 2000, Dr. Anupriya spent six impactful years at Mathura Clinic before founding Sakthi Dental Clinic in Hosur in 2004. A trusted consultant for over a decade at Chandara Hospital Primary Health Center.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Iyer',
    role: 'Prosthodontist',
    specialty: 'Complete & Partial Dentures, Crowns & Fixed Bridges',
    experience: '12+ Years',
    education: 'MDS (Prosthodontics)',
    bio: 'Specialist in full mouth rehabilitation, aesthetic fixed bridges, and functional denture restorations.',
    imageUrl: '/src/assets/images/dr_ananya_iyer_1791794816364.jpg'
  },
  {
    id: 'doc-3',
    name: 'Dr. Meera Subramanian',
    role: 'Endodontist',
    specialty: 'Root Canal Therapy & Microscopic Tooth Preservation',
    experience: '11+ Years',
    education: 'MDS (Conservative Dentistry & Endodontics)',
    bio: 'Dedicated to painless single-sitting root canal treatments and saving natural compromised teeth.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Arvind Kumar',
    role: 'Dental Surgeon',
    specialty: 'General Restorations, Tooth Fillings & Preventive Care',
    experience: '9+ Years',
    education: 'BDS, Fellowship in Clinical Dentistry',
    bio: 'Passionate about preventive dental hygiene, composite cavity restorations, and gentle patient education.',
    imageUrl: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-5',
    name: 'Dr. Sneha N',
    role: 'Orthodontist',
    specialty: 'Braces, Alignment & Bite Correction',
    experience: '10+ Years',
    education: 'MDS (Orthodontics & Dentofacial Orthopedics)',
    bio: 'Expert in pediatric early interceptive braces, adult metal, ceramic, and aesthetic tooth alignment.',
    imageUrl: '/src/assets/images/dr_sneha_n_1791794838868.jpg'
  },
  {
    id: 'doc-6',
    name: 'Dr. Srinivas Rohit Ramanujam',
    role: 'Implantologist',
    specialty: 'Titanium Dental Implants & Bone Grafting',
    experience: '14+ Years',
    education: 'MDS, Diplomate in Oral Implantology',
    bio: 'Specializes in computer-guided titanium dental implants restoring missing teeth with lifelong strength.',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-7',
    name: 'Dr. Balu',
    role: 'Laser Surgeon',
    specialty: 'Minimally Invasive Laser Dentistry & Gum Contouring',
    experience: '13+ Years',
    education: 'MDS, Certified Dental Laser Specialist',
    bio: 'Pioneer in soft tissue laser surgeries, pain-free gum contouring, and rapid post-op periodontal healing.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-8',
    name: 'Dr. Vikram Raj Kishore',
    role: 'Aligners Partner',
    specialty: 'Clear Aligners & Invisible Orthodontics',
    experience: '8+ Years',
    education: 'BDS, Certified Clear Aligner Specialist',
    bio: 'Helping patients achieve symmetrical, radiant smiles with transparent, comfortable removable aligner trays.',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-9',
    name: 'Dr. Ajay Jumar',
    role: 'Oral & Maxillofacial Surgeon',
    specialty: 'Wisdom Teeth Extractions, Flap & Jaw Surgeries',
    experience: '15+ Years',
    education: 'MDS (Oral & Maxillofacial Surgery)',
    bio: 'High expertise in complex impacted wisdom teeth removals, facial trauma, and surgical periodontal management.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'teeth-cleaning-scaling',
    name: 'Teeth Cleaning or Scaling',
    shortDescription: 'Preventive care to remove plaque and protect gums.',
    fullDescription: 'At Sakthi Dental Clinic, we offer advanced, non-surgical gum care using modern LASER technology for precise and effective treatment. Whether you\'re dealing with early signs of gum disease or a more advanced condition, our skilled professionals ensure thorough cleaning to restore gum health. Scaling is advised for moderate cases to remove plaque and tartar buildup, while more severe periodontal issues may require deep cleaning procedures like root planing, supported by LASER treatment. This approach not only treats existing problems but also serves as a crucial preparatory step before any surgical intervention.',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular Preventive',
    isCore: true,
    features: ['Ultrasonic tartar removal', 'LASER gum therapy option', 'Polishing for stain-free enamel', 'Fresh breath & gum protection']
  },
  {
    id: 'tooth-filling',
    name: 'Tooth Filling',
    shortDescription: 'Composite fillings for cavity treatment and tooth restoration.',
    fullDescription: 'At Sakthi Dental Clinic, we specialize in restoring smiles through expert tooth filling services. Whether tooth damage is caused by cavities, trauma, or wear from habits like teeth grinding or nail-biting, our team uses high-quality materials and the latest techniques to repair and protect your teeth. We focus on sealing gaps effectively to prevent future decay and ensure long-term oral health. Our goal is to preserve your natural tooth structure while enhancing both function and appearance, giving you a healthier, more confident smile.',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    badge: 'Restorative Care',
    isCore: true,
    features: ['Tooth-colored composite resin', 'Decay excavation', 'Seamless natural appearance', 'Durable masticatory strength']
  },
  {
    id: 'tooth-extraction',
    name: 'Tooth Extraction',
    shortDescription: 'Safe and painless removal of impacted or decayed teeth.',
    fullDescription: 'When a tooth is beyond repair, Sakthi Dental Clinic ensures that the extraction process is handled with the utmost care and comfort. Our experienced dental team evaluates every option before recommending removal, but when necessary, we perform extractions using gentle techniques to minimize discomfort. We prioritize creating a stress-free environment, explaining each step to our patients. Your health and comfort are always our focus, and we aim to make tooth extraction as smooth and painless as possible, supporting you through every stage of recovery.',
    category: 'Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    badge: 'Painless Care',
    isCore: true,
    features: ['Gentle local anesthesia', 'Minimally traumatic technique', 'Post-operative guidance', 'Rapid tissue healing']
  },
  {
    id: 'artificial-complete-denture',
    name: 'Artificial Complete Denture',
    shortDescription: 'Full mouth replacement to restore confidence and function.',
    fullDescription: 'At Sakthi Dental Clinic, we craft high-quality complete dentures to restore both function and aesthetics for patients with missing teeth. Our dentures are designed with precision using durable materials, providing a natural look and a comfortable fit. Whether you\'re replacing several teeth or a full arch, our customized solutions help you regain confidence and improve daily functionality. We focus on delivering practical, long-lasting dentures that enhance your smile and overall oral health.',
    category: 'Prosthodontics',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    badge: 'Senior-Friendly',
    isCore: true,
    features: ['Custom arch impression', 'High-impact biocompatible acrylic', 'Natural gum-shade matching', 'Restored chewing and speech']
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    shortDescription: 'Permanent titanium foundations to replace missing teeth naturally.',
    fullDescription: 'Dental implants at Sakthi Dental Clinic offer a modern and reliable solution for replacing missing teeth. Using biocompatible materials like titanium, we securely place artificial roots into the jawbone, creating a stable foundation for prosthetic teeth. Our advanced implant procedures restore both the appearance and strength of your smile, ensuring a natural feel and long-lasting results. Trust our experienced team to help you regain optimal oral function and confidence with cutting-edge implant technology.',
    category: 'Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    badge: 'Permanent Solution',
    isCore: false,
    features: ['Biocompatible titanium fixtures', 'Preserves jawbone density', 'Looks & feels like natural tooth', 'Lifelong durability']
  },
  {
    id: 'laser-dentistry',
    name: 'Laser Dentistry',
    shortDescription: 'Precise, minimally invasive soft tissue and gum procedures.',
    fullDescription: 'At Sakthi Dental Clinic, we utilize advanced laser technology to perform precise, minimally invasive dental treatments. From soft tissue surgeries to gum care, laser procedures offer faster healing, reduced discomfort, and enhanced accuracy. Whether you\'re undergoing gum reshaping or other corrective treatments, our state-of-the-art laser equipment ensures efficient, safe, and comfortable care tailored to your needs.',
    category: 'Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    badge: 'Advanced Tech',
    isCore: false,
    features: ['Minimally invasive incision', 'Near-zero bleeding & swelling', 'Sterilizing laser beam', 'Accelerated healing speed']
  },
  {
    id: 'root-canal-therapy',
    name: 'Root Canal Therapy',
    shortDescription: 'Preserve your natural tooth by removing deep pulp infection.',
    fullDescription: 'When tooth infections reach deep into the pulp, root canal treatment becomes essential. At Sakthi Dental Clinic, we carefully remove infected tissue, clean the area thoroughly, and seal the tooth to prevent future issues. Our focus is on relieving pain, eliminating infection, and preserving your natural tooth structure for long-term dental health.',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    badge: 'Tooth Saver',
    isCore: false,
    features: ['Rotary endodontic files', 'Deep canal disinfection', 'Bio-inert gutta-percha seal', 'Crown reinforcement recommendation']
  },
  {
    id: 'wisdom-tooth-extraction',
    name: 'Wisdom Tooth Extraction',
    shortDescription: 'Gentle and effective removal of impacted or painful wisdom teeth.',
    fullDescription: 'If impacted or problematic, wisdom teeth can cause discomfort and oral health risks. At Sakthi Dental Clinic, we specialize in gentle and effective wisdom tooth removal, using modern techniques and anesthesia options to ensure a smooth, pain-free experience. We also provide comprehensive post-operative care to support quick recovery and lasting comfort.',
    category: 'Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    badge: 'Specialist Oral Surgery',
    isCore: false,
    features: ['3D X-ray evaluation', 'Local anesthesia & sedation comfort', 'Prevents crowding and cyst formation', 'Dedicated recovery care kit']
  },
  {
    id: 'fixed-partial-denture',
    name: 'Fixed Partial Denture (Bridge)',
    shortDescription: 'Secure custom bridges anchored to replace missing teeth seamlessly.',
    fullDescription: 'Our expertly crafted fixed partial dentures offer a secure solution for replacing missing teeth by anchoring prosthetic teeth to adjacent natural teeth or implants. At Sakthi Dental Clinic, we focus on custom-made dental bridges that restore your smile\'s appearance while improving chewing function and maintaining oral stability.',
    category: 'Prosthodontics',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    badge: 'Fixed Restoration',
    isCore: false,
    features: ['Ceramic / Zirconia bridges', 'Firm anchor on adjacent teeth', 'Restores bite equilibrium', 'Natural aesthetic luster']
  },
  {
    id: 'teeth-whitening-bleaching',
    name: 'Teeth Whitening (Bleaching)',
    shortDescription: 'Cosmetic whitening treatments for a brighter, glowing smile.',
    fullDescription: 'Brighten your smile with professional teeth whitening services at Sakthi Dental Clinic. We treat both external and internal stains, using safe bleaching agents to lighten your teeth by several shades. Whether addressing discoloration from food, beverages, or age, our whitening treatments restore your smile\'s natural radiance and boost your confidence.',
    category: 'Cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    badge: 'Cosmetic Favorite',
    isCore: true,
    features: ['Enamel-safe bleaching gel', 'Lightens up to 6-8 shades', 'In-office & take-home options', 'Long-lasting radiant results']
  },
  {
    id: 'veneers',
    name: 'Veneers',
    shortDescription: 'Ultra-thin custom shells to mask chips, gaps, or discoloration.',
    fullDescription: 'Transform your smile with dental veneers, thin, custom-made shells designed to cover imperfections such as chips, gaps, or discoloration. At Sakthi Dental Clinic, we offer high-quality veneers that enhance your teeth\'s appearance, giving you a flawless and natural-looking smile.',
    category: 'Cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    badge: 'Smile Makeover',
    isCore: false,
    features: ['Custom porcelain wafers', 'Closes stubborn gaps', 'Stain-resistant high durability', 'Tailored shade and contours']
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    shortDescription: 'Gentle, welcoming dental care specifically tailored for children.',
    fullDescription: 'At Sakthi Dental Clinic, we provide gentle and comprehensive dental care for children. Our friendly team creates a welcoming environment, ensuring young patients feel safe and comfortable during their visits. From routine check-ups to preventive treatments, we focus on building healthy dental habits for a lifetime of bright smiles.',
    category: 'Pediatric',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    badge: 'Kids Specialized',
    isCore: false,
    features: ['Child-friendly gentle team', 'Fluoride varnish & fissure sealants', 'Pain-free milk tooth care', 'Positive dental habit guidance']
  },
  {
    id: 'flap-surgery',
    name: 'Flap Surgery',
    shortDescription: 'Targeted deep periodontal treatment for advanced gum disease.',
    fullDescription: 'For advanced gum disease, flap surgery may be necessary. Our skilled team at Sakthi Dental Clinic performs this procedure by lifting the gum tissue to remove deep-seated plaque and bacteria, then repositioning it for optimal healing. This treatment helps prevent further periodontal issues and supports gum health.',
    category: 'Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    badge: 'Gum Health',
    isCore: false,
    features: ['Deep subgingival cleaning', 'Arrests bone resorption', 'Tissue regeneration support', 'Saves loosening teeth']
  },
  {
    id: 'orthodontic-treatment',
    name: 'Orthodontic Treatment (Braces)',
    shortDescription: 'Braces to straighten misaligned teeth and optimize bite function.',
    fullDescription: 'Correct misaligned teeth with customized orthodontic treatments at Sakthi Dental Clinic. We offer a variety of braces, metal, ceramic, or lingual, to suit your preferences. Our goal is to achieve improved alignment, better bite function, and a confident, harmonious smile.',
    category: 'Orthodontics',
    imageUrl: '/src/assets/images/orthodontic_treatment_braces_1791794802123.jpg',
    badge: 'Alignment Expert',
    isCore: true,
    features: ['Metal & ceramic options', 'Customized wire archwires', 'Bite and jaw alignment', 'Regular progress reviews']
  },
  {
    id: 'clear-aligners',
    name: 'Clear Aligners',
    shortDescription: 'Discreet, transparent removable trays for modern smile straightening.',
    fullDescription: 'For a discreet alternative to traditional braces, Sakthi Dental Clinic offers clear aligners. These transparent, removable trays gradually shift your teeth into perfect alignment, providing comfort and flexibility throughout your orthodontic journey.',
    category: 'Orthodontics',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    badge: 'Virtually Invisible',
    isCore: false,
    features: ['Removable while eating & brushing', 'Virtually invisible look', '3D digital treatment mapping', 'Zero metal brackets or wires']
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'Can medication completely relieve tooth pain?',
    answer: 'Not entirely. While medications may offer short-term relief, long-lasting relief requires identifying and treating the root cause of the pain through professional dental care.',
    category: 'General'
  },
  {
    id: 2,
    question: 'Does teeth scaling cause enamel damage, sensitivity, or gaps between teeth?',
    answer: 'No. Scaling safely removes plaque and tartar from teeth and below the gum line. It doesn’t damage enamel or create gaps. Some temporary sensitivity may occur, but it usually subsides as gums heal and reattach to the teeth.',
    category: 'Scaling & Cleaning'
  },
  {
    id: 3,
    question: 'Can fluorosis stains be removed through scaling?',
    answer: 'Scaling can remove surface (extrinsic) stains but not fluorosis, which is an internal (intrinsic) stain. Fluorosis may require treatments like bleaching, veneers, or crowns for cosmetic improvement.',
    category: 'Scaling & Cleaning'
  },
  {
    id: 4,
    question: 'Can painful teeth be treated with fillings?',
    answer: 'Not always. If the cavity has reached the pulp, the innermost layer of the tooth, simple filling won’t help. In such cases, root canal treatment or tooth extraction might be necessary. Fillings are effective only when the damage is limited to the outer layers (enamel and dentin).',
    category: 'Treatments'
  },
  {
    id: 5,
    question: 'Is placing a cap or crown necessary after root canal treatment (RCT)?',
    answer: 'Yes. A crown is recommended after RCT to protect the treated tooth, which may be weaker due to decay. It prevents fractures and adds durability, especially during chewing.',
    category: 'Treatments'
  },
  {
    id: 6,
    question: 'Can milk teeth need root canal treatment (RCT)?',
    answer: 'Yes. If a milk tooth has a deep cavity and is likely to remain in the mouth for some time, an RCT can preserve it and prevent infection or early loss.',
    category: 'Treatments'
  },
  {
    id: 7,
    question: 'How can I maintain good oral hygiene?',
    answer: 'Brush your teeth twice daily with proper technique, rinse after meals, floss regularly, and schedule routine check-ups with your dentist to maintain healthy teeth and gums.',
    category: 'Hygiene'
  },
  {
    id: 8,
    question: 'What is the best age to get braces?',
    answer: 'Braces are most effective between ages 12 and 14, when the jaw and teeth are still developing. However, some cases may benefit from earlier intervention depending on the condition.',
    category: 'Braces & Aligners'
  },
  {
    id: 9,
    question: 'Do all wisdom teeth need to be removed?',
    answer: 'No. Wisdom teeth only require removal if they are impacted, infected, or causing pain due to crowding or damage to adjacent teeth.',
    category: 'Treatments'
  },
  {
    id: 10,
    question: 'Is it important to replace missing teeth after extraction?',
    answer: 'Yes. Replacing extracted teeth helps maintain proper bite alignment and prevents adjacent teeth from shifting, which can affect chewing and overall oral function.',
    category: 'Treatments'
  },
  {
    id: 11,
    question: 'What are the benefits of dental implants?',
    answer: 'Dental implants restore both the appearance and functionality of missing teeth. They provide a stable, natural-looking solution that can improve confidence and overall quality of life.',
    category: 'Treatments'
  },
  {
    id: 12,
    question: 'Which type of toothbrush and toothpaste should I use?',
    answer: 'Use a soft or medium-bristled toothbrush with a small head for better reach. Choose a non-abrasive fluoride toothpaste and replace your toothbrush every three months for optimal hygiene.',
    category: 'Hygiene'
  },
  {
    id: 13,
    question: 'What causes tooth sensitivity?',
    answer: 'Tooth sensitivity can result from enamel wear (due to attrition or abrasion), tooth decay, exposed tooth roots, or hairline cracks in the teeth.',
    category: 'General'
  },
  {
    id: 14,
    question: 'How often should I see a dentist?',
    answer: 'Visiting your dentist every six months is recommended for routine check-ups, professional cleaning, and preventive care to maintain good oral health.',
    category: 'General'
  }
];

export const ABOUT_STORY = {
  headline: 'Get to Know Dr. Anupriya',
  subheading: 'Your Trusted Partner in Dental Care',
  paragraphs: [
    'Bringing over 20 years of expertise, Dr. Anupriya stands as a leading figure in modern dentistry at Hosur. She began her professional journey after graduating in 2000. Her passion for delivering exceptional dental care was further nurtured during six impactful years at Mathura Clinic, where she refined her clinical skills and deepened her commitment to patient wellbeing.',
    'In 2004, Dr. Anupriya established Sakthi Dental Clinic in Hosur with a clear vision to make high-quality dental care accessible to all. Her dedication extends beyond private practice, reflected in her long-standing service with the Primary Health Center at Chandara Hospital, where she has been a trusted dental consultant for over a decade.',
    'At Sakthi Dental Clinic, we believe that a healthy smile is a gateway to confidence and wellbeing. Our clinic blends advanced dental technology with a warm, patient-friendly environment to ensure every visit is comfortable and stress-free. From routine check-ups to specialized treatments, we prioritize personalized care tailored to your unique dental needs.',
    'Whether you\'re looking for preventive care, cosmetic enhancements, or restorative solutions, Dr. Anupriya and her team are committed to delivering excellence at every step. Because here, your smile isn\'t just treated it\'s celebrated.'
  ],
  mission: 'At Sakthi Dental Clinic, our mission is to redefine oral healthcare by delivering personalized, compassionate, and advanced dental services. We are committed to creating a welcoming environment where patients feel comfortable and confident in taking charge of their dental health. By integrating state-of-the-art technology with patient-centric care, we ensure that every treatment enhances not only your smile but also your overall well-being. Continuous learning and innovation drive us to provide comprehensive solutions, from preventive care to complex dental procedures, all designed to promote long-lasting oral health.',
  vision: 'Our vision is to be a leading force in modern dentistry, known for setting new standards in patient care, innovation, and community engagement. At Sakthi Dental Clinic, we believe that building trust, encouraging preventive practices, and fostering a culture of excellence are key to making a lasting impact. We aspire to not only deliver exceptional dental outcomes but also to contribute positively to the community through awareness initiatives and outreach programs. With a focus on holistic care and a passion for brightening lives, we are dedicated to ensuring that every smile we treat reflects confidence, health, and happiness.'
};

export const PRIVACY_POLICY_CONTENT = {
  title: 'Privacy Policy',
  intro: 'At Sakthi Dental Clinic, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, store, and disclose information from visitors and users of our website.',
  sections: [
    {
      title: '1. Information We Collect',
      body: `We may collect personal identification information from users in several ways, including when users:
• Visit our website
• Fill out forms (e.g contact or appointment requests)
• Engage with features, services, or resources on our site

Types of information we may collect include:
• Name
• Email address
• Phone number

Users can visit our site anonymously. We only collect personal data when it is voluntarily submitted by users. Refusing to provide certain personal information may limit access to some site features or services.

We may also gather non-personal identification information, such as:
• Browser type
• Device details
• Operating system
• Internet service provider
• Technical data related to user interaction with the site`
    },
    {
      title: '2. Cookies',
      body: `Our website may use "cookies" to enhance the user experience. Cookies are small files stored on a user's device for record-keeping purposes and to track preferences or site activity.

Users can set their browser to refuse cookies or alert them when cookies are being used. Please note that disabling cookies may affect some site functionality.`
    },
    {
      title: '3. How We Use Your Information',
      body: `Collected information may be used for the following purposes:
• To operate and manage the website: Ensuring content displays properly and services run smoothly.
• To improve customer service: Helping us respond to inquiries more efficiently.
• To enhance the website experience: Feedback provided may help us improve content, usability, and performance.
• To communicate via email: We may use the email address to respond to inquiries, appointments, or service updates.`
    },
    {
      title: '4. Data Security',
      body: `We implement appropriate security measures for data collection, storage, and processing to safeguard your personal information from unauthorized access, alteration, or destruction.`
    },
    {
      title: '5. Information Sharing',
      body: `We do not sell, trade, or rent personal identification information to third parties. We may share general demographic data (not linked to any personal information) with trusted partners or affiliates to improve service delivery and site performance.`
    },
    {
      title: '6. Children’s Privacy',
      body: `In compliance with the Children’s Online Privacy Protection Act (COPPA), we do not knowingly collect any personal information from children under the age of 13. Our site is not intended to attract users below this age group.`
    },
    {
      title: '7. Changes to This Policy',
      body: `Sakthi Dental Clinic may update this Privacy Policy from time to time. We encourage users to review this page periodically to stay informed about how we protect your information.`
    },
    {
      title: '8. Acceptance of Terms',
      body: `By using this website, you agree to this policy. If you do not accept our Privacy Policy, please do not use our website. Continued use of the site following any updates will be deemed as your acceptance of the revised policy.`
    },
    {
      title: '9. Contact Us',
      body: `If you have any questions about this Privacy Policy or your interactions with our site, please contact us:
📍 Address: B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109, India
📧 Email: info@sakthidentalclinic.in
📞 Phone: +91 9862890897 / +91 9363298118`
    }
  ]
};
