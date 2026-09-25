import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  TrendingUp, 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Compass,
  FileText
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentDashboard: React.FC = () => {
  const { exam, t, navigate, setScenarioStep } = useLearnLens();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Greeting Banner */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Grade 4 Student Portal • Demo data</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t.studentGreeting}</h1>
          <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
            Welcome to your math workspace. Review your latest certified results and continue strengthening your skills.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setScenarioStep(18);
              navigate(`/student/exams/${exam.id}`);
            }}
            className="h-8.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <span>View Recent Exam ({exam.finalGradePercent}%)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={() => {
              setScenarioStep(21);
              navigate('/student/practice');
            }}
            className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Current average */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            {t.studentAvgGrade}
          </span>
          <div className="text-2xl font-bold font-mono text-[#0F5B46]">72%</div>
          <p className="text-[11px] text-slate-400">Mathematics Grade 4</p>
        </div>

        {/* Exams completed */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            {t.studentExamsCompleted}
          </span>
          <div className="text-2xl font-bold font-mono text-slate-900">5</div>
          <p className="text-[11px] text-slate-400">Recorded assessments</p>
        </div>

        {/* Areas improving */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            {t.studentAreasImproving}
          </span>
          <div className="text-2xl font-bold font-mono text-blue-700">3</div>
          <p className="text-[11px] text-slate-400">Multiplication & addition</p>
        </div>

        {/* Practice goals */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            {t.studentPracticeGoals}
          </span>
          <div className="text-2xl font-bold font-mono text-amber-900">1</div>
          <p className="text-[11px] text-slate-400">Comparing fractions</p>
        </div>
      </div>

      {/* Main Component: My Learning Journey & Concept Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Concept Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Concept Mastery</h2>
            <p className="text-xs text-slate-500">Your competencies in Grade 4 Mathematics</p>
          </div>

          <div className="space-y-3 pt-1">
            {/* Fractions: 72% */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Fractions</span>
                <span className="font-mono text-blue-700">72%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            {/* Multiplication: 86% */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Multiplication</span>
                <span className="font-mono text-emerald-700">86%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '86%' }} />
              </div>
            </div>

            {/* Word Problems: 61% */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Word Problems</span>
                <span className="font-mono text-amber-900">61%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '61%' }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/student/progress')}
            className="w-full h-8.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition-colors border border-slate-200"
          >
            View Longitudinal Chart →
          </button>
        </div>

        {/* My Learning Journey Banner (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 sm:p-6 shadow-2xs border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Personal Learning Roadmap</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              "Great work with multiplication! Let's conquer comparing fractions."
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Ms. Sarah reviewed your latest paper and noticed comparing fractions with different denominators is tricky. Follow your personalized roadmap to master it with visual fraction bars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Recent Exam</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">72% Confirmed</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Focus Area</span>
              <span className="font-bold text-amber-900 text-xs sm:text-sm">Comparing Fractions</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Action</span>
              <span className="font-bold text-emerald-800 text-xs sm:text-sm">5 Practice Questions</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => {
                setScenarioStep(19);
                navigate('/student/learning-journey');
              }}
              className="h-8.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <span>Explore Learning Journey</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => {
                setScenarioStep(21);
                navigate('/student/practice');
              }}
              className="h-8.5 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>{t.startPractice}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
