# Inventory Management Guide

## How to Add/Update Inventory

Your inventory is managed through a simple JSON file: `inventory.json`

### Quick Steps:

1. **Open `inventory.json`** in any text editor
2. **Add, edit, or remove bike entries**
3. **Save the file**
4. **Deploy to Vercel** (or push to GitHub if auto-deploy is set up)

### JSON Structure:

Each bike entry should follow this format:

```json
{
  "id": "bike1",
  "name": "2023 Street Glide Special",
  "image": "https://your-image-url.com/image.jpg",
  "specs": "8,200 miles • Milwaukee-Eight 114 • Stage 2",
  "price": 23900,
  "priceFormatted": "$23,900",
  "financing": "Financing as low as $399/mo",
  "featured": true,
  "justArrived": false
}
```

### Field Descriptions:

- **id**: Unique identifier (e.g., "bike1", "bike2")
- **name**: Full bike name/model
- **image**: URL to the bike image (can be Unsplash, your own hosting, etc.)
- **specs**: Details separated by " • " (miles, engine, mods)
- **price**: Numeric price (no commas, no dollar sign)
- **priceFormatted**: Display price with formatting (e.g., "$23,900")
- **financing**: Financing text
- **featured**: `true` to show "FEATURED" badge
- **justArrived**: `true` to show "JUST ARRIVED" badge

### Examples:

**Adding a new bike:**
```json
{
  "id": "bike7",
  "name": "2024 Road King",
  "image": "https://images.unsplash.com/photo-1234567890",
  "specs": "1,500 miles • Milwaukee-Eight 114 • Stage 1",
  "price": 26900,
  "priceFormatted": "$26,900",
  "financing": "Financing as low as $449/mo",
  "featured": false,
  "justArrived": true
}
```

**Removing a bike:**
Just delete the entire bike object from the array.

**Marking as sold:**
Remove the bike from the array, or you can add a "sold" field (future feature).

### Image Tips:

- Use high-quality images (800px width minimum)
- Unsplash is great for placeholder images
- For real bikes, upload to:
  - Imgur
  - Cloudinary
  - Your own hosting
  - Or use direct image URLs

### After Making Changes:

1. **Test locally**: Open `index.html` in a browser to see changes
2. **Deploy**: 
   - If using Vercel CLI: `vercel --prod`
   - If using GitHub: Push changes and Vercel will auto-deploy

### Need Help?

- Make sure JSON is valid (use a JSON validator online)
- Check that all required fields are present
- Ensure image URLs are accessible
- Prices should be numbers (no commas or $)

