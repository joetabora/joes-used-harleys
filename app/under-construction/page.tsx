import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Construction',
  description: "We're working on updates. Please check back soon.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function UnderConstructionPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
        background:
          'radial-gradient(1200px 800px at 20% 20%, rgba(255,102,0,0.25), transparent 55%), radial-gradient(1000px 700px at 80% 30%, rgba(255,255,255,0.08), transparent 60%), linear-gradient(180deg, #0B0B0D 0%, #111114 100%)',
        color: '#fff',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 760,
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(0,0,0,0.35)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
          padding: 28,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 999,
            border: '1px solid rgba(255,102,0,0.35)',
            background: 'rgba(255,102,0,0.12)',
            color: '#ffb07a',
            fontWeight: 700,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            fontSize: 12,
          }}
        >
          Site Update
        </div>

        <h1
          style={{
            marginTop: 16,
            marginBottom: 8,
            fontSize: 44,
            lineHeight: 1.05,
            letterSpacing: -0.6,
          }}
        >
          Under Construction
        </h1>

        <p style={{ marginTop: 0, marginBottom: 18, color: 'rgba(255,255,255,0.78)', fontSize: 18 }}>
          We’re making improvements right now. Please check back soon.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
            marginTop: 18,
          }}
        >
          <a
            href="tel:414-439-6211"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 16px',
              borderRadius: 12,
              background: '#FF6600',
              color: '#0b0b0d',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Call / Text: 414-439-6211
          </a>
        </div>

        <p style={{ marginTop: 18, marginBottom: 0, color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
          Thanks for your patience.
        </p>
      </section>
    </main>
  );
}

