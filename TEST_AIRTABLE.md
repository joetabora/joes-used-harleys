# Test Your Airtable Connection

## Step 1: Check What Your API Returns

Visit this URL (replace with your actual site):
```
https://your-site.vercel.app/api/bikes
```

**What you should see:**
- If working: `{"bikes":[...]}` with your bike data
- If error: An error message with details

**Copy and paste what you see here!**

---

## Step 2: Check Your Bike in Airtable

1. **Open your Airtable base**
2. **Look at your bike row**
3. **Check these things:**

   ✅ **Does it have a "Name" field?**
   - What is the exact name of the column? (Is it "Name", "A Name", or something else?)
   - Is it filled in?

   ✅ **What are ALL your column names?**
   - List them here so we can match them exactly

   ✅ **Is the row saved?**
   - Make sure you clicked the checkmark ✓

---

## Step 3: Check Vercel Logs

1. Go to **Vercel Dashboard** → Your Project → **Logs**
2. Look for any errors
3. Copy any error messages you see

---

## Step 4: Verify Environment Variables

In Vercel → Settings → Environment Variables, make sure you have:

- ✅ `AIRTABLE_BASE_ID` = your base ID (starts with `app`)
- ✅ `AIRTABLE_API_KEY` = your API key (starts with `pat`)
- ✅ `AIRTABLE_TABLE_ID` = `tbllZuEMGdoV48WVg` (or `AIRTABLE_TABLE_NAME` = your table name)

---

## Most Common Issues:

1. **Field name doesn't match** - Airtable is case-sensitive. If your column is "A Name" not "Name", it won't work
2. **Bike doesn't have Name field** - The code filters out bikes without a name
3. **Table name/ID wrong** - Double-check it matches exactly

**Please share:**
1. What you see at `/api/bikes`
2. What your column names are in Airtable
3. Any errors from Vercel logs

