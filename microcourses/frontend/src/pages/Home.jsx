import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ContactForm from '../components/common/ContactForm';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {user ? (
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="card p-12 max-w-lg mx-auto text-center">
            <h1 className="text-4xl font-bold text-dark-800 mb-8">
              Welcome, {user.name}! 👋
            </h1>
            
            {user.role === 'learner' && (
              <div className="grid grid-cols-1 gap-4">
                <Link to="/courses" className="btn-primary text-lg py-4">
                  📖 Browse Courses
                </Link>
                <Link to="/progress" className="btn-accent text-lg py-4">
                  📊 View Progress
                </Link>
              </div>
            )}
            
            {user.role === 'creator' && (
              <Link to="/creator/dashboard" className="btn-secondary text-lg py-4 w-full">
                🎨 Creator Dashboard
              </Link>
            )}
            
            {user.role === 'admin' && (
              <Link to="/admin/review/courses" className="btn-accent text-lg py-4 w-full">
                ⚙️ Admin Panel
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <span className="inline-block text-6xl mb-4">🚀</span>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
                  Welcome to MicroCourses
                </h1>
                <p className="text-xl text-dark-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Transform your skills with our comprehensive online learning platform. 
                  Learn from experts, create amazing courses, and earn certificates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  🎯 Start Learning Today
                </Link>
                <Link to="/courses" className="btn-secondary text-lg px-8 py-4">
                  📚 Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Show other sections only when user is not logged in */}
      {!user && (
        <>
          {/* Features Section */}
          <div className="py-20 bg-gradient-to-b from-white/50 to-primary-50/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-dark-800 mb-4">Why Choose MicroCourses?</h2>
                <p className="text-xl text-dark-600">Everything you need for your learning journey</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📚</div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-4 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    Learn
                  </h3>
                  <p className="text-dark-600 leading-relaxed">
                    Access high-quality courses from expert creators with interactive content and real-world projects
                  </p>
                </div>
                
                <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎨</div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-4 bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                    Create
                  </h3>
                  <p className="text-dark-600 leading-relaxed">
                    Share your expertise by creating engaging courses with our intuitive course builder and management tools
                  </p>
                </div>
                
                <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-4 bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent">
                    Certify
                  </h3>
                  <p className="text-dark-600 leading-relaxed">
                    Earn verified certificates upon course completion with unique serial numbers for credibility
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials & Stats Section */}
          <div className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-dark-800 mb-4">Our Impact</h2>
                <p className="text-xl text-dark-600">Join thousands of learners worldwide</p>
              </div>
              
              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <div className="text-dark-600">Courses Delivered</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent mb-2">
                    10,000+
                  </div>
                  <div className="text-dark-600">Happy Learners</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent mb-2">
                    8,500+
                  </div>
                  <div className="text-dark-600">Certificates Issued</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    100+
                  </div>
                  <div className="text-dark-600">Expert Creators</div>
                </div>
              </div>
              
              {/* Testimonials */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Sarah Johnson</div>
                      <div className="text-sm text-dark-600">Web Developer</div>
                    </div>
                  </div>
                  <p className="text-dark-700 italic">
                    "MicroCourses transformed my career! The quality of courses and the certificate system is outstanding. Highly recommended!"
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Mike Chen</div>
                      <div className="text-sm text-dark-600">Data Scientist</div>
                    </div>
                  </div>
                  <p className="text-dark-700 italic">
                    "Amazing platform with expert instructors. The learning experience is smooth and the certificates add real value to my profile."
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Anna Rodriguez</div>
                      <div className="text-sm text-dark-600">UX Designer</div>
                    </div>
                  </div>
                  <p className="text-dark-700 italic">
                    "The best online learning platform I've used. Great content, easy navigation, and excellent support. Five stars!"
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="py-20 bg-gradient-to-b from-white to-primary-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-dark-800 mb-4">Get In Touch</h2>
                <p className="text-xl text-dark-600">Have questions? We'd love to hear from you!</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <ContactForm />
                
                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                        📧
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-800">Email Us</h4>
                        <p className="text-dark-600">nakkul.dev@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                        📱
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-800">Call Us</h4>
                        <p className="text-dark-600">+91 9728647308</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                        📍
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-800">Visit Us</h4>
                        <p className="text-dark-600">surya nagar<br />Rohtak, haryana 124001</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                        ⏰
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-800">Support Hours</h4>
                        <p className="text-dark-600">Mon-Fri: 10AM-7PM<br />Sat-Sun: 11AM-5PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
                    🎓 MicroCourses
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Empowering learners worldwide with quality education and verified certificates.
                  </p>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h4 className="font-bold mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    <Link to="/courses" className="block text-gray-300 hover:text-primary-400 transition-colors">Browse Courses</Link>
                    <Link to="/register" className="block text-gray-300 hover:text-primary-400 transition-colors">Get Started</Link>
                    <Link to="/creator/apply" className="block text-gray-300 hover:text-primary-400 transition-colors">Become Creator</Link>
                  </div>
                </div>
                
                {/* Support */}
                <div>
                  <h4 className="font-bold mb-4">Support</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">📧 nakkul.dev@gmail.com</p>
                    <p className="text-gray-300">📱 +91 9728647308</p>
                    <p className="text-gray-300">💬 24/7 Live Chat</p>
                  </div>
                </div>
                
                {/* Social Media */}
                <div>
                  <h4 className="font-bold mb-4">Follow Nakul</h4>
                  <div className="flex space-x-4">
                    <a href="https://x.com/Nakulbhar001" className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      🐦
                    </a>
                    <a href="https://www.linkedin.com/in/nakul-bhar0130/" className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      💼
                    </a>
                    <a href="https://github.com/Nakkkkkul0130" className="w-10 h-10 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      🐱
                    </a>
                    <a href="https://instagram.com/nakul_bhar0130" className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      📸
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 mb-4 md:mb-0">
                  © 2024 MicroCourses. All rights reserved.
                </p>
                <p className="text-gray-400 flex items-center">
                  Made with ❤️ by Nakul
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;