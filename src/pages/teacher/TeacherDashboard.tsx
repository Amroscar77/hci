import React from 'react';
import { 
  FileText, 
  Users, 
  GitBranch, 
  MessageSquareQuote, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Brain,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const TeacherDashboard: React.FC = () => {
  const { t, exam, learningGaps, redFlags, navigate, setScenarioStep } = useLearnLens();

  const pendingGapsCount = learningGaps.filter(g => g.status === 'pending').length;
  const pendingFlagsCount = redFlags.filter(f => f.status === 'pending').length;
  const isOcrVerified = exam.status !== 'ocr_pending';

  const handleStartReview = () => {
    setScenarioStep(3); // Step 3: Teacher opens exam from queue
    navigate(`/teacher/exams/${exam.id}/ocr`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t.teacherGreeting}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.teacherSubtitle} • <span className="text-slate-400 font-normal">Demo data</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/teacher/red-flags')}
            className="flex items-center gap-1.5 h-8.5 px-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-medium hover:bg-amber-100 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Focus Review ({pendingFlagsCount})</span>
          </button>

          <button
            onClick={handleStartReview}
            className="flex items-center gap-1.5 h-8.5 px-3.5 rounded-lg bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <span>Review Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Compact Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Exams awaiting review */}
        <div 
          onClick={() => navigate('/teacher/exams')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-1 shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.kpiAwaitingReview}
            </span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">1</div>
          <p className="text-[11px] text-slate-400">Fractions & Word Problems</p>
        </div>

        {/* Students requiring review */}
        <div 
          onClick={() => navigate('/teacher/red-flags')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-1 shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.kpiNeedingAttention}
            </span>
            <Users className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-900">{pendingFlagsCount}</div>
          <p className="text-[11px] text-slate-400">Omar Hassan (Grade 4)</p>
        </div>

        {/* Learning gaps detected */}
        <div 
          onClick={() => navigate('/teacher/learning-gaps')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-1 shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.kpiGapsDetected}
            </span>
            <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-900">{pendingGapsCount}</div>
          <p className="text-[11px] text-slate-400">Fraction comparison</p>
        </div>

        {/* Feedback pending */}
        <div 
          onClick={() => navigate('/teacher/feedback')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-1 shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.kpiPendingFeedback}
            </span>
            <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {exam.status === 'published' ? '0' : '1'}
          </div>
          <p className="text-[11px] text-slate-400">
            {exam.status === 'published' ? 'All published' : 'Draft ready to send'}
          </p>
        </div>
      </div>

      {/* Professional Review Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t.reviewQueueTitle}</h2>
            <p className="text-xs text-slate-500">Pending submissions requiring teacher verification</p>
          </div>
          <span className="text-[11px] bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
            1 Action Required
          </span>
        </div>

        {/* Real School SaaS Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">{t.colStudent}</th>
                <th className="py-2.5 px-3 hidden md:table-cell">{t.colGrade}</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">{t.colSubject}</th>
                <th className="py-2.5 px-3">{t.colAssessment}</th>
                <th className="py-2.5 px-3 hidden lg:table-cell">{t.colSubmitted}</th>
                <th className="py-2.5 px-3">{t.colOcr}</th>
                <th className="py-2.5 px-3">{t.colAiGrade}</th>
                <th className="py-2.5 px-3">{t.colTeacherReview}</th>
                <th className="py-2.5 px-3">{t.colStatus}</th>
                <th className="py-2.5 px-4 text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60 transition-colors">
                {/* Student */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                      OH
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{exam.studentName}</div>
                      <div className="text-[10px] text-slate-400 md:hidden">Grade {exam.grade} • Math</div>
                    </div>
                  </div>
                </td>

                {/* Grade */}
                <td className="py-3 px-3 hidden md:table-cell font-mono text-slate-600">
                  Grade {exam.grade}
                </td>

                {/* Subject */}
                <td className="py-3 px-3 hidden sm:table-cell font-medium text-slate-800">
                  {exam.subject}
                </td>

                {/* Assessment */}
                <td className="py-3 px-3">
                  <div className="font-medium text-slate-900">{exam.title}</div>
                  <div className="text-[10px] text-slate-400">5 Questions</div>
                </td>

                {/* Submitted */}
                <td className="py-3 px-3 hidden lg:table-cell font-mono text-slate-500 text-[11px]">
                  Today, 10:14 AM
                </td>

                {/* OCR */}
                <td className="py-3 px-3">
                  {isOcrVerified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                      <Check className="w-3 h-3 text-emerald-600" />
                      {t.statusVerified}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                      <Clock className="w-2.5 h-2.5 text-amber-600" />
                      Needs Check
                    </span>
                  )}
                </td>

                {/* AI Suggestion */}
                <td className="py-3 px-3">
                  <span className="font-mono font-semibold text-slate-800 text-xs">72%</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-1">(91%)</span>
                </td>

                {/* Teacher Decision */}
                <td className="py-3 px-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                    exam.status === 'published' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    exam.status === 'ai_graded' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    {exam.status === 'published' ? 'Teacher confirmed' :
                     exam.status === 'ai_graded' ? 'In Review' : 'Teacher review required'}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                    exam.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                    exam.status === 'ocr_pending' ? 'bg-amber-100 text-amber-900' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {exam.status === 'ocr_pending' ? t.statusNeedsReview :
                     exam.status === 'published' ? t.statusPublished : 'In Review'}
                  </span>
                </td>

                {/* Action Button */}
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={handleStartReview}
                    className="inline-flex items-center gap-1 bg-[#0F5B46] hover:bg-[#0c4837] text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                  >
                    <span>{t.actionReview}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Learning Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Class Mastery Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Grade 4 Mathematics Concept Radar</h3>
              <p className="text-xs text-slate-500">Cross-student mastery levels across Unit 3: Fractions</p>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Current Unit
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>2-Digit Multiplication</span>
                <span className="font-mono text-emerald-700 font-bold">88%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Fraction Addition (Like Denominators)</span>
                <span className="font-mono text-emerald-700 font-bold">81%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '81%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span className="text-amber-900 font-semibold">Fraction Comparison (Recurring Gap)</span>
                <span className="font-mono text-amber-900 font-bold">54%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '54%' }} />
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                Notice: Misconception between denominator size and fraction slice magnitude.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Multi-Step Word Problems</span>
                <span className="font-mono text-blue-700 font-bold">66%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Human-in-the-Loop Pedagogy Card */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Teacher Authority Principle</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              AI evaluates preliminary patterns. No grade or learning gap diagnosis is assigned without your explicit verification and pedagogical decision.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>OCR Verification:</span>
              <span className="text-amber-400 font-semibold">1 item requires review (Q4)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Grade Authority:</span>
              <span className="text-emerald-400 font-semibold">Teacher confirmed 72%</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Learning Gap:</span>
              <span className="text-blue-300 font-semibold">Evidence from 3 exams</span>
            </div>
          </div>

          <button
            onClick={handleStartReview}
            className="w-full h-8.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <span>Start Review Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
