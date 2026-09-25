import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  MessageSquareQuote, 
  Brain, 
  TrendingUp, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, navigate, setScenarioStep } = useLearnLens();
  const studentNotifs = notifications.filter(n => n.recipient === 'student');

  const handleOpenNotification = (notif: typeof studentNotifs[0]) => {
    markNotificationRead(notif.id);
    if (notif.targetRoute.includes('/student/exams/')) {
      setScenarioStep(18); // Step 18: Student opens result
    } else if (notif.targetRoute === '/student/practice') {
      setScenarioStep(21);
    }
    navigate(notif.targetRoute);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Notifications & Updates</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Alerts from Ms. Sarah regarding your exam results and practice exercises
          </p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
          {studentNotifs.filter(n => !n.read).length} Unread
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {studentNotifs.length > 0 ? (
          studentNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => handleOpenNotification(n)}
              className={`p-5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                !n.read ? 'bg-blue-50/40 font-medium' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  {n.type === 'feedback' && <MessageSquareQuote className="w-5 h-5" />}
                  {n.type === 'practice' && <Brain className="w-5 h-5" />}
                  {n.type === 'progress' && <TrendingUp className="w-5 h-5 text-emerald-600" />}
                  {n.type === 'review' && <CheckCircle2 className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg">{n.message}</p>
                  <span className="text-[10px] text-slate-400 block font-mono">{n.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-blue-600 font-bold shrink-0 mt-1">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No notifications right now.
          </div>
        )}
      </div>
    </div>
  );
};
