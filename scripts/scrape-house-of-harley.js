/**
 * House of Harley-Davidson Inventory Scraper
 * 
 * Scrapes pre-owned motorcycle inventory from houseofharleydavidson.com
 * and outputs a CSV file matching the Airtable schema.
 * 
 * Usage: node scripts/scrape-house-of-harley.js
 */

const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Configuration
const INVENTORY_URL = 'https://houseofharleydavidson.com/pre-owned-inventory';
const OUTPUT_FILE = path.join(__dirname, '..', 'house_of_harley_inventory.csv');
const HEADERS = ['Name', 'Year', 'Model', 'Mileage', 'Price', 'Specs', 'Financing'];

// CSV Writer setup
const csvWriter = createCsvWriter({
  path: OUTPUT_FILE,
  header: HEADERS.map(header => ({ id: header.toLowerCase(), title: header })),
});

/**
 * Clean and parse price string to number
 */
function parsePrice(priceText) {
  if (!priceText) return null;
  
  // Remove $, commas, and whitespace
  const cleaned = priceText.replace(/[$,\s]/g, '');
  const number = parseInt(cleaned, 10);
  
  return isNaN(number) ? null : number;
}

/**
 * Extract year from name/title string
 */
function extractYear(name) {
  if (!name) return null;
  
  // Look for 4-digit year (2000-2099)
  const yearMatch = name.match(/\b(20\d{2})\b/);
  return yearMatch ? parseInt(yearMatch[1], 10) : null;
}

/**
 * Extract model from name/title string
 */
function extractModel(name) {
  if (!name) return null;
  
  // Common Harley-Davidson models to look for
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
  
  // If no model found, try to extract after year
  const afterYear = name.replace(/\b20\d{2}\b/, '').trim();
  if (afterYear) {
    // Take first few words after year
    const words = afterYear.split(/\s+/).slice(0, 3).join(' ');
    return words || null;
  }
  
  return null;
}

/**
 * Clean mileage string and convert to number
 */
function parseMileage(mileageText) {
  if (!mileageText) return null;
  
  // Remove commas, "miles", "mi", and whitespace
  const cleaned = mileageText.replace(/[,miles\s]/gi, '');
  const number = parseInt(cleaned, 10);
  
  return isNaN(number) ? null : number;
}

/**
 * Scrape a single motorcycle listing
 */
async function scrapeListing(page, listingElement) {
  try {
    // Get the listing link/URL
    const linkElement = await listingElement.$('a');
    if (!linkElement) {
      console.warn('⚠️  No link found for listing');
      return null;
    }
    
    const listingUrl = await page.evaluate(el => el.href, linkElement);
    console.log(`📄 Scraping: ${listingUrl}`);
    
    // Navigate to detail page
    const detailPage = await page.browser().newPage();
    await detailPage.goto(listingUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for content to load
    await detailPage.waitForTimeout(2000);
    
    // Scrape data from detail page
    const data = await detailPage.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : null;
      };
      
      const getAllText = (selector) => {
        const els = Array.from(document.querySelectorAll(selector));
        return els.map(el => el.textContent.trim()).filter(Boolean).join(' • ');
      };
      
      // Try multiple selectors for title/name
      const name = getText('h1') || 
                   getText('.vehicle-title') || 
                   getText('[class*="title"]') ||
                   getText('title');
      
      // Try multiple selectors for price
      const price = getText('.price') || 
                    getText('[class*="price"]') ||
                    getText('[data-price]') ||
                    getText('[itemprop="price"]');
      
      // Try multiple selectors for mileage
      const mileage = getText('.mileage') || 
                      getText('[class*="mileage"]') ||
                      getText('[data-mileage]') ||
                      getAllText('[class*="spec"]').match(/\d+[,.]?\d*\s*miles?/i)?.[0];
      
      // Try to get specs/description
      const specs = getAllText('.specs') || 
                    getAllText('[class*="spec"]') ||
                    getText('.description') ||
                    getText('[class*="description"]') ||
                    getAllText('li');
      
      // Try to get financing info
      const financing = getText('.financing') || 
                        getText('[class*="financing"]') ||
                        getText('[class*="payment"]') ||
                        getAllText('[class*="finance"]').match(/as low as.*?month/i)?.[0];
      
      return { name, price, mileage, specs, financing };
    });
    
    await detailPage.close();
    
    // Process and clean the data
    const year = extractYear(data.name);
    const model = extractModel(data.name);
    const priceNumber = parsePrice(data.price);
    const mileageNumber = parseMileage(data.mileage);
    
    // Format financing if found
    let financingFormatted = null;
    if (data.financing) {
      // Clean and format financing text
      financingFormatted = data.financing
        .replace(/\s+/g, ' ')
        .trim();
      
      // Ensure it matches the format "As low as $X/ Month"
      if (!financingFormatted.match(/as low as/i)) {
        financingFormatted = `As low as ${financingFormatted}`;
      }
    }
    
    const listing = {
      name: data.name || 'Unknown Motorcycle',
      year: year,
      model: model,
      mileage: mileageNumber,
      price: priceNumber,
      specs: data.specs || '',
      financing: financingFormatted
    };
    
    console.log(`✅ Scraped: ${listing.name} - $${listing.price || 'N/A'}`);
    return listing;
    
  } catch (error) {
    console.error(`❌ Error scraping listing:`, error.message);
    return null;
  }
}

