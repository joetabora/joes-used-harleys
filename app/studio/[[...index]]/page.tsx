/**
 * Sanity Studio Route
 * Embedded Sanity Studio for content management
 * Using Sanity Studio directly (compatible with Next.js 14)
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to standalone Sanity Studio
    // Users should deploy Studio separately or access via sanity deploy
    // For now, show a message
  }, [router]);

  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      color: 'var(--text)',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: 'var(--orange)', fontSize: '2rem', marginBottom: '1rem' }}>
        Sanity Studio
      </h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem', maxWidth: '600px' }}>
        To access Sanity Studio, deploy it separately using:
      </p>
      <code style={{
        background: 'var(--dark)',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'var(--orange)',
        fontSize: '1rem',
        marginBottom: '2rem'
      }}>
        npx sanity deploy
      </code>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
        Or configure environment variables and access Studio at your Sanity project URL.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--orange)',
            textDecoration: 'none',
            border: '2px solid var(--orange)',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            display: 'inline-block',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--orange)';
            e.currentTarget.style.color = 'var(--black)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--orange)';
          }}
        >
          Open Sanity Manage
        </a>
      </div>
    </div>
  );
}
