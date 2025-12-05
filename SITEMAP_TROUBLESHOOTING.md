# Sitemap Troubleshooting Guide

## Issue: "Invalid sitemap address" in Google Search Console

### Common Causes:

1. **Domain not fully deployed/live yet**
   - The sitemap must be accessible at `https://joesusedharleys.com/sitemap.xml` before Google can validate it
   - Wait for DNS propagation (can take 24-48 hours)
   - Verify the site is live by visiting `https://joesusedharleys.com` in a browser

2. **Sitemap not accessible**
   - Test the sitemap URL directly: `https://joesusedharleys.com/sitemap.xml`
   - Should return XML content, not a 404 or error page

3. **Deployment not complete**
   - Make sure Vercel has deployed the latest code with the domain configured
   - Check Vercel dashboard to ensure `joesusedharleys.com` is connected

## Solutions:

### Step 1: Verify Domain is Live
```bash
# Test if domain resolves
curl -I https://joesusedharleys.com

# Test sitemap directly
curl https://joesusedharleys.com/sitemap.xml
```

### Step 2: Check Vercel Configuration
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Verify `joesusedharleys.com` is added and configured
3. Check DNS settings match Vercel's requirements
4. Ensure SSL certificate is active (should be automatic)

### Step 3: Test Sitemap Locally
If you can't access the live site yet, test locally:
```bash
npm run build
npm run start
# Then visit: http://localhost:3000/sitemap.xml
```

### Step 4: Alternative Submission Methods

**Option A: Wait for Domain to be Live**
- Once `https://joesusedharleys.com` loads in a browser
- Then submit `https://joesusedharleys.com/sitemap.xml` to Google Search Console

**Option B: Submit via robots.txt**
- Google will automatically discover the sitemap from robots.txt
- No manual submission needed (but slower)
- Your robots.txt already includes: `Sitemap: https://joesusedharleys.com/sitemap.xml`

**Option C: Use URL Inspection Tool**
- In Google Search Console, use "URL Inspection"
- Enter: `https://joesusedharleys.com/sitemap.xml`
- Click "Test Live URL" to verify it's accessible
- Then request indexing

### Step 5: Verify Sitemap Format

The sitemap should return valid XML. Expected format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://joesusedharleys.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

## Quick Checklist:

- [ ] Domain `joesusedharleys.com` is live and accessible
- [ ] Site loads at `https://joesusedharleys.com` (not just HTTP)
- [ ] Sitemap accessible at `https://joesusedharleys.com/sitemap.xml`
- [ ] Sitemap returns valid XML (not HTML error page)
- [ ] Vercel deployment is complete
- [ ] DNS is fully propagated (check with `nslookup joesusedharleys.com`)

## If Still Not Working:

1. **Check Vercel Logs**: Look for any build/deployment errors
2. **Verify Route**: Next.js should auto-generate `/sitemap.xml` from `app/sitemap.ts`
3. **Test with Google's Tools**:
   - [Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
   - [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Test mobile
   - [PageSpeed Insights](https://pagespeed.web.dev/) - Test performance

4. **Contact Support**: If domain is live but sitemap still fails, check:
   - Vercel support for domain configuration issues
   - Google Search Console help for sitemap validation errors

## Expected Timeline:

- **DNS Propagation**: 24-48 hours (usually faster)
- **SSL Certificate**: Automatic via Vercel (usually instant)
- **Google Discovery**: 1-7 days after sitemap is accessible
- **Indexing**: 1-4 weeks for full site indexing

## Note:

Your sitemap is correctly configured in `app/sitemap.ts`. Once the domain is live and accessible, Google Search Console should accept it. The error you're seeing is likely because Google can't reach the sitemap URL yet (domain not fully set up).

