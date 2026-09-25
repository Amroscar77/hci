export type Role = 'teacher' | 'student';
export type Language = 'en' | 'de';

export type ExamStatus = 
  | 'ready_to_upload'
  | 'uploaded'
  | 'ocr_pending'
  | 'ocr_verified'
  | 'ai_graded'
  | 'teacher_reviewed'
  | 'published';

export interface ExamQuestion {
  id: string;
  number: number;
  type: 'multiplication' | 'fraction' | 'word_problem';
  prompt: string;
  maxScore: number;
  expectedAnswer: string;
  studentHandwrittenText: string;
  detectedAnswer: string; // Initially may have OCR error
  editedAnswer: string; // Teacher verified answer
  ocrConfidence: number; // 0-100%
  ocrHasMistake: boolean; // Flag if initial OCR was mistaken (Q4)
  aiEvaluation: 'correct' | 'incorrect' | 'partial';
  aiSuggestedScore: number;
  confirmedScore: number;
  aiSuggestedReason: string;
  aiConfidence: number;
  conceptName: string;
}

export interface StudentExam {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  grade: number;
  subject: string;
  submissionDate: string;
  status: ExamStatus;
  questions: ExamQuestion[];
  finalGradePercent: number; // 72%
  teacherNotes?: string;
  strengths: string[];
  needsPractice: string[];
}

export interface LearningGapEvidence {
  examName: string;
  date: string;
  questionNumber: number;
  mistakeDescription: string;
  studentAnswer: string;
  expectedAnswer: string;
}

export interface LearningGap {
  id: string;
  concept: string;
  status: 'pending' | 'confirmed' | 'dismissed';
  severity: 'emerging' | 'repeated' | 'improving';
  aiConfidence: number;
  affectedQuestions: number[];
  evidence: LearningGapEvidence[];
  teacherNotes: string;
  recommendedAction: string;
}

export interface RedFlagItem {
  id: string;
  studentName: string;
  grade: number;
  concept: string;
  assessmentCount: number;
  aiConfidence: number;
  status: 'pending' | 'confirmed' | 'dismissed';
  trend: string;
  reason: string;
  affectedQuestions: number[];
}

export interface NotificationItem {
  id: string;
  recipient: 'teacher' | 'student';
  title: string;
  message: string;
  date: string;
  read: boolean;
  targetRoute: string;
  type: 'review' | 'feedback' | 'practice' | 'progress' | 'red_flag';
}

export interface ConceptProgress {
  concept: string;
  mastery: number; // 0-100%
  status: 'strong' | 'developing' | 'needs_practice';
  trend: 'up' | 'stable' | 'down';
}

export interface PracticeQuestion {
  id: string;
  number: number;
  prompt: string;
  visualA: string;
  visualB: string;
  optionA: string;
  optionB: string;
  correctOption: 'A' | 'B' | 'equal';
  explanation: string;
}
