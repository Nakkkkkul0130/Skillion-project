import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            MicroCourses
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-dark-700 font-medium">Hi, {user.name}</span>
                  </div>
                  
                  {user.role === 'learner' && (
                    <>
                      <Link to="/courses" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">Courses</Link>
                      <Link to="/progress" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">Progress</Link>
                      {user.creatorStatus === 'pending' ? (
                        <span className="text-yellow-600 font-medium flex items-center">
                          <span className="animate-pulse mr-1">⏳</span>
                          Application Pending
                        </span>
                      ) : user.creatorStatus !== 'approved' && (
                        <Link to="/creator/apply" className="text-dark-600 hover:text-secondary-600 font-medium transition-colors">Become Creator</Link>
                      )}
                    </>
                  )}
                  
                  {(user.role === 'creator' || user.creatorStatus === 'approved') && (
                    <Link to="/creator/dashboard" className="text-dark-600 hover:text-secondary-600 font-medium transition-colors">Creator Dashboard</Link>
                  )}
                  
                  {user.role === 'admin' && (
                    <Link to="/admin/review/courses" className="text-dark-600 hover:text-accent-600 font-medium transition-colors">Admin</Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;