'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  const [useFallback, setUseFallback] = useState(false);

  // Use unoptimized for external images to avoid Next.js optimization issues
  const imageProps: any = {
    src: useFallback ? FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)] : imgSrc,
    alt,
    style,
    className,
    priority,
    unoptimized: true, // Bypass Next.js image optimization for external URLs
    onError: () => {
      if (!hasError) {
        setUseFallback(true);
        setHasError(true);
      }
    }
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes="100vw"
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 800}
      height={height || 600}
      loading={priority ? undefined : 'lazy'}
    />
  );
}

