import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface AirtableRecord {
  id: string;
  fields: {
    [key: string]: any;
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bikeId } = await params;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Table 1';
    const tableIdentifier = tableId || tableName;

    if (!baseId || !apiKey) {
      return NextResponse.json(
        { error: 'Airtable not configured' },
        { status: 500 }
      );
    }

    // Fetch single record from Airtable by ID
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdentifier)}/${bikeId}`;
    
    console.log('Fetching bike from Airtable:', {
      bikeId: bikeId,
      baseId: baseId,
      tableIdentifier: tableIdentifier,
      url: url.replace(apiKey, 'HIDDEN'),
    });
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        bikeId: bikeId,
      });
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Bike not found', bikeId: bikeId },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `Airtable API error: ${response.statusText}`, details: errorText, bikeId: bikeId },
        { status: response.status }
      );
    }

    const record: AirtableRecord = await response.json();

    // Transform to match our Bike interface
    const getField = (possibleNames: string[]) => {
      for (const name of possibleNames) {
        if (record.fields[name as keyof typeof record.fields] !== undefined) {
          return record.fields[name as keyof typeof record.fields];
        }
      }
      const fieldKey = Object.keys(record.fields).find(key => 
        possibleNames.some(n => key.toLowerCase() === n.toLowerCase())
      );
      return fieldKey ? record.fields[fieldKey as keyof typeof record.fields] : undefined;
    };

    const year = getField(['Year', 'year']) as number;
    const model = getField(['Model', 'model']) as string;
    const mileage = getField(['Mileage', 'mileage']) as number;
    const price = getField(['Price', 'price']) as number;
    const priceFormatted = getField(['Price Formatted', 'priceFormatted']) as string;
    const specs = getField(['Specs', 'specs']) as string;
    const financing = getField(['Financing', 'financing']) as string;
    const featured = getField(['Featured', 'featured']) as boolean;
    const justArrived = getField(['Just Arrived', 'justArrived']) as boolean;

    const name = record.fields.Name || 
      `${year || ''} ${model ? `Harley-Davidson ${model}` : 'Harley-Davidson'}`.trim() ||
      'Harley-Davidson Motorcycle';

    // Get image URL
    const imageField = getField(['Image', 'image']) as any;
    let imageUrl = '';
    if (imageField && Array.isArray(imageField) && imageField.length > 0) {
      const image = imageField[0];
      imageUrl = image.thumbnails?.large?.url || 
                image.thumbnails?.small?.url || 
                image.url || '';
    }

    const finalSpecs = specs || 
      [
        year && `${year}`,
        model && `Harley-Davidson ${model}`,
        mileage && `${mileage.toLocaleString()} miles`,
      ]
        .filter(Boolean)
        .join(' • ') || '';

    const finalPriceFormatted = priceFormatted || 
      (price ? `$${price.toLocaleString()}` : 'Call for price');

    const bike = {
      id: record.id,
      name: name,
      image: imageUrl,
      specs: finalSpecs,
      price: price || 0,
      priceFormatted: finalPriceFormatted,
      financing: financing || '',
      featured: featured || false,
      justArrived: justArrived || false,
      year: year,
      model: model,
      mileage: mileage,
    };

    return NextResponse.json({ bike });
  } catch (error) {
    console.error('Error fetching bike from Airtable:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

