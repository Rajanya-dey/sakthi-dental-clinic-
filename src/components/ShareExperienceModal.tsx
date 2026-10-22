import React, { useState, useRef, useEffect } from 'react';
import { TREATMENTS } from '../data/clinicData';
import { saveTestimonial } from '../utils/storage';
import { Testimonial } from '../types';
import {
  X,
  Star,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  MapPin,
  RefreshCw,
  Trash2,
  Heart
} from 'lucide-react';

interface ShareExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestimonialSubmitted: (newTestimonial: Testimonial) => void;
}

export const ShareExperienceModal: React.FC<ShareExperienceModalProps> = ({
  isOpen,
  onClose,
  onTestimonialSubmitted
}) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [treatment, setTreatment] = useState(TREATMENTS[0].name);
  const [location, setLocation] = useState('Hosur');
  const [quote, setQuote] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [consent, setConsent] = useState(true);

  // Camera capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Clean up camera stream on close or unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  if (!isOpen) return null;

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera is not supported on this browser or device.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. You can still upload a photo from your gallery below.'
          : 'Could not access camera. Please try file upload instead.'
      );
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setPhotoUrl(dataUrl);
    }
    stopCameraStream();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'Image must be under 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
      stopCameraStream();
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!author.trim()) errs.author = 'Please enter your name.';
    if (!quote.trim()) {
      errs.quote = 'Please share a brief review of your dental experience.';
    } else if (quote.trim().length < 15) {
      errs.quote = 'Please write at least 15 characters.';
    }
    if (!consent) errs.consent = 'Please confirm consent to display your testimonial.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTestimonial = saveTestimonial({
      author: author.trim(),
      rating,
      treatment,
      location: location.trim() || 'Hosur',
      quote: quote.trim(),
      photoUrl: photoUrl || undefined
    });

    onTestimonialSubmitted(newTestimonial);
    setIsSuccess(true);
    setErrors({});
  };

  const handleClose = () => {
    stopCameraStream();
    setIsSuccess(false);
    setAuthor('');
    setQuote('');
    setPhotoUrl(null);
    onClose();
  };

  const ratingDescriptions: Record<number, string> = {
    1: '1/5 - Unsatisfied',
    2: '2/5 - Fair',
    3: '3/5 - Good',
    4: '4/5 - Very Good',
    5: '5/5 - Outstanding / Exceptional'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-100 flex flex-col justify-between">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-pink-700 text-white p-6 relative rounded-t-3xl">
          <button
            onClick={handleClose}
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
            {isSuccess ? 'Thank You for Your Feedback!' : 'Share Your Experience'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            {isSuccess
              ? 'Your testimonial has been submitted and added to our Patient Stories section.'
              : 'Help fellow patients and families in Hosur by sharing your smile journey with Dr. Anupriya & team.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  Your Review Has Been Published!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{author}</strong>! Your {rating}-star testimonial is now live in our "What Our Patients Say" section.
                </p>
              </div>

              {photoUrl && (
                <div className="inline-block p-1 bg-white rounded-full border-2 border-pink-400 shadow-sm">
                  <img
                    src={photoUrl}
                    alt={author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                >
                  View Testimonials Section
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(starNum => {
                      const active = (hoverRating !== null ? hoverRating : rating) >= starNum;
                      return (
                        <button
                          key={starNum}
                          type="button"
                          onMouseEnter={() => setHoverRating(starNum)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(starNum)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                          aria-label={`${starNum} stars`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              active
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-slate-600 ml-2">
                    {ratingDescriptions[hoverRating !== null ? hoverRating : rating]}
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={author}
                    onChange={e => {
                      setAuthor(e.target.value);
                      if (errors.author) setErrors(prev => ({ ...prev, author: '' }));
                    }}
                    placeholder="e.g. Manisha M. or Mrs. Revathi S."
                    className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                      errors.author ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.author && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.author}
                  </p>
                )}
              </div>

              {/* Treatment Received & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Treatment Received
                  </label>
                  <select
                    value={treatment}
                    onChange={e => setTreatment(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="General Consultation & Checkup">General Consultation & Checkup</option>
                    {TREATMENTS.map(t => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    City / Neighborhood
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Anthivadi, Hosur"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial Quote / Review */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Your Review / Patient Story <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={e => {
                    setQuote(e.target.value);
                    if (errors.quote) setErrors(prev => ({ ...prev, quote: '' }));
                  }}
                  placeholder="Tell us about the clinic environment, doctors' care, comfort level during treatment, or results..."
                  className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-colors ${
                    errors.quote ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                  }`}
                />
                {errors.quote && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.quote}
                  </p>
                )}
              </div>

              {/* Optional Photo Upload via Camera or Gallery */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-pink-600" />
                    <span>Patient Photo / Smile Selfie (Optional)</span>
                  </span>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>

                {photoUrl ? (
                  /* Photo Preview */
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <img
                      src={photoUrl}
                      alt="Captured patient preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-400 shadow-xs"
                    />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">Photo Attached</p>
                      <p className="text-[11px] text-slate-500">Will be featured alongside your review.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoUrl(null);
                          startCamera();
                        }}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        Retake photo
                      </button>
                    </div>
                  </div>
                ) : isCameraActive ? (
                  /* Live Camera View */
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-56 flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 border-2 border-pink-500/50 rounded-2xl pointer-events-none" />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="flex-1 py-2.5 px-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take Snapshot</span>
                      </button>
                      <button
                        type="button"
                        onClick={stopCameraStream}
                        className="py-2.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Camera & Upload Options */
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={startCamera}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-300 text-slate-700 hover:text-pink-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-pink-600" />
                        <span>Use Camera (Selfie)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span>Upload from Device</span>
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {cameraError && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        {cameraError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-xs text-slate-600">
                    I consent to having my review and optional photo displayed on Sakthi Dental Clinic's public website.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-xs">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm tracking-wide cursor-pointer active:scale-98"
                >
                  Submit Patient Testimonial
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
