import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Edit3, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { AssessmentStepper } from '../../components/common/AssessmentStepper';

export const AiGradingPage: React.FC = () => {
  const { 
    exam, 
    updateQuestionScore, 
    confirmExamGrade, 
    t, 
    setScenarioStep, 
    navigate 
  } = useLearnLens();

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const totalScoreEarned = exam.questions.reduce((acc, q) => acc + q.confirmedScore, 0);
  const totalMaxScore = exam.questions.reduce((acc, q) => acc + q.maxScore, 0);
  const calculatedPercent = Math.round((totalScoreEarned / totalMaxScore) * 100);

  const handleConfirmGrade = () => {
    setScenarioStep(9); // Step 9: Teacher confirms grade at 72%
    confirmExamGrade();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Assessment Workflow Stepper */}
      <AssessmentStepper currentStage="grade" />

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-0.5">
            <Brain className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Assessment & Teacher Authority</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t.gradingTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.gradingSubtitle}
          </p>
        </div>

        {/* Dual Grade Tracker: AI Suggestion vs Teacher Decision */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* AI SUGGESTION */}
          <div className="bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200 text-right">
            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>AI Suggestion</span>
            </div>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-lg font-bold text-slate-800 font-mono">72%</span>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">(91% conf)</span>
            </div>
            <span className="text-[9px] text-amber-800 font-medium block">Teacher review required</span>
          </div>

          {/* TEACHER DECISION */}
          <div className="bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-300 text-right shadow-2xs">
            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>Teacher Decision</span>
            </div>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-xl font-bold text-[#0F5B46] font-mono">{calculatedPercent}%</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded border border-emerald-200">
                Confirmed
              </span>
            </div>
            <span className="text-[9px] text-emerald-700 font-medium block">Teacher confirmed</span>
          </div>

          <button
            onClick={handleConfirmGrade}
            className="h-9 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>{t.btnConfirmGrade}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mandatory Human-in-the-Loop AI Disclaimer Notice */}
      <div className="p-3 bg-blue-50/60 border border-blue-200/90 rounded-lg flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>
            <strong className="font-semibold">{t.aiDisclaimer}:</strong> Scores and explanations are assistive recommendations. You maintain complete override authority.
          </span>
        </div>
        <span className="text-[10px] font-mono text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded font-medium shrink-0 hidden sm:inline">
          Confidence Weighted
        </span>
      </div>

      {/* Questions Grading Review Cards */}
      <div className="space-y-3.5">
        {exam.questions.map((q) => {
          const isQ4 = q.id === 'q4';
          const isCorrect = q.aiEvaluation === 'correct';
          const isIncorrect = q.aiEvaluation === 'incorrect';
          const isPartial = q.aiEvaluation === 'partial';

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border transition-all p-4 sm:p-5 shadow-2xs space-y-3 ${
                isQ4 ? 'border-amber-300 ring-1 ring-amber-300/40' : 'border-slate-200'
              }`}
            >
              {/* Question Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-800">
                    Q{q.number}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {q.conceptName}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-mono">Max {q.maxScore} pts</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* AI Evaluation Pill */}
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : isIncorrect
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {isIncorrect && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                    {isPartial && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{isCorrect ? 'Correct' : isIncorrect ? 'Incorrect' : 'Partial Credit'}</span>
                  </span>

                  {/* AI Confidence */}
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    AI Confidence: {q.aiConfidence}%
                  </span>
                </div>
              </div>

              {/* Question Prompt */}
              <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {q.prompt}
              </div>

              {/* 4-Column Structured Comparison: Student Answer | Expected Answer | AI Suggestion | Teacher Decision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                {/* 1. Student Answer */}
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">
                    1. {t.studentAnswer}
                  </span>
                  <div className={`p-2 rounded-lg font-mono font-bold text-sm ${
                    isIncorrect ? 'bg-rose-50 text-rose-900 border border-rose-200' : 'bg-white text-slate-900 border border-slate-200'
                  }`}>
                    {q.editedAnswer}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">OCR Verified</span>
                </div>

                {/* 2. Expected Answer */}
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">
                    2. {t.expectedAnswer}
                  </span>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold text-sm text-slate-900">
                    {q.expectedAnswer}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Grading Key</span>
                </div>

                {/* 3. AI Suggestion */}
                <div>
                  <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1 text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    3. AI Suggestion
                  </span>
                  <div className="p-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-800 flex items-center justify-between">
                    <span className="font-mono font-bold text-sm">{q.aiSuggestedScore} / {q.maxScore} pts</span>
                    <span className="text-[10px] font-mono text-slate-600 font-semibold">{q.aiConfidence}% conf</span>
                  </div>
                  <span className="text-[10px] text-amber-900 font-medium mt-1 block">
                    AI suggestion — teacher review required
                  </span>
                </div>

                {/* 4. Teacher Decision */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                      4. Teacher Decision
                    </span>
                    <button
                      onClick={() => setEditingQuestionId(editingQuestionId === q.id ? null : q.id)}
                      className="text-[#0F5B46] hover:underline text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{editingQuestionId === q.id ? 'Save' : 'Override'}</span>
                    </button>
                  </div>

                  {editingQuestionId === q.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={0}
                        max={q.maxScore}
                        value={q.confirmedScore}
                        onChange={(e) => updateQuestionScore(q.id, Math.min(q.maxScore, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-16 p-1.5 bg-white border-2 border-emerald-600 rounded-lg text-xs font-bold font-mono text-center focus:outline-hidden"
                      />
                      <span className="text-slate-500 text-[11px]">/ {q.maxScore} pts</span>
                    </div>
                  ) : (
                    <div className="p-2 bg-white rounded-lg border border-emerald-300 font-mono font-bold text-sm text-slate-900 flex justify-between items-center">
                      <span className="text-emerald-900">{q.confirmedScore} / {q.maxScore} pts</span>
                      <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Confirmed
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] text-slate-400 mt-1 block">Final Teacher Authority</span>
                </div>
              </div>

              {/* Suggested Explanation */}
              <div className="pt-2 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
                <Brain className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <strong className="text-slate-800 mr-1">{t.aiReasoning}:</strong>
                    <span>
                      {isQ4 
                        ? '"The comparison appears to be based on the numerator rather than the value of the fraction."'
                        : q.aiSuggestedReason}
                    </span>
                  </div>

                  {isQ4 && (
                    <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                      ⚠️ Cross-assessment indicator: This mistake pattern matches Exam 1 (Q4) and Exam 2 (Q7). Flagged for Learning-Gap Review.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 text-sm block">
            Confirmed Total Grade: {calculatedPercent}% (18 of 25 Points)
          </span>
          <span className="text-xs text-slate-500">
            Next: Review longitudinal evidence in Learning Insights.
          </span>
        </div>

        <button
          onClick={handleConfirmGrade}
          className="w-full sm:w-auto px-6 py-3 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>{t.btnProceedToGaps}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
