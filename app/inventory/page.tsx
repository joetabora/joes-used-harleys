import { setPageSEO } from '@/lib/seo';
import { InventoryGrid } from '@/components/InventoryGrid';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Link from 'next/link';

// Inventory page SEO - targeting "near me" and "cheap" keywords
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Used Harleys for Sale Near Me | Cheap Harleys Milwaukee',
  pageDescription: 'Browse our complete inventory of used Harleys for sale near you in Milwaukee, Wisconsin. Find cheap Harleys, affordable financing options, and low-mileage bikes. View all available models including Street Glide, Road Glide, Fat Boy & more.',
  pageKeywords: [
    'used harleys for sale near me',
    'cheap harleys milwaukee',
    'affordable harleys milwaukee',
    'used harleys near me',
    'harleys for sale near me',
    'cheap used harleys',
    'affordable harley davidson milwaukee',
    'low price harleys milwaukee'
  ],
  location: 'Milwaukee',
  path: '/inventory'
});

export default function InventoryPage() {
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
          Used Harleys for Sale Near Me – Complete Inventory
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--text-light)', 
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Browse our complete inventory of <strong>used Harleys for sale near you</strong> in Milwaukee. Find <strong>cheap Harleys</strong> with affordable financing options. Every bike is inspected, serviced, and ready to ride.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="sms:4144396211" variant="primary">
            Contact Joe
          </CTAButton>
          <CTAButton href="/" variant="secondary">
            Back to Home
          </CTAButton>
        </div>
      </section>

      {/* Inventory Grid */}
      <section id="inventory" style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--dark)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <InventoryGrid />
      </section>

      {/* SEO Content */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--black)', 
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
            Find Used Harleys for Sale Near Me in Milwaukee
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Looking for <strong>used Harleys for sale near me</strong>? Our Milwaukee inventory features a wide selection of pre-owned Harley-Davidson motorcycles. Whether you&apos;re searching for <strong>cheap Harleys in Milwaukee</strong> or premium models, we have options for every budget.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            All our <strong>used Harleys for sale near you</strong> come with complete service history, Carfax reports, and our 48-hour guarantee. We offer flexible financing options to make finding <strong>cheap Harleys in Milwaukee</strong> easier than ever.
          </p>
          <h3 style={{ 
            color: 'var(--orange)', 
            fontSize: '1.8rem', 
            marginTop: '3rem',
            marginBottom: '1.5rem' 
          }}>
            Why Choose Our Used Harleys for Sale Near Me?
          </h3>
          <ul style={{ fontSize: '1.1rem', marginLeft: '2rem', marginBottom: '2rem' }}>
            <li><strong>Affordable Pricing:</strong> Find <strong>cheap Harleys in Milwaukee</strong> without sacrificing quality</li>
            <li><strong>Complete Inventory:</strong> Browse all <strong>used Harleys for sale near you</strong> in one place</li>
            <li><strong>Flexible Financing:</strong> Bad credit, first bike, self-employed – we work with lenders who say yes</li>
            <li><strong>Full Transparency:</strong> Service records, Carfax, two keys, every mod listed</li>
            <li><strong>48-Hour Guarantee:</strong> If something&apos;s off in the first 48 hours or 100 miles, bring it back</li>
          </ul>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gray)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--orange)' }}>Ready to find your perfect used Harley?</strong>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Browse our inventory above or contact Joe directly at <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> to discuss your needs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="sms:4144396211" variant="primary">
                Text Joe Now
              </CTAButton>
              <CTAButton href="/" variant="secondary">
                Back to Home
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

