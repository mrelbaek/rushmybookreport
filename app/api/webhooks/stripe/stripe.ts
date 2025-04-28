// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '../../../../lib/stripe';
import { generateReport } from '../../../../lib/openai';

// This handler receives webhooks from Stripe
export async function POST(req: NextRequest) {
  try {
    // Get the raw request body as text
    const body = await req.text();
    
    // Get the Stripe signature from headers
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }
    
    // Verify the webhook event
    const event = constructWebhookEvent(body, signature);
    
    // Handle the event based on its type
    if (event.type === 'checkout.session.completed') {
      await handleCompletedCheckout(event.data.object);
    } else if (event.type === 'payment_intent.succeeded') {
      // Additional handling if needed
      console.log('Payment succeeded:', event.data.object.id);
    }
    
    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    
    return NextResponse.json({ 
      error: error.message || 'Webhook handler failed'
    }, { status: 400 });
  }
}

/**
 * Handles a completed checkout session
 */
async function handleCompletedCheckout(session: any) {
  try {
    // Extract order details from the session metadata
    const { 
      bookTitle, 
      author, 
      level, 
      length, 
      rush,
      hasSampleText 
    } = session.metadata;
    
    const customerEmail = session.customer_email;
    
    console.log(`Processing order for ${bookTitle} by ${author} for ${customerEmail}`);
    
    // In a production environment, you would:
    // 1. Retrieve the order from your database using session.id
    // 2. Update the order status to 'paid'
    // 3. For rush orders, generate the report immediately
    // 4. For standard orders, add to a processing queue
    
    // For now, we'll simulate generating the report immediately
    if (rush === 'true') {
      // Generate the report
      const report = await generateReport({
        bookTitle,
        author,
        level,
        length: parseInt(length, 10),
        // In a real implementation, you'd retrieve the sample text from your database
        // sampleText: order.sampleText
      });
      
      // In a production environment, you would:
      // 1. Save the report to the order in your database
      // 2. Send an email to the customer with the report
      
      console.log(`Rush report generated for ${bookTitle}, sending to ${customerEmail}`);
    } else {
      // For standard orders, you'd add to a queue for processing within 24 hours
      console.log(`Standard order for ${bookTitle} queued for processing`);
    }
  } catch (error) {
    console.error('Error handling completed checkout:', error);
    // In a production environment, you'd mark the order as 'failed' and alert an admin
  }
}

// Configure the API route to accept raw body
export const config = {
  api: {
    bodyParser: false,
  },
};