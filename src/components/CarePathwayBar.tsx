import React from 'react';
import {
  CalendarCheck,
  ShieldAlert,
  Bot,
  Timer,
  ArrowRight,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { WaitTimeInfo } from '../utils/storage';
import { CLINIC_INFO } from '../data/clinicData';

interface CarePathwayBarProps {
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onOpenChatbot: () => void;
  waitTime: WaitTimeInfo;
}

export const CarePathwayBar: React.FC<CarePathwayBarProps> = ({
  onOpenAppointment,
  onOpenEmergency,
  onOpenChatbot,
  waitTime
}) => {
  const pathways = [
    {
      id: 'appointment',
      title: 'Fix an Appointment',
      tag: 'Step 1 • In-Person Care',
      desc: 'Pick your specialist, procedure & preferred time slot in 60 seconds.',
      actionText: 'Book Slot',
      icon: CalendarCheck,
      color: 'from-blue-600 to-indigo-700',
      badgeColor: 'bg-blue-100 text-blue-800',
      onClick: onOpenAppointment,
      borderHover: 'hover:border-blue-400'
    },
    {
      id: 'emergency',
      title: '24/7 Emergency Support',
      tag: 'Urgent Care • Immediate Help',
      desc: 'Acute toothache, accidental fracture, or facial swelling triage hotline.',
      actionText: 'Call Helpline',
      icon: ShieldAlert,
      color: 'from-rose-600 to-red-700',
      badgeColor: 'bg-rose-100 text-rose-800',
      onClick: onOpenEmergency,
      borderHover: 'hover:border-rose-400'
    },
    {
      id: 'ai-scan',
      title: 'Oral Health AI Assessment',
      tag: 'Smart Triage • Instant',
      desc: '2-min interactive quiz & symptom check powered by Dr. Anupriya’s clinical knowledge.',
      actionText: 'Start Assessment',
      icon: Bot,
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'bg-pink-100 text-pink-800',
      onClick: onOpenChatbot,
      borderHover: 'hover:border-pink-400'
    },
    {
      id: 'walkin',
      title: 'Live Walk-in Wait Time',
      tag: `Real-time • ${waitTime.queueCount} in queue`,
      desc: `Current OPD walk-in wait is approx. ${waitTime.displayText}. 3 operatories active today.`,
      actionText: 'Walk-in Info',
      icon: Timer,
      color: 'from-slate-800 to-slate-900',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      onClick: onOpenAppointment,
      borderHover: 'hover:border-emerald-400'
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-200/90 p-3 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {pathways.map(p => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={p.onClick}
                className={`text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group ${p.borderHover}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                      {p.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                  <span>{p.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
