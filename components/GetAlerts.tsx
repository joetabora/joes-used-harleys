'use client';

import { useState } from 'react';

export function GetAlerts() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // TODO: Replace with your actual form submission endpoint
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          type: 'bike_alerts',
          _subject: 'New Bike Alert Signup'
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'You\'re in! We\'ll text you when new bikes drop.' });
        setEmail('');
        setPhone('');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Text Joe directly at 414-439-6211' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem 2rem',
            fontSize: '1rem',
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ea580c';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        />
        <input
          type="tel"
          placeholder="Phone (for SMS alerts)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem 2rem',
            fontSize: '1rem',
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ea580c';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting 
              ? 'rgba(107, 114, 128, 0.5)' 
              : 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            padding: '1.5rem 3rem',
            fontSize: '1rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'var(--font-clash)',
            border: 'none',
            borderRadius: '12px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isSubmitting ? 'none' : '0 10px 40px rgba(234, 88, 12, 0.4)',
            opacity: isSubmitting ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4)';
            }
          }}
        >
          {isSubmitting ? 'SIGNING UP...' : 'GET ALERTS →'}
        </button>
      </form>

      {status.message && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem 2rem',
          background: status.type === 'success' 
            ? 'rgba(34, 197, 94, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${status.type === 'success' ? '#22c55e' : '#ef4444'}`,
          borderRadius: '12px',
          color: status.type === 'success' ? '#22c55e' : '#ef4444',
          fontSize: '1rem',
          fontWeight: 600,
          textAlign: 'center'
        }}>
          {status.message}
        </div>
      )}

      <p style={{
        marginTop: '2rem',
        fontSize: '0.95rem',
        color: '#6b7280',
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        Or just text Joe directly: <a href="sms:4144396211" style={{
          color: '#ea580c',
          textDecoration: 'none',
          fontWeight: 700,
          fontStyle: 'normal'
        }}>414-439-6211</a>
      </p>
    </>
  );
}
