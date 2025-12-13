# 🚀 Set Up Your Social Feed Widget - 5 Minutes

## Quick Steps:

### 1️⃣ Go to Elfsight (Free)
👉 **https://elfsight.com/social-feed-widget/**

### 2️⃣ Sign Up (Free Plan)
- Click "Add to website for free"
- Sign up with email or Google
- Free plan includes: 1 widget, auto-updates daily, no watermark

### 3️⃣ Create Widget
- Click "Create Widget" or "Add Widget"
- Choose **Grid** layout
- Name it: "Joe's Bike Drops"

### 4️⃣ Connect Your Accounts
- Click "Add Source" → **TikTok**
  - Enter: `joetabora` (or `@joetabora`)
- Click "Add Source" → **Instagram**  
  - Enter: `joetabora` (or `@joetabora`)
- Set posts to show: **8-10**

### 5️⃣ Customize Colors
- Background: **Black** (#000000)
- Accent: **Orange** (#FF6600)
- Text: **White** (#FFFFFF)

### 6️⃣ Get Your Widget ID
- Click "Save" or "Publish"
- Look for "Widget ID" in settings or embed code
- It looks like: `abc123def456` (10-20 characters)

### 7️⃣ Add to Your Site

**Open:** `app/page.tsx`

**Find this (around line 123):**
```tsx
<SocialFeed
  tiktokHandle="@joetabora"
  instagramHandle="@joetabora"
  // widgetId="YOUR_ELFSIGHT_WIDGET_ID" // 👇 READ BELOW TO SET UP 👇
```

**Change to:**
```tsx
<SocialFeed
  tiktokHandle="@joetabora"
  instagramHandle="@joetabora"
  widgetId="YOUR_WIDGET_ID_HERE"  // ← Paste your Elfsight widget ID here
/>
```

**Example:**
```tsx
<SocialFeed
  tiktokHandle="@joetabora"
  instagramHandle="@joetabora"
  widgetId="e1234567890abcdef"  // ← Your actual widget ID
/>
```

### 8️⃣ Test & Deploy

```bash
# Test locally
npm run dev

# If it works, deploy
git add app/page.tsx
git commit -m "Add Elfsight social feed widget"
git push
```

## ✅ Done!

Your site will now show your real TikTok and Instagram videos, auto-updating daily!

---

## Need Help?

- **Widget not showing?** Check browser console (F12) for errors
- **Can't find widget ID?** Look in Elfsight dashboard → Widget Settings
- **Videos not syncing?** Free plan updates every 24 hours (paid = hourly)

**Elfsight Support:** https://elfsight.com/help/
