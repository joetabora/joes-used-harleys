# 🚀 Quick Start: Connect Sanity to Your Backend

## 3-Minute Setup

### 1. Get Your Sanity Credentials

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a project (or select existing)
3. Copy your **Project ID** (looks like: `abc123xyz`)
4. Go to **API** → **Tokens** → Create **Read Token**
5. Copy the token (starts with `sk...`)

### 2. Add Environment Variables

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token-here
```

**Replace:**
- `your-project-id-here` → Your actual Project ID
- `your-read-token-here` → Your Read Token

### 3. Initialize Sanity in Your Project

```bash
# Install Sanity CLI (if needed)
npm install -g @sanity/cli

# Login
sanity login

# Link your project
cd /Users/josephtabora/git/joes-used-harleys
sanity init --env
```

When prompted:
- Use existing project? → **Yes**
- Select your project
- Dataset → **production**
- Output path → **./sanity** (press Enter)
- TypeScript? → **Yes**

### 4. Deploy Studio (Optional)

```bash
sanity deploy
```

This creates your Studio at: `https://your-project.sanity.studio`

### 5. Test Connection

```bash
npm run dev
```

Visit: `http://localhost:3000/inventory`

If connected, it will fetch from Sanity. If not, it falls back to `inventory.json`.

---

## For Vercel Deployment

Add the same environment variables in Vercel:
1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add all variables from `.env.local`
4. Redeploy

---

## Full Documentation

See `/docs/SANITY_CONNECTION_GUIDE.md` for detailed instructions.

