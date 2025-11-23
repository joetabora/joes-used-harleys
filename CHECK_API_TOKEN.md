# Check Your Airtable API Token Permissions

## The "Forbidden" Error Usually Means:

Your API token doesn't have **write** permissions, only **read** permissions.

## How to Fix:

1. **Go to**: https://airtable.com/create/tokens
2. **Find your token** (the one starting with `pat...`)
3. **Click on it** to edit
4. **Check the "Scopes" section**

## Required Scopes:

Make sure your token has:
- ✅ **`data.records:write`** - To create/update records
- ✅ **`data.records:read`** - To read records (you probably have this)

## If You Don't See Write Permissions:

1. **Delete the old token**
2. **Create a new token**
3. **When setting scopes, select:**
   - ✅ `data.records:read`
   - ✅ `data.records:write`
4. **Give it access to your base**: "Joe's Used Harleys Inventory"
5. **Copy the new token**
6. **Update in Vercel**:
   - Go to Vercel → Settings → Environment Variables
   - Update `AIRTABLE_API_KEY` with the new token
   - Redeploy

## Quick Test:

After updating the token, try the form again. If you still get "Forbidden", check:
- Field names match exactly (case-sensitive)
- Token has write access to the correct base
- Base ID is correct

