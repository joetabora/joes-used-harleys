# Sanity CMS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Create Sanity Project
1. Go to [sanity.io](https://www.sanity.io) and sign up
2. Create a new project
3. Copy your **Project ID**

### 2. Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token
```

### 3. Get API Token
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project → **API** → **Tokens**
3. Create a **Read token**
4. Copy to `.env.local`

### 4. Access Studio
```bash
npm run dev
```
Visit: `http://localhost:3000/studio`

### 5. Create Your First Motorcycle
1. Click **Motorcycles** → **Create**
2. Fill in title, model, year, price, etc.
3. Upload images
4. Click **Publish**

---

## 📚 Full Documentation
See `/docs/CMS_SETUP.md` for complete guide.

---

## ✅ What's Included

- ✅ Full Sanity CMS integration
- ✅ Motorcycle inventory management
- ✅ Model page content management
- ✅ Homepage content control
- ✅ Global settings
- ✅ Automatic fallback to `inventory.json`
- ✅ SEO fields on all content
- ✅ Image optimization
- ✅ ISR revalidation

---

## 🎯 Next Steps

1. Set up Sanity project (5 min)
2. Add environment variables (2 min)
3. Create your first motorcycle (5 min)
4. Configure homepage settings (5 min)

**Total time: ~15 minutes to full CMS setup!**

