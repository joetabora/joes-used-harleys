'use client';

import { SITE_CONFIG } from '@/lib/seo';

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const fullUrl = `${SITE_CONFIG.url}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 0',
      borderTop: '1px solid #2A2A2A',
      borderBottom: '1px solid #2A2A2A',
      margin: '3rem 0'
    }}>
      <span style={{
        color: '#CCCCCC',
        fontSize: '1rem',
        fontWeight: 600,
        marginRight: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Share:
      </span>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          background: '#1877F2',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderRadius: '0',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-clash)'
        }}
        className="social-share-btn"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          background: '#000000',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          border: '2px solid #FF6600',
          borderRadius: '0',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-clash)'
        }}
        className="social-share-btn"
        aria-label="Share on Twitter/X"
      >
        Twitter/X
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          background: '#25D366',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderRadius: '0',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-clash)'
        }}
        className="social-share-btn"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .social-share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 102, 0, 0.4);
        }
        @media (max-width: 768px) {
          .social-share-btn {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}} />
    </div>
  );
}

