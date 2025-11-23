# Debugging Airtable Connection

## Check These Things:

### 1. Verify Your Bike Data in Airtable

Make sure your bike has:
- ✅ **Name** field filled in (required!)
- ✅ At least one field with data
- ✅ The bike is saved (not in draft mode)

### 2. Check Table Name

- Look at your left sidebar in Airtable
- What is the table actually named?
- Make sure `AIRTABLE_TABLE_NAME` in Vercel matches EXACTLY (case-sensitive!)

### 3. Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Logs**
2. Look for errors related to `/api/bikes`
3. Check if there are any Airtable API errors

### 4. Test the API Directly

Visit this URL (replace with your actual site):
```
https://your-site.vercel.app/api/bikes
```

You should see JSON. If you see an error, that's the problem.

### 5. Common Issues

**Issue: "Table not found"**
- Table name doesn't match exactly
- Try using the table ID instead: `tbllZuEMGdoV48WVg`

**Issue: "Authentication failed"**
- API key is wrong or expired
- Check that you copied the full token

**Issue: "No records"**
- Bike doesn't have a "Name" field filled in
- Bike isn't saved
- Bike is in a different view

**Issue: "Base not found"**
- Base ID is wrong
- Check the URL of your base

