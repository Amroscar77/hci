import React from 'react';
import { Settings, ShieldCheck, Bell, Globe, Sparkles } from 'lucide-react';
import { useLearnLens } from '../../context/LearnLensContext';

export const TeacherSettingsPage: React.FC = () => {
  const { language, setLanguage, t } = useLearnLens();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t.navSettings}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure assessment scoring tolerances, OCR recognition thresholds, and language
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs sm:text-sm">
        {/* Language setting */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900">Interface Language / Sprache</div>
            <p className="text-xs text-slate-500 mt-0.5">Toggle between English and German</p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              English (EN)
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                language === 'de' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Deutsch (DE)
            </button>
          </div>
        </div>

        {/* Human in the loop setting */}
        <div className="p-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900">Teacher Checkpoint Enforcement</div>
            <p className="text-xs text-slate-500 mt-0.5">Require explicit teacher approval before publishing any AI grade</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Enforced (Core Policy)
          </span>
        </div>

        {/* OCR Confidence threshold */}
        <div className="p-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900">OCR Review Trigger Threshold</div>
            <p className="text-xs text-slate-500 mt-0.5">Highlight handwritten answers with recognition confidence below</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            &lt; 85% Confidence
          </span>
        </div>
      </div>
    </div>
  );
};
