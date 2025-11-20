/**
 * Motorcycle Detail Page (CMS-driven)
 * Dynamic route for individual motorcycle pages from Sanity
 */

import { setPageSEO, generateProductSchema as generateProductPageSchema, SITE_CONFIG } from '@/lib/seo';
import { fetchMotorcycleBySlug, fetchMotorcycleSlugs } from '@/sanity/lib/queries';
import { fetchAllMotorcycles } from '@/sanity/lib/queries';
import { SanityImage } from '@/components/SanityImage';
import { PortableText } from '@/components/PortableText';
import { CTAButton } from '@/components/CTAButton';
import { InternalLinks } from '@/components/InternalLinks';
import { generateProductSchema } from '@/lib/product-schema-template';
import { urlFor } from '@/sanity/lib/client';
import { isSanityConfigured } from '@/sanity/lib/client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Fallback: Get bikes from inventory.json if Sanity not configured
async function getBikesFromFallback() {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'inventory.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.bikes || [];
  } catch (error) {
    return [];
  }
}

// Generate static params for all bike pages
export async function generateStaticParams() {
  if (isSanityConfigured()) {
    const slugs = await fetchMotorcycleSlugs();
    return slugs.map((slug: string) => ({ slug }));
  }

  // Fallback to inventory.json
  const bikes = await getBikesFromFallback();
  return bikes.map((bike: { id: string }) => ({ slug: bike.id }));
}

// Generate metadata for the bike page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let bike;

  if (isSanityConfigured()) {
    bike = await fetchMotorcycleBySlug(slug);
  } else {
    // Fallback to inventory.json
    const bikes = await getBikesFromFallback();
    bike = bikes.find((b: { id: string }) => b.id === slug);
  }

  if (!bike) {
    return setPageSEO({
      pageTitle: 'Bike Not Found',
      noindex: true,
      path: `/bikes/${slug}`,
    });
  }

  const model = bike.model || bike.name?.split(' ').slice(-2).join(' ') || 'Harley-Davidson';
  // Handle image URL - check for fallback URL first
  let imageUrl: string | undefined;
  if (bike.images?.[0]) {
    if ((bike.images[0] as any)._fallbackUrl) {
      imageUrl = (bike.images[0] as any)._fallbackUrl;
    } else {
      imageUrl = urlFor(bike.images[0])?.width(1200).height(630).url();
    }
  }

  return setPageSEO({
    pageTitle: bike.seoTitle || `Used ${bike.title} for Sale in Milwaukee | Joe's Used Harleys`,
    pageDescription: bike.seoDescription || `Buy a used ${bike.title} in Milwaukee, Wisconsin. ${bike.mileage?.toLocaleString()} miles. Price: ${bike.priceFormatted || `$${bike.price?.toLocaleString()}`}. Financing available.`,
    pageKeywords: bike.seoKeywords || [],
    modelName: model,
    location: 'Milwaukee',
    path: `/bikes/${slug}`,
    image: imageUrl,
  });
}

export default async function BikeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let bike;

  if (isSanityConfigured()) {
    bike = await fetchMotorcycleBySlug(slug);
  } else {
    // Fallback to inventory.json
    const bikes = await getBikesFromFallback();
    const foundBike = bikes.find((b: { id: string }) => b.id === slug);
    if (foundBike) {
      // Transform fallback bike to match Sanity structure
      // For external images, we'll use a special format that SanityImage can handle
      bike = {
        _id: foundBike.id,
        title: foundBike.name,
        slug: { current: foundBike.id },
        model: foundBike.name?.split(' ').slice(-2).join(' ') || 'Harley-Davidson',
        year: parseInt(foundBike.name?.split(' ')[0] || '2023'),
        mileage: parseInt(foundBike.specs?.match(/\d+/)?.[0] || '0'),
        price: foundBike.price,
        priceFormatted: foundBike.priceFormatted,
        condition: 'excellent',
        description: [],
        features: [],
        images: foundBike.image ? [{ _type: 'image', asset: { _ref: foundBike.image, _type: 'reference' }, _fallbackUrl: foundBike.image }] : [],
        specs: {},
        financing: foundBike.financing,
        featured: foundBike.featured,
        justArrived: foundBike.justArrived,
      };
    }
  }

  if (!bike) {
    notFound();
  }

  const model = bike.model || 'Harley-Davidson';
  // Handle image URL - check for fallback URL first
  let imageUrl: string | undefined;
  if (bike.images?.[0]) {
    if ((bike.images[0] as any)._fallbackUrl) {
      imageUrl = (bike.images[0] as any)._fallbackUrl;
    } else {
      imageUrl = urlFor(bike.images[0])?.width(1200).height(630).url();
    }
  }

  // Generate Product schema
  const productSchema = generateProductSchema({
    modelName: model,
    description: bike.seoDescription || `Used ${bike.title} for sale in Milwaukee. ${bike.mileage?.toLocaleString()} miles. ${bike.condition} condition.`,
    price: bike.price?.toString() || '0.00',
    image: imageUrl,
    url: `${SITE_CONFIG.url}/bikes/${slug}`,
  });

  const altText = `Used ${bike.title} for sale in Milwaukee, Wisconsin. ${bike.mileage?.toLocaleString()} miles. Price: ${bike.priceFormatted || `$${bike.price?.toLocaleString()}`}. ${bike.financing || ''}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* SEO component would go here if needed */}

      {/* Hero Section */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--black)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text)', marginBottom: '1rem' }}>
          {bike.title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
          {bike.mileage?.toLocaleString()} miles • {bike.condition} condition
        </p>
      </section>

      {/* Product Details */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {/* Images */}
          <div>
            {bike.images?.[0] && (
              <SanityImage
                image={bike.images[0]}
                alt={altText}
                width={800}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {bike.featured && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--orange)', color: 'var(--black)', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                FEATURED BIKE
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 style={{ color: 'var(--orange)', fontSize: '2rem', marginBottom: '1.5rem' }}>
              {bike.priceFormatted || `$${bike.price?.toLocaleString()}`}
            </h2>

            {bike.description && <PortableText content={bike.description} />}

            {bike.features && bike.features.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Features & Modifications</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {bike.features.map((feature: string, index: number) => (
                    <li key={index} style={{ padding: '0.5rem 0', color: 'var(--text-light)', borderBottom: '1px solid var(--gray-light)' }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {bike.specs && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Specifications</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {Object.entries(bike.specs).map(([key, value]) => {
                      const stringValue = value as string | undefined;
                      return (
                        <tr key={key} style={{ borderBottom: '1px solid var(--gray-light)' }}>
                          <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--orange)', textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </td>
                          <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{stringValue || ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {bike.financing && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--black)', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{bike.financing}</p>
                <CTAButton href="sms:4144396211" variant="primary">
                  Get Pre-Approved
                </CTAButton>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton href="sms:4144396211" variant="primary">
                Text Joe Now
              </CTAButton>
              <CTAButton href="tel:4144396211" variant="secondary">
                Call 414-439-6211
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <InternalLinks currentPage="model" />
    </>
  );
}

