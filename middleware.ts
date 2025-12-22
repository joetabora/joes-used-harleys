import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function isMaintenanceModeEnabled(): boolean {
  // Default to ON so the site is effectively "hidden" until explicitly disabled.
  const raw =
    process.env.MAINTENANCE_MODE ??
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE ??
    'true';

  const normalized = raw.trim().toLowerCase();
  return !['0', 'false', 'off', 'no'].includes(normalized);
}

function isAllowedStaticAsset(pathname: string): boolean {
  // Allow common static assets from /public (images/icons/fonts/media).
  // Intentionally does NOT allow ".xml" / ".txt" broadly (we whitelist robots/sitemap below).
  return /\.(png|jpg|jpeg|webp|gif|svg|ico|bmp|avif|mp4|webm|woff2|woff|ttf|otf|eot)$/i.test(
    pathname
  );
}

export function middleware(request: NextRequest) {
  if (!isMaintenanceModeEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow the maintenance page itself.
  if (pathname.startsWith('/under-construction')) {
    return NextResponse.next();
  }

  // Allow Next.js internals / assets.
  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Allow essential public endpoints / files.
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/sitemap-2025.xml' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next();
  }

  // Allow admin + Payload CMS plumbing so you can keep working while public sees maintenance page.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/payload')) {
    return NextResponse.next();
  }

  // Allow static assets in /public (images, fonts, media).
  if (isAllowedStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/under-construction';
  url.search = '';

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/:path*'],
};

