'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'BLOG', href: '/blog' },
    { label: 'EVENTS', href: '/events' },
    { label: 'MERCH', href: '/merch' },
    { label: 'CONTACT', href: '/contact' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link:hover {
          color: #ea580c;
        }
        
        @media (max-width: 768px) {
          .mobile-menu {
            backdrop-filter: blur(20px);
          }
        }
      `}} />

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(10, 10, 10, 0.95)' 
          : 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(234, 88, 12, 0.2)' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', zIndex: 1001 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              {/* Premium Badge Icon */}
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#ffffff',
                boxShadow: '0 5px 20px rgba(234, 88, 12, 0.4)',
                fontFamily: 'var(--font-clash)'
              }}>
                J
              </div>
              
              {/* Brand Text */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.1rem'
              }}>
                <span style={{
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  fontFamily: 'var(--font-clash)',
                  lineHeight: '1'
                }}>
                  JOE'S
                </span>
                <span style={{
                  background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  fontFamily: 'var(--font-clash)',
                  lineHeight: '1'
                }}>
                  USED HARLEYS
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: '#e5e7eb',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  fontFamily: 'var(--font-clash)',
                  padding: '0.5rem 0'
                }}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA Button */}
            <a
              href="sms:4144396211?body=Hey Joe!"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '0.75rem 1.75rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '50px',
                boxShadow: '0 5px 20px rgba(234, 88, 12, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(234, 88, 12, 0.3)';
              }}
            >
              💬 TEXT JOE
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '1.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            className="mobile-menu-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ea580c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 10, 0.98)',
            borderBottom: '1px solid rgba(234, 88, 12, 0.2)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  color: '#e5e7eb',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  fontFamily: 'var(--font-clash)',
                  padding: '1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(234, 88, 12, 0.1)';
                  e.currentTarget.style.borderColor = '#ea580c';
                  e.currentTarget.style.paddingLeft = '1.5rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="sms:4144396211?body=Hey Joe!"
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-clash)',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)'
              }}
            >
              💬 TEXT JOE NOW
            </a>
          </div>
        )}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}} />
    </>
  );
}
