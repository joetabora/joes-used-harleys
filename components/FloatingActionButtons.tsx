'use client';

import { useState, useEffect } from 'react';

export function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .floating-btn {
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .floating-btn:hover {
          transform: translateY(-3px) scale(1.05);
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(234, 88, 12, 0.3), 
                        0 0 40px rgba(234, 88, 12, 0.2),
                        0 10px 30px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(234, 88, 12, 0.5), 
                        0 0 60px rgba(234, 88, 12, 0.3),
                        0 15px 40px rgba(0, 0, 0, 0.4);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .floating-desktop {
            display: none !important;
          }
          .floating-mobile {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .floating-desktop {
            display: flex !important;
          }
          .floating-mobile {
            display: none !important;
          }
        }
      `}} />

      {/* Desktop Floating Buttons */}
      <div className="floating-desktop" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none'
      }}>
        {/* Text Joe Button */}
        <a
          href="sms:4144396211?body=Hey Joe!"
          className="floating-btn pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            padding: '1.25rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none',
            fontFamily: 'var(--font-clash)',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          <span>TEXT JOE</span>
        </a>

        {/* Social Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem'
        }}>
          <a
            href="https://www.tiktok.com/@suchgrime"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn"
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            title="Follow on TikTok"
          >
            🎵
          </a>
          
          <a
            href="https://www.instagram.com/joetabora"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn"
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            title="Follow on Instagram"
          >
            📸
          </a>
          
          <a
            href="https://www.youtube.com/@suchgrime414"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn"
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            title="Follow on YouTube"
          >
            📺
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="floating-mobile" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: 'rgba(10, 10, 10, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(234, 88, 12, 0.3)',
        padding: '1rem',
        display: 'none',
        gap: '0.75rem',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'all 0.4s ease'
      }}>
        <a
          href="sms:4144396211?body=Hey Joe!"
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            padding: '1rem',
            fontSize: '0.9rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textDecoration: 'none',
            fontFamily: 'var(--font-clash)',
            borderRadius: '12px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 5px 20px rgba(234, 88, 12, 0.4)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>💬</span>
          <span>TEXT JOE</span>
        </a>

        <a
          href="https://www.tiktok.com/@suchgrime"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            textDecoration: 'none'
          }}
        >
          🎵
        </a>

        <a
          href="https://www.instagram.com/joetabora"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            textDecoration: 'none'
          }}
        >
          📸
        </a>

        <a
          href="https://www.youtube.com/@suchgrime414"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            textDecoration: 'none'
          }}
        >
          📺
        </a>
      </div>
    </>
  );
}
