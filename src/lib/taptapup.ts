import crypto from 'crypto';

export interface InitiatePaymentPayload {
  product_id: number;
  amount: number;
  email: string;
  merchant_reference: string;
  return_url: string;
  webhook_url?: string;
  payment_provider?: 'googlepay' | 'applepay';
}

export interface InitiatePaymentResponse {
  success: boolean;
  data?: {
    redirect_url: string;
    token: string;
    expires_in: number;
    message: string;
    requested_amount: number;
    final_amount?: number;
    payment_provider?: string;
  };
  error?: string;
  message?: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  data?: {
    token: string;
    status: 'pending' | 'processing' | 'completed' | 'expired';
    order_id: number | string | null;
    amount: string;
    email: string;
  };
  error?: string;
}

// Map requested amount to closest allowed whole number for Card tier ($5 - $100)
// Allowed credit card values: 5,6,7,8,9,10,11,12,13,14,15,16,18,20,22,25,30,31,35,40,42,50,55,60,70,80,100
const ALLOWED_CARD_AMOUNTS = [
  5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 25, 30, 31, 35, 40, 42, 50, 55, 60, 70, 80, 100,
];

export function getNearestAllowedCardAmount(amount: number): number {
  const rounded = Math.round(amount);
  if (rounded <= 5) return 5;
  if (rounded >= 100) return 100;
  return ALLOWED_CARD_AMOUNTS.reduce((prev, curr) =>
    Math.abs(curr - rounded) < Math.abs(prev - rounded) ? curr : prev
  );
}

export function getTapTapUpConfig() {
  const isProd = process.env.TAPTAPUP_ENV === 'production';
  const baseUrl = isProd
    ? process.env.TAPTAPUP_PROD_BASE_URL || 'https://taptapup.com'
    : process.env.TAPTAPUP_SANDBOX_BASE_URL || 'https://taptapup.xyz';

  const merchantId = process.env.TAPTAPUP_MERCHANT_ID || 'merchant_test_001';
  const sharedSecret = process.env.TAPTAPUP_SHARED_SECRET || 'secret_key_abc123xyz789';
  const webhookSecret = process.env.TAPTAPUP_WEBHOOK_SECRET || 'webhook_secret_xyz789abc123';
  const cardProductId = Number(process.env.TAPTAPUP_PRODUCT_CREDIT_CARD || '662202');

  return {
    isProd,
    baseUrl,
    merchantId,
    sharedSecret,
    webhookSecret,
    cardProductId,
  };
}

/**
 * Creates HMAC-SHA256 signature for TapTapUp API requests
 * Signature = Hex HMAC-SHA256 of timestamp + raw_body, keyed by shared_secret
 */
export function generateSignature(timestamp: string, rawBody: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(timestamp + rawBody).digest('hex');
}

/**
 * Validates incoming TapTapUp webhook signatures
 */
export function verifyWebhookSignature(
  timestamp: string,
  rawBody: string,
  receivedSignature: string,
  webhookSecret: string
): boolean {
  if (!timestamp || !receivedSignature) return false;

  // Reject requests older than 5 minutes (300 seconds)
  const currentSec = Math.floor(Date.now() / 1000);
  const reqSec = parseInt(timestamp, 10);
  if (isNaN(reqSec) || Math.abs(currentSec - reqSec) > 300) {
    return false;
  }

  const expectedSignature = generateSignature(timestamp, rawBody, webhookSecret);
  const expectedBuf = Buffer.from(expectedSignature, 'utf8');
  const receivedBuf = Buffer.from(receivedSignature, 'utf8');

  if (expectedBuf.length !== receivedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
