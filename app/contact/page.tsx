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
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        padding: '10rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
            border: '1px solid rgba(234, 88, 12, 0.3)',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              💬 Get In Touch
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Contact Joe
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '1px',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Fastest way to reach a real human who actually answers — no corporate BS.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
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
            marginBottom: '6rem'
          }}>
            {/* Phone Card */}
            <div className="contact-card" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
              textAlign: 'center',
              transition: 'all 0.4s ease'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                border: '2px solid rgba(234, 88, 12, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 2rem'
              }}>
                📞
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'var(--font-clash)',
                marginBottom: '1rem'
              }}>
                Call Joe
              </h3>
              <a
                href="tel:4144396211"
                style={{
                  color: '#ea580c',
                  textDecoration: 'none',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '1rem'
                }}
              >
                414-439-6211
              </a>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.95rem'
              }}>
                Available 7 days a week
              </p>
            </div>

            {/* Text Card */}
            <div className="contact-card" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
              textAlign: 'center',
              transition: 'all 0.4s ease'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                border: '2px solid rgba(234, 88, 12, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 2rem'
              }}>
                💬
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'var(--font-clash)',
                marginBottom: '1rem'
              }}>
                Text Joe
              </h3>
              <a
                href="sms:4144396211"
                style={{
                  background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                  color: '#ffffff',
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  borderRadius: '50px',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(234, 88, 12, 0.3)'
                }}
              >
                TEXT NOW
              </a>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.95rem'
              }}>
                Fastest way to reach me
              </p>
            </div>

            {/* Location Card */}
            <div className="contact-card" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
              textAlign: 'center',
              transition: 'all 0.4s ease'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                border: '2px solid rgba(234, 88, 12, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 2rem'
              }}>
                📍
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'var(--font-clash)',
                marginBottom: '1rem'
              }}>
                Visit Us
              </h3>
              <p style={{
                color: '#e5e7eb',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                6221 W Layton Ave<br />
                Milwaukee, WI 53220
              </p>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.95rem'
              }}>
                At House of Harley-Davidson
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '4rem 3rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '-1px',
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}>
                Send a Message
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Or just text — it's faster
              </p>

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
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 2rem',
                    fontSize: '1rem',
                    color: '#ffffff',
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
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 2rem',
                    fontSize: '1rem',
                    color: '#ffffff',
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 2rem',
                    fontSize: '1rem',
                    color: '#ffffff',
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

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 2rem',
                    fontSize: '1rem',
                    color: '#ffffff',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
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
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
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
            </div>
          </div>

          {/* Map */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            height: '500px'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.8369841891647!2d-87.99663908451908!3d42.95879927914843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880518b8e0d8f5a1%3A0x1e8e5e5e5e5e5e5e!2s6221%20W%20Layton%20Ave%2C%20Milwaukee%2C%20WI%2053220!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section style={{
        background: '#000000',
        padding: '6rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '3rem'
          }}>
            Follow the Daily Drop
          </h2>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '🎵', label: 'TikTok', url: 'https://www.tiktok.com/@suchgrime' },
              { icon: '📸', label: 'Instagram', url: 'https://www.instagram.com/joetabora' },
              { icon: '📺', label: 'YouTube', url: 'https://www.youtube.com/@suchgrime414' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem 2.5rem',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '2rem' }}>{social.icon}</span>
                <span style={{
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '1px'
                }}>
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-card:hover {
          transform: translateY(-10px);
          border-color: rgba(234, 88, 12, 0.3);
          box-shadow: 0 20px 60px rgba(234, 88, 12, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }
        .social-link:hover {
          transform: translateY(-5px);
          border-color: rgba(234, 88, 12, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }
      `}} />
    </>
  );
}
