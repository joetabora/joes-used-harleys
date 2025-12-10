'use client';

import { useState } from 'react';
import { generateFAQSchema } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { InventoryGrid } from '@/components/InventoryGrid';
import { Navigation } from '@/components/Navigation';
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

      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION - Full Screen, Edgy, Rockstar */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000'
      }}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: 0,
            objectFit: 'cover',
            opacity: 0.4
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay with Gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Logo */}
          <div style={{
            marginBottom: '3rem',
            filter: 'drop-shadow(0 0 40px rgba(255, 102, 0, 0.6)) drop-shadow(0 8px 30px rgba(0, 0, 0, 0.8))'
          }}>
            <Image
              src="/juh3.png"
              alt="Joe's Used Harleys"
              width={600}
              height={200}
              priority
              style={{
                maxWidth: 'min(80vw, 600px)',
                height: 'auto',
                margin: '0 auto'
              }}
            />
          </div>

          {/* Main Headline - Rockstar Style */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            lineHeight: '1.1',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.5), 0 8px 30px rgba(0, 0, 0, 0.9)'
          }}>
            RIDE HARD
            <span style={{
              display: 'block',
              color: '#FF6600',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              marginTop: '0.5rem',
              textShadow: '0 0 60px rgba(255, 102, 0, 0.8)'
            }}>
              PAY SMART
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#CCCCCC',
            marginBottom: '3rem',
            fontWeight: 600,
            letterSpacing: '2px',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}>
            LOW MILES • FULL WARRANTY • BAD CREDIT FINANCING
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}>
            <Link
              href="/inventory"
              style={{
                background: '#FF6600',
                color: '#000000',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #FF6600',
                boxShadow: '0 0 30px rgba(255, 102, 0, 0.6)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(255, 102, 0, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FF6600';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 102, 0, 0.6)';
              }}
            >
              VIEW INVENTORY
            </Link>
            <a
              href="sms:4144396211"
              style={{
                background: 'transparent',
                color: '#FF6600',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #FF6600',
                boxShadow: '0 0 20px rgba(255, 102, 0, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF6600';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(255, 102, 0, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FF6600';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.3)';
              }}
            >
              TEXT JOE
            </a>
          </div>

          {/* Scroll Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite'
          }}>
            <div style={{
              width: '30px',
              height: '50px',
              border: '3px solid #FF6600',
              borderRadius: '25px',
              position: 'relative',
              boxShadow: '0 0 20px rgba(255, 102, 0, 0.5)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#FF6600',
                borderRadius: '50%',
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scroll 2s infinite'
              }}></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
          @keyframes scroll {
            0% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
          }
        `}</style>
      </section>

      {/* FEATURED INVENTORY SECTION - Grid Style like Dixxon */}
      <section style={{
        background: '#0A0A0A',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        {/* Section Header */}
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
            JUST DROPPED
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
            FEATURED RIDES
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#CCCCCC',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Low-mile bikes, full warranty, ready to ride
          </p>
        </div>

        {/* Inventory Grid */}
        <InventoryGrid limit={8} />
      </section>

      {/* WHY CHOOSE JOE - Edgy Cards */}
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

      {/* CTA SECTION - Bold, In Your Face */}
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
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#000000',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            READY TO RIDE?
          </h2>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#000000',
            fontWeight: 700,
            marginBottom: '3rem',
            letterSpacing: '1px'
          }}>
            Text Joe at <a href="sms:4144396211" style={{ color: '#000000', textDecoration: 'underline' }}>414-439-6211</a> or browse inventory now
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/inventory"
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
              VIEW ALL BIKES
            </Link>
          </div>
        </div>
      </section>

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
    </>
  );
}

