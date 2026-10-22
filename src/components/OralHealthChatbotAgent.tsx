import React, { useState, useEffect, useRef } from 'react';
import { TREATMENTS, DOCTORS, CLINIC_INFO } from '../data/clinicData';
import {
  BLOG_ARTICLES,
  BlogArticle,
  getSuggestionsForPage,
  PageContextSuggestions
} from '../data/blogArticlesData';
import { BlogArticleModal } from './BlogArticleModal';
import { trackEvent } from '../utils/storage';
import {
  X,
  Minimize2,
  Maximize2,
  Send,
  RotateCcw,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Smile,
  Phone,
  Bot,
  Award,
  ShieldCheck,
  Clock,
  ArrowRight,
  Mic,
  MicOff,
  AlertCircle,
  BookOpen,
  Compass,
  ExternalLink,
  BookmarkCheck,
  FileText
} from 'lucide-react';
import { TranslationDictionary } from '../data/translations';

interface AssessmentResult {
  score: number;
  category: string;
  summary: string;
  tips: string[];
  treatmentId: string;
  treatmentName: string;
  doctorId: string;
  doctorName: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  component?:
    | 'options'
    | 'symptoms_multi'
    | 'result_card'
    | 'action_card'
    | 'context_suggestions'
    | 'article_card';
  options?: string[];
  resultData?: AssessmentResult;
  actionData?: {
    title: string;
    description: string;
    buttonText: string;
    treatmentId?: string;
    doctorId?: string;
  };
  articles?: BlogArticle[];
  treatments?: {
    id: string;
    name: string;
    badge: string;
    category: string;
    description: string;
  }[];
  articleData?: BlogArticle;
  timestamp: string;
}

interface OralHealthChatbotAgentProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: (treatmentId: string, doctorId?: string) => void;
  isEnabled?: boolean;
  onDismiss?: () => void;
  t?: TranslationDictionary;
  lang?: string;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  selectedTreatmentId?: string;
}

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['ache', 'pain', 'hurts', 'throbbing', 'cavity', 'decay', 'swelling', 'wisdom'],
    response:
      "Toothache typically stems from deep enamel decay reaching the inner pulp, gum inflammation, or an impacted wisdom tooth.\n\n" +
      "Immediate First Aid Tips:\n" +
      "• Rinse gently with warm saltwater (1/2 tsp salt in warm water).\n" +
      "• Apply a cold compress to your cheek for 15 minutes.\n" +
      "• Do NOT place aspirin directly against the gums (causes chemical burns).\n" +
      "• Avoid extreme hot, cold, or sugary foods.\n\n" +
      "Our Endodontics Specialist Dr. Meera (MDS) can gently evaluate the tooth to relieve pain with root canal therapy or restoration.",
    treatmentId: 'root-canal-therapy',
    doctorId: 'doc-3',
    treatmentName: 'Root Canal Therapy',
    articleId: 'signs-you-need-root-canal'
  },
  {
    keywords: ['bleeding', 'gums', 'tender', 'redness', 'swollen gum', 'brushing blood'],
    response:
      "Bleeding gums during brushing is one of the earliest indicators of gingivitis caused by plaque buildup along the gumline.\n\n" +
      "Doctor's Advice:\n" +
      "• Continue gentle brushing twice daily with a soft-bristled brush.\n" +
      "• Professional ultrasonic scaling safely clears hardened calculus without damaging your natural enamel or loosening teeth.\n\n" +
      "Dr. Balu, our Laser Surgeon & Periodontist, provides gentle laser gum care to restore healthy, firm gums.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-7',
    treatmentName: 'Laser Gum Care & Ultrasonic Scaling',
    articleId: 'scaling-myths-debunked'
  },
  {
    keywords: ['scaling', 'cleaning', 'clean', 'loosen', 'gap', 'stain', 'calculus'],
    response:
      "A very common myth in dental health: 'Does scaling cause teeth to loosen or widen gaps?'\n\n" +
      "Fact: Absolutely not! Ultrasonic scaling vibrates gently to dislodge calcified tartar without scraping enamel. When heavy tartar is cleared, your gums can heal and tighten back onto the tooth roots.\n\n" +
      "Dr. Anupriya recommends routine scaling once every 6 months for a clean, fresh smile.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-1',
    treatmentName: 'Teeth Cleaning & Scaling',
    articleId: 'scaling-myths-debunked'
  },
  {
    keywords: ['aligner', 'brace', 'braces', 'crooked', 'gap between', 'irregular', 'smile design'],
    response:
      "For teeth alignment, Sakthi Dental Clinic offers both Modern Clear Aligners and Ceramic / Metal Braces.\n\n" +
      "• Clear Aligners: Transparent, virtually invisible, custom 3D-molded trays you can remove for meals and brushing.\n" +
      "• Traditional Orthodontics: Highly effective for complex bite corrections.\n\n" +
      "Consult Dr. Sneha N (Consultant Orthodontist) for a comprehensive smile evaluation.",
    treatmentId: 'clear-aligners',
    doctorId: 'doc-5',
    treatmentName: 'Clear Aligners & Invisible Braces',
    articleId: 'clear-aligners-vs-braces'
  },
  {
    keywords: ['whiten', 'yellow', 'bright', 'bleach', 'stains', 'coffee'],
    response:
      "Teeth discoloration occurs naturally from tea, coffee, smoking, or enamel aging.\n\n" +
      "Our clinic provides in-office professional teeth bleaching using safe peroxide gels under light activation. It lightens shades noticeably in a single 45-minute visit with zero enamel erosion under Dr. Anupriya's supervision.",
    treatmentId: 'teeth-whitening-bleaching',
    doctorId: 'doc-4',
    treatmentName: 'Teeth Whitening & Bleaching',
    articleId: 'smile-makeover-veneers'
  },
  {
    keywords: ['kid', 'child', 'children', 'pediatric', 'milk tooth', 'baby teeth'],
    response:
      "Children require a gentle, fear-free dental experience! Our Pediatric care focuses on:\n" +
      "• Fluoride varnish to protect against cavities from sweets.\n" +
      "• Pit and fissure sealants for deep grooves in young molars.\n" +
      "• Habit correction (thumb sucking, mouth breathing).\n\n" +
      "Dr. Kavitha ensures your child leaves with a cheerful smile and no dental anxiety!",
    treatmentId: 'pediatric-dentistry',
    doctorId: 'doc-4',
    treatmentName: 'Pediatric Dental Care',
    articleId: 'pediatric-cavity-prevention'
  },
  {
    keywords: ['implant', 'missing', 'denture', 'broken tooth', 'chewing', 'artificial tooth'],
    response:
      "Missing teeth can cause adjacent teeth to drift and impair chewing.\n\n" +
      "Solutions at Sakthi Dental Clinic:\n" +
      "• Dental Implants: Biocompatible titanium roots anchored into jawbone, topped with natural-looking zirconia crowns (lifetime durability).\n" +
      "• Flexible & Complete Dentures: Comfortable lightweight prosthetics tailored for seniors.\n\n" +
      "Our Implantologist Dr. Vinod and Prosthodontist Dr. Anupriya offer customized restoration.",
    treatmentId: 'dental-implants',
    doctorId: 'doc-6',
    treatmentName: 'Dental Implants & Dentures',
    articleId: 'dental-implants-vs-bridge'
  },
  {
    keywords: ['timing', 'hours', 'open', 'when', 'sunday', 'location', 'address', 'where', 'anthivadi', 'map'],
    response:
      "Sakthi Dental Clinic is located at:\n" +
      "📍 Opp. To R.V. Government Boys Higher Secondary School, Anthivadi, Hosur, Tamil Nadu 635110.\n\n" +
      "⏰ Clinic Timings:\n" +
      "• Monday to Sunday: 9:00 AM – 9:00 PM (Open 7 Days a week for your family's convenience).\n" +
      "• Emergency triage & walk-in appointments available daily.",
    treatmentId: undefined,
    doctorId: undefined,
    treatmentName: undefined
  },
  {
    keywords: ['cost', 'fee', 'price', 'rate', 'charge', 'expensive'],
    response:
      "Sakthi Dental Clinic is committed to transparent, ethical, and affordable pricing with no hidden charges.\n\n" +
      "• Routine Doctor Consultation: Nominal clinical fee.\n" +
      "• Ultrasonic Scaling & Polishing: Affordable preventative packages.\n" +
      "• Digital RVG X-Rays: Low radiation instant imaging on-site.\n\n" +
      "Our doctors explain all options, materials, and exact costs before starting any procedure.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-1',
    treatmentName: 'General Consultation & Checkup',
    articleId: 'cashless-dental-insurance-emi'
  },
  {
    keywords: ['sensitivity', 'sensitive', 'cold water', 'hot water', 'tingling', 'enamel wear'],
    response:
      "Tooth sensitivity to cold or hot liquids often indicates enamel wear, exposed dentin from receding gums, or micro-cracks.\n\n" +
      "Recommended Care:\n" +
      "• Switch to a potassium nitrate desensitizing toothpaste.\n" +
      "• Avoid aggressive brushing with hard bristles.\n" +
      "• In-clinic fluoride varnish application seals exposed dentinal tubules.\n\n" +
      "Dr. Anupriya can evaluate your tooth to determine whether desensitization, composite bonding, or filling is ideal.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-1',
    treatmentName: 'Dental Checkup & Desensitizing Therapy',
    articleId: 'signs-you-need-root-canal'
  },
  {
    keywords: ['bad breath', 'halitosis', 'breath', 'smell', 'odor', 'odour', 'tongue'],
    response:
      "Persistent bad breath (halitosis) is usually caused by sulfur-producing bacteria accumulating under plaque along the gumline or on the back of the tongue.\n\n" +
      "Doctor's Advice:\n" +
      "• Floss daily to clear trapped food particles.\n" +
      "• Gently clean tongue surface with a tongue scraper.\n" +
      "• Schedule professional ultrasonic scaling to clear hardened tartar.\n\n" +
      "Dr. Balu (Periodontist) provides laser periodontal gum care to eradicate bacterial colonies.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-7',
    treatmentName: 'Ultrasonic Scaling & Periodontal Therapy',
    articleId: 'scaling-myths-debunked'
  },
  {
    keywords: ['broken', 'chipped', 'cracked', 'fractured', 'hit', 'fell', 'trauma'],
    response:
      "For a chipped or cracked tooth, prompt attention prevents nerve exposure and bacterial infection.\n\n" +
      "Immediate First Aid:\n" +
      "• Save any broken tooth fragments in cold milk or saline.\n" +
      "• Rinse mouth gently with warm water.\n" +
      "• Avoid chewing on that side.\n\n" +
      "Dr. Anupriya can seamlessly restore chipped teeth with high-aesthetic composite bonding or ceramic crowns in a single gentle visit.",
    treatmentId: 'crowns-bridges',
    doctorId: 'doc-1',
    treatmentName: 'Aesthetic Tooth Restoration & Crowns',
    articleId: 'smile-makeover-veneers'
  },
  {
    keywords: ['free', 'free access', 'charges for portal', 'portal fee', 'how much', 'cost for app', 'cost to register'],
    response:
      "Good news! Access to Sakthi Dental Clinic's digital patient tools is 100% FREE of charge:\n\n" +
      "✨ Patient Portal Access: ₹0 (Free)\n" +
      "✨ 2-Minute Oral Wellness Assessment: ₹0 (Free)\n" +
      "✨ Virtual AI Dental Consultation & Symptom Triage: ₹0 (Free)\n" +
      "✨ Digital Prescriptions & Treatment History View: ₹0 (Free)\n" +
      "✨ Online Appointment Slot Reservation: ₹0 Booking Fee\n\n" +
      "In-clinic appointments have transparent and standard nominal treatment costs explained before any procedure begins.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-1',
    treatmentName: 'General Consultation & Free Digital Access',
    articleId: 'cashless-dental-insurance-emi'
  },
  {
    keywords: ['jaw pain', 'clicking', 'headache', 'grinding', 'tmj', 'bruxism', 'night grind'],
    response:
      "Jaw soreness, clicking joints, or waking up with temples aching often points to Bruxism (teeth grinding) or TMJ strain.\n\n" +
      "Recommended Care:\n" +
      "• Customized night guards cushion teeth and protect enamel.\n" +
      "• Gentle jaw warm compresses and stress reduction.\n\n" +
      "Dr. Arun Prasad (Oral Surgeon) and Dr. Anupriya provide TMJ joint evaluations and custom night guard fittings.",
    treatmentId: 'teeth-cleaning-scaling',
    doctorId: 'doc-2',
    treatmentName: 'TMJ & Night Guard Therapy',
    articleId: 'scaling-myths-debunked'
  }
];

