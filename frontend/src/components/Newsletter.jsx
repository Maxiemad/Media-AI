import { useState, useEffect } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, Users } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);

  // Fetch subscriber count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${API}/newsletter/count`);
        setSubscriberCount(response.data.count);
      } catch (error) {
        console.log('Could not fetch subscriber count');
      }
    };
    fetchCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

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
        setSubscriberCount(prev => prev + 1);
      } else {
        setStatus('error');
        setMessage(response.data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.detail || 'Something went wrong. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 8000);
  };

  return (
    <section 
      className="relative py-32 overflow-hidden scene-3d"
      data-testid="newsletter-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="aether-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Be the First
          </p>
          
          <h2
            className="section-title text-4xl md:text-6xl mb-6 text-3d-subtle"
            data-testid="newsletter-title"
          >
            Join the <span className="text-cyan-400">Waitlist</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Get exclusive early access and be among the first to experience 
            AetherX when we launch. No spam, just breakthrough moments.
          </p>

          {/* Live Subscriber Count */}
          {subscriberCount > 0 && (
            <div 
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
              data-testid="subscriber-count"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">
                <span className="font-bold text-cyan-400">{subscriberCount.toLocaleString()}</span> people already on the waitlist
              </span>
            </div>
          )}

          {/* Form */}
          <form
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

              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="btn-primary btn-3d flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
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
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div
                className="flex items-center justify-center gap-2 text-cyan-400 animate-fade-in"
                data-testid="newsletter-success"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}
            
            {status === 'error' && (
              <div
                className="flex items-center justify-center gap-2 text-red-400 animate-fade-in"
                data-testid="newsletter-error"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}
          </form>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-12 text-gray-600 text-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
};
