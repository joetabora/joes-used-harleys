import { generateMetadata as generateSEOMetadata, generateFAQSchema } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import { InventoryGrid } from '@/components/InventoryGrid';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Used Harley Milwaukee | Used Harley for Sale Milwaukee | Joe\'s Used Harleys',
  description: 'Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy, Heritage Classic & more.',
  keywords: ['used harley milwaukee', 'harley for sale milwaukee', 'used harleys for sale milwaukee'],
  path: '/'
});

export default function HomePage() {
  return (
    <>
      <SEO type="website" includeLocalBusiness includeWebSite />
      
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
            alt="Joe's Used Harleys - Used Harley-Davidson Motorcycles for Sale in Milwaukee Wisconsin" 
            className="hero-logo" 
            width={600} 
            height={200}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            marginBottom: '2rem', 
            color: 'var(--text)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            lineHeight: '1.1'
          }}>
            Used Harley-Davidsons for Sale in Milwaukee – Joe&apos;s Used Harleys
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
            <CTAButton href="#inventory" variant="primary">
              View Inventory
            </CTAButton>
            <CTAButton href="sms:4144396211" variant="secondary">
              Contact Joe
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Why Buy a Used Harley in Milwaukee Section */}
      <section className="trust" style={{ padding: '8rem 1.5rem 6rem', background: 'var(--dark)' }}>
        <div className="trust-content">
          <h2 style={{ color: 'var(--orange)', marginBottom: '2rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Why Buy a Used Harley in Milwaukee?
          </h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: '1.8', color: 'var(--text)', marginBottom: '2rem' }}>
              When you&apos;re looking for <strong>used Harleys for sale in Milwaukee</strong>, buying pre-owned offers significant advantages over purchasing new. First, you&apos;ll save thousands of dollars while still getting a premium Harley-Davidson motorcycle that&apos;s been professionally maintained. Many <strong>used Harleys in Milwaukee</strong> come with valuable aftermarket upgrades like Stage 1 or Stage 2 performance kits, custom exhaust systems, and premium accessories that would cost thousands more if added to a new bike.
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: '1.8', color: 'var(--text)', marginBottom: '2rem' }}>
              Milwaukee&apos;s diverse riding conditions – from city streets to scenic country roads – make a <strong>used Harley in Milwaukee</strong> an excellent investment. Our pre-owned bikes have already proven their reliability on Wisconsin roads, and you won&apos;t take the initial depreciation hit that comes with buying new. Plus, with Milwaukee&apos;s strong motorcycle community, you&apos;ll find plenty of local support, events, and riding groups to enhance your ownership experience.
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: '1.8', color: 'var(--text)' }}>
              At Joe&apos;s Used Harleys, every <strong>used Harley we sell in Milwaukee</strong> undergoes a comprehensive inspection, comes with full service history, and includes our 48-hour guarantee. We make buying a <strong>used Harley in Milwaukee</strong> simple, transparent, and stress-free – no dealership games, no hidden fees, just honest pricing and exceptional bikes.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Harley-Davidson Models We Sell Section */}
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
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Street Glide</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The <strong>Street Glide</strong> is Milwaukee&apos;s favorite touring bike. Perfect for long rides along Lake Michigan or weekend trips through Wisconsin. Our <strong>used Street Glides in Milwaukee</strong> feature the powerful Milwaukee-Eight engine and premium touring amenities.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Road Glide</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The <strong>Road Glide</strong> offers a distinctive frame-mounted fairing for superior wind protection. Ideal for Milwaukee riders who want maximum comfort on extended tours. Our <strong>used Road Glides in Milwaukee</strong> are in excellent condition.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Fat Boy</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The iconic <strong>Fat Boy</strong> combines classic Harley styling with modern performance. A popular choice for <strong>used Harleys in Milwaukee</strong> among riders who want that timeless look with contemporary reliability.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Heritage Classic</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The <strong>Heritage Classic</strong> delivers retro styling with modern engineering. Perfect for Milwaukee riders who appreciate classic design. Our <strong>used Heritage Classics in Milwaukee</strong> feature authentic styling and reliable performance.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Low Rider S</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The <strong>Low Rider S</strong> offers sporty performance with aggressive styling. A top choice for Milwaukee riders seeking power and style. Our <strong>used Low Rider S models in Milwaukee</strong> come with performance upgrades.
              </p>
            </div>
            <div style={{ padding: '2rem', background: 'var(--gray)', border: '1px solid var(--gray-light)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '1rem', fontSize: '1.5rem' }}>Softail Deluxe</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                The <strong>Softail Deluxe</strong> combines classic looks with modern comfort. Ideal for Milwaukee riders who want vintage style with contemporary features. Our <strong>used Softail Deluxes in Milwaukee</strong> are well-maintained and ready to ride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Riders Trust Joe's Used Harleys Section */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--orange)', marginBottom: '2rem', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            Why Riders Trust Joe&apos;s Used Harleys
          </h2>
          <div className="trust-features">
            <div className="trust-feature">
              <h4>Transparent Pricing</h4>
              <p>When you buy a <strong>used Harley in Milwaukee</strong> from Joe&apos;s, you get honest, upfront pricing. No hidden fees, no surprise charges – just the price you see, plus tax and title. We believe in fair deals for Milwaukee riders.</p>
            </div>
            <div className="trust-feature">
              <h4>Comprehensive Inspections</h4>
              <p>Every <strong>used Harley we sell in Milwaukee</strong> undergoes a thorough inspection. We check everything from engine performance to frame integrity. You get full service records and Carfax reports with every bike.</p>
            </div>
            <div className="trust-feature">
              <h4>Flexible Financing</h4>
              <p>We make buying a <strong>used Harley in Milwaukee</strong> accessible with financing options for all credit types. Bad credit? First-time buyer? Self-employed? We work with lenders who understand your situation.</p>
            </div>
            <div className="trust-feature">
              <h4>48-Hour Guarantee</h4>
              <p>We stand behind every <strong>used Harley we sell in Milwaukee</strong>. If something&apos;s not right in the first 48 hours or 100 miles, bring it back. We&apos;ll fix it or refund it – no questions asked.</p>
            </div>
            <div className="trust-feature">
              <h4>Local Milwaukee Expertise</h4>
              <p>As Milwaukee&apos;s trusted <strong>used Harley dealer</strong>, we know what works best for Wisconsin riding. From Lake Michigan cruises to country road adventures, we help you find the perfect bike for your Milwaukee lifestyle.</p>
            </div>
            <div className="trust-feature">
              <h4>Nationwide Shipping</h4>
              <p>Don&apos;t live in Milwaukee? No problem. We ship <strong>used Harleys</strong> nationwide for just $499. Whether you&apos;re in Milwaukee, across Wisconsin, or anywhere in the US, we&apos;ll get your bike to you safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory" id="inventory" itemScope itemType="https://schema.org/ItemList">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d-87.9065!3d43.0389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8805195b6c8e8c8f%3A0x0!2zNDPCsDAyJzIwLjAiTiA4N8KwNTQnMjMuNCJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus" 
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
          <Link href="#inventory" className="local-link">Used Harleys Milwaukee</Link>
          <Link href="#inventory" className="local-link">Harley for Sale Milwaukee</Link>
          <Link href="#inventory" className="local-link">Used Motorcycles Milwaukee WI</Link>
          <Link href="/used-street-glide-milwaukee" className="local-link">Street Glide Milwaukee</Link>
          <Link href="/used-road-glide-milwaukee" className="local-link">Road Glide Milwaukee</Link>
          <Link href="/used-fat-boy-milwaukee" className="local-link">Fat Boy Milwaukee</Link>
          <Link href="/used-heritage-classic-milwaukee" className="local-link">Heritage Classic Milwaukee</Link>
          <Link href="/used-low-rider-s-milwaukee" className="local-link">Low Rider S Milwaukee</Link>
          <Link href="/buyers-guide-used-harley-milwaukee" className="local-link">Buyer&apos;s Guide</Link>
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
        <a href="#inventory" className="mobile-bar-btn">INVENTORY</a>
      </div>
    </>
  );
}
