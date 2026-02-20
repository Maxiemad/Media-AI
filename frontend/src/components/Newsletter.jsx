import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const response = await axios.post(`${API}/newsletter/subscribe`, {
        email,
        name: name || undefined
      });
      
      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message);
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(response.data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.detail || 'Something went wrong. Please try again.');
    }

    // Reset status after 8 seconds for better readability
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 8000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      data-testid="newsletter-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />
      
      {/* Decorative orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="aether-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4"
          >
            Be the First
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl md:text-6xl mb-6"
            data-testid="newsletter-title"
          >
            Join the <span className="text-cyan-400">Waitlist</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-12 max-w-xl mx-auto"
          >
            Get exclusive early access and be among the first to experience 
            AetherX when we launch. No spam, just breakthrough moments.
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            data-testid="newsletter-form"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="input-aether w-full"
                  data-testid="newsletter-name-input"
                />
              </div>
              
              <div className="relative flex-1 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="input-aether w-full"
                  data-testid="newsletter-email-input"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || !email}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="newsletter-submit-btn"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Get Early Access</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-cyan-400"
                data-testid="newsletter-success"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-400"
                data-testid="newsletter-error"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}
          </motion.form>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-12 text-gray-600 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Early access priority</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
