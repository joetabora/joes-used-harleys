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

// GET - Fetch bikes from Airtable
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

// POST - Create a new bike in Airtable
export async function POST(request: Request) {
  try {
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

    const body = await request.json();
    
    // Map form data to Airtable field names
    // Try to match common field name variations
    const fields: any = {};
    
    // Name field - try multiple variations
    if (body.name) {
      fields.Name = body.name;
      fields.name = body.name;
      fields['A Name'] = body.name;
    }
    
    // Year
    if (body.year) {
      fields.Year = parseInt(body.year);
      fields.year = parseInt(body.year);
    }
    
    // Model
    if (body.model) {
      fields.Model = body.model;
      fields.model = body.model;
    }
    
    // Mileage
    if (body.mileage) {
      fields.Mileage = parseInt(body.mileage);
      fields.mileage = parseInt(body.mileage);
    }
    
    // Price
    if (body.price) {
      fields.Price = parseInt(body.price);
      fields.price = parseInt(body.price);
    }
    
    // Price Formatted
    if (body.priceFormatted) {
      fields['Price Formatted'] = body.priceFormatted;
      fields.priceFormatted = body.priceFormatted;
    } else if (body.price) {
      fields['Price Formatted'] = `$${parseInt(body.price).toLocaleString()}`;
    }
    
    // Specs
    if (body.specs) {
      fields.Specs = body.specs;
      fields.specs = body.specs;
    }
    
    // Financing
    if (body.financing) {
      fields.Financing = body.financing;
      fields.financing = body.financing;
    }
    
    // Featured
    if (body.featured !== undefined) {
      fields.Featured = body.featured;
      fields.featured = body.featured;
    }
    
    // Just Arrived
    if (body.justArrived !== undefined) {
      fields['Just Arrived'] = body.justArrived;
      fields.justArrived = body.justArrived;
    }
    
    // Image attachment - upload to Imgur first (free, no API key needed for basic uploads)
    if (body.image && body.image.base64) {
      try {
        // Upload to Imgur (free image hosting)
        const imgurResponse = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            'Authorization': 'Client-ID 546c25a59c58ad7', // Public Imgur client ID
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: body.image.base64,
            type: 'base64',
          }),
        });

        if (imgurResponse.ok) {
          const imgurData = await imgurResponse.json();
          const imageUrl = imgurData.data?.link;
          
          if (imageUrl) {
            // Airtable attachment format: array of objects with url
            fields.Image = [
              {
                url: imageUrl,
                filename: body.image.filename,
              },
            ];
            fields.image = fields.Image; // Also set lowercase version
          }
        } else {
          console.warn('Imgur upload failed, continuing without image');
        }
      } catch (imgurError) {
        console.warn('Error uploading to Imgur:', imgurError);
        // Continue without image - user can add it manually in Airtable
      }
    }

    // Create record in Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdentifier)}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: fields,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Airtable create error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return NextResponse.json(
        { error: `Failed to create bike: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      id: data.records[0]?.id,
      message: 'Bike added successfully!',
    });
  } catch (error) {
    console.error('Error creating bike in Airtable:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
