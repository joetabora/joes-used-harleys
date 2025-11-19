import Link from 'next/link';

export default function ModelNotFound() {
  return (
    <div style={{ 
      padding: '4rem 1.5rem', 
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      color: 'var(--text)'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 5vw, 3rem)', 
        color: 'var(--orange)', 
        marginBottom: '1rem' 
      }}>
        Model Not Found
      </h1>
      <p style={{ 
        fontSize: '1.1rem', 
        color: 'var(--text-light)', 
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        The Harley model you&apos;re looking for doesn&apos;t exist in our inventory.
      </p>
      <Link 
        href="/#inventory" 
        style={{ 
          color: 'var(--orange)', 
          textDecoration: 'none',
          padding: '1rem 2rem',
          border: '2px solid var(--orange)',
          borderRadius: '4px',
          display: 'inline-block',
          fontWeight: 600
        }}
      >
        View All Models
      </Link>
    </div>
  );
}

