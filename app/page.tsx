'use client';

import { useState } from 'react';
import { generateFAQSchema } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { generateReviewSchema } from '@/lib/customer-reviews';
import { SocialFeed } from '@/components/SocialFeed';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { GetAlerts } from '@/components/GetAlerts';
import { FollowTheDrop } from '@/components/FollowTheDrop';
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

      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION - Social Feed Grid */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        background: '#000000',
        padding: '6rem 2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Main Tagline */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            lineHeight: '1.1',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.5), 0 8px 30px rgba(0, 0, 0, 0.9)'
          }}>
            NEW HARLEYS DROP DAILY
          </h1>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            color: '#FF6600',
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: 'var(--font-clash)',
            textShadow: '0 0 30px rgba(255, 102, 0, 0.8)'
          }}>
            FOLLOW ON TIKTOK & IG TO NEVER MISS ONE
          </p>
          <p style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            color: '#CCCCCC',
            fontWeight: 700,
            letterSpacing: '2px',
            marginTop: '1.5rem'
          }}>
            $499 SHIPS ANYWHERE
          </p>
        </div>

        {/* Social Feed Grid/Carousel */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <SocialFeed
            tiktokHandle="@suchgrime"
            instagramHandle="@joetabora"
            widgetId="9c7cbdce-5662-4a22-92f3-c17153f3f1c8"
          />
        </div>
      </section>

      {/* LATEST DROPS SECTION */}
      <section style={{
        background: '#0A0A0A',
        padding: '6rem 2rem',
        position: 'relative',
        borderTop: '2px solid #FF6600',
        borderBottom: '2px solid #FF6600'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 2rem',
              background: '#FF6600',
              color: '#000000',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-clash)',
              marginBottom: '1.5rem'
            }}>
              DAILY DROPS
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: 'var(--font-clash)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
            }}>
              LATEST DROPS
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#CCCCCC',
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: 600
            }}>
              See every bike as it drops. Prices, specs, and real videos.
            </p>
          </div>

          {/* Embedded Social Videos with Price/CTA Overlay */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Note: In production, these would be actual embedded TikTok/Instagram videos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                style={{
                  background: '#000000',
                  border: '2px solid #1A1A1A',
                  borderRadius: '16px',
                  padding: '1rem',
                  aspectRatio: '9/16',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 102, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1A1A1A';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Price Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#FF6600',
                  color: '#000000',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '2px',
                  zIndex: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}>
                  ${(20000 + item * 2000).toLocaleString()}
                </div>

                {/* Video Placeholder */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  color: '#FF6600',
                  fontSize: '3rem'
                }}>
                  <div>📱</div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#CCCCCC',
                    textAlign: 'center',
                    padding: '0 1rem'
                  }}>
                    Video {item}
                  </div>
                </div>

                {/* CTA Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'calc(100% - 2rem)',
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '2px solid #FF6600',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    zIndex: 3,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.location.href = 'sms:4144396211'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FF6600';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                    e.currentTarget.style.color = '#FF6600';
                  }}
                >
                  <div style={{
                    color: '#FF6600',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-clash)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    TEXT JOE 414-439-6211
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JOE - Keep Existing */}
      <section style={{
        background: '#000000',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '4rem',
            textShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
          }}>
            WHY RIDE WITH JOE
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              {
                icon: '⚡',
                title: 'NO BULLSHIT PRICING',
                text: 'What you see is what you pay. No hidden fees, no market adjustments, no surprises.'
              },
              {
                icon: '🛡️',
                title: '48-HOUR GUARANTEE',
                text: 'Not right? Bring it back. We fix it or refund it. Simple as that.'
              },
              {
                icon: '💳',
                title: 'BAD CREDIT? NO PROBLEM',
                text: 'We work with everyone. First-time buyers, bad credit, self-employed — we got you.'
              },
              {
                icon: '🚚',
                title: '$499 NATIONWIDE SHIPPING',
                text: 'Coast to coast, insured, professional transport. Your bike, delivered.'
              },
              {
                icon: '🔧',
                title: 'FULL WARRANTY',
                text: 'Every bike inspected, documented, and backed by our warranty.'
              },
              {
                icon: '📱',
                title: 'TEXT JOE DIRECTLY',
                text: 'No automated BS. Text 414-439-6211 and talk to a real person who gets it.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: '#0A0A0A',
                  border: '2px solid #1A1A1A',
                  padding: '2.5rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
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
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#FF6600',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#CCCCCC',
                  lineHeight: '1.8',
                  fontSize: '1rem'
                }}>
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLLOW THE DROP SECTION */}
      <FollowTheDrop />

      {/* GET ALERTS SECTION */}
      <GetAlerts />

      {/* FAQ SECTION - Accordion Style */}
      <section style={{
        background: '#0A0A0A',
        padding: '6rem 2rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            QUESTIONS?
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {faqData.map((faq, index) => (
              <details
                key={index}
                style={{
                  background: '#000000',
                  border: '2px solid #1A1A1A',
                  padding: '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF6600';
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.open) {
                    e.currentTarget.style.borderColor = '#1A1A1A';
                  }
                }}
                onToggle={(e) => {
                  if (e.currentTarget.open) {
                    e.currentTarget.style.borderColor = '#FF6600';
                  }
                }}
              >
                <summary
                  style={{
                    padding: '1.5rem 2rem',
                    color: '#FFFFFF',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-clash)',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{
                    color: '#FF6600',
                    fontSize: '1.5rem',
                    transition: 'transform 0.3s ease'
                  }}>+</span>
                </summary>
                <div style={{
                  padding: '0 2rem 1.5rem 2rem',
                  color: '#CCCCCC',
                  lineHeight: '1.8',
                  fontSize: '1rem'
                }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Edgy, Minimal */}
      <footer style={{
        background: '#000000',
        borderTop: '2px solid #FF6600',
        padding: '4rem 2rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: '#FF6600',
              fontFamily: 'var(--font-clash)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              JOE'S USED HARLEYS
            </div>
            <p style={{
              color: '#CCCCCC',
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}>
              6221 W Layton Ave, Milwaukee, WI 53220
            </p>
            <p style={{
              color: '#CCCCCC',
              fontSize: '1rem',
              marginBottom: '2rem'
            }}>
              <a href="tel:4144396211" style={{ color: '#FF6600', textDecoration: 'none' }}>414-439-6211</a> • <a href="sms:4144396211" style={{ color: '#FF6600', textDecoration: 'none' }}>TEXT</a>
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <Link href="/" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>HOME</Link>
            <Link href="/inventory" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>INVENTORY</Link>
            <Link href="/events" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>EVENTS</Link>
            <Link href="/merch" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>MERCH</Link>
            <Link href="/contact" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>CONTACT</Link>
          </div>

          <div style={{
            borderTop: '1px solid #1A1A1A',
            paddingTop: '2rem',
            color: '#666666',
            fontSize: '0.85rem'
          }}>
            © {new Date().getFullYear()} Joe's Used Harleys. All Rights Reserved. | Built for riders, by riders.
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
