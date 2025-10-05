import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner',
    wantsCreator: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData.name, formData.email, formData.password, formData.role);
    
    if (result.success) {
      if (formData.wantsCreator) {
        // Redirect to creator application form
        navigate('/creator/apply');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              Join MicroCourses
            </h2>
            <p className="text-dark-600">Start your learning journey today</p>
          </div>
          
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <div className="flex items-center">
                {error}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Create a strong password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-4">
                Choose Your Path:
              </label>
              <div className="grid grid-cols-1 gap-4">
                <label className={`card p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.role === 'learner' && !formData.wantsCreator 
                    ? 'ring-2 ring-primary-500 bg-gradient-to-br from-primary-50 to-primary-100' 
                    : 'hover:shadow-medium'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="learner"
                    checked={formData.role === 'learner' && !formData.wantsCreator}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-dark-800 text-lg">Learner</div>
                      <div className="text-dark-600">Discover amazing courses and expand your skills</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      formData.role === 'learner' && !formData.wantsCreator
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-dark-300'
                    }`}>
                      {formData.role === 'learner' && !formData.wantsCreator && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
                
                <label className={`card p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.wantsCreator 
                    ? 'ring-2 ring-secondary-500 bg-gradient-to-br from-secondary-50 to-secondary-100' 
                    : 'hover:shadow-medium'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="creator"
                    checked={formData.wantsCreator}
                    onChange={(e) => setFormData({...formData, role: 'learner', wantsCreator: true})}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-dark-800 text-lg">Creator</div>
                      <div className="text-dark-600">Share your expertise and create courses</div>
                      <div className="text-xs text-secondary-600 mt-1 font-medium">
                        Requires admin approval
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      formData.wantsCreator
                        ? 'bg-secondary-500 border-secondary-500'
                        : 'border-dark-300'
                    }`}>
                      {formData.wantsCreator && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <p className="mt-6 text-center text-dark-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-secondary-700 transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;