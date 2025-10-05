import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CreatorApply = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    expertise: '',
    experience: '',
    motivation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/creator/apply', formData);
      // Update user context to reflect pending status
      const updatedUser = { ...user, creatorStatus: 'pending' };
      refreshUser(updatedUser);
      
      alert('🎉 Creator application submitted successfully! Our admin team will review your application and notify you once approved.');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Application failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (user?.role === 'creator') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          You are already a creator! 
          <button 
            onClick={() => navigate('/creator/dashboard')}
            className="ml-2 text-green-800 underline"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (user?.creatorStatus === 'pending') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-dark-800 mb-4">Application Under Review</h2>
            <p className="text-dark-600 mb-6">
              Your creator application is pending approval. Our admin team will review your application and get back to you soon.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Complete Your Creator Application
          </h1>
          <p className="text-dark-600">
            Welcome! Let's get you set up as a course creator.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why become a creator?</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Share your knowledge and expertise with learners worldwide
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Create and manage your own courses
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Build your personal brand as an educator
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Access creator dashboard and analytics
            </li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Must have expertise in your chosen subject area
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Commitment to creating high-quality educational content
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Agreement to follow our content guidelines
            </li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              📱 Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Your contact number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              🎯 Area of Expertise
            </label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Web Development, Data Science, Design"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              💼 Teaching/Professional Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              rows="4"
              className="input-field"
              placeholder="Describe your relevant experience, qualifications, and background"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              💡 Why do you want to become a creator?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows="3"
              className="input-field"
              placeholder="Tell us about your motivation and what courses you plan to create"
            />
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
        
        <p className="text-sm text-gray-600 text-center mt-4">
          Your application will be reviewed by our admin team. You'll be notified once approved.
        </p>
      </div>
    </div>
  );
};

export default CreatorApply;