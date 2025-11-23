import config from '@payload-config';

let cachedPayload: any = null;

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Import getPayload from payload/payload subpath
    const { getPayload } = await import('payload/payload');
    
    if (!getPayload || typeof getPayload !== 'function') {
      throw new Error('getPayload is not a function');
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
