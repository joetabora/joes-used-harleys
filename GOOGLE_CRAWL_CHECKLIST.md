# Google Crawl Readiness Checklist for joesusedharleys.com

## ✅ Completed Setup

### 1. Domain Configuration
- [x] Site URL updated to `https://joesusedharleys.com` in `lib/seo.ts`
- [x] Canonical URLs will use new domain automatically
- [x] robots.txt sitemap URL updated
- [x] All structured data (JSON-LD) will use new domain

### 2. Robots.txt & Crawling
- [x] `/app/robots.ts` - Allows all crawlers, no blocking
- [x] `/robots.txt` - Static file with sitemap reference
- [x] Sitemap URL: `https://joesusedharleys.com/sitemap.xml`
- [x] No disallowed paths (except /admin/ and /private/)

### 3. Sitemap
- [x] Dynamic sitemap at `/app/sitemap.ts`
- [x] Includes all pages: homepage, inventory, model pages, bike detail pages
- [x] Proper priorities and change frequencies set
- [x] Auto-updates with new bikes

### 4. Structured Data (Schema.org)
- [x] LocalBusiness schema (AutoDealer type)
- [x] Organization schema
- [x] WebSite schema with SearchAction
- [x] Product schema for each bike
- [x] FAQPage schema on homepage
- [x] All schemas use correct domain

### 5. Meta Tags & SEO
- [x] Title tags on all pages
- [x] Meta descriptions
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Geo-location meta tags (Milwaukee, WI)
- [x] Keywords meta tag

### 6. Technical SEO
- [x] Mobile-responsive design
- [x] Fast loading (Next.js optimizations)
- [x] Image optimization (Next.js Image component)
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Alt text on all images
- [x] Semantic HTML5 elements
- [x] Clean URLs (no query parameters for content)

### 7. Content & Accessibility
- [x] 404 page exists (`/app/bikes/[id]/not-found.tsx`)
- [x] Proper language attribute (`lang="en"`)
- [x] ARIA labels on interactive elements
- [x] Descriptive link text

### 8. Image Configuration
- [x] Remote image patterns configured for:
  - i.imgur.com
  - videos.pexels.com
  - cdn.sanity.io
  - dl.airtable.com
  - airtableusercontent.com
  - files.catbox.moe (new)

## 🔧 Next Steps for Google Search Console

### 1. Verify Domain Ownership
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `joesusedharleys.com`
3. Choose verification method (DNS, HTML file, or meta tag)
4. Complete verification

### 2. Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Submit: `https://joesusedharleys.com/sitemap.xml`
3. Google will automatically discover it via robots.txt, but manual submission is faster

### 3. Request Indexing (Optional)
1. Use "URL Inspection" tool
2. Test homepage: `https://joesusedharleys.com`
3. Click "Request Indexing" for important pages

### 4. Monitor Coverage
- Check "Coverage" report for crawl errors
- Monitor "Performance" for search impressions
- Review "Enhancements" for structured data issues

## 📋 Pre-Launch Verification

Before submitting to Google, verify:

- [ ] Site loads at `https://joesusedharleys.com` (not just www)
- [ ] SSL certificate is valid (HTTPS)
- [ ] robots.txt accessible: `https://joesusedharleys.com/robots.txt`
- [ ] sitemap.xml accessible: `https://joesusedharleys.com/sitemap.xml`
- [ ] No console errors in browser
- [ ] All images load correctly
- [ ] Mobile-friendly (test with Google's Mobile-Friendly Test)
- [ ] Page speed is good (use PageSpeed Insights)

## 🚀 Quick Test URLs

Test these URLs after deployment:

1. **Homepage**: `https://joesusedharleys.com/`
2. **Robots**: `https://joesusedharleys.com/robots.txt`
3. **Sitemap**: `https://joesusedharleys.com/sitemap.xml`
4. **Inventory**: `https://joesusedharleys.com/inventory`
5. **Sample Bike**: `https://joesusedharleys.com/bikes/[any-bike-id]`

## ⚠️ Important Notes

1. **Domain Redirect**: If you're redirecting from vercel.app to joesusedharleys.com, use 301 redirects
2. **Canonical URLs**: All pages automatically use `joesusedharleys.com` as canonical
3. **Structured Data**: Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Mobile Test**: Use [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🔍 Testing Tools

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Schema Validator**: https://validator.schema.org/

## ✅ Your Site is Ready!

All critical SEO elements are in place. The site is configured for:
- ✅ Google crawling
- ✅ Indexing
- ✅ Local SEO (Milwaukee)
- ✅ Mobile search
- ✅ Rich results (structured data)
- ✅ Fast loading

Just verify the domain is live and submit to Google Search Console!

