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
  console.warn('[HomeDecision] Stripe checkout is mocked. A real integration requires a backend to create Checkout Sessions.');
  // Mock: redirect directly to success URL
  window.location.href = `${window.location.origin}/payment/success?session_id=mock_session&report_id=${options.reportId}`;
}

/**
 * Redirect to Stripe Checkout for a premium subscription.
 */
export async function redirectToPremiumCheckout(options: {
  email: string;
}): Promise<void> {
  console.warn('[HomeDecision] Stripe checkout is mocked. A real integration requires a backend to create Checkout Sessions.');
  // Mock: redirect directly to success URL
  window.location.href = `${window.location.origin}/payment/success?session_id=mock_session&plan=premium`;
}
