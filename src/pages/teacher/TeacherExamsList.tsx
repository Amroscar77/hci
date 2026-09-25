import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Brain, 
  Search, 
  Filter,
  Plus
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const TeacherExamsList: React.FC = () => {
  const { exam, t, navigate, setScenarioStep } = useLearnLens();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Grade 4 Mathematics Assessments</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, verify OCR, and audit grading workflows</p>
        </div>

        <button
          onClick={() => {
            setScenarioStep(4);
            navigate(`/teacher/exams/${exam.id}/ocr`);
          }}
          className="px-4 py-2 bg-[#0F5B46] hover:bg-[#0c4837] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Verify Omar's Exam</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Current Assessment Cohort
          </span>
          <span className="text-xs text-slate-500 font-mono">1 Active Submission</span>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                OH
              </div>
              <div>
                <div className="font-bold text-slate-900">{exam.studentName}</div>
                <div className="text-xs text-slate-500">
                  {exam.title} • Submitted {exam.submissionDate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Status</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mt-0.5 ${
                  exam.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                  exam.status === 'ocr_pending' ? 'bg-amber-100 text-amber-900' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {exam.status === 'ocr_pending' ? 'Needs OCR Verification' :
                   exam.status === 'published' ? 'Published (72%)' : 'Graded (72%)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/teacher/exams/${exam.id}/ocr`)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                >
                  OCR
                </button>
                <button
                  onClick={() => navigate(`/teacher/exams/${exam.id}/grading`)}
                  className="px-3 py-1.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white rounded-lg text-xs font-semibold"
                >
                  Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
