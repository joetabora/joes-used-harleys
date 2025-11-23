# Deploy Payload CMS to Vercel - Step by Step

## Step 1: Push Your Code to GitHub

Make sure all your Payload CMS files are committed and pushed:

```bash
git add .
git commit -m "Add Payload CMS integration"
git push
```

## Step 2: Set Up Environment Variables in Vercel

1. Go to https://vercel.com and log in
2. Select your project: **joes-used-harleys**
3. Go to **Settings** → **Environment Variables**
4. Add these **3 variables**:

### Variable 1: PAYLOAD_SECRET
- **Name**: `PAYLOAD_SECRET`
- **Value**: `59013b699bc2508b0218421067b9f5b679f70247eeb4f966483d368a3bb6e49c`
  (or generate a new one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

### Variable 2: DATABASE_URI
- **Name**: `DATABASE_URI`
- **Value**: `mongodb+srv://joesharleys:YOUR_ACTUAL_PASSWORD@cluster0.jv9njyd.mongodb.net/joes-used-harleys?retryWrites=true&w=majority`
  (Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB password)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

### Variable 3: PAYLOAD_PUBLIC_SERVER_URL
- **Name**: `PAYLOAD_PUBLIC_SERVER_URL`
- **Value**: `https://joes-used-harleys.vercel.app`
  (or your custom domain if you have one)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

## Step 3: Deploy to Vercel

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment (or push a new commit)
3. Wait for the build to complete (2-3 minutes)

## Step 4: Seed the Production Database

After deployment, you need to create the first admin user. You have two options:

### Option A: Use Vercel CLI (Recommended)

1. Install Vercel CLI if you don't have it:
   ```bash
   npm i -g vercel
   ```

2. Pull production environment variables:
   ```bash
   vercel env pull .env.production
   ```

3. Run the seed script with production env:
   ```bash
   NODE_ENV=production npx tsx scripts/seed.ts
   ```

### Option B: Use Vercel's Environment Variables Directly

1. Create a temporary `.env.production` file:
   ```env
   PAYLOAD_SECRET=59013b699bc2508b0218421067b9f5b679f70247eeb4f966483d368a3bb6e49c
   DATABASE_URI=mongodb+srv://joesharleys:YOUR_PASSWORD@cluster0.jv9njyd.mongodb.net/joes-used-harleys?retryWrites=true&w=majority
   PAYLOAD_PUBLIC_SERVER_URL=https://joes-used-harleys.vercel.app
   ```

2. Run the seed script:
   ```bash
   npx tsx scripts/seed.ts
   ```

## Step 5: Test Your Deployment

1. Visit your Vercel site: `https://joes-used-harleys.vercel.app`
2. Visit the admin panel: `https://joes-used-harleys.vercel.app/admin`
3. Log in with:
   - **Email**: `joe@joesusedharleys.com`
   - **Password**: `harley2025`

## Step 6: Add Your First Bike

1. Log in to `/admin`
2. Go to **Media** → Upload a bike photo
3. Go to **Bikes** → Create New
4. Fill in bike details and select the uploaded image
5. Click **Save**
6. Check your homepage - the bike should appear!

## Troubleshooting

### "Cannot connect to database"
- Check that `DATABASE_URI` in Vercel matches your MongoDB Atlas connection string
- Verify MongoDB Atlas Network Access allows `0.0.0.0/0` (anywhere)
- Check that your database password is correct

### "Payload secret is required"
- Verify `PAYLOAD_SECRET` is set in Vercel environment variables
- Make sure it's set for all environments (Production, Preview, Development)

### "Admin panel shows 404"
- Check that `/app/api/[...payload]/route.ts` exists
- Verify the deployment completed successfully
- Check Vercel build logs for errors

### "Seed script fails"
- Make sure you're using the production environment variables
- Verify MongoDB Atlas allows connections from your IP
- Check that the database user has proper permissions

## Quick Commands Reference

```bash
# Pull Vercel env vars
vercel env pull .env.production

# Seed production database
NODE_ENV=production npx tsx scripts/seed.ts

# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs
```

## Next Steps After Deployment

1. ✅ Environment variables set in Vercel
2. ✅ Code deployed
3. ✅ Database seeded
4. ✅ Admin panel accessible
5. 🎉 Start adding bikes through the admin panel!

Your Payload CMS is now live on Vercel! 🚀

