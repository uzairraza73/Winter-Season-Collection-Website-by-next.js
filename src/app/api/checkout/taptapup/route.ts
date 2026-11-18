import { NextRequest, NextResponse } from 'next/server';
import {
  getTapTapUpConfig,
  generateSignature,
  getNearestAllowedCardAmount,
} from '@/lib/taptapup';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, email, items, cardholderName } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Valid amount is required' },
        { status: 400 }
      );
    }

    const customerEmail = email || 'customer@example.com';
    const config = getTapTapUpConfig();

    // Map amount to nearest allowed whole number tier for Credit Card product
    const chargingAmount = getNearestAllowedCardAmount(amount);

    // Unique reference for this order
    const merchantReference = `NEXT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${origin}/order/confirmation`;
    const webhookUrl = `${origin}/api/webhook/taptapup`;

    const payloadObj = {
      product_id: config.cardProductId,
      amount: chargingAmount,
      email: customerEmail,
      merchant_reference: merchantReference,
      return_url: returnUrl,
      webhook_url: webhookUrl,
    };

    const rawBody = JSON.stringify(payloadObj);
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = generateSignature(timestamp, rawBody, config.sharedSecret);

    const apiEndpoint = `${config.baseUrl}/api/v1/initiate-payment`;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-ID': config.merchantId,
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
      body: rawBody,
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.success) {
      console.error('TapTapUp initiate-payment error:', responseData);
      return NextResponse.json(
        {
          success: false,
          error: responseData?.data?.error || 'payment_initiation_failed',
          message: responseData?.data?.message || 'Unable to initiate payment with TapTapUp',
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        redirect_url: responseData.data.redirect_url,
        token: responseData.data.token,
        merchant_reference: merchantReference,
        final_amount: responseData.data.final_amount ?? chargingAmount,
      },
    });
  } catch (error: any) {
    console.error('TapTapUp server route error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

