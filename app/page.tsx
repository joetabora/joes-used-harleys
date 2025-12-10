'use client';

import { useState } from 'react';
import { generateFAQSchema } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { InventoryGrid } from '@/components/InventoryGrid';
import { InternalLinks } from '@/components/InternalLinks';
import { generateReviewSchema } from '@/lib/customer-reviews';
import Image from 'next/image';
import Link from 'next/link';

// FAQ data
const faqData = [
  {
    question: "Where to buy used Harleys in Milwaukee?",
    answer: "I'm at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220). It's the largest selection in town — Street Glides, Road Glides, Fat Boys, and more. Easy to browse online or stop by for a look. Serving all of southeastern Wisconsin."
  },
  {
    question: "How much do used Harleys cost here?",
    answer: "Prices range from $14,999 for entry-level models to $28,999 for loaded tourers. Street Glides and Road Glides usually hit $21,000–$24,000. No hidden fees — what you see is what you pay (plus tax/title). Financing makes it affordable."
  },
  {
    question: "Financing for used Harleys?",
    answer: "Absolutely — excellent credit, bad credit, first-time buyers, self-employed, all covered. Rates start at $299/month. I'll connect you with lenders who get it. Text me at 414-439-6211 to chat options."
  },
  {
    question: "Return policy?",
    answer: "48-hour/100-mile guarantee: If it's not right, bring it back for a full refund or fix. No hassle — I want you happy on the road."
  },
  {
    question: "Ship outside Milwaukee?",
    answer: "Yes, nationwide for $499 — insured and handled by pros. From Wisconsin to coast-to-coast, I'll get it to you safe."
  },
  {
    question: "Trade-ins?",
    answer: "Sure — I pay fair for clean rides. Send photos/details, and I'll appraise it toward your new one. Makes upgrading easy."
  }
];

