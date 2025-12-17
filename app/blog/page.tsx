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
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        padding: '10rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
            border: '1px solid rgba(234, 88, 12, 0.3)',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📖 Buyer's Guide
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px'
          }}>
            Used Harley
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Buyer's Guide
            </span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#9ca3af',
            marginBottom: '2rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: 500
          }}>
            Expert tips, honest reviews, and real advice from a Milwaukee rider who knows bikes
          </p>
        </div>
      </section>

      {/* Blog Index Client Component */}
      <BlogIndexClient posts={posts} featuredPost={featuredPost} />

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '1.5rem'
          }}>
            Ready to Buy?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#9ca3af',
            fontWeight: 500,
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Got questions after reading? Text me at{' '}
            <a
              href="sms:4144396211"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="sms:4144396211"
              className="blog-cta-primary"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4)'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>💬</span>
              TEXT JOE
            </a>
            <a
              href="/"
              className="blog-cta-secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              VIEW LATEST DROPS
            </a>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-cta-primary:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 60px rgba(234, 88, 12, 0.6);
        }
        .blog-cta-secondary:hover {
          transform: translateY(-3px);
          border-color: rgba(234, 88, 12, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }
      `}} />
    </>
  );
}
