import { setPageSEO } from '@/lib/seo';
import { generateProductSchema, SITE_CONFIG } from '@/lib/seo';
import { getModelData, getAllModelSlugs } from '@/lib/model-data';
import { CTAButton } from '@/components/CTAButton';
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
  
  // setPageSEO automatically uses generateHarleyKeywords when modelName is provided
  return setPageSEO({
    pageTitle: `Used ${modelData.name} Motorcycles for Sale in Milwaukee`,
    pageDescription: `Buy a used ${modelData.name} in Milwaukee, Wisconsin. Starting at ${modelData.startingPrice}. Highway-ready and inspected. View specs, pricing, and financing options.`,
    modelName: modelData.name,
    location: 'Milwaukee',
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
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_CONFIG.url}/models/${model}`,
    name: `Used ${modelData.name} for Sale in Milwaukee`,
    image: modelData.image || SITE_CONFIG.image,
    description: `Buy a used ${modelData.name} in Milwaukee, Wisconsin. Starting at ${modelData.startingPrice}. ${modelData.seoContent.substring(0, 200)}...`,
    brand: {
      "@type": "Brand",
      name: "Harley-Davidson"
    },
    category: "Motorcycle",
    model: modelData.name,
    offers: {
      "@type": "Offer",
      price: modelData.startingPrice.replace(/[^0-9]/g, ''),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
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
      
      {/* Hero Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--black)', 
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          color: 'var(--text)', 
          marginBottom: '2rem',
          lineHeight: '1.1'
        }}>
          Used {modelData.name} Motorcycles for Sale in Milwaukee
        </h1>
        {modelData.image && (
          <div style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <Image 
              src={modelData.image} 
              alt={`Used ${modelData.name} for sale in Milwaukee`} 
              width={800} 
              height={600} 
              priority 
              sizes="(max-width: 768px) 100vw, 70vw"
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px',
                border: '2px solid var(--orange)'
              }}
            />
          </div>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="/inventory" variant="primary">
            View {modelData.name} Inventory
          </CTAButton>
          <CTAButton href="sms:4144396211" variant="secondary">
            Contact Joe
          </CTAButton>
        </div>
      </section>

      {/* SEO Content Section (300-500 words) */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--dark)', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
          lineHeight: '1.9', 
          color: 'var(--text)', 
          textAlign: 'left'
        }}>
          <div dangerouslySetInnerHTML={{ __html: modelData.seoContent.replace(/\n\n/g, '</p><p style={{ marginBottom: \'1.5rem\' }}>').replace(/^/, '<p style={{ marginBottom: \'1.5rem\' }}>').replace(/$/, '</p>') }} />
        </div>
      </section>

      {/* Specs Table Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--black)', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: 'var(--orange)', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          {modelData.name} Specifications
        </h2>
        <div style={{ 
          background: 'var(--dark)', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid var(--gray-light)'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            color: 'var(--text)'
          }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)',
                  width: '40%'
                }}>
                  Engine
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.engine}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Displacement
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.displacement}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Torque
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.torque}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Fuel Capacity
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.fuelCapacity}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Seat Height
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.seatHeight}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Weight (Dry)
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.weight}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Transmission
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.transmission}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '1.5rem', 
                  fontWeight: 600, 
                  color: 'var(--orange)'
                }}>
                  Wheelbase
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                  {modelData.specs.wheelbase}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Financing Info Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--dark)', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: 'var(--orange)', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Financing Your Used {modelData.name} in Milwaukee
        </h2>
        <div style={{ 
          background: 'var(--black)', 
          padding: '3rem', 
          borderRadius: '8px',
          border: '2px solid var(--orange)',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text)', 
            marginBottom: '1.5rem',
            lineHeight: '1.8'
          }}>
            <strong style={{ color: 'var(--orange)' }}>Starting at {modelData.startingPrice}</strong>
          </p>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-light)', 
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            {modelData.financingInfo}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton href={`sms:4144396211?body=Interested in financing a used ${encodeURIComponent(modelData.name)}`} variant="primary">
              Get Pre-Approved
            </CTAButton>
            <CTAButton href="tel:4144396211" variant="secondary">
              Call for Financing Info
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--black)', 
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: 'var(--orange)', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '2rem' 
        }}>
          Ready to Find Your Used {modelData.name} in Milwaukee?
        </h2>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-light)', 
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Browse our complete inventory of used {modelData.name} motorcycles or contact Joe directly to discuss your needs.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="/inventory" variant="primary">
            View All {modelData.name}s
          </CTAButton>
          <CTAButton href="sms:4144396211" variant="secondary">
            Text Joe Now
          </CTAButton>
        </div>
      </section>

      {/* Internal Links */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--dark)', 
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: 'var(--orange)', 
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
          marginBottom: '2rem' 
        }}>
          More Milwaukee Harley Resources
        </h2>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <Link 
            href="/used-harleys-milwaukee" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
          >
            Used Harleys Milwaukee
          </Link>
          <Link 
            href="/harley-for-sale-milwaukee" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
          >
            Harley for Sale Milwaukee
          </Link>
          <Link 
            href="/inventory" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
          >
            View All Inventory
          </Link>
          <Link 
            href="/" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
          >
            Home
          </Link>
        </div>
      </section>
    </>
  );
}
