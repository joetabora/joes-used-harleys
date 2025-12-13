# Social Feed Setup Guide

This guide explains how to set up the auto-updating TikTok and Instagram feed widgets for your daily bike drop homepage.

## Option 1: Elfsight (Recommended - Free/Paid)

Elfsight offers free and paid widgets that auto-update with your latest TikTok and Instagram posts.

### Setup Steps:

1. **Sign up at [Elfsight.com](https://elfsight.com)**
   - Free plan available with limited features
   - Paid plans start at ~$5/month for full features

2. **Create a Social Feed Widget**
   - Go to your Elfsight dashboard
   - Create a new "Social Feed" widget
   - Connect your TikTok account (@joetabora)
   - Connect your Instagram account (@joetabora)
   - Configure to show latest 8-10 posts
   - Customize colors to match your orange/black theme

3. **Get Your Widget ID**
   - After creating the widget, Elfsight will provide a widget ID
   - It looks like: `abc123def456`

4. **Add to Your Site**
   - Open `app/page.tsx`
   - Find the `<SocialFeed />` component
   - Uncomment and add your widget ID:
   ```tsx
   <SocialFeed 
     tiktokHandle="@joetabora"
     instagramHandle="@joetabora"
     widgetId="YOUR_ELFSIGHT_WIDGET_ID" // Add your ID here
   />
   ```

## Option 2: EmbedSocial (Paid)

Similar to Elfsight, EmbedSocial offers social feed widgets.

1. Sign up at [EmbedSocial.com](https://embedsocial.com)
2. Create a social feed widget
3. Get your embed code
4. Replace the SocialFeed component with the embed code

## Option 3: Manual TikTok/Instagram Embeds

If you prefer manual control, you can embed individual videos:

1. **For TikTok:**
   - Go to your TikTok video
   - Click "Share" → "Embed"
   - Copy the embed code
   - Replace placeholder divs in `components/SocialFeed.tsx`

2. **For Instagram:**
   - Go to your Instagram post
   - Click "..." → "Embed"
   - Copy the embed code
   - Replace placeholder divs in `components/SocialFeed.tsx`

## Current Implementation

The site currently shows placeholder cards that look like social media posts. These include:
- Price overlays ($20,000 - $34,000 range)
- "TEXT JOE 414-439-6211" CTA buttons
- Hover effects matching your orange/black theme

Once you connect a real widget, these will be replaced with your actual TikTok/Instagram videos.

## Form Setup (Get Alerts Section)

The `GetAlerts` component currently uses a placeholder Formspree endpoint. To set it up:

1. **Option A: Formspree (Free)**
   - Sign up at [Formspree.io](https://formspree.io)
   - Create a new form
   - Copy your form ID
   - Update `components/GetAlerts.tsx` line 25:
   ```tsx
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

2. **Option B: EmailJS (Free)**
   - Sign up at [EmailJS.com](https://www.emailjs.com)
   - Set up email template
   - Update the fetch URL in `GetAlerts.tsx`

3. **Option C: Your Own API**
   - Create an API endpoint in `app/api/alerts/route.ts`
   - Update the fetch URL in `GetAlerts.tsx`

## Testing

1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Check that:
   - Social feed shows (placeholders or real widgets)
   - Floating buttons work (TEXT JOE, Follow TikTok)
   - Mobile sticky bar appears on mobile devices
   - Get Alerts form submits correctly

## Social Media Links

Make sure these are correct in `components/FollowTheDrop.tsx`:
- TikTok: `https://www.tiktok.com/@joetabora`
- Instagram: `https://www.instagram.com/joetabora`
- Facebook: `https://www.facebook.com/joesusedharleys`

Update these URLs if your handles are different.
