import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER || 'your_mailtrap_user',
    pass: process.env.SMTP_PASS || 'your_mailtrap_pass',
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Hello!</h2>
        <p>Thank you for registering. Please verify your email address to activate your account.</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
        <p style="margin-top: 16px;">If the button above does not work, copy and paste the following link into your browser:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <hr/>
        <p style="font-size: 12px; color: #888;">If you did not create an account, you can ignore this email.</p>
        <p style="font-size: 12px; color: #888;">Best regards,<br/>The Team</p>
      </div>
    `
  });
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #28a745; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        <p style="margin-top: 16px;">If you did not request a password reset, you can ignore this email.</p>
        <p style="margin-top: 16px;">If the button above does not work, copy and paste the following link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <hr/>
        <p style="font-size: 12px; color: #888;">Best regards,<br/>The Team</p>
      </div>
    `
  });
} 