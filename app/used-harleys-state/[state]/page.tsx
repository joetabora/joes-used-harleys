import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import { getStatePageData, getAllStatePageSlugs } from '@/lib/state-pages-data';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SocialFeed } from '@/components/SocialFeed';
import { FollowTheDrop } from '@/components/FollowTheDrop';
import { GetAlerts } from '@/components/GetAlerts';
import { SEO } from '@/components/SEO';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all state pages
export async function generateStaticParams() {
  const slugs = getAllStatePageSlugs();
  return slugs.map((slug) => ({
    state: slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  if (!state) {
    return setPageSEO({
      pageTitle: 'State Not Found',
      noindex: true,
      path: '/used-harleys-state-[state]'
    });
  }
  const stateData = getStatePageData(state);
  
  if (!stateData) {
    return setPageSEO({
      pageTitle: 'State Not Found',
      noindex: true,
      path: `/used-harleys-state-${state}`
    });
  }
  
  return setPageSEO({
    pageTitle: `Used Harleys ${stateData.name} | Pre-Owned Harley-Davidson ${stateData.abbr} | $499 Shipping Statewide`,
    pageDescription: `Low-mile used Harleys shipped anywhere in ${stateData.name} for only $499. Street Glide, Road Glide, Fat Boy & more. Bad credit OK. Text Joe 414-439-6211`,
    location: stateData.name,
    path: `/used-harleys-state/${stateData.slug}`
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  if (!state) {
    notFound();
  }
  const stateData = getStatePageData(state);
  
  if (!stateData) {
    notFound();
  }

  // Generate LocalBusiness schema for this state
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MotorcycleDealer", "AutomotiveBusiness"],
    "name": `Joe's Used Harleys - Shipping to ${stateData.name}`,
    "image": SITE_CONFIG.image,
    "@id": `${SITE_CONFIG.url}/used-harleys-state/${stateData.slug}`,
    "url": `${SITE_CONFIG.url}/used-harleys-state/${stateData.slug}`,
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
      "@type": "State",
      "name": stateData.name
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.95879927114352,
      "longitude": -87.99424712384211
    }
  };

  // FAQ Schema for state page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does it cost to ship a used Harley to ${stateData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Just $499 flat rate to ship anywhere in ${stateData.name}. Professional transport, fully insured, door-to-door service included.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does shipping take to ${stateData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most deliveries to ${stateData.name} happen in 2-4 days. Some areas may be faster. Your bike is fully insured during transport.`
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer financing for ${stateData.name} buyers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes! I work with buyers in ${stateData.name} with all credit situations. Bad credit, good credit, no credit – I have options that work.`
        }
      },
      {
        "@type": "Question",
        "name": `What's included with every used Harley shipped to ${stateData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Complete service records, 48-hour / 100-mile guarantee, $499 flat-rate shipping, all paperwork handled, and professional transport. Every bike is personally inspected before shipping."
        }
      }
    ]
  };

  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION */}
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
              🚚 $499 Shipping to {stateData.name}
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
              SHIPPED TO {stateData.name.toUpperCase()}
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
            New bikes drop daily on TikTok & Instagram. Premium selection, transparent pricing, $499 shipping anywhere in {stateData.name}.
          </p>
        </div>

        {/* Social Feed */}
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
          Don't see what you want? Follow — new bikes every day. $499 ships anywhere in {stateData.name}.
        </p>
      </section>

      {/* STATE INFO SECTION */}
      <section style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        padding: '8rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* State Content */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 6rem',
            color: '#9ca3af',
            fontSize: '1.05rem',
            lineHeight: '1.8'
          }}>
            {stateData.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cities We Ship To */}
          {stateData.cities.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
              marginBottom: '4rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: 'var(--font-clash)',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                {stateData.name} Cities We Ship To
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {stateData.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/used-harleys/${city.slug}`}
                    className="city-link"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: '#e5e7eb',
                      fontWeight: 600,
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {city.name} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Popular Routes */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'var(--font-clash)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Popular {stateData.name} Riding Routes
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {stateData.popularRoutes.map((route, idx) => (
                <li key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  color: '#e5e7eb',
                  fontSize: '1rem'
                }}>
                  🏍️ {route}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOLLOW THE DROP */}
      <FollowTheDrop />

      {/* GET ALERTS */}
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
            Get notified when new bikes drop — first dibs + $499 shipping to {stateData.name}
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .city-link:hover {
          border-color: #ea580c;
          background: rgba(234, 88, 12, 0.1);
          transform: translateY(-4px);
        }
      `}} />
    </>
  );
}
