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

export function InventoryGrid() {
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

      {/* Inventory Grid */}
      <div className="grid" role="list">
        {filteredBikes.map((bike) => {
        const specsFormatted = bike.specs.replace(/ • /g, '<span class="divider">•</span>');
        // Improved alt text format
        const altText = `Used ${bike.name} for sale in Milwaukee, Wisconsin`;
        
        return (
          <article 
            key={bike.id}
            className="bike scroll-fade" 
            data-bike-id={bike.id} 
            itemScope 
            itemType="https://schema.org/Product" 
            role="listitem"
            onMouseEnter={handleBikeHover}
            onTouchStart={handleBikeHover}
          >
            <div className="bike-inner">
              {bike.featured && <div className="featured-badge">FEATURED</div>}
              {bike.justArrived && <div className="just-arrived">JUST ARRIVED</div>}
              <div className="image-wrapper">
                <Image 
                  src={bike.image} 
                  alt={altText}
                  loading="lazy" 
                  width={800} 
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 25vw"
                  quality={85}
                  itemProp="image"
                  onError={(e) => {
                    // Fallback to catbox.moe if image fails to load
                    const target = e.target as HTMLImageElement;
                    const fallbackIndex = parseInt(bike.id) % FALLBACK_IMAGES.length || 0;
                    target.src = FALLBACK_IMAGES[fallbackIndex];
                  }}
                />
              </div>
              <div className="details">
                <h3 itemProp="name">{bike.name}</h3>
                <p 
                  className="price" 
                  itemScope 
                  itemProp="offers" 
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="price" content={bike.price.toString()} />
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  {bike.priceFormatted}
                </p>
                <p className="financing">{bike.financing}</p>
                <div className="bike-actions">
                  <a 
                    href={`/bikes/${bike.id}`}
                    className="bike-action-btn primary" 
                    aria-label={`View details for ${bike.name}`}
                  >
                    VIEW DETAILS
                  </a>
                  <a 
                    href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} - ${bike.priceFormatted}`} 
                    className="bike-action-btn" 
                    aria-label={`Inquire about ${bike.name}`}
                  >
                    INQUIRE
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </>
  );
}

