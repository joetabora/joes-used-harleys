'use client';

import { useState } from 'react';

const FALLBACK_IMAGES = [
  'https://files.catbox.moe/3n8q1r.jpg',
  'https://files.catbox.moe/7p4h2s.jpg',
  'https://files.catbox.moe/9t6u8x.jpg',
  'https://files.catbox.moe/1y3h5j.jpg',
  'https://files.catbox.moe/2p9m1k.jpg',
  'https://files.catbox.moe/4q7w3e.jpg',
  'https://files.catbox.moe/6r5t7u.jpg',
  'https://files.catbox.moe/8v7x1z.jpg'
];

interface BlogImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  className?: string;
}

export function BlogImageWithFallback({ 
  src, 
  alt, 
  fill = false,
  width,
  height,
  style,
  priority = false,
  className
}: BlogImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      const fallbackIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
      setImgSrc(FALLBACK_IMAGES[fallbackIndex]);
      setHasError(true);
    }
  };

  // Use regular img tag for better compatibility with external URLs
  const imgStyle: React.CSSProperties = fill 
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style
      }
    : {
        width: width || '100%',
        height: height || 'auto',
        ...style
      };

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={imgStyle}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onError={handleError}
    />
  );
}

