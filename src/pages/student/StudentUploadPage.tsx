import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Camera, 
  FileUp, 
  Check, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentUploadPage: React.FC = () => {
  const { uploadStudentExam, exam, setScenarioStep, setRole, navigate, t } = useLearnLens();

  type UploadStep = 'idle' | 'uploading' | 'reading' | 'extracting' | 'completed';
  const [uploadState, setUploadState] = useState<UploadStep>('idle');

  const handleStartUpload = () => {
    setUploadState('uploading');

    setTimeout(() => {
      setUploadState('reading');
    }, 800);

    setTimeout(() => {
      setUploadState('extracting');
    }, 1600);

    setTimeout(() => {
      setUploadState('completed');
      uploadStudentExam();
      setScenarioStep(2); // Step 2: Submission pending teacher review
    }, 2400);
  };

  const handleSwitchToTeacherReview = () => {
    setScenarioStep(3); // Step 3: Teacher opens it
    setRole('teacher');
    navigate(`/teacher/exams/${exam.id}/ocr`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.navUpload}
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Submit your handwritten mathematics worksheet. LearnLens will read your work and notify Ms. Sarah for review.
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="bg-white rounded-xl border border-dashed border-slate-300 hover:border-slate-400 p-8 sm:p-10 text-center transition-all shadow-2xs space-y-5">
        {uploadState === 'idle' && (
          <div className="space-y-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900">
                Drag and drop your exam paper here
              </h2>
              <p className="text-xs text-slate-500">
                Supports PDF documents, scanned images (PNG, JPG), or camera photos
              </p>
            </div>

            {/* 3 Upload Format Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleStartUpload}
                className="h-8.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors border border-slate-200"
              >
                <FileUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Upload PDF</span>
              </button>

              <button
                type="button"
                onClick={handleStartUpload}
                className="h-8.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors border border-slate-200"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={handleStartUpload}
                className="h-8.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors border border-slate-200"
              >
                <Camera className="w-3.5 h-3.5 text-purple-600" />
                <span>Scan with Camera</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartUpload}
                className="h-9 px-5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs shadow-2xs transition-colors inline-flex items-center gap-2"
              >
                <span>Submit "Fractions & Word Problems" Exam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Uploading Multi-Stage Simulation */}
        {['uploading', 'reading', 'extracting'].includes(uploadState) && (
          <div className="py-6 space-y-5 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-6 h-6 animate-spin text-blue-600" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {uploadState === 'uploading' && 'Uploading document...'}
                {uploadState === 'reading' && 'Reading handwritten student exam...'}
                {uploadState === 'extracting' && 'Extracting answers via OCR...'}
              </h3>
              <p className="text-xs text-slate-500">
                Please keep this page open while we prepare your worksheet for teacher review.
              </p>
            </div>

            {/* Progress Step Indicator */}
            <div className="space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${uploadState !== 'uploading' ? 'bg-emerald-500' : 'bg-blue-500 animate-ping'}`} />
                <span className={uploadState !== 'uploading' ? 'text-emerald-700 font-semibold' : 'text-slate-800'}>
                  Uploading high-resolution scan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${uploadState === 'extracting' ? 'bg-emerald-500' : uploadState === 'reading' ? 'bg-blue-500 animate-ping' : 'bg-slate-300'}`} />
                <span className={uploadState === 'extracting' ? 'text-emerald-700 font-semibold' : uploadState === 'reading' ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                  Reading handwritten pencil answers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${uploadState === 'extracting' ? 'bg-blue-500 animate-ping' : 'bg-slate-300'}`} />
                <span className={uploadState === 'extracting' ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                  Extracting answers into verification queue
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Upload Completed State */}
        {uploadState === 'completed' && (
          <div className="py-5 space-y-5 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Exam submitted successfully
              </h3>
              <p className="text-xs text-slate-500">
                Status: <strong className="text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Waiting for teacher verification</strong>
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next steps:</span>
              </div>
              <p className="leading-relaxed">
                Ms. Sarah will inspect the extracted answers, verify any uncertain OCR markings, confirm your grading, and write personalized feedback for you.
              </p>
            </div>

            <button
              onClick={handleSwitchToTeacherReview}
              className="h-9 px-5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs shadow-2xs transition-colors inline-flex items-center gap-2"
            >
              <span>Switch to Ms. Sarah's Review Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Quality Guidance Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Scanning Quality Checklist for Best Results</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Ensure good lighting with no dark shadows over fractions</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Circle or write final answers clearly inside the answer boxes</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Keep all 4 corners of the page visible in the photo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
