import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, formData, pageTitle } = body;

    // Using EmailJS free service - requires EMAILJS environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.warn('EmailJS not configured, simulating email send...');
      // Simulate successful email sending for demo purposes
      console.log('Would send email to:', to);
      console.log('Subject:', subject);
      console.log('Form data:', formData);
      return NextResponse.json({ success: true, message: 'Email sent successfully (simulated)' });
    }

    // Prepare email content
    const emailContent = Object.entries(formData)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');

    const emailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: to,
        from_name: pageTitle,
        subject: subject,
        message: `New form submission from ${pageTitle}:\n\n${emailContent}`,
        reply_to: formData['Email'] || 'noreply@example.com'
      }
    };

    // Send email via EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      const errorText = await response.text();
      console.error('EmailJS error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 