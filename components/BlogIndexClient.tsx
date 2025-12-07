'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogFilter, BLOG_CATEGORIES, type BlogCategory } from './BlogFilter';
import { BlogPost } from '@/lib/blog-data';

interface BlogIndexClientProps {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
}

export function BlogIndexClient({ posts, featuredPost }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.categories.includes(selectedCategory));
  }, [posts, selectedCategory]);

  const availableCategories = useMemo(() => {
    const cats = new Set<BlogCategory>();
    posts.forEach(post => {
      post.categories.forEach(cat => {
        if (BLOG_CATEGORIES.includes(cat as BlogCategory)) {
          cats.add(cat as BlogCategory);
        }
      });
    });
    return Array.from(cats);
  }, [posts]);

  return (
    <>
      {/* Featured Post with Hero Image */}
      {featuredPost && (
        <section style={{
          padding: '4rem 1.5rem',
          background: '#0A0A0A',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: '#FF6600',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Featured Post
          </h2>
          <Link
            href={`/blog/${featuredPost.slug}`}
            style={{
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <article style={{
              background: '#000000',
              border: '2px solid #FF6600',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '500px'
            }}>
              {/* Hero Image with Overlay */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                overflow: 'hidden'
              }}>
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
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
                  <time style={{
                    color: '#FF6600',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '1rem'
                  }}>
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    color: '#FFFFFF',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                    fontFamily: 'var(--font-clash)',
                    fontWeight: 700
                  }}>
                    {featuredPost.title}
                  </h3>
                  <p style={{
                    color: '#CCCCCC',
                    fontSize: '1.1rem',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {featuredPost.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#FF6600',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* All Posts Grid with Filter */}
      <section style={{
        padding: '6rem 1.5rem',
        background: '#000000',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gap: '3rem',
          marginBottom: '3rem'
        }} className="blog-layout">
          {/* Sidebar with Filter */}
          <aside style={{
            background: '#0A0A0A',
            padding: '2rem',
            border: '1px solid #2A2A2A',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }} className="blog-sidebar">
            <BlogFilter
              categories={availableCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Posts Grid */}
          <div>
            <h2 style={{
              color: '#FF6600',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-clash)',
              fontWeight: 700
            }}>
              {selectedCategory ? `${selectedCategory} Posts` : 'All Posts'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2.5rem'
            }}>
              {filteredPosts.map((post, index) => (
                <article
                  key={post.slug}
                  style={{
                    background: '#0A0A0A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  className="blog-card"
                >
                  <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <time style={{
                      color: '#FF6600',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'block',
                      marginBottom: '0.75rem'
                    }}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <h3 style={{
                      fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                      color: '#FFFFFF',
                      marginBottom: '1rem',
                      lineHeight: '1.3',
                      fontFamily: 'var(--font-clash)',
                      fontWeight: 700
                    }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: 'color 0.3s'
                        }}
                        className="blog-title-link"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p style={{
                      color: '#CCCCCC',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      flex: 1
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        color: '#FF6600',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}>
                        {post.readTime}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          color: '#FF6600',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          transition: 'color 0.3s'
                        }}
                        className="blog-read-link"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
          }
          .blog-sidebar {
            position: relative !important;
            top: 0 !important;
          }
        }
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(255, 102, 0, 0.3);
          border-color: #FF6600;
        }
        .blog-title-link:hover {
          color: #FF6600;
        }
        .blog-read-link:hover {
          color: #FF8833;
        }
      `}} />
    </>
  );
}

