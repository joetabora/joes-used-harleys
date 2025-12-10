'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { generateProductSchema } from '@/lib/seo';

interface Bike {
  id: string;
  name: string;
  image: string;
  specs: string;
  price: number;
  priceFormatted: string;
  financing: string;
  featured?: boolean;
  justArrived?: boolean;
}

// Fallback image URLs for broken Dealer.com images
const FALLBACK_IMAGES = [
  'https://files.catbox.moe/3n8q1r.jpg',
  'https://files.catbox.moe/7p4h2s.jpg',
  'https://files.catbox.moe/9t6u8x.jpg',
  'https://files.catbox.moe/1y3h5j.jpg',
  'https://files.catbox.moe/2p9m1k.jpg',
  'https://files.catbox.moe/4q7w3e.jpg',
  'https://files.catbox.moe/6r5t7u.jpg',
  'https://files.catbox.moe/8v7x1z.jpg'
];

interface InventoryGridProps {
  limit?: number;
}

export function InventoryGrid({ limit }: InventoryGridProps = {}) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const revSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Load engine rev sound
    // Add your Harley engine rev sound file to /public/sounds/engine-rev.mp3
    // Or use a CDN URL for the sound file
    try {
      revSoundRef.current = new Audio('/sounds/engine-rev.mp3');
      revSoundRef.current.volume = 0.15;
      revSoundRef.current.preload = 'auto';
    } catch (error) {
      // Fallback: create a simple beep sound if file doesn't exist
      console.log('Engine rev sound not found - add /public/sounds/engine-rev.mp3');
    }
    
    async function loadInventory() {
      try {
        const response = await fetch('/api/bikes');
        if (!response.ok) {
          throw new Error('Failed to load inventory');
        }
        const data = await response.json();
        
        // Replace broken Dealer.com images with fallback catbox.moe URLs
        const bikesWithFixedImages = (data.bikes || []).map((bike: Bike, index: number) => {
          // Check if image URL is broken (contains dealer.com or is empty)
          if (!bike.image || bike.image.includes('dealer.com') || bike.image.includes('placeholder')) {
            // Use fallback image based on index
            bike.image = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
          }
          return bike;
        });
        
        setBikes(bikesWithFixedImages);
        
        // Generate and inject product schema for all bikes (client-side only)
        if (data.bikes && typeof document !== 'undefined') {
          const productSchemas = data.bikes.map((bike: Bike) => generateProductSchema(bike));
          productSchemas.forEach((schema: any) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
          });
        }
      } catch (error) {
        console.error('Error loading inventory:', error);
        setBikes([]);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const bikeElements = document.querySelectorAll('.bike.scroll-fade');
    bikeElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(30px)';
      htmlEl.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(el);
    });

    return () => {
      bikeElements.forEach(el => observer.unobserve(el));
    };
  }, [bikes]);

  if (loading) {
    return (
      <div className="grid">
        <p style={{ textAlign: 'center', color: 'var(--text-light)', gridColumn: '1 / -1' }}>
          Loading inventory...
        </p>
      </div>
    );
  }

  if (bikes.length === 0) {
    return (
      <div className="grid">
        <p style={{ textAlign: 'center', color: 'var(--text-light)', gridColumn: '1 / -1' }}>
          Unable to load inventory. Please refresh the page.
        </p>
      </div>
    );
  }

  const handleBikeHover = () => {
    if (revSoundRef.current) {
      try {
        revSoundRef.current.currentTime = 0;
        revSoundRef.current.play().catch(() => {
          // Ignore autoplay errors (browser may block autoplay)
        });
      } catch (error) {
        // Sound file not available
      }
    }
  };

  // Filter bikes based on search term (case-insensitive, matches model name)
  const filteredBikes = searchTerm.trim()
    ? bikes.filter(bike => 
        bike.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : bikes;
  
  // Apply limit if provided
  const displayBikes = limit ? filteredBikes.slice(0, limit) : filteredBikes;

  return (
    <>
      {/* Quick Bike Finder Search Bar */}
      <div style={{
        width: '100%',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
          <input
            type="text"
            placeholder="Search by model (e.g., Street Glide, Fat Boy, Low Rider)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 3.5rem 1rem 1rem',
              background: '#000000',
              border: '2px solid #2A2A2A',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: 'var(--font-inter)',
              transition: 'border-color 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FF6600';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#2A2A2A';
            }}
            aria-label="Search bikes by model name"
          />
          {/* Search Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: 'absolute',
              right: '1rem',
              pointerEvents: 'none'
            }}
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="#FF6600"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="m20 20-4-4"
              stroke="#FF6600"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* No Matches Message */}
      {searchTerm.trim() && filteredBikes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1.5rem',
          background: '#0A0A0A',
          border: '2px solid #FF6600',
          marginBottom: '2rem'
        }}>
          <p style={{
            color: '#CCCCCC',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-inter)'
          }}>
            No bikes match — text Joe at{' '}
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
            {' '}for incoming rides
          </p>
        </div>
      )}

      {/* Inventory Grid - Edgy Rockstar Design */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2.5rem',
        padding: '2rem 0'
      }} role="list">
        {displayBikes.map((bike, index) => {
        const altText = `Used ${bike.name} for sale in Milwaukee, Wisconsin`;
        
        return (
          <article 
            key={bike.id}
            className="bike-card-edgy" 
            data-bike-id={bike.id} 
            itemScope 
            itemType="https://schema.org/Product" 
            role="listitem"
            style={{
              position: 'relative',
              background: '#0A0A0A',
              border: '2px solid #1A1A1A',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateY(0)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              card.style.transform = 'translateY(-12px)';
              card.style.borderColor = '#FF6600';
              card.style.boxShadow = '0 12px 50px rgba(255, 102, 0, 0.4), 0 0 30px rgba(255, 102, 0, 0.2)';
              handleBikeHover(e as any);
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.transform = 'translateY(0)';
              card.style.borderColor = '#1A1A1A';
              card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            }}
          >
            {/* Featured Badge */}
            {(bike.featured || bike.justArrived) && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: bike.featured ? '#FF6600' : '#00FF00',
                color: '#000000',
                padding: '0.4rem 1rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-clash)',
                zIndex: 10,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                animation: bike.justArrived ? 'pulse 2s infinite' : 'none'
              }}>
                {bike.featured ? '⭐ FEATURED' : '🔥 JUST ARRIVED'}
              </div>
            )}

            {/* Image Section - Large & Prominent */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              overflow: 'hidden',
              background: '#000000'
            }}>
              <Image 
                src={bike.image} 
                alt={altText}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 350px"
                quality={90}
                itemProp="image"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallbackIndex = parseInt(bike.id) % FALLBACK_IMAGES.length || 0;
                  target.src = FALLBACK_IMAGES[fallbackIndex];
                }}
              />
              
              {/* Price Badge Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(0, 0, 0, 0.9)',
                border: '2px solid #FF6600',
                padding: '0.75rem 1.5rem',
                zIndex: 5
              }}>
                <div 
                  className="price-edgy"
                  itemScope 
                  itemProp="offers" 
                  itemType="https://schema.org/Offer"
                  style={{
                    color: '#FF6600',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-clash)',
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(255, 102, 0, 0.8)'
                  }}
                >
                  <meta itemProp="price" content={bike.price.toString()} />
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  {bike.priceFormatted}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div style={{
              padding: '2rem',
              background: '#0A0A0A'
            }}>
              <h3 
                itemProp="name"
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-clash)',
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                  lineHeight: '1.3',
                  textTransform: 'uppercase'
                }}
              >
                {bike.name}
              </h3>

              {/* Specs */}
              <div style={{
                color: '#CCCCCC',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                minHeight: '3rem'
              }}>
                {bike.specs}
              </div>

              {/* Financing Info */}
              <div style={{
                background: '#000000',
                border: '1px solid #2A2A2A',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  color: '#FF6600',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-clash)'
                }}>
                  {bike.financing}
                </p>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column'
              }}>
                <a 
                  href={`/bikes/${bike.id}`}
                  className="bike-cta-primary"
                  aria-label={`View details for ${bike.name}`}
                  style={{
                    display: 'block',
                    background: '#FF6600',
                    color: '#000000',
                    padding: '1rem 2rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-clash)',
                    border: '2px solid #FF6600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255, 102, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#FF6600';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 102, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FF6600';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 102, 0, 0.3)';
                  }}
                >
                  VIEW DETAILS
                </a>
                <a 
                  href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} - ${bike.priceFormatted}`} 
                  className="bike-cta-secondary"
                  aria-label={`Inquire about ${bike.name}`}
                  style={{
                    display: 'block',
                    background: 'transparent',
                    color: '#FF6600',
                    padding: '0.875rem 2rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-clash)',
                    border: '2px solid #FF6600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FF6600';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FF6600';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  TEXT JOE
                </a>
              </div>

              {/* FaceTime CTA */}
              <p style={{
                color: '#FF6600',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginTop: '1rem',
                textAlign: 'center',
                fontStyle: 'italic',
                opacity: 0.9
              }}>
                📱 FaceTime tour available
              </p>
            </div>
          </article>
        );
      })}
      </div>

      {/* Styles for edgy bike cards */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .bike-card-edgy {
          animation: fade-in-up 0.6s ease-out;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </>
  );
}

