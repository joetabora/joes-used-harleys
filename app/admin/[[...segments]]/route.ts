// Proxy admin requests to Payload API route
// Payload admin is served through /api/[...payload]
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check if Payload is configured
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
    return NextResponse.json({
      error: 'Payload CMS not configured',
      message: 'Please set PAYLOAD_SECRET and DATABASE_URI environment variables in Vercel',
      instructions: 'Go to Vercel Dashboard → Settings → Environment Variables and add: PAYLOAD_SECRET, DATABASE_URI, PAYLOAD_PUBLIC_SERVER_URL'
    }, { status: 503 });
  }

  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(apiPath, url.origin);
  payloadUrl.search = url.search;
  
  try {
    // Forward request to Payload API
    const response = await fetch(payloadUrl.toString(), {
      method: 'GET',
      headers: Object.fromEntries(request.headers.entries()),
    });
    
    return new Response(response.body, {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (error) {
    console.error('Error proxying to Payload:', error);
    return NextResponse.json({
      error: 'Failed to connect to Payload CMS',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check if Payload is configured
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
    return NextResponse.json({
      error: 'Payload CMS not configured',
      message: 'Please set PAYLOAD_SECRET and DATABASE_URI environment variables in Vercel'
    }, { status: 503 });
  }

  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(apiPath, url.origin);
  payloadUrl.search = url.search;
  
  const body = await request.text();
  
  try {
    const response = await fetch(payloadUrl.toString(), {
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      body: body,
    });
    
    return new Response(response.body, {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (error) {
    console.error('Error proxying to Payload:', error);
    return NextResponse.json({
      error: 'Failed to connect to Payload CMS',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
