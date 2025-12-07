'use client';

import { useState } from 'react';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558980664-1db506751c6e?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558980664-1db506751c6e?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558980664-1db506751c6e?w=1200&h=800&fit=crop&q=80'
];

interface BlogImageProps {
  src: string;
  alt: string;
  index?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function BlogImage({ src, alt, index = 0, style, className }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      const fallbackIndex = index % FALLBACK_IMAGES.length;
      setImgSrc(FALLBACK_IMAGES[fallbackIndex]);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}

