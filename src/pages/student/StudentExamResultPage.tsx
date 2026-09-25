import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ThumbsUp, 
  Target, 
  ArrowRight, 
  ShieldCheck,
  Compass,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { ExamQuestion } from '../../types/learnlens';

export const StudentExamResultPage: React.FC = () => {
  const { exam, t, feedbackMessage, navigate, setScenarioStep } = useLearnLens();
  const [selectedQuestion, setSelectedQuestion] = useState<ExamQuestion | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Result Hero Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.confirmedByTeacher}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Grade 4 Mathematics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {exam.title} • Graded by Ms. Sarah
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-right shrink-0">
            <div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Final Grade
              </span>
              <span className="text-3xl font-bold font-mono text-[#0F5B46]">
                {exam.finalGradePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Strengths and Focus Areas Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* What you did well */}
          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-800">
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.whatYouDidWell}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700">Mastery</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Multiplication (24 × 6 & 35 × 4)</span>
                </span>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded text-[11px]">86%</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fraction Addition (3/5)</span>
                </span>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded text-[11px]">82%</span>
              </li>
            </ul>
          </div>

          {/* Let's practice together */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-900">
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-700" />
                <span>Next Step</span>
              </div>
              <span className="text-[10px] font-mono text-amber-800">Goal</span>
            </div>
            <div className="space-y-1 text-xs text-amber-950">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">Comparing Fractions</span>
                <span className="font-mono text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded text-[11px]">Focus Area</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                "Let's practice this skill together with quick visual fraction bars!"
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Teacher Note */}
        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/90 space-y-0.5 text-xs">
          <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block">
            Note from Ms. Sarah:
          </span>
          <p className="text-xs text-blue-950 italic leading-relaxed">
            "{feedbackMessage}"
          </p>
        </div>

        {/* Call to Action to Learning Journey */}
        <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              setScenarioStep(19);
              navigate('/student/learning-journey');
            }}
            className="flex-1 h-9 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-300" />
            <span>Open Learning Journey</span>
          </button>

          <button
            onClick={() => {
              setScenarioStep(21);
              navigate('/student/practice');
            }}
            className="flex-1 h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
          >
            <span>{t.startPractice}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Question-by-Question List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h2 className="font-semibold text-xs uppercase tracking-wider text-slate-800">
            Question-by-Question Breakdown
          </h2>
          <span className="text-xs text-slate-500 font-mono">5 Questions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {exam.questions.map((q) => {
            const isSelected = selectedQuestion?.id === q.id;
            const isCorrect = q.confirmedScore === q.maxScore;
            const isPartial = q.confirmedScore > 0 && q.confirmedScore < q.maxScore;
            const isZero = q.confirmedScore === 0;

            return (
              <div key={q.id} className="transition-colors">
                <div
                  onClick={() => setSelectedQuestion(isSelected ? null : q)}
                  className="p-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                      Q{q.number}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900 text-sm">{q.conceptName}</span>
                      <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">{q.prompt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' :
                      isPartial ? 'bg-amber-100 text-amber-900' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {q.confirmedScore} / {q.maxScore} pts
                    </span>
                    {isSelected ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isSelected && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold block mb-1">Your Written Answer:</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">{q.editedAnswer}</span>
                      </div>
                      <div className="p-3 bg-white rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold block mb-1">Correct Answer:</span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">{q.expectedAnswer}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 block mb-0.5">Teacher feedback note:</span>
                      {q.aiSuggestedReason}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
