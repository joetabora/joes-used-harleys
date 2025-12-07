import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-data';
import { BlogImage } from '@/components/BlogImage';
import { SocialShare } from '@/components/SocialShare';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return setPageSEO({
      pageTitle: 'Post Not Found',
      noindex: true,
      path: `/blog/${slug}`
    });
  }
  
  return setPageSEO({
    pageTitle: post.metaTitle,
    pageDescription: post.metaDescription,
    path: `/blog/${slug}`
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  // Generate Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Joe Tabora",
      "url": `${SITE_CONFIG.url}`
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": {
        "@type": "ImageObject",
        "url": SITE_CONFIG.image
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`
    }
  };

  // Get related posts (exclude current)
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

      {/* Article Header */}
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem'
      }}>
        <Link
          href="/blog"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
            marginBottom: '2rem',
            transition: 'color 0.3s'
          }}
          className="back-link"
        >
          ← Back to Blog
        </Link>


        {/* Hero Image with Overlay Title */}
        <div style={{
          marginBottom: '3rem',
          borderRadius: '0',
          overflow: 'hidden',
          border: '2px solid #2A2A2A',
          position: 'relative',
          width: '100%',
          minHeight: '500px'
        }}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            style={{
              objectFit: 'cover'
            }}
            priority
          />
          {/* Overlay with Title */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
            padding: '3rem 2rem 2rem',
            color: '#FFFFFF'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              marginBottom: '1rem',
              lineHeight: '1.2',
              fontFamily: 'var(--font-clash)',
              fontWeight: 700
            }}>
              {post.title}
            </h1>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              color: '#CCCCCC',
              fontSize: '0.95rem'
            }}>
              <span>{post.readTime}</span>
              <span style={{ color: '#FF6600' }}>•</span>
              <span>By Joe Tabora</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="blog-content"
          style={{
            color: '#CCCCCC',
            fontSize: '1.1rem',
            lineHeight: '1.9',
            marginBottom: '2rem'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Share Buttons */}
        <SocialShare title={post.title} url={`/blog/${post.slug}`} />

        {/* Images from post */}
        {post.images.map((img, index) => (
          <figure key={index} style={{
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <div style={{
              marginBottom: '1rem',
              borderRadius: '0',
              overflow: 'hidden',
              border: '2px solid #2A2A2A',
              position: 'relative',
              width: '100%',
              minHeight: '400px'
            }}>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                style={{
                  objectFit: 'cover'
                }}
                loading="lazy"
              />
            </div>
            {img.caption && (
              <figcaption style={{
                color: '#999999',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginTop: '0.5rem'
              }}>
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}

        {/* CTA Section */}
        <div style={{
          background: '#0A0A0A',
          border: '2px solid #FF6600',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginTop: '4rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            color: '#FF6600',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-clash)',
            fontWeight: 700
          }}>
            Ready to Buy a Used Harley?
          </h2>
          <p style={{
            color: '#CCCCCC',
            fontSize: '1.2rem',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Text Joe at{' '}
            <a
              href="sms:4144396211"
              style={{
                color: '#FF6600',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.3rem'
              }}
            >
              414-439-6211
            </a>
            {' '}for current pricing and availability. $499 ships nationwide.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
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
            </Link>
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
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={{
            marginTop: '4rem',
            paddingTop: '4rem',
            borderTop: '1px solid #2A2A2A'
          }}>
            <h2 style={{
              color: '#FF6600',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 700
            }}>
              Related Posts
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  style={{
                    background: '#0A0A0A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '0',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    display: 'block'
                  }}
                  className="related-post-card"
                >
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <BlogImage
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      index={index}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      color: '#FFFFFF',
                      fontSize: '1.2rem',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3',
                      fontFamily: 'var(--font-clash)',
                      fontWeight: 700
                    }}>
                      {relatedPost.title}
                    </h3>
                    <p style={{
                      color: '#CCCCCC',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>
                      {relatedPost.excerpt.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

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

      {/* CSS for blog content and hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          color: #FF6600;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-clash);
          font-weight: 700;
          line-height: 1.2;
        }

        .blog-content h3 {
          color: #FF6600;
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: var(--font-clash);
          font-weight: 700;
          line-height: 1.3;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          color: #CCCCCC;
          line-height: 1.9;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
          color: #CCCCCC;
          line-height: 1.9;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
        }

        .blog-content strong {
          color: #FF6600;
          font-weight: 700;
        }

        .blog-content a {
          color: #FF6600;
          text-decoration: underline;
          transition: color 0.3s;
        }

        .blog-content a:hover {
          color: #FF8833;
        }

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

        .back-link:hover {
          color: #FF8833;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 102, 0, 0.4);
        }

        .related-post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.3);
          border-color: #FF6600;
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

