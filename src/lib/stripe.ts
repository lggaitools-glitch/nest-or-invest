import { loadStripe, type Stripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise ?? Promise.resolve(null);
}

export const STRIPE_PRICES = {
  report: import.meta.env.VITE_STRIPE_REPORT_PRICE_ID as string | undefined,
  premium: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID as string | undefined,
};

/**
 * Redirect to Stripe Checkout for a one-time report purchase.
 * Passes report metadata so the webhook can associate the payment with the report.
 */
export async function redirectToReportCheckout(options: {
  email: string;
  reportId: string;
  inputs: Record<string, unknown>;
}): Promise<void> {
  const stripe = await getStripe();
  if (!stripe || !STRIPE_PRICES.report) {
    throw new Error('Stripe is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_REPORT_PRICE_ID.');
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: STRIPE_PRICES.report, quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&report_id=${options.reportId}`,
    cancelUrl: `${window.location.origin}/payment/cancel?report_id=${options.reportId}`,
    customerEmail: options.email,
  });

  if (error) {
    throw error;
  }
}

/**
 * Redirect to Stripe Checkout for a premium subscription.
 */
export async function redirectToPremiumCheckout(options: {
  email: string;
}): Promise<void> {
  const stripe = await getStripe();
  if (!stripe || !STRIPE_PRICES.premium) {
    throw new Error('Stripe is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_PREMIUM_PRICE_ID.');
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: STRIPE_PRICES.premium, quantity: 1 }],
    mode: 'subscription',
    successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=premium`,
    cancelUrl: `${window.location.origin}/payment/cancel?plan=premium`,
    customerEmail: options.email,
  });

  if (error) {
    throw error;
  }
}
