# Payment Setup Guide for Joe's Shop

## Quick Options (No Code Required)

### Option 1: Stripe Payment Links (Easiest)
**Best for:** Manual fulfillment, no code changes needed

1. **Sign up for Stripe**: https://stripe.com
2. **Create Payment Links**:
   - Go to Stripe Dashboard → Products → Payment Links
   - Create a link for each product or price tier
   - Share the link via SMS after customer texts you

**Pros:**
- Zero code changes
- Works immediately
- Professional checkout
- Handles taxes, shipping automatically

**Cons:**
- Manual link sharing
- Not integrated into cart

---

### Option 2: PayPal.me Links
**Best for:** Quick setup, trusted by customers

1. **Sign up**: https://paypal.com
2. **Get your PayPal.me link**: `paypal.me/joesusedharleys`
3. **Share link** with amount: `paypal.me/joesusedharleys/50` (for $50)

**Pros:**
- Instant setup
- No fees for friends/family
- Trusted brand

**Cons:**
- Manual process
- Not integrated

---

## Integrated Payment Options (Requires Code)

### Option 3: Stripe Checkout (Recommended)
**Best for:** Professional, automated checkout experience

**Setup Steps:**
1. Sign up at https://stripe.com
2. Get API keys from Dashboard → Developers → API keys
3. Add to Vercel environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_`)
4. Install Stripe: `npm install stripe @stripe/stripe-js`
5. Create API route for checkout session
6. Update shop page to use Stripe Checkout

**Pros:**
- Professional checkout
- Handles all payment methods
- Automatic tax calculation
- Mobile optimized
- Secure (PCI compliant)

**Cons:**
- Requires code changes
- 2.9% + $0.30 per transaction

**Implementation:** See below for code example.

---

### Option 4: PayPal Buttons
**Best for:** Customers who prefer PayPal

**Setup Steps:**
1. Sign up at https://paypal.com/business
2. Get Client ID from PayPal Developer Dashboard
3. Install: `npm install @paypal/react-paypal-js`
4. Add PayPal buttons to cart

**Pros:**
- Trusted by customers
- Easy integration
- Multiple payment methods

**Cons:**
- Requires code changes
- 2.9% + $0.30 per transaction

---

## ✅ Stripe Checkout Implementation (COMPLETE)

Stripe Checkout has been fully integrated into your shop! Here's how to activate it:

### Step 1: Get Your Stripe API Keys

1. **Log into your Stripe Dashboard**: https://dashboard.stripe.com
2. **Go to Developers → API keys**
3. **Copy your keys:**
   - **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
   - **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

### Step 2: Add Environment Variables to Vercel

1. **Go to your Vercel project**: https://vercel.com/dashboard
2. **Select your project** → Settings → Environment Variables
3. **Add these variables:**

   **Variable 1:**
   - Name: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Value: `pk_live_...` (your publishable key from Stripe Dashboard)
   - Environment: ✅ Production, ✅ Preview, ✅ Development (select all)

   **Variable 2:**
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_live_...` (your secret key from Stripe Dashboard)
   - Environment: ✅ Production, ✅ Preview, ✅ Development (select all)

   **Variable 3 (Recommended):**
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://www.joesusedharleys.com`
   - Environment: ✅ Production, ✅ Preview, ✅ Development (select all)

   ⚠️ **IMPORTANT:** These are LIVE production keys. Make sure to:
   - Only add them to Vercel (never commit to git)
   - Keep them secure and private
   - Monitor your Stripe Dashboard for transactions

### Step 3: Redeploy Your Site

After adding the environment variables:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click "Redeploy" on your latest deployment
3. Or push a new commit to trigger a new deployment

### Step 4: Test Your Checkout

⚠️ **Note:** You're using LIVE keys, so all transactions will be real charges!

**For Testing (if you want to test first):**
1. Get test keys from Stripe Dashboard (switch to Test mode)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date (e.g., 12/34)
4. Any 3-digit CVC
5. Any ZIP code

**Or Go Live Directly:**
- Your live keys are already configured above
- After redeploying, you're ready to accept real payments!
- Monitor transactions in your Stripe Dashboard

### What's Included

✅ **Stripe Checkout Integration** - Professional payment flow  
✅ **Success Page** - `/shop/success` - Shows confirmation after payment  
✅ **Cancel Page** - `/shop/cancel` - Handles cancelled payments  
✅ **Cart Integration** - Seamless checkout from cart  
✅ **Shipping Collection** - Stripe collects shipping addresses  
✅ **Phone Collection** - Stripe collects phone numbers for order updates  

### How It Works

1. Customer adds items to cart
2. Clicks "CHECKOUT WITH STRIPE" button
3. Redirects to Stripe's secure checkout page
4. Customer enters payment info
5. After payment, redirects to success page
6. Cart is automatically cleared
7. You receive payment notification in Stripe Dashboard
8. Fulfill order manually from AliExpress

### Viewing Orders

- **Stripe Dashboard**: https://dashboard.stripe.com/payments
- You'll see all successful payments with customer details
- Each payment includes shipping address and phone number

---

## Quick Start: Stripe Payment Links (No Code)

**Right now, you can accept payments without any code changes:**

1. **Sign up**: https://stripe.com (free)
2. **Create products** in Stripe Dashboard
3. **Generate Payment Links** for each product
4. **When customer texts you**, reply with the payment link
5. **After payment**, fulfill order manually

**Example workflow:**
- Customer texts: "I want the Skull Tee"
- You reply: "Here's your payment link: [Stripe Payment Link]"
- Customer pays
- You receive notification
- You fulfill from AliExpress

---

## Fees Comparison

| Service | Transaction Fee | Setup Time |
|---------|---------------|------------|
| Stripe Payment Links | 2.9% + $0.30 | 5 minutes |
| Stripe Checkout | 2.9% + $0.30 | 30 minutes |
| PayPal.me | 2.9% + $0.30 | 5 minutes |
| PayPal Buttons | 2.9% + $0.30 | 30 minutes |
| Cash/Venmo | 0% | Instant |

---

## Recommendation

**Start with Stripe Payment Links** (Option 1):
- Zero code changes
- Professional checkout
- Works immediately
- You can upgrade to integrated checkout later

**Then upgrade to Stripe Checkout** (Option 3) when you're ready:
- Better customer experience
- Automated checkout
- Still manual fulfillment from AliExpress

---

## Need Help?

I can implement Stripe Checkout for you. Just say:
- "Add Stripe Checkout" - I'll implement the full integration
- "Add PayPal buttons" - I'll add PayPal integration
- "Keep manual SMS" - Keep current setup, just add payment links guide

