import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  GitBranch, 
  AlertTriangle, 
  MessageSquareQuote,
  UploadCloud,
  FileText,
  Compass,
  CheckCircle2,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const AppNavigation: React.FC = () => {
  const { role, currentRoute, navigate, t, exam, learningGaps, redFlags } = useLearnLens();

  const pendingGapsCount = learningGaps.filter(g => g.status === 'pending').length;
  const pendingFlagsCount = redFlags.filter(f => f.status === 'pending').length;

  if (currentRoute === '/welcome') return null;

  if (role === 'teacher') {
    const teacherLinks = [
      { id: 'dash', label: t.navDashboard, route: '/teacher/dashboard', icon: LayoutDashboard },
      { id: 'exams', label: t.navExams, route: '/teacher/exams', icon: FileCheck, badge: exam.status === 'ocr_pending' ? 'Needs Review' : undefined },
      { id: 'students', label: t.navStudents, route: '/teacher/students', icon: Users },
      { id: 'gaps', label: t.navLearningGaps, route: '/teacher/learning-gaps', icon: GitBranch, count: pendingGapsCount },
      { id: 'flags', label: t.navRedFlags, route: '/teacher/red-flags', icon: AlertTriangle, count: pendingFlagsCount, alert: true },
      { id: 'feedback', label: t.navFeedback, route: '/teacher/feedback', icon: MessageSquareQuote },
    ];

    return (
      <nav aria-label="Teacher Navigation" className="bg-slate-900 text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto py-1">
          <div className="flex items-center gap-1 sm:gap-2">
            {teacherLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentRoute === link.route || currentRoute.startsWith(link.route + '/');
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.route)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0F5B46] text-white shadow-xs'
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      link.alert ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Student Navigation
  const studentLinks = [
    { id: 's-dash', label: t.navMyDashboard, route: '/student/dashboard', icon: LayoutDashboard },
    { id: 's-upload', label: t.navUpload, route: '/student/upload', icon: UploadCloud },
    { id: 's-exams', label: t.navMyExams, route: `/student/exams/${exam.id}`, icon: FileText },
    { id: 's-journey', label: t.navLearningJourney, route: '/student/learning-journey', icon: Compass },
    { id: 's-practice', label: t.navPractice, route: '/student/practice', icon: Brain },
    { id: 's-progress', label: t.navProgress, route: '/student/progress', icon: TrendingUp },
  ];

  return (
    <nav aria-label="Student Navigation" className="bg-slate-900 text-slate-300 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto py-1">
        <div className="flex items-center gap-1 sm:gap-2">
          {studentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.route || currentRoute.startsWith(link.route + '/');
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.route)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
