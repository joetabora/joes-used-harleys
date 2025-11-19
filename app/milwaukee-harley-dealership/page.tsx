import { setPageSEO } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Milwaukee Harley Dealership | Used Harley-Davidson Dealer Milwaukee WI',
  pageDescription: 'Milwaukee\'s trusted used Harley-Davidson dealership. Located at House Of Harley on W Layton Ave. Low miles, full warranty, financing available. Serving Milwaukee, Waukesha, Racine & all of Wisconsin.',
  pageKeywords: ['milwaukee harley dealership', 'harley dealership milwaukee', 'used harley dealer milwaukee', 'milwaukee harley davidson dealer', 'harley dealer milwaukee wi'],
  location: 'Milwaukee',
  path: '/milwaukee-harley-dealership'
});

export default function MilwaukeeHarleyDealershipPage() {
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
          Milwaukee Harley Dealership – Joe&apos;s Used Harleys
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--text-light)', 
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Milwaukee&apos;s premier <strong>used Harley-Davidson dealership</strong>. Located at <strong>House Of Harley</strong> on W Layton Ave, we serve riders throughout Milwaukee County and all of southeastern Wisconsin. No dealership games, just honest pricing and exceptional bikes.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="#inventory" variant="primary">
            View Inventory
          </CTAButton>
          <CTAButton href="sms:4144396211" variant="secondary">
            Contact Us
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
            Why Choose Our Milwaukee Harley Dealership?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            As Milwaukee&apos;s trusted <strong>used Harley-Davidson dealership</strong>, we&apos;ve built our reputation on transparency, fair pricing, and exceptional customer service. Unlike traditional dealerships, we don&apos;t play games with pricing or add hidden fees. The price you see is the price you pay (minus tax and title).
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Our <strong>Milwaukee Harley dealership</strong> is located at <strong>House Of Harley</strong>, 6221 W Layton Ave, Milwaukee, WI 53220. We&apos;re open Monday through Saturday, 9 AM to 6 PM, and serve riders throughout Milwaukee County, Waukesha, Racine, and all of southeastern Wisconsin.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            What Sets Our Milwaukee Harley Dealership Apart
          </h3>
          <ul style={{ fontSize: '1.1rem', marginLeft: '2rem', marginBottom: '2rem' }}>
            <li><strong>No Hidden Fees:</strong> Price you see is the price out the door (minus tax/title)</li>
            <li><strong>Full Transparency:</strong> Service records, Carfax, two keys, every mod listed</li>
            <li><strong>48-Hour Guarantee:</strong> If something&apos;s off in the first 48 hours or 100 miles, bring it back</li>
            <li><strong>Trade-Ins Welcome:</strong> We pay top dollar for clean bikes – guaranteed to beat local offers</li>
            <li><strong>Financing for Everyone:</strong> Bad credit, first bike, self-employed – we work with lenders who say yes</li>
            <li><strong>Direct Contact:</strong> Text or call Joe directly at <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> – he actually answers</li>
          </ul>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Our Milwaukee Harley Dealership Inventory
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Our <strong>Milwaukee Harley dealership</strong> features a curated selection of pre-owned Harley-Davidson motorcycles, including Street Glide, Road Glide, Fat Boy, Heritage Classic, Low Rider S, and more. Every bike in our <strong>Milwaukee Harley dealership</strong> inventory is inspected, serviced, and ready for Wisconsin roads.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Visit Our Milwaukee Harley Dealership
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <strong>Joe&apos;s Used Harleys</strong><br />
            Located at <strong>House Of Harley</strong><br />
            6221 W Layton Ave<br />
            Milwaukee, WI 53220<br />
            <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a>
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <strong>Hours:</strong> Monday - Saturday: 9:00 AM - 6:00 PM | Sunday: Closed
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Serving Milwaukee, Waukesha, Racine, and all of southeastern Wisconsin. We also ship nationwide for $499.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gray)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--orange)' }}>Ready to visit our Milwaukee Harley dealership?</strong>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Browse our inventory online, schedule a test ride, or stop by our <strong>Milwaukee Harley dealership</strong> at House Of Harley. We make buying a used Harley simple, transparent, and stress-free.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="/#inventory" variant="primary">
                View Inventory
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

