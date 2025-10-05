import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
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
      <div className="max-w-md w-full">
        <div className="card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-dark-600">Sign in to continue your learning journey</p>
          </div>
          
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                📧 Email Address
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
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-dark-200">
            <p className="text-center text-dark-600 mb-6">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-secondary-700 transition-all">
                Create Account
              </Link>
            </p>
            
            <div className="text-center">
              <p className="text-sm font-semibold text-dark-700 mb-4">Choose Your Path:</p>
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-3 rounded-xl border border-primary-200">
                  <div className="text-lg mb-1">🎓</div>
                  <div className="font-semibold text-primary-700">Learner</div>
                  <div className="text-primary-600">Discover & Learn</div>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-3 rounded-xl border border-secondary-200">
                  <div className="text-lg mb-1">🎨</div>
                  <div className="font-semibold text-secondary-700">Creator</div>
                  <div className="text-secondary-600">Teach & Share</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-3 rounded-xl border border-accent-200">
                <div className="text-lg mb-1">⚙️</div>
                <div className="font-semibold text-accent-700">Admin</div>
                <div className="text-accent-600">Manage Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;