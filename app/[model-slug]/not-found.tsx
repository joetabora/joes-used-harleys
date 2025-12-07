import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';

export default function NotFound() {
  return (
    <div style={{
      padding: '4rem 1.5rem',
      background: '#0A0A0A',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        color: '#FF6600',
        marginBottom: '1rem',
        fontFamily: 'var(--font-clash)',
        fontWeight: 700
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        color: '#FFFFFF',
        marginBottom: '1rem',
        fontFamily: 'var(--font-clash)',
        fontWeight: 700
      }}>
        Model Not Found
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: '#CCCCCC',
        marginBottom: '2rem',
        maxWidth: '600px'
      }}>
        Sorry, we couldn&apos;t find that model page. Check out our available models or browse our complete inventory.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <CTAButton href="/inventory" variant="primary">
          View All Bikes
        </CTAButton>
        <CTAButton href="/" variant="secondary">
          Back to Home
        </CTAButton>
      </div>
    </div>
  );
}

