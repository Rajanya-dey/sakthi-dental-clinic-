import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment } from '../types';
import { TranslationDictionary } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  PlusCircle,
  FileText,
  CalendarCheck,
  Download,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PatientAppointmentCalendarProps {
  appointments: Appointment[];
  t: TranslationDictionary;
  onOpenBooking: () => void;
  onSelectDateToBook?: (dateStr: string) => void;
}

export const PatientAppointmentCalendar: React.FC<PatientAppointmentCalendarProps> = ({
  appointments,
  t,
  onOpenBooking,
  onSelectDateToBook
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState<{
    date: string;
    list: Appointment[];
  } | null>(null);
  const [calendarView, setCalendarView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth');
  const calendarRef = useRef<FullCalendar | null>(null);

  // Map appointments into FullCalendar events
  const calendarEvents = appointments.map(apt => {
    const isConfirmed = apt.status === 'Confirmed';
    return {
      id: apt.id,
      title: `${apt.treatmentName} • ${apt.timeSlot}`,
      start: apt.date,
      allDay: true,
      backgroundColor: isConfirmed ? '#059669' : '#d97706',
      borderColor: isConfirmed ? '#047857' : '#b45309',
      extendedProps: {
        appointment: apt
      }
    };
  });

  const handleEventClick = (clickInfo: any) => {
    const apt: Appointment = clickInfo.event.extendedProps?.appointment;
    if (apt) {
      setSelectedAppointment(apt);
    }
  };

  const handleDateClick = (arg: any) => {
    const clickedDate = arg.dateStr;
    const matching = appointments.filter(a => a.date === clickedDate);
    if (matching.length > 0) {
      setSelectedDateAppointments({
        date: clickedDate,
        list: matching
      });
    } else {
      // Empty date clicked - offer to book on this date
      setSelectedDateAppointments({
        date: clickedDate,
        list: []
      });
    }
  };

  const calculateDaysLeft = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDownloadIcs = (apt: Appointment) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sakthi Dental Clinic//Patient Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${apt.id}@sakthidentalclinic.in`,
      `SUMMARY:Dental Visit: ${apt.treatmentName} with ${apt.doctorName}`,
      `DESCRIPTION:Appointment ID: ${apt.id}\\nDoctor: ${apt.doctorName}\\nTreatment: ${apt.treatmentName}\\nTime Slot: ${apt.timeSlot}\\nNotes: ${apt.notes || 'None'}\\nClinic: Sakthi Dental Clinic, Anthivadi, Hosur`,
      `LOCATION:Sakthi Dental Clinic, Opp RV Boys School, Anthivadi, Hosur, Tamil Nadu`,
      `DTSTART:${apt.date.replace(/-/g, '')}T090000Z`,
      `DTEND:${apt.date.replace(/-/g, '')}T100000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SakthiDental_Appointment_${apt.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Find the next upcoming appointment for the banner
  const sortedUpcoming = [...appointments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const nextApt = sortedUpcoming[0];

  return (
    <div className="space-y-6">
      {/* Calendar Header Stats Banner */}
      {nextApt && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg border border-blue-800/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md">
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-md">
                  Next Scheduled Visit
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {nextApt.id}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                {nextApt.treatmentName} with {nextApt.doctorName}
              </h3>
              <p className="text-xs text-blue-200 flex items-center gap-2 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span>
                  {nextApt.date} • {nextApt.timeSlot} (in {calculateDaysLeft(nextApt.date)} days)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedAppointment(nextApt)}
              className="flex-1 md:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 cursor-pointer text-center"
            >
              View Visit Card
            </button>
            <button
              onClick={onOpenBooking}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.bookNewAppointment}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main FullCalendar Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md space-y-4">
        {/* Calendar Controls & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                {t.calendarTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Interactive monthly and weekly schedule for your dental appointments
              </p>
            </div>
          </div>

          {/* Legend Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Confirmed ({appointments.filter(a => a.status === 'Confirmed').length})</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Pending ({appointments.filter(a => a.status === 'Pending').length})</span>
            </span>
          </div>
        </div>

        {/* FullCalendar Component Container */}
        <div className="patient-fullcalendar-wrapper overflow-x-auto">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate="2026-10-14"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            buttonText={{
              today: t.todayBtn || 'Today',
              month: t.monthView || 'Month',
              week: t.weekView || 'Week'
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            height="auto"
            dayMaxEvents={3}
            eventContent={eventInfo => {
              const apt: Appointment = eventInfo.event.extendedProps?.appointment;
              const isConfirmed = apt?.status === 'Confirmed';
              return (
                <div
                  className={`w-full px-2 py-1 my-0.5 rounded-lg text-white font-medium shadow-xs cursor-pointer flex items-center justify-between gap-1 transition-transform hover:scale-102 ${
                    isConfirmed
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600'
                  }`}
                  title={`${apt?.treatmentName} with ${apt?.doctorName} on ${apt?.date} at ${apt?.timeSlot}`}
                >
                  <div className="truncate">
                    <div className="font-bold truncate text-[11px] leading-tight flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span>{apt?.treatmentName}</span>
                    </div>
                    <div className="text-[10px] text-white/90 truncate">
                      {apt?.timeSlot} • {apt?.doctorName ? apt.doctorName.split(' ')[0] : ''}
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-black/20 text-white shrink-0">
                    {isConfirmed ? '✓' : '⏳'}
                  </span>
                </div>
              );
            }}
          />
        </div>

        {/* Calendar Quick Tip footer */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
            <span>
              <strong>Calendar Tip:</strong> Click any appointment event to inspect doctor instructions, download your pass, or call clinic reception.
            </span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-blue-600 hover:text-blue-800 font-bold hover:underline shrink-0 cursor-pointer"
          >
            + Need a new visit? Book slot &rarr;
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* APPOINTMENT DETAIL POPUP MODAL */}
      {/* ==================================================================== */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded">
                      {selectedAppointment.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedAppointment.status === 'Confirmed'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white mt-0.5">
                    {selectedAppointment.treatmentName}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              {/* Doctor & Location Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {t.doctorLabel}
                  </span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{selectedAppointment.doctorName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Patient Name
                  </span>
                  <p className="font-bold text-slate-900">
                    {selectedAppointment.patientName}
                  </p>
                </div>
              </div>

              {/* Date & Time Slot Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    Scheduled Date
                  </span>
                  <p className="text-sm font-extrabold text-blue-950 mt-0.5">
                    {selectedAppointment.date}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    Time Slot
                  </span>
                  <p className="text-sm font-extrabold text-blue-950 mt-0.5">
                    {selectedAppointment.timeSlot}
                  </p>
                </div>
              </div>

              {/* Countdown Reminder */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {calculateDaysLeft(selectedAppointment.date) === 0
                    ? 'Visit is scheduled for today! Please arrive 10 minutes early.'
                    : `Upcoming visit in ${calculateDaysLeft(selectedAppointment.date)} days.`}
                </span>
              </div>

              {/* Clinical Notes if available */}
              {selectedAppointment.notes && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Pre-Visit Doctor Notes & Instructions
                  </span>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 italic">
                    "{selectedAppointment.notes}"
                  </p>
                </div>
              )}

              {/* Clinic Location */}
              <div className="flex items-start gap-2 text-slate-500 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Sakthi Dental Clinic • Opp RV Boys School, Anthivadi, Hosur • Phone: {CLINIC_INFO.primaryPhone}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadIcs(selectedAppointment)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.addToCalendar} (.ics)</span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Reception</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* DATE CELL CLICK POPUP (SHOW APPOINTMENTS ON DATE OR BOOK ON DATE) */}
      {/* ==================================================================== */}
      {selectedDateAppointments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                  Selected Calendar Date
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {selectedDateAppointments.date}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDateAppointments(null)}
                className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {selectedDateAppointments.list.length > 0 ? (
                <div className="space-y-3">
                  <p className="font-bold text-slate-700">
                    You have {selectedDateAppointments.list.length} appointment(s) on this date:
                  </p>
                  {selectedDateAppointments.list.map(apt => (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setSelectedDateAppointments(null);
                        setSelectedAppointment(apt);
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          {apt.treatmentName}
                        </span>
                        <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded">
                          {apt.id}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs">
                        {apt.doctorName} • <strong className="text-slate-800">{apt.timeSlot}</strong>
                      </p>
                      <span className="text-[11px] text-blue-600 font-bold block pt-1">
                        Click to view full details &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      No visits scheduled on {selectedDateAppointments.date}
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">
                      Would you like to schedule a consultation with Dr. Anupriya or our dental specialists for this day?
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDateAppointments(null);
                      if (onSelectDateToBook) {
                        onSelectDateToBook(selectedDateAppointments.date);
                      }
                      onOpenBooking();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Book Appointment on this Date</span>
                  </button>
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedDateAppointments(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for FullCalendar to fit Sakthi Dental modern design */}
      <style>{`
        .patient-fullcalendar-wrapper .fc {
          font-family: inherit;
          --fc-border-color: #e2e8f0;
          --fc-today-bg-color: #eff6ff;
          --fc-page-bg-color: #ffffff;
          --fc-neutral-bg-color: #f8fafc;
        }
        .patient-fullcalendar-wrapper .fc-toolbar-title {
          font-size: 1.1rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
        }
        .patient-fullcalendar-wrapper .fc-button {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #334155 !important;
          font-weight: 700 !important;
          font-size: 0.75rem !important;
          border-radius: 0.75rem !important;
          padding: 0.4rem 0.8rem !important;
          text-transform: capitalize !important;
          box-shadow: none !important;
          transition: all 0.15s ease !important;
        }
        .patient-fullcalendar-wrapper .fc-button:hover {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        .patient-fullcalendar-wrapper .fc-button-active,
        .patient-fullcalendar-wrapper .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #2563eb !important;
          border-color: #1d4ed8 !important;
          color: #ffffff !important;
        }
        .patient-fullcalendar-wrapper .fc-col-header-cell-cushion {
          color: #475569 !important;
          font-weight: 700 !important;
          font-size: 0.75rem !important;
          text-transform: uppercase !important;
          padding: 8px 4px !important;
        }
        .patient-fullcalendar-wrapper .fc-daygrid-day-number {
          font-weight: 700 !important;
          font-size: 0.8rem !important;
          color: #1e293b !important;
          padding: 4px 6px !important;
        }
        .patient-fullcalendar-wrapper .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          background-color: #2563eb;
          color: #ffffff !important;
          border-radius: 9999px;
          display: inline-block;
          min-width: 22px;
          text-align: center;
        }
        .patient-fullcalendar-wrapper .fc-daygrid-day:hover {
          background-color: #f8fafc;
          cursor: pointer;
        }
        .patient-fullcalendar-wrapper .fc-theme-standard td,
        .patient-fullcalendar-wrapper .fc-theme-standard th {
          border-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};
