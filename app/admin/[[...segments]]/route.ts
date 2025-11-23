// This route handles all admin requests and proxies them to Payload
import payload from 'payload';
import config from '@payload-config';
import { NextRequest } from 'next/server';

let cachedPayload: any = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Initialize Payload if not already initialized
    if (!payload.initialized) {
      await payload.init({
        config,
        secret: process.env.PAYLOAD_SECRET || '',
      });
    }
    cachedPayload = payload;
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
    console.error('Payload admin GET error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to load admin panel',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance();
    return payload.router(request);
  } catch (error) {
    console.error('Payload admin POST error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

