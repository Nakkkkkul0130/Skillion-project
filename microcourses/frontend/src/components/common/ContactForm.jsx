import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-8">
      <h3 className="text-2xl font-bold text-dark-800 mb-6">Send us a Message</h3>
      
      {success && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            Message sent successfully! We'll get back to you soon.
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field" 
            placeholder="Your full name" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field" 
            placeholder="your.email@example.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">Subject</label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input-field" 
            placeholder="What's this about?" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">Message</label>
          <textarea 
            rows="4" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="input-field" 
            placeholder="Tell us more..."
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              📧 Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;