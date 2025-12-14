'use client';

import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import Link from 'next/link';

export default function MerchPage() {
  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section style={{
        padding: '8rem 2rem 6rem',
        background: '#000000',
        textAlign: 'center',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            color: '#FF6600',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            textShadow: '0 0 40px rgba(255, 102, 0, 0.5)'
          }}>
            MERCH
          </div>
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '3rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            COMING SOON
          </div>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#CCCCCC',
            marginBottom: '3rem',
            lineHeight: '1.8',
            fontWeight: 600
          }}>
            We&apos;re working on some badass gear for you. Check back soon for Joe&apos;s Used Harleys merch.
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                background: '#FF6600',
                color: '#000000',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #FF6600',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              className="merch-cta-button"
            >
              BACK TO HOME
            </Link>
            <a
              href="sms:4144396211"
              style={{
                background: 'transparent',
                color: '#FF6600',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                border: '3px solid #FF6600',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              className="merch-cta-button-secondary"
            >
              TEXT JOE
            </a>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      <style dangerouslySetInnerHTML={{ __html: `
        .merch-cta-button:hover {
          background: transparent !important;
          color: #FF6600 !important;
          transform: scale(1.05);
        }
        .merch-cta-button-secondary:hover {
          background: #FF6600 !important;
          color: #000000 !important;
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
