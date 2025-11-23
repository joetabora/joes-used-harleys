# Airtable Setup Guide

## Why Airtable?
- ✅ **FREE** - Up to 1,200 records per base (plenty for bikes)
- ✅ **EASY** - Spreadsheet-like interface, no coding needed
- ✅ **FAST** - Set up in 5 minutes
- ✅ **MOBILE APP** - Add bikes from your phone
- ✅ **IMAGE UPLOADS** - Drag & drop photos directly
- ✅ **REAL-TIME** - Changes appear on your site immediately

## Step 1: Create Airtable Base

1. Go to https://airtable.com and sign up (free)
2. Click "Add a base" → "Start from scratch"
3. Name it "Joe's Used Harleys Inventory"

## Step 2: Create Table Structure

Your table should have these columns (Airtable will auto-create some):

| Column Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | e.g., "2023 Harley-Davidson Street Glide Special" |
| Year | Number | e.g., 2023 |
| Model | Single line text | e.g., "Street Glide Special" |
| Mileage | Number | e.g., 8742 |
| Price | Number | e.g., 26999 |
| Price Formatted | Single line text | e.g., "$26,999" |
| Specs | Long text | e.g., "2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2" |
| Image | Attachment | Upload bike photos (drag & drop) |
| Financing | Single line text | e.g., "As low as $399/mo" |
| Featured | Checkbox | Check for featured bikes |
| Just Arrived | Checkbox | Check for new arrivals |

## Step 3: Get API Credentials

1. Go to https://airtable.com/api
2. Click on your base "Joe's Used Harleys Inventory"
3. Copy your **Base ID** (starts with `app...`)
4. Click "Show API key" and copy your **API Key** (starts with `pat...`)

## Step 4: Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these 3 variables:

**AIRTABLE_BASE_ID**
- Value: Your Base ID (e.g., `appXXXXXXXXXXXXXX`)

**AIRTABLE_API_KEY**
- Value: Your API Key (e.g., `patXXXXXXXXXXXXXX`)

**AIRTABLE_TABLE_NAME**
- Value: `Table 1` (or whatever you named your table)

3. Make sure all are checked for Production, Preview, and Development
4. Click Save

## Step 5: Redeploy

After adding environment variables, Vercel will automatically redeploy, or you can manually redeploy from the Deployments tab.

## Step 6: Add Your First Bike

1. In Airtable, click the "+" button to add a new record
2. Fill in all the fields
3. For Image: Click the attachment field → Upload → Select your bike photo
4. Click the checkmark to save

**That's it!** Your bike will appear on your site within seconds.

## Tips

- **Multiple Images**: Airtable supports multiple images per bike. The first image will be used as the main photo.
- **Mobile App**: Download the Airtable mobile app to add bikes on the go
- **Views**: Create different views (e.g., "Featured Bikes", "Just Arrived") to organize your inventory
- **Formulas**: Use Airtable formulas to auto-generate fields like "Price Formatted" from "Price"

## Troubleshooting

**Bikes not showing?**
- Check that environment variables are set correctly in Vercel
- Make sure your table name matches `AIRTABLE_TABLE_NAME`
- Verify your API key has read access

**Images not loading?**
- Make sure you uploaded images as attachments (not just URLs)
- Check that images are public (Airtable attachments are public by default)

