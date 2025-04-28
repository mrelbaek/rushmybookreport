// app/api/create-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '../../../lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Get request body
    const body = await req.json();
    const { bookTitle, author, level, length, rush, sampleText, email } = body;

    // Validate required fields
    if (!bookTitle || !author || !level || !length || !email) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      customerEmail: email,
      bookTitle,
      author,
      level,
      length,
      rush: Boolean(rush),
      sampleText,
    });

    // In a production environment, you'd save the order to a database
    // including the Stripe session ID for reference
    
    // Return the session URL to redirect the user to Stripe Checkout
    return NextResponse.json({ 
      success: true, 
      url: session.url,
      sessionId: session.id
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create checkout session. Please try again.' 
    }, { status: 500 });
  }
}