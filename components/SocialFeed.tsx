'use client';

import { useEffect, useRef } from 'react';

interface SocialFeedProps {
  tiktokHandle?: string;
  instagramHandle?: string;
  widgetId?: string; // For Elfsight/EmbedSocial widget ID
}

export function SocialFeed({ tiktokHandle, instagramHandle, widgetId }: SocialFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Elfsight widget script if widgetId is provided
    if (widgetId && containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://apps.elfsight.com/p/platform.js';
      script.defer = true;
      script.onload = () => {
        // Widget will auto-initialize via data-elfsight-app-id attribute
      };
      document.body.appendChild(script);

      return () => {
        // Cleanup
        const existingScript = document.querySelector('script[src*="elfsight"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [widgetId]);

  // If widgetId is provided, use Elfsight widget
  if (widgetId) {
    return (
      <div 
        ref={containerRef}
        className="elfsight-app"
        data-elfsight-app-id={widgetId}
        style={{
          width: '100%',
          minHeight: '600px'
        }}
      />
    );
  }

  // Fallback: Manual embed using TikTok/Instagram embed codes
  // Note: For production, you'll need to get actual embed codes from TikTok/Instagram
  return (
    <div 
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        padding: '2rem 0'
      }}
    >
      {/* Placeholder for TikTok/Instagram embeds */}
      {/* In production, replace with actual embed iframes from TikTok/Instagram */}
      <div style={{
        background: '#0A0A0A',
        border: '2px solid #1A1A1A',
        borderRadius: '12px',
        padding: '1rem',
        aspectRatio: '9/16',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FF6600',
        fontSize: '1.2rem',
        fontWeight: 700,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: '#FF6600',
          color: '#000000',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 800,
          fontFamily: 'var(--font-clash)',
          letterSpacing: '1px'
        }}>
          $24,999
        </div>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
          <div>TikTok/IG Feed</div>
          <div style={{ fontSize: '0.9rem', color: '#CCCCCC', marginTop: '0.5rem' }}>
            Connect your @handle
          </div>
        </div>
      </div>
      
      {/* Repeat for 8-10 items */}
      {[...Array(7)].map((_, i) => (
        <div 
          key={i}
          style={{
            background: '#0A0A0A',
            border: '2px solid #1A1A1A',
            borderRadius: '12px',
            padding: '1rem',
            aspectRatio: '9/16',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FF6600',
            fontSize: '1.2rem',
            fontWeight: 700,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF6600';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 102, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1A1A1A';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#FF6600',
            color: '#000000',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 800,
            fontFamily: 'var(--font-clash)',
            letterSpacing: '1px',
            zIndex: 2
          }}>
            ${(20000 + i * 2000).toLocaleString()}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#FF6600',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 800,
            fontFamily: 'var(--font-clash)',
            letterSpacing: '1px',
            border: '2px solid #FF6600',
            zIndex: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.color = '#FF6600';
          }}
          onClick={() => window.location.href = 'sms:4144396211'}
          >
            TEXT JOE 414-439-6211
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
            <div>Video {i + 2}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
