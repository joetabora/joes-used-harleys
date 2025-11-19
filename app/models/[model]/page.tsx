import { setPageSEO } from '@/lib/seo';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Example model page - auto-generates SEO for any Harley model
export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model } = await params;
  const modelName = decodeURIComponent(model).replace(/-/g, ' ');
  const capitalizedModel = modelName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return setPageSEO({
    modelName: capitalizedModel,
    location: 'Milwaukee',
    path: `/models/${model}`,
    pageDescription: `Buy a used ${capitalizedModel} in Milwaukee, Wisconsin. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.`
  });
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const modelName = decodeURIComponent(model).replace(/-/g, ' ');
  const capitalizedModel = modelName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  // Example models we support
  const validModels = [
    'street glide',
    'road glide',
    'fat boy',
    'heritage classic',
    'low rider',
    'softail',
    'sportster',
    'road king',
    'fat bob',
    'breakout'
  ];
  
  if (!validModels.includes(modelName.toLowerCase())) {
    notFound();
  }
  
  return (
    <>
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
          Used {capitalizedModel} for Sale in Milwaukee
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--text-light)', 
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Find the perfect <strong>used {capitalizedModel} in Milwaukee</strong>. Browse our inventory of pre-owned {capitalizedModel} motorcycles. Low miles, full warranty, financing available.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="/#inventory" variant="primary">
            View {capitalizedModel} Inventory
          </CTAButton>
          <CTAButton href="sms:4144396211" variant="secondary">
            Contact Joe
          </CTAButton>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--dark)', 
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          color: 'var(--text-light)',
          lineHeight: '1.8'
        }}>
          <h2 style={{ 
            color: 'var(--orange)', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            marginBottom: '2rem' 
          }}>
            About the {capitalizedModel}
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            The <strong>used {capitalizedModel} in Milwaukee</strong> is one of Harley-Davidson&apos;s most popular models. Whether you&apos;re looking for a <strong>used {capitalizedModel} for sale in Milwaukee</strong> for touring, cruising, or daily riding, we have options to fit your needs.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Every <strong>used {capitalizedModel} we sell in Milwaukee</strong> comes with complete service history, Carfax reports, and our comprehensive 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Why Milwaukee Riders Choose the {capitalizedModel}
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            The <strong>used {capitalizedModel} in Milwaukee</strong> is perfect for Wisconsin&apos;s diverse riding conditions. From Lake Michigan shoreline rides to country road cruising, the {capitalizedModel} delivers the performance and reliability Milwaukee riders demand.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Find Your Used {capitalizedModel} in Milwaukee
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Browse our inventory to find the perfect <strong>used {capitalizedModel} for sale in Milwaukee</strong>. Contact Joe at <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> to schedule a viewing or test ride.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gray)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--orange)' }}>Ready to find your used {capitalizedModel} in Milwaukee?</strong>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              View our complete inventory or contact Joe directly to discuss your {capitalizedModel} needs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="/#inventory" variant="primary">
                View All {capitalizedModel}s
              </CTAButton>
              <CTAButton href="sms:4144396211" variant="secondary">
                Text Joe Now
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--black)', 
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