/**
 * Main scraping function
 */
async function scrapeInventory() {
  console.log('🚀 Starting House of Harley-Davidson inventory scrape...\n');
  
  let browser;
  let listings = [];
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to inventory page
    console.log(`📍 Navigating to: ${INVENTORY_URL}`);
    await page.goto(INVENTORY_URL, { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });
    
    // Wait for listings to load
    console.log('⏳ Waiting for listings to load...');
    await page.waitForTimeout(5000);
    
    // Try to find and click "Load More" or "Show All" buttons if they exist
    try {
      const loadMoreButton = await page.$('button[class*="load"], button[class*="more"], a[class*="load"], a[class*="more"]');
      if (loadMoreButton) {
        console.log('📄 Clicking "Load More" to get all listings...');
        await loadMoreButton.click();
        await page.waitForTimeout(3000);
      }
    } catch (e) {
      // No load more button, that's fine
    }
    
    // Find all listing elements
    console.log('🔍 Finding listing elements...');
    
    // Try multiple selectors for listing cards
    const listingSelectors = [
      '.vehicle-card',
      '.inventory-item',
      '.listing',
      '[class*="vehicle"]',
      '[class*="inventory"]',
      '[class*="listing"]',
      'article',
      '.card'
    ];
    
    let listingElements = [];
    for (const selector of listingSelectors) {
      listingElements = await page.$$(selector);
      if (listingElements.length > 0) {
        console.log(`✅ Found ${listingElements.length} listings using selector: ${selector}`);
        break;
      }
    }
    
    if (listingElements.length === 0) {
      // Fallback: try to find all links that might be listings
      listingElements = await page.$$('a[href*="inventory"], a[href*="vehicle"], a[href*="motorcycle"]');
      console.log(`✅ Found ${listingElements.length} potential listing links`);
    }
    
    if (listingElements.length === 0) {
      throw new Error('No listings found on page. The page structure may have changed.');
    }
    
    // Scrape each listing
    console.log(`\n📊 Scraping ${listingElements.length} listings...\n`);
    
    for (let i = 0; i < listingElements.length; i++) {
      console.log(`\n[${i + 1}/${listingElements.length}]`);
      const listing = await scrapeListing(page, listingElements[i]);
      if (listing) {
        listings.push(listing);
      }
    }
    
    await browser.close();
    
    // Write to CSV
    if (listings.length > 0) {
      console.log(`\n💾 Writing ${listings.length} listings to CSV...`);
      await csvWriter.writeRecords(listings);
      console.log(`✅ CSV saved to: ${OUTPUT_FILE}`);
    } else {
      console.warn('⚠️  No listings were successfully scraped.');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('SCRAPE + CSV COMPLETE');
    console.log(`Total listings scraped: ${listings.length}`);
    console.log(`Output file: ${OUTPUT_FILE}`);
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    
    if (browser) {
      await browser.close();
    }
    
    process.exit(1);
  }
}

// Run the scraper
if (require.main === module) {
  scrapeInventory().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { scrapeInventory };

