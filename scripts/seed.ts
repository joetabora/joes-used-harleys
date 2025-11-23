import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  const payload = await getPayload({ 
    config,
    secret: process.env.PAYLOAD_SECRET || '',
  });

  try {
    // Create first user
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'joe@joesusedharleys.com',
        },
      },
    });

    if (existingUser.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'joe@joesusedharleys.com',
          password: 'harley2025',
          name: 'Joe Tabora',
        },
      });
      console.log('✅ Created first user: joe@joesusedharleys.com / harley2025');
    } else {
      console.log('ℹ️  User already exists');
    }

    console.log('✅ Seed completed!');
    console.log('📝 You can now log in at /admin with:');
    console.log('   Email: joe@joesusedharleys.com');
    console.log('   Password: harley2025');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();

