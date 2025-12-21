'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';

export default function CancelPage() {
  const router = useRouter();

  return (
    <>
      <Navigation />
      
      <section style={{
        padding: '12rem 2rem 6rem',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(234, 88, 12, 0.3)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 20px 60px rgba(234, 88, 12, 0.2)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            ⚠️
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '1rem',
            fontFamily: 'var(--font-clash)',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Payment Cancelled
          </h1>
          
          <p style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Your payment was cancelled. No charges were made to your account.
            Your items are still in your cart if you'd like to try again.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => router.push('/shop')}
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-clash)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(234, 88, 12, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.4)';
              }}
            >
              Return to Shop
            </button>
            
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-clash)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(234, 88, 12, 0.1)';
                e.currentTarget.style.borderColor = '#ea580c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      </section>
      
      <FloatingActionButtons />
    </>
  );
}
