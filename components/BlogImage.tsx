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

