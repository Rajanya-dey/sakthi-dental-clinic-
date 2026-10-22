import React, { useState, useEffect } from 'react';
import {
  getAnalyticsStats,
  getStoredAppointments,
  getStoredInquiries,
  updateAppointmentStatus,
  getEmailConfig,
  saveEmailConfig,
  getPushRules,
  updatePushRule,
  getNotificationLogs,
  triggerPushNotification,
  getEstimatedWaitTime,
  WaitTimeInfo,
  getActiveAdmin,
  logoutAdmin,
  logoutActiveSession
} from '../utils/storage';
import {
  Appointment,
  ContactInquiry,
  EmailReportConfig,
  NotificationLog,
  PushNotificationRule,
  AdminAccount
} from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import {
  BarChart3,
  TrendingUp,
  Users,
  CalendarCheck,
  Mail,
  Bell,
  Smartphone,
  Laptop,
  Tablet,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  LogOut,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const [activeAdmin, setActiveAdminState] = useState<AdminAccount | null>(getActiveAdmin());
  const [activeTab, setActiveTab] = useState<'analytics' | 'appointments' | 'email-reports' | 'push-notifications'>('analytics');
  const [stats, setStats] = useState(getAnalyticsStats());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [emailConfig, setEmailConfig] = useState<EmailReportConfig>(getEmailConfig());
  const [pushRules, setPushRules] = useState<PushNotificationRule[]>([]);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [waitTime, setWaitTime] = useState<WaitTimeInfo>(getEstimatedWaitTime());

  // Search & filter
  const [aptSearch, setAptSearch] = useState('');
  const [aptStatusFilter, setAptStatusFilter] = useState('All');

  // Email report preview & feedback state
  const [emailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [reportSendSuccess, setReportSendSuccess] = useState<string | null>(null);
  const [newRecipient, setNewRecipient] = useState('');

  // Push notification simulation test
  const [testPushTitle, setTestPushTitle] = useState('Weekly Metric Milestone');
  const [testPushBody, setTestPushBody] = useState('Appointments increased by 24% this week with 18 confirmed bookings.');
  const [pushSentMessage, setPushSentMessage] = useState<string | null>(null);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    setStats(getAnalyticsStats());
    setAppointments(getStoredAppointments());
    setInquiries(getStoredInquiries());
    setEmailConfig(getEmailConfig());
    setPushRules(getPushRules());
    setNotificationLogs(getNotificationLogs());
    setWaitTime(getEstimatedWaitTime());
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
    setWaitTime(getEstimatedWaitTime());
  };

  const handleSaveEmailConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailConfig(emailConfig);
    setReportSendSuccess('Email reporting schedule settings saved successfully.');
    setTimeout(() => setReportSendSuccess(null), 4000);
  };

  const handleAddRecipient = () => {
    if (newRecipient.trim() && !emailConfig.recipients.includes(newRecipient.trim())) {
      const updated = {
        ...emailConfig,
        recipients: [...emailConfig.recipients, newRecipient.trim()]
      };
      setEmailConfig(updated);
      saveEmailConfig(updated);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (emailToRemove: string) => {
    const updated = {
      ...emailConfig,
      recipients: emailConfig.recipients.filter(r => r !== emailToRemove)
    };
    setEmailConfig(updated);
    saveEmailConfig(updated);
  };

  const handleSendTestReport = () => {
    const now = new Date().toISOString();
    const updated = { ...emailConfig, lastSentAt: now };
    setEmailConfig(updated);
    saveEmailConfig(updated);

    triggerPushNotification(
      'Automated Performance Summary Dispatched',
      `Weekly performance email summary delivered to ${emailConfig.recipients.length} recipients.`,
      'info'
    );

    setReportSendSuccess(`Test summary report dispatched to: ${emailConfig.recipients.join(', ')}`);
    setTimeout(() => setReportSendSuccess(null), 5000);
    refreshAllData();
  };

  const handleTriggerTestPush = () => {
    triggerPushNotification(testPushTitle, testPushBody, 'alert');
    setPushSentMessage('Push notification alert triggered and broadcasted to devices.');
    setTimeout(() => setPushSentMessage(null), 4000);
    refreshAllData();
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(aptSearch.toLowerCase()) ||
      a.treatmentName.toLowerCase().includes(aptSearch.toLowerCase()) ||
      a.phone.includes(aptSearch);
    const matchesStatus =
      aptStatusFilter === 'All' || a.status === aptStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-100 min-h-screen py-5 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Top Executive Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Live Admin Portal • Hosur Clinic
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sakthi Dental Clinic Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              User engagement analytics, weekly automated email reporting, and push notifications
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {activeAdmin && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl text-xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  {activeAdmin.name.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-800 leading-tight flex items-center gap-1">
                    <span className="truncate max-w-[90px] sm:max-w-none">{activeAdmin.name}</span>
                    <span className="text-[9px] sm:text-[10px] bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.2 rounded-full font-mono">
                      {activeAdmin.employeeId}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500">{activeAdmin.role}</div>
                </div>
                <button
                  onClick={() => {
                    logoutActiveSession();
                    logoutAdmin();
                    setActiveAdminState(null);
                    onLogout?.();
                  }}
                  className="ml-1 sm:ml-2 inline-flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Sign out of Administrator Portal"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <button
                onClick={refreshAllData}
                className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={onBackToSite}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Responsive Scrollable) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar border-b border-slate-200 -mx-1 px-1 sm:mx-0 sm:px-0">
          {[
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: CalendarCheck },
            { id: 'email-reports', label: 'Email Reports', icon: Mail },
            { id: 'push-notifications', label: 'Push Alerts', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-t-xl sm:rounded-t-2xl transition-all shrink-0 border-b-2 cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-700 border-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Analytics & Traffic Metrics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            {/* 4 Stat Cards: 2x2 on mobile, 4 columns on large screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Page Views</span>
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.totalPageViews.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 font-semibold truncate">
                  <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>+14.8% vs last week</span>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Unique Visitors</span>
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.uniqueVisitors.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 font-semibold truncate">
                  <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>+18.2% organic</span>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Conversion</span>
                  <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.conversionRate}%</div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 font-semibold truncate">
                  <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>{stats.appointmentsBooked} Bookings</span>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Avg Session</span>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.avgSessionDuration}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                  Bounce: {stats.bounceRate}
                </div>
              </div>
            </div>

            {/* Middle Section: Weekly Traffic Chart & Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Traffic History Visual Chart */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Weekly Patient Traffic & Bookings</h3>
                    <p className="text-xs text-slate-500">Daily breakdown of unique visitors and scheduled visits</p>
                  </div>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                    Hosur Region
                  </span>
                </div>

                {/* Bar chart visualization */}
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-52 pt-8">
                    {stats.trafficHistory.map(item => {
                      const heightPercent = Math.min(100, Math.round((item.visitors / 750) * 100));
                      return (
                        <div key={item.day} className="flex flex-col items-center h-full justify-end group">
                          <div className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.visitors}
                          </div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-xl group-hover:from-blue-700 group-hover:to-pink-500 transition-all duration-300 relative shadow-sm"
                          >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                              {item.appointments} apts
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700 mt-2">{item.day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-blue-600" />
                      <span>Daily Unique Visitors</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                      <span>Appointments Generated</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Device & Platform Breakdown */}
              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Device Breakdown</h3>
                  <p className="text-xs text-slate-500">Mobile optimization impact</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-pink-600" /> Mobile Phones
                      </span>
                      <span>{stats.mobileTrafficPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stats.mobileTrafficPercent}%` }}
                        className="h-full bg-pink-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Laptop className="w-4 h-4 text-blue-600" /> Desktop / Laptops
                      </span>
                      <span>{stats.desktopTrafficPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stats.desktopTrafficPercent}%` }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Tablet className="w-4 h-4 text-indigo-600" /> Tablets & iPads
                      </span>
                      <span>{stats.tabletTrafficPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stats.tabletTrafficPercent}%` }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 text-xs text-pink-900 space-y-1">
                  <p className="font-bold">📱 Responsive Priority Verified</p>
                  <p className="text-pink-800">
                    67% of Hosur patients browse from mobile smartphones. Responsive layouts and click-to-call CTAs are actively maximizing bookings.
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Treatments Leaderboard */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Treatment Demand Leaderboard</h3>
                <p className="text-xs text-slate-500">Most requested procedures by patients</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.topTreatments.map(item => (
                  <div key={item.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <span className="font-extrabold text-blue-600">{item.count} clicks</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.percentage * 2.5}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Patient Appointments & Inquiries */}
        {activeTab === 'appointments' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Real-time Wait Time & Queue Sync Controller */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Live Clinic Queue • Header Wait Time Sync
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Current Header Estimated Wait Time:{' '}
                    <span className="text-emerald-300 underline underline-offset-4">
                      {waitTime.displayText}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
                    Calculated live based on {waitTime.queueCount} patients currently in the active schedule (Confirmed + Pending). Changes here automatically update the public website header in real time.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-center sm:text-right shrink-0">
                  <div className="text-2xl font-black text-white">{waitTime.queueCount}</div>
                  <div className="text-[11px] text-blue-200 font-medium">Patients in Queue</div>
                  <div className="text-[10px] text-emerald-300 font-bold mt-1">3 Active Doctor Operatories</div>
                </div>
              </div>

              {/* Quick queue advance button */}
              {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const nextApt = appointments.find(a => a.status === 'Confirmed' || a.status === 'Pending');
                      if (nextApt) {
                        handleStatusChange(nextApt.id, 'Completed');
                      }
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Next Patient Completed (- Wait Time)</span>
                  </button>

                  <span className="text-xs text-blue-300">
                    Next in line: <strong className="text-white">{appointments.find(a => a.status === 'Confirmed' || a.status === 'Pending')?.patientName}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Appointments Section */}
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Scheduled Appointments</h3>
                  <p className="text-xs text-slate-500">Real-time bookings from the "Fix an Appointment" modal</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search patient..."
                      value={aptSearch}
                      onChange={e => setAptSearch(e.target.value)}
                      className="w-full sm:w-44 pl-8 pr-3 py-2 sm:py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                    />
                  </div>

                  <select
                    value={aptStatusFilter}
                    onChange={e => setAptStatusFilter(e.target.value)}
                    className="text-xs border border-slate-300 rounded-xl px-2.5 py-2 sm:py-1.5 focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Responsive Table with horizontal swipe indicator */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4">Treatment</th>
                      <th className="py-3 px-4">Doctor</th>
                      <th className="py-3 px-4">Date & Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No matching appointments found.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map(apt => (
                        <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                            {apt.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{apt.patientName}</div>
                            <div className="text-[11px] text-slate-500">{apt.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            {apt.treatmentName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {apt.doctorName}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{apt.date}</div>
                            <div className="text-[11px] text-slate-500">{apt.timeSlot}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                apt.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : apt.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : apt.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={apt.status}
                              onChange={e => handleStatusChange(apt.id, e.target.value as any)}
                              className="text-[11px] border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirm</option>
                              <option value="Completed">Complete</option>
                              <option value="Cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Contact Us Inquiries</h3>
                <p className="text-xs text-slate-500">Messages sent through the Contact Us page form</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{inq.name}</h4>
                        <p className="text-xs text-slate-500">{inq.email} • {inq.phone}</p>
                      </div>
                      <span className="font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {inq.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                      "{inq.message || 'General inquiry regarding dental consultation.'}"
                    </p>
                    <div className="text-[10px] text-slate-400">
                      Received: {new Date(inq.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Automated Email Reporting */}
        {activeTab === 'email-reports' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {reportSendSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{reportSendSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Configuration Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Automated Weekly Email Reporting
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure automated delivery of weekly clinic performance summaries directly to executive staff.
                  </p>
                </div>

                <form onSubmit={handleSaveEmailConfig} className="space-y-5 text-xs sm:text-sm">
                  {/* Master Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-900">Enable Automated Email Reporting</p>
                      <p className="text-slate-500 text-xs">Sends weekly performance digests automatically on schedule</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailConfig.enabled}
                        onChange={e => setEmailConfig({ ...emailConfig, enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Frequency & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Frequency
                      </label>
                      <select
                        value={emailConfig.frequency}
                        onChange={e => setEmailConfig({ ...emailConfig, frequency: e.target.value as any })}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none"
                      >
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Dispatch Day
                      </label>
                      <select
                        value={emailConfig.dayOfWeek}
                        onChange={e => setEmailConfig({ ...emailConfig, dayOfWeek: e.target.value as any })}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none"
                      >
                        <option value="Monday">Monday (9:00 AM)</option>
                        <option value="Friday">Friday (5:00 PM)</option>
                        <option value="Sunday">Sunday (Evening)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Time of Day
                      </label>
                      <input
                        type="time"
                        value={emailConfig.timeOfDay}
                        onChange={e => setEmailConfig({ ...emailConfig, timeOfDay: e.target.value })}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Recipients List */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Recipient Email Addresses
                    </label>
                    <div className="space-y-2">
                      {emailConfig.recipients.map(r => (
                        <div key={r} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                          <span className="font-semibold text-slate-800">{r}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRecipient(r)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove recipient"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex gap-2 pt-1">
                        <input
                          type="email"
                          placeholder="Add new coordinator or doctor email..."
                          value={newRecipient}
                          onChange={e => setNewRecipient(e.target.value)}
                          className="flex-1 p-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddRecipient}
                          className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Metrics included in report */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase">
                      Included Report Sections
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <label className="flex items-center gap-2 text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <input
                          type="checkbox"
                          checked={emailConfig.includeTraffic}
                          onChange={e => setEmailConfig({ ...emailConfig, includeTraffic: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Traffic & Visitors</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <input
                          type="checkbox"
                          checked={emailConfig.includeBookings}
                          onChange={e => setEmailConfig({ ...emailConfig, includeBookings: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Appointments Count</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <input
                          type="checkbox"
                          checked={emailConfig.includeTopTreatments}
                          onChange={e => setEmailConfig({ ...emailConfig, includeTopTreatments: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Top Treatments</span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                    >
                      Save Configuration
                    </button>
                    <button
                      type="button"
                      onClick={handleSendTestReport}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Test Report Now</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailPreviewOpen(!emailPreviewOpen)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                    >
                      {emailPreviewOpen ? 'Hide Email Preview' : 'Preview Weekly Summary'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Email Digest Preview Card */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Email Digest Template Preview</span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                    HTML Preview
                  </span>
                </div>

                {/* Rendered Email Template */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-4 font-sans">
                  <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 rounded-xl space-y-1">
                    <div className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">
                      Sakthi Dental Clinic • Hosur
                    </div>
                    <div className="font-extrabold text-sm text-white">
                      Weekly Executive Performance Summary
                    </div>
                    <div className="text-[10px] text-blue-200">
                      Period: Oct 04 – Oct 11, 2026
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    Hello <strong>Dr. Anupriya & Clinic Team</strong>, here is your automated weekly analytics digest for Sakthi Dental Clinic.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <div className="text-base font-extrabold text-slate-900">3,790</div>
                      <div className="text-[10px] text-slate-500">Weekly Visitors</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <div className="text-base font-extrabold text-emerald-600">86</div>
                      <div className="text-[10px] text-slate-500">Appointments Booked</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-800 text-[11px]">Top 3 Treatments Requested:</div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      <li>1. Teeth Cleaning or Scaling (28%)</li>
                      <li>2. Orthodontic Braces & Aligners (21%)</li>
                      <li>3. Dental Implants (17%)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                    <strong>Action Required:</strong> 2 new patient inquiries pending doctor reply in the clinic portal.
                  </div>

                  <div className="text-center pt-1 text-[10px] text-slate-400">
                    Sakthi Dental Clinic • B2/8, SBM Layout, Anthivadi, Hosur
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Push Notification System */}
        {activeTab === 'push-notifications' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {pushSentMessage && (
              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-800 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0" />
                <span>{pushSentMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Alert Rules & Triggers */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Push Notification System</h3>
                  <p className="text-xs text-slate-500">
                    Configure real-time mobile and desktop alert rules for critical clinic events.
                  </p>
                </div>

                <div className="space-y-3">
                  {pushRules.map(rule => (
                    <div
                      key={rule.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{rule.title}</div>
                        <div className="text-slate-500 text-xs">{rule.description}</div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={rule.enabled}
                          onChange={e => {
                            const updated = updatePushRule(rule.id, e.target.checked);
                            setPushRules(updated);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Test Push Trigger Simulator */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                    <Bell className="w-4 h-4" />
                    <span>Broadcast Real-Time Metric Alert</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={testPushTitle}
                      onChange={e => setTestPushTitle(e.target.value)}
                      placeholder="Alert Title"
                      className="w-full p-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={testPushBody}
                      onChange={e => setTestPushBody(e.target.value)}
                      placeholder="Alert Body Description"
                      className="w-full p-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    onClick={handleTriggerTestPush}
                    className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Real-Time Alert Notification</span>
                  </button>
                </div>
              </div>

              {/* Notification Audit Log */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Notification History</h3>
                  <p className="text-xs text-slate-500">Live feed of dispatches and user alert toasts</p>
                </div>

                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {notificationLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{log.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{log.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
