import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Harley for Sale Milwaukee | Used Harley-Davidson for Sale Milwaukee WI',
  description: 'Find Harley-Davidson motorcycles for sale in Milwaukee, Wisconsin. Browse our inventory of used Harleys including Street Glide, Road Glide, Fat Boy & more. Low miles, financing available. Located at House Of Harley.',
  keywords: ['harley for sale milwaukee', 'harley davidson for sale milwaukee', 'used harley for sale milwaukee', 'harley milwaukee', 'milwaukee harley davidson'],
  path: '/harley-for-sale-milwaukee'
});

export default function HarleyForSaleMilwaukeePage() {
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
          Harley for Sale in Milwaukee, Wisconsin
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--text-light)', 
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Searching for a <strong>Harley for sale in Milwaukee</strong>? Browse our curated selection of pre-owned Harley-Davidson motorcycles. Every <strong>Harley we sell in Milwaukee</strong> is inspected, serviced, and ready for Wisconsin roads.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="#inventory" variant="primary">
            View Harley Inventory
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
            Why Buy a Harley for Sale in Milwaukee?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            When you&apos;re looking for a <strong>Harley for sale in Milwaukee</strong>, you want quality, transparency, and fair pricing. At Joe&apos;s Used Harleys, every <strong>Harley we sell in Milwaukee</strong> comes with complete service records, Carfax reports, and our 48-hour guarantee.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Located at <strong>House Of Harley</strong> on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Whether you&apos;re looking for a touring bike for Lake Michigan rides or a cruiser for city streets, we have the perfect <strong>Harley for sale in Milwaukee</strong>.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            What Makes Our Harleys Different
          </h3>
          <ul style={{ fontSize: '1.1rem', marginLeft: '2rem', marginBottom: '2rem' }}>
            <li><strong>Low Mileage:</strong> Most of our <strong>Harleys for sale in Milwaukee</strong> have under 10,000 miles</li>
            <li><strong>Full Service History:</strong> Every bike comes with complete maintenance records</li>
            <li><strong>Inspection Guaranteed:</strong> Comprehensive pre-sale inspection on every <strong>Harley we sell in Milwaukee</strong></li>
            <li><strong>Financing Available:</strong> Bad credit, first bike, self-employed – we work with lenders who say yes</li>
            <li><strong>48-Hour Guarantee:</strong> If something&apos;s off in the first 48 hours or 100 miles, bring it back</li>
          </ul>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Popular Harley Models for Sale in Milwaukee
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Our inventory of <strong>Harleys for sale in Milwaukee</strong> includes popular models like the Street Glide, Road Glide, Fat Boy, Heritage Classic, and Low Rider S. Each <strong>Harley for sale in Milwaukee</strong> is priced fairly with no hidden fees or dealership games.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Visit Our Milwaukee Location
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Come see our <strong>Harleys for sale in Milwaukee</strong> at <strong>House Of Harley</strong>, 6221 W Layton Ave, Milwaukee, WI 53220. Open Monday through Saturday, 9 AM to 6 PM. Call or text <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> to schedule a viewing.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gray)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--orange)' }}>Ready to find your Harley for sale in Milwaukee?</strong>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Browse our inventory, schedule a test ride, or ask about trade-ins. We pay top dollar for clean bikes and make buying a <strong>Harley for sale in Milwaukee</strong> simple and stress-free.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="/#inventory" variant="primary">
                View All Harleys
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

