import { setPageSEO, generateFAQSchema } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { InventoryGrid } from '@/components/InventoryGrid';
import { CTAButton } from '@/components/CTAButton';
import { InternalLinks } from '@/components/InternalLinks';
import { SEOBlock } from '@/components/SEOBlock';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Homepage SEO - targeting primary Milwaukee keywords
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Used Harley Milwaukee | Used Harley for Sale Milwaukee',
  pageDescription: 'Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy, Heritage Classic & more.',
  pageKeywords: ['used harley milwaukee', 'harley for sale milwaukee', 'used harleys for sale milwaukee'],
  location: 'Milwaukee',
  path: '/'
});

export default function HomePage() {
  return (
    <>
      {/* Urgency Banner */}
      <div className="urgency-banner">
        WE SHIP NATIONWIDE FOR ONLY $499
      </div>

      {/* SEO-Optimized Hero Section */}
      <section className="hero" aria-label="Used Harley-Davidsons for Sale in Milwaukee">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          aria-hidden="true"
          preload="metadata"
          poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <Image 
            src="/juh2.png" 
            alt="Joe's Used Harleys Logo - Buy Used Harley-Davidson Motorcycles in Milwaukee Wisconsin. Street Glide, Road Glide, Fat Boy, Heritage Classic for Sale." 
            className="hero-logo" 
            width={600} 
            height={200}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            fetchPriority="high"
          />
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            marginBottom: '1rem', 
            color: 'var(--text)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.1'
          }}>
            Used Harleys for Sale in Milwaukee
          </h1>
          <p className="subheadline" style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            marginBottom: '3rem', 
            color: 'var(--text-light)',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}>
            Low miles • Full warranty • Financing available
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton href="#inventory" variant="primary" aria-label="View our inventory of used Harley-Davidson motorcycles for sale in Milwaukee">
              View Inventory
            </CTAButton>
            <CTAButton href="sms:4144396211" variant="secondary" aria-label="Contact Joe by text message about used Harleys in Milwaukee">
              Contact Joe
            </CTAButton>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Intro Block */}
      <SEOBlock
        headline="Find Your Perfect Used Harley in Milwaukee"
        headlineCta={{
          href: '/inventory',
          text: 'View Inventory',
          variant: 'primary',
          ariaLabel: 'View our complete inventory of used Harley-Davidson motorcycles for sale in Milwaukee'
        }}
        content={`When you're searching for a **used Harley Milwaukee** has to offer, you want more than just a motorcycle – you want a trusted partner who understands the Milwaukee riding community and delivers exceptional value. At Joe's Used Harleys, we specialize in connecting Milwaukee riders with premium pre-owned Harley-Davidson motorcycles that have been meticulously inspected, professionally maintained, and priced fairly. Our Milwaukee location at House Of Harley on W Layton Ave makes us the go-to destination for riders throughout southeastern Wisconsin who demand quality, transparency, and honest pricing.

Finding a **Harley for sale Milwaukee** that meets your standards shouldn't require endless research or settling for questionable private sellers. Our inventory features low-mileage Street Glides, Road Glides, Softails, Sportsters, Dynas, and other popular models – each with complete service histories, Carfax reports, and our comprehensive 48-hour guarantee. Whether you're a first-time Harley owner or a seasoned rider looking to upgrade, we make the process simple: transparent pricing with no hidden fees, flexible financing options for all credit situations, and nationwide shipping for just $499.

### Why Milwaukee Riders Choose Joe's Used Harleys

As Milwaukee's premier **Milwaukee motorcycle dealer**, we understand that buying a used motorcycle is a significant investment. That's why every bike in our inventory undergoes a rigorous inspection process, checking everything from engine performance and transmission integrity to frame condition and electrical systems. We provide detailed photos of any imperfections, full disclosure of modifications and upgrades, and complete documentation of service records. Our Milwaukee-based team knows Wisconsin riding conditions – from Lake Michigan shoreline cruises to country road adventures – and we help you choose the perfect Harley for your lifestyle.

### The Best Selection of Used Harleys Wisconsin Has to Offer

Unlike traditional dealerships that add thousands in "prep fees" and "market adjustments," Joe's Used Harleys operates with complete transparency. The price you see is the price you pay, minus tax and title. We work with multiple lenders to secure financing for buyers with excellent credit, bad credit, first-time buyers, and self-employed individuals. Our Milwaukee location serves riders from Waukesha, Racine, Kenosha, and throughout Wisconsin, and we ship nationwide to make premium **used Harleys Wisconsin** accessible to riders everywhere.

Experience the difference of buying from a **used Harley Milwaukee** dealer who puts customers first. Visit us at House Of Harley, text Joe directly at 414-439-6211, or browse our complete inventory online. We're not just selling motorcycles – we're helping Milwaukee riders find their perfect Harley-Davidson and join Wisconsin's vibrant motorcycle community.`}
        cta={{
          href: '/inventory',
          text: 'Browse Complete Inventory',
          variant: 'primary',
          ariaLabel: 'Browse our complete inventory of used Harley-Davidson motorcycles in Milwaukee'
        }}
        background="black"
        textAlign="left"
      />

      {/* Why Buy a Used Harley in Milwaukee Section */}
      <SEOBlock
        headline="Why Buy a Used Harley in Milwaukee?"
        content={`When you're looking for used Harleys for sale in Milwaukee, buying pre-owned offers significant advantages over purchasing new. First, you'll save thousands of dollars while still getting a premium Harley-Davidson motorcycle that's been professionally maintained. Many used Harleys in Milwaukee come with valuable aftermarket upgrades like Stage 1 or Stage 2 performance kits, custom exhaust systems, and premium accessories that would cost thousands more if added to a new bike.

Milwaukee's diverse riding conditions – from city streets to scenic country roads – make a used Harley in Milwaukee an excellent investment. Our pre-owned bikes have already proven their reliability on Wisconsin roads, and you won't take the initial depreciation hit that comes with buying new. Plus, with Milwaukee's strong motorcycle community, you'll find plenty of local support, events, and riding groups to enhance your ownership experience.

At Joe's Used Harleys, every used Harley we sell in Milwaukee undergoes a comprehensive inspection, comes with full service history, and includes our 48-hour guarantee. We make buying a used Harley in Milwaukee simple, transparent, and stress-free – no dealership games, no hidden fees, just honest pricing and exceptional bikes.`}
        cta={{
          href: '/inventory',
          text: 'Browse Our Inventory',
          variant: 'primary',
          ariaLabel: 'Browse our inventory of used Harley-Davidson motorcycles for sale in Milwaukee'
        }}
        background="dark"
        textAlign="center"
      />

      {/* Popular Models Grid Section */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--black)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--orange)', marginBottom: '3rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Popular Harley-Davidson Models We Sell
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <Link href="/models/street-glide" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="View used Street Glide motorcycles for sale in Milwaukee">
              <div className="model-card" style={{ 
                padding: '2rem', 
                background: 'var(--dark)', 
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              >
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Street Glide</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                  The iconic <strong>Street Glide</strong> is Milwaukee&apos;s top choice for touring. Our <strong>used Street Glides in Milwaukee</strong> feature powerful Milwaukee-Eight engines, premium audio systems, and highway-ready comfort perfect for Lake Michigan cruises.
                </p>
              </div>
            </Link>
            <Link href="/models/road-glide" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="View used Road Glide motorcycles for sale in Milwaukee">
              <div className="model-card" style={{ 
                padding: '2rem', 
                background: 'var(--dark)', 
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              >
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Road Glide</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                  The <strong>Road Glide</strong> features a distinctive frame-mounted sharknose fairing for superior wind protection. Our <strong>used Road Glides in Milwaukee</strong> offer maximum comfort and stability for extended Wisconsin touring adventures.
                </p>
              </div>
            </Link>
            <Link href="/models/softail" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="View used Softail motorcycles for sale in Milwaukee">
              <div className="model-card" style={{ 
                padding: '2rem', 
                background: 'var(--dark)', 
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              >
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Softail</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                  The <strong>Softail</strong> family combines classic styling with modern performance. Our <strong>used Softails in Milwaukee</strong> include Heritage Classic, Fat Boy, and Deluxe models – perfect for riders who want timeless design with contemporary reliability.
                </p>
              </div>
            </Link>
            <Link href="/models/sportster" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="View used Sportster motorcycles for sale in Milwaukee">
              <div className="model-card" style={{ 
                padding: '2rem', 
                background: 'var(--dark)', 
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              >
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Sportster</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                  The legendary <strong>Sportster</strong> is Harley&apos;s most versatile platform. Our <strong>used Sportsters in Milwaukee</strong> include 883 and 1200 models, offering nimble handling and classic V-twin power perfect for city riding and weekend adventures.
                </p>
              </div>
            </Link>
            <Link href="/models/dyna" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="View used Dyna motorcycles for sale in Milwaukee">
              <div className="model-card" style={{ 
                padding: '2rem', 
                background: 'var(--dark)', 
                border: '2px solid var(--gray-light)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              >
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Dyna</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                  The <strong>Dyna</strong> platform delivers raw power and classic cruiser styling. Our <strong>used Dynas in Milwaukee</strong> feature the iconic Twin Cam engine and are perfect for riders who want authentic Harley performance with customizable potential.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Buy From Joe's Used Harleys Section */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--orange)', marginBottom: '2rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Why Buy From Joe?
          </h2>
          <p className="why-buy-intro" style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            lineHeight: '1.9', 
            color: 'var(--text)', 
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            When you&apos;re hunting for a used Harley in Milwaukee, you want a dealer who gets it — no corporate runaround, no surprise fees. I&apos;m Joe, a local rider who&apos;s been flipping premium pre-owned Harleys at House of Harley for years. I personally inspect every bike, price it fair, and back it with a no-BS guarantee. Whether you&apos;re cruising Lake Michigan or hitting backroads, I&apos;ll help you find the right ride without the hassle.
          </p>
          <ul className="why-buy-list" style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Honest Pricing, No Games
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  The price you see is what you pay — no &quot;prep fees&quot; or hidden add-ons. It&apos;s straightforward, just like Milwaukee riders expect.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Full Inspections & Paper Trail
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  Every bike gets a deep check: engine, frame, electronics. You get service records, Carfax, and photos of any quirks — total transparency.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Financing That Fits Real Life
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  Bad credit, first bike, or self-employed? I work with lenders who say yes. Rates as low as $299/month with approved credit.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  48-Hour No-Risk Guarantee
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  Not feeling it after 48 hours or 100 miles? Bring it back — full refund, no questions. Your peace of mind is locked in.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Local Know-How, Nationwide Shipping
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  I know Wisconsin roads inside out. Can&apos;t make it to Milwaukee? We ship anywhere for $499, fully insured.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Direct Line to Me
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  Text or call 414-439-6211 — I answer fast, no bots. Let&apos;s talk bikes like riders do.
                </p>
              </div>
            </li>
            <li className="why-buy-item" style={{
              padding: '1.5rem',
              background: 'var(--black)',
              borderRadius: '8px',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span className="check" style={{ color: 'var(--orange)', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
              <div>
                <strong style={{ color: 'var(--orange)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
                  Low-Mile Gems with Warranty
                </strong>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  Carefully picked bikes with low miles and full warranty. Only what I&apos;d ride myself.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory" id="inventory" itemScope itemType="https://schema.org/ItemList" aria-label="Current inventory of used Harley-Davidson motorcycles">
        <h2>Current Used Harleys in Stock</h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-light)', 
          fontSize: '1.1rem',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Browse our latest arrivals — low miles, fully inspected, ready to roll. Questions? Text me direct.
        </p>
        <InventoryGrid />
      </section>

      {/* Pre-Approval Form */}
      <section className="preapproval">
        <h2>Get Pre-Approved in Minutes</h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-light)', 
          fontSize: '1.1rem',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 2rem'
        }}>
          Ready to ride? Fill this out — I&apos;ll get back to you with options in under an hour, no matter your credit situation.
        </p>
        <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="preapprovalForm">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" required />
          </div>
          <div className="form-group">
            <label>Credit Score Range</label>
            <select name="credit_score" required>
              <option value="">Select...</option>
              <option value="excellent">750+</option>
              <option value="good">700-749</option>
              <option value="fair">650-699</option>
              <option value="poor">Below 650</option>
            </select>
          </div>
          <div className="form-group">
            <label>Monthly Income</label>
            <input type="number" name="income" placeholder="$" required />
          </div>
          <div className="form-group">
            <label>Bike of Interest (Optional)</label>
            <input type="text" name="bike_interest" placeholder="e.g., 2023 Street Glide Special" />
          </div>
          <button type="submit" className="form-submit">SUBMIT FOR PRE-APPROVAL</button>
        </form>
      </section>

      {/* FAQ Section with JSON-LD Schema */}
      <section className="faq-section" itemScope itemType="https://schema.org/FAQPage" style={{ padding: '6rem 1.5rem', background: 'var(--black)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Where can I buy a used Harley in Milwaukee?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "I'm at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220). It's the largest selection in town — Street Glides, Road Glides, Fat Boys, and more. Easy to browse online or stop by for a look. Serving all of southeastern Wisconsin."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much do used Harleys cost in Milwaukee?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Prices range from $14,999 for entry-level models to $28,999 for loaded tourers. Street Glides and Road Glides usually hit $21,000–$24,000. No hidden fees — what you see is what you pay (plus tax/title). Financing makes it affordable."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer financing for used Harleys?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely — excellent credit, bad credit, first-time buyers, self-employed, all covered. Rates start at $299/month. I'll connect you with lenders who get it. Text me at 414-439-6211 to chat options."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's your return policy?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "48-hour/100-mile guarantee: If it's not right, bring it back for a full refund or fix. No hassle — I want you happy on the road."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you ship outside Milwaukee?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, nationwide for $499 — insured and handled by pros. From Wisconsin to coast-to-coast, I'll get it to you safe."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What condition are the bikes in?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Rigorous inspections on everything: engine, frame, brakes. Full service records and Carfax included. Photos of any quirks upfront — no surprises."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I trade in my current bike?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sure — I pay fair for clean rides. Send photos/details, and I'll appraise it toward your new one. Makes upgrading easy."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What models do you have?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Street Glides, Road Glides, Fat Boys, Heritage Classics, Low Rider S, Softails, Sportsters, and more. Inventory turns fast — text me at 414-439-6211 for the latest."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer warranty on used Harleys?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes — full coverage on every bike. Terms vary by model, but I'm here to handle any issues. No runaround."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I schedule a test ride?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Text or call 414-439-6211 — we'll set up a time that works. At 6221 W Layton Ave, Milwaukee. Qualified buyers only, but it's easy to qualify."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What payment methods do you accept?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Cash, checks, wire transfers, or financing. I make it simple — let's talk what fits your situation."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are the bikes inspected before sale?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Every one — engine to tires. Service history and Carfax included. Only bikes I'd ride myself make the cut."
                    }
                  }
                ]
              })
            }}
          />
          <h2 style={{ color: 'var(--orange)', marginBottom: '3rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Common Questions About Buying Used Harleys in Milwaukee
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Where can I buy a used Harley in Milwaukee?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  I&apos;m at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220). It&apos;s the largest selection in town — Street Glides, Road Glides, Fat Boys, and more. Easy to browse online or stop by for a look. Serving all of southeastern Wisconsin.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                How much do used Harleys cost in Milwaukee?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Prices range from $14,999 for entry-level models to $28,999 for loaded tourers. Street Glides and Road Glides usually hit $21,000–$24,000. No hidden fees — what you see is what you pay (plus tax/title). Financing makes it affordable.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Do you offer financing for used Harleys?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Absolutely — excellent credit, bad credit, first-time buyers, self-employed, all covered. Rates start at $299/month. I&apos;ll connect you with lenders who get it. Text me at 414-439-6211 to chat options.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                What&apos;s your return policy?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  48-hour/100-mile guarantee: If it&apos;s not right, bring it back for a full refund or fix. No hassle — I want you happy on the road.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Do you ship outside Milwaukee?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Yes, nationwide for $499 — insured and handled by pros. From Wisconsin to coast-to-coast, I&apos;ll get it to you safe.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                What condition are the bikes in?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Rigorous inspections on everything: engine, frame, brakes. Full service records and Carfax included. Photos of any quirks upfront — no surprises.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Can I trade in my current bike?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Sure — I pay fair for clean rides. Send photos/details, and I&apos;ll appraise it toward your new one. Makes upgrading easy.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                What models do you have?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Street Glides, Road Glides, Fat Boys, Heritage Classics, Low Rider S, Softails, Sportsters, and more. Inventory turns fast — text me at 414-439-6211 for the latest.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Do you offer warranty on used Harleys?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Yes — full coverage on every bike. Terms vary by model, but I&apos;m here to handle any issues. No runaround.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                How do I schedule a test ride?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Text or call 414-439-6211 — we&apos;ll set up a time that works. At 6221 W Layton Ave, Milwaukee. Qualified buyers only, but it&apos;s easy to qualify.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                What payment methods do you accept?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Cash, checks, wire transfers, or financing. I make it simple — let&apos;s talk what fits your situation.
                </p>
              </div>
            </div>

            <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ padding: '2rem', background: 'var(--dark)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 className="faq-question" itemProp="name" style={{ color: 'var(--orange)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                Are the bikes inspected before sale?
              </h3>
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ color: 'var(--text-light)', lineHeight: '1.8', margin: 0 }}>
                  Every one — engine to tires. Service history and Carfax included. Only bikes I&apos;d ride myself make the cut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="local-seo" itemScope itemType="https://schema.org/LocalBusiness">
        <h2>Used Harleys in Milwaukee, Wisconsin</h2>
        <p>
          Looking for used Harleys in Milwaukee? I&apos;m at House of Harley (6221 W Layton Ave, Milwaukee, WI 53220) — the spot for low-mile pre-owned rides like Street Glides, Road Glides, Fat Boys, Heritage Classics, and Low Rider S. Serving Waukesha, Racine, Kenosha, and all of Wisconsin. Full warranty, financing, $499 nationwide shipping.
        </p>
        
        {/* Google Maps Embed */}
        <div style={{ margin: '3rem 0', maxWidth: '100%', height: '400px', border: '2px solid var(--orange)' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.9243178731476!2d-87.99424712384211!3d42.95879927114352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880511b5f0600ac3%3A0x87f5600c68b8d805!2s6221%20W%20Layton%20Ave%2C%20Greenfield%2C%20WI%2053220!5e0!3m2!1sen!2sus!4v1763599487508!5m2!1sen!2sus" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Joe's Used Harleys Location - House Of Harley, 6221 W Layton Ave, Milwaukee Wisconsin 53220"
          />
        </div>
        
        <div className="local-links">
          <Link href="/used-harleys-milwaukee" className="local-link">Used Harleys Milwaukee</Link>
          <Link href="/harley-for-sale-milwaukee" className="local-link">Harley for Sale Milwaukee</Link>
          <Link href="/milwaukee-harley-dealership" className="local-link">Milwaukee Harley Dealership</Link>
          <Link href="/used-street-glide-milwaukee" className="local-link">Street Glide Milwaukee</Link>
          <Link href="/used-road-glide-milwaukee" className="local-link">Road Glide Milwaukee</Link>
          <Link href="/used-fat-boy-milwaukee" className="local-link">Fat Boy Milwaukee</Link>
          <Link href="/used-heritage-classic-milwaukee" className="local-link">Heritage Classic Milwaukee</Link>
          <Link href="/used-low-rider-s-milwaukee" className="local-link">Low Rider S Milwaukee</Link>
          <Link href="/buyers-guide-used-harley-milwaukee" className="local-link">Buyer&apos;s Guide</Link>
        </div>
      </section>

      {/* Milwaukee Contact Section with Google Maps */}
      <section style={{ 
        padding: '6rem 1.5rem', 
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
          <div>
            <h2 style={{ 
              color: 'var(--orange)', 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Visit Us in Milwaukee, Wisconsin
            </h2>
            <div style={{ 
              color: 'var(--text)', 
              lineHeight: '1.8',
              fontSize: '1.1rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--orange)' }}>Joe&apos;s Used Harleys</strong>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                6221 W Layton Ave<br />
                Milwaukee, WI 53220<br />
                United States
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <a 
                  href="tel:4144396211" 
                  style={{ 
                    color: 'var(--orange)', 
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 600
                  }}
                >
                  📞 (414) 439-6211
                </a>
              </p>
              <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                <strong>Hours:</strong><br />
                Monday - Saturday: 9:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                Located at <strong>House Of Harley</strong> on W Layton Ave. Serving Milwaukee, Waukesha, Racine, and all of southeastern Wisconsin.
              </p>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.9243178731476!2d-87.99424712384211!3d42.95879927114352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880511b5f0600ac3%3A0x87f5600c68b8d805!2s6221%20W%20Layton%20Ave%2C%20Greenfield%2C%20WI%2053220!5e0!3m2!1sen!2sus!4v1763599487508!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: '2px solid var(--orange)', borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Joe's Used Harleys Location - 6221 W Layton Ave, Milwaukee, WI 53220"
            />
          </div>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <InternalLinks currentPage="home" />

      {/* Footer */}
      <footer>
        <p>
          Joe Tabora<span style={{ color: 'var(--orange)', margin: '0 0.75rem' }}>•</span>
          @joetabora<span style={{ color: 'var(--orange)', margin: '0 0.75rem' }}>•</span>
          All bikes titled through House Of Harley
        </p>
      </footer>

      {/* Pulsing Floating CTA */}
      <a href="sms:4144396211" className="floating-cta" aria-label="Text Joe now about used Harley-Davidson motorcycles for sale in Milwaukee">
        TEXT<br />JOE<br />NOW →
      </a>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-bar" role="navigation" aria-label="Mobile navigation menu">
        <a href="tel:4144396211" className="mobile-bar-btn" aria-label="Call Joe at 414-439-6211 about used Harleys in Milwaukee">CALL</a>
        <a href="sms:4144396211" className="mobile-bar-btn" aria-label="Text Joe at 414-439-6211 about used Harleys in Milwaukee">TEXT</a>
        <a href="#inventory" className="mobile-bar-btn" aria-label="View inventory of used Harley-Davidson motorcycles">INVENTORY</a>
      </div>
    </>
  );
}
// Deployment timestamp: Tue Nov 18 22:33:01 CST 2025
