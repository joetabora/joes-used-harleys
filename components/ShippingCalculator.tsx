'use client';

import { useState } from 'react';

export function ShippingCalculator() {
  const [zipCode, setZipCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      setShowResult(true);
    }
  };

  return (
    <div style={{
      background: '#000000',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      borderBottom: '1px solid #2A2A2A'
    }}>
      <form onSubmit={calculateShipping} style={{
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
          style={{
            padding: '0.75rem 1rem',
            background: '#0A0A0A',
            border: '2px solid #2A2A2A',
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '0',
            flex: '1',
            minWidth: '200px',
            fontFamily: 'var(--font-inter)',
            transition: 'border-color 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#FF6600';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2A2A2A';
          }}
          maxLength={5}
          pattern="[0-9]{5}"
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            background: '#FF6600',
            color: '#000000',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderRadius: '0',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: 'var(--font-clash)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FF8833';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF6600';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Calculate Shipping
        </button>
      </form>
      {showResult && (
        <p style={{
          marginTop: '1.5rem',
          color: '#FF6600',
          fontSize: '1.1rem',
          fontWeight: 700,
          fontFamily: 'var(--font-clash)'
        }}>
          $499 flat rate nationwide — ships in 3–7 days
        </p>
      )}
    </div>
  );
}

