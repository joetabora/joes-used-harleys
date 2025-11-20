/**
 * Portable Text Component
 * Renders Sanity block content
 */

'use client';

import { PortableText as PortableTextReact } from '@portabletext/react';
import type { PortableTextBlock } from '@/sanity/lib/types';

interface PortableTextProps {
  content: PortableTextBlock[] | undefined;
  className?: string;
}

export function PortableText({ content, className = '' }: PortableTextProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <PortableTextReact
        value={content}
        components={{
          block: {
            normal: ({ children }) => <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: 'var(--text)' }}>{children}</p>,
            h2: ({ children }) => (
              <h2 style={{ color: 'var(--orange)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '2rem', marginBottom: '1rem' }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ color: 'var(--orange)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                {children}
              </h3>
            ),
          },
          marks: {
            strong: ({ children }) => <strong style={{ color: 'var(--orange)', fontWeight: 600 }}>{children}</strong>,
            link: ({ value, children }) => {
              const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
              return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} style={{ color: 'var(--orange)' }}>
                  {children}
                </a>
              );
            },
          },
        }}
      />
    </div>
  );
}
