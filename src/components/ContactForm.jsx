import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

// EmailJS Configuration - Load from environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Check if environment variables are loaded
if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
  console.error('EmailJS environment variables are missing. Please check your .env file.');
}

const ContactForm = ({ onHoverStart, onHoverEnd }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsAnimating(true);
    setSubmitStatus(null);

    // Start the flying animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000); // Animation duration

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="max-w-md mx-auto w-full border border-slate-600 p-4 sm:p-6 lg:p-8 hover:border-slate-400 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 ease-out rounded-xl group"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
        <h4 className="text-xl text-slate-200 mb-8 font-semibold tracking-wide uppercase group-hover:text-white transition-colors duration-300">Send Message</h4>
        
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-slate-800/50 border border-slate-500/30 rounded-lg flex items-center space-x-3 backdrop-blur-sm">
            <CheckCircle className="h-5 w-5 text-slate-300 flex-shrink-0" />
            <p className="text-slate-300 text-sm font-medium">
              Message sent successfully! I'll get back to you soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-slate-800/50 border border-slate-500/30 rounded-lg flex items-center space-x-3 backdrop-blur-sm">
            <AlertCircle className="h-5 w-5 text-slate-300 flex-shrink-0" />
            <p className="text-slate-300 text-sm font-medium">
              Failed to send message. Please try again or contact me directly.
            </p>
          </div>
        )}

        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="text" 
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full bg-black border border-slate-600 px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-all duration-300 text-sm font-medium rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div>
            <input 
              type="email" 
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full bg-black border border-slate-600 px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-all duration-300 text-sm font-medium rounded-lg"
              placeholder="Your Email"
            />
          </div>
          <div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-black border border-slate-600 px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-all duration-300 text-sm font-medium resize-none rounded-lg"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-200 text-black py-3 font-semibold text-sm hover:bg-white group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 tracking-wide uppercase rounded-lg flex items-center justify-center space-x-2 relative overflow-hidden"
          >
            {/* Flying Send Icon Animation */}
            {isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Send className="h-6 w-6 text-black animate-fly" />
              </div>
            )}
            
            {/* Original Content - Hidden during animation */}
            <div className={`flex items-center space-x-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </button>
        </form>
    </div>
  );
};

export default ContactForm;
