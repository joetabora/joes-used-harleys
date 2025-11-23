import payload from 'payload';
import config from '@payload-config';

let cachedPayload: any = null;

export async function getPayloadClient() {
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
