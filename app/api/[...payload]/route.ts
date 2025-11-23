import config from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';

let cachedPayload: any = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Import Payload and use getPayload from the main export
    const payloadModule = await import('payload');
    
    // getPayload should be available as a named export
    const getPayload = payloadModule.getPayload;
    
    if (!getPayload || typeof getPayload !== 'function') {
      // Fallback: try using Payload class directly
      const Payload = payloadModule.Payload || payloadModule.default;
      if (Payload && typeof Payload.prototype?.init === 'function') {
        const instance = new Payload();
        cachedPayload = await instance.init({
          config,
          secret: process.env.PAYLOAD_SECRET || '',
        });
        return cachedPayload;
      }
      throw new Error('getPayload not found. Available: ' + Object.keys(payloadModule).join(', '));
    }
    
    cachedPayload = await getPayload({ 
      config,
      secret: process.env.PAYLOAD_SECRET || '',
    });
    return cachedPayload;
  } catch (error) {
    console.error('Error initializing Payload:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
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
