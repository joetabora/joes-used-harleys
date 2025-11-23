import config from '@payload-config';

let cachedPayload: any = null;

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Import Payload module
    const payloadModule = await import('payload');
    const getPayload = payloadModule.getPayload;
    
    if (!getPayload || typeof getPayload !== 'function') {
      throw new Error('getPayload is not a function. Available exports: ' + Object.keys(payloadModule).join(', '));
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
