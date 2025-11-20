'use client';

import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  'aria-label'?: string;
}

export function CTAButton({ href, children, variant = 'primary', className = '', 'aria-label': ariaLabel }: CTAButtonProps) {
  const baseStyles = {
    padding: '1.2rem 2.5rem',
    textDecoration: 'none',
    fontWeight: 800,
    fontSize: '1.1rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    transition: 'all 0.3s',
    display: 'inline-block',
  };

  const primaryStyles = {
    ...baseStyles,
    background: 'var(--orange)',
    color: 'var(--black)',
    boxShadow: '0 8px 30px rgba(255, 102, 0, 0.5)',
  };

  const secondaryStyles = {
    ...baseStyles,
    background: 'transparent',
    color: 'var(--orange)',
    border: '2px solid var(--orange)',
  };

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <Link
      href={href}
      style={styles}
      className={`cta-button cta-button-${variant} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

