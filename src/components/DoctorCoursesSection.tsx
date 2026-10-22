import React, { useState } from 'react';
import { DOCTOR_COURSES, DoctorCourse, CourseEnrollment } from '../data/coursesData';
import { createCourseEnrollment } from '../utils/storage';
import {
  GraduationCap,
  Award,
  CalendarCheck,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Stethoscope,
  X,
  ShieldCheck,
  Download,
  AlertCircle,
  ChevronRight,
  MapPin,
  Star,
  FileText
} from 'lucide-react';

interface DoctorCoursesSectionProps {
  onOpenAppointment?: () => void;
  onSelectDoctor?: (doctorId: string) => void;
  className?: string;
}

export const DoctorCoursesSection: React.FC<DoctorCoursesSectionProps> = ({
  onOpenAppointment,
  onSelectDoctor,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<DoctorCourse | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'syllabus' | 'enroll'>('syllabus');

  // Enrollment Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantProfession, setApplicantProfession] = useState('Dental Surgeon (BDS/MDS)');
  const [councilRegNo, setCouncilRegNo] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<CourseEnrollment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'All Doctor Courses (7)' },
    { id: 'cde-specialist', label: 'Dental Doctor Fellowships & CDE' },
    { id: 'ortho-aligners', label: 'Orthodontics & 3D Aligners' },
    { id: 'implant-surgery', label: 'Implantology & Oral Surgery' },
    { id: 'laser-prostho', label: 'Laser & Aesthetic Prosthodontics' },
    { id: 'patient-academy', label: 'Doctor-Led Patient Academy (Free)' }
  ];

  const filteredCourses = DOCTOR_COURSES.filter(course => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'cde-specialist') {
      return course.targetAudience === 'General Dentists' || course.targetAudience === 'Specialist Fellows';
    }
    if (selectedCategory === 'ortho-aligners') {
      return course.category === 'Orthodontics & Aligners';
    }
    if (selectedCategory === 'implant-surgery') {
      return course.category === 'Implantology' || course.category === 'Oral & Maxillofacial Surgery';
    }
    if (selectedCategory === 'laser-prostho') {
      return course.category === 'Laser Dentistry' || course.category === 'Prosthodontics & Aesthetics';
    }
    if (selectedCategory === 'patient-academy') {
      return course.category === 'Patient & Family Academy';
    }
    return true;
  });

  const openCourseModal = (course: DoctorCourse, tab: 'syllabus' | 'enroll' = 'syllabus') => {
    setActiveCourseModal(course);
    setActiveModalTab(tab);
    setSelectedBatch(course.nextBatchDate);
    setEnrollmentSuccess(null);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourseModal) return;
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const enrollment = createCourseEnrollment({
        courseId: activeCourseModal.id,
        courseTitle: activeCourseModal.title,
        applicantName: applicantName.trim(),
        email: applicantEmail.trim(),
        phone: applicantPhone.trim(),
        profession: applicantProfession,
        dentalCouncilRegNo: councilRegNo.trim() || undefined,
        selectedBatch: selectedBatch || activeCourseModal.nextBatchDate,
        feePaid: activeCourseModal.fee
      });

      setEnrollmentSuccess(enrollment);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="doctor-courses" className={`py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/40 relative border-t border-slate-200/80 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Doctor Clinical Academy • CDE Continuing Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Clinical Courses Directed by Specialist Doctors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Hands-on surgical residencies, State Dental Council (DCI) accredited CDE masterclasses for practicing dental surgeons, and free doctor-guided oral wellness education for families.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
            <div className="flex items-center gap-2.5 px-3 py-1.5 border-r border-slate-100">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs font-black text-slate-900">DCI Accredited</p>
                <p className="text-[10px] text-slate-500">CDE Credit Points</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs font-black text-slate-900">1:1 Mentorship</p>
                <p className="text-[10px] text-slate-500">Live Patient Cases</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => {
            const isFree = course.fee.toLowerCase().includes('free');
            const isPatientCourse = course.category === 'Patient & Family Academy';

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Badges */}
                  <div className="p-6 pb-4 border-b border-slate-100 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isPatientCourse
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.category}
                      </span>

                      {course.cmeCredits && (
                        <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          <Award className="w-3 h-3" />
                          <span>{course.cmeCredits.split(' ')[0]} {course.cmeCredits.split(' ')[1] || 'CDE'}</span>
                        </span>
                      )}

                      {isFree && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          100% Free
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Doctor Director Spotlight Banner */}
                  <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-xs shrink-0 bg-slate-200">
                        <img
                          src={course.directorImage}
                          alt={course.directorName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                          Course Director
                        </p>
                        <h4 className="text-xs font-black text-slate-900 truncate">
                          {course.directorName}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {course.directorDegrees}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-medium block">Audience</span>
                      <span className="text-[11px] font-bold text-slate-700">{course.targetAudience.split('&')[0]}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="p-6 space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Clinical Competencies & Training:
                    </p>
                    <ul className="space-y-2">
                      {course.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Batch Date & Seats Left Badge */}
                    <div className="pt-2 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-[11px]">{course.duration}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        <span>{course.seatsAvailable < 10 ? `Only ${course.seatsAvailable} seats left` : 'Open Enrollment'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Fee & Action Buttons */}
                <div className="p-6 pt-0 space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Tuition Fee</span>
                      <span className={`font-black ${isFree ? 'text-emerald-700 text-sm' : 'text-slate-900 text-sm'}`}>
                        {course.fee.split('(')[0]}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium text-right">
                      Next: {course.nextBatchDate.split(',')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openCourseModal(course, 'syllabus')}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Syllabus</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openCourseModal(course, 'enroll')}
                      className="py-2.5 px-3 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Enroll in Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hospital Community Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-extrabold text-blue-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Doctor Mentorship Commitment
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Are you a Dental Surgeon or Intern looking for Case Mentorship?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Sakthi Dental Clinic hosts weekend hands-on clinical shadow residencies and one-on-one implant case observations at Anthivadi, Hosur.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenAppointment) onOpenAppointment();
            }}
            className="px-6 py-3.5 rounded-2xl bg-white text-blue-950 font-black text-xs sm:text-sm hover:bg-blue-50 shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            Inquire About Doctor Fellowship
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAILED COURSE SYLLABUS & ENROLLMENT MODAL */}
      {/* ========================================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Top Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                  {activeCourseModal.badge || activeCourseModal.category}
                </span>
                {activeCourseModal.cmeCredits && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {activeCourseModal.cmeCredits}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Course Title & Doctor Bio */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeCourseModal.shortDescription}
                </p>
              </div>

              {/* Course Director Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-200">
                    <img
                      src={activeCourseModal.directorImage}
                      alt={activeCourseModal.directorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                      Course Director & Specialist Faculty
                    </span>
                    <h4 className="text-sm font-black text-slate-900">
                      {activeCourseModal.directorName}
                    </h4>
                    <p className="text-xs font-semibold text-pink-700">
                      {activeCourseModal.directorRole} • {activeCourseModal.directorDegrees}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 sm:text-right shrink-0">
                  <p className="font-bold text-slate-700">{activeCourseModal.format}</p>
                  <p className="text-[11px] text-slate-500">{activeCourseModal.duration}</p>
                </div>
              </div>

              {/* Navigation Tabs (Syllabus vs Enroll) */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('syllabus')}
                  className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    activeModalTab === 'syllabus'
                      ? 'border-blue-600 text-blue-600 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Full Clinical Syllabus & Modules ({activeCourseModal.syllabus.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('enroll')}
                  className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    activeModalTab === 'enroll'
                      ? 'border-blue-600 text-blue-600 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Enroll in Batch / Reserve Seat
                </button>
              </div>

              {/* TAB 1: SYLLABUS & MODULES */}
              {activeModalTab === 'syllabus' && (
                <div className="space-y-6">
                  {/* Key Highlights */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Clinical Highlights & Hands-on Lab Requirements</span>
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-950">
                      {activeCourseModal.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modules Timeline */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span>Course Modules Breakdown</span>
                    </h4>

                    <div className="space-y-3">
                      {activeCourseModal.syllabus.map((mod, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              {mod.moduleNumber}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {mod.duration}
                            </span>
                          </div>

                          <h5 className="text-sm font-bold text-slate-900">
                            {mod.title}
                          </h5>

                          <ul className="space-y-1 text-xs text-slate-600">
                            {mod.topics.map((t, tidx) => (
                              <li key={tidx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites & Certificate Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-800">Eligibility / Prerequisites:</p>
                      <p className="text-slate-600 mt-1">{activeCourseModal.prerequisites}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                      <p className="font-bold text-amber-900">Awarded Certificate:</p>
                      <p className="text-amber-800 mt-1">{activeCourseModal.certificateAwarded}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ENROLLMENT FORM */}
              {activeModalTab === 'enroll' && (
                <div className="space-y-6">
                  {enrollmentSuccess ? (
                    <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 text-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-black">Seat Reserved Successfully!</h4>
                        <p className="text-xs text-emerald-800">
                          Your provisional admit slip for <strong>{activeCourseModal.title}</strong> has been generated.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-left space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Admit / Confirmation Code:</span>
                          <span className="font-black text-emerald-700">{enrollmentSuccess.confirmationCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Candidate Name:</span>
                          <span className="font-bold text-slate-800">{enrollmentSuccess.applicantName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Scheduled Batch:</span>
                          <span className="font-bold text-slate-800">{enrollmentSuccess.selectedBatch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tuition Status:</span>
                          <span className="font-bold text-emerald-700">{enrollmentSuccess.feePaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Venue:</span>
                          <span className="font-bold text-slate-800">{activeCourseModal.venue}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            window.print();
                          }}
                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Print Admit Slip</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveCourseModal(null)}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleEnrollSubmit} className="space-y-4">
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-blue-900">{activeCourseModal.title}</p>
                          <p className="text-blue-700">Course Director: {activeCourseModal.directorName}</p>
                        </div>
                        <span className="font-black text-blue-900 text-sm shrink-0">
                          {activeCourseModal.fee.split('(')[0]}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Applicant Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Ramesh Kumar, BDS"
                            value={applicantName}
                            onChange={e => setApplicantName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Professional Category *</label>
                          <select
                            value={applicantProfession}
                            onChange={e => setApplicantProfession(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800 bg-white"
                          >
                            <option value="Dental Surgeon (BDS/MDS)">Dental Surgeon (BDS / MDS)</option>
                            <option value="Dental Intern / Post-Graduate Resident">Dental Intern / PG Resident</option>
                            <option value="Medical Doctor / Allied Health">Medical Doctor / Allied Health</option>
                            <option value="Patient / Family Community Member">Patient / Family Community Member</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="doctor@gmail.com"
                            value={applicantEmail}
                            onChange={e => setApplicantEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">WhatsApp / Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={applicantPhone}
                            onChange={e => setApplicantPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">
                            State Dental Council Reg No. {applicantProfession.includes('Patient') ? '(Optional)' : '*'}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. TN-DCI-38291"
                            value={councilRegNo}
                            onChange={e => setCouncilRegNo(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Preferred Batch Date *</label>
                          <input
                            type="text"
                            value={selectedBatch}
                            onChange={e => setSelectedBatch(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-800 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          Venue: <strong>{activeCourseModal.venue}</strong>. All necessary typhodont models, surgical motor kits, and CDE course material will be provided at the clinic operatory.
                        </span>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Securing Seat...</span>
                          ) : (
                            <>
                              <CalendarCheck className="w-4 h-4 text-blue-200" />
                              <span>Confirm Course Enrollment</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500 hidden sm:block">
                Questions? Call Academic Coordinator: <strong>+91 94432 44788</strong>
              </div>

              {activeModalTab === 'syllabus' && (
                <button
                  type="button"
                  onClick={() => setActiveModalTab('enroll')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Enroll in Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
