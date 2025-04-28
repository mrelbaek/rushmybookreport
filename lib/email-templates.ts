// lib/email-templates.ts
export function getOrderConfirmationEmail(options: {
    customerEmail: string;
    bookTitle: string;
    isRush: boolean;
  }) {
    const { customerEmail, bookTitle, isRush } = options;
    
    const deliveryTime = isRush ? '1 hour' : '24 hours';
    
    return {
      from: 'RushMyBookReport <orders@rushmybookreport.com>',
      to: customerEmail,
      subject: `Your Book Report for "${bookTitle}" is Being Processed`,
      html: `
        <div>
          <h1>Thank you for your order!</h1>
          <p>We're working on your book report for "${bookTitle}" right now.</p>
          <p>You can expect it to be delivered to this email within ${deliveryTime}.</p>
          <p>If you have any questions, simply reply to this email.</p>
        </div>
      `,
    };
  }
  
  export function getReportDeliveryEmail(options: {
    customerEmail: string;
    bookTitle: string;
    reportText: string;
  }) {
    const { customerEmail, bookTitle, reportText } = options;
    
    return {
      from: 'RushMyBookReport <delivery@rushmybookreport.com>',
      to: customerEmail,
      subject: `Your Book Report for "${bookTitle}" is Ready!`,
      html: `
        <div>
          <h1>Your Book Report is Ready!</h1>
          <p>Here is your completed book report for "${bookTitle}":</p>
          <div style="border: 1px solid #eee; padding: 20px; margin: 20px 0; white-space: pre-wrap;">${reportText}</div>
          <p>We hope this report helps you! If you need any revisions or have questions, simply reply to this email.</p>
        </div>
      `,
    };
  }