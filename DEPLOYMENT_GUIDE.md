# Complete Payload CMS Integration - Deployment Guide

## ✅ What's Been Set Up

Your Next.js 14 site now has a complete Payload CMS v2 integration with:

1. **Bikes Collection** - Manage your motorcycle inventory
2. **Media Collection** - Upload and manage bike photos
3. **Users Collection** - Admin authentication
4. **Admin Panel** - Accessible at `/admin`
5. **API Routes** - `/api/bikes` for frontend, `/api/[...payload]` for admin
6. **Homepage Integration** - InventoryGrid automatically fetches from Payload

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```env
PAYLOAD_SECRET=your-very-long-random-secret-key-here
DATABASE_URI=mongodb://localhost:27017/joes-used-harleys
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

**For Production (Vercel):**
- Get MongoDB Atlas connection string (free tier available)
- Generate a strong random string for `PAYLOAD_SECRET`
- Set `PAYLOAD_PUBLIC_SERVER_URL` to your Vercel domain

### 3. Set Up Database

**Option A: MongoDB Atlas (Recommended for Production)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `.env.local` as `DATABASE_URI`

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Use `mongodb://localhost:27017/joes-used-harleys`

### 4. Seed First User

```bash
npx tsx scripts/seed.ts
```

This creates:
- **Email**: `joe@joesusedharleys.com`
- **Password**: `harley2025`

### 5. Generate TypeScript Types

```bash
npm run payload:generate:types
```

### 6. Start Development

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 📝 Adding Your First Bike

1. Log in at `/admin` with `joe@joesusedharleys.com` / `harley2025`
2. Go to **Media** → Upload a bike photo
3. Go to **Bikes** → Create New
4. Fill in:
   - Name: "2023 Harley-Davidson Street Glide Special"
   - Year: 2023
   - Model: "Street Glide Special"
   - Mileage: 8742
   - Price: 26999
   - Price Formatted: "$26,999"
   - Specs: "2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2"
   - Image: Select the photo you uploaded
   - Financing: "As low as $399/mo"
   - Featured: ✓ (optional)
5. Click **Save**

The bike will automatically appear on your homepage!

## 🚢 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Payload CMS integration"
git push
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables:
   - `PAYLOAD_SECRET` - Your secret key
   - `DATABASE_URI` - MongoDB Atlas connection string
   - `PAYLOAD_PUBLIC_SERVER_URL` - Your Vercel domain (e.g., `https://joes-used-harleys.vercel.app`)

### Step 3: Deploy

Vercel will automatically:
- Install dependencies
- Build the Next.js app
- Deploy to production

### Step 4: Seed Production Database

After first deploy, run the seed script against production:

```bash
# Set production env vars temporarily
export PAYLOAD_SECRET=your-production-secret
export DATABASE_URI=your-production-mongodb-uri
export PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.vercel.app

npx tsx scripts/seed.ts
```

Or use Vercel CLI:
```bash
vercel env pull .env.local
npx tsx scripts/seed.ts
```

## 🎨 Design Preservation

Your exact design is preserved:
- ✅ Orange/black Harley theme (#FF6600)
- ✅ Clash Display headings
- ✅ Pulsing floating "TEXT JOE" button
- ✅ Urgency banner
- ✅ "Why Buy From Joe" section
- ✅ Pre-approval form
- ✅ Mobile sticky bar
- ✅ All SEO meta tags, schema, FAQ, local SEO, map
- ✅ Scroll fade animations
- ✅ Hover effects on bike cards

## 📱 Mobile Upload Support

You can upload photos directly from your phone:
1. Visit `/admin` on your phone
2. Log in
3. Go to **Media** → Upload
4. Take photo or select from gallery
5. Go to **Bikes** → Create New
6. Select the uploaded image

## 🔧 Troubleshooting

**Admin panel shows 404:**
- Check that `/app/api/[...payload]/route.ts` exists
- Verify `PAYLOAD_SECRET` is set
- Check MongoDB connection

**Bikes not showing:**
- Check `/api/bikes` endpoint in browser
- Verify bikes are created in admin panel
- Check browser console for errors
- Ensure images are uploaded and linked

**Images not displaying:**
- Verify image is uploaded in Media collection
- Check image relation is set in Bikes
- Verify Next.js image config allows your domain

**Build errors on Vercel:**
- Check all environment variables are set
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check build logs for specific errors

## 📚 File Structure

```
├── app/
│   ├── api/
│   │   ├── [...payload]/route.ts    # Payload API handler
│   │   └── bikes/route.ts            # Frontend bikes API
│   ├── admin/[[...segments]]/page.tsx # Admin route
│   └── page.tsx                      # Homepage (unchanged)
├── collections/
│   ├── Bikes.ts                      # Bikes collection schema
│   ├── Media.ts                       # Media collection schema
│   └── Users.ts                       # Users collection schema
├── components/
│   └── InventoryGrid.tsx             # Updated to fetch from /api/bikes
├── lib/
│   └── payload.ts                     # Payload client helper
├── payload.config.ts                  # Payload configuration
├── scripts/
│   └── seed.ts                        # Seed script for first user
└── .env.example                        # Environment variables template
```

## 🎯 Next Steps

1. **Add Bikes**: Upload photos and create bike entries in admin panel
2. **Customize**: Modify collections in `collections/` if needed
3. **SEO**: All your existing SEO is preserved and working
4. **Deploy**: Push to Vercel and add environment variables

Your site is now 100% ready for production with a real CMS backend! 🎉

