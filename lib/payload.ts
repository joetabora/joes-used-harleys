import config from '@payload-config';

let cachedPayload: any = null;

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Dynamic import to avoid module resolution issues
    const { getPayload } = await import('payload');
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
