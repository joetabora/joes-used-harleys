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
    answer: "I'm at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220). It's the largest selection of used Harleys in Milwaukee — Street Glides, Road Glides, Fat Boys, Heritage Classic, Low Rider S, and more. Easy to browse online or stop by for a look. Serving all of southeastern Wisconsin. We're the trusted Harley-Davidson dealer Milwaukee riders count on."
  },
  {
    question: "How much do used Harleys cost in Milwaukee?",
    answer: "Used Harley prices in Milwaukee range from $14,999 for entry-level models to $28,999 for loaded tourers. Street Glides and Road Glides usually hit $21,000–$24,000. All our used Harleys for sale in Milwaukee have transparent pricing — no hidden fees, no market adjustments. What you see is what you pay (plus tax/title). Financing makes buying a used Harley in Milwaukee affordable, starting at $299/month."
  },
  {
    question: "Do you offer financing for used Harleys in Milwaukee?",
    answer: "Absolutely — we offer Harley financing Milwaukee riders trust. Excellent credit, bad credit, first-time buyers, self-employed, all covered. Rates start at $299/month. I'll connect you with lenders who get it. We work with multiple financing partners to make buying a used Harley in Milwaukee accessible to everyone. Text me at 414-439-6211 to chat options."
  },
  {
    question: "Return policy?",
    answer: "48-hour/100-mile guarantee: If it's not right, bring it back for a full refund or fix. No hassle — I want you happy on the road."
  },
  {
    question: "Do you ship used Harleys outside Milwaukee?",
    answer: "Yes, we ship used Harleys nationwide for $499 — fully insured and handled by professional transport companies. From Wisconsin to coast-to-coast, I'll get your Harley for sale Milwaukee safely to your door. Whether you're in California, Texas, Florida, or anywhere in the US, we make it easy to buy a used Harley from Milwaukee."
  },
  {
    question: "Trade-ins?",
    answer: "Sure — I pay fair for clean rides. Send photos/details, and I'll appraise it toward your new one. Makes upgrading easy."
  }
];

