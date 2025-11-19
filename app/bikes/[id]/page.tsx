import { setPageSEO } from '@/lib/seo';
import { 
  extractModelName, 
  extractYear, 
  extractMileage,
  generateModelKeywords,
  generateProductTitle,
  generateProductDescription,
  generateProductPageSchema,
  getModelContent,
  type BikeData
} from '@/lib/product-seo';
import { SEO } from '@/components/SEO';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Get all bikes data - read from file system during build
async function getAllBikes(): Promise<BikeData[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'inventory.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.bikes || [];
  } catch (error) {
    console.error('Error reading inventory.json:', error);
    // Return empty array if file read fails - this should not happen during build
    return [];
  }
}

// Fetch bike data
async function getBike(id: string): Promise<BikeData | null> {
  const bikes = await getAllBikes();
  const bike = bikes.find((b: BikeData) => b.id === id);
  
  if (!bike) return null;
  
  // Enrich bike data
  const model = extractModelName(bike.name);
  const year = extractYear(bike.name);
  const mileage = extractMileage(bike.specs);
  
  return {
    ...bike,
    model,
    year: year ?? undefined,
    mileage: mileage ?? undefined,
    condition: 'UsedCondition'
  };
}

// Generate static params for all bike pages
export async function generateStaticParams() {
  const bikes = await getAllBikes();
  return bikes.map((bike: BikeData) => ({
    id: bike.id,
  }));
}

// Generate metadata for the product page using setPageSEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const bike = await getBike(id);
  
  if (!bike) {
    return setPageSEO({
      pageTitle: 'Bike Not Found',
      noindex: true,
      path: `/bikes/${id}`
    });
  }
  
  const model = bike.model || extractModelName(bike.name);
  const mileage = bike.mileage || extractMileage(bike.specs);
  const keywords = generateModelKeywords(model);
  const title = generateProductTitle(model);
  const description = generateProductDescription(model, mileage, bike.priceFormatted);
  
  return setPageSEO({
    pageTitle: title,
    pageDescription: description,
    pageKeywords: keywords,
    modelName: model,
    location: 'Milwaukee',
    path: `/bikes/${id}`,
    image: bike.image
  });
}

