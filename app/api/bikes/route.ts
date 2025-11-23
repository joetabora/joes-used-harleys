import { NextResponse } from 'next/server';

// Make this route dynamic - don't try to generate it at build time
export const dynamic = 'force-dynamic';

interface AirtableRecord {
  id: string;
  fields: {
    Name?: string;
    Year?: number;
    Model?: string;
    Mileage?: number;
    Price?: number;
    'Price Formatted'?: string;
    Specs?: string;
    Image?: Array<{ url: string; thumbnails?: { large?: { url: string } } }>;
    Financing?: string;
    Featured?: boolean;
    'Just Arrived'?: boolean;
  };
}

export async function GET() {
  try {
    // Check if Airtable is configured
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    // Try table ID first, then table name
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Table 1';
    const tableIdentifier = tableId || tableName;

    if (!baseId || !apiKey) {
      console.log('Airtable not configured, returning empty bikes array');
      return NextResponse.json({ bikes: [] });
    }

    // Fetch from Airtable - use table ID if available, otherwise table name
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdentifier)}?maxRecords=100`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        baseId: baseId,
        tableIdentifier: tableIdentifier,
        hasApiKey: !!apiKey,
      });
      // Return error details in response for debugging
      return NextResponse.json({ 
        bikes: [],
        error: `Airtable API error: ${response.status} ${response.statusText}`,
        details: errorText,
        debug: {
          baseId: baseId,
          tableIdentifier: tableIdentifier,
        }
      }, { status: response.status });
    }

    const data = await response.json();
    const records: AirtableRecord[] = data.records || [];

    // Transform Airtable data to match InventoryGrid interface
    const transformedBikes = records
      .filter((record) => record.fields.Name) // Only include records with a name
      .map((record) => {
        // Get image URL - use first image if available
        let imageUrl = '';
        if (record.fields.Image && record.fields.Image.length > 0) {
          const image = record.fields.Image[0];
          // Try large thumbnail first, then full URL
          imageUrl = image.thumbnails?.large?.url || image.url || '';
        }

        // Build name if not provided
        const name = record.fields.Name || 
          `${record.fields.Year || ''} ${record.fields.Model || 'Harley-Davidson'}`.trim();

        // Build specs if not provided
        const specs = record.fields.Specs || 
          [
            record.fields.Year && `${record.fields.Year}`,
            record.fields.Model && `Harley-Davidson ${record.fields.Model}`,
            record.fields.Mileage && `${record.fields.Mileage.toLocaleString()} miles`,
          ]
            .filter(Boolean)
            .join(' • ') || '';

        // Get price formatted
        const priceFormatted = record.fields['Price Formatted'] || 
          (record.fields.Price ? `$${record.fields.Price.toLocaleString()}` : 'Call for price');

        return {
          id: record.id,
          name: name,
          image: imageUrl,
          specs: specs,
          price: record.fields.Price || 0,
          priceFormatted: priceFormatted,
          financing: record.fields.Financing || '',
          featured: record.fields.Featured || false,
          justArrived: record.fields['Just Arrived'] || false,
        };
      });

    return NextResponse.json({ bikes: transformedBikes });
  } catch (error) {
    console.error('Error fetching bikes from Airtable:', error);
    // Return empty array on error so frontend doesn't break
    return NextResponse.json({ bikes: [] }, { status: 200 });
  }
}
