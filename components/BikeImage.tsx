'use client';

import Image from 'next/image';
import { useState } from 'react';

// Fallback image URLs that are known to work
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

interface BikeImageProps {
  src: string;
  alt: string;
  index: number;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  itemProp?: string;
}

export function BikeImage({ 
  src, 
  alt, 
  index, 
  width = 800, 
  height = 600, 
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quality = 85,
  itemProp
}: BikeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    // Fallback to working image if original fails
    const fallbackIndex = index % FALLBACK_IMAGES.length;
    setImgSrc(FALLBACK_IMAGES[fallbackIndex]);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      sizes={sizes}
      quality={quality}
      itemProp={itemProp}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block'
      }}
      onError={handleError}
    />
  );
}

