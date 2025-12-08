import { NextRequest, NextResponse } from 'next/server';

// Option 1: Using Resend (recommended - free tier available)
// Sign up at https://resend.com and get your API key
// Add RESEND_API_KEY to your .env.local file

// Option 2: Using Formspree (simpler - no API key needed)
// Just update the form action in app/page.tsx to your Formspree form URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, credit_score, income, bike_interest } = body;

    // Validate required fields
    if (!name || !email || !phone || !credit_score || !income) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Pre-Approval Request from Joe's Used Harleys Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Credit Score Range: ${credit_score}
Monthly Income: $${income}
Bike of Interest: ${bike_interest || 'Not specified'}

Submitted: ${new Date().toLocaleString()}
    `.trim();

    // Option 1: Using Resend (uncomment and configure)
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Joe\'s Used Harleys <noreply@joesusedharleys.com>',
        to: ['joe@joesusedharleys.com'], // Update with your email
        replyTo: email,
        subject: `New Pre-Approval Request from ${name}`,
        text: emailContent,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.json();
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    */

    // Option 2: Using a simple webhook/notification service
    // You can also integrate with:
    // - Slack webhook
    // - Discord webhook
    // - Twilio SMS
    // - Or any other notification service

    // For now, we'll log it and return success
    // In production, you should send an actual email/SMS
    console.log('Pre-approval request received:', {
      name,
      email,
      phone,
      credit_score,
      income,
      bike_interest,
    });

    // TODO: Replace this with actual email sending
    // For now, return success so the form works
    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you! We\'ll contact you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing pre-approval request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

