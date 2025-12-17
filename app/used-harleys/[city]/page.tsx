import { setPageSEO, generateProductSchema, SITE_CONFIG } from '@/lib/seo';
import { getCityPageData, getAllCityPageSlugs } from '@/lib/city-pages-data';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SocialFeed } from '@/components/SocialFeed';
import { FollowTheDrop } from '@/components/FollowTheDrop';
import { GetAlerts } from '@/components/GetAlerts';
import { SEO } from '@/components/SEO';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all city pages
export async function generateStaticParams() {
  const slugs = getAllCityPageSlugs();
  return slugs.map((slug) => ({
    city: slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  if (!city) {
    return setPageSEO({
      pageTitle: 'City Not Found',
      noindex: true,
      path: '/used-harleys-[city]'
    });
  }
  const cityData = getCityPageData(city);
  
  if (!cityData) {
    return setPageSEO({
      pageTitle: 'City Not Found',
      noindex: true,
      path: `/used-harleys-${city}`
    });
  }
  
  return setPageSEO({
    pageTitle: `Used Harleys ${cityData.name} | Pre-Owned Harley-Davidson ${cityData.state} | Joe's Used Harleys $499 Shipping`,
    pageDescription: `Low-mile used Harleys shipped to ${cityData.name}, ${cityData.stateAbbr} for only $499. Street Glide, Road Glide, Fat Boy & more. Bad credit OK. Text Joe 414-439-6211`,
    location: cityData.name,
    path: `/used-harleys/${cityData.slug}`
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (!city) {
    notFound();
  }
  const cityData = getCityPageData(city);
  
  if (!cityData) {
    notFound();
  }

  // Generate LocalBusiness schema for this city
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MotorcycleDealer", "AutomotiveBusiness"],
    "name": `Joe's Used Harleys - Shipping to ${cityData.name}, ${cityData.stateAbbr}`,
    "image": SITE_CONFIG.image,
    "@id": `${SITE_CONFIG.url}/used-harleys/${cityData.slug}`,
    "url": `${SITE_CONFIG.url}/used-harleys/${cityData.slug}`,
    "telephone": "+1-414-439-6211",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6221 W Layton Ave",
      "addressLocality": "Milwaukee",
      "addressRegion": "WI",
      "postalCode": "53220",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.stateAbbr
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.95879927114352,
      "longitude": -87.99424712384211
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION - Premium Social Feed */}
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
        {/* Animated Background */}
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

        {/* Main Content */}
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
              🚚 $499 Shipping to {cityData.name}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-2px',
            lineHeight: '1.1'
          }}>
            USED HARLEYS
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              SHIPPED TO {cityData.name.toUpperCase()}
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '1px',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            New bikes drop daily on TikTok & Instagram. Premium selection, transparent pricing, $499 shipping to {cityData.name}.
          </p>
        </div>

        {/* Social Feed - Glass Card */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <div className="glass-card" style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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

        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '600px',
          margin: '3rem auto 0',
          position: 'relative',
          zIndex: 2
        }}>
          Don't see what you want? Follow — new bikes every day. $499 ships to {cityData.name}.
        </p>
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
              Why Ship From Joe to {cityData.name}?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              fontWeight: 500
            }}>
              More than just shipping—a rider's promise
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: '💎',
                title: 'Premium Selection',
                text: `Handpicked Harleys for ${cityData.name} riders. Every bike inspected, serviced, and documented with complete records.`,
                color: '#ea580c'
              },
              {
                icon: '⚡',
                title: 'No BS Pricing',
                text: 'What you see is what you pay. Zero hidden fees, zero market adjustments, zero surprises.',
                color: '#f59e0b'
              },
              {
                icon: '🛡️',
                title: '48-Hour Peace of Mind',
                text: 'Not feeling it? Bring it back within 48 hours or 100 miles. Full refund or we fix it.',
                color: '#ea580c'
              },
              {
                icon: '🚚',
                title: `$499 Ships to ${cityData.name}`,
                text: `Professional nationwide shipping. Fully insured, coast to coast delivery to ${cityData.name}.`,
                color: '#f59e0b'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '3rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
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
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLLOW THE DROP */}
      <FollowTheDrop />

      {/* GET ALERTS - Premium Form */}
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
            Get notified when new bikes drop — first dibs + $499 shipping to {cityData.name}
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* SEO CONTENT SECTION - Keyword Rich (Less Prominent) */}
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
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: '#FF6600',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Used Harleys for Sale Shipped to {cityData.name}, {cityData.stateAbbr}
          </h2>
          
          <div style={{
            color: '#CCCCCC',
            lineHeight: '1.8',
            fontSize: '1rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {cityData.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Model-Specific Sections for SEO */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{
              color: '#FF6600',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 700
            }}>
              Popular Models Shipped to {cityData.name}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { name: 'Street Glide', slug: 'street-glide' },
                { name: 'Road Glide', slug: 'road-glide' },
                { name: 'Fat Boy', slug: 'fat-boy' },
                { name: 'Heritage Classic', slug: 'heritage-classic' }
              ].map((model) => (
                <Link
                  key={model.slug}
                  href={`/models/${model.slug}`}
                  style={{
                    background: '#000000',
                    border: '1px solid #1A1A1A',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    color: '#CCCCCC',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  className="model-link-seo"
                >
                  <div style={{
                    color: '#FF6600',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-clash)',
                    letterSpacing: '1px'
                  }}>
                    Used {model.name} {cityData.name}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#888888'
                  }}>
                    View Details →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        padding: '4rem 2rem 3rem',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)',
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
              marginBottom: '0.5rem'
            }}>
              6221 W Layton Ave, Milwaukee, WI 53220
            </p>
            <p style={{
              color: '#6b7280',
              fontSize: '0.95rem',
              marginBottom: '2rem'
            }}>
              <a href="tel:4144396211" style={{
                color: '#ea580c',
                textDecoration: 'none',
                fontWeight: 700
              }}>414-439-6211</a>
              {' • '}
              <a href="sms:4144396211" style={{
                color: '#ea580c',
                textDecoration: 'none',
                fontWeight: 700
              }}>TEXT</a>
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'HOME', href: '/' },
              { label: 'BLOG', href: '/blog' },
              { label: 'EVENTS', href: '/events' },
              { label: 'MERCH', href: '/merch' },
              { label: 'CONTACT', href: '/contact' }
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="footer-link"
                style={{
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            color: '#4b5563',
            fontSize: '0.85rem'
          }}>
            © {new Date().getFullYear()} Joe's Used Harleys. All Rights Reserved. Built for riders, by riders. 🏍️
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(234, 88, 12, 0.3);
          box-shadow: 0 20px 60px rgba(234, 88, 12, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }
        .model-link-seo:hover {
          border-color: #ea580c;
          background: rgba(234, 88, 12, 0.05);
          transform: translateY(-4px);
        }
        .footer-link:hover {
          color: #ea580c;
        }
      `}} />
    </>
  );
}
