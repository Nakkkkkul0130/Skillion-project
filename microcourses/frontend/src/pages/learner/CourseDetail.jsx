import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (user) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/learner/progress`);
        const isEnrolled = response.data.progress.some(p => p.course._id === id);
        setEnrolled(isEnrolled);
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await axios.post(`${API_BASE_URL}/api/learner/enroll/${id}`);
      setEnrolled(true);
      alert('Successfully enrolled in the course!');
    } catch (error) {
      alert(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading course...</div>;
  }

  if (!course) {
    return <div className="text-center py-12">Course not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <span>Created by {course.creator.name}</span>
          <span className="mx-2">•</span>
          <span>{course.lessons.length} lessons</span>
        </div>
        
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          {course.description}
        </p>
        
        {user && user.role === 'learner' && (
          <div className="mb-8">
            {enrolled ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                You are enrolled in this course!
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            )}
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Content</h2>
          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div key={lesson._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {index + 1}. {lesson.title}
                    </h3>
                  </div>
                  {enrolled && (
                    <Link
                      to={`/learn/${lesson._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Start Lesson
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;