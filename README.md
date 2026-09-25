# LearnLens

**AI-Powered Personalized Assessment and Learning Gap Detection for Children**

LearnLens is a web-based Human–Computer Interaction project developed for **CSEN909 – Human Computer Interaction** at the **German University in Cairo (GUC)**.

The system explores a human-in-the-loop workflow for AI-assisted educational assessment: handwritten exam submission is converted into text, reviewed by a teacher, graded with AI assistance, confirmed by the teacher, and then used to identify recurring learning gaps and provide personalized learning support.

> **Important:** AI outputs are suggestions only. The teacher remains the final authority for OCR corrections, grades, feedback, and learning-gap decisions.

## Project Goals

LearnLens is designed to help teachers:

- Review and correct OCR-extracted student answers.
- Inspect AI-assisted grading against an expected answer or grading key.
- Confirm or override AI grading decisions.
- Identify recurring mistakes across multiple assessments.
- Review evidence for potential learning gaps.
- Confirm, edit, or dismiss suggested learning gaps.
- Provide personalized feedback and targeted next steps.

It also gives students a child-friendly way to:

- View teacher-confirmed results.
- Understand strengths and areas for improvement.
- Follow personalized next steps.
- Practice targeted concepts.
- Track progress across assessments.

## Core Workflow

```text
Student Uploads Exam
        ↓
OCR / Text Extraction
        ↓
Teacher Verifies Extracted Text
        ↓
AI-Assisted Grading
        ↓
Teacher Confirms / Overrides Grade
        ↓
Learning Gap Detection
        ↓
Teacher Confirms / Edits / Dismisses Gap
        ↓
Personalized Feedback
        ↓
Student Views Results & Practice
```

## Signature Feature: Learning Gap Journey

The main original interaction in LearnLens connects evidence across assessments instead of treating every exam as an isolated grading event.

The system can surface a potential learning gap from recurring mistakes. The teacher can then:

1. Review the supporting evidence.
2. Confirm the learning gap.
3. Edit its notes or scope.
4. Dismiss the suggestion if the evidence is insufficient.
5. Use the confirmed gap to guide personalized feedback and targeted practice.

This is intentionally a **teacher-reviewed learning-gap workflow**, not an automatic diagnosis.

## Human-in-the-Loop Design

LearnLens follows a human-in-the-loop approach throughout the assessment process.

### Teacher authority

The teacher can:

- Correct OCR results.
- Inspect the verified student answer.
- Compare the answer with the expected answer.
- Review the AI grading suggestion.
- Confirm or override the final grade.
- Review recurring-mistake evidence.
- Confirm, edit, or dismiss learning-gap suggestions.
- Create or adjust personalized feedback.

The interface explicitly communicates that AI suggestions require teacher review.

## Main Interfaces

The prototype includes the following major areas:

- **Teacher Dashboard** – assessment overview, KPIs, and review queue.
- **OCR Workspace** – scanned handwriting, extracted text, confidence information, and correction controls.
- **AI Grading Workspace** – verified student answer, expected answer, AI suggestion, and teacher decision.
- **Learning Gap Journey** – recurring-mistake evidence and teacher-controlled learning-gap confirmation.
- **Feedback Composer** – personalized feedback and next steps.
- **Student Portal** – teacher-certified results, strengths, weaknesses, feedback, and targeted practice.
- **Progress View** – longitudinal progress across assessments.

## Technology

The repository contains the front-end implementation/prototype of LearnLens.

Current project structure includes:

```text
hci/
├── src/
├── index.html
├── package.json
├── bun.lock
├── vite.config.ts
├── tsconfig.json
├── metadata.json
├── .env.example
├── .gitignore
└── README.md
```

The project uses a **Vite-based web development setup**. Vite provides the standard development, production-build, and local-preview workflow used by many Vite projects. See the official Vite documentation for details.

## Getting Started

### Prerequisites

Install:

- Node.js
- Bun (recommended because this repository contains `bun.lock`)

### 1. Clone the repository

```bash
git clone https://github.com/Amroscar77/hci.git
cd hci
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

Alternatively, if you prefer npm:

```bash
npm install
```

### 3. Configure environment variables

If the application requires environment variables, copy the example file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Only add local development values to `.env`. Do not commit secrets.

### 4. Start the development server

Using the package scripts configured in the project:

```bash
bun run dev
```

or:

```bash
npm run dev
```

The terminal will display the local development URL.

### 5. Create a production build

```bash
bun run build
```

or:

```bash
npm run build
```

### 6. Preview the production build locally

```bash
bun run preview
```

or:

```bash
npm run preview
```

> If the project's `package.json` scripts have been changed, use the scripts currently defined there.

## AI / Backend Note

For the course prototype, a fully deployed LLM backend is **not required**. AI grading and learning-gap responses may therefore be mocked or simulated for demonstration purposes.

The important interaction is the human-in-the-loop workflow: the interface should make it clear that AI-generated suggestions are reviewed and controlled by the teacher.

## Academic Context

**Course:** CSEN909 – Human Computer Interaction  
**University:** German University in Cairo (GUC)  
**Project:** AI-Powered Personalized Assessment and Learning Gap Detection for Children  
**Academic Year:** Winter 2026

### Team

| Student | ID | Tutorial |
|---|---|---|
| Ahmed Khalid Mohammed | 58-1379 | T-12 |
| Yehia Wael Raafat | 58-5798 | T-25 |
| Haytham Hesham | 55-11390 | T-07 |
| Amr Elsayed | 58-13562 | T-07 |

## Repository

GitHub repository:

https://github.com/Amroscar77/hci

## Project Documentation

The repository contains the implementation/prototype used to support the LearnLens HCI project. The accompanying milestone documentation describes the problem, existing assessment/grading approaches, the identified design gap, target audience, and the proposed Learning Gap Journey.

## Development Notes

When extending the prototype:

- Preserve the teacher-as-final-authority interaction.
- Avoid presenting AI suggestions as automatically correct.
- Keep OCR correction and AI grading visibly separate.
- Show evidence when suggesting recurring learning gaps.
- Allow teachers to confirm, edit, or dismiss learning-gap suggestions.
- Keep student-facing feedback understandable and actionable.
- Avoid storing API keys or other secrets in the repository.

## License

This repository is an academic project. No open-source license is currently specified.
