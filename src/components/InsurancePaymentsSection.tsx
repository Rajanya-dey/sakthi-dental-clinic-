import React, { useState } from 'react';
import {
  ACCEPTED_INSURANCES,
  EMI_OPTIONS,
  TREATMENT_FINANCIAL_ESTIMATES,
  INSURANCE_FAQS,
  InsuranceProvider,
  EmiPlan,
  TreatmentEstimate
} from '../data/insurancePaymentData';
import { CLINIC_INFO } from '../data/clinicData';
import {
  ShieldCheck,
  CreditCard,
  Calculator,
  HelpCircle,
  FileCheck2,
  Building2,
  PhoneCall,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Percent,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BadgeAlert,
  Wallet,
  Receipt,
  HeartHandshake
} from 'lucide-react';

interface InsurancePaymentsSectionProps {
  onOpenAppointment?: (treatmentId?: string) => void;
  preselectedTreatmentId?: string;
  compact?: boolean;
}

export const InsurancePaymentsSection: React.FC<InsurancePaymentsSectionProps> = ({
  onOpenAppointment,
  preselectedTreatmentId,
  compact = false
}) => {
  // Calculator State
  const defaultEstimate = TREATMENT_FINANCIAL_ESTIMATES.find(t => t.id === preselectedTreatmentId) || TREATMENT_FINANCIAL_ESTIMATES[0];
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(defaultEstimate.id);
  const [customCost, setCustomCost] = useState<number>(defaultEstimate.typicalCost);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  
  // Section Navigation Tabs
  const [activeTab, setActiveTab] = useState<'emi' | 'insurance' | 'steps' | 'faqs'>('emi');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter for insurance providers
  const [insuranceFilter, setInsuranceFilter] = useState<'All' | 'Insurer' | 'TPA'>('All');

  // Sync selected treatment cost when dropdown changes
  const handleTreatmentChange = (tId: string) => {
    setSelectedTreatmentId(tId);
    const est = TREATMENT_FINANCIAL_ESTIMATES.find(t => t.id === tId);
    if (est) {
      setCustomCost(est.typicalCost);
      setSelectedTenure(est.suggestedTenure);
    }
  };

  // Calculator Math
  const downPaymentAmount = Math.round((customCost * downPaymentPercent) / 100);
  const principalToFinance = Math.max(0, customCost - downPaymentAmount);
  const monthlyEmi = selectedTenure > 0 ? Math.round(principalToFinance / selectedTenure) : 0;

  const currentEstimateObj = TREATMENT_FINANCIAL_ESTIMATES.find(t => t.id === selectedTreatmentId) || defaultEstimate;

  const filteredInsurances = insuranceFilter === 'All'
    ? ACCEPTED_INSURANCES
    : ACCEPTED_INSURANCES.filter(ins => ins.type === insuranceFilter);

  return (
    <section id="insurance-payments" className={`relative bg-gradient-to-b from-blue-50/50 via-white to-slate-50 ${compact ? 'py-10' : 'py-16 sm:py-24'} overflow-hidden border-t border-slate-200/80`}>
      {/* Decorative ambient gradients */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Transparent Pricing & Flexible Financing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Insurance &{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Flexible 0% EMI Payments
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High-quality specialized dental care should be accessible to every family.
            We accept leading health insurance policies, corporate TPA plans, and provide zero-interest installment options for smile makeovers, braces, and implants.
          </p>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 text-left">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Percent className="w-4 h-4 text-blue-600 shrink-0" />
                <span>0% Interest EMI</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Spread cost up to 18 months</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cashless & TPA</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Direct corporate reimbursements</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <Receipt className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">100% itemized tax invoices</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-900">
                <HeartHandshake className="w-4 h-4 text-pink-600 shrink-0" />
                <span>Clinic Milestone Plan</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Pay per visit with 0 credit checks</p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TRUST LOGO GRID: ACCEPTED INSURANCE PROVIDERS & CASHLESS NETWORKS */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                  Accepted Insurance Providers & Cashless Hospitalization Network
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Direct Billing Desk & Instant TPA Pre-Authorization at Hosur
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {ACCEPTED_INSURANCES.map(ins => (
                <button
                  key={ins.id}
                  type="button"
                  onClick={() => {
                    setActiveTab('insurance');
                    setTimeout(() => {
                      const el = document.getElementById(`insurance-card-${ins.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className="group p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between gap-2 text-center cursor-pointer"
                  title={`Click to view ${ins.name} coverage details`}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1 border border-slate-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform overflow-hidden relative">
                    <img
                      src={ins.logoUrl}
                      alt={`${ins.name} Logo`}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    <div className="logo-fallback hidden absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-800 font-black text-xs rounded-xl">
                      <span>{ins.logoText}</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="text-[11px] font-extrabold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                      {ins.name.split(' ')[0]} {ins.name.split(' ')[1] || ''}
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 block truncate mt-0.5">
                      {ins.cashlessSupport ? '✓ Cashless' : 'Reimburse'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span>Fast-track cashless pre-auth via Star Health, Medi Assist, Vidal Health & Bajaj Allianz desks</span>
              </div>
              <div className="font-semibold text-blue-700 flex items-center gap-1.5">
                <span>Corporate health card accepted</span>
                <span>•</span>
                <span>Zero upfront fee on approved corporate claims</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {[
            { id: 'emi', label: '0% Interest EMI Calculator', icon: Calculator },
            { id: 'insurance', label: 'Accepted Insurance & TPAs', icon: ShieldCheck },
            { id: 'steps', label: 'Cashless & Claim Guide', icon: FileCheck2 },
            { id: 'faqs', label: 'Payment FAQs', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: 0% EMI CALCULATOR & FLEXIBLE PLANS */}
        {/* ========================================================================= */}
        {activeTab === 'emi' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Interactive Calculator Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                    <span>Real-Time Treatment Finance Estimator</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Interactive Dental EMI Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                    Select your proposed dental treatment or adjust the cost to estimate your monthly installments with 0% interest financing.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 shrink-0">
                  <Percent className="w-5 h-5 text-emerald-400" />
                  <div className="text-left text-xs">
                    <div className="font-extrabold text-emerald-300">0% No-Cost EMI</div>
                    <div className="text-slate-300 text-[10px]">Zero interest, zero surprise fees</div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (7 cols): Input Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Treatment Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      1. Select Dental Treatment Procedure
                    </label>
                    <select
                      value={selectedTreatmentId}
                      onChange={e => handleTreatmentChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
                    >
                      {TREATMENT_FINANCIAL_ESTIMATES.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.treatmentName} — Approx. ₹{item.typicalCost.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                      <span>Category: <strong className="text-slate-700">{currentEstimateObj.category}</strong></span>
                      <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {currentEstimateObj.insuranceLikelihood}
                      </span>
                    </div>
                  </div>

                  {/* Treatment Cost Slider / Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        2. Estimated Treatment Cost (₹)
                      </label>
                      <span className="text-base font-black text-blue-700 font-mono">
                        ₹{customCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3000}
                      max={120000}
                      step={1000}
                      value={customCost}
                      onChange={e => setCustomCost(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>₹3,000 (Basic)</span>
                      <span>₹50,000 (Braces/Implants)</span>
                      <span>₹1,20,000 (Full Arch)</span>
                    </div>
                  </div>

                  {/* Down Payment Percentage */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        3. Initial Down Payment: {downPaymentPercent}% (₹{downPaymentAmount.toLocaleString('en-IN')})
                      </label>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 20, 30, 50].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setDownPaymentPercent(pct)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            downPaymentPercent === pct
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {pct === 0 ? '0% Down' : `${pct}% Down`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tenure Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      4. Choose Repayment Tenure (Months)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[3, 6, 9, 12, 18].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setSelectedTenure(m)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border text-center ${
                            selectedTenure === m
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>{m} Mos</div>
                          <div className={`text-[9px] font-normal ${selectedTenure === m ? 'text-indigo-200' : 'text-slate-400'}`}>
                            {m <= 12 ? '0% Cost' : 'Low Cost'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column (5 cols): Monthly EMI Breakdown Box */}
                <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-3xl border border-blue-100 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md">
                      Estimated Monthly Outflow
                    </span>

                    {/* Big EMI Highlight */}
                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-mono tracking-tight">
                        ₹{monthlyEmi.toLocaleString('en-IN')}
                        <span className="text-sm sm:text-base font-bold text-slate-500 font-sans"> / month</span>
                      </div>
                      <p className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Calculated at 0% No-Cost Interest</span>
                      </p>
                    </div>

                    {/* Summary Line Items */}
                    <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Total Treatment Value:</span>
                        <span className="font-bold text-slate-900">₹{customCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Down Payment ({downPaymentPercent}%):</span>
                        <span className="font-bold text-blue-700">₹{downPaymentAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Balance Financed:</span>
                        <span className="font-bold text-slate-800">₹{principalToFinance.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tenure Duration:</span>
                        <span className="font-bold text-slate-800">{selectedTenure} Months</span>
                      </div>
                      <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900">
                        <span>Total Payable:</span>
                        <span className="text-emerald-700 font-mono">₹{customCost.toLocaleString('en-IN')} (0 Extra)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenAppointment?.(selectedTreatmentId)}
                      className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <CalendarCheck className="w-4 h-4 text-blue-200" />
                      <span>Book Consultation with EMI Plan</span>
                    </button>

                    <a
                      href={`tel:${CLINIC_INFO.primaryPhone}`}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 hover:text-blue-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                      <span>Call Billing Desk: {CLINIC_INFO.primaryPhone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Financing Partner Plans */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Our 3 Flexible Financing Channels
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose the payment method that fits your household's monthly budget
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hidden sm:inline">
                  Instant At-Clinic Processing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EMI_OPTIONS.map(plan => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                          {plan.partner}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {plan.interestRate}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                        {plan.name}
                      </h4>

                      <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Available Tenures:</span>
                          <strong className="text-slate-800">{plan.tenures}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Min Treatment:</span>
                          <strong className="text-slate-800">₹{plan.minAmount.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Processing:</span>
                          <strong className="text-blue-700">{plan.highlight}</strong>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenAppointment?.()}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Apply for {plan.partner}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ACCEPTED INSURANCES & CORPORATE TPAS */}
        {/* ========================================================================= */}
        {activeTab === 'insurance' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Filter Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Show:
                </span>
                {(['All', 'Insurer', 'TPA'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setInsuranceFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      insuranceFilter === f
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f === 'All' ? 'All Partners (8)' : f === 'Insurer' ? 'Health Insurers (6)' : 'TPAs & Corporate Networks (2)'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Need verification for a different insurer? <a href={`tel:${CLINIC_INFO.primaryPhone}`} className="text-blue-600 font-bold underline">Call our TPA Desk</a>
              </div>
            </div>

            {/* Insurance Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredInsurances.map(ins => (
                <div
                  key={ins.id}
                  id={`insurance-card-${ins.id}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 scroll-mt-28"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-2xs overflow-hidden relative">
                        <img
                          src={ins.logoUrl}
                          alt={`${ins.name} Logo`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={e => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="logo-fallback hidden absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-800 font-black text-xs rounded-xl">
                          <span>{ins.logoText}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {ins.cashlessSupport ? '✓ Cashless Ready' : 'Reimbursement'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {ins.name}
                      </h4>
                      <p className="text-[11px] text-blue-700 font-semibold mt-0.5">
                        {ins.badge}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Eligible Procedures:
                      </span>
                      <ul className="text-[11px] text-slate-600 space-y-1">
                        {ins.coverageTypes.slice(0, 3).map((cov, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-blue-500 font-bold">•</span>
                            <span className="truncate">{cov}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Settlement: <strong>{ins.reimbursementSpeed}</strong></span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Corporate Hub Highlight (Hosur Specific) */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-pink-300 bg-pink-900/60 px-3 py-1 rounded-full border border-pink-400/30">
                    Hosur Industrial Hub & Corporate Benefits
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Corporate Employee Dental Reimbursement Schemes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Working at <strong>TVS Motor, Ashok Leyland, Titan, Tata Electronics, Exide, or SIPCOT Phase I & II Hosur</strong>?
                    Our front desk provides complete stamped clinical documentation required by your HR & TPA portal for swift claim clearance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAppointment?.()}
                  className="px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-md shrink-0 cursor-pointer"
                >
                  Book Corporate Checkup
                </button>
              </div>

              {/* What Documents We Provide You */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Itemized GST Tax Invoice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doctor Medical Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital Pre/Post X-Rays</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ICD-10 Diagnostic Codes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: 4-STEP CASHLESS & REIMBURSEMENT PROCESS */}
        {/* ========================================================================= */}
        {activeTab === 'steps' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8 animate-in fade-in duration-200">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Seamless 4-Step Claim Settlement Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                How our front desk guides you from consultation to insurance reimbursement with zero paperwork hassle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  step: '01',
                  title: 'Oral Diagnosis & Estimation',
                  desc: 'Dr. Anupriya evaluates your condition with high-resolution digital X-rays and issues a transparent itemized estimate with ICD-10 medical codes.',
                  color: 'from-blue-600 to-indigo-600'
                },
                {
                  step: '02',
                  title: 'Pre-Authorization / TPA Desk',
                  desc: 'Our billing coordinator assists you in filing pre-authorization forms with your insurer or TPA desk (Medi Assist, Vidal, Star, etc.).',
                  color: 'from-indigo-600 to-purple-600'
                },
                {
                  step: '03',
                  title: 'Specialized Treatment',
                  desc: 'Undergo your procedure with complete comfort using modern laser and ultrasonic equipment in our Hosur clinic suites.',
                  color: 'from-purple-600 to-pink-600'
                },
                {
                  step: '04',
                  title: 'Documentation Dossier Handover',
                  desc: 'Receive your sealed claim kit: official tax invoice, medical certificate, digital radiographs, and signed insurance discharge summary.',
                  color: 'from-pink-600 to-rose-600'
                }
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white font-mono font-black flex items-center justify-center text-sm shadow-md`}>
                      {s.step}
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 text-[11px] font-bold text-blue-700 flex items-center gap-1">
                    <span>Assisted by Clinic Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

            {/* Helpline banner */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Have questions about your specific insurance policy?
                  </div>
                  <div className="text-slate-600">
                    Our billing team can verify your coverage in advance before your visit.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
                >
                  Call +91 9862890897
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FREQUENTLY ASKED FINANCIAL & INSURANCE FAQS */}
        {/* ========================================================================= */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6 animate-in fade-in duration-200">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                Frequently Asked Insurance & Payment Questions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Clear answers regarding dental insurance coverage, cashless facilities, and 0% interest EMI options.
              </p>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto">
              {INSURANCE_FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors flex items-center justify-between gap-4 cursor-pointer bg-slate-50/50"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
