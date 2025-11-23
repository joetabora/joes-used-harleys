'use client';

import { useEffect, useState } from 'react';
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

export function InventoryGrid() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    async function loadInventory() {
      try {
        const response = await fetch('/api/bikes');
        if (!response.ok) {
          throw new Error('Failed to load inventory');
        }
        const data = await response.json();
        setBikes(data.bikes || []);
        
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

  return (
    <div className="grid" role="list">
      {bikes.map((bike) => {
        const specsFormatted = bike.specs.replace(/ • /g, '<span class="divider">•</span>');
                const altText = `Used ${bike.name} for sale in Milwaukee, Wisconsin. ${bike.specs}. Price: ${bike.priceFormatted}. ${bike.financing}. Buy pre-owned Harley-Davidson motorcycle at Joe's Used Harleys with full warranty and financing options.`;
        
        return (
          <article 
            key={bike.id}
            className="bike scroll-fade" 
            data-bike-id={bike.id} 
            itemScope 
            itemType="https://schema.org/Product" 
            role="listitem"
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
  );
}

