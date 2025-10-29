# Email Confirmation Setup Guide

## Overview
This project includes email confirmation functionality for user registration. The system is designed to work in both development and production environments.

## Features
- ✅ Email confirmation after registration
- ✅ Resend confirmation email
- ✅ Token validation endpoint
- ✅ JWT tokens include email field
- ✅ 24-hour token expiration
- ✅ Beautiful HTML email templates

## Development Mode (Console)

By default, emails are logged to the console during development. No actual emails are sent.

```env
EMAIL_PROVIDER="console"
```

When a user registers, you'll see the confirmation link in your server logs:
```
📧 EMAIL (Console Mode):
To: user@example.com
Subject: Confirm Your Email - Hotel Hivi
Content: [confirmation link with token]
```

## Production Mode (SMTP)

### Recommended Email Service Providers

1. **SendGrid** (Recommended)
   - Free tier: 100 emails/day
   - Excellent deliverability
   - Easy setup
   - [Sign up](https://sendgrid.com/)

2. **AWS SES**
   - Very cost-effective
   - Great for high volume
   - Requires verification
   - [AWS SES](https://aws.amazon.com/ses/)

3. **Mailgun**
   - Free tier: 5,000 emails/month
   - Good API
   - [Mailgun](https://www.mailgun.com/)

4. **Gmail SMTP** (Not recommended for production)
   - Free but limited
   - May be blocked by Gmail
   - Only for testing

### Setup for SendGrid (Recommended)

1. **Sign up for SendGrid**
   - Go to [SendGrid](https://sendgrid.com/)
   - Create a free account

2. **Create API Key**
   - Dashboard → Settings → API Keys
   - Create API Key with "Full Access"
   - Save the API key securely

3. **Verify Sender Identity**
   - Go to Settings → Sender Authentication
   - Verify a Single Sender email address
   - Complete email verification

4. **Update .env file**
   ```env
   EMAIL_PROVIDER="smtp"
   EMAIL_FROM="your-verified-email@yourdomain.com"
   SMTP_HOST="smtp.sendgrid.net"
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER="apikey"
   SMTP_PASS="your-sendgrid-api-key"
   FRONTEND_URL="https://yourdomain.com"
   ```

### Setup for Gmail SMTP (Testing Only)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Create App Password**
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update .env file**
   ```env
   EMAIL_PROVIDER="smtp"
   EMAIL_FROM="your-email@gmail.com"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-16-char-app-password"
   FRONTEND_URL="http://localhost:3001"
   ```

### Setup for AWS SES

1. **Sign up for AWS** and go to SES

2. **Verify email addresses** (or domain)

3. **Request production access** (starts in sandbox mode)

4. **Get SMTP credentials**
   - SES → SMTP Settings → Create SMTP Credentials

5. **Update .env file**
   ```env
   EMAIL_PROVIDER="smtp"
   EMAIL_FROM="your-verified@email.com"
   SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER="your-ses-smtp-username"
   SMTP_PASS="your-ses-smtp-password"
   FRONTEND_URL="https://yourdomain.com"
   ```

## API Endpoints

### 1. Register (with email confirmation)
```bash
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "hotelName": "My Hotel"
}
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "hotelId": 1,
  "hotelName": "My Hotel",
  "message": "Registration successful. Please check your email to confirm your account."
}
```

### 2. Confirm Email
```bash
POST /auth/confirm-email
{
  "token": "abc123def456..."
}
```

Response:
```json
{
  "message": "Email confirmed successfully. You can now log in."
}
```

### 3. Resend Confirmation Email
```bash
POST /auth/resend-confirmation
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Confirmation email sent. Please check your inbox."
}
```

### 4. Validate Token
```bash
POST /auth/validate-token
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:
```json
{
  "valid": true,
  "email": "user@example.com",
  "userId": 1
}
```

## Frontend Integration

### 1. Handle Registration Response
```typescript
const response = await fetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, hotelName })
});

if (response.ok) {
  // Show message: "Please check your email to confirm your account"
}
```

### 2. Email Confirmation Page
Create a page at `/auth/confirm-email`:

```typescript
// app/auth/confirm-email/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (token) {
      fetch('/api/auth/confirm-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
        .then(res => res.json())
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));
    }
  }, [token]);

  if (status === 'loading') return <div>Confirming...</div>;
  if (status === 'success') return <div>Email confirmed! You can now log in.</div>;
  return <div>Invalid or expired token.</div>;
}
```

### 3. Check Token Validity
```typescript
const validateToken = async (token: string) => {
  const response = await fetch('/auth/validate-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
  
  const result = await response.json();
  return result.valid;
};
```

## Database Schema

The User model includes:
- `emailConfirmed`: Boolean (default: false)
- `emailConfirmationToken`: String (nullable)
- `emailConfirmationTokenExpiry`: DateTime (nullable)

## Security Considerations

1. **Token Expiration**: Confirmation tokens expire after 24 hours
2. **Secure Tokens**: Uses crypto.randomBytes(32) for token generation
3. **Single Use**: Tokens are cleared after successful confirmation
4. **Rate Limiting**: Consider adding rate limiting for resend endpoint
5. **HTTPS**: Always use HTTPS in production for SMTP credentials

## Testing

### Development Testing
1. Set `EMAIL_PROVIDER="console"`
2. Register a user
3. Check server logs for confirmation link
4. Copy the token from the link
5. Call `/auth/confirm-email` with the token

### Production Testing
1. Configure SMTP provider
2. Set `EMAIL_PROVIDER="smtp"`
3. Register with your real email
4. Check inbox (and spam folder)
5. Click confirmation link

## Troubleshooting

### Emails not sending in production
1. Check SMTP credentials are correct
2. Verify sender email is authenticated
3. Check spam folder
4. Review server logs for errors
5. Ensure firewall allows SMTP port (587 or 465)

### Gmail specific issues
- Enable "Less secure app access" (not recommended)
- Use App Password instead of regular password
- Gmail may block automated emails

### Rate limiting
- SendGrid free: 100 emails/day
- Gmail: Very limited, not for production
- Consider implementing queue for high volume

## Production Checklist

- [ ] Choose email service provider
- [ ] Create account and verify sender
- [ ] Get SMTP credentials
- [ ] Update .env with production values
- [ ] Set `EMAIL_PROVIDER="smtp"`
- [ ] Set `FRONTEND_URL` to production URL
- [ ] Test with real email
- [ ] Monitor email delivery rates
- [ ] Set up error alerting
- [ ] Consider email queue for reliability

## Future Enhancements

- Email templates customization
- Multi-language support
- Email queue (Bull/BullMQ)
- Welcome email after confirmation
- Email analytics
- Unsubscribe functionality
