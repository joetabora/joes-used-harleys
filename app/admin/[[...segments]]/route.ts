// Payload CMS Admin Panel Route
// This route serves the Payload admin UI
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
  const path = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(path, url.origin);
  payloadUrl.search = url.search;
  
  try {
    // Forward request to Payload API
    const response = await fetch(payloadUrl.toString(), {
      method: 'GET',
      headers: Object.fromEntries(request.headers.entries()),
    });
    
    // If it's an HTML response (admin panel), return it
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      const html = await response.text();
      return new NextResponse(html, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
    
    // For JSON responses, return as-is
    return new NextResponse(response.body, {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (error) {
    console.error('Error proxying to Payload:', error);
    return NextResponse.json({
      error: 'Failed to connect to Payload CMS',
      message: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Make sure Payload API route is working at /api/payload'
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
  const path = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(path, url.origin);
  payloadUrl.search = url.search;
  
  const body = await request.text();
  
  try {
    const response = await fetch(payloadUrl.toString(), {
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      body: body,
    });
    
    return new NextResponse(response.body, {
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
