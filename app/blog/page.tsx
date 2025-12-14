import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import { getAllBlogPosts, getFeaturedPost } from '@/lib/blog-data';
import { BlogIndexClient } from '@/components/BlogIndexClient';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
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
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      
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

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem 4rem',
        background: '#000000',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '2rem',
            lineHeight: '1.1',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
          }}>
            USED HARLEY BUYER'S GUIDE
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#CCCCCC',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: '1.8',
            fontWeight: 600,
            letterSpacing: '1px'
          }}>
          Expert tips, honest reviews, and real advice from a Milwaukee rider who knows bikes
          </p>
        </div>
      </section>

      {/* Blog Index Client Component */}
      <BlogIndexClient posts={posts} featuredPost={featuredPost} />

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#000000',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            READY TO BUY?
          </h2>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#000000',
            fontWeight: 700,
            marginBottom: '3rem',
            letterSpacing: '1px',
            lineHeight: '1.6'
          }}>
            Got questions after reading? Want to see current inventory? Text me at{' '}
            <a
              href="sms:4144396211"
              style={{
                color: '#000000',
                textDecoration: 'underline',
                fontWeight: 900
              }}
            >
              414-439-6211
            </a>
            {' '}and I&apos;ll help you find the perfect used Harley.
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/inventory"
              className="blog-cta-button-primary"
              style={{
                background: '#000000',
                color: '#FF6600',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #000000',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              VIEW INVENTORY
            </a>
            <a
              href="sms:4144396211"
              className="blog-cta-button-secondary"
              style={{
                background: 'transparent',
                color: '#000000',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #000000',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              TEXT JOE
            </a>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-cta-button-primary:hover {
          background: transparent !important;
          color: #000000 !important;
          transform: scale(1.05);
        }
        .blog-cta-button-secondary:hover {
          background: #000000 !important;
          color: #FF6600 !important;
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
