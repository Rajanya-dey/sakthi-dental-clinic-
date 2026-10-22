import React from 'react';
import { UserRole, UserSession } from '../types';
import { ShieldAlert, ArrowRight, X, User, Stethoscope, Lock } from 'lucide-react';

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: UserSession | null;
  targetRole: UserRole;
  onConfirmSwitch: (targetRole: UserRole) => void;
}

export const RoleSwitchModal: React.FC<RoleSwitchModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  targetRole,
  onConfirmSwitch
}) => {
  if (!isOpen || !currentSession) return null;

  const currentRoleLabels: Record<UserRole, { title: string; icon: any; color: string }> = {
    patient: { title: 'Patient', icon: User, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    doctor: { title: 'Doctor Specialist', icon: Stethoscope, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    admin: { title: 'Clinic Administrator', icon: Lock, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' }
  };

  const targetRoleLabels: Record<UserRole, { title: string; icon: any; color: string }> = {
    patient: { title: 'Patient Portal', icon: User, color: 'text-pink-600' },
    doctor: { title: 'Doctor Portal', icon: Stethoscope, color: 'text-blue-600' },
    admin: { title: 'Admin Management Portal', icon: Lock, color: 'text-indigo-600' }
  };

  const currentInfo = currentRoleLabels[currentSession.role];
  const targetInfo = targetRoleLabels[targetRole];
  const CurrentIcon = currentInfo.icon;
  const TargetIcon = targetInfo.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Warning Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 p-3.5 sm:p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 shrink-0" />
            <h3 className="font-extrabold text-xs sm:text-base">Portal Security & Role Isolation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              Direct Portal Switching Not Allowed
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To protect confidential patient records and clinical safety, portals cannot be freely switched without verifying credentials.
            </p>
          </div>

          {/* Current vs Target Comparison */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Current Session:</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <CurrentIcon className="w-3.5 h-3.5 text-blue-600" />
                {currentSession.user.name} ({currentInfo.title})
              </span>
            </div>

            <div className="border-t border-slate-200/80 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Attempting to Enter:</span>
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <TargetIcon className="w-3.5 h-3.5 text-rose-600" />
                {targetInfo.title}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-xl p-3 leading-relaxed">
            💡 <strong>Security Rule:</strong> To enter the <strong>{targetInfo.title}</strong>, your current session will be closed. You must re-authenticate with the registered email or phone number and verify via OTP.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel & Stay as {currentInfo.title}
            </button>
            <button
              type="button"
              onClick={() => onConfirmSwitch(targetRole)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Sign Out & Enter with OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
