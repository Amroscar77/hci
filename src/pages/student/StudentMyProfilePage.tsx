import React from 'react';
import { User, Award, Calendar, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentMyProfilePage: React.FC = () => {
  const { exam, conceptProgress, t, navigate } = useLearnLens();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            OH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Omar Hassan</h1>
              <span className="text-xs bg-blue-50 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                Grade 4 • Mathematics
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Teacher: Ms. Sarah • Oak Ridge Elementary
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average</span>
            <span className="text-2xl font-black text-[#0F5B46]">72%</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exams</span>
            <span className="text-2xl font-black text-slate-900">5</span>
          </div>
        </div>
      </div>

      {/* Concept Mastery Radar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          My Concept Progress
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
                    cp.mastery >= 75 ? 'bg-emerald-500' : cp.mastery >= 60 ? 'bg-blue-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${cp.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
