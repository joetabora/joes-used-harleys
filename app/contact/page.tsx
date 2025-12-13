'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // TODO: Replace with your actual form submission endpoint
    // This could be Formspree, EmailJS, or your own API
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Contact Form Submission from joesusedharleys.com'
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent! Joe will get back to you fast — usually within minutes.' });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Text Joe directly at 414-439-6211 — he answers fast!' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section style={{
        background: '#000000',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            textShadow: '0 4px 20px rgba(255, 102, 0, 0.3)',
            lineHeight: '1.1'
          }}>
            Contact Joe – Text or Call Anytime
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#CCCCCC',
            fontWeight: 600,
            letterSpacing: '1px',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Fastest way to reach a real human who actually answers — no corporate BS.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{
        background: '#0A0A0A',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {/* Phone Card */}
            <div style={{
              background: '#000000',
              border: '2px solid #1A1A1A',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 102, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📞</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                CALL OR TEXT
              </h3>
              <a
                href="tel:4144396211"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '2px',
                  display: 'block',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                414-439-6211
              </a>
              <a
                href="sms:4144396211"
                style={{
                  display: 'inline-block',
                  background: '#FF6600',
                  color: '#000000',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  borderRadius: '8px',
                  marginTop: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF6600';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                TEXT NOW
              </a>
            </div>

            {/* Email Card */}
            <div style={{
              background: '#000000',
              border: '2px solid #1A1A1A',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 102, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✉️</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                EMAIL
              </h3>
              <a
                href="mailto:joetabora@gmail.com"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  wordBreak: 'break-word',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                joetabora@gmail.com
              </a>
            </div>

            {/* Address Card */}
            <div style={{
              background: '#000000',
              border: '2px solid #1A1A1A',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 102, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📍</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                DEALERSHIP
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#CCCCCC',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                House of Harley-Davidson
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=6221+W+Layton+Ave,+Milwaukee,+WI+53220"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FF6600',
                  textDecoration: 'none',
                  lineHeight: '1.8',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                6221 W Layton Ave<br />
                Milwaukee, WI 53220
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div style={{
            marginTop: '4rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '3px solid #FF6600',
            boxShadow: '0 8px 30px rgba(255, 102, 0, 0.3)'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d-87.99424712384211!3d42.95879927114352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880519e8b8c8c8c9%3A0x8c8c8c8c8c8c8c8c!2s6221%20W%20Layton%20Ave%2C%20Milwaukee%2C%20WI%2053220!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="House of Harley-Davidson Location"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{
        background: '#000000',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '3rem',
            textShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
          }}>
            SEND A MESSAGE
          </h2>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
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
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
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
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
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
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                background: '#0A0A0A',
                border: '2px solid #1A1A1A',
                padding: '1.25rem 1.5rem',
                fontSize: '1rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-inter)',
                borderRadius: '8px',
                resize: 'vertical',
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
                fontSize: '1.2rem',
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
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE TO JOE'}
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
              fontWeight: 600,
              textAlign: 'center'
            }}>
              {status.message}
            </div>
          )}
        </div>
      </section>

      {/* Extra Features Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #000000 100%)',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {/* FaceTime Callout */}
            <div style={{
              background: '#000000',
              border: '2px solid #FF6600',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📹</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                FACETIME TOUR
              </h3>
              <p style={{
                color: '#CCCCCC',
                lineHeight: '1.8',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                Want to see a bike live? Text for a FaceTime tour
              </p>
              <a
                href="sms:4144396211?body=Can I get a FaceTime tour of a bike?"
                style={{
                  display: 'inline-block',
                  background: '#FF6600',
                  color: '#000000',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF6600';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                REQUEST TOUR
              </a>
            </div>

            {/* Shipping Reminder */}
            <div style={{
              background: '#000000',
              border: '2px solid #FF6600',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                NATIONWIDE SHIPPING
              </h3>
              <p style={{
                color: '#CCCCCC',
                lineHeight: '1.8',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                Nationwide shipping $499 — ask me how
              </p>
              <a
                href="sms:4144396211?body=Tell me about $499 shipping"
                style={{
                  display: 'inline-block',
                  background: '#FF6600',
                  color: '#000000',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF6600';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ASK ABOUT SHIPPING
              </a>
            </div>

            {/* Hours */}
            <div style={{
              background: '#000000',
              border: '2px solid #FF6600',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                AVAILABLE HOURS
              </h3>
              <p style={{
                color: '#CCCCCC',
                lineHeight: '1.8',
                fontSize: '1rem'
              }}>
                I&apos;m usually around <strong style={{ color: '#FF6600' }}>9AM–9PM</strong> — text anytime, I answer fast
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            paddingTop: '4rem',
            borderTop: '2px solid #1A1A1A'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#FF6600',
              fontFamily: 'var(--font-clash)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}>
              FOLLOW JOE
            </h3>
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://www.tiktok.com/@suchgrime"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '3rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                🎵
              </a>
              <a
                href="https://www.instagram.com/joetabora"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '3rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                📸
              </a>
              <a
                href="https://www.facebook.com/joesusedharleys"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '3rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                👥
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section style={{
        background: '#000000',
        padding: '4rem 2rem',
        borderTop: '2px solid #FF6600'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#FF6600',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}>
            Explore More
          </h3>
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                color: '#CCCCCC',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '0.75rem 1.5rem',
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6600';
                e.currentTarget.style.color = '#FF6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1A';
                e.currentTarget.style.color = '#CCCCCC';
              }}
            >
              Homepage
            </Link>
            <Link
              href="/inventory"
              style={{
                color: '#CCCCCC',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '0.75rem 1.5rem',
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6600';
                e.currentTarget.style.color = '#FF6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1A';
                e.currentTarget.style.color = '#CCCCCC';
              }}
            >
              View Inventory
            </Link>
            <Link
              href="/events"
              style={{
                color: '#CCCCCC',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '0.75rem 1.5rem',
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6600';
                e.currentTarget.style.color = '#FF6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1A';
                e.currentTarget.style.color = '#CCCCCC';
              }}
            >
              Events
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
