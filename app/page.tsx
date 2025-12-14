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
        background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
        padding: '8rem 2rem 6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Main Tagline - Above Grid */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <p style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            color: '#FF6600',
            fontWeight: 900,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: 'var(--font-clash)',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.2'
          }}>
            NEW HARLEYS DROP DAILY — FOLLOW ON TIKTOK & IG TO NEVER MISS ONE. $499 SHIPS ANYWHERE.
          </p>
        </div>

        {/* Social Feed Grid/Carousel - Latest 8-10 Videos */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto 3rem'
        }}>
          <SocialFeed
            tiktokHandle="@suchgrime"
            instagramHandle="@joetabora"
            widgetId="9c7cbdce-5662-4a22-92f3-c17153f3f1c8"
          />
        </div>

        {/* Caption Under Grid */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: '#CCCCCC',
          fontWeight: 600,
          letterSpacing: '2px',
          textAlign: 'center',
          fontStyle: 'italic',
          maxWidth: '800px',
          margin: '0 auto',
          opacity: 0.9
        }}>
          Don&apos;t see what you want? Follow — new bikes every day.
        </p>
      </section>

      {/* LATEST DROPS SECTION - Embedded Social Videos with Price/CTA Overlay */}
      <section style={{
        background: '#0A0A0A',
        padding: '6rem 2rem',
        position: 'relative',
        borderTop: '3px solid #FF6600',
        borderBottom: '3px solid #FF6600'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: 'var(--font-clash)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(255, 102, 0, 0.5)'
            }}>
              LATEST DROPS
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#CCCCCC',
              fontWeight: 600,
              letterSpacing: '2px'
            }}>
              See every bike as it drops. Prices, specs, and real videos.
            </p>
          </div>

          {/* Social Feed Widget - Shows Real TikTok/Instagram Videos */}
          <div style={{
            marginTop: '3rem'
          }}>
            <SocialFeed
              tiktokHandle="@suchgrime"
              instagramHandle="@joetabora"
              widgetId="9c7cbdce-5662-4a22-92f3-c17153f3f1c8"
            />
          </div>
        </div>
      </section>

      {/* WHY BUY FROM JOE - Keep Existing 4 Bullets */}
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
            WHY BUY FROM JOE
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
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
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#0A0A0A',
                  border: '2px solid #1A1A1A',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
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
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  filter: 'drop-shadow(0 0 20px rgba(255, 102, 0, 0.5))'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#FF6600',
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#CCCCCC',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  fontWeight: 500
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLLOW THE DROP - Huge Neon Buttons */}
      <FollowTheDrop />

      {/* GET ALERTS - Newsletter/SMS Signup */}
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
            letterSpacing: '2px',
            lineHeight: '1.6'
          }}>
            Get notified when I drop a new bike — first dibs + $499 shipping
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* SEO CONTENT SECTION - Keyword Rich (Hidden but for SEO) */}
      <section style={{
        background: '#000000',
        padding: '4rem 2rem',
        position: 'relative',
        borderTop: '1px solid #1A1A1A'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            color: '#666666',
            lineHeight: '1.8',
            fontSize: '0.95rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <p style={{ marginBottom: '1rem' }}>
              Looking for <strong style={{ color: '#888888' }}>used Harleys in Milwaukee</strong>? You&apos;re in the right place. At <strong>House of Harley-Davidson</strong> (6221 W Layton Ave, Milwaukee, WI 53220), we offer the largest selection of <strong>used Harley-Davidson motorcycles</strong> in southeastern Wisconsin. Whether you&apos;re searching for a <strong>used Street Glide Milwaukee</strong>, <strong>used Road Glide Milwaukee</strong>, <strong>used Fat Boy Milwaukee</strong>, <strong>used Heritage Classic Milwaukee</strong>, or <strong>used Low Rider S Milwaukee</strong>, we have options for every rider and budget.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Every <strong>used Harley for sale in Milwaukee</strong> in our inventory has been personally inspected, serviced, and documented. We provide complete service records, Carfax reports, and detailed condition documentation. As a trusted <strong>Harley-Davidson dealer in Wisconsin</strong>, we maintain strict quality standards. All our <strong>used Harleys Milwaukee</strong> come with our 48-hour guarantee — if something&apos;s not right in the first 48 hours or 100 miles, bring it back for a full refund or fix.
            </p>
            <p style={{ marginBottom: '0' }}>
              Ready to find your perfect <strong>used Harley Milwaukee</strong>? Browse our latest drops above, follow us on <a href="https://www.tiktok.com/@suchgrime" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'none' }}>TikTok</a> and <a href="https://www.instagram.com/joetabora" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'none' }}>Instagram</a> for daily updates, or text Joe directly at <a href="sms:4144396211" style={{ color: '#888888', textDecoration: 'none', fontWeight: 700 }}>414-439-6211</a>. I answer fast — usually within minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#000000',
        padding: '4rem 2rem 3rem',
        borderTop: '2px solid #FF6600'
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
            <Link href="/events" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>EVENTS</Link>
            <Link href="/merch" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>MERCH</Link>
            <Link href="/contact" style={{ color: '#CCCCCC', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>CONTACT</Link>
          </div>

          <div style={{
            borderTop: '1px solid #1A1A1A',
            paddingTop: '2rem',
            color: '#666666',
            fontSize: '0.85rem',
            textAlign: 'center'
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
