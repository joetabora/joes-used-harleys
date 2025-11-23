# Airtable Quick Start - Step by Step

## Part 1: Create Your Base

1. **Go to https://airtable.com**
   - Click "Sign up" (or "Log in" if you have an account)
   - Use Google, Apple, or email to sign up (100% free)

2. **Create a new base**
   - After logging in, look for the **"+ Create"** button (usually at the top or in the left sidebar)
   - Click **"+ Create"**
   - You'll see 3 options:
     - ❌ "Build an app with Omni" (AI-powered - skip this)
     - ❌ "Start with a managed app" (Enterprise only - skip this)
     - ✅ **"Build an app on your own"** ← **Click this one!**

3. **Name your base**
   - You'll be prompted to name it
   - Type: **"Joe's Used Harleys Inventory"**
   - Choose a color/icon if you want (optional)
   - Click **"Create base"** or **"Continue"**

✅ **You now have a base!** You should see a table with columns like "Name" and "Notes"

---

## Part 2: Set Up Your Columns

Your table needs these columns. Here's how to add them:

### Column 1: Name (already exists)
- ✅ This should already be there
- If not: Click the **"+"** button at the top right of the table → Type "Name" → Select "Single line text"

### Column 2: Year
1. Click the **"+"** button at the top right (next to existing columns)
2. Type: **"Year"**
3. Select field type: **"Number"**
4. Click **"Create field"**

### Column 3: Model
1. Click **"+"** again
2. Type: **"Model"**
3. Select: **"Single line text"**
4. Click **"Create field"**

### Column 4: Mileage
1. Click **"+"**
2. Type: **"Mileage"**
3. Select: **"Number"**
4. Click **"Create field"**

### Column 5: Price
1. Click **"+"**
2. Type: **"Price"**
3. Select: **"Number"**
4. Click **"Create field"**

### Column 6: Price Formatted
1. Click **"+"**
2. Type: **"Price Formatted"**
3. Select: **"Single line text"**
4. Click **"Create field"**

### Column 7: Specs
1. Click **"+"**
2. Type: **"Specs"**
3. Select: **"Long text"** (allows multiple lines)
4. Click **"Create field"**

### Column 8: Image
1. Click **"+"**
2. Type: **"Image"**
3. Select: **"Attachment"** (this lets you upload photos)
4. Click **"Create field"**

### Column 9: Financing
1. Click **"+"**
2. Type: **"Financing"**
3. Select: **"Single line text"**
4. Click **"Create field"**

### Column 10: Featured
1. Click **"+"**
2. Type: **"Featured"**
3. Select: **"Checkbox"**
4. Click **"Create field"**

### Column 11: Just Arrived
1. Click **"+"**
2. Type: **"Just Arrived"**
3. Select: **"Checkbox"**
4. Click **"Create field"**

---

## Part 3: Delete Unnecessary Columns

- You can delete the default "Notes" column if you don't need it
- Right-click the column header → **"Delete field"**

---

## Part 4: Add Your First Bike (Test)

1. Click the **"+"** button at the bottom to add a new row
2. Fill in the fields:
   - **Name**: `2023 Harley-Davidson Street Glide Special`
   - **Year**: `2023`
   - **Model**: `Street Glide Special`
   - **Mileage**: `8742`
   - **Price**: `26999`
   - **Price Formatted**: `$26,999`
   - **Specs**: `2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2`
   - **Image**: Click the attachment field → **"Upload"** → Select a bike photo
   - **Financing**: `As low as $399/mo`
   - **Featured**: Check the box if you want it featured
   - **Just Arrived**: Check if it's new

3. Click the checkmark ✓ to save

---

## Part 5: Get Your API Credentials

1. Go to **https://airtable.com/api**
   - Or click your profile icon (top right) → **"Developer hub"** → **"API documentation"**

2. You'll see a list of your bases. Click on **"Joe's Used Harleys Inventory"**

3. You'll see your **Base ID** at the top (looks like: `appXXXXXXXXXXXXXX`)
   - Copy this entire ID

4. Scroll down to see **"Authentication"**
   - Click **"Show API key"**
   - Copy your **API Key** (looks like: `patXXXXXXXXXXXXXX`)

5. **Note your table name** (usually "Table 1" or whatever you named it)
   - You can see it in the URL or at the top of the API docs

---

## Part 6: Add to Vercel

1. Go to **https://vercel.com** → Your project → **Settings** → **Environment Variables**

2. Click **"Add New"** and add these 3 variables:

   **Variable 1:**
   - Name: `AIRTABLE_BASE_ID`
   - Value: Your Base ID (e.g., `appXXXXXXXXXXXXXX`)
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

   **Variable 2:**
   - Name: `AIRTABLE_API_KEY`
   - Value: Your API Key (e.g., `patXXXXXXXXXXXXXX`)
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

   **Variable 3:**
   - Name: `AIRTABLE_TABLE_NAME`
   - Value: `Table 1` (or whatever your table is named)
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

3. **Redeploy** your site:
   - Go to **Deployments** tab
   - Click **"⋯"** on the latest deployment
   - Click **"Redeploy"**

---

## Part 7: Test It!

1. Wait for Vercel to finish deploying (2-3 minutes)

2. Visit your site: `https://your-site.vercel.app`

3. Your bike should appear in the inventory grid!

4. **Add more bikes** in Airtable - they'll appear on your site automatically!

---

## Tips

- **Mobile App**: Download the Airtable app to add bikes from your phone
- **Multiple Images**: You can upload multiple images per bike - the first one will be used
- **Views**: Create different views (e.g., "Featured") to organize your inventory
- **Formulas**: Use Airtable formulas to auto-format prices if you want

---

## Troubleshooting

**"Bikes not showing?"**
- Make sure environment variables are set in Vercel
- Check that your table name matches exactly (case-sensitive)
- Verify your API key is correct
- Make sure you added at least one bike in Airtable

**"Images not loading?"**
- Make sure you uploaded images as attachments (not just URLs)
- Images should be public (they are by default in Airtable)

**Need help?** Check the main `AIRTABLE_SETUP.md` file for more details.

