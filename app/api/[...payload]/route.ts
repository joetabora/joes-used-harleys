import config from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';

let cachedPayload: any = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Use dynamic import and check for getPayload in different export paths
    const payloadModule = await import('payload');
    
    // Try different ways to get getPayload
    let getPayload = payloadModule.getPayload;
    if (!getPayload && payloadModule.default?.getPayload) {
      getPayload = payloadModule.default.getPayload;
    }
    if (!getPayload) {
      // Try importing from payload/payload subpath
      const payloadSub = await import('payload/payload');
      getPayload = payloadSub.getPayload;
    }
    
    if (!getPayload) {
      throw new Error('getPayload function not found in payload module');
    }
    
    cachedPayload = await getPayload({ 
      config,
      secret: process.env.PAYLOAD_SECRET || '',
    });
    return cachedPayload;
  } catch (error) {
    console.error('Error initializing Payload:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    return payload.router(request);
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
    return payload.router(request);
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
