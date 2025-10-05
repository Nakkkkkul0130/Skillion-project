import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LessonView = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/lessons/${lessonId}`);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      if (error.response?.status === 403) {
        alert('You need to enroll in this course first');
        navigate('/courses');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/learner/complete/${lessonId}`);
      alert(response.data.message);
      if (response.data.certificate) {
        navigate('/progress');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to complete lesson');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="text-center py-12">Lesson not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-600">Course: {lesson.course.title}</p>
        </div>
        
        {lesson.videoUrl && (
          <div className="mb-8">
            <div className="bg-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">Video Content</p>
              <p className="text-sm text-gray-500">Video URL: {lesson.videoUrl}</p>
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Lesson Content</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {lesson.content}
            </p>
          </div>
        </div>
        
        {lesson.transcript && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcript</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {lesson.transcript}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(`/courses/${lesson.course._id}`)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Course
          </button>
          
          <button
            onClick={handleComplete}
            disabled={completing}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {completing ? 'Completing...' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;