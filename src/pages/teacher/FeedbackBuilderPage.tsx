import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Send, 
  Save, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  Target,
  Eye,
  Plus,
  RotateCcw
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { AssessmentStepper } from '../../components/common/AssessmentStepper';

export const FeedbackBuilderPage: React.FC = () => {
  const { 
    exam, 
    feedbackMessage, 
    setFeedbackMessage, 
    sendFeedbackToStudent, 
    t, 
    setScenarioStep, 
    setRole, 
    navigate 
  } = useLearnLens();

  const [savedDraft, setSavedDraft] = useState(false);
  const [previewAsStudent, setPreviewAsStudent] = useState(false);
  const isPublished = exam.status === 'published';

  const handleSaveDraft = () => {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const handleSendToStudent = () => {
    sendFeedbackToStudent();
    setScenarioStep(17); // Step 17: Student receives notification
    setRole('student');
    navigate('/student/notifications');
  };

  // Quick insertion helpers
  const handleAppendPhrase = (phrase: string) => {
    setFeedbackMessage(feedbackMessage.trim() ? `${feedbackMessage.trim()} ${phrase}` : phrase);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Workflow Stepper */}
      <AssessmentStepper currentStage="feedback" />

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-0.5">
            <MessageSquareQuote className="w-4 h-4 text-blue-600" />
            <span>Teacher Communication</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.feedbackTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.feedbackSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewAsStudent(!previewAsStudent)}
            className={`h-8.5 px-3 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              previewAsStudent
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewAsStudent ? 'Exit Student Preview' : 'Preview as Student'}</span>
          </button>

          {isPublished && (
            <span className="inline-flex items-center gap-1.5 h-8.5 px-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Published</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Feedback Composer Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Student Assessment Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Recipient</div>
            <div className="text-xl font-bold text-slate-900">Omar Hassan</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Grade 4 Mathematics • Fractions & Word Problems
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Confirmed Grade
            </span>
            <div className="text-3xl font-black text-[#0F5B46] font-mono">
              {exam.finalGradePercent}%
            </div>
          </div>
        </div>

        {/* Student Preview Mode */}
        {previewAsStudent ? (
          <div className="p-6 md:p-8 bg-blue-50/40 space-y-6">
            <div className="p-5 bg-white rounded-2xl border border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Student Portal View: Note from Ms. Sarah</span>
              </div>
              <p className="text-base text-slate-900 leading-relaxed font-serif italic">
                "{feedbackMessage}"
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Teacher: Ms. Sarah</span>
                <span>Final Score: 72%</span>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Composer Mode */
          <div className="p-6 md:p-8 space-y-6">
            {/* Strengths and Practice Needs Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  <span>{t.strengthsTitle}</span>
                </div>
                <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Multiplication (24 × 6 & 35 × 4 calculated correctly)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Fraction addition with matching denominators (3/5)</span>
                  </li>
                </ul>
              </div>

              {/* Needs Practice */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <Target className="w-4 h-4 text-amber-700" />
                  <span>{t.needsPracticeTitle}</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Fraction comparison (e.g. 3/8 vs 5/8)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Multi-step subtraction check in word problems</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Insertion Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Pedagogical Inserts:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleAppendPhrase("Great persistence on the word problems!")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3 text-slate-500" />
                  <span>Add Encouragement</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAppendPhrase("Try the 5 visual fraction bar exercises in your practice lab.")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3 text-slate-500" />
                  <span>Add Practice Recommendation</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAppendPhrase("Remember: smaller denominator = bigger slice size!")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3 text-slate-500" />
                  <span>Add Teacher Hint</span>
                </button>
              </div>
            </div>

            {/* Editable Feedback Text Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{t.suggestedMessage} (Editable by Teacher)</span>
                </label>

                <button
                  type="button"
                  onClick={() => setFeedbackMessage("You are doing well with multiplication. Let's practice comparing fractions with different denominators.")}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Suggested AI</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed shadow-inner"
                placeholder="Draft personalized feedback..."
              />
            </div>
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleSaveDraft}
            className="w-full sm:w-auto h-8.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>{savedDraft ? 'Draft Saved!' : t.btnSaveDraftFeedback}</span>
          </button>

          <button
            onClick={handleSendToStudent}
            className="w-full sm:w-auto h-9 px-5 bg-[#0F5B46] hover:bg-[#0c4837] text-white rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.btnSendToStudent}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
