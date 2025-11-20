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
            marginBottom: '2rem', 
            color: 'var(--text)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.1'
          }}>
            Used Harley-Davidsons for Sale in Milwaukee
          </h1>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto 3rem', 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.8',
            color: 'var(--text-light)',
            fontWeight: 300
          }}>
            <p>
              Looking for <strong>used Harleys for sale in Milwaukee</strong>? You&apos;ve come to the right place. Joe&apos;s Used Harleys is Milwaukee&apos;s premier destination for pre-owned Harley-Davidson motorcycles. Whether you&apos;re searching for a <strong>used Harley in Milwaukee</strong> for your daily commute, weekend rides along Lake Michigan, or cross-country touring, we have the perfect bike waiting for you. Our inventory features low-mileage, meticulously maintained <strong>Harleys for sale in Milwaukee</strong>, including popular models like the Street Glide, Road Glide, Fat Boy, Heritage Classic, and Low Rider S. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee, Waukesha, Racine, and all of southeastern Wisconsin. Every <strong>used Harley we sell in Milwaukee</strong> comes with full service records, comprehensive inspections, and flexible financing options. Don&apos;t settle for overpriced dealerships or questionable private sellers – experience the Joe&apos;s Used Harleys difference today.
            </p>
          </div>
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
          <h2 style={{ color: 'var(--orange)', marginBottom: '3rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Why Buy From Joe&apos;s Used Harleys
          </h2>
          <div style={{ 
            display: 'grid', 
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Transparent Pricing, Zero Hidden Fees</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                When you buy a <strong>used Harley in Milwaukee</strong> from Joe&apos;s, the price you see is the price you pay – no surprise &quot;prep fees&quot; or &quot;market adjustments.&quot; We believe in honest, upfront pricing that makes buying a <strong>Harley for sale Milwaukee</strong> simple and stress-free.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Comprehensive Inspections & Full Documentation</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                Every <strong>used Harley we sell in Milwaukee</strong> undergoes rigorous inspection. You get complete service records, Carfax reports, and detailed condition documentation. Our <strong>Harley dealership Milwaukee</strong> standards ensure you know exactly what you&apos;re buying.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Financing for All Credit Types</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                Bad credit? First-time buyer? Self-employed? We work with multiple lenders to secure financing for buying a <strong>used Harley Milwaukee</strong>. Our flexible options make owning a premium Harley-Davidson accessible to everyone.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ 48-Hour Money-Back Guarantee</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                We stand behind every <strong>used Harley for sale Milwaukee</strong> with our 48-hour guarantee. If something&apos;s not right in the first 48 hours or 100 miles, bring it back – we&apos;ll fix it or refund it, no questions asked.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Local Milwaukee Expertise & Support</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                As Milwaukee&apos;s trusted <strong>used Harley dealer</strong>, we understand Wisconsin riding conditions. From Lake Michigan cruises to country road adventures, we help you choose the perfect <strong>used Harley Milwaukee</strong> for your lifestyle.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Nationwide Shipping for Only $499</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                Don&apos;t live in Milwaukee? We ship <strong>used Harleys</strong> nationwide for just $499. Whether you&apos;re across Wisconsin or anywhere in the US, we&apos;ll deliver your <strong>Harley for sale Milwaukee</strong> safely to your door.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--black)', borderRadius: '8px', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.3rem' }}>✓ Direct Access to Joe – Real Person, Real Answers</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                Text or call Joe directly at 414-439-6211. No automated systems, no runaround – just honest conversation about finding the right <strong>used Harley Milwaukee</strong> for you. Our <strong>Harley dealership Milwaukee</strong> approach puts you first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory" id="inventory" itemScope itemType="https://schema.org/ItemList" aria-label="Current inventory of used Harley-Davidson motorcycles">
        <h2>Current Inventory - Used Harley-Davidson Motorcycles for Sale in Milwaukee</h2>
        <InventoryGrid />
      </section>

      {/* Pre-Approval Form */}
      <section className="preapproval">
        <h2>GET PRE-APPROVED</h2>
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
      <section className="faq-section" itemScope itemType="https://schema.org/FAQPage">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema([
              {
                question: "Where can I buy a used Harley in Milwaukee?",
                answer: "Joe's Used Harleys is located at House Of Harley, 6221 W Layton Ave, Milwaukee, WI 53220. We offer the largest selection of used Harleys for sale in Milwaukee, including Street Glide, Road Glide, Fat Boy, Heritage Classic, Low Rider S, and Softail models. Our Milwaukee location makes it easy for riders throughout southeastern Wisconsin to find their perfect used Harley-Davidson motorcycle."
              },
              {
                question: "How much does a used Harley cost?",
                answer: "The price of a used Harley in Milwaukee varies based on model, year, mileage, and condition. At Joe's Used Harleys, our used Harleys for sale in Milwaukee typically range from $18,500 to $24,900. Popular models like the Street Glide and Road Glide usually fall between $21,000-$24,000, while Heritage Classic and Fat Boy models often range from $19,000-$22,000. All prices are transparent with no hidden fees – what you see is what you pay (plus tax and title). We also offer flexible financing to make buying a used Harley in Milwaukee affordable."
              },
              {
                question: "Do you offer financing for used Harleys in Milwaukee?",
                answer: "Yes! We offer comprehensive financing options for all used Harleys in Milwaukee, regardless of your credit situation. Whether you have excellent credit, bad credit, are a first-time buyer, or are self-employed, we work with multiple lenders to find a financing solution that works for you. Get pre-approved today by filling out our quick pre-approval form, or text Joe directly at 414-439-6211 to discuss your financing options. We make buying a used Harley in Milwaukee accessible to everyone."
              },
              {
                question: "What condition are your used Harleys in Milwaukee?",
                answer: "Every used Harley we sell in Milwaukee undergoes a comprehensive inspection before being listed. We only sell bikes that meet our strict quality standards. All used Harleys for sale in Milwaukee come with full service records, Carfax reports, and detailed condition reports. We provide complete transparency – if a bike has any scratches larger than a quarter, we'll show you detailed photos before you visit. Our Milwaukee location allows you to inspect any used Harley in person before purchase."
              },
              {
                question: "Do you ship used Harleys outside of Milwaukee?",
                answer: "Absolutely! While we're based in Milwaukee, we ship used Harleys nationwide for only $499. Whether you're in Milwaukee, across Wisconsin, or anywhere in the United States, we can arrange safe, insured delivery of your used Harley right to your door. Our shipping partners are experienced in motorcycle transport and will ensure your bike arrives in the same condition it left our Milwaukee facility. Contact us for a shipping quote to your location."
              },
              {
                question: "What's the best used Harley model for Milwaukee riders?",
                answer: "The best used Harley in Milwaukee depends on your riding style. For touring and long-distance rides along Lake Michigan, the Street Glide and Road Glide are popular choices among Milwaukee riders. If you prefer classic styling, the Fat Boy and Heritage Classic offer timeless appeal perfect for Milwaukee's diverse riding scene. For sporty performance, the Low Rider S delivers power and agility. Our Milwaukee location means we understand local riding conditions and can help you choose the perfect used Harley for your needs. Visit us or text Joe at 414-439-6211 to discuss which model fits your Milwaukee riding lifestyle."
              }
            ]))
          }}
        />
        <h2>Frequently Asked Questions About Used Harleys in Milwaukee</h2>
        
        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">Where can I buy a used Harley in Milwaukee?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              Joe&apos;s Used Harleys is located at House Of Harley, 6221 W Layton Ave, Milwaukee, WI 53220. We offer the largest selection of <strong>used Harleys for sale in Milwaukee</strong>, including Street Glide, Road Glide, Fat Boy, Heritage Classic, Low Rider S, and Softail models. Our Milwaukee location makes it easy for riders throughout southeastern Wisconsin to find their perfect used Harley-Davidson motorcycle.
            </div>
          </div>
        </div>

        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">How much does a used Harley cost?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              The price of a <strong>used Harley in Milwaukee</strong> varies based on model, year, mileage, and condition. At Joe&apos;s Used Harleys, our <strong>used Harleys for sale in Milwaukee</strong> typically range from $18,500 to $24,900. Popular models like the Street Glide and Road Glide usually fall between $21,000-$24,000, while Heritage Classic and Fat Boy models often range from $19,000-$22,000. All prices are transparent with no hidden fees – what you see is what you pay (plus tax and title). We also offer flexible financing to make buying a <strong>used Harley in Milwaukee</strong> affordable.
            </div>
          </div>
        </div>

        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">Do you offer financing for used Harleys in Milwaukee?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              Yes! We offer comprehensive financing options for all <strong>used Harleys in Milwaukee</strong>, regardless of your credit situation. Whether you have excellent credit, bad credit, are a first-time buyer, or are self-employed, we work with multiple lenders to find a financing solution that works for you. Get pre-approved today by filling out our quick pre-approval form, or text Joe directly at 414-439-6211 to discuss your financing options. We make buying a <strong>used Harley in Milwaukee</strong> accessible to everyone.
            </div>
          </div>
        </div>

        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">What condition are your used Harleys in Milwaukee?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              Every <strong>used Harley we sell in Milwaukee</strong> undergoes a comprehensive inspection before being listed. We only sell bikes that meet our strict quality standards. All <strong>used Harleys for sale in Milwaukee</strong> come with full service records, Carfax reports, and detailed condition reports. We provide complete transparency – if a bike has any scratches larger than a quarter, we&apos;ll show you detailed photos before you visit. Our Milwaukee location allows you to inspect any <strong>used Harley</strong> in person before purchase.
            </div>
          </div>
        </div>

        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">Do you ship used Harleys outside of Milwaukee?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              Absolutely! While we&apos;re based in Milwaukee, we ship <strong>used Harleys</strong> nationwide for only $499. Whether you&apos;re in Milwaukee, across Wisconsin, or anywhere in the United States, we can arrange safe, insured delivery of your <strong>used Harley</strong> right to your door. Our shipping partners are experienced in motorcycle transport and will ensure your bike arrives in the same condition it left our Milwaukee facility. Contact us for a shipping quote to your location.
            </div>
          </div>
        </div>

        <div className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <div className="faq-question" itemProp="name">What&apos;s the best used Harley model for Milwaukee riders?</div>
          <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              The best <strong>used Harley in Milwaukee</strong> depends on your riding style. For touring and long-distance rides along Lake Michigan, the Street Glide and Road Glide are popular choices among Milwaukee riders. If you prefer classic styling, the Fat Boy and Heritage Classic offer timeless appeal perfect for Milwaukee&apos;s diverse riding scene. For sporty performance, the Low Rider S delivers power and agility. Our Milwaukee location means we understand local riding conditions and can help you choose the perfect <strong>used Harley</strong> for your needs. Visit us or text Joe at 414-439-6211 to discuss which model fits your Milwaukee riding lifestyle.
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="local-seo" itemScope itemType="https://schema.org/LocalBusiness">
        <h2>Used Harley-Davidson Motorcycles in Milwaukee, Wisconsin</h2>
        <p>
          Looking for <strong>used Harleys in Milwaukee</strong>? Joe&apos;s Used Harleys is your trusted source for pre-owned Harley-Davidson motorcycles in the Milwaukee area. We specialize in low-mileage, well-maintained <strong>used Harleys</strong> including <strong>Street Glide Milwaukee</strong>, <strong>Road Glide Milwaukee</strong>, <strong>Fat Boy Milwaukee</strong>, <strong>Heritage Classic Milwaukee</strong>, <strong>Low Rider S Milwaukee</strong>, and more.
        </p>
        <p>
          Located at House Of Harley (6221 W Layton Ave, Milwaukee, WI 53220), we offer the best selection of <strong>used Harley-Davidson motorcycles in Milwaukee</strong>. All bikes come with full warranty, financing options, and we ship nationwide for only $499.
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
