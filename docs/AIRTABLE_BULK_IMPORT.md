# Airtable Bulk Import Guide

## Exporting Your Table for a Template

### Step 1: Export from Airtable

1. **Open your Airtable base** in your web browser
2. **Select your table** (the one with your bikes)
3. **Click the "..." menu** (three dots) in the top right of the table view
4. **Select "Export data"**
5. **Choose "CSV"** format (this is the easiest for bulk imports)
6. **Click "Export"** - this will download a CSV file

### Step 2: Use the CSV as a Template

The exported CSV will have:
- All your current column names as headers
- All your current bike data as rows
- Empty rows that you can fill in for new bikes

### Step 3: Add New Bikes to the CSV

1. **Open the CSV file** in Excel, Google Sheets, or any spreadsheet app
2. **Add new rows** at the bottom with your new bike data
3. **Make sure column names match exactly** (case-sensitive):
   - `Name` (required)
   - `Year` (number)
   - `Model` (text)
   - `Mileage` (number)
   - `Price` (number)
   - `Price Formatted` (text, e.g., "$26,999")
   - `Specs` (text)
   - `Financing` (text, e.g., "As low as $399/mo")
   - `Featured` (checkbox: TRUE or FALSE)
   - `Just Arrived` (checkbox: TRUE or FALSE)
   - `Image` (leave empty - you'll add images after import)

### Step 4: Import Back to Airtable

1. **Go back to your Airtable base**
2. **Click the "..." menu** (three dots) in the top right
3. **Select "Import data"**
4. **Choose "CSV file"**
5. **Upload your updated CSV file**
6. **Map the columns** (Airtable should auto-detect them)
7. **Choose "Update existing records"** if you want to update existing bikes, or **"Add new records"** for new bikes only
8. **Click "Import"**

### Step 5: Add Images After Import

Since images can't be imported via CSV, you'll need to:
1. **Open each new bike record** in Airtable
2. **Click on the Image field**
3. **Upload the bike photo** (or paste a URL if you have one)

## Alternative: Use Airtable's Built-in Import

Airtable also supports importing from:
- **Excel files** (.xlsx)
- **Google Sheets** (via URL)
- **JSON files**

## Tips for Bulk Adding

1. **Use consistent formatting:**
   - Prices: Just numbers (e.g., `26999` not `$26,999`)
   - Price Formatted: Include dollar sign (e.g., `$26,999`)
   - Specs: Use bullet points separated by " • " (e.g., `2023 • Harley-Davidson Street Glide • 8,742 miles`)

2. **Required fields:**
   - `Name` is required - make sure every row has a name

3. **Optional fields:**
   - If a field is empty, leave the cell blank (don't put "N/A" or "-")

4. **Checkboxes:**
   - Use `TRUE` or `FALSE` (all caps) for checkbox fields
   - Or just leave blank for FALSE

## Example CSV Row

```csv
Name,Year,Model,Mileage,Price,Price Formatted,Specs,Financing,Featured,Just Arrived
2023 Harley-Davidson Street Glide Special,2023,Street Glide Special,8742,26999,$26,999,2023 • Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black,As low as $399/mo,TRUE,FALSE
```

## Need Help?

If you run into issues:
1. Make sure column names match exactly (case-sensitive)
2. Check that required fields are filled
3. Verify data types (numbers should be numbers, not text)
4. Images must be added manually after import

