import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

// Make this route dynamic - don't try to generate it at build time
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Payload is configured
    if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
      console.log('Payload not configured, returning empty bikes array');
      return NextResponse.json({ bikes: [] });
    }

    const payload = await getPayloadClient();
    
    const bikes = await payload.find({
      collection: 'bikes',
      limit: 100,
      sort: '-createdAt',
      depth: 2, // Populate image relation
    });

    // Transform Payload data to match InventoryGrid interface
    const transformedBikes = bikes.docs.map((bike: any) => {
      // Handle image URL - Payload stores images with different structures
      let imageUrl = '';
      if (typeof bike.image === 'string') {
        // If image is just an ID, we need to fetch it
        imageUrl = '';
      } else if (bike.image?.url) {
        imageUrl = bike.image.url;
      } else if (bike.image?.sizes?.large?.url) {
        imageUrl = bike.image.sizes.large.url;
      } else if (bike.image?.filename) {
        // Construct URL from filename
        const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
        imageUrl = `${serverUrl}/media/${bike.image.filename}`;
      }
      
      return {
        id: bike.id,
        name: bike.name,
        image: imageUrl,
        specs: bike.specs || '',
        price: bike.price,
        priceFormatted: bike.priceFormatted,
        financing: bike.financing || '',
        featured: bike.featured || false,
        justArrived: bike.justArrived || false,
      };
    });

    return NextResponse.json({ bikes: transformedBikes });
  } catch (error) {
    console.error('Error fetching bikes:', error);
    // Return empty array on error so frontend doesn't break
    return NextResponse.json({ bikes: [] }, { status: 200 });
  }
}

