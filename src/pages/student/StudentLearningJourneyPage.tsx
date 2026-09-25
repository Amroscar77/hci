import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smile, 
  Heart, 
  Lightbulb, 
  Star, 
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  BookOpen
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

interface StudentJourneyStep {
  id: string;
  stepNumber: number;
  stageName: string;
  badgeText: string;
  badgeStyle: string;
  date: string;
  title: string;
  whatHappened: string;
  encouragement: string;
  teacherTip: string;
  isCompleted: boolean;
  isActive: boolean;
  visualComparison?: {
    labelA: string;
    partsA: number;
    labelB: string;
    partsB: number;
    totalParts: number;
    winner: string;
  };
}

export const StudentLearningJourneyPage: React.FC = () => {
  const { navigate, setScenarioStep, practiceCompleted } = useLearnLens();
  const [activeStepId, setActiveStepId] = useState<string>('step-teacher-noticed');

  // The 5-step child-friendly progression requested:
  // Started → Practiced → Your teacher noticed → Practiced again → Improving
  const steps: StudentJourneyStep[] = [
    {
      id: 'step-started',
      stepNumber: 1,
      stageName: 'Started',
      badgeText: 'Sept 28',
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
      date: 'Unit Fractions Quiz',
      title: 'Your First Step with Fractions',
      whatHappened: 'You explored unit fractions for the very first time! When comparing 1/6 and 1/4, you wondered if the number 6 meant a bigger slice.',
      encouragement: 'Every great mathematician starts by exploring new ideas! You took your first bold steps.',
      teacherTip: 'Think of sharing a giant cookie: if you share with 4 friends, your slice is bigger than if you have to share with 6!',
      isCompleted: true,
      isActive: false,
      visualComparison: {
        labelA: '1/6 (smaller slice)',
        partsA: 1,
        labelB: '1/4 (bigger slice)',
        partsB: 1,
        totalParts: 6,
        winner: '1/4 is bigger than 1/6 because fewer cuts make bigger slices!',
      },
    },
    {
      id: 'step-practiced',
      stepNumber: 2,
      stageName: 'Practiced',
      badgeText: 'Oct 10',
      badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300',
      date: 'Midterm Assessment',
      title: 'Practicing Slices on Question 7',
      whatHappened: 'You solved fraction problems and tried ordering different fraction amounts (2/8, 4/8, and 7/8).',
      encouragement: 'You showed great effort writing down your calculations on scratch paper!',
      teacherTip: 'Notice the bottom number (8) stays the same for all of them! That means all slices are identical in size.',
      isCompleted: true,
      isActive: false,
      visualComparison: {
        labelA: '2/8 (2 slices)',
        partsA: 2,
        labelB: '7/8 (7 slices)',
        partsB: 7,
        totalParts: 8,
        winner: 'When all slices are eighths, 7 slices is way more than 2 slices!',
      },
    },
    {
      id: 'step-teacher-noticed',
      stepNumber: 3,
      stageName: 'Your teacher noticed',
      badgeText: 'Oct 24',
      badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
      date: 'Fractions & Word Problems',
      title: 'Ms. Sarah Spotted Your Secret to Level Up!',
      whatHappened: 'On Question 4, you compared 3/8 and 5/8. Ms. Sarah saw that with one quick visual trick, fractions will become super easy for you!',
      encouragement: 'Ms. Sarah made a personalized activity just for you to make comparing fractions fun and natural.',
      teacherTip: 'Omar, you were already a superstar with multiplication! Seeing fractions as visual slices will unlock your next superpower.',
      isCompleted: true,
      isActive: !practiceCompleted,
      visualComparison: {
        labelA: 'Your Choice: 3/8',
        partsA: 3,
        labelB: 'Expected: 5/8',
        partsB: 5,
        totalParts: 8,
        winner: '5 slices of an 8-slice pie is more delicious pizza than 3 slices!',
      },
    },
    {
      id: 'step-practiced-again',
      stepNumber: 4,
      stageName: 'Practiced again',
      badgeText: practiceCompleted ? 'Completed' : 'Ready Now',
      badgeStyle: practiceCompleted 
        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold' 
        : 'bg-indigo-100 text-indigo-800 border-indigo-200 font-bold',
      date: 'Visual Slices Activity',
      title: 'Fun Practice with Fraction Strips',
      whatHappened: practiceCompleted 
        ? 'You crushed all 5 interactive challenges! You lined up fraction bars and saw how eighths compare.' 
        : 'A 5-minute visual mini-game where you compare slices with colors and pictures!',
      encouragement: practiceCompleted 
        ? 'Awesome job! You earned the "Fraction Explorer" star badge!' 
        : 'No timers, no pressure — just colorful fraction bars to build your confidence.',
      teacherTip: 'Always check if the denominator (bottom number) is the same. If it is, just count the slices on top!',
      isCompleted: practiceCompleted,
      isActive: !practiceCompleted,
      visualComparison: {
        labelA: 'Visual Strip A (3/8)',
        partsA: 3,
        labelB: 'Visual Strip B (5/8)',
        partsB: 5,
        totalParts: 8,
        winner: 'Comparing fraction strips visually makes the answer obvious!',
      },
    },
    {
      id: 'step-improving',
      stepNumber: 5,
      stageName: 'Improving',
      badgeText: 'Upcoming',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      date: 'Next Quiz (Exam 4)',
      title: 'Confidence and Mastery Ahead!',
      whatHappened: 'Your fraction comparison understanding is projected to soar above 85% on Exam 4.',
      encouragement: 'You turned a tricky topic into a real strength! That is what real learning is all about.',
      teacherTip: 'Keep this wonderful curiosity, Omar. You are doing fantastic work!',
      isCompleted: practiceCompleted,
      isActive: practiceCompleted,
    },
  ];

  const selectedStep = steps.find(s => s.id === activeStepId) || steps[2];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Friendly Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/50 border border-emerald-400/30 text-emerald-100 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-emerald-300" />
          <span>My Personal Learning Roadmap</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          How My Fraction Skills Are Growing
        </h1>

        <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
          "Every mistake is just a clue that helps your brain grow! Here is your journey from your first quiz to mastering fraction comparison."
        </p>

        {/* Quick status banner */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-200 font-medium">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Student: <strong>Omar Hassan</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200 font-medium">
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <span>Teacher Guide: <strong>Ms. Sarah</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Status: <strong>{practiceCompleted ? 'Practice Completed • Score Climbed to 74%!' : 'Ready for Visual Practice'}</strong></span>
          </div>
        </div>
      </div>

      {/* 5-Step Child-Friendly Longitudinal Story
          Started → Practiced → Your teacher noticed → Practiced again → Improving */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>5-Step Learning Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any step below to review the concept progression and teacher guidance.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Step {selectedStep.stepNumber} of 5 selected
          </span>
        </div>

        {/* Step Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => {
            const isSelected = activeStepId === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-slate-400 font-semibold">#{step.stepNumber}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${step.badgeStyle}`}>
                      {step.badgeText}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                    {step.stageName}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {step.date}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className={`font-semibold ${isSelected ? 'text-emerald-800' : 'text-slate-500 group-hover:text-slate-800'}`}>
                    {isSelected ? '● Reading' : 'Tap to read'}
                  </span>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SELECTED STEP DETAIL CARD */}
        {selectedStep && (
          <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 animate-in fade-in duration-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded border border-emerald-200">
                  Step {selectedStep.stepNumber}: {selectedStep.stageName}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {selectedStep.date}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Keep growing!</span>
              </div>
            </div>

            {/* Story & Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: What happened & Encouragement */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {selectedStep.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedStep.whatHappened}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Encouragement for Omar</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedStep.encouragement}
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Teacher Tip from Ms. Sarah</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    "{selectedStep.teacherTip}"
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Slices Comparison Widget */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                      Visual Fraction Strips
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Pizza Slice Model</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Look at how colored slices compare when the whole pie is divided equally into 8 parts:
                  </p>

                  {/* 3/8 Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-rose-700">3 Slices (3/8)</span>
                      <span className="text-slate-400 font-mono">3 out of 8</span>
                    </div>
                    <div className="grid grid-cols-8 gap-1 h-6 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i} 
                          className="bg-rose-400 hover:bg-rose-500 rounded flex items-center justify-center text-[10px] text-white font-bold transition-all"
                          title="1/8 slice"
                        >
                          1/8
                        </div>
                      ))}
                      {[4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-slate-200/60 rounded flex items-center justify-center text-[9px] text-slate-400" />
                      ))}
                    </div>
                  </div>

                  {/* 5/8 Bar */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-800">5 Slices (5/8) — Winner!</span>
                      <span className="text-emerald-700 font-mono">5 out of 8</span>
                    </div>
                    <div className="grid grid-cols-8 gap-1 h-6 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div 
                          key={i} 
                          className="bg-emerald-500 hover:bg-emerald-600 rounded flex items-center justify-center text-[10px] text-white font-bold transition-all shadow-2xs"
                          title="1/8 slice"
                        >
                          1/8
                        </div>
                      ))}
                      {[6, 7, 8].map(i => (
                        <div key={i} className="bg-slate-200/60 rounded flex items-center justify-center text-[9px] text-slate-400" />
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 font-medium">
                    ✨ <strong>The Secret:</strong> Since both fractions have 8 on the bottom, all slices are the exact same size. 5 slices will always be more than 3 slices!
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center font-mono">
                  Visual learning helps your brain remember longer than memorizing rules!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALL TO ACTION BOX (Actionable Next Step) */}
        <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Recommended Next Step</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {practiceCompleted 
                ? 'Practice Lab Completed' 
                : 'Practice Comparing Fractions with Visual Slices'}
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              {practiceCompleted 
                ? 'Your mastery score updated to 74% (+30 points!). View your longitudinal growth report to inspect progress.' 
                : 'A quick 5-question visual activity designed by Ms. Sarah to boost your fraction understanding.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {practiceCompleted ? (
              <button
                onClick={() => {
                  setScenarioStep(22);
                  navigate('/student/progress');
                }}
                className="h-8.5 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Growth Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setScenarioStep(21);
                  navigate('/student/practice');
                }}
                className="h-8.5 px-4 bg-[#0F5B46] hover:bg-[#0c4837] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Start Practice Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
