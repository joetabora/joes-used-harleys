'use client';

import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import Link from 'next/link';

// Event data - easy to update monthly
const events = [
  {
    id: 1,
    title: 'Service Workshop',
    date: 'December 13, 2025',
    time: 'All Day',
    description: 'Learn maintenance tips and tricks from our expert technicians. Bring your bike in for a check-up and get hands-on experience.',
    smsBody: 'See you at Service Workshop',
    icon: '🔧'
  },
  {
    id: 2,
    title: 'Photos with Santa',
    date: 'December 13-14, 2025',
    time: '10:00 AM - 6:00 PM',
    description: 'Bring the family and your bike for photos with Santa! Perfect holiday memories with your Harley. Free photos for all attendees.',
    smsBody: 'See you at Photos with Santa',
    icon: '🎅'
  },
  {
    id: 3,
    title: 'Last Minute Shopping',
    date: 'December 20-24, 2025',
    time: 'Extended Hours',
    description: 'Need that perfect gift? We\'re open extended hours for last-minute shopping. Parts, accessories, gear, and more.',
    smsBody: 'See you at Last Minute Shopping',
    icon: '🎁'
  },
  {
    id: 4,
    title: 'Annual Kill Winter Party',
    date: 'January 2026',
    time: 'Date TBD',
    description: 'The biggest party of the year! Celebrate the end of winter with live music, food, drinks, and the best riders in Milwaukee. Stay tuned for exact date.',
    smsBody: 'See you at Annual Kill Winter Party',
    icon: '🎉'
  }
];

export default function EventsPage() {
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
              🎉 Rider Events
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
            Upcoming Events
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '1px',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Come ride with me at these events. Text Joe at{' '}
            <a href="sms:4144396211" style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              fontWeight: 700
            }}>
              414-439-6211
            </a>
            {' '}if you&apos;re heading down — I&apos;ll hook you up.
          </p>
        </div>
      </section>

      {/* Events Grid */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {events.map((event, index) => (
              <div
                key={event.id}
                className="glass-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '3rem',
                  position: 'relative',
                  transition: 'all 0.4s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ea580c';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(234, 88, 12, 0.25)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                {/* Icon Badge */}
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
                  marginBottom: '2rem',
                  transition: 'all 0.3s ease'
                }}>
                  {event.icon}
                </div>

                {/* Event Title */}
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '0.5px',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2'
                }}>
                  {event.title}
                </h2>

                {/* Date & Time */}
                <div style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>📅</span>
                    <span style={{
                      color: '#e5e7eb',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.5px'
                    }}>
                      {event.date}
                    </span>
                  </div>
                  {event.time && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>⏰</span>
                      <span style={{
                        color: '#9ca3af',
                        fontSize: '0.95rem',
                        fontWeight: 500
                      }}>
                        {event.time}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  color: '#9ca3af',
                  lineHeight: '1.7',
                  fontSize: '1rem',
                  marginBottom: '2rem',
                  fontWeight: 400
                }}>
                  {event.description}
                </p>

                {/* Text Joe Button */}
                <a
                  href={`sms:4144396211?body=${encodeURIComponent(event.smsBody)}`}
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    padding: '1.25rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-clash)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(234, 88, 12, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(234, 88, 12, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.3)';
                  }}
                >
                  💬 Text Joe if You're Going
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '1.5rem'
          }}>
            Can't Make It?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#9ca3af',
            fontWeight: 500,
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Text Joe anyway — $499 ships bikes nationwide
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="sms:4144396211"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1.1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4)';
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>💬</span>
              TEXT JOE NOW
            </a>
            <Link
              href="/"
              className="glass-card"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1.1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.5)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              VIEW INVENTORY
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
