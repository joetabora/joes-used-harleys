import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { setPageSEO } from '@/lib/seo';
import { CTAButton } from '@/components/CTAButton';
import { generateProductSchema } from '@/lib/seo';
import type { Metadata } from 'next';

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
  year?: number;
  model?: string;
  mileage?: number;
}

async function getBike(id: string): Promise<Bike | null> {
  try {
    // Fetch directly from Airtable to avoid URL construction issues
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Table 1';
    const tableIdentifier = tableId || tableName;

    if (!baseId || !apiKey) {
      console.error('Airtable not configured');
      return null;
    }

    // Fetch single record from Airtable by ID
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdentifier)}/${encodeURIComponent(id)}`;
    
    console.log('Fetching bike from Airtable:', {
      bikeId: id,
      baseId: baseId,
      tableIdentifier: tableIdentifier,
    });
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        bikeId: id,
      });
      return null;
    }

    const record = await response.json();

    // Transform to match our Bike interface (same logic as API route)
    const getField = (possibleNames: string[]) => {
      for (const name of possibleNames) {
        if (record.fields[name as keyof typeof record.fields] !== undefined) {
          return record.fields[name as keyof typeof record.fields];
        }
      }
      const fieldKey = Object.keys(record.fields).find(key => 
        possibleNames.some(n => key.toLowerCase() === n.toLowerCase())
      );
      return fieldKey ? record.fields[fieldKey as keyof typeof record.fields] : undefined;
    };

    const year = getField(['Year', 'year']) as number;
    const model = getField(['Model', 'model']) as string;
    const mileage = getField(['Mileage', 'mileage']) as number;
    const price = getField(['Price', 'price']) as number;
    const priceFormatted = getField(['Price Formatted', 'priceFormatted']) as string;
    const specs = getField(['Specs', 'specs']) as string;
    const financing = getField(['Financing', 'financing']) as string;
    const featured = getField(['Featured', 'featured']) as boolean;
    const justArrived = getField(['Just Arrived', 'justArrived']) as boolean;

    const name = record.fields.Name || 
      `${year || ''} ${model ? `Harley-Davidson ${model}` : 'Harley-Davidson'}`.trim() ||
      'Harley-Davidson Motorcycle';

    // Get image URL
    const imageField = getField(['Image', 'image']) as any;
    let imageUrl = '';
    if (imageField && Array.isArray(imageField) && imageField.length > 0) {
      const image = imageField[0];
      imageUrl = image.thumbnails?.large?.url || 
                image.thumbnails?.small?.url || 
                image.url || '';
    }

    const finalSpecs = specs || 
      [
        year && `${year}`,
        model && `Harley-Davidson ${model}`,
        mileage && `${mileage.toLocaleString()} miles`,
      ]
        .filter(Boolean)
        .join(' • ') || '';

    const finalPriceFormatted = priceFormatted || 
      (price ? `$${price.toLocaleString()}` : 'Call for price');

    const bike: Bike = {
      id: record.id,
      name: name,
      image: imageUrl,
      specs: finalSpecs,
      price: price || 0,
      priceFormatted: finalPriceFormatted,
      financing: financing || '',
      featured: featured || false,
      justArrived: justArrived || false,
      year: year,
      model: model,
      mileage: mileage,
    };

    console.log('Bike fetched successfully:', bike.name, 'ID:', id);
    return bike;
  } catch (error) {
    console.error('Error fetching bike:', error, 'Bike ID:', id);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const bike = await getBike(id);
  
  if (!bike) {
    return {
      title: 'Bike Not Found | Joe\'s Used Harleys',
    };
  }

  const title = `Used ${bike.name} for Sale Milwaukee | ${bike.priceFormatted} | Joe's Used Harleys`;
  const description = `Buy a used ${bike.name} in Milwaukee, Wisconsin. ${bike.specs}. Price: ${bike.priceFormatted}. ${bike.financing}. Full warranty, financing available. Contact Joe at 414-439-6211.`;

  return setPageSEO({
    pageTitle: title,
    pageDescription: description,
    pageKeywords: [
      `used ${bike.model || bike.name} milwaukee`,
      `${bike.name} for sale milwaukee`,
      `harley ${bike.model || ''} milwaukee`,
      'used harley milwaukee',
      'harley for sale milwaukee',
    ],
    location: 'Milwaukee',
    path: `/bikes/${id}`,
  });
}

