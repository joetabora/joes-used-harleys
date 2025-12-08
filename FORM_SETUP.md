# Form Setup Instructions

The pre-approval form on the homepage is now functional! You have two options to receive form submissions:

## Option 1: Resend (Recommended - Free Tier Available)

1. **Sign up for Resend**: Go to https://resend.com and create a free account
2. **Get your API key**: In your Resend dashboard, go to API Keys and create a new key
3. **Add to environment variables**: 
   - Create a `.env.local` file in the root directory (if it doesn't exist)
   - Add: `RESEND_API_KEY=your_api_key_here`
   - Update the email address in `app/api/preapproval/route.ts` (line 48) to your email
4. **Uncomment the Resend code**: In `app/api/preapproval/route.ts`, uncomment lines 33-64 (the Resend section)
5. **Comment out the TODO section**: Comment out lines 67-76 (the placeholder return)

**Resend Free Tier**: 3,000 emails/month, perfect for getting started!

## Option 2: Formspree (Simpler - No Code Changes)

1. **Sign up for Formspree**: Go to https://formspree.io and create a free account
2. **Create a new form**: In your dashboard, create a new form
3. **Get your form ID**: It will look like `xvgkqyzw` or similar
4. **Update the form**: In `app/page.tsx`, change line 392 from:
   ```tsx
   <form id="preapprovalForm" onSubmit={...}>
   ```
   to:
   ```tsx
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="preapprovalForm">
   ```
   Replace `YOUR_FORM_ID` with your actual Formspree form ID
5. **Remove the onSubmit handler**: Remove the `onSubmit` prop and the form status state (or keep it for better UX)

**Formspree Free Tier**: 50 submissions/month

## Option 3: SMS via Twilio (Instant Notifications)

If you want instant SMS notifications when someone submits the form:

1. **Sign up for Twilio**: Go to https://www.twilio.com
2. **Get your credentials**: Account SID, Auth Token, and a phone number
3. **Add to environment variables**:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   JOE_PHONE_NUMBER=4144396211
   ```
4. **Install Twilio SDK**: `npm install twilio`
5. **Update the API route**: Add Twilio SMS sending code in `app/api/preapproval/route.ts`

## Current Status

Right now, the form:
- ✅ Validates all required fields
- ✅ Shows success/error messages
- ✅ Prevents double submissions
- ✅ Logs submissions to console (for testing)
- ⚠️ Does NOT send emails yet (you need to configure one of the options above)

## Testing

1. Fill out the form on your homepage
2. Submit it
3. Check your browser console (F12) to see the logged data
4. Once you configure Resend/Formspree, you'll receive actual emails

## Need Help?

- Resend docs: https://resend.com/docs
- Formspree docs: https://help.formspree.io
- Twilio docs: https://www.twilio.com/docs

