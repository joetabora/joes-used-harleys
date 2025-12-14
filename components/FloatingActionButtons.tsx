'use client';

import { useState, useEffect } from 'react';

export function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show buttons when scrolling down, hide when scrolling up (optional)
      setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* TEXT JOE Button - Bottom Right */}
      <a
        href="sms:4144396211"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#FF6600',
          color: '#000000',
          padding: '1.25rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textDecoration: 'none',
          fontFamily: 'var(--font-clash)',
          border: '3px solid #FF6600',
          borderRadius: '50px',
          boxShadow: '0 0 40px rgba(255, 102, 0, 0.8), 0 8px 30px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#000000';
          e.currentTarget.style.color = '#FF6600';
          e.currentTarget.style.transform = 'scale(1.05) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 102, 0, 1), 0 12px 40px rgba(0, 0, 0, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FF6600';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 102, 0, 0.8), 0 8px 30px rgba(0, 0, 0, 0.5)';
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>💬</span>
        <span>TEXT JOE</span>
      </a>

      {/* Follow on TikTok Button - Bottom Left (Neon Style) */}
      <a
        href="https://www.tiktok.com/@suchgrime"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: '#FF6600',
          padding: '1.25rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textDecoration: 'none',
          fontFamily: 'var(--font-clash)',
          border: '3px solid #FF6600',
          borderRadius: '50px',
          boxShadow: '0 0 40px rgba(255, 102, 0, 0.6), 0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 102, 0, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          cursor: 'pointer',
          textShadow: '0 0 20px rgba(255, 102, 0, 0.8)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.borderColor = '#FF6600';
          e.currentTarget.style.transform = 'scale(1.05) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 102, 0, 1), 0 12px 40px rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.textShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
          e.currentTarget.style.color = '#FF6600';
          e.currentTarget.style.borderColor = '#FF6600';
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 102, 0, 0.6), 0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 102, 0, 0.1)';
          e.currentTarget.style.textShadow = '0 0 20px rgba(255, 102, 0, 0.8)';
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🎵</span>
        <span>FOLLOW ON TIKTOK</span>
      </a>

      {/* Follow on Instagram Button - Above TikTok */}
      <a
        href="https://www.instagram.com/joetabora"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '7rem',
          left: '2rem',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: '#FF6600',
          padding: '1.25rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textDecoration: 'none',
          fontFamily: 'var(--font-clash)',
          border: '3px solid #FF6600',
          borderRadius: '50px',
          boxShadow: '0 0 40px rgba(255, 102, 0, 0.6), 0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 102, 0, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          cursor: 'pointer',
          textShadow: '0 0 20px rgba(255, 102, 0, 0.8)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.borderColor = '#FF6600';
          e.currentTarget.style.transform = 'scale(1.05) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 102, 0, 1), 0 12px 40px rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.textShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
          e.currentTarget.style.color = '#FF6600';
          e.currentTarget.style.borderColor = '#FF6600';
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 102, 0, 0.6), 0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 102, 0, 0.1)';
          e.currentTarget.style.textShadow = '0 0 20px rgba(255, 102, 0, 0.8)';
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>📸</span>
        <span>FOLLOW ON IG</span>
      </a>

      {/* Mobile Sticky Bar - Shows at bottom on mobile */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, #000000 100%)',
          borderTop: '3px solid #FF6600',
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
          boxShadow: '0 -8px 30px rgba(255, 102, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
        className="mobile-sticky-bar"
      >
        <a
          href="sms:4144396211"
          style={{
            flex: 1,
            background: '#FF6600',
            color: '#000000',
            padding: '1rem',
            fontSize: '0.9rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none',
            fontFamily: 'var(--font-clash)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #FF6600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#000000';
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          💬 TEXT JOE
        </a>
        <a
          href="https://www.tiktok.com/@suchgrime"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            background: 'transparent',
            color: '#FF6600',
            padding: '1rem',
            fontSize: '0.9rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none',
            fontFamily: 'var(--font-clash)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #FF6600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🎵 TIKTOK
        </a>
        <a
          href="https://www.instagram.com/joetabora"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            background: 'transparent',
            color: '#FF6600',
            padding: '1rem',
            fontSize: '0.9rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none',
            fontFamily: 'var(--font-clash)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #FF6600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#FF6600';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          📸 INSTAGRAM
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-sticky-bar {
            display: flex !important;
          }
          a[href="sms:4144396211"]:not(.mobile-sticky-bar a),
          a[href*="tiktok"]:not(.mobile-sticky-bar a) {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