export default async function BikeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bike = await getBike(id);

  if (!bike) {
    notFound();
  }

  const productSchema = generateProductSchema(bike);
  const specsArray = bike.specs.split(' • ').filter(Boolean);

  return (
    <>
      {/* Product JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav style={{ 
        padding: '1rem 1.5rem', 
        background: 'var(--black)',
        borderBottom: '1px solid var(--gray-light)'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: 'var(--text-light)'
        }}>
          <Link href="/" style={{ color: 'var(--orange)', textDecoration: 'none' }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/inventory" style={{ color: 'var(--orange)', textDecoration: 'none' }}>
            Inventory
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{bike.name}</span>
        </div>
      </nav>

      {/* Bike Detail Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--dark)',
        minHeight: '80vh'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem'
          }}
          className="bike-detail-grid"
          >
            {/* Image Section */}
            <div>
              {bike.featured && (
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'var(--orange)',
                  color: 'var(--black)',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                  borderRadius: '4px'
                }}>
                  FEATURED
                </div>
              )}
              {bike.justArrived && (
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'var(--orange)',
                  color: 'var(--black)',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                  marginLeft: bike.featured ? '0.5rem' : '0',
                  borderRadius: '4px'
                }}>
                  JUST ARRIVED
                </div>
              )}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'var(--black)',
                border: '1px solid var(--gray-light)'
              }}>
                <Image
                  src={bike.image || '/placeholder-bike.jpg'}
                  alt={`${bike.name} for sale in Milwaukee, Wisconsin`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Details Section */}
            <div>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--text)',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {bike.name}
              </h1>

              {/* Price */}
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--orange)',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                {bike.priceFormatted}
              </div>

              {/* Financing */}
              {bike.financing && (
                <p style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-light)',
                  marginBottom: '2rem',
                  padding: '1rem',
                  background: 'var(--black)',
                  borderRadius: '8px',
                  border: '1px solid var(--gray-light)'
                }}>
                  <strong style={{ color: 'var(--orange)' }}>Financing:</strong> {bike.financing}
                </p>
              )}

              {/* Specs */}
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--black)',
                borderRadius: '8px',
                border: '1px solid var(--gray-light)'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--orange)',
                  marginBottom: '1rem'
                }}>
                  Specifications
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {specsArray.map((spec, index) => (
                    <li key={index} style={{
                      color: 'var(--text-light)',
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <CTAButton 
                  href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} - ${bike.priceFormatted}`}
                  variant="primary"
                >
                  TEXT JOE ABOUT THIS BIKE
                </CTAButton>
                <CTAButton 
                  href="tel:4144396211"
                  variant="secondary"
                >
                  CALL JOE: (414) 439-6211
                </CTAButton>
              </div>

              {/* Why Buy Section */}
              <div style={{
                padding: '1.5rem',
                background: 'var(--black)',
                borderRadius: '8px',
                border: '1px solid var(--gray-light)',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: 'var(--orange)',
                  marginBottom: '1rem'
                }}>
                  Why Buy From Joe&apos;s?
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <li style={{ color: 'var(--text-light)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>48-hour money-back guarantee</span>
                  </li>
                  <li style={{ color: 'var(--text-light)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>Full warranty included</span>
                  </li>
                  <li style={{ color: 'var(--text-light)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>Complete service history & Carfax</span>
                  </li>
                  <li style={{ color: 'var(--text-light)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>Bad credit financing available</span>
                  </li>
                  <li style={{ color: 'var(--text-light)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>$499 nationwide shipping</span>
                  </li>
                </ul>
              </div>

              {/* Back Link */}
              <Link 
                href="/inventory"
                style={{
                  display: 'inline-block',
                  color: 'var(--orange)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                ← Back to Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section style={{
        padding: '4rem 1.5rem',
        background: 'var(--black)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          color: 'var(--text-light)',
          lineHeight: '1.8'
        }}>
          <h2 style={{
            color: 'var(--orange)',
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            marginBottom: '2rem'
          }}>
            {bike.name} for Sale in Milwaukee
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            This <strong>used {bike.name}</strong> is available now at Joe&apos;s Used Harleys in Milwaukee, Wisconsin. 
            {bike.mileage && ` With only ${bike.mileage.toLocaleString()} miles, `}
            This pre-owned Harley-Davidson motorcycle has been thoroughly inspected and is ready to ride.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Located at House of Harley, 6221 W Layton Ave, Milwaukee, WI 53220. 
            Contact Joe directly at <a href="tel:4144396211" style={{ color: 'var(--orange)' }}>(414) 439-6211</a> to schedule a test ride or ask any questions.
          </p>
        </div>
      </section>
    </>
  );
}

