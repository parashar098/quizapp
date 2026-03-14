# QuizMaster - Interactive Quiz Platform

A modern, full-stack quiz application built with React, Vite, TailwindCSS, and Supabase. QuizMaster allows teachers to create and manage quizzes while students can take quizzes and view their results in real-time.

## Features

### For Teachers
- **Create Quizzes**: Build quizzes with multiple-choice questions
- **Manage Quizzes**: View, edit, and delete your created quizzes
- **Quiz Join Codes**: Each quiz gets a unique join code for easy access
- **Track Results**: View student performance and results
- **Dashboard Analytics**: See total quizzes, students, and attempts at a glance

### For Students
- **Browse Quizzes**: View all available quizzes
- **Take Quizzes**: Attempt quizzes with a countdown timer
- **Real-time Timer**: Auto-submit when time runs out
- **Instant Results**: See your score and correct answers immediately
- **Performance Tracking**: View your quiz history, average score, and best score

### UI/UX Features
- Modern, responsive design with TailwindCSS
- Smooth animations with Framer Motion
- Gradient buttons and glassmorphism cards
- Mobile-responsive layout
- Dark mode support ready
- Hover effects and micro-interactions

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

## Project Structure

```
quiz-master/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Sidebar.tsx         # Sidebar navigation
│   │   ├── QuizCard.tsx        # Quiz display card
│   │   ├── QuestionForm.tsx    # Question creation form
│   │   └── Timer.tsx           # Countdown timer
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   └── supabase.ts         # Supabase client and types
│   ├── pages/
│   │   ├── Landing.tsx         # Landing page
│   │   ├── Login.tsx           # Login page
│   │   ├── Signup.tsx          # Signup page
│   │   ├── TeacherDashboard.tsx # Teacher dashboard
│   │   └── StudentDashboard.tsx # Student dashboard
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## Database Schema

### Tables

#### `profiles`
- `id` (uuid, primary key, references auth.users)
- `name` (text)
- `role` (text: 'teacher' or 'student')
- `created_at` (timestamptz)

#### `quizzes`
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `teacher_id` (uuid, references profiles)
- `duration` (integer, in minutes)
- `join_code` (text, unique)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

#### `questions`
- `id` (uuid, primary key)
- `quiz_id` (uuid, references quizzes)
- `question_text` (text)
- `options` (jsonb, array of 4 options)
- `correct_answer` (integer, index 0-3)
- `order_index` (integer)
- `created_at` (timestamptz)

#### `results`
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `quiz_id` (uuid, references quizzes)
- `score` (integer)
- `total_questions` (integer)
- `answers` (jsonb)
- `submitted_at` (timestamptz)

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- A Supabase account (database is already configured)

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env` file is already configured with Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage Guide

### For Teachers

1. **Sign Up**: Create an account and select "Teacher" as your role
2. **Create Quiz**:
   - Click "Create Quiz" in the sidebar
   - Add quiz title, description, and duration
   - Add questions with 4 options each
   - Mark the correct answer for each question
   - Click "Create Quiz" when done
3. **Share**: Share the auto-generated join code with students
4. **View Results**: Check the "Results" tab to see student performance

### For Students

1. **Sign Up**: Create an account and select "Student" as your role
2. **Browse Quizzes**: View all available quizzes on the dashboard
3. **Start Quiz**: Click "Start Quiz" on any available quiz
4. **Take Quiz**:
   - Answer questions one by one
   - Use Next/Previous buttons to navigate
   - Submit when finished (or auto-submit when time runs out)
5. **View Results**: See your score and review correct answers

## Security Features

- **Row Level Security (RLS)**: All database tables have RLS policies
- **Role-based Access**: Teachers can only modify their own quizzes
- **Authentication**: Secure JWT-based authentication via Supabase
- **Data Validation**: Client and server-side validation

## Future Enhancements

- Real-time quiz sessions with Socket.io
- Leaderboard system
- Export results to CSV
- Question bank and quiz templates
- Image support in questions
- Multiple quiz types (true/false, fill-in-the-blank)
- Time-based quiz scheduling
- Quiz categories and tags
- Student progress analytics
- Email notifications

## License

MIT License - Feel free to use this project for learning or production use.
