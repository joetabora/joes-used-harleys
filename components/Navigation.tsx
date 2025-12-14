'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/blog', label: 'BLOG' },
    { href: '/events', label: 'EVENTS' },
    { href: '/merch', label: 'MERCH' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Top Banner Info */}
      <div style={{
        background: 'linear-gradient(90deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        borderBottom: '2px solid #FF6600',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <p style={{
          color: '#FF6600',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          fontWeight: 800,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: 0,
          fontFamily: 'var(--font-clash)'
        }}>
          ⚡ $499 NATIONWIDE SHIPPING ⚡ BAD CREDIT OK ⚡ TEXT JOE: 414-439-6211
        </p>
      </div>

      {/* Main Navigation */}
      <nav style={{
        background: isScrolled ? 'rgba(0, 0, 0, 0.98)' : '#000000',
        borderBottom: isScrolled ? '2px solid #FF6600' : 'none',
        position: 'sticky',
        top: '42px',
        zIndex: 999,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: isScrolled ? '0 8px 30px rgba(255, 102, 0, 0.2)' : 'none'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo Text */}
          <Link href="/" style={{ textDecoration: 'none', zIndex: 1001 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.3s ease',
              padding: '0.5rem',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF6600 0%, #E55A00 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #000000',
                boxShadow: '0 0 30px rgba(255, 102, 0, 0.6), inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative corner accent */}
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '20px',
                  height: '20px',
                  background: '#000000',
                  borderRadius: '0 0 0 12px',
                  borderLeft: '2px solid #FF6600',
                  borderBottom: '2px solid #FF6600'
                }}></div>
                <span style={{
                  color: '#000000',
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-clash)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-1px'
                }}>J</span>
              </div>
              <div>
                <div style={{
                  color: '#FFFFFF',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  letterSpacing: '3px',
                  fontFamily: 'var(--font-clash)',
                  lineHeight: '1.1',
                  textShadow: '0 2px 10px rgba(255, 102, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.8)',
                  marginBottom: '2px'
                }}>
                  JOE'S
                </div>
                <div style={{
                  color: '#FF6600',
                  fontSize: '1rem',
                  fontWeight: 800,
                  letterSpacing: '5px',
                  fontFamily: 'var(--font-clash)',
                  textTransform: 'uppercase',
                  textShadow: '0 0 15px rgba(255, 102, 0, 0.5)',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.7rem',
                    color: '#FF6600',
                    opacity: 0.6
                  }}>⚡</span>
                  USED HARLEYS
                  <span style={{
                    position: 'absolute',
                    right: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.7rem',
                    color: '#FF6600',
                    opacity: 0.6
                  }}>⚡</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'none',
            alignItems: 'center',
            gap: '3rem'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive(link.href) ? '#FF6600' : '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-clash)',
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'all 0.3s ease',
                  borderBottom: isActive(link.href) ? '2px solid #FF6600' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = '#FF6600';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
              >
                {link.label}
              </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 1001
          }}
          aria-label="Toggle menu"
        >
            <span style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? '#FF6600' : '#FFFFFF',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></span>
            <span style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? 'transparent' : '#FFFFFF',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? '#FF6600' : '#FFFFFF',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" style={{
          display: isMobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          background: '#000000',
          borderTop: '2px solid #FF6600',
          padding: '2rem',
          gap: '1.5rem',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: isActive(link.href) ? '#FF6600' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-clash)',
                padding: '1rem',
                borderLeft: isActive(link.href) ? '4px solid #FF6600' : '4px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.borderLeftColor = '#FF6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                if (!isActive(link.href)) {
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Full-Width Banner Image - Below Navigation */}
      <div style={{
        width: '100%',
        position: 'relative',
        background: '#000000'
      }}>
        <Image
          src="/banner.jpg"
          alt="Joe's Used Harleys"
          width={1920}
          height={300}
          priority
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Global styles for navigation - using regular style tag to avoid styled-jsx nesting */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}

