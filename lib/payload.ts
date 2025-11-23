import config from '@payload-config';

let cachedPayload: any = null;

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  // Check if Payload is configured
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
    throw new Error('Payload not configured. Missing PAYLOAD_SECRET or DATABASE_URI');
  }

  try {
    // Import getPayload from payload/dist/payload where it's actually defined
    const payloadModule = await import('payload/dist/payload');
    const getPayload = payloadModule.getPayload;
    
    if (!getPayload || typeof getPayload !== 'function') {
      throw new Error('getPayload not found in payload/dist/payload');
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
