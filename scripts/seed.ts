import { getPayload } from 'payload/dist/payload';
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

    // Check if bikes already exist
    const existingBikes = await payload.find({
      collection: 'bikes',
      limit: 1,
    });

    if (existingBikes.docs.length === 0) {
      console.log('📦 Adding sample bikes...');
      
      // Sample bikes data (without images for now - you'll need to upload images through admin)
      const sampleBikes = [
        {
          name: '2023 Harley-Davidson Street Glide Special',
          year: 2023,
          model: 'Street Glide Special',
          mileage: 8742,
          price: 26999,
          priceFormatted: '$26,999',
          specs: '2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2',
          financing: 'As low as $399/mo',
          featured: true,
        },
        {
          name: '2022 Harley-Davidson Road Glide Limited',
          year: 2022,
          model: 'Road Glide Limited',
          mileage: 12345,
          price: 28999,
          priceFormatted: '$28,999',
          specs: '2022 Harley-Davidson Road Glide Limited • 12,345 miles • Midnight Crimson',
          financing: 'As low as $429/mo',
          featured: true,
        },
        {
          name: '2021 Harley-Davidson Fat Boy 114',
          year: 2021,
          model: 'Fat Boy 114',
          mileage: 3210,
          price: 21999,
          priceFormatted: '$21,999',
          specs: '2021 Harley-Davidson Fat Boy 114 • 3,210 miles • Blacked Out',
          financing: 'As low as $329/mo',
          featured: false,
        },
        {
          name: '2023 Harley-Davidson Heritage Classic',
          year: 2023,
          model: 'Heritage Classic',
          mileage: 4567,
          price: 23999,
          priceFormatted: '$23,999',
          specs: '2023 Harley-Davidson Heritage Classic • 4,567 miles • Billiard Blue',
          financing: 'As low as $359/mo',
          featured: false,
        },
        {
          name: '2022 Harley-Davidson Low Rider S',
          year: 2022,
          model: 'Low Rider S',
          mileage: 6789,
          price: 19999,
          priceFormatted: '$19,999',
          specs: '2022 Harley-Davidson Low Rider S • 6,789 miles • Gunship Gray',
          financing: 'As low as $299/mo',
          featured: false,
        },
        {
          name: '2024 Harley-Davidson Softail Standard',
          year: 2024,
          model: 'Softail Standard',
          mileage: 1234,
          price: 14999,
          priceFormatted: '$14,999',
          specs: '2024 Harley-Davidson Softail Standard • 1,234 miles • Vivid Black',
          financing: 'As low as $229/mo',
          featured: false,
        },
        {
          name: '2021 Harley-Davidson Road King',
          year: 2021,
          model: 'Road King',
          mileage: 9876,
          price: 22999,
          priceFormatted: '$22,999',
          specs: '2021 Harley-Davidson Road King • 9,876 miles • Chrome Everything',
          financing: 'As low as $339/mo',
          featured: false,
        },
        {
          name: '2023 Harley-Davidson Breakout 117',
          year: 2023,
          model: 'Breakout 117',
          mileage: 2345,
          price: 25999,
          priceFormatted: '$25,999',
          specs: '2023 Harley-Davidson Breakout 117 • 2,345 miles • Baja Orange',
          financing: 'As low as $389/mo',
          featured: false,
        },
      ];

      for (const bikeData of sampleBikes) {
        await payload.create({
          collection: 'bikes',
          data: bikeData,
        });
        console.log(`✅ Created bike: ${bikeData.name}`);
      }
      
      console.log(`✅ Created ${sampleBikes.length} sample bikes`);
      console.log('📝 Note: You\'ll need to upload images for each bike through the admin panel');
    } else {
      console.log('ℹ️  Bikes already exist in database');
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

