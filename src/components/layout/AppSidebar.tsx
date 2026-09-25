import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  GitBranch, 
  AlertTriangle, 
  MessageSquareQuote,
  Bell,
  Settings,
  FileText,
  Compass,
  Brain,
  TrendingUp,
  User,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

interface AppSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenEvaluatorTour: () => void;
}

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  count?: number;
  alert?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
  onOpenEvaluatorTour,
}) => {
  const { 
    role, 
    setRole, 
    currentRoute, 
    navigate, 
    t, 
    exam, 
    learningGaps, 
    redFlags,
    notifications 
  } = useLearnLens();

  const pendingGapsCount = learningGaps.filter(g => g.status === 'pending').length;
  const pendingFlagsCount = redFlags.filter(f => f.status === 'pending').length;
  const unreadNotifsCount = notifications.filter(n => n.recipient === role && !n.read).length;

  const teacherLinks: NavItem[] = [
    { id: 't-dash', label: t.navDashboard, route: '/teacher/dashboard', icon: LayoutDashboard },
    { id: 't-exams', label: t.navExams, route: '/teacher/exams', icon: FileCheck, badge: exam.status === 'ocr_pending' ? '1' : undefined },
    { id: 't-students', label: t.navStudents, route: '/teacher/students', icon: Users },
    { id: 't-gaps', label: t.navLearningGaps, route: '/teacher/learning-gaps', icon: GitBranch, count: pendingGapsCount },
    { id: 't-flags', label: t.navRedFlags, route: '/teacher/red-flags', icon: AlertTriangle, count: pendingFlagsCount, alert: true },
    { id: 't-feedback', label: t.navFeedback, route: '/teacher/feedback', icon: MessageSquareQuote },
    { id: 't-notifs', label: t.navNotifications, route: '/teacher/notifications', icon: Bell, count: unreadNotifsCount },
    { id: 't-settings', label: t.navSettings, route: '/teacher/settings', icon: Settings },
  ];

  const studentLinks: NavItem[] = [
    { id: 's-dash', label: t.navMyDashboard, route: '/student/dashboard', icon: LayoutDashboard },
    { id: 's-exams', label: t.navMyExams, route: `/student/exams/${exam.id}`, icon: FileText },
    { id: 's-journey', label: t.navLearningJourney, route: '/student/learning-journey', icon: Compass },
    { id: 's-practice', label: t.navPractice, route: '/student/practice', icon: Brain },
    { id: 's-progress', label: t.navProgress, route: '/student/progress', icon: TrendingUp },
    { id: 's-notifs', label: t.navStudentNotifications, route: '/student/notifications', icon: Bell, count: unreadNotifsCount },
    { id: 's-profile', label: t.navProfile, route: '/student/profile', icon: User },
  ];

  const links = role === 'teacher' ? teacherLinks : studentLinks;

  const handleNav = (route: string) => {
    navigate(route);
    onCloseMobile();
  };

  const handleSwitchRole = () => {
    if (role === 'teacher') {
      setRole('student');
      navigate('/student/dashboard');
    } else {
      setRole('teacher');
      navigate('/teacher/dashboard');
    }
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-xl lg:shadow-none transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="flex items-center justify-between px-4 h-14 border-b border-slate-800">
            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleNav(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-xs ${
                role === 'teacher' ? 'bg-[#0F5B46]' : 'bg-blue-600'
              }`}>
                <span>L</span>
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-tight">LEARNLENS</span>
                <span className="block text-[10px] text-slate-400 -mt-0.5 font-normal">
                  Grades 1–5 Assessment
                </span>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Status Tag */}
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase text-[9px] font-bold tracking-wider text-slate-400">
                {role === 'teacher' ? 'Educator Workspace' : 'Student Portal'}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                role === 'teacher' 
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
              }`}>
                {role === 'teacher' ? 'Ms. Sarah' : 'Omar Hassan'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-2.5 space-y-0.5">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
              const activeBg = role === 'teacher' ? 'bg-[#0F5B46] text-white font-semibold' : 'bg-blue-600 text-white font-semibold';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all relative ${
                    isActive
                      ? activeBg
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>

                  {/* Badges / Counters */}
                  {item.badge && (
                    <span className="ml-auto text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`ml-auto text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      item.alert ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Role Quick-Switcher & Tour Guide Trigger */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          {/* Role Switcher Button */}
          <button
            onClick={handleSwitchRole}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors border border-slate-700/60"
          >
            <div className="flex items-center gap-2">
              {role === 'teacher' ? (
                <GraduationCap className="w-4 h-4 text-blue-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              )}
              <span>{t.switchRole} {role === 'teacher' ? t.roleStudent : t.roleTeacher}</span>
            </div>
            <span className="text-[10px] text-slate-400">⇄</span>
          </button>

          {/* Workflow Tour Guide Trigger */}
          <button
            onClick={onOpenEvaluatorTour}
            className="w-full py-1.5 px-3 rounded-lg text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Guided Workflow Tour</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded text-slate-300 font-mono">
              Guide
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
