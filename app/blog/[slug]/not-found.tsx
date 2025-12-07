import Link from 'next/link';

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
        Blog Post Not Found
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: '#CCCCCC',
        marginBottom: '2rem',
        maxWidth: '600px'
      }}>
        Sorry, we couldn&apos;t find that blog post. Check out our other posts or browse our inventory.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/blog"
          style={{
            padding: '1rem 2rem',
            background: '#FF6600',
            color: '#000000',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderRadius: '0',
            transition: 'all 0.3s'
          }}
        >
          View All Posts
        </Link>
        <Link
          href="/inventory"
          style={{
            padding: '1rem 2rem',
            background: '#000000',
            color: '#FF6600',
            textDecoration: 'none',
            border: '2px solid #2A2A2A',
            fontWeight: 800,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderRadius: '0',
            transition: 'all 0.3s'
          }}
        >
          View Inventory
        </Link>
      </div>
    </div>
  );
}

