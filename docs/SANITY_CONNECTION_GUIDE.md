# Connecting Your Sanity Project to the Backend

## Step-by-Step Connection Guide

### Step 1: Create a Sanity Account & Project

1. **Sign up/Login:**
   - Go to [sanity.io](https://www.sanity.io)
   - Sign up for a free account (or login if you have one)

2. **Create a New Project:**
   - Click **"Create project"** or go to [sanity.io/manage](https://www.sanity.io/manage)
   - Project name: `Joe's Used Harleys` (or any name you prefer)
   - Choose **"Production"** dataset (or create a new one)
   - Click **"Create project"**

3. **Copy Your Project ID:**
   - After creating, you'll see your **Project ID** (looks like: `abc123xyz`)
   - Copy this - you'll need it in Step 3

---

### Step 2: Get Your API Token

1. **Navigate to API Settings:**
   - In your Sanity project dashboard, go to **API** → **Tokens**

2. **Create a Read Token:**
   - Click **"Add API token"**
   - Name: `Read Token` (or any name)
   - **Permissions:** Select **"Viewer"** (read-only access)
   - Click **"Save"**
   - **Copy the token** (it looks like: `skAbc123...`) - you won't see it again!

3. **Optional - Create Write Token (for mutations):**
   - Create another token with **"Editor"** permissions if you need write access
   - Copy this token as well

---

### Step 3: Set Up Environment Variables

1. **Create `.env.local` file:**
   ```bash
   cd /Users/josephtabora/git/joes-used-harleys
   touch .env.local
   ```

2. **Add your Sanity credentials:**
   Open `.env.local` and add:
   ```env
   # Sanity CMS Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
   SANITY_API_READ_TOKEN=your-read-token-here
   
   # Optional - for write operations
   SANITY_API_WRITE_TOKEN=your-write-token-here
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://joes-used-harleys.vercel.app
   ```

3. **Replace the placeholders:**
   - `your-project-id-here` → Your actual Project ID from Step 1
   - `your-read-token-here` → Your Read Token from Step 2
   - `your-write-token-here` → Your Write Token (if created)

4. **For Vercel Deployment:**
   - Go to your Vercel project settings
   - Navigate to **Settings** → **Environment Variables**
   - Add each variable from `.env.local`
   - Make sure to add them for **Production**, **Preview**, and **Development**

---

### Step 4: Initialize Sanity Schemas in Your Project

1. **Install Sanity CLI (if not already installed):**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login to Sanity:**
   ```bash
   sanity login
   ```
   This will open your browser to authenticate.

3. **Link Your Project:**
   ```bash
   cd /Users/josephtabora/git/joes-used-harleys
   sanity init --env
   ```
   
   When prompted:
   - **"Use existing project?"** → Select **Yes**
   - **Select your project** → Choose the project you created
   - **Dataset:** → `production` (or your dataset name)
   - **Output path:** → `./sanity` (already exists, press Enter)
   - **Use TypeScript?** → Yes
   - **Use ESLint?** → Yes (optional)

4. **Deploy Your Schemas:**
   The schemas are already in `/sanity/schemas/`, but you need to ensure Sanity knows about them:
   ```bash
   sanity schema deploy
   ```
   
   Or simply deploy the Studio (which includes schemas):
   ```bash
   sanity deploy
   ```

---

### Step 5: Deploy Sanity Studio (Optional but Recommended)

1. **Deploy Studio:**
   ```bash
   sanity deploy
   ```
   
   When prompted:
   - **Studio hostname:** → Choose a unique name (e.g., `joes-used-harleys-studio`)
   - This creates: `https://joes-used-harleys-studio.sanity.studio`

2. **Access Your Studio:**
   - Visit the URL provided after deployment
   - You can now create motorcycles, model pages, and manage content!

---

### Step 6: Verify Connection

1. **Test Locally:**
   ```bash
   npm run dev
   ```
   
   Visit: `http://localhost:3000/inventory`
   - If Sanity is connected, it will try to fetch from CMS
   - If not connected, it will fallback to `inventory.json`

2. **Check Console:**
   - Open browser DevTools (F12)
   - Check for any Sanity-related errors
   - Look for: `"Sanity project ID not found"` warning (means not connected)

3. **Test API Route:**
   Visit: `http://localhost:3000/api/motorcycles`
   - Should return: `{"bikes":[],"source":"sanity"}` if connected
   - Or: `{"bikes":[],"source":"fallback"}` if not connected

---

### Step 7: Create Your First Content

1. **Access Studio:**
   - Via deployed Studio: `https://your-studio-name.sanity.studio`
   - Or via Sanity Manage: [sanity.io/manage](https://www.sanity.io/manage) → Your project

2. **Create a Motorcycle:**
   - Click **"Motorcycles"** → **"Create"**
   - Fill in:
     - Title: `2023 Street Glide Special`
     - Slug: (auto-generated from title)
     - Model: `Street Glide`
     - Year: `2023`
     - Mileage: `5000`
     - Price: `21999`
     - Price Formatted: `$21,999`
     - Condition: `Excellent`
     - Upload images
     - Add description, features, specs
   - Click **"Publish"**

3. **Verify on Site:**
   - Visit: `http://localhost:3000/bikes/your-slug`
   - Your motorcycle should appear!

---

## Troubleshooting

### "Sanity project ID not found" Warning

**Problem:** Environment variables not set correctly.

**Solution:**
1. Check `.env.local` exists and has correct values
2. Restart dev server: `npm run dev`
3. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` starts with `NEXT_PUBLIC_`

### "Failed to fetch" Errors

**Problem:** API token incorrect or missing permissions.

**Solution:**
1. Verify token in `.env.local`
2. Check token has "Viewer" permissions in Sanity
3. Regenerate token if needed

### Studio Not Loading

**Problem:** Studio not deployed or schemas not synced.

**Solution:**
1. Run `sanity deploy` to deploy Studio
2. Run `sanity schema deploy` to sync schemas
3. Check `sanity.config.ts` has correct project ID

### Build Errors on Vercel

**Problem:** Environment variables not set in Vercel.

**Solution:**
1. Go to Vercel project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

---

## Quick Reference

### Environment Variables Checklist

```env
✅ NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
✅ NEXT_PUBLIC_SANITY_DATASET=production
✅ NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
✅ SANITY_API_READ_TOKEN=skAbc123...
✅ SANITY_API_WRITE_TOKEN=skXyz789... (optional)
✅ NEXT_PUBLIC_SITE_URL=https://joes-used-harleys.vercel.app
```

### Useful Commands

```bash
# Login to Sanity
sanity login

# Deploy Studio
sanity deploy

# Deploy schemas
sanity schema deploy

# Check project status
sanity projects list

# View datasets
sanity datasets list
```

### Sanity Dashboard Links

- **Manage Projects:** [sanity.io/manage](https://www.sanity.io/manage)
- **API Tokens:** [sanity.io/manage](https://www.sanity.io/manage) → Your Project → API → Tokens
- **Documentation:** [sanity.io/docs](https://www.sanity.io/docs)

---

## Next Steps After Connection

1. ✅ Create your first motorcycle listing
2. ✅ Set up homepage settings
3. ✅ Configure global settings
4. ✅ Create model pages
5. ✅ Set up webhook for automatic revalidation (optional)

---

## Need Help?

- **Sanity Docs:** [sanity.io/docs](https://www.sanity.io/docs)
- **Sanity Community:** [slack.sanity.io](https://slack.sanity.io)
- **Check logs:** Browser console and terminal for error messages

