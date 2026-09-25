import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  Lightbulb, 
  HelpCircle,
  FileCheck,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';
import { AssessmentStepper } from '../../components/common/AssessmentStepper';

interface TimelineEvent {
  id: string;
  stageNumber: number;
  stageName: string;
  subLabel: string;
  statusBadge: 'Emerging' | 'Repeated' | 'Confirmed' | 'Pending' | 'Assigned' | 'Improving';
  badgeStyle: string;
  date: string;
  examTitle: string;
  questionNumber: number | string;
  mistake: string;
  studentAnswer: string;
  expectedAnswer: string;
  aiSuggested: string;
  teacherAction: string;
  actionAssigned: string;
  studentImproved: string;
  aiConfidence: number;
  denominatorMisconception: boolean;
}

export const LearningGapsPage: React.FC = () => {
  const { 
    learningGaps, 
    confirmLearningGap, 
    dismissLearningGap, 
    editLearningGapNotes, 
    practiceCompleted,
    t, 
    setScenarioStep, 
    navigate 
  } = useLearnLens();

  const mainGap = learningGaps[0] || {
    id: 'gap-frac-compare-01',
    concept: 'Fraction comparison',
    status: 'pending',
    severity: 'repeated',
    aiConfidence: 87,
    affectedQuestions: [4, 7, 9],
    teacherNotes: 'Recurring issue with identifying relative size of fractions with identical and different denominators.',
    recommendedAction: 'Visual fraction bar exercises comparing portions with matching denominators before moving to benchmark fractions.',
  };

  const isConfirmed = mainGap.status === 'confirmed';
  const isDismissed = mainGap.status === 'dismissed';

  // Selected event in the longitudinal story
  const [activeEventId, setActiveEventId] = useState<string>('event-exam-2');
  
  // Note editing state
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [editedNotes, setEditedNotes] = useState<string>(mainGap.teacherNotes);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [showPedagogicalQuestions, setShowPedagogicalQuestions] = useState<boolean>(true);

  // The 6-event longitudinal story:
  // EXAM 1 (Emerging) → EXAM 2 (Repeated) → EXAM 3 (Repeated) → TEACHER REVIEW (Confirmed) → PRACTICE (Assigned) → EXAM 4 (Improving)
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'event-exam-1',
      stageNumber: 1,
      stageName: 'EXAM 1',
      subLabel: 'Emerging',
      statusBadge: 'Emerging',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
      date: 'Sept 28, 2026',
      examTitle: 'Unit Fractions Diagnostic Quiz',
      questionNumber: 4,
      mistake: 'Incorrect unit fraction comparison (assumed larger denominator means larger quantity)',
      studentAnswer: '1/6 > 1/4',
      expectedAnswer: '1/4 > 1/6',
      aiSuggested: 'Flagged initial denominator intuition inversion. Recommended checking during group review.',
      teacherAction: 'Noted initial denominator confusion in lesson review log; provided brief verbal recap.',
      actionAssigned: 'Unit fraction flashcard comparison warm-up.',
      studentImproved: 'Initial recognition; not yet solidified on multi-part fractions.',
      aiConfidence: 84,
      denominatorMisconception: true,
    },
    {
      id: 'event-exam-2',
      stageNumber: 2,
      stageName: 'EXAM 2',
      subLabel: 'Repeated',
      statusBadge: 'Repeated',
      badgeStyle: 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
      date: 'Oct 10, 2026',
      examTitle: 'Fractions Midterm Assessment',
      questionNumber: 7,
      mistake: 'Incorrect fraction comparison (ordered fractions 2/8, 7/8, 4/8 instead of 7/8, 4/8, 2/8)',
      studentAnswer: '3/8',
      expectedAnswer: '5/8',
      aiSuggested: 'Synthesized with Exam 1: pattern indicates persistent difficulty visualizing fractional parts of identical wholes.',
      teacherAction: 'Reviewed student scratch paper; confirmed student compares numerators in isolation without part-whole visualization.',
      actionAssigned: 'Assigned targeted peer pairing for denominator review.',
      studentImproved: 'Partially improved on same-denominator addition, but comparison misconception persisted.',
      aiConfidence: 88,
      denominatorMisconception: true,
    },
    {
      id: 'event-exam-3',
      stageNumber: 3,
      stageName: 'EXAM 3',
      subLabel: 'Repeated',
      statusBadge: 'Repeated',
      badgeStyle: 'bg-rose-50 text-rose-800 border-rose-300 font-semibold',
      date: 'Oct 24, 2026',
      examTitle: 'Fractions & Word Problems (Current)',
      questionNumber: 4,
      mistake: 'Incorrect fraction comparison (selected 3/8 instead of 5/8 when identifying larger shaded quantity)',
      studentAnswer: '3/8',
      expectedAnswer: '5/8',
      aiSuggested: 'Cross-assessment synthesis confirms structural learning gap (87% confidence across 3 assessments, 4 questions).',
      teacherAction: 'Evaluating multi-exam longitudinal evidence for formal confirmation into student learning profile.',
      actionAssigned: '5-question interactive Practice Lab using visual fraction strips and bar models.',
      studentImproved: 'Awaiting targeted practice intervention to reinforce part-whole relationship.',
      aiConfidence: 91,
      denominatorMisconception: true,
    },
    {
      id: 'event-review',
      stageNumber: 4,
      stageName: 'TEACHER REVIEW',
      subLabel: isConfirmed ? 'Confirmed' : isDismissed ? 'Dismissed' : 'Under Review',
      statusBadge: isConfirmed ? 'Confirmed' : 'Pending',
      badgeStyle: isConfirmed 
        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold' 
        : 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
      date: 'Today (Oct 24)',
      examTitle: 'Pedagogical Decision Checkpoint',
      questionNumber: 'Multi-Exam Synthesis',
      mistake: 'Misconception confirmed across 3 assessments and 4 targeted questions.',
      studentAnswer: '4 Affected Questions (Q4, Q7, Q4, Q9)',
      expectedAnswer: 'Teacher Pedagogical Decision',
      aiSuggested: 'Classify as persistent conceptual gap; link visual manipulative practice before introducing unlike denominators.',
      teacherAction: isConfirmed 
        ? 'Confirmed by Teacher: Verified gap and authorized personalized Practice Lab.' 
        : isDismissed 
          ? 'Dismissed by Teacher: Categorized as transient arithmetic fatigue.' 
          : 'Under Review: Teacher evaluating multi-exam evidence before confirmation.',
      actionAssigned: 'Directly linked to Omar Hassan\'s personalized student dashboard and practice roadmap.',
      studentImproved: isConfirmed ? 'Intervention pathway activated for student.' : 'Pending decision.',
      aiConfidence: 87,
      denominatorMisconception: true,
    },
    {
      id: 'event-practice',
      stageNumber: 5,
      stageName: 'PRACTICE',
      subLabel: practiceCompleted ? 'Completed' : 'Practice Assigned',
      statusBadge: 'Assigned',
      badgeStyle: practiceCompleted 
        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
        : 'bg-indigo-50 text-indigo-800 border-indigo-200',
      date: 'Next Step',
      examTitle: 'Personalized Practice: Comparing Fractions',
      questionNumber: '5 Visual Questions',
      mistake: 'Targeting numerator vs denominator slice size confusion.',
      studentAnswer: practiceCompleted ? '5 of 5 Completed' : 'Ready to Start',
      expectedAnswer: 'Mastery Benchmark ≥ 75%',
      aiSuggested: 'Interactive color-coded fraction bars allowing real-time slice comparison.',
      teacherAction: 'Teacher monitors practice engagement and real-time comprehension telemetry.',
      actionAssigned: 'Interactive visual bar exercises (comparing halves, fourths, eighths).',
      studentImproved: practiceCompleted ? 'Mastery boosted to 74% (+30 pts improvement!)' : 'Targeted jump from 44% to 74%+ mastery.',
      aiConfidence: 95,
      denominatorMisconception: true,
    },
    {
      id: 'event-exam-4',
      stageNumber: 6,
      stageName: 'EXAM 4',
      subLabel: 'Improving',
      statusBadge: 'Improving',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold',
      date: 'Nov 12, 2026',
      examTitle: 'Upcoming Summative Benchmark',
      questionNumber: 6,
      mistake: 'Anticipated resolution following visual fraction bar mastery.',
      studentAnswer: 'Projected Target: 85%+',
      expectedAnswer: 'Full Concept Mastery',
      aiSuggested: 'Longitudinal follow-up question included on Exam 4 to verify durable retention.',
      teacherAction: 'Will review Exam 4 results to confirm long-term closure of this learning gap.',
      actionAssigned: 'Summative validation assessment.',
      studentImproved: 'Projected progression from Emerging (42%) to Mastery (85%+).',
      aiConfidence: 89,
      denominatorMisconception: true,
    },
  ];

  const selectedEvent = timelineEvents.find(e => e.id === activeEventId) || timelineEvents[1];

  const handleConfirm = () => {
    confirmLearningGap(mainGap.id);
    setScenarioStep(12);
    setFeedbackToast('Learning gap confirmed by teacher! Linked to student practice roadmap.');
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleDismiss = () => {
    dismissLearningGap(mainGap.id);
    setFeedbackToast('Learning gap dismissed.');
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleSaveNotes = () => {
    editLearningGapNotes(mainGap.id, editedNotes);
    setIsEditingNotes(false);
    setFeedbackToast('Pedagogical notes updated.');
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleProceedToRedFlags = () => {
    setScenarioStep(13);
    navigate('/teacher/red-flags');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Workflow Stepper */}
      <AssessmentStepper currentStage="insights" />

      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-md flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{feedbackToast}</span>
          </div>
          <button onClick={() => setFeedbackToast(null)} className="text-emerald-300 hover:text-white text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-0.5">
            <GitBranch className="w-3.5 h-3.5 text-emerald-700" />
            <span>Multi-Assessment Analysis • Learning Gap Journey</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Learning Gap Journey: Fraction Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student: <strong className="text-slate-800">Omar Hassan</strong> • Grade 4 Mathematics • Connecting assessment history to actionable support
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleProceedToRedFlags}
            className="h-8.5 px-3.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>Continue to Focus Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KEY INTERACTION: Teacher Decision Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded border border-amber-200">
                AI Detected: Potential recurring fraction misconception
              </span>
              <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                3 Assessments Analyzed
              </span>
              <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                4 Affected Questions
              </span>
              <span className="text-[10px] font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                87% AI Confidence
              </span>
            </div>

            <div className="pt-0.5">
              <span className="text-[11px] font-semibold text-amber-900 block">
                AI suggestion — teacher review required
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Fraction Comparison: Part-Whole Misconception
              </h2>
            </div>

            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              Recurring pattern: student compares numerators or denominators in isolation rather than conceptualizing fraction portions of identical wholes. Confirmed across Exam 1, Exam 2, and Exam 3.
            </p>
          </div>

          {/* Teacher Decision Buttons (Key Interaction) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            {isConfirmed ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-300 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Teacher Decision: Confirmed</span>
                </div>
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="h-8.5 px-3 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => confirmLearningGap('pending')}
                  className="h-8.5 px-2.5 text-slate-500 hover:text-slate-700 text-xs font-medium hover:underline"
                  title="Revert status to pending"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : isDismissed ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs border border-slate-300">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>Teacher Decision: Dismissed</span>
                </div>
                <button
                  onClick={handleConfirm}
                  className="h-8.5 px-3 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Reopen & Confirm</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Teacher Decision</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleConfirm}
                    className="h-9 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-bold rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Confirm Learning Gap</span>
                  </button>

                  <button
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    className="h-9 px-3.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={handleDismiss}
                    className="h-9 px-3.5 border border-slate-300 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-600 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inline Notes Edit Form */}
        {isEditingNotes && (
          <div className="p-4 bg-amber-50/70 border-b border-amber-200 space-y-2 animate-in fade-in duration-100">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                Customize Teacher Pedagogical Notes & Scope
              </span>
              <button onClick={() => setIsEditingNotes(false)} className="text-slate-500 hover:text-slate-700 text-xs">
                Cancel
              </button>
            </div>
            <textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              className="w-full text-xs p-3 border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
              rows={2}
              placeholder="Enter teacher notes and custom guidance for Omar..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditingNotes(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1.5 text-xs bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-md shadow-2xs"
              >
                Save Notes
              </button>
            </div>
          </div>
        )}

        {/* Status Callout Bar */}
        <div className="px-5 py-2.5 bg-slate-50 text-xs border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Decision Status:</span>
            {isConfirmed ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Confirmed — Actionable visual practice assigned to student dashboard.
              </span>
            ) : isDismissed ? (
              <span className="text-slate-600 font-medium">
                Dismissed — Logged as non-structural arithmetic slip.
              </span>
            ) : (
              <span className="text-amber-800 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-600" /> Awaiting Teacher Confirmation to unlock recommended practice.
              </span>
            )}
          </div>
          <span className="text-slate-500 font-mono text-[11px]">
            Recommended Intervention: Visual Bar Strips (halves, fourths, eighths)
          </span>
        </div>
      </div>

      {/* LONGITUDINAL VISUAL STORY (The Defining Interactive Timeline) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Longitudinal Progression Story</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow how the misconception emerged, repeated across assessments, was reviewed by teacher, and is improving through practice.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Click any event to inspect concise evidence
          </div>
        </div>

        {/* Signature Educational Pathway: Assessment → Repeated Mistake → Evidence → Teacher Verification → Intervention → Practice → Improvement */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase text-[10px] tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#0F5B46]" />
            <span>Pedagogical Journey:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 font-medium">
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Assessment</span>
            <span className="text-slate-400">→</span>
            <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">Repeated Mistake</span>
            <span className="text-slate-400">→</span>
            <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">Evidence</span>
            <span className="text-slate-400">→</span>
            <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">Teacher Verification</span>
            <span className="text-slate-400">→</span>
            <span className="bg-purple-50 text-purple-900 px-2 py-0.5 rounded border border-purple-200">Intervention</span>
            <span className="text-slate-400">→</span>
            <span className="bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded border border-indigo-200">Practice</span>
            <span className="text-slate-400">→</span>
            <span className="bg-emerald-100 text-emerald-950 font-bold px-2 py-0.5 rounded border border-emerald-300">Improvement</span>
          </div>
        </div>

        {/* 6-Node Horizontal Storyline:
            EXAM 1 (Emerging) → EXAM 2 (Repeated) → EXAM 3 (Repeated) → TEACHER REVIEW (Confirmed) → PRACTICE (Assigned) → EXAM 4 (Improving) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {timelineEvents.map((event, idx) => {
            const isSelected = activeEventId === event.id;

            return (
              <div
                key={event.id}
                onClick={() => setActiveEventId(event.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 relative group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono text-slate-400 font-medium">Step {idx + 1}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${event.badgeStyle}`}>
                      {event.subLabel}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                    {event.stageName}
                  </h4>

                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {event.date}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-800'}`}>
                    {isSelected ? '● Selected' : 'Inspect'}
                  </span>
                  {idx < timelineEvents.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SELECTED EVENT CONCISE EVIDENCE INSPECTOR */}
        {selectedEvent && (
          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 space-y-4 animate-in fade-in duration-100">
            {/* Inspector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {selectedEvent.stageName}: {selectedEvent.examTitle}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  (Question {selectedEvent.questionNumber})
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${selectedEvent.badgeStyle}`}>
                  {selectedEvent.subLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedEvent.date}</span>
                <span>•</span>
                <span>AI Confidence: {selectedEvent.aiConfidence}%</span>
              </div>
            </div>

            {/* Concise Evidence Grid (Matches user prompt example exactly) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
              {/* 1. MISTAKE */}
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                  Mistake
                </span>
                <p className="text-slate-900 font-semibold text-xs leading-snug">
                  {selectedEvent.mistake}
                </p>
                <span className="text-[11px] text-slate-500 block">
                  Concept: Fraction comparison
                </span>
              </div>

              {/* 2. EVIDENCE (Student vs Expected Answer + Visual Fraction Bar) */}
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                  Evidence Comparison
                </span>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between items-center text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded border border-rose-200">
                    <span>Student:</span>
                    <span>{selectedEvent.studentAnswer}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    <span>Expected:</span>
                    <span>{selectedEvent.expectedAnswer}</span>
                  </div>
                </div>

                {/* Visual Representation of 3/8 vs 5/8 */}
                {selectedEvent.denominatorMisconception && (
                  <div className="pt-1 border-t border-slate-100 space-y-1 text-[10px]">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Visual Slices (3/8 vs 5/8):</span>
                    </div>
                    {/* Visual Bar 3/8 */}
                    <div className="flex gap-0.5 h-2 w-full bg-slate-100 rounded overflow-hidden">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex-1 bg-rose-500" title="Selected by Omar (3 parts)" />
                      ))}
                      {[4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="flex-1 bg-slate-200" />
                      ))}
                    </div>
                    {/* Visual Bar 5/8 */}
                    <div className="flex gap-0.5 h-2 w-full bg-slate-100 rounded overflow-hidden">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex-1 bg-emerald-500" title="Expected: 5 parts of 8" />
                      ))}
                      {[6, 7, 8].map(i => (
                        <div key={i} className="flex-1 bg-slate-200" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. WHAT DID AI SUGGEST */}
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    AI Suggestion
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{selectedEvent.aiConfidence}% conf</span>
                </div>
                <p className="text-slate-800 text-xs leading-relaxed">
                  {selectedEvent.aiSuggested}
                </p>
                <span className="text-[10px] text-amber-900 font-medium block pt-0.5">
                  AI suggestion — teacher review required
                </span>
              </div>

              {/* 4. TEACHER DECISION & ASSIGNED ACTION */}
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-emerald-700" />
                  Teacher Decision & Action
                </span>
                <p className="text-slate-800 text-xs leading-snug">
                  <strong className="text-slate-900">Decision:</strong> {selectedEvent.teacherAction}
                </p>
                <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                  <strong className="text-slate-900">Assigned:</strong> {selectedEvent.actionAssigned}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* THE 8 CORE PEDAGOGICAL QUESTIONS (Visible at a Glance) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div 
          onClick={() => setShowPedagogicalQuestions(!showPedagogicalQuestions)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Pedagogical Diagnostic Summary (The 8 Key Questions)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct answers to what happened, recurring evidence, decisions, and measured student improvement.
            </p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            {showPedagogicalQuestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showPedagogicalQuestions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1 border-t border-slate-100 animate-in fade-in duration-100">
            {/* 1. What happened? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">1. What happened?</span>
              <p className="text-slate-800 font-medium">
                Inverse fraction comparison logic (assuming higher denominator means a larger fraction piece, or comparing numerators without denominator parity).
              </p>
            </div>

            {/* 2. When did it happen? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">2. When did it happen?</span>
              <p className="text-slate-800 font-medium">
                Across 3 consecutive assessments: Sept 28 (Exam 1), Oct 10 (Exam 2), and Oct 24 (Exam 3).
              </p>
            </div>

            {/* 3. Was the mistake repeated? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">3. Was mistake repeated?</span>
              <p className="text-slate-800 font-medium">
                Yes — 4 affected questions (Q4 on Exam 1; Q7 & Q9 on Exam 2; Q4 on Exam 3) showing identical structural confusion.
              </p>
            </div>

            {/* 4. What evidence supports it? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">4. What evidence supports it?</span>
              <p className="text-slate-800 font-mono text-[11px]">
                • Exam 1: 1/6 &gt; 1/4 (chose 1/6)<br/>
                • Exam 2: 2/8, 7/8, 4/8 ordered incorrectly<br/>
                • Exam 3: 3/8 chosen over 5/8
              </p>
            </div>

            {/* 5. What did AI suggest? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">5. What did AI suggest?</span>
              <p className="text-slate-800 font-medium">
                Flagged denominator misconception; recommended tactile/visual fraction bar strips with matching denominators.
              </p>
            </div>

            {/* 6. What did teacher decide? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">6. What did teacher decide?</span>
              <p className={`font-semibold ${isConfirmed ? 'text-emerald-800' : 'text-amber-800'}`}>
                {isConfirmed 
                  ? 'Confirmed as primary learning gap; personalized practice assigned.' 
                  : isDismissed 
                    ? 'Dismissed as isolated slip.' 
                    : 'Currently reviewing evidence before confirmation.'}
              </p>
            </div>

            {/* 7. What action was assigned? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">7. Action assigned?</span>
              <p className="text-slate-800 font-medium">
                5-question interactive Practice Lab with visual fraction strips comparing halves, fourths, and eighths.
              </p>
            </div>

            {/* 8. Did student improve? */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px] block">8. Did student improve?</span>
              <p className={`font-semibold ${practiceCompleted ? 'text-emerald-800' : 'text-blue-800'}`}>
                {practiceCompleted 
                  ? 'Yes! Mastery boosted to 74% (+30 pts). Projected 85%+ on Exam 4.' 
                  : 'In progress: Practice module awaiting completion on student dashboard.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            {isConfirmed 
              ? '✓ Gap confirmed & active on Omar Hassan\'s learning roadmap.' 
              : 'Review checkpoint: Confirm or dismiss this learning gap before publishing student results.'}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => navigate('/teacher/exams/exam-grade-4-fractions/grading')}
            className="h-8.5 px-3 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors"
          >
            Back to AI Grading
          </button>
          <button
            onClick={handleProceedToRedFlags}
            className="h-8.5 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Focus Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
