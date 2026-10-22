import React, { useState, useEffect } from 'react';
import {
  PatientAccount,
  PatientSmileRewardsSummary,
  RedeemableReward,
  RedeemedVoucher
} from '../types';
import {
  COSMETIC_REWARD_CATALOG,
  getPatientSmileRewards,
  redeemPatientReward,
  earnCheckupRewardPoints
} from '../utils/storage';
import {
  Sparkles,
  Gift,
  Coins,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Tag,
  Stethoscope,
  Smile,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface PatientSmileRewardsProps {
  patient: PatientAccount;
  onOpenBookingWithTreatment?: (treatmentId: string, notes?: string) => void;
  onNavigateBooking?: () => void;
}

export const PatientSmileRewards: React.FC<PatientSmileRewardsProps> = ({
  patient,
  onOpenBookingWithTreatment,
  onNavigateBooking
}) => {
  const [rewardsSummary, setRewardsSummary] = useState<PatientSmileRewardsSummary>(() =>
    getPatientSmileRewards(patient.uhid)
  );
  const [selectedRewardToRedeem, setSelectedRewardToRedeem] = useState<RedeemableReward | null>(null);
  const [redemptionSuccessVoucher, setRedemptionSuccessVoucher] = useState<RedeemedVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'vouchers' | 'history'>('catalog');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync rewards data on custom events
  useEffect(() => {
    const handleUpdate = () => {
      setRewardsSummary(getPatientSmileRewards(patient.uhid));
    };
    window.addEventListener('sdc_rewards_updated', handleUpdate);
    return () => window.removeEventListener('sdc_rewards_updated', handleUpdate);
  }, [patient.uhid]);

  const handleCopyVoucher = (code: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleConfirmRedeem = () => {
    if (!selectedRewardToRedeem) return;
    setIsProcessing(true);
    setActionError(null);

    setTimeout(() => {
      const res = redeemPatientReward(patient.uhid, selectedRewardToRedeem.id);
      setIsProcessing(false);

      if (res.success && res.voucher) {
        setRedemptionSuccessVoucher(res.voucher);
        setSelectedRewardToRedeem(null);
        setRewardsSummary(getPatientSmileRewards(patient.uhid));
      } else {
        setActionError(res.error || 'Failed to redeem reward.');
      }
    }, 400);
  };

  const handleClaimDemoCheckupPoints = () => {
    earnCheckupRewardPoints(
      patient.uhid,
      'Preventive Dental Maintenance & Enamel Polishing',
      150,
      'Dr. Anupriya'
    );
    setRewardsSummary(getPatientSmileRewards(patient.uhid));
  };

  // Determine loyalty tier based on total earned points
  const totalEarned = rewardsSummary.totalPointsEarned;
  const currentTier =
    totalEarned >= 600
      ? { name: 'Platinum Smile', color: 'from-purple-600 to-indigo-600', nextTier: 'Max Tier Achieved', progress: 100 }
      : totalEarned >= 300
      ? { name: 'Gold Smile', color: 'from-amber-500 to-yellow-600', nextTier: 'Platinum (600 pts)', progress: Math.min(100, Math.round(((totalEarned - 300) / 300) * 100)) }
      : { name: 'Silver Smile', color: 'from-blue-600 to-cyan-600', nextTier: 'Gold (300 pts)', progress: Math.min(100, Math.round((totalEarned / 300) * 100)) };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* HERO BANNER & POINTS WALLET BALANCE */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        {/* Subtle background dental illumination */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r ${currentTier.color} text-white shadow-xs`}>
                ★ {currentTier.name} Member
              </span>
              <span className="text-xs text-blue-200">
                UHID: {patient.uhid}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Smile Rewards & Loyalty Points
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every completed dental checkup and routine cleaning earns you reward points. Redeem them anytime for exclusive discounts on professional teeth whitening, clear aligners, and aesthetic veneers.
            </p>

            {/* Loyalty tier progress */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                <span>Tier Progress ({currentTier.name})</span>
                <span className="text-blue-300 font-bold">{currentTier.nextTier}</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentTier.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Points Balance Display Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 sm:min-w-[260px] flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-300 animate-pulse" />
                Available Smile Points
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {rewardsSummary.availablePoints}
                </span>
                <span className="text-sm font-bold text-amber-300">Points</span>
              </div>
              <div className="mt-1 text-xs text-slate-300 flex items-center gap-2">
                <span>Total Earned: <strong>{rewardsSummary.totalPointsEarned} pts</strong></span>
                <span>•</span>
                <span>Redeemed: <strong>{rewardsSummary.totalPointsRedeemed} pts</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleClaimDemoCheckupPoints}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                title="Claim points for recent checkup maintenance"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-100" />
                <span>+150 Pts Checkup Credit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION SUB-NAVIGATION */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('catalog')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'catalog'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Cosmetic Discounts Catalog</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeSubTab === 'catalog' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {COSMETIC_REWARD_CATALOG.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('vouchers')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'vouchers'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>My Redeemed Vouchers</span>
          {rewardsSummary.vouchers.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeSubTab === 'vouchers' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}`}>
              {rewardsSummary.vouchers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'history'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Points Ledger ({rewardsSummary.transactions.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: COSMETIC REWARDS CATALOG */}
      {/* ========================================================================= */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Redeem for Aesthetic Treatments
              </h3>
              <p className="text-xs text-slate-500">
                Turn your regular oral checkup habits into luminous savings on cosmetic smile enhancements.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>Your Current Balance: <strong className="text-slate-900 font-extrabold">{rewardsSummary.availablePoints} pts</strong></span>
            </div>
          </div>

          {/* Grid of Cosmetic Treatment Reward Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COSMETIC_REWARD_CATALOG.map(reward => {
              const canAfford = rewardsSummary.availablePoints >= reward.pointsCost;
              const pointsNeeded = reward.pointsCost - rewardsSummary.availablePoints;

              return (
                <div
                  key={reward.id}
                  className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                    canAfford ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200/70 opacity-90'
                  }`}
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Header: Category, Badge & Cost */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                          {reward.category}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 leading-snug mt-0.5">
                          {reward.title}
                        </h4>
                      </div>

                      {reward.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-100 text-pink-800 border border-pink-200 shrink-0">
                          {reward.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {reward.description}
                    </p>

                    {/* Pricing math */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-100/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Standard Clinic Cost:</span>
                        <span className="font-semibold text-slate-500 line-through">₹{reward.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                        <span>Reward Discount:</span>
                        <span>{reward.discountType === 'free' ? '100% FREE VOUCHER' : `-₹${reward.discountValue.toLocaleString()} OFF`}</span>
                      </div>
                      <div className="pt-1.5 border-t border-blue-200/60 flex items-center justify-between text-xs font-black">
                        <span className="text-slate-800">Your Effective Price:</span>
                        <span className="text-blue-700 text-sm font-extrabold">
                          {reward.discountType === 'free' ? '₹0' : `₹${(reward.originalPrice - reward.discountValue).toLocaleString()}`}
                        </span>
                      </div>
                    </div>

                    {/* Highlights bullet list */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Clinical Benefits:
                      </span>
                      <ul className="space-y-1">
                        {reward.highlights.map((item, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-slate-900">{reward.pointsCost}</span>
                      <span className="text-xs font-bold text-slate-500">Smile Pts</span>
                    </div>

                    {canAfford ? (
                      <button
                        type="button"
                        onClick={() => setSelectedRewardToRedeem(reward)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all hover:scale-102 cursor-pointer flex items-center gap-1.5"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Redeem Voucher</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onNavigateBooking}
                        className="px-3 py-1.5 bg-slate-200 text-slate-500 hover:bg-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        title={`Need ${pointsNeeded} more points. Book a checkup to earn them!`}
                      >
                        <span>Need {pointsNeeded} pts</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to Earn More Points Guide Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">How You Earn Points at Sakthi Dental Clinic</h4>
                <p className="text-xs text-slate-500">Points are credited to your account upon completion of each clinical milestone</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-black text-blue-600">+150 Points</span>
                <h5 className="text-xs font-bold text-slate-800">Routine Checkup & Scaling</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Every 6-month preventative cleaning visit with our dental hygienist.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-black text-blue-600">+150 Points</span>
                <h5 className="text-xs font-bold text-slate-800">Specialist Consultation</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Orthodontic, surgical, or implant evaluations and digital diagnostics.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-black text-blue-600">+120 Points</span>
                <h5 className="text-xs font-bold text-slate-800">Annual OPG & X-Ray Screen</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Low-radiation digital radiographic jaw screening & bone density check.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-black text-blue-600">+50 Points</span>
                <h5 className="text-xs font-bold text-slate-800">Care Feedback & Rating</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Help fellow Hosur patients by sharing honest feedback on your visit.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MY REDEEMED VOUCHERS WALLET */}
      {/* ========================================================================= */}
      {activeSubTab === 'vouchers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Your Active Cosmetic Discount Vouchers
              </h3>
              <p className="text-xs text-slate-500">
                Present voucher code at reception or apply directly when fixing an appointment.
              </p>
            </div>
          </div>

          {rewardsSummary.vouchers.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Tag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No Vouchers Redeemed Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You have {rewardsSummary.availablePoints} Smile Points available! Browse our cosmetic catalog to redeem discounts on laser whitening, veneers, and aligners.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('catalog')}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Browse Rewards Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewardsSummary.vouchers.map(voucher => (
                <div
                  key={voucher.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600">
                        Cosmetic Discount Pass
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        voucher.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {voucher.status === 'active' ? 'Valid & Ready' : 'Claimed'}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {voucher.rewardTitle}
                    </h4>

                    {/* Voucher Code Box */}
                    <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">VOUCHER PASSCODE</span>
                        <span className="text-sm font-black tracking-wider font-mono text-cyan-300">
                          {voucher.voucherCode}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyVoucher(voucher.voucherCode)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1 border border-slate-700"
                        title="Copy voucher code"
                      >
                        {copiedCode === voucher.voucherCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-slate-500 space-y-0.5 pt-1">
                      <div className="flex justify-between">
                        <span>Discount Value:</span>
                        <strong className="text-emerald-700">₹{voucher.discountValue.toLocaleString()} OFF</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Points Spent:</span>
                        <span>{voucher.pointsUsed} Smile Pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Redeemed Date:</span>
                        <span>{voucher.redeemedDate}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Valid Until:</span>
                        <span>{voucher.expiresDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenBookingWithTreatment) {
                          onOpenBookingWithTreatment(voucher.treatmentId, `Applied Smile Rewards Voucher: ${voucher.voucherCode} (-₹${voucher.discountValue})`);
                        } else if (onNavigateBooking) {
                          onNavigateBooking();
                        }
                      }}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-200" />
                      <span>Book Treatment with Voucher</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: POINTS TRANSACTION LEDGER */}
      {/* ========================================================================= */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Points History & Completed Checkups Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Detailed record of points earned from dental visits and redeemed for cosmetic perks.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {rewardsSummary.transactions.map(tx => (
                <div key={tx.id} className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      tx.type === 'earned' ? 'bg-emerald-50 text-emerald-600' : 'bg-pink-50 text-pink-600'
                    }`}>
                      {tx.type === 'earned' ? <Coins className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        {tx.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span>{tx.date}</span>
                        <span>•</span>
                        <span className="capitalize">{tx.sourceType}</span>
                        {tx.doctorName && (
                          <>
                            <span>•</span>
                            <span>{tx.doctorName}</span>
                          </>
                        )}
                        {tx.voucherCode && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-cyan-700 bg-cyan-50 px-1.5 py-0.2 rounded font-bold">
                              {tx.voucherCode}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-sm sm:text-base font-black ${
                      tx.type === 'earned' ? 'text-emerald-600' : 'text-pink-600'
                    }`}>
                      {tx.type === 'earned' ? `+${tx.points}` : `${tx.points}`} pts
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                      {tx.type === 'earned' ? 'Credited' : 'Redeemed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM REDEMPTION */}
      {/* ========================================================================= */}
      {selectedRewardToRedeem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confirm Reward Redemption</span>
                <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                  {selectedRewardToRedeem.title}
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Reward Discount:</span>
                <strong className="text-emerald-700">₹{selectedRewardToRedeem.discountValue.toLocaleString()} OFF</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Points Cost:</span>
                <strong className="text-pink-600">-{selectedRewardToRedeem.pointsCost} Smile Points</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-800 font-bold">
                <span>Remaining Balance:</span>
                <span>{rewardsSummary.availablePoints - selectedRewardToRedeem.pointsCost} Smile Points</span>
              </div>
            </div>

            {actionError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            <p className="text-xs text-slate-500 leading-relaxed">
              Upon redemption, your points will be deducted and a 90-day digital discount voucher will be placed in your wallet.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRewardToRedeem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRedeem}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Issuing Voucher...' : 'Confirm & Deduct Points'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SUCCESSFUL REDEMPTION VOUCHER REVEAL */}
      {/* ========================================================================= */}
      {redemptionSuccessVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">Voucher Successfully Issued!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Your discount for {redemptionSuccessVoucher.rewardTitle} is active and ready to use.
              </p>
            </div>

            {/* Voucher Passcode Box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">YOUR DISCOUNT VOUCHER PASSCODE</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-black font-mono text-cyan-300 tracking-wider">
                  {redemptionSuccessVoucher.voucherCode}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyVoucher(redemptionSuccessVoucher.voucherCode)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode === redemptionSuccessVoucher.voucherCode ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <span className="text-[11px] text-emerald-300 block font-medium">
                Saves ₹{redemptionSuccessVoucher.discountValue.toLocaleString()} on your appointment
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRedemptionSuccessVoucher(null);
                  setActiveSubTab('vouchers');
                }}
                className="w-full sm:w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                View in Wallet
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetVoucher = redemptionSuccessVoucher;
                  setRedemptionSuccessVoucher(null);
                  if (onOpenBookingWithTreatment) {
                    onOpenBookingWithTreatment(
                      targetVoucher.treatmentId,
                      `Applied Smile Rewards Voucher: ${targetVoucher.voucherCode} (-₹${targetVoucher.discountValue})`
                    );
                  } else if (onNavigateBooking) {
                    onNavigateBooking();
                  }
                }}
                className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
