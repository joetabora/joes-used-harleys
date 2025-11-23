// Proxy admin requests to Payload API route
// Payload admin is served through /api/[...payload]
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(apiPath, url.origin);
  payloadUrl.search = url.search;
  
  // Forward request to Payload API
  const response = await fetch(payloadUrl.toString(), {
    method: 'GET',
    headers: Object.fromEntries(request.headers.entries()),
  });
  
  return new Response(response.body, {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  });
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/admin', '/api/payload');
  const payloadUrl = new URL(apiPath, url.origin);
  payloadUrl.search = url.search;
  
  const body = await request.text();
  
  const response = await fetch(payloadUrl.toString(), {
    method: 'POST',
    headers: Object.fromEntries(request.headers.entries()),
    body: body,
  });
  
  return new Response(response.body, {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  });
}
