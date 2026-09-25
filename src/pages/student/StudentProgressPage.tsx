import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  Compass,
  Brain
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentProgressPage: React.FC = () => {
  const { conceptProgress, practiceCompleted, navigate } = useLearnLens();

  const examsHistory = [
    { name: 'Exam 1: Diagnostic Assessment', date: 'Sept 15', score: 64, color: 'bg-slate-400' },
    { name: 'Exam 2: Unit Fractions Quiz', date: 'Oct 02', score: 68, color: 'bg-blue-500' },
    { name: 'Exam 3: Fractions & Word Problems', date: 'Oct 24', score: 72, color: 'bg-[#0F5B46]' },
    { name: 'Exam 4: Geometry & Review (Example Target)', date: 'Nov 12', score: 78, color: 'bg-indigo-500', projected: true },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Academic Growth Trajectory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Omar's Mathematics Growth
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tracking scores across Grade 4 Mathematics and concept mastery over time • Example progress
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shrink-0">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Growth</span>
            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xl font-mono">
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              <span>+8.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Progress Chart: Exam 1: 64%, Exam 2: 68%, Exam 3: 72%, Exam 4: 78% */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Exam Score Progression</h2>
            <span className="text-[11px] text-slate-400 font-mono">Demonstration Assessment Trend</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Baseline: 60%</span>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-3 pt-1">
          {examsHistory.map((ex) => (
            <div key={ex.name} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <span>{ex.name}</span>
                  {ex.projected && (
                    <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded">
                      Example Target
                    </span>
                  )}
                </span>
                <span className="text-slate-500 font-mono text-[11px] sm:text-right">
                  {ex.date} • <strong className="text-slate-900 font-bold text-xs">{ex.score}%</strong>
                </span>
              </div>

              <div className="w-full bg-slate-100 h-5 rounded-md overflow-hidden flex items-center p-0.5">
                <div
                  className={`h-full rounded ${ex.color} transition-all duration-500 flex items-center justify-end pr-2 text-white font-mono text-[10px] font-bold`}
                  style={{ width: `${ex.score}%` }}
                >
                  {ex.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concept Trends Radar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Concept Mastery Trends</h2>
            <p className="text-xs text-slate-500">Updated automatically following teacher verification and practice completion</p>
          </div>
          {practiceCompleted && (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Practice Bonus Applied
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {conceptProgress.map((cp) => (
            <div key={cp.concept} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900">{cp.concept}</span>
                <span className="font-mono text-slate-700">{cp.mastery}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    cp.mastery >= 75 ? 'bg-[#0F5B46]' : cp.mastery >= 60 ? 'bg-blue-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${cp.mastery}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Status: <strong className="capitalize text-slate-700">{cp.status.replace('_', ' ')}</strong></span>
                <span className="text-emerald-700 font-semibold">Trend: Upward</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-1 flex justify-end">
          <button
            onClick={() => navigate('/student/learning-journey')}
            className="text-xs font-semibold text-[#0F5B46] hover:underline flex items-center gap-1"
          >
            <span>View Learning Journey Roadmap</span>
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
