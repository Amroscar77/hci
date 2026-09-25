import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Role, 
  Language, 
  StudentExam, 
  LearningGap, 
  RedFlagItem, 
  NotificationItem, 
  ConceptProgress,
  PracticeQuestion
} from '../types/learnlens';
import { 
  INITIAL_EXAM, 
  INITIAL_LEARNING_GAPS, 
  INITIAL_RED_FLAGS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CONCEPT_PROGRESS,
  PRACTICE_QUESTIONS
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface LearnLensContextType {
  role: Role;
  setRole: (r: Role) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: typeof translations['en'];
  currentRoute: string;
  navigate: (route: string) => void;

  // Exam state
  exam: StudentExam;
  updateOcrQuestion: (questionId: string, newAnswer: string) => void;
  approveOcr: () => void;
  updateQuestionScore: (questionId: string, newScore: number) => void;
  confirmExamGrade: () => void;
  uploadStudentExam: () => void;

  // Learning Gaps state
  learningGaps: LearningGap[];
  confirmLearningGap: (gapId: string) => void;
  dismissLearningGap: (gapId: string) => void;
  editLearningGapNotes: (gapId: string, notes: string) => void;

  // Red Flags state
  redFlags: RedFlagItem[];
  confirmRedFlag: (flagId: string) => void;
  dismissRedFlag: (flagId: string) => void;

  // Feedback state
  feedbackMessage: string;
  setFeedbackMessage: (msg: string) => void;
  sendFeedbackToStudent: () => void;

  // Notifications state
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Progress & Practice state
  conceptProgress: ConceptProgress[];
  practiceQuestions: PracticeQuestion[];
  practiceCompleted: boolean;
  practiceAnswers: Record<string, string>;
  recordPracticeAnswer: (questionId: string, answer: string) => void;
  completePractice: () => void;

  // Scenario Guided Tracker
  scenarioStep: number;
  setScenarioStep: (step: number) => void;
  advanceScenario: () => void;
  resetAll: () => void;
}

const LearnLensContext = createContext<LearnLensContextType | undefined>(undefined);

export const LearnLensProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('teacher');
  const [language, setLanguage] = useState<Language>('en');
  const [currentRoute, setCurrentRoute] = useState<string>('/welcome');

  // Exam state
  const [exam, setExam] = useState<StudentExam>(INITIAL_EXAM);

  // Learning Gaps
  const [learningGaps, setLearningGaps] = useState<LearningGap[]>(INITIAL_LEARNING_GAPS);

  // Red Flags
  const [redFlags, setRedFlags] = useState<RedFlagItem[]>(INITIAL_RED_FLAGS);

  // Personalized Feedback message
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    "You're doing well with multiplication. Let's practice comparing fractions with different denominators."
  );

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Student Progress
  const [conceptProgress, setConceptProgress] = useState<ConceptProgress[]>(INITIAL_CONCEPT_PROGRESS);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  // Demo Scenario Step (1 to 24)
  const [scenarioStep, setScenarioStep] = useState<number>(1);

  const t = translations[language];

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Upload Student Exam
  const uploadStudentExam = () => {
    setExam(prev => ({
      ...prev,
      status: 'ocr_pending',
    }));
    // Add notification for teacher
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipient: 'teacher',
      title: 'New Student Submission',
      message: 'Omar Hassan submitted "Fractions & Word Problems". Ready for OCR verification.',
      date: 'Just now',
      read: false,
      targetRoute: `/teacher/exams/${exam.id}/ocr`,
      type: 'review',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 2. OCR Question Edit
  const updateOcrQuestion = (questionId: string, newAnswer: string) => {
    setExam(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, editedAnswer: newAnswer } : q
      ),
    }));
  };

  // 3. Approve OCR
  const approveOcr = () => {
    setExam(prev => ({
      ...prev,
      status: 'ocr_verified',
    }));
    navigate(`/teacher/exams/${exam.id}/grading`);
  };

  // 4. Update Question Score in AI Grading
  const updateQuestionScore = (questionId: string, newScore: number) => {
    setExam(prev => {
      const updatedQuestions = prev.questions.map(q =>
        q.id === questionId ? { ...q, confirmedScore: newScore } : q
      );
      const totalEarned = updatedQuestions.reduce((acc, curr) => acc + curr.confirmedScore, 0);
      const totalMax = updatedQuestions.reduce((acc, curr) => acc + curr.maxScore, 0);
      const finalPercent = Math.round((totalEarned / totalMax) * 100);

      return {
        ...prev,
        questions: updatedQuestions,
        finalGradePercent: finalPercent,
      };
    });
  };

  // 5. Confirm AI Grade
  const confirmExamGrade = () => {
    setExam(prev => ({
      ...prev,
      status: 'ai_graded',
      finalGradePercent: 72, // Confirmed 72%
    }));
    navigate('/teacher/learning-gaps');
  };

  // 6. Confirm / Dismiss Learning Gap
  const confirmLearningGap = (gapId: string) => {
    setLearningGaps(prev =>
      prev.map(g => (g.id === gapId ? { ...g, status: 'confirmed' } : g))
    );
  };

  const dismissLearningGap = (gapId: string) => {
    setLearningGaps(prev =>
      prev.map(g => (g.id === gapId ? { ...g, status: 'dismissed' } : g))
    );
  };

  const editLearningGapNotes = (gapId: string, notes: string) => {
    setLearningGaps(prev =>
      prev.map(g => (g.id === gapId ? { ...g, teacherNotes: notes } : g))
    );
  };

  // 7. Confirm / Dismiss Red Flag
  const confirmRedFlag = (flagId: string) => {
    setRedFlags(prev =>
      prev.map(f => (f.id === flagId ? { ...f, status: 'confirmed' } : f))
    );
  };

  const dismissRedFlag = (flagId: string) => {
    setRedFlags(prev =>
      prev.map(f => (f.id === flagId ? { ...f, status: 'dismissed' } : f))
    );
  };

  // 8. Publish & Send Feedback
  const sendFeedbackToStudent = () => {
    setExam(prev => ({
      ...prev,
      status: 'published',
      teacherNotes: feedbackMessage,
    }));

    // Generate student notification
    const studentNotif: NotificationItem = {
      id: `notif-student-${Date.now()}`,
      recipient: 'student',
      title: 'Exam Result Confirmed',
      message: `Ms. Sarah verified your Fractions & Word Problems exam. Final score: 72%. Teacher feedback is available!`,
      date: 'Just now',
      read: false,
      targetRoute: `/student/exams/${exam.id}`,
      type: 'feedback',
    };

    const practiceNotif: NotificationItem = {
      id: `notif-practice-${Date.now()}`,
      recipient: 'student',
      title: 'Personalized Practice Recommendation',
      message: 'Practice comparing fractions with different denominators.',
      date: 'Just now',
      read: false,
      targetRoute: '/student/practice',
      type: 'practice',
    };

    setNotifications(prev => [studentNotif, practiceNotif, ...prev]);
  };

  // 9. Notification read
  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 10. Practice Activity
  const recordPracticeAnswer = (questionId: string, answer: string) => {
    setPracticeAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const completePractice = () => {
    setPracticeCompleted(true);

    // Boost Fraction Comparison mastery on student progress!
    setConceptProgress(prev =>
      prev.map(c => {
        if (c.concept === 'Fraction Comparison') {
          return {
            ...c,
            mastery: 74, // boosted from 44% to 74%
            status: 'developing',
            trend: 'up',
          };
        }
        return c;
      })
    );

    // Add progress notification
    const progNotif: NotificationItem = {
      id: `notif-prog-${Date.now()}`,
      recipient: 'student',
      title: 'Concept Mastery Improving!',
      message: 'Great work! Your Fraction Comparison understanding improved to 74%.',
      date: 'Just now',
      read: false,
      targetRoute: '/student/progress',
      type: 'progress',
    };
    setNotifications(prev => [progNotif, ...prev]);
  };

  // Advance Guided Scenario
  const advanceScenario = () => {
    setScenarioStep(prev => Math.min(24, prev + 1));
  };

  // Reset demo to initial clean state
  const resetAll = () => {
    setRole('teacher');
    setExam(INITIAL_EXAM);
    setLearningGaps(INITIAL_LEARNING_GAPS);
    setRedFlags(INITIAL_RED_FLAGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setConceptProgress(INITIAL_CONCEPT_PROGRESS);
    setPracticeAnswers({});
    setPracticeCompleted(false);
    setScenarioStep(1);
    setFeedbackMessage("You're doing well with multiplication. Let's practice comparing fractions with different denominators.");
    setCurrentRoute('/welcome');
  };

  return (
    <LearnLensContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        currentRoute,
        navigate,
        exam,
        updateOcrQuestion,
        approveOcr,
        updateQuestionScore,
        confirmExamGrade,
        uploadStudentExam,
        learningGaps,
        confirmLearningGap,
        dismissLearningGap,
        editLearningGapNotes,
        redFlags,
        confirmRedFlag,
        dismissRedFlag,
        feedbackMessage,
        setFeedbackMessage,
        sendFeedbackToStudent,
        notifications,
        markNotificationRead,
        conceptProgress,
        practiceQuestions: PRACTICE_QUESTIONS,
        practiceCompleted,
        practiceAnswers,
        recordPracticeAnswer,
        completePractice,
        scenarioStep,
        setScenarioStep,
        advanceScenario,
        resetAll,
      }}
    >
      {children}
    </LearnLensContext.Provider>
  );
};

export const useLearnLens = (): LearnLensContextType => {
  const context = useContext(LearnLensContext);
  if (!context) {
    throw new Error('useLearnLens must be used within a LearnLensProvider');
  }
  return context;
};
