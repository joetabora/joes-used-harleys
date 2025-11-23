/**
 * SEOBlock Component
 * Reusable component for structured SEO content blocks
 * Includes H2 headline, SEO text, optional image, and optional CTA button
 */

import Image from 'next/image';
import { CTAButton } from './CTAButton';

interface SEOBlockProps {
  headline: string;
  content: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  cta?: {
    href: string;
    text: string;
    variant?: 'primary' | 'secondary';
    ariaLabel?: string;
  };
  headlineCta?: {
    href: string;
    text: string;
    variant?: 'primary' | 'secondary';
    ariaLabel?: string;
  };
  className?: string;
  background?: 'dark' | 'black' | 'gray';
  textAlign?: 'left' | 'center' | 'right';
}

export function SEOBlock({
  headline,
  content,
  image,
  cta,
  headlineCta,
  className = '',
  background = 'dark',
  textAlign = 'left',
}: SEOBlockProps) {
  const backgroundClass = {
    dark: 'var(--dark)',
    black: 'var(--black)',
    gray: 'var(--gray)',
  }[background];

  return (
    <section
      className={`seo-block ${className}`}
      style={{
        padding: '6rem 1.5rem',
        background: backgroundClass,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: image ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          gap: '3rem',
          alignItems: image ? 'center' : 'start',
        }}
      >
        {/* Text Content */}
        <div style={{ textAlign }}>
          <h2
            style={{
              color: 'var(--orange)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: headlineCta ? '1.5rem' : '2rem',
              lineHeight: '1.2',
            }}
          >
            {headline}
          </h2>
          {headlineCta && (
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
              <CTAButton
                href={headlineCta.href}
                variant={headlineCta.variant || 'primary'}
                aria-label={headlineCta.ariaLabel || headlineCta.text}
              >
                {headlineCta.text}
              </CTAButton>
            </div>
          )}
          <div
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: '1.9',
              color: 'var(--text)',
              marginBottom: cta ? '2rem' : '0',
            }}
          >
            {content.split('\n\n').map((paragraph, index) => {
              // Check if paragraph is an H3 heading (starts with ###)
              if (paragraph.trim().startsWith('###')) {
                const headingText = paragraph.replace(/^###\s*/, '').trim();
                return (
                  <h3
                    key={index}
                    style={{
                      color: 'var(--orange)',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      marginTop: '2.5rem',
                      marginBottom: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {headingText}
                  </h3>
                );
              }
              
              // Process bold text (**text**) and render paragraph
              const processedParagraph = paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={partIndex} style={{ color: 'var(--orange)', fontWeight: 600 }}>
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              });
              
              return (
                <p key={index} style={{ marginBottom: '1.5rem' }}>
                  {processedParagraph}
                </p>
              );
            })}
          </div>
          {cta && (
            <div style={{ marginTop: '2rem' }}>
              <CTAButton
                href={cta.href}
                variant={cta.variant || 'primary'}
                aria-label={cta.ariaLabel || cta.text}
              >
                {cta.text}
              </CTAButton>
            </div>
          )}
        </div>

        {/* Optional Image */}
        {image && (
          <div style={{ position: 'relative' }}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                border: '2px solid var(--orange)',
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

