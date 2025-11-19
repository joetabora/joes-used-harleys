import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Used Harleys Milwaukee | Used Harley-Davidson Motorcycles Milwaukee WI',
  description: 'Find the best used Harleys in Milwaukee, Wisconsin. Browse our inventory of pre-owned Harley-Davidson motorcycles including Street Glide, Road Glide, Fat Boy, Heritage Classic & more. Low miles, full warranty, financing available.',
  keywords: ['used harleys milwaukee', 'used harley milwaukee', 'used harley davidson milwaukee', 'milwaukee used motorcycles', 'used motorcycles milwaukee wi'],
  path: '/used-harleys-milwaukee'
});

export default function UsedHarleysMilwaukeePage() {
  return (
    <>
      <SEO type="website" includeLocalBusiness />
      
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
          Used Harleys in Milwaukee, Wisconsin
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--text-light)', 
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Looking for <strong>used Harleys in Milwaukee</strong>? You&apos;ve found Milwaukee&apos;s premier destination for pre-owned Harley-Davidson motorcycles. Our inventory features low-mileage, meticulously maintained <strong>used Harleys in Milwaukee</strong> ready for Wisconsin roads.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="#inventory" variant="primary">
            View Milwaukee Inventory
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
            Why Buy Used Harleys in Milwaukee?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            When searching for <strong>used Harleys in Milwaukee</strong>, you want a dealer who understands Wisconsin riding. Milwaukee&apos;s diverse terrain – from Lake Michigan shoreline to rolling countryside – demands reliable, well-maintained motorcycles. Our <strong>used Harleys in Milwaukee</strong> have proven their durability on Wisconsin roads.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Every <strong>used Harley we sell in Milwaukee</strong> comes with complete service history, Carfax reports, and our comprehensive 48-hour guarantee. We serve riders throughout Milwaukee County, Waukesha, Racine, and all of southeastern Wisconsin.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Popular Used Harley Models in Milwaukee
          </h3>
          <ul style={{ fontSize: '1.1rem', marginLeft: '2rem', marginBottom: '2rem' }}>
            <li><strong>Street Glide:</strong> Perfect for Milwaukee touring and long-distance rides</li>
            <li><strong>Road Glide:</strong> Ideal for highway cruising and Milwaukee-area day trips</li>
            <li><strong>Fat Boy:</strong> Classic styling perfect for Milwaukee city riding</li>
            <li><strong>Heritage Classic:</strong> Timeless design for Milwaukee&apos;s diverse riding conditions</li>
            <li><strong>Low Rider S:</strong> Sporty performance for Milwaukee&apos;s urban and suburban roads</li>
          </ul>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Milwaukee Location & Contact
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Visit us at <strong>House Of Harley</strong> on W Layton Ave in Milwaukee. We&apos;re open Monday through Saturday, 9 AM to 6 PM. Call or text <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> to schedule a viewing or test ride.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gray)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--orange)' }}>Ready to find your perfect used Harley in Milwaukee?</strong>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Browse our inventory, schedule a test ride, or ask about financing options. We make buying a <strong>used Harley in Milwaukee</strong> simple and transparent.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="/#inventory" variant="primary">
                View All Used Harleys
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
            href="/milwaukee-harley-dealership" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
          >
            Milwaukee Harley Dealership
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

