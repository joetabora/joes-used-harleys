/**
 * Sanity Image Component
 * Renders Sanity images with Next.js Image optimization
 */

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

interface SanityImageProps {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
}: SanityImageProps) {
  if (!image) return null;

  // Handle fallback URLs (external images from inventory.json)
  if ((image as any)._fallbackUrl) {
    return (
      <Image
        src={(image as any)._fallbackUrl}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={90}
        className={className}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }

  const imageUrl = urlFor(image)?.width(width).height(height).url();

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      quality={90}
      className={className}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}

