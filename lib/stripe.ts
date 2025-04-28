// lib/stripe.ts
import Stripe from 'stripe';

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Define report length price points
const PRICE_POINTS = {
  300: { standard: 999, rush: 1499 },   // $9.99 standard, $14.99 rush
  500: { standard: 1499, rush: 2299 },  // $14.99 standard, $22.99 rush
  750: { standard: 1999, rush: 2999 },  // $19.99 standard, $29.99 rush
  1000: { standard: 2499, rush: 3749 }, // $24.99 standard, $37.49 rush
};

interface CheckoutOptions {
  customerEmail: string;
  bookTitle: string;
  author: string;
  level: string;
  length: number;
  rush: boolean;
  sampleText?: string;
}

/**
 * Creates a Stripe checkout session for a book report order
 */
export async function createCheckoutSession(options: CheckoutOptions) {
  const { customerEmail, bookTitle, author, level, length, rush, sampleText } = options;
  
  // Get the correct price based on length and rush status
  const priceInCents = getPriceInCents(length, rush);
  
  // Create a product for this specific book report
  const product = await stripe.products.create({
    name: `Book Report: ${bookTitle}`,
    description: `${rush ? 'Rush' : 'Standard'} book report for "${bookTitle}" by ${author}`,
  });
  
  // Create a one-time price for this product
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: priceInCents,
    currency: 'usd',
  });
  
  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    customer_email: customerEmail,
    metadata: {
      bookTitle,
      author,
      level,
      length: length.toString(),
      rush: rush ? 'true' : 'false',
      hasSampleText: sampleText && sampleText.length > 0 ? 'true' : 'false',
    },
  });
  
  return session;
}

/**
 * Retrieves a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  });
}

/**
 * Calculates price in cents based on report length and rush status
 */
function getPriceInCents(length: number, rush: boolean): number {
  // Find the closest length in our price points
  const availableLengths = Object.keys(PRICE_POINTS).map(Number);
  const closestLength = availableLengths.reduce((prev, curr) => {
    return Math.abs(curr - length) < Math.abs(prev - length) ? curr : prev;
  });
  
  // Get the price based on delivery type
  const priceType = rush ? 'rush' : 'standard';
  return PRICE_POINTS[closestLength as keyof typeof PRICE_POINTS][priceType];
}

/**
 * Verifies a webhook signature from Stripe
 */
export function constructWebhookEvent(payload: string, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}