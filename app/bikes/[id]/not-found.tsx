import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--black)',
      color: 'var(--text)',
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
        marginBottom: '2rem'
      }}>
        Bike Not Found
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-light)',
        marginBottom: '3rem',
        maxWidth: '600px'
      }}>
        Sorry, we couldn&apos;t find the motorcycle you&apos;re looking for. It may have been sold or the link is incorrect.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/#inventory"
          style={{
            padding: '1rem 2rem',
            background: 'var(--orange)',
            color: 'var(--black)',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          VIEW INVENTORY
        </Link>
        <Link
          href="/"
          style={{
            padding: '1rem 2rem',
            background: 'transparent',
            color: 'var(--orange)',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: '2px solid var(--orange)'
          }}
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
}

