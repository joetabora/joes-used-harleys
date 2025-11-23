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
    // Import getPayload from payload/dist/payload
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

// Handle all HTTP methods
async function handleRequest(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/payload', '') || '/';
    
    // Payload's router is an Express Router, not compatible with Next.js App Router
    // We need to handle requests differently
    // For now, return a helpful message that Payload is running
    // The admin panel should be accessible through /admin route
    
    return NextResponse.json({
      message: 'Payload CMS API is running',
      path: path,
      method: request.method,
      note: 'Use /admin for admin panel, or use Payload collection methods directly'
    });
  } catch (error) {
    console.error('Payload request error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PUT(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}
