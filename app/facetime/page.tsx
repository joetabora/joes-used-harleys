import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Book a FaceTime Tour | Live Showroom Walkthrough | Joe\'s Used Harleys',
  pageDescription: 'Book a free 10-minute FaceTime tour of any used Harley. See the bike in real time, ask questions, no pressure. Text Joe 414-439-6211 or book online.',
  path: '/facetime'
});

export default function FaceTimePage() {
  return (
    <>
      {/* Urgency Banner */}
      <div className="urgency-banner" style={{
        background: '#FF6600',
        color: '#000000',
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontWeight: 800,
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        letterSpacing: '1.5px',
        position: 'relative',
        zIndex: 100,
        textTransform: 'uppercase'
      }}>
        WE SHIP NATIONWIDE FOR ONLY $499
      </div>

      {/* Hero Section */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#000000',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: '#FFFFFF',
          marginBottom: '1rem',
          lineHeight: '1.1',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Book a 10-Min FaceTime Tour
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: '#CCCCCC',
          marginBottom: '2rem',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 2rem'
        }}>
          See any bike in real time. I'll fire it up, walk around, show every detail live on your phone. No pressure, no deposit to look.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <a
            href="sms:4144396211?body=FaceTime%20tour%20please"
            style={{
              padding: '1rem 2rem',
              background: '#FF6600',
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            Text Joe for Instant Tour
          </a>
          <Link
            href="/inventory"
            style={{
              padding: '1rem 2rem',
              background: '#000000',
              color: '#FF6600',
              textDecoration: 'none',
              border: '2px solid #FF6600',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            View Inventory
          </Link>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#0A0A0A',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Schedule Your Tour
        </h2>
        <p style={{
          color: '#CCCCCC',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Pick a time that works for you. I'll call you on FaceTime and show you the bike live.
        </p>
        <div style={{
          background: '#000000',
          padding: '2rem',
          border: '2px solid #FF6600',
          borderRadius: '8px',
          minHeight: '700px'
        }}>
          {/* Calendly Embed - Replace with your actual Calendly link */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/joesusedharleys/facetime-tour"
            style={{
              minWidth: '320px',
              height: '700px'
            }}
          />
          <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
            async
          />
        </div>
        <p style={{
          color: '#999999',
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}>
          Prefer to text? Just send "FaceTime tour" to 414-439-6211 and I'll call you right back.
        </p>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#000000',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          How FaceTime Tours Work
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { step: '1', title: 'Text or Book', desc: 'Text 414-439-6211 or book a time above. Tell me which bike you want to see.' },
            { step: '2', title: 'I Call You', desc: 'I\'ll FaceTime you at the scheduled time (or right away if you text).' },
            { step: '3', title: 'Live Walkthrough', desc: 'I\'ll fire up the bike, walk around it, show every detail. Ask questions live.' },
            { step: '4', title: 'No Pressure', desc: 'No deposit, no commitment. Just see the bike and decide if it\'s right for you.' }
          ].map((item) => (
            <div key={item.step} style={{
              background: '#0A0A0A',
              border: '1px solid #2A2A2A',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FF6600',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 800,
                margin: '0 auto 1rem',
                fontFamily: 'var(--font-clash)'
              }}>
                {item.step}
              </div>
              <h3 style={{
                color: '#FF6600',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontFamily: 'var(--font-clash)',
                fontWeight: 700
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#CCCCCC',
                lineHeight: '1.7',
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#0A0A0A',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '2rem',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Ready to See a Bike?
        </h2>
        <p style={{
          color: '#CCCCCC',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          Text me at{' '}
          <a
            href="sms:4144396211?body=FaceTime%20tour%20please"
            style={{
              color: '#FF6600',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.3rem'
            }}
          >
            414-439-6211
          </a>
          {' '}and say "FaceTime the [year/model]" — I'll call you right back.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="sms:4144396211?body=FaceTime%20tour%20please"
            style={{
              padding: '1rem 2rem',
              background: '#FF6600',
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            Text for Instant Tour
          </a>
          <Link
            href="/inventory"
            style={{
              padding: '1rem 2rem',
              background: '#000000',
              color: '#FF6600',
              textDecoration: 'none',
              border: '2px solid #FF6600',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-bar" role="navigation" aria-label="Mobile navigation menu" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, #000000 0%, #0A0A0A 100%)',
        borderTop: '1px solid #1A1A1A',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        zIndex: 999,
        boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 102, 0, 0.1)'
      }}>
        <a 
          href="tel:4144396211" 
          className="mobile-bar-btn" 
          aria-label="Call Joe at 414-439-6211 about used Harleys"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s',
            borderRadius: '4px'
          }}
        >
          CALL
        </a>
        <a 
          href="sms:4144396211?body=FaceTime%20tour%20please" 
          className="mobile-bar-btn" 
          aria-label="Request FaceTime tour of used Harleys"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s',
            borderRadius: '4px'
          }}
        >
          FACETIME
        </a>
        <a 
          href="sms:4144396211" 
          className="mobile-bar-btn" 
          aria-label="Text Joe at 414-439-6211 about used Harleys"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s',
            borderRadius: '4px'
          }}
        >
          TEXT
        </a>
        <a 
          href="/inventory" 
          className="mobile-bar-btn" 
          aria-label="View inventory of used Harley-Davidson motorcycles"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s',
            borderRadius: '4px'
          }}
        >
          INVENTORY
        </a>
      </div>

      {/* Floating CTA Buttons */}
      <a
        href="sms:4144396211"
        className="floating-cta" 
        aria-label="Text Joe now about used Harley-Davidson motorcycles for sale in Milwaukee"
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          background: '#FF6600',
          color: '#000000',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          fontWeight: 800,
          fontSize: '0.7rem',
          textAlign: 'center',
          boxShadow: '0 0 0 3px rgba(255, 102, 0, 0.3), 0 8px 30px rgba(255, 102, 0, 0.5)',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-clash)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          lineHeight: '1.2'
        }}
      >
        TEXT<br />JOE
      </a>
      <a
        href="sms:4144396211?body=FaceTime%20tour%20please"
        className="floating-cta facetime-cta" 
        aria-label="Request a FaceTime tour of used Harley-Davidson motorcycles"
        style={{
          position: 'fixed',
          bottom: '11rem',
          right: '2.5rem',
          background: '#FF6600',
          color: '#000000',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          fontWeight: 800,
          fontSize: '0.65rem',
          textAlign: 'center',
          boxShadow: '0 0 0 3px rgba(255, 102, 0, 0.3), 0 8px 30px rgba(255, 102, 0, 0.5)',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-clash)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: '1.1'
        }}
      >
        📱<br />FACETIME<br />TOUR
      </a>

      {/* CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 102, 0, 0.4);
        }

        .mobile-bar-btn:hover {
          color: #000000;
          background: #FF6600;
          transform: translateY(-2px);
        }

        .floating-cta:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.5), 0 12px 40px rgba(255, 102, 0, 0.7);
          background: #FF8833;
        }

        @media (max-width: 768px) {
          .floating-cta {
            width: 65px;
            height: 65px;
            bottom: 90px;
            right: 1.5rem;
            font-size: 0.6rem;
          }

          .facetime-cta {
            bottom: 170px !important;
            font-size: 0.55rem !important;
          }

          .mobile-bar {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .mobile-bar {
            display: none;
          }
        }
      `}} />
    </>
  );
}

