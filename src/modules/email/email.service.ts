import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const emailProvider = this.configService.get<string>(
      'EMAIL_PROVIDER',
      'console',
    );

    if (emailProvider === 'console') {
      // Development mode - just log emails
      this.logger.log(
        'Email service initialized in CONSOLE mode (development)',
      );
      return;
    }

    if (emailProvider === 'smtp') {
      // Production SMTP mode
      const smtpSecure = this.configService.get<string>('SMTP_SECURE', 'false');
      const config = {
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT', 587),
        secure: smtpSecure === 'true', // true for 465, false for other ports (587)
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      };

      this.transporter = nodemailer.createTransport(config);
      this.logger.log('Email service initialized in SMTP mode');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const emailProvider = this.configService.get<string>(
      'EMAIL_PROVIDER',
      'console',
    );
    const from = this.configService.get<string>(
      'EMAIL_FROM',
      'noreply@hotelhivi.com',
    );

    try {
      if (emailProvider === 'console') {
        // Development: just log the email
        this.logger.log('📧 EMAIL (Console Mode):');
        this.logger.log(`To: ${options.to}`);
        this.logger.log(`Subject: ${options.subject}`);
        this.logger.log(`Content: ${options.text || options.html}`);
        this.logger.log('---');
        return true;
      }

      if (emailProvider === 'smtp' && this.transporter) {
        // Production: actually send email
        await this.transporter.sendMail({
          from,
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html,
        });

        this.logger.log(`Email sent successfully to ${options.to}`);
        return true;
      }

      this.logger.warn('Email provider not configured properly');
      return false;
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}:`, error);
      return false;
    }
  }

  async sendEmailConfirmation(
    email: string,
    token: string,
    userName?: string,
  ): Promise<boolean> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    const confirmUrl = `${frontendUrl}/verify?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #4CAF50; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Hotel Hivi!</h1>
            </div>
            <div class="content">
              <h2>Hello${userName ? ' ' + userName : ''}!</h2>
              <p>Thank you for registering with Hotel Hivi. Please confirm your email address to complete your registration.</p>
              <p>Click the button below to verify your email:</p>
              <div style="text-align: center;">
                <a href="${confirmUrl}" class="button">Confirm Email Address</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4CAF50;">${confirmUrl}</p>
              <p><strong>This link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account with Hotel Hivi, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Hotel Hivi. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Welcome to Hotel Hivi!
      
      Hello${userName ? ' ' + userName : ''}!
      
      Thank you for registering. Please confirm your email address by clicking the link below:
      
      ${confirmUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with Hotel Hivi, please ignore this email.
      
      © ${new Date().getFullYear()} Hotel Hivi. All rights reserved.
    `;

    return this.sendEmail({
      to: email,
      subject: 'Confirm Your Email - Hotel Hivi',
      html,
      text,
    });
  }

  async sendPasswordReset(email: string, token: string): Promise<boolean> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #f44336; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #f44336;">${resetUrl}</p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Hotel Hivi. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Password Reset Request
      
      We received a request to reset your password. Click the link below to create a new password:
      
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, please ignore this email.
      
      © ${new Date().getFullYear()} Hotel Hivi. All rights reserved.
    `;

    return this.sendEmail({
      to: email,
      subject: 'Password Reset - Hotel Hivi',
      html,
      text,
    });
  }

  async sendPartnershipInvitation(
    partnerEmail: string,
    partnerName: string,
    hotelName: string,
    partnerId: number,
  ): Promise<boolean> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    const acceptUrl = `${frontendUrl}/guest/accept-partner/${partnerId}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #2196F3; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .info-box {
              background-color: #e3f2fd;
              padding: 15px;
              border-left: 4px solid #2196F3;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Partnership Invitation</h1>
            </div>
            <div class="content">
              <h2>Hello, ${partnerName}!</h2>
              <p>You have been invited to become a partner with <strong>${hotelName}</strong> on Hotel Hivi platform.</p>
              
              <div class="info-box">
                <p><strong>Hotel:</strong> ${hotelName}</p>
                <p><strong>Partnership Benefits:</strong></p>
                <ul>
                  <li>Access to exclusive hotel booking system</li>
                  <li>Commission-based partnership model</li>
                  <li>Real-time availability and pricing</li>
                </ul>
              </div>

              <p>To accept this partnership invitation and review the terms and conditions, please click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${acceptUrl}" class="button">Accept Partnership</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #2196F3;">${acceptUrl}</p>
              
              <p>If you have any questions about this partnership invitation, please contact the hotel directly.</p>
              <p>If you did not expect this invitation, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Hotel Hivi. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Partnership Invitation
      
      Hello, ${partnerName}!
      
      You have been invited to become a partner with ${hotelName} on Hotel Hivi platform.
      
      Hotel: ${hotelName}
      
      Partnership Benefits:
      - Access to exclusive hotel booking system
      - Commission-based partnership model
      - Real-time availability and pricing
      
      To accept this partnership invitation and review the terms and conditions, please visit:
      
      ${acceptUrl}
      
      If you have any questions about this partnership invitation, please contact the hotel directly.
      If you did not expect this invitation, you can safely ignore this email.
      
      © ${new Date().getFullYear()} Hotel Hivi. All rights reserved.
    `;

    return this.sendEmail({
      to: partnerEmail,
      subject: `Partnership Invitation from ${hotelName} - Hotel Hivi`,
      html,
      text,
    });
  }
}