export default function HomePage() {
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeWebSite={true} includeOrganization={true} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewSchema())
        }}
      />

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

      {/* Shipping Info */}
      <div style={{
        background: '#000000',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        borderBottom: '2px solid #FF6600'
      }}>
        <p style={{
          color: '#FF6600',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          fontWeight: 800,
          fontFamily: 'var(--font-clash)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: 0
        }}>
          $499 FLAT RATE NATIONWIDE — SHIPS IN 3–7 DAYS
        </p>
      </div>

      {/* Hero Section with Full-Screen Video */}
      <section className="hero" aria-label="Used Harley-Davidsons for Sale in Milwaukee" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem 4rem',
        position: 'relative',
        overflow: 'visible'
      }}>
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          aria-hidden="true"
          preload="metadata"
          poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: 0,
            objectFit: 'cover'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)',
          zIndex: 1
        }}></div>
        <div className="hero-content" style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          maxWidth: '1200px',
          padding: '2rem 1.5rem',
          margin: '0 auto'
        }}>
          <Image 
            src="/juh3.png" 
            alt="Joe's Used Harleys Logo - Buy Used Harley-Davidson Motorcycles in Milwaukee Wisconsin" 
            className="hero-logo" 
            width={600} 
            height={200}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px"
            quality={90}
            style={{
              maxWidth: 'min(75vw, 600px)',
              width: '100%',
              height: 'auto',
              margin: '0 auto 2rem',
              display: 'block',
              filter: 'drop-shadow(0 0 40px rgba(255, 102, 0, 0.3)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 8px 40px rgba(0, 0, 0, 0.7))',
              animation: 'logo-scale-in 1.5s ease-out'
            }}
          />
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            marginBottom: '1rem', 
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.1',
            fontFamily: 'var(--font-clash)',
            fontWeight: 700
          }}>
            Used Harleys Milwaukee | $499 Ship Nationwide
          </h1>
          <p className="subheadline" style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            marginBottom: '2rem', 
            color: '#CCCCCC',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            maxWidth: '700px'
          }}>
            Low miles • Full warranty • $499 ships nationwide
          </p>
        </div>
      </section>

      {/* FaceTime Banner */}
      <a
        href="sms:4144396211?body=FaceTime%20tour%20please"
        style={{
          display: 'block',
          background: '#FF6600',
          color: '#000000',
          textAlign: 'center',
          padding: 'clamp(1.5rem, 3vw, 2rem) 1.5rem',
          fontWeight: 800,
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          letterSpacing: '1px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          borderTop: '3px solid #000000',
          borderBottom: '3px solid #000000',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-clash)',
          position: 'relative',
          zIndex: 99
        }}
        className="facetime-banner"
      >
        🔴 LIVE FACETIME TOURS AVAILABLE — See any bike in real time. Text 414-439-6211 and say "FaceTime the [year/model]"
      </a>

      {/* Inventory Section */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#000000',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <InventoryGrid />
      </section>

      {/* Why Joe Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: '#000000',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#FF6600', 
          marginBottom: '3rem', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Why Joe
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {[
            { title: 'No BS Pricing', desc: 'The price you see is what you pay — no prep fees or hidden add-ons.' },
            { title: 'Inspected & Guaranteed', desc: '48hr/100-mile refund. Every bike inspected, full service records included.' },
            { title: 'Financing That Works', desc: 'Bad credit OK. Rates as low as $299/month. First-time buyers welcome.' },
            { title: 'Ships Anywhere', desc: '$499 flat rate nationwide. Fully insured, handled by pros.' },
            { title: 'FaceTime the Bike Before You Buy', desc: 'I\'ll fire it up, walk around, show every detail live on your phone. No pressure, no deposit to look.' }
          ].map((item, idx) => (
            <li key={idx} style={{
              padding: '1.5rem',
              background: '#0A0A0A',
              borderRadius: '8px',
              border: '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="chrome-check" style={{ 
                color: '#c0c0c0', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                border: '2px solid #c0c0c0',
                borderRadius: '50%',
                textShadow: '0 0 10px rgba(192, 192, 192, 0.6), 0 0 20px rgba(192, 192, 192, 0.4)',
                boxShadow: 'inset 0 0 10px rgba(192, 192, 192, 0.3), 0 0 15px rgba(192, 192, 192, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(192, 192, 192, 0.1) 100%)'
              }}>✓</span>
              <div>
                <strong style={{ color: '#FF6600', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  {item.title}
                </strong>
                <p style={{ color: '#CCCCCC', lineHeight: '1.7', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Pre-Approval Form */}
      <section className="preapproval" style={{
        padding: '6rem 1.5rem',
        background: '#0A0A0A',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Get Pre-Approved
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#CCCCCC', 
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}>
          Pre-Approved in Minutes — I'll text you back fast
        </p>
        <form 
          id="preapprovalForm"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setFormStatus({ type: null, message: '' });

            const formData = new FormData(e.currentTarget);
            const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              credit_score: formData.get('credit_score'),
              income: formData.get('income'),
              bike_interest: formData.get('bike_interest') || '',
            };
            
            try {
              const response = await fetch('https://formspree.io/f/xjknegnl', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify(data),
              });

              const result = await response.json();

              if (response.ok) {
                setFormStatus({ 
                  type: 'success', 
                  message: 'Thank you! We\'ll contact you soon via text or email.' 
                });
                (e.target as HTMLFormElement).reset();
              } else {
                if (result.errors) {
                  setFormStatus({ 
                    type: 'error', 
                    message: result.errors.map((err: any) => err.message).join(', ') || 'Something went wrong. Please text Joe at 414-439-6211 instead.' 
                  });
                } else {
                  setFormStatus({ 
                    type: 'error', 
                    message: result.error || 'Something went wrong. Please text Joe at 414-439-6211 instead.' 
                  });
                }
              }
            } catch (error) {
              console.error('Form submission error:', error);
              setFormStatus({ 
                type: 'error', 
                message: 'Network error. Please text Joe at 414-439-6211 instead.' 
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {formStatus.type && (
            <div style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              background: formStatus.type === 'success' ? '#0A4A0A' : '#4A0A0A',
              border: `2px solid ${formStatus.type === 'success' ? '#00FF00' : '#FF6600'}`,
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 600,
              borderRadius: '4px'
            }}>
              {formStatus.message}
            </div>
          )}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label>Credit Score Range</label>
            <select name="credit_score" required disabled={isSubmitting}>
              <option value="">Select...</option>
              <option value="excellent">750+</option>
              <option value="good">700-749</option>
              <option value="fair">650-699</option>
              <option value="poor">Below 650</option>
            </select>
          </div>
          <div className="form-group">
            <label>Monthly Income</label>
            <input type="number" name="income" placeholder="$" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label>Bike of Interest (Optional)</label>
            <input type="text" name="bike_interest" placeholder="e.g., 2023 Street Glide Special" disabled={isSubmitting} />
          </div>
          <button 
            type="submit" 
            className="form-submit" 
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT FOR PRE-APPROVAL'}
          </button>
        </form>
      </section>

      {/* FAQ Section with Native HTML Accordion */}
      <section className="faq-section" style={{ 
        padding: '6rem 1.5rem', 
        background: '#000000' 
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            color: '#FF6600', 
            marginBottom: '3rem', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            textAlign: 'center',
            fontFamily: 'var(--font-clash)',
            fontWeight: 700
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="faq-item"
                style={{
                  padding: '0',
                  background: '#0A0A0A',
                  borderRadius: '8px',
                  border: '1px solid #2A2A2A',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF6600';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A2A2A';
                }}
              >
                <summary
                  className="faq-question"
                  style={{
                    color: '#FF6600',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-clash)',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease',
                    marginLeft: '1rem'
                  }}>▼</span>
                </summary>
                <div
                  className="faq-answer"
                  style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    color: '#CCCCCC',
                    lineHeight: '1.8'
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO + Map Section */}
      <section className="local-seo" itemScope itemType="https://schema.org/LocalBusiness" style={{
        padding: '4rem 1.5rem',
        background: '#0A0A0A',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#FF6600',
          marginBottom: '2rem',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Used Harleys in Milwaukee, Wisconsin
        </h2>
        <p style={{
          color: '#CCCCCC',
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
          lineHeight: '1.8',
          fontSize: '1.1rem'
        }}>
          Looking for used Harleys in Milwaukee? I'm at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220) — the spot for low-mile pre-owned rides like Street Glides, Road Glides, Fat Boys, Heritage Classics, and Low Rider S. Serving Waukesha, Racine, Kenosha, and all of Wisconsin. Full warranty, financing, $499 nationwide shipping.
        </p>
        
        {/* Google Maps Embed */}
        <div style={{ margin: '3rem 0', maxWidth: '100%', height: '400px', border: '2px solid #FF6600', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.9243178731476!2d-87.99424712384211!3d42.95879927114352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880511b5f0600ac3%3A0x87f5600c68b8d805!2s6221%20W%20Layton%20Ave%2C%20Greenfield%2C%20WI%2053220!5e0!3m2!1sen!2sus!4v1763599487508!5m2!1sen!2sus" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Joe's Used Harleys Location - House Of Harley, 6221 W Layton Ave, Milwaukee Wisconsin 53220"
          />
        </div>
        
        <div className="local-links" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
          <Link href="/used-harleys-milwaukee" className="local-link">Used Harleys Milwaukee</Link>
          <Link href="/harley-for-sale-milwaukee" className="local-link">Harley for Sale Milwaukee</Link>
          <Link href="/milwaukee-harley-dealership" className="local-link">Milwaukee Harley Dealership</Link>
          <Link href="/used-street-glide-milwaukee" className="local-link">Street Glide Milwaukee</Link>
          <Link href="/used-road-glide-milwaukee" className="local-link">Road Glide Milwaukee</Link>
          <Link href="/used-fat-boy-milwaukee" className="local-link">Fat Boy Milwaukee</Link>
          <Link href="/used-heritage-classic-milwaukee" className="local-link">Heritage Classic Milwaukee</Link>
          <Link href="/used-low-rider-s-milwaukee" className="local-link">Low Rider S Milwaukee</Link>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <InternalLinks currentPage="home" />

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        background: '#000000',
        textAlign: 'center',
        borderTop: '1px solid #2A2A2A'
      }}>
        <p style={{
          color: '#CCCCCC',
          fontSize: '1rem'
        }}>
          Joe Tabora<span style={{ color: '#FF6600', margin: '0 0.75rem' }}>•</span>
          @joetabora<span style={{ color: '#FF6600', margin: '0 0.75rem' }}>•</span>
          All bikes titled through House Of Harley
        </p>
      </footer>

      {/* Floating FaceTime CTA */}
      <a
        href="sms:4144396211?body=FaceTime%20tour%20please"
        className="floating-cta facetime-cta" 
        aria-label="Request a FaceTime tour of used Harley-Davidson motorcycles"
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
          fontSize: '0.65rem',
          textAlign: 'center',
          boxShadow: '0 0 0 3px rgba(255, 102, 0, 0.3), 0 8px 30px rgba(255, 102, 0, 0.5)',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-clash)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: '1.1',
          padding: '0.4rem'
        }}
      >
        📱<br />FACETIME<br />TOUR
      </a>

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
          aria-label="Call Joe at 414-439-6211 about used Harleys in Milwaukee"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s',
            borderRadius: '4px',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          CALL
        </a>
        <a 
          href="sms:4144396211" 
          className="mobile-bar-btn" 
          aria-label="Text Joe at 414-439-6211 about used Harleys in Milwaukee"
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
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          TEXT
        </a>
        <a 
          href="#inventory" 
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
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          INVENTORY
        </a>
      </div>

      {/* Add CSS for logo scale-in animation and bike card hover effects */}
      <style jsx global>{`
        @keyframes logo-scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-float {
          0%, 100% { 
            transform: translateY(0);
            box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.3), 0 8px 30px rgba(255, 102, 0, 0.5);
          }
          50% { 
            transform: translateY(-10px);
            box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.5), 0 12px 40px rgba(255, 102, 0, 0.7);
          }
        }

        .floating-cta:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.5), 0 12px 40px rgba(255, 102, 0, 0.7);
          background: #FF8833;
        }

        .facetime-banner:hover {
          background: #FF8833;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 102, 0, 0.4);
        }

        /* Bike card hover effect with slight lift */
        .bike {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bike:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.3);
        }

        /* Chrome check icon styling */
        .chrome-check {
          color: #c0c0c0 !important;
          border-color: #c0c0c0 !important;
        }

        /* Native HTML details/summary styling */
        details summary::-webkit-details-marker {
          display: none;
        }

        details[open] summary span:last-child {
          transform: rotate(180deg);
        }

        details summary:focus {
          outline: 2px solid #FF6600;
          outline-offset: 2px;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .facetime-cta {
            width: 65px;
            height: 65px;
            bottom: 90px;
            right: 1.5rem;
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
      `}</style>
    </>
  );
}
