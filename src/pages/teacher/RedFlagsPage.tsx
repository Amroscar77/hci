import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  TrendingDown, 
  Info,
  Calendar,
  Check
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { AssessmentStepper } from '../../components/common/AssessmentStepper';

export const RedFlagsPage: React.FC = () => {
  const { 
    redFlags, 
    confirmRedFlag, 
    dismissRedFlag, 
    t, 
    setScenarioStep, 
    navigate 
  } = useLearnLens();

  const flag = redFlags[0];
  const isConfirmed = flag.status === 'confirmed';
  const isDismissed = flag.status === 'dismissed';

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [reasonNotes, setReasonNotes] = useState(flag.reason);

  const handleConfirmSupport = () => {
    confirmRedFlag(flag.id);
    setScenarioStep(14); // Step 14: Teacher confirms support need
  };

  const handleProceedToFeedback = () => {
    setScenarioStep(15); // Step 15: Teacher edits personalized feedback
    navigate('/teacher/feedback');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-150">
      {/* Assessment Workflow Stepper */}
      <AssessmentStepper currentStage="flags" />

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-0.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Teacher Review Focus List</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.redFlagTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.redFlagSubtitle}
          </p>
        </div>

        <button
          onClick={handleProceedToFeedback}
          className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Continue to Feedback Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Non-Stigmatizing Educational Principle Notice */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-950 leading-relaxed">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm mb-0.5 text-blue-900">
            Professional Pedagogical Standard
          </strong>
          LearnLens avoids negative labels or deficit tracking. Pattern detection highlights students where timely conceptual intervention can prevent frustration. Teacher review is always required.
        </div>
      </div>

      {/* Flag Item Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shadow-2xs">
              OH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{flag.studentName}</h2>
                <span className="text-xs bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium">
                  Grade {flag.grade} Mathematics
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Focus Area: <strong className="text-slate-800">{flag.concept}</strong> • {flag.assessmentCount} Assessments Analyzed
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-semibold block">
                AI suggestion — teacher review required
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                AI Confidence: {flag.aiConfidence}%
              </span>
            </div>

            {isConfirmed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Teacher Decision: Confirmed</span>
              </span>
            ) : isDismissed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                <span>Teacher Decision: Dismissed</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                <span>Teacher Decision: Pending Review</span>
              </span>
            )}
          </div>
        </div>

        {/* Why was this flagged? 4-Pillar Breakdown */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.whyFlagged}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent, algorithmic criteria that triggered this pedagogical review recommendation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Repeated mistake */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 text-sm block">
                1. {t.flagRepeatedMistake}
              </span>
              <p className="text-slate-600 leading-relaxed">
                Omar consistently evaluated fraction size based on the single denominator number rather than the fraction value (e.g. 1/6 &gt; 1/4 and 3/8 &gt; 5/8).
              </p>
            </div>

            {/* 2. Number of assessments */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 text-sm block">
                2. Multi-Exam Consistency (3 Assessments)
              </span>
              <p className="text-slate-600 leading-relaxed">
                The misconception appeared in Unit Fractions Quiz (Exam 1), Fractions Midterm (Exam 2), and Fractions & Word Problems (Exam 3).
              </p>
            </div>

            {/* 3. Affected questions */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 text-sm block">
                3. Affected Questions (4 Instances)
              </span>
              <p className="text-slate-600 leading-relaxed">
                Questions #4 (Exam 1), #7 (Exam 2), #4 (Exam 3), and related homework problem #9.
              </p>
            </div>

            {/* 4. Trend */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 text-sm block">
                4. Flat / Declining Trend
              </span>
              <p className="text-slate-600 leading-relaxed">
                While Omar's multiplication mastery is advancing rapidly (86%), his fraction comparison score has remained stagnant without visual manipulatives.
              </p>
            </div>
          </div>

          {/* Teacher Decision Box */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                Teacher Checkpoint Authority:
              </span>
              <span className="text-xs text-slate-500">
                Confirming adds targeted fraction practice to Omar's student roadmap.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleConfirmSupport}
                className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.btnConfirmReview}</span>
              </button>

              <button
                onClick={() => dismissRedFlag(flag.id)}
                className="h-8.5 px-3 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors"
              >
                {t.btnDismissReview}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleProceedToFeedback}
            className="h-8.5 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>Proceed to Personalized Feedback</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
