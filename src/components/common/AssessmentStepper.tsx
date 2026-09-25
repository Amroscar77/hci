import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

interface StepperProps {
  currentStage: 'ocr' | 'verify' | 'grade' | 'insights' | 'flags' | 'feedback' | 'published';
}

export const AssessmentStepper: React.FC<StepperProps> = ({ currentStage }) => {
  const { t, navigate, exam } = useLearnLens();

  const stages = [
    { key: 'ocr', altKey: 'verify', label: t.stepOcr, route: `/teacher/exams/${exam.id}/ocr` },
    { key: 'grade', label: t.stepGrade, route: `/teacher/exams/${exam.id}/grading` },
    { key: 'insights', label: t.stepInsights, route: '/teacher/learning-gaps' },
    { key: 'flags', label: t.stepFocus, route: '/teacher/red-flags' },
    { key: 'feedback', label: t.stepFeedback, route: '/teacher/feedback' },
    { key: 'published', label: t.stepPublished, route: `/student/exams/${exam.id}` },
  ];

  const getStageIndex = (stage: string) => {
    if (stage === 'verify') return 0;
    return stages.findIndex(s => s.key === stage || s.altKey === stage);
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
      <div className="flex items-center justify-between overflow-x-auto gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden sm:inline mr-2">
          {t.workflowLabel}
        </span>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <React.Fragment key={stage.key}>
                <button
                  onClick={() => navigate(stage.route)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                      : isCompleted
                      ? 'text-emerald-700 hover:bg-emerald-50/50'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                  </span>
                  <span>{stage.label}</span>
                </button>

                {idx < stages.length - 1 && (
                  <span className="text-slate-300 select-none text-[10px]" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
