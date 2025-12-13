import { setPageSEO } from '@/lib/seo';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import Link from 'next/link';
import type { Metadata } from 'next';

// Events page SEO
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Harley Events Milwaukee 2025 | House of Harley-Davidson Events',
  pageDescription: 'Upcoming Harley events in Milwaukee — service workshops, Photos with Santa, Kill Winter Party. Text Joe 414-439-6211',
  pageKeywords: [
    'harley events milwaukee',
    'house of harley events',
    'harley davidson events milwaukee',
    'milwaukee harley events 2025',
    'harley service workshop milwaukee',
    'kill winter party milwaukee',
    'harley events wisconsin'
  ],
  location: 'Milwaukee',
  path: '/events'
});

// Event data - easy to update monthly
const events = [
  {
    id: 1,
    title: 'Service Workshop',
    date: 'December 13, 2025',
    time: 'All Day',
    description: 'Learn maintenance tips and tricks from our expert technicians. Bring your bike in for a check-up and get hands-on experience.',
    smsBody: 'See you at Service Workshop'
  },
  {
    id: 2,
    title: 'Photos with Santa',
    date: 'December 13-14, 2025',
    time: '10:00 AM - 6:00 PM',
    description: 'Bring the family and your bike for photos with Santa! Perfect holiday memories with your Harley. Free photos for all attendees.',
    smsBody: 'See you at Photos with Santa'
  },
  {
    id: 3,
    title: 'Last Minute Shopping',
    date: 'December 20-24, 2025',
    time: 'Extended Hours',
    description: 'Need that perfect gift? We\'re open extended hours for last-minute shopping. Parts, accessories, gear, and more.',
    smsBody: 'See you at Last Minute Shopping'
  },
  {
    id: 4,
    title: 'Annual Kill Winter Party',
    date: 'January 2026',
    time: 'Date TBD',
    description: 'The biggest party of the year! Celebrate the end of winter with live music, food, drinks, and the best riders in Milwaukee. Stay tuned for exact date.',
    smsBody: 'See you at Annual Kill Winter Party'
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
            Upcoming Events at House of Harley – Milwaukee
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
            Come ride with me at these events. Text Joe at <a href="sms:4144396211" style={{ color: '#FF6600', textDecoration: 'none', fontWeight: 700 }}>414-439-6211</a> if you&apos;re heading down — I&apos;ll hook you up.
          </p>
        </div>
      </section>

      {/* Events Grid */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginTop: '2rem'
          }}>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  background: '#000000',
                  border: '2px solid #1A1A1A',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
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
                {/* Event Title */}
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#FF6600',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  lineHeight: '1.2'
                }}>
                  {event.title}
                </h2>

                {/* Date & Time */}
                <div style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid #1A1A1A'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '1.5rem'
                    }}>📅</span>
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-clash)',
                      letterSpacing: '1px'
                    }}>
                      {event.date}
                    </span>
                  </div>
                  {event.time && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginTop: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '1.5rem'
                      }}>⏰</span>
                      <span style={{
                        color: '#CCCCCC',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}>
                        {event.time}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  color: '#CCCCCC',
                  lineHeight: '1.8',
                  fontSize: '1rem',
                  marginBottom: '2rem'
                }}>
                  {event.description}
                </p>

                {/* Text Joe Button */}
                <a
                  href={`sms:4144396211?body=${encodeURIComponent(event.smsBody)}`}
                  style={{
                    display: 'block',
                    background: '#FF6600',
                    color: '#000000',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-clash)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '2px solid #FF6600',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#FF6600';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FF6600';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Text Joe if You&apos;re Going
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Orange CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#000000',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            Don&apos;t See Your Event?
          </h2>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#000000',
            fontWeight: 700,
            marginBottom: '3rem',
            letterSpacing: '1px',
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
                background: '#000000',
                color: '#FF6600',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #000000',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              TEXT JOE NOW
            </a>
            <Link
              href="/"
              style={{
                background: 'transparent',
                color: '#000000',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #000000',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
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
              href="/blog"
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
              Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