export default async function BikePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bike = await getBike(id);
  
  if (!bike) {
    notFound();
  }
  
  const model = bike.model || extractModelName(bike.name);
  const year = bike.year || extractYear(bike.name);
  const mileage = bike.mileage || extractMileage(bike.specs);
  const modelContent = getModelContent(model);
  const productSchema = generateProductPageSchema(bike);
  
  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* SEO Component */}
      <SEO type="product" product={bike} />
      
      {/* Urgency Banner */}
      <div className="urgency-banner">
        WE SHIP NATIONWIDE FOR ONLY $499
      </div>

      {/* Breadcrumbs */}
      <nav style={{ 
        padding: '1rem 1.5rem', 
        background: 'var(--dark)',
        borderBottom: '1px solid var(--gray)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--orange)', margin: '0 0.5rem' }}>→</span>
          <Link href="/#inventory" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Inventory</Link>
          <span style={{ color: 'var(--orange)', margin: '0 0.5rem' }}>→</span>
          <span style={{ color: 'var(--orange)' }}>{bike.name}</span>
        </div>
      </nav>

      {/* Product Hero Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--black)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <div>
            <Image
              src={bike.image}
              alt={`${bike.name} for sale in Milwaukee, Wisconsin`}
              width={800}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              style={{
                width: '100%',
                height: 'auto',
                border: '2px solid var(--orange)'
              }}
            />
            {bike.featured && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--orange)',
                color: 'var(--black)',
                fontWeight: 800,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                FEATURED BIKE
              </div>
            )}
            {bike.justArrived && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #00ff00, #00cc00)',
                color: 'var(--black)',
                fontWeight: 800,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                JUST ARRIVED
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--orange)',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {bike.name}
            </h1>
            
            <div style={{
              fontSize: '3rem',
              color: 'var(--orange)',
              fontWeight: 700,
              marginBottom: '1rem',
              fontFamily: 'var(--font-clash)'
            }}>
              {bike.priceFormatted}
            </div>
            
            <p style={{
              color: 'var(--text-light)',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              {bike.financing}
            </p>

            <div style={{
              padding: '2rem',
              background: 'var(--gray)',
              border: '1px solid var(--gray-light)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: 'var(--orange)',
                marginBottom: '1rem',
                fontSize: '1.3rem'
              }}>
                Specifications
              </h3>
              <div style={{
                color: 'var(--text-light)',
                lineHeight: '2'
              }}>
                <div><strong>Model:</strong> {model}</div>
                {year && <div><strong>Year:</strong> {year}</div>}
                {mileage && <div><strong>Mileage:</strong> {mileage.toLocaleString()} miles</div>}
                <div><strong>Specs:</strong> {bike.specs}</div>
                <div><strong>Condition:</strong> Used - Excellent</div>
                <div><strong>Location:</strong> Milwaukee, Wisconsin</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)} - ${bike.priceFormatted}`}
                className="cta-button cta-button-primary"
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '1.2rem 2rem',
                  background: 'var(--orange)',
                  color: 'var(--black)',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s',
                  display: 'block'
                }}
              >
                INQUIRE NOW
              </a>
              <a
                href="tel:4144396211"
                className="cta-button cta-button-secondary"
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '1.2rem 2rem',
                  background: 'transparent',
                  color: 'var(--orange)',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '2px solid var(--orange)',
                  transition: 'all 0.3s',
                  display: 'block'
                }}
              >
                CALL JOE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Sections */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--dark)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: 'var(--orange)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          About the Harley {model}
        </h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: 'var(--text)',
          marginBottom: '2rem'
        }}>
          {modelContent.about}
        </p>
      </section>

      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--black)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: 'var(--orange)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Why Milwaukee Riders Love the {model}
        </h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: 'var(--text)',
          marginBottom: '2rem'
        }}>
          {modelContent.whyMilwaukee}
        </p>
      </section>

      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'var(--dark)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: 'var(--orange)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Common Upgrades for the {model}
        </h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: 'var(--text)',
          marginBottom: '2rem'
        }}>
          {modelContent.upgrades}
        </p>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 1.5rem', 
        background: 'var(--black)',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: 'var(--orange)',
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          marginBottom: '2rem'
        }}>
          Ready to Own This {model}?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-light)',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          This used {model} in Milwaukee is ready to ride. Contact Joe today to schedule a viewing or test ride.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`sms:4144396211?body=Interested in ${encodeURIComponent(bike.name)}`}
            className="cta-button cta-button-primary"
            style={{
              padding: '1.2rem 2.5rem',
              background: 'var(--orange)',
              color: 'var(--black)',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
          >
            TEXT JOE
          </a>
          <a
            href="tel:4144396211"
            className="cta-button cta-button-secondary"
            style={{
              padding: '1.2rem 2.5rem',
              background: 'transparent',
              color: 'var(--orange)',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '2px solid var(--orange)',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
          >
            CALL NOW
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          Joe Tabora<span style={{ color: 'var(--orange)', margin: '0 0.75rem' }}>•</span>
          @joetabora<span style={{ color: 'var(--orange)', margin: '0 0.75rem' }}>•</span>
          All bikes titled through House Of Harley
        </p>
      </footer>

      {/* Pulsing Floating CTA */}
      <a href="sms:4144396211" className="floating-cta" aria-label="Text Joe Now">
        TEXT<br />JOE<br />NOW →
      </a>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-bar">
        <a href="tel:4144396211" className="mobile-bar-btn">CALL</a>
        <a href="sms:4144396211" className="mobile-bar-btn">TEXT</a>
        <a href="/#inventory" className="mobile-bar-btn">INVENTORY</a>
      </div>
    </>
  );
}

