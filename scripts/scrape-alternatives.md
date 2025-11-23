# Alternative Methods to Get House of Harley Inventory

Since the website is blocking automated scraping, here are several alternative approaches:

## Option 1: Use Existing API Endpoint (Recommended)

Your site already has code that fetches from House of Harley's API. We can create a script that uses the same endpoint:

**File: `scripts/fetch-inventory-api.js`**

This would use the same Dealer.com API endpoint that your site uses, which might be more accessible than scraping the HTML.

## Option 2: Manual Export from Dealer.com

If you have access to the Dealer.com admin panel:
1. Log into Dealer.com admin
2. Go to Inventory section
3. Look for "Export" or "Download" option
4. Export as CSV
5. Map the columns to match your Airtable schema

## Option 3: Use Browser Extension

Create a browser extension that:
- Runs in your actual browser (not headless)
- Extracts data from the page you're viewing
- Exports to CSV

This bypasses bot detection since it's a real browser session.

## Option 4: Use a Scraping Service

Services like:
- **ScraperAPI** - Handles bot detection
- **Bright Data** - Enterprise scraping
- **Apify** - Pre-built scrapers

These services handle proxies, rotation, and bot detection.

## Option 5: Playwright Instead of Puppeteer

Playwright sometimes works better than Puppeteer for sites with bot protection.

## Option 6: Non-Headless Mode

Run Puppeteer with `headless: false` so it opens a real browser window. This sometimes bypasses detection.

## Option 7: Contact House of Harley

Ask if they can:
- Provide a CSV export
- Give you API access
- Share inventory data directly

## Option 8: Use Your Existing API Route

Since your `/api/bikes` route already fetches from Airtable, you could create a script that:
1. Fetches from House of Harley's API (if accessible)
2. Transforms the data
3. Posts directly to your Airtable via your API

Let me know which approach you'd like to try!

