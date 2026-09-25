import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Edit3, 
  Save, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { AssessmentStepper } from '../../components/common/AssessmentStepper';

export const OcrVerificationPage: React.FC = () => {
  const { 
    exam, 
    updateOcrQuestion, 
    approveOcr, 
    t, 
    setScenarioStep, 
    navigate 
  } = useLearnLens();

  const [activeQuestionId, setActiveQuestionId] = useState<string>('q4');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [saveToast, setSaveToast] = useState(false);
  const [updateToast, setUpdateToast] = useState(false);

  const q4 = exam.questions.find(q => q.id === 'q4');
  const isQ4Fixed = q4 && q4.editedAnswer === '3/8';

  const handleFixQ4 = () => {
    updateOcrQuestion('q4', '3/8');
    setScenarioStep(5); // Step 5: Teacher corrects OCR mistake
    setUpdateToast(true);
    setTimeout(() => setUpdateToast(false), 2500);
  };

  const handleApproveOcr = () => {
    setScenarioStep(6); // Step 6: Teacher approves OCR
    approveOcr();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Assessment Workflow Stepper */}
      <AssessmentStepper currentStage="verify" />

      {/* Answer Updated Toast */}
      {updateToast && (
        <div className="bg-emerald-900 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs flex items-center justify-between animate-in fade-in duration-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Answer updated: Question 4 corrected to 3/8</span>
          </div>
          <span className="text-[11px] text-emerald-300">Ready to Approve</span>
        </div>
      )}

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Teacher Verification Checkpoint</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t.ocrTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.ocrSubtitle}
          </p>
        </div>

        {/* Status Indicator & Approve Button */}
        <div className="flex items-center gap-2.5">
          <div className={`h-8.5 px-3 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
            isQ4Fixed 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-amber-50 text-amber-900 border-amber-200'
          }`}>
            {isQ4Fixed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All 5 items verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.ocrItemNeedsReview} (Q4)</span>
              </>
            )}
          </div>

          <button
            onClick={handleApproveOcr}
            className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>{t.btnApproveOcr}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Two-Panel Document Review Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT PANEL: Document Paper Viewer (6 Columns) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          {/* Viewer Toolbar */}
          <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-800">{t.examPaperPreview}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                className="p-1 hover:bg-slate-200 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1 hover:bg-slate-200 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Exam Document Canvas Simulation */}
          <div className="p-6 bg-slate-100 overflow-auto max-h-[640px] flex justify-center">
            <div 
              className="bg-white shadow-md border border-slate-300 p-6 sm:p-8 rounded-sm w-full max-w-lg transition-transform duration-150 origin-top text-slate-900 font-sans"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-3 mb-6 flex justify-between items-start">
                <div>
                  <h3 className="font-serif font-black text-lg tracking-tight text-slate-900">
                    Grade 4 Math: Fractions & Word Problems
                  </h3>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Spring Term Assessment • Oak Ridge Elementary
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Student</span>
                  <span className="font-handwriting font-bold text-blue-900 text-base">
                    Omar Hassan
                  </span>
                </div>
              </div>

              {/* Questions Rendered as Scan */}
              <div className="space-y-6 text-xs sm:text-sm">
                {exam.questions.map((q) => {
                  const isActive = activeQuestionId === q.id;
                  const isMistakeQ = q.id === 'q4';

                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
                        isMistakeQ && !isQ4Fixed
                          ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-300/30'
                          : isActive
                          ? 'border-blue-500 bg-blue-50/30'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      {/* Bounding Box Label */}
                      {isMistakeQ && (
                        <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-2xs">
                          Uncertain OCR Region (76%)
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-800 text-xs">
                          {q.number}. {q.prompt}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          [{q.maxScore} pts]
                        </span>
                      </div>

                      {/* Handwritten Student Response */}
                      <div className="mt-2.5 flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-medium">Student wrote:</span>
                        <div className="px-3 py-1 rounded-sm bg-slate-50 border border-slate-200 font-handwriting text-blue-900 font-bold text-base tracking-wide inline-block">
                          {isMistakeQ ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="text-slate-400 line-through text-xs font-sans">5/8</span>
                              <span className="text-red-700 font-bold border-2 border-red-500 rounded-full px-2 py-0.5">
                                3/8
                              </span>
                            </span>
                          ) : (
                            q.studentHandwrittenText
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: OCR Verification Tool (6 Columns) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs">
            <div>
              <h2 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
                {t.ocrPanelTitle}
              </h2>
              <p className="text-[11px] text-slate-500">
                Review and correct any extracted text before proceeding to AI grading.
              </p>
            </div>
            <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              5 Questions
            </span>
          </div>

          {/* Questions Verification List */}
          <div className="p-5 space-y-4 divide-y divide-slate-100 overflow-y-auto max-h-[640px]">
            {exam.questions.map((q) => {
              const isMistakeQ = q.id === 'q4';
              const isFixed = q.editedAnswer === '3/8';
              const isActive = activeQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`pt-4 first:pt-0 space-y-2.5 cursor-pointer ${
                    isActive ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-800">
                        {q.number}
                      </span>
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {q.conceptName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* OCR Confidence */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        q.ocrConfidence >= 90
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}>
                        {t.ocrConfidence}: {q.ocrConfidence}%
                      </span>

                      {/* Verification status */}
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        isMistakeQ && !isFixed
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {isMistakeQ && !isFixed ? 'Needs Verification' : 'Verified'}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 font-medium">
                    {q.prompt}
                  </div>

                  {/* Detected vs Verified Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        {t.detectedText}
                      </span>
                      <div className="p-2 bg-slate-200/60 rounded-md font-mono text-xs text-slate-700">
                        {q.detectedAnswer}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                          {t.verifiedText}
                        </span>
                        {isMistakeQ && !isFixed && (
                          <span className="text-[10px] text-amber-800 font-bold">
                            Review discrepancy!
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={q.editedAnswer}
                        onChange={(e) => updateOcrQuestion(q.id, e.target.value)}
                        className={`w-full p-2 rounded-md font-mono text-xs font-bold border transition-colors ${
                          isMistakeQ && !isFixed
                            ? 'border-amber-400 bg-amber-50/80 text-amber-950 focus:ring-1 focus:ring-amber-400'
                            : 'border-slate-300 bg-white text-slate-900 focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Quick Fix Button for Question 4 */}
                  {isMistakeQ && (
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <span className="text-slate-500 text-[11px]">
                        Paper indicates student circled <strong>3/8</strong>.
                      </span>

                      {!isFixed ? (
                        <button
                          onClick={handleFixQ4}
                          className="h-7 px-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Change "5/8" → "3/8"</span>
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Corrected to 3/8</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Panel Footer */}
          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setSaveToast(true);
                setTimeout(() => setSaveToast(false), 1500);
              }}
              className="h-8.5 px-3 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>{saveToast ? 'Saved!' : t.btnSaveDraft}</span>
            </button>

            <button
              onClick={handleApproveOcr}
              className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <span>{t.btnApproveOcr}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
