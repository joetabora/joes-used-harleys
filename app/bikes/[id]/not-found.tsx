import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';

export default function NotFound() {
  return (
    <div style={{
      padding: '4rem 1.5rem',
      background: 'var(--dark)',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        color: 'var(--orange)',
        marginBottom: '1rem'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        color: 'var(--text)',
        marginBottom: '1rem'
      }}>
        Bike Not Found
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-light)',
        marginBottom: '2rem',
        maxWidth: '600px'
      }}>
        Sorry, we couldn&apos;t find the bike you&apos;re looking for. It may have been sold or removed from our inventory.
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

