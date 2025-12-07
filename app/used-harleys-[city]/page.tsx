import { setPageSEO, generateProductSchema, SITE_CONFIG } from '@/lib/seo';
import { getCityPageData, getAllCityPageSlugs } from '@/lib/city-pages-data';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { BikeImage } from '@/components/BikeImage';
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
    pageTitle: `Used Harleys ${cityData.name} | Pre-Owned Harley-Davidson ${cityData.state} | Joe's Used Harleys`,
    pageDescription: `Low-mile used Harleys shipped to ${cityData.name} for only $499. Street Glide, Road Glide, Fat Boy & more. Bad credit OK. Text Joe 414-439-6211`,
    location: cityData.name,
    path: `/used-harleys-${cityData.slug}`
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

  // Generate Product schemas for example bikes
  const productSchemas = cityData.exampleBikes.map((bike, index) => 
    generateProductSchema({
      id: `${cityData.slug}-bike-${index + 1}`,
      name: bike.name,
      image: bike.image,
      specs: bike.specs,
      price: parseInt(bike.price.replace(/[^0-9]/g, '')),
      priceFormatted: bike.price,
      financing: `Financing available • ${bike.miles} miles • Ships to ${cityData.name} for $499`
    })
  );

  // Generate LocalBusiness schema for this city
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MotorcycleDealer", "AutomotiveBusiness"],
    "name": `Joe's Used Harleys - Shipping to ${cityData.name}, ${cityData.stateAbbr}`,
    "image": SITE_CONFIG.image,
    "@id": `${SITE_CONFIG.url}/used-harleys-${cityData.slug}`,
    "url": `${SITE_CONFIG.url}/used-harleys-${cityData.slug}`,
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
      {/* Product Schemas for Example Bikes */}
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
        WE SHIP TO {cityData.name.toUpperCase()} FOR ONLY $499
      </div>

      {/* Shipping Calculator */}
      <ShippingCalculator />

      {/* Hero Section with Video Background */}
      <section className="hero" style={{
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <video
          className="hero-video"
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
            objectFit: 'cover'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          animation: 'fade-in-up 1s ease-out'
        }}>
          <div style={{
            maxWidth: 'min(75vw, 600px)',
            height: 'auto',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 0 40px rgba(255, 102, 0, 0.3)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 8px 40px rgba(0, 0, 0, 0.7))',
            animation: 'logo-fade-in 1.5s ease-out'
          }}>
            <img
              src="/juh2.png"
              alt="Joe's Used Harleys Logo"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            fontFamily: 'var(--font-clash)',
            fontWeight: 700,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 102, 0, 0.3)'
          }}>
            Used Harleys in {cityData.name}
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#FF6600',
            fontWeight: 700,
            marginBottom: '2rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            $499 Ships from Milwaukee
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: '#0A0A0A',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Used Harleys for Sale in {cityData.name} — $499 Ships from Milwaukee
        </h2>
        <div style={{
          color: '#CCCCCC',
          fontSize: '1.1rem',
          lineHeight: '1.9',
          whiteSpace: 'pre-line'
        }}>
          {cityData.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1.5rem' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Top Used Harley Models Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: '#000000',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#FF6600', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Top Used Harley Models Shipped to {cityData.name}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {cityData.exampleBikes.map((bike, index) => {
            // Extract model name for linking
            const modelName = bike.name.replace(/^\d{4}\s+Harley-Davidson\s+/, '').replace(/\s+\d+.*$/, '').trim() || bike.name;
            const modelSlug = bike.modelSlug || 'street-glide';
            
            return (
              <article
                key={index}
                itemScope
                itemType="https://schema.org/Product"
                className="bike-card"
                style={{
                  background: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  borderRadius: '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <BikeImage
                    src={bike.image}
                    alt={`${bike.name} shipped to ${cityData.name}, ${cityData.stateAbbr}. ${bike.specs}. Price: ${bike.price}. ${bike.miles} miles.`}
                    index={index}
                    itemProp="image"
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 itemProp="name" style={{
                    color: '#FF6600',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-clash)'
                  }}>
                    {bike.name}
                  </h3>
                  <p style={{
                    color: '#CCCCCC',
                    fontSize: '0.95rem',
                    marginBottom: '0.75rem',
                    lineHeight: '1.6'
                  }}>
                    {bike.specs}
                  </p>
                  <p style={{
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-clash)'
                  }}>
                    {bike.price}
                  </p>
                  <p style={{
                    color: '#CCCCCC',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                  }}>
                    {bike.miles} miles
                  </p>
                  <Link
                    href={`/${modelSlug}`}
                    className="model-link-city"
                    style={{
                      display: 'block',
                      color: '#FF6600',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      transition: 'color 0.3s'
                    }}
                  >
                    Used {modelName} {cityData.name} →
                  </Link>
                  <a
                    href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} shipped to ${cityData.name} - ${bike.price} - ${bike.miles} miles`}
                    className="bike-cta-button"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '1rem',
                      background: '#FF6600',
                      color: '#000000',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderRadius: '0',
                      transition: 'all 0.3s',
                      fontFamily: 'var(--font-clash)'
                    }}
                  >
                    TEXT JOE ABOUT THIS BIKE
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Ship from Joe Section */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#0A0A0A',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Why Ship from Joe?
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: '2rem'
        }}>
          {[
            {
              title: 'Transparent Pricing, Zero Hidden Fees',
              text: `When you buy a used Harley shipped to ${cityData.name} from Joe's, the price you see is the price you pay – no surprise prep fees or market adjustments. We believe in honest, upfront pricing that makes buying a Harley simple and stress-free.`
            },
            {
              title: 'Comprehensive Inspections & Full Documentation',
              text: `Every used Harley we ship to ${cityData.name} undergoes rigorous inspection. You get complete service records, Carfax reports, and detailed condition documentation. Our standards ensure you know exactly what you're buying.`
            },
            {
              title: 'Financing for All Credit Types',
              text: `Bad credit? First-time buyer? Self-employed? We work with multiple lenders to secure financing for buyers shipping to ${cityData.name}. Our flexible options make owning a premium Harley-Davidson accessible to everyone.`
            },
            {
              title: '48-Hour Money-Back Guarantee',
              text: `We stand behind every used Harley we ship to ${cityData.name} with our 48-hour guarantee. If something's not right in the first 48 hours or 100 miles, we'll fix it or refund it, no questions asked.`
            }
          ].map((item, idx) => (
            <li key={idx} style={{
              padding: '1.5rem',
              background: '#000000',
              borderRadius: '0',
              border: '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span style={{
                color: '#FF6600',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>✓</span>
              <div>
                <strong style={{
                  color: '#FF6600',
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </strong>
                <p style={{
                  color: '#CCCCCC',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Pre-Approval Form Section */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#000000',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          GET PRE-APPROVED
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#CCCCCC',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Pre-Approved in Minutes — I'll text you back fast
        </p>
        <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: '#CCCCCC',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0A0A0A',
                border: '2px solid #2A2A2A',
                color: '#FFFFFF',
                fontSize: '1rem',
                borderRadius: '0',
                fontFamily: 'var(--font-inter)'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              color: '#CCCCCC',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0A0A0A',
                border: '2px solid #2A2A2A',
                color: '#FFFFFF',
                fontSize: '1rem',
                borderRadius: '0',
                fontFamily: 'var(--font-inter)'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              color: '#CCCCCC',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0A0A0A',
                border: '2px solid #2A2A2A',
                color: '#FFFFFF',
                fontSize: '1rem',
                borderRadius: '0',
                fontFamily: 'var(--font-inter)'
              }}
            />
          </div>
          <button
            type="submit"
            className="preapproval-button"
            style={{
              padding: '1.25rem 2rem',
              background: '#FF6600',
              color: '#000000',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              borderRadius: '0',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
          >
            Get Pre-Approved
          </button>
        </form>
      </section>

      {/* Internal Links Section */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#0A0A0A',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#FF6600',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          marginBottom: '2rem',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Other Cities We Ship To
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {getAllCityPageSlugs()
            .filter(s => s !== cityData.slug)
            .slice(0, 6)
            .map((otherSlug) => {
              const otherCity = getCityPageData(otherSlug);
              if (!otherCity) return null;
              return (
                <Link
                  key={otherSlug}
                  href={`/used-harleys-${otherSlug}`}
                  className="city-link"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#000000',
                    color: '#FF6600',
                    textDecoration: 'none',
                    border: '1px solid #2A2A2A',
                    borderRadius: '0',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {otherCity.name}
                </Link>
              );
            })}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Link
            href="/"
            style={{
              color: '#FF6600',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </section>

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

      {/* Floating CTA Button */}
      <a
        href="sms:4144396211"
        className="floating-cta"
        aria-label="Text Joe about used Harleys"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '2rem',
          background: '#FF6600',
          color: '#000000',
          padding: '1rem 2rem',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 800,
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          zIndex: 998,
          boxShadow: '0 8px 30px rgba(255, 102, 0, 0.4)',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-clash)',
          display: 'none'
        }}
      >
        TEXT JOE
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

      {/* CSS for animations and hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logo-fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .mobile-bar {
            display: flex;
          }
          .floating-cta {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-bar {
            display: none;
          }
          .floating-cta {
            display: block !important;
          }
        }

        .bike-card {
          cursor: pointer;
        }

        .bike-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.3);
          border-color: #FF6600;
        }

        .bike-cta-button:hover {
          background: #FF8833;
          transform: translateY(-2px);
        }

        .mobile-bar-btn:hover {
          color: #000000;
          background: #FF6600;
          transform: translateY(-2px);
        }

        .city-link:hover {
          background: #FF6600;
          color: #000000;
          border-color: #FF6600;
        }

        .model-link-city:hover {
          color: #FF8833;
        }

        .preapproval-button:hover {
          background: #FF8833;
          transform: translateY(-2px);
        }

        .floating-cta:hover {
          background: #FF8833;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.6);
        }
      `}} />
    </>
  );
}

