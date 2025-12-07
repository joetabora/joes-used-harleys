import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import { getAllBlogPosts, getFeaturedPost } from '@/lib/blog-data';
import { BlogIndexClient } from '@/components/BlogIndexClient';
import type { Metadata } from 'next';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Used Harley Buyer\'s Guide Blog | Expert Tips & Reviews | Joe\'s Used Harleys',
  pageDescription: 'Expert guides on buying used Harleys. Shipping costs, model comparisons, buyer tips, and more. Text Joe 414-439-6211 for current inventory.',
  path: '/blog'
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const featuredPost = getFeaturedPost();

  return (
    <>
      {/* WebSite Schema with Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Joe's Used Harleys Blog",
            "description": "Expert guides on buying used Harley-Davidson motorcycles",
            "url": `${SITE_CONFIG.url}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": SITE_CONFIG.name,
              "url": SITE_CONFIG.url
            }
          })
        }}
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
        WE SHIP NATIONWIDE FOR ONLY $499
      </div>

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
          marginBottom: '1rem',
          lineHeight: '1.1',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Used Harley Buyer's Guide
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: '#CCCCCC',
          marginBottom: '2rem',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Expert tips, honest reviews, and real advice from a Milwaukee rider who knows bikes
        </p>
      </section>

      {/* Blog Index Client Component */}
      <BlogIndexClient posts={posts} featuredPost={featuredPost} />

      {/* CTA Section */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#0A0A0A',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#FF6600',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '2rem',
          fontFamily: 'var(--font-clash)',
          fontWeight: 700
        }}>
          Ready to Buy?
        </h2>
        <p style={{
          color: '#CCCCCC',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          Got questions after reading? Want to see current inventory? Text me at{' '}
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
          {' '}and I'll help you find the perfect used Harley.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="/inventory"
            style={{
              padding: '1rem 2rem',
              background: '#FF6600',
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            View Inventory
          </a>
          <a
            href="sms:4144396211"
            style={{
              padding: '1rem 2rem',
              background: '#000000',
              color: '#FF6600',
              textDecoration: 'none',
              border: '2px solid #FF6600',
              fontWeight: 800,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '0',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-clash)'
            }}
            className="cta-button"
          >
            Text Joe
          </a>
        </div>
      </section>

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

      {/* CSS for animations and hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
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

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 102, 0, 0.4);
        }

        .mobile-bar-btn:hover {
          color: #000000;
          background: #FF6600;
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
