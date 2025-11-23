// Payload admin is served through /api/[...payload] route
// This route needs to be a server component that proxies to the API
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // The admin panel is actually served from /api/payload/admin
  // But we want /admin to work, so we'll redirect
  redirect('/api/payload/admin');
}

