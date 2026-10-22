import React, { useState, useEffect } from 'react';
import { NotificationLog } from '../types';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const [activeToast, setActiveToast] = useState<NotificationLog | null>(null);

  useEffect(() => {
    const handleNotif = (e: any) => {
      if (e.detail) {
        setActiveToast(e.detail);
        const timer = setTimeout(() => {
          setActiveToast(null);
        }, 6000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('sdc_push_notification', handleNotif);
    return () => window.removeEventListener('sdc_push_notification', handleCustom);

    function handleCustom(e: any) {
      handleNotif(e);
    }
  }, []);

  if (!activeToast) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    alert: <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md flex items-start gap-3">
        <div className="p-2 bg-slate-800 rounded-xl">
          {icons[activeToast.type] || <Bell className="w-5 h-5 text-pink-400" />}
        </div>
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
              Push Alert
            </span>
            <span className="text-[10px] text-slate-400">Just now</span>
          </div>
          <h4 className="text-sm font-bold text-white mt-0.5">{activeToast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{activeToast.body}</p>
        </div>
        <button
          onClick={() => setActiveToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
