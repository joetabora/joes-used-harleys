# Payload CMS Integration Guide

This project uses Payload CMS v2 as the headless CMS for managing bikes inventory.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
PAYLOAD_SECRET=your-secret-key-here-change-this-in-production
DATABASE_URI=mongodb://localhost:27017/joes-used-harleys
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

**For Vercel Production:**
- Use MongoDB Atlas connection string for `DATABASE_URI`
- Set `PAYLOAD_PUBLIC_SERVER_URL` to your Vercel domain
- Generate a strong random string for `PAYLOAD_SECRET`

### 3. Database Setup

**Local Development:**
- Install MongoDB locally or use MongoDB Atlas
- Update `DATABASE_URI` in `.env.local`

**Production (Vercel):**
- Use MongoDB Atlas (free tier available)
- Add connection string to Vercel environment variables

### 4. Seed First User

Run the seed script to create the first admin user:

```bash
npx tsx scripts/seed.ts
```

This creates:
- Email: `joe@joesusedharleys.com`
- Password: `harley2025`

### 5. Generate TypeScript Types

```bash
npm run payload:generate:types
```

This generates `payload-types.ts` with TypeScript types for your collections.

### 6. Start Development Server

```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## Adding Bikes

1. Log in to `/admin` with your credentials
2. Go to "Bikes" collection
3. Click "Create New"
4. Fill in the bike details:
   - **Name**: Full bike name (e.g., "2023 Harley-Davidson Street Glide Special")
   - **Year**: Model year (e.g., 2023)
   - **Model**: Bike model (e.g., "Street Glide Special")
   - **Mileage**: Mileage in miles
   - **Price**: Price in dollars (e.g., 26999)
   - **Price Formatted**: Display price (e.g., "$26,999")
   - **Specs**: Bike specifications
   - **Image**: Upload bike photo (required)
   - **Financing**: Financing info (e.g., "As low as $399/mo")
   - **Featured**: Check to feature on homepage
   - **Just Arrived**: Check to show "Just Arrived" badge

5. Click "Save"

## Collections

### Bikes
Main collection for motorcycle inventory. All fields are displayed on the frontend.

### Media
Handles image uploads. Images are optimized and served through Next.js Image component.

### Users
Admin users for Payload CMS. First user is created via seed script.

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `PAYLOAD_SECRET`
   - `DATABASE_URI` (MongoDB Atlas connection string)
   - `PAYLOAD_PUBLIC_SERVER_URL` (your Vercel domain)
4. Deploy

The site will automatically fetch bikes from Payload CMS and display them in the inventory grid.

## Troubleshooting

**Admin panel not loading:**
- Check that `PAYLOAD_SECRET` is set
- Verify `DATABASE_URI` is correct
- Ensure MongoDB is accessible

**Images not displaying:**
- Check that images are uploaded in Media collection
- Verify image relation is set in Bikes collection
- Check Next.js image configuration in `next.config.js`

**Bikes not showing on frontend:**
- Check `/api/bikes` endpoint is working
- Verify bikes are published in Payload admin
- Check browser console for errors

