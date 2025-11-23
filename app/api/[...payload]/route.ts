import { getPayload } from 'payload';
import config from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';

let cachedPayload: any = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayload({ 
    config,
    secret: process.env.PAYLOAD_SECRET || '',
  });
  return cachedPayload;
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    return payload.router(request);
  } catch (error) {
    console.error('Payload GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    return payload.router(request);
  } catch (error) {
    console.error('Payload POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
