'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Payload admin is served through the API route
// This page redirects to the Payload admin endpoint
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Payload admin API endpoint
    const adminUrl = `${window.location.origin}/api/payload/admin`;
    window.location.href = adminUrl;
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#000',
      color: '#fff'
    }}>
      <p>Loading admin panel...</p>
    </div>
  );
}

