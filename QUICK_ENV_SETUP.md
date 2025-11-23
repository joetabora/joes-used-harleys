# Quick Environment Variables Setup for Vercel

## Required Environment Variables

You need to set these 3 environment variables in your Vercel project:

### 1. PAYLOAD_SECRET
- **What it is**: A random secret string used to encrypt Payload CMS sessions
- **How to generate**: Run this command locally: `openssl rand -base64 32`
- **Or use**: Any random 32+ character string
- **Example**: `your-super-secret-random-string-here-12345`

### 2. DATABASE_URI
- **What it is**: Your MongoDB Atlas connection string
- **Format**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0`
- **Where to get it**: MongoDB Atlas Dashboard → Connect → Drivers → Copy connection string
- **Important**: Replace `<password>` with your actual database password

### 3. PAYLOAD_PUBLIC_SERVER_URL
- **What it is**: Your Vercel deployment URL
- **Format**: `https://your-project-name.vercel.app`
- **Example**: `https://joes-used-harleys.vercel.app`

## How to Add Them in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Click on your project: `joes-used-harleys`
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter the **Name** (e.g., `PAYLOAD_SECRET`)
   - Enter the **Value**
   - Select **Environment**: Production, Preview, and Development (check all)
   - Click **Save**
5. Repeat for all 3 variables
6. **Redeploy** your project (or wait for the next automatic deployment)

## After Adding Variables

1. Go to your Vercel project dashboard
2. Click **Deployments**
3. Click the **⋯** menu on the latest deployment
4. Click **Redeploy**

Or trigger a new deployment by pushing a commit to GitHub.

## Verify It's Working

1. Visit: `https://your-project.vercel.app/admin`
2. You should see the Payload CMS login page
3. Login with: `joe@joesusedharleys.com` / `harley2025`

## Troubleshooting

If you still see "Payload not configured":
- Make sure all 3 variables are set
- Make sure they're enabled for **Production** environment
- Make sure you **redeployed** after adding them
- Check the variable names are exactly: `PAYLOAD_SECRET`, `DATABASE_URI`, `PAYLOAD_PUBLIC_SERVER_URL` (case-sensitive)

