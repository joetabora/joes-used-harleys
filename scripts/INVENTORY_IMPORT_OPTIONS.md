# Inventory Import Options - Summary

Since House of Harley's website is blocking automated scraping, here are your best options:

## ✅ **Option 1: Use Your Admin Form (Recommended)**

You already have a working admin form at `/admin/add-bike`:

1. **Go to:** https://joes-used-harleys.vercel.app/admin/add-bike
2. **For each bike:**
   - Fill in the form with bike details
   - Upload the photo
   - Click "Add Bike to Inventory"
3. **Photos are automatically uploaded to Imgur** and added to Airtable

**Pros:** Already working, no setup needed  
**Cons:** Manual entry (but fast with the form)

---

## ✅ **Option 2: Dealer.com Admin Export**

If you have access to Dealer.com admin:

1. Log into Dealer.com admin portal
2. Go to Inventory → Export
3. Download CSV of pre-owned inventory
4. Open in Excel/Google Sheets
5. Map columns to match Airtable:
   - `Name`, `Year`, `Model`, `Mileage`, `Price`, `Specs`, `Financing`
6. Import to Airtable via "Import data"

**Pros:** Bulk import, fast  
**Cons:** Requires Dealer.com access

---

## ✅ **Option 3: Direct Airtable Entry**

1. Open your Airtable base
2. Add rows directly in the table
3. Upload images to the Image field
4. Fill in all fields

**Pros:** Full control, can see everything  
**Cons:** Manual entry

---

## ✅ **Option 4: Contact House of Harley**

Ask them directly:
- "Can you export a CSV of current pre-owned inventory?"
- "Do you have an API we could integrate with?"
- "Can you share inventory data for our website?"

Many dealerships are happy to help with integrations!

**Pros:** Official data, reliable  
**Cons:** Requires coordination

---

## ✅ **Option 5: Browser Extension (If Needed)**

I can create a Chrome extension that:
- Runs in your real browser (not automated)
- Extracts data from pages you visit
- Exports to CSV

This works because it's a real browser session you control.

**Pros:** Semi-automated, works with real browser  
**Cons:** Requires extension installation

---

## 🎯 **My Recommendation**

**Start with Option 1 (Admin Form)** - it's already built and working. For bulk imports, use Option 2 (Dealer.com export) if you have access, or Option 4 (ask House of Harley).

The admin form is actually pretty fast - you can add a bike in 30 seconds, and photos upload automatically!

