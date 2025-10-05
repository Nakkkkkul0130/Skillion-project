import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/learner/progress`);
      setProgressData(response.data.progress);
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading progress...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Progress</h1>
      
      {/* Enrolled Courses */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enrolled Courses</h2>
        
        {progressData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Link 
              to="/courses" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {progressData.map((item) => (
              <div key={item.course._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.course.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{item.completedLessons}/{item.totalLessons} lessons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.percentage}% complete</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    to={`/courses/${item.course._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Continue Learning
                  </Link>
                  
                  {item.percentage === 100 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Certificates */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Certificates</h2>
        
        {certificates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No certificates earned yet. Complete a course to earn your first certificate!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-md p-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-3xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {cert.courseId.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Completed on {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                  <div className="bg-white rounded p-2 text-xs text-gray-500 font-mono">
                    Serial: {cert.serialHash.substring(0, 16)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;