# Manual Inventory Export Guide

Since automated scraping is being blocked, here's the easiest way to get inventory data:

## Option 1: Dealer.com Admin Export (Easiest)

If you have access to the Dealer.com admin panel:

1. **Log into Dealer.com admin**
   - Go to your dealer portal
   - Navigate to Inventory section

2. **Export inventory**
   - Look for "Export" or "Download" button
   - Select "CSV" or "Excel" format
   - Choose "Pre-owned" or "Used" inventory only
   - Download the file

3. **Map columns to Airtable**
   - Open the exported file in Excel/Google Sheets
   - Rename columns to match Airtable:
     - `Vehicle Name` or `Title` → `Name`
     - `Year` → `Year`
     - `Model` → `Model`
     - `Mileage` or `Odometer` → `Mileage`
     - `Price` or `Sale Price` → `Price` (remove $ and commas)
     - `Description` or `Features` → `Specs`
     - `Payment` or `Monthly Payment` → `Financing` (format as "As low as $X/ Month")
   - Add columns if missing: `Price Formatted`, `Featured`, `Just Arrived`

4. **Import to Airtable**
   - Go to Airtable
   - Click "..." menu → "Import data"
   - Upload your CSV
   - Map columns
   - Import!

## Option 2: Copy-Paste from Website

1. **Open House of Harley inventory page**
   - Go to: https://houseofharleydavidson.com/pre-owned-inventory
   - Scroll through all listings

2. **Use the Airtable admin form**
   - Go to: https://joes-used-harleys.vercel.app/admin/add-bike
   - Copy-paste data from each listing
   - Upload photos
   - Submit

3. **Or use Airtable directly**
   - Open your Airtable base
   - Add rows manually
   - Upload images directly

## Option 3: Ask House of Harley

Contact them and ask:
- "Can you export a CSV of your current pre-owned inventory?"
- "Do you have API access we could use?"
- "Can you share inventory data for our website integration?"

Many dealerships are happy to help with this!

## Option 4: Use Browser Extension (Coming Soon)

I can create a simple browser extension that:
- Runs in your actual Chrome/Firefox browser
- Extracts data from the page you're viewing
- Exports to CSV

This works because it's a real browser session, not automated.

## Quick CSV Template

If you're building the CSV manually, use this format:

```csv
Name,Year,Model,Mileage,Price,Price Formatted,Specs,Financing,Featured,Just Arrived
2023 Harley-Davidson Street Glide Special,2023,Street Glide Special,8742,26999,$26,999,2023 • Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black,As low as $399/mo,FALSE,FALSE
```

**Tips:**
- Prices: Numbers only (no $ or commas) in `Price` column
- Price Formatted: Include $ and commas in `Price Formatted` column
- Specs: Use " • " (space-bullet-space) to separate items
- Financing: Format as "As low as $X/mo" or "As low as $X/ Month"
- Checkboxes: Use `TRUE` or `FALSE` (all caps)

