/**
 * Motorcycles API Route
 * Fetches motorcycles from Sanity CMS with fallback
 */

import { NextResponse } from 'next/server';
import { fetchAllMotorcycles } from '@/sanity/lib/queries';
import { isSanityConfigured } from '@/sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Try to fetch from Sanity if configured
    if (isSanityConfigured()) {
      const bikes = await fetchAllMotorcycles();
      if (bikes.length > 0) {
        return NextResponse.json({ bikes, source: 'sanity' });
      }
    }

    // Fallback to inventory.json (client-side fetch)
    try {
      // Try to fetch from public folder
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/inventory.json`);
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ bikes: data.bikes || [], source: 'fallback' });
      }
      return NextResponse.json({ bikes: [], source: 'none' });
    } catch (error) {
      console.error('Error reading fallback inventory:', error);
      return NextResponse.json({ bikes: [], source: 'none' });
    }
  } catch (error) {
    console.error('Error fetching motorcycles:', error);
    return NextResponse.json({ bikes: [], source: 'error' }, { status: 500 });
  }
}

