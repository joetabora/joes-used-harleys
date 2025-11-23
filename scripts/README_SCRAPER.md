# House of Harley-Davidson Inventory Scraper

This script scrapes pre-owned motorcycle inventory from House of Harley-Davidson's website and outputs a CSV file that matches your Airtable schema.

## Installation

First, install the required dependencies:

```bash
npm install puppeteer csv-writer
```

## Usage

### Basic Usage

Run the scraper script:

```bash
node scripts/scrape-house-of-harley.js
```

The script will:
1. Navigate to the House of Harley-Davidson pre-owned inventory page
2. Scrape all motorcycle listings
3. Extract: Name, Year, Model, Mileage, Price, Specs, Financing
4. Output a CSV file: `house_of_harley_inventory.csv` in the project root

### Output

The CSV file will have these exact columns:
- `Name` - Full motorcycle name/title
- `Year` - Year as a number (e.g., 2023)
- `Model` - Model name (e.g., "Street Glide")
- `Mileage` - Mileage as a number (e.g., 8742)
- `Price` - Price as a number without formatting (e.g., 26999)
- `Specs` - Specifications/description text
- `Financing` - Financing offer (e.g., "As low as $95/ Month")

## Scheduling the Scraper

### Option 1: Cron Job (Linux/Mac)

Add to your crontab to run daily at 2 AM:

```bash
crontab -e
```

Add this line:
```
0 2 * * * cd /path/to/joes-used-harleys && node scripts/scrape-house-of-harley.js >> logs/scraper.log 2>&1
```

### Option 2: GitHub Actions

Create `.github/workflows/scrape-inventory.yml`:

```yaml
name: Scrape Inventory

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/scrape-house-of-harley.js
      - uses: actions/upload-artifact@v3
        with:
          name: inventory-csv
          path: house_of_harley_inventory.csv
```

### Option 3: Manual Run

Just run it whenever you want to update your inventory:

```bash
node scripts/scrape-house-of-harley.js
```

## Uploading to Airtable

After the CSV is generated:

1. **Open your Airtable base**
2. **Click the "..." menu** (three dots) in the top right
3. **Select "Import data"**
4. **Choose "CSV file"**
5. **Upload `house_of_harley_inventory.csv`**
6. **Map the columns** (should auto-detect):
   - Name → Name
   - Year → Year
   - Model → Model
   - Mileage → Mileage
   - Price → Price
   - Specs → Specs
   - Financing → Financing
7. **Choose import option:**
   - **"Add new records"** - Adds only new bikes
   - **"Update existing records"** - Updates existing + adds new
   - **"Replace table data"** - Replaces everything (use with caution!)
8. **Click "Import"**

## Adding Images

⚠️ **Important:** Images cannot be imported via CSV. After importing:

1. Open each new bike record in Airtable
2. Click on the **Image** field
3. Upload the bike photo (or paste a URL if available)

## Troubleshooting

### "No listings found on page"
- The website structure may have changed
- Check if the URL is still correct: `https://houseofharleydavidson.com/pre-owned-inventory`
- The selectors may need to be updated

### "Timeout waiting for page"
- The website may be slow or blocking automated access
- Try increasing the timeout in the script
- Check your internet connection

### Missing data in CSV
- Some listings may not have all fields available
- Check the console logs to see which listings had issues
- You can manually fill in missing data in Airtable

### Puppeteer installation issues
- Make sure you have Node.js 14+ installed
- On Linux, you may need: `sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`

## Customization

To modify the scraper:

1. **Change the URL**: Edit `INVENTORY_URL` in the script
2. **Add more fields**: Update `HEADERS` array and add extraction logic
3. **Change output format**: Modify the CSV writer configuration
4. **Adjust selectors**: Update the CSS selectors if the website structure changes

## Notes

- The scraper visits each listing's detail page to get full information
- This may take several minutes if there are many listings
- The script includes error handling - if one listing fails, it continues with others
- All scraped data is logged to the console for debugging

