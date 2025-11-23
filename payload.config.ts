import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { Bikes } from './collections/Bikes';
import { Media } from './collections/Media';
import { Users } from './collections/Users';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Bikes, Media],
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ],
  // Disable pretty logging in production (fixes pino-pretty error)
  logger: process.env.NODE_ENV === 'production' 
    ? {
        level: 'warn', // Only log warnings and errors in production
      }
    : undefined, // Use default pretty logging in development
});

