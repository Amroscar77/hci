import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  Check, 
  ExternalLink,
  Sparkles,
  Compass
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenEvaluatorTour: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  onOpenMobileMenu,
  onOpenEvaluatorTour 
}) => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    t, 
    notifications, 
    markNotificationRead, 
    navigate,
    exam 
  } = useLearnLens();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const relevantNotifs = notifications.filter(n => n.recipient === role);
  const unreadCount = relevantNotifs.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleSwitchRole = () => {
    if (role === 'teacher') {
      setRole('student');
      navigate('/student/dashboard');
    } else {
      setRole('teacher');
      navigate('/teacher/dashboard');
    }
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200/90 h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Trigger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            className="w-full h-8.5 pl-8.5 pr-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-300 focus:border-slate-400 transition-colors"
          />

          {/* Quick Search Dropdown Preview */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 top-11 w-full bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between text-slate-400">
                <span className="font-semibold uppercase text-[10px] tracking-wider">Search Results</span>
                <button
                  type="button"
                  onClick={() => setShowSearchResults(false)}
                  className="hover:text-slate-700 text-[11px]"
                >
                  Close
                </button>
              </div>
              <div className="py-1 space-y-0.5">
                <div 
                  onClick={() => {
                    setShowSearchResults(false);
                    navigate(role === 'teacher' ? `/teacher/exams/${exam.id}/ocr` : `/student/exams/${exam.id}`);
                  }}
                  className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <strong className="text-slate-900">Omar Hassan</strong> • Grade 4 Mathematics
                    <div className="text-[11px] text-slate-500">Fractions & Word Problems (72%)</div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                    Open
                  </span>
                </div>
                <div 
                  onClick={() => {
                    setShowSearchResults(false);
                    navigate(role === 'teacher' ? '/teacher/learning-gaps' : '/student/learning-journey');
                  }}
                  className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <strong className="text-slate-900">Fraction Comparison</strong> • Conceptual Gap
                    <div className="text-[11px] text-slate-500">Recurring across 3 assessments</div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-medium px-2 py-0.5 rounded">
                    Insights
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right Controls: Demo Data Pill, Language, Notifications, Evaluator Tour, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Subtle Demo Data Pill */}
        <span className="hidden md:inline-flex items-center text-[10px] font-medium text-slate-400 bg-slate-100/90 border border-slate-200 px-2 py-0.5 rounded-full select-none">
          Demo data
        </span>

        {/* EN / DE Language Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-[11px] font-semibold">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              language === 'en'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('de')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              language === 'de'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            DE
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
            )}
          </button>

          {showNotifMenu && (
            <div 
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              role="dialog"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 text-xs">
                <span className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">
                  {t.navNotifications} ({unreadCount} new)
                </span>
                <button
                  onClick={() => setShowNotifMenu(false)}
                  className="text-slate-400 hover:text-slate-700 text-[11px]"
                >
                  Close
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {relevantNotifs.length > 0 ? (
                  relevantNotifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        setShowNotifMenu(false);
                        navigate(n.targetRoute);
                      }}
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer rounded-lg transition-colors ${
                        !n.read ? 'bg-blue-50/40 font-medium' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-0.5">
                        <span className="font-semibold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">{n.date}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card & Dropdown */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors text-left"
            aria-label="User account menu"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-2xs ${
              role === 'teacher' ? 'bg-[#0F5B46]' : 'bg-blue-600'
            }`}>
              {role === 'teacher' ? 'MS' : 'OH'}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                {role === 'teacher' ? 'Ms. Sarah' : 'Omar Hassan'}
              </span>
              <span className="block text-[10px] text-slate-500">
                {role === 'teacher' ? 'Educator' : 'Grade 4 Student'}
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="p-3 border-b border-slate-100 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                  role === 'teacher' ? 'bg-[#0F5B46]' : 'bg-blue-600'
                }`}>
                  {role === 'teacher' ? 'MS' : 'OH'}
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    {role === 'teacher' ? 'Ms. Sarah' : 'Omar Hassan'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {role === 'teacher' ? 'Grade 4 Mathematics Teacher' : 'Grade 4 Student'}
                  </div>
                </div>
              </div>

              <div className="py-1 space-y-1">
                <button
                  onClick={handleSwitchRole}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-medium text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {role === 'teacher' ? <GraduationCap className="w-4 h-4 text-blue-600" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    <span>Switch to {role === 'teacher' ? 'Student Portal' : 'Educator Workspace'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">⇄</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenEvaluatorTour();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-medium text-slate-700 flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Platform Workflow Tour</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate(role === 'teacher' ? '/teacher/settings' : '/student/profile');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-medium text-slate-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{role === 'teacher' ? 'Platform Settings' : 'My Student Profile'}</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/welcome');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2"
                >
                  <span>Portal Selection Screen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
