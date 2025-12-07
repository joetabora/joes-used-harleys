import { setPageSEO, generateProductSchema, SITE_CONFIG } from '@/lib/seo';
import { getModelPageData, getAllModelPageSlugs } from '@/lib/model-pages-data';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { BikeImage } from '@/components/BikeImage';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Fetch real inventory from API
async function getRealInventory() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/bikes`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch inventory:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.bikes || [];
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

// Filter bikes by model name
function filterBikesByModel(bikes: any[], modelName: string): any[] {
  const modelLower = modelName.toLowerCase();
  return bikes.filter((bike: any) => {
    const bikeNameLower = bike.name?.toLowerCase() || '';
    return bikeNameLower.includes(modelLower);
  });
}

// Generate static params for all model pages
export async function generateStaticParams() {
  const slugs = getAllModelPageSlugs();
  return slugs.map((slug) => ({
    'model-slug': slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ 'model-slug': string }> }): Promise<Metadata> {
  const { 'model-slug': slug } = await params;
  const modelData = getModelPageData(slug);
  
  if (!modelData) {
    return setPageSEO({
      pageTitle: 'Model Not Found',
      noindex: true,
      path: `/${slug}`
    });
  }
  
  return setPageSEO({
    pageTitle: `Used ${modelData.name} Milwaukee | Pre-Owned ${modelData.name} Wisconsin | Joe's Used Harleys`,
    pageDescription: `Low-mile used ${modelData.name} for sale in Milwaukee, Wisconsin. Bad credit financing, full warranty, $499 nationwide shipping. Text Joe 414-439-6211`,
    modelName: modelData.name,
    location: 'Milwaukee',
    path: `/${slug}`
  });
}

export default async function ModelPage({ params }: { params: Promise<{ 'model-slug': string }> }) {
  const { 'model-slug': slug } = await params;
  const modelData = getModelPageData(slug);
  
  if (!modelData) {
    notFound();
  }

  // Fetch real inventory and filter by model
  const allBikes = await getRealInventory();
  const filteredBikes = filterBikesByModel(allBikes, modelData.name);
  
  // Transform real bikes to match expected format, limit to 5 bikes
  const displayBikes = filteredBikes.slice(0, 5).map((bike: any) => {
    // Extract mileage from specs if available
    const mileageMatch = bike.specs?.match(/(\d{1,3}(?:,\d{3})*)\s*miles/i);
    const miles = mileageMatch ? mileageMatch[1] : 'N/A';
    
    return {
      id: bike.id,
      name: bike.name,
      price: bike.priceFormatted || `$${bike.price?.toLocaleString() || 'Call'}`,
      miles: miles,
      image: bike.image || 'https://files.catbox.moe/3n8q1r.jpg',
      specs: bike.specs || ''
    };
  });

  // Generate Product schemas for real bikes
  const productSchemas = displayBikes.length > 0 ? displayBikes.map((bike: any, index: number) => {
    const priceNum = parseInt(bike.price.replace(/[^0-9]/g, '')) || 0;
    return generateProductSchema({
      id: bike.id || `${slug}-bike-${index + 1}`,
      name: bike.name,
      image: bike.image,
      specs: bike.specs,
      price: priceNum,
      priceFormatted: bike.price,
      financing: `Financing available • ${bike.miles} miles`
    });
  }) : [];

  return (
    <>
      {/* Product Schemas for Real Bikes */}
      {productSchemas.map((schema: any, index: number) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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

      {/* Shipping Calculator */}
      <ShippingCalculator />

      {/* Hero Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: '#000000', 
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          color: '#FFFFFF', 
          marginBottom: '2rem',
          lineHeight: '1.1',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Used {modelData.displayName} for Sale in Milwaukee — $499 Ships Nationwide
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: '#CCCCCC',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Low miles • Full warranty • Bad credit financing OK • Text Joe 414-439-6211
        </p>
      </section>

      {/* Main Content Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: '#0A0A0A',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          color: '#CCCCCC',
          fontSize: '1.1rem',
          lineHeight: '1.9',
          whiteSpace: 'pre-line'
        }}>
          {modelData.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1.5rem' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Real Inventory Section */}
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
          Current {modelData.displayName} Inventory
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {displayBikes.length > 0 ? (
            displayBikes.map((bike: any, index: number) => (
              <article
                key={bike.id || index}
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
                    alt={`${bike.name} for sale in Milwaukee, Wisconsin. ${bike.specs}. Price: ${bike.price}. ${bike.miles} miles.`}
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
                  {bike.miles !== 'N/A' && (
                    <p style={{
                      color: '#CCCCCC',
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem'
                    }}>
                      {bike.miles} miles
                    </p>
                  )}
                  <a
                    href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} - ${bike.price} - ${bike.miles} miles`}
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
                    TEXT JOE ABOUT THIS {modelData.displayName.toUpperCase()}
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              background: '#0A0A0A',
              border: '2px solid #FF6600'
            }}>
              <p style={{
                color: '#CCCCCC',
                fontSize: '1.2rem',
                marginBottom: '1rem'
              }}>
                No {modelData.displayName} bikes in stock right now. Text Joe at{' '}
                <a
                  href="sms:4144396211"
                  style={{
                    color: '#FF6600',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  414-439-6211
                </a>
                {' '}to be notified when we get one in
              </p>
            </div>
          )}
        </div>
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
          Other Models We Sell
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {getAllModelPageSlugs()
            .filter(s => s !== slug)
            .slice(0, 6)
            .map((otherSlug) => {
              const otherModel = getModelPageData(otherSlug);
              if (!otherModel) return null;
              return (
                <Link
                  key={otherSlug}
                  href={`/${otherSlug}`}
                  className="model-link"
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
                  {otherModel.displayName}
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
            borderRadius: '4px'
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

      {/* CSS for mobile bar visibility and hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .mobile-bar {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .mobile-bar {
            display: none;
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

        .model-link:hover {
          background: #FF6600;
          color: #000000;
          border-color: #FF6600;
        }
      `}} />
    </>
  );
}