export default function HomePage() {
  return (
    <>
      {/* Global Styles for Premium Design */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --premium-black: #0a0a0a;
          --deep-black: #000000;
          --chrome-silver: #e5e7eb;
          --steel-gray: #6b7280;
          --amber-accent: #f59e0b;
          --orange-premium: #ea580c;
          --white-smoke: #f9fafb;
        }
        
        body {
          background: var(--premium-black);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .premium-gradient {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%);
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        
        .shine-effect:hover::before {
          left: 100%;
        }
      `}} />

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

      {/* HERO SECTION - Cinematic Full Bleed */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        padding: '10rem 2rem 8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(234, 88, 12, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)`,
          animation: 'pulse 8s ease-in-out infinite'
        }}></div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}} />

        {/* Main Hero Content */}
        <div style={{
          textAlign: 'center',
          marginBottom: '5rem',
          maxWidth: '1400px',
          width: '100%',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Premium Badge */}
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
              ⚡ Premium Selection • Daily Drops
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-2px',
            lineHeight: '1.1',
            textShadow: '0 0 80px rgba(255, 255, 255, 0.1)'
          }}>
            MILWAUKEE'S PREMIER
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              HARLEY DESTINATION
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '1px',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            New bikes drop daily on TikTok & Instagram. Premium selection, transparent pricing, nationwide shipping for just $499.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            <a
              href="sms:4144396211?body=I'm interested in a Harley!"
              className="shine-effect"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4), 0 0 0 1px rgba(234, 88, 12, 0.1)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.6), 0 0 0 1px rgba(234, 88, 12, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4), 0 0 0 1px rgba(234, 88, 12, 0.1)';
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>💬</span>
              TEXT JOE NOW
            </a>

            <a
              href="https://www.tiktok.com/@suchgrime"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🎵</span>
              VIEW LATEST DROPS
            </a>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0.7
          }}>
            {[
              { icon: '⚡', text: 'No BS Pricing' },
              { icon: '🛡️', text: '48-Hr Guarantee' },
              { icon: '🚚', text: '$499 Nationwide Shipping' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#9ca3af',
                  letterSpacing: '0.5px'
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Feed - Modern Card Layout */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <div className="glass-card" style={{
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <SocialFeed
              tiktokHandle="@suchgrime"
              instagramHandle="@joetabora"
              widgetId="3b6dbd54_1765944311"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'float 3s ease-in-out infinite',
          opacity: 0.5
        }}>
          <div style={{
            fontSize: '2rem',
            color: '#6b7280'
          }}>
            ↓
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JOE'S - Premium Card Grid */}
      <section style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        padding: '8rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'var(--font-clash)',
              letterSpacing: '-1px',
              marginBottom: '1rem'
            }}>
              Why Riders Choose Joe's
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              fontWeight: 500
            }}>
              More than just a dealership—a rider's paradise
            </p>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: '💎',
                title: 'Premium Selection',
                description: 'Handpicked Harleys. Every bike inspected, serviced, and documented with complete service records.',
                color: '#ea580c'
              },
              {
                icon: '⚡',
                title: 'No BS Pricing',
                description: 'What you see is what you pay. Zero hidden fees, zero market adjustments, zero surprises.',
                color: '#f59e0b'
              },
              {
                icon: '🛡️',
                title: '48-Hour Peace of Mind',
                description: 'Not feeling it? Bring it back within 48 hours or 100 miles. Full refund or we fix it.',
                color: '#ea580c'
              },
              {
                icon: '💳',
                title: 'Everyone Rides',
                description: 'Bad credit? First-time buyer? Self-employed? We work with everyone. $299/month financing available.',
                color: '#f59e0b'
              },
              {
                icon: '🚚',
                title: 'Ship Anywhere',
                description: 'Professional nationwide shipping for just $499. Fully insured, coast to coast.',
                color: '#ea580c'
              },
              {
                icon: '📱',
                title: 'Daily Drops',
                description: 'New bikes drop every day on TikTok & Instagram. Follow to never miss a deal.',
                color: '#f59e0b'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card shine-effect"
                style={{
                  padding: '3rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  filter: `drop-shadow(0 0 20px ${feature.color}60)`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '0.5px',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  fontWeight: 400
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLLOW THE DROP */}
      <FollowTheDrop />

      {/* GET ALERTS - Premium Form Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
        padding: '8rem 2rem',
        position: 'relative',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)',
        borderBottom: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '1rem'
          }}>
            Never Miss a Drop
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            marginBottom: '3rem',
            fontWeight: 500,
            lineHeight: '1.6'
          }}>
            Get notified when new bikes drop — first dibs + $499 nationwide shipping
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section style={{
        background: '#000000',
        padding: '4rem 2rem',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            color: '#4b5563',
            lineHeight: '1.8',
            fontSize: '0.95rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <p style={{ marginBottom: '1rem' }}>
              Looking for <strong style={{ color: '#6b7280' }}>used Harleys in Milwaukee</strong>? You're in the right place. At <strong>House of Harley-Davidson</strong> (6221 W Layton Ave, Milwaukee, WI 53220), we offer the largest selection of <strong>used Harley-Davidson motorcycles</strong> in southeastern Wisconsin. Whether you're searching for a <strong>used Street Glide Milwaukee</strong>, <strong>used Road Glide Milwaukee</strong>, <strong>used Fat Boy Milwaukee</strong>, <strong>used Heritage Classic Milwaukee</strong>, or <strong>used Low Rider S Milwaukee</strong>, we have options for every rider and budget.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Every <strong>used Harley for sale in Milwaukee</strong> in our inventory has been personally inspected, serviced, and documented. We provide complete service records, Carfax reports, and detailed condition documentation. As a trusted <strong>Harley-Davidson dealer in Wisconsin</strong>, we maintain strict quality standards. All our <strong>used Harleys Milwaukee</strong> come with our 48-hour guarantee — if something's not right in the first 48 hours or 100 miles, bring it back for a full refund or fix.
            </p>
            <p style={{ marginBottom: '0' }}>
              Ready to find your perfect <strong>used Harley Milwaukee</strong>? Browse our latest drops above, follow us on <a href="https://www.tiktok.com/@suchgrime" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>TikTok</a> and <a href="https://www.instagram.com/joetabora" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>Instagram</a> for daily updates, or text Joe directly at <a href="sms:4144396211" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 700 }}>414-439-6211</a>. I answer fast — usually within minutes.
            </p>
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        padding: '5rem 2rem 3rem',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Main Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem'
          }}>
            {/* Brand Column */}
            <div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '2px',
                marginBottom: '1rem'
              }}>
                JOE'S USED HARLEYS
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Milwaukee's premier destination for quality used Harley-Davidson motorcycles.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                {[
                  { icon: '🎵', url: 'https://www.tiktok.com/@suchgrime' },
                  { icon: '📸', url: 'https://www.instagram.com/joetabora' },
                  { icon: '📺', url: 'https://www.youtube.com/@suchgrime414' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card"
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Events', href: '/events' },
                  { label: 'Merch', href: '/merch' },
                  { label: 'Contact', href: '/contact' }
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    style={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ea580c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Get In Touch
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Location</div>
                  <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500 }}>
                    6221 W Layton Ave<br/>Milwaukee, WI 53220
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Phone</div>
                  <a href="tel:4144396211" style={{
                    color: '#ea580c',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700
                  }}>
                    414-439-6211
                  </a>
                </div>
                <a
                  href="sms:4144396211?body=Hey Joe!"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-clash)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    marginTop: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  TEXT JOE →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              color: '#4b5563',
              fontSize: '0.85rem'
            }}>
              © {new Date().getFullYear()} Joe's Used Harleys. All Rights Reserved.
            </div>
            <div style={{
              color: '#4b5563',
              fontSize: '0.85rem'
            }}>
              Built for riders, by riders. 🏍️
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
