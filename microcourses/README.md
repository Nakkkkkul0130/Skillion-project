# MicroCourses - Mini LMS Platform

A full-stack Learning Management System where creators can upload courses, admins review them, and learners can enroll, track progress, and earn certificates.

## Features

### Roles
- **Learner**: Browse courses, enroll, track progress, earn certificates
- **Creator**: Apply to become creator, create courses and lessons
- **Admin**: Review creator applications and course submissions

### Key Functionality
- User authentication with role-based access
- Course creation with lessons and auto-generated transcripts
- Enrollment and progress tracking
- Certificate generation with unique serial hash
- Admin approval workflow for creators and courses

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/microcourses
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Usage Flow

### 1. User Registration
- Users can register as Learner or Admin
- Creators must apply separately after registration

### 2. Creator Application Process
1. Learner applies to become creator via `/creator/apply`
2. Admin reviews application in `/admin/review/courses`
3. Admin approves/rejects the application
4. Approved users get creator role

### 3. Course Creation Process
1. Creator creates course in dashboard
2. Creator adds lessons with content and optional video URLs
3. Creator submits course for review
4. Admin reviews and publishes/rejects course

### 4. Learning Process
1. Learner browses published courses
2. Learner enrolls in course
3. Learner completes lessons one by one
4. Upon 100% completion, certificate is automatically issued

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Creator
- `POST /api/creator/apply` - Apply to become creator
- `GET /api/creator/dashboard` - Get creator courses
- `POST /api/creator/courses` - Create new course
- `POST /api/creator/courses/:id/lessons` - Add lesson to course
- `PATCH /api/creator/courses/:id/submit` - Submit course for review

### Admin
- `GET /api/admin/creators/pending` - Get pending creator applications
- `PATCH /api/admin/creators/:id/status` - Approve/reject creator
- `GET /api/admin/courses/pending` - Get courses pending review
- `PATCH /api/admin/courses/:id/status` - Publish/reject course

### Learner
- `POST /api/learner/enroll/:courseId` - Enroll in course
- `POST /api/learner/complete/:lessonId` - Mark lesson complete
- `GET /api/learner/progress` - Get learning progress

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/lessons/:id` - Get lesson content

## Database Models

### User
- name, email, password
- role (learner, creator, admin)
- creatorStatus (pending, approved, rejected)
- enrolledCourses, completedLessons, certificates

### Course
- title, description, creator
- status (draft, pending, published, rejected)
- lessons, enrolledStudents

### Lesson
- title, content, videoUrl, transcript
- order (unique within course)
- course reference

## Project Structure

```
microcourses/
├── backend/
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication middleware
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   └── utils/           # Utility functions
│   ├── public/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.