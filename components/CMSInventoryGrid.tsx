/**
 * CMS Inventory Grid Component
 * Fetches and displays motorcycles from Sanity CMS
 * Falls back to inventory.json if CMS is not configured
 */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SanityImage } from './SanityImage';
import { urlFor } from '@/sanity/lib/client';
import type { Motorcycle } from '@/sanity/lib/types';

interface CMSInventoryGridProps {
  initialBikes?: Motorcycle[];
}

export function CMSInventoryGrid({ initialBikes = [] }: CMSInventoryGridProps) {
  const [bikes, setBikes] = useState<Motorcycle[]>(initialBikes);
  const [loading, setLoading] = useState(!initialBikes.length);

  useEffect(() => {
    async function loadInventory() {
      try {
        // Try to fetch from API route
        const response = await fetch('/api/motorcycles');
        if (response.ok) {
          const data = await response.json();
          setBikes(data.bikes || []);
        } else {
          // Fallback to initial bikes
          setBikes(initialBikes);
        }
      } catch (error) {
        console.error('Error loading inventory:', error);
        setBikes(initialBikes);
      } finally {
        setLoading(false);
      }
    }

    if (!initialBikes.length) {
      loadInventory();
    }
  }, [initialBikes]);

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
        Loading inventory...
      </div>
    );
  }

  if (!bikes.length) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
        No motorcycles available at this time. Please check back soon.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '2rem 1.5rem',
      }}
    >
      {bikes.map((bike) => {
        const imageUrl = bike.images?.[0] ? urlFor(bike.images[0])?.width(600).height(400).url() : null;
        const slug = bike.slug?.current || '';

        return (
          <Link
            key={bike._id}
            href={`/bikes/${slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className="bike scroll-fade"
          >
            <div
              style={{
                background: 'var(--dark)',
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--orange)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 102, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-light)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {imageUrl && (
                <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden' }}>
                  <Image
                    src={imageUrl}
                    alt={`${bike.title} for sale in Milwaukee`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  {bike.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--orange)',
                        color: 'var(--black)',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                    >
                      FEATURED
                    </div>
                  )}
                  {bike.justArrived && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--orange)',
                        color: 'var(--black)',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                    >
                      JUST ARRIVED
                    </div>
                  )}
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                  {bike.title}
                </h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  {bike.mileage?.toLocaleString()} miles • {bike.condition}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <p
                    style={{
                      color: 'var(--orange)',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {bike.priceFormatted || `$${bike.price?.toLocaleString()}`}
                  </p>
                  {bike.financing && (
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{bike.financing}</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

