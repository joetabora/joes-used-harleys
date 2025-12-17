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
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: '#FFFFFF',
            fontWeight: 900,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-clash)',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.1'
          }}>
            USED HARLEYS SHIPPED TO {cityData.name.toUpperCase()}
          </h1>
          <p style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#FF6600',
            fontWeight: 900,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: 'var(--font-clash)',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.2'
          }}>
            NEW HARLEYS DROP DAILY — FOLLOW ON TIKTOK & IG TO NEVER MISS ONE. $499 SHIPS TO {cityData.name.toUpperCase()}.
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
            widgetId="3b6dbd54_1765944311"
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
          Don&apos;t see what you want? Follow — new bikes every day. Ships to {cityData.name} for $499.
        </p>
      </section>

      {/* LATEST DROPS SECTION */}
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
              LATEST DROPS TO {cityData.name.toUpperCase()}
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#CCCCCC',
              fontWeight: 600,
              letterSpacing: '2px'
            }}>
              See every bike as it drops. Prices, specs, and real videos. Ships to {cityData.name} for $499.
            </p>
          </div>

          {/* Social Feed Widget */}
          <div style={{
            marginTop: '3rem'
          }}>
            <SocialFeed
              tiktokHandle="@suchgrime"
              instagramHandle="@joetabora"
              widgetId="3b6dbd54_1765944311"
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
            WHY SHIP FROM JOE TO {cityData.name.toUpperCase()}?
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
                text: `What you see is what you pay. No hidden fees, no market adjustments, no surprises. Transparent pricing for ${cityData.name} buyers.`
              },
              {
                icon: '🛡️',
                title: '48-HOUR GUARANTEE',
                text: 'Not right? Bring it back. We fix it or refund it. Simple as that. Your peace of mind matters.'
              },
              {
                icon: '💳',
                title: 'BAD CREDIT? NO PROBLEM',
                text: 'We work with everyone. First-time buyers, bad credit, self-employed — we got you. Financing available for all credit types.'
              },
              {
                icon: '🚚',
                title: `$499 SHIPS TO ${cityData.name.toUpperCase()}`,
                text: `Coast to coast, insured, professional transport. Your bike, delivered to ${cityData.name} safely and on time.`
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
                className="why-buy-card"
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

      {/* FOLLOW THE DROP */}
      <FollowTheDrop />

      {/* GET ALERTS */}
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
            Get notified when I drop a new bike — first dibs + $499 shipping to {cityData.name}
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* SEO CONTENT SECTION - Keyword Rich (Less Prominent) */}
      <section style={{
        background: '#0A0A0A',
        padding: '4rem 2rem',
        position: 'relative',
        borderTop: '1px solid #1A1A1A'
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
        background: '#000000',
        padding: '4rem 2rem 3rem',
        borderTop: '2px solid #FF6600',
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

      <style dangerouslySetInnerHTML={{ __html: `
        .why-buy-card:hover {
          border-color: #FF6600;
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.4);
        }
        .model-link-seo:hover {
          border-color: #FF6600;
          background: #1A1A1A;
          transform: translateY(-4px);
        }
      `}} />
    </>
  );
}
