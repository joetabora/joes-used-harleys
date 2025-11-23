import config from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';

// Make this route dynamic
export const dynamic = 'force-dynamic';

let cachedPayload: any = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }

  // Check if Payload is configured
  const secret = process.env.PAYLOAD_SECRET;
  const databaseUri = process.env.DATABASE_URI;
  
  if (!secret || !databaseUri) {
    console.error('Payload configuration missing:', {
      hasSecret: !!secret,
      hasDatabaseUri: !!databaseUri,
      envKeys: Object.keys(process.env).filter(k => k.includes('PAYLOAD') || k.includes('DATABASE')).join(', ')
    });
    throw new Error('Payload not configured. Missing PAYLOAD_SECRET or DATABASE_URI');
  }

  try {
    // Import getPayload from payload/dist/payload where it's actually defined
    const payloadModule = await import('payload/dist/payload');
    const getPayload = payloadModule.getPayload;
    
    if (!getPayload || typeof getPayload !== 'function') {
      throw new Error('getPayload not found in payload/dist/payload');
    }
    
    cachedPayload = await getPayload({
      config,
      secret: process.env.PAYLOAD_SECRET || '',
    });
    return cachedPayload;
  } catch (error) {
    console.error('Error initializing Payload:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// Convert NextRequest to Express-compatible format
function createExpressRequest(nextRequest: NextRequest) {
  const url = new URL(nextRequest.url);
  return {
    method: nextRequest.method,
    url: url.pathname + url.search,
    headers: Object.fromEntries(nextRequest.headers.entries()),
    body: null, // Will be handled separately for POST/PUT
    query: Object.fromEntries(url.searchParams.entries()),
    params: {},
  };
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    
    // Check if router is a function
    if (typeof payload.router !== 'function') {
      console.error('Payload router is not a function:', typeof payload.router, Object.keys(payload));
      throw new Error('Payload router is not available');
    }
    
    // Call the router with the request
    const response = await payload.router(request);
    return response;
  } catch (error) {
    console.error('Payload GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/payload', '') || '/';
    const body = await request.json().catch(() => ({}));
    
    // Handle different Payload API endpoints
    // This is a simplified implementation - full router would require Express adapter
    
    return NextResponse.json({ 
      error: 'Endpoint not implemented',
      message: 'Use Payload collection methods directly instead of router',
      path: path
    }, { status: 404 });
    
  } catch (error) {
    console.error('Payload POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle all HTTP methods for Payload
export async function PUT(request: NextRequest) {
  return GET(request);
}

export async function PATCH(request: NextRequest) {
  return GET(request);
}

export async function DELETE(request: NextRequest) {
  return GET(request);
}
