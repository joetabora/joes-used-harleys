/**
 * Internal Links Component for SEO Link Equity
 * Provides consistent internal linking across all pages
 */

import Link from 'next/link';
import { getAllModelSlugs } from '@/lib/model-data';

interface InternalLinksProps {
  currentPage?: 'home' | 'inventory' | 'model' | 'contact';
  excludeModels?: string[];
}

export function InternalLinks({ currentPage = 'home', excludeModels = [] }: InternalLinksProps) {
  const modelSlugs = getAllModelSlugs().filter(slug => !excludeModels.includes(slug));
  const popularModels = ['street-glide', 'road-glide', 'softail', 'sportster', 'fat-boy'].filter(
    slug => !excludeModels.includes(slug)
  );

  return (
    <section style={{ 
      padding: '4rem 1.5rem', 
      background: 'var(--dark)', 
      textAlign: 'center',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        color: 'var(--orange)', 
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
        marginBottom: '2rem' 
      }}>
        Explore More Milwaukee Harley Resources
      </h2>
      
      {/* Main Navigation Links */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        {currentPage !== 'home' && (
          <Link 
            href="/" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            aria-label="Go to homepage - Used Harley-Davidson motorcycles for sale in Milwaukee"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
            }}
          >
            Home
          </Link>
        )}
        {currentPage !== 'inventory' && (
          <Link 
            href="/inventory" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--orange)',
              borderRadius: '4px',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            aria-label="View complete inventory of used Harley-Davidson motorcycles for sale in Milwaukee"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
            }}
          >
            View Inventory
          </Link>
        )}
      </div>

      {/* Popular Models */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          color: 'var(--text)', 
          fontSize: '1.3rem', 
          marginBottom: '1.5rem' 
        }}>
          Popular Models
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          {popularModels.map((slug) => {
            const modelName = slug.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            return (
              <Link 
                key={slug}
                href={`/models/${slug}`} 
                style={{ 
                  color: 'var(--orange)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--orange)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
                aria-label={`View used ${modelName} motorcycles for sale in Milwaukee`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--orange)';
                  e.currentTarget.style.color = 'var(--black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--orange)';
                }}
              >
                {modelName}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Local Landing Pages */}
      <div>
        <h3 style={{ 
          color: 'var(--text)', 
          fontSize: '1.3rem', 
          marginBottom: '1.5rem' 
        }}>
          Milwaukee Resources
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <Link 
            href="/used-harleys-milwaukee" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              border: '1px solid var(--orange)',
              borderRadius: '4px',
              fontSize: '0.9rem',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
            }}
          >
            Used Harleys Milwaukee
          </Link>
          <Link 
            href="/harley-for-sale-milwaukee" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              border: '1px solid var(--orange)',
              borderRadius: '4px',
              fontSize: '0.9rem',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
            }}
          >
            Harley for Sale Milwaukee
          </Link>
          <Link 
            href="/milwaukee-harley-dealership" 
            style={{ 
              color: 'var(--orange)', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              border: '1px solid var(--orange)',
              borderRadius: '4px',
              fontSize: '0.9rem',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
            }}
          >
            Milwaukee Harley Dealership
          </Link>
        </div>
      </div>
    </section>
  );
}

