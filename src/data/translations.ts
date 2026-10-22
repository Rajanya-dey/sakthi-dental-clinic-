export type LanguageCode = 'en' | 'ta' | 'kn' | 'te' | 'hi';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' }
];

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navAbout: string;
  navTreatments: string;
  navFacilities: string;
  navFaqs: string;
  navContact: string;
  navPatientPortal: string;
  navAdminPortal: string;
  navFixAppointment: string;
  navBook: string;
  navEmergency: string;
  navSmileGallery: string;
  navOralQuiz: string;
  navCourses: string;

  // Header & Status
  locationHosur: string;
  timingsDaily: string;
  waitTimeLabel: string;
  waitingPatients: string;

  // Patient Portal Auth
  portalTitle: string;
  portalSubtitle: string;
  portalLogin: string;
  portalRegister: string;
  portalDemoAccount: string;
  portalLogout: string;
  portalLoggedInAs: string;
  patientIdLabel: string;
  patientPhoneLabel: string;
  patientPasswordLabel: string;
  patientNameLabel: string;
  patientEmailLabel: string;
  signInBtn: string;
  createAccountBtn: string;
  quickDemoLogin: string;
  invalidCredentials: string;

  // Patient Dashboard Tabs
  tabUpcomingAppointments: string;
  tabMedicalHistory: string;
  tabDigitalPrescriptions: string;
  tabProfileSettings: string;
  tabPatientFeedback: string;

  // Appointments
  noUpcomingAppointments: string;
  bookNewAppointment: string;
  appointmentConfirmed: string;
  appointmentPending: string;
  doctorLabel: string;
  treatmentLabel: string;
  dateLabel: string;
  timeLabel: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  rescheduleNotice: string;
  addToCalendar: string;
  downloadSlip: string;
  calendarView: string;
  listView: string;
  calendarTitle: string;
  monthView: string;
  weekView: string;
  todayBtn: string;

  // Medical History
  clinicalVisitHistory: string;
  pastTreatmentsCount: string;
  treatedTeeth: string;
  doctorNotes: string;
  allergiesKnown: string;
  bloodGroup: string;
  statusCompleted: string;

  // Digital Prescriptions
  prescriptionsTitle: string;
  activeRxCount: string;
  rxNumber: string;
  prescribedBy: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  printRx: string;
  officialSeal: string;

  // Chatbot
  chatbotTitle: string;
  chatbotSubtitle: string;
  chatbotLaunch: string;
  chatbotTakeQuiz: string;
  chatbotDismiss: string;
  voiceDictateStart: string;
  voiceDictateListening: string;
  voiceDictateStop: string;
  voiceDictateTooltip: string;
  voiceDictatePrompt: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    navHome: 'Home',
    navAbout: 'About Us',
    navTreatments: 'Treatments',
    navFacilities: 'Facilities',
    navFaqs: 'FAQs',
    navContact: 'Contact Us',
    navPatientPortal: 'Patient Portal',
    navAdminPortal: 'Admin Portal',
    navFixAppointment: 'Fix an Appointment',
    navBook: 'Book',
    navEmergency: 'Emergency Support',
    navSmileGallery: 'Smile Gallery',
    navOralQuiz: 'Oral Health AI',
    navCourses: 'Doctor Courses',

    locationHosur: 'Anthivadi, Hosur, Tamil Nadu',
    timingsDaily: 'Daily: 9:00 AM – 9:00 PM',
    waitTimeLabel: 'Walk-in Wait Time:',
    waitingPatients: 'waiting',

    portalTitle: 'Secure Patient Portal',
    portalSubtitle: 'Access medical history, appointments, and verified digital prescriptions',
    portalLogin: 'Patient Sign In',
    portalRegister: 'Register New Account',
    portalDemoAccount: 'Try Demo Patient Account',
    portalLogout: 'Sign Out',
    portalLoggedInAs: 'Logged in as',
    patientIdLabel: 'Patient UHID / Phone',
    patientPhoneLabel: 'Mobile Number',
    patientPasswordLabel: 'Passcode / Password',
    patientNameLabel: 'Full Patient Name',
    patientEmailLabel: 'Email Address',
    signInBtn: 'Secure Sign In',
    createAccountBtn: 'Create Patient Account',
    quickDemoLogin: 'One-Click Demo Login (Priya Sundaram)',
    invalidCredentials: 'Invalid mobile number or passcode. Try the demo button.',

    tabUpcomingAppointments: 'Upcoming Visits & Reminders',
    tabMedicalHistory: 'Medical History & Visits',
    tabDigitalPrescriptions: 'Digital Prescriptions (Rx)',
    tabProfileSettings: 'Patient Dental Profile',
    tabPatientFeedback: 'Patient Feedback & Ratings',

    noUpcomingAppointments: 'No upcoming visits scheduled at this time.',
    bookNewAppointment: 'Schedule New Appointment',
    appointmentConfirmed: 'Confirmed',
    appointmentPending: 'Pending Confirmation',
    doctorLabel: 'Consulting Doctor',
    treatmentLabel: 'Treatment / Procedure',
    dateLabel: 'Date',
    timeLabel: 'Slot Time',
    countdownDays: 'days',
    countdownHours: 'hrs',
    countdownMinutes: 'mins',
    rescheduleNotice: 'To reschedule within 24 hours, call clinic reception directly at +91 9862890897.',
    addToCalendar: 'Add to Calendar',
    downloadSlip: 'Download Appointment Pass',
    calendarView: 'Calendar View',
    listView: 'List / Cards View',
    calendarTitle: 'Upcoming Appointment Calendar',
    monthView: 'Month',
    weekView: 'Week',
    todayBtn: 'Today',

    clinicalVisitHistory: 'Clinical Records & Dental History',
    pastTreatmentsCount: 'Past Procedures',
    treatedTeeth: 'Target Tooth / Quadrant',
    doctorNotes: 'Doctor Notes & Diagnosis',
    allergiesKnown: 'Recorded Allergies',
    bloodGroup: 'Blood Group',
    statusCompleted: 'Completed',

    prescriptionsTitle: 'Official Digital Prescriptions',
    activeRxCount: 'Prescriptions on Record',
    rxNumber: 'Rx Ref #',
    prescribedBy: 'Prescribing Specialist',
    medicationName: 'Medication',
    dosage: 'Dosage',
    frequency: 'Timing / Frequency',
    duration: 'Duration',
    instructions: 'Clinical Instructions',
    printRx: 'Print / Save Rx PDF',
    officialSeal: 'Verified by Sakthi Dental Clinic • Hosur',

    chatbotTitle: 'Oral Health AI Assistant',
    chatbotSubtitle: '2-min triage assessment & clinical recommendations',
    chatbotLaunch: 'Open Oral Health AI',
    chatbotTakeQuiz: 'Take 2-min Oral Wellness Assessment',
    chatbotDismiss: 'Dismiss',
    voiceDictateStart: 'Dictate symptoms or request appointment',
    voiceDictateListening: 'Listening... speak symptoms or appointment request',
    voiceDictateStop: 'Stop dictating',
    voiceDictateTooltip: 'Click to speak symptoms or appointment time (Voice-to-Text)',
    voiceDictatePrompt: 'Try saying: "I have pain in upper molar" or "Book appointment for cleaning Saturday 10am"'
  },

  ta: {
    navHome: 'முகப்பு',
    navAbout: 'எங்களை பற்றி',
    navTreatments: 'சிகிச்சைகள்',
    navFacilities: 'வசதிகள்',
    navFaqs: 'கேள்வி-பதில்',
    navContact: 'தொடர்பு கொள்ள',
    navPatientPortal: 'நோயாளி போர்டல்',
    navAdminPortal: 'நிர்வாக போர்டல்',
    navFixAppointment: 'முன்பதிவு செய்க',
    navBook: 'பதிவு',
    navEmergency: 'அவசர உதவி',
    navSmileGallery: 'புன்னகை கேலரி',
    navOralQuiz: 'பல் நல AI',
    navCourses: 'மருத்துவ படிப்புகள்',

    locationHosur: 'அந்திவாடி, ஓசூர், தமிழ்நாடு',
    timingsDaily: 'தினசரி: காலை 9:00 – இரவு 9:00',
    waitTimeLabel: 'நேரடி காத்திருப்பு நேரம்:',
    waitingPatients: 'காத்திருக்கிறார்கள்',

    portalTitle: 'பாதுகாப்பான நோயாளி போர்டல்',
    portalSubtitle: 'மருத்துவ வரலாறு, அடுத்த முன்பதிவுகள் மற்றும் டிஜிட்டல் மருந்துச்சீட்டுகளைப் பார்க்கவும்',
    portalLogin: 'நோயாளி உள்நுழைவு',
    portalRegister: 'புதிய கணக்கு பதிவு',
    portalDemoAccount: 'டெமோ கணக்கை முயற்சிக்கவும்',
    portalLogout: 'வெளியேறு',
    portalLoggedInAs: 'உள்நுழைந்துள்ள நபர்',
    patientIdLabel: 'நோயாளி எண் / மொபைல்',
    patientPhoneLabel: 'மொபைல் எண்',
    patientPasswordLabel: 'கடவுக்குறியீடு (Password)',
    patientNameLabel: 'நோயாளி பெயர்',
    patientEmailLabel: 'மின்னஞ்சல் முகவரி',
    signInBtn: 'பாதுகாப்பாக உள்நுழைக',
    createAccountBtn: 'நோயாளி கணக்கு உருவாக்குக',
    quickDemoLogin: 'டெமோ கணக்குடன் நுழைக (பிரியா சுந்தரம்)',
    invalidCredentials: 'தவறான மொபைல் அல்லது கடவுச்சொல். டெமோ பட்டனை அழுத்தவும்.',

    tabUpcomingAppointments: 'வரவிருக்கும் முன்பதிவுகள்',
    tabMedicalHistory: 'மருத்துவ வரலாறு & பதிவுகள்',
    tabDigitalPrescriptions: 'டிஜிட்டல் மருந்துச்சீட்டு (Rx)',
    tabProfileSettings: 'நோயாளி சுயவிவரம்',
    tabPatientFeedback: 'நோயாளி கருத்து & மதிப்பீடு',

    noUpcomingAppointments: 'தற்போது வரவிருக்கும் முன்பதிவுகள் எதுவும் இல்லை.',
    bookNewAppointment: 'புதிய முன்பதிவு செய்க',
    appointmentConfirmed: 'உறுதி செய்யப்பட்டது',
    appointmentPending: 'நிலுவையில் உள்ளது',
    doctorLabel: 'பரிசோதிக்கும் மருத்துவர்',
    treatmentLabel: 'சிகிச்சை முறை',
    dateLabel: 'தேதி',
    timeLabel: 'நேரம்',
    countdownDays: 'நாட்கள்',
    countdownHours: 'மணி',
    countdownMinutes: 'நிமிடங்கள்',
    rescheduleNotice: '24 மணி நேரத்திற்குள் மறுதிட்டமிட +91 9862890897 எண்ணை அழைக்கவும்.',
    addToCalendar: 'நாட்காட்டியில் சேர்க்க',
    downloadSlip: 'அனுமதி சீட்டு பதிவிறக்கம்',
    calendarView: 'நாட்காட்டி காட்சி',
    listView: 'பட்டியல் காட்சி',
    calendarTitle: 'முன்பதிவு நாட்காட்டி',
    monthView: 'மாதம்',
    weekView: 'வாரம்',
    todayBtn: 'இன்று',

    clinicalVisitHistory: 'முந்தைய மருத்துவ வருகை பதிவுகள்',
    pastTreatmentsCount: 'முடிந்த சிகிச்சைகள்',
    treatedTeeth: 'சிகிச்சை அளிக்கப்பட்ட பல்',
    doctorNotes: 'மருத்துவர் குறிப்புகள் & ஆய்வு',
    allergiesKnown: 'ஒவ்வாமை விவரங்கள்',
    bloodGroup: 'இரத்த வகை',
    statusCompleted: 'நிறைவடைந்தது',

    prescriptionsTitle: 'அங்கீகரிக்கப்பட்ட டிஜிட்டல் மருந்துச்சீட்டுகள்',
    activeRxCount: 'பதிவில் உள்ள மருந்துச்சீட்டுகள்',
    rxNumber: 'மருந்துச்சீட்டு எண் #',
    prescribedBy: 'பரிந்துரைத்த நிபுணர்',
    medicationName: 'மருந்து பெயர்',
    dosage: 'அளவு',
    frequency: 'எப்போது உட்கொள்ள வேண்டும்',
    duration: 'நாட்கள்',
    instructions: 'மருத்துவ ஆலோசனைகள்',
    printRx: 'மருந்துச்சீட்டை அச்சிடுக / சேமிக்க',
    officialSeal: 'சக்தி டென்டல் கிளினிக் • ஓசூர் சரிபார்க்கப்பட்டது',

    chatbotTitle: 'பல் நல AI உதவியாளர்',
    chatbotSubtitle: '2 நிமிட வாய் நல மதிப்பீடு & சிறப்பு மருத்துவ ஆலோசனைகள்',
    chatbotLaunch: 'பல் நல AI தொடங்கு',
    chatbotTakeQuiz: '2 நிமிட மதிப்பீட்டைத் தொடங்குங்கள்',
    chatbotDismiss: 'மூடுக',
    voiceDictateStart: 'குரல் மூலம் அறிகுறிகள் அல்லது முன்பதிவைக் கூறவும்',
    voiceDictateListening: 'கேட்கிறது... அறிகுறிகள் அல்லது தேதியைச் சொல்லுங்கள்',
    voiceDictateStop: 'பேசுவதை நிறுத்துக',
    voiceDictateTooltip: 'குரல் மூலம் பேச கிளிக் செய்யவும் (Voice-to-Text)',
    voiceDictatePrompt: 'உதாரணம்: "பல் வலி உள்ளது" அல்லது "நாளை பல் சுத்தம் செய்ய அப்பாயிண்ட்மென்ட் வேண்டும்"'
  },

  kn: {
    navHome: 'ಮುಖಪುಟ',
    navAbout: 'ನಮ್ಮ ಬಗ್ಗೆ',
    navTreatments: 'ಚಿಕಿತ್ಸೆಗಳು',
    navFacilities: 'ಸೌಲಭ್ಯಗಳು',
    navFaqs: 'ಪ್ರಶ್ನೋತ್ತರ',
    navContact: 'ಸಂಪರ್ಕಿಸಿ',
    navPatientPortal: 'ರೋಗಿ ಪೋರ್ಟಲ್',
    navAdminPortal: 'ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್',
    navFixAppointment: 'ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ',
    navBook: 'ಬುಕ್ ಮಾಡಿ',
    navEmergency: 'ತುರ್ತು ನೆರವು',
    navSmileGallery: 'ಸ್ಮೈಲ್ ಗ್ಯಾಲರಿ',
    navOralQuiz: 'ದಂತ ಆರೈಕೆ AI',
    navCourses: 'ವೈದ್ಯರ ಕೋರ್ಸ್‌ಗಳು',

    locationHosur: 'ಅಂತಿವಾಡಿ, ಹೊಸೂರು, ತಮಿಳುನಾಡು',
    timingsDaily: 'ದಿನನಿತ್ಯ: ಬೆಳಿಗ್ಗೆ 9:00 – ರಾತ್ರಿ 9:00',
    waitTimeLabel: 'ಕಾಯುವಿಕೆ ಸಮಯ:',
    waitingPatients: 'ಕಾಯುತ್ತಿದ್ದಾರೆ',

    portalTitle: 'ಸುರಕ್ಷಿತ ರೋಗಿ ಪೋರ್ಟಲ್',
    portalSubtitle: 'ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ, ಮುಂದಿನ ಭೇಟಿಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ವೀಕ್ಷಿಸಿ',
    portalLogin: 'ರೋಗಿ ಲಾಗಿನ್',
    portalRegister: 'ಹೊಸ ಖಾತೆ ರಚಿಸಿ',
    portalDemoAccount: 'ಡೆಮೋ ಖಾತೆ ಪ್ರಯತ್ನಿಸಿ',
    portalLogout: 'ಲಾಗ್ ಔಟ್',
    portalLoggedInAs: 'ಲಾಗಿನ್ ಆಗಿರುವವರು',
    patientIdLabel: 'ರೋಗಿ ಐಡಿ / ಮೊಬೈಲ್',
    patientPhoneLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    patientPasswordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
    patientNameLabel: 'ಪೂರ್ಣ ಹೆಸರು',
    patientEmailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
    signInBtn: 'ಲಾಗಿನ್ ಮಾಡಿ',
    createAccountBtn: 'ಖಾತೆ ರಚಿಸಿ',
    quickDemoLogin: 'ಡೆಮೋ ಲಾಗಿನ್ (ಪ್ರಿಯಾ ಸುಂದರಮ್)',
    invalidCredentials: 'ತಪ್ಪಾದ ಮೊಬೈಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್.',

    tabUpcomingAppointments: 'ಮುಂದಿನ ಅಪಾಯಿಂಟ್ಮೆಂಟ್‌ಗಳು',
    tabMedicalHistory: 'ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು',
    tabDigitalPrescriptions: 'ಡಿಜಿಟಲ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ (Rx)',
    tabProfileSettings: 'ರೋಗಿ ವಿವರ',
    tabPatientFeedback: 'ರೋಗಿಯ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ರೇಟಿಂಗ್',

    noUpcomingAppointments: 'ಯಾವುದೇ ಮುಂಬರುವ ಭೇಟಿಗಳು ನಿಗದಿಯಾಗಿಲ್ಲ.',
    bookNewAppointment: 'ಹೊಸ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ',
    appointmentConfirmed: 'ದೃಢಪಟ್ಟಿದೆ',
    appointmentPending: 'ಬಾಕಿ ಉಳಿದಿದೆ',
    doctorLabel: 'ವೈದ್ಯರು',
    treatmentLabel: 'ಚಿಕಿತ್ಸೆ',
    dateLabel: 'ದಿನಾಂಕ',
    timeLabel: 'ಸಮಯ',
    countdownDays: 'ದಿನಗಳು',
    countdownHours: 'ಗಂಟೆಗಳು',
    countdownMinutes: 'ನಿಮಿಷಗಳು',
    rescheduleNotice: 'ಬದಲಾವಣೆಗಾಗಿ +91 9862890897 ಗೆ ಕರೆ ಮಾಡಿ.',
    addToCalendar: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    downloadSlip: 'ಸ್ಲಿಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    calendarView: 'ಕ್ಯಾಲೆಂಡರ್ ನೋಟ',
    listView: 'ಪಟ್ಟಿ ನೋಟ',
    calendarTitle: 'ಮುಂಬರುವ ಭೇಟಿಗಳ ಕ್ಯಾಲೆಂಡರ್',
    monthView: 'ತಿಂಗಳು',
    weekView: 'ವಾರ',
    todayBtn: 'ಇಂದು',

    clinicalVisitHistory: 'ಚಿಕಿತ್ಸಾ ಇತಿಹಾಸ',
    pastTreatmentsCount: 'ಹಿಂದಿನ ಚಿಕಿತ್ಸೆಗಳು',
    treatedTeeth: 'ಚಿಕಿತ್ಸೆ ಪಡೆದ ಹಲ್ಲು',
    doctorNotes: 'ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು',
    allergiesKnown: 'ಅಲರ್ಜಿಗಳು',
    bloodGroup: 'ರಕ್ತದ ಗುಂಪು',
    statusCompleted: 'ಪೂರ್ಣಗೊಂಡಿದೆ',

    prescriptionsTitle: 'ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು',
    activeRxCount: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳ ಸಂಖ್ಯೆ',
    rxNumber: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸಂ #',
    prescribedBy: 'ಸೂಚಿಸಿದ ತಜ್ಞರು',
    medicationName: 'ಔಷಧಿ ಹೆಸರು',
    dosage: 'ಪ್ರಮಾಣ',
    frequency: 'ಸಮಯ / ಕ್ರಮ',
    duration: 'ಅವಧಿ',
    instructions: 'ಸೂಚನೆಗಳು',
    printRx: 'ಪ್ರಿಂಟ್ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ',
    officialSeal: 'ಶಕ್ತಿ ಡೆಂಟಲ್ ಕ್ಲಿನಿಕ್ • ಹೊಸೂರು',

    chatbotTitle: 'ದಂತ ಆರೈಕೆ AI ಸಹಾಯಕ',
    chatbotSubtitle: '2 ನಿಮಿಷಗಳ ಬಾಯಿ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ',
    chatbotLaunch: 'AI ಆರಂಭಿಸಿ',
    chatbotTakeQuiz: '2 ನಿಮಿಷಗಳ ರಸಪ್ರಶ್ನೆ',
    chatbotDismiss: 'ಮುಚ್ಚು',
    voiceDictateStart: 'ಧ್ವನಿ ಮೂಲಕ ರೋಗಲಕ್ಷಣ ಅಥವಾ ಭೇಟಿ ವಿನಂತಿಸಿ',
    voiceDictateListening: 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಮಾತನಾಡಿ',
    voiceDictateStop: 'ನಿಲ್ಲಿಸಿ',
    voiceDictateTooltip: 'ಧ್ವನಿಯ ಮೂಲಕ ಮಾತನಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ (Voice-to-Text)',
    voiceDictatePrompt: 'ಉದಾಹರಣೆ: "ನನಗೆ ಹಲ್ಲು ನೋವು ಇದೆ" ಅಥವಾ "ನಾಳೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬೇಕು"'
  },

  te: {
    navHome: 'హోమ్',
    navAbout: 'మా గురించి',
    navTreatments: 'చికిత్సలు',
    navFacilities: 'సౌకర్యాలు',
    navFaqs: 'ప్రశ్నలు-సమాధానాలు',
    navContact: 'సంప్రదించండి',
    navPatientPortal: 'పేషెంట్ పోర్టల్',
    navAdminPortal: 'అడ్మిన్ పోర్టల్',
    navFixAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    navBook: 'బుక్',
    navEmergency: 'అత్యవసర సహాయం',
    navSmileGallery: 'స్మైల్ గ్యాలరీ',
    navOralQuiz: 'ఓరల్ హెల్త్ AI',
    navCourses: 'డాక్టర్ కోర్సులు',

    locationHosur: 'అంతివాడి, హోసూరు, తమిళనాడు',
    timingsDaily: 'రోజూ: ఉదయం 9:00 – రాత్రి 9:00',
    waitTimeLabel: 'వేచి ఉండే సమయం:',
    waitingPatients: 'వేచి ఉన్నారు',

    portalTitle: 'సురక్షిత పేషెంట్ పోర్టల్',
    portalSubtitle: 'వైద్య చరిత్ర, అపాయింట్‌మెంట్‌లు మరియు డిజిటల్ ప్రిస్క్రిప్షన్‌లను చూడండి',
    portalLogin: 'పేషెంట్ లాగిన్',
    portalRegister: 'కొత్త ఖాతా నమోదు',
    portalDemoAccount: 'డెమో ఖాతాను ప్రయత్నించండి',
    portalLogout: 'లాగ్ అవుట్',
    portalLoggedInAs: 'లాగిన్ అయిన వారు',
    patientIdLabel: 'పేషెంట్ ఐడీ / మొబైల్',
    patientPhoneLabel: 'మొబైల్ నంబర్',
    patientPasswordLabel: 'పాస్‌వర్డ్',
    patientNameLabel: 'పూర్తి పేరు',
    patientEmailLabel: 'ఇమెయిల్ చిరునామా',
    signInBtn: 'లాగిన్ చేయండి',
    createAccountBtn: 'ఖాతా సృష్టించండి',
    quickDemoLogin: 'డెమో లాగిన్ (ప్రియా సుందరం)',
    invalidCredentials: 'తప్పు మొబైల్ లేదా పాస్‌వర్డ్.',

    tabUpcomingAppointments: 'రాబోయే అపాయింట్‌మెంట్‌లు',
    tabMedicalHistory: 'వైద్య రికార్డులు',
    tabDigitalPrescriptions: 'డిజిటల్ ప్రిస్క్రిప్షన్ (Rx)',
    tabProfileSettings: 'పేషెంట్ ప్రొఫైల్',
    tabPatientFeedback: 'రోగి అభిప్రాయం & రేటింగ్స్',

    noUpcomingAppointments: 'ప్రస్తుతం రాబోయే అపాయింట్‌మెంట్‌లు ఏవీ లేవు.',
    bookNewAppointment: 'కొత్త అపాయింట్‌మెంట్ బుక్ చేయండి',
    appointmentConfirmed: 'ఖరారైంది',
    appointmentPending: 'పెండింగ్‌లో ఉంది',
    doctorLabel: 'డాక్టర్',
    treatmentLabel: 'చికిత్స',
    dateLabel: 'తేదీ',
    timeLabel: 'సమయం',
    countdownDays: 'రోజులు',
    countdownHours: 'గంటలు',
    countdownMinutes: 'నిమిషాలు',
    rescheduleNotice: 'మార్పు కోసం +91 9862890897 కి కాల్ చేయండి.',
    addToCalendar: 'క్యాలెండర్‌కు జోడించండి',
    downloadSlip: 'స్లిప్ డౌన్‌లోడ్ చేయండి',
    calendarView: 'క్యాలెండర్ వీక్షణ',
    listView: 'జాబితా వీక్షణ',
    calendarTitle: 'రాబోయే అపాయింట్‌మెంట్‌ల క్యాలెండర్',
    monthView: 'నెల',
    weekView: 'వారం',
    todayBtn: 'ఈ రోజు',

    clinicalVisitHistory: 'గత చికిత్సా వివరాలు',
    pastTreatmentsCount: 'పూర్తయిన చికిత్సలు',
    treatedTeeth: 'చికిత్స పొందిన దంతం',
    doctorNotes: 'డాక్టర్ నోట్స్',
    allergiesKnown: 'అలెర్జీలు',
    bloodGroup: 'రక్త వర్గం',
    statusCompleted: 'పూర్తయింది',

    prescriptionsTitle: 'అధికారిక డిజిటల్ ప్రిస్క్రిప్షన్‌లు',
    activeRxCount: 'ప్రిస్క్రిప్షన్‌లు',
    rxNumber: 'ప్రిస్క్రిప్షన్ నం #',
    prescribedBy: 'సూచించిన నిపుణులు',
    medicationName: 'మందు పేరు',
    dosage: 'మోతాదు',
    frequency: 'సమయం / తరచుదనం',
    duration: 'వ్యవధి',
    instructions: 'సూచనలు',
    printRx: 'ప్రింట్ / పీడీఎఫ్ సేవ్',
    officialSeal: 'శక్తి డెంటల్ క్లినిక్ • హోసూరు',

    chatbotTitle: 'ఓరల్ హెల్త్ AI అసిస్టెంట్',
    chatbotSubtitle: '2 నిమిషాల దంత సంరక్షణ అంచనా',
    chatbotLaunch: 'AI ప్రారంభించండి',
    chatbotTakeQuiz: '2 నిమిషాల క్విజ్ చేయండి',
    chatbotDismiss: 'మూసివేయి',
    voiceDictateStart: 'వాయిస్ ద్వారా లక్షణాలు లేదా అపాయింట్‌మెంట్ చెప్పండి',
    voiceDictateListening: 'వింటోంది... లక్షణాలు లేదా సమయం చెప్పండి',
    voiceDictateStop: 'ఆపండి',
    voiceDictateTooltip: 'వాయిస్ ద్వారా మాట్లాడటానికి క్లిక్ చేయండి (Voice-to-Text)',
    voiceDictatePrompt: 'ఉదాహరణ: "పన్ను నొప్పిగా ఉంది" లేదా "రేపు క్లీనింగ్ కోసం అపాయింట్‌మెంట్ కావాలి"'
  },

  hi: {
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navTreatments: 'उपचार सेवाएं',
    navFacilities: 'सुविधाएं',
    navFaqs: 'अक्सर पूछे जाने वाले सवाल',
    navContact: 'संपर्क करें',
    navPatientPortal: 'मरीज़ पोर्टल',
    navAdminPortal: 'व्यवस्थापक पोर्टल',
    navFixAppointment: 'अपॉइंटमेंट लें',
    navBook: 'बुक करें',
    navEmergency: 'आपातकालीन सहायता',
    navSmileGallery: 'स्माइल गैलरी',
    navOralQuiz: 'दांत स्वास्थ्य AI',
    navCourses: 'डॉक्टर कोर्सेस',

    locationHosur: 'अंथीवाड़ी, होसुर, तमिलनाडु',
    timingsDaily: 'प्रतिदिन: सुबह 9:00 – रात 9:00',
    waitTimeLabel: 'अनुमानित प्रतीक्षा समय:',
    waitingPatients: 'कतार में',

    portalTitle: 'सुरक्षित मरीज़ पोर्टल',
    portalSubtitle: 'चिकित्सा इतिहास, आगामी अपॉइंटमेंट और डिजिटल प्रिस्क्रिप्शन देखें',
    portalLogin: 'मरीज़ लॉगिन',
    portalRegister: 'नया खाता पंजीकृत करें',
    portalDemoAccount: 'डेमो खाता आज़माएं',
    portalLogout: 'लॉग आउट',
    portalLoggedInAs: 'लॉग इन हैं',
    patientIdLabel: 'मरीज़ आईडी / मोबाइल',
    patientPhoneLabel: 'मोबाइल नंबर',
    patientPasswordLabel: 'पासवर्ड',
    patientNameLabel: 'मरीज़ का पूरा नाम',
    patientEmailLabel: 'ईमेल पता',
    signInBtn: 'सुरक्षित लॉगिन करें',
    createAccountBtn: 'नया खाता बनाएं',
    quickDemoLogin: 'एक-क्लिक डेमो लॉगिन (प्रिया सुंदरम)',
    invalidCredentials: 'अमान्य मोबाइल या पासवर्ड। डेमो बटन आज़माएं।',

    tabUpcomingAppointments: 'आगामी अपॉइंटमेंट्स व रिमाइंडर',
    tabMedicalHistory: 'चिकित्सा इतिहास व रिकॉर्ड्स',
    tabDigitalPrescriptions: 'डिजिटल प्रिस्क्रिप्शन (Rx)',
    tabProfileSettings: 'मरीज़ प्रोफाइल',
    tabPatientFeedback: 'मरीज़ प्रतिक्रिया व रेटिंग्स',

    noUpcomingAppointments: 'वर्तमान में कोई आगामी अपॉइंटमेंट नहीं है।',
    bookNewAppointment: 'नया अपॉइंटमेंट बुक करें',
    appointmentConfirmed: 'पुष्टि हो चुकी है',
    appointmentPending: 'प्रतीक्षारत',
    doctorLabel: 'सलाहकार डॉक्टर',
    treatmentLabel: 'उपचार',
    dateLabel: 'तारीख',
    timeLabel: 'समय',
    countdownDays: 'दिन',
    countdownHours: 'घंटे',
    countdownMinutes: 'मिनट',
    rescheduleNotice: 'पुनर्निर्धारित करने के लिए क्लिनिक को +91 9862890897 पर कॉल करें।',
    addToCalendar: 'कैलेंडर में जोड़ें',
    downloadSlip: 'अपॉइंटमेंट पास डाउनलोड करें',
    calendarView: 'कैलेंडर दृश्य',
    listView: 'सूची / कार्ड दृश्य',
    calendarTitle: 'आगामी अपॉइंटमेंट कैलेंडर',
    monthView: 'महीना',
    weekView: 'सप्ताह',
    todayBtn: 'आज',

    clinicalVisitHistory: 'पूर्व क्लिनिकल रिकॉर्ड्स व दौरे',
    pastTreatmentsCount: 'संपन्न प्रक्रियाएं',
    treatedTeeth: 'उपचारित दांत',
    doctorNotes: 'डॉक्टर नोट्स व निदान',
    allergiesKnown: 'ज्ञात एलर्जी',
    bloodGroup: 'ब्लड ग्रुप',
    statusCompleted: 'पूर्ण',

    prescriptionsTitle: 'प्रमाणित डिजिटल प्रिस्क्रिप्शन',
    activeRxCount: 'सक्रिय प्रिस्क्रिप्शन',
    rxNumber: 'प्रिस्क्रिप्शन क्रमांक #',
    prescribedBy: 'सलाहकार विशेषज्ञ',
    medicationName: 'दवा का नाम',
    dosage: 'खुराक',
    frequency: 'समय व नियम',
    duration: 'अवधि',
    instructions: 'चिकित्सकीय निर्देश',
    printRx: 'प्रिस्क्रिप्शन प्रिंट / सेव करें',
    officialSeal: 'सकथी डेंटल क्लिनिक • होसुर द्वारा प्रमाणित',

    chatbotTitle: 'ओरल हेल्थ AI सहायक',
    chatbotSubtitle: '2-मिनट ट्राइएज और विशेषज्ञ सलाह',
    chatbotLaunch: 'AI शुरू करें',
    chatbotTakeQuiz: '2-मिनट ओरल वेलनेस असेसमेंट',
    chatbotDismiss: 'हटाएं',
    voiceDictateStart: 'लक्षण या अपॉइंटमेंट बोलकर बताएं',
    voiceDictateListening: 'सुन रहे हैं... लक्षण या समय बोलें',
    voiceDictateStop: 'बोलना समाप्त करें',
    voiceDictateTooltip: 'बोलकर लक्षण या समय बताने के लिए क्लिक करें (Voice-to-Text)',
    voiceDictatePrompt: 'उदाहरण: "दांत में दर्द हो रहा है" या "कल सफाई के लिए अपॉइंटमेंट चाहिए"'
  }
};
