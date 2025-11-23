# Quick Vercel Deployment Guide

## Step 1: Commit & Push Your Code

```bash
git add .
git commit -m "Add Payload CMS integration"
git push
```

## Step 2: Add Environment Variables in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click on your project: **joes-used-harleys**
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables (click "Add" for each):

### Variable 1:
- **Key**: `PAYLOAD_SECRET`
- **Value**: `59013b699bc2508b0218421067b9f5b679f70247eeb4f966483d368a3bb6e49c`
- **Environments**: ✅ Production ✅ Preview ✅ Development

### Variable 2:
- **Key**: `DATABASE_URI`
- **Value**: `mongodb+srv://joesharleys:YOUR_ACTUAL_PASSWORD@cluster0.jv9njyd.mongodb.net/joes-used-harleys?retryWrites=true&w=majority`
  *(Replace YOUR_ACTUAL_PASSWORD with your real MongoDB password)*
- **Environments**: ✅ Production ✅ Preview ✅ Development

### Variable 3:
- **Key**: `PAYLOAD_PUBLIC_SERVER_URL`
- **Value**: `https://joes-used-harleys.vercel.app`
- **Environments**: ✅ Production ✅ Preview ✅ Development

## Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for build to complete

## Step 4: Seed Production Database

After deployment completes, run:

```bash
vercel env pull .env.production
npx tsx scripts/seed.ts
```

Or manually create `.env.production` with your values and run:
```bash
npx tsx scripts/seed.ts
```

## Step 5: Test!

1. Visit: `https://joes-used-harleys.vercel.app/admin`
2. Log in:
   - Email: `joe@joesusedharleys.com`
   - Password: `harley2025`
3. Start adding bikes! 🎉

