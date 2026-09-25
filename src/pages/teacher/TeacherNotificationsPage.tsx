import React from 'react';
import { Bell, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const TeacherNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, navigate, t } = useLearnLens();
  const teacherNotifs = notifications.filter(n => n.recipient === 'teacher');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-150">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.navNotifications}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time updates regarding student exam submissions, OCR status, and verification alerts
          </p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-full border border-blue-200">
          {teacherNotifs.filter(n => !n.read).length} Unread
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {teacherNotifs.length > 0 ? (
          teacherNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                navigate(n.targetRoute);
              }}
              className={`p-5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                !n.read ? 'bg-blue-50/40 font-medium' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{n.title}</h3>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-blue-600 font-bold shrink-0 mt-1">
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No notifications at this time.
          </div>
        )}
      </div>
    </div>
  );
};
