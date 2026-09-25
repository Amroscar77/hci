/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LearnLensProvider, useLearnLens } from './context/LearnLensContext';
import { AppSidebar } from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';
import { EvaluatorTourModal } from './components/common/EvaluatorTourModal';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherExamsList } from './pages/teacher/TeacherExamsList';
import { OcrVerificationPage } from './pages/teacher/OcrVerificationPage';
import { AiGradingPage } from './pages/teacher/AiGradingPage';
import { LearningGapsPage } from './pages/teacher/LearningGapsPage';
import { RedFlagsPage } from './pages/teacher/RedFlagsPage';
import { FeedbackBuilderPage } from './pages/teacher/FeedbackBuilderPage';
import { StudentProfilePage } from './pages/teacher/StudentProfilePage';
import { TeacherNotificationsPage } from './pages/teacher/TeacherNotificationsPage';
import { TeacherSettingsPage } from './pages/teacher/TeacherSettingsPage';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentUploadPage } from './pages/student/StudentUploadPage';
import { StudentExamResultPage } from './pages/student/StudentExamResultPage';
import { StudentLearningJourneyPage } from './pages/student/StudentLearningJourneyPage';
import { StudentPracticePage } from './pages/student/StudentPracticePage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentProgressPage } from './pages/student/StudentProgressPage';
import { StudentMyProfilePage } from './pages/student/StudentMyProfilePage';

function RouterView() {
  const { currentRoute } = useLearnLens();

  if (currentRoute === '/welcome') {
    return <WelcomePage />;
  }

  // Teacher Routes
  if (currentRoute === '/teacher/dashboard') {
    return <TeacherDashboard />;
  }
  if (currentRoute === '/teacher/exams') {
    return <TeacherExamsList />;
  }
  if (currentRoute.startsWith('/teacher/exams/') && currentRoute.endsWith('/ocr')) {
    return <OcrVerificationPage />;
  }
  if (currentRoute.startsWith('/teacher/exams/') && currentRoute.endsWith('/grading')) {
    return <AiGradingPage />;
  }
  if (currentRoute === '/teacher/learning-gaps') {
    return <LearningGapsPage />;
  }
  if (currentRoute === '/teacher/red-flags') {
    return <RedFlagsPage />;
  }
  if (currentRoute === '/teacher/feedback') {
    return <FeedbackBuilderPage />;
  }
  if (currentRoute === '/teacher/notifications') {
    return <TeacherNotificationsPage />;
  }
  if (currentRoute === '/teacher/settings') {
    return <TeacherSettingsPage />;
  }
  if (currentRoute.startsWith('/teacher/students')) {
    return <StudentProfilePage />;
  }

  // Student Routes
  if (currentRoute === '/student/dashboard') {
    return <StudentDashboard />;
  }
  if (currentRoute === '/student/upload') {
    return <StudentUploadPage />;
  }
  if (currentRoute.startsWith('/student/exams')) {
    return <StudentExamResultPage />;
  }
  if (currentRoute === '/student/learning-journey') {
    return <StudentLearningJourneyPage />;
  }
  if (currentRoute === '/student/practice') {
    return <StudentPracticePage />;
  }
  if (currentRoute === '/student/notifications') {
    return <StudentNotificationsPage />;
  }
  if (currentRoute === '/student/progress') {
    return <StudentProgressPage />;
  }
  if (currentRoute === '/student/profile') {
    return <StudentMyProfilePage />;
  }

  return <WelcomePage />;
}

function MainShell() {
  const { currentRoute } = useLearnLens();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // If on welcome page, render welcome page directly without shell
  if (currentRoute === '/welcome') {
    return (
      <>
        <WelcomePage />
        <EvaluatorTourModal 
          isOpen={isTourModalOpen} 
          onClose={() => setIsTourModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Left Sidebar */}
      <AppSidebar
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
        onOpenEvaluatorTour={() => setIsTourModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AppHeader
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          onOpenEvaluatorTour={() => setIsTourModalOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 pb-16">
          <RouterView />
        </main>
      </div>

      {/* Evaluator Tour Modal (cleanly hidden behind button) */}
      <EvaluatorTourModal 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LearnLensProvider>
      <MainShell />
    </LearnLensProvider>
  );
}
