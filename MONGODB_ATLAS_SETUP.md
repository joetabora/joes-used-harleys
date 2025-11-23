# MongoDB Atlas Setup Guide

Follow these steps to set up MongoDB Atlas (free tier) for your Payload CMS.

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email address
   - Password
   - Or use Google/GitHub to sign in

## Step 2: Create a Free Cluster

1. After logging in, you'll see the **"Deploy a cloud database"** screen
2. Select **"M0 FREE"** (Free Shared Cluster)
3. Choose a **Cloud Provider**:
   - AWS (recommended)
   - Google Cloud
   - Azure
4. Select a **Region** closest to you (or your users):
   - For US: Choose `us-east-1` (N. Virginia) or `us-west-2` (Oregon)
   - For Vercel: Any US region works well
5. Leave **Cluster Name** as default or name it `joes-used-harleys`
6. Click **"Create"** (takes 1-3 minutes)

## Step 3: Create Database User

1. While cluster is creating, you'll see a **"Create Database User"** screen
2. Choose **"Password"** authentication
3. Enter:
   - **Username**: `joesharleys` (or your choice)
   - **Password**: Generate a strong password (click the key icon) or create your own
   - ⚠️ **SAVE THIS PASSWORD** - you'll need it for the connection string!
4. Click **"Create Database User"**

## Step 4: Configure Network Access (IMPORTANT - Do This First!)

Before you can connect, you need to allow network access. Here's how:

1. **Close the "Connect" modal** (click X or outside the modal)
2. In the left sidebar, click **"Network Access"** (under Security)
3. Click the green **"Add IP Address"** button
4. For Vercel/production: Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` to the IP whitelist
   - This is safe because your database still requires username/password authentication
5. Click **"Confirm"**
6. Your IP address will be added (takes a few seconds)

**Alternative for local development only:**
- Click **"Add Current IP Address"** instead (only allows your current IP)
- You'll need to add Vercel's IPs later for production

## Step 5: Get Your Connection String

1. Go back to your cluster (click **"Database"** in left sidebar)
2. Click the **"Connect"** button on your cluster
3. You'll see connection options - choose **"Drivers"**
4. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later (or latest)
5. You'll see a connection string like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Copy this connection string**
7. Replace `<username>` with your database username (e.g., `joesharleys`)
8. Replace `<password>` with your database password
9. Add your database name at the end (before the `?`):
   ```
   mongodb+srv://joesharleys:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/joes-used-harleys?retryWrites=true&w=majority
   ```

## Step 6: Add to Your Project

### For Local Development:

1. Create `.env.local` in your project root:
```env
PAYLOAD_SECRET=your-very-long-random-secret-key-here
DATABASE_URI=mongodb+srv://joesharleys:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/joes-used-harleys?retryWrites=true&w=majority
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

2. Replace `YOUR_PASSWORD` with your actual database password
3. Replace the cluster URL with your actual cluster URL

### For Vercel Production:

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

   **Variable Name**: `PAYLOAD_SECRET`
   **Value**: `your-very-long-random-secret-key-here`
   **Environment**: Production, Preview, Development (select all)

   **Variable Name**: `DATABASE_URI`
   **Value**: `mongodb+srv://joesharleys:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/joes-used-harleys?retryWrites=true&w=majority`
   **Environment**: Production, Preview, Development (select all)

   **Variable Name**: `PAYLOAD_PUBLIC_SERVER_URL`
   **Value**: `https://your-domain.vercel.app` (your actual Vercel domain)
   **Environment**: Production, Preview, Development (select all)

4. Click **"Save"** for each variable

## Step 7: Test Your Connection

1. Make sure your `.env.local` is set up correctly
2. Run the seed script:
```bash
npx tsx scripts/seed.ts
```

3. If successful, you'll see:
```
✅ Created first user: joe@joesusedharleys.com
✅ Seed completed!
```

4. Start your dev server:
```bash
npm run dev
```

5. Visit `http://localhost:3000/admin`
6. Log in with:
   - Email: `joe@joesusedharleys.com`
   - Password: `harley2025`

## Troubleshooting

### "Authentication failed"
- Double-check your username and password in the connection string
- Make sure there are no extra spaces
- Password might have special characters - URL encode them if needed

### "IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Make sure your IP is added (or `0.0.0.0/0` for anywhere)
- Click "Add IP Address" if needed

### "Connection timeout"
- Check your cluster is running (not paused)
- Verify the connection string is correct
- Make sure network access is configured

### "Database name not found"
- MongoDB Atlas creates databases automatically when you first write to them
- The database name in your connection string (`joes-used-harleys`) will be created automatically
- No need to create it manually

## Free Tier Limits

MongoDB Atlas M0 (Free) includes:
- ✅ 512 MB storage (plenty for thousands of bikes)
- ✅ Shared RAM and vCPU
- ✅ No credit card required
- ✅ Perfect for development and small production sites

## Security Best Practices

1. **Use strong passwords** for your database user
2. **Rotate passwords** periodically
3. **Use environment variables** - never commit connection strings to Git
4. **Limit IP access** in production if possible (though `0.0.0.0/0` is fine for Vercel)
5. **Enable MongoDB Atlas monitoring** to track usage

## Next Steps

Once MongoDB Atlas is set up:
1. ✅ Your `.env.local` is configured
2. ✅ Run `npx tsx scripts/seed.ts` to create first user
3. ✅ Start dev server: `npm run dev`
4. ✅ Visit `/admin` and start adding bikes!

Your Payload CMS is now connected to MongoDB Atlas and ready to use! 🎉

