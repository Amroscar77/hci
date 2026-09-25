import React from 'react';
import { X, Check, ArrowRight, RotateCcw, ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

interface EvaluatorTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkflowStep {
  step: number;
  role: 'student' | 'teacher';
  phase: string;
  title: string;
  route: string;
  desc: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  // Phase 1: Ingestion
  { step: 1, role: 'student', phase: 'Submission', title: 'Student submits handwritten exam', route: '/student/upload', desc: 'Omar uploads handwritten Grade 4 math sheet' },
  { step: 2, role: 'teacher', phase: 'Submission', title: 'Submission queues in teacher workspace', route: '/teacher/dashboard', desc: 'Pending exam awaits teacher verification in review queue' },
  
  // Phase 2: Teacher OCR Verification
  { step: 3, role: 'teacher', phase: 'OCR Verification', title: 'Teacher opens assessment review', route: '/teacher/exams/exam-omar-fractions-01/ocr', desc: 'Ms. Sarah opens Omar\'s submission in split document viewer' },
  { step: 4, role: 'teacher', phase: 'OCR Verification', title: 'Teacher inspects OCR transcription', route: '/teacher/exams/exam-omar-fractions-01/ocr', desc: 'Compares raw handwriting against AI optical character recognition' },
  { step: 5, role: 'teacher', phase: 'OCR Verification', title: 'Teacher corrects OCR transcription error', route: '/teacher/exams/exam-omar-fractions-01/ocr', desc: 'Corrects Question 4 from 5/8 to student\'s actual handwritten 3/8' },
  { step: 6, role: 'teacher', phase: 'OCR Verification', title: 'Teacher approves verified answers', route: '/teacher/exams/exam-omar-fractions-01/ocr', desc: 'Verified data is formally certified for pedagogical evaluation' },

  // Phase 3: AI-Assisted Scoring & Authority
  { step: 7, role: 'teacher', phase: 'Grading Authority', title: 'AI evaluation suggestions appear', route: '/teacher/exams/exam-omar-fractions-01/grading', desc: 'Assistive evaluation suggests points & diagnostic reasons' },
  { step: 8, role: 'teacher', phase: 'Grading Authority', title: 'Teacher reviews itemized scoring', route: '/teacher/exams/exam-omar-fractions-01/grading', desc: 'Inspects Q4 incorrect answer (0/5 pts) and reasoning' },
  { step: 9, role: 'teacher', phase: 'Grading Authority', title: 'Teacher confirms final grade (72%)', route: '/teacher/exams/exam-omar-fractions-01/grading', desc: 'Teacher exercises grading authority to confirm final score' },

  // Phase 4: Learning Gaps & Review Focus
  { step: 10, role: 'teacher', phase: 'Gap Detection', title: 'System correlates recurring error pattern', route: '/teacher/learning-gaps', desc: 'Pattern engine links mistake to earlier fraction assessments' },
  { step: 11, role: 'teacher', phase: 'Gap Detection', title: 'Teacher reviews multi-exam evidence', route: '/teacher/learning-gaps', desc: 'Reviews evidence timeline across Exam 1, Exam 2, and Exam 3' },
  { step: 12, role: 'teacher', phase: 'Gap Detection', title: 'Teacher confirms diagnosed learning gap', route: '/teacher/learning-gaps', desc: 'Teacher validates conceptual gap into student record' },
  { step: 13, role: 'teacher', phase: 'Review Focus', title: 'Teacher opens Focus Review list', route: '/teacher/red-flags', desc: 'Non-stigmatizing dashboard for students needing timely support' },
  { step: 14, role: 'teacher', phase: 'Review Focus', title: 'Teacher confirms support plan', route: '/teacher/red-flags', desc: 'Validates personalized instructional intervention' },

  // Phase 5: Feedback & Publishing
  { step: 15, role: 'teacher', phase: 'Feedback', title: 'Teacher personalizes student feedback', route: '/teacher/feedback', desc: 'Frames praise for multiplication alongside fraction guidance' },
  { step: 16, role: 'teacher', phase: 'Feedback', title: 'Teacher publishes verified result', route: '/teacher/feedback', desc: 'Transfers certified grades & feedback to student portal' },

  // Phase 6: Student Experience & Growth
  { step: 17, role: 'student', phase: 'Student Portal', title: 'Student receives notification', route: '/student/notifications', desc: 'Omar receives notification that Ms. Sarah reviewed his work' },
  { step: 18, role: 'student', phase: 'Student Portal', title: 'Student views confirmed 72% grade', route: '/student/exams/exam-omar-fractions-01', desc: 'Inspects transparent results, praise, and strengths' },
  { step: 19, role: 'student', phase: 'Learning Journey', title: 'Student explores Learning Journey', route: '/student/learning-journey', desc: 'Child-friendly 5-stage progression timeline' },
  { step: 20, role: 'student', phase: 'Learning Journey', title: 'Student understands conceptual gap', route: '/student/learning-journey', desc: 'Encouraging framing explains how to compare fraction pieces' },
  { step: 21, role: 'student', phase: 'Targeted Practice', title: 'Student opens personalized practice', route: '/student/practice', desc: 'Engages in 5 interactive visual slice exercises' },
  { step: 22, role: 'student', phase: 'Targeted Practice', title: 'Student completes interactive practice', route: '/student/practice', desc: 'Solves questions with immediate feedback & celebrations' },
  { step: 23, role: 'student', phase: 'Progress Tracking', title: 'Longitudinal mastery radar updates', route: '/student/progress', desc: 'Fraction comparison mastery climbs from 44% to 74%' },
  { step: 24, role: 'student', phase: 'Progress Tracking', title: 'End-to-end assessment cycle complete', route: '/student/dashboard', desc: 'Human-in-the-loop pedagogical loop successfully fulfilled' },
];

export const EvaluatorTourModal: React.FC<EvaluatorTourModalProps> = ({ isOpen, onClose }) => {
  const { scenarioStep, setScenarioStep, setRole, navigate, resetAll } = useLearnLens();

  if (!isOpen) return null;

  const handleGoToStep = (stepNum: number) => {
    const s = WORKFLOW_STEPS[stepNum - 1];
    if (!s) return;
    setScenarioStep(stepNum);
    setRole(s.role);
    navigate(s.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
              Platform Workflow Guide
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Complete Assessment & Pedagogical Workflow
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description & Reset */}
        <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <span>Select any workflow milestone to navigate directly to that stage of the assessment:</span>
          <button
            onClick={() => {
              resetAll();
              onClose();
            }}
            className="flex items-center gap-1 font-semibold text-blue-700 hover:underline shrink-0 ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>

        {/* Categorized Steps List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
          {WORKFLOW_STEPS.map((s) => {
            const isCurrent = s.step === scenarioStep;
            const isPast = s.step < scenarioStep;

            return (
              <div
                key={s.step}
                onClick={() => handleGoToStep(s.step)}
                className={`pt-2.5 first:pt-0 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-blue-50 border border-blue-200 shadow-2xs'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isPast
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.step}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                        {s.title}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded shrink-0 ${
                        s.role === 'teacher' ? 'bg-emerald-50 text-emerald-800' : 'bg-indigo-50 text-indigo-800'
                      }`}>
                        {s.role}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        • {s.phase}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate sm:text-clip">{s.desc}</p>
                  </div>
                </div>

                <span className="text-xs text-blue-600 font-semibold shrink-0 flex items-center gap-1 hover:underline">
                  <span className="hidden sm:inline">Navigate</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Core Philosophy: AI analyzes • Teacher verifies & decides • Student understands
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
