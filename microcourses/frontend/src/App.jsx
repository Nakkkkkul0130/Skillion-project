import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Learner Pages
import Courses from './pages/learner/Courses';
import CourseDetail from './pages/learner/CourseDetail';
import LessonView from './pages/learner/LessonView';
import Progress from './pages/learner/Progress';

// Creator Pages
import CreatorApply from './pages/creator/CreatorApply';
import CreatorDashboard from './pages/creator/CreatorDashboard';

// Admin Pages
import AdminReview from './pages/admin/AdminReview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            
            {/* Protected Learner Routes */}
            <Route 
              path="/learn/:lessonId" 
              element={
                <ProtectedRoute>
                  <LessonView />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              } 
            />
            
            {/* Creator Routes */}
            <Route 
              path="/creator/apply" 
              element={
                <ProtectedRoute>
                  <CreatorApply />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/creator/dashboard" 
              element={
                <ProtectedRoute requiredRole="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/review/courses" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminReview />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;