import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/creator/dashboard');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/creator/courses', newCourse);
      setNewCourse({ title: '', description: '', category: '' });
      setShowCreateForm(false);
      fetchCourses();
      alert('Course created successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create course');
    }
  };

  const handleSubmitForReview = async (courseId) => {
    try {
      await axios.patch(`http://localhost:5000/api/creator/courses/${courseId}/submit`);
      fetchCourses();
      alert('Course submitted for review!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit course');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Course
        </button>
      </div>

      {/* Create Course Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleCreateCourse}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                {course.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
            
            <div className="text-sm text-gray-500 mb-4">
              <p>{course.lessons.length} lessons</p>
              <p>{course.enrolledStudents.length} students enrolled</p>
            </div>
            
            <div className="flex justify-between items-center">
              <CourseActions 
                course={course} 
                onSubmitForReview={handleSubmitForReview}
              />
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">You haven't created any courses yet.</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first course
          </button>
        </div>
      )}
    </div>
  );
};

const CourseActions = ({ course, onSubmitForReview }) => {
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    content: '',
    videoUrl: '',
    order: course.lessons.length + 1
  });

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/creator/courses/${course._id}/lessons`, newLesson);
      setNewLesson({ title: '', content: '', videoUrl: '', order: course.lessons.length + 2 });
      setShowLessonForm(false);
      alert('Lesson added successfully!');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add lesson');
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        {course.status === 'draft' && (
          <>
            <button
              onClick={() => setShowLessonForm(true)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Add Lesson
            </button>
            {course.lessons.length > 0 && (
              <button
                onClick={() => onSubmitForReview(course._id)}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Submit for Review
              </button>
            )}
          </>
        )}
      </div>

      {/* Add Lesson Modal */}
      {showLessonForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Lesson</h2>
            <form onSubmit={handleAddLesson}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newLesson.content}
                  onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL (optional)
                </label>
                <input
                  type="url"
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Order
                </label>
                <input
                  type="number"
                  value={newLesson.order}
                  onChange={(e) => setNewLesson({...newLesson, order: parseInt(e.target.value)})}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLessonForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatorDashboard;