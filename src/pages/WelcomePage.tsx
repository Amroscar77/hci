import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Brain, 
  HeartHandshake, 
  Lightbulb,
  Compass
} from 'lucide-react';
import { useLearnLens } from '../context/LearnLensContext';

export const WelcomePage: React.FC = () => {
  const { setRole, navigate, t, setScenarioStep } = useLearnLens();

  const handleStartTeacher = () => {
    setRole('teacher');
    navigate('/teacher/dashboard');
  };

  const handleStartStudent = () => {
    setRole('student');
    navigate('/student/dashboard');
  };

  const handleStartGuidedScenario = () => {
    setRole('student');
    setScenarioStep(1);
    navigate('/student/upload');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-in fade-in duration-150">
      {/* Hero Header */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Educational Assessment Platform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          LEARNLENS
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
          "{t.tagline}"
        </p>

        {/* 5 Core Tenets */}
        <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xs border border-slate-800 max-w-2xl mx-auto">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Pedagogical Human-in-the-Loop Architecture
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-slate-200">
            <span className="text-blue-300">AI analyzes</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-300">Teacher verifies</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-bold">Teacher decides</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-300">Student understands</span>
            <span className="text-slate-600">→</span>
            <span className="text-indigo-300">Progress tracked</span>
          </div>
        </div>
      </div>

      {/* Main Role Selection Doors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {/* Teacher Portal Door */}
        <div 
          onClick={handleStartTeacher}
          className="bg-white rounded-xl border border-slate-200 hover:border-[#0F5B46] p-6 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#0F5B46]/10 text-[#0F5B46] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Teacher Portal</h2>
                <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  Ms. Sarah
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Full verification authority over OCR extraction, AI grading suggestions, multi-exam learning gap detection, and empathetic feedback generation.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5B46] shrink-0" />
                <span>Review student exam & correct OCR mistakes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5B46] shrink-0" />
                <span>Confirm or override AI grading points (72% final)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5B46] shrink-0" />
                <span>Validate recurring fraction comparison learning gaps</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStartTeacher();
            }}
            className="mt-5 w-full h-9 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <span>Enter as Teacher</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Student Portal Door */}
        <div 
          onClick={handleStartStudent}
          className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 p-6 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Student Portal</h2>
                <span className="text-xs font-mono bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                  Omar Hassan (Gr. 4)
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Child-friendly results without confusing AI jargon. Clear feedback on strengths, longitudinal learning journey, and personalized practice.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Upload exam sheet & track grading status</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>View confirmed 72% test score & teacher comments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Interactive Learning Journey & 5-question practice</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStartStudent();
            }}
            className="mt-5 w-full h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <span>Enter as Student</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Assessment Demonstration */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto border border-slate-800">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Assessment Walkthrough</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold">
            Explore the Complete End-to-End Workflow
          </h3>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Follow Omar Hassan's Grade 4 Mathematics assessment: from paper upload and OCR verification to AI grade audit, final 72% grade confirmation, multi-assessment gap detection, and personalized practice.
          </p>
        </div>

        <button
          onClick={handleStartGuidedScenario}
          className="h-9 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
        >
          <span>Begin Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
