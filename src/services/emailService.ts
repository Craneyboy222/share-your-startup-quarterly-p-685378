import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key');

export class EmailService {
  async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    try {
      const msg = {
        to,
        from: 'noreply@startupplatform.com',
        subject,
        text,
        html
      };
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email sending failed');
    }
  }
}