export const OralHealthChatbotAgent: React.FC<OralHealthChatbotAgentProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
  isEnabled = true,
  onDismiss,
  t,
  lang = 'en',
  currentPage = 'home',
  onNavigate,
  selectedTreatmentId
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quizStep, setQuizStep] = useState<number | null>(null); // null = idle, 1..5 = active assessment quiz
  const [quizAnswers, setQuizAnswers] = useState<{
    goal?: string;
    brushing?: string;
    symptoms?: string[];
    lastVisit?: string;
    ageGroup?: string;
  }>({});
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadPrompt, setUnreadPrompt] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [selectedArticleToRead, setSelectedArticleToRead] = useState<BlogArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [currentSubContext, setCurrentSubContext] = useState<{
    section?: string;
    treatmentId?: string;
    title?: string;
  } | null>(null);
  const prevPageRef = useRef<string>(currentPage);
  const lastSuggestedContextKeyRef = useRef<string>('');
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const effectiveTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
  const pageSuggestions = getSuggestionsForPage(currentPage, effectiveTreatmentId);

  // Listen for granular sub-context events (e.g. user browsing insurance section or specific treatment)
  useEffect(() => {
    const handleContextEvent = (e: any) => {
      const detail = e.detail;
      if (!detail) return;
      setCurrentSubContext({
        section: detail.section,
        treatmentId: detail.treatmentId,
        title: detail.title
      });
    };
    window.addEventListener('sdc_page_context', handleContextEvent);
    return () => {
      window.removeEventListener('sdc_page_context', handleContextEvent);
    };
  }, []);

  // Check speech recognition support
  const isSpeechSupported =
    typeof window !== 'undefined' &&
    Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const startListening = () => {
    setSpeechError(null);
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechError(
        'Voice dictation is supported in modern browsers like Google Chrome, Edge, and Safari. You can also type symptoms directly!'
      );
      setTimeout(() => setSpeechError(null), 6000);
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      const langMap: Record<string, string> = {
        en: 'en-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        te: 'te-IN',
        hi: 'hi-IN'
      };
      recognition.lang = langMap[lang] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setInputText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setSpeechError(
            'Microphone access denied. Please click the microphone icon in your browser address bar to allow dictation.'
          );
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Voice input: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('Microphone could not be started: ' + (err.message || 'unknown error'));
      setTimeout(() => setSpeechError(null), 5000);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnreadPrompt(false);
      const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
      const currentContextKey = `${currentPage}_${currentSubContext?.section || ''}_${effTreatmentId || ''}`;

      if (messages.length === 0) {
        startChatSession();
        lastSuggestedContextKeyRef.current = currentContextKey;
      } else if (lastSuggestedContextKeyRef.current && lastSuggestedContextKeyRef.current !== currentContextKey) {
        // Chat was open earlier, navigated while closed/minimized, and now opened
        lastSuggestedContextKeyRef.current = currentContextKey;
        prevPageRef.current = currentPage;
        const suggestions = getSuggestionsForPage(currentPage, effTreatmentId);
        setMessages(prev => [
          ...prev,
          {
            id: `proactive-reopen-${Date.now()}`,
            sender: 'bot',
            text: `📍 **Welcome back! You are now viewing: ${suggestions.pageTitle}**\n${suggestions.proactivePrompt}`,
            component: 'context_suggestions',
            articles: suggestions.suggestedArticles,
            treatments: suggestions.suggestedTreatments,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
  }, [isOpen]);

  // Proactive Context Detection: Whenever user navigates or sub-context changes while chat session is active
  useEffect(() => {
    const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
    const currentContextKey = `${currentPage}_${currentSubContext?.section || ''}_${effTreatmentId || ''}`;

    if (isOpen && currentContextKey !== lastSuggestedContextKeyRef.current) {
      lastSuggestedContextKeyRef.current = currentContextKey;
      prevPageRef.current = currentPage;

      if (messages.length > 0) {
        const suggestions = getSuggestionsForPage(currentPage, effTreatmentId);
        const isInsurance = currentSubContext?.section === 'insurance';

        setMessages(prev => [
          ...prev,
          {
            id: `proactive-switch-${Date.now()}`,
            sender: 'bot',
            text: isInsurance
              ? `💳 **Section Context: Accepted Insurance & 0% EMI Options**\nI noticed you are exploring our dental insurance networks and flexible payment plans. Here are our complete guides:`
              : `📍 **Page Context Update: ${suggestions.pageTitle}**\n${suggestions.proactivePrompt}`,
            component: 'context_suggestions',
            articles: suggestions.suggestedArticles,
            treatments: suggestions.suggestedTreatments,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
  }, [currentPage, currentSubContext, selectedTreatmentId, isOpen, messages.length]);

  const handleReadArticle = (article: BlogArticle) => {
    setSelectedArticleToRead(article);
    setIsArticleModalOpen(true);
    trackEvent('blog_article_viewed', 'chatbot-suggestion', {
      articleId: article.id,
      title: article.title,
      pageContext: currentPage
    });
  };

  const startChatSession = () => {
    setIsTyping(true);
    setQuizStep(null);
    setQuizAnswers({});
    setSelectedSymptoms([]);

    const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
    const suggestions = getSuggestionsForPage(currentPage, effTreatmentId);

    // Build smart contextual quick options based on current page
    const contextualOptions: string[] = [
      '📋 Take 2-Minute Oral Wellness Assessment ✨'
    ];

    if (suggestions.suggestedArticles[0]) {
      contextualOptions.push(`📖 Read: ${suggestions.suggestedArticles[0].title.slice(0, 36)}...`);
    }
    if (suggestions.suggestedTreatments[0]) {
      contextualOptions.push(`🦷 Explore: ${suggestions.suggestedTreatments[0].name}`);
    }

    if (currentPage === 'treatments' || currentSubContext?.section === 'insurance') {
      contextualOptions.push('💳 How does Cashless Insurance & 0% EMI work?');
      contextualOptions.push('✨ Clear Aligners vs Ceramic Braces');
      contextualOptions.push('🦷 Painless Root Canal Therapy');
    } else if (currentPage === 'gallery') {
      contextualOptions.push('✨ Porcelain Veneers vs Composite Bonding');
      contextualOptions.push('💎 In-Clinic Laser Teeth Whitening');
      contextualOptions.push('🦷 Orthodontic bite correction');
    } else if (currentPage === 'faqs') {
      contextualOptions.push('💎 Does teeth scaling loosen teeth?');
      contextualOptions.push('🦷 5 signs you need root canal early');
      contextualOptions.push('👶 Pediatric cavity prevention sealants');
    } else if (currentPage === 'facilities') {
      contextualOptions.push('🔬 Digital RVG X-Rays & Laser Technology');
      contextualOptions.push('🦷 Dental Implants vs Fixed Bridge');
      contextualOptions.push('🛡️ Hospital-Grade Sterilization Protocols');
    } else if (currentPage === 'portal') {
      contextualOptions.push('🩹 Post-Procedure Care & Recovery Guidelines');
      contextualOptions.push('💳 Submitting OPD Insurance Invoices');
      contextualOptions.push('📅 Book Routine 6-Month Scaling');
    } else {
      contextualOptions.push('🦷 How to relieve sudden toothache?');
      contextualOptions.push('🩸 Bleeding gums when brushing');
      contextualOptions.push('👶 Pediatric dental care for kids');
      contextualOptions.push('⏰ Clinic Timings & Location (Hosur)');
    }

    contextualOptions.push('📅 Book Doctor Appointment');

    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `👋 Welcome! I am Dr. Anupriya's Virtual Oral Health AI Agent at Sakthi Dental Clinic, Hosur.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: `proactive-init-${Date.now()}`,
          sender: 'bot',
          text: `📍 **Current Section: ${suggestions.pageTitle}**\n${suggestions.proactivePrompt}`,
          component: 'context_suggestions',
          articles: suggestions.suggestedArticles,
          treatments: suggestions.suggestedTreatments,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 'welcome-2',
          sender: 'bot',
          text: `How can I help you right now? You can ask any question, dictate symptoms with 🎙️, or choose an option:`,
          component: 'options',
          options: contextualOptions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 450);
  };

  // Step 1 of Assessment Quiz
  const startAssessmentQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({});
    setSelectedSymptoms([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `quiz-start-${Date.now()}`,
          sender: 'bot',
          text: `🦷 Starting your 2-Minute Oral Wellness Assessment!\n\nStep 1 of 5: What is your primary dental wellness or treatment goal?`,
          component: 'options',
          options: [
            'Teeth alignment or crooked teeth correction',
            'Cosmetic smile brightening and stain removal',
            'Replacing missing or broken teeth (Implants/Dentures)',
            'Relief from tooth pain or gum bleeding',
            'Gentle pediatric care for child',
            'Routine checkup & preventative clean'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  // Step 2 of Assessment Quiz
  const advanceToStep2 = (goalChoice: string) => {
    setQuizAnswers(prev => ({ ...prev, goal: goalChoice }));
    setQuizStep(2);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `quiz-step2-${Date.now()}`,
          sender: 'bot',
          text: `Step 2 of 5: How often do you brush your teeth each day?`,
          component: 'options',
          options: [
            'Twice a day (Morning & Night) 🌟',
            'Once a day in the morning',
            'Irregular / Occasionally miss brushing'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  // Step 3 of Assessment Quiz (Symptoms Multi-Select)
  const advanceToStep3 = (brushingChoice: string) => {
    setQuizAnswers(prev => ({ ...prev, brushing: brushingChoice }));
    setQuizStep(3);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `quiz-step3-${Date.now()}`,
          sender: 'bot',
          text: `Step 3 of 5: Do you currently experience any of the following symptoms? (Select all that apply):`,
          component: 'symptoms_multi',
          options: [
            'Bleeding or tender gums while brushing',
            'Sharp sensitivity to hot, cold, or sweets',
            'Teeth grinding or morning jaw tension',
            'Persistent bad breath or dry mouth',
            'None of these (Healthy oral condition)'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  const handleToggleSymptom = (symptom: string) => {
    if (symptom === 'None of these (Healthy oral condition)') {
      setSelectedSymptoms(['None of these (Healthy oral condition)']);
      return;
    }
    const filtered = selectedSymptoms.filter(s => s !== 'None of these (Healthy oral condition)');
    if (filtered.includes(symptom)) {
      setSelectedSymptoms(filtered.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...filtered, symptom]);
    }
  };

  const submitSymptoms = () => {
    const list = selectedSymptoms.length > 0 ? selectedSymptoms : ['None of these (Healthy oral condition)'];
    setQuizAnswers(prev => ({ ...prev, symptoms: list }));

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: list.join(', '),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setQuizStep(4);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `quiz-step4-${Date.now()}`,
          sender: 'bot',
          text: `Step 4 of 5: When was your last professional dental scaling or clinic checkup?`,
          component: 'options',
          options: [
            'Within the last 6 months',
            '6 to 12 months ago',
            'Over 1 to 2 years ago',
            'Never or cannot remember'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  // Step 5 of Assessment Quiz
  const advanceToStep5 = (visitChoice: string) => {
    setQuizAnswers(prev => ({ ...prev, lastVisit: visitChoice }));
    setQuizStep(5);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `quiz-step5-${Date.now()}`,
          sender: 'bot',
          text: `Final Step 5 of 5: What is your age group? (Helps match specialized pediatric, adult, or senior treatments)`,
          component: 'options',
          options: [
            'Child / Kid (Under 12 years)',
            'Teen / Young adult (12 - 25 years)',
            'Adult (26 - 55 years)',
            'Senior Citizen (55+ years)'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  // Calculate & Display Result Card
  const finishAssessment = (ageChoice: string) => {
    const finalAnswers = { ...quizAnswers, ageGroup: ageChoice };
    setQuizAnswers(finalAnswers);
    setQuizStep(null);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let score = 90;
      const symptoms = finalAnswers.symptoms || [];

      if (symptoms.includes('Bleeding or tender gums while brushing')) score -= 15;
      if (symptoms.includes('Sharp sensitivity to hot, cold, or sweets')) score -= 15;
      if (symptoms.includes('Teeth grinding or morning jaw tension')) score -= 10;
      if (symptoms.includes('Persistent bad breath or dry mouth')) score -= 10;
      if (finalAnswers.lastVisit === 'Over 1 to 2 years ago') score -= 10;
      if (finalAnswers.lastVisit === 'Never or cannot remember') score -= 20;
      if (finalAnswers.brushing?.includes('Once a day')) score -= 10;

      score = Math.max(38, Math.min(98, score));

      let category = 'Optimal Care';
      if (score < 65) category = 'Specialist Consultation Recommended';
      else if (score < 80) category = 'Moderate Attention Needed';

      // Treatment & Doctor matching
      let treatmentId = 'teeth-cleaning-scaling';
      let doctorId = 'doc-1';

      if (finalAnswers.goal?.includes('alignment')) {
        treatmentId = finalAnswers.ageGroup?.includes('Adult') ? 'clear-aligners' : 'orthodontic-treatment';
        doctorId = 'doc-5';
      } else if (finalAnswers.goal?.includes('missing')) {
        treatmentId = finalAnswers.ageGroup?.includes('Senior') ? 'artificial-complete-denture' : 'dental-implants';
        doctorId = finalAnswers.ageGroup?.includes('Senior') ? 'doc-2' : 'doc-6';
      } else if (finalAnswers.goal?.includes('brightening')) {
        treatmentId = 'teeth-whitening-bleaching';
        doctorId = 'doc-4';
      } else if (finalAnswers.goal?.includes('pediatric') || finalAnswers.ageGroup?.includes('Child')) {
        treatmentId = 'pediatric-dentistry';
        doctorId = 'doc-4';
      } else if (symptoms.includes('Bleeding or tender gums while brushing')) {
        treatmentId = 'teeth-cleaning-scaling';
        doctorId = 'doc-7';
      } else if (symptoms.includes('Sharp sensitivity to hot, cold, or sweets')) {
        treatmentId = 'root-canal-therapy';
        doctorId = 'doc-3';
      }

      const treatmentObj = TREATMENTS.find(t => t.id === treatmentId) || TREATMENTS[0];
      const doctorObj = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];

      const tips = [
        'Use a soft or medium-bristled brush with a compact head to comfortably reach posterior molars without enamel wear (FAQ #12).',
        'Brush twice daily for two full minutes and rinse with fresh water after meals (FAQ #7).'
      ];

      if (symptoms.includes('Sharp sensitivity to hot, cold, or sweets')) {
        tips.push('Tooth sensitivity usually indicates exposed dentin, microscopic cracks, or early pulp inflammation (FAQ #13).');
      } else if (finalAnswers.lastVisit !== 'Within the last 6 months') {
        tips.push('Ultrasonic scaling safely clears tartar buildup every 6 months without thinning teeth or loosening gums (FAQ #2 & #14).');
      }

      const resultPayload: AssessmentResult = {
        score,
        category,
        summary:
          category === 'Specialist Consultation Recommended'
            ? 'Your responses indicate symptoms that require prompt clinical evaluation to protect tooth nerve structure and gum health.'
            : category === 'Moderate Attention Needed'
            ? 'Solid oral health foundation! Preventative scaling and targeted care will protect you from plaque progression and sensitivity.'
            : 'Excellent oral wellness! Routine 6-month checkups will keep your smile bright and cavity-free.',
        tips,
        treatmentId,
        treatmentName: treatmentObj.name,
        doctorId,
        doctorName: doctorObj.name
      };

      setMessages(prev => [
        ...prev,
        {
          id: `bot-result-${Date.now()}`,
          sender: 'bot',
          text: `✨ Assessment Complete! Here is Dr. Anupriya's custom Oral Wellness Card:`,
          component: 'result_card',
          resultData: resultPayload,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      trackEvent('chatbot_assessment_complete', 'chatbot-agent', {
        score,
        treatment: treatmentObj.name,
        doctor: doctorObj.name
      });
    }, 700);
  };

  // General Q&A / Action handling
  const handleUserSelectOption = (option: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // Handle Quiz steps
    if (quizStep === 1) {
      advanceToStep2(option);
      return;
    }
    if (quizStep === 2) {
      advanceToStep3(option);
      return;
    }
    if (quizStep === 4) {
      advanceToStep5(option);
      return;
    }
    if (quizStep === 5) {
      finishAssessment(option);
      return;
    }

    // Normal menu triggers
    if (option.includes('Oral Wellness Assessment') || option.includes('Take 2-Minute')) {
      startAssessmentQuiz();
      return;
    }

    if (option.includes('Book Doctor Appointment') || option.includes('Book an Appointment')) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-book-${Date.now()}`,
            sender: 'bot',
            text: `You can schedule an appointment online with Dr. Anupriya and our specialist doctors at our Anthivadi, Hosur clinic!`,
            component: 'action_card',
            actionData: {
              title: 'Book Clinic Consultation',
              description: 'Select your preferred doctor, date, and convenient time slot.',
              buttonText: 'Open Appointment Scheduler 📅',
              treatmentId: 'teeth-cleaning-scaling'
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
      return;
    }

    if (option.includes('Read:') || option.includes('Read Guide:')) {
      const art = pageSuggestions.suggestedArticles[0] || BLOG_ARTICLES[0];
      handleReadArticle(art);
      return;
    }

    if (option.includes('Explore:')) {
      onNavigate?.('treatments');
      setTimeout(() => {
        const el = document.getElementById('treatments-catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    // Process as text query
    handleProcessTextQuery(option);
  };

  const handleProcessTextQuery = (text: string) => {
    if (!text.trim()) return;
    const lower = text.toLowerCase();

    if (lower.includes('assessment') || lower.includes('quiz')) {
      startAssessmentQuiz();
      return;
    }

    // Appointment Request Intent (typing or voice dictation)
    const isAppointmentIntent =
      lower.includes('book') ||
      lower.includes('schedule') ||
      lower.includes('appointment') ||
      lower.includes('consult') ||
      lower.includes('visit') ||
      lower.includes('slot') ||
      lower.includes('tomorrow') ||
      lower.includes('saturday') ||
      lower.includes('sunday') ||
      lower.includes('morning') ||
      lower.includes('evening') ||
      lower.includes('fix appointment');

    if (isAppointmentIntent) {
      let detectedDoctorId: string | undefined = undefined;
      let detectedDoctorName = 'Dr. Anupriya M (Chief Surgeon)';
      let detectedTreatmentId = 'teeth-cleaning-scaling';
      let detectedTreatmentName = 'Clinical Consultation & Checkup';

      if (lower.includes('vinod') || lower.includes('implant')) {
        detectedDoctorId = 'doc-6';
        detectedDoctorName = 'Dr. Vinod Kumar (MDS - Implantologist)';
        detectedTreatmentId = 'dental-implants';
        detectedTreatmentName = 'Dental Implants & Prosthetics';
      } else if (lower.includes('kavitha') || lower.includes('kid') || lower.includes('child')) {
        detectedDoctorId = 'doc-4';
        detectedDoctorName = 'Dr. Kavitha S (MDS - Pediatric Dentist)';
        detectedTreatmentId = 'pediatric-dentistry';
        detectedTreatmentName = 'Pediatric Dental Care';
      } else if (
        lower.includes('meera') ||
        lower.includes('root canal') ||
        lower.includes('rct') ||
        lower.includes('nerve') ||
        lower.includes('severe pain')
      ) {
        detectedDoctorId = 'doc-3';
        detectedDoctorName = 'Dr. Meera R (MDS - Endodontist)';
        detectedTreatmentId = 'root-canal-therapy';
        detectedTreatmentName = 'Root Canal Therapy';
      } else if (lower.includes('sneha') || lower.includes('brace') || lower.includes('aligner') || lower.includes('clip')) {
        detectedDoctorId = 'doc-5';
        detectedDoctorName = 'Dr. Sneha N (MDS - Orthodontist)';
        detectedTreatmentId = 'clear-aligners';
        detectedTreatmentName = 'Clear Aligners & Invisible Braces';
      } else if (lower.includes('balu') || lower.includes('gum') || lower.includes('laser') || lower.includes('bleeding')) {
        detectedDoctorId = 'doc-7';
        detectedDoctorName = 'Dr. Balu K (MDS - Periodontist)';
        detectedTreatmentId = 'teeth-cleaning-scaling';
        detectedTreatmentName = 'Laser Gum Care & Scaling';
      } else if (lower.includes('arun') || lower.includes('wisdom') || lower.includes('extract') || lower.includes('surgery')) {
        detectedDoctorId = 'doc-2';
        detectedDoctorName = 'Dr. Arun Prasad (MDS - Oral Surgeon)';
        detectedTreatmentId = 'wisdom-tooth-extraction';
        detectedTreatmentName = 'Wisdom Tooth & Surgical Care';
      } else if (lower.includes('whiten') || lower.includes('bleach')) {
        detectedDoctorId = 'doc-1';
        detectedTreatmentId = 'teeth-whitening-bleaching';
        detectedTreatmentName = 'Professional Teeth Whitening';
      }

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-book-${Date.now()}`,
            sender: 'bot',
            text: `🎙️ Request received: "${text}"\n\nWe have opening availability for you at Sakthi Dental Clinic (Opp. RV Boys School, Anthivadi, Hosur). Click below to choose your date & time slot for instant confirmation!`,
            component: 'action_card',
            actionData: {
              title: `Schedule ${detectedTreatmentName}`,
              description: `With ${detectedDoctorName} • Daily 9:00 AM – 9:00 PM`,
              buttonText: `Confirm Appointment Slot 📅`,
              treatmentId: detectedTreatmentId,
              doctorId: detectedDoctorId
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
      return;
    }

    // Proactive request for page recommendations / articles / treatments
    const isRecommendationIntent =
      lower.includes('recommend') ||
      lower.includes('suggest') ||
      lower.includes('article') ||
      lower.includes('blog') ||
      lower.includes('guide') ||
      lower.includes('read') ||
      lower.includes('treatment') ||
      lower.includes('procedure') ||
      lower.includes('what should i') ||
      lower.includes('what can i') ||
      lower.includes('options') ||
      lower.includes('this page') ||
      lower.includes('tell me about this');

    if (isRecommendationIntent) {
      const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
      const suggestions = getSuggestionsForPage(currentPage, effTreatmentId);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-rec-${Date.now()}`,
            sender: 'bot',
            text: `💡 **Doctor Guides & Treatment Recommendations for ${suggestions.pageTitle}**\n\n${suggestions.proactivePrompt}`,
            component: 'context_suggestions',
            articles: suggestions.suggestedArticles,
            treatments: suggestions.suggestedTreatments,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
      return;
    }

    const matchedFaq = FAQ_KNOWLEDGE_BASE.find(item =>
      item.keywords.some(kw => lower.includes(kw))
    );

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      if (matchedFaq) {
        const next: ChatMessage[] = [
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: matchedFaq.response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];

        // Proactively attach matched doctor clinical guide article
        if (matchedFaq.articleId) {
          const article = BLOG_ARTICLES.find(a => a.id === matchedFaq.articleId);
          if (article) {
            next.push({
              id: `bot-art-${Date.now()}`,
              sender: 'bot',
              component: 'article_card',
              articleData: article,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }

        if (matchedFaq.treatmentId) {
          next.push({
            id: `bot-action-${Date.now()}`,
            sender: 'bot',
            component: 'action_card',
            actionData: {
              title: `Specialist Care: ${matchedFaq.treatmentName}`,
              description: 'Would you like to book a direct consultation with our clinic doctors?',
              buttonText: `Book ${matchedFaq.treatmentName}`,
              treatmentId: matchedFaq.treatmentId,
              doctorId: matchedFaq.doctorId
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }

        setMessages(prev => [...prev, ...next]);
      } else {
        const queryMatchedArticle = BLOG_ARTICLES.find(a =>
          a.tags.some(tag => lower.includes(tag.toLowerCase())) ||
          a.title.toLowerCase().split(' ').some(word => word.length > 4 && lower.includes(word))
        );

        const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
        const currentSuggestions = getSuggestionsForPage(currentPage, effTreatmentId);

        const next: ChatMessage[] = [
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text:
              `Thank you for asking! For specialized dental questions, Dr. Anupriya and our specialist doctors are available daily from 9:00 AM to 9:00 PM at Anthivadi, Hosur.\n\n` +
              `Based on your query and current section (**${currentSuggestions.pageTitle}**), here are doctor guides and treatment options:`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];

        if (queryMatchedArticle) {
          next.push({
            id: `bot-query-art-${Date.now()}`,
            sender: 'bot',
            component: 'article_card',
            articleData: queryMatchedArticle,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        } else {
          next.push({
            id: `bot-ctx-fallback-${Date.now()}`,
            sender: 'bot',
            component: 'context_suggestions',
            articles: currentSuggestions.suggestedArticles.slice(0, 2),
            treatments: currentSuggestions.suggestedTreatments.slice(0, 2),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }

        setMessages(prev => [...prev, ...next]);
      }
    }, 600);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (isListening) {
      stopListening();
    }
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    const query = inputText;
    setInputText('');
    handleProcessTextQuery(query);
  };

  return (
    <>
      {/* The Single Unified Floating Launcher in Bottom-Right */}
      {/* The Single Unified Floating Chatbot Launcher - Always Present */}
      {!isOpen && isEnabled && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Always-visible helpful callout prompt badge (Desktop & Tablet) */}
          <button
            onClick={onToggle}
            className="hidden sm:flex group relative items-center gap-2 bg-white text-slate-800 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all hover:scale-102 cursor-pointer animate-in fade-in slide-in-from-right-4 duration-300"
            title={t?.chatbotLaunch || "Start Oral Health Assessment or Ask AI"}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping shrink-0" />
            <span className="text-slate-900 group-hover:text-blue-700 transition-colors">
              Oral Wellness Assessment & AI Dental Help 💬
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-extrabold">
              AI Triage
            </span>
          </button>

          {/* Launcher Circle Button (Sleek on mobile, full size on desktop) */}
          <button
            onClick={onToggle}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white shadow-xl sm:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white shrink-0"
            aria-label="Open Oral Health AI Assistant & Assessment"
          >
            <Bot className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-pink-500 text-[8px] sm:text-[9px] font-bold text-white items-center justify-center">
                ✨
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Mobile Dimmed Backdrop Overlay */}
      {isOpen && !isMinimized && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 sm:hidden animate-in fade-in duration-200"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* The Single Unified Pop-Up Chatbot Window / Mobile Bottom Sheet */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-80'
              : 'bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[440px] max-w-full'
          }`}
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col h-[88vh] sm:h-[600px] max-h-[88vh]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5 leading-tight">
                    <span>Dr. Anupriya's Oral Health AI</span>
                    <span className="text-[10px] bg-pink-500 text-white px-1.5 py-0.2 rounded font-mono font-bold">
                      Unified Agent
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200 flex items-center gap-1">
                    <span>Sakthi Dental Clinic • Hosur</span>
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={startChatSession}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Reset to Main Menu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors hidden sm:block"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onToggle}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Proactive Context Banner - Displays Current Page Context & Instant Suggestion Triggers */}
            {!isMinimized && (
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 border-b border-indigo-100/80 px-3.5 py-2 flex items-center justify-between text-xs shrink-0 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/90 px-1.5 py-0.2 rounded shrink-0">
                        Context
                      </span>
                      <span className="font-extrabold text-slate-800 text-xs truncate">
                        {pageSuggestions.pageTitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => {
                      const effTreatmentId = currentSubContext?.treatmentId || selectedTreatmentId;
                      const suggestions = getSuggestionsForPage(currentPage, effTreatmentId);
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `user-req-${Date.now()}`,
                          sender: 'user',
                          text: `💡 What guides & treatments do you recommend for ${suggestions.pageTitle}?`,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        },
                        {
                          id: `bot-ctx-tap-${Date.now()}`,
                          sender: 'bot',
                          text: `📍 **Recommendations for ${suggestions.pageTitle}:**\n${suggestions.proactivePrompt}`,
                          component: 'context_suggestions',
                          articles: suggestions.suggestedArticles,
                          treatments: suggestions.suggestedTreatments,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-indigo-700 font-extrabold text-[10px] shadow-2xs hover:bg-indigo-50 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Proactively pull doctor guides for this section"
                  >
                    <Sparkles className="w-3 h-3 text-pink-500" />
                    <span className="hidden xs:inline">Guides & Treatments</span>
                    <span className="xs:hidden">Guides</span>
                  </button>
                </div>
              </div>
            )}

            {/* Chatbot Body */}
            {!isMinimized && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    } animate-in fade-in duration-200`}
                  >
                    {/* Message Bubble */}
                    {msg.text && (
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed text-xs sm:text-sm whitespace-pre-line shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Interactive Options Choice List */}
                    {msg.component === 'options' && msg.options && (
                      <div className="w-full mt-2.5 space-y-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleUserSelectOption(opt)}
                            className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all shadow-2xs flex items-center justify-between cursor-pointer active:scale-98"
                          >
                            <span>{opt}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Multi-Select Symptoms Component (Step 3) */}
                    {msg.component === 'symptoms_multi' && msg.options && (
                      <div className="w-full mt-2.5 space-y-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                        <p className="text-[11px] font-bold text-slate-700 mb-1">
                          Select any symptom you experience:
                        </p>
                        <div className="space-y-1.5">
                          {msg.options.map((opt, i) => {
                            const isChecked = selectedSymptoms.includes(opt);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleToggleSymptom(opt)}
                                className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border flex items-center justify-between transition-colors cursor-pointer ${
                                  isChecked
                                    ? 'bg-pink-50 border-pink-400 text-pink-900 font-bold'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span>{opt}</span>
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    isChecked ? 'bg-pink-600 border-pink-600 text-white' : 'border-slate-300'
                                  }`}
                                >
                                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={submitSymptoms}
                          className="w-full mt-2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                        >
                          Submit Symptoms & Continue →
                        </button>
                      </div>
                    )}

                    {/* Rich Diagnostic Result Card in Chat */}
                    {msg.component === 'result_card' && msg.resultData && (
                      <div className="w-full mt-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-md space-y-3.5">
                        {/* Score Badge */}
                        <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-pink-50 p-3.5 rounded-xl border border-blue-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Oral Health Score</span>
                            <div className="text-2xl font-extrabold text-blue-900">
                              {msg.resultData.score} / 100
                            </div>
                            <span className="text-xs font-bold text-pink-700">
                              {msg.resultData.category}
                            </span>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                            <Award className="w-7 h-7" />
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {msg.resultData.summary}
                        </p>

                        {/* Tips */}
                        <div className="space-y-1.5 pt-1">
                          <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                            Doctor-Curated Care Tips:
                          </p>
                          {msg.resultData.tips.map((tip: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>

                        {/* Treatment recommendation & Booking */}
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl space-y-2">
                          <div className="text-[10px] text-pink-400 font-bold uppercase">
                            Recommended Clinic Procedure
                          </div>
                          <div className="text-sm font-extrabold text-white">
                            {msg.resultData.treatmentName}
                          </div>
                          <div className="text-[11px] text-blue-200 flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5 text-pink-400" />
                            <span>Matched Specialist: <strong>{msg.resultData.doctorName}</strong></span>
                          </div>

                          <button
                            onClick={() => {
                              onOpenBooking(msg.resultData!.treatmentId, msg.resultData!.doctorId);
                              onToggle();
                            }}
                            className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer mt-1"
                          >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Book Consultation with {msg.resultData.doctorName.split(' ')[1] || 'Doctor'}</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                          <button
                            onClick={startAssessmentQuiz}
                            className="text-blue-600 hover:underline font-semibold cursor-pointer"
                          >
                            Retake Assessment
                          </button>
                          <a
                            href={`tel:${CLINIC_INFO.primaryPhone}`}
                            className="flex items-center gap-1 text-emerald-600 font-bold hover:underline"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Clinic</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Action Card */}
                    {msg.component === 'action_card' && msg.actionData && (
                      <div className="w-full mt-2.5 bg-white border border-slate-200 rounded-2xl p-4 shadow-md space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-pink-100 text-pink-600 shrink-0">
                            <CalendarCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs">
                              {msg.actionData.title}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {msg.actionData.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onOpenBooking(msg.actionData!.treatmentId || 'teeth-cleaning-scaling', msg.actionData!.doctorId);
                            onToggle();
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>{msg.actionData.buttonText}</span>
                        </button>
                      </div>
                    )}

                    {/* Proactive Context Suggestions (Articles & Treatments) */}
                    {msg.component === 'context_suggestions' && (
                      <div className="w-full mt-3 space-y-3 animate-in fade-in duration-200">
                        {/* Suggested Treatment Pages */}
                        {msg.treatments && msg.treatments.length > 0 && (
                          <div className="bg-white border border-blue-100 rounded-2xl p-3.5 shadow-xs space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-blue-900 border-b border-blue-50 pb-1.5">
                              <div className="flex items-center gap-1.5">
                                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                                <span>Recommended Treatment Pages</span>
                              </div>
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                {msg.treatments.length} Available
                              </span>
                            </div>

                            <div className="space-y-2">
                              {msg.treatments.map(tItem => (
                                <div
                                  key={tItem.id}
                                  className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex flex-col justify-between gap-1.5"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                                        <span>{tItem.name}</span>
                                        <span className="text-[9px] font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                                          {tItem.badge}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                        {tItem.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        onNavigate?.('treatments');
                                        setTimeout(() => {
                                          const el = document.getElementById('treatments-catalog');
                                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                      }}
                                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-bold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                                    >
                                      <span>Explore Treatment Page</span>
                                      <ArrowRight className="w-3 h-3 text-blue-500" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        onOpenBooking(tItem.id);
                                        onToggle();
                                      }}
                                      className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                                    >
                                      <CalendarCheck className="w-3 h-3" />
                                      <span>Book Consultation</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggested Doctor Blog Articles */}
                        {msg.articles && msg.articles.length > 0 && (
                          <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-pink-50/50 border border-indigo-100 rounded-2xl p-3.5 shadow-xs space-y-2.5">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-indigo-950 border-b border-indigo-100/80 pb-1.5">
                              <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Suggested Doctor Articles & Guides</span>
                              </div>
                              <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                                Clinical Reads
                              </span>
                            </div>

                            <div className="space-y-2">
                              {msg.articles.map(art => (
                                <div
                                  key={art.id}
                                  className="p-3 bg-white rounded-xl border border-indigo-100/90 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all space-y-2"
                                >
                                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                                    <span className="font-extrabold uppercase tracking-wider text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">
                                      {art.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      <span>{art.readTime}</span>
                                    </span>
                                  </div>

                                  <div>
                                    <h5 className="font-extrabold text-slate-900 text-xs leading-snug">
                                      {art.title}
                                    </h5>
                                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                      {art.excerpt}
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                                    <span className="font-bold text-indigo-900">
                                      By {art.author}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleReadArticle(art)}
                                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                                    >
                                      <BookOpen className="w-3 h-3" />
                                      <span>Read Doctor Guide</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Specific Article Card Component */}
                    {msg.component === 'article_card' && msg.articleData && (
                      <div className="w-full mt-2.5 bg-gradient-to-br from-indigo-50/90 to-purple-50/80 border border-indigo-200 rounded-2xl p-4 shadow-sm space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-extrabold uppercase tracking-wider text-indigo-800 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200">
                            📖 Suggested Doctor Guide
                          </span>
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {msg.articleData.readTime}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-snug">
                            {msg.articleData.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                            {msg.articleData.excerpt}
                          </p>
                        </div>

                        {msg.articleData.keyTakeaways[0] && (
                          <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100/90 text-[11px] text-indigo-950 flex items-start gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">
                              <strong>Key Insight:</strong> {msg.articleData.keyTakeaways[0]}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleReadArticle(msg.articleData!)}
                            className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Read Full Guide</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onOpenBooking(msg.articleData!.relatedTreatmentId);
                              onToggle();
                            }}
                            className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                          >
                            <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-24 text-slate-400 text-xs shadow-2xs">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Bar & Footer */}
            {!isMinimized && (
              <div className="p-3 bg-white border-t border-slate-200 space-y-2 shrink-0">
                {/* Active Voice Listening Banner */}
                {isListening && (
                  <div className="p-2.5 bg-gradient-to-r from-pink-50 via-rose-50 to-indigo-50 border border-pink-200 rounded-xl flex items-center justify-between gap-2 text-xs animate-in fade-in duration-200 shadow-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      </div>
                      {/* Audio wave animation bars */}
                      <div className="flex items-center gap-0.5 h-3.5 shrink-0">
                        <span className="w-1 bg-rose-500 rounded-full animate-pulse h-2" />
                        <span className="w-1 bg-pink-500 rounded-full animate-pulse h-3.5 [animation-delay:0.15s]" />
                        <span className="w-1 bg-indigo-500 rounded-full animate-pulse h-2.5 [animation-delay:0.3s]" />
                        <span className="w-1 bg-rose-500 rounded-full animate-pulse h-4 [animation-delay:0.2s]" />
                        <span className="w-1 bg-pink-500 rounded-full animate-pulse h-2 [animation-delay:0.1s]" />
                      </div>
                      <span className="font-semibold text-rose-900 text-[11px] truncate">
                        {inputText
                          ? `"${inputText}"`
                          : t?.voiceDictateListening || 'Listening... Speak symptoms or appointment request'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          stopListening();
                          if (inputText.trim()) {
                            const msg: ChatMessage = {
                              id: `user-${Date.now()}`,
                              sender: 'user',
                              text: inputText,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            };
                            setMessages(prev => [...prev, msg]);
                            const q = inputText;
                            setInputText('');
                            handleProcessTextQuery(q);
                          }
                        }}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        Done & Send
                      </button>
                      <button
                        type="button"
                        onClick={stopListening}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                        title="Cancel dictation"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Speech Error Alert */}
                {speechError && (
                  <div className="p-2 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] rounded-xl flex items-center justify-between gap-1.5 animate-in fade-in">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="leading-tight">{speechError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSpeechError(null)}
                      className="p-0.5 text-amber-600 hover:text-amber-800 rounded shrink-0 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Voice Dictation Quick Prompts */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[10px]">
                  <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-0.5">
                    <Mic className="w-3 h-3 text-pink-500" />
                    <span>Dictate:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const text = 'I have severe toothache and cold water sensitivity';
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `user-${Date.now()}`,
                          sender: 'user',
                          text,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                      handleProcessTextQuery(text);
                    }}
                    className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-pink-50 hover:text-pink-700 text-slate-600 border border-slate-200 shrink-0 transition-colors cursor-pointer"
                  >
                    "Severe toothache & sensitivity"
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = 'Book appointment tomorrow morning with Dr. Anupriya';
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `user-${Date.now()}`,
                          sender: 'user',
                          text,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                      handleProcessTextQuery(text);
                    }}
                    className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 shrink-0 transition-colors cursor-pointer"
                  >
                    "Book appointment tomorrow"
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = 'Need consultation for dental implants with Dr. Vinod';
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `user-${Date.now()}`,
                          sender: 'user',
                          text,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                      handleProcessTextQuery(text);
                    }}
                    className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-600 border border-slate-200 shrink-0 transition-colors cursor-pointer"
                  >
                    "Implant consultation"
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = 'My gums are bleeding when brushing teeth';
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `user-${Date.now()}`,
                          sender: 'user',
                          text,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                      handleProcessTextQuery(text);
                    }}
                    className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200 shrink-0 transition-colors cursor-pointer"
                  >
                    "Bleeding gums"
                  </button>
                </div>

                {/* Input Form with Integrated Voice Dictation Microphone Button */}
                <form onSubmit={handleSendForm} className="flex items-center gap-2">
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="text"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={
                        isListening
                          ? 'Listening... speak symptoms or appointment request...'
                          : t?.voiceDictatePrompt || "Type or click 🎙️ to dictate symptoms or appointment..."
                      }
                      className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-xs pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                    />

                    {/* Microphone Dictation Button */}
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`absolute right-1.5 p-1.5 rounded-lg transition-all cursor-pointer ${
                        isListening
                          ? 'bg-rose-600 text-white shadow-xs animate-pulse ring-2 ring-rose-300'
                          : 'text-slate-400 hover:text-pink-600 hover:bg-pink-50'
                      }`}
                      title={
                        isListening
                          ? t?.voiceDictateStop || 'Stop listening'
                          : t?.voiceDictateStart || 'Dictate symptoms or request appointment'
                      }
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-white" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      inputText.trim()
                        ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-md active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${CLINIC_INFO.primaryPhone}`}
                      className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{CLINIC_INFO.primaryPhone}</span>
                    </a>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Daily 9:00 AM – 9:00 PM • Hosur
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
