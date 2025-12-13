# Social Feed Widget - Quick Start Guide 🚀

## Easiest Option: Elfsight (Free Plan Available)

### Step 1: Sign Up & Create Widget (5 minutes)

1. **Go to Elfsight:**
   - Visit: https://elfsight.com/social-feed-widget/
   - Click "Add to website for free" or "Try for free"

2. **Sign Up:**
   - Use email or Google account
   - Free plan includes: 1 widget, auto-sync every 24 hours, no watermark, 1,000 visitors/month

3. **Create Your Widget:**
   - Click "Create Widget" or "Add Widget"
   - Choose layout: **Grid** (best for your site)
   - Name it: "Joe's Daily Bike Drops"

### Step 2: Connect Your Social Accounts

1. **Add TikTok:**
   - Click "Add Source" → "TikTok"
   - Enter username: `@joetabora` (or just `joetabora`)
   - Click "Add"

2. **Add Instagram:**
   - Click "Add Source" → "Instagram"
   - Choose connection method:
     - **Option A:** Username (easiest) - Enter `@joetabora`
     - **Option B:** Business Account (more features) - Connect via Facebook
   - Click "Add"

3. **Configure Feed:**
   - Set number of posts: **8-10** (for homepage)
   - Choose display: Videos only (for Reels/Shorts)
   - Enable auto-update: **Yes**

### Step 3: Customize Colors (Match Your Brand)

1. **Go to "Design" tab:**
   - Background: **Black** (#000000)
   - Text: **White** (#FFFFFF)
   - Accent: **Orange** (#FF6600)
   - Border: **Orange** (#FF6600)

2. **Layout Settings:**
   - Columns: **Auto** (responsive)
   - Spacing: **Medium**
   - Border radius: **12px**

3. **Hide Elements (Optional):**
   - Hide "Follow" buttons (you have your own)
   - Keep post date/time
   - Keep like counts (optional)

### Step 4: Get Your Widget ID

1. **Click "Save" or "Publish"**
2. **Copy your Widget ID:**
   - It will look like: `abc123def456` or `e1234567890abcdef`
   - Found in the embed code or widget settings
   - Usually 10-20 characters, alphanumeric

### Step 5: Add to Your Site

1. **Open `app/page.tsx`**
2. **Find this line (around line 110):**
   ```tsx
   <SocialFeed 
     tiktokHandle="@joetabora"
     instagramHandle="@joetabora"
     // widgetId="YOUR_ELFSIGHT_WIDGET_ID" // Uncomment and add your Elfsight widget ID
   />
   ```

3. **Replace with your widget ID:**
   ```tsx
   <SocialFeed 
     tiktokHandle="@joetabora"
     instagramHandle="@joetabora"
     widgetId="YOUR_WIDGET_ID_HERE" // Paste your Elfsight widget ID
   />
   ```

4. **Save and deploy!**

### Step 6: Test It

1. **Run locally:**
   ```bash
   npm run dev
   ```

2. **Check the homepage:**
   - Visit `http://localhost:3000`
   - You should see your real TikTok/Instagram videos instead of placeholders

3. **Deploy:**
   ```bash
   git add app/page.tsx
   git commit -m "Add Elfsight social feed widget"
   git push
   ```

## Alternative: TikTok + Instagram Native Embeds

If you prefer not to use a widget service, you can embed individual videos manually:

### For TikTok Videos:

1. Go to your TikTok video
2. Click "Share" → "Embed"
3. Copy the embed code
4. Replace placeholders in `components/SocialFeed.tsx`

### For Instagram Posts/Reels:

1. Go to your Instagram post
2. Click "..." (three dots) → "Embed"
3. Copy the embed code
4. Replace placeholders in `components/SocialFeed.tsx`

**Note:** This requires manually updating for each new video, so the widget is recommended.

## Troubleshooting

### Widget Not Showing?

1. **Check widget ID is correct** (no extra spaces)
2. **Verify accounts are connected** in Elfsight dashboard
3. **Check browser console** for errors (F12 → Console)
4. **Wait 24 hours** for first sync (or manually refresh in Elfsight)

### Videos Not Updating?

- Elfsight free plan syncs every 24 hours
- Paid plans sync more frequently (every hour)
- You can manually refresh in Elfsight dashboard

### Styling Issues?

- Widget should inherit your site's colors
- If not, customize in Elfsight dashboard → Design tab
- You can also add custom CSS in Elfsight

## Need Help?

- Elfsight Support: https://elfsight.com/help/
- Elfsight Docs: https://help.elfsight.com/
- Your widget dashboard: https://apps.elfsight.com/

---

**Once set up, your site will auto-update with your latest TikTok and Instagram videos every day! 🎉**
