import React from 'react';
import { 
  User, 
  GitBranch, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentProfilePage: React.FC = () => {
  const { exam, learningGaps, conceptProgress, navigate } = useLearnLens();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            OH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{exam.studentName}</h1>
              <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full">
                Grade 4 • ID: #8492
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Homeroom: Ms. Sarah • Focus Subject: Mathematics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average</span>
            <span className="text-2xl font-black text-[#0F5B46]">72%</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exams</span>
            <span className="text-2xl font-black text-slate-900">3</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Gaps</span>
            <span className="text-2xl font-black text-amber-600">1</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concept Mastery Radar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Mathematical Competencies</span>
          </h2>
          <div className="space-y-3">
            {conceptProgress.map((cp) => (
              <div key={cp.concept} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{cp.concept}</span>
                  <span className="font-mono text-slate-600">{cp.mastery}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cp.mastery >= 75 ? 'bg-emerald-500' : cp.mastery >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${cp.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Learning Gap Journey */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-600" />
              <span>Diagnosed Learning Gap</span>
            </h2>
            <button
              onClick={() => navigate('/teacher/learning-gaps')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Inspect Timeline →
            </button>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-950 text-sm">Fraction comparison</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-900 font-bold">
                Severity: Repeated
              </span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              Consistently confuses fraction magnitude when comparing portions with identical or differing denominators.
            </p>
            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-800">
              <span>Evidence: 3 assessments</span>
              <span className="font-semibold text-emerald-800">Practice Assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
