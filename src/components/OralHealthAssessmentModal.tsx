import React, { useState } from 'react';
import { TREATMENTS, DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/storage';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  CalendarCheck,
  Stethoscope,
  ShieldCheck,
  Award,
  Heart,
  Smile,
  ArrowRight
} from 'lucide-react';

interface QuizAnswers {
  primaryGoal?: string;
  brushingHabits?: string;
  symptoms?: string[];
  lastVisit?: string;
  ageGroup?: string;
}

interface AssessmentResult {
  score: number;
  category: 'Optimal Care' | 'Moderate Attention Needed' | 'Specialist Consultation Recommended';
  summary: string;
  tips: string[];
  recommendedTreatmentId: string;
  recommendedTreatmentName: string;
  recommendedDoctorId: string;
  recommendedDoctorName: string;
  keyObservation: string;
}

interface OralHealthAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTreatment: (treatmentId: string, doctorId?: string) => void;
}

export const OralHealthAssessmentModal: React.FC<OralHealthAssessmentModalProps> = ({
  isOpen,
  onClose,
  onBookTreatment
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    symptoms: []
  });
  const [result, setResult] = useState<AssessmentResult | null>(null);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({ symptoms: [] });
    setResult(null);
  };

  const toggleSymptom = (sym: string) => {
    const current = answers.symptoms || [];
    if (sym === 'None of these') {
      setAnswers(prev => ({ ...prev, symptoms: ['None of these'] }));
      return;
    }
    const filtered = current.filter(s => s !== 'None of these');
    if (filtered.includes(sym)) {
      setAnswers(prev => ({ ...prev, symptoms: filtered.filter(s => s !== sym) }));
    } else {
      setAnswers(prev => ({ ...prev, symptoms: [...filtered, sym] }));
    }
  };

  const calculateResult = () => {
    let score = 85;
    const symptoms = answers.symptoms || [];

    // Deduct score for symptoms
    if (symptoms.includes('Bleeding or tender gums when brushing')) score -= 15;
    if (symptoms.includes('Sharp tooth sensitivity to hot or cold')) score -= 15;
    if (symptoms.includes('Teeth grinding or morning jaw tension')) score -= 10;
    if (symptoms.includes('Persistent bad breath or dry mouth')) score -= 10;

    // Deduct for overdue visits
    if (answers.lastVisit === 'Over 1 to 2 years ago') score -= 10;
    if (answers.lastVisit === 'Never or cannot remember') score -= 20;

    // Adjust for brushing
    if (answers.brushingHabits === 'Once a day only') score -= 10;

    // Clamp score
    score = Math.max(35, Math.min(98, score));

    let category: AssessmentResult['category'] = 'Optimal Care';
    if (score < 65) {
      category = 'Specialist Consultation Recommended';
    } else if (score < 80) {
      category = 'Moderate Attention Needed';
    }

    // Determine targeted treatment and doctor
    let recommendedTreatmentId = 'teeth-cleaning-scaling';
    let recommendedDoctorId = 'doc-1'; // Dr. Anupriya

    if (answers.primaryGoal === 'Teeth alignment or crooked teeth correction') {
      recommendedTreatmentId = answers.ageGroup === 'Adult (26 - 55)' ? 'clear-aligners' : 'orthodontic-treatment';
      recommendedDoctorId = 'doc-5'; // Dr. Sneha N
    } else if (answers.primaryGoal === 'Replacing missing or broken teeth') {
      recommendedTreatmentId = answers.ageGroup === 'Senior (55+)' ? 'artificial-complete-denture' : 'dental-implants';
      recommendedDoctorId = answers.ageGroup === 'Senior (55+)' ? 'doc-2' : 'doc-6';
    } else if (answers.primaryGoal === 'Cosmetic smile brightening and stain removal') {
      recommendedTreatmentId = 'teeth-whitening-bleaching';
      recommendedDoctorId = 'doc-4';
    } else if (answers.primaryGoal === 'Gentle pediatric dental care for child') {
      recommendedTreatmentId = 'pediatric-dentistry';
      recommendedDoctorId = 'doc-4';
    } else if (symptoms.includes('Bleeding or tender gums when brushing')) {
      recommendedTreatmentId = 'teeth-cleaning-scaling';
      recommendedDoctorId = 'doc-7'; // Dr. Balu Laser Surgeon
    } else if (symptoms.includes('Sharp tooth sensitivity to hot or cold')) {
      recommendedTreatmentId = 'root-canal-therapy';
      recommendedDoctorId = 'doc-3'; // Dr. Meera
    }

    const tObj = TREATMENTS.find(t => t.id === recommendedTreatmentId) || TREATMENTS[0];
    const dObj = DOCTORS.find(d => d.id === recommendedDoctorId) || DOCTORS[0];

    // Build personalized tips based on PDF clinical advice
    const tips: string[] = [
      'Use a soft or medium-bristled toothbrush with a small head to ensure thorough reach to posterior molars without abrasive wear (FAQ #12).',
      'Brush twice daily for two full minutes and rinse thoroughly after every meal with fresh water (FAQ #7).',
      'Replace your toothbrush every 3 months to prevent bacterial accumulation and frayed bristle trauma.'
    ];

    if (symptoms.includes('Sharp tooth sensitivity to hot or cold')) {
      tips.push('Avoid acidic food and aggressive brushing near the gumline. Tooth sensitivity often stems from exposed roots or microscopic enamel microcracks (FAQ #13).');
    }

    if (answers.lastVisit === 'Over 1 to 2 years ago' || answers.lastVisit === 'Never or cannot remember') {
      tips.push('Professional dental scaling every 6 months safely clears plaque and calculus before it irritates gum attachment (FAQ #2 & #14).');
    }

    if (answers.primaryGoal?.includes('alignment')) {
      tips.push('Early evaluation allows customized mapping between traditional ceramic braces and removable transparent clear aligners (FAQ #8).');
    }

    const finalResult: AssessmentResult = {
      score,
      category,
      summary:
        category === 'Specialist Consultation Recommended'
          ? 'Your responses indicate symptoms that require prompt clinical evaluation to prevent deeper decay or gum tissue compromise.'
          : category === 'Moderate Attention Needed'
          ? 'Your oral hygiene foundation is solid, but preventative scaling and targeted care will protect you from plaque progression and sensitivity.'
          : 'Great oral wellness foundation! Routine six-month check-ups will maintain your bright smile and gum resilience.',
      tips,
      recommendedTreatmentId,
      recommendedTreatmentName: tObj.name,
      recommendedDoctorId,
      recommendedDoctorName: dObj.name,
      keyObservation:
        symptoms.length > 0 && !symptoms.includes('None of these')
          ? `Primary focus area: Management of ${symptoms.slice(0, 2).join(' & ')}.`
          : 'Primary focus area: Long-term preventative maintenance and cosmetic radiance.'
    };

    setResult(finalResult);
    trackEvent('quiz_completed', 'assessment-modal', {
      score,
      category,
      recommendedTreatment: tObj.name
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-100 flex flex-col justify-between">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-pink-700 text-white p-6 relative rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-pink-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>Sakthi Dental Clinic • Hosur</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {result ? 'Your Personalized Oral Health Plan' : 'Oral Health Assessment'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            {result
              ? 'Doctor-curated tips and procedure recommendations based on your symptoms.'
              : 'Answer 5 quick questions to receive clinical care tips and recommendations.'}
          </p>

          {!result && (
            <div className="mt-4 flex items-center justify-between text-xs text-blue-200">
              <span className="font-bold">Step {currentStep} of {totalSteps}</span>
              <div className="w-32 bg-blue-900/60 h-2 rounded-full overflow-hidden border border-white/20">
                <div
                  className="bg-pink-400 h-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1">
          {result ? (
            /* Result Screen */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 p-6 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-extrabold text-white shadow-md ${
                      result.score >= 80
                        ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                        : result.score >= 65
                        ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                        : 'bg-gradient-to-tr from-red-600 to-rose-500'
                    }`}
                  >
                    <span className="text-2xl leading-none">{result.score}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 mt-0.5">/ 100</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Oral Health Index
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {result.category}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {result.keyObservation}
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <span className="inline-block bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-blue-700 shadow-2xs">
                    Verified Hosur Clinical Protocol
                  </span>
                </div>
              </div>

              {/* Assessment Summary */}
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200">
                {result.summary}
              </p>

              {/* Personalized Tips Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-pink-600" />
                  <span>Personalized Dental Care Tips For You:</span>
                </h4>
                <div className="space-y-2">
                  {result.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Clinic Procedure & Doctor Match */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-pink-400 uppercase tracking-wider">
                    Recommended Sakthi Dental Solution
                  </span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md text-[11px]">
                    Hosur In-Clinic Care
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-white">
                      {result.recommendedTreatmentName}
                    </h3>
                    <p className="text-xs text-blue-200 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-pink-400" />
                      <span>Consulting Specialist: <strong>{result.recommendedDoctorName}</strong></span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onBookTreatment(result.recommendedTreatmentId, result.recommendedDoctorId);
                      onClose();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book {result.recommendedTreatmentName}</span>
                  </button>
                </div>
              </div>

              {/* Retake action */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 hover:text-blue-600 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
                <span>Dr. Anupriya Dental Consultation • Hosur</span>
              </div>
            </div>
          ) : (
            /* Multi-step Question Flow */
            <div className="space-y-6">
              {/* Question 1: Primary Goal */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Question 1</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      What is your primary dental goal or current concern?
                    </h3>
                    <p className="text-xs text-slate-500">Choose the option closest to what you wish to address.</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      'Routine checkup, scaling, and calculus removal',
                      'Sharp tooth pain, cavities, or deep discomfort',
                      'Teeth alignment or crooked teeth correction',
                      'Cosmetic smile brightening and stain removal',
                      'Replacing missing or broken teeth',
                      'Gentle pediatric dental care for child'
                    ].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers(prev => ({ ...prev, primaryGoal: option }))}
                        className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border cursor-pointer ${
                          answers.primaryGoal === option
                            ? 'bg-blue-50 text-blue-800 border-blue-400 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{option}</span>
                        {answers.primaryGoal === option && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Daily Brushing & Habits */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Question 2</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      How frequently do you brush your teeth every day?
                    </h3>
                    <p className="text-xs text-slate-500">Honest habits help us provide the right protective tips.</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      'Twice daily (morning and before sleeping)',
                      'Once a day only',
                      'Twice daily plus regular flossing & post-meal rinse',
                      'Occasionally or irregular routine'
                    ].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers(prev => ({ ...prev, brushingHabits: option }))}
                        className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border cursor-pointer ${
                          answers.brushingHabits === option
                            ? 'bg-blue-50 text-blue-800 border-blue-400 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{option}</span>
                        {answers.brushingHabits === option && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Symptoms Experienced (Multi-select) */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Question 3</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Have you noticed any of these symptoms recently?
                    </h3>
                    <p className="text-xs text-slate-500">Select all that apply to your mouth or gums.</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      'Bleeding or tender gums when brushing',
                      'Sharp tooth sensitivity to hot or cold',
                      'Teeth grinding or morning jaw tension',
                      'Persistent bad breath or dry mouth',
                      'Discoloration or yellowing from food/coffee',
                      'None of these'
                    ].map(option => {
                      const isSelected = answers.symptoms?.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleSymptom(option)}
                          className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border cursor-pointer ${
                            isSelected
                              ? 'bg-pink-50 text-pink-900 border-pink-400 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span>{option}</span>
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                              isSelected ? 'bg-pink-600 border-pink-600 text-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 4: Last Dental Visit */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Question 4</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      When did you last visit a dentist for a routine cleaning or check-up?
                    </h3>
                    <p className="text-xs text-slate-500">Regular 6-month visits prevent deeper complications (FAQ #14).</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      'Within the last 6 months',
                      '6 to 12 months ago',
                      'Over 1 to 2 years ago',
                      'Never or cannot remember'
                    ].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers(prev => ({ ...prev, lastVisit: option }))}
                        className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border cursor-pointer ${
                          answers.lastVisit === option
                            ? 'bg-blue-50 text-blue-800 border-blue-400 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{option}</span>
                        {answers.lastVisit === option && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 5: Patient Profile / Age Group */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Question 5</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Who is this oral assessment for?
                    </h3>
                    <p className="text-xs text-slate-500">Helps customize age-specific recommendations (milk teeth, braces, or dentures).</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      'Child or Kid (Under 12 years)',
                      'Teen / Young Adult (12 - 25 years)',
                      'Adult (26 - 55 years)',
                      'Senior Citizen (55+ years)'
                    ].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers(prev => ({ ...prev, ageGroup: option }))}
                        className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border cursor-pointer ${
                          answers.ageGroup === option
                            ? 'bg-blue-50 text-blue-800 border-blue-400 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{option}</span>
                        {answers.ageGroup === option && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                    currentStep === 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentStep === totalSteps ? 'Generate My Plan' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
