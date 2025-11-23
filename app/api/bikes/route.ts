import { NextResponse } from 'next/server';

// Make this route dynamic - don't try to generate it at build time
export const dynamic = 'force-dynamic';

interface AirtableRecord {
  id: string;
  fields: {
    [key: string]: any; // Allow any field names for flexibility
    Name?: string;
    name?: string;
    'A Name'?: string;
    Year?: number;
    year?: number;
    Model?: string;
    model?: string;
    Mileage?: number;
    mileage?: number;
    Price?: number;
    price?: number;
    'Price Formatted'?: string;
    Specs?: string;
    specs?: string;
    Image?: Array<{ url: string; thumbnails?: { large?: { url: string } } }>;
    image?: Array<{ url: string; thumbnails?: { large?: { url: string } } }>;
    Financing?: string;
    financing?: string;
    Featured?: boolean;
    featured?: boolean;
    'Just Arrived'?: boolean;
    justArrived?: boolean;
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

    // Log for debugging
    console.log('Airtable response:', {
      recordCount: records.length,
      firstRecordFields: records[0]?.fields ? Object.keys(records[0].fields) : 'no records',
      firstRecordName: records[0]?.fields?.Name || 'no name field',
    });

    // Transform Airtable data to match InventoryGrid interface
    const transformedBikes = records
      .filter((record) => {
        // Include record if it has any data - we'll build name from Year + Model if needed
        const hasData = Object.keys(record.fields).length > 0;
        return hasData;
      })
      .map((record) => {
        // Get field values (try multiple possible field names)
        const getName = () => {
          return record.fields.Name || 
                 record.fields.name || 
                 record.fields['A Name'] ||
                 record.fields[Object.keys(record.fields).find(key => key.toLowerCase() === 'name') || ''] ||
                 `${record.fields.Year || ''} ${record.fields.Model || record.fields.model || 'Harley-Davidson'}`.trim();
        };
        
        const getField = (possibleNames: string[]) => {
          for (const name of possibleNames) {
            if (record.fields[name as keyof typeof record.fields] !== undefined) {
              return record.fields[name as keyof typeof record.fields];
            }
          }
          // Try case-insensitive match
          const fieldKey = Object.keys(record.fields).find(key => 
            possibleNames.some(n => key.toLowerCase() === n.toLowerCase())
          );
          return fieldKey ? record.fields[fieldKey as keyof typeof record.fields] : undefined;
        };
        
        // Get all fields first (before using them)
        const year = getField(['Year', 'year']) as number;
        const model = getField(['Model', 'model']) as string;
        const mileage = getField(['Mileage', 'mileage']) as number;
        const price = getField(['Price', 'price']) as number;
        const priceFormatted = getField(['Price Formatted', 'Price Formatted', 'priceFormatted']) as string;
        const specs = getField(['Specs', 'specs', 'Specifications', 'specifications']) as string;
        const financing = getField(['Financing', 'financing']) as string;
        const featured = getField(['Featured', 'featured']) as boolean;
        const justArrived = getField(['Just Arrived', 'justArrived', 'Just Arrived']) as boolean;
        
        // Build name from available fields (now that year and model are declared)
        const name = getName() || 
          `${year || ''} ${model ? `Harley-Davidson ${model}` : 'Harley-Davidson'}`.trim() ||
          'Harley-Davidson Motorcycle';
        
        // Get image URL - try multiple field names
        const imageField = getField(['Image', 'image', 'Images', 'images', 'Photo', 'photo', 'Attachment', 'attachment']) as any;
        let imageUrl = '';
        if (imageField) {
          if (Array.isArray(imageField) && imageField.length > 0) {
            const image = imageField[0];
            // Airtable attachment format: { url: string, thumbnails: { large: { url: string } } }
            imageUrl = image.thumbnails?.large?.url || 
                      image.thumbnails?.small?.url || 
                      image.url || 
                      (typeof image === 'string' ? image : '');
          } else if (typeof imageField === 'string') {
            imageUrl = imageField;
          }
        }
        
        // Log for debugging
        if (!imageUrl && imageField) {
          console.log('Image field found but no URL extracted:', {
            imageFieldType: typeof imageField,
            isArray: Array.isArray(imageField),
            imageFieldKeys: imageField && typeof imageField === 'object' ? Object.keys(imageField) : 'not an object',
          });
        }

        // Build specs if not provided
        const finalSpecs = specs || 
          [
            year && `${year}`,
            model && `Harley-Davidson ${model}`,
            mileage && `${mileage.toLocaleString()} miles`,
          ]
            .filter(Boolean)
            .join(' • ') || '';

        // Get price formatted
        const finalPriceFormatted = priceFormatted || 
          (price ? `$${price.toLocaleString()}` : 'Call for price');

        return {
          id: record.id,
          name: name,
          image: imageUrl,
          specs: finalSpecs,
          price: price || 0,
          priceFormatted: finalPriceFormatted,
          financing: financing || '',
          featured: featured || false,
          justArrived: justArrived || false,
        };
      });

    return NextResponse.json({ bikes: transformedBikes });
  } catch (error) {
    console.error('Error fetching bikes from Airtable:', error);
    // Return empty array on error so frontend doesn't break
    return NextResponse.json({ bikes: [] }, { status: 200 });
  }
}
