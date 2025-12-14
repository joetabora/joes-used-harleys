import { setPageSEO, SITE_CONFIG } from '@/lib/seo';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-data';
import { SocialShare } from '@/components/SocialShare';
import { BlogImageWithFallback } from '@/components/BlogImageWithFallback';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
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
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Article Header */}
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '6rem 2rem 2rem'
      }}>
        <Link
          href="/blog"
          style={{
            color: '#FF6600',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            display: 'inline-block',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            border: '1px solid #1A1A1A',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF6600';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.background = '#FF6600';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1A1A1A';
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← BACK TO BLOG
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
          <BlogImageWithFallback
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
              <BlogImageWithFallback
                src={img.url}
                alt={img.alt}
                fill
                style={{
                  objectFit: 'cover'
                }}
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
          background: 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)',
          border: '3px solid #FF6600',
          padding: '4rem 2rem',
          textAlign: 'center',
          marginTop: '4rem',
          marginBottom: '4rem',
          borderRadius: '16px',
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
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              color: '#000000',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 900,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              READY TO BUY A USED HARLEY?
            </h2>
            <p style={{
              color: '#000000',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontWeight: 700
            }}>
              Text Joe at{' '}
              <a
                href="sms:4144396211"
                style={{
                  color: '#000000',
                  textDecoration: 'underline',
                  fontWeight: 900,
                  fontSize: '1.3rem'
                }}
              >
                414-439-6211
              </a>
              {' '}for current pricing and availability. $499 ships nationwide.
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/inventory"
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                VIEW INVENTORY
              </Link>
              <a
                href="sms:4144396211"
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                TEXT JOE
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={{
            marginTop: '4rem',
            paddingTop: '4rem',
            borderTop: '2px solid #FF6600'
          }}>
            <h2 style={{
              color: '#FF6600',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '3rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 900,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              RELATED POSTS
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
                    border: '2px solid #1A1A1A',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF6600';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 102, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1A1A1A';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <BlogImageWithFallback
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      color: '#FFFFFF',
                      fontSize: '1.3rem',
                      marginBottom: '1rem',
                      lineHeight: '1.3',
                      fontFamily: 'var(--font-clash)',
                      fontWeight: 800,
                      letterSpacing: '1px'
                    }}>
                      {relatedPost.title}
                    </h3>
                    <p style={{
                      color: '#CCCCCC',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      {relatedPost.excerpt.substring(0, 120)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

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

        .back-link:hover {
          color: #FF8833;
        }

        .related-post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.3);
          border-color: #FF6600;
        }
      `}} />
    </>
  );
}

