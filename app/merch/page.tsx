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
        padding: '12rem 2rem 8rem',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        textAlign: 'center',
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}} />

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
            border: '1px solid rgba(234, 88, 12, 0.3)',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            marginBottom: '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              👕 Merch Drop
            </span>
          </div>

          <div style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-2px',
            textShadow: '0 0 80px rgba(234, 88, 12, 0.3)',
            lineHeight: '1'
          }}>
            MERCH
          </div>
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '3rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px'
          }}>
            COMING SOON
          </div>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#9ca3af',
            marginBottom: '4rem',
            lineHeight: '1.8',
            fontWeight: 500,
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            We're working on some badass gear for you. Check back soon for Joe's Used Harleys merch — or text Joe to get notified when it drops.
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="sms:4144396211?body=Let me know when merch drops!"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4)';
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>💬</span>
              NOTIFY ME
            </a>
            <Link
              href="/"
              className="glass-card"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '1.5rem 3.5rem',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.5)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
