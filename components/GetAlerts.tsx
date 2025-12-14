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
    // This could be Formspree, EmailJS, or your own API
    try {
      // Example using Formspree (you'll need to set up a form endpoint)
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
    <section style={{
      background: '#000000',
      padding: '6rem 2rem',
      position: 'relative',
      borderTop: '2px solid #FF6600',
      borderBottom: '2px solid #FF6600'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          fontFamily: 'var(--font-clash)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
        }}>
          GET ALERTS
        </h2>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: '#CCCCCC',
          marginBottom: '3rem',
          fontWeight: 600,
          letterSpacing: '1px'
        }}>
          Get notified when I drop a new bike — first dibs + $499 shipping
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: '#0A0A0A',
              border: '2px solid #1A1A1A',
              padding: '1.25rem 1.5rem',
              fontSize: '1rem',
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.3)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <input
            type="tel"
            placeholder="Phone (for SMS alerts)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              background: '#0A0A0A',
              border: '2px solid #1A1A1A',
              padding: '1.25rem 1.5rem',
              fontSize: '1rem',
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.3)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: '#FF6600',
              color: '#000000',
              padding: '1.5rem 3rem',
              fontSize: '1.1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontFamily: 'var(--font-clash)',
              border: '3px solid #FF6600',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(255, 102, 0, 0.6)',
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(255, 102, 0, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = '#FF6600';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 102, 0, 0.6)';
              }
            }}
          >
            {isSubmitting ? 'SIGNING UP...' : 'NOTIFY ME'}
          </button>
        </form>

        {status.message && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            background: status.type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
            border: `2px solid ${status.type === 'success' ? '#00FF00' : '#FF0000'}`,
            borderRadius: '8px',
            color: status.type === 'success' ? '#00FF00' : '#FF0000',
            fontSize: '1rem',
            fontWeight: 600
          }}>
            {status.message}
          </div>
        )}

        <p style={{
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: '#666666',
          fontStyle: 'italic'
        }}>
          Or just text Joe directly: <a href="sms:4144396211" style={{ color: '#FF6600', textDecoration: 'none', fontWeight: 700 }}>414-439-6211</a>
        </p>
      </div>
    </section>
  );
}
