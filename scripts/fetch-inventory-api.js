/**
 * Alternative: Fetch inventory from House of Harley API endpoint
 * 
 * This uses the same API endpoint that your site might already be using.
 * More reliable than scraping HTML since it's a data endpoint.
 * 
 * Usage: node scripts/fetch-inventory-api.js
 */

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_FILE = path.join(__dirname, '..', 'house_of_harley_inventory.csv');
const HEADERS = ['Name', 'Year', 'Model', 'Mileage', 'Price', 'Specs', 'Financing'];

// CSV Writer setup
const csvWriter = createCsvWriter({
  path: OUTPUT_FILE,
  header: HEADERS.map(header => ({ id: header.toLowerCase(), title: header })),
});

/**
 * Try different API endpoints that might work
 */
const API_ENDPOINTS = [
  'https://houseofharleydavidson.com/api/inventory/v2/inventories/motorcycle/used?perPage=200',
  'https://www.houseofharleydavidson.com/api/inventory/v2/inventories/motorcycle/used?perPage=200',
  'https://inventory.harley-davidson.com/api/nearby-inventory/dealers/WI022/used?count=200',
  'https://houseofharleydavidson.com/inventory/v1/search/used/motorcycles?per_page=200&page=1',
];

/**
 * Clean and parse price string to number
 */
function parsePrice(priceText) {
  if (!priceText) return null;
  const cleaned = priceText.toString().replace(/[$,\s]/g, '');
  const number = parseInt(cleaned, 10);
  return isNaN(number) ? null : number;
}

/**
 * Extract year from name/title string
 */
function extractYear(name) {
  if (!name) return null;
  const yearMatch = name.toString().match(/\b(20\d{2})\b/);
  return yearMatch ? parseInt(yearMatch[1], 10) : null;
}

/**
 * Extract model from name/title string
 */
function extractModel(name) {
  if (!name) return null;
  
  const models = [
    'Street Glide', 'Road Glide', 'Road King', 'Heritage Classic',
    'Fat Boy', 'Low Rider', 'Softail', 'Sportster', 'Dyna',
    'Fat Bob', 'Breakout', 'Ultra Limited', 'Electra Glide',
    'Street Bob', 'Iron 883', 'Forty-Eight', 'Super Low'
  ];
  
  for (const model of models) {
    if (name.includes(model)) {
      return model;
    }
  }
  
  return null;
}

/**
 * Clean mileage string and convert to number
 */
function parseMileage(mileageText) {
  if (!mileageText) return null;
  const cleaned = mileageText.toString().replace(/[,miles\s]/gi, '');
  const number = parseInt(cleaned, 10);
  return isNaN(number) ? null : number;
}

/**
 * Transform API data to Airtable format
 */
function transformBike(bike) {
  // Handle different API response formats
  const name = bike.name || 
               bike.title || 
               `${bike.year || ''} ${bike.make || 'Harley-Davidson'} ${bike.model || bike.model_name || ''}`.trim() ||
               'Harley-Davidson Motorcycle';
  
  const year = bike.year || bike.modelYear || extractYear(name);
  const model = bike.model || bike.model_name || extractModel(name);
  const mileage = bike.mileage ? parseMileage(bike.mileage) : null;
  const price = bike.price || bike.sale_price || parsePrice(bike.priceFormatted);
  
  // Build specs
  const specsParts = [];
  if (year) specsParts.push(`${year}`);
  if (model) specsParts.push(`Harley-Davidson ${model}`);
  if (mileage) specsParts.push(`${mileage.toLocaleString()} miles`);
  if (bike.exteriorColor || bike.color) specsParts.push(bike.exteriorColor || bike.color);
  const specs = specsParts.join(' • ') || '';
  
  // Format financing if available
  let financing = null;
  if (bike.financing) {
    financing = bike.financing;
  } else if (bike.payment || bike.monthlyPayment) {
    const payment = bike.payment || bike.monthlyPayment;
    financing = `As low as $${parsePrice(payment)}/ Month`;
  }
  
  return {
    name: name,
    year: year,
    model: model,
    mileage: mileage,
    price: price,
    specs: specs,
    financing: financing
  };
}

/**
 * Fetch inventory from API endpoint
 */
async function fetchInventory() {
  console.log('🚀 Starting House of Harley-Davidson inventory fetch via API...\n');
  
  let listings = [];
  
  for (const endpoint of API_ENDPOINTS) {
    try {
      console.log(`📍 Trying endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.log(`❌ Endpoint returned ${response.status}: ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`✅ Got response from API`);
      
      // Handle different response formats
      let bikes = [];
      if (data.items) {
        bikes = data.items;
      } else if (data.data) {
        bikes = data.data;
      } else if (data.inventory) {
        bikes = data.inventory;
      } else if (data.results) {
        bikes = data.results;
      } else if (Array.isArray(data)) {
        bikes = data;
      }
      
      if (bikes.length > 0) {
        console.log(`📊 Found ${bikes.length} bikes in response\n`);
        
        // Transform each bike
        for (const bike of bikes) {
          const transformed = transformBike(bike);
          if (transformed.name && transformed.name !== 'Harley-Davidson Motorcycle') {
            listings.push(transformed);
          }
        }
        
        console.log(`✅ Successfully processed ${listings.length} bikes from this endpoint\n`);
        break; // Success, stop trying other endpoints
      } else {
        console.log(`⚠️  No bikes found in response`);
      }
      
    } catch (error) {
      console.log(`❌ Error with endpoint: ${error.message}`);
      continue;
    }
  }
  
  // Write to CSV
  if (listings.length > 0) {
    console.log(`💾 Writing ${listings.length} listings to CSV...`);
    await csvWriter.writeRecords(listings);
    console.log(`✅ CSV saved to: ${OUTPUT_FILE}`);
    
    console.log('\n' + '='.repeat(50));
    console.log('SCRAPE + CSV COMPLETE');
    console.log(`Total listings: ${listings.length}`);
    console.log(`Output file: ${OUTPUT_FILE}`);
    console.log('='.repeat(50));
  } else {
    console.error('\n❌ No listings were successfully fetched from any endpoint.');
    console.log('\n💡 Alternative options:');
    console.log('1. Try the Puppeteer scraper (may need to run with headless: false)');
    console.log('2. Export manually from Dealer.com admin panel');
    console.log('3. Contact House of Harley for API access or CSV export');
    process.exit(1);
  }
}

// Run the fetcher
if (require.main === module) {
  fetchInventory().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { fetchInventory };

