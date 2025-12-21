'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('session_id');
    setSessionId(id);
    
    // Clear cart from localStorage
    localStorage.removeItem('juh-shop-cart');
  }, [searchParams]);

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
            ✅
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
            Payment Successful!
          </h1>
          
          <p style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Thank you for your order! Your payment has been processed successfully.
            {sessionId && (
              <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                Order ID: {sessionId.substring(0, 20)}...
              </span>
            )}
          </p>
          
          <p style={{
            color: '#d1d5db',
            fontSize: '1rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(234, 88, 12, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(234, 88, 12, 0.2)'
          }}>
            📦 <strong>What's Next?</strong><br />
            You'll receive an order confirmation email shortly. Joe will process your order and ship it out as soon as possible. 
            For questions, text Joe at <strong style={{ color: '#ea580c' }}>414-439-6211</strong>.
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
              Continue Shopping
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
