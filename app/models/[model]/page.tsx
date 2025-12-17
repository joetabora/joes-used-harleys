import { setPageSEO } from '@/lib/seo';
import { generateProductSchema, SITE_CONFIG } from '@/lib/seo';
import { getModelData, getAllModelSlugs } from '@/lib/model-data';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SocialFeed } from '@/components/SocialFeed';
import { FollowTheDrop } from '@/components/FollowTheDrop';
import { GetAlerts } from '@/components/GetAlerts';
import { SEO } from '@/components/SEO';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all model pages
export async function generateStaticParams() {
  const slugs = getAllModelSlugs();
  return slugs.map((slug) => ({
    model: slug,
  }));
}

// Generate metadata using generateHarleyKeywords automatically
export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model } = await params;
  const modelData = getModelData(model);
  
  if (!modelData) {
    return setPageSEO({
      pageTitle: 'Model Not Found',
      noindex: true,
      path: `/models/${model}`
    });
  }
  
  return setPageSEO({
    pageTitle: `Used ${modelData.name} Motorcycles for Sale | Shipped Nationwide $499 | Joe's Used Harleys`,
    pageDescription: `Buy a used ${modelData.name} shipped nationwide for $499. Starting at ${modelData.startingPrice}. Highway-ready and inspected. View specs, pricing, and financing options. Text Joe 414-439-6211`,
    modelName: modelData.name,
    location: 'Nationwide',
    path: `/models/${model}`,
    image: modelData.image
  });
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const modelData = getModelData(model);
  
  if (!modelData) {
    notFound();
  }
  
  // Generate Product schema for this model
  const priceMatch = modelData.startingPrice.match(/\$?([\d,]+)/);
  const numericPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 18500;
  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_CONFIG.url}/models/${model}`,
    name: `Used ${modelData.name} for Sale - Shipped Nationwide`,
    image: modelData.image || SITE_CONFIG.image,
    description: `Buy a used ${modelData.name} shipped nationwide for $499. Starting at ${modelData.startingPrice}. ${modelData.seoContent.substring(0, 200)}...`,
    brand: {
      "@type": "Brand",
      name: "Harley-Davidson"
    },
    category: "Motorcycle",
    model: modelData.name,
    offers: {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: priceValidUntil,
      url: `${SITE_CONFIG.url}/models/${model}`,
      seller: {
        "@type": "AutoDealer",
        name: SITE_CONFIG.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.zip
        }
      }
    }
  };
  
  return (
    <>
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      
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
            USED {modelData.name.toUpperCase()} FOR SALE
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
            NEW {modelData.name.toUpperCase()}S DROP DAILY — FOLLOW ON TIKTOK & IG. $499 SHIPS NATIONWIDE.
          </p>
          {modelData.image && (
            <div style={{
              marginTop: '2rem',
              maxWidth: '600px',
              margin: '2rem auto 0',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid #FF6600',
              boxShadow: '0 0 40px rgba(255, 102, 0, 0.4)'
            }}>
              <Image 
                src={modelData.image} 
                alt={`Used ${modelData.name} motorcycle for sale - shipped nationwide for $499`} 
                width={600} 
                height={400} 
                priority 
                sizes="(max-width: 768px) 100vw, 600px"
                quality={90}
                unoptimized={modelData.image.startsWith('https://')}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          )}
        </div>

        {/* Social Feed Grid/Carousel */}
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
          Don&apos;t see what you want? Follow — new {modelData.name}s drop every day. $499 ships anywhere.
        </p>
      </section>

      {/* WHY BUY FROM JOE */}
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
            WHY BUY A USED {modelData.name.toUpperCase()} FROM JOE?
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
                text: `What you see is what you pay. Starting at ${modelData.startingPrice}. No hidden fees, no market adjustments, no surprises.`
              },
              {
                icon: '🛡️',
                title: '48-HOUR GUARANTEE',
                text: 'Not right? Bring it back. We fix it or refund it. Simple as that. Your peace of mind matters.'
              },
              {
                icon: '💳',
                title: 'BAD CREDIT? NO PROBLEM',
                text: 'We work with everyone. First-time buyers, bad credit, self-employed — we got you. Financing available.'
              },
              {
                icon: '🚚',
                title: '$499 SHIPS NATIONWIDE',
                text: 'Coast to coast, insured, professional transport. Your used ' + modelData.name + ', delivered safely.'
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
            Get notified when I drop a new {modelData.name} — first dibs + $499 shipping
          </p>
          <GetAlerts />
        </div>
      </section>

      {/* SEO CONTENT SECTION - Less Prominent */}
      <section style={{
        background: '#0A0A0A',
        padding: '4rem 2rem',
        position: 'relative',
        borderTop: '1px solid #1A1A1A'
      }}>
        <div style={{
          maxWidth: '1000px',
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
            About the {modelData.name}
          </h2>
          
          <div style={{
            color: '#CCCCCC',
            lineHeight: '1.8',
            fontSize: '1rem',
            marginBottom: '3rem'
          }}>
            {modelData.seoContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Specs Table */}
          <div style={{
            background: '#000000',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid #1A1A1A',
            marginBottom: '3rem'
          }}>
            <h3 style={{
              color: '#FF6600',
              fontSize: '1.5rem',
              padding: '1.5rem',
              margin: 0,
              fontFamily: 'var(--font-clash)',
              fontWeight: 700,
              borderBottom: '2px solid #1A1A1A'
            }}>
              {modelData.name} Specifications
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: '#CCCCCC'
            }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600', width: '40%' }}>Engine</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.engine}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Displacement</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.displacement}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Torque</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.torque}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Fuel Capacity</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.fuelCapacity}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Seat Height</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.seatHeight}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Weight (Dry)</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.weight}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Transmission</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.transmission}</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: '#FF6600' }}>Wheelbase</td>
                  <td style={{ padding: '1.5rem' }}>{modelData.specs.wheelbase}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financing Info */}
          <div style={{
            background: '#000000',
            border: '2px solid #FF6600',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#FF6600',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 700
            }}>
              Financing Your Used {modelData.name}
            </h3>
            <p style={{
              fontSize: '1.3rem',
              color: '#FFFFFF',
              marginBottom: '1rem',
              fontWeight: 800
            }}>
              Starting at {modelData.startingPrice}
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#CCCCCC',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              {modelData.financingInfo}
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href={`sms:4144396211?body=Interested in financing a used ${encodeURIComponent(modelData.name)}`}
                style={{
                  background: '#FF6600',
                  color: '#000000',
                  padding: '1.25rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                className="cta-button"
              >
                GET PRE-APPROVED
              </a>
              <a
                href="tel:4144396211"
                style={{
                  background: 'transparent',
                  color: '#FF6600',
                  padding: '1.25rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-clash)',
                  border: '2px solid #FF6600',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                className="cta-button-secondary"
              >
                CALL FOR INFO
              </a>
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
        .cta-button:hover {
          background: transparent;
          color: #FF6600;
          border: 2px solid #FF6600;
          transform: scale(1.05);
        }
        .cta-button-secondary:hover {
          background: #FF6600;
          color: #000000;
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
