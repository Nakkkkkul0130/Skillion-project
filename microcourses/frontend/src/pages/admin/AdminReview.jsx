import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const AdminReview = () => {
  const [pendingCreators, setPendingCreators] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('creators');

  useEffect(() => {
    fetchPendingData();
  }, []);

  const fetchPendingData = async () => {
    try {
      const [creatorsResponse, coursesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/creators/pending`),
        axios.get(`${API_BASE_URL}/api/admin/courses/pending`)
      ]);
      
      setPendingCreators(creatorsResponse.data);
      setPendingCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error fetching pending data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatorStatus = async (userId, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/creators/${userId}/status`, { status });
      fetchPendingData();
      alert(`Creator ${status} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${status} creator`);
    }
  };

  const handleCourseStatus = async (courseId, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/courses/${courseId}/status`, { status });
      fetchPendingData();
      alert(`Course ${status} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${status} course`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading admin panel...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Review Panel</h1>
      
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('creators')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'creators'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Creator Applications ({pendingCreators.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Course Reviews ({pendingCourses.length})
          </button>
        </nav>
      </div>

      {activeTab === 'creators' && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pending Creator Applications</h2>
          
          {pendingCreators.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No pending creator applications.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pendingCreators.map((creator) => (
                <div key={creator._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                      <p className="text-gray-600">{creator.email}</p>
                      {creator.creatorApplication?.phone && (
                        <p className="text-gray-600">📱 {creator.creatorApplication.phone}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        Applied on: {new Date(creator.creatorApplication?.appliedAt || creator.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleCreatorStatus(creator._id, 'approved')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleCreatorStatus(creator._id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                  
                  {creator.creatorApplication && (
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">🎯 Expertise:</h4>
                        <p className="text-gray-700">{creator.creatorApplication.expertise}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">💼 Experience:</h4>
                        <p className="text-gray-700">{creator.creatorApplication.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">💡 Motivation:</h4>
                        <p className="text-gray-700">{creator.creatorApplication.motivation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'courses' && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Courses Pending Review</h2>
          
          {pendingCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No courses pending review.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pendingCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-gray-600">By {course.creator.name}</p>
                      <p className="text-sm text-gray-500">
                        Submitted on: {new Date(course.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleCourseStatus(course._id, 'published')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => handleCourseStatus(course._id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Course Content:</h4>
                    <div className="space-y-2">
                      {course.lessons.map((lesson, index) => (
                        <div key={lesson._id} className="text-sm text-gray-600">
                          {index + 1}. {lesson.title}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Total lessons: {course.lessons.length}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReview;