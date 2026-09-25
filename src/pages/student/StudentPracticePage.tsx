import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Award, 
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const StudentPracticePage: React.FC = () => {
  const { 
    practiceQuestions, 
    practiceAnswers, 
    recordPracticeAnswer, 
    completePractice, 
    practiceCompleted,
    navigate,
    setScenarioStep 
  } = useLearnLens();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

  const currentQ = practiceQuestions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctOption;

  const handleSelect = (opt: 'A' | 'B') => {
    if (hasCheckedAnswer) return;
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setHasCheckedAnswer(true);
    recordPracticeAnswer(currentQ.id, selectedOption);
  };

  const handleNext = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasCheckedAnswer(false);
    } else {
      // Finished all 5 questions!
      completePractice();
      setScenarioStep(23); // Step 23: Student progress updates
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasCheckedAnswer(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Practice Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-0.5">
            <Brain className="w-3.5 h-3.5" />
            <span>Interactive Practice Lab</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Comparing Fractions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            5 quick questions to strengthen your fraction comparison mastery
          </p>
        </div>

        {/* Progress Tracker: e.g. 1 / 5 */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Progress</span>
          <span className="text-base font-bold text-blue-700 font-mono">
            {currentIndex + 1} / {practiceQuestions.length}
          </span>
        </div>
      </div>

      {/* Finished State Screen */}
      {practiceCompleted ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs border border-emerald-200">
            <Award className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Practice complete!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Super job, Omar! You just conquered comparing fractions. Your mastery score has updated on your progress radar.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 max-w-sm mx-auto text-xs text-emerald-950 font-medium space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-600">Skill practiced:</span>
              <strong className="text-emerald-900">Comparing Fractions</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Mastery improvement:</span>
              <strong className="text-emerald-700 font-mono text-sm">+30% (Now 74%)</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-emerald-200/60">
              <span className="text-slate-600">Next recommended action:</span>
              <span className="text-emerald-800 font-semibold">Continue practicing</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-2.5 pt-1">
            <button
              onClick={() => {
                setScenarioStep(23);
                navigate('/student/progress');
              }}
              className="h-9 px-4.5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs shadow-2xs transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>View Longitudinal Progress Chart</span>
            </button>

            <button
              onClick={handleRestart}
              className="h-9 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Practice</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / practiceQuestions.length) * 100}%` }}
            />
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Question prompt */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Question {currentQ.number} of {practiceQuestions.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {currentQ.prompt}
              </h2>
            </div>

            {/* Visual Options A vs B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A */}
              <div
                onClick={() => handleSelect('A')}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-3 ${
                  selectedOption === 'A'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                  {currentQ.optionA}
                </div>

                {/* Visual fraction bar representation */}
                <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-md w-full">
                  Visual clue: {currentQ.visualA}
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[11px] ${
                  selectedOption === 'A' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-400'
                }`}>
                  A
                </div>
              </div>

              {/* Option B */}
              <div
                onClick={() => handleSelect('B')}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-3 ${
                  selectedOption === 'B'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                  {currentQ.optionB}
                </div>

                {/* Visual fraction bar representation */}
                <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-md w-full">
                  Visual clue: {currentQ.visualB}
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[11px] ${
                  selectedOption === 'B' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-400'
                }`}>
                  B
                </div>
              </div>
            </div>

            {/* Constructive Feedback Box (after check) */}
            {hasCheckedAnswer && (
              <div className={`p-3.5 rounded-xl border animate-in fade-in duration-150 flex items-start gap-2.5 ${
                isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    {isCorrect ? 'Spot on!' : 'Not quite, but here is the key concept:'}
                  </div>
                  <p className="text-xs mt-0.5 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-1 flex justify-end gap-2.5">
              {!hasCheckedAnswer ? (
                <button
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className={`h-9 px-5 rounded-lg font-semibold text-xs transition-all shadow-2xs ${
                    selectedOption 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="h-9 px-5 bg-[#0F5B46] hover:bg-[#0c4837] text-white font-semibold rounded-lg text-xs shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>{currentIndex < practiceQuestions.length - 1 ? 'Next Question' : 'Complete Practice'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
