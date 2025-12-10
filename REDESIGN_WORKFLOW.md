# Redesign Workflow - Work Without Going Live

This guide shows how to work on redesigns without affecting the live site.

## Option 1: Feature Branch with Vercel Preview (Recommended) ⭐

**Best for:** Full redesigns, major changes, client previews

### Steps:

1. **Create a new branch for your redesign:**
```bash
git checkout -b redesign-2025
```

2. **Work on your redesign:**
- Make all your design changes
- Test locally with `npm run dev`
- Commit as you go:
```bash
git add .
git commit -m "Redesign: Update homepage layout"
```

3. **Push to GitHub:**
```bash
git push origin redesign-2025
```

4. **Vercel automatically creates a preview URL:**
- Go to your Vercel dashboard
- Find the deployment for the `redesign-2025` branch
- Get the preview URL (e.g., `joesusedharleys-redesign-2025.vercel.app`)
- Share this URL for feedback/review

5. **When ready to go live:**
```bash
# Merge to main branch
git checkout main
git merge redesign-2025
git push origin main
```

**Benefits:**
- ✅ Live preview URL (not indexed by Google)
- ✅ Can share with clients/team
- ✅ Easy to test on real server
- ✅ Automatic deployments on every push
- ✅ Can run multiple previews (different branches)

---

## Option 2: Local Development Only

**Best for:** Quick experiments, testing ideas

### Steps:

1. **Work locally:**
```bash
npm run dev
```
- Site runs at `http://localhost:3000`
- Only you can see it
- Changes hot-reload automatically

2. **Don't commit until ready:**
- Work in your local files
- Only commit/push when design is complete

**Benefits:**
- ✅ Instant feedback
- ✅ No deployments needed
- ✅ Zero risk of going live

**Limitations:**
- ❌ Only you can see it
- ❌ Not on real server/environment

---

## Option 3: Staging Branch (Advanced)

**Best for:** Long-term redesign projects

### Steps:

1. **Create a staging branch:**
```bash
git checkout -b staging
git push origin staging
```

2. **Connect staging branch to Vercel:**
- In Vercel dashboard, add new project/branch
- Point it to `staging` branch
- Use a different domain (e.g., `staging.joesusedharleys.com`)

3. **Work on staging branch:**
- All redesign work happens here
- Staging URL stays stable
- Can be password protected in Vercel

4. **Merge when ready:**
```bash
git checkout main
git merge staging
git push origin main
```

---

## Quick Reference Commands

### Start a redesign:
```bash
git checkout -b redesign-2025
git push origin redesign-2025
```

### Work locally:
```bash
npm run dev
# Open http://localhost:3000
```

### See your preview:
- Check Vercel dashboard for preview URL
- Or: `vercel --prod` to see deployment status

### Merge to live:
```bash
git checkout main
git merge redesign-2025
git push origin main
# Vercel automatically deploys to production
```

---

## Important Notes

1. **Preview URLs are NOT indexed by Google** - Safe to experiment
2. **Main branch = Live site** - Only merge when ready
3. **Vercel creates previews automatically** - For every branch push
4. **Keep main branch stable** - All production fixes go here

---

## Recommendation

For a full redesign, use **Option 1 (Feature Branch)**:
- Clean, organized workflow
- Easy to review/share
- Low risk
- Professional approach

