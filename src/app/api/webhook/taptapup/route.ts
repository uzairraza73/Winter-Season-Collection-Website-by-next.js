import { NextRequest, NextResponse } from 'next/server';
import { getTapTapUpConfig, verifyWebhookSignature } from '@/lib/taptapup';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const timestamp = req.headers.get('x-timestamp') || '';
    const receivedSignature = req.headers.get('x-signature') || '';
    const event = req.headers.get('x-taptapup-event') || '';
    const merchantRef = req.headers.get('x-merchant-reference') || '';

    const config = getTapTapUpConfig();

    const isValid = verifyWebhookSignature(
      timestamp,
      rawBody,
      receivedSignature,
      config.webhookSecret
    );

    if (!isValid) {
      console.warn('TapTapUp webhook: Invalid signature or expired timestamp');
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log('TapTapUp verified webhook received:', {
      event,
      merchantRef,
      order_id: payload.order_id,
      amount: payload.amount,
      status: payload.status,
    });

    // In your order store or database, mark order as paid:
    // order.status = 'paid';

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error('TapTapUp webhook error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
