import { NextResponse } from 'next/server';

export const runtime= 'edge';
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID; // Corrected environment variable

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      console.error('Missing Mailchimp environment variables');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    const response = await fetch(customUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MailchimpKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific Mailchimp error for existing members
      if (data.title === "Member Exists") {
        return NextResponse.json({ error: "This email is already subscribed." }, { status: 400 });
      }
      // Handle other errors
      return NextResponse.json({ error: data.detail || 'An error occurred.' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Success! Thanks for subscribing.' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}