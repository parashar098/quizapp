# QuizMaster Platform

A full-stack quiz management platform where teachers create and manage quizzes, students attempt quizzes with a secure timed flow, and admins monitor users and analytics.
<img width="1878" height="823" alt="image" src="https://github.com/user-attachments/assets/884bc2ec-326c-45ca-adbf-6847e9e9bc66" /><img width="1882" height="826" alt="image" src="https://github.com/user-attachments/assets/87886ee6-4b8e-40d6-9d91-03f5985dfed3" />



## Description

QuizMaster is a production-style MERN application focused on role-based quiz workflows.
It provides separate dashboards and permissions for admin, teacher, and student users, includes secure JWT authentication, attempt monitoring (including tab-switch violations), and reporting endpoints for analytics.

## Features ✨

- Role-based authentication and authorization (admin, teacher, student)
- Teacher quiz lifecycle: create, update, publish, delete
- Student quiz attempt workflow: join by code, start, submit, timed attempts
- Attempt integrity tracking with violation recording
- Result history for students and quiz-level performance tracking
- Admin controls for user management and account actions
- Login history auditing and analytics reporting
- Modern responsive React UI with reusable component architecture

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- JWT authentication
- Mongoose ODM

### Database
- MongoDB
- <img width="1139" height="414" alt="image" src="https://github.com/user-attachments/assets/68ab6e4e-ea43-4a11-9014-95bfc6ca98ba" />
<img width="1918" height="435" alt="image" src="https://github.com/user-attachments/assets/f3f444a6-4505-42dd-8a7e-e07028b1db39" />



### Tools
- ESLint
- Nodemon
- Git and GitHub

## Installation ⚙️

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)

### 1) Clone the repository

```bash
git clone https://github.com/<parashar098>/<quizapp>.git
cd <your-repo-name>
```

### 2) Frontend setup (quizapp)

```bash
cd quizapp
npm install
```

Create quizapp/.env:

```env
VITE_API_URL=http://localhost:5001/api
```

### 3) Backend setup (server)

```bash
cd ../server
npm install
```

Create server/.env:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/quizmaster
JWT_SECRET=replace_with_a_strong_secret
CLIENT_ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
```

## Usage Guide

### Run backend

```bash
cd server
npm run dev
```

Backend health check:

```text
GET http://localhost:5001/health
```

### Run frontend

```bash
cd quizapp
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Build frontend for production

```bash
cd quizapp
npm run build
npm run preview
```

## Screenshots

Add screenshots to quizapp/public/images and update paths below:

- Landing Page: ![Landing]<img width="1878" height="823" alt="image" src="https://github.com/user-attachments/assets/884bc2ec-326c-45ca-adbf-6847e9e9bc66" />
- Teacher Dashboard: ![Teacher Dashboard]<img width="1888" height="823" alt="image" src="https://github.com/user-attachments/assets/be3f49bb-e259-474e-98cc-45f63566c84e" />

- Student Dashboard: ![Student Dashboard]<img width="1893" height="829" alt="image" src="https://github.com/user-attachments/assets/df96fe59-8deb-4740-9f33-000b3eb3b4be" />

- Admin Dashboard: ![Admin Dashboard](public/images/admin-dashboard.png)

## API Endpoints

Base URL: http://localhost:5001/api

### Auth
- POST /auth/register
- <img width="1057" height="820" alt="image" src="https://github.com/user-attachments/assets/80d7ed51-8065-4a44-aed3-03fd26d81762" />

- POST /auth/login
- <img width="1111" height="792" alt="image" src="https://github.com/user-attachments/assets/c3cd5d19-4417-4e51-9e5b-29676809f68c" />

- POST /auth/logout

### Quiz
- GET /quiz
- GET /quiz/teacher/:teacherId
- GET /quiz/:id
- POST /quiz
- PUT /quiz/:id
- DELETE /quiz/:id
- POST /quiz/join
- POST /quiz/:id/start
- POST /quiz/:id/submit
- PATCH /quiz/attempt/:attemptId/violation

### Results
- GET /result
- POST /result
- GET /result/quiz/:quizId
- GET /result/:id

### Admin
- GET /admin/users
- GET /admin/users/:userId
- PUT /admin/users/:userId
- POST /admin/users/:userId/block
- POST /admin/users/:userId/unblock
- POST /admin/users/:userId/reset-password
- DELETE /admin/users/:userId
- POST /admin/users/:userId/permissions
- GET /admin/dashboard/stats
- GET /admin/activity-log

### Analytics
- GET /analytics/quiz/:quizId
- GET /analytics/student/:studentId
- GET /analytics/student/:studentId/performance
- GET /analytics/teacher/:teacherId
- GET /analytics/teacher/:teacherId/performance
- GET /analytics/platform
- GET /analytics/reports/:reportType

### Login History
- GET /login-history
- GET /login-history/stats
- GET /login-history/user/:userId
- POST /login-history/clear

## Folder Structure

```text
quiz site/
|-- quizapp/
|   |-- public/
|   |   `-- images/
|   |-- src/
|   |   |-- components/
|   |   |-- contexts/
|   |   |-- lib/
|   |   |-- pages/
|   |   `-- types/
|   |-- package.json
|   `-- README.md
`-- server/
    |-- config/
    |-- controllers/
    |-- middleware/
    |-- models/
    |-- routes/
    `-- server.js
```



## Author

- Name: suryansh parashar
- GitHub: https://github.com/<parashar098>


## License

This project is licensed under the MIT License.
